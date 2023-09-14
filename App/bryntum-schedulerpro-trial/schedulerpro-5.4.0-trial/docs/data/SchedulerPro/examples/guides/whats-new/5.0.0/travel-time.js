new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    startDate : new Date(2018, 4, 6),
    endDate   : new Date(2018, 4, 13),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    features : {
        eventBuffer : true
    },

    project : {
        resourcesData : [
            { id : 1, name : 'Bernard' },
            { id : 2, name : 'Bianca' }
        ],

        eventsData : [
            { id : 1, resourceId : 1, name : 'Resize me', startDate : '2018-05-07', endDate : '2018-05-09', postamble : '1 day' },
            { id : 2, resourceId : 1, name : 'Not me', startDate : '2018-05-10', endDate : '2018-05-12', preamble : '12 hours', resizable : false, eventColor : 'red' }
        ],

        calendar : 'general'
    }
});
