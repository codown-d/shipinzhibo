<template>
  <div>
    <div class="commentPublish" style="margin-top: 20px; margin-bottom: 14px">
      <div class="avatarWrapper dflex">
        <img
          class="image"
          :src="userInfo.avatar"
          alt=""
          style="
            width: 34px;
            height: 34px;
            border-radius: 34px;
            margin-right: 10px;
          "
        />
        <el-input placeholder="评论一下吧~" v-model="msg"></el-input>
      </div>
      <div class="publisher" style="padding-left: 44px">
        <div
          class="toolbars dflex"
          style="justify-content: space-between; margin-top: 16px"
        >
          <div class="pluginContainer dflex">
            <el-popover placement="bottom" trigger="click" width="auto">
              <template #reference>
                <img
                  src="/images/emio.svg"
                  class="margin-right-xs"
                  alt="My Icon"
                  width="20"
                  style="margin-right: 16px"
                />
              </template>
              <template #default>
                <div style="height: 200px; overflow-y: auto">
                  <Emoji @onChange="emojiOnChange" />
                </div>
              </template>
            </el-popover>
            <el-checkbox label="同时转发" v-model="checked" />
          </div>
          <el-button type="primary"> 评论 </el-button>
        </div>
      </div>
    </div>
    <CommentTree
      v-for="node in treeData"
      :key="node.id"
      :node="node"
      @load-node="loadNode"
    />
    <comment
      v-if="false"
      v-for="item in limitedTreeData"
      :avatar="item.avatar"
      :nick_name="item.nick_name"
      :content="item.content"
      :created_ts="item.created_ts"
      :locality="item.locality"
      :is_liked="item.is_liked"
      :likes="item.likes"
      :sub_replies="item.sub_replies"
      :comment_replies="item.comment_replies"
      :key="item.uid"
    ></comment>
    <div
      class="dflex"
      v-if="false"
      style="justify-content: center; font-size: 16px; margin-top: 8px"
    >
      查看全部{{ commentCount }}条回复
      <el-icon><ArrowRightBold /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import Emoji from "./Emoji.vue";
import {
  getReplyAnchorNews,
  getCommentPage,
  getAnswerCommentPage,
} from "@/api/chat";
import Comment from "./Comment.vue";
import { getUserStorage } from "@/utils/auth";
import CommentTree from "./CommentTree.vue";
const checked = ref(false);
const props = defineProps({
  dynamicId: {
    type: Number,
    required: true,
  },
});
let userInfo = ref(getUserStorage());
let comment = ref([]);
let commentCount = ref(0);
const msg = ref("");
let emojiOnChange = (val, item) => {
  msg.value = `${msg.value}${val}`;
};
const treeData = ref([]);
const loadNode = (node, callback) => {
  node.loading = true;
  console.log(node)
  getAnswerCommentPage({
    dynamicId: node.dynamicId,
    dynamicCommentId: node.dynamicCommentId,
    pageNum: 1,
    pageSize: 20,
  }).then((res) => {
    console.log(res.data)
    node.children = res.data.map((item) => {
      console.log(item);
      return {
        ...item,
        loading: false,
        children: [],
        isLeaf:item.answerCommentCount==0,
        userInfo: item.userInfo
          ? JSON.parse(item.userInfo)
          : { avatar: "", nick: "" },
      };
    });
    node.loading = false;
    callback();
  });
};
const limitTreeData = (nodes, limit = 5) => {
  let result = [];
  let count = 0;
  const traverse = (node) => {
    if (count >= limit) return;

    result.push({
      ...node,
      sub_replies: [],
    });
    count++;

    if (node.sub_replies && node.sub_replies.length > 0) {
      let childrenCount = 0;
      for (let child of node.sub_replies) {
        if (count >= limit || childrenCount >= 2) break;
        result[result.length - 1].sub_replies.push({
          ...child,
        });
        count++;
        childrenCount++;
      }
    }
  };

  for (let node of nodes) {
    if (count >= limit) break;
    traverse(node);
  }

  return result;
};

const limitedTreeData = computed(() => limitTreeData(comment.value));
onMounted(() => {
  // getReplyAnchorNews().then((res) => {
  //   comment.value = res.data.list;
  //   commentCount.value = res.data.count;
  // });
  getCommentPage({
    dynamicId: props.dynamicId,
    childPageNum: 1,
    childPageSize: 20,
    pageNum: 1,
    pageSize: 20,
  }).then((res) => {
    treeData.value = res.data.map((item) => {
      console.log(item);
      return {
        ...item,
        loading: false,
        children: [],
        isLeaf:item.answerCommentCount==0,
        userInfo: item.userInfo
          ? JSON.parse(item.userInfo)
          : { avatar: "", nick: "" },
      };
    });
  });
});
</script>

<style lang="scss">
.new-msg {
  border: 0px !important;
}
</style>
<style lang="scss" scoped>
.anchor-news {
  .image-avatar {
    border-radius: 50%;
  }
  .postInfo {
    align-items: flex-start;
  }
  .userCardHeader {
    justify-content: space-between;
    align-items: flex-start;
  }
  .normal {
    font-weight: 600;
    font-size: 19px;
  }
  .timeAndAddressInfo {
    font-size: 16px;
  }
  .PostTime {
    color: #999;
  }
  .linkyuba {
    color: #3e7abc;
    margin-left: 10px;
  }
  .bottomAction {
    font-size: 16px;
    align-items: center;
    justify-content: space-between;
  }
  .holderSection {
    font-size: 20px;
  }
  .specNode {
    color: #3e7abc;
  }
  .followBtn {
  }
  .like {
    color: rgb(255, 93, 103);
  }
  .contentSection-name {
    color: #333;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 6px;
  }
  .contentSection {
    display: -webkit-box;
    font-weight: 400;
    line-height: 20px;
    position: relative;
    width: 100%;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    color: grey;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
