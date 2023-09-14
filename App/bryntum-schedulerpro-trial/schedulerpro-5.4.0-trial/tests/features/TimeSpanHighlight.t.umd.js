
StartTest(t => {

    let schedulerPro;

    const createScheduler = async() => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2020, 2, 22),
            endDate   : new Date(2020, 2, 29),
            features  : {
                timeSpanHighlight : true,
                nonWorkingTime    : false
            },
            forceFit : true,
            columns  : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ]
        });
    };

    t.beforeEach(async t => {
        schedulerPro?.destroy?.();
    });

    t.it('Should support highlighting one timespan', async t => {
        await createScheduler();

        schedulerPro.highlightTimeSpan({
            // Highlight surrounding area
            surround  : true,
            name      : 'Unavailable time',
            cls       : 'someclass',
            // The time span to visualize
            startDate : new Date(2020, 2, 24),
            endDate   : new Date(2020, 2, 26)
        });

        const shadingDivs = t.query('.b-sch-highlighted-range.b-unavailable.someclass');
        t.is(shadingDivs.length, 2);

        t.isApprox(shadingDivs[0].clientWidth, 2 * schedulerPro.tickSize, 'Sun-Mon is highlighted, 2d wide');
        t.isApprox(shadingDivs[1].clientWidth, 3 * schedulerPro.tickSize, 'Thu-Mon is highlighted, 3d wide');

        schedulerPro.unhighlightTimeSpans();
        t.selectorNotExists('.b-sch-highlighted-range');
    });

    t.it('Should support highlighting multiple timespans', async t => {
        await createScheduler();
        schedulerPro.highlightTimeSpans([
            {
                name      : 'Unavailable time',
                startDate : new Date(2020, 2, 24),
                endDate   : new Date(2020, 2, 26)
            },
            {
                name      : 'Unacceptable time',
                startDate : new Date(2020, 2, 28),
                endDate   : new Date(2020, 2, 29)
            }
        ]);

        const shadingDivs = t.query('.b-sch-highlighted-range');
        t.is(shadingDivs.length, 2);

        t.isApprox(shadingDivs[0].clientWidth, 2 * schedulerPro.tickSize, 'Sun-Mon is highlighted, 2d wide');
        t.isApprox(shadingDivs[1].clientWidth, 1 * schedulerPro.tickSize, 'Sun is highlighted, 1d wide');

        schedulerPro.unhighlightTimeSpans();
        t.selectorNotExists('.b-sch-highlighted-range');
    });

    t.it('Should support surrounding one timespan for a resource', async t => {
        await createScheduler();
        schedulerPro.highlightTimeSpan({
            // Highlight surrounding area
            surround       : true,
            resourceRecord : schedulerPro.resourceStore.getAt(1),
            name           : 'Unavailable time',
            cls            : 'someclass',
            padding        : 10,
            // The time span to visualize
            startDate      : new Date(2020, 2, 24),
            endDate        : new Date(2020, 2, 26)
        });

        const shadingDivs = t.query('.b-sch-highlighted-range.b-unavailable.someclass');
        t.is(shadingDivs.length, 2);

        t.isApprox(shadingDivs[0].clientWidth, 2 * schedulerPro.tickSize, 'Sun-Mon is highlighted, 2d wide');
        t.isApprox(shadingDivs[1].clientWidth, 3 * schedulerPro.tickSize, 'Thu-Mon is highlighted, 3d wide');

        t.isApprox(t.rect(shadingDivs[0]).height, schedulerPro.rowHeight, 'Only for 1 row');
        t.isApprox(t.rect(shadingDivs[0]).top, t.rect(schedulerPro.timeAxisSubGridElement).top + schedulerPro.rowHeight, 'For 2nd row');

        schedulerPro.unhighlightTimeSpans();
        t.selectorNotExists('.b-sch-highlighted-range');
    });

    // https://github.com/bryntum/support/issues/4266
    t.it('Should update highlighted elements after time axis view model is updated', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2020, 2, 22),
            endDate   : new Date(2020, 2, 29),
            features  : {
                timeSpanHighlight : true,
                nonWorkingTime    : false
            },
            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ]
        });

        schedulerPro.highlightTimeSpan({
            name      : 'Unavailable time',
            cls       : 'someclass',
            padding   : 10,
            // The time span to visualize
            startDate : new Date(2020, 2, 24),
            endDate   : new Date(2020, 2, 26)
        });

        let shadingDivs = t.query('.b-sch-highlighted-range.someclass');
        t.is(shadingDivs.length, 1, '1 highlight element');

        t.isApprox(shadingDivs[0].clientWidth, 2 * schedulerPro.tickSize, 'Tue-Thu is highlighted, 2d wide');
        t.isApprox(t.rect(shadingDivs[0]).height, schedulerPro.timeAxisSubGrid.height, 'Height matches full subgrid height');

        schedulerPro.tickSize = 200;

        shadingDivs = t.query('.b-sch-highlighted-range.someclass');
        t.is(shadingDivs.length, 1, '1 highlight element');

        t.isApprox(shadingDivs[0].clientWidth, 2 * schedulerPro.tickSize, 'Tue-Thu is highlighted, 2d wide');
        t.isApprox(t.rect(shadingDivs[0]).height, schedulerPro.timeAxisSubGrid.height, 'Height matches full subgrid height');
    });

    t.it('Should clear highlighted elements when feature is disabled', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2020, 2, 22),
            endDate   : new Date(2020, 2, 29),
            features  : {
                timeSpanHighlight : true,
                nonWorkingTime    : false
            },
            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ]
        });

        schedulerPro.highlightTimeSpan({
            name      : 'Unavailable time',
            cls       : 'someclass',
            padding   : 10,
            // The time span to visualize
            startDate : new Date(2020, 2, 24),
            endDate   : new Date(2020, 2, 26)
        });

        await t.waitForSelector('.b-sch-highlighted-range');

        schedulerPro.features.timeSpanHighlight.disabled = true;

        await t.waitForSelectorNotFound('.b-sch-highlighted-range');
    });
});
