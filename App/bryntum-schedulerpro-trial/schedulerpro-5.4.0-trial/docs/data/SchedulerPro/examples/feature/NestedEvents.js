const schedulerPro = new SchedulerPro({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    features : {
        nestedEvents : true
    },

    rowHeight : 160,
    startDate : new Date(2022, 2, 20),
    endDate   : new Date(2022, 2, 27),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    project : {
        resourcesData : [
            { id : 1, name : 'Bruce' },
            { id : 2, name : 'Diana' }
        ],

        eventsData : [
            {
                id        : 1,
                name      : 'Art project',
                startDate : '2022-03-21',
                duration  : 5,
                children  : [
                    { id : 11, name : 'Get supplies', startDate : '2022-03-21', duration : 2 },
                    { id : 12, name : 'Sketch', startDate : '2022-03-22', duration : 1, eventColor : 'indigo'  },
                    { id : 13, name : 'Outline', startDate : '2022-03-22', duration : 2, eventColor : 'blue'  },
                    { id : 14, name : 'Ink', startDate : '2022-03-23', duration : 2, eventColor : 'violet'  },
                    { id : 15, name : 'Share', startDate : '2022-03-24', duration : 2, eventColor : 'pink'  }
                ]
            },
            {
                id        : 2,
                name      : 'DIY project',
                startDate : '2022-03-24',
                duration  : 5,
                children  : [
                    { id : 21, name : 'Plan', startDate : '2022-03-21', duration : 1, eventColor : 'indigo' },
                    { id : 22, name : 'Get supplies', startDate : '2022-03-22', duration : 2  },
                    { id : 23, name : 'Prototype', startDate : '2022-03-22', duration : 3, eventColor : 'violet'  },
                    { id : 24, name : 'Make', startDate : '2022-03-24', duration : 1, eventColor : 'blue'  }
                ]
            }
        ],

        assignmentsData : [
            { id : 1, event : 1, resource : 1 },
            { id : 2, event : 11, resource : 1 },
            { id : 3, event : 12, resource : 1 },
            { id : 4, event : 13, resource : 1 },
            { id : 5, event : 14, resource : 1 },
            { id : 6, event : 15, resource : 1 },
            { id : 7, event : 2, resource : 2 },
            { id : 8, event : 21, resource : 2 },
            { id : 9, event : 22, resource : 2 },
            { id : 10, event : 23, resource : 2 },
            { id : 11, event : 24, resource : 2 }
        ]
    },

    tbar : [
        {
            type        : 'buttongroup',
            toggleGroup : true,
            items       : {
                none  : { text : 'Overlap' },
                stack : { text : 'Stack' },
                pack  : { text : 'Pack', pressed : true }
            },
            onToggle({ source, pressed }) {
                if (pressed) {
                    schedulerPro.features.nestedEvents.eventLayout = source.ref;
                }
            }
        }
    ]
});
