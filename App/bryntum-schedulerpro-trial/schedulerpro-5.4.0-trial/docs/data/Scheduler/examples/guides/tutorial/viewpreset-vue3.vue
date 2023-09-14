<script setup>
import { Toast } from '@bryntum/scheduler'
import { BryntumScheduler } from '@bryntum/scheduler-vue-3'
import { onMounted, ref } from 'vue'
import '@bryntum/scheduler/scheduler.material.css'

// The view preset controls the time axis and its header
const viewPresetConfig = {
    base : 'weekAndDayLetter',

    // Customize the header
    headers : [
        // Week 16 ... on the top level
        {
            unit       : 'week',
            dateFormat : 'Wp'
        },
        // M, T, W ... on the bottom level
        {
            unit       : 'day',
            dateFormat : 'd1'
        }
    ]
};

// Columns in the grid part
const columnsConfig = [
    {
        field : 'name',
        text  : 'Name'
    }, {
        field : 'role',
        text  : 'Role'
    }
];

// CrudManager handles data loading (and syncing, but not in this example)
const crudManagerConfig = {
    loadUrl   : 'data/data.json',
    autoLoad  : true,
    listeners : {
        // Bryntum API listener for the `hasChanges` event, triggered when any store
        // handled by the crud manager has changes
        hasChanges() {
            console.log(this.changes);

            // In a real app you would send the changes to the server here.
            // Then you would call `this.acceptChanges()` to
            // clear local changes.
        }
    }
};

// Handler for @eventClick
function onEventClick({ eventRecord }) {
    Toast.show(`Clicked ${eventRecord.name}`);
}

// Scheduler ref, to be able to reach it in the hook below
const scheduler = ref(null);

onMounted(() => {
    // Programmatic listener
    scheduler.value.instance.value.on({
        beforeEventEdit({ eventRecord })  {
            Toast.show(`Editing ${eventRecord.name}`);
        }
    })
});

</script>

<template>
    <bryntum-scheduler
            ref="scheduler"
            :width="800"
            :height="600"
            start-date="2023-04-16"
            end-date="2023-05-15"
            :stripe-feature="true"
            :view-preset="viewPresetConfig"
            :columns="columnsConfig"
            :crud-manager="crudManagerConfig"
            @event-click="onEventClick"
    ></bryntum-scheduler>
</template>

<style>

</style>

