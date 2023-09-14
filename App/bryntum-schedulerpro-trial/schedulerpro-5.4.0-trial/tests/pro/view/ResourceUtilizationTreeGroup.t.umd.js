
StartTest(t => {

    let
        project,
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
            resourceStore,
            assignmentStore
        } = project);

        await project.commitAsync();
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

    t.it('Refresh row if all assignments for a resource are removed', async t => {

        await setup({
            columns : [
                {
                    type  : 'tree',
                    field : 'name',
                    renderer({ record, grid }) {
                        if (record.key) {
                            record = record.key;
                        }

                        record = grid.resolveRecordToOrigin(record);

                        return record.isResourceModel ? record.name : record.event.name;
                    }
                }
            ],
            features : {
                treeGroup : {
                    levels : [
                        // group by assignment resource
                        ({ origin }) => origin.isAssignmentModel ? origin.resource : Store.StopBranch
                    ]
                }
            }
        });

        // wait till TreeGroup builds data
        await t.waitFor(() => panel.store.first?.generatedParent);

        assignmentStore.remove([assignmentStore.getById(1), assignmentStore.getById(2)]);

        await project.commitAsync();

        await panel.await('treeGroupChange', { checkLog : false });

        t.diag('Assert resource 1 row');

        const resource1 = panel.store.getModelByOrigin(resourceStore.getById(1));

        await assertRecordRow(t, resource1, []);

        t.notOk(resource1.children?.length, 'No assignment row for resource 1');

        t.diag('Assert resource 2 row');

        const resource2 = panel.store.query(({ key }) => key === resourceStore.getById(2))[0];

        await assertRecordRow(t, resource2, [
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

});
