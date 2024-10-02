<template>
  <el-card class="anchor-news">
    <div class="postInfo dflex">
      <div class="userAvatarWarper">
        <div
          class="UserAvatar__dMFkv"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="mantine-fau73ij36-dropdown"
          id="mantine-fau73ij36-target"
          style="width: 50px; height: 50px"
        >
          <a
            class="avatarLink__u0gFS"
            target="_blank"
            rel="https://apic.douyucdn.cn/upload/avatar_v3/202212/d4f61c2ee2c1493186c1c47bdc10377e_middle.jpg"
            href="/member/qy70JRJZRdXG/main/news"
            ><img
              class="image-avatar"
              src="https://apic.douyucdn.cn/upload/avatar_v3/202212/d4f61c2ee2c1493186c1c47bdc10377e_middle.jpg"
              alt=""
              style="width: 50px; height: 50px" /><i class="mask__ZmHBK"></i
          ></a>
        </div>
      </div>
      <div class="mainContent margin-left">
        <header class="userCardHeader dflex">
          <div class="userCardHeaderLeft">
            <div class="allInfo">
              <div class="margin-bottom-xs">
                <span
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="mantine-hef6gb119-dropdown"
                  id="mantine-hef6gb119-target"
                  class=""
                  ><a
                    class="noline__xDTs-"
                    target="_blank"
                    rel="一条小团团OvO"
                    href="/member/qy70JRJZRdXG/main/news"
                    ><span class="normal ma">一条小团团OvO</span></a
                  ></span
                ><span class="liveStatus"></span>
              </div>
              <div class="timeAndAddressInfo">
                <a
                  class="PostTime"
                  href="/feed/2459229762367869760?origin=1&amp;groupId=2493219"
                  >01月27日 13:33</a
                ><span class="postCardAt__FsV8q"
                  ><a
                    class="linkyuba"
                    target="_blank"
                    href="/discussion/2493219/posts"
                    >一条小团团OvO</a
                  ></span
                >
              </div>
            </div>
          </div>
          <div class="userCardHeaderRight">
            <el-dropdown placement="bottom">
              <el-icon><ArrowDown /></el-icon>
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
            <span
              >小猪仔们，你们好！我又要停播了，距离上一次停播才过去一年，真的很抱歉，我不能陪你们过年了，总之就是有点身不由己，我感觉事情到我这就变得复杂了很多，所以我要停播了，最近这一个多月，我经历了很多有趣的事，还有很多不好的事，感觉自己又成长了很多，如果可以的话，我想把它们变成段子，讲给你们听，提前祝大家新年快乐，不要太想我，我会想你们的。
              我不在的这段时间，会让奶团接管直播间，让他们陪陪你们。</span
            ><a
              class="topic__hQvKu specNode"
              target="_blank"
              data-contenteditable="false"
              data-node-type="topic"
              data-text='[topic src="205695"]#祝大家新年快乐[/topic]'
              title="祝大家新年快乐"
              href="/thema/205695"
              >#祝大家新年快乐</a
            >
          </div>
        </section>
        <section>
          <div class="bottomAction dflex margin-top">
            <span>
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
                    <div class="reactionItem dflex" style="flex-direction: column; margin: 0 10px;" v-for="(item,index) in reactionList" :key="index">
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
            <span class="commentBtn dflex"
              ><img
                src="/images/emio2.svg"
                class="margin-right-xs"
                alt="My Icon"
                width="20"
              /><span>2683</span></span
            ><span class="like dflex"
              ><img
                src="/images/emio3.svg"
                class="margin-right-xs"
                alt="My Icon"
                width="20" /><span style="color: rgb(255, 93, 103)">6906</span
              ><i id="likeref__poeEo"></i></span
            ><span class="dflex" style="padding-right: 80px"
              ><img
                src="/images/emio4.svg"
                class="margin-right-xs"
                alt="My Icon"
                width="20"
              /><span>4</span></span
            >
          </div>
        </section>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { getPopularAnchor } from "@/api/chat";
let list = ref([]);
let headerRightList = ref([
  {
    label: "收藏",
    value: "key_1",
  },
  {
    label: "取消关注",
    value: "key_2",
  },
  {
    label: "举报",
    value: "key_3",
  },
  {
    label: "分享",
    value: "key_4",
  },
]);
let reactionList = ref([
  {
    label: "点赞",
    value: "key_1",
    url:'https://c-yuba.douyucdn.cn/yubares/2024/06/24/7c72e4d78ebd97382d3f26e5a19811e8/7c72e4d78ebd97382d3f26e5a19811e8.gif'
  },
  {
    label: "小丑",
    value: "key_2",
    url:'https://c-yuba.douyucdn.cn/yubares/2024/06/24/db9196946fade857487d59be68b36267/db9196946fade857487d59be68b36267.gif'
  },
  {
    label: "6",
    value: "key_3",
    url:'https://c-yuba.douyucdn.cn/yubavod/admin/common/acf317da9ad35fa498442d704d98d5d3.gif'
  },
  {
    label: "星星眼",
    value: "key_4",
    url:'https://c-yuba.douyucdn.cn/yubares/2024/06/24/83fdf1c0f5cbe371f27e802561c77e20/83fdf1c0f5cbe371f27e802561c77e20.gif'
  },
  {
    label: "已阅",
    value: "key_4",
    url:'https://c-yuba.douyucdn.cn/yubares/2024/06/24/5fb9b6546d750d4de5a8ef871371c582/5fb9b6546d750d4de5a8ef871371c582.gif'
  },
  {
    label: "快哭了",
    value: "key_4",
    url:'https://c-yuba.douyucdn.cn/yubares/2024/06/24/d93d137765536483b8b6c1fdd0539474/d93d137765536483b8b6c1fdd0539474.gif'
  },
  
  {
    label: "生气",
    value: "key_4",
    url:'https://c-yuba.douyucdn.cn/yubares/2024/06/24/44ab7dd05057009730686e0a9b779e08/44ab7dd05057009730686e0a9b779e08.gif'
  },
  
  {
    label: "问号",
    value: "key_4",
    url:'https://c-yuba.douyucdn.cn/yubares/2024/06/24/a9521ac5aff85035d247362b18e7ae76/a9521ac5aff85035d247362b18e7ae76.gif'
  },
  {
    label: "吃瓜",
    value: "key_4",
    url:'https://c-yuba.douyucdn.cn/yubares/2024/06/24/922b1ee01ed1b330cf7aa37e2cf28e74/922b1ee01ed1b330cf7aa37e2cf28e74.gif'
  },
]);

onMounted(() => {
  getPopularAnchor().then((res) => {
    console.log(res.data);
    list.value = res.data.list;
  });
});
</script>

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

}
</style>
