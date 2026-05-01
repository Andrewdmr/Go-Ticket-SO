<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

const loading = ref(false);
const error = ref(null);

const handleLogin = () => {
  loading.value = true;
  error.value = null;

  setTimeout(() => {
    if (email.value === 'admin@test.com' && password.value === '1234') {
      localStorage.setItem('token', 'fake-token');
      router.push('/tickets');
    } else {
      error.value = 'Credenciales incorrectas';
    }

    loading.value = false;
  }, 1000);
};


onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    router.push('/tickets');
  }
});
</script>
<template>
  <div class="login-wrapper">

    <div class="login-card">
      <h1 class="title">GoTicket</h1>
      <p class="subtitle">Iniciar Sesión</p>

      <form @submit.prevent="handleLogin">

        <div class="input-group">
          <label>Correo</label>
          <input
              v-model="email"
              type="email"
              placeholder="admin@test.com"
              required
          />
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <input
              v-model="password"
              type="password"
              placeholder="********"
              required
          />
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
  background: linear-gradient(135deg, #1e1e2f, #3a3a5a);
}


.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-align: center;
}


.title {
  margin-bottom: 5px;
  color: #1e1e2f;
}

.subtitle {
  margin-bottom: 20px;
  color: gray;
}


.input-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* BOTON */
.btn {
  width: 100%;
  padding: 12px;
  background: #2ea44f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.btn:hover {
  background: #22863a;
}


.error {
  margin-top: 10px;
  color: red;
  font-size: 14px;
}
</style>