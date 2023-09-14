
StartTest(t => {
    let scheduler;

    t.beforeEach(() => {
        scheduler?.destroy();
    });

    async function assertTimeZoneConversion(t, { startDateString, endDateString, events, timeRanges }) {
        t.is(scheduler.startDate.toString(), new Date(startDateString).toString());
        t.is(scheduler.endDate.toString(), new Date(endDateString).toString());

        await t.assertColumnLines();

        // Check ticks tooltip
        const
            tipY = scheduler.bodyContainer.getBoundingClientRect().y + scheduler.rowHeight / 2,
            tipX = scheduler.timeAxisSubGrid.x + 5;
        await t.moveMouseTo([tipX, tipY]);

        const [tipEl] = await t.waitForSelector('.b-sch-scheduletip .b-sch-clock-text');

        t.contentLike(tipEl, scheduler.getFormattedDate(scheduler.startDate), 'Tooltip content is ok');

        // Check events
        for (const expectEvent of events) {
            if (expectEvent.id) {
                t.diag('Checking event ' + expectEvent.id);
                const event = scheduler.eventStore.getById(expectEvent.id);
                if (expectEvent.startDateString) {
                    t.is(event.startDate.toString(), new Date(expectEvent.startDateString), 'Start date ok');
                }
                if (expectEvent.endDateString) {
                    t.is(event.endDate.toString(), new Date(expectEvent.endDateString), 'End date ok');
                }

                // Check event tooltip, but not for nested events parents
                if (!event.isParent) {
                    await t.moveMouseTo(`[data-event-id="${expectEvent.id}"] .b-sch-event`);

                    const
                        [tooltipStartDate] = await t.waitForSelector('.b-sch-event-tooltip .b-sch-clock-hour.b-sch-tooltip-startdate'),
                        [tooltipEndDate]   = t.query('.b-sch-event-tooltip .b-sch-clock-hour.b-sch-tooltip-enddate');

                    t.contentLike(tooltipStartDate, scheduler.getFormattedDate(event.startDate), 'Event tip start date is ok');
                    t.contentLike(tooltipEndDate, scheduler.getFormattedDate(event.endDate), 'Event tip end date is ok');
                }
            }
        }

        // Check time ranges
        if (timeRanges && scheduler.features.timeRanges) {
            for (const expectTimeRange of timeRanges) {
                if (expectTimeRange.id) {
                    t.diag('Checking time range ' + expectTimeRange.id);
                    const timeRange = scheduler.timeRangeStore.getById(expectTimeRange.id);
                    if (expectTimeRange.startDateString) {
                        t.is(timeRange.startDate.toString(), new Date(expectTimeRange.startDateString), 'Start date ok');
                    }
                    if (expectTimeRange.endDateString) {
                        t.is(timeRange.endDate.toString(), new Date(expectTimeRange.endDateString), 'End date ok');
                    }

                    // check position
                    const
                        expectedX = scheduler.timeAxisSubGrid.x + scheduler.timeAxisViewModel.getPositionFromDate(timeRange.startDate),
                        currentX  = document.querySelector('.b-sch-timerange').getBoundingClientRect().x;

                    t.isApproxPx(expectedX, currentX, 1, 'Correctly positioned on x-axis');
                }
            }
        }

        if (scheduler.project.changes != null) {
            for (const store in scheduler.project.changes) {
                if (scheduler.project.changes[store].modified) {
                    t.fail('Found changes in ' + store);
                }
            }
        }

        t.is(scheduler.eventStore.modified.count + scheduler.timeRangeStore.modified.count, 0, 'No modifications found');

        // Need to be sure that tooltips is closed when running in turbo mode
        await t.click([0, 0]);
    }

    t.it('Should work to set IANA time zone initially', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            timeZone   : 'America/Chicago',
            startDate  : new Date('2022-10-11T13:00:00-05:00'),
            endDate    : new Date('2022-10-13T19:00:00-05:00'),
            events     : [
                { id : 1, startDate : '2022-10-11T20:00:00Z', duration : 1, durationUnit : 'hour' }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T13:00:00',
            endDateString   : '2022-10-13T19:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-11T15:00:00' }
            ]
        });
    });

    t.it('Should work to set time zone at runtime', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            startDate  : new Date('2022-10-11T13:00:00Z'),
            endDate    : new Date('2022-10-13T19:00:00Z'),
            events     : [
                { id : 1, startDate : '2022-10-11T20:00:00Z', duration : 1, durationUnit : 'hour' }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        scheduler.timeZone = 'America/Chicago';
        await t.waitForEvent(scheduler.project, 'timeZoneChange');
        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T08:00:00',
            endDateString   : '2022-10-13T14:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-11T15:00:00' }
            ]
        });
    });

    t.it('Should work to change time zone at runtime', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            startDate  : new Date('2022-10-11T13:00:00-05:00'),
            endDate    : new Date('2022-10-13T19:00:00-05:00'),
            timeZone   : 'America/Chicago',
            events     : [
                { id : 1, startDate : '2022-10-11T20:00:00Z', duration : 1, durationUnit : 'hour' }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        scheduler.timeZone = 'Europe/Stockholm';
        await t.waitForEvent(scheduler.project, 'timeZoneChange');
        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T20:00:00',
            endDateString   : '2022-10-14T02:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-11T22:00:00' }
            ]
        });
    });

    t.it('Should get local unconverted date when commiting', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            startDate  : new Date('2022-10-11T13:00:00'),
            endDate    : new Date('2022-10-13T19:00:00'),
            timeZone   : 'America/Chicago',
            events     : [
                { id : 1, startDate : '2022-10-11T20:00:00Z', duration : 1, durationUnit : 'hour' }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        const rec = scheduler.eventStore.first;
        await scheduler.project.commitAsync();
        //t.is(rec.rawModificationData.startDate.toISOString(), '2022-10-11T20:00:00.000Z', 'Original date correct');
        t.is(rec.rawModificationData, undefined, 'No modification data initially');

        rec.startDate = DateHelper.add(rec.startDate, 2, 'hour');
        await scheduler.project.commitAsync();
        t.is(rec.rawModificationData.startDate.toISOString(), '2022-10-11T22:00:00.000Z', 'Modified date correct');
    });

    t.it('New record should be created with dates in current active time zone', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            startDate  : new Date('2022-10-11T13:00:00-05:00'),
            endDate    : new Date('2022-10-13T19:00:00-05:00'),
            timeZone   : 'America/Chicago',
            events     : [
                { id : 1, startDate : '2022-10-11T20:00:00Z', duration : 1, durationUnit : 'hour' }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ],
            dependencies : []
        });
        scheduler.eventStore.add({ id : 2, startDate : new Date('2022-10-11T21:00:00'), duration : 1, durationUnit : 'hour' });
        scheduler.assignmentStore.add({ id : 2, resource : 1, event : 2 });

        await scheduler.project.commitAsync();

        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T13:00:00',
            endDateString   : '2022-10-13T19:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-11T15:00:00' },
                { id : 2, startDateString : '2022-10-11T21:00:00' }
            ]
        });
    });

    t.it('Should convert time ranges', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            startDate  : new Date('2022-10-11T08:00:00+03:00'),
            endDate    : new Date('2022-10-11T17:00:00+03:00'),
            timeZone   : 'Europe/Helsinki',
            features   : { timeRanges : true },
            events     : [
                { id : 1, startDate : '2022-10-11T10:00:00Z', duration : 1, durationUnit : 'hour' }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ],
            timeRanges : [
                { id : 1, startDate : '2022-10-11T09:00:00Z', endDate : '2022-10-11T10:00:00Z' }
            ]
        });

        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T08:00:00',
            endDateString   : '2022-10-11T17:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-11T13:00:00' }
            ],
            timeRanges : [
                { id : 1, startDateString : '2022-10-11T12:00:00' }
            ]
        });

    });

    t.it('Time range tooltip date is updated according to timeZone', async t => {
        scheduler = await t.getSchedulerProAsync({
            startDate  : new Date('2020-09-14T00:00+03:00'),
            endDate    : new Date('2020-09-15T00:00+03:00'),
            viewPreset : 'hourAndDay',
            timeZone   : -120,
            features   : {
                timeRanges : {
                    enableResizing : true
                }
            },
            timeRanges : [
                {
                    startDate : new Date('2020-09-14T04:30+03:00'),
                    name      : 'Line',
                    cls       : 'b-foo'
                }
            ]
        });

        await t.dragBy({
            source   : '.b-foo',
            delta    : [50, 0],
            dragOnly : true
        });

        await t.moveMouseBy([-50, 0]);

        const
            el = document.querySelector('.b-sch-clock-text'),
            expectedDate = new Date(2020, 8, 13, 23, 30),
            expectedRe = new RegExp(DateHelper.format(expectedDate, 'll LT'));

        t.expect(el.textContent).toMatch(expectedRe);
    });

    t.it('Should show current time in the timeZone', async t => {
        const start = new Date();

        scheduler = await t.getSchedulerProAsync({
            startDate  : DateHelper.add(start, -2, 'hour'),
            // This will be equal to UTC
            endDate    : DateHelper.add(start, 2, 'hour'),
            viewPreset : 'hourAndDay',
            forceFit   : true,
            timeZone   : -120,
            features   : {
                timeRanges : {
                    showCurrentTimeLine : true
                }
            }
        });

        const expectsTime = DateHelper.format(TimeZoneHelper.toTimeZone(new Date(), -120),  scheduler.features.timeRanges.currentDateFormat);

        await t.waitForSelector(`.b-sch-current-time label:contains(${expectsTime})`);

        t.pass('Current timeline is correct');
    });

    t.it('Dragcreate tip should show date local to the timeZone', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            timeZone   : -120,
            startDate  : new Date('2022-10-12T19:00-02:00'),
            endDate    : new Date('2022-10-12T19:00-02:00')
        });

        const { tickSize } = scheduler;

        await t.dragBy({
            source   : '.b-sch-timeaxis-cell',
            offset   : [tickSize, '50%'],
            delta    : [tickSize * 1.5, 0],
            dragOnly : true
        });

        const
            tooltipStartDate  = document.querySelector('.b-sch-clock-hour.b-sch-tooltip-startdate'),
            tooltipEndDate    = document.querySelector('.b-sch-clock-hour.b-sch-tooltip-enddate'),
            expectedStartDate = TimeZoneHelper.toTimeZone(new Date('2022-10-13T01:00+03:00'), -120),
            epectedEndDate    = TimeZoneHelper.toTimeZone(new Date('2022-10-13T02:30+03:00'), -120);

        t.contentLike(tooltipStartDate, scheduler.getFormattedDate(expectedStartDate), 'Dragcreate tip start date is ok');
        t.contentLike(tooltipEndDate, scheduler.getFormattedDate(epectedEndDate), 'Dragcreate tip end date is ok');

        await t.mouseUp();
    });

    t.it('Resize tip should show date local to the timeZone', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            timeZone   : -120,
            startDate  : new Date('2022-10-12T19:00-02:00'),
            endDate    : new Date('2022-10-12T19:00-02:00'),
            events     : [
                {
                    id        : 1,
                    startDate : new Date('2022-10-13T02:00+03:00'),
                    endDate   : new Date('2022-10-13T05:00+03:00')
                }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        const { tickSize } = scheduler;

        await t.dragBy({
            source   : '.b-sch-event',
            offset   : ['100%', '30%'],
            delta    : [-tickSize * 1.5, 0],
            dragOnly : true
        });

        const
            tooltipStartDate  = document.querySelector('.b-sch-clock-hour.b-sch-tooltip-startdate'),
            tooltipEndDate    = document.querySelector('.b-sch-clock-hour.b-sch-tooltip-enddate'),
            expectedStartDate = TimeZoneHelper.toTimeZone(new Date('2022-10-13T02:00+03:00'), -120),
            expectedEndDate   = TimeZoneHelper.toTimeZone(new Date('2022-10-13T03:30+03:00'), -120);

        t.contentLike(tooltipStartDate, scheduler.getFormattedDate(expectedStartDate), 'Dragresize tip start date is ok');
        t.contentLike(tooltipEndDate, scheduler.getFormattedDate(expectedEndDate), 'Dragresize tip end date is ok');

        await t.mouseUp();
    });

    t.it('Dragdrop tip should show date local to the timeZone', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            timeZone   : -120,
            startDate  : new Date(Date.UTC(2020, 8, 14)),
            endDate    : new Date(Date.UTC(2020, 8, 15)),
            events     : [
                {
                    id        : 1,
                    startDate : new Date(Date.UTC(2020, 8, 14, 7)),
                    endDate   : new Date(Date.UTC(2020, 8, 14, 9))
                }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        const { tickSize } = scheduler;

        await t.dragBy({
            source   : '.b-sch-event',
            delta    : [-tickSize * 1.5, 0],
            dragOnly : true
        });

        const
            tooltipStartDate  = document.querySelector('.b-sch-clock-hour.b-sch-tooltip-startdate'),
            tooltipEndDate    = document.querySelector('.b-sch-clock-hour.b-sch-tooltip-enddate'),
            expectedStartDate = TimeZoneHelper.toTimeZone(new Date(Date.UTC(2020, 8, 14, 5, 30)), -120),
            expectedEndDate   = TimeZoneHelper.toTimeZone(new Date(Date.UTC(2020, 8, 14, 7, 30)), -120);
        t.contentLike(tooltipStartDate, scheduler.getFormattedDate(expectedStartDate), 'Dragdrip tip start date is ok');
        t.contentLike(tooltipEndDate, scheduler.getFormattedDate(expectedEndDate), 'Dragdrip tip end date is ok');

        await t.mouseUp();
    });

    t.it('Nested events should work', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            startDate  : new Date('2022-10-12T08:00:00+10:00'),
            endDate    : new Date('2022-10-12T17:00:00+10:00'),
            features   : {
                nestedEvents : true
            },
            timeZone : 10 * 60,
            events   : [
                {
                    id           : 1,
                    startDate    : '2022-10-11T23:00:00Z',
                    duration     : 8,
                    durationUnit : 'hour',
                    children     : [
                        {
                            id           : 11,
                            startDate    : '2022-10-11T23:00:00Z',
                            duration     : 2,
                            durationUnit : 'hour'
                        },
                        {
                            id           : 12,
                            startDate    : '2022-10-12T02:00:00Z',
                            duration     : 5,
                            durationUnit : 'hour'
                        }
                    ]
                }
            ],
            assignments : [
                { id : 1, resource : 1, event : 1 },
                { id : 2, resource : 1, event : 11 },
                { id : 3, resource : 1, event : 12 }
            ]
        });

        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-12T08:00:00',
            endDateString   : '2022-10-12T17:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-12T09:00:00' },
                { id : 11, startDateString : '2022-10-12T09:00:00' },
                { id : 12, startDateString : '2022-10-12T12:00:00' }
            ]
        });

    });

    t.it('Should keep modification meta data when switching timezones', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            timeZone   : -120,
            startDate  : new Date(Date.UTC(2020, 8, 14)),
            endDate    : new Date(Date.UTC(2020, 8, 15)),
            events     : [
                {
                    id        : 1,
                    startDate : new Date(Date.UTC(2020, 8, 14, 7)),
                    endDate   : new Date(Date.UTC(2020, 8, 14, 9))
                }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        // Modify event
        scheduler.eventStore.first.startDate = DateHelper.add(scheduler.eventStore.first.startDate, 5, 'hour');
        scheduler.eventStore.first.endDate = DateHelper.add(scheduler.eventStore.first.endDate, 5, 'hour');

        await scheduler.project.commitAsync();

        scheduler.timeZone = 120;
        await scheduler.project.commitAsync();

        t.is(scheduler.project.changes.events.updated.length, 1, 'Correct updated length');
        t.is(scheduler.project.changes.events.updated[0].constraintDate.toISOString(), '2020-09-14T12:00:00.000Z', 'Persisted data returns correctly');
    });

    t.it('Should work to configure TimeLine widget with same timeZone as Scheduler', async t => {
        const today = new Date();

        scheduler = await t.getSchedulerProAsync({
            //viewPreset : 'hourAndDay',
            timeZone  : 'Europe/London',
            startDate : DateHelper.add(today, -10, 'day'),
            endDate   : DateHelper.add(today, 10, 'day'),
            height    : 400,
            events    : [{
                id             : 1,
                startDate      : today,
                duration       : 6,
                durationUnit   : 'hour',
                showInTimeline : true
            }],
            assignments : [{ id : 1, event : 1, resource : 1 }]
        });

        const timeline = Timeline.new({
            appendTo              : document.body,
            enableEventAnimations : false,
            project               : scheduler.project,
            timeZone              : scheduler.timeZone
        });

        await scheduler.project.commitAsync();
        await timeline.project.commitAsync();

        t.is(scheduler.taskStore.first.startDate.getTime(), timeline.taskStore.first.startDate.getTime(), 'Timeline record date matched scheduler');
        timeline.destroy();
    });

    t.it('Should work to use a ResourceHistogram alongside a Scheduler with a time zone set', async t => {
        const day = new Date(2023, 3, 13, 12);

        scheduler = await t.getSchedulerProAsync({
            timeZone           : -60 * 24, //Not real time zone, just for testing
            startDate          : DateHelper.add(day, -3, 'day'),
            endDate            : DateHelper.add(day, 3, 'day'),
            height             : 400,
            autoAdjustTimeAxis : false,
            eventsData         : [{
                id             : 1,
                startDate      : day,
                duration       : 6,
                durationUnit   : 'hour',
                showInTimeline : true
            }],
            assignmentsData  : [{ id : 1, event : 1, resource : 1 }],
            dependenciesData : [],
            calendarsData    : []
        });

        const histogram = new ResourceHistogram({
            project     : scheduler.project,
            appendTo    : document.body,
            hideHeaders : true,
            partner     : scheduler,
            height      : 300,
            columns     : [
                {
                    text  : 'Resource',
                    field : 'name'
                }
            ]
        });

        await histogram.project.commitAsync();

        const
            event = scheduler.eventStore.first,
            tick = Math.floor(histogram.timeAxis.getTickFromDate(event.startDate)),
            histogramData = histogram.getHistogramDataCache(scheduler.resourceStore.first);

        t.is(histogramData.allocation.total[tick].effort, event.durationMS, 'Effort correctly calculated');

        histogram.destroy();

    });

    t.it('Should work to use a ResourceUtilization widget alongside a Scheduler with a time zone set', async t => {
        const day = new Date(2023, 3, 13, 12);

        scheduler = await t.getSchedulerProAsync({
            timeZone           : -60 * 24, //Not real time zone, just for testing
            startDate          : DateHelper.add(day, -3, 'day'),
            endDate            : DateHelper.add(day, 3, 'day'),
            height             : 400,
            autoAdjustTimeAxis : false,
            eventsData         : [{
                id             : 1,
                startDate      : day,
                duration       : 6,
                durationUnit   : 'hour',
                showInTimeline : true
            }],
            assignmentsData  : [{ id : 1, event : 1, resource : 1 }],
            dependenciesData : [],
            calendarsData    : []
        });

        const resourceUtilization = new ResourceUtilization({
            project     : scheduler.project,
            hideHeaders : true,
            height      : 300,
            partner     : scheduler,
            appendTo    : document.body
        });
        await resourceUtilization.project.commitAsync();

        const tick = Math.floor(resourceUtilization.timeAxis.getTickFromDate(scheduler.eventStore.first.startDate));
        t.is(resourceUtilization.getHistogramDataCache(scheduler.resourceStore.first).allocation.total[tick].effort, scheduler.taskStore.first.durationMS, 'Effort correctly calculated');
        resourceUtilization.destroy();
    });

    // https://github.com/bryntum/support/issues/5889
    // https://github.com/bryntum/support/issues/6369
    t.it('Should be able to replace data at runtime, like framework', async t => {
        scheduler = await t.getSchedulerProAsync({
            timeZone   : 'Atlantic/Azores', //UTC-1
            viewPreset : 'hourAndDay',
            startDate  : '2023-01-05T16:00:00.000Z',
            endDate    : '2023-01-05T23:00:00.000Z',
            features   : {
                resourceTimeRanges : true
            },
            resources : [
                { id : 1, name : `Testing name - 1` },
                { id : 2, name : `Testing name - 2` },
                { id : 3, name : `Testing name - 3` }
            ],
            events       : [],
            dependencies : []
        });

        scheduler.project.events = [{
            id                : 1,
            manuallyScheduled : true,
            startDate         : '2023-01-05T18:00:00.000Z',
            endDate           : '2023-01-05T21:00:00.000Z',
            resourceId        : 1
        }, {
            id                : 2,
            manuallyScheduled : true,
            startDate         : '2023-01-05T18:00:00.000Z',
            endDate           : '2023-01-05T21:00:00.000Z',
            resourceId        : 2
        }, {
            id                : 3,
            manuallyScheduled : true,
            startDate         : '2023-01-05T18:00:00.000Z',
            endDate           : '2023-01-05T21:00:00.000Z',
            resourceId        : 3
        }];

        await scheduler.project.commitAsync();

        const
            start    = scheduler.subGrids.normal.element.getBoundingClientRect().left,
            expected = (scheduler.timeAxis.getTickFromDate(new Date(2023, 0, 5, 17)) * scheduler.tickSize) + start,
            [event]  = scheduler.events;

        t.isApproxPx(t.rect('.b-sch-event-wrap').left, expected, 'Correctly positioned');

        t.diag('Testing resourceTimeRanges');

        scheduler.resourceTimeRanges = [
            {
                resourceId : 1,
                startDate  : event.startDate,
                endDate    : event.endDate,
                timeZone   : event.timeZone
            }
        ];

        await scheduler.project.commitAsync();

        t.is(scheduler.resourceTimeRanges[0].startDate.getTime(), event.startDate.getTime(), 'ResourceTimeRange correct');

    });

    // https://github.com/bryntum/support/issues/6691
    t.it('Should not render non-converted events before conversion', async t => {
        scheduler = await t.getSchedulerProAsync({
            timeZone   : 'Atlantic/Azores', //UTC-1
            viewPreset : 'hourAndDay',
            startDate  : '2023-01-05T16:00:00.000Z',
            endDate    : '2023-01-05T23:00:00.000Z',
            features   : {
                resourceTimeRanges : true
            },
            resources : [
                { id : 1, name : `Testing name - 1` },
                { id : 2, name : `Testing name - 2` },
                { id : 3, name : `Testing name - 3` }
            ],
            events       : [],
            dependencies : []
        });

        scheduler.project.events = [{
            id                : 1,
            manuallyScheduled : true,
            startDate         : '2023-01-05T18:00:00.000Z',
            endDate           : '2023-01-05T21:00:00.000Z',
            resourceId        : 1
        }, {
            id                : 2,
            manuallyScheduled : true,
            startDate         : '2023-01-05T18:00:00.000Z',
            endDate           : '2023-01-05T21:00:00.000Z',
            resourceId        : 2
        }, {
            id                : 3,
            manuallyScheduled : true,
            startDate         : '2023-01-05T18:00:00.000Z',
            endDate           : '2023-01-05T21:00:00.000Z',
            resourceId        : 3
        }];

        const
            tick      = scheduler.timeAxis.getTickFromDate(new Date('2023-01-05T17:00:00')),
            tickX     = t.query(`[data-tick-index="${tick}"]`)[0].getBoundingClientRect().left,
            [eventEl] = await t.waitForSelector('.b-sch-event-wrap[data-event-id="1"]');

        t.isApproxPx(eventEl.getBoundingClientRect().left, tickX, 2, 'First event rendering is converted');
    });

    t.it('Should work to detach and attach new stores to project', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            startDate  : new Date('2022-10-11T13:00:00Z'),
            endDate    : new Date('2022-10-13T19:00:00Z'),
            timeZone   : 180,
            events     : [
                { id : 1, startDate : '2022-10-11T20:00:00Z', duration : 1, durationUnit : 'hour' }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        t.diag('Assert the initial time zone conversion');
        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T16:00:00',
            endDateString   : '2022-10-13T22:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-11T23:00:00' }
            ]
        });

        // Replace the store
        const oldEventStore = scheduler.eventStore;
        scheduler.eventStore = new EventStore({ data : [{ id : 1, startDate : '2022-10-11T21:00:00Z', duration : 1, durationUnit : 'hour' }] });
        await scheduler.project.commitAsync();
        // Code above creates a bunch of modifications on the record and store, need to remove those
        scheduler.eventStore.commit();

        t.diag('Assert time zone conversion of new store');
        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T16:00:00',
            endDateString   : '2022-10-13T22:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-12T00:00:00' }
            ]
        });

        t.is(oldEventStore.first.timeZone, null, 'Old eventStore converted back to local system timezone 1/2');
        t.is(oldEventStore.first.startDate.toString(), new Date('2022-10-11T20:00:00Z').toString(), 'Old eventStore converted back to local system timezone 2/2');

        // Check that a new timezone conversion doesn't affect old store
        scheduler.timeZone = 300;
        await scheduler.project.commitAsync();

        t.diag('Assert time zone conversion of new store again');
        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T18:00:00',
            endDateString   : '2022-10-14T00:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-12T02:00:00' }
            ]
        });

        t.is(oldEventStore.first.timeZone, null, 'Old eventStore unaffected by timezone change 1/2');
        t.is(oldEventStore.first.startDate.toString(), new Date('2022-10-11T20:00:00Z').toString(), 'Old eventStore unaffected by timezone change 2/2');
    });

    t.it('Should work to configure timeZone with `0` as UTC', async t => {
        scheduler = await t.getSchedulerProAsync({
            viewPreset : 'hourAndDay',
            startDate  : new Date('2022-10-11T13:00:00Z'),
            endDate    : new Date('2022-10-13T19:00:00Z'),
            timeZone   : 0,
            events     : [
                { id : 1, startDate : '2022-10-11T20:00:00Z', duration : 1, durationUnit : 'hour' }
            ],
            assignments : [
                { id : 1, event : 1, resource : 1 }
            ]
        });

        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T13:00:00',
            endDateString   : '2022-10-13T19:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-11T20:00:00' }
            ]
        });

        t.diag('Also check that it works to remove the timeZone config');
        scheduler.timeZone = null;
        await scheduler.project.commitAsync();

        await assertTimeZoneConversion(t, {
            startDateString : new Date('2022-10-11T13:00:00Z').toString(),
            endDateString   : new Date('2022-10-13T19:00:00Z').toString(),
            events          : [
                { id : 1, startDateString : new Date('2022-10-11T20:00:00Z').toString() }
            ]
        });

        t.diag('Assert that it works to set it to `0` again');
        scheduler.timeZone = 0;
        await scheduler.project.commitAsync();

        await assertTimeZoneConversion(t, {
            startDateString : '2022-10-11T13:00:00',
            endDateString   : '2022-10-13T19:00:00',
            events          : [
                { id : 1, startDateString : '2022-10-11T20:00:00' }
            ]
        });
    });

});
