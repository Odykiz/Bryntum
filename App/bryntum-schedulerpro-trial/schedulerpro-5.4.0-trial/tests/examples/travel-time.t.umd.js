StartTest(async t => {
    // const schedulerpro = window.schedulerpro;

    t.it('Creating new event should not break the map', async t => {
        await t.dragBy({
            source : '[data-id="r5"] .b-sch-timeaxis-cell',
            offset : [70, '50%'],
            delta  : [140, 0]
        });

        await t.click('[data-ref="saveButton"]');

        // Hover event wait for tooltip
        await t.moveMouseTo('.b-sch-dirty-new');

        await t.waitForSelector('.b-sch-event-tooltip');

        // Move to locked row, wait for tooltip to hide
        await t.moveMouseTo('[data-id="r6"]');

        await t.waitForSelectorNotFound('.b-sch-event-tooltip');

        // Move to another event, wait for tooltip
        await t.moveMouseTo('[data-event-id="7"]');

        await t.waitForSelector('.b-sch-event-tooltip');

        // Move to locked row, wait for tooltip to hide
        await t.moveMouseTo('[data-id="r6"]');

        await t.waitForSelectorNotFound('.b-sch-event-tooltip');

        // And once again
        await t.moveMouseTo('.b-sch-dirty-new');

        await t.waitForSelector('.b-sch-event-tooltip');

        // And another one just to be sure. Siesta takes more actions to reproduce the problem
        await t.moveMouseTo('[data-event-id="7"]');

        await t.waitForSelector('.b-sch-event-tooltip');
    });
});
