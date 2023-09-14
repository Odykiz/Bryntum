
StartTest(t => {

    let
        project,
        eventStore,
        resourceStore,
        assignmentStore,
        panel;

    t.beforeEach(() => ResourceUtilization.destroy(panel));

    async function setup(panelConfig) {

        panel = ResourceUtilization.new({
            appendTo  : document.body,
            startDate : new Date(2015, 0, 5),
            endDate   : new Date(2015, 0, 19),
            project   : {
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
        }, panelConfig);

        project = panel.project;

        ({
            eventStore,
            resourceStore,
            assignmentStore
        } = project);

        await project.commitAsync();

        await panel.expandAll();
    }

    const noClasses = { 'b-underallocated' : false, 'b-overallocated' : false };

    async function assertRecordRow(t, record, values) {
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
    }

    t.it('Sanity checks', async t => {

        await setup();

        t.diag('Assert resource 1 row');

        const mike = panel.store.getModelByOrigin(resourceStore.getById(1));

        await assertRecordRow(t, mike, [
            { date : new Date(2015, 0, 5), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 5), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '12', classes : noClasses }
        ]);

        t.diag('Assert resource 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24', classes : noClasses }
        ]);

    });

    t.it('Refresh on assignment CRUD', async t => {

        await setup();

        const assignment = assignmentStore.getById(1);

        t.diag('Changing assignment 1 units to 100%');

        await assignment.setUnits(100);

        t.diag('Assert resource 1 row');

        const mike = panel.store.getModelByOrigin(resourceStore.getById(1));

        await assertRecordRow(t, mike, [
            { date : new Date(2015, 0, 5), text : '36', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '36', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '36', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '12', classes : noClasses }
        ]);

        t.diag('Asserting other records stayed intact...');

        t.diag('Assert resource 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24', classes : noClasses }
        ]);

        t.diag('Asserting assignment #1 removal');

        const { event } = assignment;

        assignmentStore.remove(assignment);

        await project.commitAsync();

        await t.waitFor(() => panel.store.count === 5);

        t.notOk(panel.store.getModelByOrigin(assignment), 'Should not find Task 1 assignment under Mike anymore');

        t.diag('Assert resource 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(1)), [
            { date : new Date(2015, 0, 5), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '12', classes : noClasses }
        ]);

        t.diag('Asserting other records stayed intact...');

        t.diag('Assert resource 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24', classes : noClasses }
        ]);

        t.diag('Asserting adding assignment #1 back');

        eventStore.add(event);
        assignmentStore.add(assignment);

        await project.commitAsync();

        t.diag('Assert resource 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(1)), [
            { date : new Date(2015, 0, 5), text : '36', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '36', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '36', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '12', classes : noClasses }
        ]);

        t.diag('Assert resource 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24', classes : noClasses }
        ]);
    });

    t.it('Refresh on resource store CRUD', async t => {

        await setup();

        resourceStore.removeAll();

        await project.commitAsync();

        t.is(panel.store.count, 0, 'Empty panel store');

        const new1 = resourceStore.add({
            name : 'New',
            id   : 5
        })[0];

        const new2 = resourceStore.add({
            name : 'New 2',
            id   : 6
        })[0];

        await project.commitAsync();

        t.is(panel.store.count, 2, 'two added records are displayed');

        // Surrogate resources has no summary tasks assigned since they have no assignments
        t.ok(panel.store.getModelByOrigin(new1).isLeaf, 'New resource 1 has no events - summary event');
        t.ok(panel.store.getModelByOrigin(new2).isLeaf, 'New resource 2 has no events - summary event');

        resourceStore.remove(new2);

        await project.commitAsync();

        t.is(panel.store.count, 1, 'Resource utilization store only one resource left');
        t.ok(panel.store.getModelByOrigin(new1).isLeaf, 'Unassigned resource should have no summary event');

        new1.set('name', 'Foo');

        t.is(panel.store.getModelByOrigin(new1).name, 'Foo', 'Resource name in resource utilization store has been updated accordingly to resource store');
    });

    t.it('Refresh on TaskStore CRUD', async t => {

        await setup();

        const task1 = eventStore.getById(1);

        task1.set('name', 'Foo');

        await task1.setStartDate(new Date(2015, 0, 6));

        await t.waitFor(() => panel.store.query(surrogate => surrogate.name == 'Foo').length == 1);

        t.is(panel.store.query(surrogate => surrogate.name == 'Foo').length, 1, '1 task updated');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(1)), [
            { date : new Date(2015, 0, 5), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '12', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '12', classes : noClasses }
        ]);

        t.diag('Assert resource 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24', classes : noClasses }
        ]);

        task1.remove();

        await project.commitAsync();

        t.notOk(panel.store.findRecord('name', 'Foo'), 'Task 1 not in the tree anymore');
    });

    t.it('Refresh on timeAxis traversal', async t => {

        await setup();

        await panel.shiftPrevious();

        t.diag('Assert resource 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(1)), [
            { date : new Date(2015, 0, 5), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(1)), [
            { date : new Date(2015, 0, 5), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses }
        ]);

        t.diag('Assert assignment 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '12', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '12', classes : noClasses }
        ]);

        t.diag('Assert resource 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24', classes : noClasses }
        ]);
    });

    t.it('Refresh row if all assignments for a resource are removed', async t => {

        await setup();

        assignmentStore.remove([assignmentStore.getById(1), assignmentStore.getById(2)]);

        await project.commitAsync();

        t.diag('Assert resource 1 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(1)), []);

        t.notOk(panel.store.getModelByOrigin(resourceStore.getById(1)).children?.length, 'No assignment row for resource 1');

        t.diag('Assert resource 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

        t.diag('Assert assignment 3 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(3)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses }
        ]);

        t.diag('Assert assignment 4 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(assignmentStore.getById(4)), [
            { date : new Date(2015, 0, 5), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 6), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 7), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 8), text : '24', classes : noClasses },
            { date : new Date(2015, 0, 9), text : '24', classes : noClasses }
        ]);
    });

    t.it('Sanity w/ AJAX auto loading', async t => {

        t.mockUrl('test-load', {
            responseText : JSON.stringify({
                delay     : 10,
                resources : {
                    rows : [
                        { id : 1, name : 'Mike' },
                        { id : 2, name : 'Dan' }
                    ]
                },
                assignments : {
                    rows : [
                        { id : 1, event : 1, resource : 1, units : 50 },
                        { id : 2, event : 2, resource : 1, units : 50 },
                        { id : 3, event : 3, resource : 2 },
                        { id : 4, event : 4, resource : 2 }
                    ]
                },
                dependencies : {
                    rows : []
                },
                events : {
                    rows : [
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
            })
        });

        setup({
            project : {
                // we do not use inline data in this sub-test
                calendarsData    : null,
                resourcesData    : null,
                assignmentsData  : null,
                dependenciesData : null,
                eventsData       : null,
                // load data via ajax
                loadUrl          : 'test-load',
                autoLoad         : true
            },
            startDate : new Date(2015, 0, 5),
            endDate   : new Date(2015, 0, 19)
        });

        // Wait till load request is done
        await project.await('load');

        t.diag('Assert resource 1 row');

        let mike;

        await t.waitFor(() => mike = panel.store.getModelByOrigin(resourceStore.getById(1)));

        await assertRecordRow(t, mike, [
            { date : new Date(2015, 0, 5), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 6), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 7), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 8), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '12', classes : { 'b-underallocated' : true, 'b-overallocated' : false } }
        ]);

        t.diag('Assert resource 2 row');

        await assertRecordRow(t, panel.store.getModelByOrigin(resourceStore.getById(2)), [
            { date : new Date(2015, 0, 5), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 6), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 7), text : '48', classes : { 'b-underallocated' : false, 'b-overallocated' : true } },
            { date : new Date(2015, 0, 8), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } },
            { date : new Date(2015, 0, 9), text : '24', classes : { 'b-underallocated' : false, 'b-overallocated' : false } }
        ]);

    });

});
