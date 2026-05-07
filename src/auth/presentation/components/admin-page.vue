<script setup>
import Layout from "../../../shared/presentation/components/layout.vue";

// Datos mock temporales
const stats = [
  { title: 'Eventos', value: 12, icon: 'pi pi-calendar'},
  { title: 'Tickets vendidos', value: 248, icon: 'pi pi-ticket'},
  { title: 'Ingresos', value: 'S/ 12,500', icon: 'pi pi-wallet'},
  { title: 'Solicitudes', value: 18, icon: 'pi pi-inbox' }
];

const recentActivity = [
  { user: 'Carlos Ruiz', action: 'Compró 2 tickets', time: 'Hace 5 min'},
  { user: 'Andrea López', action: 'Solicitó nuevo evento', time: 'Hace 15 min'},
  { user: 'Admin', action: 'Actualizó evento', time: 'Hace 1 hora'}
];
</script>

<template>
  <Layout>

    <!-- HEADER -->
    <div class="header">
      <div>
        <h1>Dashboard Admin</h1>
        <p>Bienvenido al panel de administración de GoTicket</p>
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-grid">

      <div
          v-for="item in stats"
          :key="item.title"
          class="stat-card"
      >
        <div>
          <p class="stat-title">{{ item.title }}</p>
          <h2>{{ item.value }}</h2>
        </div>

        <i :class="item.icon"></i>
      </div>

    </div>

    <!-- QUICK ACTIONS -->
    <div class="section">

      <h2>Accesos rápidos</h2>

      <div class="actions-grid">

        <button class="action-btn">
          <i class="pi pi-calendar"></i>
          Eventos
        </button>

        <button class="action-btn">
          <i class="pi pi-wallet"></i>
          Ventas
        </button>

        <button class="action-btn">
          <i class="pi pi-inbox"></i>
          Solicitudes
        </button>

        <button class="action-btn">
          <i class="pi pi-users"></i>
          Usuarios
        </button>

      </div>

    </div>

    <!-- ACTIVITY -->
    <div class="section">

      <h2>Actividad reciente</h2>

      <div class="activity-card">

        <div
            class="activity-item"
            v-for="item in recentActivity"
            :key="item.user"
        >
          <div>
            <strong>{{ item.user }}</strong>
            <p>{{ item.action }}</p>
          </div>

          <span>{{ item.time }}</span>
        </div>

      </div>

    </div>

  </Layout>
</template>

<style scoped>

/* HEADER */
.header {
  margin-bottom: 30px;
}

.header h1 {
  font-size: 32px;
  margin-bottom: 6px;
  color: #111827;
}

.header p {
  color: #6b7280;
}

/* STATS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;

  margin-bottom: 35px;
}

.stat-card {
  background: white;
  border-radius: 18px;
  padding: 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 10px 25px rgba(0,0,0,0.06);

  transition: 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-title {
  color: #6b7280;
  margin-bottom: 8px;
}

.stat-card h2 {
  font-size: 28px;
  color: #111827;
}

.stat-card i {
  font-size: 34px;
  color: #6366f1;
}

/* SECTIONS */
.section {
  margin-top: 30px;
}

.section h2 {
  margin-bottom: 18px;
  color: #111827;
}

/* QUICK ACTIONS */
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 18px;
}

.action-btn {
  border: none;
  border-radius: 16px;

  padding: 24px;

  background: white;

  display: flex;
  flex-direction: column;
  gap: 12px;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  box-shadow: 0 10px 25px rgba(0,0,0,0.06);

  transition: 0.3s;

  font-size: 15px;
  font-weight: 600;
}

.action-btn:hover {
  transform: translateY(-4px);
  background: #6366f1;
  color: white;
}

.action-btn i {
  font-size: 28px;
}

/* ACTIVITY */
.activity-card {
  background: white;
  border-radius: 18px;
  padding: 20px;

  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;

  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item p {
  color: #6b7280;
}

.activity-item span {
  color: #9ca3af;
  font-size: 14px;
}
</style>