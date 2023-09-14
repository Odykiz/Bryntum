const scheduler = new Scheduler({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    startDate : new Date(2023, 2, 6),
    endDate   : new Date(2023, 2, 13),

    viewPreset : 'dayAndWeek',

    resourceImagePath : 'data/Scheduler/images/users/',

    columns : [
        { type : 'resourceInfo', field : 'name', text : 'Name', width : 165 },
        { type : 'eventcolor', text : 'Color', width : 100 }
    ],

    resources : [
        { id : 1, name : 'Arnold Smith', image : 'arnold.jpg' },
        { id : 2, name : 'Gloria Rogers', image : 'gloria.jpg' },
        { id : 3, name : 'Jane Miller', eventColor : 'indigo', image : false }
    ],

    events : [
        { id : 1, resourceId : 1, name : 'Interview', startDate : '2023-03-06', endDate : '2023-03-07' },
        { id : 2, resourceId : 1, name : 'Press meeting', startDate : '2023-03-08', endDate : '2023-03-09' },
        { id : 3, resourceId : 2, name : 'Audition', startDate : '2023-03-07', endDate : '2023-03-09' },
        { id : 4, resourceId : 2, name : 'Script deadline', startDate : '2023-03-11', endDate : '2023-03-11' },
        { id : 5, resourceId : 3, name : 'Rehearsal', startDate : '2023-03-09', endDate : '2023-03-11' }
    ]
});
