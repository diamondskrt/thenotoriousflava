import { RouteRecordRaw } from 'vue-router';
import IndexPage from 'pages/IndexPage.vue';
import AuthPage from 'pages/AuthPage.vue';
import AdminPage from 'pages/AdminPage.vue';
import ErrorNotFoundPage from 'pages/ErrorNotFoundPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: IndexPage }],
  },
  {
    path: '/auth',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{ path: '', component: AuthPage }],
  },
  {
    path: '/admin',
    meta: {
      auth: true,
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: AdminPage }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFoundPage,
  },
];

export default routes;
