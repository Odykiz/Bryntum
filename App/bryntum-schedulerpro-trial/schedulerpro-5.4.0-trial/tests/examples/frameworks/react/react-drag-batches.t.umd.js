StartTest(async t => {
    const
        schedulerPro  = bryntum.query('schedulerpro'),
        orderGrid     = bryntum.query('grid'),
        project       = schedulerPro.project,
        eventStore    = project.eventStore,
        orderStore    = orderGrid.store,
        templateStore = project.getCrudStore('templates');

    await t.waitForSelector('.b-sch-event');

    t.it('Sanity', async t => {
        t.selectorCountIs('.b-sch-event', 7);
        t.selectorCountIs('.b-ordergrid .b-grid-row', 5);
        t.selectorExists('.b-ordergrid .b-grid-cell[data-column="firstTask.startDate"]:contains(Apr 2 06:00)', 'Order start date shown ok');
        t.selectorExists('.b-ordergrid .b-grid-cell[data-column="lastTask.endDate"]:contains(Apr 2 18:00)', 'Order end date shown ok');
    });

    t.it('Should have working links between different data models', async t => {
        const unscheduledOrder = orderStore.getById(1005);

        t.is(unscheduledOrder.firstTask, templateStore.first.firstChild, 'Unscheduled orders have link to first task in its template');
        t.is(unscheduledOrder.lastTask, templateStore.first.lastChild, 'Unscheduled have a link to last task in its template');

        t.is(orderStore.getAt(1).firstTask, eventStore.first, 'Scheduled orders have first task');
        t.is(orderStore.getAt(1).lastTask, eventStore.getById(61), 'Scheduled have last task');
    });

    t.it('Should highlight order tasks when selecting row in order grid', async t => {
        await t.click('.b-grid-cell:contains(Door frames)');

        t.selectorExists('.b-sch-event-selected.order1001', 'First task of order 1001 selected');
        t.selectorCountIs('.b-highlight.order1001', 7, 'All tasks of order 1001 are highlighted');

        await t.click('.b-grid-row .b-grid-cell:contains(Battery)');

        t.selectorNotExists('.b-sch-event-selected', 'selection cleared when clicking unscheduled order');
        t.selectorNotExists('.b-sch-event.b-highlight', 'highlight cleared when unscheduled order');
    });

    t.it('Should create an order', async t => {
        await t.click('.b-button:textEquals(Add order)');
        await t.click('.b-orderform .b-icon-picker');
        await t.click('.b-list-item:contains(Satellite)');
        await t.click('[name="customer"]');
        await t.type(null, 'foo');

        await t.click('[name="size"]');
        await t.type(null, '0');
        await t.click('.b-button:textEquals(Create)');

        t.selectorExists('.b-ordergrid .b-grid-cell:contains(Customer: foo)');
        t.selectorExists('.b-ordergrid .b-grid-cell:contains(size: 100)');
    });

    t.it('Should be possible to switch date range', async t => {
        t.is(schedulerPro.startDate, new Date(2021, 3, 6, 5));
        t.is(schedulerPro.endDate, new Date(2021, 3, 6, 23));

        await t.click('.b-toolbar .b-combo');
        await t.click('.b-list-item:contains(3 days)');

        t.is(schedulerPro.startDate, new Date(2021, 3, 6));
        t.is(schedulerPro.endDate, new Date(2021, 3, 9));

        await t.click('.b-toolbar .b-combo');
        await t.click('.b-list-item:contains(1 week)');

        t.is(schedulerPro.startDate, new Date(2021, 3, 6));
        t.is(schedulerPro.endDate, new Date(2021, 3, 13));

        await t.click('.b-toolbar .b-combo');
        await t.click('.b-list-item:contains(1 day)');

        t.is(schedulerPro.startDate, new Date(2021, 3, 6, 5));
        t.is(schedulerPro.endDate, new Date(2021, 3, 6, 23));
    });

    t.it('Should be possible to toggle order grid visibility', async t => {
        await t.click('.b-toolbar .b-icon-menu');
        t.is(orderGrid.hidden, true);

        await t.click('.b-toolbar .b-icon-menu');
        t.is(orderGrid.hidden, false);
    });

    t.it('Should not be possible to schedule order if drop position is invalid', async t => {
        t.wontFire(eventStore, 'add');

        // Schedule order on another order
        await t.dragTo({
            source       : '.b-ordergrid .b-grid-row:not(.scheduled)',
            target       : '.b-sch-timeaxis-cell',
            dragOnly     : true,
            sourceOffset : [1, 1],
            targetOffset : [120, 10]
        });

        await t.moveCursorTo('.order1001');

        await t.mouseUp();

        await t.waitForSelectorNotFound('.b-dragging');
    });
});
