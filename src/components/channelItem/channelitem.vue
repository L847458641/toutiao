<template>
  <div class="channlitem">
    <van-cell>
      <div slot="title" class="title van-multi-ellipsis--l3">
        {{ channlitem.title }}
      </div>
      <div slot="label">
        <div class="imagesBox" v-if="channlitem.cover.type === 3">
          <div
            class="imagesitem"
            v-for="(img, index) in channlitem.cover.images"
            :key="index"
          >
            <van-image
              class="sanImge van-hairline--surround"
              fit="cover"
              :src="img"
            />
          </div>
        </div>
        <span>{{ channlitem.aut_name }}</span>
        <span>{{ channlitem.comm_count }}评论</span>
        <span>{{ channlitem.pubdate | relativeTime }}</span>
      </div>
      <!-- 默认插槽default可以省略不写 -->
      <!-- 三种情况 0,1,3-->
      <van-image
        class="rightImg"
        v-if="channlitem.cover.type === 1"
        fit="contain"
        :src="channlitem.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "channlitem",
  props: {
    channlitem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.channlitem {
  border-bottom: 1px solid #dfe0e4;
  .title {
    font-size: 16px;
    color: #3a3a3a;
    font-weight: bolder;
  }
  .imagesBox {
    display: flex;
    .imagesitem {
      flex: 1;
      height: 73px;
      .sanImge {
        width: 100%;
        height: 73px;
      }
    }
  }
  /deep/ .van-cell__value {
    width: 116px;
    height: 73px;
    flex: unset;
    margin-left: 10px;
  }
  span {
    display: inline-block;
    margin-top: 5px;
    margin-right: 12px;
    letter-spacing: 1px;
  }
  .rightImg {
    width: 116px;
    height: 73px;
  }
}
</style>
