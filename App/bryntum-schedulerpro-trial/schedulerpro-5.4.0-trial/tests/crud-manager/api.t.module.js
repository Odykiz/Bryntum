StartTest(t => {

    let scheduler;

    t.beforeEach(() => {
        if (scheduler) {
            scheduler.project.destroy();
            scheduler.destroy();
        }
    });

    t.it('Should not disable autoCommit on store when CrudManager not configured with url', async t => {
        scheduler = t.getSchedulerPro({
            eventStore : {
                autoCommit : true
            }
        });

        t.is(scheduler.eventStore.autoCommit, true, 'autoCommit still true');

    });

});
