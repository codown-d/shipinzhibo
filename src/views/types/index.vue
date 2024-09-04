<template>
  <!-- 直播菜单页面 -->
  <div class="livepage">
    <!-- 首页标题组件 -->
    <div>
      <Navbar></Navbar>
    </div>
    <div class="livepage-navbox">
      <!-- 左侧菜单栏-->
      <div class="left-menu">
        <!-- <Leftmenu @update:isCollapsed="handleIsCollapsedChange"></Leftmenu> -->
        <Leftmenu v-model:isCollapsed="isCollapsed"></Leftmenu>
        <!-- <p>Current isCollapsed value: {{ isCollapsed }}</p> -->
      </div>
      <!-- 右侧展示内容 根据左边侧边栏点击的菜单拿到数据判断显示需要的模块Competitionmainright组件可以当成默认显示或者隐藏-->
      <div class="layout-Main"> 
        <Layoutmainright></Layoutmainright>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { provide, ref, computed ,onMounted,onUpdated, watch,} from 'vue'
import Navbar from '@/components/navbar.vue'
import Leftmenu from '../../components/Leftmenu.vue'
import Layoutmainright from './components/layoutmainright.vue'
const isCollapsed = ref()
onUpdated( () => {
  console.log('直播页获取子组件的状态', isCollapsed.value)
})
</script>

<style lang="scss" scoped>
.livepage{
  width: 100%;
  height: 100%;
  .livepage-navbox{
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