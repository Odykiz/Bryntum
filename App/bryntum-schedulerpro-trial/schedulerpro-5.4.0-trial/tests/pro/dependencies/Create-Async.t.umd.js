
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    class SlowProjectModel extends ProjectModel {

        construct(config) {
            config.delayCalculation = false;

            super.construct(config);

            const graph = this.getGraph(),
                oldCommitAsync = graph.commitAsync,
                oldIsValidDependency = this.isValidDependency;

            graph.commitAsync = () => new Promise((resolve, reject) => {
                if (this.propagationBlocked) {
                    this.continueCommit = () => {
                        oldCommitAsync.call(graph).then(resolve, reject);
                    };
                }
                else {
                    oldCommitAsync.call(graph).then(resolve, reject);
                }
            });

            this.isValidDependency = (...args) => new Promise((resolve, reject) => {
                if (this.propagationBlocked) {
                    this.continueIsValid = () => {
                        oldIsValidDependency.call(this, ...args).then(resolve);
                    };
                }
                else {
                    oldIsValidDependency.call(this, ...args).then(resolve);
                }
            });
        }

        blockPropagation() {
            this.propagationBlocked = true;
        }

        unblockPropagation() {
            this.propagationBlocked = false;
            if (this.continueCommit) {
                this.continueCommit();
                this.continueCommit = null;
            }
            if (this.continueIsValid) {
                this.continueIsValid();
                this.continueIsValid = null;
            }
        }
    }

    const makeProject = cfg => new SlowProjectModel(Object.assign({
        resourcesData : [{
            id   : 'r1',
            name : 'Buldozer'
        }],

        eventsData : [{
            id           : 'e1',
            name         : 'Buldoze 1',
            cls          : 'event1',
            startDate    : new Date(2019, 0, 1),
            duration     : 10,
            durationUnit : 'd'
        }, {
            id           : 'e2',
            name         : 'Buldoze 2',
            cls          : 'event2',
            startDate    : new Date(2019, 0, 12),
            duration     : 10,
            durationUnit : 'd'
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
    }, cfg));

    t.it('Scheduler dependency create is async UI should handle it well', async t => {

        const project = makeProject();

        let validationStarted = false,
            validationCompleted = false,
            afterDependencyCreatedDropped = false;

        schedulerPro = new SchedulerPro({
            project,

            appendTo   : document.body,
            minHeight  : '20em',
            startDate  : new Date(2019, 0, 1),
            endDate    : new Date(2019, 0, 31),
            viewPreset : 'weekAndMonth',
            rowHeight  : 30,
            barMargin  : 5,
            features   : {
                dependencies : {
                    allowDropOnEventBar : false // the legacy behavior
                }
            },
            columns : [
                { text : 'Name', field : 'name', width : 130 }
            ],

            listeners : {
                dependencyValidationStart() {
                    validationStarted = true;
                    validationCompleted = false;
                },

                dependencyValidationComplete() {
                    validationStarted = false;
                    validationCompleted = true;
                },

                afterDependencyCreateDrop() {
                    afterDependencyCreatedDropped = true;
                }
            }
        });

        t.firesOnce(schedulerPro.dependencyStore, 'add');

        t.chain(
            { waitForProjectReady : project },
            { moveCursorTo : '.b-sch-event:contains(Buldoze 1)' },
            { mouseDown : '.b-sch-terminal-end' },
            { moveCursorTo : '.b-sch-event:contains(Buldoze 2)' },
            (next) => {
                project.blockPropagation();
                next();
            },
            { moveCursorTo : '.b-sch-event:contains(Buldoze 2) .b-sch-terminal-start' },
            { waitFor : () => validationStarted || validationCompleted },
            { waitForSelector : '.b-sch-dependency-creation-tooltip:contains(Buldoze 1)' },
            (next) => {
                project.unblockPropagation();
                next();
            },
            { waitForSelector : '.b-sch-dependency-creation-tooltip:contains(Buldoze 1)' },
            { waitForSelector : '.b-sch-dependency-creation-tooltip:contains(Buldoze 2)' },
            { waitForSelector : '.b-sch-dependency-creation-tooltip .b-header-title:textEquals(Valid) .b-icon-valid' },
            { mouseUp : null },
            { waitFor : () => validationCompleted && afterDependencyCreatedDropped },
            { waitForProjectReady : project },
            { waitForSelectorNotFound : '.b-sch-dependency-creation-tooltip' },
            (next) => {
                t.is(project.getEventById('e1').endDate, project.getEventById('e2').startDate, 'Dependency created');
            }
        );
    });

    t.it('Scheduler shouldn\'t allow dependency creation before validation is complete', t => {
        const project = makeProject();

        let validationStarted = false,
            validationCompleted = false,
            afterDependencyCreatedDropped = false;

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
                dependencyValidationStart() {
                    validationStarted = true;
                    validationCompleted = false;
                },

                dependencyValidationComplete() {
                    validationStarted = false;
                    validationCompleted = true;
                },

                afterDependencyCreateDrop() {
                    afterDependencyCreatedDropped = true;
                }
            }
        });

        t.chain(
            { waitForProjectReady : project },
            { moveCursorTo : '.b-sch-event:contains(Buldoze 1)' },
            { mouseDown : '.b-sch-terminal-end' },
            (next) => {
                project.blockPropagation();
                next();
            },
            { moveCursorTo : '.b-sch-event:contains(Buldoze 2)' },
            { moveCursorTo : '.b-sch-event:contains(Buldoze 2) .b-sch-terminal-start' },
            { waitFor : () => validationStarted },
            { mouseUp : null },
            (next) => {
                // During dependency validation dependency store contains no new dependencies
                t.notOk(validationCompleted, 'Validation is in progress');
                t.is(project.getDependencyStore().count, 0, 'No dependencies has been created yet');
                next();
            },
            (next) => {
                project.unblockPropagation();
                next();
            },
            { waitFor : () => validationCompleted && afterDependencyCreatedDropped },
            { waitForSelectorNotFound : '.b-sch-dependency-creation-tooltip' },
            (next) => {
                // After dependency has been validated it should have been created
                t.is(project.getDependencyStore().count, 1, 'One dependency has been created');
            }
        );
    });

    //https://github.com/bryntum/support/issues/172
    t.it('Creating a dependency between already linked tasks should consider to be invalid operation', async t => {
        const project = makeProject({
            resourcesData : [{
                id   : 'r1',
                name : 'foo'
            }, {
                id   : 'r2',
                name : 'bar'
            }],

            assignmentsData : [{
                id       : 'a1',
                resource : 'r1',
                event    : 'e1'
            }, {
                resource : 'r2',
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

        await t.waitForProjectReady(project);

        t.firesOk(project.dependencyStore, 'add', 1, 'DependencyStore should be changed once when first dependency is added');

        t.chain(
            // It should be possible to create a dependency.
            { moveMouseTo : '.event1' },
            { drag : '.event1 .b-sch-terminal-end', to : '.event2', dragOnly : true },
            { moveMouseTo : '.event2 .b-sch-terminal-start' },
            { waitForSelector : '.b-sch-dependency-connector.b-valid' },
            { waitForSelector : '.b-sch-dependency-creation-tooltip .b-icon-valid' },
            { mouseUp : null },

            // It should not be possible to create the same dependency again.
            { moveMouseTo : '.event1' },
            { drag : '.event1 .b-sch-terminal-end', to : '.event2', dragOnly : true },
            { moveMouseTo : '.event2 .b-sch-terminal-start' },
            { waitForSelector : '.b-sch-dependency-connector.b-invalid' },
            { waitForSelector : '.b-sch-dependency-creation-tooltip .b-icon-invalid' },
            { mouseUp : null },
            { waitForSelectorNotFound : '.b-sch-dependency-creation-tooltip' }
        );
    });
});
