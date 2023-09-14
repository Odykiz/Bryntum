
StartTest(t => {

    let schedulerPro, tickSize, eventStore, assignmentStore, project;

    t.beforeEach(t => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = await t.getSchedulerProAsync(config);
        tickSize = schedulerPro.tickSize;
        eventStore = schedulerPro.eventStore;
        project = schedulerPro.project;
        assignmentStore = schedulerPro.assignmentStore;
    }

    // https://github.com/bryntum/support/issues/1439
    t.it('Should show editor after drag create', async t => {
        await setup({
            events   : [],
            features : {
                eventDragCreate : true,
                taskEdit        : true
            }
        });

        await t.dragBy({
            source : '.b-sch-timeaxis-cell',
            delta  : [tickSize - 1, 0],
            offset : [tickSize + 1, '50%']
        });

        await t.waitForSelector('.b-schedulerpro-taskeditor');
    });

    // https://github.com/bryntum/support/issues/1538
    t.it('Should ignore default duration', async t => {
        await setup({
            features : {
                eventDragCreate : true,
                taskEdit        : false
            },

            projectConfig : {
                eventModelClass : class extends EventModel {
                    static get fields() {
                        return [
                            { name : 'duration', defaultValue : 1 }
                        ];
                    }
                }
            }
        });

        await t.dragBy({
            source : '[data-id="4"] .b-sch-timeaxis-cell',
            delta  : [3 * tickSize - 1, 0],
            offset : [tickSize + 1, '50%']
        });

        await project.commitAsync();

        t.is(eventStore.last.duration, 3, 'Correct duration for new event');
    });

    // https://github.com/bryntum/support/issues/3295
    t.it('Should not trigger sync during drag create', async t => {
        await setup({
            features : {
                eventDragCreate : true
            },

            project : {
                autoSync  : true,
                transport : {
                    sync : {
                        url : 'foo'
                    }
                },
                resourcesData : [
                    { id : 1, name : 'foo' }
                ],
                validateResponse : true
            }
        });

        const spy = t.spyOn(project, 'sync');

        await t.dragBy({
            source : '.b-sch-timeaxis-cell',
            delta  : [3 * tickSize - 1, 0],
            offset : [tickSize + 1, '50%']
        });

        t.is(eventStore.first.isCreating, true, 'Event marked as isCreating');
        t.is(assignmentStore.first.isCreating, true, 'Assignment marked as isCreating');
        t.is(spy.callsLog.length, 0, 'No sync attempts while drag creating');
        t.notOk(project.autoSyncTimerId, 'No sync scheduled');

        await t.mouseUp();

        t.is(eventStore.first.isCreating, true, 'Event still marked as isCreating');
        t.is(assignmentStore.first.isCreating, true, 'Assignment still marked as isCreating');
        t.is(spy.callsLog.length, 0, 'No sync attempts while task editor is open');
        t.notOk(project.autoSyncTimerId, 'No sync scheduled');
    });

    // https://github.com/bryntum/support/issues/3320
    t.it('Should prevent creating events when 1) drag creating 2) double clicking or 3) using schedule menu on a non working time block', async t => {
        await setup({
            startDate  : new Date(2021, 7, 24, 8),
            endDate    : new Date(2021, 7, 24, 16),
            viewPreset : 'hourAndDay',
            features   : {
                eventDragCreate        : true,
                resourceNonWorkingTime : true
            },

            project : {
                resourcesData : [
                    { id : 1, name : 'foo', calendar : 'late' }
                ],

                calendarsData : [{
                    id                       : 'late',
                    unspecifiedTimeIsWorking : false,
                    intervals                : [
                        {
                            recurrentStartDate : 'at 15:00',
                            recurrentEndDate   : 'at 22:00',
                            isWorking          : true
                        }
                    ]
                }]
            }
        });

        t.wontFire(schedulerPro, 'beforeDragCreate');
        t.wontFire(schedulerPro, 'beforeEventAdd');
        t.wontFire(eventStore, 'add');

        await t.moveCursorTo('.b-sch-timeaxis-cell');
        t.selectorNotExists('.b-sch-scheduletip:not(.b-nonworking-time)', 'No schedule tip by default for non working time blocks');

        await t.dragBy({
            source : '.b-sch-timeaxis-cell',
            delta  : [tickSize - 1, 0]
        });

        await t.doubleClick('.b-sch-timeaxis-cell');

        await t.rightClick('.b-sch-timeaxis-cell');
        t.selectorExists('.b-menuitem.b-disabled:contains(Add event)', 'Schedule menu add item disabled for non working time blocks');
    });

    t.it('Should drag event correctly after really quick drag create', async t => {
        await setup({
            eventsData : []
        });

        const
            target = document.querySelector('.b-sch-timeaxis-cell'),
            box    = t.rect(target);

        // Simulate fast mouse movements
        t.simulator.simulateEvent(target, 'mousedown', {
            clientX : box.left + 2 * tickSize + 1,
            clientY : box.top + 10
        });
        t.simulator.simulateEvent(target, 'mousemove', {
            clientX : box.left + 3 * tickSize + 1,
            clientY : box.top + 10
        });
        t.simulator.simulateEvent(target, 'mouseup', {
            clientX : box.left + 3 * tickSize + 1,
            clientY : box.top + 10
        });

        await t.type('.b-schedulerpro-taskeditor input[name="name"]', '[ENTER]');

        const event = eventStore.last;

        t.is(event.startDate, new Date(2020, 2, 24), 'Start date is ok');
        t.is(event.endDate, new Date(2020, 2, 25), 'End date is ok');

        t.is(event.data.startDate, new Date(2020, 2, 24), 'Start date is ok on data level');
        t.is(event.data.endDate, new Date(2020, 2, 25), 'End date is ok on data level');

        await t.dragBy({
            source : '.b-sch-event-wrap',
            delta  : [-(tickSize - 1), 0]
        });

        t.is(event.startDate, new Date(2020, 2, 23), 'Start date is ok after drag');
        t.is(event.endDate, new Date(2020, 2, 24), 'End date is ok after drag');

        t.is(event.data.startDate, new Date(2020, 2, 23), 'Start date is ok on data level after drag');
        t.is(event.data.endDate, new Date(2020, 2, 24), 'End date is ok on data level after drag');
    });

    // https://github.com/bryntum/support/issues/5408
    t.it('Should not take resource calendar into account when `ignoreResourceCalendar` on event is enabled', async t => {
        const CustomEventModel = class extends EventModel {
            static get fields() {
                return [{ name : 'ignoreResourceCalendar', defaultValue : true }];
            }
        };

        await setup({
            startDate  : new Date(2021, 7, 24, 8),
            endDate    : new Date(2021, 7, 24, 16),
            viewPreset : 'hourAndDay',
            features   : {
                eventDragCreate        : true,
                resourceNonWorkingTime : true
            },

            project : {
                eventModelClass : CustomEventModel,

                resourcesData : [
                    { id : 1, name : 'foo', calendar : 'late' }
                ],

                calendarsData : [{
                    id                       : 'late',
                    unspecifiedTimeIsWorking : false,
                    intervals                : [
                        {
                            recurrentStartDate : 'at 11:00',
                            recurrentEndDate   : 'at 22:00',
                            isWorking          : true
                        }
                    ]
                }]
            }
        });

        // drag-creating the event in the resource's non-working time
        // (should be allowed since `ignoreResourceCalendar` is set to `true` by default)
        await t.dragBy({
            source : '.b-grid-subgrid-normal .b-grid-row[data-index=0]',
            delta  : [tickSize - 1, 0],
            offset : [50, '50%']
        });

        await t.click('button:contains(Save)');

        t.is(project.eventStore.count, 1, 'Event has been drag-created');
    });

    // https://github.com/bryntum/support/issues/5904
    t.it('Should remove previous event being created if starting a new one while task editor is open', async t => {
        // Not waiting for animations
        t.waitForAnimations = callback => callback();

        await setup({
            startDate : '2020-03-23',
            endDate   : '2020-03-24',
            forceFit  : true,
            features  : {
                taskEdit : {
                    editorConfig : {
                        height        : 100,
                        width         : 100,
                        hideAnimation : {
                            opacity : {
                                from     : 1,
                                to       : 0,
                                duration : '.8s',
                                delay    : '0s'
                            }
                        }
                    }
                }
            },
            viewPreset : {
                base              : 'hourAndDay',
                tickWidth         : 30,
                displayDateFormat : 'll HH:mm',
                headers           : [
                    {
                        unit       : 'day',
                        dateFormat : 'ddd DD/MM' //Mon 01/10
                    },
                    {
                        unit       : 'hour',
                        dateFormat : 'HH'
                    }
                ]
            },

            project : {
                // override the `name` field in the event model class because we will be changing
                // its default value (to not interfere with other tests)
                eventModelClass : class extends EventModel {
                    static get fields() {
                        return [
                            { name : 'name', defaultValue : 'New event' }
                        ];
                    }
                },
                resourcesData : [
                    {
                        id   : 1,
                        name : 'Steve'
                    },
                    {
                        id   : 2,
                        name : 'Rob'
                    },
                    {
                        id   : 3,
                        name : 'Mike'
                    },
                    {
                        id   : 4,
                        name : 'Lisa'
                    },
                    {
                        id   : 5,
                        name : 'Kate'
                    },
                    {
                        id   : 6,
                        name : 'Gloria'
                    },
                    {
                        id   : 7,
                        name : 'Dave'
                    },
                    {
                        id   : 8,
                        name : 'Arcady'
                    },
                    {
                        id   : 9,
                        name : 'Maxim'
                    },
                    {
                        id   : 10,
                        name : 'Angelo'
                    },
                    {
                        id   : 11,
                        name : 'Emilia'
                    },
                    {
                        id   : 12,
                        name : 'Malik'
                    }
                ],
                eventsData : [
                ],
                assignmentsData : [
                    {
                        id       : 1,
                        event    : 1,
                        resource : 7
                    },
                    {
                        id       : 2,
                        event    : 2,
                        resource : 2
                    },
                    {
                        id       : 3,
                        event    : 3,
                        resource : 2
                    }
                ]
            }
        });

        const nameField = schedulerPro.eventStore.modelClass.fieldMap.name;

        let count = 0;
        nameField.defaultValue = String(count++);
        t.wontFire(schedulerPro, 'beforeTaskDelete');

        await t.dragBy('.b-grid-subgrid-normal .b-grid-row[data-index=0]', [-200, 0], null, null, null, false, [250, '50%']);
        nameField.defaultValue = String(count++);
        t.selectorCountIs('.b-iscreating', 1);

        await t.dragBy('.b-grid-subgrid-normal .b-grid-row[data-index=6]', [-300, 0], null, null, null, false, [440, '50%']);
        nameField.defaultValue = String(count++);
        t.selectorCountIs('.b-iscreating', 1);

        await t.dragBy('.b-grid-subgrid-normal .b-grid-row[data-index=6]', [-300, 0], null, null, null, false, [540, '50%']);
        nameField.defaultValue = String(count++);
        t.selectorCountIs('.b-iscreating', 1);

        t.is(schedulerPro.project.eventStore.count, 1, 'Previous event has been cleaned up');
    });

    // https://github.com/bryntum/support/issues/5950
    t.it('Should handle drag created event being resized while task editor is open', async t => {

        await setup({
            startDate  : new Date(2021, 7, 1, 8),
            endDate    : new Date(2021, 7, 20),
            viewPreset : 'dayAndWeek',
            features   : {
                eventDragCreate        : true,
                resourceNonWorkingTime : true
            },

            project : {
                resourcesData : [
                    { id : 1, name : 'foo' }
                ],

                eventsData : [
                    { id : 1, name : 'foo', startDate : new Date(2021, 7, 9), duration : 1, resourceId : 1 }
                ]
            }
        });

        // drag-creating the event in the resource's non-working time
        // (should be allowed since `ignoreResourceCalendar` is set to `true` by default)
        await t.dragBy({
            source : '.b-grid-subgrid-normal .b-grid-row[data-index=0]',
            delta  : [tickSize - 1, 0],
            offset : [tickSize + 1, '50%']
        });

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        const
            { editor }                        = schedulerPro.features.taskEdit,
            { widgetMap }                     = editor,
            { durationField, startDateField } = widgetMap,
            eventRect                         = () => t.rect('.b-sch-event-wrap:contains(New)'),
            editorRect                        = () => t.rect(editor.element),
            waitForCenteredEditor             = async() => {
                await t.waitFor(() => t.samePx(eventRect().left + eventRect().width / 2, editorRect().left + editorRect().width / 2, 2));
                t.pass('Editor is realigned correctly (centered to event)');
            };

        await t.click('.b-sch-event-wrap:contains(New)');
        t.selectorExists('.b-schedulerpro-taskeditor', 'Editor still here');
        t.selectorExists('.b-iscreating', 'Event element still present');

        t.is(durationField.input.value, '1 day');

        await project.commitAsync();

        await t.dragBy({
            source : '.b-sch-event-wrap:contains(New)',
            delta  : [tickSize - 1, 0],
            offset : ['100%-3', '50%']
        });

        await t.waitFor(() => durationField.input.value === '2 days');
        await waitForCenteredEditor();

        await t.dragBy({
            source : '.b-sch-event-wrap:contains(New)',
            delta  : [tickSize - 1, 0]
        });

        await t.waitFor(() => startDateField.value.getDate() === 3);
        await waitForCenteredEditor();

        await t.click('.b-sch-event-wrap:contains(foo)');
        await t.waitForSelectorNotFound('.b-schedulerpro-taskeditor');
    });

    // https://github.com/bryntum/support/issues/5935
    t.it('Should handle drag creating on ModelLinks', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features  : { tree : true, taskEdit : false },
            columns   : [{ type : 'tree', text : 'Name', field : 'name' }],
            resources : [
                { id : 'parent1', name : 'Mike', children : [{ id : 'child1', name : 'Child' }] },
                { id : 'parent2', name : 'Linda' }
            ]
        });

        const
            { resourceStore } = schedulerPro,
            parent2           = resourceStore.getById('parent2'),
            child1            = resourceStore.getById('child1'),
            linkedRecord      = child1.link();

        parent2.appendChild(linkedRecord);
        await project.commitAsync();

        await resourceStore.filter(record => !record.hasLinks);

        await schedulerPro.expandTo(linkedRecord, false);

        await t.dragBy({
            source : '.b-grid-subgrid-normal .b-grid-row[data-index=2]',
            delta  : [tickSize - 1, 0],
            offset : [tickSize + 1, '50%']
        });

        await t.waitForSelectorCount('.b-sch-event:contains(New event)', 1);

        await resourceStore.clearFilters();
        await schedulerPro.expandAll();

        await t.waitForSelectorCount('.b-sch-event:contains(New event)', 2);

        t.pass('Test passed');
    });

    // https://github.com/bryntum/support/issues/5904
    // unfortunately this test does not reproduce the exception (even that it repeats the required steps)
    // the issue seems to be sporadically reproducible with native mouse though
    // (use 6x CPU slow down to increase the chances)
    t.it('Should not throw on drag`n`drop of the drag-created events', async t => {
        await setup({
            features  : { tree : true, taskEdit : false },
            columns   : [{ type : 'tree', text : 'Name', field : 'name' }],
            resources : [
                { id : 'parent1', name : 'Mike' },
                { id : 'parent2', name : 'Linda' }
            ]
        });

        await t.dragBy('.b-grid-subgrid-normal .b-grid-row[data-index=0]', [150, 0], null, null, null, true, [150, '50%']);

        await t.waitFor(300);

        await t.mouseUp();

        await t.waitForSelectorCount('.b-sch-event:contains(New event)', 1);

        await t.dragBy('.b-sch-event:contains(New event)', [0, schedulerPro.rowHeight]);
        await t.dragBy('.b-sch-event:contains(New event)', [0, -schedulerPro.rowHeight]);
    });

    // https://github.com/bryntum/support/issues/6017
    t.it('Should assign `resourceId` to the newly created events', async t => {
        await setup({
            features   : { tree : true, taskEdit : false },
            columns    : [{ type : 'tree', text : 'Name', field : 'name' }],
            eventStore : { singleAssignment : true },
            events     : [],
            resources  : [
                { id : 'parent1', name : 'Mike' },
                { id : 'parent2', name : 'Linda' }
            ]
        });

        await t.dragBy('.b-grid-subgrid-normal .b-grid-row[data-index=0]', [1.5 * tickSize, 0], null, null, null, false, [1.5 * tickSize, '50%']);

        await t.waitForSelectorCount('.b-sch-event:contains(New event)', 1);

        const newEvent = project.eventStore.first;

        t.is(newEvent.resourceId, project.getResourceById('parent1').id, 'Should assign `resourceId` after creation');

        await t.dragBy('.b-sch-event:contains(New event)', [0, schedulerPro.rowHeight]);

        t.is(newEvent.resourceId, project.getResourceById('parent2').id, 'Should re-assign `resourceId` after drag and drop');
    });
});
