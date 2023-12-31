targetElement.innerHTML = '<p>Right click an event bar to display a context menu:</p>';
const scheduler = new Scheduler({
    appendTo : targetElement,

    // makes scheduler as high as it needs to be to fit rows
    autoHeight : true,

    features : {
        eventMenu : {
            items : {
                duplicate : {
                    text   : 'Duplicate',
                    weight : 200,
                    icon   : 'b-fa b-fa-fw b-fa-copy',
                    onItem({ item, eventRecord }) {
                        scheduler.eventStore.add(eventRecord.copy());
                    }
                }
            }
        }
    },

    startDate : new Date(2018, 4, 6),
    endDate   : new Date(2018, 4, 13),

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    resources : [
        { id : 1, name : 'Bernard' },
        { id : 2, name : 'Bianca' }
    ],

    events : [
        { id : 1, resourceId : 1, name : 'Interview', startDate : '2018-05-07', endDate : '2018-05-10' },
        { id : 2, resourceId : 2, name : 'Meeting', startDate : '2018-05-10', endDate : '2018-05-12' },
        { id : 3, resourceId : 2, name : 'Future task', startDate : '2018-06-10', endDate : '2018-06-12' }
    ]
});
