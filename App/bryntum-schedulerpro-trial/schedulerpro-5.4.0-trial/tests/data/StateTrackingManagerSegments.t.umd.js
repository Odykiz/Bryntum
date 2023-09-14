
StartTest(t => {

    t.it('Task split and then move is undoable/redoable', async t => {

        const project = new ProjectModel({
            stm : {
                autoRecord : false
            },
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
            eventsData : [{
                id        : 1,
                startDate : '2022-02-07',
                duration  : 5
            }]
        });

        const
            { stm, taskStore } = project,
            task = taskStore.first;

        await project.commitAsync();

        stm.enable();

        t.diag('Splitting task');

        stm.startTransaction();

        await task.splitToSegments(new Date(2022, 1, 8), 1, 'd');

        stm.stopTransaction();

        t.is(task.startDate, new Date(2022, 1, 7), 'correct start date');
        t.is(task.endDate, new Date(2022, 1, 15), 'correct end date');

        t.is(task.getSegment(0).startDate, new Date(2022, 1, 7), 'correct segment 0 start date');
        t.is(task.getSegment(0).endDate, new Date(2022, 1, 8), 'correct segment 0 end date');

        t.is(task.getSegment(1).startDate, new Date(2022, 1, 9), 'correct segment 0 start date');
        t.is(task.getSegment(1).endDate, new Date(2022, 1, 15), 'correct segment 0 end date');

        t.diag('Moving task +1 day');

        stm.startTransaction();

        await task.setStartDate(new Date(2022, 1, 8), true);

        stm.stopTransaction();

        t.is(task.startDate, new Date(2022, 1, 8), 'correct start date');
        t.is(task.endDate, new Date(2022, 1, 16), 'correct end date');

        t.is(task.getSegment(0).startDate, new Date(2022, 1, 8), 'correct segment 0 start date');
        t.is(task.getSegment(0).endDate, new Date(2022, 1, 9), 'correct segment 0 end date');

        t.is(task.getSegment(1).startDate, new Date(2022, 1, 10), 'correct segment 0 start date');
        t.is(task.getSegment(1).endDate, new Date(2022, 1, 16), 'correct segment 0 end date');

        t.diag('Undoing task move');

        await stm.undo();

        await project.commitAsync();

        t.is(task.startDate, new Date(2022, 1, 7), 'correct start date');
        t.is(task.endDate, new Date(2022, 1, 15), 'correct end date');

        t.is(task.getSegment(0).startDate, new Date(2022, 1, 7), 'correct segment 0 start date');
        t.is(task.getSegment(0).endDate, new Date(2022, 1, 8), 'correct segment 0 end date');

        t.is(task.getSegment(1).startDate, new Date(2022, 1, 9), 'correct segment 0 start date');
        t.is(task.getSegment(1).endDate, new Date(2022, 1, 15), 'correct segment 0 end date');

        t.diag('Undoing task split');

        await stm.undo();

        await project.commitAsync();

        t.is(task.startDate, new Date(2022, 1, 7), 'correct start date');
        t.is(task.endDate, new Date(2022, 1, 12), 'correct end date');
        t.is(task.duration, 5, 'correct duration');

        t.notOk(task.isSegmented, 'task is no longer segmented');

        t.diag('Redoing task split');

        await stm.redo();

        await project.commitAsync();

        t.is(task.startDate, new Date(2022, 1, 7), 'correct start date');
        t.is(task.endDate, new Date(2022, 1, 15), 'correct end date');

        t.is(task.getSegment(0).startDate, new Date(2022, 1, 7), 'correct segment 0 start date');
        t.is(task.getSegment(0).endDate, new Date(2022, 1, 8), 'correct segment 0 end date');

        t.is(task.getSegment(1).startDate, new Date(2022, 1, 9), 'correct segment 0 start date');
        t.is(task.getSegment(1).endDate, new Date(2022, 1, 15), 'correct segment 0 end date');

        t.diag('Redoing task move');

        await stm.redo();

        await project.commitAsync();

        t.is(task.startDate, new Date(2022, 1, 8), 'correct start date');
        t.is(task.endDate, new Date(2022, 1, 16), 'correct end date');

        t.is(task.getSegment(0).startDate, new Date(2022, 1, 8), 'correct segment 0 start date');
        t.is(task.getSegment(0).endDate, new Date(2022, 1, 9), 'correct segment 0 end date');

        t.is(task.getSegment(1).startDate, new Date(2022, 1, 10), 'correct segment 0 start date');
        t.is(task.getSegment(1).endDate, new Date(2022, 1, 16), 'correct segment 0 end date');
    });
});
