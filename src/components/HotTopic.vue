<template>
  <el-card class="hot-topic" body-style="padding:8px;">
    <div class="header dflex">
      热门话题<a
        class="more"
        target="_blank"
        href="https://yuba.douyu.com/allconversation/focusandall"
        >更多<i></i
      ></a>
    </div>
    <div class="list">
      <div v-for="item in list" :key="item.id" class="" style="font-size: 12px">
        <a
          class="topic-item dflex"
          target="_blank"
          :title="item.title"
          :href="item.href"
          ><span class="topic clamp">#{{ item.subjectName }}</span
          ><span class="hot">等{{ item.joinNum }}人参与</span>
        </a>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { getHotTopic } from "@/api/chat";
let list = ref([]);

onMounted(() => {
  getHotTopic({ pageNum: 1, pageSize: 20,optType:1 }).then((res) => {
    list.value = res.data;
  });
});
</script>

<style lang="scss" scoped>
.hot-topic {
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
  }
  .topic {
    width: 0;
    flex: 1;
  }
  .hot {
    width: 70px;
    text-align: right;
  }
}
</style>
