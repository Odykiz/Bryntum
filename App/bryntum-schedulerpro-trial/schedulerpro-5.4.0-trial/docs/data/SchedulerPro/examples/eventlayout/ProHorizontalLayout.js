const scheduler = new SchedulerPro({
    appendTo : targetElement,

    project : {
        eventsData : [
            { id : 1, startDate : '2021-08-23', duration : 2, prio : 'low' },
            { id : 2, startDate : '2021-08-25', duration : 2, prio : 'high' },
            { id : 3, startDate : '2021-08-27', duration : 2, prio : 'high' }
        ],
        resourcesData : [
            { id : 1, name : 'Mike' }
        ],
        assignmentsData : [
            { id : 1, resource : 1, event : 1 },
            { id : 2, resource : 1, event : 2 },
            { id : 3, resource : 1, event : 3 }
        ]
    },

    startDate   : new Date(2021, 7, 22),
    endDate     : new Date(2021, 7, 29),
    autoHeight  : true,
    rowHeight   : 50,
    eventLayout : {
        type    : 'stack',
        groupBy : 'prio'
    },

    columns : [
        { type : 'resourceInfo', text : 'Worker', field : 'name', width : 160 }
    ],
    resourceImagePath : 'data/Scheduler/images/users/',

    eventRenderer({ eventRecord }) {
        return eventRecord.prio;
    },

    tbar : [
        {
            type        : 'buttonGroup',
            toggleGroup : true,
            defaults    : {
                width : '12em'
            },
            items : [
                {
                    id      : 'prio',
                    type    : 'button',
                    ref     : 'stackButton',
                    text    : 'Priority',
                    pressed : true
                },
                {
                    id   : 'priorev',
                    type : 'button',
                    ref  : 'packButton',
                    text : 'Priority (reversed)'
                },
                {
                    id   : 'none',
                    type : 'button',
                    ref  : 'noneButton',
                    text : 'none'
                }
            ],
            onAction({ source : button }) {
                switch (button.id) {
                    case 'prio':
                        scheduler.eventLayout = {
                            type    : 'stack',
                            groupBy : 'prio'
                        };
                        break;
                    case 'priorev':
                        scheduler.eventLayout = {
                            type    : 'stack',
                            weights : {
                                low  : 100,
                                high : 200
                            },
                            groupBy : 'prio'
                        };
                        break;
                    case 'none':
                    default:
                        scheduler.eventLayout = 'stack';
                        break;
                }
            }
        }
    ]
});
