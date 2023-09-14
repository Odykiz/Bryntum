
StartTest(async t => {

    await t.waitForSelector('.b-sch-event');

    const { schedulerPro } = window;

    t.it('Should highlight start / end event calendar while dragging and remove after invalid drop', async t => {
        await t.dragBy({
            source   : '[data-assignment-id="4"]',
            delta    : [50, 0],
            dragOnly : true
        });

        await t.waitForSelectorCount('.b-sch-highlighted-calendar-range', 16);
        const intervalNodes = t.query('.b-sch-highlighted-calendar-range');

        t.isApproxPx(intervalNodes[0].clientWidth, schedulerPro.tickSize, 3, 'Slots are 1 tick wide');
        t.isApproxPx(intervalNodes[1].clientWidth, schedulerPro.tickSize, 3, 'Slots are 1 tick wide');

        await t.mouseUp();

        await t.waitForSelectorNotFound('.b-sch-highlighted-calendar-range');
    });

    t.it('Should constrain when drag dropping a task with one non-recurring calendar entry', async t => {
        t.firesOnce(schedulerPro.eventStore, 'update');

        await t.dragBy({
            source   : '.b-sch-event:contains(Radiation)',
            delta    : [400, 0],
            dragOnly : true
        });

        const
            eventEl       = t.query('.b-sch-event:contains(Radiation)')[0],
            expectedLeft  = schedulerPro.getCoordinateFromDate(new Date(2022, 4, 25, 12), false),
            expectedRight = schedulerPro.getCoordinateFromDate(new Date(2022, 4, 25, 16), false);

        // Check right side constrainment
        t.isApproxPx(Rectangle.from(eventEl).right, expectedRight, 2, 'Drag constrained right ok');

        await t.moveCursorBy([-1000, 0]);

        // Check left side constrainment
        t.isApproxPx(Rectangle.from(eventEl).left, expectedLeft, 2, 'Drag constrained left ok');

        await t.mouseUp();
        await t.waitForSelectorNotFound('.b-sch-highlighted-calendar-range');
    });

    t.it('Should not break event layout when events overlap', async t => {
        schedulerPro.allowOverlap = true;

        await t.dragTo({
            source : '.b-event-name:contains(Moderna #2)',
            target : '.b-event-name:contains(Pfizer #1)'
        });

        t.isApproxPx(t.rect('.b-sch-event-wrap:contains(Pfizer #1)').height, 60, 'Event height is same as row height');
    });
});
