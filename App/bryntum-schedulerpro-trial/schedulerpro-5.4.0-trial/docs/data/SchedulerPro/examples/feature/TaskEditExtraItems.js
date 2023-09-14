const schedulerPro = new SchedulerPro({
    appendTo : targetElement,
    flex     : '1 0 100%',
    // Project contains all the data and is responsible for correct scheduling
    project  : {
        eventsData : [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    {
                        id        : 2,
                        name      : 'Proof-read docs',
                        startDate : '2017-01-02',
                        endDate   : '2017-01-05',
                        effort    : 0
                    },
                    { id : 3, name : 'Release docs', startDate : '2017-01-09', endDate : '2017-01-10', effort : 0 }
                ]
            }
        ],

        resourcesData : [
            { id : 1, name : 'Albert' },
            { id : 2, name : 'Bill' }
        ],

        assignmentsData : [
            { event : 2, resource : 1 },
            { event : 3, resource : 2 }
        ]
    },
    startDate : new Date(2016, 11, 31),
    endDate   : new Date(2017, 0, 11),
    height    : 250,
    features  : {
        taskEdit : {
            items : {
                // add some UI-elements to "General" tab
                generalTab : {
                    items : {
                        customDivider : {
                            html   : '',
                            weight : 610,
                            flex   : '1 0 100%'
                        },
                        // text input field
                        milestoneField : {
                            type     : 'text',
                            weight   : 611,
                            readOnly : true,
                            editable : false,
                            label    : 'My field',
                            name     : 'milestone',
                            flex     : '1 0 50%'
                        },
                        // a button
                        customButton : {
                            type   : 'button',
                            weight : 612,
                            text   : 'Button',
                            flex   : '1 0 50%'
                        }
                    }
                },
                // hide "Notes" tab
                notesTab : false
            }
        }
    },
    columns : [
        { field : 'name', text : 'Name' }
    ]
});
