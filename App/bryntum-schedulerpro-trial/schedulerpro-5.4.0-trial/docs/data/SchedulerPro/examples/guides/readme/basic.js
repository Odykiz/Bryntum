new SchedulerPro({
    project : new ProjectModel({
        resourcesData : [
            { id : 1, name : 'Dan Stevenson' },
            { id : 2, name : 'Talisha Babin' }
        ],

        eventsData : [
            // the date format used is configurable, defaults to the simplified ISO format (e.g. 2017-10-05T14:48:00.000Z)
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
            { id : 1, startDate : '2017-01-01', duration : 3, durationUnit : 'd', name : 'Event 1' },
            { id : 2, duration : 4, durationUnit : 'd', name : 'Event 2' }
        ],

        assignmentsData : [
            { event : 1, resource : 1 },
            { event : 2, resource : 2 }
        ],

        dependenciesData : [
            { fromEvent : 1, toEvent : 2 }
        ]
    }),

    autoHeight : true,
    rowHeight  : 50,
    appendTo   : targetElement,

    columns : [
        { text : 'Name', field : 'name', width : 160 }
    ],

    startDate : new Date(2017, 0, 1),
    endDate   : new Date(2017, 0, 10)
});
