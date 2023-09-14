const grid = new Grid({
    appendTo : targetElement,

    height : 320,

    features : {
        // Enable the feature
        mergeCells : {
            // Merge cells in all columns
            sortedOnly : false
        }
    },

    data : DataGenerator.generateData(15),

    columns : [
        { field : 'name', text : 'Name', flex : 1 },
        { field : 'color', text : 'Color', flex : 1, mergeCells : true },
        { field : 'food', text : 'Favorite food', flex : 1, mergeCells : true }
    ]
});
