<template>
  <div :style="{ width: isCollapsed ? '48px' : '200px', height: `${dynamicHeight}px`}" class="layout-Aside" :class="{ 'is-collapsed': isCollapsed }">
    <!-- isCollapsed为false,则显示展开的样式 -->
    <div class="menu-container" v-if="!isCollapsed">
      <div class="menu-item" v-for="item in menuList" :key="item.id" @click="tapsecondary(item)">
        <i :class="item.icon"></i>
        <span class="menu-text">{{ item.text }}</span>
      </div>
      <!-- 足球以下菜单栏 -->
      <div class="menu-item-child">
        <span class="first-order">
          <i class="fa fa-life-ring"></i>
          <span class="menu-text-child">足球</span>
        </span>
        <div class="child-menu">
          <span class="child-span">官方解说</span>
          <span class="child-span">大师评球</span>
          <span class="child-span">毒舌评球</span>
          <span class="child-span">评球品足</span>
          <span class="child-span">波胆推荐</span>
          <span class="child-span">足球宝贝</span>
        </div>
      </div>
      <div class="menu-item-child">
        <span class="first-order">
          <i class="fa fa-life-ring"></i>
          <span class="menu-text-child">足球</span>
        </span>
        <div class="child-menu">
          <span class="child-span">官方解说</span>
          <span class="child-span">大师评球</span>
          <span class="child-span">毒舌评球</span>
          <span class="child-span">评球品足</span>
          <span class="child-span">波胆推荐</span>
          <span class="child-span">足球宝贝</span>
        </div>
      </div>
      <div class="menu-item-child">
        <span class="first-order">
          <i class="fa fa-life-ring"></i>
          <span class="menu-text-child">足球</span>
        </span>
        <div class="child-menu">
          <span class="child-span">官方解说</span>
          <span class="child-span">大师评球</span>
          <span class="child-span">毒舌评球</span>
          <span class="child-span">评球品足</span>
          <span class="child-span">波胆推荐</span>
          <span class="child-span">足球宝贝</span>
        </div>
      </div>
    </div>
    <!-- isCollapsed为true,则显示收起的样式 -->
    <div class="menu-packup" v-if="isCollapsed">
      <a href="#" class="menu-packup-a">
        <i class="fa-regular fa-heart"></i>
        <span class="menu-packup-text">订阅</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa fa-trophy"></i>
        <span class="menu-packup-text">榜单</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa-regular fa-calendar"></i>
        <span class="menu-packup-text">赛事</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa-regular fa-th-large"></i>
        <span class="menu-packup-text">全部</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa fa-life-ring"></i>
        <span class="menu-packup-text">足球</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa fa-dribbble"></i>
        <span class="menu-packup-text">篮球</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa fa-life-ring"></i>
        <span class="menu-packup-text">球类</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa fa-life-ring"></i>
        <span class="menu-packup-text">娱乐</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa fa-weixin"></i>
        <span class="menu-packup-text">语音</span>
      </a>
      <a href="#" class="menu-packup-a">
        <i class="fa fa-gamepad"></i>
        <span class="menu-packup-text">电玩</span>
      </a>
    </div>
    <!-- 展开收起按钮 -->
    <div class="toggle-button" @click="toggleCollapse">
      <i :class="isCollapsed ? 'fa fa-angle-right' : 'fa fa-angle-left'"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'

const isCollapsed = ref(false)
const menuList = [
  { menuid: 1, icon: 'fa fa-home', text: '我的订阅' },
  { menuid: 2, icon: 'fa fa-chart-bar', text: '直播榜单' },
  { menuid: 3, icon: 'fa fa-envelope', text: '赛事直播' },
  { menuid: 4, icon: 'fa fa-cog', text: '全部直播' }
]

const toggleCollapse = () => {
  console.log('按钮切换类型1', !isCollapsed.value)
  isCollapsed.value = !isCollapsed.value
  //把状态转给父组件用于判断宽度自适应
  emit('update:isCollapsed', isCollapsed.value)
}
const emit = defineEmits(['update:isCollapsed'])

const tapsecondary = (objType) => {
  console.log('获取点击数据', objType)
}

//获取屏幕高度减去头部组件高度60
const dynamicHeight = ref(0);
const updateHeight = () => {
  dynamicHeight.value = window.innerHeight - 60;
}
onMounted(() => {
  updateHeight();
  //窗口大小发生改变时触发，第一个参数resize是要监听的事件类型，表示窗口大小改变事件，
  //updateHeight方法，表示当窗口大小改变时执行updateHeight函数来更新元素的高度。
  window.addEventListener('resize', updateHeight);
});

</script>
<style lang="scss" scoped>
.layout-Aside {
  position: relative;
  width: 100%;
  // height: #{$screenHeight}px;
  background-color: #28292f;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease-in-out;
  // isCollapsed为true,则显示收起的样式
  padding: 20px;
  // overflow-x: auto;//在这里加滚动会隐藏收起展开按钮
  &.is-collapsed {
    // width: 68px;
    // .menu-container {
    //   display: none;
    // }
    .menu-packup{
      // display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
      .menu-packup-a{
        display: inline-grid;
        text-decoration: none;
        width: 100%;
        padding: 10px 0;
        // &:hover{
        //   color: #fda031;
        // }
        i {
          width: 100%;
          font-size: 20px;
          color: #d3d3d4;
          text-align: center;
          // margin: 0 auto;
        }
        .menu-packup-text{
          display: inline-block;
          width: 100%;
          color: #d3d3d4;
          text-align: center;
          font-size: 16px;
          margin-top: 5px;
        }
        i:hover{
          color: #fda031;
        }
        .menu-packup-text:hover{
          color: #fda031;
        }
      }
    }
  }
  //isCollapsed为false,则显示展开的样式
  .menu-container {
    // padding: 20px;
    // width: 240px;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    .menu-item {
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      color: #d3d3d4;
      margin-bottom: 10px;
      // 滑过菜单栏背景色
      &:hover {
        background-color: #96979a;
        color: #fda031;
        z-index: 10;
      }

      i {
        font-size: 20px;
        margin-right: 10px;
      }

      .menu-text {
        font-size: 16px;
        font-weight: 500;
        // &:hover {
        //   color: #fda031;
        // }
      }
    }

    .menu-item-child {
      width: 100%;
      .first-order{
        display: flex;
        padding: 10px;
        width: 100%;
        i{
          color: #d3d3d4;
          font-size: 20px;
          // line-height: 18px;
          margin-right: 10px;
        }
        .menu-text-child{
          display: inline-block;
          // height: px;
          font-size: 16px;
          font-weight: 500;
          color: #d3d3d4;
        }
      }
      .child-menu{
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        padding: 10px;
        padding-right: 0;
        .child-span{
          display: block;
          // width: 56px;
          color: #979797;
          font-size: 13px;
          // flex: 0 0 33.33%;
          text-align: center;
          padding: 2px;
          box-sizing: border-box;
          border: #979797 solid 1px;
          margin-bottom: 4px;
          margin-right: 4px;
          border-radius: 4px;
        }
        .child-span:hover{
          color: #fda031;
          border-radius: 2px;
          border: #fda031 solid 1px;
        }
      }
    }

  }

  .toggle-button {
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    background-color: #28292f;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    // z-index: 1;
    // &:hover {
    //   background-color: #e8e8e8;
    // }

    i {
      font-size: 20px;
      color: #d3d3d4;
      position: absolute;
      right: 10px;
    }
  }
}
</style>