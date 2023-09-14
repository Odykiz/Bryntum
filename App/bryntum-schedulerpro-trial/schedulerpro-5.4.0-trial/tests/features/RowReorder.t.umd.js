
StartTest(t => {
    let scheduler;

    t.beforeEach(() => scheduler?.destroy());

    t.it('Should drop to closed group (group + filter)', async t => {
        scheduler = await t.getSchedulerProAsync({
            features : {
                rowReorder : true,
                filter     : true,
                group      : true
            },
            project : {
                resourceStore : {
                    data    : DataGenerator.generateData(10),
                    filters : [{
                        property : 'age',
                        operator : '>',
                        value    : 20
                    }],
                    groupers : [{ field : 'city' }]
                }
            },
            columns : [
                { text : 'Name', field : 'name' },
                { text : 'Age', field : 'age' },
                { text : 'City', field : 'city' }
            ]
        });

        scheduler.features.group.collapseAll();

        scheduler.features.group.toggleCollapse('group-header-Stockholm', false);

        await t.dragTo({
            source : '[data-id="3"]',
            target : '[data-id="group-header-New York"]'
        });
    });
});
