import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import About from "../views/About.vue";
import LoginBanner from "@/views/LoginBanner";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: "/login-banner",
    name: "login-banner",
    component: LoginBanner
  }
]

const router = new VueRouter({
  routes
})

export default router
