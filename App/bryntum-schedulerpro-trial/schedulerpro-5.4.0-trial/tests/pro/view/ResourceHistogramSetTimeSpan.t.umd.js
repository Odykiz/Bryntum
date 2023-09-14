
StartTest(async t => {

    let
        histogramWidget,
        unitHeight,
        histogram;

    // 24 hours in milliseconds
    const _24h = 24 * 60 * 60 * 1000;

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
        getElTop       = el => el.getBoundingClientRect().top,
        getElLeft      = el => el.getBoundingClientRect().left,
        getElHeight    = el => el.getBoundingClientRect().height,
        getValueHeight = value => value * unitHeight,
        getDatePos     = date => histogram.getCoordinateFromDate(date, false);

    await project.commitAsync();

    t.it('Resource histogram updates on timeaxis timespan change', async t => {

        histogram = new ResourceHistogram({
            appendTo           : document.body,
            startDate          : new Date(2010, 0, 17),
            endDate            : new Date(2010, 0, 29),
            height             : 150,
            autoAdjustTimeAxis : false,
            getBarText(datum) {
                return datum.effort ? datum.tick.startDate.getTime() : null;
            },
            project
        });

        t.chain(
            { waitForSelector : '.b-resourcehistogram-cell .b-histogram' },
            next => {
                const
                    histogramElement    = histogram.bodyContainer.querySelector('.b-histogram'),
                    svgElement          = histogramElement.querySelector('svg'),
                    svgHeight           = svgElement.getBoundingClientRect().height,
                    barEls              = histogramElement.querySelectorAll('rect');

                histogramWidget  = histogram.histogramWidget;
                unitHeight       = svgHeight / histogramWidget.topValue;

                // asserting scale column
                const
                    scaleSvgElement     = histogram.bodyContainer.querySelector('.b-scale svg'),
                    scalePathElement    = histogram.bodyContainer.querySelector('.b-scale path'),
                    scaleTextElements   = histogram.bodyContainer.querySelectorAll('.b-scale text');

                t.is(scaleTextElements.length, 1, 'proper number of scale point labels');
                t.like(scaleTextElements[0].innerHTML, '24h', 'proper scale label text');
                t.is(barEls.length, 8, 'proper number of bars');

                // Firefox report incorrect scaled svg size
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
                if (!BrowserHelper.isFirefox && !BrowserHelper.isEdge) {
                    t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(_24h), 0.1, 'proper top scale point position');

                    t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h / 2), 0.5, '0: bar has proper height');
                    t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h / 2), 0.5, '1: bar has proper height');
                    t.isApprox(getElHeight(barEls[2]), getValueHeight(_24h / 2), 0.5, '2: bar has proper height');
                    t.isApprox(getElHeight(barEls[3]), getValueHeight(_24h / 2), 0.5, '3: bar has proper height');
                    t.isApprox(getElHeight(barEls[4]), getValueHeight(_24h / 2), 0.5, '4: bar has proper height');
                    // skip weekend
                    t.isApprox(getElHeight(barEls[5]), getValueHeight(_24h / 2), 0.5, '5: bar has proper height');
                    t.isApprox(getElHeight(barEls[6]), getValueHeight(_24h / 2), 0.5, '6: bar has proper height');
                    t.isApprox(getElHeight(barEls[7]), getValueHeight(_24h / 2), 0.5, '7: bar has proper height');

                    t.ok(barEls[0].classList.contains('b-underallocated'), '0: bar has proper css class');
                    t.ok(barEls[1].classList.contains('b-underallocated'), '1: bar has proper css class');
                    t.ok(barEls[2].classList.contains('b-underallocated'), '2: bar has proper css class');
                    t.ok(barEls[3].classList.contains('b-underallocated'), '3: bar has proper css class');
                    t.ok(barEls[4].classList.contains('b-underallocated'), '4: bar has proper css class');
                    t.ok(barEls[5].classList.contains('b-underallocated'), '5: bar has proper css class');
                    t.ok(barEls[6].classList.contains('b-underallocated'), '6: bar has proper css class');
                    t.ok(barEls[7].classList.contains('b-underallocated'), '7: bar has proper css class');

                    t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 18)), 0.5, '0: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 19)), 0.5, '1: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[2]), getDatePos(new Date(2010, 0, 20)), 0.5, '2: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[3]), getDatePos(new Date(2010, 0, 21)), 0.5, '3: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[4]), getDatePos(new Date(2010, 0, 22)), 0.5, '4: bar has proper coordinate');
                    // skip weekend
                    t.isApprox(getElLeft(barEls[5]), getDatePos(new Date(2010, 0, 25)), 0.5, '5: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[6]), getDatePos(new Date(2010, 0, 26)), 0.5, '6: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[7]), getDatePos(new Date(2010, 0, 27)), 0.5, '7: bar has proper coordinate');
                }

                next();
            },

            async() => {
                t.diag('Changing timespan');

                histogram.timeAxis.setTimeSpan(
                    new Date(2010, 0, 19),
                    new Date(2010, 0, 26)
                );

                await project.commitAsync();
            },

            next => {
                const
                    histogramElement    = histogram.bodyContainer.querySelector('.b-histogram'),
                    svgElement          = histogramElement.querySelector('svg'),
                    svgHeight           = svgElement.getBoundingClientRect().height,
                    barEls              = histogramElement.querySelectorAll('rect');

                // histogramWidget  = histogram.histogramWidget;
                unitHeight       = svgHeight / histogramWidget.topValue;

                // asserting scale column
                const
                    scaleSvgElement     = histogram.bodyContainer.querySelector('.b-scale svg'),
                    scalePathElement    = histogram.bodyContainer.querySelector('.b-scale path'),
                    scaleTextElements   = histogram.bodyContainer.querySelectorAll('.b-scale text');

                t.is(scaleTextElements.length, 1, 'proper number of scale point labels');
                t.like(scaleTextElements[0].innerHTML, '24h', 'proper scale label text');
                t.is(barEls.length, 5, 'proper number of bars');

                // Firefox report incorrect scaled svg size
                // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
                if (!BrowserHelper.isFirefox && !BrowserHelper.isEdge) {
                    t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(_24h), 0.1, 'proper top scale point position');

                    t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h / 2), 0.5, '1: bar has proper height');
                    t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h / 2), 0.5, '2: bar has proper height');
                    t.isApprox(getElHeight(barEls[2]), getValueHeight(_24h / 2), 0.5, '3: bar has proper height');
                    t.isApprox(getElHeight(barEls[3]), getValueHeight(_24h / 2), 0.5, '4: bar has proper height');
                    // skip weekend
                    t.isApprox(getElHeight(barEls[4]), getValueHeight(_24h / 2), 0.5, '5: bar has proper height');

                    t.ok(barEls[0].classList.contains('b-underallocated'), '1: bar has proper css class');
                    t.ok(barEls[1].classList.contains('b-underallocated'), '2: bar has proper css class');
                    t.ok(barEls[2].classList.contains('b-underallocated'), '3: bar has proper css class');
                    t.ok(barEls[3].classList.contains('b-underallocated'), '4: bar has proper css class');
                    t.ok(barEls[4].classList.contains('b-underallocated'), '5: bar has proper css class');

                    t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 19)), 0.5, '1: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 20)), 0.5, '2: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[2]), getDatePos(new Date(2010, 0, 21)), 0.5, '3: bar has proper coordinate');
                    t.isApprox(getElLeft(barEls[3]), getDatePos(new Date(2010, 0, 22)), 0.5, '4: bar has proper coordinate');
                    // skip weekend
                    t.isApprox(getElLeft(barEls[4]), getDatePos(new Date(2010, 0, 25)), 0.5, '5: bar has proper coordinate');
                }

                next();
            }
        );
    });

});
