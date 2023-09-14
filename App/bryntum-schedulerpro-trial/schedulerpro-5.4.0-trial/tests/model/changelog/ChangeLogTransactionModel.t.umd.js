
StartTest(t => {

    t.it('Describes one task edit', t => {
        const txn = new ChangeLogTransactionModel({
            actions : [
                { actionType : 'update', entity : { type : 'TaskModel', id : 1, name : 'My Task' } }
            ]
        });
        t.is(txn.description, 'Changed 1 task');
    });

    t.it('Describes multiple task edits', t => {
        const txn = new ChangeLogTransactionModel({
            actions : [
                { actionType : 'update', entity : { type : 'TaskModel', id : 1, name : 'My Task' } },
                { actionType : 'update', entity : { type : 'TaskModel', id : 2, name : 'My Task 2' } }
            ]
        });
        t.is(txn.description, 'Changed 2 tasks');
    });

    t.it('Describes multiple action types on single task', t => {
        const txn = new ChangeLogTransactionModel({
            actions : [
                { actionType : 'update', entity : { type : 'TaskModel', id : 1, name : 'My Task' } },
                { actionType : 'remove', entity : { type : 'TaskModel', id : 1, name : 'My Task' } }
            ]
        });
        t.is(txn.description, 'Changed 1 task');
    });

    t.it('Describes edits on different object types', t => {
        const txn = new ChangeLogTransactionModel({
            actions : [
                { actionType : 'update', entity : { type : 'TaskModel', id : 1, name : 'My Task' } },
                { actionType : 'update', entity : { type : 'DependencyModel', id : 1, name : 'My Link' } }
            ]
        });
        t.is(txn.description, 'Changed 2 objects');
    });

    t.it('Describes multiple action types on different object types', t => {
        const txn = new ChangeLogTransactionModel({
            actions : [
                { actionType : 'update', entity : { type : 'TaskModel', id : 1, name : 'My Task' } },
                { actionType : 'remove', entity : { type : 'DependencyModel', id : 1, name : 'My Link' } }
            ]
        });
        t.is(txn.description, 'Changed 2 objects');
    });

    t.it('Provides fallback description for unknown entities', t => {
        const txn = new ChangeLogTransactionModel({
            actions : [
                { actionType : 'add', entity : { type : 'FooBarModel', id : 1, name : 'My FooBar' } }
            ]
        });
        t.is(txn.description, 'Added 1 object');
    });

    t.it('Overriden description works', t => {
        const txn = new ChangeLogTransactionModel({
            description : 'Opened gateway to new dimension',
            actions     : [
                { actionType : 'update', entity : { type : 'TaskModel', id : 1, name : 'My Task' } }
            ]
        });
        t.is(txn.description, 'Opened gateway to new dimension');
    });

    t.it('Describes empty transaction', t => {
        const txn = new ChangeLogTransactionModel({
            actions : []
        });
        t.is(txn.description, 'No changes');
    });

});
