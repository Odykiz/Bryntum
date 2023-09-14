const scheduler = new Scheduler({
    appendTo : targetElement,

    height : '22em',

    startDate : new Date(2022, 4, 1),
    endDate   : new Date(2022, 4, 7),
    mode      : 'vertical',

    resources : [
        { id : 1, name : 'Greta' },
        { id : 2, name : 'Ingrid' }
    ],

    events : [
        { id : 1, resourceId : 1, name : 'Interview', startDate : '2022-05-02', endDate : '2022-05-03' },
        { id : 2, resourceId : 1, name : 'Press meeting', startDate : '2022-05-04', endDate : '2022-05-05' },
        { id : 3, resourceId : 2, name : 'Audition', startDate : '2022-05-03', endDate : '2022-05-05' }
    ],

    features : {
        dependencies   : true,
        dependencyEdit : true
    },

    dependencies : [
        { id : 1, from : 1, to : 2 },
        { id : 2, from : 1, to : 3, fromSide : 'right' }
    ]
});
