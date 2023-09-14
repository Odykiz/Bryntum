StartTest(async t => {

    await t.waitForSelector('.b-sch-event');

    const schedulerPro = bryntum.query('schedulerpro');

    t.it('Should highlight start / end delivery window of an event', async t => {
        await t.dragBy({
            source   : '.b-sch-event:contains(Parcel)',
            delta    : [-500, 0],
            dragOnly : true
        });

        await t.waitForSelectorCount('.b-sch-highlighted-range.b-unavailable', 2);
        let shadingDivs = t.query('.b-sch-highlighted-range.b-unavailable');

        t.isApproxPx(shadingDivs[0].clientWidth, 4 * schedulerPro.tickSize, '8:00 - 11:00 is unavailable, 3h wide');
        t.isApproxPx(shadingDivs[1].clientWidth, 4 * schedulerPro.tickSize, '16:00 - 18:00 is unavailable, 2h wide');

        let eventRect = t.rect('.b-dragging');

        t.isApproxPx(eventRect.left, schedulerPro.getCoordinateFromDate(new Date(2022, 4, 25, 11), false), 'Event constrained to the left');

        await t.moveCursorBy([1000, 0]);

        eventRect = t.rect('.b-dragging');

        t.isApproxPx(eventRect.right, schedulerPro.getCoordinateFromDate(new Date(2022, 4, 25, 16), false), 'Event constrained to the right');

        await t.mouseUp();

        await t.waitForSelectorNotFound('.b-sch-highlighted-range');

        await t.dragBy({
            source   : '.b-sch-event:contains(Parcel)',
            delta    : [-500, 0],
            dragOnly : true
        });

        await t.waitForSelectorCount('.b-sch-highlighted-range.b-unavailable', 2);
        shadingDivs = t.query('.b-sch-highlighted-range.b-unavailable');

        t.isApproxPx(shadingDivs[0].clientWidth, 4 * schedulerPro.tickSize, '8:00 - 11:00 is unavailable, 3h wide');
        t.isApproxPx(shadingDivs[1].clientWidth, 4 * schedulerPro.tickSize, '16:00 - 18:00 is unavailable, 2h wide');
    });

    t.it('Should not crash (in Firefox) when filtering & drag creating', async t => {
        await t.click('input[name="name"]');
        await t.type(null, 'Ketchup');
        await t.dragTo({ source : [947, 448], target : [224, 177] });
    });
});
