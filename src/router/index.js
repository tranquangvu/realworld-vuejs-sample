import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/editor",
    name: "create-article",
    component: () => import("@/views/ArticleCreate.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/editor/:articleSlug",
    name: "edit-article",
    component: () => import("@/views/ArticleEdit.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/article/:articleSlug",
    name: "article",
    component: () => import("@/views/Article.vue")
  },
  {
    path: "/profile/:userName",
    name: "profile",
    component: () => import("@/views/Profile.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["users/isAuthenticated"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
