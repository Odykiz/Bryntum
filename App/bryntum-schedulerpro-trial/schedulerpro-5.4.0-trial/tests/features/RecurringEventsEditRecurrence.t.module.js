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
                { id : 2, startDate : '2022-09-26', duration : 3, name : 'Not recurring' }
            ],
            ...config
        });
    }

    t.describe('Editing non recurring event', t => {
        t.it('Should allow editing recurrence rule', async t => {
            await setup();

            await t.doubleClick('$event=2');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            t.is(t.query('$ref=frequencyField input')[0].value, 'No repeat', 'No repeat initially');

            await t.click('$ref=frequencyField');

            await t.click('.b-list-item:contains(Weekly)');

            await t.selectorCountIs('.b-sch-event-wrap:contains(Not recurring)', 2, 'Two rendered');

            await t.click('$ref=saveButton');

            await t.waitForProjectReady(scheduler);

            await t.selectorCountIs('.b-sch-event-wrap:contains(Not recurring)', 2, 'Still two rendered');
            t.is(scheduler.eventStore.last.isRecurring, true, 'Now recurring');
        });

        t.it('Should allow cancelling editing recurrence rule', async t => {
            await setup();

            await t.doubleClick('$event=2');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            t.is(t.query('$ref=frequencyField input')[0].value, 'No repeat', 'No repeat initially');

            await t.click('$ref=frequencyField');

            await t.click('.b-list-item:contains(Weekly)');

            await t.selectorCountIs('.b-sch-event-wrap:contains(Not recurring)', 2, 'Two rendered');

            await t.click('$ref=cancelButton');

            await t.waitForProjectReady(scheduler);

            await t.selectorCountIs('.b-sch-event-wrap:contains(Not recurring)', 1, 'Single rendered');
            t.is(scheduler.eventStore.last.isRecurring, false, 'Not recurring');
        });
    });

    t.describe('Editing recurring event', t => {
        t.it('Should allow editing recurrence rule, all', async t => {
            await setup();

            await t.doubleClick('$event=1');

            await t.click('$ref=editOccurrenceButton');

            await t.waitForSelector('.b-recurrenceconfirmationpopup');

            await t.click('$ref=changeMultipleButton');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            t.is(t.query('$ref=frequencyField input')[0].value, 'Daily', 'Daily initially');

            await t.click('$ref=intervalField');

            await t.type({
                text          : '2[TAB]',
                clearExisting : true
            });

            await t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 5, 'View updated');

            await t.click('$ref=saveButton');

            await t.waitForProjectReady(scheduler);

            await t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 5, 'Still up to date');

            t.is(scheduler.eventStore.first.recurrenceRule, 'FREQ=DAILY;INTERVAL=2', 'Rule updated');
        });

        t.it('Should allow cancelling editing recurrence rule, all', async t => {
            await setup();

            await t.doubleClick('$event=1');

            await t.click('$ref=editOccurrenceButton');

            await t.waitForSelector('.b-recurrenceconfirmationpopup');

            await t.click('$ref=changeMultipleButton');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            t.is(t.query('$ref=frequencyField input')[0].value, 'Daily', 'Daily initially');

            await t.click('$ref=intervalField');

            await t.type({
                text          : '2[TAB]',
                clearExisting : true
            });

            await t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 5, 'View updated');

            await t.click('$ref=cancelButton');

            await t.waitForProjectReady(scheduler);

            await t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 9, 'View reset');

            t.is(scheduler.eventStore.first.recurrenceRule, 'FREQ=DAILY', 'Rule reset');
        });

        t.it('Should allow editing recurrence rule, single', async t => {
            await setup();

            await t.doubleClick('$event=1');

            await t.click('$ref=editOccurrenceButton');

            await t.waitForSelector('.b-recurrenceconfirmationpopup');

            await t.click('$ref=changeSingleButton');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            t.is(t.query('$ref=frequencyField input')[0].value, 'No repeat', 'No repeat initially');

            await t.click('$ref=frequencyField');

            await t.click('.b-list-item:contains(Weekly)');

            await t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 10, 'View updated');

            await t.click('$ref=saveButton');

            await t.waitForProjectReady(scheduler);

            await t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 10, 'Still up to date');

            t.is(scheduler.eventStore.first.recurrenceRule, 'FREQ=WEEKLY', 'Rule updated');
            t.is(scheduler.eventStore.last.recurrenceRule, 'FREQ=DAILY', 'Rule updated for new event');
        });

        t.it('Should allow cancelling editing recurrence rule, single', async t => {
            await setup();

            await t.doubleClick('$event=1');

            await t.click('$ref=editOccurrenceButton');

            await t.waitForSelector('.b-recurrenceconfirmationpopup');

            await t.click('$ref=changeSingleButton');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            t.is(t.query('$ref=frequencyField input')[0].value, 'No repeat', 'No repeat initially');

            await t.click('$ref=frequencyField');

            await t.click('.b-list-item:contains(Weekly)');

            await t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 10, 'View updated');

            await t.click('$ref=cancelButton');

            await t.waitForProjectReady(scheduler);

            await t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 9, 'View reset');

            t.is(scheduler.eventStore.first.recurrenceRule, 'FREQ=DAILY', 'Rule reset');
            t.is(scheduler.eventStore.count, 2, 'Store reset');
        });

        t.it('Should update when toggling days', async t => {
            await setup();

            await t.doubleClick('$event=1');

            await t.click('$ref=editOccurrenceButton');

            await t.waitForSelector('.b-recurrenceconfirmationpopup');

            await t.click('$ref=changeMultipleButton');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            await t.click('$ref=frequencyField');

            await t.click('.b-list-item:contains(Weekly)');

            t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 2, 'View updated');

            await t.click('.b-button:contains(Wed)');

            t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 3, 'View updated');

            await t.click('$ref=saveButton');

            t.selectorCountIs('.b-sch-event-wrap:contains(Daily)', 3, 'View still correct');

            t.is(scheduler.eventStore.first.recurrenceRule, 'FREQ=WEEKLY;BYDAY=MO,WE', 'Rule updatedd');
        });

        // https://github.com/bryntum/support/issues/5750
        t.it('Should handle removing End Repeat rule, UNTIL', async t => {
            await setup({
                endDate  : new Date(2022, 10, 1),
                tickSize : 25,
                events   : [
                    {
                        id             : 1,
                        name           : 'Basement',
                        startDate      : '2022-09-26',
                        duration       : 3,
                        recurrenceRule : 'FREQ=DAILY;INTERVAL=5;UNTIL=20221014T000000'
                    }
                ]
            });

            await t.doubleClick('$event=1');

            await t.click('$ref=editOccurrenceButton');

            await t.waitForSelector('.b-recurrenceconfirmationpopup');

            await t.click('$ref=changeMultipleButton');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            await t.click('$ref=stopRecurrenceField');

            await t.click('[data-id=never]');

            await t.click('$ref=saveButton');

            t.is(scheduler.eventStore.first.recurrenceRule, 'FREQ=DAILY;INTERVAL=5', 'Rule updated');
        });

        // https://github.com/bryntum/support/issues/5750
        t.it('Should handle removing End Repeat rule, COUNT', async t => {
            await setup({
                endDate  : new Date(2022, 10, 1),
                tickSize : 25,
                events   : [
                    {
                        id             : 1,
                        name           : 'Basement',
                        startDate      : '2022-09-26',
                        duration       : 3,
                        recurrenceRule : 'FREQ=DAILY;INTERVAL=5;COUNT=3'
                    }
                ]
            });

            await t.doubleClick('$event=1');

            await t.click('$ref=editOccurrenceButton');

            await t.waitForSelector('.b-recurrenceconfirmationpopup');

            await t.click('$ref=changeMultipleButton');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            await t.click('$ref=stopRecurrenceField');

            await t.click('[data-id=never]');

            await t.click('$ref=saveButton');

            t.is(scheduler.eventStore.first.recurrenceRule, 'FREQ=DAILY;INTERVAL=5', 'Rule updated');
        });

        // https://github.com/bryntum/support/issues/5751
        t.it('Should handle picking days for weekly event with COUNT', async t => {
            await setup({
                endDate  : new Date(2022, 10, 1),
                tickSize : 25,
                events   : [
                    {
                        id             : 1,
                        name           : 'Basement',
                        startDate      : '2022-09-26',
                        duration       : 3,
                        recurrenceRule : 'FREQ=WEEKLY;INTERVAL=1;COUNT=3'
                    }
                ]
            });

            await t.doubleClick('$event=1');

            await t.click('$ref=editOccurrenceButton');

            await t.waitForSelector('.b-recurrenceconfirmationpopup');

            await t.click('$ref=changeMultipleButton');

            await t.waitForSelector('.b-schedulertaskeditor:not(.b-readonly)');

            await t.click('.b-recurrence-tab.b-tab');

            await t.click('.b-button:textEquals(Tue)');

            await t.click('$ref=saveButton');

            t.is(scheduler.eventStore.first.recurrenceRule, 'FREQ=WEEKLY;BYDAY=MO,TU;COUNT=3', 'Rule updated');
        });
    });
});
