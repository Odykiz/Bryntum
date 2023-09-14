StartTest(t => {
    t.it('Should add subtasks tab to task editor', async t => {
        await t.doubleClick('$event=11');

        await t.waitForSelector('.b-tab.b-disabled:textEquals(Subtasks)');

        t.pass('Tab shown but disabled');

        await t.doubleClick('$event=1');

        await t.waitForSelector('.b-tab:not(.b-disabled):textEquals(Subtasks)');

        t.pass('Tab shown and enabled');

        await t.click('.b-tab:textEquals(Subtasks)');

        await t.doubleClick('.b-grid-cell:textEquals(Cool presentation)');

        await t.type(null, 'Testing[ENTER]');

        await t.waitForSelector('$event=11 :textEquals(Testing)');

        t.pass('Event updated');

        await t.click('.b-subtasktab .b-remove-button');

        await t.waitForSelectorNotFound('$event=12');

        await t.click('.b-add-button');

        await t.click('[data-ref=saveButton]');

        await t.waitForSelector('.b-sch-event:textEquals(New subtask)');

        t.pass('Event added');
    });
});
