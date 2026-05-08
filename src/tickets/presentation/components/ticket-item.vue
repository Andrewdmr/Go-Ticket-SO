<script setup>
import { ref, onMounted } from 'vue';
import Layout from "../../../shared/presentation/components/layout.vue";
import { TicketApi } from "../../infrastructure/ticket-api.js";

// PrimeVue
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import {TicketStore} from "../../application/ticket-store.js";

const api = new TicketApi();
const ticketStore = new TicketStore();

const tickets = ref([]);

const form = ref({
  row_str: '',
  seat_number: '',
  price: ''
});



// Guardar ticket
const saveTicket = async () => {
  try {
    await api.createTicket(form.value);
    await loadTickets();

    form.value = {
      row_str: '',
      seat_number: '',
      price: ''
    };
  } catch (err) {
    console.error(err);
  }
};

onMounted(ticketStore.loadTickets());

// Estado con color
const getSeverity = (status) => {
  if (status === 'SOLD') return 'danger';
  if (status === 'AVAILABLE') return 'success';
  if (status === 'RESERVED') return 'warning';
  return 'info';
};
</script>

<template>
  <Layout>
    <div class="dashboard">

      <!-- FORM CARD -->
      <Card class="form-card">
        <template #title>
          🎟️ Registrar Ticket
        </template>

        <template #content>
          <div class="form-grid">

            <InputText v-model="form.row_str" placeholder="Fila (A, B...)" />
            <InputText v-model="form.seat_number" placeholder="Asiento" />
            <InputText v-model="form.price" placeholder="Precio" />

            <Button
                label="Guardar"
                icon="pi pi-save"
                class="p-button-success"
                @click="saveTicket"
            />

          </div>
        </template>
      </Card>

      <!-- TABLE CARD -->
      <Card>
        <template #title>
          📋 Tickets
        </template>

        <template #content>

          <DataTable
              :value="tickets"
              paginator
              :rows="6"
              responsiveLayout="scroll"
              stripedRows
          >

            <Column field="id_ticket" header="ID" />
            <Column field="row_str" header="Fila" />
            <Column field="seat_number" header="Asiento" />
            <Column field="price" header="Precio" />

            <!-- Estado con color -->
            <Column header="Estado">
              <template #body="slotProps">
                <Tag
                    :value="slotProps.data.status"
                    :severity="getSeverity(slotProps.data.status)"
                />
              </template>
            </Column>

          </DataTable>

        </template>
      </Card>

    </div>
  </Layout>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: 20px;
}

/* CARD FORM */
.form-card {
  max-width: 500px;
}

/* GRID FORM */
.form-grid {
  display: grid;
  gap: 12px;
}

/* MEJORA VISUAL GLOBAL */
:deep(.p-card) {
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

:deep(.p-datatable) {
  border-radius: 12px;
}
</style>