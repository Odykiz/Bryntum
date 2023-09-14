
StartTest(t => {
    let resourceStore, eventStore, project;

    t.beforeEach(() => {
        resourceStore?.destroy?.();
        eventStore?.destroy?.();
        project?.destroy?.();

        resourceStore = new ResourceStore({
            data : [
                { id : 'c1', name : 'Foo' },
                { id : 'c2', name : 'Foo' }
            ]
        });

        eventStore    = new EventStore();

        project = new ProjectModel({
            eventStore,
            resourceStore
        });
    });

    t.it('Event buffer works ok', t => {
        let event;

        const setup = async() => {
            eventStore.add({
                resourceId : 'c1',
                name       : 'Mike',
                startDate  : '2010-12-09 09:45',
                endDate    : '2010-12-09 11:00',
                preamble   : '12min',
                postamble  : '1h'
            });

            await project.commitAsync();

            event = eventStore.first;
        };

        t.it('Should calculate wrap dates (with buffer)', async t => {
            await setup();

            t.is(event.wrapStartDate, new Date(2010, 11, 9, 9, 33), 'Event wrap start is ok');
            t.is(event.wrapEndDate, new Date(2010, 11, 9, 12), 'Event wrap end is ok');

            t.is(event.startDate, new Date(2010, 11, 9, 9, 45), 'Event start is ok');
            t.is(event.endDate, new Date(2010, 11, 9, 11), 'Event end is ok');
        });

        t.it('Should move event (with buffer)', async t => {
            await setup();

            // access wrap properties to fill the cache and assert it is updated
            // eslint-disable-next-line no-unused-vars
            const foo = event.wrapStartDate === event.wrapEndDate;

            const
                expectedWrapStart = new Date(2010, 11, 9, 10, 33),
                expectedStart     = new Date(2010, 11, 9, 10, 45),
                expectedEnd       = new Date(2010, 11, 9, 12),
                expectedWrapEnd   = new Date(2010, 11, 9, 13);

            event.startDate = expectedStart;

            await project.commitAsync();

            t.is(event.wrapStartDate, expectedWrapStart, 'Wrap start is updated');

            t.is(event.startDate, expectedStart, 'Event start is ok');
            t.is(event.endDate, expectedEnd, 'Event end is ok');
            t.is(event.wrapEndDate, expectedWrapEnd, 'Wrap end is updated');
        });

        t.it('Should resize event (with buffer)', async t => {
            await setup();

            // access wrap properties to fill the cache and assert it is updated
            // eslint-disable-next-line no-unused-vars
            const foo = event.wrapStartDate === event.wrapEndDate;

            event.endDate = new Date(2010, 11, 9, 12);

            const expected = new Date(2010, 11, 9, 13);

            t.is(event.wrapEndDate, expected, 'wrap end is updated');
        });

        t.it('Should update buffer size (with buffer)', async t => {
            await setup();

            // access wrap properties to fill the cache and assert it is updated
            // eslint-disable-next-line no-unused-vars
            const foo = event.wrapStartDate === event.wrapEndDate;

            event.preamble = '1h';

            let expected = DateHelper.add(event.startDate, -1, 'h');

            t.is(event.wrapStartDate, expected, 'Event wrap start is ok');

            t.is(event.startDate, new Date(2010, 11, 9, 9, 45), 'Event start date is ok');

            event.postamble = '15min';

            expected = DateHelper.add(event.endDate, 15, 'min');

            t.is(event.wrapEndDate, expected, 'Event wrap end is ok');

            t.is(event.endDate, new Date(2010, 11, 9, 11), 'Event end date is ok');
        });

        t.it('Wrap start/end dates should fall back to start/end dates', async t => {
            eventStore.add({
                resourceId : 'c1',
                name       : 'Mike',
                startDate  : '2010-12-09 09:45',
                endDate    : '2010-12-09 11:00'
            });

            await project.commitAsync();

            const event = eventStore.first;

            // t.notOk(event.get('wrapStartDate'), 'wrap start is not calculated');
            // t.notOk(event.get('wrapEndDate'), 'wrap end is not calculated');

            t.is(event.wrapStartDate, event.startDate, 'Event wrap start is ok');
            t.is(event.wrapEndDate, event.endDate, 'Event wrap end is ok');
        });

        t.it('Wrap start/end dates persist only when preamble/postamble is defined', async t => {
            eventStore.add([
                {
                    id         : 1,
                    resourceId : 'c1',
                    name       : 'Mike',
                    startDate  : '2010-12-09 09:45',
                    endDate    : '2010-12-09 11:00'
                },
                {
                    id         : 2,
                    resourceId : 'c1',
                    name       : 'Mike',
                    startDate  : '2010-12-09 09:45',
                    endDate    : '2010-12-09 11:00',
                    preamble   : '10min'
                },
                {
                    id         : 3,
                    resourceId : 'c1',
                    name       : 'Mike',
                    startDate  : '2010-12-09 09:45',
                    endDate    : '2010-12-09 11:00',
                    postamble  : '10min'
                },
                {
                    id         : 4,
                    resourceId : 'c1',
                    name       : 'Mike',
                    startDate  : '2010-12-09 09:45',
                    endDate    : '2010-12-09 11:00',
                    preamble   : '10min',
                    postamble  : '10min'
                }
            ]);

            await project.commitAsync();

            const
                expectedStart = new Date(2010, 11, 9, 9, 35),
                expectedEnd   = new Date(2010, 11, 9, 11, 10),
                [event1, event2, event3, event4] = eventStore.getRange();

            t.describe('Event 1', t => {
                t.is(event1.wrapStartDate, event1.startDate, 'Event wrap start is ok');
                t.is(event1.wrapEndDate, event1.endDate, 'Event wrap end is ok');
            });

            t.describe('Event 2', t => {
                t.is(event2.wrapStartDate, expectedStart, 'Event wrap start is ok');
                t.is(event2.wrapEndDate, event2.endDate, 'Event wrap end is ok');
            });

            t.describe('Event 3', t => {
                t.is(event3.wrapStartDate, event3.startDate, 'Event wrap start is ok');
                t.is(event3.wrapEndDate, expectedEnd, 'Event wrap end is ok');
            });

            t.describe('Event 4', async t => {
                t.is(event4.wrapStartDate, expectedStart, 'Event wrap start is ok');
                t.is(event4.wrapEndDate, expectedEnd, 'Event wrap end is ok');

                event4.preamble = null;

                await project.commitAsync();

                t.is(event1.wrapStartDate, event1.startDate, 'Event wrap start is ok');

                event4.postamble = null;

                await project.commitAsync();

                t.is(event1.wrapEndDate, event1.endDate, 'Event wrap end is ok');
            });
        });
    });

    t.it('Should handle duration + durationUnit in a set() call', async t => {
        const [event] = eventStore.add({
            name         : 'Mike',
            startDate    : '2022-03-21 09:45',
            duration     : 1,
            durationUnit : 'hour'
        });

        await project.commitAsync();

        t.is(event.endDate, new Date(2022, 2, 21, 10, 45), 'Correct endDate initially');
        t.is(event.duration, 1, 'Correct duration initially');
        t.is(event.durationUnit, 'hour', 'Correct durationUnit initially');

        event.set({
            duration     : 2,
            durationUnit : 'day'
        });

        await project.commitAsync();

        t.is(event.endDate, new Date(2022, 2, 23, 9, 45), 'Correct endDate');
        t.is(event.duration, 2, 'Correct duration');
        t.is(event.durationUnit, 'day', 'Correct durationUnit');
    });
});
