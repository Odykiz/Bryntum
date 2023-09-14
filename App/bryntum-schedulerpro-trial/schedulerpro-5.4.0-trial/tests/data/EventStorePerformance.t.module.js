
StartTest(t => {
    let project;

    t.beforeEach(() => {
        project?.destroy();
    });

    t.it('Load and add take comparable time to finish', async t => {
        project = new ProjectModel({
            destroyStores : true,
            resourcesData : [
                { id : 1, name : 'Resource 1' }
            ]
        });

        await project.commitAsync();

        const
            eventsData = [],
            assignmentsData = [];

        for (let i = 1; i < 1000; i++) {
            eventsData.push({
                id        : i,
                startDate : new Date(2021, 6, 5),
                endDate   : new Date(2021, 6, 6)
            });

            assignmentsData.push({
                id         : i,
                eventId    : i,
                resourceId : 'r1'
            });
        }

        let now = performance.now();

        project.assignmentStore.add(assignmentsData);
        project.eventStore.add(eventsData);

        await project.commitAsync();

        const addTime = performance.now() - now;

        project.destroy();

        project = new ProjectModel({
            destroyStores : true,
            resourcesData : [
                { id : 1, name : 'Resource 1' }
            ]
        });

        await project.commitAsync();

        now = performance.now();

        await project.assignmentStore.loadDataAsync(assignmentsData);
        await project.eventStore.loadDataAsync(eventsData);

        const loadTime = performance.now() - now;

        t.isApprox(addTime, loadTime, loadTime * 3, 'store.add performance is approximately same as store.loadDataAsync one');
    });
});
