
StartTest(async t => {
    let histogram;

    t.beforeEach(() => histogram?.destroy?.());

    t.it('Should load, reset, and load inline data again to Resource Histogram', async t => {
        histogram = new ResourceHistogram({
            appendTo  : document.body,
            startDate : new Date(2020, 11, 13),
            endDate   : new Date(2020, 11, 20),
            project   : {
                startDate : '2020-12-13',
                endDate   : '2020-12-20'
            },
            columns : [
                { text : 'Name', field : 'name' }
            ]
        });

        const { project } = histogram;

        const loadData = () => project.loadInlineData({
            calendarsData : [{
                id           : 'general',
                name         : 'General calendar',
                hoursPerDay  : 24,
                daysPerWeek  : 5,
                daysPerMonth : 20,
                intervals    : [{
                    recurrentStartDate : 'on Sat at 0:00',
                    recurrentEndDate   : 'on Mon at 0:00',
                    isWorking          : false
                }]
            }],
            eventsData : [{
                id        : 1,
                name      : 'Task',
                startDate : '2020-12-13T23:00:00.000Z',
                endDate   : '2020-12-18T23:00:00.000Z'
            }],
            resourcesData : [{
                id       : 1,
                name     : 'Resource',
                calendar : 'general'
            }],
            assignmentsData : [
                { id : 1, event : 1, resource : 1 }
            ],
            dependenciesData : []
        });

        const resetData = () => {
            project.eventStore.removeAll();
            project.assignmentStore.removeAll();
            project.resourceStore.removeAll();
            return project.commitAsync();
        };

        await loadData();

        await t.waitForSelector('.b-resourcehistogram-histogram svg g rect[data-index="1"][data-series="effort"]');

        await resetData();

        await t.waitForSelectorNotFound('.b-resourcehistogram-histogram svg g rect[data-index="1"][data-series="effort"]');

        await loadData();

        await t.waitForSelector('.b-resourcehistogram-histogram svg g rect[data-index="1"][data-series="effort"]');
    });
});
