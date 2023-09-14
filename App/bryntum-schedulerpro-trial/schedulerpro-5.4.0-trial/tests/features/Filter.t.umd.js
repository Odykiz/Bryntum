
StartTest(t => {
    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy?.());

    // https://github.com/bryntum/support/issues/2985
    t.it('Should not throw exception when load project after filter store', async t => {
        t.mockUrl('load', {
            responseText : JSON.stringify({
                success     : true,
                assignments : {
                    rows : [
                        { id : 1, resourceId : 1, eventId : 1 },
                        { id : 2, resourceId : 2, eventId : 2 }
                    ]
                },
                events : {
                    rows : [
                        { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 3 },
                        { id : 2, name : 'Event 2', startDate : '2020-03-29', duration : 3 }
                    ]
                },
                resources : {
                    rows : [
                        { id : 1, name : 'One' },
                        { id : 2, name : 'Two' }
                    ]
                }
            })
        });

        schedulerPro = await t.getSchedulerProAsync({
            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ],

            project : {
                autoLoad  : true,
                transport : {
                    load : {
                        url : 'load'
                    }
                }
            }
        });

        await t.waitForEvent(schedulerPro.project, 'load');
        await schedulerPro.resourceStore.filter('name', 'One');
        await schedulerPro.project.load();
        schedulerPro.resourceStore.clearFilters();
    });
});
