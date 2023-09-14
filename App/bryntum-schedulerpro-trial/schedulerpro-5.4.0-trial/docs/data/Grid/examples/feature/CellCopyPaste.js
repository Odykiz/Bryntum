targetElement.innerHTML = '<p>Cut, copy and paste cells or ranges of cells using keyboard shortcuts or context menu:</p>';

// grid with basic configuration
const grid = new Grid({
    // makes grid as high as it needs to be to fit rows
    autoHeight : true,
    appendTo   : targetElement,
    features   : {
        rowCopyPaste  : false,
        cellCopyPaste : true
    },
    selectionMode : { cell : true },
    columns       : [
        { field : 'a', text : 'A' },
        { field : 'b', text : 'B' },
        { field : 'c', text : 'C' },
        { field : 'd', text : 'D' },
        { field : 'e', text : 'E' }

    ],

    data : [
        { id : 1, a : 'Date', b : 'Weather', c : 'Produced kWh', d : 'Used kwH', e : 'Comments' },
        { id : 2, a : '2022-01-10', b : 'Sunny -5ºC', c : 22, d : 71 },
        { id : 3, a : '2022-02-10', b : 'Cloudy -3ºC', c : 11, d : 68 },
        { id : 4, a : '2022-03-10', b : 'Snowy 0ºC', c : 7, d : 63 },
        { id : 5, a : '2022-04-10', b : 'Sunshine +5ºC', c : 34, d : 49 },
        { id : 6, a : '2022-05-10', b : 'Rainy +2ºC', c : 13, d : 55 },
        { id : 7, a : '2022-06-10', b : 'Rainy +14ºC', c : 19, d : 31 },
        { id : 8, a : '2022-07-10', b : 'Cloudy +18ºC', c : 21, d : 19 },
        { id : 9, a : '2022-08-10', b : 'Sunshine +30ºC', c : 78, d : 12 },
        { id : 10, a : '2022-09-10', b : 'Sunshine +10ºC', c : 55, d : 19 },
        { id : 11, a : '2022-10-10', b : null, c : null, d : null },
        { id : 12, a : '2022-11-10', b : null, c : null, d : null },
        { id : 13, a : '2022-12-10', b : null, c : null, d : null }
    ]
});
