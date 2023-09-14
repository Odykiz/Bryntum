StartTest(t => {
    const schedulerPro = bryntum.query('schedulerpro');

    t.it('Sanity', async t => {
        t.ok(schedulerPro.features.eventNonWorkingTime.enabled, 'Event non working time feature is enabled');
        t.notOk(schedulerPro.features.nonWorkingTime?.enabled, 'Non working time feature is disabled');

        await t.waitForSelector('.b-sch-event .b-sch-nonworkingtime');

        t.pass('Event non working time element is rendered');
    });
});
