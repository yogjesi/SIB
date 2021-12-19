import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Income from '@/views/Income.vue'
import Outcome from '@/views/Outcome.vue'
import Board from '@/views/boards/Board.vue'
import BoardDetail from '@/views/boards/BoardDetail.vue'
import BoardCreate from '@/views/boards/BoardCreate.vue'
import BoardUpdate from '@/views/boards/BoardUpdate.vue'
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
    path: '/board',
    name: 'Board',
    component: Board
  },
  {
    path: '/board/:boardPk',
    name: 'BoardDetail',
    component: BoardDetail
  },
  {
    path: '/board/create',
    name: 'BoardCreate',
    component: BoardCreate
  },
  {
    path: '/board/update/',
    name: 'BoardUpdate',
    component: BoardUpdate
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
