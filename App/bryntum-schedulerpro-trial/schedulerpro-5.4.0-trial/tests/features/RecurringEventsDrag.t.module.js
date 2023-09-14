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

    t.it('Should ask for confirmation when dragging original', async t => {
        await setup();

        t.diag('All');

        await t.dragBy({
            source : '$event=1',
            delta  : [100, 0]
        });

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        t.selectorExists('$ref=changeMultipleButton:contains(Yes)', 'Yes button found');
        t.selectorExists('$ref=changeSingleButton:contains(Only This Event)', 'Only This Event button found');

        await t.click('$ref=changeMultipleButton');

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.first.startDate, new Date(2022, 8, 27), 'Event moved');

        t.diag('Single');

        await t.dragBy({
            source : '$event=1',
            delta  : [100, 0]
        });

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeSingleButton');

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.first.startDate, new Date(2022, 8, 28), 'Event moved');
        t.notOk(scheduler.eventStore.first.isRecurring, 'Event is not recurring');

        t.isNot(scheduler.eventStore.last.id, 2, 'New event created');
        t.is(scheduler.eventStore.last.isRecurring, true, 'New event is recurring');
    });

    t.it('Should ask for confirmation when dragging occurrence', async t => {
        await setup();

        t.diag('All');

        await t.dragBy({
            source : '.b-occurrence',
            delta  : [100, 0]
        });

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        t.selectorExists('$ref=changeMultipleButton:contains(All Future Events)', 'All Future Events button found');
        t.selectorExists('$ref=changeSingleButton:contains(Only This Event)', 'Only This Event button found');

        await t.click('$ref=changeMultipleButton');

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.count, 3, 'New event created');
        t.is(scheduler.eventStore.last.startDate, new Date(2022, 8, 28), 'At correct date');
        t.is(scheduler.eventStore.last.recurrenceRule, 'FREQ=DAILY', 'With correct rule');

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 8, 'Correct amount of daily events rendered');

        t.diag('Single');

        await t.dragBy({
            source : '.b-occurrence',
            delta  : [100, 0]
        });

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeSingleButton');

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.count, 4, 'New event created');
        t.is(scheduler.eventStore.last.startDate, new Date(2022, 8, 30), 'At correct date');
        t.notOk(scheduler.eventStore.last.isRecurring, 'Not recurring');
        t.notOk(scheduler.eventStore.last.isOccurrence, 'Not an occurrence');

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 8, 'Correct amount of daily events rendered');
    });
});
