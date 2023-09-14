
StartTest(t => {

    let
        project,
        eventStore,
        resourceStore,
        assignmentStore,
        panel;

    t.beforeEach(async() => {

        panel?.destroy();

        panel = ResourceUtilization.new({
            appendTo     : document.body,
            startDate    : new Date(2015, 0, 5),
            endDate      : new Date(2015, 1, 28),
            effortFormat : '0.0',
            project      : {
                resourcesData : [
                    { id : 1, name : 'Mike' },
                    { id : 2, name : 'Dan' }
                ],
                assignmentsData : [
                    { id : 1, event : 1, resource : 1, units : 50 },
                    { id : 2, event : 2, resource : 1, units : 50 },
                    { id : 3, event : 3, resource : 2 },
                    { id : 4, event : 4, resource : 2 }
                ],
                dependenciesData : [],
                eventsData       : [
                    {
                        id        : 1,
                        name      : 'Task 1',
                        startDate : new Date(2015, 0, 5),
                        duration  : 3
                    },
                    {
                        id        : 2,
                        name      : 'Task 2',
                        startDate : new Date(2015, 0, 5),
                        duration  : 5
                    },
                    {
                        id        : 3,
                        name      : 'Task 3',
                        startDate : new Date(2015, 0, 5),
                        duration  : 3
                    },
                    {
                        id        : 4,
                        name      : 'Task 4',
                        startDate : new Date(2015, 0, 5),
                        duration  : 5
                    }
                ]
            }
        });

        project = panel.project;

        ({
            eventStore,
            resourceStore,
            assignmentStore
        } = project);

        await project.commitAsync();

        await panel.expandAll();
    });

    async function assertRecordRow(name, t, record, values) {
        return new Promise(resolve => {

            t.subTest(name, async t => {
                await t.waitForSelector(`.b-grid-row[data-id=${record.id}] .b-resourceutilization-cell .b-histogram`);

                const
                    rowEl   = panel.getRowById(record).getElement('normal'),
                    barEls  = rowEl.querySelectorAll('.b-histogram rect'),
                    textEls = rowEl.querySelectorAll('.b-histogram text');

                t.is(barEls.length, values.length, 'proper number of bars');
                t.is(textEls.length, values.length, 'proper number of texts');

                values.forEach(({ date, text, classes }, index) => {

                    for (const [cls, state] of Object.entries(classes)) {
                        t[state ? 'hasCls' : 'hasNotCls'](barEls[index], cls, `${index}: bar has ${state ? '' : 'no'} ${cls} css class`);
                    }

                    t.is(textEls[index].innerHTML, text, `${index}: proper text`);

                    // Firefox report incorrect scaled svg size
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=1633679
                    if (!BrowserHelper.isFirefox && !BrowserHelper.isEdge) {
                        t.isApprox(barEls[index].getBoundingClientRect().left, panel.getCoordinateFromDate(date, false), 0.5, `${index}: bar has proper coordinate`);
                    }
                });

            }, resolve);
        });
    }

    const noClasses = { 'b-underallocated' : false, 'b-overallocated' : false };

    t.it('Refresh on task, resource and project calendar CRUD', async t => {

        // 4hrs a day
        const mikeCal = CalendarModel.new({
            intervals : [{
                recurrentStartDate : 'every weekday at 12:00',
                recurrentEndDate   : 'every weekday at 08:00',
                isWorking          : false
            }]
        });

        const
            mike = resourceStore.getById(1),
            dan  = resourceStore.getById(2);

        await mike.setCalendar(mikeCal);

        await panel.expandAll();

        t.diag('Assert resource 1 row');

        await assertRecordRow('Assert 1', t, panel.store.getModelByOrigin(resourceStore.getById(1)), [
            { date : new Date(2015, 0, 5),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 12), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 13), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 14), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 15), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 16), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 19), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 20), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 21), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 22), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 23), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 26), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 27), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 28), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 29), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 30), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 2),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 3),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 4),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 5),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 6),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 9),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 10), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 11), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 12), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 13), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow('Assert 2', t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 5),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '2.0', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow('Assert 3', t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 29), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 30), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 2),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 3),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 4),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 5),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 6),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 9),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 10), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 11), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 13), text : '2.0', classes : noClasses }
        ]);

        t.diag('Assert resource 2 row');

        await assertRecordRow('Assert 4', t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow('Assert 5', t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24.0', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow('Assert 6', t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24.0', classes : noClasses }
        ]);

        t.diag('Add a 7hrs day to mikeCal');

        // Override 2015-01-05 day
        const intervals = mikeCal.addIntervals([
            {
                startDate : new Date(2015, 0, 5),
                endDate   : new Date(2015, 0, 5, 8),
                isWorking : false
            },
            {
                startDate : new Date(2015, 0, 5, 8),
                endDate   : new Date(2015, 0, 5, 12),
                isWorking : true
            },
            {
                startDate : new Date(2015, 0, 5, 12),
                endDate   : new Date(2015, 0, 5, 13),
                isWorking : false
            },
            {
                startDate : new Date(2015, 0, 5, 13),
                endDate   : new Date(2015, 0, 5, 16),
                isWorking : true
            },
            {
                startDate : new Date(2015, 0, 5, 16),
                endDate   : new Date(2015, 0, 6),
                isWorking : false
            }
        ]);

        await project.commitAsync();

        t.diag('Assert resource 1 row');

        await assertRecordRow('Assert 7', t, panel.store.getModelByOrigin(resourceStore.getById(1)), [
            { date : new Date(2015, 0, 5),  text : '7.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 12), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 13), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 14), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 15), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 16), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 19), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 20), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 21), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 22), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 23), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 26), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 27), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 28), text : '2.5', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 29), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 30), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 2),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 3),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 4),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 5),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 6),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 9),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 10), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 11), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 12), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 13), text : '0.5', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow('Assert 8', t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 5),  text : '3.5', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '0.5', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow('Assert 9', t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5),  text : '3.5', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 29), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 30), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 2),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 3),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 4),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 5),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 6),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 9),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 10), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 11), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 13), text : '0.5', classes : noClasses }
        ]);

        t.diag('Set mikeCal to resource #2 (Dan)');

        await dan.setCalendar(mikeCal);

        await panel.expandAll();

        t.diag('Assert resource 2 row');

        await assertRecordRow('Assert 10', t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5),  text : '14.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 9),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            // next week
            { date : new Date(2015, 0, 12), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 13), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 14), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 15), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 16), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            // next week
            { date : new Date(2015, 0, 19), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 20), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 21), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 22), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 23), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            // next week
            { date : new Date(2015, 0, 26), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 27), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 28), text : '5.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 29), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 30), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 2),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 3),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 4),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 5),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 6),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 9),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 10), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 11), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 12), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 13), text : '1.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow('Assert 11', t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5),  text : '7.0', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '1.0', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow('Assert 12', t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5),  text : '7.0', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 29), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 30), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 2),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 3),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 4),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 5),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 6),  text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 9),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 10), text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 11), text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 12), text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 13), text : '1.0', classes : noClasses }
        ]);

        t.diag('Remove the day intervals from mikeCal');

        mikeCal.removeIntervals(intervals);

        await project.commitAsync();

        t.diag('Assert resource 1 row');

        await assertRecordRow('Assert 13', t, panel.store.getModelByOrigin(resourceStore.getById(1)), [
            { date : new Date(2015, 0, 5),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 12), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 13), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 14), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 15), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 16), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 19), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 20), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 21), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 22), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 23), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 26), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 27), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 28), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 29), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 30), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 2),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 3),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 4),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 5),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 6),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 9),  text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 10), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 11), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 12), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 13), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow('Assert 14', t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 5),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '2.0', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow('Assert 15', t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 29), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 30), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 2),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 3),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 4),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 5),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 6),  text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 9),  text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 10), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 11), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 13), text : '2.0', classes : noClasses }
        ]);

        t.diag('Assert resource 2 row');

        await assertRecordRow('Assert 16', t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 9),  text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            // next week
            { date : new Date(2015, 0, 12), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 13), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 14), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 15), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 16), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            // next week
            { date : new Date(2015, 0, 19), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 20), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 21), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 22), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 23), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            // next week
            { date : new Date(2015, 0, 26), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 27), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 28), text : '8.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 29), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 30), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 2),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 3),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 4),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 5),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 6),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 9),  text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 10), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 11), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 12), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 13), text : '4.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow('Assert 17', t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '4.0', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow('Assert 18', t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 29), text : '4.0', classes : noClasses },
            { date : new Date(2015, 0, 30), text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 2),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 3),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 4),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 5),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 6),  text : '4.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 9),  text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 10), text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 11), text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 12), text : '4.0', classes : noClasses },
            { date : new Date(2015, 1, 13), text : '4.0', classes : noClasses }
        ]);

        t.diag('Reset Dan\'s calendar field');

        await dan.setCalendar(null);

        await panel.expandAll();

        t.diag('Assert resource 2 row');

        await assertRecordRow('Assert 19', t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '32.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '32.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 9), text : '24.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 12), text : '8.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow('Assert 20', t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            // Event #3 starts at 08:00 (due to the previous steps where we applied mikeCal to Dan)
            // so the event cannot use the whole 24hrs day but only 24h-8h=16h
            { date : new Date(2015, 0, 5), text : '16.0', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '8.0', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow('Assert 21', t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            // Event #4 starts at 08:00 (due to the previous steps where we applied mikeCal to Dan)
            // so the event cannot use the whole 24hrs day but only 24h-8h=16h
            { date : new Date(2015, 0, 5), text : '16.0', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 12), text : '8.0', classes : noClasses }
        ]);

        t.diag('Reset Mike\'s calendar field');

        mike.calendar = null;

        t.diag('Add a day to the project calendar');

        // Override 2015-01-05 day
        project.effectiveCalendar.addIntervals([
            {
                startDate : new Date(2015, 0, 5),
                endDate   : new Date(2015, 0, 5, 8),
                isWorking : false
            },
            {
                startDate : new Date(2015, 0, 5, 8),
                endDate   : new Date(2015, 0, 5, 12),
                isWorking : true
            },
            {
                startDate : new Date(2015, 0, 5, 12),
                endDate   : new Date(2015, 0, 5, 13),
                isWorking : false
            },
            {
                startDate : new Date(2015, 0, 5, 13),
                endDate   : new Date(2015, 0, 5, 16),
                isWorking : true
            },
            {
                startDate : new Date(2015, 0, 5, 16),
                endDate   : new Date(2015, 0, 6),
                isWorking : false
            }
        ]);

        await project.commitAsync();

        await panel.expandAll();

        t.diag('Assert resource 1 row');

        await assertRecordRow('Assert 22', t, panel.store.getModelByOrigin(resourceStore.getById(1)), [
            { date : new Date(2015, 0, 5),  text : '7.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6),  text : '24.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7),  text : '24.0', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8),  text : '20.5', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9),  text : '12.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 12), text : '8.5', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow('Assert 23', t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 5),  text : '3.5', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '12.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '12.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '8.5', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow('Assert 24', t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5),  text : '3.5', classes : noClasses },
            { date : new Date(2015, 0, 6),  text : '12.0', classes : noClasses },
            { date : new Date(2015, 0, 7),  text : '12.0', classes : noClasses },
            { date : new Date(2015, 0, 8),  text : '12.0', classes : noClasses },
            { date : new Date(2015, 0, 9),  text : '12.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '8.5', classes : noClasses }
        ]);

        t.diag('Set task #3 calendar'); // 2hrs a day

        const taskCal = CalendarModel.new({
            intervals : [{
                recurrentStartDate : 'every weekday at 10:00',
                recurrentEndDate   : 'every weekday at 08:00',
                isWorking          : false
            }]
        });

        await eventStore.getById(3).setCalendar(taskCal);

        await panel.expandAll();

        t.diag('Assert resource 2 row');

        await assertRecordRow('Assert 25', t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '9.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '26.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '26.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '26.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 9), text : '26.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            // next week
            { date : new Date(2015, 0, 12), text : '19.0', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 13), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 14), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 15), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 16), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 19), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 20), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 21), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 22), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 23), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 0, 26), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 27), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 28), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 29), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 30), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 2), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 3), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 4), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 5), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 6), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 9), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 10), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 11), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 12), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 13), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 16), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 17), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 18), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 19), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 1, 20), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            // next week
            { date : new Date(2015, 1, 23), text : '2.0', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow('Assert 26', t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 13), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 14), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 15), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 16), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 19), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 20), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 21), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 22), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 23), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 26), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 27), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 28), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 29), text : '2.0', classes : noClasses },
            { date : new Date(2015, 0, 30), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 2), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 3), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 4), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 5), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 6), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 9), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 10), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 11), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 12), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 13), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 16), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 17), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 18), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 19), text : '2.0', classes : noClasses },
            { date : new Date(2015, 1, 20), text : '2.0', classes : noClasses },
            // next week
            { date : new Date(2015, 1, 23), text : '2.0', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow('Assert 27', t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '7.0', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24.0', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24.0', classes : noClasses },
            // next week
            { date : new Date(2015, 0, 12), text : '17.0', classes : noClasses }
        ]);

    });

});
