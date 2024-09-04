<template>
  <div class="layout-boxnav">
    <div class="layout-Module-head">
      <div class="layout-Module-title">热门赛事</div>
      <div class="date-selector">
        <button class="date-btn" :class="{ 'active': currentIndex === index }" v-for="(dateStr, index) in dateBtns" @click="setActiveIndex(dateStr,index)">
          {{ dateStr }}
        </button>
      </div>
    </div>

    <!-- 轮播图 mouseover鼠标移入 mouseout移出 @mouseout="auto"-->
    <div class="pos-r" style="height: 200px; padding: 0px 32px; margin-bottom: 20px;"  @mouseover="stop">
      <div class="swiper-container wh-full pos-r overflow-hidden">
        <ul class="swiper-main h-full dflex pos-a" :class="{'animated-duration': animated}" :style="{transform: `translate3d(-${current * itemWidth}px, 0,0)`}">
          <!-- li的宽度main-width 暂时不用 :style="{ width: itemWidth + 'px' }"-->
          <li v-for="(item, index) in banner" :key="index" class="swiper-item h-full dflex-gap2" :style="{ width: itemWidth + 'px' }">
            <!-- arr第一个对象：div class="h-full flex1 border-radius overflow-hidden cursor-pointer" @click="to(item.arr[0])">
              <img v-if="item.arr[0]" class=" wh-full object-fit-cover" :src="item.arr[0].url" alt="" />
            </div> -->
            <!-- <div class="padding-lr-8 ft-base h-full"></div> -->
            <!-- arr第二个对象： <div class="h-full flex1 border-radius overflow-hidden cursor-pointer" :style="{visibility: item.arr[1] ? 'visible' : 'hidden'}" @click="to(item.arr[1])">
              <img v-if="item.arr[1]" class=" wh-full object-fit-cover"  :src="item.arr[1].url" alt="" />
            </div> -->
            <!-- 暂时展示-用于变量渲染 -->
            <div class="h-full overflow-hidden cursor-pointer custom-wh" @click="to(item.arr[0])">
              <div class="carousel-head">
                <div class="carousel-headlfet">
                  <span class="carousel-title">奥运女篮1</span>
                  <div class="carousel-time">
                    <span class="carousel-month">07-31</span>
                    <span class="carousel-hms">21:00</span>
                    <span class="carousel-game">比赛中</span>
                  </div>
                </div>
                <span class="carousel-headright">直播间</span>
              </div>
              <div class="banav-message">
                <div class="banav-session">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">中国女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">12</div>
                </div>
                <div class="banav-session" style="margin-top: 10px;">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">塞尔维亚女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">18</div>
                </div>
              </div>
            </div>
            <!-- 暂时展示 -->
            <div class="h-full overflow-hidden cursor-pointer custom-wh" @click="to(item.arr[1])">
              <div class="carousel-head">
                <div class="carousel-headlfet">
                  <span class="carousel-title">奥运女篮2</span>
                  <div class="carousel-time">
                    <span class="carousel-month">07-31</span>
                    <span class="carousel-hms">21:00</span>
                    <span class="carousel-game">比赛中</span>
                  </div>
                </div>
                <span class="carousel-headright">直播间</span>
              </div>
              <div class="banav-message">
                <div class="banav-session">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">中国女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">12</div>
                </div>
                <div class="banav-session" style="margin-top: 10px;">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">塞尔维亚女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">18</div>
                </div>
              </div>
            </div>
            <!-- 暂时展示 -->
            <div class="h-full overflow-hidden cursor-pointer custom-wh" @click="to(item.arr[1])">
              <div class="carousel-head">
                <div class="carousel-headlfet">
                  <span class="carousel-title">奥运女篮3</span>
                  <div class="carousel-time">
                    <span class="carousel-month">07-31</span>
                    <span class="carousel-hms">21:00</span>
                    <span class="carousel-game">比赛中</span>
                  </div>
                </div>
                <span class="carousel-headright">直播间</span>
              </div>
              <div class="banav-message">
                <div class="banav-session">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">中国女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">12</div>
                </div>
                <div class="banav-session" style="margin-top: 10px;">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">塞尔维亚女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">18</div>
                </div>
              </div>
            </div>
            <!-- 暂时展示 -->
            <div class="h-full overflow-hidden cursor-pointer custom-wh" @click="to(item.arr[1])">
              <div class="carousel-head">
                <div class="carousel-headlfet">
                  <span class="carousel-title">奥运女篮4</span>
                  <div class="carousel-time">
                    <span class="carousel-month">07-31</span>
                    <span class="carousel-hms">21:00</span>
                    <span class="carousel-game">比赛中</span>
                  </div>
                </div>
                <span class="carousel-headright">直播间</span>
              </div>
              <div class="banav-message">
                <div class="banav-session">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">中国女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">12</div>
                </div>
                <div class="banav-session" style="margin-top: 10px;">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">塞尔维亚女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">18</div>
                </div>
              </div>
            </div>
            <!-- 暂时展示 -->
            <div class="h-full overflow-hidden cursor-pointer custom-wh" @click="to(item.arr[1])">
              <div class="carousel-head">
                <div class="carousel-headlfet">
                  <span class="carousel-title">奥运女篮5</span>
                  <div class="carousel-time">
                    <span class="carousel-month">07-31</span>
                    <span class="carousel-hms">21:00</span>
                    <span class="carousel-game">比赛中</span>
                  </div>
                </div>
                <span class="carousel-headright">直播间</span>
              </div>
              <div class="banav-message">
                <div class="banav-session">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">中国女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">12</div>
                </div>
                <div class="banav-session" style="margin-top: 10px;">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">塞尔维亚女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">18</div>
                </div>
              </div>
            </div>
            <!-- 暂时展示 -->
            <div class="h-full overflow-hidden cursor-pointer custom-wh" @click="to(item.arr[1])">
              <div class="carousel-head">
                <div class="carousel-headlfet">
                  <span class="carousel-title">奥运女篮6</span>
                  <div class="carousel-time">
                    <span class="carousel-month">07-31</span>
                    <span class="carousel-hms">21:00</span>
                    <span class="carousel-game">比赛中</span>
                  </div>
                </div>
                <span class="carousel-headright">直播间</span>
              </div>
              <div class="banav-message">
                <div class="banav-session">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">中国女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">12</div>
                </div>
                <div class="banav-session" style="margin-top: 10px;">
                  <div class="session-left">
                    <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt="">
                    <span class="session-name">塞尔维亚女篮</span>
                  </div>
                  <div style="font-size: 14px; color: #fff; line-height: 32px;">18</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="pre-button pos-a cursor-pointer user-select-none overflow-hidden hover-class-scale" @click="pre">
        <img class="wh-full click-btn" src="../../../assets/images/left@2x.png" alt="" />
      </div>
      <div class="next-button pos-a cursor-pointer user-select-none overflow-hidden hover-class-scale" @click="next">
        <img class="wh-full click-btn" src="../../../assets/images/right@2x.png" alt="" />
      </div>
  	</div>

    <!--  -->
    <div class="layout-Module-head">
      <div class="layout-Module-balltitle">足球</div>
      <button class="button-switch" :class="{ 'active': ballIndex === index }" v-for="(item, index) in ballBtns" @click="ballActiveIndex(item,index)">
        {{ item.namebtn }}
      </button>
    </div>
    <div class="layout-Module-container">
      <div class="layout-ul">
        <a class="layout-a" href="">
          <img class="layout-img" src="https://rpic.douyucdn.cn/live-cover/640/360/4a84f88a125a65eb286da0c6d435ae0c.avif" alt="">
          <div class="layout-textbox">
            <div class="layout-bot-title">
              <div class="layout-bot-title-l">费德勒VS纳达尔 谁才是真正的</div>
              <div class="layout-bot-title-r">网球</div>
            </div>
            <div class="layout-bot-contnt">
              <div class="contnt-lfetbox">
                <img class="contnt-lfetbox-img" src="https://apic.douyucdn.cn/upload/avanew/face/201803/23/17/faa711e232041d7525a1bd695bf8fa8e_big.jpg" alt="">
                <div class="contnt-lfetbox-text">一诺台球解说</div>
              </div>
              <div class="contnt-ringhbox">
                <img class="contnt-ringhbox-img" src="https://apic.douyucdn.cn/upload/avanew/face/201803/23/17/faa711e232041d7525a1bd695bf8fa8e_big.jpg" alt="">
                <div class="contnt-ringhbox-text">122.3万</div>
              </div>
            </div>
            <div class="layout-bot-competition">
              <span class="layout-bot-span">体育</span>
              <span class="layout-bot-span">网球</span>
              <span class="layout-bot-span">赛事</span>
            </div>
          </div>
        </a>
        
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted,watchEffect,nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash-es';//防抖动
const today = new Date();
const dateBtns = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(today.getTime() + index * 24 * 60 * 60 * 1000);
  return `${date.getMonth() + 1}-${date.getDate()}`;
});
const currentIndex = ref(0);
//日期选择
const setActiveIndex = (dateStr,index) =>{
  currentIndex.value = index;
}
//足球按钮数据
const ballBtns = ref([
  {
    namebtn:'所有',
  },
  {
    namebtn:'直播中',
  },
]);
//足球按钮点击下标
const ballIndex = ref(0);
//点击足球按钮
const ballActiveIndex = (itemd,index) =>{
  console.log('点击足球按钮',index);
  ballIndex.value = index;
}

//轮播图数据
const router = useRouter();
const banner = ref([
  {
    arr:[
      {
        path: '/goods?goodsId=10238',
        url: 'https://img.zgroup.cn/f41e41fdcd5a184b8325d86b7c41d4e8c7f842e2_s.webp'
      },
      {
        path: '/goods?goodsId=10241',
        url: 'https://img.zgroup.cn/1f3395982e5c0fef7a038877541eb5c3ecb0fe83_s.webp'
      },
    ]
  },
  {
    arr:[
      {
        path: '/goods?goodsId=10217',
        url: 'https://img.zgroup.cn/5db8291c808c4a7fddbfa711f9534a3a5d9dbfdd_s.webp'
      },
      {
        path: '/goods?goodsId=10075',
        url: 'https://img.zgroup.cn/ac4d44b8c61c4d66cbedd7e5eaa486c96a833f8f_s.webp'
      }
    ]
  },
  {
    arr:[
      {
        path: '/goods?goodsId=10223',
        url: 'https://img.zgroup.cn/30a0d7732f2e5dd0aa14702c375c7a015c2f32f3_s.webp'
      },
      {
        path: '/goods?goodsId= 10196',
        url: 'https://img.zgroup.cn/d829c417439d0e35056c4f357a3430dc69adc43a_s.webp'
      }
    ]
  }
]);
const current = ref(0);
const animated = ref(true);
let timer = null;
// const preBtn = () =>{
// 	return require(``)
// }
// const nextBtn = () =>{
// 	return require(``)
// }

// 轮播图对应跳转路径
const to = (item) => {
  if (item.path) {
    router.push(item.path);
  }
};
//轮播图左边按钮
const pre = () => {
  // 向前切换
  if (current.value <= 0) {
    animated.value = false; // 停止动画
    current.value = banner.value.length - 1; // 切换到最后一个
    //const t = setTimeout(() => {
    //   clearTimeout(t);
    //   animated.value = true;
    //   current.value--;
    // }, 100);
    setTimeout(() => {
      animated.value = true; // 重新启动动画
    }, 100); // 可以根据需要调整时间
  } else {
    animated.value = true; 
    current.value--; // 向前切换
  }
};
//轮播图右边按钮
const next = () => {
  // 向后切换
  if (current.value >= banner.value.length - 1) {
    animated.value = false; // 停止动画
    current.value = 0; // 切换到第一个
    //   const t = setTimeout(() => {
    //     clearTimeout(t);
    //     animated.value = true;
    //     current.value++;
    //   }, 100);
    setTimeout(() => {
      animated.value = true; // 重新启动动画
    }, 100); // 可以根据需要调整时间
  } else {
    animated.value = true; 
    current.value++; // 向后切换
  }
};
//开启轮播
const auto = () => {
  stop();
  timer = setInterval(next, 3000);//开启定时器
};

const stop = () => {
  clearInterval(timer);//清除定时器
};
//测试使用的
const checkLodash = () => {
  console.log('Lodash-es is working:', typeof debounce === 'function');
};
//轮播图li标签动态宽度
const itemWidth = ref(0);
const lastWidth = ref(0);//获取最后一次监听的宽度
//动态监听轮播图wh-full类名初始宽度为100%的实际宽度
watchEffect(() => {
  nextTick(() => {
    const element = document.querySelector('.wh-full');
    if (element) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          lastWidth.value = entry.contentRect.width;
        }
      });
      observer.observe(element);
    }
  });
  itemWidth.value = lastWidth.value;
  console.log('实时获取宽度',itemWidth.value);
});

onMounted(() => {
  stop();
  checkLodash();
});

onUnmounted(() => {
  stop();
});
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: inherit;
}
.layout-boxnav{
  padding: 0 14px 0 26px;
  .layout-Module-head{
    display: flex;
    margin-bottom: 10px;
    // padding-left: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    // min-height: 34px;
    .layout-Module-title{
      font-size: 24px;
      // line-height: 15px;
      margin-right: 20px;
      font-weight: bold;
    }
    // 时间选中样式
    .date-selector {
      display: flex;
      gap: 8px;
      .date-btn {
        width: 90px;
        background-color: #f2f2f2;
        border: none;
        border-radius: 4px;
        padding: 4px 12px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
      }
      .date-btn.active {
        // background-color: #007bff;
        color: #ff5320;
        border: #ff5320 solid 1px;
      }

      .date-btn:hover:not(.active) {
        background-color: #e6e6e6;
      }
    }
    .layout-Module-balltitle {
      font-size: 24px;
      // line-height: 15px;
      margin-right: 20px;
      font-weight: bold;
    }
    //视频推荐列表样式-头部-分类按钮
    .button-switch{
      // width: 56px;
      height: 30px;
      font-size: 12px;
      // line-height: 30px;
      text-align: center;
      color: #a9a9a9;
      border: 1px solid #a9a9a9;
      border-radius: 5px;
      padding: 0 10px;
      margin-right: 10px;
    }
    .button-switch.active {
      color: #ff5320;
      border: #ff5320 solid 1px;
    }

    .button-switch:hover:not(.active) {
      color: #fda031;
      border-color: #fda031;
    }
  }
  //视频推荐列表样式
  .layout-Module-container{
    margin-bottom: 10px;
    .layout-ul{
      display: flex;
      justify-content: space-between;
      .layout-a{
        text-decoration: none;
        color: inherit;
        // padding: 0 14px;
        .layout-img {
          display: block;
          // width: 407px;
          // height: 229px;
          width: 300px;
          height: 168px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .layout-textbox{
          padding: 9px 10px;
          background-color: #f5f6fa;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          .layout-bot-title{
            display: flex;
            justify-content: space-between;
            .layout-bot-title-l{
              font-size: 18px;
              font-weight: bold;
              width: 245px;
              white-space: nowrap;//不换行
              overflow: hidden;
              text-overflow: ellipsis;//省略号
            }
            .layout-bot-title-r{
              font-size: 14px;
              line-height: 25px;
            }
          }
          .layout-bot-contnt{
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            .contnt-lfetbox{
              display: flex;
              .contnt-lfetbox-img{
                display: block;
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
              .contnt-lfetbox-text{
                font-size: 12px;
              }
            }
            .contnt-ringhbox{
              display: flex;
              .contnt-ringhbox-img{
                display: block;
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
              .contnt-ringhbox-text{
                font-size: 12px;
              }
            }
          }
          .layout-bot-competition{
            display: flex;
            .layout-bot-span{
              display: block;
              background-color: #e5e7ee;
              font-size: 12px;
              border-radius: 2px;
              margin-right: 8px;
              // height: ;
            }
          }
        }
      }
    }
  }


  .swiper-container {
		.swiper-main {
			transition-property: transform;
			transition-duration: 0s;
		}
		.animated-duration{
			transition-duration: 0.5s;
		}
    //自定义修改样式
    .custom-wh {
      width: 260px;
      background-color: #3a3d50;
      padding: 0 10px;
      border-radius: 5px;
      .carousel-head{
        display: flex;
        justify-content: space-between;
        border-bottom: solid 1px #ccc;
        padding-bottom: 40px;
        .carousel-headlfet{
          .carousel-title{
            color: #fff;
            font-size: 16px;
            display: block;
            margin-top: 16px;
          }
          .carousel-time{
            display: flex;
            margin-top: 5px;
            .carousel-month{
              color: #fff;
              font-size: 14px;
              margin-right: 5px;
            }
            .carousel-hms{
              color: #fff;
              font-size: 14px;
              margin-right: 5px;
            }
            .carousel-game{
              color: #ff0000;
              font-size: 14px;
            }
          }
        }
        .carousel-headright{
          display: block;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: #fda031;
          border-radius: 5px;
          border: #fda031 1px solid;
          padding: 0 10px;
          margin-top: 16px;
        }
      }
      .banav-message{
        padding-top: 10px;
        .banav-session{
          display: flex;
          justify-content: space-between;
          .session-left{
            display: flex;
            .session-img{
              display: block;
              width: 32px;
              height: 32px;
              border-radius: 50%;
            }
            .session-name{
              margin-left: 10px;
              font-size: 14px;
              color: #fff;
              line-height: 32px;
            }
          }
        }
      }
    }
	}
	.pre-button, .next-button{
		width: 32px;
		height: 42px;
		top: 79px;
		z-index: 9;
	}
	.pre-button {
		// left: -16px;
		left: 0;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}
	.next-button {
		// right: -16px;
		right: 0;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}
	
	.click-btn {
		opacity: 0.6;
		
		&:hover {
			opacity: 0.8;
		}
	}


}
</style>