
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    function assertSegmentPositions(t, segments = []) {
        const { timeAxisSubGridElement } = schedulerPro;

        let pass = true;

        segments.forEach((segment, segmentIndex) => {
            if (schedulerPro.timeAxis.isTimeSpanInAxis(segment)) {
                const
                    expectedStartX = schedulerPro.getCoordinateFromDate(segment.startDate),
                    expectedEndX   = Math.round(schedulerPro.getCoordinateFromDate(segment.endDate)) - 1;

                segment.event.resources.forEach(resource => {
                    const
                        eventEl     = schedulerPro.getElementFromEventRecord(segment.event, resource),
                        segmentEl   = eventEl.querySelector(`.b-sch-event-segment[data-segment="${segmentIndex}"]`),
                        resourceRow = schedulerPro.getRowFor(resource),
                        resourceEl  = resourceRow.elements.normal,
                        segmentBox  = Rectangle.from(segmentEl, timeAxisSubGridElement),
                        resourceBox = Rectangle.from(resourceEl, timeAxisSubGridElement);

                    if (resourceBox.intersect(segmentBox).height !== segmentBox.height) {
                        t.fail(`Segment ${segment.id} is not aligned to its resource ${segment.resourceId}`, {
                            got      : segmentBox,
                            need     : resourceBox,
                            gotDesc  : 'Segment rectangle',
                            needDesc : 'Resource rectangle'
                        });

                        pass = false;
                    }

                    if (Math.abs(segmentBox.x - expectedStartX) > 1) {
                        t.fail(`Segment ${segment.id} is not aligned to its start date`, {
                            got      : segmentBox.x,
                            need     : expectedStartX,
                            gotDesc  : 'Got x',
                            needDesc : 'Need x'
                        });

                        pass = false;
                    }

                    if (Math.abs(segmentBox.right - expectedEndX) > 1) {
                        t.fail(`Segment ${segment.id} is not aligned to its end date`, {
                            got      : segmentBox.right,
                            need     : expectedEndX,
                            gotDesc  : 'Got right',
                            needDesc : 'Need right'
                        });

                        pass = false;
                    }
                });
            }
            else {
                t.pass(`Segment ${segment.id} is outside of the current time axis`);
            }
        });

        if (pass) {
            t.pass('Segments are positioned correctly');
        }

        return pass;
    }

    t.it('Segments should be rendered properly and "Split event" entry should be added to event menu', async t => {

        schedulerPro = await t.getSchedulerProAsync({
            startDate  : new Date(2019, 5, 3),
            endDate    : new Date(2019, 6, 1),
            eventsData : [
                {
                    id          : 11,
                    name        : 'Investigate',
                    percentDone : 50,
                    startDate   : '2019-06-03',
                    segments    : [
                        {
                            id        : 1,
                            startDate : '2019-06-03',
                            duration  : 1
                        },
                        {
                            id        : 2,
                            startDate : '2019-06-05',
                            duration  : 2
                        },
                        {
                            id        : 3,
                            startDate : '2019-06-10',
                            duration  : 1
                        }
                    ]
                }
            ],
            resourcesData   : [{ id : 'r1', name : 'Resource 1' }],
            assignmentsData : [{ id : 'a1', resource : 'r1', event : 11 }]
        });

        t.selectorCountIs('.b-sch-event-segment', 3, 'three segments are rendered');

        assertSegmentPositions(t, schedulerPro.events[0].segments);

        await t.rightClick('[data-event-id="11"]');

        t.selectorExists('.b-menuitem:not(.b-hidden) :textEquals(Split event)', '"Split event" menu entry is there');
    });

    t.it('"Split event" menu entry works properly', async t => {

        schedulerPro = await t.getSchedulerProAsync({
            startDate  : new Date(2019, 5, 3),
            endDate    : new Date(2019, 6, 1),
            eventsData : [
                {
                    id          : 11,
                    name        : 'Investigate',
                    percentDone : 50,
                    startDate   : '2019-06-03',
                    duration    : 3
                }
            ],
            resourcesData   : [{ id : 'r1', name : 'Resource 1' }],
            assignmentsData : [{ id : 'a1', resource : 'r1', event : 11 }]
        });

        t.diag('Splitting the event in two segments');

        await t.rightClick('[data-event-id="11"]', null, null, null, ['33%', '50%']);

        await t.click('.b-menuitem :textEquals(Split event)');

        await t.waitFor(() => t.query('.b-sch-event-segment').length === 2);

        assertSegmentPositions(t, schedulerPro.events[0].segments);

        t.diag('Splitting the last segment too');

        await t.rightClick('[data-event-id="11"]', null, null, null, ['75%', '50%']);

        await t.click('.b-menuitem :textEquals(Split event)');

        await t.waitFor(() => t.query('.b-sch-event-segment').length === 3);

        assertSegmentPositions(t, schedulerPro.events[0].segments);
    });

    // https://github.com/bryntum/support/issues/5241
    t.it('Dependency creation works fine for segmented events', async t => {

        schedulerPro = await t.getSchedulerProAsync({
            startDate  : new Date(2019, 5, 3),
            endDate    : new Date(2019, 6, 1),
            eventsData : [
                {
                    id          : 11,
                    name        : 'Investigate',
                    percentDone : 50,
                    startDate   : '2019-06-03',
                    segments    : [
                        {
                            id        : 1,
                            startDate : '2019-06-03',
                            duration  : 1
                        },
                        {
                            id        : 2,
                            startDate : '2019-06-05',
                            duration  : 1
                        },
                        {
                            id        : 3,
                            startDate : '2019-06-07',
                            duration  : 1
                        }
                    ]
                },
                {
                    id         : 12,
                    name       : 'Bar',
                    startDate  : '2019-06-03',
                    eventColor : 'red',
                    duration   : 1
                }
            ],
            dependenciesData : [],
            resourcesData    : [{ id : 'r1', name : 'Resource 1' }],
            assignmentsData  : [
                { id : 'a1', resource : 'r1', event : 11 },
                { id : 'a2', resource : 'r1', event : 12 }
            ]
        });

        await t.moveCursorTo('.b-sch-event:contains(Investigate)');
        await t.mouseDown('.b-sch-terminal-end');
        await t.moveCursorTo('.b-sch-event:contains(Bar)');
        await t.mouseUp();

        const
            [event1, event2] = schedulerPro.eventStore,
            [dependency]     = schedulerPro.dependencyStore;

        t.is(dependency.fromEvent, event1, 'predecessor is correct');
        t.is(dependency.toEvent, event2, 'successor is correct');
    });

    t.it('Should be able to edit the name of event segments', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate  : new Date(2019, 5, 3),
            endDate    : new Date(2019, 6, 1),
            eventsData : [
                {
                    id          : 11,
                    name        : 'Investigate',
                    percentDone : 50,
                    startDate   : '2019-06-03',
                    segments    : [
                        {
                            id        : 1,
                            startDate : '2019-06-03',
                            duration  : 1
                        },
                        {
                            id        : 2,
                            startDate : '2019-06-05',
                            duration  : 2
                        },
                        {
                            id        : 3,
                            startDate : '2019-06-10',
                            duration  : 1
                        }
                    ]
                }
            ],
            resourcesData   : [{ id : 'r1', name : 'Resource 1' }],
            assignmentsData : [{ id : 'a1', resource : 'r1', event : 11 }]
        });

        await t.rightClick('.b-sch-event-segment');

        await t.click('[data-ref=renameSegment]');

        await t.type({
            target        : 'input',
            text          : 'Hello[ENTER]',
            clearExisting : true
        });

        await t.waitForSelector('.b-sch-event-segment:contains(Hello)');

        t.selectorCountIs('.b-sch-event-segment:contains(Hello)', 1, 'Single segment updated');
        t.is(schedulerPro.eventStore.first.segments[0].name, 'Hello', 'Segment name updated');
    });

    // https://github.com/bryntum/support/issues/6510
    t.it('Should be able to set eventColor on segments', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate : new Date(2022, 2, 21),
            endDate   : new Date(2022, 2, 25),
            project   : {
                resourcesData : [
                    { id : 1, name : 'Bruce' },
                    { id : 2, name : 'Diana' }
                ],

                eventsData : [
                    {
                        id        : 1,
                        name      : 'Art project',
                        startDate : '2022-03-21',
                        segments  : [
                            { startDate : '2022-03-21', duration : 1, eventColor : 'red' },
                            { startDate : '2022-03-23', duration : 1, eventColor : 'blue' },
                            { startDate : '2022-03-25', duration : 1, eventColor : 'green' }
                        ]
                    },
                    {
                        id         : 2,
                        name       : 'DIY project',
                        startDate  : '2022-03-21',
                        eventColor : 'gray',
                        segments   : [
                            // segments can have their own names & colors
                            { name : 'Plan', startDate : '2022-03-21', duration : 1, eventColor : 'red' },
                            { name : 'Get supplies', startDate : '2022-03-23', duration : 2  }
                        ]
                    }
                ],

                assignmentsData : [
                    { id : 1, event : 1, resource : 1 },
                    { id : 7, event : 2, resource : 2 }
                ]
            }
        });

        t.selectorExists('.b-sch-color-blue.b-sch-event-segment');
        t.is(t.global.getComputedStyle(t.query('.b-sch-color-blue.b-sch-event-segment')[0]).backgroundColor, 'rgb(77, 173, 247)', 'eventColor supported');

        t.is(t.global.getComputedStyle(t.query('[data-event-id="2"] .b-sch-color-gray.b-sch-event-segment')[0]).backgroundColor, 'rgb(160, 160, 160)', 'eventColor inherited');
        t.is(t.global.getComputedStyle(t.query('[data-event-id="2"] .b-sch-color-red.b-sch-event-segment')[0]).backgroundColor, 'rgb(255, 135, 135)', 'eventColor on segment overrides outer event eventColor');
        t.is(t.global.getComputedStyle(t.query('[data-event-id="2"] .b-sch-color-gray.b-sch-event-segment')[0]).backgroundColor, 'rgb(160, 160, 160)', 'eventColor inherited');
    });

    t.it('Task eventColor should affect segments', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate  : new Date(2019, 5, 3),
            endDate    : new Date(2019, 6, 1),
            eventsData : [
                {
                    id          : 11,
                    name        : 'Investigate',
                    percentDone : 50,
                    startDate   : '2019-06-03',
                    eventColor  : '#000',
                    segments    : [
                        {
                            id        : 1,
                            startDate : '2019-06-03',
                            duration  : 1
                        },
                        {
                            id        : 2,
                            startDate : '2019-06-05',
                            duration  : 2
                        },
                        {
                            id        : 3,
                            startDate : '2019-06-10',
                            duration  : 1
                        }
                    ]
                }
            ],
            resourcesData   : [{ id : 'r1', name : 'Resource 1' }],
            assignmentsData : [{ id : 'a1', resource : 'r1', event : 11 }]
        });

        const outerEventStyle = window.getComputedStyle(document.querySelector('.b-sch-event'));
        t.isNot(outerEventStyle.color, 'rgb(0, 0, 0)', 'Outer task element unaffected 1/2');
        t.isNot(outerEventStyle.backgroundColor, 'rgb(0, 0, 0)', 'Outer task element unaffected 2/2');

        const eventSegmentStyle = window.getComputedStyle(document.querySelector('.b-sch-event .b-sch-event'));
        t.is(eventSegmentStyle.backgroundColor, 'rgb(0, 0, 0)', 'Task segment colored');
    });

    // https://github.com/bryntum/support/issues/6531
    t.it('Should be able to set HEX eventColor on segments', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            startDate  : new Date(2022, 2, 21),
            endDate    : new Date(2022, 2, 25),
            eventStyle : null,
            project    : {
                resourcesData : [
                    { id : 1, name : 'Bruce' }
                ],

                eventsData : [
                    {
                        id        : 1,
                        name      : 'Art project',
                        startDate : '2022-03-21',
                        segments  : [
                            { startDate : '2022-03-21', duration : 1, eventColor : '#000000' },
                            { startDate : '2022-03-23', duration : 1, eventColor : 'blue' }
                        ]
                    }
                ],
                assignmentsData : [
                    { id : 1, event : 1, resource : 1 }
                ]
            }
        });

        t.is(t.global.getComputedStyle(t.query('.b-sch-event-segment')[0]).backgroundColor, 'rgb(0, 0, 0)', 'HEX eventColor supported');
    });
});
