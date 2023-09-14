
StartTest(t => {

    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy());

    t.it('Should highlight when dragging a task with one non-recurring calendar entry', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate         : '2021-03-22',
            endDate           : '2021-04-04',
            rowHeight         : 70,
            barMargin         : 15,
            snap              : true,
            viewPreset        : 'dayAndWeek',
            displayDateFormat : 'MMM Do',

            features : {
                scheduleTooltip   : false,
                calendarHighlight : true
            },

            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ],

            project : {
                resourcesData : [
                    { id : 1, name : 'One' }
                ],

                eventsData : [
                    { id : 1, name : 'Foo', startDate : '2021-03-25', duration : 1, calendar : 'annualInspection' }
                ],

                assignmentsData : [
                    { id : 1, resourceId : 1, eventId : 1 }
                ],

                calendarsData : [
                    {
                        id                       : 'annualInspection',
                        name                     : 'Inspection period March 23-28',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                name      : 'Inspection period',
                                startDate : '2021-03-23',
                                endDate   : '2021-03-27',
                                isWorking : true
                            }
                        ]
                    }
                ]
            }
        });

        await t.dragBy({
            source   : '.b-sch-event',
            delta    : [50, 0],
            dragOnly : true
        });

        const
            highlightEl       = t.query('.b-sch-highlighted-calendar-range')[0],
            expectedLeft  = schedulerPro.timeAxisViewModel.getPositionFromDate(new Date(2021, 2, 23)),
            expectedRight = schedulerPro.timeAxisViewModel.getPositionFromDate(new Date(2021, 2, 27)),
            highlightRect = Rectangle.from(highlightEl, schedulerPro.timeAxisSubGridElement);

        // Check right side highlight
        t.isApprox(highlightRect.right, expectedRight, 'Drag highlight right ok');

        // Check left side highlight
        t.isApprox(highlightRect.left, expectedLeft, 'Drag highlight left ok');

        // Check top side highlight
        t.isApprox(highlightRect.top, 12, 'Drag highlight top ok');

        t.isApprox(highlightRect.bottom, 70 - 12, 'Drag highlight bottom ok');
    });

    t.it('Should call collectAvailableResources to highlight only returned resources', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate         : '2021-03-22',
            endDate           : '2021-04-04',
            rowHeight         : 70,
            barMargin         : 15,
            snap              : true,
            viewPreset        : 'dayAndWeek',
            displayDateFormat : 'MMM Do',

            features : {
                scheduleTooltip   : false,
                calendarHighlight : {
                    collectAvailableResources : (param) => {
                        t.is(param.scheduler, schedulerPro, 'Correct scheduler arg');
                        t.isDeeply(param.eventRecords, [schedulerPro.eventStore.first], 'Correct eventRecords arg');
                        return [schedulerPro.resourceStore.first];
                    }
                }
            },

            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ],

            project : {
                resourcesData : [
                    { id : 1, name : 'Player 456' },
                    { id : 2, name : 'Player 1' }
                ],

                eventsData : [
                    { id : 1, name : 'Foo', startDate : '2021-03-25', duration : 1, calendar : 'annualInspection' }
                ],

                assignmentsData : [
                    { id : 1, resourceId : 1, eventId : 1 }
                ],

                calendarsData : [
                    {
                        id                       : 'annualInspection',
                        name                     : 'Inspection period March 23-28',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                name      : 'Inspection period',
                                startDate : '2021-03-23',
                                endDate   : '2021-03-27',
                                isWorking : true
                            }
                        ]
                    }
                ]
            }
        });

        await t.dragBy({
            source   : '.b-sch-event',
            delta    : [50, 0],
            dragOnly : true
        });

        const
            highlightEls = t.query('.b-sch-highlighted-calendar-range'),
            highlightEl       = highlightEls[0],
            expectedLeft  = schedulerPro.timeAxisViewModel.getPositionFromDate(new Date(2021, 2, 23)),
            expectedRight = schedulerPro.timeAxisViewModel.getPositionFromDate(new Date(2021, 2, 27)),
            highlightRect = Rectangle.from(highlightEl, schedulerPro.timeAxisSubGridElement);

        t.is(highlightEls.length, 1, 'Highlighting just one resource');

        // Check right side highlight
        t.isApprox(highlightRect.right, expectedRight, 'Drag highlight right ok');

        // Check left side highlight
        t.isApprox(highlightRect.left, expectedLeft, 'Drag highlight left ok');

        // Check top side highlight
        t.isApprox(highlightRect.top, 12, 'Drag highlight top ok');

        t.isApprox(highlightRect.bottom, 70 - 12, 'Drag highlight bottom ok');
    });

    t.it('Should update highlighted calendar intervals moving over a new resources', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate         : '2021-03-22',
            endDate           : '2021-04-04',
            rowHeight         : 70,
            barMargin         : 15,
            snap              : true,
            viewPreset        : 'dayAndWeek',
            displayDateFormat : 'MMM Do',

            features : {
                scheduleTooltip   : false,
                calendarHighlight : true
            },

            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ],

            project : {
                resourcesData : [
                    { id : 1, name : 'One' },
                    { id : 2, name : 'Two' }
                ],

                eventsData : [
                    { id : 1, name : 'Foo', startDate : '2021-03-25', duration : 1, calendar : 'annualInspection' }
                ],

                assignmentsData : [
                    { id : 1, resourceId : 1, eventId : 1 }
                ],

                calendarsData : [
                    {
                        id                       : 'annualInspection',
                        name                     : 'Inspection period March 23-28',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                name      : 'Inspection period',
                                startDate : '2021-03-23',
                                endDate   : '2021-03-27',
                                isWorking : true
                            }
                        ]
                    }
                ]
            }
        });

        await t.dragBy({
            source   : '.b-sch-event',
            delta    : [0, 70],
            dragOnly : true
        });

        const
            highlightEl       = t.query('.b-sch-highlighted-calendar-range:last-child')[0],
            expectedLeft  = schedulerPro.timeAxisViewModel.getPositionFromDate(new Date(2021, 2, 23)),
            expectedRight = schedulerPro.timeAxisViewModel.getPositionFromDate(new Date(2021, 2, 27)),
            highlightRect = Rectangle.from(highlightEl, schedulerPro.timeAxisSubGridElement);

        // Check right side highlight
        t.isApprox(highlightRect.right, expectedRight, 'Drag highlight right ok');

        // Check left side highlight
        t.isApprox(highlightRect.left, expectedLeft, 'Drag highlight left ok');

        // Check top side highlight
        t.isApprox(highlightRect.top, 70 + 12, 'Drag highlight top ok');

        t.isApprox(highlightRect.bottom, 140 - 13, 'Drag highlight bottom ok');
    });

    t.it('Should handle if an event has no calendar assigned', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate         : '2021-03-22',
            endDate           : '2021-04-04',
            rowHeight         : 70,
            barMargin         : 15,
            snap              : true,
            viewPreset        : 'dayAndWeek',
            displayDateFormat : 'MMM Do',

            features : {
                scheduleTooltip   : false,
                calendarHighlight : true
            },

            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ],

            project : {
                resourcesData : [
                    { id : 1, name : 'One' },
                    { id : 2, name : 'Two' }
                ],

                eventsData : [
                    { id : 1, name : 'Foo', startDate : '2021-03-25', duration : 1 }
                ],

                assignmentsData : [
                    { id : 1, resourceId : 1, eventId : 1 }
                ],

                calendarsData : [
                    {
                        id                       : 'annualInspection',
                        name                     : 'Inspection period March 23-28',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                name      : 'Inspection period',
                                startDate : '2021-03-23',
                                endDate   : '2021-03-27',
                                isWorking : true
                            }
                        ]
                    }
                ]
            }
        });

        await t.dragBy({
            source : '.b-sch-event',
            delta  : [0, 70]
        });

        t.is(schedulerPro.eventStore.first.resource.id, 2, 'Event moved ok');
    });

    t.it('Should highlight when resizing a task', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate         : '2021-03-22',
            endDate           : '2021-04-04',
            rowHeight         : 70,
            barMargin         : 15,
            snap              : true,
            viewPreset        : 'dayAndWeek',
            displayDateFormat : 'MMM Do',

            features : {
                scheduleTooltip   : false,
                calendarHighlight : true
            },

            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ],

            project : {
                resourcesData : [
                    { id : 1, name : 'One' }
                ],

                eventsData : [
                    { id : 1, name : 'Foo', startDate : '2021-03-25', duration : 1, calendar : 'annualInspection' }
                ],

                assignmentsData : [
                    { id : 1, resourceId : 1, eventId : 1 }
                ],

                calendarsData : [
                    {
                        id                       : 'annualInspection',
                        name                     : 'Inspection period March 23-28',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                name      : 'Inspection period',
                                startDate : '2021-03-23',
                                endDate   : '2021-03-27',
                                isWorking : true
                            }
                        ]
                    }
                ]
            }
        });

        await t.dragBy({
            source   : '.b-sch-event',
            offset   : ['100%-5', '50%'],
            delta    : [50, 0],
            dragOnly : true
        });

        const
            expectedLeft  = schedulerPro.getCoordinateFromDate(new Date(2021, 2, 23), false),
            expectedRight = schedulerPro.getCoordinateFromDate(new Date(2021, 2, 27), false),
            rowRect       = t.rect('.b-grid-row'),
            highlightRect = t.rect('.b-sch-highlighted-calendar-range', schedulerPro.timeAxisSubGridElement);

        // Check right side highlight
        t.isApprox(highlightRect.right, expectedRight, 'Drag highlight right ok');

        // Check left side highlight
        t.isApprox(highlightRect.left, expectedLeft, 'Drag highlight left ok');

        // Check top side highlight
        t.isApprox(highlightRect.top, rowRect.top + 12, 'Drag highlight top ok');

        t.isApprox(highlightRect.bottom, rowRect.bottom - 12, 'Drag highlight bottom ok');
    });

    t.it('Should highlight when drag creating a task', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate         : '2021-03-22',
            endDate           : '2021-04-04',
            rowHeight         : 70,
            barMargin         : 15,
            snap              : true,
            viewPreset        : 'dayAndWeek',
            displayDateFormat : 'MMM Do',

            features : {
                scheduleTooltip   : false,
                calendarHighlight : {
                    calendar : 'resource'
                }
            },

            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ],

            project : {
                resourcesData : [
                    { id : 1, name : 'One', calendar : 'annualInspection' }
                ],

                eventsData : [
                ],

                assignmentsData : [
                    { id : 1, resourceId : 1, eventId : 1 }
                ],

                calendarsData : [
                    {
                        id                       : 'annualInspection',
                        name                     : 'Inspection period March 23-28',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                name      : 'Inspection period',
                                startDate : '2021-03-23',
                                endDate   : '2021-03-27',
                                isWorking : true
                            }
                        ]
                    }
                ]
            }
        });

        await t.dragBy({
            source   : '.b-sch-timeaxis-cell',
            offset   : [100, '50%'],
            delta    : [50, 0],
            dragOnly : true
        });

        const
            expectedLeft  = schedulerPro.getCoordinateFromDate(new Date(2021, 2, 23), false),
            expectedRight = schedulerPro.getCoordinateFromDate(new Date(2021, 2, 27), false),
            rowRect       = t.rect('.b-grid-row'),
            highlightRect = t.rect('.b-sch-highlighted-calendar-range', schedulerPro.timeAxisSubGridElement);

        // Check right side highlight
        t.isApprox(highlightRect.right, expectedRight, 'Drag highlight right ok');

        // Check left side highlight
        t.isApprox(highlightRect.left, expectedLeft, 'Drag highlight left ok');

        // Check top side highlight
        t.isApprox(highlightRect.top, rowRect.top + 12, 'Drag highlight top ok');

        t.isApprox(highlightRect.bottom, rowRect.bottom - 12, 'Drag highlight bottom ok');
    });

    // https://github.com/bryntum/support/issues/5199
    t.it('Should be able to combine with ResourceTimeRange features', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : '2021-03-22',
            endDate   : '2021-04-04',

            features : {
                scheduleTooltip    : false,
                resourceTimeRanges : true,
                calendarHighlight  : {
                    calendar : 'resource'
                }
            },

            columns : [
                {
                    text  : 'Name',
                    field : 'name'
                }
            ],

            project : {
                resourcesData : [
                    { id : 1, name : 'One', calendar : 'annualInspection' }
                ],

                calendarsData : [
                    {
                        id                       : 'annualInspection',
                        name                     : 'Inspection period March 23-28',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                name      : 'Inspection period',
                                startDate : '2021-03-23',
                                endDate   : '2021-03-27',
                                isWorking : true
                            }
                        ]
                    }
                ]
            }
        });

        schedulerPro.features.calendarHighlight.highlightCalendar([], schedulerPro.resourceStore.records);

        t.selectorCountIs('.b-sch-event-content', 1);
    });

    // https://github.com/bryntum/support/issues/5981
    t.it('Should assign unique id to each highlight element', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : '2021-03-22',
            endDate   : '2021-04-04',

            features : {
                scheduleTooltip   : false,
                calendarHighlight : {
                    calendar : 'event',
                    collectAvailableResources() {
                        return schedulerPro.resourceStore.records;
                    }
                }
            },

            project : {
                resourcesData : [
                    { id : 1, name : 'One' },
                    { id : 2, name : 'Two' }
                ],

                eventsData : [
                    { id : 1, name : 'Foo', startDate : '2021-03-25', duration : 1, calendar : 'annualInspection' }
                ],

                assignmentsData : [
                    { id : 1, resourceId : 1, eventId : 1 }
                ],

                calendarsData : [
                    {
                        id                       : 'annualInspection',
                        name                     : 'Inspection period March 23-28',
                        unspecifiedTimeIsWorking : false,
                        intervals                : [
                            {
                                name      : 'Inspection period',
                                startDate : '2021-03-23',
                                endDate   : '2021-03-27',
                                isWorking : true
                            }
                        ]
                    }
                ]
            }
        });

        await t.dragBy({
            source   : '.b-sch-event',
            delta    : [50, 0],
            dragOnly : true
        });

        await t.waitForSelector('.b-sch-highlighted-calendar-range');

        const ranges = t.query('.b-sch-highlighted-calendar-range');

        t.isNot(ranges[0].dataset.syncId, ranges[1].dataset.syncId, 'Ranges have different ids');
    });
});
