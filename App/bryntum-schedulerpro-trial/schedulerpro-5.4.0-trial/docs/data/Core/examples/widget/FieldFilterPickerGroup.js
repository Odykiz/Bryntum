const
    store     = new Store({
        fields : [
            { name : 'name', type : 'string' },
            { name : 'type', type : 'string' },
            { name : 'calories', type : 'number' },
            { name : 'icon', type : 'string' }
        ],
        data : [
            { id : 1, name : 'Cheese sticks', type : 'starters', calories : 312, icon : 'cheese' },
            { id : 2, name : 'Fried onion rings', type : 'starters', calories : 234, icon : 'ring' },
            { id : 3, name : 'Hummus', type : 'starters', calories : 532, icon : 'seedling' },
            { id : 4, name : 'Fried fish', type : 'food', calories : 243, icon : 'fish' },
            { id : 5, name : 'Pizza', type : 'food', calories : 687, icon : 'pizza-slice' },
            { id : 6, name : 'Hamburger', type : 'food', calories : 734, icon : 'hamburger' },
            { id : 7, name : 'Hot dog', type : 'food', calories : 435, icon : 'hotdog' },
            { id : 8, name : 'Salad', type : 'food', calories : 112, icon : 'salad' },
            { id : 9, name : 'Gin tonic', type : 'drinks', calories : 145, icon : 'glass-martini' },
            { id : 10, name : 'Wine', type : 'drinks', calories : 150, icon : 'glass-wine' },
            { id : 11, name : 'Soda', type : 'drinks', calories : 205, icon : 'glass-citrus' },
            { id : 12, name : 'Beer', type : 'drinks', calories : 109, icon : 'beer' }
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
            filters : {
                type   : 'container',
                margin : '0 0 0 1em',
                flex   : 1,
                items  : {
                    pickergroup : {
                        type    : 'fieldfilterpickergroup',
                        store,
                        fields  : store.fields,
                        filters : [{
                            property      : 'name',
                            operator      : 'includes',
                            value         : 'fried',
                            caseSensitive : false
                        }]
                    }
                }
            }
        }
    });
