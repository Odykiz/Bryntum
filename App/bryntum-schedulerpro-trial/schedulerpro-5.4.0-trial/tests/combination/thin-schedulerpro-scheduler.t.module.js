
StartTest(t => {
    t.beforeEach(() => Scheduler.destroy(...Scheduler.queryAll(w => !w.parent)));

    t.it('SchedulerPro + Scheduler with thin bundle sanity', async t => {
        // NOTE: Scheduler & SchedulerPro are not supposed to be able to share a project, thus it is not tested

        const scheduler = new Scheduler({
            appendTo  : document.body,
            width     : 1024,
            height    : 350,
            startDate : new Date(2022, 1, 11),
            endDate   : new Date(2022, 2, 1),
            tickSize  : 50,
            columns   : [
                { field : 'name', text : 'Resource', width : 100 }
            ],
            project : {
                events      : [{ id : 1, name : 'Event 1', startDate : '2022-02-11', duration : 5 }],
                resources   : [{ id : 1, name : 'Resource 1' }],
                assignments : [{ id : 1, eventId : 1, resourceId : 1 }]
            }
        });

        const schedulerPro = new SchedulerPro({
            appendTo  : document.body,
            width     : 1024,
            height    : 350,
            startDate : new Date(2022, 1, 11),
            endDate   : new Date(2022, 2, 1),
            tickSize  : 50,
            columns   : [
                { field : 'name', text : 'Resource', width : 100 }
            ],
            project : {
                events      : [{ id : 1, name : 'Pro', startDate : '2022-02-11', duration : 5, eventColor : 'red' }],
                resources   : [{ id : 1, name : 'Resource 1' }],
                assignments : [{ id : 1, eventId : 1, resourceId : 1 }]
            }
        });

        await scheduler.project.commitAsync();
        await schedulerPro.project.commitAsync();

        await t.waitForSelector('.b-scheduler:not(.b-schedulerpro) .b-sch-event');
        await t.waitForSelector('.b-schedulerpro .b-sch-event');

        // Ensure something rendered
        t.selectorExists('.b-scheduler:not(.b-schedulerpro) .b-sch-event', 'Scheduler event rendered');
        t.selectorExists('.b-schedulerpro .b-sch-event', 'Pro event rendered');

        // Ensure css worked
        t.isApproxPx(t.rect('.b-scheduler:not(.b-schedulerpro) .b-sch-event').left, 357, 'Event has correct x');
        t.hasApproxWidth('.b-scheduler:not(.b-schedulerpro) .b-sch-event', 249, 'Event has correct width');
        t.isApproxPx(t.rect('.b-schedulerpro .b-sch-event').left, 357, 'Pro event has correct x');
        t.hasApproxWidth('.b-schedulerpro .b-sch-event', 249, 'Pro event has correct width');
    });
});
