<template>
  <div class="tree-node">
    <div
      class="tree-node-content"
      style="margin-bottom: 12px"
      @click="toggleExpand"
    >
      <div class="commentSection dflex" style="align-items: flex-start">
        <img class="image userAvatar" :src="props.node.userInfo?.avatar" />
        <div class="commentDetail">
          <div class="commentContent">
            <span class="textNode">
              <span class="nickname">{{ props.node.userInfo?.nick }}：</span>
              {{ props.node.comment }}
            </span>
          </div>
          <div class="commentOperation margin-top">
            <div class="operationLeft">
              <span class="commentTime">{{
                formatTime(props.node.createTime)
              }}</span>
              <span class="commentLocation" v-if="false">{{
                props.node.locality
              }}</span>
            </div>
            <div class="operationRight dflex">
              <!-- 子级评论 -->
              <img
                src="/images/emio7.svg"
                class="margin-right"
                alt="My Icon"
                width="14"
                @click="setCommentInfo(props.node)"
              />
              <div class="dflex">
                <img
                  :src="
                    props.node.hasLike
                      ? '/images/emio3.svg'
                      : '/images/emio5.svg'
                  "
                  width="14"
                />
                <span class="text margin-left-xs" style="font-size: 16px">{{
                  props.node.commentLikeNum
                }}</span>
              </div>
            </div>
          </div>

          <div 
            @click.stop="add()"
            v-if="
              !props.node.isLeaf && node.children.length == 0||node.children.length != 0&&expanded==false
            "
            class="show-more"
            style="cursor: pointer"
          >
            <span value="" v-if="props.node.loading">
              <el-icon class="spinner"><Refresh /></el-icon>
            </span>
            查看{{ props.node.answerCommentCount }}条回复
          </div>
        </div>
      </div>
    </div>

    <!-- 子节点递归渲染 -->
    <div v-if="expanded" class="children">
      <CommentTree
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @add-node="$emit('add-node', child)"
        @load-node="(child,callback)=>$emit('load-node', child, callback)"
      />
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="`回复@${actCommentInfo.nick}`"
      width="600"
    >
      <chat-message
        shadow="never"
        class="new-msg"
        :messageType="'reply'"
        :body-style="{
          padding: 0,
        }"
        :node="currentNode"
      >
      </chat-message>
    </el-dialog>
  </div>
</template>

<script setup>
import ChatMessage from "./ChatMessage.vue";
import { ref, computed, defineEmits } from "vue";
import { formatTime } from "@/utils/lib";


let dialogVisible = ref(false);//显示子级评论
// 定义 props
const props = defineProps({
  node: Object,
});
const expanded = ref(false); // 控制展开和折叠

// 判断节点是否有子节点或需要懒加载
const hasChildren = computed(
  () =>
    (!props.node.isLeaf)
);
const emit = defineEmits(["load-node", "add-node"]);
// 展开/折叠节点
const toggleExpand = () => {
  if(!hasChildren)return ;
  if (!props.node.isLeaf&&!props.node.children.length && !props.node.loading) {
    // 触发懒加载
    // emit("load-node", props.node, () => (expanded.value = true));
  } else {
    expanded.value = !expanded.value;
  }
};

// 添加子节点
const add = () => {
  if (!props.node.isLeaf&&!props.node.children.length && !props.node.loading) {
    // 触发懒加载
    emit("load-node", props.node, () => {
      expanded.value = true
    });
  } else {
    expanded.value = !expanded.value;
  }
};

//子级评论
const actCommentInfo = ref({});
const currentNode = ref(null);//存评论的数据
const setCommentInfo =(node) => {
  // console.log('子级的数据',node.userInfo);
  currentNode.value = node; // 将 node 数据赋值给 currentNode
  dialogVisible.value = true;
  actCommentInfo.value = node.userInfo;//子级用户名称
  
}
</script>

<style scoped lang="scss">
.tree-node {
  .commentContent {
    font-size: 18px;
  }
  .nickname {
    color: grey;
  }
  .textNode {
    vertical-align: middle;
  }
  .commentOperation {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .operationLeft {
    font-size: 16px;
    .commentTime {
      color: #999;
      margin-right: 16px;
    }
  }
  .operationRight {
    color: #909090;
  }
  .commentDetail {
    width: 0;
    flex: 1;
  }
  .show-more {
    font-size: 16px;
  }
  .children {
    margin-left: 44px;
  }
  .userAvatar {
    width: 34px;
    height: 34px;
    border-radius: 34px;
    margin-right: 10px;
  }
}
.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite; /* 动画 */
}

@keyframes spin {
  0% {
    transform: rotate(0deg); /* 从 0 度开始 */
  }
  100% {
    transform: rotate(360deg); /* 旋转 360 度 */
  }
}
</style>
