<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

const role = localStorage.getItem('role');

/* MENU DINAMICO */
const menuItems = computed(() => {

  // 👑 ADMIN
  if (role === 'admin') {
    return [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        route: '/admin'
      },
      {
        label: 'Eventos',
        icon: 'pi pi-calendar',
        route: '/events'
      },
      {
        label: 'Ventas',
        icon: 'pi pi-wallet',
        route: '/sales'
      },
      {
        label: 'Solicitudes',
        icon: 'pi pi-inbox',
        route: '/requests'
      }
    ];
  }

  // 👤 CLIENTE
  return [
    {
      label: 'Tickets',
      icon: 'pi pi-ticket',
      route: '/tickets'
    }
  ];
});

/* LOGOUT */
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');

  router.push('/');
};
</script>

<template>

  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <!-- LOGO -->
      <div>

        <div class="logo">
          <div class="logo-icon">
            GT
          </div>

          <div>
            <h2>GoTicket</h2>
            <p>
              {{ role === 'admin'
                ? 'Administración'
                : 'Cliente' }}
            </p>
          </div>
        </div>

        <!-- MENU -->
        <nav class="menu">

          <button
              v-for="item in menuItems"
              :key="item.label"
              class="menu-item"
              @click="router.push(item.route)"
          >
            <i :class="item.icon"></i>
            {{ item.label }}
          </button>

        </nav>

      </div>

      <!-- LOGOUT -->
      <button class="logout" @click="logout">
        <i class="pi pi-sign-out"></i>
        Cerrar sesión
      </button>

    </aside>

    <!-- CONTENT -->
    <main class="content">
      <slot />
    </main>

  </div>

</template>

<style scoped>

.layout {
  display: flex;
  min-height: 100vh;
  background: #f5f7fb;
}

/* SIDEBAR */
.sidebar {
  width: 260px;
  background: #111827;

  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 14px;

  margin-bottom: 40px;
}

.logo-icon {
  width: 46px;
  height: 46px;

  border-radius: 12px;

  background: #6366f1;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: bold;
}

.logo h2 {
  color: white;
  font-size: 20px;
}

.logo p {
  color: #9ca3af;
  font-size: 13px;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-item {
  width: 100%;

  padding: 14px 16px;

  border: none;
  border-radius: 12px;

  background: transparent;

  color: #d1d5db;

  display: flex;
  align-items: center;
  gap: 12px;

  cursor: pointer;

  transition: 0.3s;

  font-size: 15px;
}

.menu-item:hover {
  background: #1f2937;
  color: white;
}

/* LOGOUT */
.logout {
  width: 100%;

  padding: 14px;

  border: none;
  border-radius: 12px;

  background: #ef4444;

  color: white;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  transition: 0.3s;
}

.logout:hover {
  background: #dc2626;
}

/* CONTENT */
.content {
  flex: 1;
  padding: 35px;
}
</style>