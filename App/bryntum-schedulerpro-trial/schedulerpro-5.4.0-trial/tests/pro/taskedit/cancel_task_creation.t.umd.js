
StartTest(t => {

    let schedulerPro;

    t.beforeEach(function() {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    // #8786 https://www.assembla.com/spaces/bryntum/tickets/8786-modify-taskedit-feature-such-that-it-could-receive-task-event-instance-via-fun/details
    t.it('Task editor should be able to include task creation in it\'s STM transaction', async t => {

        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'Buldozer'
            }],

            eventsData : [{
                id           : 'e1',
                name         : 'Buldoze 1',
                startDate    : new Date(2019, 0, 1),
                duration     : 10,
                durationUnit : 'd'
            }, {
                id           : 'e2',
                name         : 'Buldoze 2',
                startDate    : new Date(2019, 0, 11),
                duration     : 10,
                durationUnit : 'd'
            }],

            dependenciesData : [{
                id        : 'd1',
                fromEvent : 'e1',
                toEvent   : 'e2',
                lag       : 2,
                lagUnit   : 'd'
            }],

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

        schedulerPro = new SchedulerPro({
            project : project,

            appendTo            : document.body,
            minHeight           : '20em',
            startDate           : new Date(2019, 0, 1),
            endDate             : new Date(2019, 0, 31),
            viewPreset          : 'weekAndMonth',
            rowHeight           : 30,
            barMargin           : 5,
            useInitialAnimation : false,

            columns : [
                { text : 'Name', field : 'name', width : 130 }
            ]
        });

        t.chain(
            { waitForProjectReady : project },
            { waitForSelector : '.b-sch-event' },
            async() => {
                const
                    resource = project.getResourceStore().getById('r1');

                schedulerPro.editEvent(() => {
                    const [event] = project.eventStore.add({
                        name      : 'Buldoze 3',
                        startDate : new Date(2019, 0, 3),
                        endDate   : new Date(2019, 0, 4)
                    });

                    project.assignmentStore.add({
                        eventId    : event.id,
                        resourceId : resource.id
                    });

                    return event;

                }, resource);
            },
            { click : '.b-button:contains(Cancel)' },
            { waitForSelectorNotFound : '.b-taskeditor-editing' },
            () => {
                t.is(project.getEventStore().count, 2, 'No new events has been added');
                t.is(project.getAssignmentStore().count, 2, 'No new assignments has been added');
            }
        );
    });

    // https://github.com/bryntum/support/issues/165
    t.it('Task editor should not be invalidated immediately upon save click', async t => {

        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'Buldozer'
            }],

            eventsData : [{
                id           : 'e1',
                name         : 'Buldoze 1',
                startDate    : new Date(2019, 0, 1),
                duration     : 10,
                durationUnit : 'd'
            }, {
                id           : 'e2',
                name         : 'Buldoze 2',
                startDate    : new Date(2019, 0, 11),
                duration     : 10,
                durationUnit : 'd'
            }],

            dependenciesData : [{
                id        : 'd1',
                fromEvent : 'e1',
                toEvent   : 'e2',
                lag       : 2,
                lagUnit   : 'd'
            }],

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

        schedulerPro = new SchedulerPro({
            project : project,

            appendTo              : document.body,
            minHeight             : '20em',
            startDate             : new Date(2019, 0, 1),
            endDate               : new Date(2019, 0, 31),
            viewPreset            : 'weekAndMonth',
            rowHeight             : 30,
            barMargin             : 5,
            enableEventAnimations : false,

            columns : [
                { text : 'Name', field : 'name', width : 130 }
            ],

            features : {
                taskEdit : {
                    editorConfig : {
                        hideAnimation : {
                            opacity : {
                                from     : 1,
                                to       : 0,
                                duration : '.3s',
                                delay    : '0s'
                            }
                        }
                    }
                }
            }
        });

        let editor;

        t.chain(
            { waitForProjectReady : project },
            { waitForSelector : '.b-sch-event' },
            async() => {
                const
                    resource = project.getResourceStore().getById('r1');

                schedulerPro.editEvent(() => {
                    const [event] = project.eventStore.add({
                        name      : 'Buldoze 3',
                        startDate : new Date(2019, 0, 3),
                        endDate   : new Date(2019, 0, 4)
                    });

                    project.assignmentStore.add({
                        eventId    : event.id,
                        resourceId : resource.id
                    });

                    return event;

                }, resource);

            },
            { waitFor : () => schedulerPro.features.taskEdit.editor?.isVisible },

            async() => {
                editor = schedulerPro.features.taskEdit.editor;
            },

            { click : '.b-button:contains(Save)' },

            async() => {
                // The save and hide process which resets the form, must not immediately
                // invalidate the form. The reset must take place after uit has become invisible
                t.ok(editor.widgetMap.nameField.isValid);

                // It has not been cleared yet
                t.ok(editor.widgetMap.nameField.value);
            },
            // Field must be cleared at the tail end of the hide
            { waitFor : () => !editor.widgetMap.nameField.value },
            () => {
                // Editor must be hidden
                t.notOk(editor.isVisible);

                t.is(project.getEventStore().count, 3, 'One new event has been added');
                t.is(project.getAssignmentStore().count, 3, 'One new assignment has been added');
            }
        );
    });
});
