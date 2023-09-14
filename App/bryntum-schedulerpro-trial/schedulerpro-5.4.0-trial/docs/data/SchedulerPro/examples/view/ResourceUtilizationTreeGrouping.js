targetElement.innerHTML = '<p>ResourceUtilization view grouping its assignment records by resource city and resource</p>';

const resourceUtilization = new ResourceUtilization({
    project : {
        resourcesData : [
            { id : 1, name : 'Mike', city : 'Stockholm' },
            { id : 2, name : 'Dan', city : 'Stockholm' },
            { id : 3, name : 'Robert', city : 'Tokyo' }
        ],

        eventsData : [
            { id : 1, startDate : '2023-03-20', duration : 5, durationUnit : 'd', name : 'Event 1' },
            { id : 2, startDate : '2023-03-24', duration : 5, durationUnit : 'd', name : 'Event 2' }
        ],

        assignmentsData : [
            { event : 1, resource : 1 },
            { event : 2, resource : 2 },
            { event : 1, resource : 3 },
            { event : 2, resource : 1 }
        ]
    },

    features : {
        treeGroup : {
            levels : [
                // by city
                ({ origin }) => origin.isResourceModel ? origin.city : origin.resource.city,
                // by resource ..if that's an unassigned resource just stop grouping
                ({ origin }) => origin.isResourceModel ? Store.StopBranch : origin.resource
            ]
        }
    },

    columns : [
        {
            type  : 'tree',
            field : 'name',
            width : 150,
            renderer({ value }) {
                // if value has resource model (it's a group row) display the resource name
                if (value.isResourceModel) {
                    return value.name;
                }
                return value;
            }
        }
    ],
    startDate  : new Date(2023, 2, 20),
    endDate    : new Date(2023, 2, 30),
    appendTo   : targetElement,
    rowHeight  : 40,
    tickSize   : 40,
    minHeight  : '20em',
    // display tooltip
    showBarTip : true
});
