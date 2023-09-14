
StartTest(t => {

    // https://github.com/bryntum/support/issues/3427
    t.it('Should reset NaN number field dirty state after sync', async t => {

        t.mockUrl('load', {
            responseText : {
                events : {
                    rows : [
                        {
                            id          : 1,
                            startDate   : '2022-07-26',
                            duration    : 1,
                            percentDone : '50%'
                        }
                    ]
                },
                resources : {
                    rows : [
                        { id : 1, name : 'foo' }
                    ]
                },
                assignments : {
                    rows : [
                        { id : 1, resource : 1, event : 1 }
                    ]
                }
            }
        });

        t.mockUrl('sync', '{}');

        const project = new ProjectModel({
            loadUrl : 'load',
            syncUrl : 'sync'
        });

        await project.load();

        t.notOk(project.changes, 'No changes');

        await project.sync();

        t.notOk(project.changes, 'No changes');
    });
});
