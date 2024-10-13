<template>
  <div v-loading="isLoading" class="loading-container">
    <div v-if="isLoading"></div>
 
    <div v-else class="home">
      <div class="back-img">
        <!-- <img src="https://shark2.douyucdn.cn/front-publish/douyu-web-master/_next/static/media/1.ce6e862f.jpg" alt=""> -->
        <img style="width: 100%; height: 700px;" src="@/assets/images/banner.jpg" alt="">
      </div>
      <!-- 首页标题组件 -->
      <Navbar></Navbar>
      <!-- 首页播放器模块 -->
      <div class="container-box">
        <div class="container">
            <div class="artplayer-app"></div>
          <!-- 播放器右侧图片列表 -->
          <div class="rooms" v-if="hotList.length">
            <div class="room-item" @click="toogleVideo(i)" :class="current === i ? 'selected' : ''"
              v-for="(item, i) in hotList" :key="item.rid">
              <img class="room-img" :style="{ background: 'url(' + item.avatar + ') center top / cover no-repeat' }" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 推荐列表 -->
      <div :class="device ? '' : 'mobile_plate'" style="background-color: #fff;">
        <Plate :tagList="tagList" :headerTitle="'推荐'"></Plate>
      </div>
      <!-- 热门列表 -->
      <div :class="device ? '' : 'mobile_plate'" style="background-color: #fff;">
        <Plate :tagList="tagHotlsit" :headerTitle="'热门'"></Plate>
      </div>
      <!-- 推荐分类 -->
      <!-- <div class="sortplate-box">
      <div class="head__t">
       <div class="title__AjDrt">
         推荐分类
       </div>
       <div class="extra">
         <a class="showAll" target="_blank" href="">
           <span>全部分类</span>
           <i class="arrow"></i>
         </a>
       </div>
      </div>
      <Sortplate :dataList="dataList"></Sortplate>
    </div> -->
      <!-- 赛事推荐 -->
      <!-- <div class="recompetition">
        <Recompetition></Recompetition>
      </div> -->
      <!-- 官方活动 -->
      <div class="official-activity">
        <div class="authority-title-left">
          <img class="authority-img" src="https://cdn.sportnanoapi.com/football/team/3b720f181ce9993f9422d276acf7b292.png" alt="">
          <span class="authority-text">官方活动</span>
        </div>
        <!-- 图片内容 -->
        <div class="authority-picture-img" style="width: 100%; height: 200px;">
          <el-carousel motion-blur :interval="4000" type="card" style="width: 100%; height: 200px;">
            <el-carousel-item v-for="item in bannerList" :key="item">
              <!-- <div class="act-item" :style="{ backgroundImage: `url(${item.bannerPic})`,borderRadius: '10px' }"></div> -->
              <div class="act-item" :style="{ backgroundImage: `url(${item.bannerPic})` }"></div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 底部合作、联系我们 -->
      <div class="main-page-footer">
        <Botcooperation></Botcooperation>
      </div>
      <!-- <div class="footer">
        广州脸书国际贸易有限公司
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { provide, ref, computed ,onMounted,onUpdated,shallowRef} from 'vue'
import { getRecommendRoom, getRoomTag, getIndexBanner } from '@/api/home';
import { getVoiceTvList } from '@/api/detail';
import Navbar from '@/components/navbar.vue'
import { getRoomKey } from "@/api/room";
import { JcLive } from '@/utils/live'
import { Room, RoomEvent } from 'livekit-client';
import Plate from '@/components/Plate.vue';
import Sortplate from '@/components/Sortplate.vue';
import Recompetition from './components/recompetition.vue';
import Botcooperation from './components/botcooperation.vue';
import { useAppStoreHook } from '@/store/modules/app'
import Artplayer from "artplayer";
import Hls from 'hls.js';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import { useUserStoreHook } from '@/store/modules/user';
import getFingerprintJS from '@fingerprintjs/fingerprintjs';
import { getToken,removeToken } from "@/utils/auth";
import { result } from 'lodash-es';
import { message } from "@/utils/message";
import drawVideoFramesToCanvas from "@/utils/drawVideoFramesToCanvas";
import { ElLoading } from 'element-plus';
import CustomVideoPlayer from "../../utils/VideoPlayerUtils";//视频播放管理
var globalVideo = null;
const isLoading = ref(true); // 加载状态
const store = useAppStoreHook()
const device = computed(() => {
  return store.device === 'desktop' ? 1 : 0
})

//播放器右侧图片列表数据
const hotList = ref([])
//推荐列表数据
const tagList = ref([])
//热门列表数据
const tagHotlsit = ref([])
//列表推荐左侧标题数据
// getRoomTag().then(res => {
//   tagList.value = res.data
//   console.log('推荐列表数据', tagList.value)
// })
// provide('tagList', tagList)
//推荐分类数据
const dataList = ref([
  {
    imageUrl: 'https://sta-op.douyucdn.cn/dycatr/fa42ae3aa1e42ab69ab5068c676b4c5d.png/bjpg',
    text: '绝区零',
    number: 1295
  },
  {
    imageUrl: 'https://sta-op.douyucdn.cn/dycatr/3de8cf9f376ef5ee1bbb930868f7f402.png/bjpg',
    text: '魔兽世界',
    number: 601
  },
  {
    imageUrl: 'https://sta-op.douyucdn.cn/dycatr/30ad2e7c1bea3a30bd6e48774fd126d5.png/bjpg',
    text: '永劫无间手游',
    number: 143
  },
  {
    imageUrl: 'https://sta-op.douyucdn.cn/dycatr/e53b40c8566681208e352898c5a18cdb.png/bjpg',
    text: '七日世界',
    number: 20
  },
  {
    imageUrl: 'https://sta-op.douyucdn.cn/dycatr/79bb44d97e8f5bdcf6599798cbe78646.png/bjpg',
    text: '极品飞车：集结',
    number: 87
  },
  {
    imageUrl: 'https://sta-op.douyucdn.cn/dycatr/4ded577f1e24c20a154224d8f3c1314e.png/bjpg',
    text: '星秀',
    number: 87
  },
  // {
  //   imageUrl: 'https://sta-op.douyucdn.cn/dycatr/560457aa8334716cc698b4a5eb15e10a.png/bjpg',
  //   text: '英雄联盟',
  //   number: 100
  // },
  // {
  //   imageUrl: 'https://sta-op.douyucdn.cn/dycatr/83ed55c9017a91a569e1bbbfeea1a4c0.png/bjpg',
  //   text: '热门游戏',
  //   number: 100
  // },
])

const current = ref(-1)
const video_loading = ref(true);//视频加载完成状态
const moveStatus = ref(false);//控制进入直播间按钮-显示隐藏

onUpdated(()=>{
  //游客登录+获取浏览器唯一标识
  // getUserGuest()
})
// 监听浏览器标签可见性变化
const handleVisibilityChange = () => {
  if (!document.hidden && !document.fullscreenElement) {
    // 当浏览器标签可见且非全屏时重新执行切换视频播放状态的方法
    toogleVideo(current.value);
  }
};

const loading = ref(false);//游客登录状态
//默认获取游客登录
const getUserGuest = () => {
  // 显示全局加载指示器
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  let imei = localStorage.getItem('browserId');//获取存储到缓存中的浏览器唯一标识
  // console.log('获取浏览器指纹',imei);
  if (imei) {
    loading.value = true;
    //调用公共方法登陆
    useUserStoreHook().getTouristLogin({ gender: 0 },imei).then(res => {
      let token = getToken()
      // console.log('[ 游客登录获取token ] >', token)
      if (token.access_token !== '') {
        //播放器右侧图片列表数据请求
        getRecommendRoomRight();
        //推荐
        getRecommended();
        //热门
        getHot();
        //轮播图数据
        getIndexBannerList();
        isLoading.value = false; // 数据加载完成，隐藏加载状态
        loadingInstance.close();//销毁loading
      }
    }).finally(() => (
      loading.value = false
    ));
  }else{
    // message("请重新加载页面");
    getDeviceFingerprint().then(() => {
      let newImei = localStorage.getItem('browserId');
      console.log('重新获取浏览器指纹', newImei);
      loading.value = true;
      useUserStoreHook().getTouristLogin({ gender: 0 }, newImei).then(res => {
        let token = getToken();
        if (token.access_token !== '') {
          //播放器右侧图片列表数据请求
          getRecommendRoomRight();
          //推荐
          getRecommended();
          //热门
          getHot();
          //轮播图数据
          getIndexBannerList();
          isLoading.value = false; // 数据加载完成，隐藏加载状态
          loadingInstance.close();//销毁loading
        }
      }).finally(() => {
        loading.value = false;
      });
    });
  }
}
//浏览器唯一的标识指纹
const getDeviceFingerprint = () => {
  const options = {
    excludes:{
      faudio: true,
      fonts: true,
      canvas: true,
      webgl: true,
      plugins: true,
      touchSupport: true
    }
  }
  const fpPromise = getFingerprintJS.load({options});

  return fpPromise.then(fp => fp.get()).then(result => {
    const visitorId = result.visitorId;
    localStorage.setItem('browserId', visitorId);
  }).catch(error => {
    console.error('获取浏览器指纹出错:', error);
  });
  // getUserGuest();
}
//播放器右侧图片列表数据
const getRecommendRoomRight = () => {
  const needToken = true;// 根据实际需要设置是否需要token
  getRecommendRoom({ type: 2 },needToken).then((res) => {
    // 重复连接.concat(res.data)将数据量扩大
    // res.data = res.data.concat(res.data).concat(res.data).concat(res.data)
    // hotList.value = res.data.slice(0, 6)
    res.data = res.data;
    hotList.value = res.data.slice(0, 6);
    // console.log('数据是什么',hotList.value)
    toogleVideo(0);//右侧栏点击事件
  })
}
//推荐列表数据
const getRecommended = () =>{
  const needToken = true;// 根据实际需要设置是否需要token
  //type=1 推荐，type=2热门
  getRecommendRoom({ type: 1 },needToken).then((res) => {
    // console.log('[ 推荐列表数据 ] >', res.data)
    tagList.value = res.data
    // 重复连接.concat(res.data)将数据量扩大
    // res.data = res.data.concat(res.data).concat(res.data).concat(res.data)
    // hotList.value = res.data.slice(0, 6)
    // console.log('数据是什么',hotList.value)
  })
}
//热门列表数据
const getHot = () =>{
  const needToken = true;// 根据实际需要设置是否需要token
  //type=1 推荐，type=2热门
  getRecommendRoom({ type: 2 },needToken).then((res) => {
    // console.log('[ 热门列表数据 ] >', res.data)
    tagHotlsit.value = res.data
    // 重复连接.concat(res.data)将数据量扩大
    // res.data = res.data.concat(res.data).concat(res.data).concat(res.data)
    // hotList.value = res.data.slice(0, 6)
    // console.log('数据是什么',hotList.value)
  })
}
onMounted(async()=>{
  //游客登录+获取浏览器唯一标识
  getUserGuest();
  // 监听路由切换-直播详情页面切换回来后执行播放事件
  // window.addEventListener('focus', activated);
  // 监听浏览器标签可见性变化
  document.addEventListener('visibilitychange', handleVisibilityChange);
})
//视频播放器右侧事件==首次执行
const toogleVideo = (i) => {
  current.value = i
  //视频直播的加入和播放过程
  let room = hotList.value[i];//右侧直播点击选中的数据
  //请求直播间接口
  const needToken = true; // 根据实际需要设置是否需要token
  getRoomKey({ rid: room.rid ? room.rid : togglerid},needToken).then(res => {
    const { url, token } = res.data; // 获取直播流的播放地址和鉴权凭证
    // console.log('获取房间返回数据',url)
    if(globalVideo){
      globalVideo.destroy();//销毁上一个视频
    }
    // 定义进入直播间图层
    const enterStudioLayer = {
      name: 'enterStudio',
      html: `
        <div id="enterStudio" style="
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          transform: translate(-50%, -50%);
          font-size: 20px;
          background-color: #fda031;
          border-radius: 5px;
          display: none;
          z-index: 99;
        ">进入直播间</div>
      `,
      click: function (...args) {
        console.info('点击进入直播间', args);
        console.info('对应的rid', room.rid);
        window.open(`/detail/${room.rid}/${room.owner}/${room.type}`, "_blank");
      },
      mounted: function (...args) {
        console.info('enterStudio图层已挂载', args);
      },
    };
    globalVideo = new CustomVideoPlayer(".artplayer-app",{},[enterStudioLayer]);
    const client = new Room();
    // 处理视频流
    client.on(RoomEvent.TrackSubscribed, (track) => {
      if (track.kind === "video") {
        playVideo(track);
        // 在视频开始播放后应用虚化效果
        // globalVideo.art.on('play', () => {
          // drawVideoFramesToCanvas(globalVideo.art);
        // });
      }
    });
    
    window.art = globalVideo.art
    client.connect(url, token);
    if(room.type != 2){
      const needToken = true;
      getVoiceTvList({ rid: room.rid ? room.rid : togglerid},needToken).then(res => {
        playVideo(res.data)
        // 对于非直播视频，也在播放开始时应用虚化效果
        // globalVideo.art.on('play', () => {
        //   console.log('Non-live video started playing, applying blur effect');
        //   drawVideoFramesToCanvas(globalVideo.art);
        // });
      })
    }
    // 添加鼠标事件监听器
    const container = document.querySelector(globalVideo.art.option.container);
    container.addEventListener('mouseenter', () => {
      document.getElementById('enterStudio').style.display = 'block';
    });
    container.addEventListener('mouseleave', () => {
      document.getElementById('enterStudio').style.display = 'none';
    });
  }).catch(err => {

  });
}

//判断是否需要多条视频循环播放
const playVideo = (playObj) => {
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
    rid: null,
    viewType:6,//1.首页顶部2.节目预告3.首页中间4.陪玩广告5.直播间底部6.首页底部
  }
  const needToken = true;
  getIndexBanner(params,needToken).then(res => {
    console.log('底部轮播图bannerPic1231',res.data);
    bannerList.value = res.data;
    console.log('底部轮播图bannerPic',bannerList.value);
  }).catch(err => {

  });
}
//WebRTC协议播放
// let art = shallowRef(null);
// var togglerid; //存储跳转直播详情页面的房间rid
// const initArtplayer = (playLink,room) => {
//   // playLink : wss://rtc.zegec.com#eyJ0eXAiOiJKV1QiLCJlzMiJ9.kfEI3kWkuUzbTgmK6WunUuZh6Ft3YE1YC3LmQlZOKDY
//   console.log('1传入的是什么',playLink);
//   console.log('2传入的是什么',room);
//   if (art.value) {
//     art.value.destroy();
//   }
//   art.value = new Artplayer({
//     container: '.artplayer-app',
//     fullscreen: true,//全屏
//     fullscreenWeb: true,//网页全屏
//     autoMini: true,//当播放器滚动到浏览器视口以外时，自动进入 迷你播放 模式
//     //playbackRate: true,//是否显示视频播放速度功能
//     //setting: true,//设置面板 的开关按钮
//     isLive: true,//直播模式隐藏进度条和播放时间
//     type: 'webrtc',
//     customType: {
//       webrtc: function playWebRTC(video, url, art) {
//         // let playUrl = url.split('#')[0]
//         // let token = url.split('#')[1]

//         // let client = new Room();
//         // client.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
//         //   if (track.kind === "video") {
//         //     track.attach(video)
//         //   }
//         // });
//         // client.connect(playUrl, token);

//         if(art.webrtc) art.webrtc.disconnect();
//         const [playUrl,token] = url.split('#');
//         let client = new Room();
//         client.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
//           if (track.kind === "video") {
//             track.attach(video)
//           }
//         });
//         client.connect(playUrl, token);
//         art.webrtc = client;
//         // 销毁时断开连接
//         art.on('destroy',()=> {
//           if (art.webrtc) {
//             art.webrtc.disconnect();
//             art.webrtc = null;
//           }
//         });
//       },
//     },
//     video: {
//       url: playLink // 将 WebRTC 流的 URL 设置到 video.url 中
//       // url: null
//     }
//   });
//   //添加-进入直播间-图层
//   const enterStudio = `
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 200px;
//     height: 60px;
//     line-height: 60px;
//     text-align: center;
//     transform: translate(-50%, -50%);
//     font-size: 20px;
//     background-color: #fda031;
//     border-radius: 5px;
//     display: none;
//   `;
//   art.value.layers.add({
//     name: 'potser',
//     html: `<div id="potser" style="${enterStudio}">进入直播间</div>`,
//     // tooltip: 'Potser Tip',
//     // 进入直播间 点击事件
//     click: function (...args) {
//       console.info('click', args);
//       console.info('点击获取对应的rid', room.rid);
//       togglerid = room.rid
//       window.open(`/detail/${room.rid}/${room.owner}/${room.type}`, "_blank");
//     },
//     //potser图层已挂载执行
//     mounted: function (...args) {
//       console.info('mounted', args);
//     },
//   });
  
//   // 监听鼠标移入事件，显示图层
//   document.querySelector(art.value.option.container).addEventListener('mouseenter', () => {
//     //获取添加 进入直播间的id显示
//     const potserLayer = document.getElementById('potser');
//     potserLayer.style.display = 'block';
//   });
//   // 监听鼠标移出事件，隐藏图层
//   document.querySelector(art.value.option.container).addEventListener('mouseleave', () => {
//     //获取添加 进入直播间的id隐藏
//     const potserLayer = document.getElementById('potser');
//     potserLayer.style.display = 'none';
//   });
//   art.value.on('ready', () => {
//     //竖屏左右两边虚化
//     drawVideoFramesToCanvas(art.value);//实现原理是拿到视频播放的图像 把它当作背景图虚化 
//   });
//   art.value.switchUrl(playLink)//切换播放url
// };
// window.art = art.value;

// 鼠标进入
// const mouseenter = () => {
//   moveStatus.value = true
// }
//鼠标离开
// const mouseleave = () => {
//   moveStatus.value = false
// }
</script>



<style lang="scss" scoped>
//底部的轮播图
// .authority-picture-img{
  // display: inline-block;
  // display: flex;
  // width: 100%;
  // height: 200px;
  // background-color: #f5f6fa;
// }
::v-deep .el-carousel__container {
  height: 100% !important; /* 覆盖默认高度，确保填满父容器 */
}
// ::v-deep .el-carousel__item {
//   border-radius: 20px;
// }
// ::v-deep .el-carousel__item--card {
//   border-radius: 20px;
// }
::v-deep .el-carousel__arrow{
  background-color: #ccc;
  opacity: 0.85;
}
.act-item {
  display: block;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  // border-radius: 20px;
}
.loading-container{
  position: relative;
  width: 100%;
  height: 100%;
}
// 原来的样式==>
.home{
  width: 100%;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
}
.back-img {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  height: fit-content;
  z-index: -1;

  // img {
  //   width: 100%;
  //   height: 700px;
  // }
}

.el-loading-mask {
  background-color: #999 !important;
}

.back-img::after {
  background: linear-gradient(180deg, rgba(246, 247, 250, 0), #f6f7fa);
  bottom: 0;
  content: "";
  height: 312px;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 1;
  box-sizing: border-box;
}

.artplayer-app{
  position: relative;
  flex: 1;
  width: 100%;
  height: 700px;
}
.container-box{
  padding: 40px 355px;
  // padding-top: 60px;
  .container {
    // width: 1430px;
    width: 100%;
    height: 700px;
    // margin: 40px auto;
    // margin: 40px 355px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    background-color: rgba(0, 0, 0, .5);

    .video-content {
      flex: 1;
      height: 700px;
      background-color: #000;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      .btn_join {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 60px;
        transform: translate(-50%, -50%);
        font-size: 20px;
        border-color: var(--el-color-primary);
      }

      .el-button--primary:hover {
        background-color: var(--el-color-primary)
      }

      .el-button--primary {
        background-color: transparent;
      }
    }

    #home_video {
      flex: 1;
      height: 700px;
    }

    .rooms {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
      // display: flex;
      // flex-direction: row;
      // flex-wrap: wrap;
      // justify-content: center;
      // gap: 16px;
      // padding: 16px;
      .room-item {
        // width: 192px;
        // height: 114px;
        width: 100%;
        height: 100%;
        display: flex;
        margin-bottom: 8px;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        opacity: 0.8;
        transition: 0.1s;
        &:hover {
          border: 2px solid var(--el-color-primary);
          opacity: 1;
        }
      }

      .room-item:last-child {
        margin-bottom: 0;
      }

      .selected {
        opacity: 1;
        border: 2px solid var(--el-color-primary);
      }

      .room-img {
        width: 192px;
        // height: 114px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        // max-width: none;
        // background-size: auto 100%;//cover
        // background-repeat: no-repeat;
        // background-position: center;
      }
    }
  }
}


//推荐分类样式
.sortplate-box {
  width: 100%;
  padding: 30px 355px;
  box-sizing: border-box;
  background: #3f3f3f url(https://shark2.douyucdn.cn/front-publish/douyu-web-master/_next/static/media/bg.de441cd2.jpg) 50% / cover no-repeat;
  background-attachment: fixed;
}
//赛事推荐
.recompetition {
  padding: 30px 355px;
  background-color: #fff;
}
//官方活动
.official-activity{
  padding: 30px 355px 0 355px;
  background-color: #fff;
  // margin-top: 16px;
  .authority-title-left{
    display: flex;
    .authority-img{
      display: block;
      width: 22px;
      height: 24px;
      margin: 8px 8px 0 0;
      -o-object-fit: contain;
      object-fit: contain;
    }
    .authority-text{
      color: #727272;
      font-size: 22px;
      height: 100%;
      line-height: 40px;
    }
    .authority-text:hover {
      color: #ff8b00;
    }
  }
  
  // .authority-picture-img a:first-child .act-item {
  //   margin-left: 0;
  // }
  // .authority-picture-img a  {
  //   display: inline-block;
  //   width: 288px;
  //   height: 168px;
  //   border-radius: 8px;
  //   cursor: pointer;
  //   margin-left: 16px;
  // }
}
//底部合作、联系我们
.main-page-footer {
  padding: 30px 355px;
  background-color: #d1d1d1;
}
.head__t {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  line-height: 1.4166666666666667;
  padding: 16px 0;
  .title__AjDrt {
    font-size: 24px;
    font-weight: 500;
    color: #fff;
  }
  .extra{
    font-size: 14px;
    font-weight: 500;
    .showAll{
      color: #fff;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      font-size: 14px;
      line-height: 16px;
      opacity: .5;
      text-decoration: none;
      .arrow{
        border-radius: 10px;
        height: 16px;
        margin: 0 4px;
        overflow: hidden;
        position: relative;
        width: 8px;
      }
      .arrow::after{
        right: 0;
        top: -50%;
        transform: rotate(-45deg);
        transform-origin: right bottom;
      }
      .arrow::before{
        right: 0;
        top: 50%;
        transform: rotate(45deg);
        transform-origin: right top;
      }
      .arrow::after,.arrow::before {
        background: currentColor;
        content: "";
        height: 100%;
        position: absolute;
        width: 2px;
      }
    }

  }
}
.extra:hover * {
  color: #f70; //鼠标悬停时的颜色
}

.mobile_plate {
  padding: 30px 30px;
}

// .footer {
//   width: 100%;
//   height: 100px;
//   background-color: #171717;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: #999;
//   font-size: 12px;
// }
</style>
