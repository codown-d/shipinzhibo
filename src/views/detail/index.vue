<template>
  <div class="detailsPage">
    <!-- 首页标题组件 -->
    <div>
      <Navbar></Navbar>
    </div>
    <div class="detailsPage-navbox">
      <!-- 左侧菜单栏-->
      <div class="left-menu">
        <Leftmenu v-model:isCollapsed="isCollapsed"></Leftmenu>
      </div>
      <!-- 右侧展示内容-->
      <div class="layout-Main">
        <!-- 左侧直播间+右侧评论区 -->
        <div class="detailsRight">
          <!-- 左侧直播间 -->
          <div class="detailsRight-left">
            <div class="detailsRight-left-top">
              <!-- 直播间房号标题之类 -->
              <div class="detailsRight-titlecontent">
                <img
                  class="titlecontent-img"
                  src="https://avatars.githubusercontent.com/u/44761321"
                  alt=""
                />
                <div class="titlecontent-nav">
                  <div class="titlecontent-nav-title">用实力堵住你的嘴</div>
                  <div class="titlecontent-nav-bott">
                    <div class="titlecontent-roomnumber">
                      房间号：{{ 2408308 }}
                    </div>
                    <div class="titlecontent-report">
                      <img
                        class="titlecontent-report-icon"
                        src="@/assets/images/zbjbt.svg"
                        alt=""
                      />
                      <span class="titlecontent-report-jb">举报</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 关注+在线人数 -->
              <div class="detailsRight-followshare">
                <div class="followshare-box">
                  <!-- <div class="followshare-follow" :class="{ selected: isFollowSelected }" @click="toggleSelected('follow')">
                    <img class="followshare-follow-img" src="@/assets/images/guanzhu.svg" alt="">
                    <span :class="{ 'followshare-follow-gz': true, selected: isFollowSelected }">关注</span>
                  </div>
                  <div class="followshare-share" :class="{ selected: isShareSelected }" @click="toggleSelected('share')">15984</div> -->
                  <div
                    class="followshare-follow"
                    @click="toggleSelected('follow')"
                  >
                    <img
                      v-if="!isShareSelected"
                      class="followshare-follow-img"
                      src="@/assets/images/guanzhu.svg"
                      alt=""
                    />
                    <span v-if="!isShareSelected" class="followshare-follow-gz"
                      >关注</span
                    >
                    <span v-if="isShareSelected" class="followshare-follow-gz"
                      >已关注</span
                    >
                  </div>
                  <div class="followshare-share">15984</div>
                </div>
                <img
                  class="followshare-img"
                  src="@/assets/images/fxzbj.svg"
                  alt=""
                />
              </div>
            </div>
            <!-- 直播间标签 -->
            <div class="artplayer-zbj"></div>
            <!-- 福袋小游戏之类 -->
            <div class="detailsRight-bonus-box">
              <!-- 左侧福袋红包 -->
              <div class="bonus-redpacket">
                <div class="bonus-redpacket-left">
                  <img
                    class="bonus-redpacket-leftimg"
                    src="@/assets/images/fdgz.png"
                    alt=""
                  />
                </div>
                <div class="bonus-redpacket-right">
                  <img
                    class="bonus-redpacket-rightimg"
                    src="@/assets/images/redpacket1.png"
                    alt=""
                  />
                  <img
                    class="bonus-redpacket-rightimg"
                    src="@/assets/images/redpacket2.png"
                    alt=""
                  />
                  <img
                    class="bonus-redpacket-rightimg"
                    src="@/assets/images/redpacket3.png"
                    alt=""
                  />
                  <img
                    class="bonus-redpacket-rightimg"
                    src="@/assets/images/redpacket4.png"
                    alt=""
                  />
                  <img
                    class="bonus-redpacket-rightimg"
                    src="@/assets/images/redpacket5.png"
                    alt=""
                  />
                </div>
              </div>
              <!-- 右侧小游戏 -->
              <div class="mini-games">
                <img
                  class="mini-gamesimg"
                  src="@/assets/images/redpacket1.png"
                  alt=""
                />
                <img
                  class="mini-gamesimg"
                  src="@/assets/images/redpacket1.png"
                  alt=""
                />
                <img
                  class="mini-gamesimg"
                  src="@/assets/images/redpacket1.png"
                  alt=""
                />
                <img
                  class="mini-gamesimg"
                  src="@/assets/images/redpacket1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <!-- 右侧评论区 -->
          <div class="detailsRight-right">
            <div class="detailsRight-right-top">
              <div class="detailsRight-icon">
                <img
                  class="detailsRight-img"
                  src="@/assets/images/zbdt.svg"
                  alt=""
                />
              </div>
              <div class="detailsRight-namebox">
                <div class="detailsRight-zbdt">直播大厅</div>
                <div class="detailsRight-number">2658</div>
              </div>
            </div>
            <!-- 聊天内容区 -->
            <div class="detailsRight-chatbox">
              <div class="detailsRight-chatnav">
                <div class="detailsRight-promptcontent">
                  用户:您好，欢迎加入观看体育欧洲杯赛事直播，请大家注意财产安全，理性消费，谨防网络诈骗。腾博会与您一同观看投注，更多优惠请咨我!!
                </div>
                <!-- 评论区 -->
                <div class="detailsRight-chatreview">
                  <div
                    class="chatMessage"
                    v-for="(item, i) in messageList"
                    :key="item.uid"
                  >
                    <div class="chatMessage-username">{{ item.uid }}</div>
                    <div class="chatMessage-maohao">:</div>
                    <div class="chatMessage-usertext">{{ item.dataName }}</div>
                  </div>
                </div>
                <!-- 弹幕勾选 -->
                <div class="scrolling-checkbox">
                  <el-checkbox
                    v-model="checkedStatus"
                    @change="handleChange"
                    class="custom-checkbox"
                  ></el-checkbox>
                  <div class="scrolling-sbmit" style="margin-left: 4px">
                    弹幕发送
                  </div>
                </div>
              </div>

              <!-- 输入框-评论 -->
              <div class="detailsRight-chatinputfield">
                <input
                  class="input-text"
                  placeholder="跟大家互动一下…"
                  type="text"
                  v-model="reviewtext"
                  @input="checkText"
                />
                <div class="detailsRight-emojisend">
                  <img
                    class="detailsRight-emoji"
                    @click="toggle"
                    src="@/assets/images/emoji.svg"
                    alt=""
                  />
                  <img
                    class="detailsRight-send"
                    @click="getSbmitmessage"
                    :src="hasText ? send2Svg : sendSvg"
                    alt=""
                  />
                </div>
                <!-- 表情包组件 -->
                <Picker
                  v-if="showEmojiPicker"
                  :data="emojiIndex"
                  class="emoji-picker"
                  @select="showEmoji"
                  :i18n="I18N"
                  :showSearch="false"
                  :infiniteScroll="false"
                  :showCategories="false"
                  :showPreview="false"
                  :categories="['smileys']"
                  :emoji="defaultEmoji"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
import Navbar from "@/components/navbar.vue";
import Leftmenu from "@/components/Leftmenu.vue";
import { getRoomKey, getMessageKey } from "@/api/room";
import { useRoute } from "vue-router";
import { JcLive } from "@/utils/live";
import { useAppStoreHook } from "@/store/modules/app";
import {
  ref,
  onMounted,
  onUpdated,
  watch,
  onBeforeUnmount,
  shallowRef,
} from "vue";
import router from "@/router";
import { getToken } from "@/utils/auth"; //获取token
import sendSvg from "@/assets/images/send.svg";
import send2Svg from "@/assets/images/send2.svg";
import { Room, RoomEvent } from "livekit-client";
import Artplayer from "artplayer";
import data from "emoji-mart-vue-fast/data/all.json"; //表情包资源
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, Emoji, EmojiIndex } from "emoji-mart-vue-fast/src"; //
import artplayerPluginDanmuku from "artplayer-plugin-danmuku";

// 左侧展开收起状态
const isCollapsed = ref(false);
//输入框评论数据
const reviewtext = ref("");
//表情包数据
const I18N = {
  categories: {
    recent: "",
    smileys: "",
  },
};
let include = ["smileys"];
console.log(data);
data.categories = data.categories.filter((item) => include.includes(item.id));
let emojiIndex = new EmojiIndex(data, {
  include,
});
console.log(emojiIndex, data);
const showEmojiPicker = ref(false); //表情包显示状态
const defaultEmoji = ref("smile"); //打开组件会默认选中笑脸
const toggle = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};
//选中表情包赋值输入框
const showEmoji = (emoji) => {
  console.log("选中表情包", emoji);
  reviewtext.value = `${reviewtext.value} ${emoji.native}`;
  checkText();
};
//勾选是否发送弹幕
const checkedStatus = ref(false);
const handleChange = (checked) => {
  console.log("勾选状态", checked);
};

//模拟弹幕接口 正常是一个websocket链接 或者一个setInterval 的定时http请求
const getCurtainBomb = () => {
  setInterval(() => {
    console.log(art.value);
    if (art.value) {
      art.value.plugins.artplayerPluginDanmuku.emit({
        text: "661236", // 文本
        time: 5, // 所在时间单位秒，默认取播放器当前时间
        color: "#fff", // 颜色
        size: 25, // 尺寸
        border: false, // 是否有描边
        // mode: 0, // 模式: 滚动 0 或者静止 1
      });
      // art.value.danmuku.add({
      //   text: "New Danmuku!",
      //   time: 5, // Time in seconds when the danmuku will appear
      // });
    }
  }, 5000);
};

getCurtainBomb();
// 关注按钮+在线人数切换状态
// const isFollowSelected = ref(false);
// const isShareSelected = ref(false);
// const toggleSelected = (item) => {
//   if (item === 'follow') {
//     isFollowSelected.value = true;
//     isShareSelected.value = false;
//   } else if (item === 'share') {
//     isFollowSelected.value = false;
//     isShareSelected.value = true;
//   }
// }
const isShareSelected = ref(false);
const toggleSelected = (item) => {
  console.log("点击关注了吗0", isShareSelected.value);
  if (isShareSelected.value == true) {
    isShareSelected.value = false;
    console.log("点击关注了吗1", isShareSelected.value);
  } else if (isShareSelected.value == false) {
    isShareSelected.value = true;
    console.log("点击关注了吗2", isShareSelected.value);
  }
};
//聊天输入框
const hasText = ref(false); //输入框是否有内容
const checkText = () => {
  hasText.value = reviewtext.value.trim() !== "";
  console.log("[ 是否有内容 ] >", hasText.value);
};
//聊天信息数据
const messageList = ref([
  // {
  //   uid:'晓六六',
  //   dataName:'天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!'
  // },
  // {
  //   uid:'晓六六六六六六',
  //   dataName:'天啊我想亲一口！！好爱！'
  // },
  // {
  //   uid:'晓六六',
  //   dataName:'天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!'
  // },
  // {
  //   uid:'晓六六六六六六',
  //   dataName:'天啊我想亲一口！！好爱！'
  // },
  // {
  //   uid:'晓六六',
  //   dataName:'天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!'
  // },
  // {
  //   uid:'晓六六六六六六',
  //   dataName:'天啊我想亲一口！！好爱！'
  // },
  // {
  //   uid:'晓六六',
  //   dataName:'天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!'
  // },
  // {
  //   uid:'晓六六六六六六',
  //   dataName:'天啊我想亲一口！！好爱！'
  // },
  // {
  //   uid:'晓六六',
  //   dataName:'天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!'
  // },
  // {
  //   uid:'晓六六六六六六',
  //   dataName:'天啊我想亲一口！！好爱！'
  // },
  // {
  //   uid:'晓六六',
  //   dataName:'天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!'
  // },
  // {
  //   uid:'晓六六六六六六',
  //   dataName:'天啊我想亲一口！！好爱！'
  // },
  // {
  //   uid:'晓六六',
  //   dataName:'天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!天啊我想亲一口!!好爱!'
  // },
  // {
  //   uid:'晓六六六六六六',
  //   dataName:'天啊我想亲一口！！好爱！'
  // },
]);
//聊天发送消息
const getSbmitmessage = () => {
  //输入内容为空不允许发送
  if (hasText.value == false) {
    return;
  }
  let param = {
    rid: rid,
    message: reviewtext.value,
  };
  const needToken = true; // 根据实际需要设置是否需要token
  getMessageKey(param, needToken).then((res) => {
    console.log("发送成功吗", res);
    if (res.message == "SUCCESS") {
      if (checkedStatus) {
        art.value.plugins.artplayerPluginDanmuku.emit({
          text: reviewtext.value, // 文本
          time: 0, // 所在时间单位秒，默认取播放器当前时间
          color: "#fff", // 颜色
          size: 25, // 尺寸
          border: false, // 是否有描边
          // mode: 0, // 模式: 滚动 0 或者静止 1
        });
      }
      reviewtext.value = ""; //成功就清空输入框
      showEmojiPicker.value = false; //发送成功隐藏表情框
    }
    checkText();
  });
};
//键盘事件发送消息
const handleKeyUp = (event) => {
  // console.log('[ 键盘事件 ] >', event)
  if (event.key === "Enter") {
    getSbmitmessage(); //发送消息
  }
};
// 获取路由+获取上个页面传来的路由用户rid
const route = useRoute();
const rid = +route.params.rid;
//获取token
const token = getToken();
const toogleVideo = (i) => {
  const needToken = true; // 根据实际需要设置是否需要token
  getRoomKey({ rid }, needToken).then((res) => {
    console.log("返回的是什么", res.data);
    //获取直播间token+播放url地址
    let { url, token } = res.data;
    // initArtplayer(url + "#" + token);
    initArtplayer("https://artplayer.org/assets/sample/video.mp4");
  });
};
//utf-8转成字符串-包含emoji表情包格式转换
const utf8ArrayToString = (array) => {
  let out = "";
  let i = 0;
  const len = array.length;
  while (i < len) {
    let c = array[i++];
    if (c < 128) {
      out += String.fromCharCode(c);
    } else if (c >= 192 && c < 224) {
      let char2 = array[i++];
      out += String.fromCharCode(((c & 31) << 6) | (char2 & 63));
    } else if (c >= 224 && c < 240) {
      let char2 = array[i++];
      let char3 = array[i++];
      out += String.fromCharCode(
        ((c & 15) << 12) | ((char2 & 63) << 6) | (char3 & 63)
      );
    } else if (c >= 240 && c < 248) {
      let char2 = array[i++];
      let char3 = array[i++];
      let char4 = array[i++];
      let codePoint =
        ((c & 7) << 18) |
        ((char2 & 63) << 12) |
        ((char3 & 63) << 6) |
        (char4 & 63);
      if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        out += String.fromCharCode(0xd800 + (codePoint >> 10));
        out += String.fromCharCode(0xdc00 + (codePoint & 0x3ff));
      } else {
        out += String.fromCharCode(codePoint);
      }
    }
  }
  return out;
};
//WebRTC协议播放
let art = shallowRef(null);
const initArtplayer = (playLink) => {
  console.log("直播间url+直播间token playLink", playLink);
  console.log("直播间rid", rid);
  if (art.value) {
    art.value.destroy();
  }
  art.value = new Artplayer({
    container: ".artplayer-zbj",
    fullscreen: true, //全屏
    fullscreenWeb: true, //网页全屏
    autoMini: true, //当播放器滚动到浏览器视口以外时，自动进入 迷你播放 模式

    playbackRate: true, //是否显示视频播放速度功能
    setting: true, //设置面板 的开关按钮

    isLive: true, //直播模式隐藏进度条和播放时间
    type: "m3u8",

    customType: {
      webrtc: function playWebRTC(video, url, art) {
        if (art.webrtc) art.webrtc.disconnect();
        const [playUrl, token] = url.split("#");
        //视频订阅
        const client = new Room();
        //加入房间
        client.on(
          RoomEvent.TrackSubscribed,
          (track, publication, participant) => {
            if (track.kind === "video") {
              track.attach(video);
            }
          }
        );
        //获取聊天记录
        client.on(RoomEvent.DataReceived, (message) => {
          const utf8Array = utf8ArrayToString(message);
          // 将字符串数据解析为 JavaScript 对象
          const dataObject = JSON.parse(utf8Array);
          console.log("转成对象了", dataObject);
          //消息类型处理
          if (dataObject.first == 10) {
            // 新的聊天数据拼接到旧数据后面
            messageList.value = [
              ...messageList.value,
              {
                uid: dataObject.data.uid,
                dataName: dataObject.data.data,
              },
            ];
          } else if (dataObject.first == 400) {
            messageList.value = [
              ...messageList.value,
              {
                uid: dataObject.data.uid,
                dataName: "进入直播间",
              },
            ];
          } else if (dataObject.first == 401) {
            messageList.value = [
              ...messageList.value,
              {
                uid: dataObject.data.uid,
                dataName: "离开直播间",
              },
            ];
          }
        });

        client.connect(playUrl, token);
        art.webrtc = client;
        // debugger
        // 销毁时断开连接
        art.on("destroy", () => {
          if (art.webrtc) {
            art.webrtc.disconnect();
            art.webrtc = null;
          }
        });
      },
    },
    //  video: {
    //    url: playLink, // 将 WebRTC 流的 URL 设置到 video.url 中
    //  },
    url: playLink,
    plugins: [
      artplayerPluginDanmuku({
        danmuku: [
          {
            text: "666",
            time: 5,
            color: "#fff",
            border: false,
            mode: 0,
          },
          {
            text: "233",
            time: 10,
            color: "#fff",
            border: false,
            mode: 0,
          },
        ],
        // 以下为非必填
        speed: 5, // 弹幕持续时间，范围在[1 ~ 10]
        margin: [10, "25%"], // 弹幕上下边距，支持像素数字和百分比
        opacity: 1, // 弹幕透明度，范围在[0 ~ 1]
        color: "#FFFFFF", // 默认弹幕颜色，可以被单独弹幕项覆盖
        mode: 0, // 默认弹幕模式: 0: 滚动，1: 顶部，2: 底部
        modes: [0, 1, 2], // 弹幕可见的模式
        fontSize: 25, // 弹幕字体大小，支持像素数字和百分比
        antiOverlap: true, // 弹幕是否防重叠
        synchronousPlayback: false, // 是否同步播放速度
        mount: undefined, // 弹幕发射器挂载点, 默认为播放器控制栏中部
        heatmap: true, // 是否开启热力图
        width: 512, // 当播放器宽度小于此值时，弹幕发射器置于播放器底部
        points: [], // 热力图数据
        filter: (danmu) => danmu.text.length <= 100, // 弹幕载入前的过滤器
        beforeVisible: () => true, // 弹幕显示前的过滤器，返回 true 则可以发送
        visible: true, // 弹幕层是否可见
        emitter: false, // 是否开启弹幕发射器
        maxLength: 200, // 弹幕输入框最大长度, 范围在[1 ~ 1000]
        lockTime: 5, // 输入框锁定时间，范围在[1 ~ 60]
        theme: "dark", // 弹幕主题，支持 dark 和 light，只在自定义挂载时生效
        OPACITY: {}, // 不透明度配置项
        FONT_SIZE: {}, // 弹幕字号配置项
        MARGIN: {}, // 显示区域配置项
        SPEED: {}, // 弹幕速度配置项
        COLOR: [], // 颜色列表配置项
        // 手动发送弹幕前的过滤器，返回 true 则可以发送，可以做存库处理
        beforeEmit(danmu) {
          return new Promise((resolve) => {
            console.log(danmu);
            setTimeout(() => {
              resolve(true);
            }, 1000);
          });
        },
      }),
    ],
  });

  // art.value.on("ready", () => {});
  // art.value.switchUrl(playLink); //切换播放url
  window.art = art.value;
};

//监听设备是PC还是移动端，小于800的话device=mobile是移动端，否则device=desktop
const store = useAppStoreHook();

onMounted(() => {
  console.log("[ 路由是什么 ] >", route);
  console.log("[ 2是什么 ] >", store.device);
  console.log("[ rid是什么 ] >", rid);
  console.log("[ token是什么 ] >", token.access_token);
  // 关注在线人数默认值
  //isFollowSelected.value = true; // 默认选中 followshare-follow
  //绑定键盘事件
  window.addEventListener("keyup", handleKeyUp);
  // 初始化isCollapsed的值为false
  isCollapsed.value = false;
  const layoutMain = document.querySelector(".layout-Main");
  if (isCollapsed.value == false) {
    layoutMain.style.paddingLeft = "112px";
  } else {
    layoutMain.style.paddingLeft = "268px";
  }
  toogleVideo(); //获取直播间url，token
});
onBeforeUnmount(() => {
  window.removeEventListener("keyup", handleKeyUp);
});
onUpdated(() => {
  //获取侧边栏点击收起展开状态
  const layoutMain = document.querySelector(".layout-Main");
  if (isCollapsed.value == false) {
    layoutMain.style.paddingLeft = "112px";
  } else {
    layoutMain.style.paddingLeft = "268px";
  }
});
// watch(isCollapsed, (newValue, oldValue) => {
//   console.log('isCollapsed changed1:', newValue);
//   console.log('isCollapsed changed2:', oldValue);
// });
</script>
<style lang="scss" scoped>
// 关注在线人数选中样式
// .selected {
//   background-color: #FF4C4C;
//   color: #fff !important;
//   border-radius: 24px;
//   opacity: 1 !important;
// }
//选中关注字体白色
// .followshare-follow-gz.selected {
//   color: #fff !important;
//   opacity: 1 !important;
// }
.detailsPage {
  width: 100%;
  height: 100%;
  background-color: #fff;
  //  padding: 40px 355px;
  .detailsPage-navbox {
    display: flex;
    justify-content: left;
    width: 100%;
    height: 100%;
    .left-menu {
      height: 100%;
    }
    .layout-Main {
      width: 100%;
      height: 100%;
      // padding-left: 112px;
      // padding-left: 268px;//侧边栏收起
      padding-top: 28px;
      padding-right: 355px;
      background-color: #fff;
      .detailsRight {
        width: 100%;
        // height: 700px;
        height: 100%;
        // border-radius: 10px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        // background-color: rgba(0, 0, 0, .5);
        //左侧直播间
        .detailsRight-left {
          .detailsRight-left-top {
            width: 870px;
            display: flex;
            justify-content: space-between;
            padding: 12px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border: 1px solid #e5e4e4;
            .detailsRight-titlecontent {
              display: flex;
              .titlecontent-img {
                width: 48px;
                height: 48px;
                margin-right: 12px;
              }
              .titlecontent-nav {
                .titlecontent-nav-title {
                  font-size: 20px;
                  color: #090e16;
                }
                .titlecontent-nav-bott {
                  display: flex;
                  justify-content: space-between;
                  .titlecontent-roomnumber {
                    font-size: 12px;
                    color: #090e16;
                    opacity: 0.5;
                  }
                  .titlecontent-report {
                    display: flex;
                    .titlecontent-report-icon {
                      width: 16px;
                      height: 16px;
                    }
                    .titlecontent-report-jb {
                      font-size: 12px;
                      color: #090e16;
                      opacity: 0.5;
                    }
                  }
                }
              }
            }
            .detailsRight-followshare {
              display: flex;
              height: 36px;
              margin-top: 6px;
              .followshare-box {
                height: 100%;
                display: flex;
                background-color: #f2f2f3;
                border-radius: 24px;
                .followshare-follow {
                  width: 79px;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  // height: 36px;
                  // width: 79px;
                  background-color: #ff4c4c;
                  border-radius: 24px;
                  .followshare-follow-img {
                    width: 16px;
                    height: 16px;
                    margin-right: 5px; /* 设置img和span之间的间距 */
                    margin-bottom: 2px;
                  }
                  .followshare-follow-gz {
                    font-size: 14px;
                    // color: #090E16;
                    color: #fff;
                    // opacity: 0.5;
                    white-space: nowrap; /* 防止文本换行 */
                  }
                }
                .followshare-share {
                  width: 79px;
                  height: 100%;
                  font-size: 14px;
                  color: #090e16;
                  opacity: 0.5;
                  line-height: 36px;
                  text-align: center;
                }
              }
              .followshare-img {
                width: 36px;
                height: 100%;
                margin-left: 12px;
              }
            }
          }
          .artplayer-zbj {
            position: relative;
            flex: 1;
            width: 100%;
            height: 588px;
          }
          // .artplayer-zbj::before, .artplayer-zbj::after {
          //   content: '';
          //   position: absolute;
          //   top: 0;
          //   bottom: 0;
          //   width: 50%;
          //   background-color: rgba(0, 0, 0, 0.5); /* 透明度为 0.5 的黑色背景 */
          //   backdrop-filter: blur(10px); /* 模糊效果，可以根据需求调整 */
          //   z-index: 1;
          // }

          // .artplayer-zbj::before {
          //   left: 0;
          // }

          // .artplayer-zbj::after {
          //   right: 0;
          // }
          .detailsRight-bonus-box {
            display: flex;
            justify-content: space-between;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            border: 1px solid #e5e4e4;
            padding: 12px;
            .bonus-redpacket {
              display: flex;
              height: 52px;
              .bonus-redpacket-left {
                width: 100%;
                height: 100%;
                margin-right: 12px;
                .bonus-redpacket-leftimg {
                  width: 52px;
                  height: 52px;
                }
              }
              .bonus-redpacket-right {
                display: flex;
                width: 100%;
                height: 100%;
                .bonus-redpacket-rightimg {
                  width: 52px;
                  height: 52px;
                  margin-right: 12px;
                }
              }
            }
            //右侧小游戏
            .mini-games {
              display: flex;
              .mini-gamesimg {
                width: 52px;
                height: 52px;
                margin-right: 12px;
              }
            }
          }
        }
        // 右侧评论区
        .detailsRight-right {
          width: 300px;
          height: 100%;
          border: 1px solid #e5e4e4;
          border-radius: 8px;
          margin-left: 10px;
          // background-color: antiquewhite;
          .detailsRight-right-top {
            height: 100%;
            padding: 12px 16px;
            display: flex;
            border-bottom: 1px solid #e5e4e4;
            .detailsRight-icon {
              width: 24px;
              height: 24px;
              margin-right: 5px;
              .detailsRight-img {
                width: 24px;
                height: 24px;
                display: block;
              }
            }
            .detailsRight-namebox {
              display: flex;
              .detailsRight-zbdt {
                color: #090e16;
                font-size: 14px;
                line-height: 24px;
                margin-right: 5px;
              }
              .detailsRight-number {
                color: #090e16;
                opacity: 0.4;
                font-size: 14px;
                line-height: 24px;
              }
            }
          }
          .detailsRight-chatbox {
            padding: 10px 16px;
            height: 668px;
            .detailsRight-chatnav {
              width: 100%;
              // height: 615px;
              // overflow: hidden;
              .detailsRight-promptcontent {
                font-size: 12px;
                color: #ff4c4c;
                margin-bottom: 10px;
              }
              .detailsRight-chatreview {
                height: 540px;
                // height: 520px;
                // background-color: aliceblue;
                overflow-x: auto;
                .chatMessage {
                  display: flex;
                  margin-bottom: 10px;
                  .chatMessage-username {
                    // width: 120px;
                    color: #ff9d30;
                    font-size: 14px;
                    min-width: 50px;
                    max-width: 85px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  .chatMessage-maohao {
                    color: #ff9d30;
                    font-size: 14px;
                    margin-right: 5px;
                  }
                  .chatMessage-usertext {
                    color: #090e16;
                    font-size: 14px;
                  }
                }
              }
              //弹幕发送
              .scrolling-checkbox {
                display: flex;
                height: 15px;
                .custom-checkbox {
                  width: 15px;
                  height: 15px;
                  margin-right: 5px;
                }
                .scrolling-sbmit {
                  font-size: 10px;
                  color: #7e8085;
                  line-height: 15px;
                }
              }
            }
            .detailsRight-chatinputfield {
              width: 248px;
              height: 24px;
              background-color: #f2f2f4;
              border-radius: 10px;
              margin-top: 10px;
              padding: 10px;
              display: flex;
              justify-content: space-between;
              position: relative;
              .input-text {
                width: 158px;
                // height: 20px;
                // line-height: 20px;
                font-size: 14px;
                border: 0; // 去除未选中状态边框
                outline: none; // 去除选中状态边框
                background-color: #f2f2f4;
              }
              .detailsRight-emojisend {
                display: flex;
                .detailsRight-emoji {
                  display: block;
                  width: 24px;
                  height: 24px;
                  margin-right: 12px;
                }
                .detailsRight-send {
                  display: block;
                  width: 24px;
                  height: 24px;
                }
              }
              // 表情包样式
              .emoji-picker {
                border: 1px solid #e5e4e4;
                width: 100% !important;
                height: 300px;
                position: absolute;
                top: -310px;
                left: 0;
                z-index: 99;
              }
            }
          }
        }
      }
    }
  }
}
</style>
