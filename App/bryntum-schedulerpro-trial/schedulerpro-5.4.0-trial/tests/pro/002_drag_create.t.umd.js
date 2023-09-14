
StartTest(t => {

    let schedulerPro;

    t.beforeEach(function() {
        schedulerPro?.destroy();
        schedulerPro = null;
    });

    t.it('SchedulerPro should allow event drag-creation and then movement', async t => {

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

        let dropDone = false;

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
            ],

            listeners : {
                eventDrop() {
                    dropDone = true;
                }
            }
        });

        const done = t.livesOkAsync('No exceptions thrown');

        t.chain(
            { waitForProjectReady : schedulerPro, desc : 'Wait for project ready' },
            { drag : '.b-grid-row[data-index=1] .b-sch-timeaxis-cell', offset : [50, '50%'], by : [100, 0] },
            { waitForSelector : '[name="name"]', desc : 'Wait for input field visible' },
            { type : 'Dig', target : '[name="name"]', desc : 'Type name' },
            { click : '.b-button:contains(Save)', desc : 'Save changes' },
            { waitForProjectReady : schedulerPro, desc : 'Wait for project ready' },
            { drag : '.b-sch-dirty-new', by : [100, 0], desc : 'Drag move new Event' },
            () => {
                t.ok(dropDone, 'Drop has been succesfully done');
                done();
            }
        );
    });

    t.it('Should support adding an event', async t => {
        t.mockUrl('createEvent', {
            synchronous  : true,
            responseText : JSON.stringify({
                success : true,
                data    : [{
                    id           : 'e1',
                    name         : 'Buldoze 1',
                    startDate    : new Date(2019, 0, 1),
                    duration     : 10,
                    durationUnit : 'd'
                }]
            })
        });

        schedulerPro = new SchedulerPro({
            appendTo : document.body,
            features : {
                taskEdit : false
            },
            resourceStore : {
                data : [
                    { id : 1, name : 'Bob' }
                ]
            },

            eventStore : {
                createUrl : 'createEvent',
                // Make it read only to prevent changes while committing
                listeners : {
                    beforeCommit : () => {
                        // scheduler.readOnly = true;
                    },
                    commit : () => {
                        // scheduler.readOnly = false;
                    },
                    exception : ({ error })  => {
                        t.fail(error.message);
                    }
                }
            }
        });

        schedulerPro.eventStore.autoCommit = true;
        await t.doubleClick('.b-sch-timeaxis-cell');
    });
});
