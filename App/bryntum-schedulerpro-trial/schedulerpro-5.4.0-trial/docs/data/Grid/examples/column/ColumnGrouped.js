const grid = new Grid({
    appendTo   : targetElement,
    autoHeight : true,
    data       : DataGenerator.generateData(3),
    columns    : [
        {
            text     : 'Employee',
            children : [
                { text : 'First name', field : 'firstName', flex : 1 },
                { text : 'Surname', field : 'surName', flex : 1 }
            ]
        },
        {
            text     : 'Other Info',
            children : [
                { text : 'City', field : 'city', width : 150 },
                { text : 'Notes', field : 'notes', flex : 2 }
            ]
        }
    ]
});
