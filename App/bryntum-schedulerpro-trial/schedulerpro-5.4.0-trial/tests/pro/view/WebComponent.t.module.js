
StartTest(t => {
    let cmp;

    t.mockUrl('data.json', {
        responseText : JSON.stringify({
            success   : true,
            resources : {
                rows : [
                    { id : 'a', name : 'Mystery man' }
                ]
            },
            assignments : {
                rows : [
                    {
                        id       : 'a1',
                        resource : 'a',
                        event    : 1
                    }
                ]
            },
            events : {
                rows : [
                    {
                        id        : 1,
                        name      : 'Bridge repair',
                        startDate : '2018-04-02T08:00:00',
                        duration  : 4
                    }
                ]
            }
        })
    });

    const createScheduler = () => {
        document.body.innerHTML += `
            <bryntum-schedulerpro 
                stylesheet="../build/schedulerpro.stockholm.css" 
                data-use-initial-animation=false 
                data-load-mask=false 
                data-view-preset="weekAndDay" 
                data-start-date="2018-04-02" 
                data-end-date="2018-04-09"
            >
                <column data-field="name">Name</column>
                <project data-load-url="data.json"></project>
            </bryntum-schedulerpro>`;
    };

    t.beforeEach(t => {
        cmp && cmp.remove();
        document.body.style = 'height:100%;width:100%;overflow:hidden;';

        document.body.innerHTML = '';
    });

    t.it('Should finalize drag drop if mouse up happens outside shadow root', async t => {
        createScheduler();
        cmp = document.querySelector('bryntum-schedulerpro');

        document.body.style.padding = '10em';
        await t.dragBy('bryntum-schedulerpro -> .b-sch-event', [-20, 0], null, null, null, true);
        await t.moveCursorTo([1, 1]);
        await t.mouseUp();

        t.selectorNotExists('.b-draghelper-active');
        await t.waitForSelectorNotFound('bryntum-schedulerpro -> .b-draghelper-active');
    });

    t.it('Should show event editor in ShadowRoot´s float root', async t => {
        await t.moveCursorTo([1, 1]);

        createScheduler();
        cmp = document.querySelector('bryntum-schedulerpro');

        await t.doubleClick('bryntum-schedulerpro -> .b-sch-event');

        await t.waitForSelector('bryntum-schedulerpro -> .b-float-root .b-schedulerpro-taskeditor');
    });

    t.it('Should show event tooltip in ShadowRoot´s float root', async t => {
        await t.moveCursorTo([1, 1]);

        createScheduler();
        cmp = document.querySelector('bryntum-schedulerpro');

        await t.waitForSelector('bryntum-schedulerpro -> .b-schedulerpro');
        await t.waitForSelectorNotFound('bryntum-schedulerpro -> .b-mask');

        await t.moveCursorTo('bryntum-schedulerpro -> .b-sch-event');

        await t.waitForSelector('bryntum-schedulerpro -> .b-float-root .b-tooltip');
    });

    t.it('Should handle multiple scheduler web components', async t => {
        createScheduler();
        document.querySelector('bryntum-schedulerpro:nth-child(1)').style.cssText = 'display:block;height:200px;';
        createScheduler();
        document.querySelector('bryntum-schedulerpro:nth-child(2)').style.cssText = 'display:block;height:200px;';

        await t.doubleClick('bryntum-schedulerpro -> .b-sch-event');
        await t.click('bryntum-schedulerpro -> .b-button:textEquals(Save)');

        await t.doubleClick('bryntum-schedulerpro:nth-child(2) -> .b-sch-event');
        await t.click('bryntum-schedulerpro:nth-child(2) -> .b-button:textEquals(Save)');

        t.pass('No crash due to hard coded id´s used');
    });

    t.it('Should show event editor fully, overflowing shadow root, when web component is small', async t => {
        createScheduler();
        cmp = document.querySelector('bryntum-schedulerpro');

        cmp.style.cssText = 'display:block;height:200px;';
        await t.doubleClick('bryntum-schedulerpro -> .b-sch-event');

        await t.waitForSelector('bryntum-schedulerpro -> .b-float-root .b-schedulerpro-taskeditor');

        await t.click('bryntum-schedulerpro -> .b-button:textEquals(Save)');

        await t.waitForSelectorNotFound('bryntum-schedulerpro -> .b-float-root .b-schedulerpro-taskeditor');
    });
});
