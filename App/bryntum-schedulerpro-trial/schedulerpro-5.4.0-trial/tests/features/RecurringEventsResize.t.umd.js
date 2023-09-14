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
            features : {
                eventTooltip : false
            },
            ...config
        });
    }

    t.it('Should ask for confirmation when resizing original', async t => {
        await setup();

        t.diag('All');

        await t.dragBy({
            source : '$event=1',
            offset : ['100%-3', '10%'],
            delta  : [100, 0]
        });

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        t.selectorExists('$ref=changeMultipleButton:contains(Yes)', 'Yes button found');
        t.selectorExists('$ref=changeSingleButton:contains(Only This Event)', 'Only This Event button found');

        await t.click('$ref=changeMultipleButton');

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.first.duration, 2, 'Event resized');
        t.is(scheduler.eventStore.count, 2, 'No new event created');
        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 9, 'Events rendered');

        t.diag('Single');

        await t.dragBy({
            source : '$event=1',
            offset : ['100%-5', '10%'],
            delta  : [100, 0]
        });

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeSingleButton');

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.first.duration, 3, 'Event resized');
        t.notOk(scheduler.eventStore.first.isRecurring, 'Event is not recurring');
        t.is(scheduler.eventStore.count, 3, 'New event created');
        t.is(scheduler.eventStore.last.isRecurring, true, 'New event is recurring');
        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 9, 'Events rendered');
    });

    t.it('Should ask for confirmation when resizing occurrence', async t => {
        await setup();

        t.diag('All');

        await t.dragBy({
            source : '.b-occurrence',
            offset : ['100%-3', '10%'],
            delta  : [100, 0]
        });

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        t.selectorExists('$ref=changeMultipleButton:contains(All Future Events)', 'All Future Events button found');
        t.selectorExists('$ref=changeSingleButton:contains(Only This Event)', 'Only This Event button found');

        await t.click('$ref=changeMultipleButton');

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.first.duration, 1, 'Original not resized');
        t.is(scheduler.eventStore.count, 3, 'New event created');
        t.is(scheduler.eventStore.last.duration, 2, 'New event resized');
        t.is(scheduler.eventStore.last.isRecurring, true, 'New event is recurring');
        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 9, 'Events rendered');

        t.diag('Single');

        await t.dragBy({
            source : '.b-occurrence',
            offset : ['100%-5', '10%'],
            delta  : [100, 0]
        });

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeSingleButton');

        await t.waitForProjectReady(scheduler);

        t.is(scheduler.eventStore.count, 4, 'New event created');
        t.is(scheduler.eventStore.last.isRecurring, false, 'New event is not recurring');
        t.is(scheduler.eventStore.last.duration, 3, 'New event resized');
        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 9, 'Events rendered');
    });

});
