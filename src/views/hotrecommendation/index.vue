<template>
  <div>
    <chat-message></chat-message>
    <div class="margin-top-sm" v-for="(item,index) in list">
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
  </div>
</template>
<script setup>
import ChatMessage from "@/components/ChatMessage.vue";
import AnchorNews from "@/components/AnchorNews.vue";
import { onMounted, ref } from "vue";
import { getDynamicPage, getUserInfo } from "@/api/chat";
let list = ref([]);
onMounted(() => {
  getDynamicPage({
    optType: 1,
    pageNum: 1,
    pageSize: 20,
  }).then(async (res) => {
    list.value = res.data.map((item) => {
      let userInfo=JSON.parse(item.userDynamic.userInfo||"{}")
      return {
        publisher: userInfo,
        text: item.userDynamic.comtent,
        comment_count: item.userDynamic.commentNum,
        like_count: item.userDynamic.likeNum,
        relay_count: 0,
        liked: item.userDynamic.hasLike,
        follow_status: 123,
        dynamicMsgId: item.userDynamic.dynamicMsgId,
        ctime: item.userDynamic.createTime,
      };
    });
  });
});
</script>
<style lang="sass" scoped></style>
