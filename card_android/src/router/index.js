import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/homebox.vue'
// import Home from '../views/Home.vue'
// import finance from '../views/finance.vue'
// import user from '../views/user.vue'
import Login from '../views/login.vue'
import resume from '../views/resume.vue'
import forgot from '../views/forgot.vue'
import register from '../views/register.vue'
import balance from '../views/balance.vue'
import rechargelist from '../views/rechargelist.vue'
import recharge from '../views/recharge.vue'
import set from '../views/set.vue'
import limit from '../views/limit.vue'
import consume from '../views/consume.vue'
import consumedetail from '../views/consumedetail.vue'
import opencard from '../views/opencard.vue'
import setpwdl from '../views/setpwdl.vue'
import setpaypwd from '../views/setpaypwd.vue'
import forgotpaypwd from '../views/setforgotpaypwd.vue'
import stureg from '../views/stureg.vue'

import setpwd from '../views/setpwd.vue'

import error from '../views/error.vue'

import message from '../views/message'
import stuset from '../views/stuset'
import wxsign from '../views/wxsign'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/finance',
  //   name: 'finance',
  //   component: finance
  // },
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: user
  // },
  {
    path: '/wxsign',
    name: 'wxsign',
    component: wxsign
  },

  {
    path: '/message',
    name: 'message',
    component: message
  },

  {
    path: '/stuset',
    name: 'stuset',
    component: stuset
  },

  {
    path: '/balance',
    name: 'balance',
    component: balance
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: recharge
  },
  {
    path: '/rechargelist',
    name: 'rechargelist',
    component: rechargelist
  },
  {
    path: '/limit',
    name: 'limit',
    component: limit
  },
  {
    path: '/consume',
    name: 'consume',
    component: consume
  },
  {
    path: '/consumedetail',
    name: 'consumedetail',
    component: consumedetail
  },
  {
    path: '/opencard',
    name: 'opencard',
    component: opencard
  },
  {
    path: '/set',
    name: 'set',
    component: set
  },
  {
    path: '/setpwdl',
    name: 'setpwdl',
    component: setpwdl
  },
  {
    path: '/setpaypwd',
    name: 'setpaypwd',
    component: setpaypwd
  },
  {
    path: '/forgotpaypwd',
    name: 'forgotpaypwd',
    component: forgotpaypwd
  },
  {
    path: '/stureg',
    name: 'stureg',
    component: stureg
  },


  {
    path: '/setpwd',
    name: 'setpwd',
    component: setpwd
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/resume',
    name: 'resume',
    component: resume
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: forgot
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '*',
    name: 'error',
    component: error
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
