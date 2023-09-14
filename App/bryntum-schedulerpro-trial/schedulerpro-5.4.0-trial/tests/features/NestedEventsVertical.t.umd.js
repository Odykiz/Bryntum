
StartTest(t => {
    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = new SchedulerPro({
            appendTo : document.body,

            features : {
                nestedEvents : {
                    barMargin : 0
                }
            },

            startDate             : new Date(2022, 0, 2),
            endDate               : new Date(2022, 0, 9),
            enableEventAnimations : false,
            useInitialAnimation   : false,
            mode                  : 'vertical',
            tickSize              : 125,
            barMargin             : 0,
            resourceMargin        : 0,

            resourceColumns : {
                columnWidth : 200
            },

            project : {
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
                    {
                        id       : 1,
                        event    : 1,
                        resource : 'r1'
                    },
                    {
                        id       : 11,
                        event    : 11,
                        resource : 'r1'
                    },
                    {
                        id       : 12,
                        event    : 12,
                        resource : 'r1'
                    },
                    {
                        id       : 2,
                        event    : 2,
                        resource : 'r2'
                    },
                    {
                        id       : 21,
                        event    : 21,
                        resource : 'r2'
                    },
                    {
                        id       : 22,
                        event    : 22,
                        resource : 'r2'
                    }
                ],

                resourcesData : [
                    {
                        id   : 'r1',
                        name : 'Mike'
                    },
                    {
                        id   : 'r2',
                        name : 'Linda'
                    },
                    {
                        id   : 'r3',
                        name : 'Don'
                    },
                    {
                        id   : 'r4',
                        name : 'Karen'
                    },
                    {
                        id   : 'r5',
                        name : 'Doug'
                    }
                ]
            },

            ...config
        });

        await schedulerPro.project.commitAsync();
    }

    function getBounds(selector) {
        return Rectangle.from(t.query(selector)[0], schedulerPro.timeAxisSubGridElement);
    }

    t.it('Should pack by default', async t => {
        await setup();

        const
            parent1Bounds = getBounds('$event=1'),
            nested11      = getBounds('$event=11'),
            nested12      = getBounds('$event=12'),
            parent2Bounds = getBounds('$event=2'),
            nested21      = getBounds('$event=21'),
            nested22      = getBounds('$event=22');

        // Nested events should be positioned inside their parent
        t.ok(parent1Bounds.contains(nested11), 'Nested #11 contained in parent');
        t.ok(parent1Bounds.contains(nested12), 'Nested #12 contained in parent');
        t.ok(parent2Bounds.contains(nested21), 'Nested #21 contained in parent');
        t.ok(parent2Bounds.contains(nested22), 'Nested #22 contained in parent');

        // They should have width depending on overlap
        t.is(nested11.width, 180, 'Correct width for #11');
        t.is(nested12.width, 180, 'Correct width for #12');
        t.is(nested21.width, 90, 'Correct width for #21 (stacked)');
        t.is(nested22.width, 90, 'Correct width for #22 (stacked)');

        // They should have correct left
        t.is(t.query('$event=11')[0].style.left, '0px', 'Correct left for #11');
        t.is(t.query('$event=12')[0].style.left, '0px', 'Correct left for #12');
        t.is(t.query('$event=21')[0].style.left, '90px', 'Correct left for #21');
        t.is(t.query('$event=22')[0].style.left, '0px', 'Correct left for #22');
    });

    t.it('Should support overlap', async t => {
        await setup({
            features : {
                nestedEvents : {
                    eventLayout : 'none'
                }
            }
        });

        const
            parent1Bounds = getBounds('$event=1'),
            nested11      = getBounds('$event=11'),
            nested12      = getBounds('$event=12'),
            parent2Bounds = getBounds('$event=2'),
            nested21      = getBounds('$event=21'),
            nested22      = getBounds('$event=22');

        // Nested events should be positioned inside their parent
        t.ok(parent1Bounds.contains(nested11), 'Nested #11 contained in parent');
        t.ok(parent1Bounds.contains(nested12), 'Nested #12 contained in parent');
        t.ok(parent2Bounds.contains(nested21), 'Nested #21 contained in parent');
        t.ok(parent2Bounds.contains(nested22), 'Nested #22 contained in parent');

        // They should have width depending on overlap
        t.is(nested11.width, 180, 'Correct width for #11');
        t.is(nested12.width, 180, 'Correct width for #12');
        t.is(nested21.width, 180, 'Correct width for #21 (stacked)');
        t.is(nested22.width, 180, 'Correct width for #22 (stacked)');

        // They should have correct left
        t.is(t.query('$event=11')[0].style.left, '0px', 'Correct left for #11');
        t.is(t.query('$event=12')[0].style.left, '0px', 'Correct left for #12');
        t.is(t.query('$event=21')[0].style.left, '0px', 'Correct left for #21');
        t.is(t.query('$event=22')[0].style.left, '0px', 'Correct left for #22');
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
            nested11 = getBounds('$event=11'),
            nested12 = getBounds('$event=12'),
            nested21 = getBounds('$event=21'),
            nested22 = getBounds('$event=22');

        // Correct width with barMargin
        t.is(nested11.width, 180, 'Correct width for #11');
        t.is(nested12.width, 180, 'Correct width for #12');
        t.is(nested21.width, 85, 'Correct width for #21 (stacked)');
        t.is(nested22.width, 85, 'Correct width for #22 (stacked)');

        // And correct left
        t.is(t.query('$event=11')[0].style.left, '0px', 'Correct left for #11');
        t.is(t.query('$event=12')[0].style.left, '0px', 'Correct left for #12');
        t.is(t.query('$event=21')[0].style.left, '95px', 'Correct left for #21');
        t.is(t.query('$event=22')[0].style.left, '0px', 'Correct left for #22');
    });

    t.it('Should support configuring resourceMargin', async t => {
        await setup({
            features : {
                nestedEvents : {
                    resourceMargin : 5
                }
            }
        });

        // Correct width with resourceMargin
        t.hasWidth('$event=11', 170, 'Correct width for #11');
        t.hasWidth('$event=12', 170, 'Correct width for #12');
        t.hasWidth('$event=21', 82.5, 'Correct width for #21 (stacked)');
        t.hasWidth('$event=22', 82.5, 'Correct width for #22 (stacked)');

        // And correct left
        t.is(t.query('$event=11')[0].style.left, '5px', 'Correct left for #11');
        t.is(t.query('$event=12')[0].style.left, '5px', 'Correct left for #12');
        t.is(t.query('$event=21')[0].style.left, '92.5px', 'Correct left for #21');
        t.is(t.query('$event=22')[0].style.left, '5px', 'Correct left for #22');
    });

    t.it('Should support configuring headerHeight', async t => {
        await setup({
            features : {
                nestedEvents : {
                    headerHeight : 45
                }
            }
        });

        t.hasApproxWidth('$event=1 > .b-sch-event > .b-sch-event-content', 45, 'Correct header width');

        // Correct width initially
        t.hasApproxWidth('$event=11', 155, 'Correct width for #11');
        t.hasApproxWidth('$event=12', 155, 'Correct width for #12');
        t.hasApproxWidth('$event=21', 75, 'Correct width for #21 (stacked)');
        t.hasApproxWidth('$event=22', 75, 'Correct width for #22 (stacked)');

        // And correct left
        t.is(t.query('$event=11')[0].style.left, '0px', 'Correct left for #11');
        t.is(t.query('$event=12')[0].style.left, '0px', 'Correct left for #12');
        t.is(t.query('$event=21')[0].style.left, '80px', 'Correct left for #21');
        t.is(t.query('$event=22')[0].style.left, '0px', 'Correct left for #22');
    });

    t.it('Should get nested event element from assignment', async t => {
        await setup();

        const element = schedulerPro.getElementFromAssignmentRecord(schedulerPro.assignmentStore.getById(11));
        t.is(element, t.query('$event=11 .b-sch-event')[0], 'Got the nested event');

        const wrapper = schedulerPro.getElementFromAssignmentRecord(schedulerPro.assignmentStore.getById(11), true);
        t.is(wrapper, t.query('$event=11')[0], 'Got the nested event wrapper');
    });

    t.it('Should support custom overlap sorter', async t => {
        await setup({
            features : {
                nestedEvents : {
                    overlappingEventSorter : (a, b) => a.id - b.id
                }
            }
        });

        t.isGreater(t.rect('$event=22').left, t.rect('$event=21').left, 'overlappingEventSorter applied');
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

    t.it('Should be possible to resize nested event', async t => {
        await setup();

        const event = schedulerPro.eventStore.getById(21);

        await t.dragBy({
            source : '$event=21',
            offset : ['50%', '100%-3'],
            delta  : [0, schedulerPro.tickSize]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(event.duration, 3, 'duration updated');
        t.is(event.endDate, new Date(2022, 0, 6), 'endDate updated');

        await t.dragBy({
            source : '$event=21',
            offset : ['50%', 3],
            delta  : [0, schedulerPro.tickSize]
        });

        await t.waitForProjectReady(schedulerPro);

        t.is(event.duration, 2, 'duration updated');
        t.is(event.startDate, new Date(2022, 0, 4), 'startDate updated');
    });

    t.it('Should allow dragging withing parent', async t => {
        await setup();

        await t.dragBy({
            source : '$event=11',
            delta  : [0, schedulerPro.tickSize]
        });

        t.is(schedulerPro.eventStore.getById(11).startDate, new Date(2022, 0, 3), 'startDate updated');
    });

    t.it('Should allow dragging to other parent', async t => {
        await setup();

        await t.dragTo({
            source : '$event=11',
            target : '$event=2'
        });

        t.is(schedulerPro.eventStore.getById(11).parent, schedulerPro.eventStore.getById(2), 'Move to new parent');
        t.is(schedulerPro.eventStore.getById(11).resource, schedulerPro.resourceStore.getById('r2'), 'Move to new resource');
    });
});
