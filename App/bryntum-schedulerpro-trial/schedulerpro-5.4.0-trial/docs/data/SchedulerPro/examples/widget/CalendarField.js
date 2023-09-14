const project = new ProjectModel({
    startDate : new Date(2020, 0, 1),

    eventsData : [
        {
            id       : 1,
            name     : 'Write docs',
            expanded : true,
            children : [
                { id : 2, name : 'Proof-read docs', startDate : '2020-01-02', endDate : '2020-01-05', effort : 0 },
                { id : 3, name : 'Release docs', startDate : '2020-01-09', endDate : '2020-01-10', effort : 0 }
            ]
        }
    ],

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

    dependenciesData : [
        { fromEvent : 2, toEvent : 3 }
    ]
});

const calendarField = new CalendarField({
    appendTo : targetElement,
    width    : 250,
    store    : project.calendarManagerStore
});
