
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    // https://github.com/bryntum/support/issues/
    t.it('Should paste event where user last clicked', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventCopyPaste : true
            }
        });

        await t.click('.b-sch-event');
        await t.type(null, 'c', null, null, { ctrlKey : true });
        await t.click('[data-index="3"] .b-sch-timeaxis-cell', null, null, null, [schedulerPro.tickSize * 5 + 10, '50%']);
        await t.type(null, 'v', null, null, { ctrlKey : true });

        t.is(schedulerPro.eventStore.last.startDate, new Date(2020, 2, 27), 'Correct start date');
        t.is(schedulerPro.eventStore.last.resource.name, 'Resource 4', 'Correct resource');
    });

    t.it('Should bypass constraint when cutting and pasting', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventCopyPaste : true
            }
        });

        const [event] = schedulerPro.eventStore;

        event.constraintType = 'muststarton';
        event.constraintDate = new Date(2020, 2, 24);

        await schedulerPro.project.commitAsync();

        await schedulerPro.copyEvents([event], true);

        await schedulerPro.pasteEvents(new Date(2020, 2, 25), schedulerPro.resourceStore.last);

        await schedulerPro.project.commitAsync();

        t.is(event.startDate, new Date(2020, 2, 25), 'At correct date');
    });

    t.it('Should bypass constraint when copying and pasting', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventCopyPaste : true
            }
        });

        const [event] = schedulerPro.eventStore;

        event.constraintType = 'muststarton';
        event.constraintDate = new Date(2020, 2, 24);

        await schedulerPro.project.commitAsync();

        await schedulerPro.copyEvents([event]);

        await schedulerPro.pasteEvents(new Date(2020, 2, 25), schedulerPro.resourceStore.last);

        await schedulerPro.project.commitAsync();

        t.is(schedulerPro.eventStore.last.startDate, new Date(2020, 2, 25), 'At correct date');
    });

    // https://github.com/bryntum/support/issues/4737
    t.it('Should include new assignments in project changes after event copy paste', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventCopyPaste : true
            }
        });

        const event = schedulerPro.eventStore.first;

        await schedulerPro.copyEvents([event]);

        await schedulerPro.pasteEvents(new Date(2020, 2, 25), schedulerPro.resourceStore.first);

        await schedulerPro.project.commitAsync();

        t.is(schedulerPro.project.changes.events.added.length, 1, '1 new event');
        t.is(schedulerPro.project.changes.assignments.added.length, 1, '1 new assignment');
    });
});
