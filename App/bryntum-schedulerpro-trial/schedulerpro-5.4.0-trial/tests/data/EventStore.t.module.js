
StartTest(t => {
    let project;

    t.beforeEach(() => {
        project?.destroy();
    });

    t.it('Should have EventStore with recurrence mixin present', t => {
        const eventStore = new EventStore();

        t.ok(eventStore.getRecurringEvents, 'recurrence mixin present');
    });

    t.it('Should be able to remap id using dataSource', t => {
        project = new ProjectModel({
            eventModelClass : class extends EventModel {
                static get fields() {
                    return [
                        { name : 'id', dataSource : 'myId' }
                    ];
                }
            },

            eventsData : [
                { myId : 100 }
            ]
        });

        const event100 = project.eventStore.getById(100);

        t.ok(event100, 'Remapping worked');
        t.ok(event100.isEntity, 'Property signifying availability of Scheduling Engine present');
    });

    t.it('Should move event correctly with excessive commitAsync calls', async t => {
        project = new ProjectModel({
            resourcesData : [
                { id : 1, name : 'Resource' }
            ]
        });

        await Promise.all([
            project.eventStore.addAsync({
                startDate : '2021-09-01',
                endDate   : '2021-09-01'
            }),
            Promise.resolve().then(() => {
                return project.commitAsync();
            })
        ]);

        const event = project.eventStore.last;

        t.is(event.startDate, new Date(2021, 8, 1), 'Start date is ok initially');
        t.is(event.endDate, new Date(2021, 8, 1), 'End date is ok initially');

        await Promise.all([
            event.setStartDate(new Date(2021, 8, 3), false),
            event.setEndDate(new Date(2021, 8, 5), false),
            event.setDuration(2)
        ]);

        t.is(event.startDate, new Date(2021, 8, 3), 'Start date is ok after resize');
        t.is(event.endDate, new Date(2021, 8, 5), 'End date is ok after resize');

        await event.setStartDate(new Date(2021, 8, 5));

        t.is(event.startDate, new Date(2021, 8, 5), 'Start date is ok after move');
        t.is(event.endDate, new Date(2021, 8, 7), 'End date is ok after move');
    });
});
