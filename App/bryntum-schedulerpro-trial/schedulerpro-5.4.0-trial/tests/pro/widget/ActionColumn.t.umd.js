
StartTest(t => {

    let schedulerPro;

    t.mockUrl('loadurl', {
        delay        : 500,
        responseText : JSON.stringify({
            success   : true,
            calendars : { rows : [] },
            events    : { rows : [] },
            resources : {
                rows : [
                    {
                        id   : 1,
                        name : 'George'
                    }
                ]
            }
        })
    });

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Should work with ActionColumn column', async t => {
        schedulerPro = new SchedulerPro({
            appendTo   : document.body,
            minHeight  : '20em',
            startDate  : new Date(2019, 0, 1),
            endDate    : new Date(2019, 0, 31),
            viewPreset : 'weekAndMonth',
            rowHeight  : 30,
            barMargin  : 5,

            project : {
                autoLoad  : true,
                transport : {
                    load : {
                        url : 'loadurl'
                    }
                }
            },

            columns : [
                { text : 'Name', field : 'name', width : 130 },
                {
                    type    : 'action',
                    text    : 'Actions',
                    actions : [{
                        cls     : 'b-fa b-fa-fw b-fa-plus',
                        tooltip : 'Add task'
                    }]
                }
            ]
        });

        t.chain(
            { waitForRowsVisible : schedulerPro },
            {
                waitForSelector : '.b-fa-plus',
                desc            : 'Action in action columns is visible'
            }
        );
    });
});
