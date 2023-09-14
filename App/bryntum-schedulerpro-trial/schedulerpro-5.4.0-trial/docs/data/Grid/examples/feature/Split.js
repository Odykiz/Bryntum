const grid = new Grid({
    appendTo : targetElement,

    height : '30em',

    features : {
        // Enable the Split feature
        split : true
    },

    data : DataGenerator.generateData(50),

    columns : [
        { field : 'firstName', text : 'First name', width : 150 },
        { field : 'surName', text : 'Surname',  width : 150 },
        { field : 'city', text : 'City',  width : 150 },
        { type : 'date', field : 'start', text : 'Start',  width : 150 },
        { type : 'date', field : 'finish', text : 'Finish', width : 150 },
        { type : 'number', field : 'score', text : 'Score',  width : 150 },
        { type : 'number', field : 'age',  text : 'Age', width : 150 },
        { type : 'rating', field : 'rank',  text : 'Rank', width : 150 }
    ]
});

grid.split({ direction : 'vertical' });
