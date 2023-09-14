
StartTest(t => {

    let schedulerPro, timeline;

    t.beforeEach(t => {
        schedulerPro?.destroy();
        timeline?.destroy();
        timeline = null;
    });

    async function createTimeLine(config) {
        timeline = window.timeline = Timeline.new({
            appendTo              : document.body,
            enableEventAnimations : false
        }, config);

        await timeline.project.commitAsync();
    }

    // https://github.com/bryntum/support/issues/4626
    t.it('Should not crash when clicking Enter in event editor', async t => {
        schedulerPro = await t.getSchedulerProAsync({
            height   : 300,
            features : {
                taskEdit : {
                    items : {
                        generalTab : {
                            items : {
                                showInTimelineField : {
                                    type  : 'checkbox',
                                    name  : 'showInTimeline',
                                    // Text is shown to the right of the checkbox
                                    text  : 'Show in timeline',
                                    // use empty label to align checkbox with other fields
                                    label : '&nbsp;'
                                }
                            }
                        }
                    }
                }
            }
        });

        await createTimeLine({ project : schedulerPro.project });

        await schedulerPro.editEvent(schedulerPro.eventStore.first);

        await t.waitForSelector('.b-schedulerpro-taskeditor');

        await t.type({ text : '[ENTER]' });

        t.selectorNotExists('.b-timeline .b-sch-event');
    });

    // https://github.com/bryntum/support/issues/6271
    t.it('Should not have event editor enabled by default', async t => {
        await createTimeLine({
            project : new ProjectModel({
            }),
            features : {}
        });

        t.notOk(timeline.features.eventEdit);
        t.selectorNotExists('.b-timeline .b-sch-event');
    });

});
