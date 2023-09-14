
StartTest(t => {

    let schedulerPro, project, event1, event2, dependencyStore;

    t.beforeEach(() => schedulerPro?.destroy());

    t.it('Programmatically resolve a 2-task cycle on data loading', async t => {

        let dep1, dep2;

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
                useInitialAnimation                   : false,
                displaySchedulingIssueResolutionPopup : false,
                appendTo                              : document.body,
                startDate                             : new Date(2018, 1, 20),
                endDate                               : new Date(2018, 1, 22)
            });

            dependencyStore = project.dependencyStore;

            event1 = project.eventStore.getById('event1');
            event2 = project.eventStore.getById('event2');

            dep1 = dependencyStore.getById(1);
            dep2 = dependencyStore.getById(2);
        });

        t.it('Resolves by deactivating dependency', async t => {

            project.on('cycle', ({ schedulingIssue, continueWithResolutionResult }) => {

                schedulingIssue.getResolutions()[0].resolve(schedulingIssue.getDependencies()[0]);

                continueWithResolutionResult(EffectResolutionResult.Resume);
            });

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

            project.on('cycle', ({ schedulingIssue, continueWithResolutionResult }) => {
                schedulingIssue.getResolutions()[1].resolve(schedulingIssue.getDependencies()[0]);

                continueWithResolutionResult(EffectResolutionResult.Resume);
            });

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

    t.it('Programmatically resolve a 2-task cycle on changes after data loading', async t => {

        let resolved = false, dep1, dep2;

        t.beforeEach(() => {
            SchedulerPro.destroy(schedulerPro);

            resolved = false;

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
                useInitialAnimation                   : false,
                displaySchedulingIssueResolutionPopup : false,
                appendTo                              : document.body,
                startDate                             : new Date(2018, 1, 20),
                endDate                               : new Date(2018, 1, 22)
            });

            dependencyStore = project.dependencyStore;

            event1 = project.eventStore.getById('event1');
            event2 = project.eventStore.getById('event2');

            dep1 = dependencyStore.getById(1);
        });

        t.it('Resolves by cancelling', async t => {

            await t.waitForProjectReady(schedulerPro);

            t.notOk(resolved);

            project.on('cycle', ({ continueWithResolutionResult }) => {
                resolved = true;

                continueWithResolutionResult(EffectResolutionResult.Cancel);
            });

            [dep2] = project.dependencyStore.add({
                fromEvent : 'event2',
                toEvent   : 'event1'
            });

            await project.commitAsync();

            t.ok(resolved);

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

            t.notOk(resolved);

            [dep2] = project.dependencyStore.add({
                fromEvent : 'event2',
                toEvent   : 'event1'
            });

            project.on('cycle', ({ schedulingIssue, continueWithResolutionResult }) => {
                resolved = true;

                t.ok(schedulingIssue.getDependencies().includes(dep2));

                schedulingIssue.getResolutions()[0].resolve(dep2);

                continueWithResolutionResult(EffectResolutionResult.Resume);
            });

            await project.commitAsync();

            t.ok(resolved);

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

            t.notOk(resolved);

            [dep2] = project.dependencyStore.add({
                fromEvent : 'event2',
                toEvent   : 'event1'
            });

            project.on('cycle', ({ schedulingIssue, continueWithResolutionResult }) => {
                resolved = true;

                t.ok(schedulingIssue.getDependencies().includes(dep2));

                schedulingIssue.getResolutions()[1].resolve(dep2);

                continueWithResolutionResult(EffectResolutionResult.Resume);
            });

            await project.commitAsync();

            t.ok(resolved);

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
