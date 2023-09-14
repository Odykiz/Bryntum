
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Buffer should render in vertical mode', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer  : true,
                dependencies : false
            },
            enableEventAnimations : false,
            barMargin             : 0,
            mode                  : 'vertical',
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

        const
            event1rect = t.rect('[data-event-id="1"]'),
            event2rect = t.rect('[data-event-id="2"]');

        t.isApproxPx(event1rect.width, schedulerPro.resourceColumnWidth / 2, 'Event 1 width is ok');
        t.isApproxPx(event2rect.width, schedulerPro.resourceColumnWidth / 2, 'Event 2 width is ok');
        t.isApproxPx(event2rect.left, event1rect.right, 'Event 2 is positioned to the right');

        t.assertVerticalBufferEventSize(1, schedulerPro);
        t.assertVerticalBufferEventSize(2, schedulerPro);
    });

    t.it('Should drag create/resize in vertical mode', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            enableEventAnimations : false,
            features              : {
                eventBuffer  : true,
                dependencies : false
            },
            barMargin        : 0,
            mode             : 'vertical',
            startDate        : '2011-01-03',
            endDate          : '2011-01-13',
            eventsData       : [],
            assignmentsData  : [],
            dependenciesData : []
        });

        const { resourceColumnWidth, tickSize } = schedulerPro;

        await t.dragBy({
            source : '.b-verticaltimeaxis-row',
            offset : [resourceColumnWidth, tickSize + 2],
            delta  : [0, tickSize * 2]
        });

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        await t.click('[data-ref="saveButton"]');

        const event = schedulerPro.eventStore.first;

        t.is(event.startDate, new Date(2011, 0, 3), 'New event start date is ok');
        t.is(event.endDate, new Date(2011, 0, 5), 'New event end date is ok');

        await t.dragBy({
            source : '.b-sch-event',
            offset : ['50%', '100%-5'],
            delta  : [0, tickSize * 1]
        });

        await t.dragBy({
            source : '.b-sch-event',
            offset : ['50%', 5],
            delta  : [0, tickSize * 1]
        });

        t.is(event.startDate, new Date(2011, 0, 4), 'New event start date is ok');
        t.is(event.endDate, new Date(2011, 0, 6), 'New event end date is ok');
    });

    t.it('Should drag event to another resource in vertical mode', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            enableEventAnimations : false,
            features              : {
                eventBuffer  : true,
                dependencies : false
            },
            barMargin  : 0,
            mode       : 'vertical',
            startDate  : '2011-01-03',
            endDate    : '2011-01-13',
            eventsData : [
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

        const
            {
                resourceColumnWidth,
                tickSize
            }      = schedulerPro,
            event2 = schedulerPro.eventStore.last,
            done   = t.livesOkAsync('Should move event');

        await t.dragBy({
            source : '[data-event-id="2"]',
            delta  : [resourceColumnWidth, -tickSize]
        });

        t.is(event2.startDate, new Date(2011, 0, 5), 'Event 2 start date is ok');
        t.is(event2.resourceId, 3, 'Event 2 resource is ok');

        done();
    });

    t.it('Should resize event with buffer span', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer  : true,
                dependencies : false
            },
            enableEventAnimations : false,
            barMargin             : 0,
            mode                  : 'vertical',
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

        const
            { tickSize }     = schedulerPro,
            [event1, event2] = schedulerPro.eventStore.getRange();

        await t.dragBy({
            source : '[data-event-id="2"]',
            delta  : [0, tickSize]
        });

        t.is(event2.startDate, new Date(2011, 0, 7), 'Start date is ok');

        const event1rect = t.rect('[data-event-id="1"]'),
            event2rect = t.rect('[data-event-id="2"]');

        t.is(event1rect.width, event2rect.width, 'Element width is ok');

        await t.dragBy({
            source : '[data-event-id="1"] .b-sch-event',
            offset : ['50%', '100%-5'],
            delta  : [0, tickSize]
        });

        t.is(event1.wrapStartDate, new Date(2011, 0, 3, 12), 'Event 1 wrap start is ok');
        t.is(event1.startDate, new Date(2011, 0, 4), 'Event 1 start date is ok');
        t.is(event1.endDate, new Date(2011, 0, 6), 'Event 1 end date is ok');
        t.is(event1.wrapEndDate, new Date(2011, 0, 7), 'Event 1 wrap end is ok');

        await t.dragBy({
            source : '[data-event-id="1"] .b-sch-event',
            offset : ['50%', 5],
            delta  : [0, tickSize]
        });

        t.is(event1.wrapStartDate, new Date(2011, 0, 4, 12), 'Event 1 wrap start is ok');
        t.is(event1.startDate, new Date(2011, 0, 5), 'Event 1 start date is ok');
        t.is(event1.endDate, new Date(2011, 0, 6), 'Event 1 end date is ok');
        t.is(event1.wrapEndDate, new Date(2011, 0, 7), 'Event 1 wrap end is ok');
    });

    t.it('Event buffer should work with sticky events', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer  : true,
                dependencies : false
            },
            enableEventAnimations : false,
            barMargin             : 0,
            mode                  : 'vertical',
            startDate             : '2011-01-03',
            endDate               : '2011-01-13',
            eventsData            : [
                {
                    id        : 1,
                    name      : 'Event 1',
                    startDate : '2011-01-04',
                    endDate   : '2011-01-06',
                    preamble  : '12h',
                    postamble : '1d'
                },
                {
                    id        : 2,
                    name      : 'Event 2',
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

        await schedulerPro.scrollToDate(new Date(2011, 0, 5), { block : 'start' });

        const
            eventRect   = t.rect('[data-event-id="1"] .b-sch-event'),
            contentRect = t.rect('[data-event-id="1"] .b-sch-event-content');

        t.isApproxPx(contentRect.top, eventRect.top + eventRect.height / 2, 20, 'Content is aligned to the middle of the event element');
    });

    // https://github.com/bryntum/support/issues/4239
    t.it('Buffer should work in vertical mode when providing start + duration in data', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer  : true,
                dependencies : false
            },
            enableEventAnimations : false,
            barMargin             : 0,
            mode                  : 'vertical',
            startDate             : '2011-01-03',
            endDate               : '2011-01-13',
            eventsData            : [
                {
                    id        : 1,
                    startDate : '2011-01-04',
                    duration  : 1,
                    preamble  : '12h',
                    postamble : '1d'
                }
            ],
            assignmentsData : [
                {
                    id         : 1,
                    event      : 1,
                    resourceId : 2
                }
            ]
        });

        const
            eventBarRect = t.rect('[data-event-id="1"] .b-sch-event');

        t.assertVerticalBufferEventSize(1, schedulerPro);

        t.isApprox(t.rect('.b-sch-event-buffer-before .b-buffer-label').bottom, eventBarRect.top, 'Top label positioned ok');
        t.isApprox(t.rect('.b-sch-event-buffer-after .b-buffer-label').top, eventBarRect.bottom, 'Bottom label positioned ok');
    });
});
