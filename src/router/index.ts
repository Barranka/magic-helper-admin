import { createRouter, createWebHistory } from 'vue-router';
import EventsPage from '../pages/EventsPage.vue';

const baseURL = import.meta.env.BASE_URL

const routes = [
  {
    path: '/',
    name: 'EventsPage',
    component: EventsPage,
  },
];

const router = createRouter({
  history: createWebHistory(baseURL),
  routes,
});

export default router;
