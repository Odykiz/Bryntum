
StartTest(t => {

    let schedulerPro;

    t.beforeEach(async() => {
        schedulerPro?.destroy();

        schedulerPro = await t.getSchedulerProAsync({
            appendTo   : document.body,
            startDate  : new Date(2018, 9, 14),
            endDate    : new Date(2018, 9, 30),
            viewPreset : 'weekAndMonth',
            project    : {
                eventsData : [
                    { id : 1, startDate : new Date(2018, 9, 20), duration : 2, name : 'task 1' },
                    { id : 2, startDate : new Date(2018, 9, 20), duration : 2, name : 'task 2' }
                ],

                resourcesData : [
                    { id : 1, name : 'foo' },
                    { id : 2, name : 'bar' }
                ],

                assignmentsData : [
                    { id : 1, resource : 1, event : 1 },
                    { id : 2, resource : 2, event : 2 }
                ],

                dependenciesData : [
                    { id : 1, fromEvent : 1, toEvent : 2, type : 2 }
                ]
            },

            features : {
                dependencies : {
                    showTooltip : false
                },
                taskTooltip    : false,
                dependencyEdit : true
            }
        });
    });

    async function dblclickSVGElement(t, selector) {
        const el = await t.waitForSelector(selector);

        const
            element     = el[0],
            ownerSVG    = element.ownerSVGElement,
            ownerBox    = ownerSVG.getBoundingClientRect(),
            elementBBox = element.getBBox();

        await t.doubleClick([ownerBox.left + elementBBox.x + elementBBox.width, ownerBox.top + elementBBox.y]);
    }

    t.it('Should show editor on dblclick on dependency', async t => {
        await dblclickSVGElement(t, '.b-sch-dependency');

        await t.waitForSelector('.b-popup .b-header-title:contains(Edit dependency)');

        t.pass('Popup shown with correct title');

        const { dependencyEdit } = schedulerPro.features;

        t.hasValue(dependencyEdit.fromNameField, 'task 1');
        t.hasValue(dependencyEdit.toNameField, 'task 2');
        t.hasValue(dependencyEdit.typeField, 2);
        t.is(dependencyEdit.typeField.inputValue, 'End to Start');

        t.selectorExists('label:contains(Lag)', 'Lag field should exist by default');
    });

    t.it('Should delete dependency on Delete click', async t => {
        t.firesOnce(schedulerPro.dependencyStore, 'remove');

        await dblclickSVGElement(t, '.b-sch-dependency');

        await t.click('.b-popup button:textEquals(Delete)');

        await t.waitForSelectorNotFound('.b-sch-dependency');
    });

    t.it('Should change nothing on Cancel and close popup', async t => {
        t.wontFire(schedulerPro.dependencyStore, 'changePreCommit');

        await dblclickSVGElement(t, '.b-sch-dependency');

        await t.click('.b-popup button:textEquals(Cancel)');
    });

    t.it('Should change nothing on Save with no changes', async t => {
        t.wontFire(schedulerPro.dependencyStore, 'changePreCommit');

        await dblclickSVGElement(t, '.b-sch-dependency');

        await t.click('.b-popup button:textEquals(Save)');
    });

    t.it('Should repaint and update model when changing type', async t => {
        t.firesOnce(schedulerPro.dependencyStore, 'update');

        await dblclickSVGElement(t, '.b-sch-dependency');

        schedulerPro.features.dependencyEdit.typeField.value = 1;

        await t.click('.b-popup button:textEquals(Save)');

        t.is(schedulerPro.dependencyStore.first.type, 1, 'Type updated');
    });

    t.it('Should deactivate dependency', async t => {
        t.willFireNTimes(schedulerPro.dependencyStore, 'update', 2);

        const { dependencyEdit } = schedulerPro.features;

        await dblclickSVGElement(t, '.b-sch-dependency');

        dependencyEdit.activeField.value = false;

        await t.click('.b-popup button:textEquals(Save)');
        await t.waitForProjectReady(schedulerPro.project);

        t.is(schedulerPro.taskStore.last.startDate, new Date(2018, 9, 22), 'last task start date is correct');
        t.is(schedulerPro.taskStore.last.endDate, new Date(2018, 9, 24), 'last task end date is correct');
        t.notOk(schedulerPro.dependencyStore.first.active, 'dependency active is updated');

        t.diag('Moving 1st event forward');

        await schedulerPro.taskStore.first.setStartDate(new Date(2018, 9, 22));

        t.is(schedulerPro.taskStore.first.startDate, new Date(2018, 9, 22), 'first task start date is correct');
        t.is(schedulerPro.taskStore.first.endDate, new Date(2018, 9, 24), 'last task end date is correct');

        t.is(schedulerPro.taskStore.last.startDate, new Date(2018, 9, 22), 'last task start date is correct');
        t.is(schedulerPro.taskStore.last.endDate, new Date(2018, 9, 24), 'last task end date is correct');
        t.notOk(schedulerPro.dependencyStore.first.active, 'dependency active is updated');

        t.diag('Activating dependency back');

        dependencyEdit.editDependency(schedulerPro.dependencyStore.first);
        dependencyEdit.activeField.value = true;

        await t.click('.b-popup button:textEquals(Save)');
        await t.waitForProjectReady(schedulerPro.project);

        t.is(schedulerPro.taskStore.first.startDate, new Date(2018, 9, 22), 'first task start date is correct');
        t.is(schedulerPro.taskStore.first.endDate, new Date(2018, 9, 24), 'last task end date is correct');

        t.is(schedulerPro.taskStore.last.startDate, new Date(2018, 9, 24), 'last task start date is correct');
        t.is(schedulerPro.taskStore.last.endDate, new Date(2018, 9, 26), 'last task end date is correct');
        t.ok(schedulerPro.dependencyStore.first.active, 'dependency active is updated');
    });

    t.it('Should allow to edit lag', async t => {

        schedulerPro?.destroy();

        schedulerPro = await t.getSchedulerProAsync({
            appendTo   : document.body,
            startDate  : new Date(2018, 9, 14),
            endDate    : new Date(2018, 9, 30),
            viewPreset : 'weekAndMonth',
            project    : {
                eventsData : [
                    { id : 1, startDate : new Date(2018, 9, 20), duration : 2, name : 'task 1' },
                    { id : 2, startDate : new Date(2018, 9, 20), duration : 2, name : 'task 2' }
                ],

                resourcesData : [
                    { id : 1, name : 'foo' },
                    { id : 2, name : 'bar' }
                ],

                assignmentsData : [
                    { id : 1, resource : 1, event : 1 },
                    { id : 2, resource : 2, event : 2 }
                ],

                dependenciesData : [
                    { id : 1, fromEvent : 1, toEvent : 2, type : 2, lag : 1, lagUnit : 'hour' }
                ]
            },

            features : {
                dependencies : {
                    showTooltip : false
                },
                taskTooltip    : false,
                dependencyEdit : {
                    autoClose    : false,
                    showLagField : true
                }
            }
        });

        await t.waitForSelector('.b-sch-dependency');

        const depFeature = schedulerPro.features.dependencyEdit;

        depFeature.editDependency(schedulerPro.dependencyStore.first);

        t.is(depFeature.lagField.unit, 'hour', 'lag field uses proper unit');

        await t.click('button:contains(Save)');

        t.is(schedulerPro.dependencyStore.first.lag, 1, 'dependency has proper lag');
        t.is(schedulerPro.dependencyStore.first.lagUnit, 'hour', 'dependency has proper lag unit');
    });
});
