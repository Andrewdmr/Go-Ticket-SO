import { createRouter, createWebHistory } from 'vue-router';

// Vistas
import LoginForm from '../auth/presentation/components/login-form.vue';
import TicketItem from "../tickets/presentation/components/ticket-item.vue";

import AdminPage from "../auth/presentation/components/admin-page.vue";
import EventPage from "../event/presentation/components/event-page.vue";
const routes = [
    { path: '/', component: LoginForm },
    { path: '/tickets', component: TicketItem, meta: { role: 'cliente' }},
    { path: '/admin', component: AdminPage, meta: { role: 'admin' }},
    { path: '/events', component: EventPage, meta: { role: 'admin' }}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


router.beforeEach((to, from, next) => {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    //protection route privated
    if (!token && to.path !== '/') {
        return next('/');
    }

    //validated role
    if (to.meta.role && to.meta.role !== role) {
        return next('/');
    }

    next();
});

export { router };