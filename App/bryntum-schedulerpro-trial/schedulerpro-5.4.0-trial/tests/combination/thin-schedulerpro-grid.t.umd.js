
StartTest(t => {
    t.beforeEach(() => Grid.destroy(...Grid.queryAll(w => !w.parent)));

    t.it('Grid + SchedulerPro with thin bundle sanity', async t => {
        const project = new ProjectModel({
            events      : [{ id : 1, name : 'Event 1', startDate : '2022-02-11', duration : 5 }],
            resources   : [{ id : 1, name : 'Resource 1' }],
            assignments : [{ id : 1, eventId : 1, resourceId : 1 }]
        });

        new Grid({
            appendTo : document.body,
            width    : 1024,
            height   : 350,
            columns  : [
                { field : 'name', text : 'Event', width : 100 },
                { type : 'date', field : 'startDate', text : 'Start' }
            ],
            store : project.eventStore
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

        await project.commitAsync();

        // Ensure something rendered
        t.selectorExists('.b-grid:not(.b-schedulerpro) .b-grid-row', 'Grid row rendered');
        t.selectorExists('.b-schedulerpro .b-grid-row', 'Scheduler row rendered');

        // Ensure css worked
        t.hasApproxHeight('.b-grid:not(.b-schedulerpro) .b-grid-cell', 45, 'Grid row has height');
        t.hasApproxWidth('.b-grid:not(.b-schedulerpro) .b-grid-cell', 100, 'Grid cell has width');
        t.hasApproxHeight('.b-schedulerpro .b-grid-cell', 60, 'Scheduler row has height');
        t.hasApproxWidth('.b-schedulerpro .b-grid-cell', 100, 'Scheduler cell has width');

        t.isApproxPx(t.rect('.b-sch-event').left, 357, 'Event has correct x');
        t.hasApproxWidth('.b-sch-event', 249, 'Event has correct width');

        await t.dragBy({
            source : '.b-sch-event',
            delta  : [50, 0]
        });

        await t.waitForSelectorNotFound('.b-dragging');
        await t.waitFor(() => t.samePx(t.rect('.b-sch-event').left, 407, 10));
        t.pass('Event has correct x after drag');

        t.selectorExists('.b-grid:not(.b-schedulerpro) .b-grid-cell:textEquals(02/12/2022)', 'Grid cell updated');
    });
});
