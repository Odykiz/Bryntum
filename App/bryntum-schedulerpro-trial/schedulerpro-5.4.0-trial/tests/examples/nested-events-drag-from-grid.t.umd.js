StartTest(t => {
    const
        schedulerPro = bryntum.query('nestedschedule'),
        grid         = bryntum.query('unplanned');

    t.describe('Dragging from grid', t => {
        t.it('Should not allow dropping outside of parent', async t => {
            const { count } = grid.store;

            await t.dragTo({
                source       : '[data-ref=grid] [data-id="26"]',
                target       : '.b-sch-timeaxis-cell',
                targetOffset : [350, 40],
                dragOnly     : true
            });

            t.selectorExists('.b-drag-proxy.b-drag-invalid', 'Proxy flagged as invalid');
            t.hasApproxWidth('.b-drag-proxy', 150, 'Proxy has correct width');
            t.hasApproxHeight('.b-drag-proxy', 40, 'Proxy has correct height');

            await t.mouseUp();

            t.is(grid.store.count, count, 'Still listed in grid');
        });

        t.it('Should not allow dropping on too short parent', async t => {
            const { count } = grid.store;

            await t.dragTo({
                source       : '[data-ref=grid] [data-id="53"]',
                target       : '$event=6',
                targetOffset : ['50%', 10],
                dragOnly     : true
            });

            t.selectorExists('.b-drag-proxy.b-drag-invalid', 'Proxy flagged as invalid');
            t.hasApproxWidth('.b-drag-proxy', 300, 'Proxy has correct width');
            t.hasApproxHeight('.b-drag-proxy', 40, 'Proxy has correct height');

            await t.mouseUp();

            t.is(grid.store.count, count, 'Still listed in grid');
        });

        t.it('Should not allow dropping on a full parent', async t => {
            const { count } = grid.store;

            await t.dragTo({
                source   : '[data-ref=grid] [data-id="26"]',
                target   : '$event=1',
                dragOnly : true
            });

            t.selectorExists('.b-drag-proxy.b-drag-invalid', 'Proxy flagged as invalid');

            await t.mouseUp();

            t.is(grid.store.count, count, 'Still listed in grid');
        });

        t.it('Should allow dropping on a same width parent, 1 day', async t => {
            const { count } = grid.store;

            const event = schedulerPro.eventStore.getById(26);

            await t.dragTo({
                source       : '[data-ref=grid] [data-id="26"]',
                target       : '$event=6',
                targetOffset : ['50%', 10],
                dragOnly     : true
            });

            t.selectorNotExists('.b-drag-proxy.b-drag-invalid', 'Proxy not flagged as invalid');

            await t.mouseUp();

            await t.waitForSelector('$event=26');

            await t.waitFor({
                method : () => grid.store.count === count - 1,
                desc   : 'Removed from grid'
            });

            event.unassign(event.resource);
        });

        t.it('Should allow dropping on a same width parent, 2 day', async t => {
            const { count } = grid.store;

            const event = schedulerPro.eventStore.getById(53);

            await t.dragTo({
                source   : '[data-ref=grid] [data-id="53"]',
                target   : '$event=3',
                dragOnly : true
            });

            t.selectorNotExists('.b-drag-proxy.b-drag-invalid', 'Proxy not flagged as invalid');

            await t.mouseUp();

            await t.waitForSelector('$event=53');

            await t.waitFor({
                method : () => grid.store.count === count - 1,
                desc   : 'Removed from grid'
            });

            event.unassign(event.resource);
        });

        t.it('Should not allow dropping on parent with not enough free time', async t => {
            const
                events    = [schedulerPro.eventStore.getById(24), schedulerPro.eventStore.getById(21)];
            let { count } = grid.store;

            // 1 day
            await t.dragTo({
                source : '[data-ref=grid] [data-id="24"]',
                target : '$event=5'
            });

            await t.waitForSelector('$event=24');

            await t.waitFor(() => grid.store.count < count);

            count = grid.store.count;

            // 2 day that won't fit
            await t.dragTo({
                source   : '[data-ref=grid] [data-id="33"]',
                target   : '$event=5',
                dragOnly : true
            });

            t.selectorExists('.b-drag-proxy.b-drag-invalid', 'Proxy flagged as invalid');

            await t.mouseUp();

            t.is(grid.store.count, count, 'Still listed in grid');

            // 1 day
            await t.dragTo({
                source       : '[data-ref=grid] [data-id="21"]',
                target       : '$event=5',
                targetOffset : [10, 10]
            });

            await t.waitForSelector('$event=21');

            await t.waitFor({
                method : () => grid.store.count === count - 1,
                desc   : 'Removed from grid'
            });

            events.forEach(event => event.unassign(event.resource));
        });

        t.it('Should snap to start / end of parent', async t => {
            const event = schedulerPro.eventStore.getById(33);

            await t.dragTo({
                source       : '[data-ref=grid] [data-id="33"]',
                target       : '$event=3',
                targetOffset : [1, 50]
            });

            await t.waitForSelector('$event=33');

            t.is(event.startDate, schedulerPro.eventStore.getById(3).startDate, 'Snapped to start');

            event.unassign(event.resource);

            await t.waitForSelectorNotFound('$event=33');

            await t.dragTo({
                source       : '[data-ref=grid] [data-id="33"]',
                target       : '$event=3',
                targetOffset : ['100%-1', 50]
            });

            await t.waitForSelector('$event=33');

            t.is(event.endDate, schedulerPro.eventStore.getById(3).endDate, 'Snapped to end');

            event.unassign(event.resource);
        });

        t.it('Should not allow dragging from nested schedule grid', async t => {
            await t.dragTo({
                source   : '.b-nestedschedule .b-grid-row',
                target   : '$event=1',
                dragOnly : true
            });

            await t.waitForSelectorNotFound('.b-drag-proxy');

            await t.mouseUp();
        });

    }, 60000);

    t.describe('Dragging with EventDrag', t => {
        t.it('Should not allow dropping outside of parent', async t => {
            const event = schedulerPro.eventStore.getById(11);

            await t.dragTo({
                source       : '$event=11',
                target       : '.b-sch-timeaxis-cell',
                targetOffset : [350, 40],
                dragOnly     : true
            });

            t.selectorExists('.b-drag-invalid', 'Proxy flagged as invalid');

            await t.mouseUp();

            t.notOk(event.parent.isRoot, 'Not moved to root');
        });

        t.it('Should not allow dropping on too short parent', async t => {
            const
                event      = schedulerPro.eventStore.getById(11),
                { parent } = event;

            await t.dragTo({
                source       : '$event=51',
                target       : '$event=6',
                targetOffset : ['50%', 10],
                dragOnly     : true
            });

            t.selectorExists('.b-drag-invalid', 'Proxy flagged as invalid');

            await t.mouseUp();

            t.is(event.parent, parent, 'Remained in old parent');
        });

        t.it('Should not allow dropping on a full parent', async t => {
            const
                event      = schedulerPro.eventStore.getById(51),
                { parent } = event;

            event.duration = 1;

            await schedulerPro.project.commitAsync();

            await t.dragTo({
                source   : '$event=51',
                target   : '$event=1',
                dragOnly : true
            });

            t.selectorExists('.b-drag-invalid', 'Proxy flagged as invalid');

            await t.mouseUp();

            t.is(event.parent, parent, 'Remained in old parent');

            event.duration = 2;

            await schedulerPro.project.commitAsync();
        });

        t.it('Should allow dropping on a same width parent, 1 day', async t => {
            const event = schedulerPro.eventStore.getById(11);

            await t.dragTo({
                source       : '$event=11',
                target       : '$event=6',
                targetOffset : ['50%', 10],
                dragOnly     : true
            });

            t.selectorNotExists('.b-drag-invalid', 'Proxy not flagged as invalid');

            await t.mouseUp();

            t.is(event.parent.id, 6, 'Moved to new parent');
        });

        t.it('Should allow dropping on a same width parent, 2 day', async t => {
            const event = schedulerPro.eventStore.getById(51);

            await t.dragTo({
                source   : '$event=51',
                target   : '$event=3',
                dragOnly : true
            });

            t.selectorNotExists('.b-drag-invalid', 'Proxy not flagged as invalid');

            await t.mouseUp();

            t.is(event.parent.id, 3, 'Moved to new parent');
        });

        // Assertions above should suffice to confirm that the same validation path is used, not repeating the rest of
        // the tests for EventDrag
    }, 60000);

    // https://github.com/bryntum/support/issues/5693
    t.it('Should not crash when dragging after code editing', async t => {
        // Testing code editing, which for this example is only available when code imports is joined (module and umd)
        if (t.getMode() === 'module') {
            t.pass('Run for module only');
            return;
        }

        // Request reloading code
        await t.reloadDemoCode();
        const schedulerPro = bryntum.query('nestedschedule');
        await t.waitForProjectReady(schedulerPro);

        // Try dragging task from unplanned, should not crash
        await t.dragBy({
            source : '.b-unplanned .b-grid-row',
            delta  : [-100, 0]
        });

        t.pass('No crashes');
    });
});
