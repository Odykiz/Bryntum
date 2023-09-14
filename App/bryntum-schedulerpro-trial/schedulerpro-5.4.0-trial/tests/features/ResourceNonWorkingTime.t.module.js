
StartTest(t => {

    let schedulerPro, project;

    t.beforeEach(() => schedulerPro?.destroy());

    async function createScheduler(config = {}) {
        schedulerPro = await t.getSchedulerProAsync({
            tickSize   : 20,
            viewPreset : {
                base              : 'dayAndWeek',
                name              : 'custom',
                displayDateFormat : 'HH:mm',
                shiftIncrement    : 1,
                shiftUnit         : 'day',
                timeResolution    : {
                    unit      : 'hour',
                    increment : 1
                },
                defaultSpan     : 24,
                mainHeaderLevel : 1,
                headers         : [
                    {
                        unit       : 'day',
                        increment  : 1,
                        dateFormat : 'MMMM Do'
                    },
                    {
                        unit       : 'hour',
                        increment  : 12,
                        dateFormat : 'H'
                    }
                ]
            },
            resourcesData : [
                { id : 1, name : 'Early', calendar : 'early' },
                { id : 2, name : 'Late', calendar : 'late' }
            ],

            calendarsData : [
                {
                    id                       : 'early',
                    unspecifiedTimeIsWorking : false,
                    intervals                : [
                        {
                            recurrentStartDate : 'at 6:00',
                            recurrentEndDate   : 'at 14:00',
                            isWorking          : true
                        }
                    ]
                },
                {
                    id                       : 'late',
                    unspecifiedTimeIsWorking : false,
                    intervals                : [
                        {
                            recurrentStartDate : 'at 14:00',
                            recurrentEndDate   : 'at 22:00',
                            isWorking          : true
                        }
                    ]
                }
            ],

            features : {
                resourceNonWorkingTime : true
            },

            startDate : '2020-03-22',
            endDate   : '2020-03-29',
            ...config
        });

        project = schedulerPro.project;
    }

    t.it('Should render non-working time per resource', async t => {
        await createScheduler();
        await t.waitForSelector('.b-sch-resourcenonworkingtime');

        t.selectorCountIs('.b-sch-resourcenonworkingtime', 16, 'Correct non-working time element count');

        t.selectorNotExists('.b-sch-resourcenonworkingtime[tabIndex]', 'No tabIndex applied');

        // Not evaluating element positions here on purpose, base feature is already tested
    });

    t.it('Should react to changing calendar', async t => {
        await createScheduler();
        await t.waitForSelector('.b-sch-resourcenonworkingtime');

        // Both rows ranges should not align initially (checking second range, first aligns since both start at 0)
        t.isNot(
            document.querySelector('[data-event-id="resourcenonworkingtimemodel-r1i1"]').getBoundingClientRect().left,
            document.querySelector('[data-event-id="resourcenonworkingtimemodel-r2i1"]').getBoundingClientRect().left,
            'Second range not aligned for both resources'
        );

        schedulerPro.resourceStore.first.calendar = schedulerPro.calendarManagerStore.last;

        await t.waitForProjectReady(schedulerPro);

        // Both rows ranges should now align
        t.is(
            document.querySelector('[data-event-id="resourcenonworkingtimemodel-r1i1"]').getBoundingClientRect().left,
            document.querySelector('[data-event-id="resourcenonworkingtimemodel-r2i1"]').getBoundingClientRect().left,
            'Second range aligned for both resources'
        );
    });

    t.it('Should work with ResourceTimeRanges feature', async t => {
        await createScheduler({
            features : {
                resourceNonWorkingTime : true,
                resourceTimeRanges     : true
            },

            resourceTimeRangesData : [
                { id : 1, name : 'Go lakers!', resourceId : 2, startDate : '2020-03-23', endDate : '2020-03-26' }
            ]
        });
        await t.waitForSelector('.b-sch-resourcenonworkingtime');

        const rangeSelector = '.b-sch-resourcetimerange:not(.b-sch-resourcenonworkingtime)';

        t.selectorCountIs('.b-sch-resourcenonworkingtime', 16, 'Correct non-working time element count');
        t.selectorCountIs(rangeSelector, 1, 'Correct ResourceTimeRange element count');

        t.contentLike(rangeSelector, 'Go lakers!', 'Label rendered');
    });

    // https://github.com/bryntum/support/issues/1084
    t.it('Should react to the visible timespan changes', async t => {
        await createScheduler({ autoAdjustTimeAxis : false });
        await t.waitForSelector('.b-sch-resourcenonworkingtime');

        t.diag('Initial state');

        t.is(document.querySelectorAll('.b-sch-resourcenonworkingtime').length, 16, 'proper number of ranges found');

        t.diag('Adjusting startDate 1 day earlier');

        schedulerPro.setTimeSpan(DateHelper.add(schedulerPro.startDate, -1, 'day'), schedulerPro.endDate);

        t.is(document.querySelectorAll('.b-sch-resourcenonworkingtime').length, 18, 'proper number of ranges found');

        t.diag('Adjusting endDate 1 day later');

        schedulerPro.setTimeSpan(schedulerPro.startDate, DateHelper.add(schedulerPro.endDate, +1, 'day'));

        t.is(document.querySelectorAll('.b-sch-resourcenonworkingtime').length, 20, 'proper number of ranges found');

        t.diag('Adjusting dates back to initial state');

        schedulerPro.setTimeSpan(DateHelper.add(schedulerPro.startDate, +1, 'day'), DateHelper.add(schedulerPro.endDate, -1, 'day'));

        t.is(document.querySelectorAll('.b-sch-resourcenonworkingtime').length, 16, 'proper number of ranges found');
    });

    t.it('Should support being disabled', async t => {
        await createScheduler({
            features : {
                resourceNonWorkingTime : {
                    disabled : true
                }
            }
        });

        t.selectorNotExists('.b-sch-resourcenonworkingtime', 'No non-working time elements');

        schedulerPro.features.resourceNonWorkingTime.disabled = false;

        t.selectorExists('.b-sch-resourcenonworkingtime', 'Non-working time elements');
    });

    // https://github.com/bryntum/support/issues/2632
    t.it('Should not render elements if time axis unit is larger than hour by default', async t => {
        await createScheduler();

        t.selectorExists('.b-sch-resourcenonworkingtime', 'Non-working time elements');

        schedulerPro.viewPreset = 'weekAndDayLetter';

        t.selectorNotExists('.b-sch-resourcenonworkingtime', 'No non-working time elements');
    });

    t.it('Should support defining max time axis unit defining when to skip rendering non working time elements', async t => {
        await createScheduler({
            viewPreset : 'dayAndWeek',
            features   : {
                resourceNonWorkingTime : {
                    maxTimeAxisUnit : 'day'
                }
            }
        });

        t.selectorExists('.b-sch-resourcenonworkingtime', 'Non-working time elements');

        schedulerPro.viewPreset = 'weekAndMonth';

        t.selectorNotExists('.b-sch-resourcenonworkingtime', 'No non-working time elements');
    });

    t.it('Should handle a calendar set to null', async t => {
        await createScheduler({
            resourcesData : [
                { id : 1, name : 'Early', calendar : 'early' }
            ],
            columns : [
                {
                    text  : 'Worker',
                    field : 'name'
                },
                {
                    type  : 'resourceCalendar',
                    text  : 'Shift',
                    width : 120
                }
            ]
        });
        await t.waitForSelector('.b-sch-resourcenonworkingtime');

        schedulerPro.resourceStore.first.calendar = schedulerPro.calendarManagerStore.last;
        schedulerPro.resourceStore.first.calendar = null;

        await t.waitForSelectorNotFound('.b-sch-resourcetimerange');
    });

    // https://github.com/bryntum/support/issues/2906
    t.it('Should never show labels for resource non working time elements', async t => {
        await createScheduler({
            events   : [],
            features : {
                resourceNonWorkingTime : true
                // labels                 : {
                //     left : () => 'foo'
                // }
            },
            resourcesData : [
                { id : 1, name : 'Early', calendar : 'early' }
            ],
            columns : [
                {
                    text  : 'Worker',
                    field : 'name'
                }
            ]
        });

        await t.waitForSelector('.b-sch-resourcenonworkingtime');
        t.selectorNotExists('.b-sch-resourcenonworkingtime:contains(foo)');
    });

    // https://github.com/bryntum/support/issues/3320
    t.it('Should not release non working elements when creating a new event', async t => {
        await createScheduler();

        const count = t.query('.b-sch-resourcenonworkingtime').length;

        await t.doubleClick('[data-id="2"] .b-sch-timeaxis-cell');

        await t.type(null, '[ESC]');

        t.selectorCountIs('.b-sch-resourcenonworkingtime', count, 'Ranges still rendered');
    });

    // https://github.com/bryntum/support/issues/3255
    t.it('Should support adding `cls` and `iconCls` fields to be able to style calendar intervals', async t => {
        createScheduler({
            startDate : new Date(2020, 2, 20),
            features  : {
                nonWorkingTime         : false,
                resourceNonWorkingTime : true
            },
            project : {
                startDate     : new Date(2020, 2, 1),
                resourcesData : [
                    { id : 1, name : 'Bob', calendar : 'general' },
                    { id : 2, name : 'Mike' }
                ],
                calendarsData : [
                    {
                        id        : 'general',
                        name      : 'General',
                        intervals : [
                            {
                                recurrentStartDate : 'on Sat at 0:00',
                                recurrentEndDate   : 'on Mon at 0:00',
                                isWorking          : false,
                                cls                : 'weekends',
                                iconCls            : 'b-fa b-fa-home'
                            }
                        ]
                    }
                ]
            }
        });

        await t.waitForSelector('.b-sch-resourcenonworkingtime.weekends i.b-fa-home');
        t.pass('cls + iconCls class added');
    });

    t.it('Should redraw when loading calendar data', async t => {
        t.beforeEach(async t => {
            await createScheduler({
                startDate : new Date(2020, 2, 20),
                features  : {
                    nonWorkingTime         : false,
                    resourceNonWorkingTime : true
                },
                project : {
                    startDate     : new Date(2020, 2, 1),
                    resourcesData : [
                        { id : 1, name : 'Bob', calendar : 'general' }
                    ],
                    calendarsData : [
                        {
                            id        : 'general',
                            name      : 'General',
                            intervals : [
                                {
                                    startDate : '2020-03-21',
                                    endDate   : '2020-03-22',
                                    isWorking : false
                                }
                            ]
                        }
                    ]
                }
            });
        });

        t.it('Should redraw, when updating data directly', async t => {
            t.selectorCountIs('.b-sch-resourcenonworkingtime', 1, '1 non-working time region');

            project.calendarManagerStore.data = [
                {
                    id        : 'general',
                    name      : 'General',
                    intervals : [
                        {
                            startDate : '2020-03-21',
                            endDate   : '2020-03-22',
                            isWorking : false
                        },
                        {
                            startDate : '2020-03-23',
                            endDate   : '2020-03-24',
                            isWorking : false
                        }
                    ]
                }
            ];

            await project.commitAsync();

            t.selectorCountIs('.b-sch-resourcenonworkingtime', 2, '2 non-working time region');
        });

        t.it('Should redraw, when updating data directly (syncDataOnLoad=true)', async t => {
            t.selectorCountIs('.b-sch-resourcenonworkingtime', 1, '1 non-working time region');

            project.calendarManagerStore.syncDataOnLoad = true;

            project.calendarManagerStore.data = [
                {
                    id        : 'general',
                    name      : 'General',
                    intervals : [
                        {
                            startDate : '2020-03-21',
                            endDate   : '2020-03-22',
                            isWorking : false
                        },
                        {
                            startDate : '2020-03-23',
                            endDate   : '2020-03-24',
                            isWorking : false
                        }
                    ]
                }
            ];

            await project.commitAsync();

            t.selectorCountIs('.b-sch-resourcenonworkingtime', 2, '2 non-working time region');
        });

        t.it('Should redraw, when updating data directly (addInterval)', async t => {
            t.selectorCountIs('.b-sch-resourcenonworkingtime', 1, '1 non-working time region');

            project.getCalendarById('general').addInterval({
                startDate : '2020-03-23',
                endDate   : '2020-03-24',
                isWorking : false
            });

            await project.commitAsync();

            t.selectorCountIs('.b-sch-resourcenonworkingtime', 2, '2 non-working time region');
        });
    });

    // https://github.com/bryntum/support/issues/6493
    t.it('Should render `name` of calendar interval into the bar', async t => {
        schedulerPro = new SchedulerPro({
            appendTo   : document.body,
            tickSize   : 40,
            viewPreset : 'hourAndDay',
            resources  : [
                { id : 1, name : 'Early', calendar : 'early' }
            ],
            calendars : [
                {
                    id                       : 'early',
                    name                     : 'Early shift',
                    unspecifiedTimeIsWorking : true,
                    intervals                : [
                        {
                            isWorking          : false,
                            recurrentStartDate : 'at 14:00',
                            recurrentEndDate   : 'at 6:00'
                        },
                        {
                            isWorking          : false,
                            name               : 'Break',
                            cls                : 'break',
                            recurrentStartDate : 'on Mon at 10:00',
                            recurrentEndDate   : 'on Mon at 11:00'
                        }
                    ]
                }
            ],
            features : {
                resourceNonWorkingTime : true
            },
            startDate : '2023-03-27',
            endDate   : '2023-03-28'
        });

        await t.waitForSelector('.break:textEquals("Break")');

        schedulerPro.calendarManagerStore.first.intervals.last.name = 'Broke';

        await t.waitForSelector('.break:textEquals("Broke")');
    });

    // https://github.com/bryntum/support/issues/6545
    t.it('Should fire events', async t => {
        schedulerPro = new SchedulerPro({
            appendTo   : document.body,
            tickSize   : 40,
            viewPreset : 'hourAndDay',
            resources  : [
                { id : 1, name : 'Early', calendar : 'early' }
            ],
            calendars : [
                {
                    id                       : 'early',
                    name                     : 'Early shift',
                    unspecifiedTimeIsWorking : true,
                    intervals                : [
                        {
                            isWorking          : false,
                            recurrentStartDate : 'at 14:00',
                            recurrentEndDate   : 'at 6:00'
                        },
                        {
                            isWorking          : false,
                            name               : 'Break',
                            cls                : 'break',
                            recurrentStartDate : 'on Mon at 10:00',
                            recurrentEndDate   : 'on Mon at 11:00'
                        }
                    ]
                }
            ],
            features : {
                resourceNonWorkingTime : {
                    enableMouseEvents : true
                }
            },
            startDate : '2023-03-27',
            endDate   : '2023-03-28'
        });

        t.firesOnce(schedulerPro, 'resourceNonWorkingTimeDblClick');
        await t.doubleClick('.break:textEquals("Break")');

        await t.waitFor(300);

        t.firesOnce(schedulerPro, 'resourceNonWorkingTimeContextMenu');
        await t.rightClick('.break:textEquals("Break")');

        t.firesOnce(schedulerPro, 'resourceNonWorkingTimeClick');
        await t.click('.break:textEquals("Break")');
    });
});
