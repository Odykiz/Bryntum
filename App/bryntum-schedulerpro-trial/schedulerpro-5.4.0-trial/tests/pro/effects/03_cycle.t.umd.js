
StartTest(t => {

    let schedulerPro, project, event1, event2;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Shows resolution UI for cycles on data loading', async t => {

        t.beforeEach(function() {
            schedulerPro?.destroy();

            project = new ProjectModel({
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
                        toEvent   : 'event1',
                        lag       : 1,
                        lagUnit   : 'hour'
                    },
                    {
                        id        : 2,
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

            event1 = project.eventStore.getById('event1');
            event2 = project.eventStore.getById('event2');
        });

        const prefix = '.b-schedulerpro-issueresolutionpopup';

        t.it('Resolves by deactivating dependency', async t => {

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            const
                errorDescriptionNode               = t.query('.b-error-description')[0],
                invalidDependenciesDescriptionNode = t.query('.b-invalid-dependencies-description')[0],
                contentElement                     = errorDescriptionNode.parentElement;

            t.is(contentElement.firstElementChild, errorDescriptionNode, 'Error text is top');
            t.is(contentElement.children[1], invalidDependenciesDescriptionNode, 'Invalid depepency text is 2nd');

            t.diag('Make sure that close icon does not work');

            await t.click('.b-popup-close');

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.contentLike(`${prefix} .b-error-description`, 'A cycle has been found, formed by: "event1" -&gt; "event1"', 'description is ok');

            const firstResolution = document.querySelector(`${prefix} .b-resolution.b-checkbox input`);

            t.ok(firstResolution.checked, 'first resolution is checked');

            t.selectorCountIs(`${prefix} .b-resolution.b-checkbox:visible`, 2, 'proper number of resolutions');

            t.ok(t.$(`${prefix} .b-resolution input`)[0].checked, '1st resolution checked');
            t.notOk(t.$(`${prefix} .b-resolution input`)[1].checked, '2dn resolution unchecked');

            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency from "event1" to "event1")`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency from "event1" to "event1")`, 'remove dependency resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.notOk(applyButton.disabled, 'Apply button is enabled');
            t.notOk(t.isElementVisible(cancelButton), 'cancel button is hidden');

            const resolution = t.$('.b-resolution.b-checkbox label:contains(Deactivate)').get(0);

            await t.click(resolution);

            t.notOk(applyButton.disabled, 'Apply button is enabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2018, 1, 21), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'event1 end is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'event2 end is correct');
        });

    });

    t.it('Shows resolution UI for cycles on changes after data loading', async t => {

        t.beforeEach(function() {
            schedulerPro?.destroy();

            project = new ProjectModel({
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
                        id        : 2,
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

            event1 = project.eventStore.getById('event1');
            event2 = project.eventStore.getById('event2');
        });

        const prefix = '.b-schedulerpro-issueresolutionpopup';

        t.it('Resolves by cancelling w/ close button', async t => {

            await t.waitForProjectReady(schedulerPro);

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            const [dep1] = project.dependencyStore.add({
                fromEvent : 'event1',
                toEvent   : 'event1',
                lag       : 1,
                lagUnit   : 'hour'
            });

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.contentLike(`${prefix} .b-error-description`, 'A cycle has been found, formed by: "event1" -&gt; "event1"', 'description is ok');

            t.selectorCountIs(`${prefix} .b-resolution.b-checkbox:visible`, 3, 'proper number of resolutions');

            t.ok(t.$(`${prefix} .b-resolution input`)[0].checked, '1st resolution checked');
            t.notOk(t.$(`${prefix} .b-resolution input`)[1].checked, '2dn resolution unchecked');
            t.notOk(t.$(`${prefix} .b-resolution input`)[2].checked, '3rd resolution unchecked');

            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency from "event1" to "event1")`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency from "event1" to "event1")`, 'remove dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Cancel the change and do nothing)`, 'cancel resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.notOk(applyButton.disabled, 'Apply button is enabled');
            t.ok(t.isElementVisible(cancelButton), 'Cancel button is visible');
            t.notOk(cancelButton.disabled, 'Cancel button is enabled');

            await t.click('.b-popup-close');

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2018, 1, 21), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'event1 end is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'event2 end is correct');

            t.notOk(project.dependencyStore.includes(dep1), 'no dependency in the store');
        });

        t.it('Resolves by cancelling w/ cancel resolution', async t => {

            await t.waitForProjectReady(schedulerPro);

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            const [dep1] = project.dependencyStore.add({
                fromEvent : 'event1',
                toEvent   : 'event1',
                lag       : 1,
                lagUnit   : 'hour'
            });

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            await t.click(`${prefix} .b-resolution.b-checkbox label:contains(Cancel the change and do nothing)`);

            await t.click(`${prefix} button:contains(Apply)`);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2018, 1, 21), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'event1 end is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'event2 end is correct');

            t.notOk(project.dependencyStore.includes(dep1), 'no dependency in the store');
        });

        t.it('Resolves by cancelling w/ cancel button', async t => {

            await t.waitForProjectReady(schedulerPro);

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            const [dep1] = project.dependencyStore.add({
                fromEvent : 'event1',
                toEvent   : 'event1',
                lag       : 1,
                lagUnit   : 'hour'
            });

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            await t.click(`${prefix} button:contains(Cancel)`);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2018, 1, 21), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'event1 end is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'event2 end is correct');

            t.notOk(project.dependencyStore.includes(dep1), 'no dependency in the store');
        });

        t.it('Resolves by deactivating dependency', async t => {

            await t.waitForProjectReady(schedulerPro);

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            const [dep1] = project.dependencyStore.add({
                fromEvent : 'event1',
                toEvent   : 'event1',
                lag       : 1,
                lagUnit   : 'hour'
            });

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            await t.click(`${prefix} .b-resolution.b-checkbox label:contains(Deactivate dep)`);

            await t.click(`${prefix} button:contains(Apply)`);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2018, 1, 21), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'event1 end is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'event2 end is correct');

            t.ok(project.dependencyStore.includes(dep1), 'dependency is in the store');
            t.notOk(dep1.active, 'dependency is inactive');
        });

        t.it('Resolves by removing dependency', async t => {

            await t.waitForProjectReady(schedulerPro);

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            const [dep1] = project.dependencyStore.add({
                fromEvent : 'event1',
                toEvent   : 'event1',
                lag       : 1,
                lagUnit   : 'hour'
            });

            await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

            t.ok(t.$(`${prefix} .b-resolution input`)[0].checked, '1st resolution checked');

            // Already checked by default
            // await t.click(`${prefix} .b-resolution.b-checkbox label:contains(Remove dep)`);

            await t.click(`${prefix} button:contains(Apply)`);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event1.startDate, new Date(2018, 1, 21), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 1), 'event1 end is correct');

            t.is(event2.startDate, new Date(2018, 1, 21, 2), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 3), 'event2 end is correct');

            t.notOk(project.dependencyStore.includes(dep1), 'dependency is removed');
        });
    });
});
