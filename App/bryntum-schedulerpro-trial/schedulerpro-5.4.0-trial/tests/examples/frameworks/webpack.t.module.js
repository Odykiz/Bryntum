StartTest(async t => {
    t.setWindowSize([1024, 500]);

    await t.waitForSelector('.b-schedulerprobase');
    const schedulerPro = bryntum.query('schedulerprobase');
    await t.waitForProjectReady(schedulerPro);

    t.it('Webpack demo sanity test', async t => {
        await t.waitForSelector('.b-sch-event');
        await t.waitForSelector('.demo-header');

        const
            headerElement = document.querySelector('.demo-header'),
            headerRect    = headerElement.getBoundingClientRect();

        t.isApproxPx(headerRect.top, 0, 'Header has valid top');
        t.is(window.getComputedStyle(headerElement).backgroundColor, 'rgb(0, 118, 248)', 'Header has valid color');

        t.ok(schedulerPro.features.taskEdit, 'TaskEdit feature is ok');
    });
});
