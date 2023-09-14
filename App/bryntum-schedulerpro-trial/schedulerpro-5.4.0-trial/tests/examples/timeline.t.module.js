StartTest(async t => {
    t.it('Should render timeline with reasonable height', async t => {
        await t.waitForSelector('.b-timeline .b-sch-event-wrap:contains(Ventilation)');
        t.selectorCountIs('.b-timeline .b-sch-event-wrap:not(.b-released)', 4);
        t.isApprox(t.rect('.b-timeline .b-grid-subgrid').height, 43, 3, 'reasonable height');

        bryntum.query('timeline').height = 300;
        await t.waitFor(100);
        t.selectorCountIs('.b-timeline .b-sch-event-wrap:not(.b-released)', 4);
    });
});
