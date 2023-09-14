
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                nestedEvents : true,
                dependencies : true
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

            dependenciesData : [
                { id : 1, from : 1, to : 2 },
                { id : 2, from : 2, to : 3 }
            ],

            ...config
        });
    }



    t.it('Should not show terminals for nested events', async t => {
        await setup();

        await t.waitForDependencies();

        await t.moveMouseTo('.b-nested-event');

        t.selectorNotExists('.b-sch-terminal', 'Terminals not shown');
    });

    t.it('Should show terminals for parent events', async t => {
        await setup();

        await t.waitForDependencies();

        await t.moveMouseTo({
            target : '$event=2',
            offset : ['50%', 5]
        });

        t.selectorExists('.b-sch-terminal', 'Terminals not shown');
    });
});
