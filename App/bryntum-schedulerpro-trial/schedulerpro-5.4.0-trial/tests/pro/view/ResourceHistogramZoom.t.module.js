
StartTest(async t => {

    let
        histogramWidget,
        unitHeight,
        histogram;

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
                id                : 1,
                startDate         : '2010-01-18',
                duration          : 8,
                manuallyScheduled : true
            },
            {
                id                : 2,
                startDate         : '2010-01-18',
                duration          : 3,
                manuallyScheduled : true
            },
            {
                id                : 3,
                startDate         : '2010-01-18',
                duration          : 0,
                manuallyScheduled : true
            },
            {
                id                : 4,
                startDate         : '2010-01-19',
                duration          : 3,
                manuallyScheduled : true
            }
        ],
        resourcesData : [
            { id : 'r1', name : 'Mike' }
        ],
        assignmentsData : [
            { id : 'a1', resource : 'r1', event : 1, units : 50 }
        ]
    });

    const
        toMS           = (value, unit) => project.convertDuration(value, unit, TimeUnit.Millisecond),
        getElTop       = el => el.getBoundingClientRect().top,
        getElLeft      = el => el.getBoundingClientRect().left,
        getElWidth     = el => el.getBoundingClientRect().width,
        getValueHeight = value => value * unitHeight;

    await project.commitAsync();

    const scaleMaxValuesByZoomLevel = [
        // Years over years
        { value : 4, unit : TimeUnit.Quarter }, //'manyYears',
        { value : 4, unit : TimeUnit.Quarter },

        // Years over quarters
        { value : 3, unit : TimeUnit.Month }, //'year',
        { value : 3, unit : TimeUnit.Month },
        { value : 3, unit : TimeUnit.Month },
        { value : 3, unit : TimeUnit.Month },

        // Years over months
        { value : 4, unit : TimeUnit.Week }, //'monthAndYear',

        // Months over weeks
        { value : 7, unit : TimeUnit.Day },

        // Months over weeks
        { value : 7, unit : TimeUnit.Day },

        // Months over weeks
        { value : 24, unit : TimeUnit.Hour },

        // Months over days
        { value : 24, unit : TimeUnit.Hour },

        // Weeks over days
        { value : 24, unit : TimeUnit.Hour },
        { value : 24, unit : TimeUnit.Hour },

        // Days over hours
        { value : 6, unit : TimeUnit.Hour },
        { value : 6, unit : TimeUnit.Hour },
        { value : 2, unit : TimeUnit.Hour },
        { value : 60, unit : TimeUnit.Minute },

        // Hours over minutes
        { value : 30, unit : TimeUnit.Minute },
        { value : 15, unit : TimeUnit.Minute },
        { value : 15, unit : TimeUnit.Minute },
        { value : 5, unit : TimeUnit.Minute },
        { value : 5, unit : TimeUnit.Minute },

        // Minutes over seconds
        { value : 10, unit : TimeUnit.Second },
        { value : 10, unit : TimeUnit.Second },
        { value : 5, unit : TimeUnit.Second }
    ];

    t.it('Resource histogram updates on zooming', async t => {
        CSSHelper.insertRule('.b-gridbase.b-split .b-grid-splitter:not(.b-disabled) {flex: 0 0 5px}');
        histogram = new ResourceHistogram({
            appendTo                    : document.body,
            startDate                   : new Date(2010, 0, 17),
            endDate                     : new Date(2010, 0, 29),
            height                      : 150,
            autoAdjustTimeAxis          : false,
            useProjectTimeUnitsForScale : true,
            getBarText(datum) {
                return datum.effort ? datum.tick.startDate.getTime() : null;
            },
            project
        });

        const { timeAxis } = histogram;

        await t.waitForSelector('.b-resourcehistogram-cell .b-histogram');

        for (let zoomLevel = histogram.minZoomLevel; zoomLevel <= histogram.maxZoomLevel; zoomLevel++) {

            t.it(`Asserting ${histogram.presets.getAt(zoomLevel).name} (level ${zoomLevel})`, async t => {
                histogram.zoomToLevel(zoomLevel);

                // resource histogram has a special identifier that has timeaxis ticks so need to wait till commit finishes
                await project.commitAsync();

                const
                    histogramElement = histogram.bodyContainer.querySelector('.b-histogram'),
                    svgElement       = histogramElement.querySelector('svg'),
                    svgHeight        = svgElement.getBoundingClientRect().height,
                    barEls           = histogramElement.querySelectorAll('rect');

                histogramWidget = histogram.histogramWidget;
                unitHeight = svgHeight / histogramWidget.topValue;

                t.diag('Asserting scale column');

                const
                    scaleSvgElement   = histogram.bodyContainer.querySelector('.b-scale svg'),
                    scalePathElement  = histogram.bodyContainer.querySelector('.b-scale path'),
                    scaleTextElements = histogram.bodyContainer.querySelectorAll('.b-scale text'),
                    scaleMaxValue     = scaleMaxValuesByZoomLevel[zoomLevel].value,
                    scaleMaxUnit      = scaleMaxValuesByZoomLevel[zoomLevel].unit,
                    scaleMaxMS        = toMS(scaleMaxValue, scaleMaxUnit);

                t.is(scaleTextElements.length, 1, 'proper number of scale point labels');
                t.like(scaleTextElements[0].innerHTML, `${scaleMaxValue}${DateHelper.getShortNameOfUnit(scaleMaxUnit)}`, 'proper scale label text');

                // Firefox report incorrect scaled svg size
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
                if (BrowserHelper.isChrome) {
                    t.isApproxPx(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(scaleMaxMS), 'Proper top scale point position');

                    t.diag('Making sure histogram bars are aligned w/ timeaxis ticks');

                    for (const barEl of barEls) {
                        const
                            barElDate = histogram.getDateFromCoordinate(Math.round(getElLeft(barEl)), undefined, false),
                            tick      = timeAxis.getAt(Math.round(timeAxis.getTickFromDate(barElDate))),
                            barTextEl = histogramElement.querySelector(`text[data-index="${barEl.dataset.index}"]`);

                        t.is(parseInt(barTextEl.innerHTML), tick.startDate.getTime());

                        t.isApproxPx(getElLeft(barTextEl), getElLeft(barEl) + getElWidth(barEl) / 2, getElWidth(barTextEl), `${barEl.dataset.index} bar text roughly matches bar position`);
                    }
                }
            });
        }
    });

});
