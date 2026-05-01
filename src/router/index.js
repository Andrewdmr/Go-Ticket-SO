import { createRouter, createWebHistory } from 'vue-router';

import LoginForm from '../auth/presentation/components/login-form.vue';
import TicketItem from "../tickets/presentation/components/ticket-item.vue";
const routes = [
    { path: '/', component: LoginForm },
    { path: '/tickets', component: TicketItem }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// proteccion
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.path === '/tickets' && !token) {
        next('/');
    } else {
        next();
    }
});

export { router };