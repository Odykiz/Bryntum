StartTest(t => {
    let scheduler;

    t.beforeEach(() => scheduler?.destroy());

    async function setup(config = {}) {
        scheduler = await t.getSchedulerProAsync({
            startDate             : new Date(2022, 8, 25),
            endDate               : new Date(2022, 9, 9),
            enableRecurringEvents : true,
            dependencies          : [],
            events                : [
                { id : 1, startDate : '2022-09-26', duration : 1, recurrenceRule : 'FREQ=DAILY', name : 'Daily' },
                { id : 2, startDate : '2022-09-26', duration : 3, recurrenceRule : 'FREQ=WEEKLY', name : 'Weekly' }
            ],
            ...config
        });
    }

    // Only covering basic sanity, rendering pipeline is shared with Scheduler
    t.it('Should render recurring events', async t => {
        await setup();

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 9, 'Daily events rendered');
        t.selectorCountIs('.b-sch-event-wrap:contains(Weekly)', 2, 'Weekly events rendered');

        scheduler.scrollLeft = 500;

        await t.waitFor(() => t.query('.b-sch-event:contains(Weekly)').length === 1);

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 10, 'Daily events rendered after scroll');
        t.selectorCountIs('.b-sch-event-wrap:contains(Weekly)', 1, 'Weekly events rendered after scroll');
    });

    t.it('Should rerender on data changes', async t => {
        await setup();

        scheduler.eventStore.first.recurrenceRule = 'FREQ=DAILY;INTERVAL=2';

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 5, 'Updated after changing rule');

        scheduler.eventStore.first.startDate = new Date(2022, 8, 30);

        await t.waitForProjectReady(scheduler);

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 3, 'Updated after changing date');
    });

    t.it('Should respect calendar for original event', async t => {
        await setup();

        scheduler.eventStore.first.startDate = new Date(2022, 8, 31);

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.first.startDate, new Date(2022, 9, 3), 'Date adjusted');
        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 2, 'Updated after changing date');
    });

    t.it('Should not draw dependencies to occurrences', async t => {
        await setup({
            dependencies : undefined // Default dataset has dependencies
        });

        await t.waitForDependencies();

        t.selectorCountIs('.b-sch-dependency', 1, 'Single dependency drawn');
    });
});
