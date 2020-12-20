<template>
  <div class="history">
    <van-cell title="历史记录">
      <template v-if="isdelete" #right-icon>
        <van-icon name="delete" class="delete" @click="deleteBtn" />
      </template>
      <div v-else class="allDle" @click="allDeleteBtn">全部删除</div>
    </van-cell>
    <van-cell title="搜索历史"
      ><template v-if="isBtnClose" #right-icon>
        <van-icon name="close" class="close" /> </template
    ></van-cell>
  </div>
</template>

<script>
export default {
  name: "history",
  data() {
    return {
      isdelete: true,
      isBtnClose: false,
    };
  },
  methods: {
    deleteBtn() {
      this.isdelete = !this.isdelete;
      this.isBtnClose = !this.isBtnClose;
    },
    allDeleteBtn() {
      this.$dialog
        .confirm({
          title: "删除全部历史记录!",
          message: "是否全部删除！",
        })
        .then(() => {
          this.deleteBtn();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.history {
  /deep/ .delete,
  .close {
    line-height: 24px;
  }
}
</style>
