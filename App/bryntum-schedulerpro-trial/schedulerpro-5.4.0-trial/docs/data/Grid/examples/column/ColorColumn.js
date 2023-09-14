// grid with ColorColumn
const grid = new Grid({
    appendTo   : targetElement,
    // makes grid as high as it needs to be to fit rows
    autoHeight : true,
    data       : DataGenerator.generateData(5),
    columns    : [
        { field : 'name', text : 'Name', flex : 1 },
        { type : 'color', field : 'color', text : 'ColorColumn', width : 100, colors : DataGenerator.colors }
    ]
});
