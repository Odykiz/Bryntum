new Scheduler({
    appendTo : targetElement,

    autoHeight : true,

    resources : [
        { id : 1, name : 'Bernard' },
        { id : 2, name : 'Bianca' }
    ],

    events : [
        { id : 1, resourceId : 1, name : 'Interview', location : 'Office', startDate : '2018-05-07', endDate : '2018-05-10' },
        { id : 2, resourceId : 2, name : 'Meeting', location : 'Client`s office', startDate : '2018-05-10', endDate : '2018-05-12' }
    ],

    tbar : [
        { type : 'viewpresetcombo' }
    ],

    startDate : new Date(2018, 4, 6),
    endDate   : new Date(2018, 4, 13),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ]
});
