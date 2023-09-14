
StartTest(t => {

    let schedulerPro, original, link;

    t.beforeEach(() => schedulerPro?.destroy());

    async function setup(config = {}) {
        schedulerPro = await t.getSchedulerProAsync({
            enableEventAnimations : false,
            ...config
        });

        original = schedulerPro.resourceStore.first;
        link     = schedulerPro.resourceStore.insert(0, original.link())[0];

        await t.waitForSelector('.b-linked');
    }

    t.it('Should display linked resources', async t => {
        await setup();

        t.selectorExists(`.b-linked-resource[data-event-id="1"][data-resource-id="${link.id}"]`, 'Linked resource event rendered');
        t.selectorExists('.b-original-resource[data-event-id="1"][data-resource-id="1"]', 'Original resource event rendered');
    });

    t.it('Should work with calendarHighlight', async t => {
        await setup({
            features : {
                calendarHighlight : true
            },
            calendarsData : [
                {
                    id                       : 'early',
                    unspecifiedTimeIsWorking : false,
                    intervals                : [
                        {
                            recurrentStartDate : 'at 6:00',
                            recurrentEndDate   : 'at 14:00',
                            isWorking          : true
                        }
                    ]
                },
                {
                    id                       : 'late',
                    unspecifiedTimeIsWorking : false,
                    intervals                : [
                        {
                            recurrentStartDate : 'at 14:00',
                            recurrentEndDate   : 'at 22:00',
                            isWorking          : true
                        }
                    ]
                }
            ]
        });

        schedulerPro.eventStore.first.calendar = 'early';

        await schedulerPro.project.commitAsync();

        schedulerPro.highlightEventCalendars([schedulerPro.eventStore.first]);

        t.selectorCountIs('.b-original-resource.b-sch-highlighted-calendar-range', 9, 'Original calendar displayed');
        t.selectorCountIs('.b-linked-resource.b-sch-highlighted-calendar-range', 9, 'Linked calendar displayed');

        schedulerPro.highlightEventCalendars([schedulerPro.eventStore.first], [link]);

        t.selectorCountIs('.b-linked-resource.b-sch-highlighted-calendar-range', 9, 'Linked calendar displayed');
        t.selectorNotExists('.b-original-resource.b-sch-highlighted-calendar-range', 'Original calendar not displayed');

        schedulerPro.highlightEventCalendars([schedulerPro.eventStore.first], [original]);

        t.selectorCountIs('.b-original-resource.b-sch-highlighted-calendar-range', 9, 'Original calendar displayed');
        t.selectorNotExists('.b-linked-resource.b-sch-highlighted-calendar-range', 'Linked calendar not displayed');
    });

    t.it('Should work with eventBuffer', async t => {
        await setup({
            features : {
                eventBuffer : true
            }
        });

        schedulerPro.eventStore.first.preamble = '12 hours';

        t.selectorExists('.b-linked-resource .b-sch-event-buffer-before', 'Linked eventBuffer found');
        t.selectorExists('.b-original-resource .b-sch-event-buffer-before', 'Original eventBuffer found');
    });

    t.it('Should work with nestedEvents', async t => {
        await setup({
            features : {
                nestedEvents : true
            },
            startDate  : new Date(2022, 0, 2),
            endDate    : new Date(2022, 0, 9),
            eventsData : [
                {
                    id        : 1,
                    startDate : new Date(2022, 0, 2),
                    duration  : 5,
                    name      : 'Parent 1',
                    children  : [
                        {
                            id        : 11,
                            startDate : new Date(2022, 0, 2),
                            duration  : 2,
                            name      : 'Child 11'
                        },
                        {
                            id        : 12,
                            startDate : new Date(2022, 0, 5),
                            duration  : 2,
                            name      : 'Child 12'
                        }
                    ]
                }
            ],

            assignmentsData : [
                { id : 1, event : 1, resource : 'r1' },
                { id : 11, event : 11, resource : 'r1' },
                { id : 12, event : 12, resource : 'r1' }
            ],

            resourcesData : [
                { id : 'r1', name : 'Mike' },
                { id : 'r2', name : 'Linda' }
            ]
        });

        t.selectorCountIs('[data-event-id="11"]', 2, 'Two Child #11');
        t.selectorCountIs('[data-event-id="12"]', 2, 'Two Child #12');
    });

    t.it('Should work with percentBar', async t => {
        await setup({
            features : {
                percentBar : true
            }
        });

        t.selectorCountIs('$event=1 .b-task-percent-bar[data-percent="50"]', 2, 'Percent bars found');
    });

    t.it('Should work with resourceNonWorkingTime', async t => {
        await setup({
            features : {
                resourceNonWorkingTime : true,
                nonWorkingTime         : false
            },
            calendarsData : [
                {
                    id                       : 'early',
                    unspecifiedTimeIsWorking : false,
                    intervals                : [
                        {
                            recurrentStartDate : 'at 6:00',
                            recurrentEndDate   : 'at 14:00',
                            isWorking          : true
                        }
                    ]
                }
            ],
            viewPreset : 'hourAndDay'
        });

        schedulerPro.resourceStore.first.calendar = 'early';

        await schedulerPro.project.commitAsync();

        t.selectorExists('.b-original-resource.b-sch-resourcetimerange', 'Original resource timerange found');
        t.selectorExists('.b-linked-resource.b-sch-resourcetimerange', 'Linked resource timerange found');
    });

    t.it('Should work with taskEdit', async t => {
        await setup({
            features : {
                taskEdit : true
            }
        });

        await t.doubleClick('$event=1.b-linked-resource');

        await t.type({
            target        : 'input[name="name"]',
            text          : 'Fun fun[ENTER]',
            clearExisting : true
        });

        await t.selectorExists('$event=1.b-linked-resource:contains(Fun fun)', 'Linked updated');
        await t.selectorExists('$event=1.b-original-resource:contains(Fun fun)', 'Original updated');
    });

    t.it('Should work with timeSpanHighlight', async t => {
        await setup({
            features : {
                timeSpanHighlight : true
            }
        });

        schedulerPro.highlightTimeSpan({
            startDate      : new Date(2020, 2, 24),
            endDate        : new Date(2020, 2, 28),
            name           : 'Time for fun',
            resourceRecord : original
        });

        t.selectorCountIs('.b-sch-highlighted-range', 1, 'Single highlight');

        t.isApproxPx(t.rect('.b-sch-highlighted-range').top, t.rect('.b-original-resource').top, 'Highlight in correct resource');

        schedulerPro.highlightTimeSpan({
            startDate      : new Date(2020, 2, 24),
            endDate        : new Date(2020, 2, 28),
            name           : 'Time for more fun',
            resourceRecord : link
        });

        t.selectorCountIs('.b-sch-highlighted-range', 1, 'Single highlight');

        t.isApproxPx(t.rect('.b-sch-highlighted-range').top, t.rect('.b-linked-resource').top, 'Highlight in correct resource');
    });
});
