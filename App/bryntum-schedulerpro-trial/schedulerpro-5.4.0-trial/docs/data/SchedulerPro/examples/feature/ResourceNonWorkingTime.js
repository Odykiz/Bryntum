CSSHelper.insertRule('.weekend { background: transparent repeating-linear-gradient(-55deg, #dddddd99, #dddddd99 10px, #eeeeee99 5px, #eeeeee99 20px); }');

const schedulerPro = new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    startDate : new Date(2022, 7, 2),
    endDate   : new Date(2022, 7, 14),

    columns : [
        { field : 'name', text : 'Name' },
        { field : 'calendar', text : 'Working on', editor : false }
    ],

    features : {
        nonWorkingTime         : true,
        resourceNonWorkingTime : {
            maxTimeAxisUnit : 'week'
        }
    },

    project : {
        resourcesData : [
            { id : 1, name : 'Bernard', calendar : 'weekends' },
            { id : 2, name : 'Bianca', calendar : 'weekdays' }
        ],

        calendarsData : [
            {
                id                       : 'weekends',
                name                     : 'Weekends',
                unspecifiedTimeIsWorking : true,
                intervals                : [
                    {
                        recurrentStartDate : 'on Mon at 0:00',
                        recurrentEndDate   : 'on Sat at 0:00',
                        isWorking          : false,
                        cls                : 'nonworking'
                    }
                ]
            },
            {
                id                       : 'weekdays',
                name                     : 'Weekdays',
                unspecifiedTimeIsWorking : true,
                intervals                : [
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false,
                        cls                : 'weekend'
                    }
                ]
            }
        ]
    }
});
