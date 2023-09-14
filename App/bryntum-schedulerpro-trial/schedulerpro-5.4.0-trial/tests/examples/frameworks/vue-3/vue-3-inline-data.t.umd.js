StartTest(t => {

    const schedulerPro = bryntum.query('schedulerpro');

    t.it('Sanity check', async t => {
        await t.waitForSelector('.b-sch-event');

        t.is(schedulerPro.project.eventStore.count, 23, 'Events loaded correctly');
        t.is(schedulerPro.project.resourceStore.count, 14, 'Resources loaded correctly');
        t.is(schedulerPro.project.assignmentStore.count, 25, 'Assignments loaded correctly');
        t.is(schedulerPro.project.dependencyStore.count, 16, 'Dependencies loaded correctly');
    });

});
