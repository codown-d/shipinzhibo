<template>
  <div class="margin-top-sm" v-for="(item, index) in list">
    <anchor-news
      :key="index"
      :publisher="item.publisher"
      :text="item.text"
      :comment_count="item.comment_count"
      :like_count="item.like_count"
      :relay_count="item.relay_count"
      :liked="item.liked"
      :follow_status="item.follow_status"
      :dynamicMsgId="item.dynamicMsgId"
      :ctime="item.ctime"
    ></anchor-news>
  </div>
</template>
<script setup>
import AnchorNews from "@/components/AnchorNews.vue";
import { onMounted, ref } from "vue";
import { getAnchorNews, getUserInfo } from "@/api/chat";
let list = ref([]);
onMounted(() => {
  getAnchorNews().then(async (res) => {
    let arr = [];
    list.value = [];
  });
});
</script>
<style lang="sass" scoped></style>
