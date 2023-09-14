StartTest(async t => {

    const schedulerPro = bryntum.query('schedulerpro');

    t.beforeEach(async t => t.waitForSelector('.b-sch-event'));

    t.it('Should generate data once only', async t => {
        // Await initial delayed calculations before throwing everything away
        await schedulerPro.project.commitAsync();

        schedulerPro.store.removeAll();

        const spy = t.spyOn(console, 'time');
        await t.click('.b-button:contains(5K)');
        // Bigger timeout required for UMD bundle
        await t.waitForSelector(schedulerPro.unreleasedEventSelector, null, null, null, 20000);

        t.is(spy.callsLog.filter(call => call.args[0] === 'generate').length, 1, 'Data generated once');
    });

    // https://github.com/bryntum/support/issues/3532
    t.it('Should not slow down recalculation if many events assigned to one resource', async t => {

        // Snoozing test until we have a better solution for checking performance
        if (new Date() < new Date(2023, 6, 1)) {
            return;
        }
        else {
            t.fail('snoozed test woke up');
        }

        schedulerPro.widgetMap.resourceCountField.value = 10;
        schedulerPro.widgetMap.eventCountField.value = 20;
        await schedulerPro.generateResources();

        await schedulerPro.project.commitAsync();

        let firstEvent = schedulerPro.eventStore.first;

        // make sure random event's endDate won't be out of visible area
        firstEvent.startDate = schedulerPro.project.startDate;
        firstEvent.duration = 4;

        await schedulerPro.project.commitAsync();

        const startTime = performance.now();

        await t.waitForEventOnTrigger(schedulerPro.project, 'dataReady', async() => {
            await t.dragBy({
                source : '.b-sch-event',
                offset : ['100%-3', 5],
                delta  : [schedulerPro.tickSize * 3, 0]
            });
        });

        const regularDataChangeTime = performance.now() - startTime;

        schedulerPro.widgetMap.resourceCountField.value = 10;
        schedulerPro.widgetMap.eventCountField.value = 200;
        await schedulerPro.generateResources();

        await schedulerPro.project.commitAsync();

        // make sure random event's endDate won't be out of visible area

        firstEvent = schedulerPro.eventStore.first;
        firstEvent.startDate = schedulerPro.project.startDate;
        firstEvent.duration = 4;

        await schedulerPro.project.commitAsync();

        const bigDataStartTime = performance.now();

        await t.waitForEventOnTrigger(schedulerPro.project, 'dataReady', async() => {
            await t.dragBy({
                source : '.b-sch-event',
                offset : ['100%-3', 5],
                delta  : [schedulerPro.tickSize * 3, 0]
            });
        });

        const bigDataChangeTime = performance.now() - bigDataStartTime;

        t.isApprox(bigDataChangeTime, regularDataChangeTime, regularDataChangeTime * 2, 'Event resize with many events in a resource did not slow down the app');
    });
});
