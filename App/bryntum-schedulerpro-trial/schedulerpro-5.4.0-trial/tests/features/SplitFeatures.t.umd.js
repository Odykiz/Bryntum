StartTest(t => {
    let scheduler, topRight, bottomLeft, bottomRight;

    t.beforeEach(() => scheduler?.destroy());

    async function setup(t, config = {}) {
        scheduler = new SchedulerPro({
            appendTo : document.body,

            height : 768,

            enableEventAnimations : false,
            useInitialAnimation   : false,
            startDate             : '2023-05-01',
            endDate               : '2023-07-31',

            features : {
                split : true
            },

            project : {
                calendar      : 'general',
                calendarsData : [
                    {
                        id                       : 'general',
                        name                     : 'General',
                        unspecifiedTimeIsWorking : true,
                        intervals                : [
                            {
                                recurrentStartDate : 'on Sat at 0:00',
                                recurrentEndDate   : 'on Mon at 0:00',
                                isWorking          : false
                            }
                        ]
                    },
                    {
                        id                       : 'tue-wed',
                        name                     : 'Tue-Wed',
                        unspecifiedTimeIsWorking : true,
                        intervals                : [
                            {
                                recurrentStartDate : 'on Tue at 0:00',
                                recurrentEndDate   : 'on Fri at 0:00',
                                isWorking          : false,
                                name               : 'A'
                            }
                        ]
                    }
                ],
                resourcesData : ArrayHelper.populate(100, i => ({
                    id     : i + 1,
                    name   : `Resource ${i + 1}`,
                    number : i,
                    size   : i
                })),
                eventsData : ArrayHelper.populate(500, i => ({
                    id          : i + 1,
                    resourceId  : (i % 100) + 1,
                    name        : `Event ${i + 1}`,
                    startDate   : new Date(2023, 4, 1, 10 + i * 5, 0),
                    percentDone : i % 100,
                    duration    : 5
                }))
            },
            columns : [
                { text : 'Name', field : 'name', width : 150 },
                { text : 'Number', field : 'number', width : 150 },
                { text : 'Size', field : 'size', width : 150 }
            ],

            subGridConfigs : {
                locked : {
                    width : 200
                }
            },

            ...config
        });

        ([, topRight, bottomLeft, bottomRight] = await scheduler.split({ direction : 'both' }));

        await t.waitForProjectReady(scheduler);
    }

    t.describe('CalendarHighlight', t => {
        t.it('Should highlight in all splits', async t => {
            await setup(t, {
                features : {
                    calendarHighlight : {
                        calendar : 'resource'
                    },
                    nonWorkingTime : false,
                    split          : true
                }
            });

            scheduler.resourceStore.first.calendar = 'tue-wed';

            await bottomLeft.scrollToTop();

            await t.dragBy({
                source   : '.b-split-bottom-end $event=101',
                delta    : [50, 0],
                dragOnly : true
            });

            t.selectorExists('.b-split-top-start .b-sch-highlighted-calendar-range', 'Calendar highlight found in top left');
            t.selectorExists('.b-split-top-end .b-sch-highlighted-calendar-range', 'Calendar highlight found in top right');
            t.selectorExists('.b-split-bottom-start .b-sch-highlighted-calendar-range', 'Calendar highlight found in bottom left');
            t.selectorExists('.b-split-bottom-end .b-sch-highlighted-calendar-range', 'Calendar highlight found in bottom right');

            await t.mouseUp();

            t.selectorNotExists('.b-sch-highlighted-calendar-range', 'No calendar highlight found');
        });
    });

    t.describe('EventSegments', t => {
        t.it('Should render segments in all splits', async t => {
            await setup(t, {
                features : {
                    eventSegments : true,
                    split         : true
                }
            });

            scheduler.eventStore.data = [
                {
                    id         : 1,
                    startDate  : new Date(2023, 4, 2),
                    duration   : 10,
                    resourceId : 1,
                    segments   : [
                        {
                            startDate : new Date(2023, 4, 2),
                            duration  : 2,
                            name      : 'One'
                        },
                        {
                            startDate : new Date(2023, 4, 8),
                            duration  : 2,
                            name      : 'Two'
                        }
                    ]
                }
            ];

            await t.waitForProjectReady(scheduler);

            bottomLeft.scrollable.y = 0;
            topRight.scrollable.x = 0;

            await t.waitForSelectorCount('.b-segmented', 4);

            t.selectorCountIs('.b-split-top-start .b-segmented', 1, '1 segmented event in top left');
            t.selectorCountIs('.b-split-top-end .b-segmented', 1, '1 segmented event in top right');
            t.selectorCountIs('.b-split-bottom-start .b-segmented', 1, '1 segmented event in bottom left');
            t.selectorCountIs('.b-split-bottom-end .b-segmented', 1, '1 segmented event in bottom right');
        });
    });

    t.describe('NestedEvents', t => {
        t.it('Should render nested events in all splits', async t => {
            await setup(t, {
                features : {
                    nestedEvents : true,
                    split        : true
                },
                project : {
                    resourcesData : ArrayHelper.populate(100, i => ({
                        id     : i + 1,
                        name   : `Resource ${i + 1}`,
                        number : i,
                        size   : i
                    })),
                    eventStore : {
                        tree : true,
                        data : [
                            {
                                id        : 1,
                                startDate : new Date(2023, 4, 2),
                                duration  : 10,
                                name      : 'Parent',
                                children  : [
                                    {
                                        id        : 11,
                                        startDate : new Date(2023, 4, 2),
                                        duration  : 3,
                                        name      : 'One'
                                    },
                                    {
                                        id        : 12,
                                        startDate : new Date(2023, 4, 8),
                                        duration  : 2,
                                        name      : 'Two'
                                    }
                                ]
                            }
                        ]
                    },
                    assignmentsData : [
                        { id : 1, resourceId : 1, eventId : 1 },
                        { id : 2, resourceId : 1, eventId : 11 },
                        { id : 3, resourceId : 1, eventId : 12 }
                    ]
                }
            });

            bottomLeft.scrollable.y = 0;
            topRight.scrollable.x = 0;

            await t.waitForSelectorCount('.b-nested-event', 8);

            t.selectorCountIs('.b-split-top-start .b-nested-event', 2, '2 events in top left');
            t.selectorCountIs('.b-split-top-end .b-nested-event', 2, '2 events in top right');
            t.selectorCountIs('.b-split-bottom-start .b-nested-event', 2, '2 events in bottom left');
            t.selectorCountIs('.b-split-bottom-end .b-nested-event', 2, '2 events in bottom right');
        });
    });

    t.describe('PercentBar', t => {
        t.it('Should render percent bar in all splits', async t => {
            await setup(t, {
                features : {
                    percentBar : true,
                    split      : true
                }
            });

            t.selectorExists('[data-event-id="5"] .b-task-percent-bar', 'Percent bar found in top left');
            t.selectorExists('[data-event-id="105"] .b-task-percent-bar', 'Percent bar found in top right');
            t.selectorExists('[data-event-id="7"] .b-task-percent-bar', 'Percent bar found in bottom left');
            t.selectorExists('[data-event-id="107"] .b-task-percent-bar', 'Percent bar found in bottom right');
        });

        t.it('Should live resize percent bar in all splits', async t => {
            await setup(t, {
                features : {
                    percentBar : true,
                    split      : true
                }
            });

            bottomRight.scrollable.x = 0;
            bottomLeft.scrollable.y = 0;

            await t.moveMouseTo('$event=5');

            await t.dragBy({
                source   : '.b-task-percent-bar-handle',
                delta    : [20, 0],
                dragOnly : true
            });

            await t.waitForSelector('.b-split-top-start [data-event-id="5"] .b-task-percent-bar[data-percent="19"]');
            await t.waitForSelector('.b-split-top-end [data-event-id="5"] .b-task-percent-bar[data-percent="19"]');
            await t.waitForSelector('.b-split-bottom-start [data-event-id="5"] .b-task-percent-bar[data-percent="19"]');
            await t.waitForSelector('.b-split-bottom-end [data-event-id="5"] .b-task-percent-bar[data-percent="19"]');

            await t.mouseUp();
        });
    });

    t.describe('ResourceNonWorkingTime', t => {
        t.it('Should render resource non-working time in all splits', async t => {
            await setup(t, {
                features : {
                    resourceNonWorkingTime : {
                        maxTimeAxisUnit : 'month'
                    },
                    split          : true,
                    nonWorkingTime : false
                }
            });

            await bottomLeft.scrollToTop();

            scheduler.resourceStore.first.calendar = 'tue-wed';

            await t.waitForSelector('.b-sch-resourcenonworkingtime:contains(A)');

            t.selectorExists('.b-split-top-start .b-sch-resourcenonworkingtime:contains(A)', 'Resource non-working time found in top left');
            t.selectorExists('.b-split-top-end .b-sch-resourcenonworkingtime:contains(A)', 'Resource non-working time found in top right');
            t.selectorExists('.b-split-bottom-start .b-sch-resourcenonworkingtime:contains(A)', 'Resource non-working time found in bottom left');
            t.selectorExists('.b-split-bottom-end .b-sch-resourcenonworkingtime:contains(A)', 'Resource non-working time found in bottom right');

        });
    });

    t.describe('TaskEdit', t => {
        t.it('Should allow editing in all splits', async t => {
            await setup(t, {
                features : {
                    taskEdit : true,
                    split    : true
                }
            });

            topRight.scrollable.x = 0;
            await bottomLeft.scrollToTop();

            await t.doubleClick('.b-split-bottom-start $event=3');

            await t.click('input[name=name]');

            await t.type({
                text          : 'foo[TAB]',
                clearExisting : true
            });

            t.selectorExists('.b-split-top-start [data-event-id="3"]:contains(foo)', 'Event updated in top left');
            t.selectorExists('.b-split-top-end [data-event-id="3"]:contains(foo)', 'Event updated in top right');
            t.selectorExists('.b-split-bottom-start [data-event-id="3"]:contains(foo)', 'Event updated in bottom left');
            t.selectorExists('.b-split-bottom-end [data-event-id="3"]:contains(foo)', 'Event updated in bottom right');

            await t.click('$ref=cancelButton');

            t.waitForSelectorNotFound('[data-event-id="3"]:contains(foo)');

            t.selectorNotExists('[data-event-id="3"]:contains(foo)', 'Event reverted in all splits');
        });
    });

    t.describe('TimeSpanHighlight', t => {
        t.it('Should highlight time span in all splits', async t => {
            await setup(t, {
                features : {
                    timeSpanHighlight : true,
                    split             : true
                }
            });

            topRight.scrollable.x = 0;

            scheduler.highlightTimeSpan({
                startDate : new Date(2023, 4, 1),
                endDate   : new Date(2023, 4, 10),
                name      : 'Time off'
            });

            await t.waitForSelectorCount('.b-sch-highlighted-range', 4);

            t.selectorExists('.b-split-top-start .b-sch-highlighted-range', 'Time span highlighted in top left');
            t.selectorExists('.b-split-top-end .b-sch-highlighted-range', 'Time span highlighted in top right');
            t.selectorExists('.b-split-bottom-start .b-sch-highlighted-range', 'Time span highlighted in bottom left');
            t.selectorExists('.b-split-bottom-end .b-sch-highlighted-range', 'Time span highlighted in bottom right');

            scheduler.unhighlightTimeSpans();

            await t.waitForSelectorNotFound('.b-sch-highlighted-range');
        });
    });

    t.it('Should support Pro\' columns', async t => {
        await setup(t, {
            columns : [
                {
                    type : 'resourceCalendar'
                }
            ]
        });

        scheduler.resourceStore.first.calendar = 'tue-wed';

        await t.waitForSelector('.b-grid-cell[data-column="calendar"]:contains(Tue-Wed)');
    });
});
