StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    // https://github.com/bryntum/support/issues/724
    t.it('Spin buttons of start/end fields skip non-working time', async t => {

        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2020, 9, 12),
            endDate   : new Date(2020, 10, 25),

            projectConfig : {
                calendar : 'general'
            },

            resourcesData : [
                { id : 1, name : 'Resource 1', calendar : 'foo' }
            ],

            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-10-19', duration : 2 }
            ],

            assignmentsData : [
                { resource : 1, event : 1 }
            ],

            dependenciesData : [],

            calendarsData : [
                {
                    id        : 'general',
                    intervals : [
                        {
                            recurrentStartDate : 'on Sat at 0:00',
                            recurrentEndDate   : 'on Mon at 0:00',
                            isWorking          : false
                        }
                    ],
                    children : [
                        {
                            id        : 'foo',
                            // assigned resource will add some extra non working days to the event
                            intervals : [
                                {
                                    startDate : '2020-10-15',
                                    endDate   : '2020-10-16',
                                    isWorking : false
                                },
                                {
                                    startDate : '2020-10-22',
                                    endDate   : '2020-10-23',
                                    isWorking : false
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        const event = schedulerPro.project.eventStore.first;

        t.chain(
            { dblClick : '.b-sch-event' },

            { diag : 'Asserting start date spinners' },

            { click : '.b-start-date .b-datefield .b-icon-angle-left', desc : 'Start date -1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 16), 'event start date is correct');
                t.is(event.endDate, new Date(2020, 9, 20), 'event end date is correct');
                t.is(event.duration, 2, 'event duration is correct');
            },
            { click : '.b-start-date .b-datefield .b-icon-angle-left', desc : 'Start date -1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 14), 'event start date is still correct');
                t.is(event.endDate, new Date(2020, 9, 17), 'event end date is still correct');
                t.is(event.duration, 2, 'event duration is correct');
            },
            { click : '.b-start-date .b-datefield .b-icon-angle-right', desc : 'StartDate +1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 16), 'event start date is updated');
                t.is(event.endDate, new Date(2020, 9, 20), 'event end date is updated');
                t.is(event.duration, 2, 'event duration is correct');
            },
            { click : '.b-start-date .b-datefield .b-icon-angle-right', desc : 'StartDate +1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 19), 'event start date got updated');
                t.is(event.endDate, new Date(2020, 9, 21), 'event end date got updated');
                t.is(event.duration, 2, 'event duration is correct');
            },

            { diag : 'Asserting end date spinners' },

            { click : '.b-end-date .b-datefield .b-icon-angle-right', desc : 'EndDate +1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 19), 'event start date got updated');
                t.is(event.endDate, new Date(2020, 9, 22), 'event end date got updated');
                t.is(event.duration, 3, 'event duration is updated');
            },
            { click : '.b-end-date .b-datefield .b-icon-angle-right', desc : 'EndDate +1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 19), 'event start date got updated');
                t.is(event.endDate, new Date(2020, 9, 24), 'event end date got updated');
                t.is(event.duration, 4, 'event duration got updated');
            },
            { click : '.b-end-date .b-datefield .b-icon-angle-right', desc : 'EndDate +1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 19), 'event start date got updated');
                t.is(event.endDate, new Date(2020, 9, 27), 'event end date got updated');
                t.is(event.duration, 5, 'event duration got updated');
            },
            { click : '.b-end-date .b-datefield .b-icon-angle-left', desc : 'EndDate -1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 19), 'event start date got updated');
                t.is(event.endDate, new Date(2020, 9, 24), 'event end date got updated');
                t.is(event.duration, 4, 'event duration got updated');
            },
            { click : '.b-end-date .b-datefield .b-icon-angle-left', desc : 'EndDate -1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 19), 'event start date got updated');
                t.is(event.endDate, new Date(2020, 9, 22), 'event end date got updated');
                t.is(event.duration, 3, 'event duration is updated');
            },
            { click : '.b-end-date .b-datefield .b-icon-angle-left', desc : 'EndDate -1 day' },
            { waitFor : () => schedulerPro.isEngineReady },
            async() => {
                t.is(event.startDate, new Date(2020, 9, 19), 'event start date got updated');
                t.is(event.endDate, new Date(2020, 9, 21), 'event end date got updated');
                t.is(event.duration, 2, 'event duration is correct');
            }
        );
    });

});
