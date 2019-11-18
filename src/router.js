import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "./views/404.vue";
import Forbidden from "./views/403.vue";
// 页面跳转动效
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import findLast from "lodash/findLast";
import { check, isLogin } from "./utils/auth";

import { notification } from "ant-design-vue";

Vue.use(VueRouter);

// 解决router中重复点击当前页报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 在routes中设置meta信息，用路由守卫判断权限
const routes = [
  {
    path: "/user",
    // 控制路由菜单是否在menu显示
    hideInMenu: true,
    // component: { render: h => h("router-view") },
    component: () =>
      import(/* webpackChunkName: "user" */ "./layouts/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
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
    // 用户和admin可以访问
    meta: { authority: ["user", "admin"] },
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
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
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
        // icon的命名和组件库的icon一样，而不是和name一样
        // 只允许admin访问
        meta: { icon: "form", title: "表单", authority: "admin" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分布表单" },
            // 是否隐藏子项
            hideChildrenInMenu: true,
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
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
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
  if (to.path !== from.path) {
    NProgress.start();
  }

  // 即将去的路由，匹配到的所有的路由信息
  // 查找离节点最近的带有权限配置的路由信息
  // 可打印看看信息
  const record = findLast(to.matched, record => record.meta.authority);
  // 如果找到了。和权限进行校验
  if (record && !check(record.meta.authority)) {
    // 如果没有权限的话，可以跳转到登录或者403，
    // 可以继续判断是否已经登录
    // 如果未登录并且不在登录页，跳转到登录页
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      // 当没有权限时，给提示
      notification.error({
        message: "403",
        description: "您没有权限访问该页面，请联系管理员咨询。"
      });
      next({
        path: "/403",
        // 避免有权限的账号登录超时后，点击浏览器后退按钮可以访问到之前的页面
        replace: true
      });
    }

    // 暂停NProgress 不会再进入afterEach
    NProgress.done();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
