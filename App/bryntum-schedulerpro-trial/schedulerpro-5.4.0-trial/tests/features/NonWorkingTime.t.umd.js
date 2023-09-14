
StartTest(t => {
    let scheduler, project;

    t.beforeEach(t => scheduler?.destroy?.());

    async function setup(config = {}) {
        scheduler = await t.getSchedulerProAsync({
            startDate  : new Date(2018, 1, 5),
            endDate    : new Date(2018, 1, 15),
            viewPreset : 'weekAndDayLetter',
            features   : {
                nonWorkingTime : true
            },
            projectConfig : {
                calendar      : 'general',
                calendarsData : [
                    {
                        id        : 'general',
                        name      : 'General',
                        intervals : [
                            {
                                startDate : '2018-02-05',
                                endDate   : '2018-02-06',
                                isWorking : false
                            }
                        ]
                    }
                ],
                // explicitly empty data to avoid unnecessary records in the store (and corresponding atoms in the graph)
                eventsData       : [],
                dependenciesData : [],
                assignmentsData  : []
            },
            ...config
        });

        project = scheduler.project;
    }

    t.it('Should redraw when updating calendars data directly', async t => {
        await setup();

        // one extra el with the same class in the header
        t.selectorCountIs('.b-sch-nonworkingtime', 2, '1 non-working time region');

        project.calendarManagerStore.data = [
            {
                id        : 'general',
                name      : 'General',
                intervals : [
                    {
                        startDate : '2018-02-05',
                        endDate   : '2018-02-06',
                        isWorking : false
                    },
                    {
                        startDate : '2018-02-07',
                        endDate   : '2018-02-08',
                        isWorking : false
                    }
                ]
            }
        ];

        await project.commitAsync();

        // one extra el with the same class in the header
        t.selectorCountIs('.b-sch-nonworkingtime', 4, '2 non-working time region');
    });

    t.it('Should redraw when updating calendars data directly (syncDataOnLoad=true)', async t => {
        await setup();

        // one extra el with the same class in the header
        t.selectorCountIs('.b-sch-nonworkingtime', 2, '1 non-working time region');

        project.calendarManagerStore.syncDataOnLoad = true;

        project.calendarManagerStore.data = [
            {
                id        : 'general',
                name      : 'General',
                intervals : [
                    {
                        startDate : '2018-02-05',
                        endDate   : '2018-02-06',
                        isWorking : false
                    },
                    {
                        startDate : '2018-02-07',
                        endDate   : '2018-02-08',
                        isWorking : false
                    }
                ]
            }
        ];

        await project.commitAsync();

        // one extra el with the same class in the header
        t.selectorCountIs('.b-sch-nonworkingtime', 4, '2 non-working time region');
    });

    t.it('Should redraw when updating calendars data directly (addInterval)', async t => {
        await setup();

        // one extra el with the same class in the header
        t.selectorCountIs('.b-sch-nonworkingtime', 2, '1 non-working time region');

        project.getCalendarById('general').addInterval({
            startDate : '2018-02-07',
            endDate   : '2018-02-08',
            isWorking : false
        });

        await project.commitAsync();

        // one extra el with the same class in the header
        t.selectorCountIs('.b-sch-nonworkingtime', 4, '2 non-working time region');
    });

    // https://github.com/bryntum/support/issues/6576
    t.it('Should not draw ranges that are not part of a noncontinuous time axis', async t => {
        const
            resources = [
                { id : 1, name : 'Arcady', role : 'Core developer', eventColor : 'purple' }
            ],
            workingTime = {
                fromHour : 9,
                toHour   : 18
            };

        scheduler = await t.getSchedulerProAsync({
            appendTo : document.body,
            timeAxis : {
                continuous : false,
                startTime  : workingTime.fromHour,
                endTime    : workingTime.toHour,
                generateTicks(start, end, unit, _increment) {
                    let ticks = [];
                    if (unit === 'hour') {
                        while (start < end) {
                            const [am, pm] = [workingTime.fromHour, workingTime.toHour - 4];
                            ticks = [
                                ...ticks,
                                {
                                    startDate : DateHelper.add(start, am, 'hours'),
                                    endDate   : DateHelper.add(start, am + 2, 'hours')
                                },
                                {
                                    startDate : DateHelper.add(start, am + 2, 'hours'),
                                    endDate   : DateHelper.add(start, am + 4, 'hours')
                                },
                                // Hide lunch hour
                                {
                                    startDate : DateHelper.add(start, pm, 'hours'),
                                    endDate   : DateHelper.add(start, pm + 2, 'hours')
                                },
                                {
                                    startDate : DateHelper.add(start, pm + 2, 'hours'),
                                    endDate   : DateHelper.add(start, pm + 4, 'hours')
                                }
                            ];
                            start = DateHelper.add(start, 1, 'days');
                        }
                        return ticks;
                    }
                }
            },

            columns : [
                {
                    field : 'name',
                    text  : 'Staff',
                    width : '10em'
                }
            ],

            resources,

            calendars : [{
                id        : 1,
                name      : 'Non-Working Days',
                intervals : [
                // weekends
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    },
                    // non-working am hours
                    {
                        recurrentStartDate : 'at 00:00',
                        recurrentEndDate   : 'at 09:00',
                        isWorking          : false
                    },
                    // lunch
                    {
                        recurrentStartDate : 'at 13:00',
                        recurrentEndDate   : 'at 14:00',
                        isWorking          : false
                    },
                    // non-working pm hours
                    {
                        recurrentStartDate : 'at 18:00',
                        recurrentEndDate   : 'at 00:00',
                        isWorking          : false
                    }
                ]
            }],

            project : {
                calendar : 1
            },

            startDate : '2020-03-19',
            endDate   : '2020-03-21',

            viewPreset : 'hourAndDay'
        });

        await t.waitForRowsVisible();

        t.selectorNotExists('.b-sch-timerange.b-sch-nonworkingtime');
    });
});
