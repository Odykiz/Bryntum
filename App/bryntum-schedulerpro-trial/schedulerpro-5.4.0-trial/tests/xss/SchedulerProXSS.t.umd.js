
StartTest(t => {

    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy?.());

    t.it('Check XSS sanity', async t => {

        schedulerPro = await t.getSchedulerProAsync({
            eventRenderer : null
        });

        t.injectXSS(schedulerPro);
        await schedulerPro.expandAll();

        await t.moveMouseTo('.b-sch-event-wrap[data-event-id="1"]');
        await t.waitForSelector('.b-tooltip');
    });

    t.it('Check conflict resolution UI XSS', async t => {
        const project = new ProjectModel({
            resourcesData : [
                { id : 'r1', name : 'Buldozer' },
                { id : 'r2', name : 'Excavator' }
            ],

            eventsData : [
                {
                    id           : 'event0',
                    name         : 'event0',
                    startDate    : new Date(2018, 1, 21, 10),
                    duration     : 1,
                    durationUnit : 'hour'
                },
                {
                    id             : 'event1',
                    name           : 'event1',
                    startDate      : new Date(2018, 1, 21, 10),
                    duration       : 1,
                    durationUnit   : 'hour',
                    constraintType : 'startnolaterthan',
                    constraintDate : new Date(2018, 1, 21, 10)
                },
                {
                    id             : 'event2',
                    name           : 'event2',
                    startDate      : new Date(2018, 1, 21),
                    duration       : 1,
                    durationUnit   : 'hour',
                    constraintType : 'startnolaterthan',
                    constraintDate : new Date(2018, 1, 21, 10)
                }
            ],

            dependenciesData : [
                { fromEvent : 'event0', toEvent : 'event1', type : 0 },
                { fromEvent : 'event0', toEvent : 'event2', type : 0 }
            ],

            assignmentsData : [
                { id : 'a1', resource : 'r1', event : 'event0' },
                { id : 'a2', resource : 'r1', event : 'event1' },
                { id : 'a3', resource : 'r2', event : 'event2' }
            ]
        });

        schedulerPro = new SchedulerPro({
            project,
            appendTo  : document.body,
            startDate : new Date(2018, 1, 20),
            endDate   : new Date(2018, 1, 22)
        });

        await project.commitAsync();

        t.injectXSS(schedulerPro);

        const
            event0 = project.eventStore.getById('event0'),
            prefix = '.b-schedulerpro-issueresolutionpopup';

        event0.setConstraint('startnoearlierthan', new Date(2018, 1, 21, 11));
        await t.waitForSelector(`${prefix} header :contains(Scheduling conflict)`);

        const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);
        await t.click(cancelButton);

        await t.waitForSelectorNotFound(`${prefix} header :contains(Scheduling conflict)`);

    });

});
