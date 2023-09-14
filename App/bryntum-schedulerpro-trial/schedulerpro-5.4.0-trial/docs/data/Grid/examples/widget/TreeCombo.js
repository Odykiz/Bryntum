new TreeCombo({
    label    : 'Choose tasks with a TreeGrid picker',
    width    : '45em',
    appendTo : targetElement,
    value    : [1],
    picker   : {
        columns : [
            { type : 'tree', text : 'Tasks', field : 'name', flex : 1 },
            { type : 'percent', text : '% Done', field : 'percentDone', width : 130 },
            { text : 'Priority', field : 'prio' }
        ]
    },
    chipView : {
        itemTpl(record) {
            return StringHelper.xss`${record.name}`;
        }
    },
    store : {
        fields : [
            'prio',
            'percentDone'
        ],
        data : [
            {
                name     : 'Development Tasks',
                expanded : true,
                children : [
                    { id : 1, name : 'Improve React docs', prio : 'High', percentDone : '75' },
                    { id : 2, name : 'Build Angular module', prio : 'Low', percentDone : '100' },
                    { id : 3, name : 'Create Vue project', prio : 'Low', percentDone : '50' }
                ]
            },
            { name : 'Customer meeting', prio : 'Normal' },
            {
                name     : 'Customer Tasks',
                expanded : true,
                children : [
                    { id : 4, name : 'Intro meeting', prio : 'Normal', percentDone : '75' },
                    { id : 5, name : 'Build POC', prio : 'High', percentDone : '50' },
                    { id : 6, name : 'Documentation', prio : 'Low', percentDone : '25' }
                ]
            }
        ]
    }
});
