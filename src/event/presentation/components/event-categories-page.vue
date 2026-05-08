<script setup>

import {onMounted} from "vue";
import EventStore from "./EventStore";

const eventStore = new EventStore();

onMounted(() => {eventStore.loadEvents()})
</script>

<template>

</template>

<style scoped>

</style>