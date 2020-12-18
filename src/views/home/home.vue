<template>
  <div class="home">
    <van-nav-bar class="app-nav-bar">
      <van-button slot="title" round type="info" icon="search" size="small"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" color=" #3296fa">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id"
        ><c-hannels :item = "item"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { onLoadGet } from "../../api/user";
import CHannels from "@/components/channels";
export default {
  components: {
    CHannels,
  },
  name: "home",
  data() {
    return {
      active: 0, // 索引值
      channels: [], // 频道列表
    };
  },
  created() {
    this.loadGet();
  },
  methods: {
    async loadGet() {
      // 获取频道数据
      const { data } = await onLoadGet();
      this.channels = data.data.channels;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .app-nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: none;
      /deep/ .van-button {
        width: 300px;
        background-color: #53a7ff;
      }
    }
  }
}
</style>
