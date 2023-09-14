StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Should wrap string config to object internally', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            eventLayout : 'pack'
        });

        t.is(schedulerPro.eventLayout, 'pack', 'eventLayout is "pack"');
        t.isDeeply(schedulerPro.internalEventLayout, { type : 'pack' }, 'internalEventLayout is "pack"');

        schedulerPro.eventLayout = 'stack';

        t.is(schedulerPro.eventLayout, 'stack', 'eventLayout is "stack"');
        t.isDeeply(schedulerPro.internalEventLayout, { type : 'stack' }, 'internalEventLayout is "stack"');

        schedulerPro.eventLayout = 'none';

        t.is(schedulerPro.eventLayout, 'none', 'eventLayout is "none"');
        t.isDeeply(schedulerPro.internalEventLayout, { type : 'none' }, 'internalEventLayout is "none"');

        schedulerPro.eventLayout = { type : 'stack' };

        t.is(schedulerPro.eventLayout, 'stack', 'eventLayout is "stack"');
        t.isDeeply(schedulerPro.internalEventLayout, { type : 'stack' }, 'internalEventLayout is "stack"');
    });

    // https://github.com/bryntum/support/issues/2251
    t.it('Should render events before calculations are finished', async t => {
        let calculationsDone = false,
            rendered = false;

        schedulerPro = await t.getSchedulerProAsync({
            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2, endDate : '2020-03-24' }
            ],

            projectConfig : {
                listeners : {
                    refresh({ isCalculated }) {
                        if (isCalculated) {
                            calculationsDone = true;
                            // Not a typo, scheduler var in this context is not set until after the await above
                            t.ok(t.scheduler.readOnly, 'Scheduler is read-only during calculation');
                        }
                    }
                }
            },

            listeners : {
                renderEvent() {
                    if (!rendered) {
                        t.notOk(calculationsDone, 'Rendered event before calculations finished');

                        // Event should have incorrect width, since data is not yet normalized
                        t.hasApproxWidth('.b-sch-event', 100, 'Correct incorrect width initially');
                    }

                    rendered = true;
                }
            }
        });

        t.ok(calculationsDone, 'Calculations are finished');
        t.ok(rendered, 'Events are rendered');
        t.notOk(schedulerPro.readOnly, 'Scheduler no longer read-only');

        t.hasApproxWidth('.b-sch-event', 200, 'Correct width when calculation has finished');
    });

    t.it('Should rerender event correctly on redo', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            eventsData : [
                { id : 10, name : 'Event 10', startDate : '2020-03-23', duration : 2 }
            ],
            assignmentsData : [
                { id : 1, event : 10, resource : 1 }
            ]
        });

        schedulerPro.project.stm.autoRecord = true;
        schedulerPro.project.stm.disabled = false;

        const
            event = schedulerPro.eventStore.first,
            initialDate     = event.startDate,
            initialDuration = event.duration;

        event.startDate = new Date(2020, 2, 26, 12);

        await schedulerPro.project.commitAsync();
        await schedulerPro.project.stm.undo();

        t.is(event.startDate, initialDate, 'Date change undone');
        t.is(event.duration, initialDuration, 'Duration intact');

        await t.waitFor(() => t.query('.b-sch-event-wrap')[0].style.left === '100px');

        await schedulerPro.project.commitAsync();

        await schedulerPro.project.stm.redo();

        t.is(event.startDate, new Date(2020, 2, 26, 12), 'Date change redone');
        t.is(event.duration, initialDuration, 'Duration intact');

        await t.waitFor(() => t.query('.b-sch-event-wrap')[0].style.left === '450px');
    });

    t.it('Should render event correctly after reverting assignment change', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            eventsData : [
                { id : 1, startDate : '2020-03-23', duration : 2 },
                { id : 2, startDate : '2020-03-25', duration : 2 },
                { id : 3, startDate : '2020-03-23', duration : 2 }
            ],
            assignmentsData : [
                { id : 1, event : 1, resource : 1 },
                { id : 2, event : 2, resource : 2 },
                { id : 3, event : 3, resource : 3 }
            ],
            dependenciesData : []
        });

        const event = schedulerPro.eventStore.first;

        await t.dragBy({
            source : '[data-event-id="1"]',
            delta  : [0, 100]
        });

        await schedulerPro.project.commitAsync();

        schedulerPro.project.revertChanges();

        await schedulerPro.project.commitAsync();

        t.assertEventsPositions(schedulerPro, [event]);

        t.isApproxPx(document.querySelector('.b-grid-row[data-id="3"]').offsetHeight, schedulerPro.rowHeight, 2, 'Row height is ok');
    });

    // https://github.com/bryntum/support/issues/5028
    t.it('Should refresh event after setting name + boolean with null value to undefined', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            eventsData : [
                { id : 1, startDate : '2020-03-23', duration : 2 }
            ],
            assignmentsData : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        schedulerPro.eventStore.first.set({ name : 'foo', inactive : undefined });

        await t.waitForSelector('.b-sch-event:contains(foo)');
    });
});
