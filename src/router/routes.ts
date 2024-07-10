const routes = [
    {
        path: '/login',
        name: 'Auth',
        component: () => import('../pages/Auth/Login.vue'),
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('../layout/Layout.vue'),
        children: [
            {
                path: '/usuarios',
                name: 'Usuarios',
                component: () => import('../pages/Admin/CreateUsers/UsersPage.vue'),
                meta:{
                    authorizedRoles: ['Administrador']
                }
            }]
    }
]

export default routes;