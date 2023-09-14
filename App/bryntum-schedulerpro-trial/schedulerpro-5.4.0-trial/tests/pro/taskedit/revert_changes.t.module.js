StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Event and dependency are displayed correctly after reverting project changes', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        const
            record = schedulerPro.eventStore.first,
            dependency = schedulerPro.dependencyStore.first;

        await schedulerPro.editEvent(record);

        await t.click('[data-ref="resourcesField"] .b-fieldtrigger');

        await t.click('.b-combo-picker [data-id="3"]');

        await t.click('.b-combo-picker [data-id="1"]');

        await t.click('[data-ref=resourcesField] .b-label');

        await t.click('[data-ref="saveButton"]');

        await schedulerPro.await('afterTaskEdit');

        await schedulerPro.project.commitAsync();

        schedulerPro.project.revertChanges();

        await t.waitForSelector('[data-resource-id="1"][data-event-id="1"]:not(.b-released)');

        // Wait for dep at correct pos
        await t.waitForSelector('path[data-dep-id="1"][d^="M299,30"]');

        const elements = schedulerPro.getElementsFromEventRecord(record);

        t.is(elements.length, 1, 'Found a single element');

        t.assertDependency(schedulerPro, dependency);
    });
});
