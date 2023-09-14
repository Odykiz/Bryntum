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

    // https://github.com/bryntum/support/issues/5133
    t.it('layoutFn scope should have a reference to the scheduler', async t => {
        let checked = false;

        schedulerPro = t.getSchedulerPro({
            eventLayout : {
                layoutFn() {
                    if (!checked) {
                        checked = true;
                        t.ok(this.scheduler?.isSchedulerPro, 'Scheduler pro reference found');
                    }
                }
            },
            eventsData : []
        });

        schedulerPro.eventStore.add({ id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2, percentDone : 50 });

        await t.waitFor(() => checked);
    });

    t.it('Should use custom fn to layout fn', async t => {
        let layoutFn = function(items, resource) {
            // Resource being laid out is passed
            t.is(resource, this.scheduler.resourceStore.first);
            items.forEach(item => {
                item.top = (6 - item.eventRecord.id) * 20;
            });

            return 150;
        };

        schedulerPro = await t.getSchedulerProAsync({
            rowHeight     : 45,
            resourcesData : [
                { id : 1, name : 'Resource 1' }
            ],
            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2 },
                { id : 2, name : 'Event 2', startDate : '2020-03-25', duration : 2 },
                { id : 3, name : 'Event 3', startDate : '2020-03-27', duration : 2 },
                { id : 4, name : 'Event 4', startDate : '2020-03-23', duration : 2 },
                { id : 5, name : 'Event 5', startDate : '2020-03-25', duration : 2 },
                { id : 6, name : 'Event 6', startDate : '2020-03-27', duration : 2 }
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

            eventLayout : {
                layoutFn
            }
        });

        assertEventOrder(t, [[6], [5], [4], [3], [2], [1]]);

        t.is(t.rect('.b-sch-timeaxis-cell').height, 150, 'Normal row height is ok');
        t.is(t.rect('.b-grid-subgrid-locked .b-grid-cell').height, 150, 'Locked row height is ok');

        layoutFn = items => {
            items.forEach(item => {
                item.top = (item.eventRecord.id - 1) * 20;
            });

            return 150;
        };

        schedulerPro.eventLayout = {
            layoutFn
        };

        assertEventOrder(t, [[1], [2], [3], [4], [5], [6]]);
    });
});
