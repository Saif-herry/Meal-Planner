import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import SignUp from './pages/SignUp.vue'
import Home from './pages/Home.vue'
import WeeklyMeal from './pages/WeeklyMeal.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Home },
  { path: '/signup', component: SignUp },
  { path: '/weekly-meal', component: WeeklyMeal }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
