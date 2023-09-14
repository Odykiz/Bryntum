
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Should render buffer time on filtered time axis', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            startDate  : '2021-11-22',
            endDate    : '2021-11-28',
            viewPreset : {
                base           : 'dayAndWeek',
                timeResolution : {
                    unit      : 'h',
                    increment : 1
                }
            },
            workingTime : {
                fromDay  : 1,
                toDay    : 6,
                fromHour : 8,
                toHour   : 17
            },
            eventsData : [
                {
                    id        : 1,
                    name      : 'Full day',
                    startDate : '2021-11-23',
                    endDate   : '2021-11-24',
                    preamble  : '1h',
                    postamble : '30min'
                },
                {
                    id        : 2,
                    name      : 'Work day',
                    startDate : '2021-11-23T08:00',
                    endDate   : '2021-11-23T17:00',
                    preamble  : '1h',
                    postamble : '30min'
                },
                {
                    id        : 3,
                    name      : 'Undertime 1',
                    startDate : '2021-11-24T12:00',
                    endDate   : '2021-11-24T14:00',
                    preamble  : '30min',
                    postamble : '30min'
                },
                {
                    id        : 4,
                    name      : 'Undertime 2',
                    startDate : '2021-11-24T15:00',
                    endDate   : '2021-11-24T16:00',
                    preamble  : '1h',
                    postamble : '30min'
                },
                {
                    id        : 5,
                    name      : 'Overtime 1 (buffer visible)',
                    startDate : '2021-11-24T17:00',
                    endDate   : '2021-11-26T08:00',
                    preamble  : '1h',
                    postamble : '30min'
                },
                {
                    id        : 6,
                    name      : 'Overtime 2 (0 width)',
                    startDate : '2021-11-24T17:00',
                    endDate   : '2021-11-25T08:00',
                    preamble  : '1h',
                    postamble : '30min'
                }
            ],
            assignmentsData : [
                { id : 1, event : 1, resource : 1 },
                { id : 2, event : 2, resource : 1 },
                { id : 3, event : 3, resource : 2 },
                { id : 4, event : 4, resource : 2 },
                { id : 5, event : 5, resource : 3 },
                { id : 6, event : 6, resource : 4 }
            ],
            dependenciesData : []
        });

        await t.waitForSelector('.b-sch-event');

        t.is(t.rect('[data-event-id="1"] .b-sch-event-buffer-before').width, 0, 'Before buffer for event 1 is 0 width');
        t.is(t.rect('[data-event-id="2"] .b-sch-event-buffer-after').width, 0, 'After buffer for event 2 is 0 width');
        t.selectorExists('[data-event-id="3"] .b-sch-event-buffer-after', 'After buffer is rendered for event 3');
        t.selectorExists('[data-event-id="4"] .b-sch-event-buffer-after', 'After buffer is rendered for event 4');
        t.selectorExists('[data-event-id="5"] .b-sch-event-buffer-after', 'After buffer is rendered for event 5');
        t.selectorNotExists('[data-event-id="6"]', 'Event width supposed 0 width is not rendered');

        t.is(document.querySelector('[data-id="2"] .b-grid-cell').offsetHeight, 110, 'Intersecting buffer stretches row');

        t.assertBufferEventSize(3, schedulerPro);
        t.assertBufferEventSize(4, schedulerPro);
        t.assertBufferEventSize(5, schedulerPro);
    });
});
