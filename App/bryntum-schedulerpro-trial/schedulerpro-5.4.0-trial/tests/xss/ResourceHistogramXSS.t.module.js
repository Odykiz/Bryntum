
StartTest(t => {

    let histogram;

    t.beforeEach(t => histogram?.destroy?.());

    t.it('Check XSS sanity', async t => {

        const project = new ProjectModel({
            eventsData : [
                {
                    id                : 1,
                    startDate         : new Date(2020, 11, 13),
                    duration          : 8,
                    manuallyScheduled : true
                }
            ],
            resourcesData : [
                { id : 'r1', name : 'Mike' }
            ],
            assignmentsData : [
                { id : 'a1', resource : 'r1', event : 1, units : 100 }
            ]
        });

        histogram = new ResourceHistogram({
            appendTo : document.body,
            columns  : [
                {
                    width : 200,
                    field : 'name',
                    text  : 'Resource'
                }
            ],
            startDate  : new Date(2020, 11, 13),
            endDate    : new Date(2020, 11, 20),
            showBarTip : true,
            project
        });

        t.injectXSS(histogram);

        await t.moveMouseTo('rect[data-index="1"]');
        await t.waitForSelector('.b-tooltip');
    });

});
