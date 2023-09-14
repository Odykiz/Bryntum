const
    store = new Store({
        fields : [
            { name : 'name', type : 'string', text : 'Name' },
            { name : 'type', type : 'string', text : 'Type' },
            { name : 'calories', type : 'number', text : 'Calories' }
        ],
        data : [
            { id : 1, name : 'Cheese sticks', type : 'starters', calories : 312 },
            { id : 2, name : 'Fried onion rings', type : 'starters', calories : 234 },
            { id : 3, name : 'Hummus', type : 'starters', calories : 532 },
            { id : 4, name : 'Fried fish', type : 'food', calories : 243 },
            { id : 5, name : 'Pizza', type : 'food', calories : 687 },
            { id : 6, name : 'Hamburger', type : 'food', calories : 734 },
            { id : 7, name : 'Hot dog', type : 'food', calories : 435 },
            { id : 8, name : 'Salad', type : 'food', calories : 112 },
            { id : 9, name : 'Gin tonic', type : 'drinks', calories : 145 },
            { id : 10, name : 'Wine', type : 'drinks', calories : 150 },
            { id : 11, name : 'Soda', type : 'drinks', calories : 205 },
            { id : 12, name : 'Beer', type : 'drinks', calories : 109 }
        ]
    }),
    container = new Container({
        appendTo : targetElement,
        items    : {
            results : {
                type    : 'list',
                store,
                itemTpl : record => `${record.name} (${record.calories} calories)`,
                width   : '30%',
                style   : { marginRight : '1em' }
            },
            picker : {
                type   : 'fieldfilterpicker',
                store,
                fields : store.fields,
                filter : {
                    property : 'calories',
                    operator : '<',
                    value    : '400'
                },
                listeners : {
                    change : ({ filter, isValid }) => isValid && store.filter(filter)
                }
            }
        }
    });
