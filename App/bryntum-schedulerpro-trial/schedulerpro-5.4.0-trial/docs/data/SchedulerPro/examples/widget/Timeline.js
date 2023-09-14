const project = new ProjectModel({
    startDate : new Date(2020, 0, 1),

    eventsData : [
        {
            id       : 1,
            name     : 'Project X',
            expanded : true,
            children : [
                { id : 2, name : 'Important task', startDate : '2020-04-02', manuallyScheduled : true, duration : 20, showInTimeline : true },
                { id : 3, name : 'Critical milestone', startDate : '2020-04-09', manuallyScheduled : true, duration : 0, showInTimeline : true },
                { id : 4, name : 'Deploy', startDate : '2020-04-22', duration : 15, manuallyScheduled : true, showInTimeline : true },
                { id : 5, name : 'Customer meeting', startDate : '2020-04-22', duration : 22, manuallyScheduled : true, showInTimeline : true }
            ]
        }
    ]
});

const timeline = new Timeline({
    appendTo : targetElement,
    project
});
