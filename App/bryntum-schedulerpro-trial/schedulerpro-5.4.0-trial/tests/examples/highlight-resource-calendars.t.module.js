StartTest(async t => {

    t.it('Should show tooltip when hovering events', async t => {
        await t.moveCursorTo('.b-sch-event:contains(Hip replacement):contains(Patient: Sarah Larson)');

        await t.waitForSelector('.b-tooltip dd:textEquals(Doctor)');
    });
});
