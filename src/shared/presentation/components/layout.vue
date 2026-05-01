<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
};
</script>

<template>
  <div class="layout">

    <aside class="sidebar">
      <h2>GoTicket</h2>

      <nav>
        <button @click="$router.push(VITE_TICKET_ENDPOINTS)">
          Tickets
        </button>
      </nav>

      <button class="logout" @click="logout">
        Cerrar sesión
      </button>
    </aside>

    <main class="content">
      <slot />
    </main>

  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1e1e2f;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.logout {
  background: crimson;
  color: white;
  border: none;
}

.content {
  flex: 1;
  padding: 20px;
  background: #f4f4f4;
}
</style>