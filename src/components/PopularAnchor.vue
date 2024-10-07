<template>
  <el-card class="popular-anchor" body-style="padding:8px;">
    <div class="header dflex">
      热门主播推荐
      <span class="dflex" style="color: #999; font-size: 12px"
        ><el-icon><Refresh /></el-icon>主播翻牌<i></i
      ></span>
    </div>
    <div class="list dflex">
      <div v-for="item in list" :key="item.id" class="" style="font-size: 12px;width: 33%;">
        <a
          class="topic-item dflex  margin-top-xs margin-bottom-xs"
          target="_blank"
          :title="item.title"
          :href="item.href"
          >
          <img :src="item.avatar" alt="" class="anchor-img"/>
          <span class="hot clamp">{{ item.name }}</span>
        </a>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { getPopularAnchor } from "@/api/chat";
let list = ref([]);

onMounted(() => {
  getPopularAnchor().then((res) => {
    console.log(res.data);
    list.value = res.data.list;
  });
});
</script>

<style lang="scss" scoped>
.popular-anchor {
  .header {
    color: #333;
    font-size: 16px;
    font-weight: 700;
    height: 44px;
    justify-content: space-between;
    align-items: center;
  }
  .topic-item {
    padding: 4px 0px;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
  .topic {
    width: 0;
    flex: 1;
  }
  .hot {
    width: 70px;
    text-align: center;
  }
  .anchor-img{
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  .list{
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
