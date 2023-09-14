CSSHelper.insertRule('.result .b-sch-event { border-radius : 20px; }');

const scheduler = new SchedulerPro({
    // Where to render to, accepts an element or an element id
    appendTo : targetElement,

    // Only used to allow scoping the custom CSS rule added above
    cls : 'result',

    // Normally sizing would be handled by CSS, but for simplicity
    // we use fixed with and height for the tutorial
    // (commented out since docs browser handle sizing)
    // width : 800,
    height : 250,

    // Dates that the time axis will span
    startDate : '2023-04-16',
    endDate   : '2023-05-15',

    // Event bar look and color
    eventStyle : 'border',
    eventColor : 'indigo',

    // Configure Scheduler Pro features
    features : {
        // Configure the dependencies feature
        dependencies : {
            // Rounded line joints
            radius     : 5,
            // Easier to click on lines
            clickWidth : 5
        }
    },

    // The view preset controls the time axis and its header
    viewPreset : {
        base : 'weekAndDayLetter',

        // Customize the header
        headers : [
            // Week 16 ... on the top level
            {
                unit       : 'week',
                dateFormat : 'Wp'
            },
            // M, T, W ... on the bottom level
            {
                unit       : 'day',
                dateFormat : 'd1'
            }
        ]
    },

    // Columns in the grid part
    columns : [
        {
            field : 'name',
            text  : 'Name'
        }, {
            field : 'role',
            text  : 'Role'
        }
    ],

    // The project handles data loading (and syncing, but not in this example)
    project : {
        loadUrl   : 'data/SchedulerPro/examples/guides/tutorial/data.json',
        autoLoad  : true,
        listeners : {
            // Listener for the `hasChanges` event, triggered when any store
            // handled by the project has changes
            hasChanges() {
                console.log(scheduler.project.changes);

                // In a real app you would send the changes to the server here.
                // Then you would call `scheduler.project.acceptChanges()` to
                // clear local changes.
            }
        }
    },

    // Declarative listener
    listeners : {
        eventClick({ eventRecord }) {
            Toast.show(`Clicked ${eventRecord.name}`);
        }
    }
});

// Programmatic listener
scheduler.on('beforeEventEdit', ({ eventRecord }) => {
    Toast.show(`Editing ${eventRecord.name}`);
});
