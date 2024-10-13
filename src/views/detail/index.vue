<template>
  <div v-loading="isLoading" class="loading-container">
    <div v-if="isLoading"></div>
    <div class="detailsPage">
      <!-- 首页标题组件 -->
      <div style="height: 60px">
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
                  <!-- <img class="titlecontent-img" src="https://avatars.githubusercontent.com/u/44761321" alt=""> -->
                  <img class="titlecontent-img" :src="broadcastDetailsList.avatar" alt="">
                  <div class="titlecontent-nav">
                    <div class="titlecontent-nav-title">
                      {{ broadcastDetailsList.title }}
                    </div>
                    <div class="titlecontent-nav-bott">
                      <div class="titlecontent-roomnumber">
                        房间号：{{ broadcastDetailsList.roomNum }}
                      </div>
                      <!-- <div class="titlecontent-report">9.26天空要求取消
                        <img class="titlecontent-report-icon" src="@/assets/images/zbjbt.svg" alt="">
                        <span class="titlecontent-report-jb">举报</span>
                      </div> -->
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
                    <div class="followshare-follow" @click="toggleSelected('follow')">
                    <img v-if="!isShareSelected" class="followshare-follow-img" src="@/assets/images/guanzhu.svg" alt="">
                    <a v-if="!isShareSelected" class="followshare-follow-gz">关注</a>
                    <a v-if="isShareSelected" class="followshare-follow-gz">已关注</a>
                    <!-- <span v-if="!isShareSelected" class="followshare-follow-gz">关注</span> -->
                    <!-- <span v-if="isShareSelected" class="followshare-follow-gz">已关注</span> -->
                  </div>
                    <!-- 10000以内上下浮动，取200以内加或者减 -->
                    <div class="followshare-share">{{ currentNumber }}</div>
                  </div>
                  <!-- 分享功能天空要求取消9.19 -->
                  <!-- <img class="followshare-img" src="@/assets/images/fxzbj.svg" alt=""> -->
                </div>
              </div>
              <!-- 直播间标签 -->
              <div class="artplayer-zbj"></div>
              <!-- 福袋小游戏之类 -->
              <div class="detailsRight-bonus-box">
                <!-- 左侧福袋红包 -->
                <div class="bonus-redpacket">
                  <div class="bonus-redpacket-left">
                    <img class="bonus-redpacket-leftimg" src="@/assets/images/mybag.webp" alt="" @click="clickLuckybag">
                  </div>
                  <div class="bonus-redpacket-right">
                    <template v-for="(item, i) in myRedPacketArray" :key="item.id">
                      <div class="img-wrapper">
                        <!-- 倒计时不等于0 默认显示接口图片和倒计时数据 -->
                        <img v-if="item.timeLimitFormatted !== 0 && item.status == 0" class="bonus-redpacket-rightimg" :src="item.image" alt="">
                        <div v-if="item.timeLimitFormatted !== 0 && item.status == 0" class="redPacketTime">{{ parseTime(item.timeLimitFormatted)}}</div>
                        <!-- 待领取红包=@load="onGifLoad(item)"加载完成触发事件 -->
                        <img v-if="item.timeLimitFormatted == 0 && item.status == 0" class="special-effect" src="/dailingqu.gif" alt="GIF" @click="winOrNot(item)">
                        <!-- ae解析的json特效图-待领取 -->
                        <!-- <div v-else :ref="el => lottieContainers[item.id] = el" class="special-effect"></div> -->
                        <!-- 已领取 -->
                        <img v-if="item.timeLimitFormatted == 0 && item.status == 1" class="bonus-redpacket-rightimg" :src="item.image" alt="" @click="winOrNotAlready(item)">
                        <div v-if="item.timeLimitFormatted == 0 && item.status == 1" class="redPacketTime">已领取</div>
                      </div>
                    </template>
                  </div>
                </div>
                <!-- 右侧小游戏 -->
                <div class="mini-games">
                  <!-- <img class="mini-gamesimg" src="@/assets/images/redpacket1.png" alt="">
                  <img class="mini-gamesimg" src="@/assets/images/redpacket1.png" alt="">
                  <img class="mini-gamesimg" src="@/assets/images/redpacket1.png" alt="">
                  <img class="mini-gamesimg" src="@/assets/images/redpacket1.png" alt=""> -->
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
                  <!-- <div class="detailsRight-number">2658</div> -->
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
                    <div class="chatMessage" v-for="(item, i) in messageList" :key="item.uid">
                    <!-- 评论消息text -->
                    <div class="chatMessage-username">{{item.uid}}</div>
                    <div v-show="item.first =='10'" class="chatMessage-maohao">:</div>
                    <div v-show="item.first =='10'" class="chatMessage-usertext">{{item.dataName}}</div>
                    <!-- <div v-show="item.first =='400'" class="enterLeave-chatMessage-usertext">{{item.enterLeaveDataName}}</div> -->
                    <!-- <div v-show="item.first =='401'" class="enterLeave-chatMessage-usertext">{{item.enterLeaveDataName}}</div> -->
                  </div>
                    <!-- 进入或者离开直播间text -->
                    <div class="ent-room">
                      <!-- <div class="ent-roomuid">{{ entroomMessageList.uid }}</div> -->
                      <!-- <div class="ent-roomname">{{ entroomMessageList.enterLeaveDataName }}</div> -->
                      <transition name="fade">
                        <div class="ent-roomuid" :key="entroomMessageList.uid">
                          {{ entroomMessageList.uid }}
                        </div>
                      </transition>
                      <transition name="fade">
                        <div
                          class="ent-roomname"
                          :key="entroomMessageList.enterLeaveDataName"
                        >
                          {{ entroomMessageList.enterLeaveDataName }}
                        </div>
                      </transition>
                    </div>
                  </div>
                  <!-- 弹幕勾选 -->
                  <div class="scrolling-checkbox">
                    <el-checkbox
                      v-model="checkedStatus"
                      @change="handleChange"
                      class="custom-checkbox"
                    ></el-checkbox>
                    <div class="scrolling-sbmit">弹幕发送</div>
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
                      :src="
                        hasText == true && isSubmitting == false
                          ? send2Svg
                          : sendSvg
                      "
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
          <!-- 底部轮播图 -->
          <div class="authority-picture-img" style="width: 100%;">
            <el-carousel height="200px" motion-blur>
              <el-carousel-item v-for="item in bannerList" :key="item">
                <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                <div class="act-item" :style="{ backgroundImage: `url(${item.bannerPic})` }"></div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      

      <!-- 福袋规则遮罩层 -->
      <div
        class="LuckyBagRuleModal"
        style="display: flex; opacity: 1"
        v-show="isShowrule"
        @click="fdCloseBtn(1)"
      >
        <!-- 福袋规则显示 -->
        <div class="LuckyBagRule">
          <!-- 福袋规则接口回显接口数据 -->
          <div class="rule_content"></div>
          <!-- 我知道了 取消按钮层 -->
          <div class="close_btn" @click="fdCloseBtn(1)"></div>
        </div>
      </div>
      <!-- 待领取红包显示遮罩层 待开启特效 -->
      <div
        class="LuckyBagRuleModalHbp"
        style="display: flex; opacity: 1"
        v-show="isWinOrNot"
        @click="fdCloseBtn(2)"
      >
        <div class="kaiqitexiao">
          <div class="kaiqibutt" @click="startRansao()"></div>
        </div>
      </div>
      <!-- 待领取红包显示遮罩层 燃烧特效 -->
      <div
        class="LuckyBagRuleModalransao"
        style="display: flex; opacity: 1"
        v-show="iskaiqibuttRansao"
      >
        <img class="kaiqitexiao_ransao" src="/ransao.gif" alt="GIF" />
      </div>
      <!-- 燃烧过后显示红包是否中奖 -->
      <div
        class="LuckyBagRuleHbp"
        style="display: flex; opacity: 1"
        v-show="iskaiqibuttRansao_hou"
        @click="fdCloseBtn(3)"
      >
        <div class="ransaohou_hbp">
          <div class="ansaohou_hbp_title">{{ redPacketMessage.title }}</div>
          <div class="ansaohou_hbp_amountbox">
            <div class="ansaohou_hbp_amount_lfet">
              {{ redPacketMessage.amount }}
            </div>
            <div class="ansaohou_hbp_amount_right">元</div>
          </div>
          <div class="ansaohou_hbp_bagName">{{ redPacketMessage.bagName }}</div>
          <div class="ansaohou_hbp_timebox">
            <div class="ansaohou_hbp_events">活动时间：</div>
            <div class="ansaohou_hbp_doingBegin">
              {{ redPacketMessage.doingBegin }}
            </div>
            <div class="ansaohou_hbp_doingEnd">
              {{ redPacketMessage.doingEnd }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Search } from "@element-plus/icons-vue";
import { ElLoading } from 'element-plus';
import Navbar from "@/components/navbar.vue";
import Leftmenu from "@/components/Leftmenu.vue";
import { getRoomKey, getMessageKey } from "@/api/room";
import { getIndexBanner } from '@/api/home';//底部轮播图接口
import {
  getRedPacketList,
  getRedPacketWinOrNot,
  getFollowList,
  getdetailsList,
  getWhetherFollowList,
  getVoiceTvList,
  getConfValueByKeyList
} from "@/api/detail";
import { useRoute } from "vue-router";
import { JcLive } from "@/utils/live";
import { useAppStoreHook } from "@/store/modules/app";
import {
  computed,
  onUnmounted,
  reactive,
  ref,
  onMounted,
  onUpdated,
  watch,
  onBeforeUnmount,
  shallowRef,
  nextTick,
} from "vue";
import router from "@/router";
import { getToken } from "@/utils/auth"; //获取token
import sendSvg from "@/assets/images/send.svg";
import send2Svg from "@/assets/images/send2.svg";
import { Room, RoomEvent } from "livekit-client";
import Artplayer from "artplayer";
import data from "emoji-mart-vue-fast/data/all.json"; //表情包资源
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, Emoji, EmojiIndex } from "emoji-mart-vue-fast/src";
import artplayerPluginDanmuku from "artplayer-plugin-danmuku";
import drawVideoFramesToCanvas from "@/utils/drawVideoFramesToCanvas";
import { message } from "@/utils/message";
import { cloneDeep } from "lodash-es"; //深拷贝
import lottie from "lottie-web";
// import CustomVideoPlayer from "../../utils/customVideoPlayer";
import CustomVideoPlayer from "../../utils/VideoPlayerUtils";//视频播放管理
var globalVideo = null;
const isLoading = ref(true); // 加载状态
//随机数
const currentNumber = ref(0);
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
data.categories = data.categories.filter((item) => include.includes(item.id));
let emojiIndex = new EmojiIndex(data, {
  include,
});
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

const isShareSelected = ref(false);
const toggleSelected = (item) => {
  console.log("点击关注了吗", item);

  // console.log('点击关注了吗0',isShareSelected.value);
  if (isShareSelected.value == true) {
    getFollow(isShareSelected.value); //关注&取消关注
    // isShareSelected.value = false
  } else if (isShareSelected.value == false) {
    getFollow(isShareSelected.value); //关注&取消关注
    // isShareSelected.value = true
  }
};
//关注&取消关注接口
const getFollow = (item) => {
  // 显示全局加载指示器
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  let param = {
    followUid: owner,
  };
  const needToken = true; // 根据实际需要设置是否需要token
  getFollowList(param, needToken)
    .then((res) => {
      if (res.code == 200) {
        //item == true取消关注。item == false 关注
        if (item == true) {
          isShareSelected.value = false; //取消关注样式
          // console.log("点击关注了吗=取消关注", isShareSelected.value);
        } else if (item == false) {
          isShareSelected.value = true; //关注的样式
          // console.log("点击关注了吗=关注", isShareSelected.value);
        }
        isLoading.value = false; // 数据加载完成，隐藏加载状态
        loadingInstance.close();//销毁loading
      }
    })
    .catch((error) => {
      console.log(error);
      isLoading.value = false; // 数据加载完成，隐藏加载状态
      loadingInstance.close();//销毁loading
    });
};
//查询是否关注
const getWhetherFollow = () => {
  // 显示全局加载指示器
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  let param = {
    followUid: owner,
  };
  const needToken = true; // 根据实际需要设置是否需要token
  getWhetherFollowList(param, needToken)
    .then((res) => {
      if (res.code == 200) {
        if (res.data == true) {
          isShareSelected.value = true;
        } else if (res.data == false) {
          isShareSelected.value = false;
        }
        isLoading.value = false; // 数据加载完成，隐藏加载状态
        loadingInstance.close();//销毁loading
      }
    })
    .catch((error) => {
      isLoading.value = false; // 数据加载完成，隐藏加载状态
      loadingInstance.close();//销毁loading
    });
};
//查询直播间详情
const broadcastDetailsList = ref({});
const getDetails = () => {
  let param = {
    rid: rid,
  };
  const needToken = true; // 根据实际需要设置是否需要token
  getdetailsList(param, needToken)
    .then((res) => {
      broadcastDetailsList.value = res.data;
      console.log("查询直播间详情", broadcastDetailsList.value);
    })
    .catch((error) => {
      console.log(error);
    });
};

//聊天输入框
const hasText = ref(false); //输入框是否有内容
const checkText = () => {
  console.log("eviewtext.value.trim()", reviewtext.value.trim());

  hasText.value = reviewtext.value.trim() !== "";
  console.log("[ 是否有内容 ] >", hasText.value);
};
//聊天信息数据
const messageList = ref([]);
//进入直播间数据
const entroomMessageList = ref({});
//深拷贝聊天的数据 用到实时弹幕中
// const messageListClone = ref([])
const canPushData = ref(true); //发送频繁状态
// 节流函数
const throttle = (func, limit) => {
  console.log();

  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        canPushData.value = true; // 重置为可以推送数据
      }, limit);
    } else {
      canPushData.value = false; // 设置为不可以推送数据
      reviewtext.value = ""; //清空输入框
      message("操作频繁", { type: "error" });
    }
  };
};

const isSubmitting = ref(false); // 用于跟踪是否已经有请求正在进行中的标志
const reviewtextDeep = ref("");
//聊天发送消息
const getSbmitmessage = () => {
  //输入内容为空不允许发送
  if (hasText.value == false) {
    return;
  }
  //控制发送接口成功才可以再次触发
  if (isSubmitting.value == true) {
    return;
  } else if (isSubmitting.value == false) {
    const oneselfUid = getToken();
    //自己评论的消息可以快速显示
    if (canPushData.value) {
      messageList.value.push({
        uid: oneselfUid.uid,
        dataName: reviewtext.value,
        first: 10, // 表示text消息类型
      });
    }
  }
  reviewtextDeep.value = cloneDeep(reviewtext.value);
  //同时发送消息接口同时调用
  let param = {
    rid: rid,
    message: reviewtextDeep.value,
  };
  const needToken = true; // 根据实际需要设置是否需要token
  reviewtext.value = ""; //清空输入框
  // 节流限制接口调用频率
  throttledSubmitMessage(param, needToken);
};
// 调用节流函数来限制接口调用频率
const throttledSubmitMessage = throttle((param, needToken) => {
  getMessageKey(param, needToken)
    .then((res) => {
      if (res.message === "SUCCESS") {
        //发送评论加入弹幕-勾选复选框即可加入弹幕
        console.log(checkedStatus);
        if (checkedStatus.value) {
          art.value.plugins.artplayerPluginDanmuku.emit({
            text: reviewtextDeep.value, // 文本
            time: 0, // 所在时间单位秒，默认取播放器当前时间
            color: "#fff", // 颜色
            size: 25, // 尺寸
            border: false, // 是否有描边
            // mode: 0, // 模式: 滚动 0 或者静止 1
          });
        }
        reviewtextDeep.value = "";
        reviewtext.value = ""; // 成功就清空输入框
        showEmojiPicker.value = false; // 发送成功隐藏表情框
        isSubmitting.value = false; // 成功才可以重新发送消息
      } else {
        reviewtextDeep.value = "";
        reviewtext.value = ""; // 成功就清空输入框
        isSubmitting.value = true; // 错误不允许重新发送消息
      }
      checkText(); // 聊天输入框
    })
    .catch((error) => {
      reviewtextDeep.value = "";
      reviewtext.value = ""; // 成功就清空输入框
      isSubmitting.value = true; // 错误不允许重新发送消息
      message("评论失败，请重新评论", { type: "error" });
    });
}, 1000); // 限制在1秒内只能调用一次
//键盘事件发送消息
const handleKeyUp = (event) => {
  // console.log('[ 键盘事件 ] >', event)
  if (event.key === "Enter") {
    getSbmitmessage(); //发送消息
  }
};
// 获取路由+获取上个页面传来的路由用户rid
const route = useRoute();
const rid = +route.params.rid; //+把id转成数字,房间id
const owner = +route.params.owner; //+把id转成数字，房间用户id
const typeList = +route.params.type; //10代表音频类型。2代表Video直播类型
//获取token
const token = getToken();
const toogleVideo = (i) => {
  const needToken = true; // 根据实际需要设置是否需要token
  return getRoomKey({ rid }, needToken);
};
//typeList==10 11 100类型共同调用
const getVoiceTvListType = () => {
  const needToken = true; // 根据实际需要设置是否需要token
  return getVoiceTvList({ rid }, needToken);
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
let artplayerConfig = ref();
const initArtplayer = (playLink) => {
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
    ...artplayerConfig.value,
    plugins: [
      artplayerPluginDanmuku({
        //默认弹幕
        danmuku: [],
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
            console.log("手动发送弹幕前的过滤器", danmu);
            setTimeout(() => {
              resolve(true);
            }, 1000);
          });
        },
      }),
    ],
  });

  art.value.on("ready", () => {
    //竖屏左右两边虚化
    drawVideoFramesToCanvas(art.value); //实现原理是拿到视频播放的图像 把它当作背景图虚化
    // console.log('10类型和11类型是否执行这里',playLink);
    
  });
  playLink && art.value.switchUrl(playLink); //切换播放url
};
window.art = art.value;

//红包数据
const myRedPacketArray = reactive([]);
//获取红包列表接口
const getRedPacketListPort = () => {
  // 销毁动画实例
  if (lottieInstance) {
    lottieInstance.destroy();
    lottieInstance = null;
  }
  const needToken = true; // 根据实际需要设置是否需要token
  let param = {
    type: 1,
    roomId: rid,
  };
  getRedPacketList(param, needToken)
    .then((res) => {
      // 处理timeLimit字段代表的是分钟
      res.data.forEach((item) => {
        //status为0才是未领取 需要将 timeLimit 从分钟转换为秒
        if (item.status == 0) {
          item.timeLimitFormatted = item.timeLimit * 60;
        }
        if (item.status == 1) {
          //已领取
          item.timeLimitFormatted = 0;
        }
        myRedPacketArray.push(item);
      });

      //倒计时
      startTimers();
      console.log("获取红包列表", myRedPacketArray);
    })
    .catch((error) => {
      console.log(error);
    });
};
const parseTime = (second) => {
  let m = parseInt(second / 60);
  if (m < 10) {
    m = "0" + m;
  }
  let s = second % 60;
  if (s < 10) {
    s = "0" + s;
  }
  return `${m}:${s}`;
};
//倒计时定时器
const intervalIds = ref([]);
const startTimers = () => {
  myRedPacketArray.forEach((item, index) => {
    const intervalId = setInterval(() => {
      //status为0未领取与timeLimitFormatted 大于0 才去倒计时
      if (item.timeLimitFormatted > 0 && item.status == 0) {
        item.timeLimitFormatted -= 1;
      } else {
        // 倒计时结束
        // item.countdownEnded = 0;
        clearInterval(intervalId);
      }
    }, 1000);
    intervalIds.value.push(intervalId);
  });
};
//清除定时器
onUnmounted(() => {
  intervalIds.value.forEach((intervalId) => clearInterval(intervalId));
});
//倒计时结束==加载完成待领取gif图获取数据
// const onGifLoad = (item) => {
//   console.log('GIF 加载完成，对应的 item 数据为:', item);
// }
//显示福袋规则
const isShowrule = ref(false);
const clickLuckybag = () => {
  let param = {
    key:'activity_desc',
  }
  const needToken = true; // 根据实际需要设置是否需要token
  getConfValueByKeyList(param,needToken).then(res => {
    console.log('福袋规则返回数据',res);
    document.querySelector('.LuckyBagRuleModal .LuckyBagRule .rule_content').innerHTML = res.data
    isShowrule.value = true
  }).catch((error) => {

  })

  // isShowrule.value = true
  // 设置活动规则=接口返回的数据
  // document.querySelector('.LuckyBagRuleModal .LuckyBagRule .rule_content').innerHTML = data.['explain']
  // document.querySelector('.LuckyBagRuleModal .LuckyBagRule .rule_content').innerHTML = '<h4><strong>-福袋获取方式</strong></h4><h4>观看直播赛事即可获得该直播抽奖卷</h4><h4><br></h4><h4><strong>-福袋中奖者</strong></h4><h4>分为两种：非游客奖励 及 游客奖励</h4><h4><br></h4><h4><strong>-福袋非游客</strong></h4><h4>是指已在【我的福袋】绑定用户账号并已经通过客服核实均列为非游客</h4><h4><br></h4><h4><strong>-福袋游客</strong></h4><h4>是指已在【我的福袋】绑定用户账号但未联系客服核实均列为游客</h4><h4><br></h4><h4><strong>-福袋奖励申请方式</strong></h4><h4>点击【我的福袋】-【使用】-【在线客服】-【核实信息】-【获得奖励】</h4><h4><br></h4><h4><strong>-福袋奖励规则</strong></h4><h4>每个用户终身仅限参与一次该活动，奖励仅限在【腾博会】上娱乐使用，不允许兑换现金</h4><h4><br></h4><h4><strong>福袋最终解释权归【腾博会】所有，且【腾博会】有权更改、结束、缩短或延长该活动。</strong></h4>'
};
//福袋取消事件
const fdCloseBtn = (type) => {
  if (type == 1) {
    isShowrule.value = false;
  }
  if (type == 2) {
    isWinOrNot.value = false;
    // 销毁动画实例
    if (lottieInstance) {
      lottieInstance.destroy();
      lottieInstance = null;
    }
  }
  if (type == 3) {
    iskaiqibuttRansao_hou.value = false;
    // 销毁动画实例
    if (lottieInstance) {
      lottieInstance.destroy();
      lottieInstance = null;
    }
  }
  // getRedPacketListPort();//获取红包接口
};
//待领取红包点击查询是否中奖
const isWinOrNot = ref(false)
const individualRedpacketData = ref({});//保存单独红包的数据-请求是否中奖
const winOrNot = (item) => {
  isWinOrNot.value = true//显示打开红包特效
  individualRedpacketData.value = item;
  initLottieAnimations();//显示待开起json特效
};
//时间戳转成月日
const formatTimestampToMonthDay = (timestamp) => {
  const date = new Date(timestamp);
  const options = { month: "numeric", day: "numeric" };
  const localeDateString = date.toLocaleDateString("zh-CN", options);

  // 返回格式化后的日期字符串，例如 "8月1日"
  return localeDateString.replace("/", "月") + "日";
};
//已领取点击事件
const winOrNotAlready = (item) => {
  console.log("已领取红包获取数据", item);
};
//倒计时结束显示ae解析待领取json特效图
let lottieInstance = null;
const initLottieAnimations = () => {
  // 销毁之前的动画实例
  if (lottieInstance) {
    lottieInstance.destroy();
    lottieInstance = null;
  }
  const linesElement = document.querySelector(".LuckyBagRuleModalHbp");
  if (linesElement) {
    const titleElement = linesElement.querySelector(".kaiqitexiao");
    if (titleElement) {
      lottieInstance = lottie.loadAnimation({
        container: titleElement,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/kaiqiqian.json",
      });
    } else {
      // console.error('.kaiqitexiao element not found');
    }
  } else {
    // console.error('.LuckyBagRuleModalHbp element not found');
  }
};
//开起红包的特效 点击开启事件
const iskaiqibuttRansao = ref(false);
const iskaiqibuttRansao_hou = ref(false);
const startRansao = () => {
  isWinOrNot.value = false; //隐藏待开启的特效
  iskaiqibuttRansao.value = true; //打开红包燃烧的特效
  getRedPacketType();//查询是否中奖
  setTimeout(() => {
    iskaiqibuttRansao.value = false; //关闭燃烧的特效
    iskaiqibuttRansao_hou.value = true; //显示是否中奖状态
  }, 1400);
};
//点击待开启红包按钮=调用是否中奖接口
const redPacketMessage = ref({});//是否中奖接口数据
const getRedPacketType = () => {
  console.log('获取对应红包数据id',individualRedpacketData.value);
  // return
  let param = {
    activityId:individualRedpacketData.value.id,
  }
  const needToken = true; // 根据实际需要设置是否需要token
  //获取红包是否中奖接口
  getRedPacketWinOrNot(param,needToken).then(res => {
    //amount:金额  getCode：领取代码  drawStatus：中奖状态
    //drawStatus 中奖状态 true 为中奖
    //status: 0.未领取,1.已领取,2.已兑换,3.已取消
    // console.log('点击领取红包',res);
    if(res.code == 200){
      redPacketMessage.value = {
        title:individualRedpacketData.value.title,//红包标题
        amount:res.data.data.amount,//红包金额
        bagName:individualRedpacketData.value.bagName,//红包类型
        doingBegin: formatTimestampToMonthDay(individualRedpacketData.value.doingBegin), // 格式化后的开始时间
        doingEnd: formatTimestampToMonthDay(individualRedpacketData.value.doingEnd) // 格式化后的结束时间
      } 
      console.log('点击待领取红包拿到数据存起来',redPacketMessage.value);
      //领取成功 把红包数据对应的id里面的status改为1 为领取成功
      myRedPacketArray.forEach(packet => {
        if (packet.id === individualRedpacketData.value.id) {
          packet.status = 1;
        }
      });
    }else{

    }
  }).catch(error => {
    console.log(error)
  })
}
//监听设备是PC还是移动端，小于800的话device=mobile是移动端，否则device=desktop
const store = useAppStoreHook();

// 在组件激活时重新执行 toogleVideo 方法
const handleVisibilityChange = () => {
  toogleVideo(); //获取直播间url，token
};
//生成一个0到max之间的随机整数。
const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
}
//生成一个-200到200之间的随机整数（通过生成0到400之间的随机数，然后减去200）。
const updateNumber = () => {
  const change = getRandomNumber(401) - 200;
  currentNumber.value += change;
  if (currentNumber.value < 0) {
    currentNumber.value = 0;
  } else if (currentNumber.value > 10000) {
    currentNumber.value = 10000;
  }
}
//判断是否需要多条视频循环播放
const playVideo = (playObj) => {
  console.log('播放连接', playObj)
  // 判断是否为列表
  if(playObj instanceof Array){
    globalVideo.playList(playObj)
  }else{
    globalVideo.play(playObj)
  }
}
//底部轮播图
const bannerList = ref([]);//底部轮播图数据
const getIndexBannerList = () => {
  let params = {
    rid: rid,
    viewType:5,//1.首页顶部2.节目预告3.首页中间4.陪玩广告5.直播间底部6.首页底部
  }
  const needToken = true;
  getIndexBanner(params,needToken).then(res => {
    bannerList.value = res.data;
    console.log('底部轮播图bannerPic',bannerList.value);
  }).catch(err => {

  });
}
//右侧ref元素，确保渲染完成
const layoutMain = ref(null);
onMounted(async() => {
  //随机数
  currentNumber.value = getRandomNumber(10001);
  setInterval(updateNumber, 3000);//生成一个-200到200之间的随机整数
  // console.log("[ 路由是什么 ] >", route);
  // console.log("[ 2是什么 ] >", store.device);
  // console.log("[ rid是什么 ] >", rid);
  // console.log("[ owner是什么 ] >", owner);
  console.log("[ type是什么 ] >", typeList);
  // console.log("[ token是什么 ] >", token.access_token);
  // 关注在线人数默认值
  //isFollowSelected.value = true; // 默认选中 followshare-follow
  //绑定键盘事件
  window.addEventListener("keyup", handleKeyUp);
  // 监听路由切换-直播详情页面切换回来后执行播放事件
  document.addEventListener("visibilitychange", handleVisibilityChange);
  // 初始化isCollapsed的值为false
  isCollapsed.value = false;
  await nextTick(); // 确保 DOM 已完全更新
  // const layoutMain = document.querySelector(".layout-Main");
  if (layoutMain.value) { // 确保 layoutMain 存在
    if (isCollapsed.value == false) {
      layoutMain.style.paddingLeft = '112px';
    }else{
      layoutMain.style.paddingLeft = '268px';
    }
  }else{

  }
  getWhetherFollow(); //查询是否关注
  getDetails(); //查询直播间详情
  getIndexBannerList();//查询底部轮播图
  // 获取直播｜｜视频，房间的url&token
  let result = await toogleVideo();
  let { url, token } = result.data;
  globalVideo = new CustomVideoPlayer(".artplayer-zbj");
  const client = new Room();
  
  // 处理视频流
  client.on(RoomEvent.TrackSubscribed, (track) => {
    if (track.kind === "video") {
      playVideo(track);
      //竖屏左右两边虚化
      drawVideoFramesToCanvas(globalVideo.art);
    }
  });
  // TOTO 处理其他逻辑订阅=>>聊天
  client.on(RoomEvent.DataReceived, (message) => {
    const utf8Array = utf8ArrayToString(message);
    // 将字符串数据解析为 JavaScript 对象
    const dataObject = JSON.parse(utf8Array);
    console.log("10和11类型转成对象了=公共方法", dataObject);
    const tokenuid = getToken();
    //消息类型处理 只显示其他用户评论的消息，用户本身发送评论的消息不显示，需要在发送按钮单独处理显示
    if (dataObject.first == 10 && dataObject.data.uid !== tokenuid.uid) {
      // 新的聊天数据拼接到旧数据后面
      messageList.value = [
        ...messageList.value,
        {
          uid: dataObject.data.uid,
          dataName: dataObject.data.data,
          first: dataObject.first,
        },
      ];
      //实时显示评论消息到弹幕
      globalVideo.art.plugins.artplayerPluginDanmuku.emit({
        text: dataObject.data.data,
        time: 0,
        color: "#fff",
        size: 25,
        border: false,
      });
    } else if (dataObject.first == 400) {
      // entroomMessageList.value = dataObject.data.data
      // entroomMessageList.value = [
      entroomMessageList.value = {
        uid: dataObject.data.uid,
        enterLeaveDataName: "进入直播间",
        first: dataObject.first,
      };
      // ];
      console.log("[ 10和11类型进入直播间数据=公共方法 ] >", entroomMessageList.value);
    }
    console.log("[ 10和11类型聊天最后的数据=公共方法 ] >", messageList.value);
  });
  window.art = globalVideo.art

  client.connect(url, token);
  // 开始播放视频.不等于webrtc直播流的类型，走这个判断比如（10类型，11类型，100类型或者flv类型）
  if(typeList != 2){
    let res = await getVoiceTvListType()
    playVideo(res.data)
  }

  // 监听某某用户进入直播间uid
  watch(() => entroomMessageList.value.uid, () => {
    if (entroomMessageList.value) {
      nextTick(() => {
        document.querySelector('.ent-roomuid').classList.add('slide-up');
      });
    }
  });
  // 监听某某用户进入直播间enterLeaveDataName
  watch(() => entroomMessageList.value.enterLeaveDataName, () => {
    if (entroomMessageList.value) {
      nextTick(() => {
        document.querySelector('.ent-roomname').classList.add('slide-up');
      });
    }
  });
  getRedPacketListPort(); //获取红包接口
});
onBeforeUnmount(() => {
  window.removeEventListener("keyup", handleKeyUp);
});
onUpdated(() => {
  //获取侧边栏点击收起展开状态
  const layoutMain = document.querySelector(".layout-Main");
  if (isCollapsed.value == false) {
    layoutMain.style.paddingLeft = "112px";
    // layoutMain.style.paddingRight = '1.76rem';
  } else {
    layoutMain.style.paddingLeft = "268px";
    // layoutMain.style.paddingRight = '1.76rem';
  }
  // getRedPacketListPort();//获取红包接口
});
// watch(isCollapsed, (newValue, oldValue) => {
//   console.log('isCollapsed changed1:', newValue);
//   console.log('isCollapsed changed2:', oldValue);
// });
</script>
<style lang="scss" scoped>
::v-deep .el-carousel {
  height: 1.521rem !important; /* 没有高度显示不出来 */
}
::v-deep .el-carousel__container {
  height: 100% !important; /* 覆盖默认高度，确保填满父容器 */
}
::v-deep .el-carousel__arrow{
  background-color: #ccc;
  opacity: 0.85;
}

.loading-container{
  position: relative;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(100%);
}

.slide-up {
  transform: translateY(0);
}
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
    // height: 100%;
    // padding-top: 60px;
    height: calc(100vh - 60px);
    overflow: hidden;
    .left-menu {
      height: 100%;
    }
    .layout-Main {
      width: 100%;
      // height: 100%; 加了轮播图先去掉高度
      padding-top: 28px;
      padding-bottom: 28px;
      padding-right: 1.835rem;
      background-color: #fff;
      flex-grow: 1;
      overflow-y: auto;
      box-sizing: border-box;
      .detailsRight {
        width: 100%;
        // height: 736px;
        // height: 100%;
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
                    margin-right: 5px;
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
                    display: block;
                    text-decoration: none;
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
            overflow: hidden;
          }
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
                .img-wrapper {
                  width: 100%;
                  height: 100%;
                  // width: 52px;
                  // height: 52px;
                  margin-right: 12px;
                  position: relative;
                  .bonus-redpacket-rightimg {
                    display: block;
                    width: 52px;
                    height: 52px;
                  }
                  .redPacketTime {
                    position: absolute;
                    right: 8px;
                    bottom: 1px;
                    font-size: 12px;
                    color: #fff;
                  }
                  // 待领取-特效图样式
                  .special-effect {
                    display: block;
                    width: 52px;
                    height: 52px;
                  }
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
            // height: 100%;
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
                position: relative;
                height: 540px;
                overflow-y: scroll !important; /* 显示垂直滚动条 */
                margin-bottom: 2px;
                // scrollbar-width: auto !important; /* 显示滚动条宽度 */
                // scrollbar-color: auto !important; /* 显示滚动条颜色 */
                .ent-room {
                  width: 100%;
                  height: 30px;
                  // background-color: #ccc;
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  display: flex;
                  .ent-roomuid {
                    font-size: 12px;
                    color: #ff9d30;
                    margin-right: 5px;
                    line-height: 30px;
                  }
                  .ent-roomname {
                    font-size: 12px;
                    color: #ff9d30;
                    line-height: 30px;
                  }
                }
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
                  // 进入或者离开 直播间 提示信息
                  // .enterLeave-chatMessage-usertext{
                  //   color: #FF9D30;
                  //   font-size: 14px;
                  // }
                }
              }
              //滚动条
              .detailsRight-chatreview::-webkit-scrollbar {
                width: 5px !important; /* 恢复默认宽度 */
                height: 100% !important; /* 恢复默认高度 */
                // color: red !important; /* 恢复默认颜色 */
                display: block !important; /* 恢复默认显示 */
              }
              .detailsRight-chatreview::-webkit-scrollbar-thumb {
                background-color: #ccc;
                border-radius: 10px; /* 滑块的圆角半径 */
              }
              //弹幕发送
              .scrolling-checkbox {
                display: flex;
                // height: 13px;
                .custom-checkbox {
                  width: 15px;
                  height: 15px;
                  margin-right: 10px;
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
      //底部轮播图
      .authority-picture-img{
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        .act-item {
          display: block;
          width: 100%;
          height: 100%;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          // border-radius: 20px;
        }
      }
    }
  }

  // 福袋规则
  .LuckyBagRuleModal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    //福袋规则遮罩层的样式
    .LuckyBagRule {
      position: relative;
      // z-index: 999999999;
      width: 320px;
      height: 405px;
      background-image: url(../../assets/images/fudaiditu.png);
      background-size: cover;
      background-repeat: no-repeat;
      .rule_content {
        position: absolute;
        top: 95px;
        left: 50px;
        right: 50px;
        height: 210px;
        overflow-y: auto;
        font-weight: 400;
        font-size: 16px;
        color: #ff441f;
        line-height: 16px;
        text-align: left;
        font-style: normal;
        padding-top: 5px;
      }
      // 福袋规则滚动条
      .rule_content::-webkit-scrollbar {
        width: 5px !important; /* 恢复默认宽度 */
        height: 100% !important; /* 恢复默认高度 */
        // color: red !important; /* 恢复默认颜色 */
        display: block !important; /* 恢复默认显示 */
      }
      .rule_content::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 10px; /* 滑块的圆角半径 */
      }
      // 福袋规则取消按钮层
      .close_btn {
        position: absolute;
        bottom: 13px;
        left: 30px;
        right: 30px;
        height: 65px;
        cursor: pointer;
      }
    }
  }
  .LuckyBagRuleModalHbp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    .kaiqitexiao {
      width: 320px;
      height: 405px;
      position: relative;
      .kaiqibutt {
        // background-color: #ccc;
        position: absolute;
        bottom: 110px;
        left: 116px;
        // right: 23px;
        width: 86px;
        height: 86px;
        cursor: pointer;
        z-index: 99;
      }
    }
  }
  .LuckyBagRuleModalransao {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    // 红包燃烧样式
    .kaiqitexiao_ransao {
      display: block;
      width: 320px;
      height: 405px;
    }
  }
  .LuckyBagRuleHbp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    .ransaohou_hbp {
      position: relative;
      width: 320px;
      height: 405px;
      background-image: url(../../assets/images/hbp.png);
      background-size: contain; /* 确保背景图片完全显示 */
      background-repeat: no-repeat;
      background-position: center; /* 确保背景图片居中对齐 */
      z-index: 100;
      .ansaohou_hbp_title {
        height: 40px;
        line-height: 40px;
        font-size: 28px;
        color: #fff;
        text-align: center;
        margin-top: 74px;
      }
      .ansaohou_hbp_amountbox {
        display: flex;
        height: 56px;
        justify-content: center;
        margin-bottom: 10px;
        .ansaohou_hbp_amount_lfet {
          font-size: 40px;
          // line-height: 56px;
          color: #fff;
          margin-top: auto;
        }
        .ansaohou_hbp_amount_right {
          height: 25px;
          font-size: 20px;
          color: #fff;
          align-self: flex-end;
          margin-bottom: 8px;
        }
      }
      .ansaohou_hbp_bagName {
        font-size: 19px;
        color: #fff;
        text-align: center;
      }
      .ansaohou_hbp_timebox {
        display: flex;
        height: 20px;
        justify-content: center;
        margin-top: 136px;
        .ansaohou_hbp_events {
          font-size: 14px;
          color: #fff;
        }
        .ansaohou_hbp_doingBegin {
          font-size: 14px;
          color: #fff;
        }
        .ansaohou_hbp_doingEnd {
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>
