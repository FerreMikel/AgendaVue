import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../views/Inicio.vue";
import NuevoContacto from "../views/NuevoContacto.vue";
import { auth } from "../firebase.js"

const routes = [
  {
    path: "/",
    name: "inicio",
    component: Inicio,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/nuevo-contacto",
    name: "nuevo-contacto",
    component: NuevoContacto,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () => import("../views/SignUp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  auth.onAuthStateChanged( (user) => {
    if (requiresAuth && !user) next('/login')
    else if ((to.name == 'login' || to.name == 'sign-up') && user) next('/')
    else next();
  })
});

export default router;
