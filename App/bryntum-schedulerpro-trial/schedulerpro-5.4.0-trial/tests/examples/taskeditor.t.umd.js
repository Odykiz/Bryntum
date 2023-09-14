StartTest(async t => {
    await t.waitForSelector('.b-sch-event');
    const
        schedulerpro = bryntum.query('schedulerpro'),
        event        = schedulerpro.eventStore.getById('order1weld');

    await t.doubleClick('.b-sch-event-wrap');

    await t.waitFor(() => schedulerpro.features.taskEdit.editor?.containsFocus);

    await t.moveMouseTo('[data-id="weld"] .b-sch-timeaxis-cell', null, null, [450, 30]);
    await t.dragBy('[data-id="weld"] .b-sch-timeaxis-cell', [25, 0], null, null, null, false, [450, 30]);

    await t.waitFor(() => schedulerpro.features.taskEdit.editor?.containsFocus);

    await event.setStartDate(new Date(2020, 3, 6, 9));

    await t.waitForSelector('.b-fa-exclamation-triangle');

    await event.setStartDate(new Date(2020, 3, 6, 8));
    await t.waitForSelectorNotFound('.b-fa-exclamation-triangle');
});
