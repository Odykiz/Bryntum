
StartTest(t => {
    t.it('Should not crash when removing all resources, having unresolved assignments', t => {
        const project = new ProjectModel({
            resourcesData : [
                { id : 'r1' }
            ],

            assignmentsData : [
                { id : 'a1', event : null, resource : 'r1' }
            ]
        });

        project.resourceStore.removeAll();

        t.pass('Did not crash');
    });

    // https://github.com/bryntum/support/issues/5724
    t.it('Should not crash when setting resource children from [] to true when syncDataOnLoad', async t => {
        const scheduler = await t.getSchedulerPro({
            columns : [
                {
                    type  : 'tree',
                    text  : 'Name',
                    field : 'name'
                }
            ],
            features : { tree : true },
            project  : {
                events        : [],
                resourceStore : {
                    syncDataOnLoad : true,
                    data           : [{
                        id       : 1,
                        name     : 'Parent',
                        children : [{
                            id   : 11,
                            name : 'Child'
                        }]
                    }]
                }
            }
        });

        scheduler.resources = [{ id : 1, children : true }];

        scheduler.destroy();
    });

    // https://github.com/bryntum/support/issues/6279
    t.it('Should handle adding a new parent record with 0 children', async t => {
        const newRecord = new ResourceModel({
            name     : 'Parent 1',
            parentId : null,
            children : []
        });

        t.mockUrl('sync', {
            responseText : {
                resources : {
                    rows : [
                        { id : 1, $PhantomId : newRecord.id }
                    ]
                }
            }
        });

        const project = new ProjectModel({
            transport : {
                sync : {
                    url : 'sync'
                }
            },
            eventsData : [{
                startDate    : new Date(2020, 11, 21),
                duration     : 10,
                durationUnit : 'd'
            }],
            resourceStore : {
                tree : true
            }
        });

        await project.commitAsync();

        await project.resourceStore.addAsync(newRecord);
        t.ok(project.changes, 'Project should have changes');
        await project.sync();

        t.is(newRecord.isPhantom, false, 'Record created ok');
        t.is(newRecord.children.length, 0, 'No children');
    });

    // https://github.com/bryntum/support/issues/4403
    t.it('Should not crash setting new resources, directly after instantiation', async t => {
        const scheduler = t.getSchedulerPro({
            events      : [{}],
            resources   : [{}],
            assignments : [{}]
        });

        scheduler.resources = [
            {
                id         : 1,
                name       : 'George',
                calendar   : 'day',
                role       : 'Office',
                eventColor : 'blue'
            }
        ];

        await t.waitForSelector('.b-grid-cell:contains(George)');
    });
});
