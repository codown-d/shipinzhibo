import { createWebHistory, createRouter } from "vue-router";

import Login from "@/views/login/index.vue";
import Home from "@/views/home/index.vue";
import Detail from "@/views/detail/index.vue";
import Menuattention from "@/views/menuattention/index.vue";//左侧菜单-我的关注
import Types from "@/views/types/index.vue";//直播
import Competition from "@/views/competition/index.vue";//赛事
import Videogame from "@/views/videogame/index.vue";//电玩
import Chatbar from "@/views/chatbar/index.vue";//聊吧
import Attention from "@/views/attention/index.vue";//我的关注
import Talkaboutall from "@/views/talkaboutall/index.vue";//全部聊吧
import Hotrecommendation from "@/views/hotrecommendation/index.vue";//热门推荐
import Likedpass from "@/views/likedpass/index.vue";//我赞过的
import Userdetails from "@/views/userdetails/index.vue";//用户详情
import Searchpage from "@/views/searchpage/index.vue";//搜索页
import { removeToken } from "@/utils/auth";//移除token
import NProgress from "@/utils/progress";
import { getToken } from "@/utils/auth";
// import getFingerprintJS from '@fingerprintjs/fingerprintjs';
// let hasFingerprint = false; // 添加一个变量用于标记是否已经获取过浏览器指纹
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
      showLink: false,//不会显示任何链接或按钮
    },
  },
  {
    path: "/home",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/menuattention",
    component: Menuattention,
    meta: {
      title: "我的关注",
      // showLink: false,//不会显示任何链接或按钮
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
  // {
  //   path: "/videogame",
  //   component: Videogame,
  //   meta: {
  //     title: "电玩",
  //   }
  // },
  {
    path: "/chatbar",
    component: Chatbar,
    meta: {
      title: "聊吧",
    },
    // 聊吧里面四个子路由页面
    children: [
      {
        path: 'attention',
        component: Attention,
        meta: {
          title: '我的关注',
          showLink: false,
        },
      },
      {
        path: 'talkaboutall',
        component: Talkaboutall,
        meta: {
          title: '全部聊吧',
          showLink: false,
        },
      },
      {
        path: 'hotrecommendation',
        component: Hotrecommendation,
        meta: {
          title: '热门推荐',
          showLink: false,
        },
      },
      {
        path: 'likedpass',
        component: Likedpass,
        meta: {
          title: '我赞过的',
          showLink: false,
        },
      },
    ],
  },
  {
    path: "/detail/:rid/:owner/:type",
    component: Detail,
    meta: {
      title: "详情",
      showLink: false,//不会显示任何链接或按钮
    },
  },
  
  {
    path: "/userdetails",
    component: Userdetails,
    meta: {
      title: "用户详情",
      showLink: false,//不会显示任何链接或按钮
    },
  },

  {
    path: "/searchpage",
    component: Searchpage,
    meta: {
      title: "搜索",
      showLink: false,//不会显示任何链接或按钮
    },
  },
];

export const navRoutes = routes.filter(e=>e.meta && e.meta.showLink !== false)


const router = createRouter({
  history: createWebHistory(),
  routes,
});
//浏览器唯一的标识指纹
// const getDeviceFingerprint = () => {
//   let imei = localStorage.getItem('browserId');
//   if (!imei) {
//     const options = {
//       excludes: {
//         faudio: true,
//         fonts: true,
//         canvas: true,
//         webgl: true,
//         plugins: true,
//         touchSupport: true
//       }
//     }
//     const fpPromise = getFingerprintJS.load({ options });
//     return fpPromise.then(fp => fp.get()).then(result => {
//       const visitorId = result.visitorId;
//       localStorage.setItem('browserId', visitorId);
//       return visitorId;
//     });
//   } else {
//     return Promise.resolve(imei);
//   }
// }
// const whiteList = ["/login"];//白名单
const whiteList = ["/home"];//白名单
//路由跳转前-全局的路由守卫
router.beforeEach((to, _from, next) => {
  NProgress.start();
  const token = getToken();
  // if (!token && to.path !== "/home") {
  if (!token && !whiteList.includes(to.path)) {
    removeToken();
    next({ path: "/home" }); // 当token过期时跳转到登录页面
  } else {
    next();
  }
  //判断用户是否要跳转到正确的路由
  // function toCorrectRoute() {
  //   whiteList.includes(to.fullPath) ? next(_from.fullPath) : next();
  // }
  // //检查用户是否有token
  // if (token) {
  //   toCorrectRoute();
  // // } else if (to.path !== "/login") {//没有token且用户要访问的路由不是登录页
  // } else if (to.path !== "/home") {//没有token且用户要访问的路由不是登录页
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     removeToken();
  //     next({ path: "/home" });//当token过期时跳转到登录页面
  //   }
  // } else {
  //   next();
  // }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;