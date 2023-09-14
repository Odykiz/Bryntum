
StartTest(t => {

    let schedulerPro, project;

    t.beforeEach(() => schedulerPro?.destroy());

    const prefix = '.b-schedulerpro-issueresolutionpopup';

    t.it('Shows resolution UI for empty calendars on data loading', async t => {

        let event1, event2;

        t.beforeEach(() => {
            schedulerPro?.destroy();

            project = new ProjectModel({
                calendar : 1,

                calendarsData : [{
                    id                       : 1,
                    name                     : 'Coolest calendar ever!',
                    unspecifiedTimeIsWorking : false
                }],

                resourcesData : [
                    {
                        id   : 'r1',
                        name : 'Buldozer'
                    },
                    {
                        id   : 'r2',
                        name : 'Excavator'
                    }
                ],

                eventsData : [
                    {
                        id        : 'e1',
                        name      : 'Buldoze 1',
                        startDate : new Date(2019, 0, 1),
                        duration  : 1
                    },
                    {
                        id        : 'e2',
                        name      : 'Buldoze 2',
                        startDate : new Date(2019, 0, 11),
                        duration  : 1
                    }
                ],

                dependenciesData : [
                    {
                        id        : 'd1',
                        fromEvent : 'e1',
                        toEvent   : 'e2',
                        lag       : 2,
                        lagUnit   : 'd'
                    }
                ],

                assignmentsData : [
                    {
                        id       : 'a1',
                        resource : 'r1',
                        event    : 'e1'
                    },
                    {
                        resource : 'r1',
                        event    : 'e2',
                        id       : 'a2'
                    }
                ]
            });

            schedulerPro = new SchedulerPro({
                project,
                appendTo  : document.body,
                startDate : new Date(2019, 0, 1),
                endDate   : new Date(2019, 0, 31)
            });

            event1 = project.eventStore.getById('e1');
            event2 = project.eventStore.getById('e2');
        });

        t.it('Resolves by applying 24hrs calendar', async t => {

            await t.waitForSelector(`${prefix} header :contains(Calendar configuration error)`);

            t.contentLike(`${prefix} .b-error-description`, '"Coolest calendar ever!" calendar does not provide any working time intervals.', 'description is ok');

            // assert resolution texts
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Use 24 hours calendar with non-working Saturdays and Sundays.)`, '24 hrs resolution is there');
            t.contentLike(`${prefix} .b-resolution.b-checkbox :contains(Use 8)`, 'Use 8 hours calendar (08:00-12:00, 13:00-17:00) with non-working Saturdays and Sundays.', '8 hrs resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'cancel button is hidden');

            await t.click('.b-resolution.b-checkbox :contains(Use 24)');

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            t.diag('Click checked item again');

            await t.click('.b-resolution.b-checkbox :contains(Use 24)');

            t.notOk(applyButton.disabled, 'Apply button is still enabled');

            await t.click('.b-resolution.b-checkbox :contains(Use 24)');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2019, 0, 1), 'event1 start is correct');
            t.is(event1.endDate, new Date(2019, 0, 2), 'event1 end is correct');

            t.is(event2.startDate, new Date(2019, 0, 4), 'event2 start is correct');
            t.is(event2.endDate, new Date(2019, 0, 5), 'event2 end is correct');
        });

        t.it('Resolves by applying 8hrs calendar', async t => {

            await t.waitForSelector(`${prefix} header :contains(Calendar configuration error)`);

            t.contentLike(`${prefix} .b-error-description`, '"Coolest calendar ever!" calendar does not provide any working time intervals.', 'description is ok');

            // assert resolution texts
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Use 24 hours calendar with non-working Saturdays and Sundays.)`, '24 hrs resolution is there');
            t.contentLike(`${prefix} .b-resolution.b-checkbox :contains(Use 8)`, 'Use 8 hours calendar (08:00-12:00, 13:00-17:00) with non-working Saturdays and Sundays.', '8 hrs resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'Cancel button is hidden');

            await t.click('.b-resolution.b-checkbox :contains(Use 8)');

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2019, 0, 1, 8), 'event1 start is correct');
            t.is(event1.endDate, new Date(2019, 0, 3, 17), 'event1 end is correct');

            t.is(event2.startDate, new Date(2019, 0, 14, 8), 'event2 start is correct');
            t.is(event2.endDate, new Date(2019, 0, 16, 17), 'event2 end is correct');
        });
    });

    t.it('Shows resolution UI when setting an empty calendar after loading', async t => {

        let event1, event2;

        t.beforeEach(() => {
            schedulerPro?.destroy();

            project = new ProjectModel({
                calendar : 1,

                calendarsData : [
                    {
                        id   : 1,
                        name : 'Default'
                    },
                    {
                        id                       : 2,
                        name                     : 'Coolest calendar ever!',
                        unspecifiedTimeIsWorking : false
                    }
                ],

                resourcesData : [
                    {
                        id   : 'r1',
                        name : 'Buldozer'
                    }, {
                        id   : 'r2',
                        name : 'Excavator'
                    }
                ],

                eventsData : [
                    {
                        id        : 'e1',
                        name      : 'Buldoze 1',
                        startDate : new Date(2019, 0, 1),
                        duration  : 1
                    },
                    {
                        id        : 'e2',
                        name      : 'Buldoze 2',
                        startDate : new Date(2019, 0, 11),
                        duration  : 1
                    }
                ],

                dependenciesData : [
                    {
                        id        : 'd1',
                        fromEvent : 'e1',
                        toEvent   : 'e2',
                        lag       : 2,
                        lagUnit   : 'd'
                    }
                ],

                assignmentsData : [
                    {
                        id       : 'a1',
                        resource : 'r1',
                        event    : 'e1'
                    },
                    {
                        resource : 'r1',
                        event    : 'e2',
                        id       : 'a2'
                    }
                ]
            });

            schedulerPro = new SchedulerPro({
                project,
                appendTo  : document.body,
                startDate : new Date(2019, 0, 1),
                endDate   : new Date(2019, 0, 31)
            });

            event1 = project.eventStore.getById('e1');
            event2 = project.eventStore.getById('e2');
        });

        t.it('Resolves by applying 24hrs calendar', async t => {

            project.setCalendar(2);

            await t.waitForSelector(`${prefix} header :contains(Calendar configuration error)`);

            t.contentLike(`${prefix} .b-error-description`, '"Coolest calendar ever!" calendar does not provide any working time intervals.', 'description is ok');

            // assert resolution texts
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Use 24 hours calendar with non-working Saturdays and Sundays.)`, '24 hrs resolution is there');
            t.contentLike(`${prefix} .b-resolution.b-checkbox :contains(Use 8)`, 'Use 8 hours calendar (08:00-12:00, 13:00-17:00) with non-working Saturdays and Sundays.', '8 hrs resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'Cancel button is hidden');

            await t.click('.b-resolution.b-checkbox :contains(Use 24)');

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2019, 0, 1), 'event1 start is correct');
            t.is(event1.endDate, new Date(2019, 0, 2), 'event1 end is correct');

            t.is(event2.startDate, new Date(2019, 0, 4), 'event2 start is correct');
            t.is(event2.endDate, new Date(2019, 0, 5), 'event2 end is correct');
        });

        t.it('Resolves by applying 8hrs calendar', async t => {

            project.setCalendar(2);

            await t.waitForSelector(`${prefix} header :contains(Calendar configuration error)`);

            await t.click('.b-resolution.b-checkbox :contains(Use 8)');

            await t.click(`${prefix} button:contains(Apply)`);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2019, 0, 1, 8), 'event1 start is correct');
            t.is(event1.endDate, new Date(2019, 0, 3, 17), 'event1 end is correct');

            t.is(event2.startDate, new Date(2019, 0, 14, 8), 'event2 start is correct');
            t.is(event2.endDate, new Date(2019, 0, 16, 17), 'event2 end is correct');
        });
    });
});
