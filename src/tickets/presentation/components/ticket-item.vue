<script setup>
import { toRefs } from "vue";
import {Ticket} from "../../domain/model/ticket.entity.js";

const props = defineProps({ ticket: { type: Object, required: true } });
const { ticket } = toRefs(props);


</script>

<template>


  <pv-card>
    <template #content>
      <h3> ticket-id: {{ ticket.id_ticket }}</h3>
      <h3> ticket-event-id: {{ ticket.id_event }}</h3>
      <h3> ticket-customer-id: {{ ticket.id_customer  }}</h3>
      <h3> ticket-payment-id: {{ ticket.id_payment }}</h3>
      <h3> ticket-row-str : {{ ticket.row_str }}</h3>
      <h3> ticket-seat-number: {{ ticket.seat_number }}</h3>
      <h3> ticket-price: {{ ticket.price }}</h3>
      <h3> ticket-status: {{ ticket.status }}</h3>
      <h3> ticket-locked-until: {{ ticket.locked_until }}</h3>
    </template>
  </pv-card>

</template>

<style scoped>

</style>