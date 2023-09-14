# Preventable events

## Preventing events

By returning `false` from a listener for an event documented as `preventable` the action that would otherwise be
executed after the event is prevented. These events names are usually prefixed with `before`.

**Sample code:**

```javascript
onBeforeCellEditStart(event) {
    if (someCondition) {
       return false;
    } 
}
```

## Frameworks integration

Check
[Angular](#Grid/guides/integration/angular/events.md#preventable-events),
[React](#Grid/guides/integration/react/events.md#preventable-events) and 
[Vue](#Grid/guides/integration/vue/events.md#preventable-events) framework integration guides for the details.


<p class="last-modified">Last modified on 2023-06-30 9:58:47</p>