StartTest(t => {
    let schedulerPro;

    t.beforeEach(t => {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    t.it('Basic resize operations', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        t.chain(
            {
                waitFor : 'SelectorNotFound',
                args    : ['.b-sch-dependency[data-dep-id="1"]'],
                trigger : () => schedulerPro.eventStore.remove(schedulerPro.eventStore.first)
            },
            {
                waitFor : 'Event',
                args    : [schedulerPro, 'dependenciesDrawn'],
                trigger : () => schedulerPro.subGrids.normal.scrollable.scrollBy(10, 0)
            },
            () => {
                t.selectorNotExists('.b-sch-dependency[data-dep-id="1"]', 'No dependency lines appeared after scroll');
            }
        );
    });

    // https://github.com/bryntum/support/issues/1622
    t.it('Should not draw dependencies to unassigned events', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2, percentDone : 50 },
                { id : 2, name : 'Event 2', startDate : '2020-03-24', duration : 3, percentDone : 40 },
                { id : 3, name : 'Event 3', startDate : '2020-03-25', duration : 2, percentDone : 30 }
            ]
        });

        schedulerPro.eventStore.getById(2).unassign(schedulerPro.resourceStore.getById(2));

        t.chain(
            { waitForSelectorNotFound : '.b-sch-dependency', desc : 'Dependency lines disappear after task is removed' },
            {
                waitFor : 'Event',
                args    : [schedulerPro, 'dependenciesDrawn'],
                trigger : () => {
                    t.dragBy('[data-event-id="1"]', [schedulerPro.tickSize, 0]);
                },
                desc : 'Drag a task to refresh dependency lines'
            },
            () => {
                t.selectorNotExists('.b-sch-dependency', 'No dependency lines appeared after refresh');
            }
        );
    });

    // https://github.com/bryntum/support/issues/1962
    t.it('Should remove orphan dependencies after replace resources', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        schedulerPro.resourceStore.data = [
            {
                id   : 1,
                name : 'Resource 1'
            }
        ];

        await t.waitForProjectReady(schedulerPro.project);
        await t.waitForSelectorNotFound('.b-sch-dependency');
        t.pass('No dependency lines appeared after keep only Resource 1');
    });

    // https://github.com/bryntum/support/issues/3532
    t.it('Dependency from buffer zone should be refreshed after event resize', async t => {
        const schedulerPro = await t.getSchedulerProAsync({

            startDate : new Date(2021, 10, 1),
            endDate   : new Date(2022, 5, 1),

            columns : [
                { field : 'name', text : 'Name' }
            ],

            tickSize : 50,
            project  : {
                resourcesData : [{
                    id : 1, name : 'Arcady'
                }],

                eventsData : [
                    { id : 1, name : 'Task 1', resourceId : 1, startDate : new Date(2021, 10, 1), duration : 3 },
                    { id : 2, name : 'Task 2', resourceId : 1, startDate : new Date(2021, 10, 7), duration : 3 },
                    { id : 3, name : 'Task 3', resourceId : 1, startDate : new Date(2021, 10, 13), duration : 3 },
                    { id : 4, name : 'Task 4', resourceId : 1, startDate : new Date(2021, 10, 19), duration : 3 },
                    { id : 5, name : 'Task 5', resourceId : 1, startDate : new Date(2021, 10, 25), duration : 3 },
                    { id : 6, name : 'Task 6', resourceId : 1, startDate : new Date(2021, 11, 1), duration : 3 },
                    { id : 7, name : 'Task 7', resourceId : 1, startDate : new Date(2021, 11, 7), duration : 3 },
                    { id : 8, name : 'Task 8', resourceId : 1, startDate : new Date(2021, 11, 13), duration : 3 }
                ],

                dependenciesData : [
                    { id : 1, from : 1, to : 2, lag : 3 },
                    { id : 2, from : 2, to : 3, lag : 3 },
                    { id : 3, from : 3, to : 4, lag : 3 },
                    { id : 4, from : 4, to : 5, lag : 3 },
                    { id : 5, from : 5, to : 6, lag : 3 },
                    { id : 6, from : 6, to : 7, lag : 3 },
                    { id : 7, from : 7, to : 8, lag : 3 }
                ]
            }
        });

        await t.dragBy({
            source : '.b-sch-event',
            offset : ['100%-3', 5],
            delta  : [schedulerPro.tickSize * 9, 0]
        });

        await t.waitForProjectReady(schedulerPro.project);

        await schedulerPro.scrollToDate(schedulerPro.eventStore.getById(5).startDate, { block : 'start', animate : true });

        t.assertDependency(schedulerPro, schedulerPro.dependencyStore.getById(5));
    });

    t.it('Should position milestones terminals correctly', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            milestoneLayoutMode   : 'default',
            milestoneTextPosition : 'inside',
            resources             : [{ id : 1 }],
            events                : [{ id : 1, name : 'A', startDate : '2020-03-24T00:00', duration : 0 }]
        });

        await t.moveCursorTo('.b-sch-event.b-milestone');

        const
            milestone      = t.rect('.b-sch-event-wrap.b-milestone-wrap'),
            terminalStart  = t.rect('.b-sch-event.b-milestone .b-sch-terminal-start'),
            terminalEnd    = t.rect('.b-sch-event.b-milestone .b-sch-terminal-end'),
            terminalTop    = t.rect('.b-sch-event.b-milestone .b-sch-terminal-top'),
            terminalBottom = t.rect('.b-sch-event.b-milestone .b-sch-terminal-bottom');

        // Making sure milestone has a ok size
        t.is(milestone.width, milestone.height, 'Milestone is a square');
        t.isGreater(milestone.width, 0, 'Milestone has width');

        t.isApproxPx(milestone.left + 2, terminalStart.right, 1, 'Start terminal positioned correctly');
        t.isApproxPx(milestone.right - 2, terminalEnd.left, 1, 'End terminal positioned correctly');
        t.isApproxPx(milestone.top + 2, terminalTop.bottom, 1, 'Top terminal positioned correctly');
        t.isApproxPx(milestone.bottom - 2, terminalBottom.top, 1, 'Bottom terminal positioned correctly');

    });

    // https://github.com/bryntum/support/issues/6129
    t.it('Should refresh dependencies when dropped on weekend', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        await t.waitForDependencies();

        t.wontFire(schedulerPro, 'eventDrop');

        await t.waitForEventOnTrigger(schedulerPro, 'dependenciesDrawn', () =>
            t.dragBy({
                source : '$event=1',
                delta  : [-100, 0]
            })
        );
    });

    // https://github.com/bryntum/support/issues/6444
    t.it('Should handle data being reloaded', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            eventStyle            : 'colored',
            highlightSuccessors   : true,
            highlightPredecessors : true,
            forceFit              : true,
            features              : {
                dependencies : {
                    // Rounded line joints
                    radius                            : 10,
                    // Easier to click on lines
                    clickWidth                        : 5,
                    // Highlight dependency lines when hovering over an event
                    highlightDependenciesOnEventHover : true
                }
            },
            project : {
                resourcesData : [{
                    id : 1, name : 'Arcady'
                }],

                eventsData : [
                    { id : 1, name : 'Task 1', resourceId : 1, startDate : new Date(2020, 2, 22), duration : 3 },
                    { id : 2, name : 'Task 2', resourceId : 1, startDate : new Date(2020, 2, 22), duration : 3 },
                    { id : 3, name : 'Task 3', resourceId : 1, startDate : new Date(2020, 2, 22), duration : 3 }
                ],
                dependenciesData : [
                    { id : 1, from : 1, to : 2, lag : 3 },
                    { id : 2, from : 2, to : 3, lag : 3 }
                ]
            }
        });

        await t.click('[data-event-id="1"]');

        t.selectorCountIs('.b-highlighting .b-highlight.b-sch-event', 3);
        schedulerPro.project.inlineData = schedulerPro.project.toJSON();

        await schedulerPro.project.commitAsync();
        t.selectorCountIs('.b-highlighting .b-highlight.b-sch-event', 3);
    });
});
