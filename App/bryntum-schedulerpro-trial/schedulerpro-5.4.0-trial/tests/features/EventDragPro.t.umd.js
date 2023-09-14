/* global SchedulerPro */

StartTest(t => {

    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy());

    async function setupSchedulerWithSegments(config) {
        schedulerPro = await t.getSchedulerProAsync(Object.assign({
            height          : 180,
            startDate       : new Date(2010, 0, 18),
            appendTo        : document.body,
            tickSize        : 40,
            resourcesData   : [{ id : 'r1', name : 'Foo' }],
            assignmentsData : [{ id : 'a1', resource : 'r1', event : 1 }],
            eventsData      : [
                {
                    id        : 1,
                    startDate : '2010-01-18',
                    name      : 'Event 1',
                    segments  : [
                        {
                            id        : 11,
                            startDate : '2010-01-18',
                            duration  : 1,
                            name      : 'one',
                            cls       : 'one'
                        },
                        {
                            id        : 12,
                            startDate : '2010-01-20',
                            duration  : 2,
                            name      : 'two',
                            cls       : 'two'
                        },
                        {
                            id        : 13,
                            startDate : '2010-01-25',
                            duration  : 5,
                            name      : 'three',
                            cls       : 'three'
                        }
                    ]
                }
            ]
        }, config));
    }

    t.it('Basic drag operation', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            dependenciesData : []
        });

        const
            { tickSize }    = schedulerPro,
            rowOffsetHeight = schedulerPro.rowManager.rowOffsetHeight;

        t.chain(
            { drag : '[data-assignment-id="6"]', by : [tickSize, rowOffsetHeight] },

            { waitForProjectReady : schedulerPro },

            () => {
                t.assertAssignmentElementInTicks({ id : 6, tick : 8, row : 1, width : 2 });
                // Being multi assigned, this instance should also move
                t.assertAssignmentElementInTicks({ id : 5, tick : 8, row : 4, width : 2 });
            }
        );
    });

    t.it('Basic with dependencies', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        const { tickSize } = schedulerPro;

        t.chain(
            { drag : '[data-assignment-id="1"]', by : [tickSize, 0], desc : 'Dragging first event right' },

            { waitForProjectReady : schedulerPro },

            async() => {
                // Dragged assignment
                t.assertAssignmentElementInTicks({ id : 1, tick : 2, row : 0, width : 2 }, 'dragged event');
                // Moved by dep
                t.assertAssignmentElementInTicks({ id : 2, tick : 4, row : 1, width : 5 }, 'successor #1');
                t.assertAssignmentElementInTicks({ id : 3, tick : 9, row : 2, width : 2 }, 'successor #2');
            },

            { drag : '[data-assignment-id="1"]', by : [-tickSize, 0], desc : 'Dragging first event back' },

            async() => {
                // Dragged assignment
                t.assertAssignmentElementInTicks({ id : 1, tick : 1, row : 0, width : 2 }, 'dragged event');
                // Moved by dep
                t.assertAssignmentElementInTicks({ id : 2, tick : 3, row : 1, width : 3 }, 'successor #1');
                t.assertAssignmentElementInTicks({ id : 3, tick : 8, row : 2, width : 2 }, 'successor #2');
            },

            { drag : '[data-assignment-id="2"]', by : [tickSize, 0], desc : 'Dragging second event right' },

            async() => {
                // First assignment stays put
                t.assertAssignmentElementInTicks({ id : 1, tick : 1, row : 0, width : 2 }, 'untouched event');
                // Dragged assignment
                t.assertAssignmentElementInTicks({ id : 2, tick : 4, row : 1, width : 5 }, 'dragged event');
                // Moved by dep
                t.assertAssignmentElementInTicks({ id : 3, tick : 9, row : 2, width : 2 }, 'successor');
            }
        );
    });

    // https://github.com/bryntum/support/issues/704
    t.it('Should not crash on drag after removing successor', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        schedulerPro.eventStore.getAt(2).remove();

        await t.waitForProjectReady(schedulerPro);

        schedulerPro.eventStore.first.startDate = new Date(2020, 2, 24);

        t.pass('No crash');
    });

    t.it('Should support allowOverlap : false, valid drop', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            allowOverlap : false
        });

        t.firesAtLeastNTimes(schedulerPro.eventStore, 'update', 1);

        t.chain(
            { drag : '.b-sch-event', by : [100, 0] },

            async() => t.pass('Drag completed')
        );
    });

    t.it('Should support allowOverlap : false, invalid drop', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            allowOverlap : false
        });

        t.wontFire(schedulerPro.eventStore, 'update', 1);

        t.chain(
            { drag : '.b-sch-event:contains(Event 1)', to : '.b-sch-event:contains(Event 2)', dragOnly : true },

            async() => t.selectorExists('.b-tooltip:contains(Event overlaps)', 'Overlaps found'),

            { mouseUp : null }
        );
    });

    // https://github.com/bryntum/support/issues/2859
    t.it('Should finalize drag operation properly when async and drop is invalid', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2020, 2, 27),
            endDate   : new Date(2020, 3, 27),
            project   : {
                resourcesData : [
                    {
                        id   : 1,
                        name : 'Foo'
                    }
                ],
                assignmentsData : [
                    {
                        id       : 1,
                        event    : 1,
                        resource : 1
                    }
                ],
                eventsData : [
                    {
                        id             : 1,
                        name           : 'Annual inspection',
                        duration       : 2,
                        startDate      : new Date(2020, 2, 26),
                        constraintDate : '2020-03-26',
                        constraintType : 'mustfinishon'
                    }
                ]
            },
            listeners : {
                beforeEventDropFinalize : ({ context }) => {
                    context.async = true;
                    setTimeout(() => {
                        context.finalize(true);
                    }, 100);
                }
            }
        });

        t.wontFire(schedulerPro.eventStore, 'update', 1);

        const originalPosition = t.rect('.b-sch-event').left;
        await t.dragBy('.b-sch-event', [100, 0]);

        await t.waitFor(() => t.rect('.b-sch-event').left === originalPosition);

        t.is(t.rect('.b-sch-event').left, originalPosition, 'Event reverted back');
    });

    // https://github.com/bryntum/support/issues/3471
    t.it('Should revert drag operation when async and dropping on group header', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2020, 2, 27),
            endDate   : new Date(2020, 3, 27),
            forceFit  : true,
            features  : {
                group : 'id'
            },
            project : {
                resourcesData : [
                    {
                        id   : 1,
                        name : 'Foo'
                    }
                ],
                assignmentsData : [
                    {
                        id       : 1,
                        event    : 1,
                        resource : 1
                    }
                ],
                eventsData : [
                    {
                        id             : 1,
                        name           : 'Annual inspection',
                        duration       : 2,
                        startDate      : new Date(2020, 2, 26),
                        constraintDate : '2020-03-26',
                        constraintType : 'mustfinishon'
                    }
                ]
            },
            listeners : {
                beforeEventDropFinalize : ({ context }) => {
                    context.async = true;
                    setTimeout(() => {
                        context.finalize(true);
                    }, 100);
                }
            }
        });

        t.wontFire(schedulerPro.eventStore, 'update', 1);

        await t.dragTo({
            source : '.b-sch-event',
            target : '.b-grid-subgrid-normal .b-group-row'
        });

        await t.waitForSelectorNotFound('.b-dragging-event');
    });

    // https://github.com/bryntum/support/issues/4519
    t.it('Should handle setting inline data during drop', async t => {
        const resources = [
            { id : 1, name : 'Paint' },
            { id : 2, name : 'Cut 1' },
            { id : 3, name : 'Cut 2' }
        ];

        const events = [
            {
                id        : 10,
                name      : 'ABC101',
                startDate : '2022-04-13T08:30',
                endDate   : '2022-04-13T18:30'
            }
        ];

        const assignments = [
            { id : 1, eventId : 10, resourceId : 1 }
        ];

        schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            startDate : '2022-04-13T08:30',
            endDate   : '2022-04-13T18:30',
            project   : {
                // previously, this test was relying on the constraint set by the data loading
                // that was overriding the constraint, set during drag and drop
                // now that setting constraint during data loading is prevented,
                // need to avoid setting the constraint on drag and drop too
                // (otherwise `loadInlineData` repeats indefinitely, because of the date difference)
                addConstraintOnDateSet : false,

                eventStore : {
                    syncDataOnLoad : true,
                    data           : events
                },
                resourceStore : {
                    syncDataOnLoad : true,
                    data           : resources
                },
                assignmentStore : {
                    syncDataOnLoad : true,
                    data           : assignments
                },
                listeners : {
                    change : async({ changes }) => {
                        if (changes != null) {
                            schedulerPro.project.loadInlineData({
                                eventsData      : events,
                                resourcesData   : resources,
                                assignmentsData : assignments
                            });
                        }
                    }
                }
            }
        });

        // Drag horizontally
        await t.dragBy('.b-sch-event', [100, 0]);
        await t.waitForSelectorNotFound('.b-dragging');

        t.is(schedulerPro.eventStore.first.startDate, new Date(2022, 3, 13, 8, 30), 'startDate reset');
        t.is(schedulerPro.eventStore.first.resourceId, 1, 'resourceId unchanged');
        t.selectorExists('.b-sch-event-wrap[data-assignment-id="1"]', 'Assignment not lost');

        // Drag vertically
        await t.dragBy('.b-sch-event', [0, 100]);
        await t.waitForSelectorNotFound('.b-dragging');

        t.is(schedulerPro.eventStore.first.startDate, new Date(2022, 3, 13, 8, 30));
        t.is(schedulerPro.eventStore.first.resourceId, 1, 'resourceId reset');
        t.selectorExists('.b-sch-event-wrap[data-assignment-id="1"]', 'Assignment not lost');

        // Drag vertically up
        await t.dragBy('.b-sch-event', [0, -100]);

        await t.waitForSelectorNotFound('.b-dragging');

        t.is(schedulerPro.eventStore.first.startDate, new Date(2022, 3, 13, 8, 30), 'startDate reset');
        t.is(schedulerPro.eventStore.first.resourceId, 1, 'resourceId reset');
        t.selectorExists('.b-sch-event-wrap[data-assignment-id="1"]', 'Assignment not lost');
    });

    t.it('Should merge segments after drop', t => {

        t.beforeEach(async() => setupSchedulerWithSegments());

        t.it('drag middle piece far left, should be constrained', async t => {

            const event = schedulerPro.eventStore.first;

            await t.dragTo({
                source   : '.two',
                target   : '.one',
                dragOnly : true
            });

            const draggedPos   = t.rect('.two').left;
            const constrainPos = t.rect('.one').right;

            t.isApprox(draggedPos, constrainPos, 3, 'Constrained ok');

            await t.mouseUp();

            await t.waitFor(() => t.query('.b-sch-event-segment').length === 2);

            const { segments } = event;

            t.is(segments.length, 2, 'segment length is correct');

            t.is(segments[0].startDate, new Date(2010, 0, 18), 'segment #1 start is ok');
            t.is(segments[0].endDate, new Date(2010, 0, 21), 'segment #1 end is ok');
            t.is(segments[1].startDate, new Date(2010, 0, 25), 'segment #2 start is ok');
            t.is(segments[1].endDate, new Date(2010, 0, 30), 'segment #2 end is ok');
        });

        t.it('drag middle piece far right, should be constrained', async t => {

            const event = schedulerPro.eventStore.first;

            await t.dragTo({
                source       : '.two',
                target       : '.three',
                targetOffset : [0, '50%'],
                dragOnly     : true
            });

            const draggedPos   = t.rect('.two').right;
            const constrainPos = t.rect('.three').left;

            t.isApprox(draggedPos, constrainPos, 3, 'Constrained ok');

            await t.mouseUp();

            await t.waitFor(() => t.query('.b-sch-event-segment').length === 2);

            const { segments } = event;

            t.is(segments.length, 2, 'proper segments number found');

            t.is(segments[0].startDate, new Date(2010, 0, 18), '#0 proper segment start');
            t.is(segments[0].endDate, new Date(2010, 0, 19), '#0 proper segment end');
            t.is(segments[1].startDate, new Date(2010, 0, 25), '#1 proper segment start');
            t.is(segments[1].endDate, new Date(2010, 1, 3), '#1 proper segment end');

            await t.dragTo({
                source       : '.two',
                target       : '.one',
                targetOffset : ['99%', '50%']
            });

            await t.waitForSelectorNotFound('.b-segmented');

            t.notOk(event.segments, 'No segments');

            t.selectorCountIs('.b-sch-event-segment', 0);
        });
    });

    // https://github.com/bryntum/support/issues/3765
    t.it('Should cancel the changes when beforeUpdate on eventStore vetoes the update', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        const eventRecord = schedulerPro.eventStore.first;
        const originalDate = eventRecord.startDate;

        schedulerPro.project.eventStore.on('beforeUpdate', context => false);

        t.wontFire(schedulerPro.eventStore, 'change');

        eventRecord.startDate = new Date(2022, 2, 24);
        await schedulerPro.project.commitAsync();

        t.is(eventRecord.startDate, originalDate);
        t.is(eventRecord.get('startDate'), originalDate);
    });

    // https://github.com/bryntum/support/issues/3765
    t.it('Should cancel the changes when beforeUpdate on assignmentStore vetoes the update', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        const project = schedulerPro.project;
        const assignment = project.getAssignmentById(1);

        project.assignmentStore.on('beforeUpdate', context => false);

        t.wontFire(schedulerPro.assignmentStore, 'change');

        assignment.resource = 2;
        await project.commitAsync();

        t.is(assignment.resource, project.getResourceById(1));
    });

    t.it('Should refresh UI after drag drop when beforeUpdate on eventStore vetoes the update', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        const origRect = t.rect(schedulerPro.eventSelector);

        schedulerPro.project.eventStore.on('beforeUpdate', context => false);
        schedulerPro.project.assignmentStore.on('beforeUpdate', context => false);

        t.wontFire(schedulerPro.eventStore, 'change');
        t.wontFire(schedulerPro.assignmentStore, 'change');

        await t.dragBy({
            source : schedulerPro.eventSelector,
            delta  : [100, 100]
        });
        await t.waitForSelectorNotFound('.b-dragging');

        await schedulerPro.project.commitAsync();

        await t.waitFor(
            () => t.rect(schedulerPro.eventSelector).x === origRect.x && t.rect(schedulerPro.eventSelector).y === origRect.y
        );
    });

    t.it('Should merge segments after drop RTL', t => {

        t.beforeEach(async() => setupSchedulerWithSegments({
            startDate : new Date(2010, 0, 16),
            rtl       : true
        }));

        t.it('drag middle piece far right, should be constrained', async t => {

            const event = schedulerPro.eventStore.first;

            await t.dragTo({
                source   : '.two',
                target   : '.one',
                dragOnly : true
            });

            const draggedPos   = t.rect('.two').right;
            const constrainPos = t.rect('.one').left;

            t.isApprox(draggedPos, constrainPos, 3, 'Constrained ok');

            await t.mouseUp();

            await t.waitFor(() => t.query('.b-sch-event-segment').length === 2);

            const { segments } = event;

            t.is(segments.length, 2, 'segment length is correct');

            t.is(segments[0].startDate, new Date(2010, 0, 18), 'segment #1 start is ok');
            t.is(segments[0].endDate, new Date(2010, 0, 21), 'segment #1 end is ok');
            t.is(segments[1].startDate, new Date(2010, 0, 25), 'segment #2 start is ok');
            t.is(segments[1].endDate, new Date(2010, 0, 30), 'segment #2 end is ok');
        });

        t.it('drag middle piece far left, should be constrained', async t => {

            const event = schedulerPro.eventStore.first;

            await t.dragTo({
                source       : '.two',
                target       : '.three',
                targetOffset : [0, '50%'],
                dragOnly     : true
            });

            const draggedPos   = t.rect('.two').left;
            const constrainPos = t.rect('.three').right;

            t.isApprox(draggedPos, constrainPos, 3, 'Constrained ok');

            await t.mouseUp();

            await t.waitFor(() => t.query('.b-sch-event-segment').length === 2);

            const { segments } = event;

            t.is(segments.length, 2, 'proper segments number found');

            t.is(segments[0].startDate, new Date(2010, 0, 18), '#0 proper segment start');
            t.is(segments[0].endDate, new Date(2010, 0, 19), '#0 proper segment end');
            t.is(segments[1].startDate, new Date(2010, 0, 25), '#1 proper segment start');
            t.is(segments[1].endDate, new Date(2010, 1, 3), '#1 proper segment end');

            await t.dragTo({
                source       : '.two',
                target       : '.one',
                targetOffset : ['99%', '50%']
            });

            await t.waitForSelectorNotFound('.b-segmented');

            t.notOk(event.segments, 'No segments');

            t.selectorCountIs('.b-sch-event-segment', 0);
        });

        t.it('Scroll to the left then drag middle piece far right, should be constrained', async t => {

            await schedulerPro.scrollTo(280);

            const event = schedulerPro.eventStore.first;

            await t.dragTo({
                source   : '.two',
                target   : '.one',
                dragOnly : true
            });

            const draggedPos   = t.rect('.two').right;
            const constrainPos = t.rect('.one').left;

            t.isApprox(draggedPos, constrainPos, 3, 'Constrained ok');

            await t.mouseUp();

            await t.waitFor(() => t.query('.b-sch-event-segment').length === 2);

            const { segments } = event;

            t.is(segments.length, 2, 'segment length is correct');

            t.is(segments[0].startDate, new Date(2010, 0, 18), 'segment #1 start is ok');
            t.is(segments[0].endDate, new Date(2010, 0, 21), 'segment #1 end is ok');
            t.is(segments[1].startDate, new Date(2010, 0, 25), 'segment #2 start is ok');
            t.is(segments[1].endDate, new Date(2010, 0, 30), 'segment #2 end is ok');
        });

        t.it('Scroll to the left then drag middle piece far left, should be constrained', async t => {

            await schedulerPro.scrollTo(280);

            const event = schedulerPro.eventStore.first;

            await t.dragTo({
                source       : '.two',
                target       : '.three',
                targetOffset : [0, '50%'],
                dragOnly     : true
            });

            const draggedPos   = t.rect('.two').left;
            const constrainPos = t.rect('.three').right;

            t.isApprox(draggedPos, constrainPos, 3, 'Constrained ok');

            await t.mouseUp();

            await t.waitFor(() => t.query('.b-sch-event-segment').length === 2);

            const { segments } = event;

            t.is(segments.length, 2, 'proper segments number found');

            t.is(segments[0].startDate, new Date(2010, 0, 18), '#0 proper segment start');
            t.is(segments[0].endDate, new Date(2010, 0, 19), '#0 proper segment end');
            t.is(segments[1].startDate, new Date(2010, 0, 25), '#1 proper segment start');
            t.is(segments[1].endDate, new Date(2010, 1, 3), '#1 proper segment end');

            await t.dragTo({
                source       : '.two',
                target       : '.one',
                targetOffset : ['99%', '50%']
            });

            await t.waitForSelectorNotFound('.b-segmented');

            t.notOk(event.segments, 'No segments');

            t.selectorCountIs('.b-sch-event-segment', 0);
        });
    });

    // https://github.com/bryntum/support/issues/6041
    t.it('Should respect getDateConstraints', async t => {
        const
            minStart = new Date(2020, 2, 23, 0, 2),
            maxEnd   = new Date(2020, 2, 23, 16, 10);

        schedulerPro = new SchedulerPro({
            project : {
                resources : [
                    {
                        id   : 1,
                        name : 'Resource 1'
                    }
                ],
                events : [{
                    id           : 1,
                    name         : 'Event A',
                    startDate    : '2020-03-23T03:00',
                    duration     : 111,
                    durationUnit : 'minutes'
                }],
                assignments : [{
                    id       : 1,
                    event    : 1,
                    resource : 1
                }
                ]
            },

            appendTo   : document.body,
            startDate  : '2020-03-23',
            endDate    : '2020-03-24',
            rowHeight  : 40,
            barMargin  : 10,
            viewPreset : 'hourAndDay',
            getDateConstraints() {
                return {
                    start : minStart,
                    end   : maxEnd
                };
            },
            features : {
                eventDrag : {
                    constrainDragToResource : false,
                    unifiedDrag             : false,
                    showExactDropPosition   : true
                }
            },

            timeResolution : {
                unit      : 'minute',
                increment : 1
            },
            shiftIncrement : 1,
            shiftUnit      : 'minute',
            columns        : [
                {
                    text       : 'Resource',
                    width      : 150,
                    field      : 'name',
                    htmlEncode : false
                }
            ]
        });

        schedulerPro.zoomOut();
        await t.dragBy({
            source : '.b-sch-event',
            delta  : [-100, 0]
        });

        await t.waitForSelectorNotFound('.b-dragging');

        t.is(schedulerPro.eventStore.first.startDate, minStart, 'constrained start date');

        await t.dragBy({
            source : '.b-sch-event',
            delta  : [500, 0]
        });
        await t.waitForSelectorNotFound('.b-dragging');

        t.is(schedulerPro.eventStore.first.endDate, maxEnd, 'constrained end date');
    });
});
