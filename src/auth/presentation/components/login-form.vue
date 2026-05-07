<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const role = ref('cliente');

const loading = ref(false);
const error = ref(null);

const handleLogin = () => {
  loading.value = true;
  error.value = null;

  setTimeout(() => {

    //LOGIN ADMIN
    if (
        role.value === 'admin' &&
        email.value === 'admin@test.com' &&
        password.value === '1234'
    ) {
      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('role', 'admin');
      router.push('/admin'); // cambia a tu ruta real
    }

    //LOGIN CLIENTE
    else if (
        role.value === 'cliente' &&
        email.value === 'cliente@test.com' &&
        password.value === '1234'
    ) {
      localStorage.setItem('token', 'cliente-token');
      localStorage.setItem('role', 'cliente');
      router.push('/tickets');
    }

    else {
      error.value = 'Credenciales incorrectas';
    }

    loading.value = false;
  }, 1000);
};

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const roleSaved = localStorage.getItem('role');

    if (roleSaved === 'admin') {
      router.push('/admin');
    } else {
      router.push('/tickets');
    }
  }
});
</script>
<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1 class="title">GoTicket</h1>
      <p class="subtitle">
        {{ role === 'admin' ? 'Panel de administración' : 'Acceso de cliente' }}
      </p>

      <form @submit.prevent="handleLogin">

        <!--  SELECTOR DE ROL -->
        <div class="role-selector">
          <button type="button" :class="{ active: role === 'admin' }" @click="role = 'admin'">
            Admin
          </button>

          <button type="button" :class="{ active: role === 'cliente' }" @click="role = 'cliente'">
            Cliente
          </button>
        </div>

        <div class="input-group">
          <label>Correo</label>
          <input v-model="email" type="email" placeholder="correo@test.com" required />
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <input v-model="password" type="password" placeholder="********" required />
        </div>

        <button class="btn" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>

        <p v-if="error" class="error">
          {{ error }}
        </p>

      </form>
    </div>
  </div>
</template>

<style scoped>

.login-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111827;
  font-family: 'Inter', sans-serif;
}

/* CARD */
.login-card {
  background: rgba(255,255,255,0.95);
  padding: 40px;
  border-radius: 20px;
  width: 340px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.12);
  text-align: center;
  color: #111827;
  border: 1px solid #e5e7eb;
}

/* TITULOS */
.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
}

.subtitle {
  margin-bottom: 25px;
  color: #6b7280;
}

/* INPUTS */
.input-group {
  text-align: left;
  margin-bottom: 18px;
}

label {
  font-size: 14px;
  margin-bottom: 6px;
  display: block;
  color: #374151;
}

input {
  width: 100%;
  padding: 13px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  outline: none;
  background: #f9fafb;
  color: #111827;
  transition: 0.3s;
}

input:focus {
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 4px rgba(99,102,241,0.15);
}

/* BOTON */
.btn {
  width: 100%;
  padding: 13px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background: #08060d;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

/* SELECTOR */
.role-selector {
  display: flex;
  margin-bottom: 20px;
  background: #f3f4f6;
  border-radius: 10px;
  overflow: hidden;
}

.role-selector button {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: 0.3s;
}

.role-selector button.active {
  background: white;
  color: #4f46e5;
  font-weight: 600;
}
</style>