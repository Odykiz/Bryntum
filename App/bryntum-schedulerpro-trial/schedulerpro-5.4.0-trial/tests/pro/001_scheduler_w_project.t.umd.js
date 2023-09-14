
StartTest(t => {

    let schedulerPro;
    const
        resourcesData    = [{
            id   : 'r1',
            name : 'Buldozer'
        }],

        eventsData       = [{
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

        dependenciesData = [{
            id        : 'd1',
            fromEvent : 'e1',
            toEvent   : 'e2',
            lag       : 2,
            lagUnit   : 'd'
        }],

        assignmentsData  = [{
            id       : 'a1',
            resource : 'r1',
            event    : 'e1'
        }, {
            id       : 'a2',
            resource : 'r1',
            event    : 'e2'
        }],
        createSchedulerPro = (config) => {
            schedulerPro?.destroy();
            schedulerPro = new SchedulerPro(Object.assign({
                enableEventAnimations : false,

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
            }, config));
        },
        checkProject     = (t) => {
            t.chain(
                { waitForProjectReady : schedulerPro },
                { waitForSelector : '.b-grid-cell:contains(Buldozer)', desc : 'Resource is visible' },
                { waitForSelector : '.b-sch-event-wrap[data-assignment-id=a1]', desc : 'Buldoze 1 is visible' },
                { waitForSelector : '.b-sch-event-wrap[data-assignment-id=a2]', desc : 'Buldoze 2 is visible' },
                { waitForSelector : '.b-sch-dependency[data-dep-id=d1]', desc : 'Dependency line is visible' },
                () => {
                    const
                        ew1     = t.query('.b-sch-event-wrap[data-assignment-id=a1]')[0],
                        ew2     = t.query('.b-sch-event-wrap[data-assignment-id=a2]')[0],
                        ew1rect = ew1.getBoundingClientRect(),
                        ew2rect = ew2.getBoundingClientRect();

                    t.is(ew1rect.top, ew2rect.top, 'Both events are visually assigned to the same resource');
                    t.is(ew1rect.bottom, ew2rect.bottom, 'Both events are visually assigned to the same resource');
                }
            );
        };

    t.it('SchedulerPro should be able to consume project', async t => {
        const project = new ProjectModel({
            resourcesData,
            eventsData,
            dependenciesData,
            assignmentsData
        });

        createSchedulerPro({ project });
        checkProject(t);
    });

    t.it('SchedulerPro should provide project if none configured', async t => {

        createSchedulerPro();
        const project = schedulerPro.project;

        project.resourceStore.data = resourcesData;
        project.eventStore.data = eventsData;
        project.dependencyStore.data = dependenciesData;
        project.assignmentStore.data = assignmentsData;

        checkProject(t);
    });
});
