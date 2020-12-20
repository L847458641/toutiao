<template>
  <div class="resulits">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in 90" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: "results",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      this.loading = false;
      this.finished = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.resulits {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
