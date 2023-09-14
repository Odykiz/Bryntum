
StartTest(t => {
    let schedulerPro;

    t.beforeEach(t => {
        schedulerPro?.destroy();
    });

    // https://github.com/bryntum/support/issues/5352
    t.it('Refreshing the data with event selected should work', async t => {
        // could not reproduce this one with `getSchedulerAsync()` for some reason
        schedulerPro = window.sch = new SchedulerPro({
            appendTo   : document.body,
            startDate  : '2021-09-20',
            endDate    : '2021-10-24',
            rowHeight  : 60,
            barMargin  : 15,
            eventStyle : 'colored',
            viewPreset : 'hourAndDay',

            features : {
                tree : true
            },

            columns : [
                // A column using a custom render to display an icon + text
                {
                    text  : 'Resource',
                    width : 150,
                    field : 'name',
                    type  : 'tree'
                }
            ],

            events : [
                { id : '1', startDate : '2021-09-20T00:00:00', endDate : '2021-09-21T12:00:00', resourceId : '2', name : 'Test Event' },
                { id : '2', startDate : '2021-09-20T00:00:00', endDate : '2021-09-21T12:00:00', resourceId : '2', name : 'Test Event' }
            ],
            resources : [
                { id : '1', expanded : true, children : { id : '2', name : 'test' }, name : 'Test' }
            ],
            dependencies : [
                { from : '1', to : '2' }
            ]
        });

        await schedulerPro.project.commitAsync();

        // click to select the event
        await t.click('.b-sch-event');

        // reload data - should not throw
        schedulerPro.project.events = [
            { id : '1', startDate : '2021-09-20T00:00:00', endDate : '2021-09-21T12:00:00', resourceId : '2', name : 'Test Event' },
            { id : '2', startDate : '2021-09-20T00:00:00', endDate : '2021-09-21T12:00:00', resourceId : '2', name : 'Test Event' }
        ];

        t.pass('Should not throw');
    });
});
