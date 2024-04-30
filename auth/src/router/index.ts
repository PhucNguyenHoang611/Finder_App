import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import SignIn from "@/pages/SignIn.vue";
import SignUp from "@/pages/SignUp.vue";
import ForgetPassword from "@/pages/ForgetPassword.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/auth/sign-in",
    component: SignIn,
  },
  {
    path: "/auth/sign-up",
    component: SignUp,
  },
  {
    path: "/auth/forget-password",
    component: ForgetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
