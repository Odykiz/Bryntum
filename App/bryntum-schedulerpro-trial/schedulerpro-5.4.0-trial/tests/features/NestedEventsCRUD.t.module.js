
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

    t.it('Should redraw on event CRUD', async t => {
        await setup();

        const parent = schedulerPro.eventStore.first;

        t.diag('Adding child');

        parent.appendChild({ id : 13, startDate : new Date(2022, 0, 5), duration : 2, name : 'Child 13' });
        schedulerPro.assignmentStore.add({ id : 13, event : 13, resource : 'r1' });

        await t.waitForSelector('$event=1 .b-nested-events-container [data-event-id="13"]');

        t.diag('Removing child');

        parent.removeChild(parent.firstChild);

        await t.waitForSelectorNotFound('$event=11');

        t.diag('Modifying child');

        parent.firstChild.eventColor = 'blue';

        await t.waitForSelector('$event=1 .b-nested-events-container .b-sch-color-blue[data-event-id="12"]');
    });

    t.it('Should redraw when filtering EventStore', async t => {
        await setup();

        schedulerPro.eventStore.filter(r => r.isParent || r.id % 2 === 0);

        await t.waitForSelectorNotFound('$event=11');

        t.selectorCountIs('.b-nested-event', 2, 'Redrawn after filtering');
    });

    // https://github.com/bryntum/support/issues/4955
    t.it('Should not crash when removing parent with selected nested event', async t => {
        await setup();

        schedulerPro.selectEvent(schedulerPro.eventStore.getById(21));
        schedulerPro.eventStore.getById(2).remove();

        t.is(schedulerPro.eventStore.allCount, 4, 'Parent & nested events removed');
    });

    // https://github.com/bryntum/support/issues/4963
    t.it('Should not crash when undoing two newly scheduled nested events', async t => {
        await setup();

        const
            { eventStore } = schedulerPro,
            { stm }        = schedulerPro.project,
            initialCount   = eventStore.allCount;

        stm.autoRecord = true;
        stm.disabled = false;

        await schedulerPro.scheduleEvent({ eventRecord : {}, parentEventRecord : eventStore.first, startDate : eventStore.first.startDate });
        await schedulerPro.scheduleEvent({ eventRecord : {}, parentEventRecord : eventStore.first, startDate : eventStore.first.startDate });

        await stm.undo();
        await stm.undo();

        t.is(eventStore.allCount, initialCount, 'Nested events removed on undo');
    });

    // https://github.com/bryntum/support/issues/6297
    t.it('Should display new event', async t => {
        await setup({ eventsData : [] });

        const
            { startDate } = schedulerPro,
            eventRecord = new schedulerPro.eventStore.modelClass({
                id           : 100,
                name         : 'New event',
                duration     : 4,
                durationUnit : 'day'
            });

        await schedulerPro.scheduleEvent({
            resourceRecord : schedulerPro.resourceStore.first,
            eventRecord,
            startDate
        });

        await t.waitForSelector('$event=100');

        t.pass('New event displayed');
    });

    // https://github.com/bryntum/support/issues/6297
    t.it('Should allow dragging new event with children', async t => {
        await setup({ eventsData : [] });

        const
            startDate   = new Date(2022, 0, 3),
            eventRecord = new EventModel({
                id           : 100,
                name         : 'New event',
                duration     : 4,
                durationUnit : 'day',
                children     : [
                    { id : 101, name : 'Child 1', duration : 4 },
                    { id : 102, name : 'Child 2', duration : 4 }
                ]
            });

        schedulerPro.scheduleEvent({
            resourceRecord : schedulerPro.resourceStore.first,
            eventRecord,
            startDate
        });

        eventRecord.firstChild.startDate = startDate;
        eventRecord.firstChild.resource  = schedulerPro.resourceStore.first;
        eventRecord.lastChild.startDate = startDate;
        eventRecord.lastChild.resource  = schedulerPro.resourceStore.first;

        await t.waitForSelector('$event=101');

        t.selectorCountIs('.b-sch-event', 3, '3 events displayed');

        await t.dragBy({
            source : '.b-sch-event',
            offset : [5, 5],
            delta  : [schedulerPro.tickSize, 0]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(schedulerPro.eventStore.first.startDate, new Date(2022, 0, 4), 'Parent moved');
        t.is(schedulerPro.eventStore.first.firstChild.startDate, new Date(2022, 0, 4), 'First child moved');
        t.is(schedulerPro.eventStore.first.lastChild.startDate, new Date(2022, 0, 4), 'Last child moved');
    });
});
