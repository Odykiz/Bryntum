
StartTest(t => {
    let sourceProject, targetProject;

    t.beforeEach(() => {
        sourceProject?.destroy();
        targetProject?.destroy();
    });

    function replacePhantomIds(changes, startId = 100) {
        const PHANTOMID_ID_MAP = {};

        ['events', 'resources', 'calendars', 'assignments', 'dependencies'].forEach(storeId => {
            const storeChanges = changes[storeId];

            if (storeChanges) {
                storeChanges.added?.forEach(r => {
                    if ('$PhantomId' in r) {
                        r.id = ++startId;

                        PHANTOMID_ID_MAP[r.$PhantomId] = r.id;
                    }

                    for (const prop in r) {
                        if (!/\$Phantom/.test(prop)) {
                            if (r[prop] in PHANTOMID_ID_MAP) {
                                r[prop] = PHANTOMID_ID_MAP[r[prop]];
                            }
                        }
                    }
                });

                storeChanges.updated?.forEach(r => {
                    for (const prop in r) {
                        if (!/\$Phantom/.test(prop)) {
                            if (r[prop] in PHANTOMID_ID_MAP) {
                                r[prop] = PHANTOMID_ID_MAP[r[prop]];
                            }
                        }
                    }
                });
            }
        });

        return PHANTOMID_ID_MAP;
    }

    function assertProjects(t) {
        t.isDeeply(
            JSON.parse(JSON.stringify(targetProject.inlineData)),
            JSON.parse(JSON.stringify(sourceProject.inlineData)),
            'Data is synced'
        );

        t.notOk(JSON.parse(JSON.stringify(targetProject.changes)), 'No changes in target project');
    }

    class MappedEventModel extends EventModel {
        static get fields() {
            return [
                { name : 'name', dataSource : '_name' },
                { name : 'startDate', dataSource : '_start' },
                { name : 'endDate', dataSource : '_end' },
                { name : 'duration', dataSource : '_duration' },
                { name : 'constraintDate', dataSource : '_constDate' },
                { name : 'constraintType', dataSource : '_constType' },
                { name : 'manuallyScheduled', dataSource : '_manual' }
            ];
        }
    }

    t.it('Should apply event changes', async t => {
        const projectConfig = {
            eventModelClass : MappedEventModel,
            startDate       : '2022-03-21',
            eventsData      : [
                {
                    id        : 1,
                    name      : 'Event 1',
                    startDate : '2022-03-21',
                    duration  : 5
                },
                {
                    id        : 2,
                    name      : 'Event 2',
                    startDate : '2022-03-21',
                    duration  : 5
                }
            ],
            resourcesData   : [{ id : 1, name : 'Resource 1' }],
            assignmentsData : [
                { id : 1, event : 1, resource : 1 },
                { id : 2, event : 2, resource : 1 }
            ]
        };

        sourceProject = ProjectModel.new({}, projectConfig);
        targetProject = ProjectModel.new({}, projectConfig);

        await Promise.all([sourceProject.commitAsync(), targetProject.commitAsync()]);

        // Modify the task
        sourceProject.eventStore.getById(1).startDate = new Date('2022-03-22');
        sourceProject.eventStore.getById(1).duration++;
        // Add two more tasks
        sourceProject.eventStore.add([
            {
                name      : 'New task 1',
                startDate : '2022-03-21',
                duration  : 1
            },
            {
                name      : 'New task 2',
                startDate : '2022-03-22',
                duration  : 2
            }
        ]);
        // Remove the task
        sourceProject.eventStore.remove(2);

        await sourceProject.commitAsync();

        // Grab project changes and replace phantom id with real id
        const
            { changes } = sourceProject,
            idMap       = replacePhantomIds(changes);

        // Replace phantom ids with generated ids
        Object.entries(idMap).forEach(([key, value]) => {
            sourceProject.eventStore.getById(key).id = value;
        });

        const detacher = targetProject.on({
            hasChanges() {
                t.fail('Project reported changes during commit');
            },
            commitFinalized() {
                detacher();
            }
        });

        await targetProject.applyProjectChanges(changes);

        t.notOk(targetProject.changes, 'No changes on the target project');

        detacher();

        assertProjects(t);
    });

    t.it('Should apply resource changes', async t => {
        const projectConfig = {
            resourcesData : [
                { id : 1, name : 'Resource 1' },
                { id : 2, name : 'Resource 2' }
            ]
        };

        sourceProject = ProjectModel.new({}, projectConfig);
        targetProject = ProjectModel.new({}, projectConfig);

        await Promise.all([sourceProject.commitAsync(), targetProject.commitAsync()]);

        // Modify the resource
        sourceProject.resourceStore.getById(1).name = 'foo';

        // Add another resource
        sourceProject.resourceStore.add({ name : 'New resource' });
        // Remove the resource
        sourceProject.resourceStore.remove(2);

        await sourceProject.commitAsync();

        // Grab project changes and replace phantom id with real id
        const
            { changes } = sourceProject,
            idMap       = replacePhantomIds(changes);

        // Replace phantom ids with generated ids
        Object.entries(idMap).forEach(([key, value]) => {
            sourceProject.resourceStore.getById(key).id = value;
        });

        const detacher = targetProject.on({
            hasChanges() {
                t.fail('Project reported changes');
            }
        });

        await targetProject.applyProjectChanges(changes);

        detacher();

        assertProjects(t);
    });

    t.it('Should apply dependency changes', async t => {
        const projectConfig = {
            eventModelClass : MappedEventModel,
            startDate       : '2022-03-21',
            eventsData      : [
                {
                    id       : 1,
                    name     : 'Event 1',
                    duration : 1
                },
                {
                    id       : 2,
                    name     : 'Event 2',
                    duration : 1
                },
                {
                    id       : 3,
                    name     : 'Event 3',
                    duration : 1
                },
                {
                    id       : 4,
                    name     : 'Event 4',
                    duration : 1
                }
            ],
            dependenciesData : [
                { id : 1, fromEvent : 1, toEvent : 2 },
                { id : 2, fromEvent : 2, toEvent : 3 }
            ],
            resourcesData : [
                { id : 1, name : 'Resource 1' },
                { id : 2, name : 'Resource 2' }
            ],
            assignmentsData : [
                { id : 1, event : 1, resource : 1 },
                { id : 2, event : 2, resource : 2 },
                { id : 3, event : 3, resource : 3 },
                { id : 4, event : 4, resource : 4 }
            ]
        };

        sourceProject = ProjectModel.new({}, projectConfig);
        targetProject = ProjectModel.new({}, projectConfig);

        await Promise.all([sourceProject.commitAsync(), targetProject.commitAsync()]);

        // Modify the dependency
        sourceProject.dependencyStore.getById(1).setLag(1, 'day');

        // Add another resource
        sourceProject.dependencyStore.add({ fromEvent : 3, toEvent : 4, lag : 1 });
        // Remove the resource
        sourceProject.dependencyStore.remove(2);

        await sourceProject.commitAsync();

        // Grab project changes and replace phantom id with real id
        const
            { changes } = sourceProject,
            idMap       = replacePhantomIds(changes);

        // Replace phantom ids with generated ids
        Object.entries(idMap).forEach(([key, value]) => {
            sourceProject.dependencyStore.getById(key).id = value;
        });

        const detacher = targetProject.on({
            hasChanges() {
                t.fail('Project reported changes');
            }
        });

        await targetProject.applyProjectChanges(changes);

        detacher();

        assertProjects(t);
    });

    t.it('Should apply assignment changes', async t => {
        const projectConfig = {
            startDate  : '2022-03-21',
            eventsData : [
                {
                    id       : 1,
                    name     : 'Event 1',
                    duration : 1
                },
                {
                    id       : 2,
                    name     : 'Event 2',
                    duration : 1
                }
            ],
            resourcesData : [
                { id : 1, name : 'Resource 1' },
                { id : 2, name : 'Resource 2' }
            ],
            assignmentsData : [
                { id : 1, event : 1, resource : 1 },
                { id : 2, event : 2, resource : 2 }
            ]
        };

        sourceProject = ProjectModel.new({}, projectConfig);
        targetProject = ProjectModel.new({}, projectConfig);

        await Promise.all([sourceProject.commitAsync(), targetProject.commitAsync()]);

        // Modify the dependency
        sourceProject.assignmentStore.getById(1).units = 50;
        // Add another resource
        sourceProject.assignmentStore.add({ event : 1, resource : 2 });
        // Remove the resource
        sourceProject.assignmentStore.remove(2);

        await sourceProject.commitAsync();

        // Grab project changes and replace phantom id with real id
        const
            { changes } = sourceProject,
            idMap       = replacePhantomIds(changes);

        // Replace phantom ids with generated ids
        Object.entries(idMap).forEach(([key, value]) => {
            sourceProject.assignmentStore.getById(key).id = value;
        });

        const detacher = targetProject.on({
            hasChanges() {
                t.fail('Project reported changes');
            }
        });

        await targetProject.applyProjectChanges(changes);

        detacher();

        assertProjects(t);
    });

    // https://github.com/bryntum/support/issues/5923
    t.it('Should handle mapped id for applyProjectChanges method', async t => {
        class MyDepModel extends DependencyModel {
        }
        MyDepModel.idField = 'code';

        const project = new ProjectModel({
            dependencyModelClass : MyDepModel,
            startDate            : '2022-03-21',
            dependenciesData     : [
                { code : 1, event : 1, resource : 1 }
            ]
        });

        t.is(project.dependencyStore.first.lag, 0);
        project.applyProjectChanges({ dependencies : { updated : [{ code : 1, lag : 4 }] } });
        t.is(project.dependencyStore.first.lag, 4, 'Record updated ok');
    });
});
