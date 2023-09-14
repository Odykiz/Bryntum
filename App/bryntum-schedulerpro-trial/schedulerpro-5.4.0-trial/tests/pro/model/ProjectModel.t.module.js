
StartTest(t => {
    let consoleMessages,
        consoleSpy,
        project;

    t.beforeEach(() => {
        ProjectModel.destroy(project);
        consoleSpy?.remove();
    });

    function initConsoleSpy(t) {
        consoleMessages = [];
        consoleSpy = t.spyOn(console, 'warn').and.callFake(m => consoleMessages.push(m));
    }

    // Helper that builds a regexp based on the passed array of lines
    function buildLinesRegExp(lines) {
        return new RegExp(StringHelper.escapeRegExp(lines.join('\n')).replace(/\s+/g, '\\s*').replace(/XXX/g, '\\S+'));
    }

    function getProjectData() {
        return {
            eventsData : [{
                startDate    : new Date(2020, 11, 21),
                duration     : 10,
                durationUnit : 'd'
            }]
        };
    }

    t.it('Setting and getting inlineData', async t => {
        const testData = {
            resourcesData : [
                { id : 1, name : 'resource 1' },
                { id : 2, name : 'resource 2' },
                { id : 3, name : 'resource 3' },
                { id : 4, name : 'resource 4' },
                { id : 5, name : 'resource 5' }
            ],
            eventsData : [
                { id : 1, name : 'event 1' },
                { id : 2, name : 'event 2' },
                { id : 3, name : 'event 3' },
                { id : 4, name : 'event 4' },
                { id : 5, name : 'event 5' },
                { id : 6, name : 'event 6' },
                { id : 7, name : 'event 7' },
                { id : 8, name : 'event 8' }
            ],
            assignmentsData : [
                { id : 1, eventId : 1, resourceId : 1 },
                { id : 2, eventId : 1, resourceId : 2 },
                { id : 3, eventId : 1, resourceId : 5 },
                { id : 4, eventId : 2, resourceId : 2 },
                { id : 5, eventId : 3, resourceId : 3 },
                { id : 6, eventId : 4, resourceId : 3 },
                { id : 7, eventId : 5, resourceId : 3 },
                { id : 8, eventId : 5, resourceId : 4 },
                { id : 9, eventId : 6, resourceId : 2 },
                { id : 10, eventId : 7, resourceId : 5 },
                { id : 11, eventId : 8, resourceId : 4 }
            ],
            dependenciesData : [
                { id : 1, from : 1, to : 5 },
                { id : 2, from : 2, to : 4 }
            ]
        };

        project = new ProjectModel();

        // Populate the stores
        project.inlineData = testData;

        // Get data back
        const inlineData = project.inlineData;

        // Check data
        t.isDeeply(inlineData.eventsData.map(event => {
            return { id : event.id, name : event.name };
        }), testData.eventsData, 'Events OK');
        t.isDeeply(inlineData.resourcesData.map(resource => {
            return { id : resource.id, name : resource.name };
        }), testData.resourcesData, 'Resources OK');
        t.isDeeply(inlineData.assignmentsData.map(assignment => {
            return { id : assignment.id, eventId : assignment.eventId, event : assignment.eventId, resourceId : assignment.resourceId, resource : assignment.resourceId };
        }), testData.assignmentsData, 'Assignments OK');
        t.isDeeply(inlineData.dependenciesData.map(dependency => {
            return { id : dependency.id, from : dependency.from, fromEvent : dependency.from, to : dependency.to, toEvent : dependency.to };
        }), testData.dependenciesData, 'Dependencies OK');

    });

    t.it('Should not fire progress event by default when not delaying calculations', async t => {
        project = new ProjectModel({ delayCalculation : false });

        t.wontFire(project, 'progress', 'Progress is not fired');

        await project.loadInlineData(getProjectData());
    });

    t.it('Should fire progress event by default', async t => {
        project = new ProjectModel();

        t.firesOk(project, {
            progress : '>0'
        });

        await project.loadInlineData(getProjectData());
    });

    t.it('Should fire progress event when enableProgressNotifications enabled', async t => {
        project = new ProjectModel({
            enableProgressNotifications : true
        });

        t.firesAtLeastNTimes(project, 'progress', 1, 'Progress is fired');

        await project.loadInlineData(getProjectData());
    });

    t.it('Should support defining model classes on project subclass', t => {
        class MyEvent extends EventModel {

        }

        class MyResource extends ResourceModel {

        }

        class MyProject extends ProjectModel {
            static get configurable() {
                return {
                    eventStore : {
                        modelClass : MyEvent
                    },
                    resourceStore : {
                        modelClass : MyResource
                    }
                };
            }
        }

        project = new MyProject();

        t.isInstanceOf(new project.eventStore.modelClass(), MyEvent);
        t.isInstanceOf(new project.resourceStore.modelClass(), MyResource);
    });

    t.it('Should not trigger batchedUpdate during calculations', async t => {
        project = new ProjectModel({
            eventsData : [
                { id : 1, name : 'Derp', startDate : '2020-05-20', endDate : '2020-05-21' }
            ]
        });

        t.wontFire(project.eventStore, 'batchedUpdate');

        await project.commitAsync();

        project.eventStore.first.duration = 100;

        await project.commitAsync();
    });

    t.it('Should read timeRangesData in config', async t => {
        const testData = {
            resourcesData : [
                { id : 1, name : 'resource 1' }
            ],
            eventsData : [
                { id : 1, name : 'event 1' }
            ],
            assignmentsData : [
                { id : 1, eventId : 1, resourceId : 1 }
            ],
            dependenciesData : [
                { id : 1, from : 1, to : 5 }
            ],
            timeRangesData : [
                {
                    id   : 1,
                    name : 'Cool line'
                }
            ]
        };

        project = new ProjectModel(testData);

        // Check data
        t.isDeeply(project.eventStore.map(event => {
            return { id : event.id, name : event.name };
        }), testData.eventsData, 'Events OK');
        t.isDeeply(project.resourceStore.data, testData.resourcesData, 'Resources OK');
        t.isDeeply(project.assignmentStore.map(assignment => {
            return { id : assignment.id, eventId : assignment.eventId, event : assignment.eventId, resourceId : assignment.resourceId, resource : assignment.resourceId };
        }), testData.assignmentsData, 'Assignments OK');
        t.isDeeply(project.dependencyStore.map(dependency => {
            return { id : dependency.id, from : dependency.from, fromEvent : dependency.from, to : dependency.to, toEvent : dependency.to };
        }), testData.dependenciesData, 'Dependencies OK');

        t.isDeeply(project.timeRangeStore.map(timeRange => {
            return { id : timeRange.id, name : timeRange.name };
        }), testData.timeRangesData, 'TimeRanges OK');
    });

    // https://github.com/bryntum/support/issues/2668
    t.it('Should warn when load response format is incorrect', async t => {
        initConsoleSpy(t);

        project = new ProjectModel({
            transport : {
                load : {
                    url : 'load'
                }
            },
            validateResponse : true
        });

        t.mockUrl('load', {
            responseText : JSON.stringify({
                assignments : {
                    rows : [{
                        resourceId : 1,
                        eventId    : 1
                    }]
                },
                myTasks : {
                    rows : [{
                        id   : 1,
                        name : 'Task'
                    }]
                },
                resources : {
                    rows : [{
                        id   : 1,
                        name : 'Man'
                    }]
                }
            })
        });

        await project.load();

        t.like(consoleMessages.shift(),
            buildLinesRegExp([
                'Project load response error(s):',
                '- No "events" store section found. It should contain the store data.',
                'Please adjust your response to look like this:',
                '{',
                '    "events": {',
                '        "rows": [',
                '            ...',
                '        ]',
                '    }',
                '}',
                'Note: To disable this validation please set the "validateResponse" config to false'
            ]),
            'Correct warn message shown.'
        );

        t.mockUrl('load', {
            responseText : JSON.stringify({
                assignments : {
                    rows : [{
                        resourceId : 1,
                        eventId    : 1
                    }]
                },
                events : {
                    data : [{
                        id   : 1,
                        name : 'Event'
                    }]
                },
                resources : {
                    rows : [{
                        id   : 1,
                        name : 'Man'
                    }]
                }
            })
        });

        await project.load();

        t.like(consoleMessages.shift(),
            buildLinesRegExp([
                'Project load response error(s):',
                '- "events" store section should have a "rows" property with an array of the store records.',
                'Please adjust your response to look like this:',
                '{',
                '    "events": {',
                '        "rows": [',
                '            ...',
                '        ]',
                '    }',
                '}',
                'Note: To disable this validation please set the "validateResponse" config to false'
            ]),
            'Correct warn message shown.'
        );

        t.mockUrl('load', {
            responseText : JSON.stringify({
                assignments : {
                    rows : [{
                        resourceId : 1,
                        eventId    : 1
                    }]
                },
                events : {
                    rows : [{
                        id   : 1,
                        name : 'Task'
                    }]
                },
                resources : {
                    data : [{
                        id   : 1,
                        name : 'Man'
                    }]
                }
            })
        });

        await project.load();

        t.like(consoleMessages.shift(),
            buildLinesRegExp([
                'Project load response error(s):',
                '- "resources" store section should have a "rows" property with an array of the store records.',
                'Please adjust your response to look like this:',
                '{',
                '    "resources": {',
                '        "rows": [',
                '            ...',
                '        ]',
                '    }',
                '}',
                'Note: To disable this validation please set the "validateResponse" config to false'
            ]),
            'Correct warn message shown.'
        );
    });

    // https://github.com/bryntum/support/issues/2668
    t.it('Should warn when sync response format is incorrect and supportShortSyncResponse is false', async t => {
        t.mockUrl('load', {
            responseText : JSON.stringify({
                success     : true,
                type        : 'load',
                assignments : {
                    rows : [{
                        resourceId : 1,
                        eventId    : 1
                    }]
                },
                events : {
                    rows : [{
                        id   : 1,
                        name : 'Task'
                    }]
                },
                resources : {
                    rows : [{
                        id   : 1,
                        name : 'Man'
                    }]
                }
            })
        });

        initConsoleSpy(t);

        project = new ProjectModel({
            supportShortSyncResponse : false,
            transport                : {
                load : {
                    url : 'load'
                },
                sync : {
                    url : 'sync'
                }
            },
            validateResponse : true
        });

        const { eventStore } = project;

        await project.load();

        t.mockUrl('sync', {
            responseText : JSON.stringify({
                events : [{
                    id   : 1,
                    name : 'Task'
                }]
            })
        });

        eventStore.add({});

        await project.sync();

        t.like(consoleMessages.shift(),
            buildLinesRegExp([
                'Project sync response error(s):',
                '- "events" store "rows" section should mention added record(s) #XXX sent in the request. It should contain the added records identifiers (both phantom and "real" ones assigned by the backend).',
                'Please adjust your response to look like this:',
                '{',
                '    "events": {',
                '        "rows": [',
                '            {',
                '                "$PhantomId": XXX,',
                '                "id": ...',
                '            },',
                '            ...',
                '        ]',
                '    }',
                '}',
                'Note: To disable this validation please set the "validateResponse" config to false'
            ]),
            'Correct warn message shown.'
        );

        project.revertChanges();

        eventStore.first.name = 'bar';

        await project.sync();

        t.like(consoleMessages.shift(),
            buildLinesRegExp([
                'Project sync response error(s):',
                '- "events" store "rows" section should mention updated record(s) #XXX sent in the request. It should contain the updated record identifiers.',
                'Please adjust your response to look like this:',
                '{',
                '    "events": {',
                '        "rows": [',
                '            {',
                '                "id": XXX',
                '            },',
                '            ...',
                '        ]',
                '    }',
                '}',
                'Note: Please consider enabling "supportShortSyncResponse" option to allow less detailed sync responses (https://bryntum.com/products/schedulerpro/docs/api/SchedulerPro/model/ProjectModel#config-supportShortSyncResponse)',
                'Note: To disable this validation please set the "validateResponse" config to false'
            ]),
            'Correct warn message shown.'
        );

        project.revertChanges();

        t.mockUrl('sync', {
            responseText : JSON.stringify({
                success : true,
                type    : 'sync',
                events  : {
                    deleted : [{
                        id   : 1,
                        name : 'Task'
                    }]
                }
            })
        });

        eventStore.remove(eventStore.first);

        await project.sync();

        t.like(consoleMessages.shift(),
            buildLinesRegExp([
                'Project sync response error(s):',
                '- "events" store "removed" section should mention removed record(s) #XXX sent in the request. It should contain the removed record identifiers.',
                'Please adjust your response to look like this:',
                '{',
                '    "events": {',
                '        "removed": [',
                '            {',
                '                "id": XXX',
                '            },',
                '            ...',
                '        ]',
                '    }',
                '}',
                'Note: Please consider enabling "supportShortSyncResponse" option to allow less detailed sync responses (https://bryntum.com/products/schedulerpro/docs/api/SchedulerPro/model/ProjectModel#config-supportShortSyncResponse)',
                'Note: To disable this validation please set the "validateResponse" config to false'
            ]),
            'Correct warn message shown.'
        );
    });

    // https://github.com/bryntum/support/issues/2668
    t.it('Should not warn when response format is incorrect if validateResponse is false', async t => {
        t.mockUrl('load', {
            responseText : JSON.stringify({
                success     : true,
                type        : 'load',
                assignments : {
                    rows : [{
                        resourceId : 1,
                        eventId    : 1
                    }]
                },
                events : {
                    rows : [{
                        id   : 1,
                        name : 'Task'
                    }]
                },
                resources : {
                    rows : [{
                        id   : 1,
                        name : 'Man'
                    }]
                }
            })
        });

        project = new ProjectModel({
            validateResponse : false,
            transport        : {
                load : {
                    url : 'load'
                },
                sync : {
                    url : 'sync'
                }
            },
            autoSync : false
        });

        initConsoleSpy(t);

        await project.load();

        t.mockUrl('sync', {
            responseText : JSON.stringify({
                success : true,
                type    : 'sync',
                events  : [{
                    id   : 1,
                    name : 'Task'
                }]
            })
        });

        project.eventStore.add({});

        await project.sync();

        t.mockUrl('load', {
            responseText : JSON.stringify({
                success     : true,
                type        : 'load',
                assignments : {
                    rows : [{
                        resourceId : 1,
                        eventId    : 1
                    }]
                },
                myTasks : {
                    rows : [{
                        id   : 1,
                        name : 'Task'
                    }]
                },
                resources : {
                    rows : [{
                        id   : 1,
                        name : 'Man'
                    }]
                }
            })
        });

        await project.load();

        t.is(consoleMessages.length, 0, 'No console warn messages');
    });

    // https://github.com/bryntum/support/issues/4100
    t.it('Should find dependency changes in project.changes', async t => {
        project = new ProjectModel({
            resourcesData : [
                { id : 1, name : 'resource 1' }
            ],
            eventsData : [
                { id : 1, name : 'event 1', startDate : new Date(2022, 1, 2), duration : 2 },
                { id : 2, name : 'event 2', startDate : new Date(2022, 1, 4), duration : 2 }
            ],
            assignmentsData : [
                { id : 1, eventId : 1, resourceId : 1 }
            ],
            dependenciesData : [
                { id : 1, fromEvent : 1, toEvent : 2 }
            ]
        });

        await project.commitAsync();

        project.dependencyStore.first.lag  = 5;

        await project.commitAsync();

        t.isDeeply(project.changes.dependencies, {
            updated : [{ lag : 5, id : 1 }]
        });
    });
    // https://github.com/bryntum/support/issues/4043
    t.it('Framework friendly configs and properties should work', async t => {
        const
            eventsData = [
                { id : 1, name : 'Event 1', startDate : new Date(2020, 0, 17), duration : 2, durationUnit : 'd' },
                { id : 2, name : 'Event 2', startDate : new Date(2020, 0, 18), duration : 2, durationUnit : 'd' },
                { id : 3, name : 'Event 3', startDate : new Date(2020, 0, 19), endDate : new Date(2020, 0, 22) }
            ],
            resourcesData = [
                { id : 1, name : 'Resource 1' },
                { id : 2, name : 'Resource 2' }
            ],
            assignmentsData = [
                { id : 1, eventId : 1, resourceId : 1 },
                { id : 2, eventId : 1, resourceId : 2 },
                { id : 3, eventId : 2, resourceId : 2 }
            ],
            resourceTimeRangesData = [
                { id : 1, resourceId : 1, name : 'Resource range 1', startDate : new Date(2020, 0, 17), duration : 2, durationUnit : 'd' }
            ],
            timeRangesData = [
                { id : 1, name : 'Range 1', startDate : new Date(2020, 0, 17), duration : 2, durationUnit : 'd' }
            ],
            dependenciesData = [
                { id : 1, from : 1, to : 2 }
            ],
            calendarsData = [
                { id : 1, startDate : new Date(2020, 0, 17), endDate : new Date(2020, 0, 19), isWorking : true }
            ];

        project = new ProjectModel({
            events             : eventsData,
            assignments        : assignmentsData,
            resources          : resourcesData,
            dependencies       : dependenciesData,
            timeRanges         : timeRangesData,
            resourceTimeRanges : resourceTimeRangesData,
            calendars          : calendarsData
        });

        await project.commitAsync();

        t.is(project.eventStore.count, eventsData.length, 'EventStore populated');
        t.is(project.assignmentStore.count, assignmentsData.length, 'AssignmentStore populated');
        t.is(project.resourceStore.count, resourcesData.length, 'ResourceStore populated');
        t.is(project.dependencyStore.count, dependenciesData.length, 'DependencyStore populated');
        t.is(project.timeRangeStore.count, timeRangesData.length, 'TimeRangeStore populated');
        t.is(project.resourceTimeRangeStore.count, resourceTimeRangesData.length, 'ResourceTimeRangeStore populated');
        t.is(project.calendarManagerStore.count, calendarsData.length, 'CalendarManagerStore populated');

        t.is(project.events, project.eventStore.allRecords, 'events getter');
        t.is(project.assignments, project.assignmentStore.allRecords, 'assignments getter');
        t.is(project.resources, project.resourceStore.allRecords, 'resources getter');
        t.is(project.dependencies, project.dependencyStore.allRecords, 'dependencies getter');
        t.is(project.timeRanges, project.timeRangeStore.allRecords, 'timeRanges getter');
        t.is(project.resourceTimeRanges, project.resourceTimeRangeStore.allRecords, 'resourceTimeRanges getter');
        t.is(project.calendars, project.calendarManagerStore.allRecords, 'calendars getter');

        Object.assign(project, {
            events             : [],
            assignments        : [],
            resources          : [],
            dependencies       : [],
            timeRanges         : [],
            resourceTimeRanges : [],
            calendars          : []
        });

        await project.commitAsync();

        t.is(project.eventStore.count, 0, 'events setter');
        t.is(project.assignmentStore.count, 0, 'assignments setter');
        t.is(project.resourceStore.count, 0, 'resources setter');
        t.is(project.dependencyStore.count, 0, 'dependencies setter');
        t.is(project.timeRangeStore.count, 0, 'timeRanges setter');
        t.is(project.resourceTimeRangeStore.count, 0, 'resourceTimeRanges setter');
        t.is(project.calendarManagerStore.count, 0, 'calendars setter');

        Object.assign(project, {
            events             : eventsData,
            assignments        : assignmentsData,
            resources          : resourcesData,
            dependencies       : dependenciesData,
            timeRanges         : timeRangesData,
            resourceTimeRanges : resourceTimeRangesData,
            calendars          : calendarsData
        });

        await project.commitAsync();

        t.is(project.eventStore.count, eventsData.length, 'EventStore repopulated');
        t.is(project.assignmentStore.count, assignmentsData.length, 'AssignmentStore repopulated');
        t.is(project.resourceStore.count, resourcesData.length, 'ResourceStore repopulated');
        t.is(project.dependencyStore.count, dependenciesData.length, 'DependencyStore repopulated');
        t.is(project.timeRangeStore.count, timeRangesData.length, 'TimeRangeStore repopulated');
        t.is(project.resourceTimeRangeStore.count, resourceTimeRangesData.length, 'ResourceTimeRangeStore repopulated');
        t.is(project.calendarManagerStore.count, calendarsData.length, 'CalendarManagerStore repopulated');
    });

    t.it('Applying a changeset with default format', async t => {
        project = new ProjectModel({
            resourcesData : [
                { id : 1, name : 'resource 1' },
                { id : 2, name : 'resource 2' }
            ],
            eventsData : [
                { id : 1, name : 'event 1' },
                { id : 2, name : 'event 2' }
            ],
            assignmentsData : [
                { id : 1, eventId : 1, resourceId : 1 }
            ]
        });

        const { eventStore, resourceStore } = project;

        resourceStore.add({ name : 'resource 3' });

        await project.commitAsync();

        project.applyChangeset({
            resources : {
                updated : [
                    { id : 1, name : 'changed' },
                    { $PhantomId : resourceStore.last.id, id : 3 }
                ],
                removed : [
                    { id : 2 }
                ]
            },
            events : {
                added : [
                    { id : 3, name : 'event 3' }
                ]
            },
            assignments : {}
        });

        t.notOk(project.changes, 'Project not dirty');

        // Updated resources
        t.is(resourceStore.getById(3).name, 'resource 3', 'Phantom id replaced with proper id');
        t.is(resourceStore.getById(1).name, 'changed', 'Field updated');
        t.notOk(resourceStore.getById(2), 'Resource removed');

        // Updated events
        t.is(eventStore.count, 3, 'Event added');
        t.is(eventStore.last.name, 'event 3', 'With correct field value');
    });

    t.it('Applying a changeset with custom format', async t => {
        project = new ProjectModel({
            resourcesData : [
                { id : 1, name : 'resource 1' },
                { id : 2, name : 'resource 2' }
            ],
            eventsData : [
                { id : 1, name : 'event 1' },
                { id : 2, name : 'event 2' }
            ],
            assignmentsData : [
                { id : 1, eventId : 1, resourceId : 1 }
            ]
        });

        const { eventStore, resourceStore } = project;

        resourceStore.add({ name : 'resource 3' });

        await project.commitAsync();

        project.applyChangeset(
            {
                resources : {
                    altered : [
                        { id : 1, name : 'changed' },
                        { $PhantomId : resourceStore.last.id, id : 3 }
                    ],
                    scrapped : [2]
                },
                events : {
                    appended : [
                        { id : 3, name : 'event 3' }
                    ]
                }
            },
            ({ altered, scrapped, appended }) => ({
                updated : altered,
                removed : scrapped?.map(id => ({ id })),
                added   : appended
            })
        );

        t.notOk(project.changes, 'Project not dirty');

        // Updated resources
        t.is(resourceStore.getById(3).name, 'resource 3', 'Phantom id replaced with proper id');
        t.is(resourceStore.getById(1).name, 'changed', 'Field updated');
        t.notOk(resourceStore.getById(2), 'Resource removed');

        // Updated events
        t.is(eventStore.count, 3, 'Event added');
        t.is(eventStore.last.name, 'event 3', 'With correct field value');
    });

    // https://github.com/bryntum/support/issues/6394
    t.it('Should not have changes after revert', async t => {
        project = new ProjectModel({
            eventsData : [
                { id : 1, name : 'event 1', startDate : '2023-03-01', duration : 1 }
            ]
        });

        await project.commitAsync();

        await project.eventStore.first.setStartDate(new Date(2023, 2, 21));

        t.ok(project.changes, 'Project has changes');

        project.revertChanges();

        await project.commitAsync();

        t.notOk(project.changes, 'Project has no changes');
    });
});
