
StartTest(t => {
    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    t.mockUrl('loadurl', {
        delay        : 500,
        responseText : JSON.stringify({
            success   : true,
            calendars : {
                rows : [
                    {
                        id                       : 'day',
                        name                     : 'Day',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                recurrentStartDate : 'at 8:00',
                                recurrentEndDate   : 'at 17:00',
                                isWorking          : true
                            }
                        ]
                    }
                ]
            },
            resources : {
                rows : [
                    {
                        id         : 1,
                        name       : 'George',
                        calendar   : 'day',
                        type       : 'Operators',
                        eventColor : 'blue'
                    },
                    {
                        id         : 2,
                        name       : 'Rob',
                        calendar   : 'day',
                        type       : 'Operators',
                        eventColor : 'blue'
                    },
                    {
                        id       : 3,
                        name     : 'Mike',
                        calendar : 'day',
                        type     : 'Operators'
                    }
                ]
            },
            events : {
                rows : [
                    {
                        id             : 1,
                        name           : 'Meeting',
                        startDate      : '2020-03-23T07:00',
                        duration       : 4,
                        durationUnit   : 'hour',
                        constraintDate : '2020-03-23T07:00',
                        constraintType : 'startnoearlierthan',
                        percentDone    : 100
                    }
                ]
            },
            assignments : {
                rows : [
                    {
                        id       : 1,
                        event    : 1,
                        resource : 1
                    }
                ]
            },
            dependencies : {
                rows : [

                ]
            }
        }
        )
    });

    // https://github.com/bryntum/support/issues/2858
    t.it('Should be no errors after reload with collapsed group', async t => {
        const project = new ProjectModel({
            transport : {
                load : {
                    url : 'loadurl'
                }
            }
        });

        schedulerPro = await t.getSchedulerProAsync({
            appendTo  : document.body,
            startDate : new Date(2018, 0, 30),
            endDate   : new Date(2018, 2, 2),
            features  : {
                group : 'type'
            },
            project
        });

        await project.load();

        schedulerPro.resourceStore.collapse(schedulerPro.resourceStore.first);

        await project.load();

        t.ok('No errors after project load');
    });
});
