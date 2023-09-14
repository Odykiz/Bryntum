
StartTest(t => {
    t.it('Check if "tests/index.js" has no missing examples', async t => {
        await AjaxHelper.fetch(`../.temp/examples-missing-tests.log`).then(async response => {
            if (response.status === 200) {
                const errTxt = await response.text();
                errTxt.split('\n').forEach(txt => t.fail(txt));
            }
            else {
                t.pass('No missing tests found!');
            }
        });
    });
});
