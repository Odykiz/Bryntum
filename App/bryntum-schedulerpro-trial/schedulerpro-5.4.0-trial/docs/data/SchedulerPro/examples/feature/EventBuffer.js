targetElement.innerHTML = '<p>Open editor to change setup / cleanup:</p>';
const schedulerPro = new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    startDate  : new Date(2022, 4, 6, 9),
    endDate    : new Date(2022, 4, 6, 17),
    viewPreset : 'hourAndDay',
    barMargin  : 12,

    columns : [
        { type : 'resourceInfo', field : 'name', text : 'Meeting Rooms', showEventCount : false, showMeta : record => `Capacity: ${record.capacity}`, width : 150 }
    ],

    features : {
        eventBuffer : true
    },

    project : {
        resourcesData : [
            { id : 1, name : 'Saturn', capacity : 100, image : false, iconCls : 'b-icon b-fa-users' },
            { id : 2, name : 'Venus', capacity : 35, image : false, iconCls : 'b-icon b-fa-users' },
            { id : 3, name : 'Neptune', capacity : 115, image : false, iconCls : 'b-icon b-fa-users' }
        ],

        eventsData : [
            { id : 1, resourceId : 1, name : 'UN Meeting', startDate : '2022-05-06T10:00:00', duration : 3, durationUnit : 'h', preamble : '1 hour', postamble : '30 minute' },
            { id : 2, resourceId : 2, name : 'Board meeting', startDate : '2022-05-06T11:00:00', duration : 2, durationUnit : 'h', preamble : '20 minute', postamble : '25 minute', resizable : false, eventColor : 'red' },
            { id : 3, resourceId : 3, name : 'Starbucks meeting', startDate : '2022-05-06T13:00:00', duration : 3, durationUnit : 'h', preamble : '25 minute', postamble : '15 minute', resizable : false, eventColor : 'red' }
        ],

        calendarsData : [
            {
                id        : 'general',
                name      : 'General',
                intervals : [
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    }
                ]
            }
        ],

        calendar : 'general'
    }
});
