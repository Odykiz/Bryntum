
StartTest(t => {

    let schedulerPro;

    t.beforeEach(function() {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    t.it('Should not crash when deleting event via context menu', async t => {

        const project = new ProjectModel({
            resourcesData : [{
                id   : 'r1',
                name : 'Buldozer'
            }],

            eventsData : [{
                id           : 'e1',
                name         : 'Buldoze 1',
                startDate    : new Date(2019, 0, 1),
                duration     : 10,
                durationUnit : 'd'
            }],

            assignmentsData : [{
                id       : 'a1',
                resource : 'r1',
                event    : 'e1'
            }]
        });

        schedulerPro = new SchedulerPro({
            project,
            appendTo  : document.body,
            startDate : new Date(2019, 0, 1),
            endDate   : new Date(2019, 0, 31)
        });

        t.chain(
            { waitForProjectReady : schedulerPro, desc : 'Wait for project ready' },
            { rightClick : '.b-sch-event-wrap:contains(Buldoze)' },
            { click : '.b-menuitem:contains(Delete)', offset : [1, 1] },

            { waitForSelectorNotFound : schedulerPro.unreleasedEventSelector }
        );
    });
});
