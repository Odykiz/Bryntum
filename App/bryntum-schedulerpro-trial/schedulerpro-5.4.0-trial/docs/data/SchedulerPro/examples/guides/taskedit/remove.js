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
                    items : {
                        // Remove "Duration" and "% Complete" fields in the "General" tab
                        durationField    : false,
                        percentDoneField : false
                    }
                },
                // Remove all tabs except the "General" tab
                notesTab        : false,
                predecessorsTab : false,
                successorsTab   : false,
                advancedTab     : false
            }
        }
    }
});
