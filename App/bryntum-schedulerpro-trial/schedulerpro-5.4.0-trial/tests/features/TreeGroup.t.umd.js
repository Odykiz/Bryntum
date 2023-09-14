
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}, otherFeatures = {}, levels = ['capacity']) {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                tree      : true,
                treeGroup : {
                    levels
                },
                ...otherFeatures
            },

            resourcesData : [
                {
                    id       : 'r100',
                    name     : 'Kastrup Airport',
                    expanded : true,
                    children : [
                        {
                            id       : 1,
                            name     : 'Gate 1',
                            capacity : 100,
                            domestic : true
                        },
                        {
                            id       : 2,
                            name     : 'Gate 2',
                            capacity : 200,
                            domestic : false
                        },
                        {
                            id       : 3,
                            name     : 'Gate 3',
                            capacity : 100,
                            domestic : true,
                            calendar : 'early'
                        },
                        {
                            id       : 4,
                            name     : 'Gate 4',
                            capacity : 300,
                            domestic : false,
                            calendar : 'late'
                        }
                    ]
                }
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

            resourceStore : {
                fields : ['capacity', 'domestic']
            },

            columns : [
                { field : 'name', text : 'Name', width : 200, type : 'tree' },
                { field : 'capacity', text : 'Capacity', width : 80 },
                { field : 'domestic', text : 'Domestic', width : 80 }
            ],

            ...config
        });

    }

    t.it('Should render as expected when starting without grouping', async t => {
        await setup({}, {}, null);

        await schedulerPro.group(['capacity']);

        t.selectorCountIs('.b-sch-event', 2, 'Events rendered');

        const
            bounds1 = Rectangle.from('[data-event-id="1"]', schedulerPro.timeAxisSubGridElement),
            bounds2 = Rectangle.from('[data-event-id="2"]', schedulerPro.timeAxisSubGridElement);

        t.isApproxPx(bounds1.top, 61 * 1 + 10, 'Event 1 top correct');
        t.isApproxPx(bounds2.top, 61 * 4 + 10, 'Event 2 top correct');
    });

    t.it('Should render as expected when starting with grouping', async t => {
        await setup();

        t.selectorCountIs('.b-sch-event', 2, 'Events rendered');

        const
            bounds1 = Rectangle.from('[data-event-id="1"]', schedulerPro.timeAxisSubGridElement),
            bounds2 = Rectangle.from('[data-event-id="2"]', schedulerPro.timeAxisSubGridElement);

        t.isApproxPx(bounds1.top, 61 * 1 + 10, 'Event 1 top correct');
        t.isApproxPx(bounds2.top, 61 * 4 + 10, 'Event 2 top correct');
    });

    t.describe('Should support features', t => {
        t.it('Should support CalendarHighlight', async t => {
            await setup({}, { calendarHighlight : true });

            schedulerPro.highlightResourceCalendars([schedulerPro.store.first.lastChild]);

            t.selectorExists('.b-sch-highlighted-calendar-range', 'Calendar highlight rendered');

            schedulerPro.unhighlightCalendars();

            t.selectorNotExists('.b-sch-highlighted-calendar-range', 'Calendar highlight not rendered');
        });

        t.it('Should support ResourceNonWorkingTime', async t => {
            await setup({}, {
                resourceNonWorkingTime : {
                    maxTimeAxisUnit : 'day'
                }
            });

            t.selectorExists('.b-sch-resourcenonworkingtime', 'Resource non-working time rendered');
        });

        t.it('Should support TaskEdit', async t => {
            await setup({}, { taskEdit : true });

            await t.doubleClick('[data-event-id="1"]');

            await t.waitForSelector('.b-schedulerpro-taskeditor');

            await t.type({
                target        : 'input[name="name"]',
                text          : 'Foo[ENTER]',
                clearExisting : true
            });

            t.selectorExists('.b-sch-event:contains(Foo)', 'Event updated');
        });

        t.it('Should support TimeSpanHighlight', async t => {
            await setup({}, { timeSpanHighlight : true });

            schedulerPro.highlightTimeSpan({
                startDate      : new Date(2020, 2, 23),
                endDate        : new Date(2020, 2, 25),
                resourceRecord : schedulerPro.store.first.lastChild,
                name           : 'Important'
            });

            t.selectorExists('.b-sch-highlighted-range:contains(Important)', 'Time span highlight rendered');

            schedulerPro.highlightTimeSpan({
                startDate      : new Date(2020, 2, 23),
                endDate        : new Date(2020, 2, 25),
                resourceRecord : schedulerPro.resourceStore.getById(4),
                name           : 'Fun'
            });

            t.selectorExists('.b-sch-highlighted-range:contains(Fun)', 'Time span highlight rendered');
        });
    });
});
