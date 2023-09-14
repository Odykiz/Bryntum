# Bryntum Grid events in Vue

The Bryntum Grid events are passed up to the Vue wrapper which makes it possible to listen to them the standard
Vue way.

## Listening to events

The following code demonstrates listening to the `cellEdit` event:

Html:

```javascript
<template>
    <div>
        <bryntum-grid
            ref="grid"
            @celledit="onCellEdit"
        />
    </div>
</template>

<script>

import { BryntumGrid } from "@bryntum/grid-vue";

export default {

    name: "Grid App",

    components: { BryntumGrid },

    methods : {
        onCellEdit() {
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
        <bryntum-grid
            ref="grid"
            @beforecelleditstart="onBeforeCellEditStart"
        />
    </div>
</template>

<script>

import { BryntumGrid } from "@bryntum/grid-vue";

export default {

    name: "Grid App",

    components: { BryntumGrid },

    methods : {
        onBeforeCellEditStart() {
            if (someCondition) {
                return false;
            }
        }
   }
}
</script>
```


<p class="last-modified">Last modified on 2023-06-30 9:58:47</p>