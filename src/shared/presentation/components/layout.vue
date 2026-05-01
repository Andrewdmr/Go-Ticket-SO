<script setup>

import TicketItem from "../../../tickets/presentation/components/ticket-item.vue";
import { TicketStore } from "../../../tickets/application/ticket-store.js";
import { onMounted } from "vue";

onMounted(() => { TicketStore.loadTickets(); });

</script>

<template>
  <h1> PC2 Go-Ticket </h1>

  <ticket-item
    v-for="ticket in TicketStore.tickets"
    :ticket="ticket"
  ></ticket-item>
</template>

<style scoped>

</style>