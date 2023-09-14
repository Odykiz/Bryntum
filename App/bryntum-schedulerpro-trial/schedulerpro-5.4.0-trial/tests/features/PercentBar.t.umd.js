
StartTest(t => {
    let schedulerPro;

    t.beforeEach(() => schedulerPro?.destroy());

    function assertPercentBarDimensions(t, eventRecord) {
        const
            eventElement = schedulerPro.getElementFromEventRecord(eventRecord),
            sizeProp     = schedulerPro.isVertical ? 'offsetHeight' : 'offsetWidth',
            percentBar   = eventElement.querySelector('.b-task-percent-bar'),
            expectedSize = eventElement[sizeProp] * eventRecord.percentDone / 100;

        t.isApprox(percentBar[sizeProp], expectedSize, `Correct percent bar size for ${eventRecord.name}, ${eventRecord.percentDone}%`);

        if (schedulerPro.isVertical) {
            t.is(t.rect(percentBar).left, t.rect(eventElement).left, 'correct left');
            t.is(t.rect(percentBar).right, t.rect(eventElement).right, 'correct right');
        }
        else {
            t.is(t.rect(percentBar).top, t.rect(eventElement).top, 'correct top');
            t.is(t.rect(percentBar).bottom, t.rect(eventElement).bottom, 'correct bottom');
        }
    }

    t.it('Should render percent bars', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : { percentBar : true }
        });

        t.ok(schedulerPro.isEngineReady);

        const eventElements = Array.from(document.querySelectorAll('.b-sch-event-wrap:not(.b-milestone-wrap)'));

        t.selectorExists('.b-task-percent-bar', 'Percent bar rendered');
        t.selectorCountIs('.b-task-percent-bar', eventElements.length, 'One per event rendered');

        // Check all widths
        eventElements.forEach(taskElement => {
            assertPercentBarDimensions(t, schedulerPro.resolveEventRecord(taskElement));
        });
    });

    t.it('Should update percent bar when data changes', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : { percentBar : true }
        });

        const event = schedulerPro.eventStore.first;

        await event.setPercentDone(10);

        assertPercentBarDimensions(t, event);

        await event.setPercentDone(90);

        assertPercentBarDimensions(t, event);

        await event.setPercentDone(100);

        assertPercentBarDimensions(t, event);
    });

    t.it('Should set percent to 0 if dragging fully to the start of the bar', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : { percentBar : true }
        });

        const event = schedulerPro.eventStore.first;

        await event.setDuration(1);
        await event.setPercentDone(10);

        t.firesOnce(schedulerPro, 'percentBarDragStart');
        t.firesAtLeastNTimes(schedulerPro, 'percentBarDrag', 1);
        t.firesOnce(schedulerPro, 'percentBarDrop');
        t.wontFire(schedulerPro, 'percentBarDragAbort');

        await t.moveCursorTo(schedulerPro.unreleasedEventSelector);

        await t.dragBy({
            source   : '.b-task-percent-bar-handle',
            delta    : [-100, 0],
            dragOnly : true
        });

        const
            handle              = t.query('.b-task-percent-bar-handle')[0],
            pseudoElementStyles = t.global.getComputedStyle(handle, ':after');

        t.is(pseudoElementStyles.position, 'absolute', 'Element shown');

        t.is(event.percentDone, 0);
        t.is(event.duration, 1);

        await t.mouseUp();

        t.is(event.percentDone, 0);
    });

    t.it('Should reset percent bar if escape key is pressed while dragging', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : { percentBar : true }
        });

        const event = schedulerPro.eventStore.first;

        await event.setDuration(1);
        await event.setPercentDone(10);

        t.firesOnce(schedulerPro, 'percentBarDragStart');
        t.firesAtLeastNTimes(schedulerPro, 'percentBarDrag', 1);
        t.firesOnce(schedulerPro, 'percentBarDragAbort');

        await t.moveCursorTo(schedulerPro.unreleasedEventSelector);

        await t.dragBy({
            source   : '.b-task-percent-bar-handle',
            delta    : [-100, 0],
            dragOnly : true
        });

        t.is(event.percentDone, 0);

        await t.type(null, '[ESCAPE]');

        t.is(event.percentDone, 10);
    });

    t.it('Should be possible to resize percent bar to 100% and then to 0% of the task width', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : { percentBar : true, eventTooltip : false, dependencies : false }
        });

        let barEl, barWidth;

        await t.moveMouseTo(schedulerPro.unreleasedEventSelector);
        await t.dragBy({
            source   : '.b-task-percent-bar-handle',
            delta    : [100, 0],
            dragOnly : true
        });

        barEl           = document.querySelector('.b-task-percent-bar');
        barWidth        = barEl.offsetWidth;
        const taskWidth = barEl.parentElement.offsetWidth;

        t.is(barWidth, taskWidth, 'Percent bar size is ok');
        await t.moveMouseTo(schedulerPro.unreleasedEventSelector, null, null, [-10, '50%']);

        barEl    = document.querySelector('.b-task-percent-bar');
        barWidth = barEl.offsetWidth;

        t.is(barWidth, 0, 'Percent bar size is ok');
        await t.mouseUp();
    });

    t.it('Should be possible to resize percent bar to 100% of the task width', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : { percentBar : true, eventTooltip : false, dependencies : false }
        });

        await t.moveMouseTo(schedulerPro.unreleasedEventSelector);
        await t.dragBy({
            source : '.b-task-percent-bar-handle',
            delta  : [100, 0]
        });

        const barEl       = document.querySelector('.b-task-percent-bar');
        const barWidth    = barEl.offsetWidth;
        const taskWidth   = barEl.parentElement.offsetWidth;
        const handleEl    = document.querySelector('.b-task-percent-bar-handle');
        const handleWidth = handleEl.offsetWidth;
        t.is(handleWidth, 13, 'Percent bar handle size is ok');

        t.is(barWidth, taskWidth, 'Percent bar size is ok');
    });

    t.it('Should not show resize handle if Scheduler is readOnly', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            readOnly : true,
            features : { percentBar : true }
        });

        t.chain(
            { moveCursorTo : schedulerPro.unreleasedEventSelector },

            () => {
                t.elementIsNotVisible('.b-task-percent-bar-handle', 'Handle not shown when readOnly is set');
            }
        );
    });

    t.it('Should support disabling', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : { percentBar : true }
        });

        schedulerPro.features.percentBar.disabled = true;

        t.selectorNotExists(`${schedulerPro.unreleasedEventSelector} .b-task-percent-bar`, 'No percent bars');

        schedulerPro.features.percentBar.disabled = false;

        t.selectorExists(`${schedulerPro.unreleasedEventSelector} .b-task-percent-bar`, 'Percent bars shown');

        schedulerPro.features.percentBar.allowResize = false;

        t.chain(
            { moveCursorTo : [0, 0] },

            { moveCursorTo : schedulerPro.unreleasedEventSelector },

            async() => {
                t.elementIsNotVisible('.b-task-percent-bar-handle', 'resize handle hidden');
                schedulerPro.features.percentBar.allowResize = true;
            },

            { moveCursorTo : [0, 0] },

            { moveCursorTo : schedulerPro.unreleasedEventSelector },

            () => {
                t.elementIsVisible('.b-task-percent-bar-handle', 'resize handle visible');
            }
        );
    });

    t.it('Percent bar drag should not affect the task duration', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            appendTo : null,
            features : { percentBar : true }
        });

        const panel = new Panel({
            adopt  : document.body,
            layout : 'fit',
            items  : [
                schedulerPro
            ]
        });

        const event = schedulerPro.eventStore.first;

        await event.setDuration(1);
        await event.setPercentDone(10);

        t.chain(
            { moveCursorTo : schedulerPro.unreleasedEventSelector },
            { drag : '.b-task-percent-bar-handle', by : [100, 0] },
            { waitForProjectReady : schedulerPro },

            () => {
                t.is(event.percentDone, 100);
                t.is(event.duration, 1);
                panel.destroy();
            }
        );
    });

    // https://github.com/bryntum/support/issues/2810
    t.it('Percent bar feature should supporting being disabled', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : {
                percentBar : {
                    disabled : true
                }
            }
        });

        await t.moveCursorTo('.b-sch-event');
        t.selectorNotExists('.b-task-percent-bar-handle');
    });

    // https://github.com/bryntum/support/issues/665
    t.it('Should prevent editing readOnly event', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            features : { percentBar : true }
        });

        schedulerPro.eventStore.first.readOnly = true;

        await schedulerPro.project.commitAsync();

        await t.moveCursorTo('[data-event-id="1"]');

        t.selectorNotExists('.b-task-percent-bar-handle');
    });

    // https://github.com/bryntum/support/issues/4862
    t.it('Should render properly in vertical mode', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            mode     : 'vertical',
            features : { percentBar : true }
        });

        const event       = schedulerPro.eventStore.first;
        event.percentDone = 10;
        await t.waitForProjectReady(schedulerPro);

        assertPercentBarDimensions(t, event);

        event.percentDone = 90;
        await t.waitForProjectReady(schedulerPro);
        assertPercentBarDimensions(t, event);
    });

    // https://github.com/bryntum/support/issues/4862
    t.it('Should support drag drop in vertical mode', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            mode     : 'vertical',
            features : { percentBar : true }
        });

        const event = schedulerPro.eventStore.first;

        await t.moveCursorTo(schedulerPro.unreleasedEventSelector);

        const eventBar = t.query(schedulerPro.unreleasedEventSelector)[0];
        const handle   = t.query('.b-task-percent-bar-handle')[0];

        t.is(t.rect(handle).left, t.rect(eventBar).left, 'correct left');
        t.is(t.rect(handle).top + 7, t.rect(eventBar).top + (t.rect(eventBar).height / 2), 'correct top');

        await t.dragBy({
            source : handle,
            delta  : [0, 140]
        });
        await schedulerPro.project.commitAsync();
        t.is(event.percentDone, 100);
        assertPercentBarDimensions(t, event);
    });

    t.it('Should handle dragging below event bottom in vertical mode', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            mode     : 'vertical',
            features : { percentBar : true }
        });

        const event = schedulerPro.eventStore.getById(2);

        await t.moveCursorTo('.b-sch-event:contains(Event 2)');

        const eventBar = t.query('.b-sch-event:contains(Event 2)')[0];
        const handle   = t.query('.b-task-percent-bar-handle')[0];

        t.is(t.rect(handle).left, t.rect(eventBar).left, 'correct left');
        t.is(t.rect(handle).top + 7, t.rect(eventBar).top + (t.rect(eventBar).height * 0.4), 'correct top');

        await t.dragBy({
            source : handle,
            delta  : [0, 250]
        });
        await schedulerPro.project.commitAsync();
        t.is(event.percentDone, 100);
        assertPercentBarDimensions(t, event);
    });

    t.it('Should only trigger one sync / commit / STM transaction after a drag drop', async t => {
        // mock a URL ..just to not deal w/ Promise rejections when debugging
        t.mockUrl('foo', '{}');

        schedulerPro = await t.getSchedulerProAsync({
            project : {
                autoSync : true,
                stm      : {
                    autoRecord : true
                },
                resourcesData : [
                    { id : 1, startDate : '2020-03-23', duration : 2 }
                ],
                eventsData : [
                    { id : 1, startDate : '2020-03-23', duration : 2 }
                ],
                assignmentsData : [
                    { id : 1, event : 1, resource : 1 }
                ],
                dependenciesData : [],
                syncUrl          : 'foo'
            },
            features : {
                percentBar   : true,
                eventTooltip : false,
                dependencies : false
            }
        });

        const { project } = schedulerPro;
        let syncAttempts = 0;

        project.on('beforeSync', () => syncAttempts++);

        // Enable STM recording
        project.stm.enable();

        await t.moveMouseTo(schedulerPro.unreleasedEventSelector);
        await t.dragBy({
            source   : '.b-task-percent-bar-handle',
            delta    : [100, 0],
            dragOnly : true
        });

        t.is(syncAttempts, 0, 'no sync attempts initially');
        t.ok(project.isAutoSyncSuspended, 'project autoSync is suspended when dragging');
        t.notOk(project.stm.autoRecord, 'project STM auto recording is OFF when dragging');
        t.isGreater(schedulerPro.eventStore.suspendCount, 0, 'event store autoCommit is suspended when dragging');
        t.notOk(project.stm.queue.length, 'no STM transactions before dragging');

        await t.mouseUp();

        await t.waitFor(() => syncAttempts === 1);

        t.notOk(project.isAutoSyncSuspended, 'project autoSync is restored after dragging');
        t.ok(project.stm.autoRecord, 'project STM auto recording is ON after dragging');
        t.is(schedulerPro.eventStore.suspendCount, 0, 'event store autoCommit is resumed after dragging');
        t.is(project.stm.queue.length, 1, 'one STM transactions after dragging');
    });
});
