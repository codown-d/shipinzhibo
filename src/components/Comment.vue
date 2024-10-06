<template>
  <div class="comment-card-wrapper" style="margin-bottom: 12px">
    <div class="commentSection dflex" style="align-items: flex-start">
      <img
        class="image userAvatar"
        :src="props.avatar"
        alt=""
        style="
          width: 34px;
          height: 34px;
          border-radius: 34px;
          margin-right: 10px;
        "
      />
      <div class="commentDetail">
        <div class="commentContent">
          <span class="textNode">
            <span class="nickname">{{ props.nick_name }}：</span>
            {{ props.content }}
            <img
              class="image"
              src="https://c-yuba.douyucdn.cn/yubares/2024/07/15/ea22057c0e80b5bcfa418db5907e386e/ea22057c0e80b5bcfa418db5907e386e.png"
              alt="[比心]"
              width="20px"
              style="vertical-align: text-bottom"
            />
          </span>
        </div>
        <div class="commentOperation margin-top">
          <div class="operationLeft">
            <span class="commentTime">{{ formatTime(props.created_ts) }}</span>
            <span class="commentLocation">{{ props.locality }}</span>
          </div>
          <div class="operationRight dflex">
            <!-- <img
              src="/images/emio8.svg"
              class="margin-right"
              alt="My Icon"
              width="14"
            /> -->
            <img
              src="/images/emio7.svg"
              class="margin-right"
              alt="My Icon"
              width="14"
              @click="setCommentInfo(props)"
            />
            <div class="dflex">
              <img
                :src="
                  props.is_liked ? '/images/emio3.svg' : '/images/emio5.svg'
                "
                alt="My Icon"
                width="14"
              />
              <span class="text margin-left-xs" style="font-size: 16px">{{
                props.likes
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="replySection" style="padding-left: 44px">
      <div
        class="commentSection dflex margin-top"
        v-for="item in props.sub_replies"
        style="align-items: flex-start"
      >
        <img
          class="image userAvatar"
          :src="item.avatar"
          alt=""
          style="
            width: 34px;
            height: 34px;
            border-radius: 34px;
            margin-right: 10px;
          "
        />
        <div class="commentDetail">
          <div class="commentContent">
            <span class="textNode">
              <span class="nickname">{{ item.nick_name }}：</span>
              {{ item.content }}
              <img
                class="image"
                src="https://c-yuba.douyucdn.cn/yubares/2024/07/15/ea22057c0e80b5bcfa418db5907e386e/ea22057c0e80b5bcfa418db5907e386e.png"
                alt="[比心]"
                width="20px"
                style="vertical-align: text-bottom"
              />
            </span>
          </div>
          <div class="commentOperation margin-top">
            <div class="operationLeft">
              <span class="commentTime">{{ formatTime(item.created_ts) }}</span>
              <span class="commentLocation">{{ item.locality }}</span>
            </div>
            <div class="operationRight dflex">
              <!-- <img
              src="/images/emio8.svg"
              class="margin-right"
              alt="My Icon"
              width="14"
            /> -->
              <img
                src="/images/emio7.svg"
                class="margin-right"
                alt="My Icon"
                width="14"
                @click="setCommentInfo(item)"
              />
              <div class="dflex">
                <img
                  :src="
                    item.is_liked ? '/images/emio3.svg' : '/images/emio5.svg'
                  "
                  alt="My Icon"
                  width="14"
                />
                <span class="text margin-left-xs" style="font-size: 16px">{{
                  item.likes
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="props.comment_replies"
        class="replyViewMore margin-top-sm"
        style="font-size: 12px; padding-left: 44px; color: #999"
      >
        查看{{ props.comment_replies }}条回复
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="`回复@${actCommentInfo.nick_name}`"
      width="600"
    >
      <chat-message
        shadow="never"
        class="new-msg"
        :messageType="'reply'"
        :body-style="{
          padding: 0,
        }"
      >
      </chat-message>
    </el-dialog>
  </div>
</template>

<script setup>
import { formatTime } from "@/utils/lib";
import ChatMessage from "./ChatMessage.vue";
import { ref, defineProps } from "vue";
let dialogVisible = ref(false);
let actCommentInfo = ref({nick_name:''});
let setCommentInfo = (item) => {
  dialogVisible.value = true;
  actCommentInfo.value = item;
};
const props = defineProps({
  avatar: {
    type: String,
    default: "",
  },
  nick_name: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  created_ts: {
    type: Number,
    default: "",
  },
  locality: {
    type: String,
    default: "",
  },
  is_liked: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  sub_replies: {
    type: Array,
    default: () => [],
  },
  comment_replies: {
    type: Number,
    default: 0,
  },
});
</script>
<style lang="scss" scoped>
.comment-card-wrapper {
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
  .replySection {
  }
  .commentDetail {
    width: 0;
    flex: 1;
  }
}
</style>
