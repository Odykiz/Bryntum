
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

    t.it('Should be possible to resize nested event', async t => {
        await setup();

        const event = schedulerPro.eventStore.getById(21);

        await t.dragBy({
            source : '$event=21',
            offset : ['100%-3', '50%'],
            delta  : [schedulerPro.tickSize, 0]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(event.duration, 3, 'duration updated');
        t.is(event.endDate, new Date(2022, 0, 6), 'endDate updated');

        await t.dragBy({
            source : '$event=21',
            offset : [3, '50%'],
            delta  : [schedulerPro.tickSize, 0]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(event.duration, 2, 'duration updated');
        t.is(event.startDate, new Date(2022, 0, 4), 'startDate updated');
    });

    t.it('Should be able to configure constraining to parent', async t => {
        await setup({
            features : {
                nestedEvents : {
                    constrainResizeToParent : true
                }
            }
        });

        const event = schedulerPro.eventStore.getById(21);

        t.diag('Constrained');

        await t.dragBy({
            source   : '$event=21',
            offset   : ['100%-3', '50%'],
            delta    : [schedulerPro.tickSize * 2, 0],
            dragOnly : true
        });

        t.isApproxPx(t.rect('$event=21').width, t.rect('$event=2').width, 'Constrained to parent during resize');

        await t.mouseUp();

        await t.waitForProjectReady(schedulerPro);

        t.is(event.endDate, new Date(2022, 0, 6), 'Constrained endDate to parent');
        t.is(event.parent.endDate, new Date(2022, 0, 6), 'Parent not extended');

        // Reset the event
        event.duration = 2;
        await t.waitForProjectReady(schedulerPro);

        schedulerPro.features.nestedEvents.constrainResizeToParent = false;

        t.diag('Not constrained');

        await t.dragBy({
            source   : '$event=21',
            offset   : ['100%-3', '50%'],
            delta    : [schedulerPro.tickSize * 2, 0],
            dragOnly : true
        });

        t.isApproxPx(t.rect('$event=21').width, t.rect('$event=2').width + schedulerPro.tickSize, 'Not constrained to parent during resize');

        await t.mouseUp();

        await t.waitForProjectReady(schedulerPro);

        t.is(event.endDate, new Date(2022, 0, 7), 'Did not constrain endDate to parent');
        t.is(event.parent.endDate, new Date(2022, 0, 7), 'Parent extended');
    });

    t.it('Should only allow resizing manuallyScheduled parents', async t => {
        await setup();

        const event = schedulerPro.eventStore.getById(2);

        // Will actually be a drag and not a resize, but that is ok
        await t.dragBy({
            source : '$event=2',
            offset : ['100%-3', 5],
            delta  : [schedulerPro.tickSize, 0]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(event.duration, 3, 'Could not resize parent');

        event.manuallyScheduled = true;

        await t.waitForProjectReady(schedulerPro);

        await t.dragBy({
            source : '$event=2',
            offset : ['100%-3', 5],
            delta  : [schedulerPro.tickSize, 0]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(event.duration, 4, 'Could resize manuallyScheduled parent');
    });
});
