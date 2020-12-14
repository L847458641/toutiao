<template>
  <div class="user">
    <van-cell-group>
      <van-cell center :border='false'>
        <van-image
        class="avatar"
        slot="icon"
         round
         fit="cover"
        :src="userInfo.photo"
       />
       <div class="username" slot="title">{{userInfo.name}}</div>
       <van-button class="editBtn" round size="mini">编辑资料</van-button>
      </van-cell>
      <van-grid class="grides" :border='false'>
        <van-grid-item text="头条" ><span slot="icon">{{userInfo.art_count}}</span></van-grid-item>
        <van-grid-item text="关注" ><span slot="icon">{{userInfo.follow_count}}</span></van-grid-item>
        <van-grid-item text="粉丝" ><span slot="icon">{{userInfo.fans_count}}</span></van-grid-item>
        <van-grid-item text="获赞" ><span slot="icon">{{userInfo.like_count}}</span></van-grid-item>
      </van-grid>
    </van-cell-group>

    <van-grid class="iconList" clickable :column-num="2">
      <van-grid-item icon="star-o" text="收藏" to="" />
      <van-grid-item icon="underway-o" text="历史" to="" />
    </van-grid>
      <van-cell title="消息通知" is-link to="" />
      <van-cell title="小伟同学" is-link to="" />
      <van-cell class="back" title="退出登录" to="" @click="backLogin"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUser } from '@/api/user'
export default {
  name: 'user',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadGetUser()
  },
  methods: {
    backLogin () {
      // 提示用户是否确认退出
      // 确认->退出
      // 取消->隐藏弹窗
      this.$dialog.confirm({
        title: '用户退出',
        message: '退出当前账号，将直接返回到登录页面！'
      }).then(() => {
        // 确定退出清除登录状态，删除token
        this.$store.commit('clearToken')
        this.$router.push({ name: 'login' })
      }).catch(() => {
        // oncancel
      })
    },
    async loadGetUser () {
      const res = await getUser()
      this.userInfo = res.data.data
      console.log(this.userInfo)
    }
  }
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
