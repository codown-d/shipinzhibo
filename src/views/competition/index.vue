<template>
  <!-- 赛事菜单页面 -->
  <div class="competition-box">
    <!-- 首页标题组件 -->
    <div style="height: 60px;">
      <Navbar></Navbar>
    </div>
    <div class="competition-navbox">
      <div class="left-menu">
        <Leftmenu v-model:isCollapsed="isCollapsed"></Leftmenu>
      </div>
      <!-- 右侧展示内容 根据左边侧边栏点击的菜单拿到数据判断显示需要的模块Competitionmainright组件可以当成默认显示或者隐藏-->
      <div class="layout-Main"> 
        <Competitionmainright></Competitionmainright>
      </div>
    </div>
  </div>
</template>
<script setup>
import { provide, ref, computed ,onMounted,onUpdated, watch,} from 'vue'
import Navbar from '@/components/navbar.vue'
import Leftmenu from '../../components/Leftmenu.vue'
import Competitionmainright from './components/competitionmainright.vue'
const isCollapsed = ref()
onUpdated( () => {
  console.log('赛事页获取子组件的展开收起状态', isCollapsed.value)
})
</script>

<style lang="scss" scoped>
.competition-box{
  width: 100%;
  height: 100%;
  .competition-navbox{
    display: flex;
    justify-content: left;
    width: 100%;
    // height: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
    .left-menu{
      // width: 15%;
      height: 100%;
    }
    .layout-Main{
      width:0;
      flex: 1;
      height: 100%;
      padding-left: 26px;
      padding-right: 26px;
      background-color: #fff;
    }
  }
}
</style>