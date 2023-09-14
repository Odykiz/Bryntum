
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Should localize rendered buffer time', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                eventBuffer : true
            },
            viewPreset : 'hourAndDay',
            eventsData : [
                {
                    id        : 1,
                    startDate : '2020-03-23T03:00',
                    endDate   : '2020-03-23T04:00',
                    preamble  : '10 min',
                    postamble : '1h'
                }
            ]
        });

        await t.waitForSelector('.b-sch-event-buffer-before');

        const
            bufferBefore = document.querySelector('.b-sch-event-buffer-before'),
            bufferAfter  = document.querySelector('.b-sch-event-buffer-after');

        t.is(bufferBefore.dataset.buffertime, '10 minutes', 'Before text is ok');
        t.is(bufferAfter.dataset.buffertime, '1 hour', 'After text is ok');

        t.applyLocale('Nl');

        await t.waitFor({
            method() {
                const bufferBefore = document.querySelector('.b-sch-event-buffer-before');

                return bufferBefore?.dataset.buffertime === '10 minuten';
            },
            desc : 'Buffer before locale updated'
        });

        await t.waitFor({
            method() {
                const bufferAfter = document.querySelector('.b-sch-event-buffer-after');

                return bufferAfter?.dataset.buffertime === '1 uur';
            },
            desc : 'Buffer after locale updated'
        });
    });
});
