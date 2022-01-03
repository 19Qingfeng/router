import Vue from 'vue';
// import VueRouter from 'vue-router';
import VueRouter from '../vue-router/index';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
// 子路由
import Home1 from '../views/home-children/home1.vue';
import Home2 from '../views/home-children/home2.vue';
import About1 from '../views/about-children/about1.vue';
import About2 from '../views/about-children/about2.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'home1',
        name: 'Home1',
        component: Home1,
      },
      {
        path: 'home2',
        name: 'Home2',
        component: Home2,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'about1',
        name: 'About1',
        component: About1,
      },
      {
        path: 'about2',
        name: 'About2',
        component: About2,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
