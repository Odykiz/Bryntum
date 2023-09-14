
StartTest(t => {

    let schedulerPro, project, event1, event2, dependencyStore;

    t.beforeEach(() => schedulerPro?.destroy());

    t.describe('Shows resolution UI for a 2-task cycle on data loading', async t => {

        let dep1, dep2;

        t.beforeEach(() => {
            schedulerPro?.destroy();

            project = new ProjectModel({
                resourcesData : [
                    {
                        id   : 'r1',
                        name : 'Bulldozer'
                    },
                    {
                        id   : 'r2',
                        name : 'Excavator'
                    }
                ],

                eventsData : [
                    {
                        id           : 'event1',
                        name         : 'event1',
                        startDate    : new Date(2018, 1, 21),
                        duration     : 1,
                        durationUnit : 'hour'
                    },
                    {
                        id           : 'event2',
                        name         : 'event2',
                        startDate    : new Date(2019, 1, 21),
                        duration     : 1,
                        durationUnit : 'hour'
                    }
                ],

                dependenciesData : [
                    {
                        id        : 1,
                        fromEvent : 'event1',
                        toEvent   : 'event2',
                        lag       : 1,
                        lagUnit   : 'hour'
                    },
                    {
                        id        : 2,
                        fromEvent : 'event2',
                        toEvent   : 'event1'
                    }
                ],

                assignmentsData : [
                    {
                        id       : 'a2',
                        resource : 'r1',
                        event    : 'event1'
                    },
                    {
                        id       : 'a3',
                        resource : 'r2',
                        event    : 'event2'
                    }
                ]
            });

            schedulerPro = new SchedulerPro({
                project,
                appendTo  : document.body,
                startDate : new Date(2018, 1, 20),
                endDate   : new Date(2018, 1, 22)
            });

            dependencyStore = project.dependencyStore;

            event1 = project.eventStore.getById('event1');
            event2 = project.eventStore.getById('event2');

            dep1 = dependencyStore.getById(1);
            dep2 = dependencyStore.getById(2);
        });

        const prefix = '.b-schedulerpro-issueresolutionpopup';

        t.it('Resolves by deactivating dependency', async t => {

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.diag('Make sure that close icon does not work');

            await t.click('.b-popup-close');

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.contentLike(`${prefix} .b-error-description`, 'A cycle has been found, formed by: "event2" -&gt; "event1" -&gt; "event2"', 'description is ok');

            t.selectorCountIs(`${prefix} .b-resolution.b-checkbox:visible`, 2, 'proper number of resolutions');

            t.notOk(t.$(`${prefix} .b-resolution input`)[0].checked, '1st resolution checked');
            t.notOk(t.$(`${prefix} .b-resolution input`)[1].checked, '2dn resolution unchecked');

            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency)`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency)`, 'remove dependency resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'Cancel button is hidden');

            const resolution = t.$('.b-resolution.b-checkbox label:contains(Deactivate)').get(0);

            await t.click(resolution);

            t.ok(applyButton.disabled, 'Apply button is still disabled');

            await t.click('.b-combo .b-icon-picker');

            await t.click('.b-list-item:contains("event2" -)');

            t.notOk(applyButton.disabled, 'Apply button got enabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            t.is(event1.startDate, new Date(2018, 1, 21), 'Start date of `event1` is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'End date of `event1` is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'Start date of `event2` is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'End date of `event2` is correct');

            t.ok(dep1.active, 'dependency #1 is active');
            t.notOk(dep2.active, 'dependency #2 is inactive');
            t.ok(dependencyStore.includes(dep1), 'dependency #1 is in the store');
            t.ok(dependencyStore.includes(dep2), 'dependency #2 is in the store');
        });

        t.it('Resolves by removing dependency', async t => {

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.diag('Make sure that close icon does not work');

            await t.click('.b-popup-close');

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.contentLike(`${prefix} .b-error-description`, 'A cycle has been found, formed by: "event2" -&gt; "event1" -&gt; "event2"', 'description is ok');

            t.selectorNotExists(`${prefix} .b-resolution.b-checkbox input:checked`, 'no checked resolutions');
            t.selectorCountIs(`${prefix} .b-resolution.b-checkbox:visible`, 2, 'proper number of resolutions');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency)`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency)`, 'remove dependency resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'Cancel button is hidden');

            const resolution = t.$('.b-resolution.b-checkbox label:contains(Remove)').get(0);

            await t.click(resolution);

            t.ok(applyButton.disabled, 'Apply button is still disabled');

            await t.click('.b-combo .b-icon-picker');

            await t.click('.b-list-item:contains("event2" -)');

            t.notOk(applyButton.disabled, 'Apply button got enabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            t.is(event1.startDate, new Date(2018, 1, 21), 'Start date of `event1` is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'End date of `event1` is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'Start date of `event2` is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'End date of `event2` is correct');

            t.ok(dep1.active, 'dependency #1 is active');
            t.ok(dep2.active, 'dependency #2 is active');
            t.ok(dependencyStore.includes(dep1), 'dependency #1 is in the store');
            t.notOk(dependencyStore.includes(dep2), 'dependency #2 is NOT in the store');
        });
    });

    t.describe('Shows resolution UI for a 2-task cycle on changes after data loading', async t => {

        let dep1, dep2;

        t.beforeEach(() => {
            schedulerPro?.destroy();

            project = new ProjectModel({
                resourcesData : [
                    {
                        id   : 'r1',
                        name : 'Bulldozer'
                    },
                    {
                        id   : 'r2',
                        name : 'Excavator'
                    }
                ],

                eventsData : [
                    {
                        id           : 'event1',
                        name         : 'event1',
                        startDate    : new Date(2018, 1, 21),
                        duration     : 1,
                        durationUnit : 'hour'
                    },
                    {
                        id           : 'event2',
                        name         : 'event2',
                        startDate    : new Date(2019, 1, 21),
                        duration     : 1,
                        durationUnit : 'hour'
                    }
                ],

                dependenciesData : [
                    {
                        id        : 1,
                        fromEvent : 'event1',
                        toEvent   : 'event2',
                        lag       : 1,
                        lagUnit   : 'hour'
                    }
                ],

                assignmentsData : [
                    {
                        id       : 'a2',
                        resource : 'r1',
                        event    : 'event1'
                    },
                    {
                        id       : 'a3',
                        resource : 'r2',
                        event    : 'event2'
                    }
                ]
            });

            schedulerPro = new SchedulerPro({
                project,
                appendTo  : document.body,
                startDate : new Date(2018, 1, 20),
                endDate   : new Date(2018, 1, 22)
            });

            dependencyStore = project.dependencyStore;

            event1 = project.eventStore.getById('event1');
            event2 = project.eventStore.getById('event2');

            dep1 = dependencyStore.getById(1);
        });

        const prefix = '.b-schedulerpro-issueresolutionpopup';

        t.it('Resolves by cancelling w/ close button', async t => {

            await t.waitForProjectReady(schedulerPro);

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            [dep2] = project.dependencyStore.add({
                fromEvent : 'event2',
                toEvent   : 'event1'
            });

            await t.click('.b-popup-close');

            await t.waitForProjectReady(schedulerPro);

            t.is(event1.startDate, new Date(2018, 1, 21), 'Start date of `event1` is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'End date of `event1` is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'Start date of `event2` is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'End date of `event2` is correct');

            t.ok(dep1.active, 'dependency #1 is active');
            t.ok(dependencyStore.includes(dep1), 'dependency #1 is in the store');
            t.notOk(dependencyStore.includes(dep2), 'dependency #2 is NOT in the store');
        });

        t.it('Resolves by deactivating dependency', async t => {

            await t.waitForProjectReady(schedulerPro);

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            [dep2] = project.dependencyStore.add({
                fromEvent : 'event2',
                toEvent   : 'event1'
            });

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.contentLike(`${prefix} .b-error-description`, 'A cycle has been found, formed by: "event1" -&gt; "event2" -&gt; "event1"', 'description is ok');

            t.selectorNotExists(`${prefix} .b-resolution.b-checkbox input:checked`, 'no checked resolutions');
            t.selectorCountIs(`${prefix} .b-resolution.b-checkbox:visible`, 3, 'proper number of resolutions');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency)`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency)`, 'remove dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Cancel the change and do nothing)`, 'cancel resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.ok(t.isElementVisible(cancelButton), 'Cancel button is visible');

            const resolution = t.$('.b-resolution.b-checkbox label:contains(Deactivate)').get(0);

            await t.click(resolution);

            t.ok(applyButton.disabled, 'Apply button is still disabled');

            await t.click('.b-combo .b-icon-picker');

            await t.click('.b-list-item:contains("event2" -)');

            t.notOk(applyButton.disabled, 'Apply button got enabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            t.is(event1.startDate, new Date(2018, 1, 21), 'Start date of `event1` is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'End date of `event1` is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'Start date of `event2` is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'End date of `event2` is correct');

            t.ok(dep1.active, 'dependency #1 is active');
            t.notOk(dep2.active, 'dependency #2 is inactive');
            t.ok(dependencyStore.includes(dep1), 'dependency #1 is in the store');
            t.ok(dependencyStore.includes(dep2), 'dependency #2 is in the store');
        });

        t.it('Resolves by removing dependency', async t => {

            await t.waitForProjectReady(schedulerPro);

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            [dep2] = project.dependencyStore.add({
                fromEvent : 'event2',
                toEvent   : 'event1'
            });

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.contentLike(`${prefix} .b-error-description`, 'A cycle has been found, formed by: "event1" -&gt; "event2" -&gt; "event1"', 'description is ok');

            t.selectorNotExists(`${prefix} .b-resolution.b-checkbox input:checked`, 'no checked resolutions');
            t.selectorCountIs(`${prefix} .b-resolution.b-checkbox:visible`, 3, 'proper number of resolutions');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency)`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency)`, 'remove dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Cancel the change and do nothing)`, 'cancel resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.ok(t.isElementVisible(cancelButton), 'Cancel button is visible');

            const resolution = t.$('.b-resolution.b-checkbox label:contains(Remove)').get(0);

            await t.click(resolution);

            t.ok(applyButton.disabled, 'Apply button is still disabled');

            await t.click('.b-combo .b-icon-picker');

            await t.click('.b-list-item:contains("event2" -)');

            t.notOk(applyButton.disabled, 'Apply button got enabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            t.is(event1.startDate, new Date(2018, 1, 21), 'Start date of `event1` is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'End date of `event1` is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'Start date of `event2` is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'End date of `event2` is correct');

            t.ok(dep1.active, 'dependency #1 is active');
            t.ok(dependencyStore.includes(dep1), 'dependency #1 is in the store');
            t.notOk(dependencyStore.includes(dep2), 'dependency #2 is NOT in the store');
        });
    });
});
