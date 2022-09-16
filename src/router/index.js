import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import SearchPlans from '@/views/plans/SearchPlans.vue';
import MyPlans from '@/views/plans/MyPlans.vue';

import About from '@/views/About.vue';
import SignInBanner from '@/views/SignInBanner';
import SignIn from '@/views/SignIn';
import SignUp from '@/views/SignUp';
import NewPlan from '@/views/plans/NewPlan';
import Account from '@/views/account/Account';
import Verify from '@/views/account/Verify';
import PlanDetails from '@/views/plans/PlanDetails';
import Friends from '../views/Friends';
import AttendingPlans from '../views/plans/AttendingPlans';
import AddFriendsModal from '../views/plans/AddFriendsModal';
import Invites from '../views/plans/Invites';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/verify',
    name: 'verify',
    component: Verify,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/sign-in-banner',
    name: 'sign-in-banner',
    component: SignInBanner,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
  },
  {
    path: '/sign-out',
    name: 'sign-out',
  },
  {
    path:
      '/plans/:search?' + ':costFrom?' + ':costTo?' + ':dateFrom?' + ':dateTo?',
    name: 'plans',
    component: SearchPlans,
  },
  {
    path: '/plan/:id',
    name: 'plan-details',
    component: PlanDetails,
    children: [
      {
        path: '/plan/:id/invite-friends',
        name: 'invite-friends',
        component: AddFriendsModal,
      },
    ],
  },
  {
    path: '/my-plans',
    name: 'my-plans',
    component: MyPlans,
  },
  {
    path: '/invites',
    name: 'invites',
    component: Invites,
  },
  {
    path: '/attending-plans',
    name: 'attending-plans',
    component: AttendingPlans,
  },
  {
    path: '/new',
    name: 'new-plan',
    component: NewPlan,
  },
  {
    path: '/friends',
    name: 'friends',
    component: Friends,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
