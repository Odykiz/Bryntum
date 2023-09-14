const scheduler = new Scheduler({
    appendTo : targetElement,

    autoHeight : true,

    startDate : new Date(2022, 0, 1),
    endDate   : new Date(2072, 0, 1),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    resources : [
        { id : 1, name : 'Meeting room #1' },
        { id : 2, name : 'Meeting room #2' }
    ],

    project : {
        // Allow calendars to encompass ~ 100 years
        maxCalendarRange : 100 * 53 * 7 * 24 * 60 * 60 * 1000
    },

    features : {
        nonWorkingTime : true
    },

    tbar : [
        {
            ref  : 'count',
            type : 'widget'
        }
    ]
});

function updateCount() {
    scheduler.widgetMap.count.html = `${document.querySelectorAll('.b-sch-foreground-canvas .b-sch-nonworkingtime').length} non-working time elements in DOM`;
}

scheduler.on({
    horizontalScroll() {
        updateCount();
    }
});

updateCount();
