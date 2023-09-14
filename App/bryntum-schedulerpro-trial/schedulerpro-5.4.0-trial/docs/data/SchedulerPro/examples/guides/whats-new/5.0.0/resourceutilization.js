const project = new ProjectModel({
    eventsData : [
        {
            id                : 1,
            startDate         : '2010-01-18',
            name              : 'Task 1',
            duration          : 8,
            manuallyScheduled : true
        },
        {
            id                : 2,
            startDate         : '2010-01-18',
            name              : 'Task 2',
            duration          : 3,
            manuallyScheduled : true
        },
        {
            id                : 3,
            startDate         : '2010-01-18',
            name              : 'Task 3',
            duration          : 1,
            manuallyScheduled : true
        },
        {
            id                : 4,
            startDate         : '2010-01-18',
            name              : 'Task 4',
            duration          : 2,
            manuallyScheduled : true
        }
    ],
    resourcesData : [
        { id : 'r1', name : 'Mike', city : 'Moscow' },
        { id : 'r2', name : 'John', city : 'Moscow' },
        { id : 'r3', name : 'David', city : 'Barcelona' }
    ],
    assignmentsData : [
        { id : 'a1', resource : 'r1', event : 1, units : 50 },
        { id : 'a2', resource : 'r2', event : 2, units : 60 },
        { id : 'a3', resource : 'r3', event : 3, units : 70 },
        { id : 'a4', resource : 'r3', event : 4, units : 40 }
    ]
});

const resourceUtilization = new ResourceUtilization({
    project,
    startDate  : new Date(2010, 0, 17),
    endDate    : new Date(2010, 0, 29),
    appendTo   : targetElement,
    autoHeight : true,
    minHeight  : '20em',
    // display tooltip
    showBarTip : true
});
