<template>
  <div class="channels">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多数据了！"
      @load="onLoad"
    >
      <van-button size="small" round icon="back-top"></van-button>
      <van-cell
        class="vanCell"
        v-for="(contentItem, index) in content"
        :key="index"
        :title="contentItem.title"
      />
    </van-list>
  </div>
</template>

<script>
import { onLoadGetContent } from "../api/user";
export default {
  name: "channels",
  props: {
    item: {
      type: Object, // 类型:对象
      required: true, // 是否必须
    },
  },
  // props: ['item'],不建议这样写
  data() {
    return {
      loading: false,
      finished: false,
      content: [],
      timestamp: null, // 获取下一页的时间戳
    };
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 获取接口数据
      const { data } = await onLoadGetContent({
        channel_id: this.item.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 时间戳
        with_top: 1, // 是否置顶
      });
      // 将数组合并-方法一：concat，方法二：...str
      this.content.push(...data.data.results);
      // console.log(this.content);
      // 加载结束
      this.loading = false;
      // 如果还有数据
      if (this.content.length) {
        // 获取下一页数据
        this.timestamp = data.data.pre_timestamp;
      } else {
        // 加载状态结束，不再触发加载更多
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.channels {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
  .van-button {
    position: fixed;
    bottom: 80px;
    z-index: 999;
    right: 20px;
    background-color: skyblue;
    opacity: 0.6;
  }
}
</style>
