import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';

const app = createApp(App);
app.use(PrimeVue);
app.component('pv-card', Card);
app.mount('#app');
