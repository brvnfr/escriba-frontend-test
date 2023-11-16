export default [
  {
    name: 'Master',
    path: '/',
    component: () => import('@/views/layout/Master.vue'),
    redirect: '/pessoas',
    children: [
      {
        name: 'pessoas',
        path: 'pessoas',
        component: () => import('@/views/Persons.vue'),
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
