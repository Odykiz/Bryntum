
StartTest(t => {
    let scheduler;

    t.beforeEach(() => scheduler?.destroy());

    function triggerKeyEvent(target, type, options) {
        return new Promise(resolve => {
            function handler(event) {
                if (event.key === options.key) {
                    target.removeEventListener(type, handler);
                    resolve();
                }
            }

            const event = new KeyboardEvent(type, options);

            event.initEvent(type, true, true);

            target = t.normalizeElement(target);

            target.addEventListener(type, handler);

            target.dispatchEvent(event);
        });
    }

    async function dragHoldingKey(t, source, delta) {
        await t.dragBy({
            source,
            delta,
            dragOnly : true
        });

        // Emulate keydown event to trigger copy mode
        await triggerKeyEvent('.b-sch-event-wrap.b-dragging', 'keydown', { key : 'Shift' });

        await t.mouseUp();
    }

    class MyAssignmentModel extends AssignmentModel {
        static get fields() {
            return [
                { name : 'resourceId', dataSource : 'resource' },
                { name : 'eventId', dataSource : 'event' }
            ];
        }
    }

    const projectConfig = {
        assignmentModelClass : MyAssignmentModel,

        resourcesData : [
            { id : 1, name : 'Resource 1' },
            { id : 2, name : 'Resource 2' },
            { id : 3, name : 'Resource 3' }
        ],

        eventsData : [
            { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2 }
        ],

        assignmentsData : [
            { id : 1, event : 1, resource : 1 }
        ]
    };

    t.it('Should copy on drop (event mode)', async t => {
        scheduler = await t.getSchedulerProAsync({
            project : Object.assign({}, projectConfig, {
                assignmentModelClass : AssignmentModel
            }),
            features : {
                eventDrag : {
                    copyMode : 'event'
                }
            }
        });

        await dragHoldingKey(t, '[data-event-id="1"]', [0, scheduler.rowHeight]);

        t.is(scheduler.eventStore.last.startDate, scheduler.eventStore.first.startDate, 'Start date is ok');
        t.is(scheduler.eventStore.count, 2, 'Event is copied');
        t.is(scheduler.assignmentStore.count, 2, 'Assignment is created');
    });

    t.it('Should copy on drop with mapped fields (assignment mode)', async t => {
        scheduler = await t.getSchedulerProAsync({
            project : Object.assign({}, projectConfig, {
                assignmentModelClass : AssignmentModel
            }),
            features : {
                eventDrag : {
                    copyMode : 'auto'
                }
            }
        });

        await dragHoldingKey(t, '[data-event-id="1"]', [0, scheduler.rowHeight]);

        t.is(scheduler.eventStore.count, 1, 'Event is not copied');
        t.is(scheduler.assignmentStore.count, 2, 'Assignment is created');
    });

    t.it('Should copy on drop with mapped fields (event mode)', async t => {
        scheduler = await t.getSchedulerProAsync({
            project  : projectConfig,
            features : {
                eventDrag : {
                    copyMode : 'event'
                }
            }
        });

        await dragHoldingKey(t, '[data-event-id="1"]', [0, scheduler.rowHeight]);

        t.is(scheduler.eventStore.last.startDate, scheduler.eventStore.first.startDate, 'Start date is ok');
        t.is(scheduler.eventStore.count, 2, 'Event is copied');
        t.is(scheduler.assignmentStore.count, 2, 'Assignment is created');
    });

    t.it('Should copy on drop with mapped fields (assignment mode)', async t => {
        scheduler = await t.getSchedulerProAsync({
            project  : projectConfig,
            features : {
                eventDrag : {
                    copyMode : 'auto'
                }
            }
        });

        await dragHoldingKey(t, '[data-event-id="1"]', [0, scheduler.rowHeight]);

        t.is(scheduler.eventStore.count, 1, 'Event is not copied');
        t.is(scheduler.assignmentStore.count, 2, 'Assignment is created');
    });

    t.it('Should not remove the original when undo-ing the copy-drag action ("multi-assignment")', async t => {
        scheduler = await t.getSchedulerProAsync({
            startDate : '2011-01-02',
            events    : [
                { id : 1, name : 'Event 1', startDate : '2011-01-04', endDate : '2011-01-06' }
            ],
            assignments : [
                { id : 1, resourceId : 'r1', eventId : 1 }
            ],
            resources : [
                { id : 'r1', name : 'Resource 1' },
                { id : 'r2', name : 'Resource 2' }
            ],
            tbar : [{
                type : 'undoredo',
                icon : 'b-fa-undo'
            }]
        });

        const project = scheduler.project;
        const stm = project.stm;

        await project.commitAsync();

        stm.enable();
        stm.autoRecord = true;

        await t.dragBy({
            source  : '.b-sch-event-wrap[data-event-id="1"]',
            delta   : [scheduler.tickSize, scheduler.rowHeight],
            options : { shiftKey : true }
        });

        await t.waitFor(() => project.assignmentStore.count === 2);

        t.selectorCountIs('.b-sch-event-wrap', 2, 'Created new assignment');

        await t.waitFor(() => stm.canUndo);

        t.is(project.eventStore.count, 1, 'Only new assignment has been created');

        // UNDO
        await stm.undo();

        await t.waitFor(() => stm.isReady);

        t.is(project.assignmentStore.count, 1, 'Original event still in the store');
        t.is(project.eventStore.count, 1, 'Original event still in the store');
        t.selectorCountIs('.b-sch-event-wrap', 1, 'Original event still rendered');

        // REDO
        await stm.redo();

        await t.waitFor(() => stm.isReady);

        t.is(project.assignmentStore.count, 2, 'Original event still in the store');
        t.is(project.eventStore.count, 1, 'Original event still in the store');
        t.selectorCountIs('.b-sch-event-wrap', 2, 'Original event still rendered');
    });
});
