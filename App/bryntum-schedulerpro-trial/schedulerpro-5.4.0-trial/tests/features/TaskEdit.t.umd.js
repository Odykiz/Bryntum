
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = await t.getSchedulerProAsync(config);

        schedulerPro.on({
            beforeTaskEditShow({ editor }) {
                editor.widgetMap.tabs.layout.animateCardChange = false;
            }
        });
    }

    t.it('Should get labelWidth from locale', async t => {
        await setup();

        schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.waitForSelector('.b-textfield label');

        t.hasApproxWidth('.b-textfield label', 76, 'Correct label width');
    });

    t.it('Buttons and content element are sized correctly', async t => {
        await setup();

        schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.waitForSelector('.b-textfield label');

        const boxes = ['save', 'cancel', 'delete'].map(ref => {
            return t.rect(`.b-schedulerpro-taskeditor button[data-ref="${ref}Button"]`);
        });

        t.is(boxes[0].width, boxes[1].width, 'Delete button width is ok');
        t.is(boxes[0].width, boxes[2].width, 'Cancel button width is ok');

        const {
            paddingLeft,
            paddingRight,
            paddingTop
        } = window.getComputedStyle(t.query('.b-schedulertaskeditor-content')[0]);

        t.isGreater(parseInt(paddingLeft), 5, 'Has some padding-left on body');
        t.isGreater(parseInt(paddingRight), 5, 'Has some padding-right on body');
        t.isGreater(parseInt(paddingTop), 5, 'Has some padding-top on body');
    });

    t.it('Should show task editor after creating new task with dblClick in empty area', async t => {
        await setup({
            weekStartDay : 1,
            startDate    : new Date(2040, 0, 2),
            endDate      : new Date(2040, 0, 10)
        });

        await t.doubleClick('.b-sch-timeaxis-cell', null, null, null, [10, 10]);

        await t.waitForSelector(schedulerPro.unreleasedEventSelector);
        await t.waitForSelector('.b-schedulerpro-taskeditor');

        t.selectorNotExists('.b-start-date.b-invalid', 'Start date of newly created task should be valid');
        t.selectorNotExists('.b-end-date.b-invalid', 'End date of newly created task should be valid');
    });

    t.it('UI should be locked when Scheduler is readOnly', async t => {
        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'test'
            }],

            eventsData : [{
                id        : 'e1',
                name      : 'Bar',
                startDate : '2018-06-11',
                endDate   : '2018-06-12'
            }],

            assignmentsData : [{
                id       : 'a1',
                resource : 'r1',
                event    : 'e1'
            }]
        });

        await setup({
            readOnly  : true,
            startDate : new Date(2018, 5, 11),
            endDate   : new Date(2018, 5, 25),
            features  : {
                taskEdit : true
            },
            project
        });

        t.chain(
            { dblclick : '.b-sch-event' },

            { waitForSelector : '.b-schedulertaskeditor' },

            // Check first occurrence is in sync with state of Scheduler
            async() => {
                const { editor } = schedulerPro.features.taskEdit;

                // UI must be locked
                const inputs = editor.queryAll(w => w.isField);
                inputs.forEach(input => t.ok(input.readOnly));

                schedulerPro.readOnly = false;
            },

            // Check it unlocks
            async() => {
                const { editor } = schedulerPro.features.taskEdit;

                // UI must be locked
                const inputs = editor.queryAll(w => w.isField);
                inputs.forEach(input => t.notOk(input.readOnly));

                schedulerPro.readOnly = true;
            },

            // Check it locks again
            () => {
                const { editor } = schedulerPro.features.taskEdit;

                // UI must be locked
                const inputs = editor.queryAll(w => w.isField);
                inputs.forEach(input => t.ok(input.readOnly));

                schedulerPro.readOnly = false;
            }
        );
    });

    t.it('Should open editor on press Enter for the task focused', async t => {
        await setup();

        t.chain(
            { click : '.b-sch-event' },
            { type : '[ENTER]' },
            { waitForSelector : '.b-schedulerpro-taskeditor', desc : 'Editor should open on the event selected' }
        );
    });

    t.it('Should remove newly created event if clicking Cancel button', async t => {
        await setup({
            startDate : new Date(2020, 2, 23),
            endDate   : new Date(2020, 2, 27)
        });
        schedulerPro.eventStore.removeAll();

        await t.doubleClick('.b-sch-timeaxis-cell');
        await t.click('.b-button:contains(Cancel)');
        t.selectorNotExists(schedulerPro.unreleasedEventSelector, 'New event removed when cancel is pressed');
    });



    t.it('Should be possible to edit a task not part of the task store', async t => {
        t.mockUrl('sync', (url, params, options) => {
            const
                body          = JSON.parse(options.body),
                { requestId } = body,
                p             = body.events.added[0].$PhantomId;

            return {
                responseText : JSON.stringify({
                    requestId,
                    success : true,
                    tasks   : {
                        rows : [{
                            $PhantomId : p,
                            id         : 'realId'
                        }]
                    },
                    revision : 1
                })
            };
        });

        await setup({
            projectConfig : {
                autoSync         : true,
                validateResponse : false,
                transport        : {
                    sync : {
                        url : 'sync'
                    }
                },

                eventsData      : [],
                assignmentsData : []
            }
        });

        const spy = t.spyOn(schedulerPro.project, 'sync').and.callThrough();

        const newTask = new schedulerPro.eventStore.modelClass({
            startDate    : new Date(2020, 2, 23),
            duration     : 1,
            durationUnit : 'day',
            name         : 'New one'
        });

        await schedulerPro.editEvent(newTask, schedulerPro.resourceStore.first);

        const editor = schedulerPro.features.taskEdit.getEditor();

        t.is(editor.widgetMap.endDateField.value, new Date(2020, 2, 24), 'End date calculated');
        t.ok(editor.isValid, 'Editor valid');

        t.expect(spy).not.toHaveBeenCalled();

        await t.click('[data-ref=saveButton]');

        t.is(schedulerPro.eventStore.count, 1, 'Added to EventStore');
        t.is(schedulerPro.assignmentStore.count, 1, 'Added to AssignmentStore');

        await t.waitFor(() => spy.callsLog.length > 0);
        t.expect(spy).toHaveBeenCalled();
    });

    t.it('Should remove task not part of the task store on cancel', async t => {
        await setup({
            projectConfig : {
                autoSync  : true,
                transport : {
                    sync : {
                        url : 'sync'
                    }
                },
                eventsData      : [],
                assignmentsData : []
            }
        });

        const spy = t.spyOn(schedulerPro.project, 'sync').and.callThrough();

        const newTask = new schedulerPro.eventStore.modelClass({
            startDate    : new Date(2020, 2, 23),
            duration     : 1,
            durationUnit : 'day',
            name         : 'New one'
        });

        await schedulerPro.editEvent(newTask, schedulerPro.resourceStore.first);

        await t.click('[data-ref=cancelButton]');

        t.is(schedulerPro.eventStore.count, 0, 'Not added to EventStore');
        t.is(schedulerPro.assignmentStore.count, 0, 'Not added to AssignmentStore');

        t.expect(spy).not.toHaveBeenCalled();
    });

    // https://github.com/bryntum/support/issues/1506
    t.it('Should not show tooltip while event editor is visible', async t => {
        await setup({
            features : {
                eventTooltip : {
                    hoverDelay : 0
                }
            }
        });

        t.wontFire(schedulerPro.features.eventTooltip.tooltip, 'show');

        await schedulerPro.editEvent(schedulerPro.taskStore.first);

        t.chain(
            { moveCursorTo : [0, 0] },
            { moveCursorTo : '.b-sch-event-wrap:nth-child(3)' }
        );
    });

    t.it('Should set resourcesField´s multiSelect value to false when data uses resourceId', async t => {
        await setup({
            project : {
                eventsData : [{
                    id         : 1,
                    name       : 'foo',
                    resourceId : 1
                }],
                resourcesData : [{
                    id   : 1,
                    name : 'res'
                }]
            }
        });

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        const resourcesField = schedulerPro.features.taskEdit.getEditor().widgetMap.resourcesField;

        t.notOk(resourcesField.multiSelect, 'multiSelect false');
    });

    t.it('Should be possible to show editor multiple times after cancelling', async t => {
        await setup({
            project : {
                eventsData    : [],
                resourcesData : [{
                    id   : 1,
                    name : 'res'
                }]
            }
        });

        await t.doubleClick('.b-sch-timeaxis-cell');
        await t.click('.b-button:contains(Cancel)');
        await t.waitForSelectorNotFound(schedulerPro.unreleasedEventSelector);
        t.selectorNotExists('.b-button:contains(Delete)', 'Delete button not shown for new events');

        await t.doubleClick('.b-sch-timeaxis-cell');
        await t.click('.b-button:contains(Cancel)');
        await t.waitForSelectorNotFound(schedulerPro.unreleasedEventSelector);
    });

    // https://github.com/bryntum/support/issues/1472
    t.it('Should not leak config to other scheduler', async t => {
        await setup({
            height   : 300,
            features : {
                taskEdit : {
                    items : {
                        customTab : {
                            title : 'Custom',
                            cls   : 'custom'
                        }
                    },
                    editorConfig : {
                        autoClose : false
                    }
                }
            }
        });

        const scheduler2 = await t.getSchedulerProAsync({
            height : 300
        });

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await scheduler2.editEvent(scheduler2.eventStore.first);

        t.selectorCountIs('.b-tabpanel-tab.custom', 1, 'Only a single custom tab shown');

        scheduler2.destroy();
    });

    t.it('Should clean up delete confirmation popup if destroyed while it is shown', async t => {
        await setup();

        t.chain(
            { dblClick : '.b-sch-event' },
            { click : '.b-button:contains(Delete)' },
            () => {
                schedulerPro.destroy();
                t.selectorNotExists('.b-messagedialog', 'Delete confirmation dialog should be destroyed');
            }
        );
    });

    t.it('Should fire correct events', async t => {
        await setup({
            features : {
                taskEdit : {
                    confirmDelete : false
                }
            }
        });

        t.firesOnce(schedulerPro, 'beforeEventSave');
        t.firesOnce(schedulerPro, 'afterEventSave');
        t.firesOnce(schedulerPro, 'beforeEventDelete');
        t.firesOnce(schedulerPro, 'beforeTaskSave');
        t.firesOnce(schedulerPro, 'afterTaskSave');
        t.firesOnce(schedulerPro, 'beforeTaskDelete');

        let deletedEventCount = 0;

        schedulerPro.on({
            beforeEventSave : ({ eventRecord }) => {
                t.is(eventRecord.id, 1, 'eventRecord set');
            },

            afterEventSave : ({ eventRecord }) => {
                t.is(eventRecord.id, 1, 'eventRecord set');
            },

            beforeEventDelete : ({ eventRecord }) => {
                t.is(eventRecord.id, 1, 'eventRecord set');
                deletedEventCount++;
            },

            beforeTaskSave : ({ taskRecord }) => {
                t.is(taskRecord.id, 1, 'taskRecord set');
            },

            afterTaskSave : ({ taskRecord }) => {
                t.is(taskRecord.id, 1, 'taskRecord set');
            },

            beforeTaskDelete : ({ taskRecord }) => {
                t.is(taskRecord.id, 1, 'taskRecord set');
                deletedEventCount++;
            }
        });

        t.chain(
            { dblClick : '.b-sch-event' },
            { click : '.b-button:contains(Save)' },

            { dblClick : '.b-sch-event' },
            { click : '.b-button:contains(Delete)' },
            { waitFor : () => deletedEventCount === 2 },
            () => {
                schedulerPro.destroy();
                t.selectorNotExists('.b-messagedialog', 'Delete confirmation dialog should be destroyed');
            }
        );
    });

    t.it('Should trigger lifecycle events', async t => {
        await setup({
            features : {
                taskEdit : true
            }
        });

        const event = schedulerPro.eventStore.getById(3);

        t.firesOk({
            observable : schedulerPro,
            events     : {
                beforeTaskEditShow : 4,
                afterTaskEdit      : 4,
                afterTaskSave      : 2
            }
        });

        await schedulerPro.editEvent(event);

        await t.click('[data-ref="saveButton"]');

        await schedulerPro.editEvent(event);

        await t.click('[data-ref="cancelButton"]');

        event.name = '';

        await schedulerPro.editEvent(event);

        await t.click('[data-ref="saveButton"]');

        await t.type('[data-ref="nameField"] input', 'New name');

        await t.click('[data-ref="saveButton"]');

        await schedulerPro.editEvent(event);

        await t.click('[data-ref="deleteButton"]');

        await t.click('[data-ref="okButton"]');
    });

    if (t.browser.firefox) {
        // https://github.com/bryntum/support/issues/1611
        t.it('FireFox: Should not be draggable when field is focused', async t => {
            await setup();

            await schedulerPro.editEvent(schedulerPro.eventStore.first);

            await t.click('input');

            t.selectorNotExists('[draggable]', 'Not draggable');

            await t.click('.b-schedulertaskeditor-header');

            t.selectorExists('[draggable]', 'Draggable');
        });
    }

    t.it('Should have height on bbar button greater than icon button', async t => {
        await setup();

        t.chain(
            { dblclick : '.b-sch-event' },
            { waitForSelector : '.b-schedulerpro-taskeditor' },
            { click : '.b-predecessors-tab' },
            { waitForSelector : '.b-compact-bbar' },
            () => {
                t.ok(t.rect('.b-add-button').height > t.rect('.b-icon-add').height, 'Add predecessor button has height greater than the icon button');
                t.ok(t.rect('.b-remove-button').height > t.rect('.b-icon-add').height, 'Remove predecessor button has height greater than the icon button');
            }
        );
    });

    t.it('Should not show delete button', async t => {
        await setup({
            features : {
                taskEdit : {
                    editorConfig : {
                        bbar : {
                            items : {
                                deleteButton : false
                            }
                        }
                    }
                }
            }
        });

        t.chain(
            { dblclick : '.b-sch-event' },
            { waitForSelector : '.b-schedulerpro-taskeditor' },
            () => {
                t.selectorNotExists('.b-button[data-ref="deleteButton"]', 'Delete button is not present');
            }
        );
    });

    t.it('Should be able to customize grid columns', async t => {
        await setup({
            dependencyIdField : 'id',
            features          : {
                taskEdit : {
                    items : {
                        predecessorsTab : {
                            items : {
                                grid : {
                                    columns : {
                                        data : {
                                            name : {
                                                text : '-Linked'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        successorsTab : {
                            items : {
                                grid : {
                                    columns : {
                                        data : {
                                            name : {
                                                text : 'Linked-'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        await t.doubleClick('.b-sch-event');

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        await t.click('.b-predecessors-tab');

        t.selectorExists('[data-column=fromEvent]:contains(-Linked)', 'Column header customized');

        await t.click('.b-successors-tab');

        t.selectorExists('[data-column=toEvent]:contains(Linked-)', 'Column header customized');
    });

    // https://github.com/bryntum/support/issues/2488
    t.it('Tabs should have correct height when change hidden state on beforeTaskEditShow', async t => {
        const
            tabHeight = t.bowser.firefox ? 314 : 311,
            threshold = t.bowser.firefox ? 6 : 3;

        await setup();

        schedulerPro.on({
            beforeTaskEditShow({ editor }) {
                editor.widgetMap.generalTab.hidden = false;
                editor.widgetMap.predecessorsTab.hidden = false;
                editor.widgetMap.successorsTab.hidden = false;
                editor.widgetMap.advancedTab.hidden = false;
                editor.widgetMap.notesTab.hidden = false;
            },
            once : true
        });

        t.chain(
            { dblclick : '.b-sch-event' },
            { waitForSelector : '.b-schedulerpro-taskeditor' },
            { click : '.b-tabpanel-tab.b-general-tab' },
            { waitForSelector : '.b-tabpanel-body' },
            async() => t.hasApproxHeight('.b-tabpanel-body', tabHeight, threshold, 'General tab has correct height'),
            { click : '.b-popup-close' },

            { dblclick : '.b-sch-event' },
            { waitForSelector : '.b-schedulerpro-taskeditor' },
            { click : '.b-tabpanel-tab.b-predecessors-tab' },
            { waitForAnimations : null },
            async() => t.hasApproxHeight('.b-tabpanel-body', tabHeight, threshold, 'Predecessors tab has correct height'),
            { click : '.b-popup-close' },

            { dblclick : '.b-sch-event' },
            { waitForSelector : '.b-schedulerpro-taskeditor' },
            { click : '.b-tabpanel-tab.b-successors-tab' },
            { waitForAnimations : null },
            async() => t.hasApproxHeight('.b-tabpanel-body', tabHeight, threshold, 'Successors tab has correct height'),
            { click : '.b-popup-close' },

            { dblclick : '.b-sch-event' },
            { waitForSelector : '.b-schedulerpro-taskeditor' },
            { click : '.b-icon-advanced' },
            { waitForAnimations : null },
            async() => t.hasApproxHeight('.b-tabpanel-body', tabHeight, threshold, 'Advanced tab has correct height'),
            { click : '.b-popup-close' },

            { dblclick : '.b-sch-event' },
            { waitForSelector : '.b-schedulerpro-taskeditor' },
            { click : '.b-tabpanel-tab.b-notes-tab' },
            { waitForAnimations : null },
            () => t.hasApproxHeight('.b-tabpanel-body', tabHeight, threshold, 'Notes tab has correct height')
        );
    });

    // https://github.com/bryntum/support/issues/2493
    t.it('New tab should have correct height when it has more items than general tab', async t => {
        await setup({
            features : {
                taskEdit : {
                    items : {
                        testTab : {
                            title  : 'Test',
                            weight : 100,
                            items  : {
                                field1  : { type : 'text' },
                                field2  : { type : 'text' },
                                field3  : { type : 'text' },
                                field4  : { type : 'text' },
                                field5  : { type : 'text' },
                                field6  : { type : 'text' },
                                field7  : { type : 'text' },
                                field8  : { type : 'text' },
                                field9  : { type : 'text' },
                                field10 : { type : 'text' }
                            }
                        }
                    }
                }
            }
        });

        t.chain(
            { dblclick : '.b-sch-event' },
            { waitForSelector : '.b-schedulerpro-taskeditor' },
            { click : '.b-tabpanel-tab[data-item-index=1]' },
            { waitForSelector : '.b-tabpanel-body' },
            () => {
                // FireFox renders TextField input element differently depending on DPI Scale with the same CSS
                // Take in account real TextField height for test
                const fieldHeight = schedulerPro.features.taskEdit.editor.widgetMap.testTab.widgetMap.field1.element.getBoundingClientRect().height;
                t.hasApproxHeight('.b-tabpanel-body', fieldHeight * 10 + 107, 3, 'New tab has correct height');
            }
        );
    });

    // https://github.com/bryntum/support/issues/2746
    t.it('Should select next row after deleting a predecessor', async t => {
        await setup();

        await t.doubleClick('.b-sch-event');
        await t.click('.b-predecessors-tab.b-tab');
        await t.click('.b-add-button');
        await t.click('.b-add-button');
        await t.click('.b-add-button');

        t.selectorCountIs('.b-predecessors-tab .b-grid-cell:contains(Finish)', 3, '3 predecessors added');

        await t.click('.b-remove-button');
        await t.click('.b-remove-button');
        await t.click('.b-remove-button');

        t.selectorCountIs('.b-predecessors-tab .b-grid-cell:contains(Finish)', 0, 'All 3 predecessors removed');
    });

    // https://github.com/bryntum/support/issues/2789
    t.it('Should get correct width when using the SchedulerPro task editor', async t => {
        await setup();

        await t.doubleClick('.b-sch-event');

        await t.waitForSelector('.b-schedulertaskeditor');

        t.hasApproxWidth('.b-schedulertaskeditor', 476, 'Correct width');
    });

    // https://github.com/bryntum/support/issues/2789
    t.it('Should get correct width when using the Gantt task editor', async t => {
        await setup({
            features : {
                taskEdit : {
                    editorClass : GanttTaskEditor
                }
            }
        });

        await t.doubleClick('.b-sch-event');

        await t.waitForSelector('.b-gantttaskeditor');

        t.hasApproxWidth('.b-gantttaskeditor', 616, 'Correct width');
    });

    // https://github.com/bryntum/support/issues/3075
    t.it('Should not show delete button for new events', async t => {
        await setup();

        await t.doubleClick('[data-id="4"] .b-sch-timeaxis-cell', null, null, null, [150, 10]);

        await t.waitFor(() => schedulerPro.features.taskEdit.editor.containsFocus);

        t.elementIsVisible('[data-ref="saveButton"]', 'Save button shown');
        t.elementIsVisible('[data-ref="cancelButton"]', 'Cancel button shown');
        t.elementIsNotVisible('[data-ref="deleteButton"]', 'Delete button not shown');

        const { count } = schedulerPro.eventStore;

        await t.click('[data-ref="cancelButton"]');

        t.is(schedulerPro.eventStore.count, count - 1, 'Newly created event removed on cancel');
    });

    t.it('Should be possible to define a type on editorConfig of TaskEdit feature', async t => {
        class MyTaskEditor extends SchedulerTaskEditor {
            // Factoryable type name
            static get type() {
                return 'mytaskeditor';
            }

            static get $name() {
                return 'MyTaskEditor';
            }

            get isMyTaskEditor() {
                return true;
            }
        }

        MyTaskEditor.initClass();

        await setup({
            features : {
                taskEdit : {
                    editorConfig : {
                        type : 'mytaskeditor'
                    }
                }
            }
        });

        const task = schedulerPro.taskStore.getById(1);
        await schedulerPro.editEvent(task);
        await t.waitForElementTop('.b-schedulerpro-taskeditor');

        const { editor } = schedulerPro.features.taskEdit;
        t.is(editor.type, 'mytaskeditor');
        t.ok(editor.isMyTaskEditor);
    });

    t.it('Stores should report added records correctly', async t => {
        await setup({
            weekStartDay : 1,
            features     : {
                taskEdit : true
            }
        });

        await t.dragBy({
            source : '.b-grid-row[data-id="2"] .b-sch-timeaxis-cell',
            offset : [100, '50%'],
            delta  : [60, 0]
        });

        await t.waitForSelector('.b-schedulerpro-taskeditor input:focus');

        await t.type('input:focus', 'Foo[ENTER]');

        await schedulerPro.project.commitAsync();

        await t.waitFor(() => schedulerPro.assignmentStore.added.count === 1);

        t.is(schedulerPro.assignmentStore.added.count, 1, 'Single assignment added');
        t.is(schedulerPro.eventStore.added.count, 1, 'Single event added');
        t.is(schedulerPro.assignmentStore.added.values[0], schedulerPro.assignmentStore.last, 'Assignment instance is ok');
        t.is(schedulerPro.eventStore.added.values[0], schedulerPro.eventStore.last, 'Event instance is ok');

        const
            { changes } = schedulerPro.project,
            assignment  = schedulerPro.assignmentStore.last,
            event       = schedulerPro.eventStore.last;

        t.is(changes.assignments?.added.length, 1, 'Assignment is in changeset');
        t.is(changes.assignments?.added[0].$PhantomId, assignment.id, 'Assignment id is ok');
        t.is(changes.assignments?.added[0].eventId, event.id, 'Assignment event id is ok');
        t.is(changes.assignments?.added[0].resourceId, 2, 'Assignment resource id is ok');
    });

    // https://github.com/bryntum/support/issues/3835
    t.it('Should not create new resource store for resource combo after editing project related data', async t => {
        await setup();

        await t.doubleClick('[data-event-id="1"]');

        const comboStore = schedulerPro.features.taskEdit.editor.widgetMap.resourcesField.store;

        await t.click('[data-ref="resourcesField"] .b-icon-picker');
        await t.click('.b-list-item:contains(Resource 2)');

        await schedulerPro.project.commitAsync();

        await t.waitFor(() => schedulerPro.features.taskEdit.editor.widgetMap.resourcesField.store === comboStore);
        t.pass('Store instance is the same after edit');
    });

    // https://github.com/bryntum/support/issues/665
    t.it('Should prevent editing readOnly event', async t => {
        await setup();

        schedulerPro.eventStore.first.readOnly = true;

        t.wontFire(schedulerPro, 'beforeTaskEdit');

        await t.doubleClick('[data-event-id="1"]');
    });

    t.it('Should fire 1 update event on assignmentStore when changing resource for single assignment', async t => {
        await setup({
            startDate : new Date(2022, 1, 1),
            endDate   : new Date(2022, 1, 10),
            project   : {
                resourcesData : [
                    { id : 1, name : 'Resource' },
                    { id : 2, name : 'OtherResource' }
                ],
                eventsData : [
                    { id : 1, resourceId : 1, startDate : new Date(2022, 1, 1), duration : 3 }
                ]
            }
        });

        await t.doubleClick('[data-event-id]');

        t.firesOnce(schedulerPro.assignmentStore, 'update');
        t.firesOnce(schedulerPro.eventStore, 'update');
        t.wontFire(schedulerPro.assignmentStore, 'add');
        t.wontFire(schedulerPro.assignmentStore, 'remove');

        await t.click('[data-ref="resourcesField"] .b-icon-picker');
        await t.click('.b-list-item:contains(Other)');

        await schedulerPro.project.commitAsync();
    });

    t.it('Should fire no events when opening taskeditor and closing it without making changes', async t => {
        await setup({
            startDate : new Date(2022, 1, 1),
            endDate   : new Date(2022, 1, 10),
            project   : {
                resourcesData : [
                    { id : 1, name : 'Resource' },
                    { id : 2, name : 'OtherResource' }
                ],
                eventsData : [
                    { id : 1, resourceId : 1, startDate : new Date(2022, 1, 1), duration : 3 }
                ]
            }
        });


        await schedulerPro.project.commitAsync();

        t.wontFire(schedulerPro.eventStore, 'change');
        t.wontFire(schedulerPro.eventStore, 'update');
        t.wontFire(schedulerPro.eventStore, 'beforeupdate');
        t.wontFire(schedulerPro.assignmentStore, 'change');
        t.wontFire(schedulerPro.assignmentStore, 'update');
        t.wontFire(schedulerPro.assignmentStore, 'beforeupdate');
        await t.doubleClick('[data-event-id]');
        await t.type(null, '[ESCAPE]');

        await schedulerPro.project.commitAsync();
    });

    t.it('Should handle resourceField being configured out', async t => {
        await setup({
            startDate : new Date(2022, 1, 1),
            endDate   : new Date(2022, 1, 10),
            project   : {
                resourcesData : [
                    { id : 1, name : 'Resource' },
                    { id : 2, name : 'OtherResource' }
                ],
                eventsData : [
                    { id : 1, name : 'foo', resourceId : 1, startDate : new Date(2022, 1, 1), duration : 3 }
                ]
            },
            features : {
                taskEdit : {
                    items : {
                        generalTab : {
                            items : {
                                resourcesField : null
                            }
                        }
                    }
                }
            }
        });

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.waitForSelector('.b-schedulerpro-taskeditor');
    });

    // https://github.com/bryntum/support/issues/4049
    t.it('Should fire beforeEventEdit when beforeTaskEdit fires', async t => {
        await setup({
            startDate : new Date(2022, 1, 1),
            endDate   : new Date(2022, 1, 10),
            project   : {
                resourcesData : [
                    { id : 1, name : 'Resource' },
                    { id : 2, name : 'OtherResource' }
                ],
                eventsData : [
                    { id : 1, name : 'foo', resourceId : 1, startDate : new Date(2022, 1, 1), duration : 3 }
                ]
            }
        });

        await schedulerPro.project.await('dataReady');
        t.firesOnce(schedulerPro, 'beforeEventEdit');
        await t.doubleClick('.b-sch-event');
        await t.click('[data-ref=cancelButton]');
    });

    // https://github.com/bryntum/support/issues/4421
    t.it('Should allow async beforeTaskSave', async t => {
        await setup({
            listeners : {
                async beforeTaskSave() {
                    await AsyncHelper.sleep(100);
                }
            }
        });

        t.firesOnce(schedulerPro, 'beforeTaskSave');

        await t.doubleClick('$event=1');

        await t.type('[data-ref=nameField] input', 'Hello[ENTER]');

        t.ok(schedulerPro.features.taskEdit.isEditing, 'Still editing');

        await t.waitForEvent(schedulerPro, 'afterTaskSave');

        t.pass('Finished editing after delay');
    });

    // https://github.com/bryntum/support/issues/4421
    t.it('Should allow aborting save in async beforeTaskSave', async t => {
        await setup({
            listeners : {
                async beforeTaskSave() {
                    await AsyncHelper.sleep(50);
                    return false;
                }
            }
        });

        t.firesOnce(schedulerPro, 'beforeTaskSave');
        t.wontFire(schedulerPro, 'afterTaskSave');

        await t.doubleClick('$event=1');

        await t.type('[data-ref=nameField] input', 'Hello[ENTER]');

        // Wait for hide animation etc to not happen
        t.waitFor(400);

        t.ok(schedulerPro.features.taskEdit.isEditing, 'Still editing');
    });

    t.it('Should allow async beforeTaskDelete', async t => {
        await setup({
            features : {
                taskEdit : {
                    confirmDelete : false
                }
            },
            listeners : {
                async beforeTaskDelete() {
                    await AsyncHelper.sleep(100);
                }
            }
        });

        t.firesOnce(schedulerPro, 'beforeTaskDelete');

        await t.doubleClick('$event=1');

        await t.click('[data-ref=deleteButton]');

        t.ok(schedulerPro.taskStore.getById(1), 'Not removed');

        await t.waitForEvent(schedulerPro, 'afterTaskEdit');

        t.notOk(schedulerPro.taskStore.getById(1), 'Removed after delay');
    });

    t.it('Should allow async beforeTaskEdit', async t => {
        await setup({
            listeners : {
                async beforeTaskEdit() {
                    await AsyncHelper.sleep(100);
                }
            }
        });

        t.firesOnce(schedulerPro, 'beforeTaskEdit');

        await t.doubleClick('$event=1');

        t.selectorNotExists('.b-schedulerpro-taskeditor', 'Editor not shown yet');

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        t.pass('Editor shown after delay');
    });

    // https://github.com/bryntum/support/issues/4445
    t.it('Should allow to hide without cancelling changes', async t => {
        let save = 0;

        await setup({
            features : {
                taskEdit : {
                    blurAction : 'save'
                }
            },
            onAfterTaskSave() {
                save++;
            }
        });

        // Should fire 'AfterTaskSave' once when type, click Enter and then click outside
        await t.doubleClick('$event=1');
        await t.waitForSelector('.b-schedulerpro-taskeditor');
        const { editor } = schedulerPro.features.taskEdit;
        t.wontFire(editor, 'cancel');
        t.firesAtLeastNTimes(editor, 'save', 3);

        await t.type('input:focus', 'Foo[ENTER]', null, null, null, true);
        await t.click([0, 0]);
        await t.waitForSelector('.b-sch-event:contains(Foo)');
        await t.waitFor(() => save === 1);
        await t.is(save, 1, 'AfterTaskSave event fired');

        // Should fire 'AfterTaskSave' once when type and click Enter
        save = 0;
        await t.doubleClick('$event=1');
        await t.waitForSelector('.b-schedulerpro-taskeditor');
        await t.type('input:focus', 'Bar[ENTER]', null, null, null, true);
        await t.waitForSelector('.b-sch-event:contains(Bar)');
        await t.waitFor(() => save === 1);
        await t.is(save, 1, 'AfterTaskSave event fired');

        // Should fire 'AfterTaskSave' once when type and click outside
        save = 0;
        await t.doubleClick('$event=1');
        await t.waitForSelector('.b-schedulerpro-taskeditor');
        await t.type('input:focus', 'Yay', null, null, null, true);
        await t.click([0, 0]);
        await t.waitForSelector('.b-sch-event:contains(Yay)');
        await t.waitFor(() => save === 1);
        await t.is(save, 1, 'AfterTaskSave event fired');

    });

    // https://github.com/bryntum/support/issues/4439
    t.it('Should fire taskEditCanceled event when canceling', async t => {
        await setup({
            startDate : new Date(2020, 2, 23),
            endDate   : new Date(2020, 2, 27),
            listeners : {
                taskEditCanceled({ editor, taskRecord, source }) {
                    t.isInstanceOf(editor, TaskEditorBase, 'Correct editor argument');
                    t.isInstanceOf(taskRecord, EventModel, 'Correct taskRecord argument');
                    t.isInstanceOf(source, SchedulerPro, 'Correct source argument');
                }
            }
        });

        await t.willFireNTimes(schedulerPro, 'taskEditCanceled', 2);

        await t.doubleClick('.b-sch-event');
        await t.click('[data-ref=cancelButton]');

        schedulerPro.eventStore.removeAll();
        await t.doubleClick('.b-timeaxis-cell');
        await t.click('[data-ref=cancelButton]');
    });

    // https://github.com/bryntum/support/issues/4503
    t.it('Should not break autoSync if returning false from beforeTaskEdit event', async t => {
        await setup({
            listeners : {
                beforeTaskEdit() {
                    return false;
                }
            }
        });

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        t.is(schedulerPro.project.autoSyncSuspendCounter, 0, 'autoSync not suspended');
    });

    // https://github.com/bryntum/support/issues/4749
    t.it('Should report new assignment if task editor is disabled', async t => {
        await setup({
            features : {
                taskEdit : false
            }
        });

        await t.dragBy({
            source : '[data-id="3"] .b-sch-timeaxis-cell',
            offset : [150, '50%'],
            delta  : [100, 0]
        });

        await schedulerPro.project.commitAsync();

        const { changes } = schedulerPro.project;

        t.ok('assignments' in changes, 'Assignment record in changes');
        t.is(changes.assignments.added[0].$PhantomId, schedulerPro.assignmentStore.last.id, 'Assignment id is ok');
    });

    t.it('Should open all combos, datefields and timefields in all themes and all locales', async t => {
        await setup({});

        let editor;

        const activateTriggers = async(tab) => {
            editor.widgetMap.tabs.activeTab = tab;

            const elements = t.query('.b-pickerfield:not(.b-timefield):visible');
            for (const trigger of elements) {
                const field = bryntum.fromElement(trigger);

                // Open dropdown list
                field.showPicker();
                // Close dropdown list
                field.hidePicker();
            }
        };

        await t.forEveryThemeAndLocale(async() => {
            await schedulerPro.editEvent(schedulerPro.eventStore.first);
            editor = schedulerPro.features.taskEdit.editor;
            await t.waitForSelector('.b-schedulertaskeditor');

            await activateTriggers(editor.widgetMap.generalTab);
            await activateTriggers(editor.widgetMap.advancedTab);

            editor.close();
        });

    });

    t.it('The taskColor field should be hidden by default', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        await schedulerPro.editEvent(schedulerPro.events[0]);
        await t.waitForSelector('.b-schedulertaskeditor');
        t.selectorNotExists('.b-colorfield', 'Colorfield not rendered');
    });

    t.it('The eventColor field should basically work', async t => {
        schedulerPro = await t.getSchedulerProAsync({ showTaskColorPickers : true });

        await schedulerPro.editEvent(schedulerPro.events[0]);
        await t.waitForSelector('.b-schedulertaskeditor');
        t.selectorExists('.b-colorfield', 'Colorfield rendered');

        let [box] = t.query('.b-colorfield .b-colorbox');
        t.is(window.getComputedStyle(box).backgroundColor, 'rgba(0, 0, 0, 0)', 'Box has no background initially');

        await t.click('.b-colorfield');
        const
            [firstColorElement] = t.query('.b-eventcolorpicker .b-list-item'),
            firstColor          = window.getComputedStyle(firstColorElement).backgroundColor,
            firstColorName      = firstColorElement.dataset.id;

        await t.click(firstColorElement);
        t.is(window.getComputedStyle(box).backgroundColor, firstColor, 'Element has correct background color');

        await t.click('[data-ref="saveButton"]');
        t.is(schedulerPro.events[0].eventColor, firstColorName, 'Record has correct eventColor');

        // Opening editor again, on different event
        await schedulerPro.editEvent(schedulerPro.events[1]);
        await t.waitForSelector('.b-schedulertaskeditor');
        [box] = t.query('.b-colorfield .b-colorbox');
        t.is(window.getComputedStyle(box).backgroundColor, 'rgba(0, 0, 0, 0)', 'Element has no background initially');

        // Opening editor again, on first event
        await schedulerPro.editEvent(schedulerPro.events[0]);
        await t.waitForSelector('.b-schedulertaskeditor');
        [box] = t.query('.b-colorfield .b-colorbox');
        t.is(window.getComputedStyle(box).backgroundColor, firstColor, 'Element has background from record initially');
    });

    // https://github.com/bryntum/support/issues/6521
    t.it('Should handle event being moved off-screen using editor', async t => {
        await setup({
            startDate : new Date(2020, 2, 22),
            endDate   : new Date(2020, 2, 25)
        });

        await t.doubleClick('.b-sch-event');
        await t.click('.b-startdatefield .b-icon-angle-right');
        await t.click('.b-startdatefield .b-icon-angle-right');
        await t.click('.b-startdatefield .b-icon-angle-right');
        await t.click('.b-startdatefield .b-icon-angle-right');
        await t.click('.b-startdatefield .b-icon-angle-right');

        await t.click('.b-icon-clock-live');
        await t.type({
            target        : 'input:focus',
            text          : '1',
            clearExisting : true
        });
        await t.type({
            text : '1'
        });
        await t.type({
            text : '1'
        });
        await t.type({
            text : '1'
        });

        // No way to synthesize real scroll event, fake it
        schedulerPro.features.taskEdit.editor.doHideOrRealign({ target : document.activeElement, isTrusted : true });

        await t.waitForAnimationFrame();
        t.selectorExists('.b-schedulertaskeditor');
    });

    // https://github.com/bryntum/support/issues/6582
    t.it('Should not update event when calling commitAsync() after initial load', async t => {
        await setup({
            startDate  : '2023-04-01T22:00:00',
            endDate    : '2023-05-01T22:00:00',
            viewPreset : 'dayAndWeek',
            project    : {
                calendar                                           : 'calendar',
                skipNonWorkingTimeInDurationWhenSchedulingManually : false
            },

            calendars : [{
                id        : 'calendar',
                name      : 'Calendar',
                intervals : [
                    {
                        recurrentStartDate : 'on Sun at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    },
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Sun at 0:00',
                        isWorking          : false
                    }
                ]
            }],

            resources : [{
                id   : 1,
                name : 'Name'
            }],

            events : [{
                id                : 1,
                startDate         : '2023-04-01T22:00:00',
                endDate           : '2023-04-08T22:00:00',
                manuallyScheduled : true,
                name              : 'Modeling'
            }],

            assignments : [{
                id         : 2,
                resourceId : 1,
                eventId    : 1
            }]
        });

        const initialRect = t.rect('.b-sch-event');

        schedulerPro.project.commitAsync();

        await t.waitForAnimationFrame();

        t.is(t.rect('.b-sch-event').width, initialRect.width, 'No change after commitAsync');
    });

    t.it('Should not crash when attempted to edit the "phantom", already removed event', async t => {
        await setup({
            weekStartDay : 1,
            startDate    : new Date(2040, 0, 2),
            endDate      : new Date(2040, 0, 10)
        });

        await t.doubleClick('.b-sch-timeaxis-cell', null, null, null, [10, 10]);

        await t.waitForSelector(schedulerPro.unreleasedEventSelector);
        await t.waitForSelector('.b-schedulerpro-taskeditor');

        // clicking the phantom, newly added event again, which should open a task editor for it
        // this however, triggers blur in task editor and this phantom removal
        // so later the task editor is attempted to be opened on the event which is not in the store/graph
        await t.doubleClick('.b-sch-dirty-new');

        await t.waitFor(50);
    });

    // https://github.com/bryntum/support/issues/6749
    t.it('Editor forms should scroll when they overflow', async t => {
        await setup({
            resources : (() => {
                const result = [];

                for (let i = 0; i < 20; i++) {
                    result.push({
                        name : `Resource ${i + 1}`,
                        id   : i + 1
                    });
                }
                return result;
            })()
        });

        await t.doubleClick('.b-sch-event-wrap');

        await t.waitFor(() => schedulerPro.features.taskEdit.editor?.containsFocus);

        await t.click('[data-ref="resourcesField"] .b-fieldtrigger[data-ref="expand"]');

        for (let i = 0; i < 20; i++) {
            await t.moveMouseTo(`.b-list-item[data-index=${i}]`);
            await t.waitForAnimations();
            await t.click(`.b-list-item[data-index=${i}]`);
        }

        await t.type(null, '[ESCAPE]');

        await t.click('[data-ref="effortField"] input');

        await t.click('button[data-ref="saveButton"]');
    });
});
