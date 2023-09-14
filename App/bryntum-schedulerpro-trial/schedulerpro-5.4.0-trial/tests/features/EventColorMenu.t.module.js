StartTest(t => {
    let scheduler;

    t.beforeEach(() => {
        scheduler?.destroy();

        if (bryntum.queryAll('menuitem').length > 0) {
            // After scheduler destroy, all menu items must also have been destroyed
            t.is(bryntum.queryAll('menuitem').length, 0, 'Menu items all destroyed');
        }
    });

    async function setup(config = {}) {
        scheduler = await t.getSchedulerProAsync({
            viewPreset           : 'dayAndWeek',
            showTaskColorPickers : true,
            ...config
        }, 3);
    }

    t.it('Should show event menu when configured to do so', async t => {
        await setup();

        await t.rightClick('.b-sch-event');
        await t.moveMouseTo('[data-ref="eventColor"]');

        await t.waitForSelector('.b-colorpicker');
        t.pass('Color menu shown');

        scheduler.showTaskColorPickers = false;

        await t.rightClick('.b-sch-event');
        await t.waitForSelector('.b-menu');
        t.selectorNotExists('.b-menu [data-ref="eventColor"]:not(.b-hidden)', 'No color item visible when set to false');
    });

    t.it('Should work to change event color', async t => {
        await setup();

        await t.rightClick('.b-sch-event');
        await t.moveMouseTo('[data-ref="eventColor"]');
        await t.waitForSelector('.b-colorpicker');

        const
            [redEl]       = t.query('.b-sch-red'),
            expectedColor = window.getComputedStyle(redEl).backgroundColor;

        await t.click('.b-sch-red');
        await t.waitFor(() => window.getComputedStyle(t.query('.b-sch-event')[0]).backgroundColor === expectedColor);
        t.pass('Color changed correctly');
    });
});
