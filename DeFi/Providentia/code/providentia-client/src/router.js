import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Students from "./views/Students.vue";
import Investors from "./views/Investors.vue";
import Portfolio from "./views/Portfolio.vue";
import Repay from "./views/Repay.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/students",
      name: "students",
      component: Students
    },
    {
      path: "/investors",
      name: "investors",
      component: Investors
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio
    },
    {
      path: "/repay",
      name: "Repay",
      component: Repay
    }
  ]
});