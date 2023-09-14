StartTest(t => {
    let scheduler;

    t.beforeEach(() => scheduler?.destroy());

    async function setup(config = {}, nestedEventsConfig = {}, projectConfig = {}) {
        scheduler = new SchedulerPro({
            appendTo              : document.body,
            startDate             : '2023-05-01',
            endDate               : '2023-05-31',
            rowHeight             : 200,
            tickSize              : 100,
            barMargin             : 0,
            resourceMargin        : 0,
            enableEventAnimations : false,
            useInitialAnimation   : false,
            features              : {
                nestedEvents : {
                    maxNesting   : 2,
                    barMargin    : 0,
                    headerHeight : 20,
                    eventLayout  : 'pack',
                    ...nestedEventsConfig
                }
            },
            columns : [
                { field : 'name', text : 'name', width : 100 }
            ],
            project : {
                eventStore : {
                    tree : true
                },
                resourcesData : [
                    {
                        id   : 1,
                        name : 'Resource 1'
                    },
                    {
                        id   : 2,
                        name : 'Resource 2'
                    }
                ],
                eventsData : [
                    {
                        id                : 1,
                        name              : 'Parent 1',
                        startDate         : '2023-05-01',
                        endDate           : '2023-05-08',
                        manuallyScheduled : true,
                        children          : [
                            {
                                id                : 11,
                                name              : 'Sub-parent 11',
                                startDate         : '2023-05-01',
                                endDate           : '2023-05-03',
                                manuallyScheduled : true,
                                children          : [
                                    {
                                        id        : 111,
                                        name      : 'Child 111',
                                        startDate : '2023-05-01',
                                        duration  : 2
                                    },
                                    {
                                        id        : 112,
                                        name      : 'Child 112',
                                        startDate : '2023-05-02',
                                        duration  : 1
                                    }
                                ]
                            },
                            {
                                id                : 12,
                                name              : 'Sub-parent 12',
                                startDate         : '2023-05-04',
                                endDate           : '2023-05-06',
                                manuallyScheduled : true,
                                children          : [
                                    {
                                        id        : 121,
                                        name      : 'Child 121',
                                        startDate : '2023-05-04',
                                        duration  : 2
                                    }
                                ]
                            },
                            {
                                id        : 13,
                                name      : 'Child 13',
                                startDate : '2023-05-06',
                                duration  : 2
                            }
                        ]
                    },
                    {
                        id                : 2,
                        name              : 'Parent 2',
                        startDate         : '2023-05-01',
                        endDate           : '2023-05-04',
                        manuallyScheduled : true,
                        children          : [
                            {
                                id                : 21,
                                name              : 'Sub-parent 21',
                                startDate         : '2023-05-01',
                                endDate           : '2023-05-04',
                                manuallyScheduled : true,
                                children          : [
                                    {
                                        id        : 211,
                                        name      : 'Child 211',
                                        startDate : '2023-05-01',
                                        duration  : 2
                                    },
                                    {
                                        id        : 212,
                                        name      : 'Child 212',
                                        startDate : '2023-05-02',
                                        duration  : 2
                                    }
                                ]
                            },
                            {
                                id                : 22,
                                name              : 'Sub-parent 22',
                                startDate         : '2023-05-01',
                                endDate           : '2023-05-04',
                                manuallyScheduled : true,
                                children          : [
                                    {
                                        id        : 221,
                                        name      : 'Child 221',
                                        startDate : '2023-05-01',
                                        duration  : 2
                                    },
                                    {
                                        id        : 222,
                                        name      : 'Child 222',
                                        startDate : '2023-05-02',
                                        duration  : 2
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id        : 3,
                        name      : 'Child 3',
                        startDate : '2023-05-05',
                        duration  : 2
                    }
                ],
                assignmentsData : [
                    { id : 1, eventId : 1, resourceId : 1 },
                    { id : 11, eventId : 11, resourceId : 1 },
                    { id : 111, eventId : 111, resourceId : 1 },
                    { id : 112, eventId : 112, resourceId : 1 },
                    { id : 12, eventId : 12, resourceId : 1 },
                    { id : 121, eventId : 121, resourceId : 1 },
                    { id : 13, eventId : 13, resourceId : 1 },
                    { id : 2, eventId : 2, resourceId : 1 },
                    { id : 21, eventId : 21, resourceId : 1 },
                    { id : 211, eventId : 211, resourceId : 1 },
                    { id : 212, eventId : 212, resourceId : 1 },
                    { id : 22, eventId : 22, resourceId : 1 },
                    { id : 221, eventId : 221, resourceId : 1 },
                    { id : 222, eventId : 222, resourceId : 1 },
                    { id : 3, eventId : 3, resourceId : 1 }
                ],
                ...projectConfig
            },
            eventRenderer({ eventRecord, renderData }) {
                if (eventRecord.childLevel === 2) {
                    renderData.eventColor = 'orange';
                }
                else if (eventRecord.childLevel === 1) {
                    renderData.eventColor = 'indigo';
                }

                return eventRecord.name;
            },
            ...config
        });

        await scheduler.project.commitAsync();

        return scheduler;
    }

    t.describe('Should render deeply nested events', t => {
        t.it('Should render packed', async t => {
            await setup();

            const
                height0                           = 200,
                heightSingleChild                 = height0 - 20,
                heightTwoChildren                 = heightSingleChild / 2,
                heightSingleChildSingleGrandChild = heightSingleChild - 20,
                heightSingleChildTwoGrandChildren = heightSingleChildSingleGrandChild / 2,
                heightTwoChildrenTwoGrandChildren = (heightTwoChildren - 20) / 2;

            t.hasApproxHeight('$event=1', height0, 'Parent 1 has correct height');
            t.hasApproxHeight('$event=11', heightSingleChild, 'Sub-parent 11 has correct height');
            t.hasApproxHeight('$event=111', heightSingleChildTwoGrandChildren, 'Child 111 has correct height');
            t.hasApproxHeight('$event=112', heightSingleChildTwoGrandChildren, 'Child 112 has correct height');
            t.hasApproxHeight('$event=12', heightSingleChild, 'Sub-parent 12 has correct height');
            t.hasApproxHeight('$event=121', heightSingleChildSingleGrandChild, 'Child 121 has correct height');
            t.hasApproxHeight('$event=13', heightSingleChild, 'Child 13 has correct height');

            t.hasApproxHeight('$event=2', height0, 'Parent 2 has correct height');
            t.hasApproxHeight('$event=21', heightTwoChildren, 'Sub-parent 21 has correct height');
            t.hasApproxHeight('$event=211', heightTwoChildrenTwoGrandChildren, 'Child 211 has correct height');
            t.hasApproxHeight('$event=212', heightTwoChildrenTwoGrandChildren, 'Child 212 has correct height');
            t.hasApproxHeight('$event=22', heightTwoChildren, 'Sub-parent 22 has correct height');
            t.hasApproxHeight('$event=221', heightTwoChildrenTwoGrandChildren, 'Child 221 has correct height');
            t.hasApproxHeight('$event=222', heightTwoChildrenTwoGrandChildren, 'Child 222 has correct height');

            t.hasApproxHeight('$event=3', height0, 'Child 3 has correct height');

            document.querySelector('header').style.display = 'none';

            t.hasApproxTop('$event=1', 0, 'Parent 1 has correct top');
            t.hasApproxTop('$event=11', 20, 'Sub-parent 11 has correct top');
            t.hasApproxTop('$event=111', 40, 'Child 111 has correct top');
            t.hasApproxTop('$event=112', 120, 'Child 112 has correct top');

            t.hasApproxTop('$event=2', 200, 'Sub-parent 12 has correct top');
            t.hasApproxTop('$event=21', 220, 'Sub-parent 21 has correct top');
            t.hasApproxTop('$event=211', 240, 'Child 211 has correct top');
            t.hasApproxTop('$event=212', 275, 'Child 212 has correct top');
            t.hasApproxTop('$event=22', 310, 'Sub-parent 22 has correct top');
            t.hasApproxTop('$event=221', 330, 'Child 221 has correct top');
            t.hasApproxTop('$event=222', 365, 'Child 222 has correct top');
        });

        t.it('Should render stacked', async t => {
            await setup({}, {
                eventLayout : 'stack',
                eventHeight : [80, 30]
            });

            const
                heightLevel0 = 200,
                heightLevel1 = 80,
                heightLevel2 = 30;

            t.hasApproxHeight('$event=1', heightLevel0, 'Parent 1 has correct height');
            t.hasApproxHeight('$event=11', heightLevel1, 'Sub-parent 11 has correct height');
            t.hasApproxHeight('$event=111', heightLevel2, 'Child 111 has correct height');
            t.hasApproxHeight('$event=112', heightLevel2, 'Child 112 has correct height');
            t.hasApproxHeight('$event=12', heightLevel1, 'Sub-parent 12 has correct height');
            t.hasApproxHeight('$event=121', heightLevel2, 'Child 121 has correct height');
            t.hasApproxHeight('$event=13', heightLevel1, 'Child 13 has correct height');

            t.hasApproxHeight('$event=2', heightLevel0, 'Parent 2 has correct height');
            t.hasApproxHeight('$event=21', heightLevel1, 'Sub-parent 21 has correct height');
            t.hasApproxHeight('$event=211', heightLevel2, 'Child 211 has correct height');
            t.hasApproxHeight('$event=212', heightLevel2, 'Child 212 has correct height');
            t.hasApproxHeight('$event=22', heightLevel1, 'Sub-parent 22 has correct height');
            t.hasApproxHeight('$event=221', heightLevel2, 'Child 221 has correct height');
            t.hasApproxHeight('$event=222', heightLevel2, 'Child 222 has correct height');

            t.hasApproxHeight('$event=3', heightLevel0, 'Child 3 has correct height');

            document.querySelector('header').style.display = 'none';

            t.hasApproxTop('$event=1', 0, 'Parent 1 has correct top');
            t.hasApproxTop('$event=11', 20, 'Sub-parent 11 has correct top');
            t.hasApproxTop('$event=111', 40, 'Child 111 has correct top');
            t.hasApproxTop('$event=112', 70, 'Child 112 has correct top');

            t.hasApproxTop('$event=2', 200, 'Sub-parent 12 has correct top');
            t.hasApproxTop('$event=21', 220, 'Sub-parent 21 has correct top');
            t.hasApproxTop('$event=211', 240, 'Child 211 has correct top');
            t.hasApproxTop('$event=212', 270, 'Child 212 has correct top');
            t.hasApproxTop('$event=22', 300, 'Sub-parent 22 has correct top');
            t.hasApproxTop('$event=221', 320, 'Child 221 has correct top');
            t.hasApproxTop('$event=222', 350, 'Child 222 has correct top');
        });

        t.it('Should render even deeper', async t => {
            await setup({}, {}, {
                eventsData : [
                    {
                        id                : 1,
                        name              : 'Parent 1',
                        startDate         : '2023-05-01',
                        endDate           : '2023-05-08',
                        manuallyScheduled : true,
                        children          : [
                            {
                                id                : 11,
                                name              : 'Sub-parent 11',
                                startDate         : '2023-05-01',
                                endDate           : '2023-05-08',
                                manuallyScheduled : true,
                                children          : [
                                    {
                                        id                : 111,
                                        name              : 'Sub-subparent 111',
                                        startDate         : '2023-05-01',
                                        endDate           : '2023-05-08',
                                        manuallyScheduled : true,
                                        children          : [
                                            {
                                                id        : 1111,
                                                name      : 'Child 1111',
                                                startDate : '2023-05-01',
                                                endDate   : '2023-05-08'
                                            },
                                            {
                                                id        : 1112,
                                                name      : 'Child 1112',
                                                startDate : '2023-05-01',
                                                endDate   : '2023-05-08'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                assignmentsData : [
                    { id : 1, eventId : 1, resourceId : 1 },
                    { id : 2, eventId : 11, resourceId : 1 },
                    { id : 3, eventId : 111, resourceId : 1 },
                    { id : 4, eventId : 1111, resourceId : 1 },
                    { id : 5, eventId : 1112, resourceId : 1 }
                ]
            });
        });
    });

    t.describe('Should handle drag and drop', t => {
        t.it('Should allow dragging out of deeply nested event', async t => {
            await setup();

            await t.dragTo({
                source       : '$event=111',
                target       : '[data-id="2"] .b-sch-timeaxis-cell',
                targetOffset : [50, 50]
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(111).parent, scheduler.eventStore.rootNode, 'Correct parent after drop');
            t.is(scheduler.eventStore.getById(111).resource.id, 2, 'Correct resource');

            await t.dragTo({
                source       : '$event=112',
                target       : '$event=121',
                targetOffset : [50, 50]
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(112).parent, scheduler.eventStore.getById(12), 'Correct parent after drop');
            t.is(scheduler.eventStore.getById(112).resource.id, 1, 'Correct resource');
        });

        t.it('Should allow dragging into deeply nested event', async t => {
            await setup();

            await t.dragTo({
                source : '$event=111',
                target : '$event=21'
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(111).parent, scheduler.eventStore.getById(21), 'Correct parent after drop');
            t.is(scheduler.eventStore.getById(111).resource.id, 1, 'Correct resource');

            await t.dragTo({
                source : '$event=3',
                target : '$event=22'
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(3).parent, scheduler.eventStore.getById(22), 'Correct parent after drop');
            t.is(scheduler.eventStore.getById(3).resource.id, 1, 'Correct resource');
        });

        t.it('Should allow dragging nested container', async t => {
            await setup();

            await t.dragTo({
                source       : '$event=12',
                sourceOffset : [25, 5],
                target       : '[data-id="2"] .b-sch-timeaxis-cell',
                targetOffset : [50, 50]
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(12).parent, scheduler.eventStore.rootNode, 'Correct parent after drop');
            t.is(scheduler.eventStore.getById(12).resource.id, 2, 'Correct resource');
            t.is(scheduler.eventStore.getById(121).resource.id, 2, 'Correct resource');

            await t.dragTo({
                source       : '$event=22',
                sourceOffset : [25, 5],
                target       : '$event=1'
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(22).parent, scheduler.eventStore.getById(1), 'Correct parent after drop');
            t.is(scheduler.eventStore.getById(22).resource.id, 1, 'Correct resource');
            t.is(scheduler.eventStore.getById(221).resource.id, 1, 'Correct resource');
            t.is(scheduler.eventStore.getById(222).resource.id, 1, 'Correct resource');
        });

        t.it('Should prevent "over nesting" on drop', async t => {
            await setup();

            await t.dragTo({
                source       : '$event=21',
                sourceOffset : [25, 5],
                target       : '$event=11'
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(21).parent, scheduler.eventStore.getById(2), 'Correct parent after drop');

            scheduler.features.nestedEvents.maxNesting = 3;

            await t.dragTo({
                source       : '$event=21',
                sourceOffset : [25, 5],
                target       : '$event=11'
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(21).parent, scheduler.eventStore.getById(11), 'Correct parent after drop');
        });

        t.it('Should allow dragging into empty parent', async t => {
            await setup();

            scheduler.eventStore.getById(121).remove();

            await t.dragTo({
                source       : '$event=1',
                sourceOffset : [25, 5],
                target       : '[data-id="2"] .b-sch-timeaxis-cell',
                targetOffset : [50, 50]
            });

            await t.dragTo({
                source : '$event=212',
                target : '$event=12'
            });

            await t.waitForProjectReady(scheduler);

            t.is(scheduler.eventStore.getById(212).parent, scheduler.eventStore.getById(12), 'Correct parent after drop');
            t.is(scheduler.eventStore.getById(212).resource.id, 2, 'Correct resource');
            t.ok(scheduler.eventStore.getById(212).allChildren.every(child => child.resource.id === 2), 'All children have correct resource');
        });
    });
});
