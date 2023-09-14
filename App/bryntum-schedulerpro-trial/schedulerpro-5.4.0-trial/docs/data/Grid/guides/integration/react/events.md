# BryntumGrid events in React

## Listening to events

The conventional React way is used to listen to Bryntum Grid events. For example, if we want to listen
to `cellEdit` event we pass the listener function to `onCellEdit` property. The property name must be in camel 
case and is case sensitive.

```javascript
const cellEditHandler = useCallback(({ selection }) => {
    console.log(selection); // actual logic comes here
});

// ...

return (
    <BryntumGrid
        onCellEdit={cellEditHandler}
        // other properties
    />
)
```

## Preventable events

By returning `false` from a listener for an event documented as `preventable` the action that would otherwise be
executed after the event is prevented. These events names are usually prefixed with `before`.

For example:

```javascript
const App = props => {
    function onBeforeCellEditStart() {
        if (someCondition) {
            return false;
        }
    }

    return (
        <>
            <BryntumGrid
                onBeforeCellEditStart={onBeforeCellEditStart}
            />
        </>
    )
}
```

## Using dataChange event to synchronize data

Bryntum Grid keeps all data in its stores which are automatically synchronized with the UI and the user actions.
Nevertheless, it is sometimes necessary for the rest of the application to be informed about data changes. For that
it is easiest to use `dataChange` event.

```javascript
const App = props => {
    const syncData = ({ store, action, records }) => {
        console.log(`${store.id} changed. The action was: ${action}. Changed records: `, records);
        // Your sync data logic comes here
    }

    return (
        <BryntumGrid
            ref={gridRef}
            {...gridConfig}
            onDataChange={syncData}
        />
    )
}
```

You can find details of all events that are fired by `BryntumGrid` in
the [API documentation](https://bryntum.com/products/grid/docs/api/Grid/view/Grid#events).


<p class="last-modified">Last modified on 2023-06-30 9:58:47</p>