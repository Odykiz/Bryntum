const schedulerPro = new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,
    snap       : true,
    startDate  : new Date(2022, 4, 15),
    endDate    : new Date(2022, 4, 29),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    features : {
        scheduleTooltip   : false,
        calendarHighlight : true
    },

    project : {
        resourcesData : [
            { id : 1, name : 'Bernard' },
            { id : 2, name : 'Bianca' }
        ],

        eventsData : [
            { id : 1, name : 'Drag me', startDate : '2022-05-18', duration : 2, resizable : false, calendar : 'inspection' }
        ],

        assignmentsData : [
            {
                id       : 1,
                event    : 1,
                resource : 1
            }
        ],
        calendarsData : [
            {
                id                       : 'inspection',
                name                     : 'Inspection period March 23-28',
                unspecifiedTimeIsWorking : false,
                intervals                : [
                    {
                        name      : 'Inspection period',
                        startDate : '2022-05-16',
                        endDate   : '2022-05-24',
                        isWorking : true
                    }
                ]
            }
        ]
    }
});
