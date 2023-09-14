
StartTest(async(t) => {

    let histogram, project, unitHeight;

    t.beforeEach(() => ResourceHistogram.destroy(histogram));

    const
        getElTop       = el => el.getBoundingClientRect().top,
        getElLeft      = el => el.getBoundingClientRect().left,
        getElHeight    = el => el.getBoundingClientRect().height,
        getValueHeight = value => value * unitHeight,
        getDatePos     = date => histogram.getCoordinateFromDate(date, false),
        // 24 hours in milliseconds
        _24h           = 24 * 60 * 60 * 1000;

    async function getHistogramRowElements(t, histogram, resource) {
        const
            {
                histogramWidget,
                bodyContainer
            }                   = histogram,
            resourceId          = resource.isModel ? resource.id : resource;

        let histogramElement;

        await t.waitFor(() => histogramElement = bodyContainer.querySelector(`.b-grid-row[data-id="${resourceId}"] .b-histogram`));

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

    t.it('Should support grouped resource store', async t => {

        project = new ProjectModel({
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
                    duration          : 1,
                    manuallyScheduled : true
                },
                {
                    id                : 4,
                    startDate         : '2010-01-18',
                    duration          : 2,
                    manuallyScheduled : true
                }
            ],
            resourcesData : [
                { id : 'r1', name : 'Mike', city : 'Moscow' },
                { id : 'r2', name : 'John', city : 'Moscow' },
                { id : 'r3', name : 'David', city : 'Barcelona' }
            ],
            assignmentsData : [
                { id : 'a1', resource : 'r1', event : 1, units : 50 },
                { id : 'a2', resource : 'r2', event : 2, units : 60 },
                { id : 'a3', resource : 'r3', event : 3, units : 70 },
                { id : 'a4', resource : 'r3', event : 4, units : 40 }
            ]
        });

        project.resourceStore.group('city');

        histogram = new ResourceHistogram({
            appendTo           : document.body,
            startDate          : new Date(2010, 0, 17),
            endDate            : new Date(2010, 0, 29),
            autoAdjustTimeAxis : false,
            columns            : [{
                field : 'name'
            }],
            project
        });

        await project.commitAsync();

        await t.waitForSelector('.b-group-row .b-histogram');

        await t.waitFor(() => !histogram.isAnimating);

        t.diag('Asserting resource r1 (Mike)');

        let {
            svgHeight,
            barEls,
            svgElement,
            rowBox,
            scaleSvgElement,
            scalePathElement,
            scaleTextElements
        } = await getHistogramRowElements(t, histogram, 'r1');

        unitHeight = svgHeight / svgElement.dataset.topValue;

        // asserting scale column
        t.is(scaleTextElements.length, 1, 'r1: proper number of scale point labels');
        t.like(scaleTextElements[0].innerHTML, '24h', 'r1: proper scale label text');
        t.is(barEls.length, 8, 'r1: proper number of bars');

        // Firefox report incorrect scaled svg size
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
        if (!BrowserHelper.isFirefox) {
            t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(_24h), 0.1, 'r1: proper top scale point position');

            t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h / 2), 0.5, 'r1: 0: bar has proper height');
            t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h / 2), 0.5, 'r1: 1: bar has proper height');
            t.isApprox(getElHeight(barEls[2]), getValueHeight(_24h / 2), 0.5, 'r1: 2: bar has proper height');
            t.isApprox(getElHeight(barEls[3]), getValueHeight(_24h / 2), 0.5, 'r1: 3: bar has proper height');
            t.isApprox(getElHeight(barEls[4]), getValueHeight(_24h / 2), 0.5, 'r1: 4: bar has proper height');
            // skip weekend
            t.isApprox(getElHeight(barEls[5]), getValueHeight(_24h / 2), 0.5, 'r1: 5: bar has proper height');
            t.isApprox(getElHeight(barEls[6]), getValueHeight(_24h / 2), 0.5, 'r1: 6: bar has proper height');
            t.isApprox(getElHeight(barEls[7]), getValueHeight(_24h / 2), 0.5, 'r1: 7: bar has proper height');

            t.hasCls(barEls[0], 'b-underallocated', 'r1: 0: bar has proper css class');
            t.hasCls(barEls[1], 'b-underallocated', 'r1: 1: bar has proper css class');
            t.hasCls(barEls[2], 'b-underallocated', 'r1: 2: bar has proper css class');
            t.hasCls(barEls[3], 'b-underallocated', 'r1: 3: bar has proper css class');
            t.hasCls(barEls[4], 'b-underallocated', 'r1: 4: bar has proper css class');
            t.hasCls(barEls[5], 'b-underallocated', 'r1: 5: bar has proper css class');
            t.hasCls(barEls[6], 'b-underallocated', 'r1: 6: bar has proper css class');
            t.hasCls(barEls[7], 'b-underallocated', 'r1: 7: bar has proper css class');

            t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 18)), 0.5, 'r1: 0: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 19)), 0.5, 'r1: 1: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[2]), getDatePos(new Date(2010, 0, 20)), 0.5, 'r1: 2: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[3]), getDatePos(new Date(2010, 0, 21)), 0.5, 'r1: 3: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[4]), getDatePos(new Date(2010, 0, 22)), 0.5, 'r1: 4: bar has proper coordinate');
            // skip weekend
            t.isApprox(getElLeft(barEls[5]), getDatePos(new Date(2010, 0, 25)), 0.5, 'r1: 5: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[6]), getDatePos(new Date(2010, 0, 26)), 0.5, 'r1: 6: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[7]), getDatePos(new Date(2010, 0, 27)), 0.5, 'r1: 7: bar has proper coordinate');

            Array.from(barEls).forEach((el, i) => {
                t.ok(rowBox.contains(Rectangle.from(el)), `r1: ${i}: bar is contained within row element`);
            });
        }

        t.diag('Asserting resource r2 (John)');

        ({
            svgHeight,
            barEls,
            svgElement,
            rowBox,
            scaleSvgElement,
            scalePathElement,
            scaleTextElements
        } = await getHistogramRowElements(t, histogram, 'r2'));

        unitHeight = svgHeight / svgElement.dataset.topValue;

        // asserting scale column
        t.is(scaleTextElements.length, 1, 'r2: proper number of scale point labels');
        t.like(scaleTextElements[0].innerHTML, '24h', 'r2: proper scale label text');
        t.is(barEls.length, 3, 'r2: proper number of bars');

        // Firefox report incorrect scaled svg size
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
        if (!BrowserHelper.isFirefox) {
            t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(_24h), 0.1, 'r2: proper top scale point position');

            t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h * 0.6), 0.5, 'r2: 0: bar has proper height');
            t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h * 0.6), 0.5, 'r2: 1: bar has proper height');
            t.isApprox(getElHeight(barEls[2]), getValueHeight(_24h * 0.6), 0.5, 'r2: 2: bar has proper height');

            t.hasCls(barEls[0], 'b-underallocated', 'r2: 0: bar has proper css class');
            t.hasCls(barEls[1], 'b-underallocated', 'r2: 1: bar has proper css class');
            t.hasCls(barEls[2], 'b-underallocated', 'r2: 2: bar has proper css class');

            t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 18)), 0.5, 'r2: 0: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 19)), 0.5, 'r2: 1: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[2]), getDatePos(new Date(2010, 0, 20)), 0.5, 'r2: 2: bar has proper coordinate');

            Array.from(barEls).forEach((el, i) => {
                t.ok(rowBox.contains(Rectangle.from(el)), `r2: ${i}: bar is contained within row element`);
            });
        }

        t.diag('Asserting resource r1 & r2 group row');

        ({
            svgHeight,
            svgElement,
            barEls,
            rowBox,
            scaleSvgElement,
            scalePathElement,
            scaleTextElements
        } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r1')));

        let topValue = 2 * _24h;

        unitHeight = svgHeight / svgElement.dataset.topValue;

        // asserting scale column
        t.is(scaleTextElements.length, 1, 'r1 & r2 group: proper number of scale point labels');
        t.like(scaleTextElements[0].innerHTML, '2d', 'r1 & r2 group: proper scale label text');
        t.is(barEls.length, 8, 'r1 & r2 group: proper number of bars');

        // Firefox report incorrect scaled svg size
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
        if (!BrowserHelper.isFirefox) {
            t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(topValue), 0.1, 'r1 & r2 group: proper top scale point position');

            t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h * 1.1), 0.5, 'r1 & r2 group: 0: bar has proper height');
            t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h * 1.1), 0.5, 'r1 & r2 group: 1: bar has proper height');
            t.isApprox(getElHeight(barEls[2]), getValueHeight(_24h * 1.1), 0.5, 'r1 & r2 group: 2: bar has proper height');
            t.isApprox(getElHeight(barEls[3]), getValueHeight(_24h * 0.5), 0.5, 'r1 & r2 group: 3: bar has proper height');
            t.isApprox(getElHeight(barEls[4]), getValueHeight(_24h * 0.5), 0.5, 'r1 & r2 group: 4: bar has proper height');
            // skip weekend
            t.isApprox(getElHeight(barEls[5]), getValueHeight(_24h * 0.5), 0.5, 'r1 & r2 group: 5: bar has proper height');
            t.isApprox(getElHeight(barEls[6]), getValueHeight(_24h * 0.5), 0.5, 'r1 & r2 group: 6: bar has proper height');
            t.isApprox(getElHeight(barEls[7]), getValueHeight(_24h * 0.5), 0.5, 'r1 & r2 group: 7: bar has proper height');

            t.hasCls(barEls[0], 'b-underallocated', 'r1 & r2 group: 0: bar has proper css class');
            t.hasCls(barEls[1], 'b-underallocated', 'r1 & r2 group: 1: bar has proper css class');
            t.hasCls(barEls[2], 'b-underallocated', 'r1 & r2 group: 2: bar has proper css class');
            t.hasCls(barEls[3], 'b-underallocated', 'r1 & r2 group: 3: bar has proper css class');
            t.hasCls(barEls[4], 'b-underallocated', 'r1 & r2 group: 4: bar has proper css class');
            t.hasCls(barEls[5], 'b-underallocated', 'r1 & r2 group: 5: bar has proper css class');
            t.hasCls(barEls[6], 'b-underallocated', 'r1 & r2 group: 6: bar has proper css class');
            t.hasCls(barEls[7], 'b-underallocated', 'r1 & r2 group: 7: bar has proper css class');

            t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 18)), 0.5, 'r1 & r2 group: 0: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 19)), 0.5, 'r1 & r2 group: 1: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[2]), getDatePos(new Date(2010, 0, 20)), 0.5, 'r1 & r2 group: 2: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[3]), getDatePos(new Date(2010, 0, 21)), 0.5, 'r1 & r2 group: 3: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[4]), getDatePos(new Date(2010, 0, 22)), 0.5, 'r1 & r2 group: 4: bar has proper coordinate');
            // skip weekend
            t.isApprox(getElLeft(barEls[5]), getDatePos(new Date(2010, 0, 25)), 0.5, 'r1 & r2 group: 5: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[6]), getDatePos(new Date(2010, 0, 26)), 0.5, 'r1 & r2 group: 6: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[7]), getDatePos(new Date(2010, 0, 27)), 0.5, 'r1 & r2 group: 7: bar has proper coordinate');

            Array.from(barEls).forEach((el, i) => {
                t.ok(rowBox.contains(Rectangle.from(el)), `r1 & r2 group: ${i}: bar is contained within row element`);
            });
        }

        t.diag('Asserting resource r3 (David)');

        ({
            svgHeight,
            barEls,
            svgElement,
            rowBox,
            scaleSvgElement,
            scalePathElement,
            scaleTextElements
        } = await getHistogramRowElements(t, histogram, 'r3'));

        unitHeight = svgHeight / svgElement.dataset.topValue;

        // asserting scale column
        t.is(scaleTextElements.length, 1, 'r3: proper number of scale point labels');
        t.like(scaleTextElements[0].innerHTML, '24h', 'r3: proper scale label text');
        t.is(barEls.length, 2, 'r3: proper number of bars');

        // Firefox report incorrect scaled svg size
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
        if (!BrowserHelper.isFirefox) {
            t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(_24h), 0.1, 'r3: proper top scale point position');

            t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h * 1.1), 0.5, 'r3: 0: bar has proper height');
            t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h * 0.4), 0.5, 'r3: 1: bar has proper height');

            t.hasCls(barEls[0], 'b-overallocated', 'r3: 0: bar has proper css class');
            t.hasCls(barEls[1], 'b-underallocated', 'r3: 1: bar has proper css class');

            t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 18)), 0.5, 'r3: 0: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 19)), 0.5, 'r3: 1: bar has proper coordinate');

            Array.from(barEls).forEach((el, i) => {
                t.ok(rowBox.contains(Rectangle.from(el)), `r3: ${i}: bar is contained within row element`);
            });
        }

        t.diag('Asserting resource r3 group row');

        ({
            svgHeight,
            barEls,
            svgElement,
            rowBox,
            scaleSvgElement,
            scalePathElement,
            scaleTextElements
        } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r3')));

        topValue = _24h;

        unitHeight = svgHeight / svgElement.dataset.topValue;

        // asserting scale column
        t.is(scaleTextElements.length, 1, 'r3 group: proper number of scale point labels');
        t.like(scaleTextElements[0].innerHTML, '24h', 'r3 group: proper scale label text');
        t.is(barEls.length, 2, 'r3 group: proper number of bars');

        // Firefox report incorrect scaled svg size
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
        if (!BrowserHelper.isFirefox) {
            t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(topValue), 0.1, 'r3 group: proper top scale point position');

            t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h * 1.1), 0.5, 'r3 group: 0: bar has proper height');
            t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h * 0.4), 0.5, 'r3 group: 1: bar has proper height');

            t.hasCls(barEls[0], 'b-overallocated', 'r3 group: 0: bar has proper css class');
            t.hasCls(barEls[1], 'b-underallocated', 'r3 group: 1: bar has proper css class');

            t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 18)), 0.5, 'r3 group: 0: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 19)), 0.5, 'r3 group: 1: bar has proper coordinate');
            // -1 here is since group rows are 1 pixel bigger than normal ones
            t.ok(rowBox.height - 1 <= Rectangle.from(barEls[0]).height, `r3 group: 0: bar is NOT contained within row element due to its over-allocation`);
            t.ok(rowBox.contains(Rectangle.from(barEls[1])), `r3 group: 1: bar is contained within row element`);
        }

        t.diag('Change "r3" resource "city"');

        const groupRefresh = histogram.rowManager.await('renderRow', {
            checkLog : false,
            args     : ({ record }) => record === getResourceGroupParent('r3')
        });

        project.resourceStore.getById('r3').set('city', 'Moscow');

        await groupRefresh;

        t.diag('Asserting resource r3 group row');

        ({
            svgHeight,
            barEls,
            svgElement,
            rowBox,
            scaleSvgElement,
            scalePathElement,
            scaleTextElements
        } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r3')));

        topValue = 3 * _24h;

        unitHeight = svgHeight / svgElement.dataset.topValue;

        // asserting scale column
        t.is(scaleTextElements.length, 1, 'r3 group: proper number of scale point labels');
        t.like(scaleTextElements[0].innerHTML, '3d', 'r3 group: proper scale label text');
        t.is(barEls.length, 8, 'r3 group: proper number of bars');

        // Firefox report incorrect scaled svg size
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
        if (!BrowserHelper.isFirefox) {
            t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(topValue), 0.1, 'r3 group: proper top scale point position');

            t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h * 2.2), 0.5, 'r3 group: 0: bar has proper height');
            t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h * 1.5), 0.5, 'r3 group: 1: bar has proper height');
            t.isApprox(getElHeight(barEls[2]), getValueHeight(_24h * 1.1), 0.5, 'r3 group: 2: bar has proper height');
            t.isApprox(getElHeight(barEls[3]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 3: bar has proper height');
            t.isApprox(getElHeight(barEls[4]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 4: bar has proper height');
            // skip weekend
            t.isApprox(getElHeight(barEls[5]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 5: bar has proper height');
            t.isApprox(getElHeight(barEls[6]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 6: bar has proper height');
            t.isApprox(getElHeight(barEls[7]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 7: bar has proper height');

            t.hasCls(barEls[0], 'b-overallocated', 'r3 group: 0: bar has proper css class');
            t.hasCls(barEls[1], 'b-underallocated', 'r3 group: 1: bar has proper css class');
            t.hasCls(barEls[2], 'b-underallocated', 'r3 group: 2: bar has proper css class');
            t.hasCls(barEls[3], 'b-underallocated', 'r3 group: 3: bar has proper css class');
            t.hasCls(barEls[4], 'b-underallocated', 'r3 group: 4: bar has proper css class');
            t.hasCls(barEls[5], 'b-underallocated', 'r3 group: 5: bar has proper css class');
            t.hasCls(barEls[6], 'b-underallocated', 'r3 group: 6: bar has proper css class');
            t.hasCls(barEls[7], 'b-underallocated', 'r3 group: 7: bar has proper css class');

            t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 18)), 0.5, 'r3 group: 0: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 19)), 0.5, 'r3 group: 1: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[2]), getDatePos(new Date(2010, 0, 20)), 0.5, 'r3 group: 2: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[3]), getDatePos(new Date(2010, 0, 21)), 0.5, 'r3 group: 3: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[4]), getDatePos(new Date(2010, 0, 22)), 0.5, 'r3 group: 4: bar has proper coordinate');
            // skip weekend
            t.isApprox(getElLeft(barEls[5]), getDatePos(new Date(2010, 0, 25)), 0.5, 'r3 group: 5: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[6]), getDatePos(new Date(2010, 0, 26)), 0.5, 'r3 group: 6: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[7]), getDatePos(new Date(2010, 0, 27)), 0.5, 'r3 group: 7: bar has proper coordinate');

            Array.from(barEls).forEach((el, i) => {
                t.ok(rowBox.contains(Rectangle.from(el)), `r3 group: ${i}: bar is contained within row element`);
            });
        }

        t.diag('Change "r3" allocation %');

        project.assignmentStore.getById('a4').units = 30;

        await histogram.rowManager.await('renderRow', {
            checkLog : false,
            args     : { record : getResourceGroupParent('r3') }
        });

        t.diag('Asserting resource r3 group row');

        ({
            svgHeight,
            barEls,
            svgElement,
            rowBox,
            scaleSvgElement,
            scalePathElement,
            scaleTextElements
        } = await getHistogramRowElements(t, histogram, getResourceGroupParent('r3')));

        unitHeight = svgHeight / svgElement.dataset.topValue;

        // asserting scale column
        t.is(scaleTextElements.length, 1, 'r3 group: proper number of scale point labels');
        t.like(scaleTextElements[0].innerHTML, '3d', 'r3 group: proper scale label text');
        t.is(barEls.length, 8, 'r3 group: proper number of bars');

        // Firefox report incorrect scaled svg size
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
        if (!BrowserHelper.isFirefox) {
            t.isApprox(getElTop(scalePathElement) - getElTop(scaleSvgElement), histogram.rowHeight - getValueHeight(topValue), 0.1, 'r3 group: proper top scale point position');

            t.isApprox(getElHeight(barEls[0]), getValueHeight(_24h * 2.1), 0.5, 'r3 group: 0: bar has proper height');
            t.isApprox(getElHeight(barEls[1]), getValueHeight(_24h * 1.4), 0.5, 'r3 group: 1: bar has proper height');
            t.isApprox(getElHeight(barEls[2]), getValueHeight(_24h * 1.1), 0.5, 'r3 group: 2: bar has proper height');
            t.isApprox(getElHeight(barEls[3]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 3: bar has proper height');
            t.isApprox(getElHeight(barEls[4]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 4: bar has proper height');
            // skip weekend
            t.isApprox(getElHeight(barEls[5]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 5: bar has proper height');
            t.isApprox(getElHeight(barEls[6]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 6: bar has proper height');
            t.isApprox(getElHeight(barEls[7]), getValueHeight(_24h * 0.5), 0.5, 'r3 group: 7: bar has proper height');

            t.hasCls(barEls[0], 'b-underallocated', 'r3 group: 0: bar has proper css class');
            t.hasCls(barEls[1], 'b-underallocated', 'r3 group: 1: bar has proper css class');
            t.hasCls(barEls[2], 'b-underallocated', 'r3 group: 2: bar has proper css class');
            t.hasCls(barEls[3], 'b-underallocated', 'r3 group: 3: bar has proper css class');
            t.hasCls(barEls[4], 'b-underallocated', 'r3 group: 4: bar has proper css class');
            t.hasCls(barEls[5], 'b-underallocated', 'r3 group: 5: bar has proper css class');
            t.hasCls(barEls[6], 'b-underallocated', 'r3 group: 6: bar has proper css class');
            t.hasCls(barEls[7], 'b-underallocated', 'r3 group: 7: bar has proper css class');

            t.isApprox(getElLeft(barEls[0]), getDatePos(new Date(2010, 0, 18)), 0.5, 'r3 group: 0: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[1]), getDatePos(new Date(2010, 0, 19)), 0.5, 'r3 group: 1: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[2]), getDatePos(new Date(2010, 0, 20)), 0.5, 'r3 group: 2: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[3]), getDatePos(new Date(2010, 0, 21)), 0.5, 'r3 group: 3: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[4]), getDatePos(new Date(2010, 0, 22)), 0.5, 'r3 group: 4: bar has proper coordinate');
            // skip weekend
            t.isApprox(getElLeft(barEls[5]), getDatePos(new Date(2010, 0, 25)), 0.5, 'r3 group: 5: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[6]), getDatePos(new Date(2010, 0, 26)), 0.5, 'r3 group: 6: bar has proper coordinate');
            t.isApprox(getElLeft(barEls[7]), getDatePos(new Date(2010, 0, 27)), 0.5, 'r3 group: 7: bar has proper coordinate');

            Array.from(barEls).forEach((el, i) => {
                t.ok(rowBox.contains(Rectangle.from(el)), `r3 group: ${i}: bar is contained within row element`);
            });
        }
    });

});
