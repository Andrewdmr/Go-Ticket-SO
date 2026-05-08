<script setup>
import EventPage from './event-page.vue';
import EventCategoriesPage from './event-categories-page.vue';

const role = localStorage.getItem('role');
</script>

<template>
  <EventPage           v-if="role === 'admin'" />
  <EventCategoriesPage v-else />
</template>
