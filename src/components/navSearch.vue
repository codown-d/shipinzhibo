<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'

const text = ref('')
</script>

<template>
  <div class="search">
    <input class="input-text" type="text" v-model="text">
    <el-icon class="search_icon" size="14px" color="#ccc">
      <Search />
    </el-icon>
  </div>
</template>

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