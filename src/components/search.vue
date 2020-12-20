<template>
  <div class="searchBox">
    <!-- 搜索栏 -->
    <van-search
      v-model="searchValue"
      shape="round"
      background=" #53a7ff"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      @focus="getFocus"
    />

    <!--搜索结果 -->
    <r-esults v-if="isShowRes" />

    <!-- 模糊搜索 -->
    <search-prompt v-else-if="searchValue" />

    <!--历史记录 -->
    <h-istory v-else />
  </div>
</template>

<script>
import SearchPrompt from "../components/search/searchprompt";
import HIstory from "../components/search/history";
import REsults from "../components/search/results";
export default {
  name: "search",
  components: {
    SearchPrompt,
    HIstory,
    REsults,
  },
  data() {
    return {
      searchValue: "",
      isShowRes: false, // 控制搜索结果显示
    };
  },
  created() {},
  methods: {
    onSearch() {
      this.isShowRes = true;
    },
    onCancel() {
      this.$router.back();
    },
    getFocus() {
      this.isShowRes = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBox {
  /deep/ .van-search__action {
    background-color: #53a7ff;
    border-radius: 5px;
    color: white;
  }
}
</style>
