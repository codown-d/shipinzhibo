<template>
  <div class="search">
    <input class="input-text" type="text" v-model="text">
    <el-icon class="search_icon" size="14px" color="#ccc" @click="searchContent">
      <Search />
    </el-icon>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';//获取当前路由

const text = ref('');
//加密中文包含 Unicode 字符
const toBase64 = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
    return String.fromCharCode('0x' + p1);
  }));
};
//搜索事件
const searchContent = () => {
  // console.log('搜索事件', text.value)
  // const route = useRoute();
  // console.log('获取路由是什么-获取不了',route);
  if (text.value == '') {
    return
  }
  let params = {
    textValue:text.value
  }
  // const query = encodeURIComponent(JSON.stringify(params));
  const query = toBase64(JSON.stringify(params));// Base64 编码
  const url = `/searchpage?query=${query}`;
  // console.log('传递的对象数据',url)
  window.open(url, "_blank");
}
</script>

<style lang="scss" scoped>
.search{
  display: flex;
  align-items: center;
  background-color: hsla(0,0%,100%,.2);
  color: rgba(0, 0, 0, .7);
  border-radius: 100PX;
  overflow: hidden;
  padding: 0 16PX;
  // border: 1px solid hsla(0,0%,100%,.3);
  border: 1px solid #ccc;

  .input-text{
    width: 180PX;
    height: 36PX;
    outline: none;
    border: none;
    font-size: 14PX;
    background-color: transparent;

    .el-input__wrapper{
      background-color: transparent !important;
    }

    .el-input__inner{
      background-color: transparent !important;
    }
  }

  .search_icon{
    padding-left: 10px;
  }
}

</style>