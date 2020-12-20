<template>
  <div class="home">
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        round
        type="info"
        icon="search"
        size="small"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" color=" #3296fa">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id"
        ><c-hannels :item="item" />
      </van-tab>
      <div class="rightBtn" slot="nav-right" @click="listZhang">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <van-popup
      v-model="isShow"
      position="top"
      class="height"
      closeable
      close-icon-position="top-left"
    >
      <p-opup
        :userchannels="channels"
        @close="isShow = false"
        @updateActive="active = $event"
        :active="active"
      />
    </van-popup>
  </div>
</template>

<script>
import { onLoadGet } from "../../api/user";
import CHannels from "@/components/channels";
import POpup from "@/components/popup/popup";
import { mapState } from "vuex";
import { getItem } from "@/utils/store";
export default {
  components: {
    CHannels,
    POpup,
  },
  computed: {
    ...mapState(["user"]),
  },
  name: "home",
  data() {
    return {
      active: 0, // 索引值
      channels: [], // 频道列表
      isShow: false,
    };
  },
  created() {
    this.loadGet();
  },
  methods: {
    async loadGet() {
      let channels = [];
      if (this.user) {
        // 已登录,获取频道数据
        const { data } = await onLoadGet();
        channels = data.data.channels;
      } else {
        // 没有登录，看看是否有本地存储的频道数据
        const locatChannels = getItem("user-channels");
        if (locatChannels) {
          // 没有登录当是由本地存储频道数据
          channels = locatChannels;
        } else {
          // 没有登录,没有本地存储频道数据
          const { data } = await onLoadGet();
          channels = data.data.channels;
        }
      }
      this.channels = channels;
    },
    listZhang() {
      this.isShow = true;
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
  /deep/ .van-tabs {
    width: 345px;
  }
  .height {
    height: 100%;
    /deep/ .van-icon {
      color: #53a7ff;
      font-size: 32px;
      font-weight: bolder;
    }
  }
  .rightBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 44px;
    position: fixed;
    right: 0;
    background-color: #fff;
    /deep/ .van-icon {
      font-size: 28px;
    }
  }
}
</style>
