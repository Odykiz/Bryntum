
StartTest(async t => {

    let histogram;

    t.beforeEach(() => ResourceHistogram.destroy(histogram));

    // Required for FF, Siesta is having issues moving mouse to svg elements
    function getXY(svgEl) {
        const rect = t.rect(svgEl);
        return [rect.left + 10, rect.top + 10];
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
            { id : 'r1', name : 'Mike' }
        ],
        assignmentsData : [
            { id : 'a1', resource : 'r1', event : 1, units : 50 },
            { id : 'a2', resource : 'r1', event : 2, units : 60 },
            { id : 'a3', resource : 'r1', event : 3, units : 50 }
        ]
    });

    await project.commitAsync();

    t.it('Histogram by default has showMaxEffort ON, and showBarText/showBarTip OFF', async t => {

        histogram = new ResourceHistogram({
            appendTo  : document.body,
            startDate : new Date(2010, 0, 17),
            endDate   : new Date(2010, 0, 29),
            project
        });

        await t.waitForSelector('.b-resourcehistogram-cell .b-histogram');

        const
            svgElement = histogram.bodyContainer.querySelector('.b-histogram svg'),
            barEls     = svgElement.querySelectorAll('rect');

        t.selectorExists('.b-sch-header-timeaxis-cell:contains("Sun 17 Jan 2010")', 'timeaxis column header is rendered');

        t.notOk(svgElement.querySelector(`.b-resourcehistogram text[data-index]`), 'no bar texts');
        t.notOk(svgElement.querySelector('.b-resourcehistogram rect[data-btip]'), 'no tooltips');
        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');
    });

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

        const
            { bodyContainer }   = histogram,
            histogramElement    = bodyContainer.querySelector('.b-histogram'),
            svgElement          = histogramElement.querySelector('svg'),
            barEls              = svgElement.querySelectorAll('rect');

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: proper text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: proper text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
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

        await t.waitForProjectReady(project);
        await t.waitForSelector('.b-resourcehistogram-cell .b-histogram');

        const
            { bodyContainer }   = histogram,
            histogramElement    = bodyContainer.querySelector('.b-histogram'),
            svgElement          = histogramElement.querySelector('svg'),
            barEls              = svgElement.querySelectorAll('rect');

        await t.moveMouseTo(getXY(barEls[0]));
        // 1.1 * 24h = 26.4h
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/18/201026.4h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(barEls[1]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/19/201024h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(barEls[2]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/20/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[3]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/21/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[4]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/22/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[5]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/25/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[6]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/26/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[7]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/27/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');
    });

    t.it('Histogram supports changing showMaxEffort/showBarText/showBarTip dynamically', async t => {

        histogram = new ResourceHistogram({
            appendTo  : document.body,
            startDate : new Date(2010, 0, 17),
            endDate   : new Date(2010, 0, 29),
            project
        });

        await t.waitForSelector('.b-resourcehistogram-cell .b-histogram');

        let
            svgElement = histogram.bodyContainer.querySelector('.b-histogram svg'),
            barEls     = svgElement.querySelectorAll('rect');

        t.notOk(svgElement.querySelector(`.b-resourcehistogram text[data-index]`), 'no bar texts');
        t.notOk(svgElement.querySelector('.b-resourcehistogram rect[data-btip]'), 'no tooltips');
        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');

        t.diag('Enabling texts');
        histogram.showBarText = true;

        await t.waitForSelector('.b-resourcehistogram text[data-index]');

        svgElement = histogram.bodyContainer.querySelector('.b-histogram svg');
        barEls     = svgElement.querySelectorAll('rect');

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        t.notOk(svgElement.querySelector('.b-resourcehistogram rect[data-btip]'), 'no tooltips');
        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');

        t.diag('Enabling tooltips');

        histogram.showBarTip = true;

        await t.moveMouseTo(getXY(barEls[0]));
        // 1.1 * 24h = 26.4h
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/18/201026.4h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(barEls[1]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/19/201024h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        await t.moveMouseTo(getXY(barEls[2]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/20/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[3]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/21/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[4]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/22/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[5]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/25/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[6]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/26/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        await t.moveMouseTo(getXY(barEls[7]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/27/201012h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-underallocated:contains("12h of 24h")');

        svgElement = histogram.bodyContainer.querySelector('.b-histogram svg');
        barEls     = svgElement.querySelectorAll('rect');

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');

        t.diag('Disabling max allocation line');
        histogram.showMaxEffort = false;

        await t.waitFor(() => !histogram.bodyContainer.querySelector('.b-histogram svg path'));
        t.pass('No max effort line');

        svgElement = histogram.bodyContainer.querySelector('.b-histogram svg');
        barEls     = svgElement.querySelectorAll('rect');

        t.is(svgElement.querySelector(`text[data-index="1"]`).innerHTML, '26.4h', `1: no text`);
        t.is(svgElement.querySelector(`text[data-index="2"]`).innerHTML, '24h', `2: no text`);

        for (let i = 2; i < 8; i++) {
            const barEl = barEls[i];

            t.is(svgElement.querySelector(`text[data-index="${barEl.dataset.index}"]`).innerHTML, '12h', `${barEl.dataset.index}: proper text`);
        }

        await t.moveMouseTo(getXY(barEls[0]));
        // 1.1 * 24h = 26.4h
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/18/201026.4h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip .b-overallocated:contains("26.4h of 24h")');

        await t.moveMouseTo(getXY(barEls[1]));
        await t.waitForSelector('.b-histogram-bar-tooltip:contains("Mike on 01/19/201024h of 24h allocated")');
        await t.selectorExists('.b-histogram-bar-tooltip :contains("24h of 24h")');

        t.diag('Switching back to initial state');

        const prevSvgElement = svgElement;

        histogram.showBarText   = false;
        histogram.showBarTip    = false;
        histogram.showMaxEffort = true;

        // wait till histogram is updated
        await t.waitFor(() => {
            svgElement = histogram.bodyContainer.querySelector('.b-histogram svg');

            return prevSvgElement !== svgElement;
        });

        barEls     = svgElement.querySelectorAll('rect');

        await t.moveMouseTo(getXY(barEls[0]));

        await t.waitFor(100);

        t.selectorNotExists('.b-histogram-bar-tooltip', 'No tooltip found');

        t.notOk(svgElement.querySelector(`.b-resourcehistogram text[data-index]`), 'no bar texts');
        t.ok(barEls[0].parentNode.querySelector('path'), 'has max effort line shown');
    });

    t.it('Column context menu does not throw', async t => {
        histogram = new ResourceHistogram({
            appendTo  : document.body,
            startDate : new Date(2010, 0, 17),
            endDate   : new Date(2010, 0, 29),
            features  : {
                timeAxisHeaderMenu : true
            },
            columns : [
                { text : 'Name', field : 'name' }
            ],
            project
        });

        t.isDeeply(
            Object.keys(histogram.features).sort(),
            [
                'cellEdit',
                'cellMenu',
                'columnAutoWidth',
                'columnLines',
                'columnPicker',
                'columnReorder',
                'columnResize',
                'group',
                'headerMenu',
                'nonWorkingTime',
                'regionResize',
                'sort',
                'timeAxisHeaderMenu'
            ].sort(),
            'Features are ok'
        );

        await t.rightClick('.b-grid-header');

        await t.waitForSelector('.b-menuitem:contains(Hide)');

        await t.rightClick('.b-sch-header-timeaxis-cell');

        await t.rightClick('.b-resourcehistogram-cell svg');
    });

    t.it('Histogram skips inactive tasks depending on includeInactiveEvents config value', async t => {

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
                }
            ],
            resourcesData : [
                { id : 'r1', name : 'Mike' }
            ],
            assignmentsData : [
                { id : 'a1', resource : 'r1', event : 1, units : 50 }
            ]
        });

        histogram = new ResourceHistogram({
            appendTo  : document.body,
            startDate : new Date(2010, 0, 17),
            endDate   : new Date(2010, 0, 29),
            features  : {
                timeAxisHeaderMenu : true
            },
            columns : [
                { text : 'Name', field : 'name' }
            ],
            project
        });

        await t.waitForSelector('.b-resourcehistogram-cell .b-histogram');

        t.is(histogram.bodyContainer.querySelectorAll('.b-grid-body-container .b-histogram svg rect').length, 8, 'bars are shown');

        t.diag('deactivating the event');

        project.eventStore.first.inactive = true;

        await t.waitForSelectorNotFound('.b-grid-body-container .b-histogram svg rect');

        t.pass('no bars are shown');

        t.diag('activating the event');

        project.eventStore.first.inactive = false;

        await t.waitForSelector('.b-grid-body-container .b-histogram svg rect');

        t.is(histogram.bodyContainer.querySelectorAll('.b-grid-body-container .b-histogram svg rect').length, 8, 'bars are shown');

        t.diag('deactivating the event');

        project.eventStore.first.inactive = true;

        await t.waitForSelectorNotFound('.b-grid-body-container .b-histogram svg rect');

        t.pass('no bars are shown');

        t.diag('enabling includeInactiveEvents');

        histogram.includeInactiveEvents = true;

        await t.waitForSelector('.b-grid-body-container .b-histogram svg rect');

        t.is(histogram.bodyContainer.querySelectorAll('.b-grid-body-container .b-histogram svg rect').length, 8, 'bars are shown');

        t.diag('disabling includeInactiveEvents');

        histogram.includeInactiveEvents = false;

        await t.waitForSelectorNotFound('.b-grid-body-container .b-histogram svg rect');

        t.pass('no bars are shown');
    });

});
