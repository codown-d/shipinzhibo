<template>
  <el-card class="anchor-news">
    <div class="postInfo dflex">
      <div class="userAvatarWarper">
        <div class="UserAvatar" style="width: 50px; height: 50px">
          <a class="avatarLink" target="_blank">
            <img
              class="image-avatar"
              :src="dataInfo.publisher.avatar"
              alt=""
              style="width: 50px; height: 50px"
            />
          </a>
        </div>
      </div>
      <div class="mainContent margin-left">
        <header class="userCardHeader dflex">
          <div class="userCardHeaderLeft">
            <div class="allInfo">
              <div class="margin-bottom-xs">
                <span>
                  <a class="noline" target="_blank">
                    <span class="normal">{{
                      dataInfo.publisher.nick
                    }}</span>
                  </a>
                </span>
                <span class="liveStatus"></span>
              </div>
              <div class="timeAndAddressInfo">
                <a class="PostTime margin-right-xs">{{ formatTime(dataInfo.ctime) }}</a>
                <span class="postCardAt">
                  <a>{{ dataInfo.publisher.nick }}</a>
                </span>
              </div>
            </div>
          </div>
          <div class="userCardHeaderRight dflex">
            <el-button
              :size="'small'"
              class="followBtn margin-right-xs"
              round
              v-if="dataInfo.follow_status !== 1"
              >关注</el-button
            >
            <el-dropdown placement="bottom">
              <el-icon>
                <ArrowDown />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="item in headerRightList"
                    :key="item.value"
                    style="width: 112px"
                    >{{ item.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </header>
        <section class="postCardBody margin-top">
          <div class="holderSection" style="--last-holder-size: 0px">
            <span>{{ dataInfo.text }}</span>
          </div>
        </section>
        <section>
          <div class="bottomAction dflex margin-top">
            <span v-if="false">
              <el-popover width="auto" placement="top">
                <template #reference>
                  <div class="dflex">
                    <img
                      src="/images/emio1.svg"
                      class="margin-right-xs"
                      alt="My Icon"
                      width="20"
                    /><span>表态</span>
                  </div>
                </template>
                <template #default>
                  <div class="reaction dflex" style="">
                    <div
                      class="reactionItem dflex"
                      style="flex-direction: column; margin: 0 10px"
                      v-for="(item, index) in reactionList"
                      :key="index"
                    >
                      <img
                        class="image emotionIcon"
                        :src="item.url"
                        :alt="item.label"
                        width="40"
                      />
                      <span class="text">{{ item.label }}</span>
                    </div>
                  </div>
                </template>
              </el-popover>
            </span>
            <span
              class="commentBtn dflex"
              @click="showReply()"
            >
              <img
                src="/images/emio2.svg"
                class="margin-right-xs"
                alt="My Icon"
                width="20"
              />
              <span>{{ dataInfo.comment_count }}</span>
            </span>
            <span
              class="dflex"
              :class="dataInfo.liked ? 'like' : ''"
              @click="getLikeFn(dataInfo)"
            >
              <img
                :src="
                  dataInfo.liked ? '/images/emio3.svg' : '/images/emio5.svg'
                "
                class="margin-right-xs"
                alt="My Icon"
                width="20"
              />
              <span>{{ dataInfo.like_count }}</span>
            </span>
            <span
              class="dflex"
              @click="reactionFn()"
              style="padding-right: 80px"
              ><img
                src="/images/emio4.svg"
                class="margin-right-xs"
                alt="My Icon"
                width="20"
              />
              <!-- <span>{{ dataInfo.relay_count }}</span> -->
            </span>
          </div>
        </section>
      </div>
    </div>
    <reply-comment v-if="replyVisible" :dynamicId='dataInfo.dynamicMsgId' ></reply-comment>
    <el-dialog v-model="dialogVisible" title="转发动态" width="600">
      <chat-message
        shadow="never"
        class="new-msg forward"
        :body-style="{
          padding: 0,
        }"
      >
        <div>
          <div
            class="dflex"
            style="background-color: #eee; align-items: flex-start"
          >
            <img
              class="margin-right-xs"
              :src="dataInfo.publisher.avatar"
              style="width: 84px; height: 84px"
            />
            <div style="flex: 1; width: 0">
              <p class="contentSection-name margin-top-xs">
                {{ dataInfo.publisher.nick }}
              </p>
              <p class="contentSection margin-top-xs">
                {{ dataInfo.text }}
              </p>
            </div>
          </div>
        </div>
      </chat-message>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { formatTime } from "@/utils/lib";
import { ref, defineProps, onMounted, watch } from "vue";
import { getLike, getUnlike } from "@/api/chat";
import ChatMessage from "./ChatMessage.vue";
import ReplyComment from "./ReplyComment.vue";
import { ElMessage } from 'element-plus'
import { message } from "@/utils/message";
const props = defineProps({
  group: {
    type: Object,
    default: { group_id: 0, group_name: "" },
  },
  publisher: {
    type: Object,
    default: {
      uid: 0,
      nick: "",
      avatar: "",
      room_id: 0,
    },
  },
  ctime: {
    type: Number,
    default: "",
  },
  follow_status: {
    type: Number,
    default: 1,
  },
  comment_count: {
    type: Number,
    default: 0,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  like_count: {
    type: Number,
    default: 0,
  },
  relay_count: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    default: "",
  },
  dynamicMsgId: {
    type: Number,
    default: 0,
  },
});
let dataInfo = ref({ ...props });
const dialogVisible = ref(false);
const replyVisible = ref(false);
let list = ref([]);
let headerRightList = ref([
  // {
  //   label: "收藏",
  //   value: "key_1",
  // },
  {
    label: dataInfo.liked ? "取消关注" : "关注",
    value: "key_2",
  },
  // {
  //   label: "举报",
  //   value: "key_3",
  // },
  // {
  //   label: "分享",
  //   value: "key_4",
  // },
]);
let reactionList = ref([
  {
    label: "点赞",
    value: "key_1",
    url: "https://c-yuba.douyucdn.cn/yubares/2024/06/24/7c72e4d78ebd97382d3f26e5a19811e8/7c72e4d78ebd97382d3f26e5a19811e8.gif",
  },
  {
    label: "小丑",
    value: "key_2",
    url: "https://c-yuba.douyucdn.cn/yubares/2024/06/24/db9196946fade857487d59be68b36267/db9196946fade857487d59be68b36267.gif",
  },
  {
    label: "6",
    value: "key_3",
    url: "https://c-yuba.douyucdn.cn/yubavod/admin/common/acf317da9ad35fa498442d704d98d5d3.gif",
  },
  {
    label: "星星眼",
    value: "key_4",
    url: "https://c-yuba.douyucdn.cn/yubares/2024/06/24/83fdf1c0f5cbe371f27e802561c77e20/83fdf1c0f5cbe371f27e802561c77e20.gif",
  },
  {
    label: "已阅",
    value: "key_4",
    url: "https://c-yuba.douyucdn.cn/yubares/2024/06/24/5fb9b6546d750d4de5a8ef871371c582/5fb9b6546d750d4de5a8ef871371c582.gif",
  },
  {
    label: "快哭了",
    value: "key_4",
    url: "https://c-yuba.douyucdn.cn/yubares/2024/06/24/d93d137765536483b8b6c1fdd0539474/d93d137765536483b8b6c1fdd0539474.gif",
  },

  {
    label: "生气",
    value: "key_4",
    url: "https://c-yuba.douyucdn.cn/yubares/2024/06/24/44ab7dd05057009730686e0a9b779e08/44ab7dd05057009730686e0a9b779e08.gif",
  },

  {
    label: "问号",
    value: "key_4",
    url: "https://c-yuba.douyucdn.cn/yubares/2024/06/24/a9521ac5aff85035d247362b18e7ae76/a9521ac5aff85035d247362b18e7ae76.gif",
  },
  {
    label: "吃瓜",
    value: "key_4",
    url: "https://c-yuba.douyucdn.cn/yubares/2024/06/24/922b1ee01ed1b330cf7aa37e2cf28e74/922b1ee01ed1b330cf7aa37e2cf28e74.gif",
  },
]);

let forwardItem = ref();

let showReply=(item)=>{
  replyVisible.value = !replyVisible.value
}
let getLikeFn = (item) => {
  !dataInfo.value.liked
    ? getLike({ dynamicId: item.dynamicMsgId, isSendMsg:false}).then((res) => {
        if (res.code == 200) {
          
          console.log('点赞成功有走吗', )
          dataInfo.value.liked = true;
          dataInfo.value.like_count = dataInfo.value.like_count + 1;
          // ElMessage({message: "点赞成功",type: "success",});
          message("点赞成功", { type: "success" });
        }
      })
    : getUnlike({ dynamicId: item.dynamicMsgId }).then((res) => {
        if (res.code == 200) {
          dataInfo.value.liked = false;
          dataInfo.value.like_count = dataInfo.value.like_count - 1;
          // ElMessage({message: "取消点赞成功",type: "success",});
          message("取消点赞成功", { type: "success" });
        }
      });
};
let reactionFn = (item) => {
  forwardItem.value = item;
  dialogVisible.value = true;
};
watch(props, (newValue, oldValue) => {
  dataInfo.value=newValue
},{ deep: true });
onMounted(() => {
  // getPopularAnchor().then((res) => {
  //   list.value = res.data.list;
  // });
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
  .mainContent{
    width: 0;
    flex: 1;
  }
}
</style>
