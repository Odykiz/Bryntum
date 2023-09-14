const schedulerPro = new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    startDate : new Date(2022, 2, 23),
    endDate   : new Date(2022, 2, 28),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    features : {
        percentBar : true
    },

    project : {
        resourcesData : [
            { id : 1, name : 'George', eventColor : 'blue' },
            { id : 2, name : 'Rob', eventColor : 'green' }
        ],

        eventsData : [
            {
                id          : 1,
                name        : 'Project X',
                startDate   : '2022-03-24',
                duration    : 4,
                percentDone : 80
            },
            {
                id          : 2,
                name        : 'Customer Project Y',
                startDate   : '2022-03-23T13:00',
                duration    : 4,
                percentDone : 40
            }
        ],
        assignmentsData : [
            { id : 1, event : 1, resource : 1 },
            { id : 2, event : 2, resource : 2 }
        ]
    }
});
