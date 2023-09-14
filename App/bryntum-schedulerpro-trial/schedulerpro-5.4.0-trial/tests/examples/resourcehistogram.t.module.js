StartTest(t => {

    t.it('Should start with synced locked subgrid widths', async t => {
        await t.waitForSelector('.b-schedulerpro .b-grid-cell');
        await t.waitForSelector('.b-resourcehistogram .b-grid-cell');

        const
            schedulerPro      = bryntum.query('schedulerpro'),
            resourceHistogram = bryntum.query('resourcehistogram');

        t.is(schedulerPro.subGrids.locked.width, resourceHistogram.subGrids.locked.width, 'Widths synced');
    });
});
