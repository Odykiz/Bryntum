
StartTest(t => {
    let project;

    async function setup() {
        project = new ProjectModel({
            eventStore : {
                syncDataOnLoad : true
            },
            resourceStore : {
                syncDataOnLoad : true
            },
            assignmentStore : {
                syncDataOnLoad : true
            },
            dependencyStore : {
                syncDataOnLoad : true
            },

            eventsData : [
                { id : 1, name : 'Arrive', startDate : '2022-03-23T03:00', duration : 2 },
                { id : 2, name : 'Unload', duration : 3 },
                { id : 3, name : 'Load', duration : 2 }
            ],
            resourcesData : [
                { id : 1, name : 'Resource 1' },
                { id : 2, name : 'Resource 2' },
                { id : 3, name : 'Resource 3' }
            ],
            assignmentsData : [
                { id : 1, event : 1, resource : 1 },
                { id : 2, event : 2, resource : 2 },
                { id : 3, event : 3, resource : 3 }
            ],
            dependenciesData : [
                { id : 1, fromEvent : 1, toEvent : 2 },
                { id : 2, fromEvent : 2, toEvent : 3 }

            ]
        });

        await project.commitAsync();
    }

    t.it('Should note remove events when syncing resources', async t => {
        await setup();

        const count = project.eventStore.count;

        project.resources = [
            { id : 1, name : 'Resource 1' },
            { id : 2, name : 'Resource 2' }
        ];

        t.is(project.eventStore.count, count, 'No events removed');
    });
});
