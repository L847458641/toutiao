<template>
  <div class="login">
    <van-nav-bar
    class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form @submit="onLogin" :show-error="false" :show-error-message="false" @failed="onFailed">
      <van-field
       v-model="user.mobile"
        left-icon="icon iconfont iconshouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
      class="code"
       v-model="user.code"
        clearable
        left-icon="icon iconfont iconyanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      ><template #button>
          <van-button type="primary" size="small" round>获取验证码</van-button>
        </template>
      </van-field>
    <div class="loginBtn">
       <van-button type="info" block>登录</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机格式错误！' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码格式错误！' }]
      }
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登录中...'
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const res = await login(this.user)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
      // 4.处理响应结果
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.code{
  /deep/ .van-field__left-icon {
    line-height: 33px;
  }
}
.loginBtn{
    padding: 26px 16px;
    /deep/ .van-button{
    background-color: #6db4fb;
    border: none;
    /deep/ .van-button__text{
      font-size: 18px;
    }
    }
}
</style>
