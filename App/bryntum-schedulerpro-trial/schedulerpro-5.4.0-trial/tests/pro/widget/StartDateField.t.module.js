
StartTest(t => {
    let dateField, project;

    t.beforeEach(t => {
        dateField?.destroy();
        project?.destroy();
    });

    async function createProject() {
        project = new ProjectModel({
            calendar      : 'business',
            hoursPerDay   : 8,
            calendarsData : [
                {
                    id        : 'business',
                    intervals : [
                        {
                            recurrentStartDate : 'every weekday at 12:00',
                            recurrentEndDate   : 'every weekday at 13:00',
                            isWorking          : false
                        },
                        {
                            recurrentStartDate : 'every weekday at 17:00',
                            recurrentEndDate   : 'every weekday at 08:00',
                            isWorking          : false
                        }
                    ]
                },
                {
                    id        : 'r1',
                    intervals : [
                        {
                            startDate : '2020-10-16',
                            endDate   : '2020-10-17',
                            isWorking : false
                        }
                    ]
                }
            ],
            eventsData : [{
                id           : 'e1',
                startDate    : '2020-10-14 08:00:00',
                duration     : 16,
                durationUnit : 'hour'
            }],
            resourcesData : [{
                id       : 'r1',
                calendar : 'r1'
            }],
            assignmentsData : [{
                resourceId : 'r1',
                eventId    : 'e1'
            }]
        });

        await project.commitAsync();
    };

    t.it('Should adjust time to the earliest possible time of the day based on the project calendar', async t => {
        await createProject();

        dateField = new StartDateField({
            appendTo : document.body,
            project,
            keepTime : true,
            format   : 'YYYY-MM-DD HH:mm',
            value    : new Date(2020, 9, 14)
        });

        t.is(dateField.input.value, '2020-10-14 08:00');
        t.isDateEqual(dateField.value, new Date(2020, 9, 14, 8));

        await t.click('.b-icon-calendar');
        await t.click('[aria-label="October 15, 2020"]');

        t.is(dateField.input.value, '2020-10-15 08:00');
        t.isDateEqual(dateField.value, new Date(2020, 9, 15, 8));
    });

    t.it('Should adjust time to the latest possible time of the day based on combined event calendars', async t => {
        await createProject();

        dateField = new StartDateField({
            eventRecord : project.eventStore.first,
            // keepTime : true,
            width       : 250,
            step        : '1d',
            format      : 'YYYY-MM-DD HH:mm',
            value       : project.eventStore.first.startDate,
            appendTo    : document.body
        });

        t.is(dateField.input.value, '2020-10-14 08:00');
        t.isDateEqual(dateField.value, new Date(2020, 9, 14, 8));

        await t.click('.b-icon-angle-right');
        t.is(dateField.input.value, '2020-10-15 08:00');
        t.isDateEqual(dateField.value, new Date(2020, 9, 15, 8));

        await t.click('.b-icon-angle-right');
        t.is(dateField.input.value, '2020-10-19 08:00');
        t.isDateEqual(dateField.value, new Date(2020, 9, 19, 8));

        await t.click('.b-icon-angle-left');
        t.is(dateField.input.value, '2020-10-15 08:00');
        t.isDateEqual(dateField.value, new Date(2020, 9, 15, 8));
    });

});
