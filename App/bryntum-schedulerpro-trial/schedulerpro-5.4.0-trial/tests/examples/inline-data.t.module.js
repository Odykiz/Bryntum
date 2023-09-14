StartTest(async t => {

    await t.waitForSelector('.b-sch-event');

    const schedulerpro = bryntum.query('schedulerpro');

    t.it('Should apply inline data', async t => {
        await t.waitForSelector('.b-sch-event-content:contains(Yearly maintenance)');

        t.is(schedulerpro.eventStore.count, 23, 'Correct events count');
        t.is(schedulerpro.resourceStore.count, 14, 'Correct resource count');
        t.is(schedulerpro.dependencyStore.count, 16, 'Correct dependencies');
    });

});
