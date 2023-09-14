new SchedulerPro({
    appendTo   : targetElement,
    autoHeight : true,
    rowHeight  : 50,

    columns : [
        {
            text  : 'Name',
            field : 'name',
            width : 160
        }
    ],

    resources : [
        { id : 1, name : 'Mr Boss' }
    ],

    events : [
        {
            name        : 'Important conference',
            resourceId  : 1,
            startDate   : '2020-08-31',
            duration    : 3,
            percentDone : 60
        }
    ],

    startDate : new Date(2020, 7, 30),
    endDate   : new Date(2020, 8, 5),

    features : {
        taskEdit : {
            items : {
                generalTab : {
                    // Rename "General" tab
                    title : 'Main',
                    items : {
                        // Rename "% Complete" field to "Status"
                        percentDoneField : {
                            label : 'Status'
                        }
                    }
                }
            }
        }
    }
});
