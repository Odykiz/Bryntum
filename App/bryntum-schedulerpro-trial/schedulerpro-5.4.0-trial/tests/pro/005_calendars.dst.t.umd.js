
StartTest(t => {

    const gmtOffsetMs = (new Date(2022, 0, 31, 23)).getTimezoneOffset() * 60000;

    if (!gmtOffsetMs) {
        t.pass('The test should be run in a non GMT timezone');
        return;
    }

    // https://github.com/bryntum/support/issues/4096
    t.it('Should parse interval dates correctly', t => {
        const project = new ProjectModel({
            calendarsData : [{
                id                       : 1,
                unspecifiedTimeIsWorking : true,
                intervals                : [{
                    startDate : '2022-01-31T23:00:00.000Z',
                    endDate   : '2022-02-01T23:00:00.000Z',
                    isWorking : false
                }]
            }]
        });

        const calendarInterval = project.calendarManagerStore.getById(1).intervalStore.first;

        t.is(calendarInterval.startDate, new Date((new Date(2022, 0, 31, 23)).getTime() - gmtOffsetMs), 'start date is parsed correctly');
        t.is(calendarInterval.endDate, new Date((new Date(2022, 1, 1, 23)).getTime() - gmtOffsetMs), 'end date is parsed correctly');
    });

});
