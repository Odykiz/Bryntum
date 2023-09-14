targetElement.innerHTML = '<p>Right click a resource header cell to display the context menu</p>';
const scheduler = new Scheduler({
    appendTo          : targetElement,
    mode              : 'vertical',
    // makes scheduler as high as it needs to be to fit rows
    height            : 600,
    resourceImagePath : 'data/Scheduler/images/users/',

    features : {
        resourceMenu : {
            items : {
                // We add an extra item to the resoure menu
                add : {
                    text   : 'Add resource',
                    icon   : 'b-fa b-fa-plus',
                    onItem : ({ resourceRecord }) => scheduler.resourceStore.insert(scheduler.resourceStore.indexOf(resourceRecord), {
                        name : 'John Doe'
                    })
                }
            }
        }
    },

    startDate  : new Date(2023, 4, 8, 8),
    endDate    : new Date(2023, 4, 8, 20),
    viewPreset : 'hourAndDay',

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    resources : [
        { id : 1, name : 'Arnold Smith', image : 'arnold.jpg', eventColor : 'yellow' },
        { id : 2, name : 'Gloria Rogers', image : 'gloria.jpg', eventColor : 'blue' },
        { id : 3, name : 'Emilia Miller', eventColor : 'indigo', image : 'emilia.jpg' }
    ],

    events : [
        { id : 1, resourceId : 1, name : 'Interview', startDate : '2023-05-08T09:00:00', endDate : '2023-05-08T11:00:00' },
        { id : 2, resourceId : 2, name : 'Meeting', startDate : '2023-05-08T15:00:00', endDate : '2023-05-08T19:00:00' },
        { id : 3, resourceId : 3, name : 'Conference', startDate : '2023-05-08T09:00:00', endDate : '2023-05-08T17:00:00' }
    ]
});
