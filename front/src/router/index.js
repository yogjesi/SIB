import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Income from '@/views/Income.vue'

import Outcome from '@/views/outcome/Outcome.vue'
import OutcomeDetail from '@/views/outcome/OutcomeDetail.vue'
import OutcomeCreate from '@/views/outcome/OutcomeCreate.vue'
import OutcomeUpdate from '@/views/outcome/OutcomeUpdate.vue'

import Board from '@/views/boards/Board.vue'
import Book from '@/views/Book.vue'
import Manager from '@/views/Manager.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/income',
    name: 'Income',
    component: Income
  },
  {
    path: '/outcome',
    name: 'Outcome',
    component: Outcome
  },
  {
    path: '/outcomedetail/:id',
    name: 'OutcomeDetail',
    component: OutcomeDetail
  },
  {
    path: '/outcomecreate',
    name: 'OutcomeCreate',
    component: OutcomeCreate
  },
  {
    path: '/outcomeupdate/:id',
    name: 'OutcomeUpdate',
    component: OutcomeUpdate
  },
  {
    path: '/board',
    name: 'Board',
    component: Board
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
