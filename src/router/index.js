import { createWebHistory, createRouter } from "vue-router";

import Login from "@/views/login/index.vue";
import Home from "@/views/home/index.vue";
import Detail from "@/views/detail/index.vue";
import Types from "@/views/types/index.vue";//直播
import Competition from "@/views/competition/index.vue";//赛事
import Videogame from "@/views/videogame/index.vue";//电玩
import Chatbar from "@/views/chatbar/index.vue";//聊吧
import { removeToken } from "@/utils/auth";//移除token
import NProgress from "@/utils/progress";
import { getToken } from "@/utils/auth";

export const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录",
      showLink: false,
    },
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "首页",
    }
  },
  {
    path: "/types",
    component: Types,
    meta: {
      title: "直播",
    }
  },
  {
    path: "/competition",
    component: Competition,
    meta: {
      title: "赛事",
    }
  },
  {
    path: "/videogame",
    component: Videogame,
    meta: {
      title: "电玩",
    }
  },
  {
    path: "/chatbar",
    component: Chatbar,
    meta: {
      title: "聊吧",
    }
  },
  {
    path: "/detail/:rid",
    component: Detail,
    meta: {
      title: "详情",
      showLink: false,
    },
  },
];

export const navRoutes = routes.filter(e=>e.meta && e.meta.showLink !== false)


const router = createRouter({
  history: createWebHistory(),
  routes,
});

const whiteList = ["/login"];//白名单
//路由跳转前-全局的路由守卫
router.beforeEach((to, _from, next) => {
  NProgress.start();
  const token = getToken();
  //判断用户是否要跳转到正确的路由
  function toCorrectRoute() {
    whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
  }
  //检查用户是否有token
  if (token) {
    toCorrectRoute();
  } else if (to.path !== "/login") {//没有token且用户要访问的路由不是登录页
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      removeToken();
      // next({ path: "/login" });//当token过期时跳转到登录页面
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
