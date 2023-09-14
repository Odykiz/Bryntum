
StartTest(t => {
    t.beforeEach(() => TaskBoard.destroy(...TaskBoard.queryAll(w => !w.parent)));

    t.it('SchedulerPro + TaskBoard with thin bundle sanity', async t => {
        const project = new ProjectModel({
            events      : [{ id : 1, name : 'Event 1', startDate : '2022-02-11', duration : 5, status : 'todo' }],
            resources   : [{ id : 1, name : 'Resource 1' }],
            assignments : [{ id : 1, eventId : 1, resourceId : 1 }]
        });

        new TaskBoard({
            appendTo : document.body,
            width    : 1024,
            height   : 350,
            columns  : [
                'todo',
                'done'
            ],
            columnField : 'status',
            project
        });

        new SchedulerPro({
            appendTo  : document.body,
            width     : 1024,
            height    : 350,
            startDate : new Date(2022, 1, 1),
            endDate   : new Date(2022, 2, 1),
            tickSize  : 50,
            columns   : [
                { field : 'name', text : 'Resource', width : 100 }
            ],
            project
        });

        await t.waitForSelector('.b-sch-event');
        await t.waitForSelector('.b-taskboard-card');

        // Ensure something rendered
        t.selectorExists('.b-taskboard-card', 'TaskBoard card rendered');
        t.selectorExists('.b-sch-event', 'Scheduler event rendered');

        // Ensure css worked
        t.hasApproxHeight('.b-taskboard-card', 102, 'Card has height');
        t.hasApproxWidth('.b-taskboard-card', 472, 'Card has width');
        t.isApproxPx(t.rect('.b-sch-event').left, 708, 'Event has correct x');
        t.hasApproxWidth('.b-sch-event', 249, 'Event has correct width');

        await t.doubleClick('.b-sch-event');

        await t.click('[data-ref=nameField] input');

        await t.type({
            text          : 'Testing[ENTER]',
            clearExisting : true
        });

        await t.waitForSelector('.b-taskboard-card-header:textEquals(Testing)');
        await t.waitForSelector('.b-sch-event:textEquals(Testing)');

        t.pass('Editing worked');
    });
});
