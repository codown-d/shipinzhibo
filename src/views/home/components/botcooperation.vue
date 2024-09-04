<template>
  <div class="main-page-box">
    <div class="main-one">
      <h3 class="main-one-title">合作网站</h3>
      <div class="main-one-list">
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
        <a href="" class="main-one-a">英超联赛</a>
      </div>
    </div>
    <div class="main-two">
      <h3 class="main-two-title">主播帮助</h3>
      <div class="main-two-list">
        <a href="" class="main-two-a">开播教程</a>
        <a href="" class="main-two-a">直播工具下载</a>
        <a href="" class="main-two-a">直播规范</a>
        <a href="" class="main-two-a">直播常见问题</a>
        <a href="" class="main-two-a">直播协议</a>
      </div>
    </div>
    <div class="main-three">
      <h3 class="main-three-title">APP下载</h3>
      <div class="main-three-imgList">
        <img class="main-three-img" src="http://cdn.img.mhuan.shop/FuUBr-dWV5uT2Y0axeccSY92yBF-.jpg" alt="">
        <img class="main-three-img" src="http://cdn.img.mhuan.shop/FuUBr-dWV5uT2Y0axeccSY92yBF-.jpg" alt="">
      </div>
    </div>
    <div class="main-four">
      <h3 class="main-four-title">联系我们</h3>
      <div class="main-four-list">
        <span class="main-four-text">申请主播：00000000000</span>
        <span class="main-four-text">问题反馈：00000000000</span>
        <span class="main-four-text">在线客服</span>
      </div>
    </div>
  </div>
  <!-- 关于我们 -->
  <span class="main-page-top">
    <div class="main-page-tetxLeft">语言：中文</div>
    <a href="" class="main-page-tetx">关于我们</a>
    <a href="" class="main-page-tetx">用户协议</a>
    <a href="" class="main-page-tetx">平台规则</a>
    <a href="" class="main-page-tetx">隐私政策</a>
    <a href="" class="main-page-tetx">我要直播</a>
    <a href="" class="main-page-tetx">合作联系</a>
  </span>
  <span class="main-page-bot">
    Copyright&nbsp;&nbsp;©&nbsp;&nbsp;2024&nbsp;&nbsp;XXXX&nbsp;&nbsp;版权所有.&nbsp;All&nbsp;&nbsp;rights&nbsp;&nbsp;Reserved
  </span>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .main-page-box{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .main-one{
      // margin-right: 40px;
      .main-one-title{
        font-size: 16px;
        color: #000;
        letter-spacing: 0;
        text-align: left;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .main-one-title:before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 14px;
        border-radius: 1.5px;
        background-color: #ff8b00;
        margin-right: 8px;
      }
      .main-one-list{
        display: grid;
        grid-template-columns: repeat(4, 88px);
        grid-gap: 5px;
        justify-content: center;
        .main-one-a{
          width: 88px;
          color: #919191;
          text-align: left;
          margin-bottom: 8px;
          text-decoration: none;
          font-size: 12px;
        }
        .main-one-a:hover{
          color: #ff8b00;
        }
      }
    }
    .main-two{
      .main-two-title{
        font-size: 16px;
        color: #000;
        letter-spacing: 0;
        text-align: left;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .main-two-title:before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 14px;
        border-radius: 1.5px;
        background-color: #ff8b00;
        margin-right: 8px;
      }
      .main-two-list{
        display: grid;
        grid-template-columns: repeat(2, 88px);
        grid-gap: 5px;
        justify-content: center;
        .main-two-a{
          width: 88px;
          text-decoration: none;
          color: #919191;
          text-align: left;
          margin-bottom: 8px;
          font-size: 12px;
        }
        .main-two-a:hover{
          color: #ff8b00;
        }
      }
    }
    .main-three{
      .main-three-title{
        font-size: 16px;
        color: #000;
        letter-spacing: 0;
        text-align: left;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .main-three-title:before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 14px;
        border-radius: 1.5px;
        background-color: #ff8b00;
        margin-right: 8px;
      }
      .main-three-imgList{
        width: 200px;
        display: flex;
        justify-content: space-between;
        .main-three-img{
          display: block;
          width: 95px;
          height: 95px;
        }
      }
    }
    .main-four{
      .main-four-title{
        font-size: 16px;
        color: #000;
        letter-spacing: 0;
        text-align: left;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .main-four-title:before {
        content: "";
        display: inline-block;
        width: 2px;
        height: 14px;
        border-radius: 1.5px;
        background-color: #ff8b00;
        margin-right: 8px;
      }
      .main-four-list{
        .main-four-text{
          color: #919191;
          text-align: left;
          margin-bottom: 8px;
          font-size: 12px;
          display: block;
        }
        .main-four-text:hover{
          color: #ff8b00;
        }
      }
    }
  }
  .main-page-top{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    .main-page-tetxLeft{
      font-size: 12px;
      margin-right: 10px;
    }
    .main-page-tetx{
      text-decoration: none;
      font-size: 12px;
      color: #919191;
      margin-right: 10px;
    }
    .main-page-tetx:hover{
      color: #ff8b00;
    }
  }
  .main-page-bot{
    display: flex;
    justify-content: center;
    color: #919191;
    font-size: 12px;
  }
</style>