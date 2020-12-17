<template>
  <div class="layout">
    <router-view />
    <van-tabbar route v-model="active">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="edit">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
