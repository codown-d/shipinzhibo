<script setup>
import router from "@/router";
import { getRecommendRoom } from "@/api/home";
import { ref, onMounted, onUpdated } from "vue";
import { types } from "sass";
const props = defineProps({
  headerTitle: String, //标题
  tagList: Array, //列表数据
  // tagHotlsit: Object,//热门数据
});
console.log(props);
onUpdated(() => {
  console.log("查看接收的数据1", props.headerTitle);
  console.log("查看接收的数据2", props.tagList);
});

//点击进入详情
const goDetail = (rid, owner, type) => {
  // router.push({
  //   path: `/detail/${rid}`
  // })
  // console.log('路由点击跳转', router)
  window.open(`/detail/${rid}/${owner}/${type}`, "_blank");
};
// const roomList = ref([])
// //重复连接.concat(res.data)将数据量扩大 获取图片
// getRecommendRoom({ type: props.tag.tagId }).then((res) => {
//   res.data = res.data.concat(res.data).concat(res.data).concat(res.data).concat(res.data).concat(res.data).concat(res.data)
//   roomList.value = res.data.slice(0,12)
// })
</script>

<template>
  <!-- 推荐数据 || props.headerTitle == '交友'||props.headerTitle == '男神'||props.headerTitle == '女神'||props.headerTitle == '点唱'||props.headerTitle == '情感'||props.headerTitle == '混听'||props.headerTitle == '陪玩'-->
  <div
    :class="
      props.headerTitle == '推荐' || props.headerTitle == '热门'
        ? 'plate-item'
        : 'room-item-types'
    "
  >
    <!-- v-if="tagList.length" -->
    <!-- <div class="header" v-for="(item,index) in props.tagList"> -->
    <!-- 首页使用展示 -->
    <div
      class="header"
      v-show="props.headerTitle == '推荐' || props.headerTitle == '热门'"
    >
      <div class="tag-name">{{ props.headerTitle }}</div>
      <div class="look-all">
        <!-- <span class="look-text">查看更多</span> -->
        <!-- <el-icon><ArrowRight /></el-icon> -->
      </div>
    </div>
    <!-- 直播页进来使用 || 赛事直播页面进来使用-->
    <div
      class="header-tj"
      v-show="
        props.headerTitle == '推荐直播' || props.headerTitle == '赛事直播'
      "
    >
      <div class="tag-name">{{ props.headerTitle }}</div>
      <span class="listRecommend-refresh">换一批</span>
    </div>
    <div class="header" v-show="props.headerTitle == '全部直播' || props.headerTitle == '我的关注'">
      <div class="tag-name">{{ props.headerTitle }}</div>
    </div>
    <!-- 左侧菜单7大类型标签显示的标题 -->
    <div
      class="header"
      v-show="
        props.headerTitle == '交友' ||
        props.headerTitle == '男神' ||
        props.headerTitle == '女神' ||
        props.headerTitle == '点唱' ||
        props.headerTitle == '情感' ||
        props.headerTitle == '混厅' ||
        props.headerTitle == '陪玩'
      "
    >
      <div class="tag-name">{{ props.headerTitle }}</div>
    </div>
    <!-- 这部分统一使用 -->
    <div class="rooms">
      <!-- v-for="(item,index) in props.tagList.avatar" :key="index" -->
      <template v-if="props.tagList.length">
        <div
          class="room-item"
          v-for="(itemlist, indeximg) in props.tagList"
          :key="indeximg"
        >
          <!-- 把图片数据传到组件 -->
          <!-- <Room :avatarRecom="itemlist"></Room> -->
          <div
            class="room"
            @click="goDetail(itemlist.rid, itemlist.owner, itemlist.type)"
          >
            <div
              class="room-img"
              :style="{
                background:
                  'url(' + itemlist.avatar + ') center top / cover no-repeat',
              }"
            ></div>
            <div class="room-textbox">
              <div class="room-bot-title">
                <div class="room-bot-title-l">{{ itemlist.title }}</div>
                <div class="room-bot-title-r">{{ itemlist.roomTag }}</div>
              </div>
              <div class="room-bot-contnt">
                <div class="contnt-lfetbox">
                  <!-- <img class="contnt-lfetbox-img" src="https://apic.douyucdn.cn/upload/avanew/face/201803/23/17/faa711e232041d7525a1bd695bf8fa8e_big.jpg" alt=""> -->
                  <img
                    class="contnt-lfetbox-img"
                    :src="itemlist.userAvatar ? itemlist.userAvatar : ''"
                    alt=""
                  />
                  <div class="contnt-lfetbox-text">{{ itemlist.nick }}</div>
                </div>
                <div class="contnt-ringhbox">
                  <img
                    class="contnt-ringhbox-img"
                    src="https://apic.douyucdn.cn/upload/avanew/face/201803/23/17/faa711e232041d7525a1bd695bf8fa8e_big.jpg"
                    alt=""
                  />
                  <div class="contnt-ringhbox-text">
                    {{ itemlist.hotIndex }}
                  </div>
                </div>
              </div>
              <!-- <div class="room-bot-competition">
              <span class="room-bot-span">没数据</span>
              <span class="room-bot-span">没数据</span>
              <span class="room-bot-span">没数据</span>
            </div> -->
            </div>
          </div>
        </div>
      </template>
      <div v-else class="room-noData">
        <el-empty description="暂无数据" />
      </div>
      <!-- <div class="room-item">
        <Room :room="props.tagList.avatar"></Room>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.plate-item {
  width: 100%;
  height: 100%;
  padding: 20px 355px;
  box-sizing: border-box;
}
//直播页面types样式
.room-item-types {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.header-tj {
  display: flex;
  justify-content: left;
  padding: 0 10px;
  .tag-name {
    font-size: 24px;
    color: #333;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  .listRecommend-refresh {
    display: block;
    width: 60px;
    height: 25px;
    border: #a9a9a9 1px solid;
    font-size: 14px;
    text-align: center;
    line-height: 25px;
    color: #a9a9a9;
    margin-left: 20px;
    border-radius: 5px;
    margin-top: 2px;
    &:hover {
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
    }
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .tag-name {
    font-size: 24px;
    color: #333;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .look-all {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
    }

    .look-text {
      margin-right: 5px;
    }
  }
}

.rooms {
  display: flex;
  flex-wrap: wrap;
  //home首页样式
  .room-item {
    // width: 20%;
    // height: 270px;
    // width: 25%;
    // height: 320px;
    padding: 16px 8px;
    box-sizing: border-box;
    transition: all 0.2s;
    .room {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      color: #333;

      &:hover {
        color: var(--el-color-primary);
        // .room-img{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        transform: translateY(-2px);
        // }
      }

      .room-img {
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

      .room-textbox {
        padding: 9px 10px;
        background-color: #f5f6fa;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        .room-bot-title {
          display: flex;
          justify-content: space-between;
          .room-bot-title-l {
            font-size: 14px;
            font-weight: bold;
            width: 200px;
            white-space: nowrap; //不换行
            overflow: hidden;
            text-overflow: ellipsis; //省略号
          }
          .room-bot-title-r {
            font-size: 14px;
            line-height: 25px;
          }
        }
        .room-bot-contnt {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
          .contnt-lfetbox {
            display: flex;
            .contnt-lfetbox-img {
              display: block;
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
            .contnt-lfetbox-text {
              font-size: 12px;
              line-height: 20px;
            }
          }
          .contnt-ringhbox {
            display: flex;
            .contnt-ringhbox-img {
              display: block;
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
            .contnt-ringhbox-text {
              font-size: 12px;
            }
          }
        }
        .room-bot-competition {
          display: flex;
          .room-bot-span {
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
  .room-noData{
    width: 100%;
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
