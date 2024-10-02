<template>
  <div
    style="
      height: 200px;
      padding: 0px 32px;
      margin-bottom: 20px;
      overflow: hidden;
    "
    class="pos-r"
  >
    <swiper
      :space-between="30"
      :slidesPerView="6"
      :slides-per-group="6"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="(item, index) in slides" :key="index" >
        <div
          class="swiper-item"
          style="overflow: hidden;width: 200px; height: 200px"
          @click="to(item.roomIds, item.owner, item.type)"
        >
          <div class="carousel-head">
            <div class="carousel-headlfet">
              <span class="carousel-title">{{ item.title }}</span>
              <div class="carousel-time">
                <span class="carousel-month">{{ item.formattedDate }}</span>
                <span class="carousel-hms">{{ item.formattedTime }}</span>
                <span class="carousel-game">{{
                  item.status == 1
                    ? "未开始"
                    : item.status == 2
                    ? "进行中"
                    : "已结束"
                }}</span>
              </div>
            </div>
            <span class="carousel-headright">直播间</span>
          </div>
          <div class="banav-message">
            <div class="banav-session">
              <div class="session-left">
                <!-- <img class="session-img" src="https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg" alt=""> -->
                <img
                  class="session-img"
                  :src="
                    item.image
                      ? item.image
                      : 'https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg'
                  "
                  alt=""
                />
                <span class="session-name">{{ item.team }}</span>
              </div>
              <div style="font-size: 14px; color: #fff; line-height: 32px">
                {{ item.score }}
              </div>
            </div>
            <div class="banav-session" style="margin-top: 10px">
              <div class="session-left">
                <img
                  class="session-img"
                  :src="
                    item.toImage
                      ? item.toImage
                      : 'https://cdn.sportnanoapi.com/basketball/team/9198540adaea90e558c4f75798c6a13a.jpg'
                  "
                  alt=""
                />
                <span class="session-name">{{ item.toTeam }}</span>
              </div>
              <div style="font-size: 14px; color: #fff; line-height: 32px">
                {{ item.toScore }}
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div v-if="loading" class="loading">加载中...</div>
    </swiper>
    <div class="swiper-pre" @click="slideToPrev">
      <img class="click-btn" src="../assets/images/left@2x.png" alt="" />
    </div>
    <div class="swiper-next" @click="slideToNext">
      <img class="click-btn" src="../assets/images/right@2x.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,watch,defineProps   } from "vue";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { getLiveMatchList } from "@/api/competition";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
// Import Swiper styles
const today = new Date();
const props = defineProps({
  dayIndex: {
    type: Number,
    default:0,
    required: true, // 必须提供
  },
});
const to = (rid,owner,type) => {
  //需要获m3u8播放地址传给详情页面config: "{\"pull_url\":\"https://phonews.qing.mgtv.com/nn_live/nn_x64/dWlwPTEwMy43MS43M
  window.open(`/detail/${rid}/${owner}/${type}`, "_blank");
};
// 定义数据
const slides = ref([]);
const currentPage = ref(1);
const loading = ref(false);
let swiperInstance;
const onSwiper = (swiper) => {
  swiperInstance = swiper;
};
const formatDate = (date, time) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day} ${time}`;
};
const fetchSlides = async ( pageSize=6) => {
  loading.value = true;
  try {
    const selectedDate = new Date(
      today.getTime() + props.dayIndex * 24 * 60 * 60 * 1000
    );
    const beginDate = formatDate(selectedDate, "00:00:00");
    const endDate = formatDate(selectedDate, "23:59:59");
    let param = {
      type: 1,
      beginDate: beginDate, //开始时间
      endDate: endDate, //结束时间
      pageNum: currentPage.value,
      pageSize:pageSize, //每页6条数据
    };
    const needToken = true;
    const response = await getLiveMatchList(param, needToken);
    const data = response.data.rows.map((match) => {
      const beginTime = new Date(match.beginTime);
      return {
        ...match,
        formattedDate: `${String(beginTime.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(beginTime.getDate()).padStart(2, "0")}`,
        formattedTime: `${String(beginTime.getHours()).padStart(
          2,
          "0"
        )}:${String(beginTime.getMinutes()).padStart(2, "0")}`,
      };
    });
    slides.value = [...slides.value, ...data]; // 追加新数据
  } catch (error) {
    console.error("获取数据时出错:", error);
  } finally {
    loading.value = false;
  }
};

// 组件挂载时加载第一页数据
onMounted(() => {
  fetchSlides(6);
});

let slideToPrev=()=>{
    if (swiperInstance) {
    swiperInstance.slidePrev();
  }
}
let slideToNext=()=>{
    if (swiperInstance) {
    swiperInstance.slideNext();
  }
}
// 监听滑动事件，滑到最后一个 Slide 时加载下一页
const onSlideChange = (swiper) => {
  const { activeIndex } = swiper;
  if (activeIndex + 6 >= slides.value.length - 1 && !loading.value) {
    currentPage.value++;
    fetchSlides();
  }
};
watch(() => props.dayIndex, (newValue, oldValue) => {
    currentPage.value=1
    console.log(123)
    slides.value=[]
    fetchSlides( 12);
});
</script>

<style scoped lang="scss">
.loading {
  text-align: center;
  font-size: 16px;
}
.swiper-item {
  background-color: #3a3d50;
  padding: 0 0.05208rem;
  border-radius: 0.02604rem;
  height: 200px;
  .carousel-head {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 0.00521rem #ccc;
    padding-bottom: 0.20833rem;
  }
  .carousel-headlfet {
    .carousel-title {
      color: #fff;
      font-size: 0.08333rem;
      display: block;
      margin-top: 0.08333rem;
    }
    .carousel-time {
      display: flex;
      margin-top: 0.02604rem;
      .carousel-month {
        display: block;
        width: 0.2rem;
        color: #fff;
        font-size: 0.07292rem;
        margin-right: 0.02604rem;
      }
      .carousel-hms {
        color: #fff;
        font-size: 0.07292rem;
        margin-right: 0.02604rem;
      }
      .carousel-game {
        display: block;
        width: 0.24rem;
        color: #ff0000;
        font-size: 0.07292rem;
      }
    }
  }
  .carousel-headright {
    display: block;
    height: 0.15625rem;
    width: 0.4rem;
    line-height: 0.15625rem;
    text-align: center;
    font-size: 0.08333rem;
    color: #fda031;
    border-radius: 0.02604rem;
    border: #fda031 0.00521rem solid;
    margin-top: 0.08333rem;
  }
  .banav-message {
    padding-top: 0.05208rem;
    .banav-session {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .session-left {
      display: flex;
      .session-img {
        display: block;
        width: 0.16667rem;
        height: 0.16667rem;
        border-radius: 50%;
      }
      .session-name {
        margin-left: 0.05208rem;
        font-size: 0.07292rem;
        color: #fff;
        line-height: 0.16667rem;
      }
    }
  }
}
.swiper-pre,
.swiper-next {
  position: absolute;
  width: 0.16667rem;
  height: 0.21875rem;
  top: 0.41146rem;
  z-index: 9;
  user-select: none;
  background-color: #d3d3d4;
  cursor: pointer;
  transform-origin: center center;
  transition-property: transform;
  transition-duration: 0.5s;
}
.swiper-pre{
    left: 0;
    border-top-left-radius: 0.04167rem;
    border-bottom-left-radius: 0.04167rem;
}
.swiper-next{
    right: 0;
    border-top-right-radius: 0.04167rem;
    border-bottom-right-radius: 0.04167rem;
}
.click-btn{
    width: 100%;
  opacity: 0.6;
}
</style>
