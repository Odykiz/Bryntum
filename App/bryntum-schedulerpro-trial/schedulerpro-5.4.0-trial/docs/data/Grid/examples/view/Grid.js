// grid with basic configuration
const grid = new Grid({
    // makes grid as high as it needs to be to fit rows
    autoHeight    : true,
    appendTo      : targetElement,
    selectionMode : {
        row          : true,
        checkbox     : { region : 'locked' },
        showCheckAll : true
    },
    columns : [
        { text : 'Id', field : 'id', width : 40, editor : false },
        {
            id           : 'contact',
            text         : 'Contact',
            collapsible  : true,
            collapsed    : true,
            // This will toggle the hidden state for all children, to allow you to show a different column in
            // collapsed mode
            collapseMode : 'toggleAll',

            children : [
                { text : 'First name', field : 'firstName', width : 150 },
                { text : 'Surname', field : 'surName', width : 150 },
                // This column is hidden by default, shown only when collapsing the parent column
                { text : 'Name', width : 150, renderer : ({ record }) => `${record.firstName} ${record.surName}`, hidden : true }
            ]
        },
        {
            id       : 'other',
            text     : 'Other info (not collapsible)',
            // Not collapsible, the default
            children : [
                { text : 'Rating', field : 'rating', width : 100 },
                { type : 'percent', text : 'Percent done', field : 'percent', width : 120 },
                {
                    text    : 'Slider column',
                    type    : 'widget',
                    width   : 120,
                    cls     : 'slidercell',
                    widgets : [
                        {
                            type        : 'slider',
                            name        : 'percent',
                            showValue   : false,
                            showTooltip : true
                        }
                    ]
                },
                {
                    text     : 'A link',
                    type     : 'template',
                    editor   : false,
                    template : () => `<a href="//www.bryntum.com" target="_blank">Click me</a>`
                },
                { type : 'date', text : 'Time', format : 'HH:mm', field : 'time', width : 80 },
                { text : 'Age', field : 'age', width : 60 }
            ]
        },
        { text : 'Notes', field : 'notes' }
    ],

    data : DataGenerator.generateData(20)
});
