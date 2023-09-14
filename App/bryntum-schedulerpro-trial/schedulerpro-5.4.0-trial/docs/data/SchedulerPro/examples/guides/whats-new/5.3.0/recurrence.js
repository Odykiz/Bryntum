new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    startDate : new Date(2022, 9, 2),
    endDate   : new Date(2022, 9, 16),

    // Turn recurring events on
    enableRecurringEvents : true,

    project : {
        resourcesData : [
            { id : 1, name : 'Resource 1' }
        ],

        eventsData : [
            { id : 1, resourceId : 1, name : 'Daily', startDate : '2022-10-03', duration : 1, recurrenceRule : 'FREQ=DAILY', eventColor : 'blue' },
            { id : 2, resourceId : 1, name : 'Weekly', startDate : '2022-10-05', duration : 2, recurrenceRule : 'FREQ=WEEKLY', eventColor : 'purple' }
        ]
    }
});
