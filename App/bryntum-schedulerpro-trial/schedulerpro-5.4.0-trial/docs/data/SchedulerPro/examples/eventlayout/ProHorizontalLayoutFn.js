new SchedulerPro({
    appendTo : targetElement,

    project : {
        eventsData : [
            { id : 1, startDate : '2021-08-23', duration : 1, prio : 'low' },
            { id : 2, startDate : '2021-08-25', duration : 1, prio : 'low' },
            { id : 3, startDate : '2021-08-27', duration : 1, prio : 'high' },
            { id : 4, startDate : '2021-08-28', duration : 1, prio : 'high' },
            { id : 5, startDate : '2021-08-23', duration : 3, prio : 'low' },
            { id : 6, startDate : '2021-08-25', duration : 3, prio : 'low' },
            { id : 7, startDate : '2021-08-27', duration : 3, prio : 'high' },
            { id : 8, startDate : '2021-08-28', duration : 3, prio : 'high' }
        ],
        resourcesData : [
            { id : 1, name : 'Mike' }
        ],
        assignmentsData : [
            { id : 1, resource : 1, event : 1 },
            { id : 2, resource : 1, event : 2 },
            { id : 3, resource : 1, event : 3 },
            { id : 4, resource : 1, event : 4 },
            { id : 5, resource : 1, event : 5 },
            { id : 6, resource : 1, event : 6 },
            { id : 7, resource : 1, event : 7 },
            { id : 8, resource : 1, event : 8 }
        ]
    },

    startDate   : new Date(2021, 7, 23),
    endDate     : new Date(2021, 7, 29),
    viewPreset  : 'dayAndWeek',
    height      : 200,
    rowHeight   : 50,
    eventLayout : {
        layoutFn : items => {
            items.forEach(item => {
                item.top = (6 - item.eventRecord.id) * 10;
                item.height = (7 - item.eventRecord.id) * 10;
            });

            return 120;
        }
    },

    columns : [],

    eventRenderer({ eventRecord }) {
        return `Event ${eventRecord.id} ${eventRecord.prio}`;
    }
});
