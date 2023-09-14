
StartTest(t => {

    let schedulerPro, project, event0, event1, event2;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Shows resolution UI for conflicts on data loading', async t => {

        t.beforeEach(() => {
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
                        id           : 'event0',
                        name         : 'event0',
                        startDate    : new Date(2018, 1, 21, 11),
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
                    {
                        fromEvent : 'event0',
                        toEvent   : 'event1',
                        type      : 0
                    },
                    {
                        fromEvent : 'event0',
                        toEvent   : 'event2',
                        type      : 0
                    }
                ],

                assignmentsData : [
                    {
                        id       : 'a1',
                        resource : 'r1',
                        event    : 'event0'
                    },
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

            event0 = project.eventStore.getById('event0');
            event1 = project.eventStore.getById('event1');
            event2 = project.eventStore.getById('event2');
        });

        const prefix = '.b-schedulerpro-issueresolutionpopup';

        t.it('Resolves by removing constraints', async t => {

            await t.waitForSelector(`${prefix} header :contains(Scheduling conflict)`);

            let conflictingEvent = schedulerPro.activeSchedulingIssueResolutionPopup.schedulingIssue.intervals.find(interval => interval.owner.isEventModel).owner;

            const expectedDateFormat = 'February 21, 2018(?: at)?(?:,)? 10:00\\sAM';

            t.query(`${prefix} .b-error-description:textEquals(), ${prefix} .b-error-description:textEquals()`);

            t.contentLike(
                `${prefix} .b-error-description`,
                new RegExp(`A scheduling conflict has been found: Task "${conflictingEvent.name}" Start-No-Later-Than ${expectedDateFormat} constraint is conflicting with Dependency \\(Start-to-Start\\) from "event0" to "${conflictingEvent.name}"`),
                'description is ok'
            );

            // assert resolution texts
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than" constraint of task "${conflictingEvent.name}")`, 'remove constraint resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency from "event0" to "${conflictingEvent.name}")`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency from "event0" to "${conflictingEvent.name}")`, 'remove dependency resolution is there');

            let applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            let cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'Cancel button is hidden');

            let resolution = t.$('.b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than")').get(0);

            await t.click(resolution);

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(resolution);

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(applyButton);

            t.diag('Asserting 2nd conflict');

            conflictingEvent = schedulerPro.activeSchedulingIssueResolutionPopup.schedulingIssue.intervals.find(interval => interval.owner.isEventModel).owner;

            t.contentLike(
                `${prefix} .b-error-description`,
                new RegExp(`A scheduling conflict has been found: Task "${conflictingEvent.name}" Start-No-Later-Than ${expectedDateFormat} constraint is conflicting with Dependency \\(Start-to-Start\\) from "event0" to "${conflictingEvent.name}"`),
                'description is ok'
            );

            // assert resolution texts
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than" constraint of task "${conflictingEvent.name}")`, 'remove constraint resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency from "event0" to "${conflictingEvent.name}")`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency from "event0" to "${conflictingEvent.name}")`, 'remove dependency resolution is there');

            applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'Cancel button is hidden');

            resolution = t.$('.b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than")').get(0);

            await t.click(resolution);

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event0.startDate, new Date(2018, 1, 21, 11), 'event1 start is correct');
            t.is(event0.endDate, new Date(2018, 1, 21, 12), 'event1 end is correct');

            t.is(event1.startDate, new Date(2018, 1, 21, 11), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 12), 'event1 end is correct');
            t.notOk(event1.constraintType, 'event1 has no constraint');

            t.is(event2.startDate, new Date(2018, 1, 21, 11), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 12), 'event2 end is correct');
            t.notOk(event2.constraintType, 'event2 has no constraint');
        });

        t.it('Resolves by deactivating dependencies', async t => {

            await t.waitForSelector(`${prefix} header :contains(Scheduling conflict)`);

            let resolution = t.$('.b-resolution.b-checkbox :contains(Deactivate)').get(0);

            await t.click(resolution);

            t.selectorNotExists(`${prefix} button[disabled]:contains(Apply)`, 'Apply button is no longer disabled');

            await t.click(`${prefix} button:contains(Apply)`);

            t.diag('Asserting 2nd conflict');

            const conflictingEvent = schedulerPro.activeSchedulingIssueResolutionPopup.schedulingIssue.intervals.find(interval => interval.owner.isEventModel).owner;

            const expectedDateFormat = 'February 21, 2018(?: at)?(?:,)? 10:00\\sAM';

            t.contentLike(
                `${prefix} .b-error-description`,
                new RegExp(`A scheduling conflict has been found: Task "${conflictingEvent.name}" Start-No-Later-Than ${expectedDateFormat} constraint is conflicting with Dependency \\(Start-to-Start\\) from "event0" to "${conflictingEvent.name}"`),
                'description is ok'
            );

            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than" constraint of task "${conflictingEvent.name}")`, 'remove constraint resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency from "event0" to "${conflictingEvent.name}")`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency from "event0" to "${conflictingEvent.name}")`, 'remove dependency resolution is there');

            const applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'Cancel button is hidden');

            resolution = t.$('.b-resolution.b-checkbox :contains(Deactivate)').get(0);

            await t.click(resolution);

            t.notOk(applyButton.disabled, 'Apply button is not disabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event0.startDate, new Date(2018, 1, 21, 11), 'event1 start is correct');
            t.is(event0.endDate, new Date(2018, 1, 21, 12), 'event1 end is correct');

            t.is(event1.startDate, new Date(2018, 1, 21, 10), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 11), 'event1 end is correct');
            t.is(event1.constraintType, 'startnolaterthan', 'event1 constraint is correct');
            t.is(event1.constraintDate, new Date(2018, 1, 21, 10), 'event1 constraint date is correct');

            t.is(event2.startDate, new Date(2018, 1, 21), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 1), 'event2 end is correct');
            t.is(event2.constraintType, 'startnolaterthan', 'event2 constraint is correct');
            t.is(event2.constraintDate, new Date(2018, 1, 21, 10), 'event2 constraint date is correct');
        });

        t.it('Resolves by removing dependencies', async t => {

            await t.waitForSelector(`${prefix} header :contains(Scheduling conflict)`);

            let resolution = t.$('.b-resolution.b-checkbox :contains(Remove dep)').get(0);

            await t.click(resolution);

            let applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(applyButton);

            t.diag('Asserting 2nd conflict');

            const conflictingEvent = schedulerPro.activeSchedulingIssueResolutionPopup.schedulingIssue.intervals.find(interval => interval.owner.isEventModel).owner;

            const expectedDateFormat = 'February 21, 2018(?: at)?(?:,)? 10:00\\sAM';

            t.contentLike(
                `${prefix} .b-error-description`,
                new RegExp(`A scheduling conflict has been found: Task "${conflictingEvent.name}" Start-No-Later-Than ${expectedDateFormat} constraint is conflicting with Dependency \\(Start-to-Start\\) from "event0" to "${conflictingEvent.name}"`),
                'description is ok'
            );

            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than" constraint of task "${conflictingEvent.name}")`, 'remove constraint resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency from "event0" to "${conflictingEvent.name}")`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency from "event0" to "${conflictingEvent.name}")`, 'remove dependency resolution is there');

            applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            const cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.notOk(t.isElementVisible(cancelButton), 'Cancel button is hidden');

            resolution = t.$('.b-resolution.b-checkbox :contains(Remove dep)').get(0);

            await t.click(resolution);

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(applyButton);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event0.startDate, new Date(2018, 1, 21, 11), 'event1 start is correct');
            t.is(event0.endDate, new Date(2018, 1, 21, 12), 'event1 end is correct');

            t.is(event1.startDate, new Date(2018, 1, 21, 10), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 11), 'event1 end is correct');
            t.is(event1.constraintType, 'startnolaterthan', 'event1 constraint is correct');
            t.is(event1.constraintDate, new Date(2018, 1, 21, 10), 'event1 constraint date is correct');

            t.is(event2.startDate, new Date(2018, 1, 21), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 1), 'event2 end is correct');
            t.is(event2.constraintType, 'startnolaterthan', 'event2 constraint is correct');
            t.is(event2.constraintDate, new Date(2018, 1, 21, 10), 'event2 constraint date is correct');

            t.notOk(project.dependencyStore.count);
        });
    });

    t.it('Shows resolution UI for conflicts on changes after data loading', async t => {

        t.beforeEach(() => {
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
                    {
                        fromEvent : 'event0',
                        toEvent   : 'event1',
                        type      : 0
                    },
                    {
                        fromEvent : 'event0',
                        toEvent   : 'event2',
                        type      : 0
                    }
                ],

                assignmentsData : [
                    {
                        id       : 'a1',
                        resource : 'r1',
                        event    : 'event0'
                    },
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

            event0 = project.eventStore.getById('event0');
            event1 = project.eventStore.getById('event1');
            event2 = project.eventStore.getById('event2');
        });

        const prefix = '.b-schedulerpro-issueresolutionpopup';

        t.it('Resolves by removing constraints', async t => {

            await t.waitFor(100);

            t.selectorNotExists(`${prefix}`, 'No resolution UI initially');

            event0.setConstraint('startnoearlierthan', new Date(2018, 1, 21, 11));

            await t.waitForSelector(`${prefix} header :contains(Scheduling conflict)`);

            let conflictingEvent = schedulerPro.activeSchedulingIssueResolutionPopup.schedulingIssue.intervals.find(interval => interval.owner.isEventModel).owner;

            const expectedDateFormat = 'February 21, 2018(?: at)?(?:,)? 10:00\\sAM';

            t.contentLike(
                `${prefix} .b-error-description`,
                new RegExp(`A scheduling conflict has been found: Task "${conflictingEvent.name}" Start-No-Later-Than ${expectedDateFormat} constraint is conflicting with Dependency \\(Start-to-Start\\) from "event0" to "${conflictingEvent.name}"`),
                'description is ok');

            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than" constraint of task "${conflictingEvent.name}")`, 'remove constraint resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency from "event0" to "${conflictingEvent.name}")`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency from "event0" to "${conflictingEvent.name}")`, 'remove dependency resolution is there');

            let applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            let cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.ok(t.isElementVisible(cancelButton), 'Cancel button is visible');

            let resolution = t.$('.b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than")').get(0);

            await t.click(resolution);

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(applyButton);

            t.diag('Asserting 2nd conflict');

            conflictingEvent = schedulerPro.activeSchedulingIssueResolutionPopup.schedulingIssue.intervals.find(interval => interval.owner.isEventModel).owner;

            t.contentLike(
                `${prefix} .b-error-description`,
                new RegExp(`A scheduling conflict has been found: Task "${conflictingEvent.name}" Start-No-Later-Than ${expectedDateFormat} constraint is conflicting with Dependency \\(Start-to-Start\\) from "event0" to "${conflictingEvent.name}"`),
                'description is ok');

            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than" constraint of task "${conflictingEvent.name}")`, 'remove constraint resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Deactivate dependency from "event0" to "${conflictingEvent.name}")`, 'deactivate dependency resolution is there');
            t.selectorExists(`${prefix} .b-resolution.b-checkbox :contains(Remove dependency from "event0" to "${conflictingEvent.name}")`, 'remove dependency resolution is there');

            applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);
            cancelButton = t.$(`${prefix} button:contains(Cancel)`).get(0);

            t.ok(applyButton, 'Apply button is there');
            t.ok(cancelButton, 'Cancel button is there');

            t.ok(t.isElementVisible(applyButton), 'Apply button is visible');
            t.ok(applyButton.disabled, 'Apply button is disabled');
            t.ok(t.isElementVisible(cancelButton), 'Cancel button is visible');

            resolution = t.$('.b-resolution.b-checkbox :contains(Remove "Start-No-Later-Than")').get(0);

            await t.click(resolution);

            t.notOk(applyButton.disabled, 'Apply button is no longer disabled');

            await t.click(`${prefix} button:contains(Apply)`);

            await t.waitForProjectReady(schedulerPro);

            await t.waitForSelector('.b-sch-event');

            t.is(event0.startDate, new Date(2018, 1, 21, 11), 'event1 start is correct');
            t.is(event0.endDate, new Date(2018, 1, 21, 12), 'event1 end is correct');

            t.is(event1.startDate, new Date(2018, 1, 21, 11), 'event1 start is correct');
            t.is(event1.endDate, new Date(2018, 1, 21, 12), 'event1 end is correct');
            t.notOk(event1.constraintType, 'event1 has no constraint');

            t.is(event2.startDate, new Date(2018, 1, 21, 11), 'event2 start is correct');
            t.is(event2.endDate, new Date(2018, 1, 21, 12), 'event2 end is correct');
            t.notOk(event2.constraintType, 'event2 has no constraint');
        });

    });
});
