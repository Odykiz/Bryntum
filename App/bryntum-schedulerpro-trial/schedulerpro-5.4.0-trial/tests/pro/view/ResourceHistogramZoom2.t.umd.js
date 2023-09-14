
StartTest(async t => {

    let histogram;

    const project = new ProjectModel({
        calendar      : 'general',
        calendarsData : [
            {
                id        : 'general',
                name      : 'General',
                intervals : [
                    {
                        recurrentStartDate : 'on Sat at 0:00',
                        recurrentEndDate   : 'on Mon at 0:00',
                        isWorking          : false
                    }
                ]
            }
        ],
        eventsData : [
            {
                id                : 1,
                startDate         : '2010-01-18',
                duration          : 8,
                manuallyScheduled : true
            },
            {
                id                : 2,
                startDate         : '2010-01-18',
                duration          : 3,
                manuallyScheduled : true
            },
            {
                id                : 3,
                startDate         : '2010-01-18',
                duration          : 0,
                manuallyScheduled : true
            },
            {
                id                : 4,
                startDate         : '2010-01-19',
                duration          : 3,
                manuallyScheduled : true
            }
        ],
        resourcesData : [
            { id : 'r1', name : 'Mike' }
        ],
        assignmentsData : [
            { id : 'a1', resource : 'r1', event : 1, units : 50 }
        ]
    });

    await project.commitAsync();

    // https://github.com/bryntum/support/issues/5290
    t.it('Resource histogram zooms to fit', async t => {

        histogram = new ResourceHistogram({
            appendTo           : document.body,
            startDate          : new Date(2010, 0, 17),
            endDate            : new Date(2010, 0, 18),
            height             : 150,
            autoAdjustTimeAxis : false,
            project
        });

        t.livesOk(() => histogram.zoomToFit(), 'Doesn`t throw an exception on zoomToFit() call');
    });

});
