<template>
  <!-- 我的关注-菜单页面 -->
  <div class="livepage">
    <!-- 首页标题组件 -->
    <div style="height: 60px;">
      <Navbar></Navbar>
    </div>
    <div class="livepage-navbox">
      <!-- 左侧菜单栏-->
      <div class="left-menu">
        <!-- <Leftmenu @update:isCollapsed="handleIsCollapsedChange"></Leftmenu> -->
        <Leftmenu v-model:isCollapsed="isCollapsed" @tapsecondaryItem="feftSideFixedmenu" @selectItem="handleSelectItem"></Leftmenu>
        <!-- <p>Current isCollapsed value: {{ isCollapsed }}</p> -->
      </div>
      <!-- 右侧展示内容 根据左边侧边栏点击的菜单拿到数据判断显示需要的模块Competitionmainright组件可以当成默认显示或者隐藏-->
      <div class="layout-Main"> 
        <Layoutmainright :firstOrderList="firstOrderList" :selectedItem="selectedItem"></Layoutmainright>
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
const firstOrderList = ref(null);//左侧一级菜单选中数据
const selectedItem = ref(null);//左侧标签菜单选中数据
onUpdated( () => {
  console.log('我的关注页获取子组件的状态', isCollapsed.value)
})
//子组件Leftmenu里面触发tapsecondary方法选中一级菜单
const feftSideFixedmenu = (objType) => {
  firstOrderList.value = objType;
  console.log('父组件获取左侧一级菜单数据', firstOrderList.value)
}
//子组件Leftmenu里面触发selectItem方法
const handleSelectItem = (itemty) => {
  selectedItem.value = itemty;
  console.log('父组件获取左侧菜单标签选中数据', selectedItem.value)
};
</script>

<style lang="scss" scoped>
.livepage{
  width: 100%;
  height: 100%;
  .livepage-navbox{
    display: flex;
    justify-content: left;
    width: 100%;
    // height: 100%;
    // padding-top: 60px;
    height: calc(100vh - 60px);
    overflow: hidden;
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
      flex-grow: 1;
      overflow-y: auto;
    }
  }
}
</style>