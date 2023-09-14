
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                nestedEvents : {
                    barMargin : 0
                }
            },

            startDate             : new Date(2022, 0, 2),
            endDate               : new Date(2022, 0, 9),
            rowHeight             : 100,
            enableEventAnimations : false,

            eventsData : [
                {
                    id        : 1,
                    startDate : new Date(2022, 0, 2),
                    duration  : 5,
                    name      : 'Parent 1',
                    children  : [
                        {
                            id        : 11,
                            startDate : new Date(2022, 0, 2),
                            duration  : 2,
                            name      : 'Child 11'
                        },
                        {
                            id        : 12,
                            startDate : new Date(2022, 0, 5),
                            duration  : 2,
                            name      : 'Child 12'
                        }
                    ]
                },
                {
                    id        : 2,
                    startDate : new Date(2022, 0, 3),
                    duration  : 5,
                    name      : 'Parent 2',
                    children  : [
                        {
                            id        : 21,
                            startDate : new Date(2022, 0, 3),
                            duration  : 2,
                            name      : 'Child 21'
                        },
                        {
                            id        : 22,
                            startDate : new Date(2022, 0, 3),
                            duration  : 3,
                            name      : 'Child 22'
                        }
                    ]
                },
                {
                    id        : 3,
                    startDate : new Date(2022, 0, 4),
                    duration  : 4,
                    name      : 'Event 3'
                }
            ],

            assignmentsData : [
                { id : 1, event : 1, resource : 'r1' },
                { id : 11, event : 11, resource : 'r1' },
                { id : 12, event : 12, resource : 'r1' },
                { id : 2, event : 2, resource : 'r2' },
                { id : 21, event : 21, resource : 'r2' },
                { id : 22, event : 22, resource : 'r2' },
                { id : 3, event : 3, resource : 'r5' }
            ],

            resourcesData : [
                { id : 'r1', name : 'Mike' },
                { id : 'r2', name : 'Linda' },
                { id : 'r3', name : 'Don' },
                { id : 'r4', name : 'Karen' },
                { id : 'r5', name : 'Doug' }
            ],

            dependenciesData : [],

            ...config
        });
    }

    t.it('Should disable parts of editor for nested events', async t => {
        await setup();

        t.diag('Nested event');

        await t.doubleClick('$event=21');

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        const { widgetMap } = schedulerPro.features.taskEdit.editor;

        t.ok(widgetMap.resourcesField.disabled, 'Resources disabled');
        t.ok(widgetMap.successorsTab.disabled, 'Successors tab disabled');
        t.ok(widgetMap.predecessorsTab.disabled, 'Predecessors tab disabled');

        await t.click('[data-ref=cancelButton]');

        t.diag('Ordinary event');

        await t.doubleClick('$event=3');

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        t.notOk(widgetMap.resourcesField.disabled, 'Resources enabled');
        t.notOk(widgetMap.successorsTab.disabled, 'Successors tab enabled');
        t.notOk(widgetMap.predecessorsTab.disabled, 'Predecessors tab enabled');
    });

});
