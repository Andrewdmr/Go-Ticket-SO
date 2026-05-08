import { createRouter, createWebHistory } from 'vue-router';

// Vistas
import LoginForm from '../auth/presentation/components/login-form.vue';
import TicketItem from "../tickets/presentation/components/ticket-item.vue";
import AdminPage from "../auth/presentation/components/admin-page.vue";
import EventsView from "../event/presentation/components/events-view.vue";

const routes = [
    { path: '/',       component: LoginForm  },
    { path: '/tickets', component: TicketItem },
    { path: '/admin',  component: AdminPage  },
    { path: '/events', component: EventsView },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export { router };