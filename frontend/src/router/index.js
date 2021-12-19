//Toutes les routes entre les components et les views//

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import RegisterPage from "../views/RegisterPage.vue";
import ForumPage from "../views/ForumPage.vue";
import AddPaperPage from "../views/AddPaperPage.vue";
import OnePaperPage from "../views/OnePaperPage.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },

  {
    path: "/forum",
    name: "ForumPage",
    component: ForumPage,
  },
  {
    path: "/AddPaperPage",
    name: "AddPaperPage",
    component: AddPaperPage
    
  },

  {
    path: "/OnePaperPage/:id",
    name: "OnePaperPage",
    component: OnePaperPage
    
  }
 


];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
