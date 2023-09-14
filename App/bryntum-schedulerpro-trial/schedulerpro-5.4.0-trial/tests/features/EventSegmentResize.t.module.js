StartTest(t => {

    let schedulerPro;

    t.beforeEach(t => schedulerPro?.destroy());

    t.it('Should handle resizing task segments', async t => {

        schedulerPro = await t.getSchedulerProAsync({
            resourcesData : [
                { id : 'r1', name : 'foo1' },
                { id : 'r2', name : 'foo2' }
            ],
            assignmentsData : [
                { id : 'a1', resource : 'r1', event : 11 },
                { id : 'a2', resource : 'r2', event : 12 }
            ],
            eventsData : [
                {
                    id        : 11,
                    name      : 'Investigate',
                    startDate : '2017-01-16',
                    duration  : 3,
                    segments  : [
                        {
                            id        : 1,
                            startDate : '2017-01-16',
                            duration  : 1
                        },
                        {
                            id        : 2,
                            startDate : '2017-01-18',
                            duration  : 2
                        }
                    ]
                },
                {
                    id        : 12,
                    name      : 'Investigate',
                    startDate : '2017-01-16',
                    duration  : 3,
                    segments  : [
                        {
                            id        : 1,
                            startDate : '2017-01-16',
                            duration  : 1
                        },
                        {
                            id        : 2,
                            startDate : '2017-01-18',
                            duration  : 2
                        }
                    ]
                }
            ],
            startDate : new Date(2017, 0, 16),
            endDate   : new Date(2017, 0, 22),
            appendTo  : document.body
        });

        t.firesOk({
            observable : schedulerPro,
            events     : {
                beforeEventSegmentResize         : 4,
                eventSegmentResizeStart          : 4,
                eventSegmentPartialResize        : '>=4',
                beforeEventSegmentResizeFinalize : 4,
                eventSegmentResizeEnd            : 4
            }
        });

        const { tickSize } = schedulerPro;
        const [event11, event12] = schedulerPro.eventStore;

        await t.waitForEventOnTrigger(schedulerPro, 'eventSegmentResizeEnd', () => {
            t.dragBy({
                source : '.b-sch-event-wrap[data-event-id="11"] .b-last',
                offset : ['100%-5', '50%'],
                delta  : [tickSize, 0]
            });
        });

        t.is(event11.segments.length, 2, 'event #11 proper number of segments');
        t.is(event11.lastSegment.endDate, new Date(2017, 0, 21), 'event #11 last segment endDate is ok');
        t.is(event11.endDate, new Date(2017, 0, 21), 'event #11 endDate is ok');

        await t.waitForEventOnTrigger(schedulerPro, 'eventSegmentResizeEnd', () => {
            t.dragBy({
                source : '.b-sch-event-wrap[data-event-id="12"] .b-last',
                offset : ['100%-5', '50%'],
                delta  : [tickSize, 0]
            });
        });

        t.is(event12.segments.length, 2, 'event #12 proper number of segments');
        t.is(event12.lastSegment.endDate, new Date(2017, 0, 21), 'event #12 last segment endDate is ok');
        t.is(event12.endDate, new Date(2017, 0, 21), 'event #12 endDate is ok');

        await t.dragBy({
            source   : '.b-sch-event-wrap[data-event-id="11"] .b-first',
            offset   : ['100%-5', '50%'],
            delta    : [2 * tickSize, 0],
            dragOnly : true
        });

        let firstSegmentRight = t.rect('.b-sch-event-wrap[data-event-id="11"] .b-first').right;
        let secondSegmentLeft = t.rect('.b-sch-event-wrap[data-event-id="11"] .b-last').left;

        t.isApproxPx(firstSegmentRight, secondSegmentLeft, 3, 'event #11 last segment constrained first segment resize');

        await t.waitForEventOnTrigger(schedulerPro, 'eventSegmentResizeEnd', () => {
            t.mouseUp();
        });

        t.notOk(event11.segments, 'event #11 has no segments');
        t.is(event11.endDate, new Date(2017, 0, 21), 'event #11 endDate is ok');

        await t.dragBy({
            source   : '.b-sch-event-wrap[data-event-id="12"] .b-first',
            offset   : ['100%-5', '50%'],
            delta    : [2 * tickSize, 0],
            dragOnly : true
        });

        firstSegmentRight = t.rect('.b-sch-event-wrap[data-event-id="12"] .b-first').right;
        secondSegmentLeft = t.rect('.b-sch-event-wrap[data-event-id="12"] .b-last').left;

        t.isApproxPx(firstSegmentRight, secondSegmentLeft, 3, 'event #12 last segment constrained first segment resize');

        await t.waitForEventOnTrigger(schedulerPro, 'eventSegmentResizeEnd', () => {
            t.mouseUp();
        });

        t.notOk(event12.segments, 'event #12 has no segments');
        t.is(event12.endDate, new Date(2017, 0, 21), 'event #12 endDate is ok');
    });

});
