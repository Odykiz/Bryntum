StartTest(async t => {

    const schedulerPro = bryntum.query('schedulerwithchart');

    await t.waitForSelector('.b-sch-event');

    t.it('Should not crash to expand/collapse locked region', async t => {
        await t.moveCursorTo('.b-grid-splitter-inner');
        await t.click('.b-grid-splitter-button-collapse');
        await t.click('.b-grid-splitter-button-expand');
        t.pass('No crash');
    });

    t.it('Should toggle max capacity line when using toggle button', async t => {
        const chartWidget = schedulerPro.getCell({ rowIndex : 0, columnIndex : 2 }).widgets[0];

        await t.click('.b-slidetoggle input');
        await t.waitFor(() => chartWidget.chart.config.data.datasets.length === 1);
        t.pass('Just one line series showing');
        t.is(chartWidget.chart.config.data.datasets[0].data.length, schedulerPro.timeAxis.count + 1, 'One chart point per time axis tick (one extra to add the end point)');

        await t.click('.b-slidetoggle input');
        await t.waitFor(() => chartWidget.chart.config.data.datasets.length === 2);
        t.pass('Two line series showing');
    });

    t.it('Should start with 1 expanded row', async t => {
        t.is(schedulerPro.resourceStore.first.rowExpanded, true, 'First row expanded by default');
        t.is(schedulerPro.resourceStore.first.rowHeight, 180, 'First row expanded by default');
        await t.waitForSelector('.b-sch-timeaxis-cell .b-chartjslinechart canvas');
        t.pass('Chart present');
        await t.waitForSelectorCount('.b-sch-timeaxis-cell .b-chartjslinechart canvas', 1);
        t.pass('1 chart present');
        t.isApproxPx(t.rect('canvas').width, t.rect('.b-sch-timeaxis-cell').width, 'Chart has sane width');
    });

    t.it('Should collapse / expand on icon click & show chart in expanded row only', async t => {
        await t.click('.b-fa-chevron-down');
        t.is(schedulerPro.resourceStore.first.rowExpanded, false, 'First row collapsed');
        t.is(schedulerPro.resourceStore.first.rowHeight, 70, 'First row collapsed');
        await t.waitForSelectorNotFound('.b-sch-timeaxis-cell .b-chartjslinechart canvas');
        t.pass('Chart not present');

        await t.click('.b-fa-chevron-down');
        t.is(schedulerPro.resourceStore.first.rowExpanded, true, 'First row expanded');
        t.is(schedulerPro.resourceStore.first.rowHeight, 180, 'First row expanded');
        await t.waitForSelector('.b-sch-timeaxis-cell .b-chartjslinechart canvas');
        t.pass('Chart present');
        await t.waitForSelectorCount('.b-sch-timeaxis-cell .b-chartjslinechart canvas', 1);
        t.pass('1 Chart present');
    });

    t.it('Should update resource max capacity line when using slider', async t => {
        const
            chartWidget = schedulerPro.getCell({ rowIndex : 0, columnIndex : 2 }).widgets[0],
            slider      = bryntum.query('slider');

        slider.value = 400;
        slider.trigger('change', { userAction : true, value : 400 });

        t.is(chartWidget.chart.config.data.datasets[1].data[0], 400, 'Max capacity line updated');
    });
});
