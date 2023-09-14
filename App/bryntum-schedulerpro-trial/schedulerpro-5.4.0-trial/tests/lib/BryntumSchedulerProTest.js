Class('BryntumSchedulerProTest', {

    isa : BryntumSchedulerTest,

    methods : {
        getSchedulerPro(config = {}) {
            return new this.global.SchedulerPro(Object.assign({
                appendTo : this.global.document.body,

                startDate : '2020-03-23',
                endDate   : '2020-04-05',

                useInitialAnimation   : false,
                enableEventAnimations : false,
                tickSize              : 100,

                columns : [
                    { field : 'name', text : 'Name' }
                ],

                project : Object.assign({
                    resourcesData : config.resourcesData || [
                        { id : 1, name : 'Resource 1' },
                        { id : 2, name : 'Resource 2' },
                        { id : 3, name : 'Resource 3' },
                        { id : 4, name : 'Resource 4' },
                        { id : 5, name : 'Resource 5' }
                    ],

                    eventsData : config.eventsData || [
                        { id : 1, name : 'Event 1', startDate : '2020-03-23', duration : 2, percentDone : 50 },
                        { id : 2, name : 'Event 2', startDate : '2020-03-24', duration : 3, percentDone : 40 },
                        { id : 3, name : 'Event 3', startDate : '2020-03-25', duration : 2, percentDone : 30 },
                        { id : 4, name : 'Event 4', startDate : '2020-03-26', duration : 3, percentDone : 20 },
                        { id : 5, name : 'Event 5', startDate : '2020-03-27', duration : 2, percentDone : 10 }
                    ],

                    assignmentsData : config.assignmentsData || [
                        { id : 1, resource : 1, event : 1 },
                        { id : 2, resource : 2, event : 2 },
                        { id : 3, resource : 3, event : 3 },
                        { id : 4, resource : 4, event : 4 },
                        { id : 5, resource : 5, event : 5 },
                        { id : 6, resource : 1, event : 5 }
                    ],

                    dependenciesData : config.dependenciesData || [
                        { id : 1, fromEvent : 1, toEvent : 2 },
                        { id : 2, fromEvent : 2, toEvent : 3 },
                        { id : 3, fromEvent : 3, toEvent : 4 },
                        { id : 4, fromEvent : 4, toEvent : 5 }
                    ],

                    calendarsData : config.calendarsData || [
                        {
                            id        : 'general',
                            name      : 'General',
                            intervals : [
                                {
                                    recurrentStartDate : 'on Sat at 0:00',
                                    recurrentEndDate   : 'on Mon at 0:00',
                                    isWorking          : false
                                }
                            ]
                        }
                    ],

                    resourceTimeRangesData : config.resourceTimeRangesData,

                    calendar : 'general'
                }, config.projectConfig || {}),

                eventRenderer({ eventRecord, assignmentRecord }) {
                    return eventRecord.name || eventRecord.event?.name || `E ${assignmentRecord.eventId} A ${assignmentRecord.id}`;
                }
            }, config));
        },

        async getSchedulerProAsync(config = {}) {
            const scheduler = this.scheduler = this.getSchedulerPro(config);

            await scheduler.project.commitAsync();

            return scheduler;
        },

        assertElementBox(element, x, y, width, height = null, name = 'element') {
            const rect = this.global.Rectangle.from(element, this.scheduler ? this.scheduler.timeAxisSubGridElement : null);

            let equal = true;

            if (Math.abs(rect.x - x) > 1) {
                equal = false;
                this.is(rect.x, x, `Correct x for ${name}`);
            }

            if (Math.abs(rect.y - y) > 1) {
                equal = false;
                this.is(rect.y, y, `Correct y for ${name}`);
            }

            if (Math.abs(rect.width - width) > 1) {
                equal = false;
                this.is(rect.width, width, `Correct width for ${name}`);
            }

            if (height != null && Math.abs(rect.height - height) > 1) {
                equal = false;
                this.is(rect.height, height, `Correct height for ${name}`);
            }

            if (equal) {
                this.pass(`Correct bounds for ${name}`);
            }
        },

        assertAssignmentElement(assignmentId, x, y, width, height = null, name = null) {
            const element = this.global.document.querySelector(`[data-assignment-id="${assignmentId}"]`);

            if (element) {
                this.assertElementBox(element, x, y, width, height, name || ('assignment ' + assignmentId));
            }
            else {
                this.fail(`Element for ${name || assignmentId} not found`);
            }
        },

        assertAssignmentElementInTicks({ id, tick, row, width }, name) {
            const
                { tickWidth, resourceMargin } = this.scheduler,
                { rowOffsetHeight } = this.scheduler.rowManager;

            this.assertAssignmentElement(
                id,
                tick * tickWidth,
                resourceMargin + rowOffsetHeight * row,
                width * tickWidth,
                null,
                name
            );
        },

        assertBufferEventSize(event, target) {
            event = target.eventStore.getById(event);

            const
                wrapLeft     = target.getCoordinateFromDate(event.wrapStartDate, false),
                wrapRight    = target.getCoordinateFromDate(event.wrapEndDate, false),
                eventLeft    = target.getCoordinateFromDate(event.startDate, false),
                eventRight   = target.getCoordinateFromDate(event.endDate, false),
                eventWrapEl  = target.getElementFromEventRecord(event, undefined, true),
                eventInnerEl = eventWrapEl.querySelector(`.${target.eventCls}`),
                beforeEl     = eventWrapEl.querySelector('.b-sch-event-buffer-before'),
                afterEl      = eventWrapEl.querySelector('.b-sch-event-buffer-after'),
                wrapRect     = this.rect(eventWrapEl),
                innerRect    = this.rect(eventInnerEl),
                beforeRect   = beforeEl && this.rect(beforeEl),
                afterRect    = afterEl && this.rect(afterEl);

            this.subTest(`Checking buffer elements for event ${event.id}`, t => {
                t.isApproxPx(wrapRect.left, wrapLeft, 'Wrap element start is ok');

                t.isApproxPx(wrapRect.right, wrapRight, 'Wrap element end is ok');

                t.isApproxPx(innerRect.left, eventLeft, 'Inner element start is ok');

                t.isApproxPx(innerRect.right, eventRight, 'Inner element end is ok');

                if (beforeRect) {
                    t.isApproxPx(beforeRect.left, wrapLeft, 'Before element start is ok');
                    t.isApproxPx(beforeRect.right, eventLeft, 'Before element start is ok');
                }

                if (afterRect) {
                    t.isApproxPx(afterRect.left, eventRight, 'After element start is ok');
                    t.isApproxPx(afterRect.right, wrapRight, 'After element start is ok');
                }
            });
        },

        assertVerticalBufferEventSize(event, target) {
            event = target.eventStore.getById(event);

            const
                wrapTop      = target.getCoordinateFromDate(event.wrapStartDate, false),
                wrapBottom   = target.getCoordinateFromDate(event.wrapEndDate, false),
                eventTop     = target.getCoordinateFromDate(event.startDate, false),
                eventBottom  = target.getCoordinateFromDate(event.endDate, false),
                eventWrapEl  = target.getElementFromEventRecord(event, undefined, true),
                eventInnerEl = eventWrapEl.querySelector(`.${target.eventCls}`),
                beforeEl     = eventWrapEl.querySelector('.b-sch-event-buffer-before'),
                afterEl      = eventWrapEl.querySelector('.b-sch-event-buffer-after'),
                wrapRect     = this.rect(eventWrapEl),
                innerRect    = this.rect(eventInnerEl),
                beforeRect   = beforeEl && this.rect(beforeEl),
                afterRect    = afterEl && this.rect(afterEl);

            this.subTest(`Checking buffer elements for event ${event.id}`, t => {
                t.isApproxPx(wrapRect.top, wrapTop, 'Wrap element start is ok');

                t.isApproxPx(wrapRect.bottom, wrapBottom, 'Wrap element end is ok');

                t.isApproxPx(innerRect.top, eventTop, 'Inner element start is ok');

                t.isApproxPx(innerRect.bottom, eventBottom, 'Inner element end is ok');

                if (beforeRect) {
                    t.isApproxPx(beforeRect.top, wrapTop, 'Before element start is ok');
                    t.isApproxPx(beforeRect.bottom, eventTop, 'Before element start is ok');
                }

                if (afterRect) {
                    t.isApproxPx(afterRect.top, eventBottom, 'After element start is ok');
                    t.isApproxPx(afterRect.bottom, wrapBottom, 'After element start is ok');
                }
            });
        }
    }
});
