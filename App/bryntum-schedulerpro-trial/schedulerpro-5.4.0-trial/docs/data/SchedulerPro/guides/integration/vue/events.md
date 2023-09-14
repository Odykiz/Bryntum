# Bryntum Scheduler Pro events in Vue

The Bryntum Scheduler Pro events are passed up to the Vue wrapper which makes it possible to listen to them the standard
Vue way.

## Listening to events

The following code demonstrates listening to the `eventClick` event:

Html:

```javascript
<template>
    <div>
        <bryntum-scheduler-pro
            ref="schedulerpro"
            @eventclick="onEventClick"
        />
    </div>
</template>

<script>

import { BryntumSchedulerPro } from "@bryntum/schedulerpro-vue";

export default {

    name: "SchedulerPro App",

    components: { BryntumSchedulerPro },

    methods : {
        onEventClick() {
            // Do something
        }
   }
}
</script>
```

Please note that we prefix the capitalized event name with the `on` keyword and that we pass `$event` as
the argument to the listener.

## Preventable events

By returning `false` from a listener for an event documented as `preventable` the action that would otherwise be
executed after the event is prevented. These events names are usually prefixed with `before`.

For example:

```javascript
<template>
    <div>
        <bryntum-scheduler-pro
            ref="schedulerpro"
            @beforeeventedit="onBeforeEventEdit"
        />
    </div>
</template>

<script>

import { BryntumSchedulerPro } from "@bryntum/schedulerpro-vue";

export default {

    name: "SchedulerPro App",

    components: { BryntumSchedulerPro },

    methods : {
        onBeforeEventEdit() {
            if (someCondition) {
                return false;
            }
        }
   }
}
</script>
```


<p class="last-modified">Last modified on 2023-06-30 10:22:39</p>