StartTest(t => {
    t.it('Should update constraint icon after constraint is updated', async t => {
        window.schedulerPro.eventStore.getById(2).constraintType = null;

        await t.waitForSelectorNotFound('[data-event-id="2"] .b-fa-thumbtack');
    });
});
