<template>
  <!-- 电玩菜单页面 -->
  <div class="videogame-box">
    <!-- 首页标题组件 -->
    <div>
      <Navbar></Navbar>
    </div>
    <div class="videogame-navbox">
      <div class="left-menu">
        <Leftmenu v-model:isCollapsed="isCollapsed"></Leftmenu>
      </div>
      <!-- 右侧展示内容 根据左边侧边栏点击的菜单拿到数据判断显示需要的模块Competitionmainright组件可以当成默认显示或者隐藏-->
      <div class="layout-Main"> 
        <videogameright></videogameright>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted,onUpdated,onUnmounted,watchEffect,nextTick } from 'vue';
import Navbar from '@/components/navbar.vue'
import Leftmenu from '@/components/Leftmenu.vue'
import videogameright from './components/videogameright.vue'
const isCollapsed = ref()
onUpdated( () => {
  console.log('电玩页获取子组件的展开收起状态', isCollapsed.value)
})


</script>

<style lang="scss" scoped>
.videogame-box {
  width: 100%;
  height: 100%;
  .videogame-navbox{
    display: flex;
    justify-content: left;
    width: 100%;
    height: 100%;
    .left-menu{
      // width: 15%;
      height: 100%;
    }
    .layout-Main{
      width: 100%;
      height: 100%;
      padding-left: 26px;
      padding-right: 26px;
      background-color: #fff;
    }
  }
}
</style>