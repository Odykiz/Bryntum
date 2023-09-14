
StartTest(t => {
    let scheduler;

    t.beforeEach(t => {
        scheduler?.destroy();
        scheduler = null;
    });

    t.it('Should record only 1 undo action after drag-create', async t => {
        scheduler = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2021, 2, 22),
            endDate   : new Date(2021, 3, 22),
            resources : [
                {
                    id   : 1,
                    name : 'Resource'
                }
            ],
            events  : [],
            project : {
                stm : { autoRecord : true }
            },
            tbar : [{
                type : 'undoredo',
                icon : 'b-fa-undo'
            }]
        });

        const project = scheduler.project;

        await scheduler.project.commitAsync();

        const stm = scheduler.project.stm;
        stm.enable();

        await t.dragBy('.b-sch-timeaxis-cell', [100, 0]);
        await t.type('input[name="name"]', 'Some name');

        await t.click('.b-button:contains(Save)');

        await t.waitFor(() => project.eventStore.count === 1);

        await t.waitFor(() => stm.canUndo);
        t.ok(stm.canUndo, 'Undo possible');

        await t.waitFor(stm.autoRecordTransactionStopTimeout + 50);

        t.is(stm.queue.length, 1, 'Only 1 undo action created');
    });

    t.it('Should record 0 undo actions after drag-create and canceled event edit', async t => {
        scheduler = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2021, 2, 22),
            endDate   : new Date(2021, 3, 22),
            resources : [
                {
                    id   : 1,
                    name : 'Resource'
                }
            ],
            events  : [],
            project : {
                stm : { autoRecord : true }
            },
            tbar : [{
                type : 'undoredo',
                icon : 'b-fa-undo'
            }]
        });

        await scheduler.project.commitAsync();

        const stm = scheduler.project.stm;
        stm.enable();

        await t.dragBy('.b-sch-timeaxis-cell', [100, 0]);

        await t.click('.b-button:contains(Cancel)');

        await t.waitFor(stm.autoRecordTransactionStopTimeout + 50);

        t.is(stm.queue.length, 0, 'No undo actions created');
    });

    t.it('Should record exactly 1 undo action after drag-create with event editing disabled', async t => {
        scheduler = new SchedulerPro({
            appendTo : document.body,

            features : {
                eventEdit : { disabled : true },
                taskEdit  : { disabled : true }
            },

            startDate : new Date(2021, 2, 22),
            endDate   : new Date(2021, 3, 22),
            resources : [
                {
                    id   : 1,
                    name : 'Resource'
                }
            ],
            events  : [],
            project : {
                stm : { autoRecord : true }
            },
            tbar : [{
                type : 'undoredo',
                icon : 'b-fa-undo'
            }]
        });

        const project = scheduler.project;

        await project.commitAsync();

        const stm = project.stm;
        stm.enable();

        await t.dragBy('.b-sch-timeaxis-cell', [100, 0]);
        await t.waitFor(() => project.eventStore.count === 1);

        await t.waitFor(() => stm.canUndo);
        t.ok(stm.canUndo, 'Undo possible');

        await t.waitFor(stm.autoRecordTransactionStopTimeout + 50);

        t.is(stm.queue.length, 1, 'Exactly 1 undo action created');

        const durationBefore = project.eventStore.first.duration;

        await stm.undo();
        await stm.redo();

        // the duration changes after commit somehow
        await project.commitAsync();

        t.is(project.eventStore.first.duration, durationBefore);
    });

    t.it('Should not remove the original when undo-ing the copy-drag action ("multi-assignment")', async t => {
        scheduler = await t.getSchedulerProAsync({
            startDate : '2011-01-02',

            events : [
                { id : 'e1', name : 'Event 1', startDate : '2011-01-04', endDate : '2011-01-06' }
            ],
            assignments : [
                { id : 1, resourceId : 'r1', eventId : 'e1' }
            ],
            resources : [
                { id : 'r1', name : 'Resource 1' },
                { id : 'r2', name : 'Resource 2' }
            ],
            features : {
                eventDrag : {
                    copyMode : 'event'
                }
            },
            tbar : [{
                type : 'undoredo',
                icon : 'b-fa-undo'
            }]
        });

        const project = scheduler.project;
        const stm = project.stm;

        await project.commitAsync();

        const e1Duration    = project.getEventById('e1').duration;

        stm.enable();
        stm.autoRecord = true;

        const { rowHeight } = scheduler;

        await t.dragBy({
            source  : '.b-sch-event-wrap[data-event-id="e1"]',
            delta   : [scheduler.tickSize, rowHeight],
            options : { shiftKey : true }
        });

        await t.waitFor(() => project.assignmentStore.count === 2);

        t.selectorCountIs('.b-sch-event-wrap', 2, 'Created new assignment');

        await t.waitFor(() => stm.canUndo);

        t.is(project.eventStore.count, 2, 'Only new assignment has been created');

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
        t.is(project.eventStore.count, 2, 'Original event still in the store');
        t.selectorCountIs('.b-sch-event-wrap', 2, 'Original event still rendered');

        t.is(project.eventStore.last.duration, e1Duration, 'Correct duration after redo');
    });

    t.it('Should record only 1 undo action after editing event created with double-click', async t => {
        scheduler = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2021, 2, 22),
            endDate   : new Date(2021, 3, 22),
            resources : [
                {
                    id   : 1,
                    name : 'Resource'
                }
            ],
            events  : [],
            project : {
                stm : { autoRecord : true }
            },
            tbar : [{
                type : 'undoredo',
                icon : 'b-fa-undo'
            }]
        });

        const project = scheduler.project;

        await scheduler.project.commitAsync();

        const stm = scheduler.project.stm;
        stm.enable();

        await t.doubleClick('.b-sch-timeaxis-cell');

        await t.type('input[name="name"]', 'Some name');

        await t.click('.b-button:contains(Save)');

        await t.waitFor(() => project.eventStore.count === 1);

        await t.waitFor(() => stm.canUndo);
        t.ok(stm.canUndo, 'Undo possible');

        await t.waitFor(stm.autoRecordTransactionStopTimeout + 50);

        t.is(stm.queue.length, 1, 'Only 1 undo action created');
    });

    t.it('Should record 0 undo actions after creating event with double click and then canceling the edit', async t => {
        scheduler = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2021, 2, 22),
            endDate   : new Date(2021, 3, 22),
            resources : [
                {
                    id   : 1,
                    name : 'Resource'
                }
            ],
            events  : [],
            project : {
                stm : { autoRecord : true }
            },
            tbar : [{
                type : 'undoredo',
                icon : 'b-fa-undo'
            }]
        });

        await scheduler.project.commitAsync();

        const stm = scheduler.project.stm;
        stm.enable();

        await t.doubleClick('.b-sch-timeaxis-cell');

        await t.click('.b-button:contains(Cancel)');

        await t.waitFor(stm.autoRecordTransactionStopTimeout + 50);

        t.is(stm.queue.length, 0, 'No undo actions created');
    });

    t.it('Should record 0 undo actions after creating event with double click and then clicking outside the editor', async t => {
        scheduler = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2021, 2, 22),
            endDate   : new Date(2021, 3, 22),
            resources : [
                {
                    id   : 1,
                    name : 'Resource'
                }
            ],
            events  : [],
            project : {
                stm : { autoRecord : true }
            },
            tbar : [{
                type : 'undoredo',
                icon : 'b-fa-undo'
            }]
        });

        await scheduler.project.commitAsync();

        const stm = scheduler.project.stm;
        stm.enable();

        await t.doubleClick('.b-sch-timeaxis-cell');

        await t.waitForSelector('.b-button:contains(Cancel)');

        await t.click([10, 200]);

        await t.waitFor(stm.autoRecordTransactionStopTimeout + 50);

        t.is(stm.queue.length, 0, 'No undo actions created');
    });
});
