import Home from '@/views/Home.vue'
import Login from '@/views/Auth/Login.vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Product from '@/views/Product.vue'
import store from '@/store'
import ProductView from '@/components/products/ProductView.vue'
import Borrowing from '@/views/Borrowing.vue'
import User from '@/views/User.vue'

import authService from '@/services/auth.service';
import Admin from '@/views/Admin.vue'
import NotFound from '@/views/NotFound.vue'


const routes = [
  {
    path: "/",
    component: Home,
    name: "home"
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { layout: AuthLayout }
  },
  {
    path: "/product",
    component: Product,
    name: "product",
    children: [
      {
        path: "",
        component: () => import('@/components/products/ProductView.vue'),
        name: "product view",
      },
      {
        path: "add",
        component: () => import('@/components/products/ProductAdd.vue'),
        name: "product add",
      },
      {
        path: "edit/:id",
        component: () => import('@/components/products/ProductEdit.vue'),
        name: "product edit"
      }
    ]
  },
  {
    path: '/borrowing',
    component: Borrowing,
    name: "borrowing",
    children: [
      {
        path: "",
        component: () => import('@/components/borrowings/BorrowingAll.vue'),
        name: "borrow all"
      },
      {
        path: "waiting",
        component: () => import('@/components/borrowings/BorrowWaiting.vue'),
        name: "borrow waiting"
      },
      {
        path: "approved",
        component: () => import('@/components/borrowings/BorrowingApproved.vue'),
        name: "borrow approved"
      },
      {
        path: "returned",
        component: () => import('@/components/borrowings/BorrowingReturned.vue'),
        name: "borrow returned"
      },
      {
        path: "refused",
        component: () => import('@/components/borrowings/BorrowingRefuse.vue'),
        name: "borrow refused"
      }
    ]
  },
  {
    path: "/user",
    component: User,
    name: "user",
    children: [
      {
        path: "",
        component: () => import('@/components/UserView.vue'),
        name: "view user"
      },
      {
        path: ":id",
        component: () => import('@/components/DetailUser.vue'),
        name: "detail user"
      }
    ]
  },
  {
    path: "/admin",
    component: Admin,
    name: "admin",
    children: [
      {
        path: "",
        component: () => import('@/components/admins/AdminView.vue'),
        name: "view admin"
      },
      {
        path: "add",
        component: () => import('@/components/admins/AdminAdd.vue'),
        name: "add admin"
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: AuthLayout }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

// Guards
router.beforeEach(async (to, from, next) => {

  const token = await authService.getRefeshToken();

  const isLoggedIn = store.getters.isLoggedIn;

  if ((!isLoggedIn || !token) && to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
