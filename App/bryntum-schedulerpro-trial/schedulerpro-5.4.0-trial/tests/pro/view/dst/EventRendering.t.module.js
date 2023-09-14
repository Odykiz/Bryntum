
StartTest(t => {
    const [springDSTDate, autumnDSTDate] = t.getDSTDates(2021);

    if (!springDSTDate) {
        t.pass('Current timezone does not have DST');
        return;
    }

    const
        springStartDate = DateHelper.add(springDSTDate, -4, 'h'),
        springEndDate   = DateHelper.add(springDSTDate, 12, 'h'),
        autumnStartDate = DateHelper.add(autumnDSTDate, -4, 'h'),
        autumnEndDate   = DateHelper.add(autumnDSTDate, 12, 'h');

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Event duration is ok when dragging over DST', async t => {
        const
            springExactDST = t.getExactDSTDate(springDSTDate),
            autumnExactDST = t.getExactDSTDate(autumnDSTDate);

        schedulerPro = await t.getSchedulerProAsync({
            startDate  : springStartDate,
            endDate    : springEndDate,
            viewPreset : {
                base           : 'hourAndDay',
                timeResolution : {
                    unit      : 'h',
                    increment : 1
                }
            },
            tickSize      : 60,
            height        : 200,
            projectConfig : {
                resourcesData : [
                    { id : 'r1', name : 'Albert' }
                ],
                eventsData : [
                    {
                        id        : 1,
                        startDate : DateHelper.add(springExactDST, -2, 'h'),
                        endDate   : springExactDST,
                        cls       : 'event-1'
                    },
                    {
                        id        : 2,
                        startDate : springExactDST,
                        endDate   : DateHelper.add(springExactDST, 2, 'h'),
                        cls       : 'event-2'
                    },
                    {
                        id        : 3,
                        startDate : DateHelper.add(autumnExactDST, -2, 'h'),
                        endDate   : autumnExactDST,
                        cls       : 'event-3'
                    },
                    {
                        id        : 4,
                        startDate : autumnExactDST,
                        endDate   : DateHelper.add(autumnExactDST, 2, 'h'),
                        cls       : 'event-4'
                    }
                ],
                assignmentsData : [
                    { id : 1, event : 1, resource : 'r1' },
                    { id : 2, event : 2, resource : 'r1' },
                    { id : 3, event : 3, resource : 'r1' },
                    { id : 4, event : 4, resource : 'r1' }
                ],
                dependenciesData : [],
                calendarsData    : []
            }
        });

        t.chain(
            { drag : '.event-2', by : [schedulerPro.tickSize, 0] },
            async() => {
                t.hasApproxWidth('.event-2', schedulerPro.tickSize * 2, 1, 'Event 2 width is ok');
            },
            { drag : '.event-1', by : [schedulerPro.tickSize, 0] },
            async() => {
                t.hasApproxWidth('.event-1', schedulerPro.tickSize * 2, 1, 'Event 1 width is ok');

                schedulerPro.setTimeSpan(autumnStartDate, autumnEndDate);
            },

            { drag : '.event-4', by : [schedulerPro.tickSize, 0] },
            async() => {
                t.hasApproxWidth('.event-4', schedulerPro.tickSize * 2, 1, 'Event 4 width is ok');
            },
            { drag : '.event-3', by : [schedulerPro.tickSize, 0] },
            async() => {
                t.hasApproxWidth('.event-3', schedulerPro.tickSize * 2, 1, 'Event 3 width is ok');
            }
        );
    });
});
