export default [
  {
    name: 'Master',
    path: '/',
    component: () => import('@/views/layout/Master.vue'),
    redirect: '/clientes',
    children: [
      {
        name: 'clientes',
        path: 'clientes',
        component: () => import('@/views/Clients.vue'),
      },
      {
        name: 'produtos',
        path: 'produtos',
        component: () => import('@/views/Products.vue'),
      },
      {
        name: 'pedidos',
        path: 'pedidos',
        component: () => import('@/views/Orders.vue'),
      },
    ],
  },
];
