StartTest(async t => {

    await t.waitForSelector('.b-sch-nonworkingtime.factoryShutdown.b-narrow-range:contains(Factory shutdown)');
    await t.waitForSelector('.b-sch-nonworkingtime:contains(Non working time)');
});
