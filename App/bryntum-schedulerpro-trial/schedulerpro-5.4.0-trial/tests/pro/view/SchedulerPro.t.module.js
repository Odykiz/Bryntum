
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Should remove events', async t => {
        const
            project = new ProjectModel({
                resourcesData : [{
                    id   : 'r1',
                    name : 'Buldozer'
                }],

                eventsData : [{
                    id                : 'e1',
                    name              : 'Buldoze 1',
                    startDate         : new Date(2019, 0, 1),
                    duration          : 10,
                    durationUnit      : 'd',
                    manuallyScheduled : true
                }, {
                    id                : 'e2',
                    name              : 'Buldoze 2',
                    startDate         : new Date(2019, 0, 13),
                    duration          : 10,
                    durationUnit      : 'd',
                    manuallyScheduled : true
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
            project,

            appendTo   : document.body,
            minHeight  : '20em',
            startDate  : new Date(2019, 0, 1),
            endDate    : new Date(2019, 0, 31),
            viewPreset : 'weekAndMonth',
            rowHeight  : 30,
            barMargin  : 5,

            columns : [
                { text : 'Name', field : 'name', width : 130 }
            ]
        });

        t.chain(
            { waitForSelector : '.b-sch-event', desc : 'Wait for event is rendered' },
            { click : '[data-event-id="e1"]', desc : 'Click first event' },
            { type : '[DELETE]', desc : 'Remove Event with Delete key press' },
            {
                waitFor : () => document.querySelectorAll('.b-sch-event-wrap:not(.b-sch-released)').length === 1,
                desc    : 'Only one event is rendered after propagate'
            },
            { rightClick : '[data-event-id="e2"]', desc : 'Right click second event' },
            { click : '.b-menuitem:contains(Delete)', desc : 'Delete via menu item' },
            {
                waitFor : () => document.querySelectorAll('.b-sch-event-wrap:not(.b-sch-released)').length === 0,
                desc    : 'All events removed'
            }
        );
    });

    t.it('Should clean dates cache on project refresh', async t => {
        schedulerPro = new SchedulerPro({
            appendTo              : document.body,
            startDate             : new Date(2019, 0, 1),
            endDate               : new Date(2019, 0, 31),
            viewPreset            : 'weekAndMonth',
            useInitialAnimation   : false,
            enableEventAnimations : false,

            columns : [
                { text : 'Name', field : 'name', width : 130 }
            ],

            resources : [
                {
                    id   : 'r1',
                    name : 'Buldozer'
                }
            ],

            events : [
                {
                    id             : 'e1',
                    resourceId     : 'r1',
                    name           : 'Buldoze 1',
                    startDate      : new Date(2019, 0, 1),
                    constraintDate : new Date(2019, 0, 12),
                    constraintType : 'muststarton',
                    duration       : 10,
                    durationUnit   : 'd'
                },
                {
                    id             : 'e2',
                    resourceId     : 'r1',
                    name           : 'Buldoze 2',
                    startDate      : new Date(2019, 0, 11),
                    constraintDate : new Date(2019, 0, 12),
                    constraintType : 'muststarton',
                    duration       : 10,
                    durationUnit   : 'd'
                }
            ]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(schedulerPro.eventStore.first.startDate, new Date(2019, 0, 12), 'Event start date is calculated to constraint');
        t.is(schedulerPro.eventStore.last.startDate, new Date(2019, 0, 12), 'Event start date is calculated to constraint');
        t.assertEventsPositions(schedulerPro, schedulerPro.eventStore.getRange());
    });

    t.it('Should react on project calendar change', async t => {
        schedulerPro = new SchedulerPro({
            appendTo              : document.body,
            startDate             : new Date(2019, 0, 1),
            endDate               : new Date(2019, 0, 7),
            useInitialAnimation   : false,
            enableEventAnimations : false,

            columns : [
                { text : 'Name', field : 'name', width : 130 }
            ],

            project : {
                calendar      : '24/Mon-Fri',
                calendarsData : [
                    {
                        id        : '24/Mon-Fri',
                        intervals : [
                            {
                                recurrentStartDate : 'on Sat at 0:00',
                                recurrentEndDate   : 'on Mon at 0:00',
                                isWorking          : false
                            }
                        ]
                    },
                    {
                        id : '24/7'
                    }
                ],
                assignmentsData : [
                    {
                        id         : 'a1',
                        resourceId : 'r1',
                        eventId    : 'e1'
                    },
                    {
                        id         : 'a2',
                        resourceId : 'r1',
                        eventId    : 'e2'
                    }
                ],
                resourcesData : [
                    {
                        id   : 'r1',
                        name : 'Worker'
                    }
                ],
                eventsData : [
                    {
                        id        : 'e1',
                        name      : 'Task 1',
                        startDate : new Date(2019, 0, 4),
                        duration  : 2
                    },
                    {
                        id        : 'e2',
                        name      : 'Task 2',
                        startDate : new Date(2019, 0, 7),
                        duration  : 2
                    }
                ]
            }
        });

        await t.waitForProjectReady(schedulerPro);

        const
            { project }      = schedulerPro,
            [event1, event2] = schedulerPro.eventStore;

        await t.waitForProjectReady(schedulerPro);

        t.diag('Initial state');

        t.is(event1.startDate, new Date(2019, 0, 4), 'Task 1 start date is correct');
        t.is(event1.endDate, new Date(2019, 0, 8), 'Task 1 end date is correct');

        t.is(event2.startDate, new Date(2019, 0, 7), 'Task 2 start date is correct');
        t.is(event2.endDate, new Date(2019, 0, 9), 'Task 2 end date is correct');

        t.assertEventsPositions(schedulerPro, [event1, event2]);

        t.diag('Switching to 24/7 calendar');

        await project.setCalendar(project.calendarManagerStore.getById('24/7'));

        t.is(event1.startDate, new Date(2019, 0, 4), 'Task 1 start date is correct');
        t.is(event1.endDate, new Date(2019, 0, 6), 'Task 1 end date is correct');

        t.is(event2.startDate, new Date(2019, 0, 7), 'Task 2 start date is correct');
        t.is(event2.endDate, new Date(2019, 0, 9), 'Task 2 end date is correct');

        t.assertEventsPositions(schedulerPro, [event1, event2]);

        t.diag('Switching to 24/Mon-Fri calendar');

        await project.setCalendar(project.calendarManagerStore.getById('24/Mon-Fri'));

        t.is(event1.startDate, new Date(2019, 0, 4), 'Task 1 start date is correct');
        t.is(event1.endDate, new Date(2019, 0, 8), 'Task 1 end date is correct');

        t.is(event2.startDate, new Date(2019, 0, 7), 'Task 2 start date is correct');
        t.is(event2.endDate, new Date(2019, 0, 9), 'Task 2 end date is correct');

        t.assertEventsPositions(schedulerPro, [event1, event2]);
    });

    // https://github.com/bryntum/support/issues/2606
    t.it('Should react on event store changes caused by data sync', async(t) => {
        schedulerPro = new SchedulerPro({
            appendTo              : document.body,
            useInitialAnimation   : false,
            enableEventAnimations : false,

            project : {
                eventStore : {
                    syncDataOnLoad : true
                },

                repopulateOnDataset : false,

                eventsData : [{
                    id        : 1,
                    name      : 'Task #1',
                    startDate : '2021-03-03 09:00',
                    endDate   : '2021-03-03 10:00'
                }],
                resourcesData : [{
                    id : 1
                }],
                assignmentsData : [{
                    id       : 1,
                    event    : 1,
                    resource : 1
                }]
            },

            startDate : '2021-03-03 07:00',
            endDate   : '2021-04-04 13:00',

            viewPreset : 'hourAndDay'
        });

        const
            async = t.beginAsync(),
            event = schedulerPro.eventStore.first;

        await schedulerPro.project.commitAsync();

        t.assertEventsPositions(schedulerPro, [event]);

        // remember event position before syncing
        const startDatePos = schedulerPro.getCoordinateFromDate(event.startDate);

        await schedulerPro.eventStore.loadDataAsync([
            {
                id        : 1,
                name      : 'Task #1',
                startDate : '2021-03-03 12:00',
                endDate   : '2021-03-03 13:00'
            }
        ]);

        // wait till UI reacts on the change
        await t.waitFor(() => schedulerPro.getCoordinateFromDate(event.startDate) > startDatePos);

        // assert the event coordinates
        t.assertEventsPositions(schedulerPro, [event]);

        t.endAsync(async);
    });

    t.it('Should render events properly when shifting time axis and row height changes (stripe on)', async t => {
        schedulerPro = new SchedulerPro({
            appendTo   : document.body,
            height     : 544, // 10 rows
            startDate  : new Date(2011, 0, 3),
            endDate    : new Date(2011, 0, 4),
            rowHeight  : 80,
            barMargin  : 4,
            eventColor : null,
            eventStyle : null,
            viewPreset : 'hourAndDay',

            features : {
                stripe : true
            },

            project : {
                eventsData : [
                    {
                        id         : 1,
                        resourceId : 'r10',
                        startDate  : '2011-01-03T10:00',
                        endDate    : '2011-01-03T14:00'
                    },
                    {
                        id         : 3,
                        resourceId : 'r10',
                        startDate  : '2011-01-04T10:00',
                        endDate    : '2011-01-04T14:00'
                    },
                    {
                        id         : 4,
                        resourceId : 'r10',
                        startDate  : '2011-01-04T10:00',
                        endDate    : '2011-01-04T14:00'
                    },
                    {
                        id         : 5,
                        resourceId : 'r15',
                        startDate  : '2011-01-04T10:00',
                        endDate    : '2011-01-04T14:00'
                    }
                ],

                resourcesData : (() => {
                    const result = [];

                    for (let i = 1; i <= 15; i++) {
                        result.push({
                            id   : `r${i}`,
                            name : `Resource ${i}`
                        });
                    }

                    return result;
                })()
            }
        });

        await t.waitForProjectReady(schedulerPro);

        await schedulerPro.scrollRowIntoView('r15');

        await t.waitForSelector(schedulerPro.unreleasedEventSelector);

        t.selectorCountIs(schedulerPro.unreleasedEventSelector, 1, 'Correct amount of events rendered');

        schedulerPro.shiftNext();

        await t.waitFor({
            method() {
                return document.querySelectorAll(schedulerPro.unreleasedEventSelector).length === 3;
            },
            description : 'Correct amount of events rendered',
            timeout     : 2000
        });
    });

    t.it('Should render events properly when shifting time axis and row height changes (stripe off)', async t => {
        schedulerPro = new SchedulerPro({
            appendTo   : document.body,
            height     : 544, // 10 rows
            startDate  : new Date(2011, 0, 3),
            endDate    : new Date(2011, 0, 4),
            rowHeight  : 80,
            barMargin  : 4,
            eventColor : null,
            eventStyle : null,
            viewPreset : 'hourAndDay',

            features : {
                stripe : false
            },

            project : {
                eventsData : [
                    {
                        id         : 1,
                        resourceId : 'r10',
                        startDate  : '2011-01-03T10:00',
                        endDate    : '2011-01-03T14:00'
                    },
                    {
                        id         : 3,
                        resourceId : 'r10',
                        startDate  : '2011-01-04T10:00',
                        endDate    : '2011-01-04T14:00'
                    },
                    {
                        id         : 4,
                        resourceId : 'r10',
                        startDate  : '2011-01-04T10:00',
                        endDate    : '2011-01-04T14:00'
                    },
                    {
                        id         : 5,
                        resourceId : 'r15',
                        startDate  : '2011-01-04T10:00',
                        endDate    : '2011-01-04T14:00'
                    }
                ],

                resourcesData : (() => {
                    const result = [];

                    for (let i = 1; i <= 15; i++) {
                        result.push({
                            id   : `r${i}`,
                            name : `Resource ${i}`
                        });
                    }

                    return result;
                })()
            }
        });

        await t.waitForProjectReady(schedulerPro);

        await schedulerPro.scrollRowIntoView('r15');

        await t.waitForSelector(schedulerPro.unreleasedEventSelector);

        t.selectorCountIs(schedulerPro.unreleasedEventSelector, 1, 'Correct amount of events rendered');

        schedulerPro.shiftNext();

        await t.waitFor({
            method() {
                return document.querySelectorAll(schedulerPro.unreleasedEventSelector).length === 3;
            },
            description : 'Correct amount of events rendered',
            timeout     : 2000
        });
    });

    // https://github.com/bryntum/support/issues/3384
    t.it('Should repeat inline data loading w/o exception', async t => {
        const project = new ProjectModel();

        schedulerPro = new SchedulerPro({
            appendTo : document.body,

            project,

            columns : [{
                field : 'name'
            }],

            detectExcessiveRendering : false
        });

        await project.loadInlineData({
            eventsData      : [],
            assignmentsData : [],
            resourcesData   : [{ id : 1, name : 'resource 1' }]
        });

        await project.loadInlineData({
            eventsData      : [],
            assignmentsData : [],
            resourcesData   : [{ id : 4, name : 'resource 4' }]
        });

        await t.waitForSelector('.b-grid-cell:contains(resource 4)');
    });

    // https://github.com/bryntum/support/issues/3428
    t.it('Should fire datachange event', async t => {
        const schedulerPro = await t.getSchedulerProAsync({}, 1);

        const verifyEventSignature = ({
            source: scheduler,
            store,
            project,
            action
        }) => {
            t.is(scheduler, schedulerPro, 'Correct argument for scheduler');
            t.is(project, schedulerPro.project, 'Correct argument for project');
            t.ok(store.isStore, `Argument store: ${store.$$name}`);
            t.ok(['remove',
                'removeall',
                'add',
                'updatemultiple',
                'clearchanges',
                'filter',
                'update',
                'dataset',
                'replace'].includes(action), `Action "${action}" is valid`);
        };

        const removeListeners = schedulerPro.on({
            datachange : verifyEventSignature
        });

        t.willFireNTimes(schedulerPro, 'datachange', 11);

        // Change event name in Task Editor
        await t.doubleClick('.b-sch-event-wrap');
        await t.type('input[name=name]', ' changed');
        await t.click('[data-ref=saveButton]');

        // Drag-create an event
        await t.dragBy('[data-index="3"] .b-sch-timeaxis-cell', [100, 0], null, null, null, false, [200, '50%']);
        await t.click('[data-ref=saveButton]');

        // Drag event to change resource
        await t.dragBy('[data-event-id="1"] .b-sch-event', [0, 250], null, null, null, false);

        // Add dependency
        await schedulerPro.dependencyStore.add({ fromEvent : 1, toEvent : '_generatedEventModelEx5' });

        await schedulerPro.project.commitAsync();

        // Remove all dependencies
        await schedulerPro.dependencyStore.removeAll();

        // Remove all events
        await schedulerPro.eventStore.removeAll();

        // Remove all resources
        await schedulerPro.resourceStore.removeAll();

        await schedulerPro.project.commitAsync();

        removeListeners();

    });

    t.it('Should update event bar on `inactive` field change', async t => {
        schedulerPro = new SchedulerPro({
            appendTo   : document.body,
            startDate  : new Date(2021, 7, 23),
            endDate    : new Date(2021, 7, 24),
            viewPreset : 'hourAndDay',

            project : {
                eventsData : [
                    {
                        id         : 1,
                        resourceId : 1,
                        startDate  : '2021-08-23T10:00',
                        endDate    : '2021-08-23T14:00'
                    }
                ],

                resourcesData : [{ id : 1 }]
            }
        });

        await t.waitForProjectReady(schedulerPro);

        await t.waitForSelector('[data-event-id=1] .b-sch-event');

        await t.selectorNotExists('[data-event-id=1] .b-sch-event.b-inactive');

        t.pass('no inactive events rendered yet');

        schedulerPro.events[0].setInactive(true);

        await t.waitForSelector('[data-event-id=1] .b-sch-event.b-inactive');

        t.pass('inactive event rendered');

        schedulerPro.events[0].setInactive(false);

        await t.waitForSelectorNotFound('[data-event-id=1] .b-sch-event.b-inactive');

        t.pass('no inactive events rendered again');
    });

    // https://github.com/bryntum/support/issues/4043
    t.it('Framework friendly configs and properties should work', async t => {
        const
            eventsData = [
                { id : 1, name : 'Event 1', startDate : new Date(2020, 0, 17), duration : 2, durationUnit : 'd' },
                { id : 2, name : 'Event 2', startDate : new Date(2020, 0, 18), duration : 2, durationUnit : 'd' },
                { id : 3, name : 'Event 3', startDate : new Date(2020, 0, 19), endDate : new Date(2020, 0, 22) }
            ],
            resourcesData = [
                { id : 1, name : 'Resource 1' },
                { id : 2, name : 'Resource 2' }
            ],
            assignmentsData = [
                { id : 1, eventId : 1, resourceId : 1 },
                { id : 2, eventId : 1, resourceId : 2 },
                { id : 3, eventId : 2, resourceId : 2 }
            ],
            resourceTimeRangesData = [
                { id : 1, resourceId : 1, name : 'Resource range 1', startDate : new Date(2020, 0, 17), duration : 2, durationUnit : 'd' }
            ],
            timeRangesData = [
                { id : 1, name : 'Range 1', startDate : new Date(2020, 0, 17), duration : 2, durationUnit : 'd' }
            ],
            dependenciesData = [
                { id : 1, from : 1, to : 2 }
            ],
            calendarsData = [
                { id : 1, startDate : new Date(2020, 0, 17), endDate : new Date(2020, 0, 19), isWorking : true }
            ];

        schedulerPro = new SchedulerPro({
            events             : eventsData,
            assignments        : assignmentsData,
            resources          : resourcesData,
            dependencies       : dependenciesData,
            timeRanges         : timeRangesData,
            resourceTimeRanges : resourceTimeRangesData,
            calendars          : calendarsData
        });

        const { project } = schedulerPro;

        await project.commitAsync();

        t.is(project.eventStore.count, eventsData.length, 'EventStore populated');
        t.is(project.assignmentStore.count, assignmentsData.length, 'AssignmentStore populated');
        t.is(project.resourceStore.count, resourcesData.length, 'ResourceStore populated');
        t.is(project.dependencyStore.count, dependenciesData.length, 'DependencyStore populated');
        t.is(project.timeRangeStore.count, timeRangesData.length, 'TimeRangeStore populated');
        t.is(project.resourceTimeRangeStore.count, resourceTimeRangesData.length, 'ResourceTimeRangeStore populated');
        t.is(project.calendarManagerStore.count, calendarsData.length, 'CalendarManagerStore populated');

        t.is(schedulerPro.events, project.eventStore.allRecords, 'events getter');
        t.is(schedulerPro.assignments, project.assignmentStore.allRecords, 'assignments getter');
        t.is(schedulerPro.resources, project.resourceStore.allRecords, 'resources getter');
        t.is(schedulerPro.dependencies, project.dependencyStore.allRecords, 'dependencies getter');
        t.is(schedulerPro.timeRanges, project.timeRangeStore.allRecords, 'timeRanges getter');
        t.is(schedulerPro.resourceTimeRanges, project.resourceTimeRangeStore.allRecords, 'resourceTimeRanges getter');
        t.is(project.calendars, project.calendarManagerStore.allRecords, 'calendars getter');

        Object.assign(schedulerPro, {
            events             : [],
            assignments        : [],
            resources          : [],
            dependencies       : [],
            timeRanges         : [],
            resourceTimeRanges : [],
            calendars          : []
        });

        await project.commitAsync();

        t.is(project.eventStore.count, 0, 'events setter');
        t.is(project.assignmentStore.count, 0, 'assignments setter');
        t.is(project.resourceStore.count, 0, 'resources setter');
        t.is(project.dependencyStore.count, 0, 'dependencies setter');
        t.is(project.timeRangeStore.count, 0, 'timeRanges setter');
        t.is(project.resourceTimeRangeStore.count, 0, 'resourceTimeRanges setter');
        t.is(project.calendarManagerStore.count, 0, 'calendars setter');

        Object.assign(schedulerPro, {
            events             : eventsData,
            assignments        : assignmentsData,
            resources          : resourcesData,
            dependencies       : dependenciesData,
            timeRanges         : timeRangesData,
            resourceTimeRanges : resourceTimeRangesData,
            calendars          : calendarsData
        });

        await project.commitAsync();

        t.is(project.eventStore.count, eventsData.length, 'EventStore repopulated');
        t.is(project.assignmentStore.count, assignmentsData.length, 'AssignmentStore repopulated');
        t.is(project.resourceStore.count, resourcesData.length, 'ResourceStore repopulated');
        t.is(project.dependencyStore.count, dependenciesData.length, 'DependencyStore repopulated');
        t.is(project.timeRangeStore.count, timeRangesData.length, 'TimeRangeStore repopulated');
        t.is(project.resourceTimeRangeStore.count, resourceTimeRangesData.length, 'ResourceTimeRangeStore repopulated');
        t.is(project.calendarManagerStore.count, calendarsData.length, 'CalendarManagerStore repopulated');
    });

    // https://github.com/bryntum/support/issues/4389
    t.it('Scheduler should use already loaded project', async t => {
        const project = new ProjectModel({
            resourcesData : [
                { id : 1, name : 'Resource 1' },
                { id : 2, name : 'Resource 2' }
            ],
            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2, percentDone : 50 },
                { id : 2, name : 'Event 2', startDate : '2020-03-24', duration : 3, percentDone : 40 }
            ],

            assignmentsData : [
                { id : 1, resource : 1, event : 1 },
                { id : 2, resource : 2, event : 2 }
            ]
        });

        await project.commitAsync();

        schedulerPro = await t.getSchedulerProAsync({
            project
        });

        schedulerPro.destroy();

        schedulerPro = await t.getSchedulerProAsync({
            infiniteScroll : true,
            project
        });
    });

    // https://github.com/bryntum/support/issues/4479
    t.it('Should include fromSide / toSide changes in datachange event', async t => {
        const schedulerpro = await t.getSchedulerProAsync({}, 1);

        schedulerpro.on({
            datachange : ({ changes }) => {
                t.is(changes.fromSide.value, 'bottom', 'fromSide value present');
                t.is(changes.fromSide.oldValue, null, 'fromSide oldValue present');
            },
            once : true
        });

        // update dependency
        schedulerpro.dependencyStore.first.set({
            fromSide : 'bottom',
            type     : 1
        });

        await schedulerpro.project.commitAsync();
    });

    // https://github.com/bryntum/support/issues/4519
    t.it('Should handle setting inline data during assignment', async t => {
        const resources = [
            { id : 1 },
            { id : 2 },
            { id : 3 }
        ];

        const events = [
            { id : 10 }
        ];

        const assignments = [
            { id : 1, eventId : 10, resourceId : 1 }
        ];

        schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            startDate : '2022-04-13',
            endDate   : '2022-04-14',
            project   : {
                eventStore : {
                    syncDataOnLoad : true,
                    data           : events
                },
                resourceStore : {
                    syncDataOnLoad : true,
                    data           : resources
                },
                assignmentStore : {
                    syncDataOnLoad : true,
                    data           : assignments
                },
                listeners : {
                    change : async({ changes }) => {
                        if (changes != null) {
                            schedulerPro.project.loadInlineData({
                                eventsData      : events,
                                resourcesData   : resources,
                                assignmentsData : assignments
                            });
                        }
                    },
                    once : true
                }
            }
        });

        await schedulerPro.project.commitAsync();

        schedulerPro.assignmentStore.first.resource = schedulerPro.resourceStore.last;

        await t.waitFor(() => schedulerPro.assignmentStore.first.resource.id === 1);

        t.pass('Correct resource');
    });

    t.it('Should work to configure appendTo at runtime', async t => {
        document.body.innerHTML = '';
        schedulerPro = await t.getSchedulerProAsync({ appendTo : null });

        t.selectorNotExists('.b-schedulerpro', 'SchedulerPro not rendered');

        schedulerPro.appendTo = document.body;

        t.selectorExists('body > .b-schedulerpro', 'SchedulerPro rendered correctly 1/2');
        t.ok(t.isElementVisible('.b-schedulerpro .b-sch-event'), 'SchedulerPro rendered correctly 2/2');
    });

    t.it('Should refresh the view when applying changeset', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            project : {
                resourceStore : {
                    data : [
                        { id : 1, name : 'A1' },
                        { id : 2, name : 'A2' },
                        { id : 3, name : 'B1' }
                    ],
                    filters : [{
                        property : 'name',
                        operator : 'startsWith',
                        value    : 'A'
                    }]
                }
            }
        });

        t.is(schedulerPro.store.count, 2, 'Two records in store');
        t.selectorCountIs('.b-grid-subgrid-locked .b-grid-row', 2, 'Two rows in view');

        await schedulerPro.project.applyProjectChanges({
            resources : {
                added : [
                    { id : 4, name : 'B2' },
                    { id : 5, name : 'A3' }
                ]
            }
        });

        t.is(schedulerPro.store.count, 3, 'Three records in store');
        t.selectorCountIs('.b-grid-subgrid-locked .b-grid-row', 3, 'Three rows in view');

        t.isDeeply(
            Array.from(document.querySelectorAll('.b-grid-subgrid-locked .b-grid-row')).map(el => el.dataset.id),
            [1, 2, 5],
            'Row order is correct'
        );
    });
});
