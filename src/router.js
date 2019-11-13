import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "./views/404.vue";
// 页面跳转动效
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    // component: { render: h => h("router-view") },
    component: () =>
      import(/* webpackChunkName: "user" */ "./layouts/UserLayout"),
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/User/Register")
      }
    ]
  },
  // Basic
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis"
              )
          }
        ]
      },
      // form
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: "*",
    name: "404",
    component: NotFound
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
