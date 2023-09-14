const schedulerPro = new SchedulerPro({
    appendTo : targetElement,
    flex     : '1 0 100%',
    // Project contains all the data and is responsible for correct scheduling
    project  : {
        calendarsData : [
            {
                id        : 'general',
                name      : '24 hour calendar',
                intervals : [
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    }
                ],
                expanded : true,
                children : [
                    {
                        id        : 'business',
                        name      : 'Business hours  (8am - 5pm)',
                        intervals : [
                            {
                                recurrentStartDate : 'every weekday at 12:00',
                                recurrentEndDate   : 'every weekday at 13:00',
                                isWorking          : false
                            },
                            {
                                recurrentStartDate : 'every weekday at 17:00',
                                recurrentEndDate   : 'every weekday at 08:00',
                                isWorking          : false
                            }
                        ]
                    },
                    {
                        id        : 'nightshift',
                        name      : 'Night shift (10pm - 6am)',
                        intervals : [
                            {
                                recurrentStartDate : 'every weekday at 6:00',
                                recurrentEndDate   : 'every weekday at 22:00',
                                isWorking          : false
                            }
                        ]
                    }
                ]
            }
        ],

        eventsData : [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    { id : 2, name : 'Read docs', startDate : '2020-11-03T14:00:00', duration : 3, durationUnit : 'h' },
                    { id : 3, name : 'Release docs', startDate : '2020-11-03T02:00:00', duration : 4, durationUnit : 'h' }
                ]
            }
        ],

        resourcesData : [
            { id : 1, name : 'Albert', calendar : 'general' },
            { id : 2, name : 'Bill', calendar : 'nightshift'  }
        ],

        assignmentsData : [
            { event : 2, resource : 1 },
            { event : 3, resource : 2 }
        ]
    },
    startDate  : new Date(2020, 10, 3),
    endDate    : new Date(2020, 10, 5),
    viewPreset : 'hourAndDay',
    tickSize   : 50,
    autoHeight : true,
    columns    : [
        { field : 'name', text : 'Name' },
        { type : 'resourceCalendar', width : 200 }
    ]
});
