
StartTest(async t => {
    const
        schedulerPro  = bryntum.query('schedulerpro', true),
        project       = schedulerPro.project,
        unplannedGrid = bryntum.query('grid', true);

    // avoid scrolling
    schedulerPro.tickSize = 40;

    await project.commitAsync();

    project.stm.enable();

    let isFirst     = true;

    t.beforeEach(async t => {
        if (!isFirst) {
            project.stm.stopTransaction();
            await project.stm.undo();
            await project.commitAsync();
        }
        project.stm.startTransaction();
        isFirst     = false;
        t.selectorNotExists('[data-column="fullDuration"]:contains(null)', 'Reverting changes should never clear original duration value');
    });

    t.it('Should highlight order tasks when selecting row in order grid', async t => {
        await t.click('.b-grid-cell:contains(Brain)');

        t.selectorCountIs('.b-sch-highlighted-calendar-range', 3, 'highlight when selecting appointment');

        await t.click('.b-grid-cell:contains(Annual checkup)');

        t.selectorCountIs('.b-sch-highlighted-calendar-range', 4, 'cleared old + highlighted new when selecting 2nd appointment');
    });

    t.it('Should be possible to drag an unplanned appointment onto the schedule', async t => {
        // Initiate drag first
        await t.dragTo({
            source       : '.b-unplannedgrid .b-grid-cell:contains(Brain)',
            target       : '[data-index="3"] .b-sch-timeaxis-cell',
            targetOffset : [2.5 * schedulerPro.tickSize, '50%'],
            dragOnly     : true
        });

        await t.mouseUp();

        await t.waitForSelectorNotFound('.b-dragging');

        const assignedEvents = schedulerPro.eventStore.query(event => event.resource);

        t.is(assignedEvents.length, 1, '1 event assigned');
        t.is(assignedEvents[0].resource, schedulerPro.resourceStore.getById(1), 'correct resource assigned');
        t.is(assignedEvents[0].startDate, new Date(2022, 2, 1, 8), 'correct start date');
        t.selectorExists('.b-sch-foreground-canvas .b-sch-event-wrap:contains(Brain)');
    });

    // https://github.com/bryntum/support/issues/4122
    t.it('Should transition element into final position correctly', async t => {
        await t.dragTo({
            source       : '.b-unplannedgrid .b-grid-cell:contains(Brain)',
            target       : '[data-index="3"] .b-sch-timeaxis-cell',
            targetOffset : [2.5 * schedulerPro.tickSize, '50%'],
            dragOnly     : true
        });

        const el = t.query('.b-dragging')[0];

        t.mouseUp();

        const
            rule           = CSSHelper.insertRule('.b-sch-event-wrap { transition: all 0.5s !important; }'),
            expectedY      = schedulerPro.getScheduleRegion(schedulerPro.resourceStore.getAt(3)).y,
            assertPosition = () => {
                const rect = Rectangle.from(el, schedulerPro.foregroundCanvas);

                t.isApprox(rect.y, expectedY, 1, 'y OK');
                t.isApprox(rect.x, schedulerPro.tickSize, 1, 'x OK');
            };

        el.addEventListener('transitionstart', assertPosition);

        await t.waitForAnimationFrame();
        assertPosition();
        await t.waitForAnimationFrame();
        assertPosition();
        await t.waitForAnimationFrame();
        assertPosition();
        await t.waitForAnimationFrame();
        assertPosition();

        rule.parentStyleSheet.deleteRule(rule);
        el.removeEventListener('transitionstart', assertPosition);
    });

    t.it('Should support dragging multiple tasks', async t => {
        unplannedGrid.selectedRecords = [2, 3, 4, 9, 10];

        await t.dragTo({
            source       : '.b-unplannedgrid .b-grid-cell:contains(Annual checkup)',
            target       : '[data-index="4"] .b-sch-timeaxis-cell',
            targetOffset : [2.25 * schedulerPro.tickSize, '10%']
        });

        await schedulerPro.project.commitAsync();

        await t.waitFor(() => schedulerPro.eventStore.query(event => event.resource).length === 5);

        const assigned = schedulerPro.eventStore.query(event => event.resource);

        t.is(assigned.length, 5);
        t.is(assigned[0].startDate, new Date(2022, 2, 1, 9));
        t.is(assigned[1].startDate, new Date(2022, 2, 1, 9, 30));
        t.is(assigned[2].startDate, new Date(2022, 2, 1, 10));
        t.is(assigned[3].startDate, new Date(2022, 2, 1, 10, 30));
        t.is(assigned[4].startDate, new Date(2022, 2, 1, 11));
    });


});
