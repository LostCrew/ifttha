import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Rules from './Rules.vue'
import Rule from './Rule.vue'
import Settings from './Settings.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'rules',
    component: Rules
  },
  {
    path: '/add-rule',
    name: 'add-rule',
    component: Rule
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory('/popup.html'),
  routes
})

export default router
