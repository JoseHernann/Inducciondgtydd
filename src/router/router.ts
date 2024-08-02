// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { CustomRouteRecordRaw } from '../entities/routerTypes';

const router = createRouter({
    history: createWebHistory(),
    routes: routes as CustomRouteRecordRaw[], // Asegúrate de tipar las rutas correctamente
});

// Guarda de navegación global
router.beforeEach((to, from, next) => {
    const userRole = sessionStorage.getItem('ROL');

    if (to.matched.some(record => record.meta?.authorizedRoles)) {
        const authorizedRoles = to.meta?.authorizedRoles;

        if (authorizedRoles && authorizedRoles.includes(userRole)) {
            next();
        } else {
            next('/login'); // Redirige al login si no tiene acceso
        }
    } else {
        next(); // Si la ruta no requiere roles específicos, permite el acceso
    }
});

export default router;
