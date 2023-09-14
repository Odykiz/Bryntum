
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Should update record when creating dependency', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            eventsData : [
                {
                    id        : 1,
                    startDate : '2020-03-24',
                    endDate   : '2020-03-25',
                    preamble  : '1d',
                    postamble : '12h'
                },
                {
                    id        : 2,
                    startDate : '2020-03-26',
                    endDate   : '2020-03-27',
                    preamble  : '1d',
                    postamble : '12h'
                }
            ],
            dependenciesData : [],
            calendarsData    : []
        });

        t.assertBufferEventSize(1, schedulerPro);
        t.assertBufferEventSize(2, schedulerPro);

        await schedulerPro.dependencyStore.addAsync({
            from : 1,
            to   : 2
        });

        const [event1, event2] = schedulerPro.eventStore.getRange();

        t.is(event1.wrapStartDate, new Date(2020, 2, 23), 'Event 1 wrap start is ok');
        t.is(event1.startDate, new Date(2020, 2, 24), 'Event 1 start is ok');
        t.is(event1.endDate, new Date(2020, 2, 25), 'Event 1 end is ok');
        t.is(event1.wrapEndDate, new Date(2020, 2, 25, 12), 'Event 1 wrap end is ok');

        t.is(event2.wrapStartDate, new Date(2020, 2, 24), 'Event 2 wrap start is ok');
        t.is(event2.startDate, new Date(2020, 2, 25), 'Event 2 start is ok');
        t.is(event2.endDate, new Date(2020, 2, 26), 'Event 2 end is ok');
        t.is(event2.wrapEndDate, new Date(2020, 2, 26, 12), 'Event 2 wrap end is ok');
    });

    t.it('Should edit buffer duration using task editor', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            eventsData : [
                {
                    id        : 1,
                    startDate : '2020-03-24',
                    endDate   : '2020-03-25',
                    preamble  : '1d',
                    postamble : '12h'
                },
                {
                    id        : 2,
                    name      : 'Event 2',
                    startDate : '2020-03-26',
                    endDate   : '2020-03-27',
                    preamble  : '1d',
                    postamble : '12h'
                }
            ],
            dependenciesData : [],
            calendarsData    : []
        });

        const event2 = schedulerPro.eventStore.getById(2);

        await t.doubleClick('[data-event-id="2"] .b-sch-event');

        await t.type('[data-ref="preambleField"] input', '[UP][ENTER]');

        await t.waitFor({
            method() {
                return event2.outerStartDate.getTime() === new Date(2020, 2, 24).getTime();
            },
            desc : 'Preamble time changed'
        });

        await schedulerPro.project.commitAsync();

        await t.doubleClick('[data-event-id="2"] .b-sch-event');

        await t.type('[data-ref="postambleField"] input', '[UP][ENTER]');

        await t.waitFor({
            method() {
                return event2.outerEndDate.getTime() === new Date(2020, 2, 27, 13).getTime();
            },
            desc : 'Preamble time changed'
        });

        await schedulerPro.project.commitAsync();

        t.is(event2.outerStartDate, new Date(2020, 2, 24), 'Outer start is ok');
        t.is(event2.outerEndDate, new Date(2020, 2, 27, 13), 'Outer end is ok');
    });

    t.it('Should support sticky events', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            eventsData : [
                {
                    id        : 1,
                    startDate : '2020-03-23',
                    endDate   : '2020-03-25',
                    preamble  : '1.5d',
                    postamble : '12h'
                }
            ],
            dependenciesData : [],
            calendarsData    : []
        });

        const { tickSize } = schedulerPro;

        await t.waitForSelector('.b-sch-event');

        let eventRect   = t.rect('.b-sch-event'),
            contentRect = t.rect('.b-sch-event-content');

        t.isApproxPx(contentRect.left, eventRect.left, 15, 'Content is positioned correctly');

        await t.dragBy({
            source : '.b-sch-event',
            delta  : [-tickSize, 0]
        });

        eventRect = t.rect('.b-sch-event');
        contentRect = t.rect('.b-sch-event-content');

        t.isApproxPx(contentRect.left, eventRect.left, 15, 'Content is positioned correctly');

        await schedulerPro.scrollTo(tickSize * 1.5);

        eventRect = t.rect('.b-sch-event');
        contentRect = t.rect('.b-sch-event-content');

        t.isLessOrEqual(contentRect.right, eventRect.right, 'Content is positioned correctly');
    });

    t.it('Should support tooltipTemplate config', async t => {
        let expectedBefore = true;

        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : {
                    tooltipTemplate : ({ duration, eventRecord, before }) => {
                        if (before) {
                            t.is(duration.toString(true), '1 d', 'duration');
                        }
                        else {
                            t.is(duration.toString(true), '12 h', 'duration');
                        }
                        t.is(eventRecord.name, 'The event', 'eventRecord');
                        t.is(before, expectedBefore, 'before');
                        return 'foo';
                    }
                }
            },
            eventsData : [
                {
                    id        : 1,
                    name      : 'The event',
                    startDate : '2020-03-24',
                    endDate   : '2020-03-25',
                    preamble  : '1d',
                    postamble : '12h'
                }
            ]
        });

        await t.moveCursorTo('.b-sch-event-buffer-before');
        await t.waitForSelector('.b-tooltip:contains(foo)');

        expectedBefore = false;
        await t.moveCursorTo('.b-sch-event-buffer-after');
        await t.waitForSelector('.b-tooltip:contains(foo)');
    });
});
