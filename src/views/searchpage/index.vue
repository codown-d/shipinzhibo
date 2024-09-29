<template>
  <div class="searchpage">
    <!-- 首页标题组件 -->
    <div style="height: 60px;">
      <Navbar></Navbar>
    </div>
    <div class="searchpage-boxnav"> 

      <div class="layout-Search-banner">
        <div class="layout-Search-box">
          <div class="layout-Search-input">
            <input v-model="searchQuery" class="search-input" type="text" placeholder="输入想搜索的内容..." autocomplete="off">
          </div>
          <a class="layout-Search-btn" @click="getSearchroom(searchQuery)">搜索</a>
        </div>
      </div>
      
      <div class="layout-Tab-list">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="房间" name="first">
            <div class="layout-Result">
              <span>共找到相关结果</span>
              <span style="color: #ff5d23;">9999+</span>
              个
            </div>
            <!-- 相关内容 -->
            <div :class="device ? '' : 'mobile_plate'" >
              <Plate :tagList="relatedContent" :headerTitle="'相关内容'"></Plate>
            </div>
          </el-tab-pane>
          <!-- 用户先隐藏 -->
          <!-- <el-tab-pane label="用户" name="second">
            <div class="layout-Result">
              <span>共找到相关结果</span>
              <span style="color: #ff5d23;">9999+</span>
              个
            </div>
            用户
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup>
import Navbar from '@/components/navbar.vue';
import Plate from '@/components/Plate.vue';
import { ref, onMounted } from 'vue';
import { getSearchroomList } from '@/api/searchpage';
const query = ref({});
const activeName = ref('first');
//切换栏
const handleClick = (tab, event) => {
  console.log('Tab clicked:', tab.props.name);
  // console.log('Event:', event);
  if (tab.props.name === 'first') {
    console.log('房间标签页被点击');
  } 
  // else if (tab.props.name === 'second') {
  //   console.log('用户标签页被点击');
  // }
}
const searchQuery = ref('');//输入框的内容数据
const relatedContent = ref([]);//相关内容数据
//查询房间用户接口
const getSearchroom = (typeObj) => {
  console.log('查询接口接收数据',typeObj);
  
  let param = {
    key: typeObj
  }
  const needToken = true;// 根据实际需要设置是否需要token
  getSearchroomList(param,needToken).then(res => {
    console.log('返回数据', res)
    relatedContent.value = res.data;
  }).catch(error => {
    console.log(error)
  });
}
//解密中文包含 Unicode 字符
const fromBase64 = (str) => {
  return decodeURIComponent(atob(str).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const queryString = urlParams.get('query');
  
  if (queryString) {
    try {
      // query.value = JSON.parse(decodeURIComponent(queryString));
      query.value = JSON.parse(fromBase64(queryString));
      console.log('接收对象类型数据',query.value.textValue);
      getSearchroom(query.value.textValue);
    } catch (e) {
      console.error('Failed to parse query string:', e);
    }
  }
});
</script>
<style lang="scss" scoped>
  .searchpage{
    width: 100%;
    height: 100%;
    background-color: #fff;
    .searchpage-boxnav{
      width: 100%;
      height: calc(100vh - 60px);
      padding: 0 1.84896rem;
      box-sizing: border-box;
      // background-color: #f2f5f6;
      .layout-Search-banner{
        width: 100%;
        height: 60px;
        .layout-Search-box{
          display: flex;
          width: 410px;
          height: 34px;
          line-height: 34px;
          padding-top: 20px;
          margin: 0 auto 7px;
          .layout-Search-input{
            width: 349px;
            height: 32px;
            line-height: 32px;
            border-radius: 17px 0 0 17px;
            border: 1px solid #e6ebed;
            border-right: none;
            background-color: #fff;
            float: left;
            .search-input{
              display: block;
              width: 329px;
              height: 100%;
              line-height: 20px;
              outline: none;
              padding-left: 20px;
              color: #333;
              background: none;
              border: none;
              font-size: 12px;
            }
            
          }
          .layout-Search-btn{
            display: block;
            // float: right;
            width: 60px;
            font-size: 12px;
            -webkit-border-radius: 0 17px 17px 0;
            -moz-border-radius: 0 17px 17px 0;
            border-radius: 0 17px 17px 0;
            background: #ff5d23;
            color: #fff;
            text-align: center;
            cursor: pointer; /* 设置鼠标指针效果 */
            transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
          }
        }
      }
      .layout-Tab-list{
        width: 100%;
        height: 40px;
        // border-bottom: 1px solid #e6ebed;
        .demo-tabs{
          .layout-Result{
            font-size: 16px;
            height: 16px;
            line-height: 16px;
            // margin-top: 12px;
            color: #333;
            margin-bottom: 20px;
            padding-left: 10px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>