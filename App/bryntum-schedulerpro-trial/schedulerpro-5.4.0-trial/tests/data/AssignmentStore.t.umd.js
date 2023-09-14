
StartTest(t => {
    let project;

    t.beforeEach(() => {
        project?.destroy();
    });

    t.it('Should update index when an assignment is updated', async t => {
        project = new ProjectModel({
            resourcesData : [
                { id : 1, name : 'Resource' },
                { id : 2, name : 'OtherResource' }
            ],
            eventsData : [
                { id : 1, resourceId : 1 }
            ]
        });

        await project.commitAsync();

        const
            { assignmentStore } = project,
            { indices }         = assignmentStore.storage;

        t.is(indices.eventResourceKey.get('1-1'), assignmentStore.first, 'assignment found via eventResourceKey 1-1');

        project.eventStore.first.resource = project.resourceStore.getAt(1);

        await project.commitAsync();

        t.is(indices.eventResourceKey.get('1-1'), null, 'assignment NOT found via eventResourceKey 1-1');
        t.is(indices.eventResourceKey.get('1-2'), assignmentStore.first, 'assignment found via eventResourceKey 1-2');
    });

    t.it('Should update `hasCompositeIndex` flag after index is removed', async t => {
        project = new ProjectModel({
            resourcesData : [
                { id : 1, name : 'Resource' },
                { id : 2, name : 'OtherResource' }
            ],
            eventsData : [
                { id : 1, resourceId : 1 }
            ]
        });

        await project.commitAsync();

        const { assignmentStore } = project;

        t.is(assignmentStore.storage.hasCompositeIndex, true);

        assignmentStore.storage.removeIndex('eventResourceKey');

        t.is(assignmentStore.storage.hasCompositeIndex, false);
    });

    // https://github.com/bryntum/support/issues/4943
    t.it('Should enter assignments into replica/graph when AssignmentStore is created before project', async t => {
        const assignmentStore = new AssignmentStore({
            data : [{ id : 1, resourceId : 1, eventId : 1 }]
        });
        project = new ProjectModel({
            assignmentStore
        });

        await project.commitAsync();

        t.isNot(assignmentStore.first.graph, null, 'Graph is set');
    });

    // https://github.com/bryntum/support/issues/6025
    t.it('Should update assignments resourceId when assigning resource with id 0', async t => {
        project = new ProjectModel({
            eventsData      : [{ id : 1 }],
            resourcesData   : [{ id : 0 }, { id : 1 }],
            assignmentsData : [
                { id : 1, resourceId : 1, eventId : 2 }
            ]
        });

        await project.commitAsync();

        project.assignmentStore.first.resource = project.resourceStore.first;

        await project.commitAsync();

        t.is(project.assignmentStore.first.resourceId, 0, 'Assignment resourceId is updated');
    });
});
