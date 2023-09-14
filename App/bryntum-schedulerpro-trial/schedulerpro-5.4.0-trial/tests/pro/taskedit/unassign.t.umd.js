StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Should handle unassigning/reassign correctly in task edit', async t => {

        schedulerPro = await t.getSchedulerProAsync();

        await t.waitForProjectReady(schedulerPro);

        // Open editor for Event 1, unassign and assign back resource 1, close editor
        await t.doubleClick('[data-event-id="1"]');
        await t.waitForSelector('.b-taskeditor-editing');
        await t.click('.b-chip .b-icon-clear');
        await t.click('[data-ref="resourcesField"] .b-fieldtrigger');
        await t.click('.b-list-item:contains(Resource 1)');
        await t.click('.b-button:contains(Save)');
        await t.waitForSelectorNotFound('.b-taskeditor-editing');
        await t.waitForProjectReady(schedulerPro);

        const event1 = schedulerPro.eventStore.getById(1);
        t.is(event1.resources.length, 1, 'Single resource assigned');
        t.is(event1.resources[0].id, 1, 'Correct resource assigned');

        // Open editor for Event 1, unassign and assign resource 2, close editor
        await t.doubleClick('[data-event-id="1"]');
        await t.waitForSelector('.b-taskeditor-editing');
        await t.click('.b-chip .b-icon-clear');
        await t.click('[data-ref="resourcesField"] .b-fieldtrigger');
        await t.click('.b-list-item:contains(Resource 2)');
        await t.click('.b-button:contains(Save)');
        await t.waitForSelectorNotFound('.b-taskeditor-editing');
        await t.waitForProjectReady(schedulerPro);

        t.is(event1.resources.length, 1, 'Single resource assigned');
        t.is(event1.resources[0].id, 2, 'Correct resource assigned');

        // Open editor for Event 2, unassign resource, close editor
        await t.doubleClick('[data-event-id="2"]');
        await t.waitForSelector('.b-taskeditor-editing');
        await t.click('.b-chip .b-icon-clear');
        await t.click('.b-button:contains(Save)');
        await t.waitForSelectorNotFound('.b-taskeditor-editing');
        await t.waitForProjectReady(schedulerPro);

        const event2 = schedulerPro.eventStore.getById(2);
        t.notOk(event2, 'Event is unassigned and removed');
        t.notOk(schedulerPro.assignmentStore.findRecord('eventId', 2), 'Assignment removed');
    });

});
