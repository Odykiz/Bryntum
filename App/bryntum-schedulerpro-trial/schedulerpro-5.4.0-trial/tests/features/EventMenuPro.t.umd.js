StartTest(t => {

    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy());

    // https://github.com/bryntum/support/issues/6644
    t.it('Should show default menu options', async t => {
        schedulerPro = t.getSchedulerPro();

        await t.rightClick('.b-sch-event');

        t.isDeeply(t.query('.b-menuitem:not(.b-disabled):not(.b-hidden').map(node => node.innerText.trim()), ['Edit task', 'Copy event', 'Cut event', 'Delete event', 'Unassign event', 'Split event']);

        await t.click('.b-menuitem:contains(Edit task)');
        await t.waitForSelector('.b-schedulerpro-taskeditor');
    });
});
