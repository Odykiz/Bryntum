
StartTest(async t => {

    let histogram;

    t.beforeEach(() => ResourceHistogram.destroy(histogram));

    // Required for FF, Siesta is having issues moving mouse to svg elements
    function getXY(svgEl) {
        const rect = t.rect(svgEl);
        return [rect.left + 10, rect.top + 10];
    }

    async function getHistogramRowElements(t, histogram, resource) {
        const
            {
                histogramWidget,
                bodyContainer
            }                   = histogram,
            resourceId          = resource.isModel ? resource.id : resource;

        let histogramElement;

        await t.waitFor(() => histogramElement = bodyContainer
            .querySelector(`.b-grid-row[data-id="${resourceId}"] .b-histogram`));

        const svgElement = histogramElement.querySelector('svg');

        return {
            svgElement,
            svgHeight         : svgElement.getBoundingClientRect().height,
            barEls            : histogramElement.querySelectorAll('rect'),
            scaleSvgElement   : bodyContainer.querySelector(`.b-grid-row[data-id="${resourceId}"] .b-scale svg`),
            scalePathElement  : bodyContainer.querySelector(`.b-grid-row[data-id="${resourceId}"] .b-scale path`),
            scaleTextElements : bodyContainer.querySelectorAll(`.b-grid-row[data-id="${resourceId}"] .b-scale text`),
            rowBox            : Rectangle.from(histogram.getRowFor(resourceId).elements.normal),
            histogramElement,
            histogramWidget
        };
    }

    function getResourceGroupParent(resource) {
        resource = resource.isModel ? resource : project.resourceStore.getById(resource);

        return resource.instanceMeta(project.resourceStore.id).groupParent;
    }

    function getRecordHistogramSelector(record) {
        record = record.isModel ? record : project.resourceStore.getById(record);

        return `.b-grid-row[data-id="${record.id}"] .b-resourcehistogram-cell .b-histogram`;
    }

    const project = new ProjectModel({
        calendar      : 'general',
        calendarsData : [
            {
                id        : 'general',
                name      : 'General',
                intervals : [
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    }
                ]
            }
        ],
        eventsData : [
            {
                id        : 1,
                startDate : '2010-01-18',
                duration  : 8
            },
            {
                id        : 2,
                startDate : '2010-01-18',
                duration  : 1
            },
            {
                id                : 3,
                startDate         : '2010-01-19',
                duration          : 1,
                manuallyScheduled : true
            }
        ],
        resourcesData : [
            { id : 'r1', name : 'Mike', city : 'Moscow' },
            { id : 'r2', name : 'Bob', city : 'Omsk' }
        ],
        assignmentsData : [
            { id : 'a1', resource : 'r1', event : 1, units : 50 },
            { id : 'a2', resource : 'r1', event : 2, units : 60 },
            { id : 'a3', resource : 'r1', event : 3, units : 50 },
            { id : 'a4', resource : 'r2', event : 1, units : 50 },
            { id : 'a5', resource : 'r2', event : 2, units : 60 },
            { id : 'a6', resource : 'r2', event : 3, units : 50 }
        ]
    });

    await project.commitAsync();

    project.resourceStore.group('city');

    t.it('Histogram supports showMaxEffort/showBarText on construction step', async t => {

        histogram = new ResourceHistogram({
            appendTo      : document.body,
            startDate     : new Date(2010, 0, 17),
            endDate       : new Date(2010, 0, 29),
            showMaxEffort : false,
            showBarText   : true,
            project
        });

        await t.waitForSelector('.b-resourcehistogram-cell .b-histogram');

        t.diag('Asserting first group (Mike belongs to)');

        let { barEls, svgElement } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r1'));

        await t.waitFor(() => svgElement?.querySelector('text[data-index="1"]'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h',
                `${barEl.dataset.index}: no text`);
        }

        t.notOk(barEls[0].parentNode.querySelector('path'), 'no max effort line shown');

        t.diag('Asserting resource r1 (Mike)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, 'r1'));

        await t.waitFor(() => svgElement?.querySelector('text[data-index="1"]'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h',
                `${barEl.dataset.index}: no text`);
        }

        t.notOk(barEls[0].parentNode.querySelector('path'), 'no max effort line shown');

        t.diag('Asserting second group (Bob belongs to)');

        await t.waitForSelector(`.b-grid-row[data-id="${getResourceGroupParent('r2').id}"] .b-histogram`);

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r2')));

        await t.waitFor(() => svgElement?.querySelector('text[data-index="1"]'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h',
                `${barEl.dataset.index}: no text`);
        }

        t.notOk(barEls[0].parentNode.querySelector('path'), 'no max effort line shown');

        t.diag('Asserting resource r2 (Bob)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, 'r2'));

        await t.waitFor(() => svgElement?.querySelector('text[data-index="1"]'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h',
                `${barEl.dataset.index}: no text`);
        }

        t.notOk(barEls[0].parentNode.querySelector('path'), 'no max effort line shown');
    });

    t.it('Histogram supports showBarTip on construction step', async t => {

        histogram = new ResourceHistogram({
            appendTo   : document.body,
            startDate  : new Date(2010, 0, 17),
            endDate    : new Date(2010, 0, 29),
            showBarTip : true,
            project
        });

        t.diag('Asserting first group (Mike belongs to)');

        let baseSelector = getRecordHistogramSelector(getResourceGroupParent('r1'));

        await t.waitForSelector(baseSelector);

        await t.waitForAnimations();

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        // 1.1 * 24h = 26.4h
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/18/201026.4h of 24h allocated:Mike - 26.4h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(2)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/19/201024h of 24h allocated:Mike - 24h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(3)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/20/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(4)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/21/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(5)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/22/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(6)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/25/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(7)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/26/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(8)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/27/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        t.diag('Asserting second group (Bob belongs to)');

        baseSelector = getRecordHistogramSelector(getResourceGroupParent('r2'));

        await t.waitForSelector(baseSelector);

        // 1.1 * 24h = 26.4h
        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/18/201026.4h of 24h allocated:Bob - 26.4h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(2)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/19/201024h of 24h allocated:Bob - 24h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(3)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/20/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(4)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/21/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(5)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/22/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(6)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/25/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(7)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/26/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(8)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/27/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        t.diag('Asserting resource r2 (Bob)');

        baseSelector = getRecordHistogramSelector('r2');

        await t.waitForSelector(baseSelector);

        // 1.1 * 24h = 26.4h
        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/18/201026.4h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(2)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/19/201024h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(3)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/20/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(4)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/21/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(5)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/22/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(6)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/25/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(7)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/26/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(8)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/27/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

    });

    t.it('Histogram supports changing showMaxEffort/showBarText dynamically', async t => {

        histogram = new ResourceHistogram({
            appendTo  : document.body,
            startDate : new Date(2010, 0, 17),
            endDate   : new Date(2010, 0, 29),
            project
        });

        await t.waitForSelector('.b-group-row .b-histogram');

        t.notOk(histogram.bodyContainer.querySelector(`.b-histogram svg text[data-index]`), 'no bar texts');

        let { barEls } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r1'));

        t.ok(barEls[0].parentNode.querySelector('path'), 'r1 group has max effort line shown');

        ({ barEls } = await getHistogramRowElements(t, histogram, 'r1'));

        t.ok(barEls[0].parentNode.querySelector('path'), 'r1 has max effort line shown');

        ({ barEls } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r2')));

        t.ok(barEls[0].parentNode.querySelector('path'), 'r2 group has max effort line shown');

        ({ barEls } = await getHistogramRowElements(t, histogram, 'r2'));

        t.ok(barEls[0].parentNode.querySelector('path'), 'r2 has max effort line shown');

        t.diag('Enabling texts');

        histogram.showBarText = true;

        await t.waitForSelector('.b-resourcehistogram text[data-index]');

        t.diag('Asserting first group (Mike belongs to)');

        let svgElement;

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r1')));

        await t.waitFor(() => svgElement?.querySelector('text[data-index="1"]'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');

        t.diag('Asserting r1 (Mike)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, 'r1'));

        await t.waitFor(() => svgElement?.querySelector('text[data-index="1"]'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');

        t.diag('Asserting 2nd group (Bob belongs to)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r2')));

        await t.waitFor(() => svgElement?.querySelector('text[data-index="1"]'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');

        t.diag('Asserting r1 (Mike)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, 'r2'));

        await t.waitFor(() => svgElement?.querySelector('text[data-index="1"]'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');

        t.diag('Disabling max allocation line');

        histogram.showMaxEffort = false;

        await t.waitFor(() => !histogram.bodyContainer.querySelector('.b-histogram svg path'));

        t.pass('No max effort line');

        t.diag('Asserting 1st group (Mike belongs to)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r1')));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: proper text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: proper text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.diag('Asserting r1 (Mike)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, 'r1'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: proper text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: proper text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.diag('Asserting 2nd group (Bob belongs to)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r2')));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.diag('Asserting r2 (Bob)');

        ({ barEls, svgElement } = await getHistogramRowElements(t, histogram, 'r2'));

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.diag('Switching back to initial state');

        histogram.showBarText   = false;
        histogram.showMaxEffort = true;

        await t.waitFor(() => !histogram.bodyContainer.querySelector(`.b-resourcehistogram text[data-index]`));

        t.pass('no bar texts');

        ({ barEls } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r1')));

        t.ok(barEls[0].parentNode.querySelector('path'), 'r1 group has max effort line shown');

        ({ barEls } = await getHistogramRowElements(t, histogram, 'r1'));

        t.ok(barEls[0].parentNode.querySelector('path'), 'r1 has max effort line shown');

        ({ barEls } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r2')));

        t.ok(barEls[0].parentNode.querySelector('path'), 'r2 group has max effort line shown');

        ({ barEls } = await getHistogramRowElements(t, histogram, 'r2'));

        t.ok(barEls[0].parentNode.querySelector('path'), 'r2 has max effort line shown');
    });

    t.it('Histogram supports changing showBarTip dynamically', async t => {

        histogram = new ResourceHistogram({
            appendTo  : document.body,
            startDate : new Date(2010, 0, 17),
            endDate   : new Date(2010, 0, 29),
            project
        });

        t.diag('Enabling tooltips');

        histogram.showBarTip = true;

        t.diag('Asserting 1st group (Mike belongs to)');

        let baseSelector = getRecordHistogramSelector(getResourceGroupParent('r1'));

        await t.waitForSelector(baseSelector);

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        // 1.1 * 24h = 26.4h
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/18/201026.4h of 24h allocated:Mike - 26.4h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(2)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/19/201024h of 24h allocated:Mike - 24h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(3)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/20/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(4)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/21/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(5)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/22/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(6)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/25/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(7)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/26/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(8)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/27/201012h of 24h allocated:Mike - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        t.diag('Asserting r1 (Mike)');

        baseSelector = getRecordHistogramSelector('r1');

        await t.waitForSelector(baseSelector);

        // 1.1 * 24h = 26.4h
        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/18/201026.4h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(2)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/19/201024h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(3)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/20/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(4)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/21/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(5)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/22/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(6)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/25/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(7)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/26/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(8)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/27/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        t.diag('Asserting second group (Bob belongs to)');

        baseSelector = getRecordHistogramSelector(getResourceGroupParent('r2'));

        await t.waitForSelector(baseSelector);

        // 1.1 * 24h = 26.4h
        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/18/201026.4h of 24h allocated:Bob - 26.4h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(2)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/19/201024h of 24h allocated:Bob - 24h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(3)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/20/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(4)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/21/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(5)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/22/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(6)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/25/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(7)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/26/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(8)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("On 01/27/201012h of 24h allocated:Bob - 12h of 24h")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        t.diag('Asserting resource r2 (Bob)');

        baseSelector = getRecordHistogramSelector('r2');

        await t.waitForSelector(baseSelector);

        // 1.1 * 24h = 26.4h
        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/18/201026.4h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(2)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/19/201024h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(3)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/20/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(4)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/21/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(5)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/22/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(6)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/25/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(7)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/26/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(8)`));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Bob on 01/27/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        t.diag('Disabling tooltips');

        histogram.showBarTip = false;

        t.diag('Asserting 1st group (Mike belongs to)');

        baseSelector = getRecordHistogramSelector(getResourceGroupParent('r1'));

        await t.waitForSelector(baseSelector);

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitFor(100);
        await t.selectorNotExists('.b-histogram-bar-tooltip');

        t.diag('Asserting r1 (Mike)');

        baseSelector = getRecordHistogramSelector('r1');

        await t.waitForSelector(baseSelector);

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitFor(100);
        await t.selectorNotExists('.b-histogram-bar-tooltip');

        t.diag('Asserting second group (Bob belongs to)');

        baseSelector = getRecordHistogramSelector(getResourceGroupParent('r2'));

        await t.waitForSelector(baseSelector);

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitFor(100);
        await t.selectorNotExists('.b-histogram-bar-tooltip');

        t.diag('Asserting resource r2 (Bob)');

        baseSelector = getRecordHistogramSelector('r2');

        await t.waitForSelector(baseSelector);

        await t.moveMouseTo(getXY(`${baseSelector} rect:nth-child(1)`));
        await t.waitFor(100);
        await t.selectorNotExists('.b-histogram-bar-tooltip');
    });

});
