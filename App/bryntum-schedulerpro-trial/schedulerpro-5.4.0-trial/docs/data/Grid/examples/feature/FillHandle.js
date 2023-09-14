targetElement.innerHTML = '<p>Fill range of cells with values computed from current selection</p>';

// grid with basic configuration
const grid = new Grid({
    // makes grid as high as it needs to be to fit rows
    autoHeight : true,
    appendTo   : targetElement,
    features   : {
        fillHandle : true
    },
    selectionMode : {
        cell       : true,
        dragSelect : true
    },
    columns : [
        { field : 'number', text : 'Number', flex : 1, type : 'number' },
        { field : 'text',   text : 'Text',   flex : 1 },
        { field : 'date',   text : 'Date',   flex : 1, type : 'date' },
        { field : 'empty1', text : 'Empty',  flex : 1 },
        { field : 'empty2', text : 'Empty',  flex : 1 }
    ],

    data : [
        { id : 1, number : 1, text : 'Once',   date : new Date(2022, 0, 1), empty1 : null, empty2 : null },
        { id : 2, number : 2, text : 'upon',   date : new Date(2022, 0, 2) },
        { id : 3, number : 3, text : 'a time', date : new Date(2022, 0, 3) },
        { id : 4 },
        { id : 5 },
        { id : 6 },
        { id : 7 },
        { id : 8 },
        { id : 9 }
    ]
});

grid.selectCellRange({ id : 1, column : grid.columns.first }, { id : 3, column : grid.columns.first });
