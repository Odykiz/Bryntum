
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    function assertEventOrder(t, order, selector = '.b-sch-event-wrap') {
        const eventEls = Array.from(document.querySelectorAll(selector));
        const map = {};

        // Convert visual order of events to 2 dimensional array of elements
        eventEls.forEach(el => {
            const
                rect     = t.rect(el),
                top      = Math.floor(rect.top),
                { left } = rect;

            // Current top position haven't been seen yet
            if (!(top in map)) {
                map[top] = [el];
            }
            else {
                // Iterate array of elements with same top position and find place to put current element
                for (let i = 0, l = map[top].length; i < l; i++) {
                    const item = map[top][i];

                    if (left < t.rect(item).left) {
                        map[top].splice(i, 0, el);
                        break;
                    }

                    // If we reached last index here, just push element to the end of the list
                    if (i === l - 1) {
                        map[top].push(el);
                    }
                }
            }
        });

        // Order map keys ascending as integers and collect assignment ids from the array of elements
        const got = Object.keys(map).map(key => parseInt(key)).sort((a, b) => a - b).map(key => {
            return map[key].map(el => el.dataset.assignmentId);
        });

        t.isDeeply(order, got, 'Correct order of events');
    }

    const config = {
        resourcesData : [
            { id : 1, name : 'Resource 1' }
        ],
        eventsData : [
            { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2, prio : 'high', confirmed : true },
            { id : 2, name : 'Event 2', startDate : '2020-03-25', duration : 2, prio : 'low', confirmed : false },
            { id : 3, name : 'Event 3', startDate : '2020-03-27', duration : 2, prio : 'high', confirmed : false },
            { id : 4, name : 'Event 4', startDate : '2020-03-23', duration : 2, prio : 'low', confirmed : false },
            { id : 5, name : 'Event 5', startDate : '2020-03-25', duration : 2, prio : 'high', confirmed : true },
            { id : 6, name : 'Event 6', startDate : '2020-03-27', duration : 2, prio : 'low', confirmed : true }
        ],
        assignmentsData : [
            { id : 1, resource : 1, event : 1 },
            { id : 2, resource : 1, event : 2 },
            { id : 3, resource : 1, event : 3 },
            { id : 4, resource : 1, event : 4 },
            { id : 5, resource : 1, event : 5 },
            { id : 6, resource : 1, event : 6 }
        ],
        dependenciesData : [],
        eventRenderer({ eventRecord }) {
            return `${eventRecord.id} ${eventRecord.prio} ${eventRecord.confirmed ? 'confirmed' : 'planned'}`;
        }
    };

    t.it('Should accept event group fn in config', async t => {
        schedulerPro = await t.getSchedulerProAsync(ObjectHelper.assign({}, config, {
            eventLayout : {
                type    : 'stack',
                groupBy : event => event.prio
            }
        }));

        assertEventOrder(t, [[1, 5, 3], [4, 2, 6]]);

        schedulerPro.eventLayout = 'stack';

        assertEventOrder(t, [[1, 2, 3], [4, 5, 6]]);
    });

    t.it('Should accept field name as event group', async t => {
        schedulerPro = await t.getSchedulerProAsync(ObjectHelper.assign({}, config, {
            eventLayout : {
                type    : 'stack',
                groupBy : 'prio'
            }
        }));

        assertEventOrder(t, [[1, 5, 3], [4, 2, 6]]);

        schedulerPro.eventLayout = {
            type    : 'stack',
            weights : {
                low  : 100,
                high : 200
            },
            groupBy : 'prio'
        };

        assertEventOrder(t, [[4, 2, 6], [1, 5, 3]]);
    });

    t.it('Should group events by field', t => {
        function assertLayout(t, layoutType) {
            t.it('No grouper', t => {
                assertEventOrder(t, [[1, 2, 3], [4, 5, 6]]);
            });

            t.it('Group events by prio (high first)', t => {
                // Event transition is disabled in tests, refresh happens immediately
                schedulerPro.eventLayout = {
                    type    : layoutType,
                    groupBy : event => event.prio
                };

                assertEventOrder(t, [[1, 5, 3], [4, 2, 6]]);
            });

            t.it('Group events by prio (low first)', t => {
                schedulerPro.eventLayout = {
                    type    : layoutType,
                    groupBy : event => event.prio === 'high' ? 1 : 0
                };

                assertEventOrder(t, [[4, 2, 6], [1, 5, 3]]);
            });

            t.it('Group events by confirmation', t => {
                schedulerPro.eventLayout = {
                    type    : layoutType,
                    groupBy : event => event.confirmed
                };

                assertEventOrder(t, [[4, 2, 3], [1, 5, 6]]);

                schedulerPro.eventStore.getById(5).confirmed = false;

                assertEventOrder(t, [[4, 2, 3], [5], [1, 6]]);

                schedulerPro.eventStore.getById(2).confirmed = true;

                assertEventOrder(t, [[4, 5, 3], [1, 2, 6]]);
            });

            t.it('Adding new prio', t => {
                schedulerPro.eventStore.getById(1).prio = 'normal';

                schedulerPro.eventLayout = {
                    type    : layoutType,
                    groupBy : ({ prio }) => prio === 'high' ? 0 : prio === 'normal' ? 1 : 2
                };

                assertEventOrder(t, [[5, 3], [1], [4, 2, 6]]);
            });
        }

        t.it('Stack layout', t => {
            t.beforeEach(async t => {
                schedulerPro?.destroy();

                schedulerPro = await t.getSchedulerProAsync(config);
            });

            assertLayout(t, 'stack');
        });

        t.it('Pack layout', t => {
            t.beforeEach(async t => {
                schedulerPro?.destroy();

                schedulerPro = await t.getSchedulerProAsync(Object.assign({
                    barMargin : 0,
                    rowHeight : 100
                }, config));
            });

            assertLayout(t, 'pack');
        });
    });

    t.it('Grouping by id pushes each event to own band', async t => {
        schedulerPro = await t.getSchedulerProAsync(Object.assign(config, {
            eventLayout : {
                type    : 'stack',
                groupBy : event => event.id
            }
        }));

        assertEventOrder(t, [[1], [2], [3], [4], [5], [6]]);
    });
});
