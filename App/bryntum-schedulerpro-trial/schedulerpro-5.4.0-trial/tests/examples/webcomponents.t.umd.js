StartTest(async t => {

    const schedulerPro = bryntum.query('schedulerpro');

    const sel = selector => `bryntum-schedulerpro -> ${selector}`;
    await t.waitForSelector(sel('.b-sch-event'));
    await t.waitForProjectReady(schedulerPro.project);

    t.it('Should support rendering + dragging event in a webcomponent', async t => {
        t.firesOnce(schedulerPro, 'eventclick');
        t.willFireNTimes(schedulerPro.eventStore, 'update', 4);

        await t.click(sel('.b-sch-event:contains(Arrive)'));
        await t.dragBy({
            source : sel('.b-sch-event'),
            delta  : [100, 100]
        });

        await t.waitForSelectorNotFound('.b-dragging');

        let movedTask;
        await t.waitFor(() => (movedTask = schedulerPro.eventStore.changes?.modified[0]));
        t.is(movedTask.resource.name, 'Truck 2', 'Resource updated');
        t.is(movedTask.startDate, new Date(2020, 2, 23, 4, 30), 'Start Date updated');
    });

    t.it('Should support typing', async t => {
        t.firesOnce(schedulerPro, 'eventdblclick');
        t.firesOnce(schedulerPro.eventStore, 'update');

        await t.doubleClick(sel('.b-sch-event:contains(Arrive)'));
        await t.type(null, 'foo[ENTER]', null, null, null, true);
        await t.waitForSelector(sel('.b-sch-event:textEquals(foo)'));
    });

    // https://github.com/bryntum/support/issues/4969
    t.it('Should have demo toolbar localization', async t => {
        await t.moveMouseTo('[data-ref="fullscreenButton"]');
        await t.waitForSelector('.b-tooltip:contains("Full screen")');
    });

});
