// src/router/routes.ts
import { CustomRouteRecordRaw } from '../entities/routerTypes.ts';

const routes: CustomRouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Auth',
        component: () => import('../pages/Auth/Login.vue'),
    },
    {
        path: '/Admin',
        name: 'layout',
        component: () => import('../layout/LayoutAdmin.vue'),
        children: [
            {
                path: '/usuarios',
                name: 'Usuarios',
                component: () => import('../pages/Admin/CreateUsers/UsersPage.vue'),
                meta: {
                    authorizedRoles: ['Administrador'],
                },
            },
        ],
    },
    {
        path: '/User',
        name: 'layout',
        component: () => import('../layout/LayoutUser.vue'),
        children: [
            {
                path: '/exams',
                name: 'Evaluaciones',
                component: () => import('../pages/User/UserExams/ExamPage.vue'),
                meta: {
                    authorizedRoles: ['Usuario'],
                },
            },
        ],
    },
];

export default routes;
