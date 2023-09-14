
StartTest(t => {

    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy());

    t.it('Basic resize operations', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            dependenciesData : [],
            features         : { dependencies : false }
        });

        const { tickSize } = schedulerPro;

        t.chain(
            { diag : 'Shrinking to before weekend' },

            { drag : '[data-assignment-id="6"]', offset : ['100%-3', '50%'], by : [-tickSize, 0] },

            { waitForProjectReady : schedulerPro },

            async() => {
                t.assertAssignmentElementInTicks({ id : 6, tick : 5, row : 0, width : 1 });
                // Being multi assigned, this instance should also be resized
                t.assertAssignmentElementInTicks({ id : 5, tick : 5, row : 4, width : 1 });
            },

            { diag : 'Enlarging to during weekend' },

            { drag : '[data-assignment-id="3"]', offset : ['100%-3', '50%'], by : [tickSize * 2, 0] },

            { waitForProjectReady : schedulerPro },

            async() => {
                // "Cropped" to friday
                t.assertAssignmentElementInTicks({ id : 3, tick : 3, row : 2, width : 3 });
            },

            { diag : 'Enlarging to after weekend' },

            { drag : '[data-assignment-id="2"]', offset : ['100%-3', '50%'], by : [tickSize * 3.5, 0] },

            { waitForProjectReady : schedulerPro },

            async() => {
                t.assertAssignmentElementInTicks({ id : 2, tick : 2, row : 1, width : 7 });
            }
        );
    });

    t.it('Basic with dependencies', async t => {
        schedulerPro = await t.getSchedulerProAsync();

        const { tickSize } = schedulerPro;

        t.chain(
            { diag : 'First in chain' },

            { drag : '[data-assignment-id="1"]', offset : ['100%-7', '50%'], by : [-tickSize, 0] },

            { waitForProjectReady : schedulerPro },

            async() => {
                t.assertAssignmentElementInTicks({ id : 1, tick : 1, row : 0, width : 1 });
                t.assertAssignmentElementInTicks({ id : 2, tick : 2, row : 1, width : 3 });
                t.assertAssignmentElementInTicks({ id : 3, tick : 5, row : 2, width : 4 });
            },

            { diag : 'Second in chain, shrink' },

            { drag : '[data-assignment-id="2"]', offset : ['100%-7', '50%'], by : [-tickSize * 2, 0] },

            { waitForProjectReady : schedulerPro },

            async() => {
                t.assertAssignmentElementInTicks({ id : 2, tick : 2, row : 1, width : 1 });
                t.assertAssignmentElementInTicks({ id : 3, tick : 3, row : 2, width : 2 });
            },

            { diag : 'Second in chain, enlarge' },

            { drag : '[data-assignment-id="2"]', offset : ['100%-7', '50%'], by : [tickSize * 2, 0] },

            { waitForProjectReady : schedulerPro },

            async() => {
                t.assertAssignmentElementInTicks({ id : 2, tick : 2, row : 1, width : 3 });
                t.assertAssignmentElementInTicks({ id : 3, tick : 5, row : 2, width : 4 });
            }
        );
    });

    // https://github.com/bryntum/support/issues/1442
    t.it('Should revert drop that does not cause a data change', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 5 }
            ]
        });

        const { tickSize } = schedulerPro;

        t.chain(
            { drag : '[data-event-id="1"]', offset : ['100%-5', '5'], by : [tickSize, 0] },

            { waitFor : () => Math.abs(document.querySelector('[data-event-id="1"]').offsetWidth - 5 * tickSize) <= 2 },

            () => {
                t.isDateEqual(schedulerPro.eventStore.first.endDate, new Date(2020, 2, 28));
                t.isApprox(document.querySelector('[data-event-id="1"]').offsetWidth, 5 * tickSize, 2, 'Original width reapplied');
            }
        );
    });

    t.it('Should live ok when resize is invalid', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                dependencies : false
            },
            eventsData : [
                { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 5 }
            ]
        });

        const { tickSize } = schedulerPro;

        t.chain(
            { drag : '[data-event-id="1"]', offset : ['100%-5', '5'], by : [tickSize, 0] },

            () => {
                t.isDateEqual(schedulerPro.eventStore.first.endDate, new Date(2020, 2, 28));
                t.isApprox(document.querySelector('[data-event-id="1"]').offsetWidth, 5 * tickSize, 2, 'Original width reapplied');
            }
        );
    });

    // https://github.com/bryntum/support/issues/4943
    t.it('Should not crash resizing event when stores is created before project', async t => {
        const resources = new ResourceStore({
            data : [
                { id : 1, name : 'Paint' },
                { id : 2, name : 'Cut 1' },
                { id : 3, name : 'Cut 2' }
            ]
        });

        const events = new EventStore({
            data : [
                {
                    id        : 10,
                    name      : 'ABC101',
                    startDate : '2022-04-13T08:30',
                    endDate   : '2022-04-13T18:30'
                }
            ]
        });

        const assignments = new AssignmentStore({
            data : [{ id : 1, eventId : 10, resourceId : 1 }]
        });

        schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            startDate : '2022-04-13T08:30',
            endDate   : '2022-04-13T18:30',
            project   : new ProjectModel({
                eventStore      : events,
                resourceStore   : resources,
                assignmentStore : assignments
            })
        });

        await t.dragBy({ source : '[data-assignment-id="1"]', offset : ['100%-7', '50%'], delta : [-schedulerPro.tickSize, 0] });

        t.diag('OK');
    });

});
