import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Income from '@/views/income/Income.vue'
import IncomeCreate from '@/views/income/IncomeCreate.vue'
import IncomeDetail from '@/views/income/IncomeDetail.vue'
import IncomeUpdate from '@/views/income/IncomeUpdate.vue'
import Board from '@/views/boards/Board.vue'
import BoardDetail from '@/views/boards/BoardDetail.vue'
import BoardCreate from '@/views/boards/BoardCreate.vue'
import BoardUpdate from '@/views/boards/BoardUpdate.vue'
import Book from '@/views/Book.vue'
import Manager from '@/views/Manager.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Outcome from '@/views/outcome/Outcome.vue'
import OutcomeDetail from '@/views/outcome/OutcomeDetail.vue'
import OutcomeCreate from '@/views/outcome/OutcomeCreate.vue'
import OutcomeUpdate from '@/views/outcome/OutcomeUpdate.vue'
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
    path: '/income/:incomePk',
    name: 'IncomeDetail',
    component: IncomeDetail
  },
  {
    path: '/income/create',
    name: 'IncomeCreate',
    component: IncomeCreate
  },
  {
    path: '/income/update',
    name: 'IncomeUpdate',
    component: IncomeUpdate
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
    path: '/income',
    name: 'Income',
    component: Income
  },
  {
    path: '/incomedetail/:id',
    name: 'IncomeDetail',
    component: IncomeDetail
  },
  {
    path: '/incomecreate',
    name: 'IncomeCreate',
    component: IncomeCreate
  },
  {
    path: '/incomeupdate/:id',
    name: 'IncomeUpdate',
    component: IncomeUpdate
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
