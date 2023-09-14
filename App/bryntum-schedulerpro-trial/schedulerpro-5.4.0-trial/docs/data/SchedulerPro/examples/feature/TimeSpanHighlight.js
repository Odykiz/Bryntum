const schedulerPro = new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,
    snap       : true,
    startDate  : new Date(2022, 4, 15, 10),
    endDate    : new Date(2022, 4, 15, 17),
    viewPreset : 'hourAndDay',
    forceFit   : true,
    columns    : [
        { field : 'name', text : 'Hairdressers', width : 100 },
        {
            type    : 'widget',
            width   : 120,
            text    : 'Availability',
            align   : 'center',
            widgets : [{
                type    : 'button',
                text    : 'Show',
                onClick : ({ source }) => {
                    let availability;

                    const resourceRecord = source.cellInfo.record;

                    switch (resourceRecord.name) {
                        case 'Benjamin':
                            availability = [
                                {
                                    resourceRecord,
                                    name      : 'Available ($40/h)',
                                    startDate : new Date(2022, 4, 15, 10),
                                    endDate   : new Date(2022, 4, 15, 13)
                                }
                            ];
                            break;

                        case 'Bianca':
                            availability = [
                                {
                                    resourceRecord,
                                    name      : 'Available ($60/h)',
                                    startDate : new Date(2022, 4, 15, 11),
                                    endDate   : new Date(2022, 4, 15, 13)
                                },
                                {
                                    resourceRecord,
                                    name      : 'Available ($50/h)',
                                    startDate : new Date(2022, 4, 15, 14),
                                    endDate   : new Date(2022, 4, 15, 16)
                                }
                            ];
                            break;

                        case 'Sebastian':
                            availability = [
                                {
                                    resourceRecord,
                                    name      : 'Available ($110/h)',
                                    startDate : new Date(2022, 4, 15, 10),
                                    endDate   : new Date(2022, 4, 15, 12)
                                },
                                {
                                    resourceRecord,
                                    name      : 'Available ($150/h)',
                                    startDate : new Date(2022, 4, 15, 14),
                                    endDate   : new Date(2022, 4, 15, 16)
                                }
                            ];
                            break;

                        case 'Emilio':
                            availability = [
                                {
                                    resourceRecord,
                                    name      : 'Available (80/h)',
                                    startDate : new Date(2022, 4, 15, 10),
                                    endDate   : new Date(2022, 4, 15, 14)
                                }
                            ];
                            break;
                    }

                    schedulerPro.highlightTimeSpans(availability);
                }
            }]
        }
    ],

    features : {
        scheduleTooltip   : false,
        timeSpanHighlight : true
    },

    tbar : [
        {
            text : 'Clear highlight',
            onAction() {
                schedulerPro.unhighlightTimeSpans();
            }
        }
    ],

    project : {
        resourcesData : [
            { id : 1, name : 'Benjamin' },
            { id : 2, name : 'Bianca' },
            { id : 3, name : 'Sebastian' },
            { id : 4, name : 'Emilio' }
        ],

        eventsData : [
            {
                id           : 1,
                name         : 'Crew cut',
                startDate    : '2022-05-15T14:00:00',
                duration     : 1.5,
                durationUnit : 'h',
                iconCls      : 'b-icon b-fa-cut'
            },
            {
                id           : 2,
                name         : 'Dye hair',
                startDate    : '2022-05-15T12:00:00',
                duration     : 2,
                durationUnit : 'h',
                iconCls      : 'b-icon b-fa-female'
            }
        ],

        assignmentsData : [
            {
                id       : 1,
                event    : 1,
                resource : 1
            },
            {
                id       : 2,
                event    : 2,
                resource : 3
            }
        ]
    }
});

schedulerPro.highlightTimeSpan({
    startDate : new Date(2022, 4, 15, 11),
    endDate   : new Date(2022, 4, 15, 16),
    surround  : true,
    name      : 'Away'
});
