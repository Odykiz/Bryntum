const scheduler = new Scheduler({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    features : {
        eventNonWorkingTime : true
    },

    startDate : new Date(2018, 4, 6),
    endDate   : new Date(2018, 4, 13),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    resources : [
        { id : 1, name : 'Bernard' },
        { id : 2, name : 'Bianca' }
    ],

    events : [
        { id : 1, resourceId : 1, name : 'Sunday', startDate : '2018-05-06', endDate : '2018-05-08' },
        { id : 2, resourceId : 2, name : 'Saturday', startDate : '2018-05-11', endDate : '2018-05-13' }
    ]
});
