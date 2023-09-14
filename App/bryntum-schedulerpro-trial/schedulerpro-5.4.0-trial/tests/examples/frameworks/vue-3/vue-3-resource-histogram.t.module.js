/**
 * Custom simple test
 */
StartTest(t => {

    t.it('Rendering', async t => {
        await t.waitForSelector('.b-timelinebase');
        await t.waitForSelector('.b-checkbox');
    });

    t.it('Enabling/disabling features should work with no errors', async t => {

        await t.click('#feature-status-bar');
        t.pass('Show bar texts on');

        await t.click('#feature-status-bar');
        t.pass('Show bar texts off');

        await t.click('#feature-status-bar');
        t.pass('Show max allocation off');

        await t.click('#feature-status-bar');
        t.pass('Show max allocation off');

        await t.click('#feature-bar-tip');
        t.pass('Enable bar tooltip on');

        await t.click('#feature-bar-tip');
        t.pass('Enable bar tooltip off');
    });
});
