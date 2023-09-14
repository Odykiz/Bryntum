StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Should suspend hasChanges event on the project (save changes)', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                taskEdit : {
                    suspendHasChangesEvent : true
                }
            }
        });

        let counter = 0;

        schedulerPro.project.on({
            hasChanges : () => counter++
        });

        // save
        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.type('[data-ref="durationField"] input', '[UP]');

        await t.type('[data-ref="percentDoneField"] input', '[UP]');

        t.is(counter, 0, 'hasChanges event not fired');

        await t.click('[data-ref="saveButton"]');

        await schedulerPro.await('afterTaskEdit');

        t.is(counter, 1, 'hasChanges event fired');
    });

    t.it('Should suspend hasChanges event on the project (cancel changes)', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                taskEdit : {
                    suspendHasChangesEvent : true
                }
            }
        });

        let counter = 0;

        schedulerPro.project.on({
            hasChanges : () => counter++
        });

        // cancel
        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.type('[data-ref="durationField"] input', '[UP]');

        await t.type('[data-ref="percentDoneField"] input', '[UP]');

        t.is(counter, 0, 'hasChanges event not fired');

        await t.click('[data-ref="cancelButton"]');

        await schedulerPro.await('afterTaskEdit');

        t.is(counter, 0, 'hasChanges event not fired');

        schedulerPro.eventStore.first.duration++;

        await schedulerPro.project.commitAsync();

        t.is(counter, 1, 'hasChanges event fired');
    });

    t.it('Should suspend hasChanges event on the project (delete record)', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                taskEdit : {
                    suspendHasChangesEvent : true
                }
            }
        });

        let counter = 0;

        schedulerPro.project.on({
            hasChanges : () => counter++
        });

        // cancel
        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.type('[data-ref="durationField"] input', '[UP]');

        await t.type('[data-ref="percentDoneField"] input', '[UP]');

        t.is(counter, 0, 'hasChanges event not fired');

        await t.click('[data-ref="deleteButton"]');

        await t.click('[data-ref="okButton"]');

        await schedulerPro.await('afterTaskEdit');

        t.is(counter, 1, 'hasChanges event fired');
    });
});
