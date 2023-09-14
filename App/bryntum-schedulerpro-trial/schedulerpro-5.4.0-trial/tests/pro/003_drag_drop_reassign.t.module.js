
StartTest(t => {

    let schedulerPro;

    t.beforeEach(function() {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    // #8656 https://www.assembla.com/spaces/bryntum/tickets/8656
    t.it('SchedulerPro should allow event reassignment by drag & drop', async t => {

        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'Buldozer'
            }, {
                id   : 'r2',
                name : 'Excavator'
            }],

            eventsData : [{
                id           : 'e1',
                name         : 'Buldoze 1',
                startDate    : new Date(2019, 0, 1),
                duration     : 10,
                durationUnit : 'd'
            }, {
                id           : 'e2',
                name         : 'Buldoze 2',
                startDate    : new Date(2019, 0, 11),
                duration     : 10,
                durationUnit : 'd'
            }],

            dependenciesData : [{
                id        : 'd1',
                fromEvent : 'e1',
                toEvent   : 'e2',
                lag       : 2,
                lagUnit   : 'd'
            }],

            assignmentsData : [{
                id       : 'a1',
                resource : 'r1',
                event    : 'e1'
            }, {
                resource : 'r1',
                event    : 'e2',
                id       : 'a2'
            }]
        });

        schedulerPro = new SchedulerPro({
            project : project,

            appendTo   : document.body,
            minHeight  : '20em',
            startDate  : new Date(2019, 0, 1),
            endDate    : new Date(2019, 0, 31),
            viewPreset : 'weekAndMonth',
            rowHeight  : 30,
            barMargin  : 5,

            columns : [
                { text : 'Name', field : 'name', width : 130 }
            ]
        });

        const
            done = t.livesOkAsync('No exceptions thrown');

        t.chain(
            { waitForProjectReady : schedulerPro, desc : 'Wait for project ready' },
            { mousedown : '.b-sch-event-wrap[data-event-id=e2]' },
            { mouseup : '.b-grid-row[data-index=1] .b-sch-timeaxis-cell' },
            () => {
                t.is(project.getAssignmentStore().count, 2, 'Two assignments left');
                t.is(project.getEventStore().count, 2, 'Two events left');

                done();
            }
        );
    });
});
