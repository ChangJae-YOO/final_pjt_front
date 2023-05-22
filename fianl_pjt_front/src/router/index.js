import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import SearchView from '../views/SearchView.vue'
import ThemeView from '../views/ThemeView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailView
  },

  {
    path: '/accounts/login',
    name: 'login',
    component: LoginView
  },

  {
    path: '/accounts/signup',
    name: 'signup',
    component: SignUpView
  },

  {
    path: '/search',
    name: 'search',
    component: SearchView
  },

  {
    path: '/theme',
    name: 'theme',
    component: ThemeView
  },
  
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
