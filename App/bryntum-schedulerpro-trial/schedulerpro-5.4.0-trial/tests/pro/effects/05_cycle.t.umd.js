
StartTest(t => {

    let schedulerPro, project;

    t.beforeEach(() => schedulerPro?.destroy());

    // https://github.com/bryntum/support/issues/4813
    t.it('Updates resolution UI when handling two cycles one by one', async t => {

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
                    id        : 1,
                    name      : '1',
                    startDate : '2020-02-04',
                    endDate   : '2020-02-05'
                },
                {
                    id        : 2,
                    name      : '2',
                    startDate : '2020-02-04',
                    endDate   : '2020-02-05'
                },
                {
                    id        : 3,
                    name      : '3',
                    startDate : '2020-02-04',
                    endDate   : '2020-02-05'
                },
                {
                    id        : 4,
                    name      : '4',
                    startDate : '2020-02-04',
                    endDate   : '2020-02-05'
                }
            ],

            dependenciesData : [
                {
                    id        : 'd1',
                    fromEvent : 1,
                    toEvent   : 2
                },
                {
                    id        : 'd2',
                    fromEvent : 2,
                    toEvent   : 1
                },
                {
                    id        : 'd3',
                    fromEvent : 3,
                    toEvent   : 4
                },
                {
                    id        : 'd4',
                    fromEvent : 4,
                    toEvent   : 3
                }
            ],

            assignmentsData : [
                {
                    id       : 'a1',
                    resource : 'r1',
                    event    : 1
                },
                {
                    id       : 'a2',
                    resource : 'r2',
                    event    : 2
                },
                {
                    id       : 'a3',
                    resource : 'r1',
                    event    : 3
                },
                {
                    id       : 'a4',
                    resource : 'r2',
                    event    : 4
                }
            ]
        });

        schedulerPro = new SchedulerPro({
            project,
            appendTo  : document.body,
            startDate : new Date(2020, 1, 4),
            endDate   : new Date(2020, 1, 7)
        });

        const
            [event1, event2, event3, event4] = project.eventStore,
            [dep1, dep2, dep3, dep4]         = project.dependencyStore;

        const prefix = '.b-schedulerpro-issueresolutionpopup';

        await t.waitForSelector(`${prefix} header :contains(Scheduling cycle)`);

        t.contentLike(`${prefix} .b-error-description`, 'A cycle has been found, formed by: "4" -&gt; "3" -&gt; "4"', 'description is ok');

        let resolution = t.$('.b-resolution.b-checkbox label:contains(Deactivate)').get(0);

        await t.click(resolution);

        await t.click('.b-combo .b-icon-picker');

        t.selectorExists('.b-list-item[data-id="d3"]', 'dependency d3 is in the list');
        t.selectorExists('.b-list-item[data-id="d4"]', 'dependency d4 is in the list');

        await t.click('.b-list-item:contains("4" -)');

        let applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);

        await t.click(applyButton);

        await t.waitForContentLike(`${prefix} .b-error-description`, 'A cycle has been found, formed by: "2" -&gt; "1" -&gt; "2"');

        resolution = t.$('.b-resolution.b-checkbox label:contains(Deactivate)').get(0);

        await t.click(resolution);

        await t.click('.b-combo .b-icon-picker');

        t.selectorExists('.b-list-item[data-id="d1"]', 'dependency d1 is in the list');
        t.selectorExists('.b-list-item[data-id="d2"]', 'dependency d2 is in the list');

        await t.click('.b-list-item:contains("2" -)');

        applyButton = t.$(`${prefix} button:contains(Apply)`).get(0);

        await t.click(applyButton);

        await t.waitForProjectReady(schedulerPro);

        t.is(event1.startDate, new Date(2020, 1, 4), 'Start date of `event1` is correct');
        t.is(event1.endDate, new Date(2020, 1, 5), 'End date of `event1` is correct');
        t.is(event2.startDate, new Date(2020, 1, 5), 'Start date of `event2` is correct');
        t.is(event2.endDate, new Date(2020, 1, 6), 'End date of `event2` is correct');

        t.is(event3.startDate, new Date(2020, 1, 4), 'Start date of `event3` is correct');
        t.is(event3.endDate, new Date(2020, 1, 5), 'End date of `event3` is correct');
        t.is(event4.startDate, new Date(2020, 1, 5), 'Start date of `event4` is correct');
        t.is(event4.endDate, new Date(2020, 1, 6), 'End date of `event4` is correct');

        t.ok(dep1.active, 'dependency #1 is active');
        t.notOk(dep2.active, 'dependency #2 is inactive');
        t.ok(dep3.active, 'dependency #3 is active');
        t.notOk(dep4.active, 'dependency #4 is inactive');
        t.ok(project.dependencyStore.includes(dep1), 'dependency #1 is in the store');
        t.ok(project.dependencyStore.includes(dep2), 'dependency #2 is in the store');
        t.ok(project.dependencyStore.includes(dep3), 'dependency #3 is in the store');
        t.ok(project.dependencyStore.includes(dep4), 'dependency #4 is in the store');
    });

    // https://github.com/bryntum/support/issues/4803
    t.it('Resolution UI combo width is correct', async t => {

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
                    id        : 1,
                    name      : '1',
                    startDate : '2020-02-04',
                    endDate   : '2020-02-05'
                },
                {
                    id        : 2,
                    name      : '2',
                    startDate : '2020-02-04',
                    endDate   : '2020-02-05'
                },
                {
                    id        : 3,
                    name      : '3',
                    startDate : '2020-02-04',
                    endDate   : '2020-02-05'
                },
                {
                    id        : 4,
                    name      : '4',
                    startDate : '2020-02-04',
                    endDate   : '2020-02-05'
                }
            ],

            dependenciesData : [
                {
                    id        : 'd1',
                    fromEvent : 1,
                    toEvent   : 2
                },
                {
                    id        : 'd2',
                    fromEvent : 2,
                    toEvent   : 3
                },
                {
                    id        : 'd3',
                    fromEvent : 3,
                    toEvent   : 4
                },
                {
                    id        : 'd4',
                    fromEvent : 4,
                    toEvent   : 1
                }
            ],

            assignmentsData : [
                {
                    id       : 'a1',
                    resource : 'r1',
                    event    : 1
                },
                {
                    id       : 'a2',
                    resource : 'r2',
                    event    : 2
                },
                {
                    id       : 'a3',
                    resource : 'r1',
                    event    : 3
                },
                {
                    id       : 'a4',
                    resource : 'r2',
                    event    : 4
                }
            ]
        });

        schedulerPro = new SchedulerPro({
            project,
            appendTo  : document.body,
            startDate : new Date(2020, 1, 4),
            endDate   : new Date(2020, 1, 7)
        });

        let popupElement;

        await t.waitFor(() => popupElement = t.$('.b-schedulerpro-issueresolutionpopup').get(0));

        const comboElement = t.$('.b-combo.b-dependency-field').get(0);

        t.isApproxPx(comboElement.clientWidth, popupElement.clientWidth, 40, 'combo input element width is ok');
    });

});
