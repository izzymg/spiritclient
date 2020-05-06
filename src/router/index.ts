import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:category/:thread",
    name: "Thread",
    component: () => import(/* webpackChunkName: "thread" */ "../views/Thread.vue"),
  },
  {
    path: "/:category",
    name: "Category",
    component: () => import(/* webpackChunkName: "category" */ "../views/Category.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
