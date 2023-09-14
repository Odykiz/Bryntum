
StartTest(t => {

    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy());

    // https://github.com/bryntum/support/issues/655
    t.it('Should await project commit before editing next cell', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            enableEventAnimations : true,

            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                },
                {
                    type : 'resourceCalendar'
                }
            ],

            project : {
                resourcesData : [
                    { id : 1, name : 'One' },
                    { id : 2, name : 'Two' }
                ],

                eventsData : [
                    { id : 1, name : '1', startDate : '2020-03-23', duration : 3 },
                    { id : 2, name : '2', startDate : '2020-03-29', duration : 3 }
                ],

                assignmentsData : [
                    { id : 1, resourceId : 1, eventId : 1 },
                    { id : 2, resourceId : 1, eventId : 2 }
                ],

                calendarsData : [
                    {
                        id                       : 'early',
                        name                     : 'Early shift',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                recurrentStartDate : 'at 6:00',
                                recurrentEndDate   : 'at 14:00',
                                isWorking          : true
                            }
                        ]
                    }
                ]
            }
        });

        await t.doubleClick('.b-grid-cell[data-column=calendar]');

        await t.type(null, '[DOWN][DOWN][ENTER][TAB]');

        await t.waitForSelector('.b-cell-editor');

        t.isApproxPx(t.rect('.b-cell-editor').top, t.rect('.b-grid-row[data-index="1"]').top, 'Editor positioned correctly');
    });
});
