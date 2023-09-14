
StartTest(t => {
    let topScheduler, bottomScheduler;

    t.beforeEach(() => {
        topScheduler?.destroy();
        bottomScheduler?.destroy();
    });

    // https://github.com/bryntum/support/issues/4490
    t.it('Should support dragging between schedulers', async t => {
        topScheduler = new SchedulerPro({
            ref                 : 'top',
            appendTo            : document.body,
            height              : 300,
            useInitialAnimation : false,

            features : {
                eventDrag : {
                    // Allow drag outside of this Scheduler
                    constrainDragToTimeline : false
                }
            },

            resources : [
                { id : 1, name : 'Arcady', role : 'Core developer', eventColor : 'purple' }
            ],

            startDate  : new Date(2022, 4, 3, 6),
            endDate    : new Date(2022, 4, 3, 20),
            viewPreset : 'hourAndDay'
        });

        bottomScheduler = new SchedulerPro({
            appendTo            : document.body,
            height              : 300,
            partner             : topScheduler,
            useInitialAnimation : false,
            features            : {
                eventDrag : {
                    // Allow drag outside of this Scheduler
                    constrainDragToTimeline : false
                }
            },

            resources : [
                { id : 11, name : 'Angelo' }
            ],

            events : [
                { id : 1, name : 'Event 1', startDate : '2022-05-03T08:00', duration : 4, durationUnit : 'h' }
            ],

            assignments : [
                { id : 1, event : 1, resource : 11 }
            ]
        });

        await topScheduler.project.commitAsync();
        await bottomScheduler.project.commitAsync();

        await t.dragTo({
            source : '$event=1',
            target : '[data-ref=top] .b-sch-timeaxis-cell'
        });

        const eventRecord = topScheduler.eventStore.first;

        t.is(eventRecord.startDate, new Date(2022, 4, 3, 11), 'At correct date');
        t.is(eventRecord.resource, topScheduler.resourceStore.first, 'At correct resource');
        t.selectorCountIs('.b-sch-event-wrap', 1, 'Single event');
    });

    t.it('Should move event to new scheduler on drop, using single assignment', async t => {
        topScheduler = new SchedulerPro({
            appendTo  : document.body,
            id        : 'first',
            height    : 300,
            resources : [
                { id : 1, name : 'Albert', calendar : 'general' }
            ],
            eventStore : new EventStore({
                data : [
                    {
                        id         : 1,
                        resourceId : 1,
                        startDate  : '2020-11-03T14:00:00',
                        duration   : 3
                    }
                ]
            }),
            startDate : new Date(2020, 10, 3),
            endDate   : new Date(2020, 10, 5),
            columns   : [
                { field : 'name', text : 'Name' }
            ],
            features : {
                eventDrag : {
                    // Allow drag outside of this Scheduler
                    constrainDragToTimeline : false
                }
            }
        });

        bottomScheduler = new SchedulerPro({
            id       : 'second',
            appendTo : document.body,
            height   : 300,
            partner  : topScheduler,
            columns  : [
                {
                    text : 'Name'
                }
            ],
            resources  : [{ id : 1, name : 'Albert' }],
            eventStore : new EventStore()
        });

        await t.dragTo({
            source : '#first .b-sch-event',
            target : '#second .b-timeaxis-cell'
        });

        t.is(topScheduler.eventStore.count, 0, 'Event removed from first scheduler');
        t.is(bottomScheduler.eventStore.count, 1, 'Event added to second scheduler');
        t.is(topScheduler.assignmentStore.count, 0, 'Assignment removed from first scheduler');
        t.is(bottomScheduler.assignmentStore.count, 1, 'Assignment added to second scheduler');
        t.selectorNotExists('#first .b-sch-event', 'Event note rendered in first scheduler');
        t.selectorExists('#second .b-sch-event', 'Event rendered in second scheduler');
    });
});
