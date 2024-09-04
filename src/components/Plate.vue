<script setup>
import router from "@/router";
import { getRecommendRoom } from '@/api/home';
import { ref,onMounted,onUpdated } from "vue";

const props = defineProps({
  headerTitle:String,//标题
  tagList: Array,//列表数据
  // tagHotlsit: Object,//热门数据
})
onUpdated(()=>{
  console.log('查看接收的数据1',props.headerTitle);
  console.log('查看接收的数据2',props.tagList);
})

//点击进入详情
const goDetail = (rid)=>{
  // router.push({
  //   path: `/detail/${rid}`
  // })
  // console.log('路由点击跳转', router)
  window.open(`/detail/${rid}`, "_blank");
}
// const roomList = ref([])
// //重复连接.concat(res.data)将数据量扩大 获取图片
// getRecommendRoom({ type: props.tag.tagId }).then((res) => {
//   res.data = res.data.concat(res.data).concat(res.data).concat(res.data).concat(res.data).concat(res.data).concat(res.data)
//   roomList.value = res.data.slice(0,12)
// })

</script>

<template>
  <!-- 推荐数据 -->
  <div class="plate-item">
    <!-- v-if="tagList.length" -->
    <!-- <div class="header" v-for="(item,index) in props.tagList"> -->
    <div class="header">
      <div class="tag-name">{{ props.headerTitle }}</div>
      <div class="look-all">
        <span class="look-text">查看更多</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="rooms">
      <!-- v-for="(item,index) in props.tagList.avatar" :key="index" -->
      <div class="room-item" v-for="(itemlist,indeximg) in props.tagList" :key="indeximg">
        <!-- 把图片数据传到组件 -->
        <!-- <Room :avatarRecom="itemlist"></Room> -->
        <div class="room" @click="goDetail(itemlist.rid)">
          <div class="room-img" :style="{ background: 'url(' + itemlist.avatar + ') center top / cover no-repeat' }"></div>
          <div class="room-textbox">
            <div class="room-bot-title">
              <div class="room-bot-title-l">{{ itemlist.title }}</div>
              <div class="room-bot-title-r">网球</div>
            </div>
            <div class="room-bot-contnt">
              <div class="contnt-lfetbox">
                <img class="contnt-lfetbox-img" src="https://apic.douyucdn.cn/upload/avanew/face/201803/23/17/faa711e232041d7525a1bd695bf8fa8e_big.jpg" alt="">
                <div class="contnt-lfetbox-text">一诺台球解说</div>
              </div>
              <div class="contnt-ringhbox">
                <img class="contnt-ringhbox-img" src="https://apic.douyucdn.cn/upload/avanew/face/201803/23/17/faa711e232041d7525a1bd695bf8fa8e_big.jpg" alt="">
                <div class="contnt-ringhbox-text">122.3万</div>
              </div>
            </div>
            <div class="room-bot-competition">
              <span class="room-bot-span">体育</span>
              <span class="room-bot-span">网球</span>
              <span class="room-bot-span">赛事</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="room-item">
        <Room :room="props.tagList.avatar"></Room>
      </div> -->
    </div>
  </div>
  <!-- 热门数据 -->
  <!-- <div class="plate-item">
    <div class="header">
      <div class="tag-name">热门</div>
      <div class="look-all">
        <span class="look-text">查看更多</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="rooms">
      <div class="room-item" v-for="(itemHot,indexHot) in props.tagHotlsit" :key="indexHot">
        <div class="room">
          <div class="room-img" :style="{ background: 'url(' + props.itemHot.avatar + ') center top / cover no-repeat' }"></div>
          <div class="room-textbox">
            <div class="room-bot-title">
              <div class="room-bot-title-l">{{ props.itemHot.title }}</div>
              <div class="room-bot-title-r">网球</div>
            </div>
            <div class="room-bot-contnt">
              <div class="contnt-lfetbox">
                <img class="contnt-lfetbox-img" src="https://apic.douyucdn.cn/upload/avanew/face/201803/23/17/faa711e232041d7525a1bd695bf8fa8e_big.jpg" alt="">
                <div class="contnt-lfetbox-text">一诺台球解说</div>
              </div>
              <div class="contnt-ringhbox">
                <img class="contnt-ringhbox-img" src="https://apic.douyucdn.cn/upload/avanew/face/201803/23/17/faa711e232041d7525a1bd695bf8fa8e_big.jpg" alt="">
                <div class="contnt-ringhbox-text">122.3万</div>
              </div>
            </div>
            <div class="room-bot-competition">
              <span class="room-bot-span">体育</span>
              <span class="room-bot-span">网球</span>
              <span class="room-bot-span">赛事</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
.plate-item {
  width: 100%;
  height: 100%;
  padding: 20px 355px;
  box-sizing: border-box;
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .tag-name{
    font-size: 24PX;
    color: #333;
    font-weight: 500;
    cursor: pointer;

    &:hover{
      color: var(--el-color-primary);
    }
  }

  .look-all{
    display: flex;
    align-items: center;
    font-size: 14PX;
    color: #666;
    cursor: pointer;

    &:hover{
      color: var(--el-color-primary);
    }

    .look-text{
      margin-right: 5PX;
    }
  }
}

.rooms{
  display: flex;
  flex-wrap: wrap;

  .room-item{
    // width: 20%;
    // height: 270px;
    // width: 25%;
    // height: 320px;
    padding: 16px 8px;
    box-sizing: border-box;
    transition: all 0.2s;
    .room{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      color: #333;

      &:hover{
        color: var(--el-color-primary);
        // .room-img{
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          transform: translateY(-2px);
        // }
      }

      .room-img{
        width: 285px;
        height: 160px;
        // border-radius: 10PX;
        transition: 0.3s;
        cursor: pointer;
        object-fit: contain;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }

      // .room-title{
      //   font-size: 16PX;
      //   margin-top: 10PX;
      //   cursor: pointer;
      //   display: block;
      //   font-weight: 600;
      //   line-height: normal;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   white-space: nowrap;
      //   flex: none;
      // }

      .room-textbox{
        padding: 9px 10px;
        background-color: #f5f6fa;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        .room-bot-title{
          display: flex;
          justify-content: space-between;
          .room-bot-title-l{
            font-size: 14px;
            font-weight: bold;
            width: 200px;
            white-space: nowrap;//不换行
            overflow: hidden;
            text-overflow: ellipsis;//省略号
          }
          .room-bot-title-r{
            font-size: 14px;
            line-height: 25px;
          }
        }
        .room-bot-contnt{
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
        .room-bot-competition{
          display: flex;
          .room-bot-span{
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

// @media only screen and (min-width: 1424px) and (max-width: 1824px) {
//   .rooms .room-item {
//     width: 25%;
//     height: 320px;
//   }
// }

// @media only screen and (max-width: 1424px) {
//   .rooms .room-item {
//     width: 33.3333%;
//     height: 420px;
//   }
// }

// @media only screen and (max-width: 800px) {
//   .rooms .room-item {
//     width: 100%;
//     height: 1260px;
//   }
// }
</style>