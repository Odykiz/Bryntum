class LineItem extends GridRowModel {
    static fields = [
        'name',
        'quantity',
        { name : 'price', type : 'number' }
    ];

    // Computed field that sums up the lines total price
    get total() {
        return this.price * this.quantity;
    }
}

class Order extends GridRowModel {
    static fields = [
        { name : 'date', type : 'date' },
        // This is the field from which the expanded LineItemGrid will get its data
        // The type "store" means that this field has a number of records in itself
        { name : 'details', type : 'store', storeClass : Store, modelClass : LineItem }
    ];

    // Computed field that sums up the order total
    get total() {
        return this.details?.sum('total') || 0;
    }
}

const detailsGridConfig = {
    type          : 'grid',
    // The Grid will adjust its height to fit all rows
    autoHeight    : true,
    selectionMode : {
        // Adds a checkbox column that lets the user select rows
        checkbox     : true,
        // Adds a checkbox to the checkbox column header that lets the user check/uncheck all rows
        showCheckAll : true
    },
    columns : [
        {
            // A template column that renders an icon next to the product name
            type     : 'template',
            text     : 'Product',
            field    : 'name',
            flex     : 3,
            template : ({ record }) => `<i class="${record.icon} b-fa-fw" style="margin-right:.5em"></i>${record.name}`
        },
        {
            // A widget column that lets the user increase and decrease the quantity value
            type  : 'number',
            text  : 'Quantity',
            field : 'quantity',
            width : 150
        },
        {
            text   : 'Price',
            type   : 'number',
            field  : 'price',
            width  : 100,
            format : {
                style    : 'currency',
                currency : 'USD'
            }
        },
        {
            type    : 'action',
            width   : 40,
            actions : [{
                cls     : 'b-fa b-fa-trash',
                tooltip : 'Delete item',
                onClick : async({ record }) => {
                    if (await MessageDialog.confirm({
                        title   : 'Please confirm',
                        message : 'Delete this line item?'
                    }) === MessageDialog.yesButton) {
                        record.remove();
                    }
                }
            }]
        }
    ]
};

const grid = new Grid({
    appendTo : targetElement,
    height   : 400,
    store    : {
        modelClass : Order
    },
    features : {
        // Enable the feature
        rowExpander : {
            dataField : 'details',
            widget    : detailsGridConfig
        }
    },

    columns : [
        { field : 'id', text : 'Order', flex : 1 },
        { field : 'date', text : 'Date', type : 'date', flex : 1 },
        {
            type   : 'number',
            field  : 'total',
            text   : 'Total',
            align  : 'right',
            width  : 100,
            format : {
                style    : 'currency',
                currency : 'USD'
            }
        }
    ],

    data : [
        {
            id      : '123456',
            date    : '2022-12-10',
            details : [
                { id : 111, name : 'Milk', icon : 'b-fa b-fa-cow', quantity : 2, price : 1.99 },
                { id : 112, name : 'Bread', icon : 'b-fa b-fa-bread-slice', quantity : 1, price : 2.49 },
                { id : 113, name : 'Eggs', icon : 'b-fa b-fa-egg', quantity : 4, price : 0.99 },
                { id : 114, name : 'Apples', icon : 'b-fa b-fa-apple-whole', quantity : 3, price : 0.69 }
            ]
        },
        {
            id      : '4368943',
            date    : '2022-12-22',
            details : [
                { id : 122, name : 'Rice', icon : 'b-fa b-fa-bowl-rice', quantity : 2, price : 3.49 },
                { id : 124, name : 'Lemons', icon : 'b-fa b-fa-lemon', quantity : 1, price : 0.69 },
                { id : 121, name : 'Peppers', icon : 'b-fa b-fa-pepper-hot', quantity : 4, price : 2.99 },
                { id : 123, name : 'Cookies', icon : 'b-fa b-fa-cookie-bite', quantity : 3, price : 1.99 }
            ]
        },
        {
            id      : '789012',
            date    : '2022-12-12',
            details : [
                { id : 211, name : 'Chicken', icon : 'b-fa b-fa-drumstick-bite', quantity : 2, price : 4.99 },
                { id : 212, name : 'Carrots', icon : 'b-fa b-fa-carrot', quantity : 1, price : 1.49 },
                { id : 213, name : 'Wine', icon : 'b-fa b-fa-wine-bottle', quantity : 4, price : 2.99 },
                { id : 214, name : 'Cheese', icon : 'b-fa b-fa-cheese', quantity : 3, price : 3.49 },
                { id : 215, name : 'Bottled Water', icon : 'b-fa b-fa-bottle-water', quantity : 5, price : 0.99 }
            ]
        }
    ]
});

grid.features.rowExpander.expand(grid.store.first);
