
StartTest(t => {

    const calendar = new CalendarModel({
        id        : 111,
        name      : 'foo',
        intervals : [
            {
                recurrentStartDate : 'on Sat at 0:00',
                recurrentEndDate   : 'on Mon at 0:00',
                isWorking          : false
            }
        ]
    });

    t.it('Should provide calendar name when toString() is called', t => {
        t.is(calendar.toString(), 'foo', 'toString() yielded the name');
    });

    // https://github.com/bryntum/support/issues/6242
    t.it('Should support copying a calendar', t => {
        t.is(calendar.intervals.count, 1);
        const clone = calendar.copy('foo');

        t.isInstanceOf(clone, CalendarModel);
        t.is(clone.intervals.count, 1, 'Intervals copied');
        t.isNot(clone.intervals.first, calendar.intervals.first, 'Intervals actually copied');
    });
});
