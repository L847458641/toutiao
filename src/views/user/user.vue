<template>
  <div class="user">
    <van-cell-group>
      <van-cell center :border='false'>
        <van-image
        class="avatar"
        slot="icon"
         round
         fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
       />
       <div class="username" slot="title">昵称</div>
       <van-button class="editBtn" round size="mini">编辑资料</van-button>
      </van-cell>
      <van-grid class="grides" :border='false'>
        <van-grid-item text="头条" ><span slot="icon">1234</span></van-grid-item>
        <van-grid-item text="关注" ><span slot="icon">12</span></van-grid-item>
        <van-grid-item text="粉丝" ><span slot="icon">20</span></van-grid-item>
        <van-grid-item text="获赞" ><span slot="icon">34</span></van-grid-item>
      </van-grid>
    </van-cell-group>

    <van-grid class="iconList" clickable :column-num="2">
      <van-grid-item icon="star-o" text="收藏" to="/" />
      <van-grid-item icon="underway-o" text="历史" url="/vant/mobile.html" />
    </van-grid>
      <van-cell title="消息通知" is-link to="" />
      <van-cell title="小伟同学" is-link to="" />
      <van-cell class="back" title="退出登录" to="" />
  </div>
</template>

<script>
export default {
  name: 'user'
}
</script>

<style lang="scss" scoped>
.user{
  /deep/ .van-cell-group{
  background: url('../../assets/banner.png') no-repeat;
  background-size: cover;
  padding: 38px 0 11px 0;
  /deep/ .van-cell{
    height: 115px;
    background-color: unset;
  }
  /deep/ .van-grid-item__content{
    background-color: unset;
  }
  }
  .avatar{
    width: 66px;
    height: 66px;
    border: 1px solid #fff;
  }
.username{
  padding-left: 20px;
  color: #fff;
  font-size: 18px;
}
.back{
  /deep/ .van-cell__title{
    text-align: center;
    font-size: 18px;
    color: #d86262;
}
}
.grides{
  span{
    font-size: 18px;
    color: rgb(224, 223, 223);
  }
}
/deep/ .iconList{
.van-icon-star-o{
  color: #eb5253;
}
.van-icon-underway-o{
  color: #ff9d1d;
}
}
}
</style>
