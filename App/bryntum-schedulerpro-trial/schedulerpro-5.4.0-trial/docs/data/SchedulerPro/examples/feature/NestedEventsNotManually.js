const schedulerPro = new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    features : {
        nestedEvents : true
    },

    rowHeight : 80,
    startDate : new Date(2022, 2, 20),
    endDate   : new Date(2022, 2, 27),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    project : {
        resourcesData : [
            { id : 1, name : 'Dude' }
        ],

        eventsData : [
            {
                id        : 1,
                name      : 'Automatically scheduled',
                startDate : '2022-03-21',
                children  : [
                    { id : 11, name : 'Start here', startDate : '2022-03-21', duration : 2 },
                    { id : 12, name : 'End here', startDate : '2022-03-24', duration : 2, eventColor : 'orange'  }
                ]
            }
        ],

        assignmentsData : [
            { id : 1, event : 1, resource : 1 },
            { id : 2, event : 11, resource : 1 },
            { id : 3, event : 12, resource : 1 }
        ]
    }
});
