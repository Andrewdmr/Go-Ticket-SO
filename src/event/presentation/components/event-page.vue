<script setup>

import Layout from "../../../shared/presentation/components/layout.vue";
import {Button as PvButton} from "primevue";
import {useEvents} from "../../application/event-store.js";

const {
  events,
  form,
  saveEvent,
  removeEvent
} = useEvents();

</script>

<template>

  <Layout>

    <!-- HEADER -->
    <div class="header">
      <div>
        <h1>Gestión de Eventos</h1>
        <p>Administra eventos de GoTicket</p>
      </div>
    </div>

    <!-- FORM -->
    <div class="form-card">

      <h2>Nuevo Evento</h2>

      <div class="form-grid">

        <input v-model="form.title" placeholder="Nombre del evento"/>
        <input v-model="form.category" placeholder="Categoría"/>
        <input v-model="form.location" placeholder="Ubicación"/>
        <input v-model="form.date" type="date"/>

        <input v-model="form.price" placeholder="Precio"/>

        <select v-model="form.status">
          <option>ACTIVE</option>
          <option>PENDING</option>
        </select>

      </div>

      <pv-button class="save-btn" @click="saveEvent">
        Crear Evento
      </pv-button>

    </div>

    <!-- EVENTS -->
    <div class="events-grid">
      <pv-card
          v-for="event in events"
          :key="event.id"
          class="event-card"
      >



        <template #title>
          <div class="top">
            <h3>{{ event.title }}</h3>
            <span :class="event.status">{{ event.status }}</span>
          </div>
        </template>


        <template #subtitle>
          <p>{{ event.category }}</p>
        </template>

        <template #content>
          <div class="info">
          <span>
            <i class="pi pi-map-marker"></i>
            {{ event.location }}
          </span>

            <span>
            <i class="pi pi-calendar"></i>
            {{ event.date }}
          </span>
          </div>
        </template>

        <template #footer>
          <div class="bottom">
            <strong>S/ {{ event.price }}</strong>

            <pv-button label="Eliminar" severity="danger" class="delete-btn" @click="removeEvent(event.id)"/>
          </div>
        </template>
      </pv-card>
    </div>

  </Layout>

</template>

<style scoped>
.header {
  margin-bottom: 30px;
}

.header h1  {
  font-size: 30px;
  color: #1f2028;
}

/* FORM */
.form-card {
  background: white;
  padding: 24px;
  border-radius: 18px;

  margin-bottom: 30px;

  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
}

.form-card h2 {
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

input,
select {
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

.save-btn {
  margin-top: 20px;

  border: none;
  padding: 14px 20px;

  border-radius: 12px;

  background: #6366f1;
  color: white;

  cursor: pointer;
}

/* EVENTS */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

.event-card {
  overflow: hidden;
  border-radius: 12px;
}

.event-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active {
  background: #dcfce7;
  color: #166534;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.inactive {
  background: #fee2e2;
  color: #991b1b;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}
</style>