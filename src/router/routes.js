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
        children: [
          {
            name: 'editPerson',
            path: 'edit/:id',
            component: () => import('@/views/EditPerson.vue'), // Rota para edição de pessoa
          },
          {
            name: 'createPerson',
            path: 'create',
            component: () => import('@/views/CreatePerson.vue'), // Rota para criação de pessoa
          },
        ],
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
