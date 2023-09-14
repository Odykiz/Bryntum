const scheduler = new Scheduler({
    appendTo : targetElement,

    autoHeight : true,

    startDate : new Date(2023, 0, 1),
    endDate   : new Date(2023, 0, 8),

    columns : [
        { field : 'name', text : 'Name', width : 170, type : 'tree' },
        { field : 'strength', text : 'Strength', width : 70 },
        { field : 'gender', text : 'Gender', width : 70 }
    ],

    resourceStore : {
        fields : ['strength', 'gender'],
        tree   : true,
        data   : [
            {
                id       : 100,
                name     : 'Younglings',
                expanded : true,
                children : [
                    { id : 1, name : 'Jennifer Walters', strength : 80, gender : 'Female' },
                    { id : 2, name : 'Peter Parker', strength : 60, gender : 'Male' },
                    { id : 3, name : 'Natasha Romanova', strength : 20, gender : 'Female' }
                ]
            },
            {
                id       : 101,
                name     : 'Elders',
                expanded : true,
                children : [
                    { id : 4, name : 'Bruce Banner', strength : 100, gender : 'Male' },
                    { id : 5, name : 'Tony Stark', strength : 10, gender : 'Male' },
                    { id : 6, name : 'Steve Rogers', strength : 50, gender : 'Male' }
                ]
            }
        ]
    },

    events : [
        { id : 1, name : 'Court', startDate : '2023-01-02', duration : 3, resourceId : 1 },
        { id : 2, name : 'Do Science', startDate : '2023-01-04', duration : 3, resourceId : 2 },
        { id : 3, name : 'Parkour', startDate : '2023-01-03', duration : 4, resourceId : 3 },
        { id : 4, name : 'Anger management', startDate : '2023-01-02', duration : 5, resourceId : 4 },
        { id : 5, name : 'Investment meetings', startDate : '2023-01-03', duration : 3, resourceId : 5 },
        { id : 6, name : 'Catch up', startDate : '2023-01-02', duration : 2, resourceId : 6 },
        { id : 7, name : 'Inspire', startDate : '2023-01-05', duration : 2, resourceId : 6 }
    ],

    features : {
        tree      : true,
        treeGroup : true,
        group     : false
    },

    tbar : [
        {
            type        : 'buttonGroup',
            toggleGroup : true,
            items       : [
                {
                    text    : 'No grouping',
                    pressed : true,
                    onClick() {
                        scheduler.clearGroups();
                    }
                },
                {
                    text : 'Gender',
                    onClick() {
                        scheduler.group(['gender']);
                    }
                },
                {
                    text : 'Strength',
                    onClick() {
                        scheduler.group([r => r.strength >= 50 ? 'Strong' : 'Weak']);
                    }
                },
                {
                    text : 'Gender & Strength',
                    onClick() {
                        scheduler.group(['gender', r => r.strength >= 50 ? 'Strong' : 'Weak']);
                    }
                }
            ]
        }
    ]
});
