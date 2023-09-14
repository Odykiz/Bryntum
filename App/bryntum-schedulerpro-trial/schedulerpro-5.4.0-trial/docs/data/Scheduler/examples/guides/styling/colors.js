const scheduler = new Scheduler({
    appendTo           : targetElement,
    autoHeight         : true,
    rowHeight          : 50,
    autoAdjustTimeAxis : false,

    columns : [
        {
            text  : 'Name',
            field : 'name',
            width : 160
        }
    ],

    resources : [
        { id : 1, name : 'eventColor' }
    ],

    events : [
        { resourceId : 1, startDate : '2023-05-03', duration : 2, durationUnit : 'day', name : 'red', eventColor : 'red' },
        { resourceId : 1, startDate : '2023-05-04', duration : 2, durationUnit : 'day', name : 'pink', eventColor : 'pink' },
        { resourceId : 1, startDate : '2023-05-05', duration : 2, durationUnit : 'day', name : 'purple', eventColor : 'purple' },
        { resourceId : 1, startDate : '2023-05-06', duration : 2, durationUnit : 'day', name : 'magenta', eventColor : 'magenta' },
        { resourceId : 1, startDate : '2023-05-07', duration : 2, durationUnit : 'day', name : 'violet', eventColor : 'violet' },
        { resourceId : 1, startDate : '2023-05-08', duration : 2, durationUnit : 'day', name : 'indigo', eventColor : 'indigo' },
        { resourceId : 1, startDate : '2023-05-09', duration : 2, durationUnit : 'day', name : 'blue', eventColor : 'blue' },
        { resourceId : 1, startDate : '2023-05-10', duration : 2, durationUnit : 'day', name : 'cyan', eventColor : 'cyan' },
        { resourceId : 1, startDate : '2023-05-11', duration : 2, durationUnit : 'day', name : 'teal', eventColor : 'teal' },
        { resourceId : 1, startDate : '2023-05-12', duration : 2, durationUnit : 'day', name : 'green', eventColor : 'green' },
        { resourceId : 1, startDate : '2023-05-13', duration : 2, durationUnit : 'day', name : 'gantt-green', eventColor : 'gantt-green' },
        { resourceId : 1, startDate : '2023-05-14', duration : 2, durationUnit : 'day', name : 'lime', eventColor : 'lime' },
        { resourceId : 1, startDate : '2023-05-15', duration : 2, durationUnit : 'day', name : 'yellow', eventColor : 'yellow' },
        { resourceId : 1, startDate : '2023-05-16', duration : 2, durationUnit : 'day', name : 'orange', eventColor : 'orange' },
        { resourceId : 1, startDate : '2023-05-17', duration : 2, durationUnit : 'day', name : 'deep-orange', eventColor : 'deep-orange' },
        { resourceId : 1, startDate : '2023-05-18', duration : 2, durationUnit : 'day', name : 'gray', eventColor : 'gray' },
        { resourceId : 1, startDate : '2023-05-19', duration : 2, durationUnit : 'day', name : 'light-gray', eventColor : 'light-gray' }
    ],

    startDate : new Date(2023, 4, 3),
    endDate   : new Date(2023, 4, 21)
});
