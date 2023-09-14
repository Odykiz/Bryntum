StartTest(async t => {
    const schedulerpro = bryntum.query('schedulerpro');

    await schedulerpro.timeAxisSubGrid.scrollable.scrollTo(90, null, true);

    // Trying to fix occasional failures in Safari on TC
    await t.waitForAnimationFrame();

    const allContent = t.query('.b-sch-event-content');

    // Check that event content elements have stick inside the viewport.
    for (let i = 0, { length } = allContent; i < length; i++) {
        t.isGreaterOrEqual(t.rect(allContent[i]).left, t.rect(schedulerpro.timeAxisSubGrid.element).left);
    }
});
