<template>
  <div class="popupbox">
    <van-cell :border="false">
      <div slot="title">我的频道</div>
      <van-button plain type="info" size="mini" round> 编辑 </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(userchannelsitem, index) in userchannels"
        :key="index"
        :text="userchannelsitem.name"
      />
    </van-grid>
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid direction="horizontal" :gutter="10">
      <van-grid-item
        v-for="(tuiPopupitem, index) in funtuiPopup"
        :key="index"
        :text="tuiPopupitem.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { onAllLoadGet } from "../../api/user";
export default {
  name: "popup",
  props: {
    userchannels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allPopup: [],
    };
  },
  // 计算属性
  computed: {
    // 第一种方法
    // funtuiPopup() {
    //   // 使用过滤获取剩余频道
    //   return this.allPopup.filter((channels) => {
    //     // 判断channels是否属于用户频道
    //     return !this.userchannels.find((userchannels) => {
    //       return userchannels.id === channels.id;
    //     });
    //   });
    // },

    // 第二种方法
    funtuiPopup() {
      const arr = [];
      this.allPopup.forEach((channels) => {
        for (let i = 0; i < this.userchannels.length; i++) {
          if (this.userchannels[i].id !== channels.id) {
            arr.push(channels);
            break;
          }
        }
      });
      return arr;
    },
  },
  created() {
    this.onAllGet();
  },
  methods: {
    async onAllGet() {
      const { data } = await onAllLoadGet();
      this.allPopup = data.data.channels;
    },
  },
};
</script>

<style lang="scss" scoped>
.popupbox {
  margin-top: 54px;
  /deep/ .van-button {
    width: 80px;
  }
  /deep/ .van-grid-item__content {
    background-color: #f3f4f5;
  }
}
</style>
