import { createRouter, createWebHistory } from 'vue-router';
import EventsPage from '../pages/EventsPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import { store } from '../store/index';

const baseURL = import.meta.env.BASE_URL;

const routes = [
  {
    path: '/',
    name: 'EventsPage',
    component: EventsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
];

const router = createRouter({
  history: createWebHistory(baseURL),
  routes,
});

// middleware
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.getters['auth/isAuthenticated'];

  if (to.meta.requiresAuth && !isAuthenticated) {
    // если маршрут требует авторизацию, а пользователь не авторизован
    next({ path: '/login' });
  } else {
    next(); // иначе разрешаем переход
  }
});

export default router;
