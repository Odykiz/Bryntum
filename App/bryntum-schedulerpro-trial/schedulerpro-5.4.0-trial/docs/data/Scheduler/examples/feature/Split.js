const scheduler = new Scheduler({
    appendTo : targetElement,

    height : '30em',

    startDate : new Date(2023, 4, 22),
    endDate   : new Date(2023, 5, 30),

    features : {
        split : true
    },

    columns : [
        { field : 'name', text : 'Name', width : 100 }
    ],

    resources : ArrayHelper.populate(50, i => ({ id : i, name : `Resource ${i}` }), true),

    events : ArrayHelper.populate(200, i => ({ id : i, name : `Event ${i}`, resourceId : i % 50, startDate : new Date(2023, 4, 22, i * 12), duration : 4 }), true)
});

scheduler.split({ direction : 'vertical' });
