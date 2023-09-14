<script setup>
import '@bryntum/scheduler'
import { BryntumScheduler } from '@bryntum/scheduler-vue-3'
import '@bryntum/scheduler/scheduler.material.css'
</script>

<template>
    <bryntum-scheduler
            :width="800"
            :height="600"
            start-date="2023-04-16"
            end-date="2023-05-15"
    ></bryntum-scheduler>
</template>

<style>

</style>
