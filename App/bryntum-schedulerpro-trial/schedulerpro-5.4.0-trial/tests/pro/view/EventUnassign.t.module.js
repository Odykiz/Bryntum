
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    // #8869 https://www.assembla.com/spaces/bryntum/tickets/8869
    t.it('Task unassignment should be reflected in the view', async t => {
        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'Buldozer'
            }],

            eventsData : [{
                id                : 'e1',
                name              : 'Buldoze 1',
                startDate         : new Date(2019, 0, 1),
                duration          : 10,
                durationUnit      : 'd',
                manuallyScheduled : true
            }, {
                id                : 'e2',
                name              : 'Buldoze 2',
                startDate         : new Date(2019, 0, 13),
                duration          : 10,
                durationUnit      : 'd',
                manuallyScheduled : true
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

        t.chain(
            { waitForProjectReady : project },
            { contextmenu : '.b-sch-event' },
            { click : '.b-menuitem:contains(Unassign)' },
            { waitForProjectReady : project },
            {
                waitFor : () => t.query('.b-sch-event-wrap:not(.b-sch-released)').length === 1,
                desc    : 'Only one event is rendered after propagate'
            }
        );
    });
});
