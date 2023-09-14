<script setup>
import '@bryntum/scheduler'
import { BryntumScheduler } from '@bryntum/scheduler-vue-3'
import '@bryntum/scheduler/scheduler.material.css'

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

</script>

<template>
    <bryntum-scheduler
            :width="800"
            :height="600"
            start-date="2023-04-16"
            end-date="2023-05-15"
            :columns="columnsConfig"
            :crudManager="crudManagerConfig"
    ></bryntum-scheduler>
</template>

<style>

</style>

