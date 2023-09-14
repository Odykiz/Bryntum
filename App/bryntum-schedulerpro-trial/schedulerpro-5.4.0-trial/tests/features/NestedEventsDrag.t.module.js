
StartTest(t => {

    let schedulerPro, bottomSchedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
        bottomSchedulerPro?.destroy();
    });

    const
        create         = async(config = {}) => await t.getSchedulerProAsync({
            features : {
                nestedEvents : {
                    barMargin : 0
                }
            },

            startDate             : new Date(2022, 0, 2),
            endDate               : new Date(2022, 0, 9),
            rowHeight             : 100,
            enableEventAnimations : false,

            eventsData : [
                {
                    id        : 1,
                    startDate : new Date(2022, 0, 2),
                    duration  : 5,
                    name      : 'Parent 1',
                    children  : [
                        {
                            id        : 11,
                            startDate : new Date(2022, 0, 2),
                            duration  : 2,
                            name      : 'Child 11'
                        },
                        {
                            id        : 12,
                            startDate : new Date(2022, 0, 5),
                            duration  : 2,
                            name      : 'Child 12'
                        }
                    ]
                },
                {
                    id        : 2,
                    startDate : new Date(2022, 0, 3),
                    duration  : 5,
                    name      : 'Parent 2',
                    children  : [
                        {
                            id        : 21,
                            startDate : new Date(2022, 0, 3),
                            duration  : 2,
                            name      : 'Child 21'
                        },
                        {
                            id        : 22,
                            startDate : new Date(2022, 0, 3),
                            duration  : 3,
                            name      : 'Child 22'
                        }
                    ]
                },
                {
                    id        : 3,
                    startDate : new Date(2022, 0, 4),
                    duration  : 4,
                    name      : 'Event 3'
                }
            ],

            assignmentsData : [
                { id : 1, event : 1, resource : 'r1' },
                { id : 11, event : 11, resource : 'r1' },
                { id : 12, event : 12, resource : 'r1' },
                { id : 2, event : 2, resource : 'r2' },
                { id : 21, event : 21, resource : 'r2' },
                { id : 22, event : 22, resource : 'r2' },
                { id : 3, event : 3, resource : 'r5' }
            ],

            resourcesData : [
                { id : 'r1', name : 'Mike' },
                { id : 'r2', name : 'Linda' },
                { id : 'r3', name : 'Don' },
                { id : 'r4', name : 'Karen' },
                { id : 'r5', name : 'Doug' }
            ],

            dependenciesData : [],

            ...config
        }),
        setup          = async(config = {}) => {
            schedulerPro = await create(config);
        },
        getEventBounds = eventId => Rectangle.from(t.query(`$event=${eventId}`)[0], schedulerPro.timeAxisSubGridElement);

    t.it('Should be possible to constrain drag to parent', async t => {
        await setup({
            features : {
                nestedEvents : {
                    constrainDragToParent : true
                }
            }
        });

        const
            initialParentBounds = getEventBounds(2),
            event               = schedulerPro.eventStore.getEventById(21),
            initialParent       = event.parent;

        t.diag('Drag left');

        await t.dragBy({
            source   : '$event=21',
            delta    : [-200, 0],
            dragOnly : true
        });

        let childBounds  = getEventBounds(21),
            parentBounds = getEventBounds(2);

        t.ok(initialParentBounds.equals(parentBounds), 'Parent bounds unchanged');
        t.isApproxPx(childBounds.left, parentBounds.left, 'Child constraint to parent left');

        t.diag('Drag right');

        await t.moveMouseBy([400, 0]);

        childBounds = getEventBounds(21);
        parentBounds = getEventBounds(2);

        t.ok(initialParentBounds.equals(parentBounds), 'Parent bounds unchanged');
        t.isApproxPx(childBounds.right, parentBounds.right, 'Child constraint to parent right');

        t.diag('Drag up');

        await t.moveMouseBy([0, -100]);

        childBounds = getEventBounds(21);
        parentBounds = getEventBounds(2);

        t.ok(initialParentBounds.equals(parentBounds), 'Parent bounds unchanged');
        t.isApproxPx(childBounds.top, parentBounds.top + 20, 'Child constraint to parent top'); // 20 for event header

        t.diag('Drag down');

        await t.moveMouseBy([0, 200]);

        childBounds = getEventBounds(21);
        parentBounds = getEventBounds(2);

        t.ok(initialParentBounds.equals(parentBounds), 'Parent bounds unchanged');
        t.isApproxPx(childBounds.bottom, parentBounds.bottom, 'Child constraint to parent bottom');

        await t.mouseUp();

        t.is(event.parent, initialParent, 'Still a child of the same parent');
        t.is(event.startDate, new Date(2022, 0, 4), 'Date updated');
    });

    t.it('Should be possible to drop on resource using `allowDeNestingOnDrop: true`', async t => {
        await setup({
            features : {
                nestedEvents : {
                    constrainDragToParent : false, // default
                    allowDeNestingOnDrop  : true // default
                }
            }
        });

        const event = schedulerPro.eventStore.getById(22);

        t.dragTo({
            source       : '$event=22',
            target       : '[data-id="r4"] .b-sch-timeaxis-cell',
            targetOffset : [schedulerPro.tickSize * 3, 30]
        });

        await t.waitFor(() => event.parent.isRoot);

        t.ok(event.parent.isRoot, 'Event moved out of parent');
        t.is(event.resource.id, 'r4', 'Reassigned');
        t.is(event.startDate, new Date(2022, 0, 4), 'Correct startDate');
    });

    t.it('Should not be possible to drop on resource with `allowDeNestingOnDrop: false`', async t => {
        await setup({
            features : {
                nestedEvents : {
                    constrainDragToParent : false, // default
                    allowDeNestingOnDrop  : false
                }
            }
        });

        const event = schedulerPro.eventStore.getById(22);

        await t.dragTo({
            source       : '$event=22',
            target       : '[data-id="r4"] .b-sch-timeaxis-cell',
            targetOffset : [schedulerPro.tickSize * 3, 30]
        });

        await t.waitForAnimations();

        t.is(event.parent.id, 2, 'Event kept its parent');
        t.is(event.resource.id, 'r2', 'It was not reassigned');
        t.is(event.startDate, new Date(2022, 0, 3), 'Correct startDate');
    });

    t.it('Should be possible to nest an ordinary event with `allowNesting : true`', async t => {
        await setup({
            features : {
                nestedEvents : {
                    allowNestingOnDrop : true // default
                }
            }
        });

        const event = schedulerPro.eventStore.getById(3);

        await t.dragTo({
            source       : '$event=3',
            target       : '$event=1',
            targetOffset : [30, 30]
        });

        t.is(event.parent.id, 1, 'Moved to parent');
        t.is(event.resource.id, 'r1', 'Reassigned');
        t.is(event.startDate, new Date(2022, 0, 3), 'Correct startDate');
    });

    t.it('Should not be possible to nest an ordinary event with `allowNesting : false`', async t => {
        await setup({
            features : {
                nestedEvents : {
                    allowNestingOnDrop : false
                }
            }
        });

        const event = schedulerPro.eventStore.getById(3);

        await t.dragTo({
            source       : '$event=3',
            sourceOffset : [15, 20],
            target       : '$event=1',
            targetOffset : [15, 20]
        });

        t.ok(event.parent.isRoot, 'Still no parent');
        t.is(event.resource.id, 'r5', 'Not reassigned');
        t.is(event.startDate, new Date(2022, 0, 4), 'Correct startDate');
    });

    t.it('Should be possible to move nested event to existing parent with `allowNesting : true`', async t => {
        await setup({
            features : {
                nestedEvents : {
                    constrainDragToParent : false, // default
                    allowNestingOnDrop    : true // default
                }
            }
        });

        const event = schedulerPro.eventStore.getById(22);

        await t.dragTo({
            source       : '$event=22',
            sourceOffset : [15, '50%'],
            target       : '$event=1',
            targetOffset : [schedulerPro.tickSize, '50%']
        });

        t.is(event.parent.id, 1, 'Moved to parent');
        t.is(event.resource.id, 'r1', 'Reassigned');
        t.is(event.startDate, new Date(2022, 0, 4), 'Correct startDate');
    });

    t.it('Should not be possible to move nested event to existing parent with `allowNesting : false`', async t => {
        await setup({
            features : {
                nestedEvents : {
                    constrainDragToParent : false, // default
                    allowNestingOnDrop    : false // default
                }
            }
        });

        const event = schedulerPro.eventStore.getById(22);

        await t.dragTo({
            source       : '$event=22',
            sourceOffset : [15, '50%'],
            target       : '$event=1',
            targetOffset : [schedulerPro.tickSize, '50%']
        });

        t.is(event.parent.id, 2, 'Stayed in parent');
        t.is(event.resource.id, 'r2', 'Not reassigned');
        t.is(event.startDate, new Date(2022, 0, 3), 'Correct startDate');
    });

    t.it('Should be possible to move nested event into leaf with `allowNesting : true`', async t => {
        await setup({
            features : {
                nestedEvents : {
                    constrainDragToParent : false, // default
                    allowNestingOnDrop    : true // default
                }
            }
        });

        const event = schedulerPro.eventStore.getById(22);

        await t.dragTo({
            source       : '$event=22',
            sourceOffset : [15, '50%'],
            target       : '$event=3',
            targetOffset : [schedulerPro.tickSize, '50%']
        });

        t.is(event.parent.id, 3, 'Moved to parent');
        t.is(event.resource.id, 'r5', 'Reassigned');
        t.is(event.startDate, new Date(2022, 0, 5), 'Correct startDate');
    });

    t.it('Should not be possible to move nested event into leaf with `allowNesting : false`', async t => {
        await setup({
            features : {
                nestedEvents : {
                    constrainDragToParent : false, // default
                    allowNestingOnDrop    : false // default
                }
            }
        });

        const event = schedulerPro.eventStore.getById(22);

        await t.dragTo({
            source       : '$event=22',
            sourceOffset : [15, '50%'],
            target       : '$event=3',
            targetOffset : [schedulerPro.tickSize, '50%']
        });

        t.is(event.parent.id, 2, 'Stayed in parent');
        t.is(event.resource.id, 'r2', 'Not reassigned');
        t.is(event.startDate, new Date(2022, 0, 3), 'Correct startDate');
    });

    t.it('Should update children when dragging parent to new time', async t => {
        await setup();

        const parent = schedulerPro.eventStore.getById(1);

        await t.dragBy({
            source : '$event=1 .b-sch-event-content',
            delta  : [schedulerPro.tickSize, 0]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(parent.startDate, new Date(2022, 0, 4), 'Parent moved');
        t.is(parent.children[0].startDate, new Date(2022, 0, 4), 'Child #1 moved');
        t.is(parent.children[1].startDate, new Date(2022, 0, 6), 'Child #2 moved');
    });

    t.it('Should reassign children when dragging parent to new resource', async t => {
        await setup();

        const parent = schedulerPro.eventStore.getById(1);

        await t.dragTo({
            source : '$event=1 .b-sch-event-content',
            target : '[data-id="r3"] .b-timeaxis-cell'
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(parent.resource.id, 'r3', 'Parent reassigned');
        t.is(parent.children[0].resource.id, 'r3', 'Child #1 reassigned');
        t.is(parent.children[1].resource.id, 'r3', 'Child #2 reassigned');
    });

    t.it('Should handle dragging multiple nested events, within parent', async t => {
        await setup();

        const
            event21  = schedulerPro.eventStore.getById(21),
            event22  = schedulerPro.eventStore.getById(22),
            start21  = event21.startDate,
            start22  = event22.startDate,
            parent21 = event21.parent,
            parent22 = event22.parent;

        schedulerPro.selectedEvents = [event21, event22];

        await t.dragBy({
            source : '$event=21',
            delta  : [schedulerPro.tickSize, 0]
        });

        t.isGreater(event21.startDate, start21, 'First nested moved');
        t.isGreater(event22.startDate, start22, 'Second nested moved');
        t.is(event21.parent, parent21, 'First parent did not change');
        t.is(event22.parent, parent22, 'Second parent did not change');
    });

    t.it('Should handle dragging multiple nested events, to another parent', async t => {
        await setup();

        const
            event21 = schedulerPro.eventStore.getById(21),
            event22 = schedulerPro.eventStore.getById(22);

        schedulerPro.selectedEvents = [event21, event22];

        await t.dragTo({
            source : '$event=21',
            target : '$event=1'
        });

        t.is(event21.parent.id, 1, 'First parent changed');
        t.is(event22.parent.id, 1, 'Second parent changed');
    });

    t.it('Should not crash with constrainDragToTimeline turned off', async t => {
        await setup({
            features : {
                nestedEvents : true,

                eventDrag : {
                    constrainDragToTimeline : false
                }
            }
        });

        const event21 = schedulerPro.eventStore.getById(21);

        await t.dragTo({
            source : '$event=21',
            target : '$event=1'
        });

        t.is(event21.parent.id, 1, 'Parent changed');
    });

    t.it('Should allow nesting in other scheduler', async t => {
        await setup({
            cls : 'top',

            features : {
                nestedEvents : true,

                eventDrag : {
                    constrainDragToTimeline : false
                }
            },

            height : 350
        });

        bottomSchedulerPro = await create({
            cls : 'bottom',

            features : {
                nestedEvents : true,

                eventDrag : {
                    constrainDragToTimeline : false
                }
            },

            height : 350,

            eventsData : [
                {
                    id        : 1,
                    startDate : new Date(2022, 0, 2),
                    duration  : 5,
                    name      : 'Parent 1',
                    children  : []
                }
            ],

            assignmentsData : [
                { id : 1, event : 1, resource : 'r1' }
            ]
        });

        await t.waitForEventOnTrigger(bottomSchedulerPro, 'eventDrop', () => {
            t.dragTo({
                source : '$event=21',
                target : '.bottom [data-event-id="1"]'
            });
        });

        t.is(bottomSchedulerPro.eventStore.getById(1).firstChild.name, 'Child 21', 'Moved to parent in bottom scheduler');
        t.notOk(schedulerPro.eventStore.getById(21), 'No longer part of top schedulers eventStore');

        t.selectorNotExists('.top $event=21', 'Event element not found in top scheduler');
        t.selectorExists('.bottom $event=21', 'Event element found in bottom scheduler');
    });

    t.it('Should allow de-nesting in other scheduler', async t => {
        await setup({
            cls : 'top',

            features : {
                nestedEvents : true,

                eventDrag : {
                    constrainDragToTimeline : false
                }
            },

            height : 350
        });

        bottomSchedulerPro = await create({
            cls : 'bottom',

            features : {
                nestedEvents : true,

                eventDrag : {
                    constrainDragToTimeline : false
                }
            },

            height : 350,

            eventsData : [
                {
                    id        : 1,
                    startDate : new Date(2022, 0, 2),
                    duration  : 5,
                    name      : 'Parent 1',
                    children  : []
                }
            ],

            assignmentsData : [
                { id : 1, event : 1, resource : 'r1' }
            ]
        });

        await t.waitForEventOnTrigger(bottomSchedulerPro, 'eventDrop', () => {
            t.dragTo({
                source : '$event=21',
                target : '.bottom [data-id=r2] .b-timeaxis-cell'
            });
        });

        t.ok(bottomSchedulerPro.eventStore.getById(21).parent.isRoot, 'Moved to root in bottom scheduler');
        t.notOk(schedulerPro.eventStore.getById(21), 'No longer part of top schedulers eventStore');

        t.selectorNotExists('.top $event=21', 'Event element not found in top scheduler');
        t.selectorExists('.bottom $event=21', 'Event element found in bottom scheduler');
    });

    t.it('Should support moving parent to other scheduler', async t => {
        await setup({
            cls : 'top',

            features : {
                nestedEvents : true,

                eventDrag : {
                    constrainDragToTimeline : false
                }
            },

            height : 350
        });

        bottomSchedulerPro = await create({
            cls : 'bottom',

            features : {
                nestedEvents : true,

                eventDrag : {
                    constrainDragToTimeline : false
                }
            },

            height : 350,

            eventsData : [],

            assignmentsData : []
        });

        await t.waitForEventOnTrigger(bottomSchedulerPro, 'eventDrop', () => {
            t.dragTo({
                source       : '$event=2',
                sourceOffset : [5, 5],
                target       : '.bottom [data-id=r1] .b-timeaxis-cell'
            });
        });

        t.is(bottomSchedulerPro.eventStore.allCount, 3, 'Parent + children moved to bottom schedulers eventStore');
        t.is(bottomSchedulerPro.assignmentStore.count, 3, 'Assigned in bottom scheduler');

        t.is(schedulerPro.eventStore.allCount, 4, 'Removed from top schedulers eventStore');
        t.is(schedulerPro.assignmentStore.count, 4, 'Removed from top schedulers assignmentStore');

        t.selectorCountIs('.bottom .b-sch-event', 3, '3 event elements in bottom scheduler');
    });

    t.it('Should resolve correct resource', async t => {
        await setup();

        schedulerPro.eventStore.getById(11).remove();
        schedulerPro.eventStore.getById(12).remove();

        await t.dragTo({
            source       : '$event=1',
            sourceOffset : [5, 5],
            target       : '$event=2',
            targetOffset : [5, '95%']
        });

        await schedulerPro.project.commitAsync();

        const event = schedulerPro.eventStore.getById(1);

        t.is(event.resourceId, 'r2', 'Resource resolved correctly');
        t.is(event.parent.id, 2, 'Correct new parent');
    });
});
