
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    t.it('Should be possible to create dependecy between two newly created events - data', async t => {
        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'Buldozer'
            }, {
                id   : 'r2',
                name : 'Excavator'
            }]
        });

        const [fromEvent, toEvent] = project.eventStore.add([{
            startDate : new Date(2019, 1, 1),
            duration  : 1
        }, {
            startDate : new Date(2019, 1, 1),
            duration  : 1
        }]);

        await project.commitAsync();

        fromEvent.assign(project.getResourceById('r1'));
        toEvent.assign(project.getResourceById('r2'));

        await project.commitAsync();

        const isValid       = await project.dependencyStore.isValidDependency({ fromEvent, toEvent });

        t.ok(isValid, 'Dependency is valid');
    });

    t.it('Should be possible to create dependecy between two newly created events - ui', async t => {
        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'Buldozer'
            }, {
                id   : 'r2',
                name : 'Excavator'
            }]
        });

        schedulerPro = new SchedulerPro({
            project,

            appendTo   : document.body,
            minHeight  : '20em',
            startDate  : new Date(2019, 0, 1),
            endDate    : new Date(2019, 0, 31),
            viewPreset : 'weekAndMonth',

            columns : [
                { text : 'name', field : 'name', width : 130 }
            ],

            features : {
                eventTooltip : false,
                taskEdit     : false
            }
        });

        await project.commitAsync();

        await t.dragBy({
            source : '.b-grid-subgrid-normal .b-grid-row[data-index=0] .b-grid-cell',
            delta  : [100, 0]
        });

        await project.commitAsync();

        schedulerPro.eventStore.first.cls = 'one';

        await t.dragBy({
            source : '.b-grid-subgrid-normal .b-grid-row[data-index=1] .b-grid-cell',
            delta  : [100, 0]
        });

        await project.commitAsync();
        schedulerPro.eventStore.last.cls = 'two';

        await t.moveCursorTo('.one');

        await t.dragTo({
            source   : '.one .b-sch-terminal-end',
            target   : '.two',
            dragOnly : true
        });

        await t.moveCursorTo('.two .b-sch-terminal-start');
        await t.waitForSelector('.b-tooltip .b-icon-valid');
        await t.mouseUp();
    });
});
