class RowModel extends GridRowModel {
    static fields = [{
        name : 'name',
        type : 'string'
    }, {
        name : 'age',
        type : 'number'
    }, {
        name : 'city',
        type : 'string'
    }, {
        name : 'food',
        type : 'string'
    }];
};

const grid = new Grid({
    height : '30em',

    columns : [{
        text   : 'Name',
        field  : 'name',
        flex   : 2,
        editor : {
            type     : 'textfield',
            required : true
        }
    }, {
        text  : 'Age',
        field : 'age',
        width : 100,
        type  : 'number'
    }, {
        text  : 'City',
        field : 'city',
        flex  : 1
    }, {
        text  : 'Favorite food',
        field : 'food',
        flex  : 1
    }
    ],

    store : new Store({
        modelClass : RowModel,
        data       : DataGenerator.generateData(30)
    }),

    features : {
        filter : {
            isMulti : true
        }
    },

    style : { boxShadow : '0 0 2px rgba(0, 0, 0, 0.2)' }

});

const demo = new Container({
    appendTo : targetElement,
    layout   : 'vbox',
    items    : {
        grid,
        filtersPanel : {
            type     : 'panel',
            title    : 'Filters',
            maxWidth : '30em',
            style    : { marginBlockStart : '1em' },
            items    : {
                filters : {
                    type    : 'gridfieldfilterpickergroup',
                    grid,
                    filters : [{
                        property      : 'name',
                        operator      : 'startsWith',
                        value         : 'M',
                        caseSensitive : false,
                        disabled      : true
                    }, {
                        property : 'food',
                        operator : 'isIncludedIn',
                        value    : ['Bolognese', 'Pancake']
                    }]
                }
            }
        }
    }
});
