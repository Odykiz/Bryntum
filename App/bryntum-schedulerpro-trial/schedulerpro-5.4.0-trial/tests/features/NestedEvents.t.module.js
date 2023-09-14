
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = await t.getSchedulerProAsync({
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
                }
            ],

            assignmentsData : [
                { id : 1, event : 1, resource : 'r1' },
                { id : 11, event : 11, resource : 'r1' },
                { id : 12, event : 12, resource : 'r1' },
                { id : 2, event : 2, resource : 'r2' },
                { id : 21, event : 21, resource : 'r2' },
                { id : 22, event : 22, resource : 'r2' }
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
        });
    }

    t.it('Should pack by default', async t => {
        await setup();

        // Check that all events rendered
        t.selectorCountIs('.b-sch-event-wrap.b-nested-events-parent', 2, '2 parent events found');
        t.selectorCountIs('.b-sch-event-wrap.b-nested-event', 4, '4 nested events found');

        // Parent events should have same height
        t.hasHeight('.b-sch-event-wrap.b-nested-events-parent[data-event-id="1"]', 80, 'Parent 1 has correct height');
        t.hasHeight('.b-sch-event-wrap.b-nested-events-parent[data-event-id="2"]', 80, 'Parent 2 has correct height');

        const
            parent1Bounds = Rectangle.from(t.query('$event=1')[0], schedulerPro.timeAxisSubGridElement),
            nested11      = Rectangle.from(t.query('$event=11')[0], schedulerPro.timeAxisSubGridElement),
            nested12      = Rectangle.from(t.query('$event=12')[0], schedulerPro.timeAxisSubGridElement),
            parent2Bounds = Rectangle.from(t.query('$event=2')[0], schedulerPro.timeAxisSubGridElement),
            nested21      = Rectangle.from(t.query('$event=21')[0], schedulerPro.timeAxisSubGridElement),
            nested22      = Rectangle.from(t.query('$event=22')[0], schedulerPro.timeAxisSubGridElement);

        // Nested events should be positioned inside their parent
        t.ok(parent1Bounds.contains(nested11), 'Nested #11 contained in parent');
        t.ok(parent1Bounds.contains(nested12), 'Nested #12 contained in parent');
        t.ok(parent2Bounds.contains(nested21), 'Nested #21 contained in parent');
        t.ok(parent2Bounds.contains(nested22), 'Nested #22 contained in parent');

        // They should have height depending on overlap
        t.is(nested11.height, 60, 'Correct height for #11');
        t.is(nested12.height, 60, 'Correct height for #12');
        t.is(nested21.height, 30, 'Correct height for #21 (stacked)');
        t.is(nested22.height, 30, 'Correct height for #22 (stacked)');

        // They should have correct top
        t.is(t.query('$event=11')[0].style.top, '0px', 'Correct top for #11');
        t.is(t.query('$event=12')[0].style.top, '0px', 'Correct top for #12');
        t.is(t.query('$event=21')[0].style.top, '30px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '0px', 'Correct top for #22');
    });

    t.it('Should support overlap', async t => {
        await setup({
            features : {
                nestedEvents : {
                    eventLayout : 'none'
                }
            }
        });

        // Parent events should have same height
        t.hasHeight('.b-sch-event-wrap.b-nested-events-parent[data-event-id="1"]', 80, 'Parent 1 has correct height');
        t.hasHeight('.b-sch-event-wrap.b-nested-events-parent[data-event-id="2"]', 80, 'Parent 2 has correct height');

        const
            parent1Bounds = Rectangle.from(t.query('$event=1')[0], schedulerPro.timeAxisSubGridElement),
            nested11      = Rectangle.from(t.query('$event=11')[0], schedulerPro.timeAxisSubGridElement),
            nested12      = Rectangle.from(t.query('$event=12')[0], schedulerPro.timeAxisSubGridElement),
            parent2Bounds = Rectangle.from(t.query('$event=2')[0], schedulerPro.timeAxisSubGridElement),
            nested21      = Rectangle.from(t.query('$event=21')[0], schedulerPro.timeAxisSubGridElement),
            nested22      = Rectangle.from(t.query('$event=22')[0], schedulerPro.timeAxisSubGridElement);

        // Nested events should be positioned inside their parent
        t.ok(parent1Bounds.contains(nested11), 'Nested #11 contained in parent');
        t.ok(parent1Bounds.contains(nested12), 'Nested #12 contained in parent');
        t.ok(parent2Bounds.contains(nested21), 'Nested #21 contained in parent');
        t.ok(parent2Bounds.contains(nested22), 'Nested #22 contained in parent');

        // They should have height depending on overlap
        t.is(nested11.height, 60, 'Correct height for #11');
        t.is(nested12.height, 60, 'Correct height for #12');
        t.is(nested21.height, 60, 'Correct height for #21 (stacked)');
        t.is(nested22.height, 60, 'Correct height for #22 (stacked)');

        // They should have correct top
        t.is(t.query('$event=11')[0].style.top, '0px', 'Correct top for #11');
        t.is(t.query('$event=12')[0].style.top, '0px', 'Correct top for #12');
        t.is(t.query('$event=21')[0].style.top, '0px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '0px', 'Correct top for #22');
    });

    t.it('Should support stack', async t => {
        await setup({
            features : {
                nestedEvents : {
                    eventLayout : 'stack',
                    eventHeight : 15,
                    barMargin   : 10
                }
            }
        });

        // Parent events should have same height
        t.hasHeight('.b-sch-event-wrap.b-nested-events-parent[data-event-id="1"]', 80, 'Parent 1 has correct height');
        t.hasHeight('.b-sch-event-wrap.b-nested-events-parent[data-event-id="2"]', 80, 'Parent 2 has correct height');

        const
            parent1Bounds = Rectangle.from(t.query('$event=1')[0], schedulerPro.timeAxisSubGridElement),
            nested11      = Rectangle.from(t.query('$event=11')[0], schedulerPro.timeAxisSubGridElement),
            nested12      = Rectangle.from(t.query('$event=12')[0], schedulerPro.timeAxisSubGridElement),
            parent2Bounds = Rectangle.from(t.query('$event=2')[0], schedulerPro.timeAxisSubGridElement),
            nested21      = Rectangle.from(t.query('$event=21')[0], schedulerPro.timeAxisSubGridElement),
            nested22      = Rectangle.from(t.query('$event=22')[0], schedulerPro.timeAxisSubGridElement);

        // Nested events should be positioned inside their parent
        t.ok(parent1Bounds.contains(nested11), 'Nested #11 contained in parent');
        t.ok(parent1Bounds.contains(nested12), 'Nested #12 contained in parent');
        t.ok(parent2Bounds.contains(nested21), 'Nested #21 contained in parent');
        t.ok(parent2Bounds.contains(nested22), 'Nested #22 contained in parent');

        // They should have fixed height
        t.is(nested11.height, 15, 'Correct height for #11');
        t.is(nested12.height, 15, 'Correct height for #12');
        t.is(nested21.height, 15, 'Correct height for #21 (stacked)');
        t.is(nested22.height, 15, 'Correct height for #22 (stacked)');

        // They should have correct top
        t.is(t.query('$event=11')[0].style.top, '0px', 'Correct top for #11');
        t.is(t.query('$event=12')[0].style.top, '0px', 'Correct top for #12');
        t.is(t.query('$event=21')[0].style.top, '25px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '0px', 'Correct top for #22');
    });

    t.it('Should support configuring barMargin', async t => {
        await setup({
            features : {
                nestedEvents : {
                    barMargin : 10
                }
            }
        });

        const
            nested11 = Rectangle.from(t.query('$event=11')[0], schedulerPro.timeAxisSubGridElement),
            nested12 = Rectangle.from(t.query('$event=12')[0], schedulerPro.timeAxisSubGridElement),
            nested21 = Rectangle.from(t.query('$event=21')[0], schedulerPro.timeAxisSubGridElement),
            nested22 = Rectangle.from(t.query('$event=22')[0], schedulerPro.timeAxisSubGridElement);

        // Correct height with barMargin
        t.is(nested11.height, 60, 'Correct height for #11');
        t.is(nested12.height, 60, 'Correct height for #12');
        t.is(nested21.height, 25, 'Correct height for #21 (stacked)');
        t.is(nested22.height, 25, 'Correct height for #22 (stacked)');

        // And correct top
        t.is(t.query('$event=11')[0].style.top, '0px', 'Correct top for #11');
        t.is(t.query('$event=12')[0].style.top, '0px', 'Correct top for #12');
        t.is(t.query('$event=21')[0].style.top, '35px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '0px', 'Correct top for #22');

        schedulerPro.features.nestedEvents.barMargin = 20;

        await schedulerPro.rowManager.await('refresh', false);

        // Correct height with changed barMargin
        t.hasHeight('$event=21', 20, 'Correct height for #21 (stacked)');
        t.hasHeight('$event=22', 20, 'Correct height for #22 (stacked)');

        // And correct top
        t.is(t.query('$event=21')[0].style.top, '40px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '0px', 'Correct top for #22');
    });

    t.it('Should support configuring resourceMargin', async t => {
        await setup({
            features : {
                nestedEvents : {
                    resourceMargin : 5
                }
            }
        });

        // Correct height with barMargin
        t.hasHeight('$event=11', 50, 'Correct height for #11');
        t.hasHeight('$event=12', 50, 'Correct height for #12');
        t.hasHeight('$event=21', 22.5, 'Correct height for #21 (stacked)');
        t.hasHeight('$event=22', 22.5, 'Correct height for #22 (stacked)');

        // And correct top
        t.is(t.query('$event=11')[0].style.top, '5px', 'Correct top for #11');
        t.is(t.query('$event=12')[0].style.top, '5px', 'Correct top for #12');
        t.is(t.query('$event=21')[0].style.top, '32.5px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '5px', 'Correct top for #22');

        schedulerPro.features.nestedEvents.resourceMargin = 10;
        await schedulerPro.rowManager.await('refresh', false);

        // Correct height with changed barMargin
        t.hasHeight('$event=21', 17.5, 'Correct height for #21 (stacked)');
        t.hasHeight('$event=22', 17.5, 'Correct height for #22 (stacked)');

        // And correct top
        t.is(t.query('$event=21')[0].style.top, '32.5px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '10px', 'Correct top for #22');
    });

    t.it('Should support configuring headerHeight', async t => {
        await setup({
            features : {
                nestedEvents : {
                    headerHeight : 45
                }
            }
        });

        t.diag('Initially, 45');

        t.hasApproxHeight('$event=1 > .b-sch-event > .b-sch-event-content', 45, 'Correct header height');

        // Correct height initially
        t.hasApproxHeight('$event=11', 35, 'Correct height for #11');
        t.hasApproxHeight('$event=12', 35, 'Correct height for #12');
        t.hasApproxHeight('$event=21', 15, 'Correct height for #21 (stacked)');
        t.hasApproxHeight('$event=22', 15, 'Correct height for #22 (stacked)');

        // And correct top
        t.is(t.query('$event=11')[0].style.top, '0px', 'Correct top for #11');
        t.is(t.query('$event=12')[0].style.top, '0px', 'Correct top for #12');
        t.is(t.query('$event=21')[0].style.top, '20px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '0px', 'Correct top for #22');

        t.diag('Changed, 15');

        schedulerPro.features.nestedEvents.headerHeight = 15;
        await schedulerPro.rowManager.await('refresh', false);

        t.hasApproxHeight('$event=1 > .b-sch-event > .b-sch-event-content', 15, 'Correct header height');

        // Correct height initially
        t.hasApproxHeight('$event=11', 65, 'Correct height for #11');
        t.hasApproxHeight('$event=12', 65, 'Correct height for #12');
        t.hasApproxHeight('$event=21', 30, 'Correct height for #21 (stacked)');
        t.hasApproxHeight('$event=22', 30, 'Correct height for #22 (stacked)');

        // And correct top
        t.is(t.query('$event=11')[0].style.top, '0px', 'Correct top for #11');
        t.is(t.query('$event=12')[0].style.top, '0px', 'Correct top for #12');
        t.is(t.query('$event=21')[0].style.top, '35px', 'Correct top for #21');
        t.is(t.query('$event=22')[0].style.top, '0px', 'Correct top for #22');
    });

    t.it('Should get nested event element from assignment', async t => {
        await setup();

        const element = schedulerPro.getElementFromAssignmentRecord(schedulerPro.assignmentStore.getById(11));
        t.is(element, t.query('$event=11 .b-sch-event')[0], 'Got the nested event');

        const wrapper = schedulerPro.getElementFromAssignmentRecord(schedulerPro.assignmentStore.getById(11), true);
        t.is(wrapper, t.query('$event=11')[0], 'Got the nested event wrapper');
    });

    t.it('Should display percent bar in nested events', async t => {
        await setup({
            features : {
                nestedEvents : true,
                percentBar   : true
            },

            eventsData : [
                {
                    id        : 1,
                    startDate : new Date(2022, 0, 2),
                    duration  : 5,
                    name      : 'Parent 1',
                    children  : [
                        {
                            id          : 11,
                            startDate   : new Date(2022, 0, 2),
                            duration    : 2,
                            name        : 'Child 11',
                            percentDone : 50
                        },
                        {
                            id          : 12,
                            startDate   : new Date(2022, 0, 5),
                            duration    : 2,
                            name        : 'Child 12',
                            percentDone : 10
                        }
                    ]
                }
            ]
        });

        t.selectorCountIs('.b-nested-event .b-task-percent-bar-outer', 2, 'Percent bar found in nested events');
    });

    t.it('Should not display percent bar handle for parent events', async t => {
        await setup({
            features : {
                nestedEvents : true,
                percentBar   : true
            },

            eventsData : [
                {
                    id                : 1,
                    startDate         : new Date(2022, 0, 3),
                    duration          : 3,
                    manuallyScheduled : true,
                    name              : 'Parent 1',
                    children          : []
                }
            ]
        });

        await t.moveMouseTo('$event=1');

        t.selectorNotExists('.b-task-percent-bar-handle', 'Handle not shown');
    });

    t.it('Should unhover when leaving parent over child', async t => {
        await setup();

        // Hover parent (empty part)

        await t.moveMouseTo({
            target : '$event=2',
            offset : ['100%-5', '100%-5']
        });

        await t.waitForSelector('$event=2.b-sch-event-hover');

        // Move to child

        await t.moveMouseTo('$event=21');

        t.selectorExists('$event=2.b-sch-event-hover', 'Parent still hovered when hovering child');

        await t.moveMouseBy([0, 100]);

        t.selectorNotExists('.b-sch-event-hover', 'Nothing hovered');
    });

    t.it('Should support custom overlap sorter', async t => {
        await setup({
            features : {
                nestedEvents : {
                    overlappingEventSorter : (a, b) => a.id - b.id
                }
            }
        });

        t.isGreater(t.rect('$event=22').top, t.rect('$event=21').top, 'overlappingEventSorter applied');
    });

    t.it('Should support nested event tooltip', async t => {
        await setup();

        await t.moveMouseTo({
            target : '$event=1',
            offset : [10, 10]
        });

        await t.waitForSelector('.b-tooltip:contains(Parent 1)');

        await t.moveMouseTo('$event=11');

        await t.waitForSelector('.b-tooltip:contains(Child 11)');

        t.pass('Tooltip shown');
    });

    t.it('Should support scrolling nested event into view', async t => {
        await setup({
            startDate : new Date(2021, 0, 2),
            endDate   : new Date(2021, 0, 9)
        });

        t.selectorNotExists('[data-event-id="11"]', 'Event not in view');

        await schedulerPro.scrollEventIntoView(schedulerPro.eventStore.getById(11));

        await t.waitForSelector('[data-event-id="11"]');

        t.pass('Event in view');
    });

    // https://github.com/bryntum/support/issues/6376
    t.it('Should support showing resource non-working time with nested events', async t => {
        t.mockUrl('url', {
            responseText : JSON.stringify({
                success   : true,
                calendars : {
                    rows : [
                        {
                            id                       : 'Test CNC',
                            name                     : 'Test CNC',
                            unspecifiedTimeIsWorking : true,
                            intervals                : [
                                {
                                    name      : 'Offshift',
                                    startDate : '2022-03-29T20:30:00',
                                    endDate   : '2022-03-29T21:30:00',
                                    isWorking : false
                                }
                            ]
                        }
                    ]
                },
                resources : {
                    rows : [
                        {
                            id       : 1,
                            name     : 'Celia',
                            rating   : 4,
                            calendar : 'Test CNC'
                        }
                    ]
                },
                events : {
                    rows : []
                },
                assignments : {
                    rows : []
                }
            }
            )
        });

        schedulerPro = new SchedulerPro({
            appendTo   : document.body,
            startDate  : new Date(2022, 2, 29, 14),
            endDate    : new Date(2022, 2, 29, 22),
            viewPreset : 'hourAndDay',
            rowHeight  : 90,
            barMargin  : 10,
            project    : {
                autoLoad  : true,
                transport : {
                    load : {
                        url : 'url'
                    }
                }
            },
            features : {
                resourceNonWorkingTime : true,
                nestedEvents           : true
            },
            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ]
        });

        await t.waitForSelector('.b-sch-resourcenonworkingtime');
    });

    // https://github.com/bryntum/support/issues/6376
    t.it('Should only select parent events when drag selecting', async t => {
        schedulerPro = setup({
            features : {
                nestedEvents    : true,
                eventDragSelect : true
            }
        });

        await t.dragBy({
            source : '.b-sch-timeaxis-cell',
            offset : [5, 5],
            delta  : [200, 200]
        });

        t.is(schedulerPro.selectedEvents.length, 2);
        t.isDeeply(schedulerPro.selectedEvents.map(ev => Array.isArray(ev.children)), [true, true], 'Only selected parent event');
    });
});
