
StartTest(t => {
    t.beforeEach(() => SchedulerPro.destroy(...SchedulerPro.queryAll(w => !w.parent)));

    t.it('SchedulerPro + Gantt with thin bundle sanity', async t => {
        const project = new ProjectModel({
            tasks       : [{ id : 1, name : 'Event 1', startDate : '2022-02-11', duration : 5, status : 'todo' }],
            resources   : [{ id : 1, name : 'Resource 1' }],
            assignments : [{ id : 1, eventId : 1, resourceId : 1 }]
        });

        new SchedulerPro({
            appendTo  : document.body,
            width     : 1024,
            height    : 350,
            startDate : new Date(2022, 1, 11),
            endDate   : new Date(2022, 2, 1),
            tickSize  : 50,
            columns   : [
                { field : 'name', text : 'Resource', width : 100 }
            ],
            project
        });

        new Gantt({
            appendTo  : document.body,
            width     : 1024,
            height    : 350,
            startDate : new Date(2022, 1, 11),
            endDate   : new Date(2022, 2, 1),
            tickSize  : 50,
            project
        });

        await project.commitAsync();

        await t.waitForSelector('.b-gantt-task');
        await t.waitForSelector('.b-sch-event');

        // Ensure something rendered
        t.selectorExists('.b-sch-event', 'Scheduler event rendered');
        t.selectorExists('.b-gantt-task', 'Gantt task rendered');

        // Ensure css worked
        t.isApproxPx(t.rect('.b-sch-event').left, 357, 'Event has correct x');
        t.hasApproxWidth('.b-sch-event', 249, 'Event has correct width');
        t.hasApproxHeight('.b-gantt .b-grid-cell', 45, 'Gantt row has height');
        t.hasApproxWidth('.b-gantt .b-grid-cell', 200, 'Gantt cell has width');
        t.isApproxPx(t.rect('.b-gantt-task').left, 457, 'Task has correct x');
        t.hasApproxWidth('.b-gantt-task', 249, 'Task has correct width');

        await t.doubleClick('.b-sch-event');

        await t.click('[data-ref=name] input');

        await t.type({
            text          : 'Testing[ENTER]',
            clearExisting : true
        });

        await t.waitForSelector('.b-grid-cell:textEquals(Testing)');
        await t.waitForSelector('.b-sch-event:textEquals(Testing)');

        t.pass('Editing worked');
    });
});
