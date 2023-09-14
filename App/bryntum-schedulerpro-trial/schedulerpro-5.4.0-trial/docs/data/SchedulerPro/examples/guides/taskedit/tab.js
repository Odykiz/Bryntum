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
                        // Add new field to the last position
                        newGeneralField : {
                            type   : 'textfield',
                            weight : 610,
                            label  : 'New field in General Tab',
                            // Name of the field matches data field name, so value is loaded/saved automatically
                            name   : 'custom'
                        }
                    }
                },
                // Add a custom tab to the first position
                newTab : {
                    // Tab is a FormTab by default
                    title  : 'New tab',
                    weight : 90,
                    items  : {
                        newTabField : {
                            type   : 'textfield',
                            weight : 10,
                            label  : 'New field in New Tab',
                            // Name of the field matches data field name, so value is loaded/saved automatically.
                            // In this case it is equal to the Task "name" field.
                            name   : 'name'
                        }
                    }
                }
            }
        }
    }
});
