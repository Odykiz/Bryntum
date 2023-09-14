const grid = new Grid({
    appendTo   : targetElement,
    autoHeight : true,
    data       : DataGenerator.generateData(3),
    columns    : [
        {
            text         : 'Employee (toggleAll)',
            collapsible  : true,
            collapsed    : true,
            collapseMode : 'toggleAll',
            children     : [
                { text : 'First name', field : 'firstName', flex : 1 },
                { text : 'Surname', field : 'surName', flex : 1 },
                { text : 'Name', field : 'name', flex : 1, hidden : true }
            ]
        },
        {
            text        : 'Other Info (showFirst)',
            collapsible : true,
            children    : [
                { text : 'City', field : 'city', width : 150 },
                { text : 'Notes', field : 'notes', flex : 2 }
            ]
        }
    ]
});
