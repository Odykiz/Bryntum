
StartTest(t => {

    // https://github.com/bryntum/support/issues/1655
    t.it('404 response does not cause infinite loop when autoSync=True', async t => {
        const project = new ProjectModel({
            autoSync         : true,
            delayCalculation : false,
            transport        : {
                sync : {
                    url : 'doesnotexist'
                }
            }
        });

        await project.commitAsync();

        project.eventStore.add({ startDate : new Date(2020, 9, 12), duration : 1 });

        t.willFireNTimes(project, 'beforesync', 1);
        t.willFireNTimes(project, 'syncFail', 1);
        t.wontFire(project, 'beforesyncapply');
        t.wontFire(project, 'sync');

        await t.waitFor(1000);

        project.destroy();
    });

    // https://github.com/bryntum/support/issues/4851
    t.it('Malformed sync response should not cause infinite sync requests', async t => {
        t.mockUrl('url', {
            delay        : 1,
            responseText : JSON.stringify({
                success     : true,
                resources   : { rows : [{ id : 1, name : 'Resource 1' }] },
                assignments : { rows : [] },
                events      : { rows : [] }
            })
        });

        const project = new ProjectModel({
            autoSync         : true,
            autoLoad         : true,
            delayCalculation : false,
            validateResponse : false,
            transport        : {
                load : {
                    url : 'url'
                },
                sync : {
                    url : 'url'
                }
            }
        });

        // waiting for initial load
        await project.await('load');

        // adding some new records and then committing
        project.assignmentStore.add({ id : 1, event : 1, resource : 1 });
        project.eventStore.add({ id : 1, startDate : new Date(2020, 9, 12), duration : 1 });

        // we expect only 1 sync request during the 1s, not the infinite loop
        t.willFireNTimes(project, 'sync', 1);

        await project.commitAsync();

        await t.waitFor(1000);

        project.destroy();
    });
});
