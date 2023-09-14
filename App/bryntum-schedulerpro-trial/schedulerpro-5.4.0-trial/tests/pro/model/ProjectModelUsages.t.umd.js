
StartTest(t => {
    let project;

    t.beforeEach(() => {
        project?.destroy();
    });

    // https://github.com/bryntum/support/issues/5056
    t.it('Project should not suspend events in 3rd party stores', async t => {
        let id = 100;

        t.mockUrl('/load', {
            responseText : JSON.stringify({
                success : true,
                events  : {
                    rows : [
                        { id : 1, startDate : new Date(2022, 7, 1), duration : 1 },
                        { id : 2, startDate : new Date(2022, 7, 1), duration : 2 },
                        { id : 3, startDate : new Date(2022, 7, 1), duration : 3 }
                    ]
                }
            })
        });

        t.mockUrl('/sync', () => {
            return {
                responseText : JSON.stringify({
                    success : true,
                    events  : {
                        rows : [
                            {
                                $PhantomId : project.eventStore.last.id,
                                id         : id++,
                                duration   : 2
                            }
                        ]
                    }
                })
            };
        });

        project = new ProjectModel({
            transport : {
                load : {
                    url : '/load'
                },
                sync : {
                    url : '/sync'
                }
            }
        });

        await project.load();

        // create new store and fill it with events
        const store = new Store({
            data : project.eventStore.query(e => e.duration < 3)
        });

        t.is(store.count, 2, 'Store has some events');

        // add new record to the event store
        const [newEvent] = project.eventStore.add({ startDate : new Date(2022, 7, 1), duration : 1 });

        // add that record to new custom store
        store.add(newEvent);

        // custom store should be aware of the id change because it is not controlled by the engine
        t.firesOk({
            observable : store,
            events     : {
                idChange : 1
            }
        });

        // idchange should not get fired on the project store because it is supposed to be suspended
        t.firesOk({
            observable : project.eventStore,
            events     : {
                idChange : 0
            }
        });

        await project.sync();
    });
});
