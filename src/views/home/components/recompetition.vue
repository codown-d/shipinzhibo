<template>
  <div class="recompetition-box">
    <div class="recompetition-left">
      <!-- 标题 -->
      <div class="grid-header">
        <div class="grid-header-left">
          <img class="grid-header-img" src="http://cdn.img.mhuan.shop/FiQQ-rzYa8PbNZfoPHY5R4W74dOQ.png" alt="">
          <div class="grid-header-left-text">赛事推荐</div>
          <div class="grid-header-left-nav">
            <el-button :type="selectedTab === 'all' ? 'primary' : 'default'" @click="selectTab('all')">全部</el-button>
            <el-button :type="selectedTab === 'football' ? 'primary' : 'default'" @click="selectTab('football')">足球</el-button>
            <el-button :type="selectedTab === 'basketball' ? 'primary' : 'default'" @click="selectTab('basketball')">篮球</el-button>
            <el-button :type="selectedTab === 'volleyball' ? 'primary' : 'default'" @click="selectTab('volleyball')">排球</el-button>
            <el-button :type="selectedTab === 'esports' ? 'primary' : 'default'" @click="selectTab('esports')">电竞</el-button>
            <el-button :type="selectedTab === 'chesscard' ? 'primary' : 'default'" @click="selectTab('chesscard')">棋牌</el-button>
          </div>
        </div>
        <div class="grid-header-right">
          <div class="grid-header-right-text">今日(36)</div>
        </div>
      </div>
      <!-- 比赛内容 -->
      <div class="competition-content">
        <!-- <div v-for="item in dataList" :key="item.id"> -->
        <div class="competition-list">
          <!-- 比赛标题 -->
          <div class="competition-title">
            <span class="competition-left">
              <img class="competition-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAVlQTFRFAAAA/4AA/6oA/4AA/44A/38A7ogA74AA8IcP8YAO8oYN8oAN84sM9IUL9YUK9oQJ8oMN84UM8YYO8oQN7oYN8IUP8YUO8YcO8IYN8IYP7oUO74UO74UO74UO8IUN7oYP7oUP7oYP74UO74YO8IUO7oYN7oUP7oYP7oUP7oYP74YO74UO74YO74UO74YO74YO74UO74UP74YP74UO74YO7oYO74UP74YP74YP74UP74YP74UP74YO7oYO7oYO7oUO74YP74UP74YP74UP7oUP7oYO7oUO74UO74UO74YP7oUP7oYO7oUO74UO74YO7oYP7oUP7oUP7oYP7oUP7oYP7oUO74YO74YO74UO74YO74YP8I0e8ZUt8pw886RL9Kxa9bNo9bNp9rp39rt498KG98OH+MqV+MqW+dGk+dKl+tmz+tm0++HC++HD/OjR/fDh/vfv/vjw////Tgh1UgAAAFp0Uk5TAAIDBgkODxAREhMUFhcZGycsNzo9RVhZY2drbW9xdXh5eoKDhIeIiYqLjY6PkJGTlJueoaSorK+7vL/BwsTGx87P0NHT19ja3N/k5ebo6vDx8/T19vf4+v3+15fz0AAAAbBJREFUGBmFwWlbEmEUBuBHWrQkyPZsszIrKioqrRRsNS3NxKB6GEaIBmKZlvP/PyRc5x3eAYbuG2FHz6aWXm1vv1xKnTmCSMkbr2l5cT2OURL3ixywe2saQy5xlM/nEBZ7zAgPYrBM5hhpeRKBiRzHyE7AyHCsh1Cz/I/z6JnK0+JU6p3Oj0qJlvwhdKXZV26Jajnsu4l9yS8MeGL5zkDhGIAUA00J+cnAPIANGp4MqNF4A8zQKIva2xPl0EjgKg1flOuKatG4gEUqRwzXFaNE9QhZqpoYritGleoZ1qkaYriuGB7VW+xQ+WK4zm9RbapPyFP5YtRI76/0+FQ7WKdqSKDj0GlKl0f1DlmqqljqJbq+iFSplrFI5YjtT4UUEYfqCeZotCXkV12kTeMyZmiUZYhD4zjwgYYnAzwaGwDuMdCUkCYDCwASRQY8sXgM7E5j3zz7ym1Rfpl9c+g6+JEWp9rw2161RMvmAfSc/saxvp6CusaxriDwnGM8Rd/UCiOtHIYllmGETAxhFwscoTCLIfF0kQMKd+MYJXl7k5b3CwlEOpleXdsit9Zyd04g5B8K69V7j7vWnQAAAABJRU5ErkJggg==" alt="">
              <div class="competition-bszt">进行中比赛</div>
            </span>
            <div class="competition-right">全部赛事</div>
          </div>
          <!-- 比赛场次 -->
          <div class="competition-session">
            <div class="session-left">
              <div class="session-time">
                <div style="font-size: 16px; line-height: 3vh;">18:30</div>
                <div style="font-size: 12px; color: #9497a4; text-align: center;">07-19</div>
              </div>
              <div style="font-size: 12px; line-height: 6vh;">NBA夏季联赛</div>
            </div>
            <div class="session-middle">
              <div class="middle-left">
                <div class="middle-left-text">克利夫兰骑士</div>
                <img class="middle-left-img" src="https://cdn.sportnanoapi.com/football/team/3068cfc254b9a77c7eac84c9565eeeab.png" alt="">
                <div class="middle-left-figure">89</div>
              </div>
              <div class="middle-zj">-</div>
              <div class="middle-right">
                <div class="middle-right-figure">93</div>
                <img class="middle-right-img" src="https://cdn.sportnanoapi.com/football/team/a159b2e2c6b3cb7bf0e92eb43fe27bdd.png" alt="">
                <div class="middle-right-text">洛杉矶湖人</div>
              </div>
            </div>
            <div class="session-right">
              <img class="session-right-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAAXNSR0IArs4c6QAAAVlQTFRFAAAA/4AA/6oA/4AA/44A/38A7ogA74AA8IcP8YAO8oYN8oAN84sM9IUL9YUK9oQJ8oMN84UM8YYO8oQN7oYN8IUP8YUO8YcO8IYN8IYP7oUO74UO74UO74UO8IUN7oYP7oUP7oYP74UO74YO8IUO7oYN7oUP7oYP7oUP7oYP74YO74UO74YO74UO74YO74YO74UO74UP74YP74UO74YO7oYO74UP74YP74YP74UP74YP74UP74YO7oYO7oYO7oUO74YP74UP74YP74UP7oUP7oYO7oUO74UO74UO74YP7oUP7oYO7oUO74UO74YO7oYP7oUP7oUP7oYP7oUP7oYP7oUO74YO74YO74UO74YO74YP8I0e8ZUt8pw886RL9Kxa9bNo9bNp9rp39rt498KG98OH+MqV+MqW+dGk+dKl+tmz+tm0++HC++HD/OjR/fDh/vfv/vjw////Tgh1UgAAAFp0Uk5TAAIDBgkODxAREhMUFhcZGycsNzo9RVhZY2drbW9xdXh5eoKDhIeIiYqLjY6PkJGTlJueoaSorK+7vL/BwsTGx87P0NHT19ja3N/k5ebo6vDx8/T19vf4+v3+15fz0AAAAbBJREFUGBmFwWlbEmEUBuBHWrQkyPZsszIrKioqrRRsNS3NxKB6GEaIBmKZlvP/PyRc5x3eAYbuG2FHz6aWXm1vv1xKnTmCSMkbr2l5cT2OURL3ixywe2saQy5xlM/nEBZ7zAgPYrBM5hhpeRKBiRzHyE7AyHCsh1Cz/I/z6JnK0+JU6p3Oj0qJlvwhdKXZV26Jajnsu4l9yS8MeGL5zkDhGIAUA00J+cnAPIANGp4MqNF4A8zQKIva2xPl0EjgKg1flOuKatG4gEUqRwzXFaNE9QhZqpoYritGleoZ1qkaYriuGB7VW+xQ+WK4zm9RbapPyFP5YtRI76/0+FQ7WKdqSKDj0GlKl0f1DlmqqljqJbq+iFSplrFI5YjtT4UUEYfqCeZotCXkV12kTeMyZmiUZYhD4zjwgYYnAzwaGwDuMdCUkCYDCwASRQY8sXgM7E5j3zz7ym1Rfpl9c+g6+JEWp9rw2161RMvmAfSc/saxvp6CusaxriDwnGM8Rd/UCiOtHIYllmGETAxhFwscoTCLIfF0kQMKd+MYJXl7k5b3CwlEOpleXdsit9Zyd04g5B8K69V7j7vWnQAAAABJRU5ErkJggg==" alt="">
              <div class="session-right-tetx">观看直播</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 积分排行 -->
    <div class="recompetition-right">
      <div class="points-head">
        <img class="points-img" src="../../../assets/paihangbang.png" alt="">
        <div class="points-text">积分排行</div>
      </div>
      <!-- 标签切换 -->
      <div class="points-tabs">
        <div class="tab-container">
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab"
            :class="{ active: activeTab === index }"
            @click="handleTabClick(index)"
          >
            {{ tab.title }}
          </div>
        </div>

        <div class="content">
          <!-- {{ activeTabContent }} -->
          <div class="rank-content-info-title">
            <div style="width: 45px;">排名</div>
            <div style="display: flex; align-items: center; width: 115px;">球队</div>
            <div style="text-align: center; width: 110px;">胜/平/负</div>
            <div style="text-align: center; width: 32px;">积分</div>
          </div>
          <!-- 比赛排名 -->
          <div>
            <div class="rank-content-info-item" v-for="(item, i) in rankingList" :key="i" >
              <div style="width: 45px;">
                <div class="ank-content-left">{{i+1}}</div>
              </div>
              <div style="display: flex; align-items: center; width: 115px;">
                <img class="rank-team-img" :src="item.img" alt="">
                <div class="rank-team-name">{{ item.teamName }}</div>
              </div>
              <div style="font-size: 14px;text-align: center;width: 110px;">{{item.win}}/{{item.flat}}/{{item.negative}}</div>
              <div style="font-size: 14px;text-align: center;width: 32px;">{{item.points}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, inject, onMounted} from "vue";
  // 初始化数据列表
  const dataList = ref([]);
  // 当前选中的tab
  const selectedTab = ref('all');
  // 选中tab时的操作
  const selectTab = (tab) => {
    console.log('选中未调用接口参数',tab);
    selectedTab.value = tab;
    // 根据选中的tab调用后端接口获取数据
    fetchData(selectedTab.value);
  };

  // 模拟根据tab查询后端数据的方法
  const fetchData = (tab) => {
    console.log('选中调用接口参数',tab);
    // 在这里调用后端接口获取数据，并更新dataList
    // 这里只是模拟数据更新
    dataList.value = [
      { id: 1, name: '数据1' },
      { id: 2, name: '数据2' },
      { id: 3, name: '数据3' }
    ];
  };

  //标签页事件
  const tabs = [
    { title: '英超' },
    { title: '德甲' },
    { title: 'NBA' },
    { title: '英雄联盟' },
    { title: 'CS2' },
  ];

  const activeTab = ref(0);
  const activeTabContent = ref('这里显示选中标签的内容');

  const handleTabClick = (index) => {
    activeTab.value = index;
    console.log('[ 选中标签 ] >', activeTab.value)
    activeTabContent.value = `您选择了 ${tabs[index].title}`;
  }
  //比赛排名数据
  const rankingList = ref([
    {
      img:'https://cdn.sportnanoapi.com/football/team/3b720f181ce9993f9422d276acf7b292.png',
      teamName:'巴黎圣日耳曼',
      win:'8',//胜
      flat:'3',//平
      negative:'1',//负
      points:'27',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/ff8991853f7aabce7cb66f09cda0c58e.png',
      teamName:'尼斯',
      win:'7',//胜
      flat:'5',//平
      negative:'0',//负
      points:'26',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/693af0d277fe3179594695614dce8666.png',
      teamName:'摩纳哥',
      win:'7',//胜
      flat:'3',//平
      negative:'2',//负
      points:'24',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/3b720f181ce9993f9422d276acf7b292.png',
      teamName:'巴黎圣日耳曼',
      win:'8',//胜
      flat:'3',//平
      negative:'1',//负
      points:'27',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/ff8991853f7aabce7cb66f09cda0c58e.png',
      teamName:'尼斯',
      win:'7',//胜
      flat:'5',//平
      negative:'0',//负
      points:'26',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/693af0d277fe3179594695614dce8666.png',
      teamName:'摩纳哥',
      win:'7',//胜
      flat:'3',//平
      negative:'2',//负
      points:'24',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/3b720f181ce9993f9422d276acf7b292.png',
      teamName:'巴黎圣日耳曼',
      win:'8',//胜
      flat:'3',//平
      negative:'1',//负
      points:'27',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/ff8991853f7aabce7cb66f09cda0c58e.png',
      teamName:'尼斯',
      win:'7',//胜
      flat:'5',//平
      negative:'0',//负
      points:'26',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/693af0d277fe3179594695614dce8666.png',
      teamName:'摩纳哥',
      win:'7',//胜
      flat:'3',//平
      negative:'2',//负
      points:'24',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/3b720f181ce9993f9422d276acf7b292.png',
      teamName:'巴黎圣日耳曼',
      win:'8',//胜
      flat:'3',//平
      negative:'1',//负
      points:'27',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/ff8991853f7aabce7cb66f09cda0c58e.png',
      teamName:'尼斯',
      win:'7',//胜
      flat:'5',//平
      negative:'0',//负
      points:'26',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/693af0d277fe3179594695614dce8666.png',
      teamName:'摩纳哥',
      win:'7',//胜
      flat:'3',//平
      negative:'2',//负
      points:'24',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/3b720f181ce9993f9422d276acf7b292.png',
      teamName:'巴黎圣日耳曼',
      win:'8',//胜
      flat:'3',//平
      negative:'1',//负
      points:'27',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/ff8991853f7aabce7cb66f09cda0c58e.png',
      teamName:'尼斯',
      win:'7',//胜
      flat:'5',//平
      negative:'0',//负
      points:'26',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/693af0d277fe3179594695614dce8666.png',
      teamName:'摩纳哥',
      win:'7',//胜
      flat:'3',//平
      negative:'2',//负
      points:'24',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/3b720f181ce9993f9422d276acf7b292.png',
      teamName:'巴黎圣日耳曼',
      win:'8',//胜
      flat:'3',//平
      negative:'1',//负
      points:'27',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/ff8991853f7aabce7cb66f09cda0c58e.png',
      teamName:'尼斯',
      win:'7',//胜
      flat:'5',//平
      negative:'0',//负
      points:'26',//积分
    },
    {
      img:'https://cdn.sportnanoapi.com/football/team/693af0d277fe3179594695614dce8666.png',
      teamName:'摩纳哥',
      win:'7',//胜
      flat:'3',//平
      negative:'2',//负
      points:'24',//积分
    },
  ])
</script>

<style lang="scss" scoped>
  .recompetition-box{
    display: flex;
    justify-content: space-between;
    .recompetition-left{
      width: 840px;
      // background-color: aqua;
      .grid-header{
        display: flex;
        justify-content: space-between;
        .grid-header-left{
          display: flex;
          // width: 100%;
          height: 100%;
          .grid-header-img{
            width: 22px;
            height: 24px;
            margin: 8px 8px 0 0;
            -o-object-fit: contain;
            object-fit: contain;
          }
          .grid-header-left-text{
            color: #727272;
            font-size: 22px;
            height: 100%;
            line-height: 40px;
          }
          .grid-header-left-text:hover{
            color: #ff8b00;
          }
          .grid-header-left-nav{
            margin-left: 20px;
            .el-button {
              height: 18px;
              font-size: 12px;
            }
            .el-button:hover {//滑过按钮颜色
              color: #000;
              background-color: #fff;
            }
            .el-button.primary {//选中按钮颜色
              background-color: #ff8b00 !important;
              color: white !important;
            }
            .el-button.default {//未选中按钮颜色
              background-color: white !important;
              color: black !important;
            }
          }
        }
        .grid-header-right {
          height: 100%;
          .grid-header-right-text{
            line-height: 40px;
            font-size: 12px;
            color: #ff8b00;
            margin-right: 5px;
          }
        }
      }
      //比赛内容列表
      .competition-content{
        width: 100%;
        // height: 100%;
        .competition-list{
          width: 100%;
          border-radius: 20px;
          .competition-title{
            display: flex;
            width: 100%;
            height: 40px;
            background-color: #f5f6fa;
            border-radius: 5px 5px 0 0;
            .competition-left{
              width: 85%;
              display: flex;
              margin-left: 380px;
              .competition-img{
                display: block;
                width: 20px;
                height: 20px;
                margin-top: 10px;
                margin-right: 5px;
              }
              .competition-bszt{
                font-size: 16px;
                line-height: 40px;
              }
            }
            .competition-right{
              width: 15%;
              font-size: 14px;
              line-height: 40px;
              color: #737475;
            }
          }
          .competition-session{
            display: flex;
            justify-content: space-between;
            width: 100%;
            min-height: 40px;
            background-color:#f0f0f0;
            border-radius: 0 0 5px 5px;
            // padding: 5px 18px 4px 16px;
            .session-left{
              display: flex;
              justify-content: space-between;
              margin-left: 16px;
              height: 100%;
              .session-time{
                margin-right: 30px;
              }
            }
            .session-middle{
              display: flex;
              .middle-left{
                display: flex;
                justify-content: space-between;
                .middle-left-text{
                  font-size: 12px;
                  margin-right: 10px;
                  line-height: 6vh;//40px
                }
                .middle-left-img{
                  display: block;
                  width: 18px;
                  height: 18px;
                  margin-top: 2vh;//10px
                  margin-right: 10px;
                }
                .middle-left-figure{
                  font-size: 14px;
                  line-height: 6vh;
                  margin-right: 5px;
                }
              }
              .middle-zj{
                margin-right: 5px;
                line-height: 6vh;
              }
              .middle-right{
                display: flex;
                justify-content: space-between;
                .middle-right-figure{
                  font-size: 14px;
                  line-height: 6vh;
                  margin-right: 5px;
                }
                .middle-right-img{
                  display: block;
                  width: 18px;
                  height: 18px;
                  margin-top: 2vh;//10px
                  margin-right: 10px;
                }
                .middle-right-text{
                  font-size: 12px;
                  line-height: 6vh;
                  margin-right: 10px;
                }
              }
            }
            .session-right{
              display: flex;
              .session-right-img{
                display: block;
                width: 20px;
                height: 20px;
                margin-top: 2vh;
                margin-right: 5px;
              }
              .session-right-tetx{
                font-size: 14px;
                line-height: 6vh;
                margin-right: 10px;
                color: #ff8b00;
              }
            }
          }
        }
      }
    }
    // 积分排行
    .recompetition-right{
      width: 336px;
      // height: 821.57px;
      .points-head{
        display: flex;
        margin-bottom: 14px;
        .points-img{
          display: block;
          width: 22px;
          height: 24px;
          margin: 0 8px 0 0;
          -o-object-fit: contain;
          object-fit: contain;
        }
        .points-text{
          color: #727272;
          font-size: 22px;
        }
      }
      .points-tabs{
        // height: 100%;
        border-radius: 5px;
        // 标签页样式
        .tab-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          box-shadow: 0 1px 0 0 #d9af6b;
          .tab {
            padding: 10px 14.3px;
            font-size: 16px;
            background-color: white;
            color: #333;
            cursor: pointer;
            transition: all 0.3s ease;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }

          .tab.active {
            background-color: #ff8b00;
            color: white;
          }

          .tab:not(.active):hover {
            color: #ff8b00;
          }
        }
        
        .content {
          height: 54vh;
          // border: 1px solid #ccc;
          // border-top: none;
          overflow-y: auto;
          padding: 0 16px 25px 16px;
          background-color: #f0f0f0;
          .rank-content-info-title {
            padding-top: 4px;
            font-size: 12px;
            letter-spacing: .16px;
            color: #818181;
            display: flex;
            height: 36px;
            width: 100%;
            align-items: center;
            border-bottom: 1px solid #959595;
          }
          .rank-content-info-item{
            display: flex;
            align-items: center;
            // border-bottom: 1px solid #f2f2f2;
            width: 100%;
            height: 42px;
            font-size: 16px;
            border-bottom: 1px solid #959595;
            .ank-content-left{
              width: 16px;
              height: 16px; 
              font-weight: 700; 
              font-size: 12px; 
              line-height: 16px; 
              color: #fff; 
              border-radius: 1.5px; 
              background-color: #ff8b00; text-align: center;
            }
            .rank-team-img{
              display: block;
              margin-right: 8px;
              border-radius: 50%;
              overflow: hidden;
              width: 18px;
              height: 18px;
            }
            .rank-team-name{
              font-size: 14px;
            }
          }
        }

      }
    }    
  }
</style>