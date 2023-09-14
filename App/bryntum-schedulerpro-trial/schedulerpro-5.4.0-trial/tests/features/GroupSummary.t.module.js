
StartTest(t => {
    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Should render summary cells', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                group        : 'id',
                groupSummary : {
                    summaries : [
                        {
                            label : 'Total',
                            renderer({ events }) {
                                return events.length;
                            }
                        }
                    ]
                }
            }
        });

        await t.waitForSelector('.b-timeaxis-group-summary .b-timeaxis-summary-value:contains(1)');

        schedulerPro.eventStore.first.startDate = new Date(2025, 1, 1);

        await t.waitForSelectorNotFound('.b-group-footer .b-timeaxis-summary-value:contains(1)');
        await t.waitForSelector('.b-group-footer .b-timeaxis-summary-value:contains(0)');
        t.pass('Summary rows updated after event moved');

        schedulerPro.eventStore.first.startDate = schedulerPro.startDate;

        await t.waitForSelectorNotFound('.b-group-footer .b-timeaxis-summary-value:contains(1)');
        await t.waitForSelector('.b-group-footer .b-timeaxis-summary-value:contains(0)');
    });

    // https://github.com/bryntum/support/issues/6326
    t.it('Should refresh summary cells after deleting event', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            project : {
                resourcesData : [
                    { id : 1, name : 'Resource 1' }
                ],

                eventsData : [
                    { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2, percentDone : 50 }
                ],

                assignmentsData : [
                    { id : 1, resource : 1, event : 1 }
                ]
            },

            features : {
                group        : 'id',
                groupSummary : {
                    summaries : [
                        {
                            label : 'Total',
                            renderer({ events }) {
                                return events.length;
                            }
                        }
                    ]
                }
            }
        });

        await t.waitForSelector('.b-timeaxis-group-summary .b-timeaxis-summary-value:contains(1)');

        schedulerPro.eventStore.first.remove();
        await t.waitForSelectorNotFound('.b-group-footer[data-index="2"] .b-timeaxis-summary-value:contains(1)');
        t.selectorExists('.b-group-footer[data-index="2"] .b-timeaxis-tick:nth-child(1):textEquals(0)');
        t.selectorExists('.b-group-footer[data-index="2"] .b-timeaxis-tick:nth-child(2):textEquals(0)');
        t.selectorExists('.b-group-footer[data-index="2"] .b-timeaxis-tick:nth-child(3):textEquals(0)');
    });

    t.it('Should refresh summary cells after resource change', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                group        : 'id',
                groupSummary : {
                    summaries : [
                        {
                            label : 'Total',
                            renderer({ events }) {
                                return events.length;
                            }
                        }
                    ]
                }
            }
        });

        await t.waitForSelector('.b-timeaxis-group-summary .b-timeaxis-summary-value:contains(1)');

        schedulerPro.eventStore.first.resourceId = 2;

        await t.waitForSelectorNotFound('.b-group-footer[data-index="2"] .b-timeaxis-summary-value:contains(1)');
        t.selectorExists('.b-group-footer[data-index="5"] .b-timeaxis-tick:nth-child(1):textEquals(0)');
        t.selectorExists('.b-group-footer[data-index="5"] .b-timeaxis-tick:nth-child(2):textEquals(1)');
        t.selectorExists('.b-group-footer[data-index="5"] .b-timeaxis-tick:nth-child(3):textEquals(1)');
        t.selectorExists('.b-group-footer[data-index="5"] .b-timeaxis-tick:nth-child(4):textEquals(1)');
        t.selectorExists('.b-group-footer[data-index="5"] .b-timeaxis-tick:nth-child(5):textEquals(1)');
        t.selectorExists('.b-group-footer[data-index="5"] .b-timeaxis-tick:nth-child(6):textEquals(1)');
    });
});
