
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.mockUrl('loadurl', {
        delay        : 500,
        responseText : JSON.stringify({
            success   : true,
            resources : {
                rows : [
                    { id : 'a' }
                ]
            },
            assignments : {
                rows : [
                    {
                        id       : 'a1',
                        resource : 'a',
                        event    : 1
                    }
                ]
            },
            events : {
                rows : [
                    {
                        id        : 1,
                        startDate : '2018-02-01',
                        endDate   : '2018-03-01'
                    }
                ]
            }
        })
    });

    t.mockUrl('syncurl', {
        delay        : 500,
        responseText : JSON.stringify({
            success   : true,
            resources : {
                rows : [
                    { id : 'a' }
                ]
            }
        })
    });

    t.it('loadMask is shown when loading is triggered on scheduler construction', t => {
        const async = t.beginAsync();

        const project = new ProjectModel({
            autoLoad  : true,
            transport : {
                sync : {
                    url : 'syncurl'
                },
                load : {
                    url : 'loadurl'
                }
            }
        });

        schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2018, 0, 30),
            endDate   : new Date(2018, 2, 2),
            project
        });

        t.chain(
            { waitForSelector : '.b-mask-content:contains(Loading)', desc : 'loadMask showed up' },
            { waitForSelectorNotFound : '.b-mask-content:contains(Loading)', desc : 'loadMask disappeared' },
            () => t.endAsync(async)
        );
    });

    t.it('loadMask is shown when loading is triggered after scheduler construction', t => {
        const project = new ProjectModel({
            autoLoad  : false,
            transport : {
                sync : {
                    url : 'syncurl'
                },
                load : {
                    url : 'loadurl'
                }
            }
        });

        schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2018, 0, 30),
            endDate   : new Date(2018, 2, 2),
            project
        });

        t.chain(
            { waitForSelector : '.b-mask-content:contains(Loading)', desc : 'loadMask showed up', trigger : () => project.load() },
            { waitForSelectorNotFound : '.b-mask-content:contains(Loading)', desc : 'loadMask disappeared' }
        );
    });

    t.it('syncMask is shown when loading is triggered after scheduler construction', t => {
        const project = new ProjectModel({
            autoLoad  : false,
            transport : {
                sync : {
                    url : 'syncurl'
                },
                load : {
                    url : 'loadurl'
                }
            }
        });

        schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2018, 0, 30),
            endDate   : new Date(2018, 2, 2),
            project
        });

        t.chain(
            () => project.load(),
            next => {
                schedulerPro.resourceStore.first.name = 'foo';
                next();
            },
            { waitForSelector : '.b-mask-content:contains(Saving)', desc : 'syncMask showed up', trigger : () => project.sync() },
            { waitForSelectorNotFound : '.b-mask-content:contains(Saving)', desc : 'syncMask disappeared' }
        );
    });
});
