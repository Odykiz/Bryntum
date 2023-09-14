
StartTest(t => {

    // Asserts initial commit handling by the project (https://github.com/bryntum/support/issues/1346)

    t.mockUrl('load', {
        delay        : 1,
        responseText : JSON.stringify({
            success : true,
            type    : 'load',
            events  : {
                rows : [
                    {
                        id           : 'e1',
                        name         : 'Buldoze 1',
                        startDate    : new Date(2019, 0, 1),
                        duration     : 10,
                        durationUnit : 'd'
                    }
                ]
            }
        })
    });

    t.mockUrl('sync', {
        delay        : 1,
        responseText : '{ "success" : true }'
    });

    t.it('silenceInitialCommit=true (default) should not trigger autoSync and accept the data changes', async t => {

        const
            async   = t.beginAsync(),
            project = new ProjectModel({
                transport : {
                    load : {
                        url : 'load'
                    },
                    sync : {
                        url : 'sync'
                    }
                },
                autoLoad  : true,
                autoSync  : true,
                listeners : {
                    load : () => {
                        t.endAsync(async);
                        t.notOk(project.crudStoreHasChanges(), 'no changes after loading');
                    }
                }
            });

        t.notOk(project.crudStoreHasChanges(), 'no changes before loading');
        t.wontFire(project, 'sync', 'no sync happened');
        await t.waitFor(100);
    });

    t.it('silenceInitialCommit=false should trigger autoSync and leave the data dirty', async t => {

        const
            async   = t.beginAsync(),
            project = new ProjectModel({
                transport : {
                    load : {
                        url : 'load'
                    },
                    sync : {
                        url : 'sync'
                    }
                },
                silenceInitialCommit : false,
                autoLoad             : true,
                autoSync             : true,
                listeners            : {
                    load : () => t.ok(project.crudStoreHasChanges(), 'there are changes after loading & propagating'),
                    sync : () => t.endAsync(async)
                }
            });

        t.notOk(project.crudStoreHasChanges(), 'no changes before loading');
    });

});
