
StartTest(t => {
    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Should render summary cells', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                summary : {
                    renderer : ({ events }) => {
                        return events.length || 'nothing';
                    }
                }
            }
        });

        await t.waitForSelector('.b-timeaxis-summary-value:contains(1)');
        await t.waitForSelector('.b-timeaxis-summary-value:contains(nothing)');
    });

    // https://github.com/bryntum/support/issues/1814
    t.it('Should update the renderer when drag event to cell', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            events : [
                {
                    id        : 1,
                    startDate : new Date(2020, 2, 24, 4),
                    endDate   : new Date(2020, 2, 25, 4),
                    name      : 'Event 1'
                }
            ],
            features : {
                summary : {
                    renderer : ({ events }) => events.length
                }
            }
        });

        t.chain(
            { drag : '.b-sch-event-wrap[data-event-id="1"]', by : [-100, 0] },
            { waitForSelector : '.b-grid-footer.b-sch-timeaxiscolumn :nth-child(1):contains(1)' }
        );
    });
});
