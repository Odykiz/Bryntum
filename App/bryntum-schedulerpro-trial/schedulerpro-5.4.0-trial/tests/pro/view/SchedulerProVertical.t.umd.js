StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = await t.getSchedulerProAsync({
            mode : 'vertical',
            ...config
        });
    }

    // https://github.com/bryntum/support/issues/5372
    t.it('Should remove element when removing event', async t => {
        await setup();

        schedulerPro.eventStore.first.remove();

        t.selectorNotExists('$event=1', 'Event element removed');
    });

});
