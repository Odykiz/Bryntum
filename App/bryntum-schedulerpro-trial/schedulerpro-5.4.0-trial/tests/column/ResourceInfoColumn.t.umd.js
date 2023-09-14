
StartTest(t => {

    let schedulerPro;

    t.mockUrl('load', {
        // Emulate a network delay
        delay        : 200,
        responseText : JSON.stringify({
            success   : true,
            type      : 'load',
            resources : {
                rows : [
                    {
                        id    : 1,
                        name  : 'Buldozer',
                        image : false
                    }
                ]
            },
            assignments : {
                rows : [{
                    id       : 1,
                    resource : 1,
                    event    : 1
                }]
            },
            events : {
                rows : [
                    {
                        id           : 1,
                        name         : 'Foo 1',
                        startDate    : new Date(2019, 0, 1),
                        duration     : 2,
                        durationUnit : 'd'
                    }
                ]
            }
        })
    });

    t.beforeEach(function() {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    // https://github.com/bryntum/support/issues/2088
    t.it('Should not crash when reloading project after project is loaded', async t => {
        let secondLoadSuccess;

        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2019, 0, 1),
            endDate   : new Date(2019, 0, 31),
            project   : {
                autoLoad  : true,
                transport : {
                    load : {
                        url : 'load'
                    }
                },
                listeners : {
                    load : async() => {

                        // Trigger the second load AFTER the first is fully complete.
                        // This will result in 2 loads.
                        await schedulerPro.project.load();
                        secondLoadSuccess = true;
                    },

                    // Only listen to the initial load.
                    once : true
                }
            },
            columns : [
                {
                    type : 'resourceInfo'
                }
            ]
        });
        const { project } = schedulerPro;

        // Both the autoLoad, and the programatically called load must run to
        // completion and their full listener complement must trigger.
        t.willFireNTimes(project, 'beforeResponseApply', 2);
        t.willFireNTimes(project, 'requestDone', 2);
        t.willFireNTimes(project, 'load', 2);

        // Cannot end the test until the second async load has completed successfully.
        await t.waitFor(() => secondLoadSuccess);
    });

    // https://github.com/bryntum/support/issues/2088
    t.it('Should not crash when attempting to reloading project BEFORE project is loaded', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2019, 0, 1),
            endDate   : new Date(2019, 0, 31),
            project   : {
                autoLoad  : true,
                transport : {
                    load : {
                        url : 'load'
                    }
                }
            },
            columns : [
                {
                    type : 'resourceInfo'
                }
            ]
        });

        await t.waitFor(() => schedulerPro.project.isCrudManagerLoading);

        const { project } = schedulerPro;

        // The programmatic load will be cancelled because there is already a load in flight.
        t.willFireNTimes(project, 'loadCanceled', 1);

        // Only the autoLoad will run to completion and its full listener complement must trigger.
        t.willFireNTimes(project, 'beforeResponseApply', 1);
        t.willFireNTimes(project, 'requestDone', 1);
        t.willFireNTimes(project, 'load', 1);

        // Attempt to kick off another load before the autoLoad has finished.
        // This will be rejected. Only the autoLoad will complete.
        schedulerPro.project.load();

        // Wait for nothing. We are testing that no further project load events are fired as a result
        // of the attempt to initiate a second load. Only ONE of each event type must occur.
        // So give any potential bugs a chance to work themselves through.
        await t.waitFor(500);
    });

    // https://github.com/bryntum/support/issues/2088
    t.it('Should not crash when reloading DURING CrudManager\'s postprocessing of the Ajax response', async t => {
        let loadCount = 0;

        schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            startDate : new Date(2019, 0, 1),
            endDate   : new Date(2019, 0, 31),
            project   : {
                autoLoad  : true,
                transport : {
                    load : {
                        url : 'load'
                    }
                },
                listeners : {
                    load() {
                        loadCount++;
                    }
                }
            },
            columns : [
                {
                    type : 'resourceInfo'
                }
            ]
        });
        const { project } = schedulerPro;

        // Both the autoLoad, and the programatically called load must run to
        // completion and their full listener complement must trigger.
        t.willFireNTimes(project, 'beforeResponseApply', 2);
        t.willFireNTimes(project, 'requestDone', 2);
        t.willFireNTimes(project, 'load', 2);

        // Wait only for the *store driven* first refresh that will happen
        // while the CrudManager (project) applies its data to its stores.
        // Its internalOnResponse will be paused at an await.
        await t.waitForRowsVisible(schedulerPro);

        // The first load has in fact completed now, so cannot be aborted,
        // it is still in the process of loading all its stores.
        // This must initiate another load.
        schedulerPro.project.load();

        await t.waitFor(() => loadCount === 2);
    });
});
