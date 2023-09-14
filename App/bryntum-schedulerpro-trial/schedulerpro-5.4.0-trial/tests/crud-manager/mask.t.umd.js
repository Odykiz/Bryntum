
StartTest(t => {

    let schedulerpro;

    t.beforeEach(() => {
        if (schedulerpro) {
            schedulerpro.project.destroy();
            schedulerpro.destroy();
        }
    });

    t.it('Should hide "No records to display" when loading and show when loaded empty data', t => {

        t.mockUrl('loadurl', {
            delay        : 1000,
            responseText : JSON.stringify({
                success     : true,
                resources   : { rows : [] },
                assignments : { rows : [] },
                events      : { rows : [] }
            })
        });

        const
            async   = t.beginAsync(),
            project = new ProjectModel({
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

        schedulerpro = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2018, 0, 30),
            endDate   : new Date(2018, 2, 2),
            project
        });

        t.selectorExists('.b-grid-empty', 'Scheduler Pro has the b-grid-empty class before load');
        project.load();
        t.chain(
            { waitForSelector : '.b-mask-content:contains(Loading)', desc : 'loadMask showed up' },
            next => {
                t.selectorNotExists('.b-grid-empty', 'Scheduler Pro has no b-grid-empty class when loading');
                next();
            },
            { waitForSelectorNotFound : '.b-mask-content:contains(Loading)', desc : 'loadMask is hidden' },
            { waitForSelector : '.b-grid-empty', desc : 'Scheduler Pro has b-grid-empty after loaded empty rows' },
            () => t.endAsync(async)
        );
    });

});
