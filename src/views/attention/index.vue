<template>
  <div>
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
import AnchorNews from "@/components/AnchorNews.vue";
import { onMounted, ref } from "vue";
import { getDynamicPage,getUserInfo } from "@/api/chat";
let list = ref([]);
onMounted(() => {
  getDynamicPage({
    optType: 3,
    pageNum: 1,
    pageSize: 20,
  }).then(async (res) => {
    console.log(res)
    let arr = [];
    for (let i = 0; i < res.data.length; i++) {
      let item = res.data[i];
      let result = await getUserInfo({
        queryUid: item.userDynamic.uid,
        visitor: false,
      });
      console.log(item, result);
      arr.push({
        publisher: {
          nickname: result.nick,
          avatar: result.avatar,
          uid: result.uid,
        },
        text: item.userDynamic.comtent,
        comment_count: item.userDynamic.commentNum,
        like_count: item.userDynamic.likeNum,
        relay_count: 0,
        liked: item.userDynamic.hasLike,
        follow_status: 123,
        dynamicMsgId: item.userDynamic.dynamicMsgId,
        ctime: item.userDynamic.createTime
      });
    }
    list.value = arr;
  });
});
</script>
<style lang="sass" scoped></style>
