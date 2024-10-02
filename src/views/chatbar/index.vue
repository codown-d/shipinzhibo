
<template>
  <div class="chatbar-body">
    <!-- 首页标题组件 -->
    <div style="height: 60px;">
      <Navbar></Navbar>
    </div>
    <!-- 内容层 -->
    <div class="chatbar-navbox" style="height: calc(100vh - 60px);">
      <!-- 左侧菜单 -->
      <div class="layoutLeftMenu__fh1UH">
        <router-link class="menuItem__ztLTC" :class="{ active: selectedRoute === '/chatbar/attention' }" to="/chatbar/attention" @click="selectRoute('/chatbar/attention')">
          <i class="menuIcon-icon-wdgz"></i>
          我的关注
        </router-link>
        <router-link class="menuItem__ztLTC" :class="{ active: selectedRoute === '/chatbar/talkaboutall' }" to="/chatbar/talkaboutall" @click="selectRoute('/chatbar/talkaboutall')">
          <i class="menuIcon-icon-qblb"></i>
          全部聊吧
        </router-link>
        <router-link class="menuItem__ztLTC" :class="{ active: selectedRoute === '/chatbar/hotrecommendation' }" to="/chatbar/hotrecommendation" @click="selectRoute('/chatbar/hotrecommendation')">
          <i class="menuIcon-icon-rmtj"></i>
          热门推荐
        </router-link>
        <router-link class="menuItem__ztLTC" :class="{ active: selectedRoute === '/chatbar/likedpass' }" to="/chatbar/likedpass" @click="selectRoute('/chatbar/likedpass')">
          <i class="menuIcon-icon-wzgd"></i>
          我赞过的
        </router-link>
      </div>
      <!-- 中间内容 -->
      <div class="content__CxYIq">
        <router-view></router-view>
      </div>
      <!-- 右侧个人信息、热门话题 -->
      <div class="rightMenu__YES7m">
        <!-- 个人信息 -->
        <div class="personage">
          <div class="personage-nav">
            <img class="avatar_tx":src="avatar" alt="">
            <div class="personage-mane">{{ nick }}</div>
          </div>
        </div>
        <div class="popular-anchor margin-top-sm">
          <popular-anchor></popular-anchor>
        </div>
        <!-- 热门话题 -->
        <div class="hotTopic margin-top-sm">
          <hot-topic></hot-topic>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Navbar from '@/components/navbar.vue'
import { useRoute, useRouter } from 'vue-router';//获取当前路由
import { ref,computed,onMounted,defineProps, onUnmounted,nextTick,onUpdated,watch, h} from 'vue';
import HotTopic from '@/components/HotTopic.vue'
import PopularAnchor from '@/components/PopularAnchor.vue'
const route = useRoute();
const router = useRouter();
const selectedRoute = ref(route.path);
import { useUserStoreHook } from '@/store/modules/user';
const userStore = useUserStoreHook();
//用户头像
const avatar = computed(() => {
  return userStore.avatar
})
//用户名字
const nick = computed(() => {
  return userStore.nick
});

// const isActive = (path) => {
//   console.log('选中的路由',path);
//   return route.path === path;
// };
const selectRoute = (path) => {
  selectedRoute.value = path;
};
onMounted(()=>{
  // console.log('首次route',route.path);
  if (route.path === '/chatbar') {
    //首次进入页面也选中 全部聊吧选项
    router.push('/chatbar/talkaboutall');
    selectedRoute.value = '/chatbar/talkaboutall';
  }else {
    // selectedRoute.value = route.path;
    // 刷新页面重新选中 全部聊吧选项
    router.push('/chatbar/talkaboutall');
    selectedRoute.value = '/chatbar/talkaboutall';
  }
});
// watch(route, (newRoute) => {
//   selectedRoute.value = newRoute.path;
// });
</script>
<style lang="scss" scoped>
.chatbar-body{
  width: 100%;
  height: 100%;
  
  // overflow-y: auto; //允许垂直滚动。
  .chatbar-navbox{
    background-image: url(../../assets/images/lbbjt.jpg);
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: row;
    margin: 0 auto;
    // flex: 1;
    padding: 0 352px;
    // .main__gvpC0{
    //   width: 100%;
    //   height: 100%;
      .layoutLeftMenu__fh1UH{
        width: 200px;
        background: linear-gradient(180deg, rgba(192, 46, 0, .298), rgba(192, 46, 0, 0)), 
        linear-gradient(180deg, rgba(192, 0, 0, .12), rgba(192, 0, 0, .12));
        font-size: 14px;
        padding-top: 6px;
        box-sizing: border-box;
        .menuItem__ztLTC{
          display: block;
          width: 100%;
          height: 44px;
          display: flex;
          line-height: 44px;
          font-size: 16px;
          text-decoration:none;//去除下划线
          color: #fff;
          transition: background-color 0.3s, color 0.3s;
          &:hover{
            background-color: hsla(0, 0%, 100%, .154);
          }
          // .active {
          //   font-weight: bold;
          //   color: var(--el-color-primary);
          // }
          .menuIcon-icon-wdgz{
            display: block;
            width: 26px;
            height: 26px;
            background-image: url('../../assets/images/wgzd.png');
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: contain;
            margin-left: 20px;
            margin-top: 7px;
          }
          .menuIcon-icon-qblb{
            display: block;
            width: 26px;
            height: 26px;
            background-image: url('../../assets/images/qblb.png');
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: contain;
            margin-left: 20px;
            margin-top: 7px;
          }
          .menuIcon-icon-rmtj{
            display: block;
            width: 26px;
            height: 26px;
            background-image: url('../../assets/images/rmtj.png');
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: contain;
            margin-left: 20px;
            margin-top: 7px;
          }
          .menuIcon-icon-wzgd{
            display: block;
            width: 26px;
            height: 26px;
            background-image: url('../../assets/images/wzgd.png');
            background-position: 50%;
            background-repeat: no-repeat;
            background-size: contain;
            margin-left: 20px;
            margin-top: 7px;
          }
        }
        .menuItem__ztLTC.active {
          font-weight: bold;
          color: #ff5d23 !important;
          background-color: hsla(0, 0%, 100%, .154);
        }
      }
      .content__CxYIq{
        width: 734px;
        height: calc(100vh - 60px);
        // overflow: hidden;
        overflow-y: auto;
        background-color: #fff;
      }
      .rightMenu__YES7m {
        background-color: antiquewhite;
        margin-left: 6px;
        padding-top: 6px;
        box-sizing: border-box;
        width: 260px;
        .personage{
          width: 100%;
          height: 0.63088rem;
          background-color: #fff;
          padding: 30px 16px;
          box-sizing: border-box;
          // filter: blur(8px);
          .personage-nav{
            display: flex;
            .avatar_tx{
              display: block;
              width: 0.2855rem;
              height: 0.2855rem;
              border-radius: 50%;
            }
            .personage-mane{
              font-size: 16px;
              line-height: 0.2855rem;
              margin-left: 20px;
            }
          }
        }
        // .personage::before {
        //   content: '';
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   width: 100%;
        //   height: 100%;
        //   background-size: cover; /* 确保背景图覆盖整个元素 */
        //   background-position: 50%;
        //   background-repeat: repeat;
        //   -webkit-filter: blur(8px);
        //   filter: blur(8px);
        //   z-index: -1;
        //   background-image: var(avatar);
        // }
        .hotTopic{

        }
      }
    // }
  }
}
</style>