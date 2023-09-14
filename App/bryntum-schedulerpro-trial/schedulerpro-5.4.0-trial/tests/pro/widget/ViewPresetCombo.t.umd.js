
StartTest(t => {

    let schedulerPro;

    t.beforeEach((t) => {
        schedulerPro?.destroy();
    });

    t.it('Should basically work', async t => {
        const
            weekPresetName  = PresetManager.getById('weekAndDay').name,
            monthPresetName = PresetManager.getById('dayAndMonth').name;

        schedulerPro = await t.getSchedulerProAsync({
            tbar : [
                {
                    type : 'viewpresetcombo'
                }
            ]
        });

        t.selectorExists('.b-viewpresetcombo', 'Combo rendered');

        await t.click('.b-viewpresetcombo');

        t.is(t.query('.b-list-item').length, 3, 'Rendered menu with three items');

        await t.click(`.b-list-item:textEquals(${weekPresetName})`);

        t.is(schedulerPro.endDate, DateHelper.add(schedulerPro.startDate, 7, 'days'), 'Switching viewpreset should work');
        t.is(schedulerPro.startDate.getDay(), 0, 'Starts with the first day of the week...');
        t.is(DateHelper.getTimeOfDay(schedulerPro.startDate), 0, '...at 00:00');
        t.is(schedulerPro.endDate.getDay(), 0, 'Ends with the first day of the next week...');
        t.is(DateHelper.getTimeOfDay(schedulerPro.endDate), 0, '...at 00:00');

        await t.click('.b-viewpresetcombo');
        await t.click(`.b-list-item:textEquals(${monthPresetName})`);

        t.is(schedulerPro.endDate, DateHelper.add(schedulerPro.startDate, 1, 'month'), '1 month should work');
    });

    t.it('Should work to customize items', async t => {
        const
            startDate = new Date(2022, 4, 30),
            endDate = new Date(2022, 5, 4),
            testPresetName  = 'testPreset',
            monthPresetName = PresetManager.getById('dayAndMonth').name,
            weekPresetName  = PresetManager.getById('weekAndDay').name;

        schedulerPro = await t.getSchedulerProAsync({
            startDate,
            endDate,
            presets : [
                'hourAndDay',
                'weekAndDay',
                // Excludes dayAndMonth
                {
                    id          : 'testPreset',
                    name        : testPresetName,
                    base        : 'dayAndWeek',
                    defaultSpan : 7,
                    mainUnit    : 'day',
                    headers     : [
                        { unit : 'd', dateFormat : 'MMM Do' }
                    ]
                }
            ],
            viewPreset : 'hourAndDay',
            tbar       : [
                {
                    type    : 'viewpresetcombo',
                    presets : ['weekAndDay', 'dayAndMonth', 'testPreset']
                }
            ]
        });

        await t.click('.b-viewpresetcombo');

        t.is(t.query('.b-list-item').length, 2, 'Rendered menu with two items');

        t.selectorExists(`.b-list-item:textEquals(${testPresetName})`, 'It worked to use new preset');
        t.selectorNotExists(`.b-list-item:textEquals(${monthPresetName})`, 'It should not list unavailable presets');
        t.selectorExists(`.b-list-item:textEquals(${weekPresetName})`, 'Correct presets shown in list');

        await t.click(`.b-list-item:textEquals(${testPresetName})`);
        t.selectorExists('.b-sch-header-timeaxis-cell span:textEquals(May 30th)', 'It worked to change to custom preset');

    });

    t.it('Should select matching ViewPreset when zooming', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            tbar : [
                {
                    type : 'viewpresetcombo',
                    ref  : 'viewPresetCombo'
                }
            ]
        });
        await t.waitForMs(500);
        await t.wheel([200, 200], null, null, { deltaY : -1000, ctrlKey : true });
        await t.wheel([200, 200], null, null, { deltaY : -1000, ctrlKey : true });
        t.is(schedulerPro.widgetMap.viewPresetCombo.value, 'dayAndMonth', 'Selected matching preset in combo');

        await t.wheel([200, 200], null, null, { deltaY : -1000, ctrlKey : true });
        t.is(schedulerPro.widgetMap.viewPresetCombo.value, 'weekAndDay', 'Selected matching preset in combo');

        await t.wheel([200, 200], null, null, { deltaY : -1000, ctrlKey : true });
        t.is(schedulerPro.widgetMap.viewPresetCombo.value, null, 'No matching preset in combo');

    });

    t.it('Should select matching viewPreset when programmatically changing viewPreset', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            tbar : [
                {
                    type : 'viewpresetcombo',
                    ref  : 'viewPresetCombo'
                }
            ]
        });

        schedulerPro.viewPreset = 'weekAndDay';
        t.is(schedulerPro.widgetMap.viewPresetCombo.value, 'weekAndDay', 'Selected matching preset in combo');

        schedulerPro.zoomToLevel('dayAndMonth');
        t.is(schedulerPro.widgetMap.viewPresetCombo.value, 'dayAndMonth', 'Selected matching preset in combo');

        schedulerPro.zoomOut();
        t.is(schedulerPro.widgetMap.viewPresetCombo.value, null, 'No matching preset in combo');
    });

});
