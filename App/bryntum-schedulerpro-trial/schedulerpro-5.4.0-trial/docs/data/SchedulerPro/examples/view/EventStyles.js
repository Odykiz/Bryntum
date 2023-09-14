targetElement.innerHTML = '<p>Here is a Scheduler showing a few of the built-in configurable eventStyles</p>';

new SchedulerPro({
    project : {
        resourcesData : [
            { id : 1, name : 'Machine #1', iconCls : 'b-fa b-fa-cogs', image : false },
            { id : 2, name : 'Robot TD4', iconCls : 'b-fa b-fa-robot', image : false }
        ],

        eventsData : [
            // the date format used is configurable, defaults to the simplified ISO format (e.g. 2017-10-05T14:48:00.000Z)
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
            { id : 1, startDate : '2020-06-01', duration : 2, durationUnit : 'd', name : 'Hollow', eventStyle : 'hollow' },
            { id : 2, duration : 1, durationUnit : 'd', name : 'Dashed', eventStyle : 'dashed' },
            { id : 3, duration : 1, durationUnit : 'd', name : 'Rounded', eventStyle : 'rounded' },
            { id : 4, duration : 2, durationUnit : 'd', name : 'Plain', eventStyle : 'plain', eventColor : 'blue'  },
            { id : 5, duration : 0, name : 'Milestone', eventStyle : 'plain', eventColor : 'red'  }
        ],

        assignmentsData : [
            { event : 1, resource : 1 },
            { event : 2, resource : 2 },
            { event : 3, resource : 1 },
            { event : 4, resource : 2 },
            { event : 5, resource : 1 }
        ],

        dependenciesData : [
            { fromEvent : 1, toEvent : 2 },
            { fromEvent : 2, toEvent : 3 },
            { fromEvent : 3, toEvent : 4 },
            { fromEvent : 4, toEvent : 5 }
        ]
    },

    autoHeight : true,
    rowHeight  : 50,
    appendTo   : targetElement,

    columns : [
        { type : 'resourceInfo', text : 'Name', field : 'name', width : 160 }
    ],

    startDate : new Date(2020, 5, 1),
    endDate   : new Date(2020, 5, 14)
});
