StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    t.it('Just setting a constraint should not cause a conflict', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2021, 6, 9),
            endDate   : new Date(2021, 6, 23),

            resourcesData : [
                { id : 1, name : 'Resource 1', calendar : 'foo' }
            ],

            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2021-07-09 01:00:00', duration : 1 },
                { id : 2, name : 'Event 2', startDate : '2021-07-09 01:00:00', duration : 1, cls : 'id2' }
            ],

            assignmentsData : [
                { resource : 1, event : 1 },
                { resource : 1, event : 2 }
            ],

            dependenciesData : [
                { fromEvent : 1, toEvent : 2 }
            ]
        });

        const event = schedulerPro.project.eventStore.getById(2);

        t.chain(
            { dblclick : '.id2.b-sch-event' },
            { click : '.b-tabpanel-tab.b-advanced-tab' },
            { click : '[name=constraintType]' },
            { type : 'm', clearExisting : true, desc : 'Type "m" to start autocomplete' },

            {
                // need to wait until the typed "m" will make the picker to expand the list
                waitForSelector : '.b-list-item.b-active:contains(Must start on)',
                desc            : 'Constraint type list is expanded and first item is active'
            },

            { type : '[ENTER]', desc : 'ENTER click to submit first value in the list' },

            { waitFor : 100 },

            async() => {
                t.selectorNotExists('.b-schedulerpro-issueresolutionpopup', 'No conflict resolution popup shown');
            },

            { waitFor : () => schedulerPro.isEngineReady },

            async() => {
                t.is(event.constraintType, 'muststarton', 'Constraint type is ok');
                t.is(event.constraintDate, new Date(2021, 6, 12, 1), 'Constraint date is ok');
            }
        );
    });

});
