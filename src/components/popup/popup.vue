<template>
  <div class="popupbox">
    <van-cell :border="false">
      <div slot="title">我的频道</div>
      <van-button
        plain
        :type="isShowClear ? 'danger' : 'info'"
        size="mini"
        round
        @click="edit"
      >
        {{ isShowClear ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        :icon="isShowClear && index !== 0 ? 'clear' : ''"
        v-for="(userchannelsitem, index) in userchannels"
        :key="index"
        :text="userchannelsitem.name"
        @click="del(userchannelsitem, index)"
        :class="{ active: index === active }"
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
        @click="add(tuiPopupitem)"
      />
    </van-grid>
  </div>
</template>

<script>
import { onAllLoadGet, onPostchannels, delPostchannels } from "../../api/user";
import { setItem } from '@/utils/store'
export default {
  name: "popup",
  props: {
    userchannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allPopup: [],
      isShowClear: false, // 控制编辑显示
      user: localStorage.getItem("user"),
    };
  },
  // 计算属性
  computed: {
    // 第一种方法
    funtuiPopup() {
      // 使用过滤获取剩余频道
      return this.allPopup.filter((channels) => {
        // 判断channels是否属于用户频道
        return !this.userchannels.find((userchannels) => {
          return userchannels.id === channels.id;
        });
      });
    },

    // 第二种方法
    // funtuiPopup() {
    //   const arr = [];
    //   this.allPopup.forEach((channels) => {
    //     for (let i = 0; i < this.userchannels.length; i++) {
    //       if (this.userchannels[i].id !== channels.id) {
    //         arr.push(channels);
    //         break;
    //       }
    //     }
    //   });
    //   return arr;
    // },
  },
  created() {
    this.onAllGet();
  },
  methods: {
    async onAllGet() {
      const { data } = await onAllLoadGet();
      this.allPopup = data.data.channels;
    },
    async add(tuiPopupitem) {
      try {
        this.userchannels.push(tuiPopupitem);
        if (this.user) {
          // 登录了，数组存储到线上
          await onPostchannels({
            channels: [{ id: tuiPopupitem.id, seq: this.userchannels.length }],
          });
          this.$toast("添加频道成功");
        } else {
          // 没有登录，数组存储到本地
          setItem("user-channels", this.userchannels);
        }
      } catch (err) {
        console.log(err);
        this.$toast("添加频道失败");
      }
    },
    edit() {
      this.isShowClear = !this.isShowClear;
    },
    del(userchannelsitem, index) {
      if (this.isShowClear && index !== 0) {
        // 编辑状态并且索引不为0，保留第一个频道
        // 编辑状态,删除频道
        this.deleteClick(userchannelsitem, index);
      } else {
        // 非编辑状态，切换频道
        this.switchClick(index);
      }
    },
    async deleteClick(userchannelsitem, index) {
      // 删除第index个位置的索引开始删除一个(包括索引本身)
      this.userchannels.splice(index, 1);
      // 如果删除的是当前激活的频道之前的频道,那么active应该是当前active-1
      if (index <= this.active) {
        this.$emit("updateActive", this.active - 1);
      }

      try {
        // 数据持久化
        if (this.user) {
          await delPostchannels(userchannelsitem.id);
        } else {
          // 没有登录，数组存储到本地
          setItem("user-channels", this.userchannels);
        }
      } catch (err) {
        console.log(err);
        this.$toast("删除频道失败，请稍后重试");
      }
    },
    switchClick(index) {
      // 子传父,，切换频道
      this.$emit("updateActive", index);
      // 子传父,关闭弹窗
      this.$emit("close");
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
    // &.van-grid-item__content:nth-of-type(1){
    //     background-color: red;
    // }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
  /deep/ .van-grid-item__icon {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 20px !important;
    color: #ccc !important;
    z-index: 999;
  }

  .active {
    /deep/ .van-grid-item__text {
      color: red;
    }
  }
}
</style>
