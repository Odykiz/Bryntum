StartTest(t => {
    t.it('Should not duplicate message', async t => {
        await t.click('.b-invalid-dependency-button');

        await t.waitForSelector('.b-cycleresolutionpopup');

        await t.type(null, '[ESC]');

        await t.waitForSelectorNotFound('.b-cycleresolutionpopup');

        await t.click('.b-invalid-dependency-button');

        await t.waitForSelector('.b-cycleresolutionpopup');

        t.selectorCountIs('.b-invalid-dependencies-description', 1, 'Message shown once');
    });
});
