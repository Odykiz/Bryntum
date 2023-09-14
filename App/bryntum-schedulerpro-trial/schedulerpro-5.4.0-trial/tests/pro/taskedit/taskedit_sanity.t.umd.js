
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    t.it('Should not allow saving if editor state is invalid', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        t.chain(
            { dblClick : '.b-sch-event' },
            { click : '.b-datefield' },

            async() => t.wontFire(schedulerPro.features.taskEdit.getEditor(), 'hide'),

            { type : 'blargh[ENTER]', clearExisting : true }
        );
    });

    t.it('Should not show auto generated ids in predecessor tab', async t => {
        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'Buldozer'
            }],

            eventsData : [{
                id           : 'e1',
                name         : 'Foo',
                startDate    : new Date(2019, 0, 1),
                duration     : 10,
                durationUnit : 'd'
            }],

            dependenciesData : [],

            assignmentsData : [{
                id       : 'a1',
                resource : 'r1',
                event    : 'e1'
            }, {
                resource : 'r1',
                event    : 'e2',
                id       : 'a2'
            }]
        });

        project.eventStore.add({
            startDate    : new Date(2019, 0, 1),
            duration     : 10,
            durationUnit : 'd'
        })[0].assign(project.resourceStore.first);

        schedulerPro = new SchedulerPro({
            project,
            appendTo              : document.body,
            minHeight             : '20em',
            startDate             : new Date(2019, 0, 1),
            endDate               : new Date(2019, 0, 31),
            viewPreset            : 'weekAndMonth',
            enableEventAnimations : false,

            columns : [
                { text : 'Name', field : 'name', width : 130 }
            ]
        });

        project.dependencyStore.add({
            fromEvent : project.eventStore.first,
            toEvent   : project.eventStore.last
        });

        t.chain(
            { dblClick : '.b-sch-event:contains(Foo)' },
            { click : '.b-successors-tab' },

            { waitForSelector : '.b-grid-cell:empty', desc : 'no name seen for unnamed task' }
        );
    });

    t.it('Should undo changes', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            assignmentsData : [
                { id : 1, resource : 5, event : 1 },
                { id : 2, resource : 3, event : 2 }
            ]
        });

        t.chain(
            { dblclick : '[data-event-id="1"]' },

            { waitForSelector : '.b-sch-dependency' },

            {
                type   : '[DOWN][UP][ENTER][ESC]',
                target : '[name="resources"]',
                desc   : 'Expand picker, select first resource, close picker'
            },

            {
                waitFor : () => t.query(`${schedulerPro.unreleasedEventSelector}[data-event-id="1"]`).length === 2,
                desc    : 'Wait for 2nd event to appear'
            },

            {
                type   : '[ESC]',
                target : '[name="resources"]',
                desc   : 'Close picker cancelling editor'
            },

            {
                waitFor : () => t.query(`${schedulerPro.unreleasedEventSelector}[data-event-id="1"]`).length === 1,
                desc    : 'Wait for 2nd event to disappear'
            },

            {
                waitFor : () => t.query(`.b-sch-dependency`).length === 1,
                desc    : 'Single dependency left'
            },

            async() => {
                t.selectorCountIs(schedulerPro.unreleasedEventSelector, 2, '2 rendered events left');
            }
        );
    });

    t.it('Should forward value of durationDisplayPrecision to child grids + durationField', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            assignmentsData : [
                { id : 1, resource : 5, event : 1 },
                { id : 2, resource : 3, event : 2 }
            ]
        });

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        const { durationField, predecessorsTab, successorsTab } = schedulerPro.features.taskEdit.getEditor().widgetMap;

        t.is(durationField.decimalPrecision, 1, 'decimalPrecision set correctly');
        t.is(predecessorsTab.grid.durationDisplayPrecision, 1, 'decimalPrecision set correctly');
        t.is(successorsTab.grid.durationDisplayPrecision, 1, 'decimalPrecision set correctly');
    });

    t.it('Should save and cancel changes', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        const event = schedulerPro.eventStore.getById(2);

        t.chain(
            { dblclick : '[data-event-id="2"]' },

            { click : '.b-end-date .b-datefield .b-icon-angle-left' },

            { click : 'button:contains(Cancel)' },

            { waitForSelectorNotFound : '.b-taskeditor-editing' },

            async() => {
                t.is(event.duration, 3, 'Change cancelled');
            },

            { dblclick : '[data-event-id="2"]' },

            { click : '.b-end-date .b-datefield .b-icon-angle-left' },

            { click : 'button:contains(Save)' },

            { waitForSelectorNotFound : '.b-taskeditor-editing' },

            async() => {
                t.is(event.duration, 2, 'Change applied');
            }
        );
    });

    t.it('Should not crash if clearing start date field', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            weekStartDay : 1,
            eventsData   : [
                {
                    id        : 1,
                    startDate : '2020-03-24',
                    duration  : 2
                }
            ]
        });

        t.chain(
            { dblclick : '[data-event-id="1"]' },

            { click : '.b-start-date .b-datefield input' },

            { type : '[TAB]', clearExisting : true },

            () => t.pass('No crash')
        );
    });

    t.it('Should be possible to save partial task data', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            weekStartDay : 1,
            eventsData   : [
                {
                    id        : 1,
                    name      : 'foo',
                    startDate : '2020-03-24',
                    duration  : 2
                }
            ]
        });

        t.chain(
            { dblclick : '[data-event-id="1"]' },

            { click : '.b-end-date .b-datefield input' },

            { type : '[BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE][TAB]' },

            { waitForSelectorNotFound : schedulerPro.unreleasedEventSelector },

            { type : '[ENTER]' },

            { waitForSelectorNotFound : '.b-schedulerpro-taskeditor' },

            () => {
                t.selectorNotExists(schedulerPro.unreleasedEventSelector);
            }
        );
    });

    t.it('Should be able to create', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            enableEventAnimations : true,
            transitionDuration    : 200
        });

        const count = schedulerPro.eventStore.count;

        t.chain(
            { dblclick : '[data-event-id="2"]' },

            { waitForSelector : '.b-schedulertaskeditor input:text(Event 2)' },

            {
                dblclick : '[data-event-id="1"]',
                offset   : ['25%', '200%'],
                desc     : 'dblclick to create new event'
            },

            { waitFor : () => document.querySelector('.b-schedulertaskeditor input')?.value === 'New event' },

            {
                waitFor : () => schedulerPro.eventStore.count === count + 1,
                desc    : 'Event added by dblclick while another editor is opened'
            }
        );
    });

    // https://github.com/bryntum/support/issues/2697
    t.it('Should be able to configure resourcesField to be single select', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                taskEdit : {
                    items : {
                        generalTab : {
                            items : {
                                resourcesField : {
                                    multiSelect : false
                                }
                            }
                        }
                    }
                }
            }
        });

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        t.is(schedulerPro.features.taskEdit.editor.widgetMap.resourcesField.multiSelect, false, 'Field configured correctly');
    });

    t.it('Should use correct stores after replacing project', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.type(null, '[ESC]');

        await schedulerPro.project.commitAsync();

        schedulerPro.project = {
            resourcesData : [
                { id : 1, name : 'Resource 1' }
            ],

            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2, percentDone : 50 },
                { id : 2, name : 'Event 2', startDate : '2020-03-24', duration : 3, percentDone : 40 }
            ],

            assignmentsData : [
                { id : 1, resource : 1, event : 1 },
                { id : 2, resource : 1, event : 2 }
            ],

            dependenciesData : [
                { id : 1, fromEvent : 1, toEvent : 2, lag : 2 }
            ]
        };

        await schedulerPro.project.commitAsync();

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.click('.b-successors-tab');

        t.selectorExists('.b-grid-cell[data-column=fullLag]:textEquals(2 days)', 'Correct dep shown');

        const { widgetMap } = schedulerPro.features.taskEdit.editor;

        t.is(widgetMap.successorsTab.widgetMap.grid.store.masterStore, schedulerPro.project.dependencyStore, 'Correct successors store');
        t.is(widgetMap.predecessorsTab.widgetMap.grid.store.masterStore, schedulerPro.project.dependencyStore, 'Correct predecessors store');
        t.is(widgetMap.calendarField.store, schedulerPro.project.calendarManagerStore, 'Correct calendar store');
        t.is(widgetMap.resourcesField.store.masterStore, schedulerPro.project.resourceStore, 'Correct resources store');
    });

    // https://github.com/bryntum/support/issues/4968
    t.it('Should fire change event after pressing Cancel with changes made to a field', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        const { project } = schedulerPro;
        let changeFired;

        project.on({
            change : () => changeFired = true
        });

        await t.doubleClick('.b-sch-event');
        await t.click('.b-textfield');
        await t.type({ text : 'blargh[TAB]', clearExisting : true });

        await t.waitFor(() => changeFired);

        t.firesOnce(project, 'change');
        await t.click('button:contains(Cancel)');

        await project.commitAsync();
    });

    // Task editor cancelling may go several ways:
    // 1. User clicks outside to cause blur event on editor, it will trigger cancel event, feature will stop editing
    // 2. User starts editing next task. In this case beforeHide fires first but since animation is still waiting,
    // feature will force edit cancelling
    t.it('Should properly cancel editing when opening next editor during hide animation', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                taskEdit : {
                    editorConfig : {
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
            }
        });

        const event = schedulerPro.eventStore.getById(2);

        await t.doubleClick('[data-event-id="1"]');

        await t.waitForSelector('[data-ref="nameField"]');

        let cancelFired = false,
            loadFired   = false;

        const detacher = schedulerPro.features.taskEdit.editor.on({
            loadEvent : () => loadFired = true,
            cancel    : () => cancelFired = true
        });

        await t.doubleClick('[data-event-id="2"]');

        // Cannot rely on any event or state here: state will be correct for a short moment of time
        // and after animation ends we will get state changed. We cannot wait for animation event either because after
        // animation ends there is still async flow of cancelling the editor. There is a cancel event, but if we listen
        // to it we don't really assert anything.
        // What we need to assert is that after some timeout approximately the duration of the animation, there will be
        // an input field with the proper value
        await t.waitFor(1000);

        t.ok(loadFired, 'Load eventually fired');
        t.ok(cancelFired, 'Cancel eventually fired');

        detacher();

        t.hasValue('[data-ref="nameField"] input', event.name);

        await t.type(null, '[ESC]');

        await schedulerPro.await('afterTaskEdit', false);

        t.notOk(schedulerPro.features.taskEdit.isEditing, 'Editing has finished');
    });

    t.it('Should properly cancel editing when opening next editor programmatically', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                taskEdit : {
                    editorConfig : {
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
            }
        });

        const event = schedulerPro.eventStore.getById(2);

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.waitForSelector('[data-ref="nameField"]');

        let loadFired   = false;

        const detacher = schedulerPro.features.taskEdit.editor.on({
            loadEvent : () => loadFired = true
        });

        await schedulerPro.editEvent(event);

        // Cannot rely on any event or state here: state will be correct for a short moment of time
        // and after animation ends we will get state changed. We cannot wait for animation event either because after
        // animation ends there is still async flow of cancelling the editor. There is a cancel event, but if we listen
        // to it we don't really assert anything.
        // What we need to assert is that after some timeout approximately the duration of the animation, there will be
        // an input field with the proper value
        await t.waitFor(1000);

        t.ok(loadFired, 'Load eventually fired');

        detacher();

        t.hasValue('[data-ref="nameField"] input', event.name);

        await t.type(null, '[ESC]');

        await schedulerPro.await('afterTaskEdit', false);

        t.notOk(schedulerPro.features.taskEdit.isEditing, 'Editing has finished');
    });

    t.it('Should handle clearing start time field and clicking outside it', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        await t.doubleClick('.b-sch-event');

        const input = schedulerPro.features.taskEdit.editor.widgetMap.startDateField.timeField.input;
        input.value = '';

        t.simulator.simulateEvent(input, 'input');
        t.simulator.simulateEvent(input, 'change');
    });
});
