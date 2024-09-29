<template>
  <div class="desktop_nav">
  <!-- <div class="desktop_nav" :class="navClass"> -->
    <!-- 头部-icon图片 -->
    <img class="logo" src="/vite.svg" alt="logo" />

    <!-- <Transition name="nav"> -->

      <div class="desktop_header">
        <NavMenu></NavMenu>
        <div class="header_right">
          <!-- 头部-搜索框 -->
          <NavSearch></NavSearch>
          <span class="nick_name">{{ nick }}</span>
          <span>
            <img class="avatar" :src="avatar || userAvatar" @click="userDetails"/>
          </span>
          <!-- 头部-登陆信息-登陆后展示 -->
          <!-- <div class="user-dom" v-show="deviceToken == '1'"> -->
            <!-- <el-dropdown trigger="click"> -->
              <!-- <span>
                <img class="avatar" :src="avatar || userAvatar" />
              </span> -->
              <!-- <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="">
                    账户信息
                  </el-dropdown-item>
                  <el-dropdown-item @click="logOut">
                    绑定账号
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template> -->
            <!-- </el-dropdown> -->
          <!-- </div> -->
          <!-- 头部-登陆信息-未登陆前展示 -->
          <!-- <div class="mobile_header" v-show="deviceToken == '0'"> -->
            <!-- <el-icon class="search_icon" size="18px" color="#999999">
              <Search />
            </el-icon> -->
            <!-- <span class="login_text">登录</span>
            <el-button class="btn_download" color="var(--el-color-primary)">下载APP</el-button>
          </div> -->
        </div>
      </div>
    <!-- </Transition> -->

    <!-- <Transition name="nav">
      <div class="mobile_header" v-show="device">
        <el-icon class="search_icon" size="18px" color="#999999">
          <Search />
        </el-icon>
        <span class="login_text">登录</span>
        <el-button class="btn_download" color="var(--el-color-primary)">下载APP</el-button>
      </div>
    </Transition> -->

  </div>
</template>

<script setup>

import NavSearch from './navSearch.vue'
import NavMenu from './navMenu.vue'
import { useUserStoreHook } from '@/store/modules/user';
import { computed,onMounted,ref,onUnmounted,watch  } from 'vue';
import { useAppStoreHook } from '@/store/modules/app';
import { useRoute } from 'vue-router';//获取当前路由
import router from '@/router';

const props = defineProps({
  type: 0
})

const scrollPosition = ref(0);//保存滚动位置
const deviceToken = ref('1');//登陆的状态
const userAvatar = 'https://avatars.githubusercontent.com/u/44761321'
//用户头像
const avatar = computed(() => {
  return useUserStoreHook().avatar
});
//用户名字
const nick = computed(() => {
  return useUserStoreHook().nick
});
//进入用户详情页
const userDetails = () => {
  router.push('/userdetails')
}

// const store = useAppStoreHook()
// console.log('登陆的什么玩意',store);

// const device = computed(() => {
//   return store.device === 'desktop' ? 1 : 0
// })
// const type = computed(() => {
//   return device.value ? 0 : 1
// })

// const navClass = computed(()=>{
//   return {
//     white_bg:type.value,
//     black_bg:!type.value,
//     mobile_nav:!device.value
//   }
// })

//退出登录改为 绑定账号
// const logOut = ()=>{
  // useUserStoreHook().logOut()
// }

// 监听滚动事件，更新滚动位置
const handleScroll = () => {
  scrollPosition.value = window.scrollY;
};
//测试
onMounted(() => {
  // console.log('登陆的是什么',device.value);
  //添加滚动事件监听
  window.addEventListener('scroll', handleScroll);
  // console.log('获取路由是什么',useRoute().path);
  
});
// 组件卸载时移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 监听滚动位置的变化
watch(scrollPosition, (value) => {
  // console.log('滚动的距离', value)
  // 如果滚动位置大于等于 500px，则添加 fixed 类名，否则移除 fixed 类名
  if (value >= 500) {
    document.querySelector('.desktop_nav').classList.add('fixed');
  } else {
    document.querySelector('.desktop_nav').classList.remove('fixed');
  }
});
</script>

<style lang="scss" scoped>
.desktop_nav {
  width: 100%;
  height: 60PX;
  // border-bottom: 1px solid var(--el-menu-border-color);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 355px;

  background-color: #f4f4f4;
  opacity: 0.85;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 101;
}
//滚动距离吸顶部
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.mobile_nav{
  padding: 0 40px;
}

.white_bg {
  background-color: #fff;
}

.black_bg {
  // background: linear-gradient(180deg, rgba(0, 0, 0, .6), transparent);
  // background-color: #d3d3d4;
  background-color: #f4f4f4;
  opacity: 0.85;
}

.desktop_header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .header_right{
    display: flex;
    align-items: center;
  }
}
//未登陆样式
.mobile_header {
  // width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  // .search_icon {
  //   cursor: pointer;
  // }

  .login_text {
    font-size: 16PX;
    color: var(--el-color-primary);
    margin-left: 20PX;
    cursor: pointer;
    flex: none;
  }

  .btn_download {
    color: #fff;
    width: 74PX;
    height: 28PX;
    border-radius: 30PX;
    margin-left: 20PX;
    font-size: 14PX;
  }

}

.logo {
  width: 40PX;
  flex: none;
}

.user-dom{
  margin-left: 30PX;
}
.nick_name{
  display: block;
  font-size: 16px;
  color: #090E16;
  margin-left: 49px;
}
.avatar {
  display: block;
  width: 30PX;
  height: 30PX;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
}


.nav-enter-active {
  transition: all 0.3s ease-out;
}

// .nav-leave-active {
  // transition: all 0.2s ease-out;
// }

.nav-enter-from,
.nav-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>