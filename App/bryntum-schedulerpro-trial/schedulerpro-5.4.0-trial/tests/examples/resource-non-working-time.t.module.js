StartTest(async t => {
    t.firesOnce(window.schedulerPro, 'resourceNonWorkingTimeClick');
    await t.moveCursorTo('.b-sch-resourcenonworkingtime.break');
    await t.waitForSelector('.b-tooltip:contains(Break (1 hour))');

    await t.click('.b-sch-resourcenonworkingtime.break');
});
