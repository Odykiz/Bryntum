const grid = new Grid({
    appendTo : targetElement,

    height : 320,

    features : {
        // Enable the feature
        rowExpander : {
            columnPosition : 'last',
            renderer({ record }) {
                return `<div style="padding: 10px"><div style="font-weight: bold;margin-bottom:5px;">Introduction in Latin</div><div style="color:#555">${record.notes} ${record.notes}</div></div>`;
            }
        }
    },

    data : DataGenerator.generateData(15),

    columns : [
        { field : 'firstName', text : 'First name', flex : 1 },
        { field : 'surName', text : 'Surname', flex : 1 },
        { field : 'age', text : 'Age', flex : 1 }
    ]
});

grid.features.rowExpander.expand(grid.store.first);
