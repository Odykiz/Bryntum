
StartTest(t => {

    let stm;

    function diagUndoing(t) {
        t.diag(`Undoing transaction #${stm.position - 1} ${stm.queue[stm.position - 1]}`);
    }

    function diagRedoing(t) {
        t.diag(`Redoing transaction #${stm.position} ${stm.queue[stm.position]}`);
    }

    // https://github.com/bryntum/support/issues/4681
    t.it('Should be able to undo/redo events & dependency persisted to a backend', async t => {

        t.mockUrl('load', '{}');

        const project = new ProjectModel({
            validateResponse : false,
            stm              : {
                autoRecord : false
            },
            transport : {
                load : {
                    url : 'load'
                },
                sync : {
                    url : 'sync'
                }
            }
        });

        await project.load();

        stm = project.stm;

        stm.enable();

        stm.startTransaction('Adding event11');

        const [event11] = project.eventStore.add({
            name     : 'event A',
            duration : 1
        });

        await project.commitAsync();

        stm.stopTransaction();

        await project.commitAsync();

        stm.startTransaction('Renaming event11');

        event11.set('name', 'A');

        stm.stopTransaction();

        stm.startTransaction('Adding event12');

        const [event12] = project.eventStore.add({
            name     : 'event B',
            duration : 1
        });

        await project.commitAsync();

        stm.stopTransaction();

        await project.commitAsync();

        stm.startTransaction('Renaming event12');

        event12.set('name', 'B');

        stm.stopTransaction();

        stm.startTransaction('Adding dependency1');

        const [dependency1] = project.dependencyStore.add({
            fromEvent : event11.id,
            toEvent   : event12.id
        });

        await project.commitAsync();

        stm.stopTransaction();

        t.diag('Calling sync()');

        t.mockUrl('sync', {
            responseText : {
                events : {
                    rows : [
                        { id : 11, $PhantomId : event11.id },
                        { id : 12, $PhantomId : event12.id }
                    ]
                },
                dependencies : {
                    rows : [
                        { id : 1, $PhantomId : dependency1.id, fromEvent : 11, toEvent : 12 }
                    ]
                }
            }
        });

        await project.sync();

        t.notOk(project.changes, 'project has no changes after sync() call');
        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11, event12], 'two events found');
        t.isDeeply(project.dependencyStore.getRange(), [dependency1], 'one dependency found');

        diagUndoing(t);

        await stm.undo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'A', 'event11 name is correct');
        t.is(event12.name, 'B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11, event12], 'two events found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagUndoing(t);

        await stm.undo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'A', 'event11 name is correct');
        t.is(event12.name, 'event B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11, event12], 'event #11 found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagUndoing(t);

        await stm.undo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'A', 'event11 name is correct');
        t.is(event12.name, 'event B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11], 'event #11 found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagUndoing(t);

        await stm.undo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'event A', 'event11 name is correct');
        t.is(event12.name, 'event B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11], 'event #11 found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagUndoing(t);

        await stm.undo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'event A', 'event11 name is correct');
        t.is(event12.name, 'event B', 'event12 name is correct');
        t.is(project.eventStore.count, 0, 'no events found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagRedoing(t);

        await stm.redo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'event A', 'event11 name is correct');
        t.is(event12.name, 'event B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11], 'event #11 found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagRedoing(t);

        await stm.redo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'A', 'event11 name is correct');
        t.is(event12.name, 'event B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11], 'event #11 found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagRedoing(t);

        await stm.redo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'A', 'event11 name is correct');
        t.is(event12.name, 'event B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11, event12], 'two events found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagRedoing(t);

        await stm.redo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'A', 'event11 name is correct');
        t.is(event12.name, 'B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11, event12], 'two events found');
        t.is(project.dependencyStore.count, 0, 'no dependencies');

        diagRedoing(t);

        await stm.redo();

        await project.commitAsync();

        t.is(event11.id, 11, 'event11 id is correct');
        t.is(event12.id, 12, 'event12 id is correct');
        t.is(event11.name, 'A', 'event11 name is correct');
        t.is(event12.name, 'B', 'event12 name is correct');
        t.isDeeplyUnordered(project.eventStore.getRange(), [event11, event12], 'two events found');
        t.isDeeply(project.dependencyStore.getRange(), [dependency1], 'one dependency found');
    });

    // https://github.com/bryntum/support/issues/4681
    t.it('Should be able to undo/redo a event, a resource and an assignment persisted to a backend', async t => {

        t.mockUrl('load', '{}');

        const project = new ProjectModel({
            validateResponse : false,
            stm              : {
                autoRecord : false
            },
            transport : {
                load : {
                    url : 'load'
                },
                sync : {
                    url : 'sync'
                }
            }
        });

        await project.load();

        stm = project.stm;

        stm.enable();

        stm.startTransaction('Adding event1');

        const [event1] = project.eventStore.add({
            name     : 'event A',
            duration : 1
        });

        await project.commitAsync();

        stm.stopTransaction();

        stm.startTransaction('Adding resource1');

        const [resource1] = project.resourceStore.add({
            name : 'resource 1'
        });

        await project.commitAsync();

        stm.stopTransaction();

        stm.startTransaction('Assign resource');

        const [assignment1] = project.assignmentStore.add({
            event    : event1,
            resource : resource1
        });

        await project.commitAsync();

        stm.stopTransaction();

        t.diag('Calling sync()');

        t.mockUrl('sync', {
            responseText : {
                events : {
                    rows : [
                        { id : 't1', $PhantomId : event1.id }
                    ]
                },
                resources : {
                    rows : [
                        { id : 'r1', $PhantomId : resource1.id }
                    ]
                },
                assignments : {
                    rows : [
                        { id : 'a1', $PhantomId : assignment1.id, event : 't1', resource : 'r1' }
                    ]
                }
            }
        });

        await project.sync();

        t.notOk(project.changes, 'project has no changes after sync() call');
        t.is(event1.id, 't1', 'event1 id is correct');
        t.isDeeply(project.eventStore.getRange(), [event1], 'proper events found');
        t.isDeeply(project.resourceStore.getRange(), [resource1], 'proper resources found');
        t.isDeeply(project.assignmentStore.getRange(), [assignment1], 'proper assignments found');

        diagUndoing(t);

        await stm.undo();

        await project.commitAsync();

        t.is(event1.id, 't1', 'event1 id is correct');
        t.is(resource1.id, 'r1', 'resource1 id is correct');
        t.is(assignment1.id, 'a1', 'assignment1 id is correct');
        t.isDeeply(project.eventStore.getRange(), [event1], 'proper events found');
        t.isDeeply(project.resourceStore.getRange(), [resource1], 'proper resources found');
        t.isDeeply(project.assignmentStore.getRange(), [], 'proper assignments found');

        diagUndoing(t);

        await stm.undo();

        await project.commitAsync();

        t.is(event1.id, 't1', 'event1 id is correct');
        t.is(resource1.id, 'r1', 'resource1 id is correct');
        t.is(assignment1.id, 'a1', 'assignment1 id is correct');
        t.isDeeply(project.eventStore.getRange(), [event1], 'proper events found');
        t.isDeeply(project.resourceStore.getRange(), [], 'proper resources found');
        t.isDeeply(project.assignmentStore.getRange(), [], 'proper assignments found');

        diagUndoing(t);

        await stm.undo();

        await project.commitAsync();

        t.is(event1.id, 't1', 'event1 id is correct');
        t.is(resource1.id, 'r1', 'resource1 id is correct');
        t.is(assignment1.id, 'a1', 'assignment1 id is correct');
        t.isDeeply(project.eventStore.getRange(), [], 'proper events found');
        t.isDeeply(project.resourceStore.getRange(), [], 'proper resources found');
        t.isDeeply(project.assignmentStore.getRange(), [], 'proper assignments found');

        diagRedoing(t);

        await stm.redo();

        await project.commitAsync();

        t.is(event1.id, 't1', 'event1 id is correct');
        t.is(resource1.id, 'r1', 'resource1 id is correct');
        t.is(assignment1.id, 'a1', 'assignment1 id is correct');
        t.isDeeply(project.eventStore.getRange(), [event1], 'proper events found');
        t.isDeeply(project.resourceStore.getRange(), [], 'proper resources found');
        t.isDeeply(project.assignmentStore.getRange(), [], 'proper assignments found');

        diagRedoing(t);

        await stm.redo();

        await project.commitAsync();

        t.is(event1.id, 't1', 'event1 id is correct');
        t.is(resource1.id, 'r1', 'resource1 id is correct');
        t.is(assignment1.id, 'a1', 'assignment1 id is correct');
        t.isDeeply(project.eventStore.getRange(), [event1], 'proper events found');
        t.isDeeply(project.resourceStore.getRange(), [resource1], 'proper resources found');
        t.isDeeply(project.assignmentStore.getRange(), [], 'proper assignments found');

        diagRedoing(t);

        await stm.redo();

        await project.commitAsync();

        t.is(event1.id, 't1', 'event1 id is correct');
        t.is(resource1.id, 'r1', 'resource1 id is correct');
        t.is(assignment1.id, 'a1', 'assignment1 id is correct');
        t.isDeeply(project.eventStore.getRange(), [event1], 'proper events found');
        t.isDeeply(project.resourceStore.getRange(), [resource1], 'proper resources found');
        t.isDeeply(project.assignmentStore.getRange(), [assignment1], 'proper assignments found');
    });
});
