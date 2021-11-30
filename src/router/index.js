import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../views/Inicio.vue";
import { auth } from "../firebase.js"

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    name: "Inicio",
    component: Inicio,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if(requiresAuth) {
    auth.onAuthStateChanged( (user) => {
      if (!user) next('/login')
      else next();
    })
  } else next()
});

export default router;
