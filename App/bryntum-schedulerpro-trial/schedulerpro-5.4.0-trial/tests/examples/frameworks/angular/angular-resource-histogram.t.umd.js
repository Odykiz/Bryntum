StartTest(t => {

    // https://github.com/bryntum/support/issues/6527
    t.it('Resource histogram reacts on time axis changes', async t => {

        await t.waitForSelector('.b-sch-event');
        await t.waitForSelector('.b-histogram');

        const
            schedulerPro      = bryntum.query('schedulerPro'),
            resourceHistogram = bryntum.query('resourceHistogram');

        let firstBarElement   = resourceHistogram.bodyContainer.querySelector('.b-histogram').querySelector('rect');

        const waitForBarCoordinateIsOk = {
            method : () => {
                firstBarElement = resourceHistogram.bodyContainer.querySelector('.b-histogram')?.querySelector('rect');

                return firstBarElement && t.samePx(
                    firstBarElement.getBoundingClientRect().left,
                    resourceHistogram.getCoordinateFromDate(new Date(2020, 3, 27), false),
                    0.5
                );
            },
            description : '0th bar has proper coordinate'
        };

        await t.waitFor(waitForBarCoordinateIsOk);

        await schedulerPro.shiftPrevious();

        await t.waitFor(waitForBarCoordinateIsOk);

        await schedulerPro.shiftPrevious();

        await t.waitFor(waitForBarCoordinateIsOk);

        await schedulerPro.shiftNext();

        await t.waitFor(waitForBarCoordinateIsOk);

        await schedulerPro.shiftNext();

        await t.waitFor(waitForBarCoordinateIsOk);

        await schedulerPro.shiftNext();

        await t.waitFor(waitForBarCoordinateIsOk);
    });
});
