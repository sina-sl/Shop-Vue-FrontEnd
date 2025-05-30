import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('./pages/LandingPage.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./pages/AuthPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/DashboardPage.vue'),
    children: [
      // Default child route
      {
        path: '',
        name: 'DashboardOverview', // You might want an overview page or redirect
        redirect: { name: 'UserProfile' }
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('./pages/dashboard/UserProfilePage.vue'),
      },
      {
        path: 'cards',
        name: 'UserCards',
        component: () => import('./pages/dashboard/UserCardsPage.vue'),
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import('./pages/dashboard/UserOrdersPage.vue'),
      },
      {
        path: 'orders/:orderId',
        name: 'OrderDetails',
        component: () => import('./pages/dashboard/OrderDetailsPage.vue'),
        props: true,
      },
      {
        path: 'admin/cards',
        name: 'AdminCardManagement',
        component: () => import('./pages/dashboard/AdminCardManagementPage.vue'),
      },
      {
        path: 'admin/orders',
        name: 'AdminOrders',
        component: () => import('./pages/dashboard/AdminOrdersPage.vue'),
      },
      {
        path: 'admin/users',
        name: 'AdminUserManagement',
        component: () => import('./pages/dashboard/AdminUserManagementPage.vue'),
      },
      {
        path: 'store',
        name: 'CardStore',
        component: () => import('./pages/dashboard/UserCardStorePage.vue'),
      },
    ]
  },
  {
    path: '/verify-payment',
    name: 'PaymentCallback',
    component: () => import('./pages/PaymentCallback.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 