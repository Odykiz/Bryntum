
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Should render buffer before/after event', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            enableEventAnimations : false,
            startDate             : '2011-01-03',
            endDate               : '2011-01-13',
            eventsData            : [
                {
                    id        : 1,
                    startDate : '2011-01-04',
                    endDate   : '2011-01-05',
                    preamble  : '12h',
                    postamble : '1d'
                },
                {
                    id        : 2,
                    startDate : '2011-01-06',
                    endDate   : '2011-01-07',
                    preamble  : '12h',
                    postamble : '12h'
                }
            ],
            assignmentsData : [
                {
                    id         : 1,
                    event      : 1,
                    resourceId : 2
                },
                {
                    id         : 2,
                    event      : 2,
                    resourceId : 2
                }
            ],
            dependenciesData : []
        });

        t.assertBufferEventSize(1, schedulerPro);
        t.assertBufferEventSize(2, schedulerPro);

        const event2 = schedulerPro.eventStore.getById(2);

        let event1Rect = t.rect('[data-event-id="1"]'),
            event2Rect = t.rect('[data-event-id="2"]');

        t.isGreater(event2Rect.top, event1Rect.bottom, 'Buffer duration affects event position');

        const spy = t.spyOn(schedulerPro.currentOrientation, 'getTimeSpanRenderData');

        event2.startDate = new Date(2011, 0, 6, 12);

        await schedulerPro.project.commitAsync();

        t.is(event2.outerStartDate, new Date(2011, 0, 6), 'Outer start is ok');
        t.is(event2.wrapStartDate, new Date(2011, 0, 6), 'Wrap start is ok');
        t.is(event2.startDate, new Date(2011, 0, 6, 12), 'Event start is ok');
        t.is(event2.endDate, new Date(2011, 0, 7, 12), 'Event end is ok');
        t.is(event2.wrapEndDate, new Date(2011, 0, 8), 'Wrap end is ok');
        t.is(event2.outerEndDate, new Date(2011, 0, 8), 'Outer end is ok');

        t.expect(spy).toHaveBeenCalled(2);

        t.assertBufferEventSize(1, schedulerPro);
        t.assertBufferEventSize(2, schedulerPro);

        event2.preamble = '1d';

        await schedulerPro.project.commitAsync();

        event1Rect = t.rect('[data-event-id="1"]');
        event2Rect = t.rect('[data-event-id="2"]');

        t.isGreater(event2Rect.top, event1Rect.bottom, 'Event 2 moved below 1');

        t.assertBufferEventSize(2, schedulerPro);
    });

    t.it('Should dragdrop event', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            enableEventAnimations : false,
            startDate             : '2011-01-03',
            endDate               : '2011-01-13',
            eventsData            : [
                {
                    id        : 1,
                    startDate : '2011-01-04',
                    endDate   : '2011-01-05',
                    preamble  : '12h',
                    postamble : '1d'
                },
                {
                    id        : 2,
                    startDate : '2011-01-06',
                    endDate   : '2011-01-07',
                    preamble  : '12h',
                    postamble : '12h'
                },
                {
                    id        : 3,
                    startDate : '2011-01-06',
                    endDate   : '2011-01-07'
                }
            ],
            assignmentsData : [
                {
                    id       : 1,
                    event    : 1,
                    resource : 2
                },
                {
                    id       : 2,
                    event    : 2,
                    resource : 2
                },
                {
                    id       : 3,
                    event    : 3,
                    resource : 4
                }
            ],
            dependenciesData : []
        });

        await t.dragBy({
            source : '[data-event-id="2"] .b-sch-event',
            delta  : [schedulerPro.tickSize, 0]
        });

        await schedulerPro.project.commitAsync();

        t.assertBufferEventSize(1, schedulerPro);
        t.assertBufferEventSize(2, schedulerPro);

        const event2 = schedulerPro.eventStore.getById(2);

        t.is(event2.startDate, new Date(2011, 0, 7), 'Event 2 start is ok');
        t.is(event2.endDate, new Date(2011, 0, 8), 'Event 2 end is ok');

        await t.dragBy({
            source : '[data-event-id="3"] .b-sch-event',
            delta  : [schedulerPro.tickSize * 2, schedulerPro.rowHeight]
        });

        await schedulerPro.project.commitAsync();

        t.assertBufferEventSize(3, schedulerPro);
    });

    t.it('Should resize event', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            enableEventAnimations : false,
            startDate             : '2011-01-03',
            endDate               : '2011-01-13',
            eventsData            : [
                {
                    id        : 1,
                    startDate : '2011-01-04',
                    endDate   : '2011-01-05',
                    preamble  : '12h',
                    postamble : '1d'
                },
                {
                    id        : 2,
                    startDate : '2011-01-06',
                    endDate   : '2011-01-07',
                    preamble  : '12h',
                    postamble : '12h'
                }
            ],
            assignmentsData : [
                {
                    id       : 1,
                    event    : 1,
                    resource : 2
                },
                {
                    id       : 2,
                    event    : 2,
                    resource : 2
                }
            ],
            dependenciesData : [],
            calendarsData    : []
        });

        const event2 = schedulerPro.eventStore.getById(2);

        // Resize end
        await t.moveMouseTo('[data-event-id="2"] .b-sch-event');

        // Drag by right edge
        await t.dragBy({
            source : '[data-event-id="2"] .b-sch-event',
            offset : ['100%-5', '50%'],
            delta  : [schedulerPro.tickSize * 2 + 5, 0]
        });

        await schedulerPro.project.commitAsync();

        t.assertBufferEventSize(1, schedulerPro);
        t.assertBufferEventSize(2, schedulerPro);

        t.is(event2.wrapStartDate, new Date(2011, 0, 5, 12), 'Event 2 wrap start is ok');
        t.is(event2.startDate, new Date(2011, 0, 6), 'Event 2 start is ok');
        t.is(event2.endDate, new Date(2011, 0, 9), 'Event 2 end is ok');
        t.is(event2.wrapEndDate, new Date(2011, 0, 9, 12), 'Event 2 wrap end is ok');

        // Resize start
        await t.dragBy({
            source : '[data-event-id="2"] .b-sch-event',
            offset : [5, '50%'],
            delta  : [schedulerPro.tickSize * -1 - 5, 0]
        });

        await schedulerPro.project.commitAsync();

        t.assertBufferEventSize(1, schedulerPro);
        t.assertBufferEventSize(2, schedulerPro);

        t.is(event2.wrapStartDate, new Date(2011, 0, 4, 12), 'Event 2 wrap start is ok');
        t.is(event2.startDate, new Date(2011, 0, 5), 'Event 2 start is ok');
        t.is(event2.endDate, new Date(2011, 0, 9), 'Event 2 end is ok');
        t.is(event2.wrapEndDate, new Date(2011, 0, 9, 12), 'Event 2 wrap end is ok');
    });

    t.it('Should drag create event (slow)', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            enableEventAnimations : false,
            weekStartDay          : 1,
            startDate             : '2011-01-03',
            endDate               : '2011-01-13',
            eventsData            : [],
            assignmentsData       : [],
            dependenciesData      : [],
            calendarsData         : []
        });

        const { tickSize } = schedulerPro;

        await t.dragBy({
            source   : '[data-id="3"] .b-sch-timeaxis-cell',
            offset   : [tickSize, '50%'],
            delta    : [tickSize * 2, 0],
            dragOnly : true
        });

        await t.moveMouseBy([tickSize, 0]);

        const el = document.querySelector('.b-sch-event');

        t.isApproxPx(el.offsetWidth, tickSize * 3, 'Element size is ok');

        await t.mouseUp();

        await t.click('[data-ref="saveButton"]');

        await schedulerPro.project.commitAsync();

        const event = schedulerPro.eventStore.last;

        t.assertBufferEventSize(event, schedulerPro);

        t.is(event.wrapStartDate, event.startDate, 'Event wrap start is ok');
        t.is(event.startDate, new Date(2011, 0, 4), 'Event start date is ok');
        t.is(event.endDate, new Date(2011, 0, 7), 'Event end date is ok');
        t.is(event.wrapEndDate, event.endDate, 'Event wrap end is ok');

        await t.dragBy({
            source : '.b-sch-event',
            delta  : [tickSize * 2, 0]
        });

        await schedulerPro.project.commitAsync();

        t.assertBufferEventSize(event, schedulerPro);

        t.is(event.wrapStartDate, event.startDate, 'Event wrap start is ok');
        t.is(event.startDate, new Date(2011, 0, 6), 'Event start date is ok');
        t.is(event.endDate, new Date(2011, 0, 9), 'Event end date is ok');
        t.is(event.wrapEndDate, event.endDate, 'Event wrap end is ok');
    });

    t.it('Should drag create event (fast)', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            enableEventAnimations : false,
            weekStartDay          : 1,
            startDate             : '2011-01-03',
            endDate               : '2011-01-13',
            eventsData            : [],
            assignmentsData       : [],
            dependenciesData      : [],
            calendarsData         : []
        });

        const { tickSize } = schedulerPro;

        await t.dragBy({
            source : '[data-id="3"] .b-sch-timeaxis-cell',
            offset : [tickSize, '50%'],
            delta  : [tickSize * 3, 0]
        });

        await t.click('[data-ref="saveButton"]');

        await schedulerPro.project.commitAsync();

        const event = schedulerPro.eventStore.last;

        t.assertBufferEventSize(event, schedulerPro);

        t.is(event.wrapStartDate, event.startDate, 'Event wrap start is ok');
        t.is(event.startDate, new Date(2011, 0, 4), 'Event start date is ok');
        t.is(event.endDate, new Date(2011, 0, 7), 'Event end date is ok');
        t.is(event.wrapEndDate, event.endDate, 'Event wrap end is ok');

        await t.dragBy({
            source : '.b-sch-event',
            delta  : [tickSize * 2, 0]
        });

        await schedulerPro.project.commitAsync();

        t.assertBufferEventSize(event, schedulerPro);

        t.is(event.wrapStartDate, event.startDate, 'Event wrap start is ok');
        t.is(event.startDate, new Date(2011, 0, 6), 'Event start date is ok');
        t.is(event.endDate, new Date(2011, 0, 9), 'Event end date is ok');
        t.is(event.wrapEndDate, event.endDate, 'Event wrap end is ok');
    });

    t.it('Should dragdrop/resize event with buffer duration in a scheduler with disabled buffer time', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            enableEventAnimations : false,
            startDate             : '2011-01-03',
            endDate               : '2011-01-13',
            viewPreset            : 'dayAndWeek',
            eventsData            : [
                {
                    id        : 1,
                    startDate : '2011-01-04',
                    endDate   : '2011-01-05',
                    preamble  : '12h',
                    postamble : '1d'
                },
                {
                    id        : 2,
                    startDate : '2011-01-06',
                    endDate   : '2011-01-07',
                    preamble  : '12h',
                    postamble : '1d'
                }
            ],
            assignmentsData : [
                {
                    id       : 1,
                    event    : 1,
                    resource : 2
                },
                {
                    id       : 2,
                    event    : 2,
                    resource : 2
                }
            ],
            dependenciesData : []
        });

        await t.dragBy({
            source : '[data-event-id="1"]',
            delta  : [100, 45]
        });

        await t.dragBy({
            source : '[data-event-id="2"]',
            offset : ['100%-5', '50%'],
            delta  : [100, 0]
        });

        await t.dragBy({
            source : '[data-event-id="2"]',
            offset : [5, '50%'],
            delta  : [50, 0]
        });

        const [event1, event2] = schedulerPro.eventStore.getRange();

        t.is(event1.startDate, new Date(2011, 0, 5), 'Event 1 start date is ok');
        t.is(event1.endDate, new Date(2011, 0, 6), 'Event 1 end date is ok');

        t.is(event2.startDate, new Date(2011, 0, 6, 12), 'Event 2 start date is ok');
        t.is(event2.endDate, new Date(2011, 0, 8), 'Event 2 end date is ok');

        t.assertEventsPositions(schedulerPro, [event1, event2]);
    });

    t.it('Should render long events', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            startDate  : '2021-11-21',
            endDate    : '2021-12-06',
            viewPreset : {
                base     : 'weekAndDay',
                tickSize : 100
            },
            eventsData : [
                {
                    id        : 1,
                    name      : 'Event 1',
                    startDate : '2021-11-24',
                    endDate   : '2021-11-26',
                    preamble  : '10d',
                    postamble : '10d'
                }
            ]
        });

        await t.waitForSelector('.b-sch-event');

        const eventRect = Rectangle.from(document.querySelector('.b-sch-event'));
        let contentRect = Rectangle.from(document.querySelector('.b-sch-event-content'));

        t.ok(eventRect.contains(contentRect), 'Event content is positioned correctly');

        await schedulerPro.scrollToDate(new Date(2021, 10, 25), { block : 'start' });

        // Trying to fix occasional failures in Safari on TC
        await t.waitForAnimationFrame();

        contentRect = Rectangle.from(document.querySelector('.b-sch-event-content'));

        t.isApprox(contentRect.left, schedulerPro.getCoordinateFromDate(new Date(2021, 10, 25), { local : false }), 20, 'Content is positioned correctly');
    });

    t.it('Should omit duration text', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : {
                    showDuration : false
                }
            },
            startDate  : '2021-11-21',
            endDate    : '2021-12-06',
            viewPreset : {
                base     : 'weekAndDay',
                tickSize : 100
            },
            eventsData : [
                {
                    id        : 1,
                    name      : 'Event 1',
                    startDate : '2021-11-24',
                    endDate   : '2021-11-26',
                    preamble  : '12h',
                    postamble : '1d'
                }
            ]
        });

        await t.waitForSelector('.b-sch-event');

        const
            bufferBefore = document.querySelector('.b-sch-event-buffer-before'),
            bufferAfter  = document.querySelector('.b-sch-event-buffer-after');

        t.notOk(bufferBefore.dataset.buffertime, 'Before buffer time is not rendered');
        t.notOk(bufferAfter.dataset.buffertime, 'After buffer time is not rendered');
    });

    // https://github.com/bryntum/support/issues/4892
    t.it('Should trigger one change event', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : {
                    showDuration : false
                }
            },
            startDate  : '2025-12-01',
            endDate    : '2025-12-02',
            viewPreset : {
                base     : 'weekAndDay',
                tickSize : 100
            },
            project : {
                resourcesData : [
                    { id : 1, name : 'Resource 1' },
                    { id : 2, name : 'Resource 2' },
                    { id : 3, name : 'Resource 3' },
                    { id : 4, name : 'Resource 4' },
                    { id : 5, name : 'Resource 5' }
                ],

                eventsData : [
                    {
                        id         : 2,
                        resourceId : 1,
                        name       : 'Tunnel ventilation maintenance',
                        startDate  : '2025-12-01T15:00:00',
                        duration   : 3,
                        preamble   : '30min',
                        postamble  : '1h'
                    },
                    {
                        id         : 113,
                        resourceId : 2,
                        name       : 'Replace IE & Edge with Chrome',
                        startDate  : '2025-12-02T09:00:00',
                        duration   : 4,
                        eventColor : '#ba2ce5',
                        preamble   : '1h',
                        postamble  : '1h'
                    },
                    {
                        id         : 114,
                        resourceId : 5,
                        name       : 'Remove dust from empty seats',
                        startDate  : '2025-12-02T10:00:00',
                        duration   : 4,
                        preamble   : '30min',
                        postamble  : '30min'
                    },
                    {
                        id         : 115,
                        resourceId : 5,
                        name       : 'Road maintenance',
                        startDate  : '2025-12-02T14:00:00',
                        duration   : 3
                    }
                ]
            }
        });

        t.willFireNTimes(schedulerPro.eventStore, 'change', 2);

        await t.dragBy({
            source : '.b-sch-event:contains(Tunnel)',
            delta  : [100, 0]
        });

        await t.dragBy({
            source : '.b-sch-event:contains(Tunnel)',
            delta  : [100, 0]
        });

        await schedulerPro.project.commitAsync();
    });

    // https://github.com/bryntum/support/issues/4892
    t.it('Should not include buffer time in drag drop tooltip', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : {
                    showDuration : false
                }
            },
            startDate   : '2025-12-01T12:00:00',
            endDate     : '2025-12-01T19:00:00',
            workingTime : { toHour : 23, fromHour : 7 },

            viewPreset : 'hourAndDay',
            project    : {
                resourcesData : [
                    { id : 1, name : 'Resource 1' }
                ],

                eventsData : [
                    {
                        id         : 2,
                        resourceId : 1,
                        name       : 'Tunnel ventilation maintenance',
                        startDate  : '2025-12-01T15:00:00',
                        endDate    : '2025-12-01T16:00:00',
                        preamble   : '30min',
                        postamble  : '1h'
                    }
                ]
            }
        });

        await t.dragBy({
            source   : '.b-sch-event',
            dragOnly : true,
            delta    : [-schedulerPro.tickSize, 0]
        });

        t.selectorExists('.b-sch-tooltip-startdate:regex(Dec 1, 2025 2\\sPM)');
    });

    // https://github.com/bryntum/support/issues/6156
    t.it('Should support updating event buffer using `set` method', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            startDate  : '2025-12-01T12:00:00',
            endDate    : '2025-12-01T19:00:00',
            viewPreset : 'hourAndDay',
            project    : {
                resourcesData : [
                    { id : 1, name : 'Resource 1' }
                ],

                eventsData : [
                    {
                        id         : 1,
                        resourceId : 1,
                        startDate  : '2025-12-01T15:00:00',
                        endDate    : '2025-12-01T16:00:00',
                        preamble   : '30min',
                        postamble  : '1h'
                    }
                ]
            }
        });

        const oneHourWidth = t.rect('.b-sch-event-buffer-after').width;

        schedulerPro.eventStore.first.set({ preamble : '1h', postamble : '2h' });
        t.is(t.rect('.b-sch-event-buffer-before').width, oneHourWidth, 'Preamble updated ok first time');
        t.is(t.rect('.b-sch-event-buffer-after').width, oneHourWidth * 2, 'Postamble updated ok first time');
        t.selectorExists('.b-sch-event-buffer-before:contains(1 h)');
        t.selectorExists('.b-sch-event-buffer-after:contains(2 h)');

        schedulerPro.eventStore.first.set({ preamble : '2h', postamble : '3h' });
        t.is(t.rect('.b-sch-event-buffer-before').width, oneHourWidth * 2, 'Preamble updated ok second time');
        t.is(t.rect('.b-sch-event-buffer-after').width, oneHourWidth * 3, 'Postamble updated ok second time');
        t.selectorExists('.b-sch-event-buffer-before:contains(2 h)');
        t.selectorExists('.b-sch-event-buffer-after:contains(3 h)');

        schedulerPro.eventStore.first.set('preamble', '1h');
        t.is(t.rect('.b-sch-event-buffer-before').width, oneHourWidth, 'Preamble updated ok using set with field name');
        t.is(t.rect('.b-sch-event-buffer-after').width, oneHourWidth * 3, 'Postamble updated using set with field name');
        t.selectorExists('.b-sch-event-buffer-before:contains(1 h)');
        t.selectorExists('.b-sch-event-buffer-after:contains(3 h)');
    });
});
