const scheduler = new Scheduler({
    appendTo : targetElement,

    autoHeight            : true,
    showEventColorPickers : true,

    startDate : new Date(2023, 5, 6),
    endDate   : new Date(2023, 5, 13),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    resources : [
        { id : 1, name : 'Batman' },
        { id : 2, name : 'Robin' }
    ],

    events : [
        { id : 1, resourceId : 1, name : 'Double click me', startDate : '2023-06-08', endDate : '2023-06-11', eventColor : 'violet' },
        { id : 2, resourceId : 2, name : 'Or me', startDate : '2023-06-13', endDate : '2023-06-18' }
    ]
});
