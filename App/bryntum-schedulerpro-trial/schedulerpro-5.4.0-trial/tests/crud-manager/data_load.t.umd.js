
StartTest(t => {
    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    // https://github.com/bryntum/support/issues/5917
    t.it('Should not throw when loading data with `loadCrudManagerData`', async t => {

        schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            columns   : [{ text : 'Name', field : 'name', width : 160 }],
            startDate : new Date(2022, 0, 1),
            endDate   : new Date(2022, 0, 10)
        });

        const project = schedulerPro.project;

        await project.commitAsync();

        project.loadCrudManagerData({
            success : true,
            project : {
                // having a calendar (even a missing one) is important for issue reproduction
                // (the exception is triggered by the calendar-related code)
                calendar : 'workhours'
            },
            resources : {
                rows : [
                    { id : 1, name : 'Row 1' },
                    { id : 2, name : 'Row 2' },
                    { id : 3, name : 'Row 3' }
                ]
            },
            events : {
                rows : [
                    {
                        id         : 1,
                        resourceId : 1,
                        name       : 'Event 1',
                        startDate  : '2022-01-01',
                        endDate    : '2022-01-05',
                        iconCls    : 'b-fa b-fa-flag'
                    },
                    {
                        id         : 2,
                        resourceId : 2,
                        name       : 'Event 2',
                        startDate  : '2022-01-07',
                        endDate    : '2022-01-12',
                        eventColor : 'blue'
                    }
                ]
            },
            dependencies : {
                rows : [{ id : 1, fromEvent : 1, toEvent : 2, lag : 2 }]
            }
        });

        await project.await('dataready');
    });
});
