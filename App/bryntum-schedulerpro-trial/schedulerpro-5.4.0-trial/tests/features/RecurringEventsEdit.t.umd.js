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

    t.it('Should open editor read-only', async t => {
        await setup();

        await t.doubleClick('$event=1');

        t.waitForSelector('.b-schedulertaskeditor.b-readonly');

        t.pass('Editor opened read-only for original event');
        t.selectorExists('$ref=occurrenceInfoText:contains(Viewing a repeating event)', 'Occurrence info text is shown');

        await t.doubleClick('.b-occurrence');

        t.waitForSelector('.b-schedulertaskeditor.b-readonly');

        t.pass('Editor opened read-only for occurrence');
        t.selectorExists('$ref=occurrenceInfoText:contains(Viewing a repeating event)', 'Occurrence info text is shown');
    });

    t.it('Should allow editing original event, all', async t => {
        await setup();

        await t.doubleClick('$event=1');

        await t.click('$ref=editOccurrenceButton');

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        t.selectorExists('$ref=changeMultipleButton:contains(Yes)', 'Yes button found');
        t.selectorExists('$ref=changeSingleButton:contains(Only This Event)', 'Only This Event button found');

        await t.click('$ref=changeMultipleButton');

        await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

        await t.click('$ref=durationField');

        await t.type({
            target        : '$ref=durationField input',
            clearExisting : true,
            text          : '2[ENTER]'
        });

        t.is(scheduler.eventStore.first.duration, 2, 'Event duration changed');
        t.is(scheduler.eventStore.first.isRecurring, true, 'Still recurring');
        t.is(scheduler.eventStore.count, 2, 'No events added');
    });

    t.it('Should allow editing original event, single', async t => {
        await setup();

        await t.doubleClick('$event=1');

        await t.click('$ref=editOccurrenceButton');

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeSingleButton');

        await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

        await t.click('$ref=durationField');

        await t.type({
            target        : '$ref=durationField input',
            clearExisting : true,
            text          : '2[ENTER]'
        });

        t.is(scheduler.eventStore.first.duration, 2, 'Event duration changed');
        t.is(scheduler.eventStore.first.isRecurring, false, 'No longer recurring');
        t.is(scheduler.eventStore.count, 3, 'Event added');
    });

    t.it('Should allow editing occurrence, all', async t => {
        await setup();

        await t.doubleClick('.b-occurrence');

        await t.click('$ref=editOccurrenceButton');

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        t.selectorExists('$ref=changeMultipleButton:contains(All Future Events)', 'All Future Events button found');
        t.selectorExists('$ref=changeSingleButton:contains(Only This Event)', 'Only This Event button found');

        await t.click('$ref=changeMultipleButton');

        await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

        await t.click('$ref=durationField');

        await t.type({
            target        : '$ref=durationField input',
            clearExisting : true,
            text          : '2[ENTER]'
        });

        t.is(scheduler.eventStore.first.duration, 1, 'Original event duration not changed');
        t.is(scheduler.eventStore.first.isRecurring, true, 'Still recurring');
        t.is(scheduler.eventStore.count, 3, 'Event added');
        t.is(scheduler.eventStore.last.duration, 2, 'New events duration changed');
        t.is(scheduler.eventStore.last.isRecurring, true, 'New event recurring');
    });

    t.it('Should allow editing occurrence, single', async t => {
        await setup();

        await t.doubleClick('.b-occurrence');

        await t.click('$ref=editOccurrenceButton');

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeSingleButton');

        await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

        await t.click('$ref=durationField');

        await t.type({
            target        : '$ref=durationField input',
            clearExisting : true,
            text          : '2[ENTER]'
        });

        t.is(scheduler.eventStore.first.duration, 1, 'Original event duration not changed');
        t.is(scheduler.eventStore.first.isRecurring, true, 'Still recurring');
        t.is(scheduler.eventStore.count, 3, 'Event added');
        t.is(scheduler.eventStore.last.duration, 2, 'New events duration changed');
        t.is(scheduler.eventStore.last.isRecurring, false, 'New event not recurring');
    });

    t.it('Cancelling edit should restore correct state, all', async t => {
        await setup();

        await t.doubleClick('$event=1');

        await t.click('$ref=editOccurrenceButton');

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeMultipleButton');

        await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

        await t.click('$ref=durationField');

        await t.type({
            target        : '$ref=durationField input',
            clearExisting : true,
            text          : '2[TAB]'
        });

        t.hasApproxWidth('.b-occurrence', 200, 'Occurrence width changed during live edit');

        await t.click('$ref=cancelButton');

        t.hasApproxWidth('.b-occurrence', 100, 'Occurrence width reset when cancelling');
    });

    t.it('Cancelling edit should restore correct state, single', async t => {
        await setup();

        await t.doubleClick('$event=1');

        await t.click('$ref=editOccurrenceButton');

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeSingleButton');

        await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

        await t.click('$ref=durationField');

        await t.type({
            target        : '$ref=durationField input',
            clearExisting : true,
            text          : '2[TAB]'
        });

        t.hasApproxWidth('$event=1', 200, 'Width changed during live edit');

        await t.click('$ref=cancelButton');

        await t.waitForProjectReady(scheduler);

        t.hasApproxWidth('$event=1', 100, 'Width reset when cancelling');

        t.is(scheduler.eventStore.first.isRecurring, true, 'Still recurring');
        t.isDeeply(scheduler.eventStore.first.exceptionDates, {}, 'No exceptions');
    });

    t.it('Should handle assigning multiple resources', async t => {
        await setup();

        await t.doubleClick('$event=1');

        await t.click('$ref=editOccurrenceButton');

        await t.waitForSelector('.b-recurrenceconfirmationpopup');

        await t.click('$ref=changeMultipleButton');

        await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

        await t.click('$ref=resourcesField $ref=expand');

        await t.click('.b-list-item:contains(Resource 2)');

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 18, 'Occurrences rendered for new resource #1');

        await t.click('.b-list-item:contains(Resource 3)');

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 27, 'Occurrences rendered for new resource #2');

        await t.click('$ref=saveButton');

        t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 27, 'Occurrences still rendered for new resources');
    });
});
