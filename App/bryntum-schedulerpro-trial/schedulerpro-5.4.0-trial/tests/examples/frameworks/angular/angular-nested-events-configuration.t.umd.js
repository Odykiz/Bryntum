StartTest(async t => {
    const
        schedulerPro     = bryntum.query('schedulerpro'),
        { nestedEvents } = schedulerPro.features;

    await t.waitForProjectReady(schedulerPro);

    t.it('Should toggle layout using the combo', async t => {
        await t.waitForSelectorCount('.b-nested-events-layout-stack', 8);

        await t.click('[data-ref=layout]');

        await t.click('.b-list-item:textEquals(Overlap)');

        await t.waitForSelectorCount('.b-nested-events-layout-none', 8);

        await t.click('[data-ref=layout]');

        await t.click('.b-list-item:textEquals(Pack)');

        await t.waitForSelectorCount('.b-nested-events-layout-pack', 8);

        await t.click('[data-ref=layout]');

        await t.click('.b-list-item:textEquals(Stack)');

        await t.waitForSelectorCount('.b-nested-events-layout-stack', 8);

        t.pass('Test passed');
    });

    t.it('Should toggle drag & resize settings using menu', async t => {
        t.is(nestedEvents.constrainDragToParent, false, 'Drag not constrained to parent initially');
        t.is(nestedEvents.allowNestingOnDrop, true, 'Nesting allowed');
        t.is(nestedEvents.allowDeNestingOnDrop, true, 'De-Nesting allowed');
        t.is(nestedEvents.constrainResizeToParent, true, 'Resize constrained to parent initially');

        await t.click('[data-ref=dragResize]');
        await t.click('.b-menuitem:textEquals(Constrain drag to parent)');

        t.is(nestedEvents.constrainDragToParent, true, 'Drag constrained to parent');

        await t.click('.b-menuitem:textEquals(Nest on drop)');

        t.is(nestedEvents.allowNestingOnDrop, false, 'Nesting not allowed');

        await t.click('.b-menuitem:textEquals(De-nest on drop)');

        t.is(nestedEvents.allowDeNestingOnDrop, false, 'De-Nesting not allowed');

        await t.click('.b-menuitem:textEquals(Constrain resize to parent)');

        t.is(nestedEvents.constrainResizeToParent, false, 'Resize not constrained to parent');

        await t.click('.b-menuitem:textEquals(Constrain drag to parent)');
        await t.click('.b-menuitem:textEquals(Nest on drop)');
        await t.click('.b-menuitem:textEquals(De-nest on drop)');
        await t.click('.b-menuitem:textEquals(Constrain resize to parent)');
    });

    t.it('Should change bar settings using menu', async t => {
        await t.click('[data-ref=barSettings]');

        const { barMargin, resourceMargin, eventHeight } = nestedEvents;

        await t.selectorExists(`.b-slider[data-ref=resourceMargin] label:textEquals("Resource margin (${resourceMargin})")`, 'Correct resourceMargin');
        await t.selectorExists(`.b-slider[data-ref=barMargin] label:textEquals("Bar margin (${barMargin})")`, 'Correct barMargin');
        await t.selectorExists(`.b-slider[data-ref=stackedEventHeight] label:textEquals("Stacked event height (${eventHeight})")`, 'Correct eventHeight');

        const
            resourceMarginSlider = window.bryntum.fromElement(t.query('[data-ref=resourceMargin]')[0]),
            barMarginSlider      = window.bryntum.fromElement(t.query('[data-ref=barMargin]')[0]),
            eventHeightSlider    = window.bryntum.fromElement(t.query('[data-ref=stackedEventHeight]')[0]);

        resourceMarginSlider.value = 20;
        resourceMarginSlider.input.dispatchEvent(new Event('input'));

        t.is(nestedEvents.resourceMargin, 20, 'Changed resourceMargin');

        barMarginSlider.value = 10;
        barMarginSlider.input.dispatchEvent(new Event('input'));

        t.is(nestedEvents.barMargin, 10, 'Changed barMargin');

        eventHeightSlider.value = 40;
        eventHeightSlider.input.dispatchEvent(new Event('input'));

        t.is(nestedEvents.eventHeight, 40, 'Changed eventHeight');

        // Reset
        nestedEvents.resourceMargin = resourceMargin;
        nestedEvents.barMargin = barMargin;
        nestedEvents.eventHeight = eventHeight;
    });

    t.it('Should flag overloaded parents', async t => {
        t.selectorExists('$event=3.b-nested-events-parent.exceeded', 'Flagged');

        await t.dragTo({
            source : '$event=34',
            target : '$event=4'
        });

        await t.waitForSelectorNotFound('$event=3.b-nested-events-parent.exceeded');
        t.selectorNotExists('$event=3.b-nested-events-parent.exceeded', 'None overloaded');

        await t.dragTo({
            source : '$event=34',
            target : '$event=3'
        });

        await t.waitForSelector('$event=3.b-nested-events-parent.exceeded');
        t.selectorExists('$event=3.b-nested-events-parent.exceeded', 'Flagged');
    });

    // https://github.com/bryntum/support/issues/4689
    t.it('Should create a parent on double click', async t => {
        await t.doubleClick('.b-grid-row[data-index="1"] .b-timeaxis-cell', null, null, null, [150, 10]);

        await t.waitForSelector('.b-nested-events-parent:contains(New event)');

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        await t.type(null, 'ESC');
    });

});
