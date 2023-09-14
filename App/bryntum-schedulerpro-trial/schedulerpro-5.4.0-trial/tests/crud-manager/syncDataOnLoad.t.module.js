
StartTest(t => {
    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    // https://github.com/bryntum/support/issues/4668
    t.it('Should update startDate', async t => {
        t.mockUrl('loadFirst', {
            delay        : 100,
            responseText : JSON.stringify({
                resources : {
                    rows : [
                        { id : 1, name : 'R1' }
                    ]
                },
                assignments : {
                    rows : [
                        { id : 1, eventId : 10, resourceId : 1 }
                    ]
                },
                events : {
                    rows : [
                        {
                            id         : 10,
                            name       : 'First',
                            startDate  : '2022-03-28',
                            endDate    : '2022-03-29',
                            eventColor : 'blue'
                        }
                    ]
                }
            })
        });

        t.mockUrl('loadSecond', {
            delay        : 100,
            responseText : JSON.stringify({
                events : {
                    rows : [
                        {
                            id         : 10,
                            name       : 'Second',
                            startDate  : '2022-03-31',
                            endDate    : '2022-04-01',
                            eventColor : 'red'
                        }
                    ]
                }
            })
        });

        schedulerPro = new SchedulerPro({
            appendTo : document.body,
            project  : {
                transport : {
                    load : {
                        url : 'loadFirst'
                    }
                },
                eventStore : {
                    syncDataOnLoad : true
                },
                autoLoad : true
            },
            startDate : '2022-03-27',
            endDate   : '2022-04-03'
        });

        await t.waitForSelector('.b-sch-event');

        schedulerPro.project.transport.load.url = 'loadSecond';
        await schedulerPro.project.load(); // loadInlineData works, some flag must differ

        await schedulerPro.project.commitAsync();

        t.is(schedulerPro.eventStore.first.startDate, new Date(2022, 2, 31), 'Start date changed');
    });
});
