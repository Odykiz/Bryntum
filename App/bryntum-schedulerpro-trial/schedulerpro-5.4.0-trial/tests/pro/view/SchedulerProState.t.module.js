StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Should not try to restore custom layout', async t => {
        const layoutFn = items => {
            items.forEach(item => {
                item.top = 100 * Math.random();
                item.height = 100 * Math.random();
            });

            return 100;
        };

        schedulerPro = await t.getSchedulerProAsync({
            eventLayout : { layoutFn }
        });

        const done = t.livesOkAsync('State restored ok');

        // eslint-disable-next-line no-self-assign
        schedulerPro.state = schedulerPro.state;

        await schedulerPro.project.commitAsync();

        t.is(schedulerPro.getEventLayout(schedulerPro.resourceStore.first).layoutFn, layoutFn, 'Layout fn is ok');

        done();
    });
});
