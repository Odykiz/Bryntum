
StartTest(t => {

    let schedulerPro, project;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                nonWorkingTime      : false,
                eventNonWorkingTime : true
            },

            startDate : new Date(2020, 3, 20),
            endDate   : new Date(2020, 5, 1),

            resourcesData : [
                { id : 1, name : 'Resource 1' },
                { id : 2, name : 'Resource 2', calendar : 'tuesday' },
                { id : 3, name : 'Resource 3' },
                { id : 4, name : 'Resource 4' },
                { id : 5, name : 'Resource 5' }
            ],

            calendarsData : [
                {
                    id        : 'general',
                    name      : 'General',
                    intervals : [
                        {
                            recurrentStartDate : 'on Sat at 0:00',
                            recurrentEndDate   : 'on Mon at 0:00',
                            isWorking          : false
                        }
                    ]
                },
                {
                    id        : 'tuesday',
                    name      : 'Tuesday',
                    intervals : [
                        {
                            recurrentStartDate : 'on Tue at 0:00',
                            recurrentEndDate   : 'on Wed at 0:00',
                            isWorking          : false
                        }
                    ]
                },
                {
                    id        : 'thursday',
                    name      : 'Thursday',
                    intervals : [
                        {
                            recurrentStartDate : 'on Thu at 0:00',
                            recurrentEndDate   : 'on Fri at 0:00',
                            isWorking          : false
                        }
                    ]
                }
            ],

            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-04-20', duration : 3, calendar : 'tuesday' },
                { id : 2, name : 'Event 2', startDate : '2020-04-20', duration : 6, calendar : 'thursday' },
                { id : 3, name : 'Event 3', startDate : '2020-04-22', duration : 2 },
                { id : 4, name : 'Event 4', startDate : '2020-04-23', duration : 3 },
                { id : 5, name : 'Event 5', startDate : '2020-04-24', duration : 2 }
            ],

            dependenciesData : [],
            ...config
        });
    }

    t.it('Should shade non-working ranges from combined calendars', async t => {
        await setup();

        const [event1, event2, event3] = schedulerPro.eventStore;

        t.selectorCountIs('$event=1 .b-sch-nonworkingtime', 1, 'Event 1 has 1 non-working time range');
        t.selectorCountIs('$event=2 .b-sch-nonworkingtime', 2, 'Event 2 has 2 non-working time ranges');
        t.selectorCountIs('$event=3 .b-sch-nonworkingtime', 0, 'Event 3 has 0 non-working time ranges');
        t.selectorCountIs('$event=4 .b-sch-nonworkingtime', 1, 'Event 4 has 1 non-working time range');
        t.selectorCountIs('[data-event-id="5"][data-resource-id="5"] .b-sch-nonworkingtime', 1, 'Event 5 has 1 non-working time range');

        await event3.setDuration(4);

        t.selectorCountIs('$event=3 .b-sch-nonworkingtime', 1, 'Event 3 has 1 non-working time ranges after duration change');

        await event1.setCalendar(null);

        t.selectorCountIs('$event=1 .b-sch-nonworkingtime', 0, 'Event 1 has 0 non-working time ranges after event calendar change');

        await schedulerPro.resourceStore.getById(1).setCalendar('tuesday');

        t.selectorCountIs('$event=1 .b-sch-nonworkingtime', 1, 'Event 1 has 1 non-working time range after resource calendar change');

        await event2.setStartDate(new Date(2020, 3, 22), false);

        t.selectorCountIs('$event=2 .b-sch-nonworkingtime', 1, 'Event 2 has 1 non-working time range after start date change');

        event2.calendar.addInterval({
            recurrentStartDate : 'on Mon at 0:00',
            recurrentEndDate   : 'on Tue at 0:00',
            isWorking          : false
        });

        await schedulerPro.project.commitAsync();

        t.selectorCountIs('$event=2 .b-sch-nonworkingtime', 2, 'Event 2 has 2 non-working time range after adding interval');
    });

    t.it('Should redraw on calendars data update', async t => {
        t.beforeEach(async t => {
            schedulerPro = await t.getSchedulerProAsync({
                features : {
                    nonWorkingTime      : false,
                    eventNonWorkingTime : true
                },

                projectConfig : {
                    startDate : '2020-03-22',
                    calendar  : null
                },

                startDate : '2020-03-22',
                endDate   : '2020-03-30',

                resourcesData : [
                    { id : 1, name : 'Resource 1' }
                ],

                calendarsData : [
                    {
                        id        : 'general',
                        name      : 'General',
                        intervals : [
                            {
                                startDate : '2020-03-24',
                                endDate   : '2020-03-25',
                                isWorking : false
                            }
                        ]
                    }
                ],

                eventsData : [
                    { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 5, calendar : 'general' }
                ],

                assignmentsData : [
                    { id : 1, event : 1, resource : 1 }
                ],
                dependenciesData : []
            });

            project = schedulerPro.project;
        });

        t.it('Should redraw when updating data directly', async t => {
            t.selectorCountIs('.b-sch-nonworkingtime', 1, '1 non-working time region');

            project.calendarManagerStore.data = [
                {
                    id        : 'general',
                    name      : 'General',
                    intervals : [
                        {
                            startDate : '2020-03-24',
                            endDate   : '2020-03-25',
                            isWorking : false
                        },
                        {
                            startDate : '2020-03-26',
                            endDate   : '2020-03-27',
                            isWorking : false
                        }
                    ]
                }
            ];

            await project.commitAsync();

            t.selectorCountIs('.b-sch-nonworkingtime', 2, '2 non-working time region');
        });

        t.it('Should redraw when updating data directly (syncDataOnLoad = true)', async t => {
            t.selectorCountIs('.b-sch-nonworkingtime', 1, '1 non-working time region');

            project.calendarManagerStore.syncDataOnLoad = true;

            project.calendarManagerStore.data = [
                {
                    id        : 'general',
                    name      : 'General',
                    intervals : [
                        {
                            startDate : '2020-03-24',
                            endDate   : '2020-03-25',
                            isWorking : false
                        },
                        {
                            startDate : '2020-03-26',
                            endDate   : '2020-03-27',
                            isWorking : false
                        }
                    ]
                }
            ];

            await project.commitAsync();

            t.selectorCountIs('.b-sch-nonworkingtime', 2, '2 non-working time region');
        });

        t.it('Should redraw, when updating data directly (addInterval)', async t => {
            t.selectorCountIs('.b-sch-nonworkingtime', 1, '1 non-working time region');

            project.getCalendarById('general').addInterval({
                startDate : '2020-03-26',
                endDate   : '2020-03-27',
                isWorking : false
            });

            await project.commitAsync();

            t.selectorCountIs('.b-sch-nonworkingtime', 2, '2 non-working time region');
        });
    });
});
