import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue';
import Plans from '@/views/Plans.vue';
import About from "@/views/About.vue";
import SignInBanner from "@/views/SignInBanner";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import NewPlan from "@/views/NewPlan";

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
    path: "/sign-in-banner",
    name: "sign-in-banner",
    component: SignInBanner
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp
  },
  {
    path: "/sign-out",
    name: "sign-out"
  },
  {
    path: "/plans/:search?" +
        ":costFrom?" +
        ":costTo?" +
        ":dateFrom?" +
        ":dateTo?",

    name: "plans",
    component: Plans
  },
  {
    path: "/new",
    name: "new-plan",
    component: NewPlan
  }
]

const router = new VueRouter({
  routes
})

export default router
