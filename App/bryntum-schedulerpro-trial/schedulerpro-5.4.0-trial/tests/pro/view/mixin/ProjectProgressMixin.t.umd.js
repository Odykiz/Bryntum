
StartTest(t => {

    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy());

    function setup(config = {}) {
        schedulerPro = schedulerPro = t.getSchedulerPro({
            startDate : '2021-12-26',
            endDate   : '2021-12-31',

            eventsData : ArrayHelper.populate(1000, i => ({
                id        : i,
                name      : `Event ${i}`,
                startDate : '2021-12-27',
                duration  : 2,
                endDate   : '2021-12-29'
            }), true),

            resourcesData : ArrayHelper.populate(1000, i => ({
                id   : i,
                name : `Resource ${i}`
            }), true),

            assignmentsData : ArrayHelper.populate(1000, i => ({
                id       : i,
                event    : i,
                resource : i
            }), true),

            ...config
        });
    }

    t.it('Should display progressbar by default', async t => {
        setup();

        await t.waitForSelector('.b-calculation-progress');

        t.ok(schedulerPro.project.isDelayingCalculation, 'Progress shown during calculation');

        await t.waitForSelectorNotFound('.b-calculation-progress');

        t.notOk(schedulerPro.project.isDelayingCalculation, 'Progress hidden after calculation');
    });

    t.it('Should allow opting out of displaying progress', async t => {
        setup({
            projectProgressReporting : null
        });

        const spy = t.spyOn(schedulerPro, 'onProjectProgress');

        await schedulerPro.project.commitAsync();

        t.expect(spy).toHaveBeenCalled(0);
    });

    t.it('Should allow displaying progress in a mask', async t => {
        setup({
            projectProgressReporting : 'mask'
        });

        await t.waitForSelector('.b-mask');

        t.ok(schedulerPro.project.isDelayingCalculation, 'Mask shown during calculation');

        await t.waitForSelectorNotFound('.b-mask');
    });
});
