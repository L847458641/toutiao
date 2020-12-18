<template>
  <div class="login">
    <van-nav-bar
    class="app-nav-bar"
      title="注册 / 登录"
    />
    <van-form @submit="onLogin" :show-error="false" :show-error-message="false" @failed="onFailed" ref="loginForm">
      <van-field
       v-model="user.mobile"
        left-icon="icon iconfont iconshouji"
        clearable
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
          <van-count-down v-if="isShou" :time="time" format="ss s" @finish = "isShou = false"/>
          <van-button type="primary" v-else size="small" round @click.prevent="onSend" :loading="isBtn">获取验证码</van-button>
        </template>
      </van-field>
    <div class="loginBtn">
       <van-button type="info" block>登录</van-button>
    </div>
    </van-form>
    <van-divider
  :style="{ color: '#b9b8b8', borderColor: '#b9b8b8', padding: '0 16px' }"
    >
  点击注册
</van-divider>
  </div>
</template>

<script>
import { login, onSend } from '@/api/user'
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
      },
      // 倒计时
      time: 35 * 1000,
      // 控制按钮的显示
      isShou: false,
      // 控制按钮的状态
      isBtn: false
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
        this.$toast.success('登录成功')
        // 将后端返回的数据放到vueX中
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'home' })
      } catch (err) {
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
    },
    async onSend () {
      // 1.验证手机号
      try {
      // 获取表单实例（要给表单加ref）
        await this.$refs.loginForm.validate('mobile')
        // 改变btn的状态
        this.isBtn = false
        // 验证通过->请求发送验证码
        await onSend(this.user.mobile)
        // 短信发送成功，显示倒计时
        this.isShou = true
      } catch (err) {
        let message = ''
        // 发送短信失败的错误提示
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 其他错误
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
      // 改变btn的状态，防止用户多次点击
      this.isBtn = false
      // 2.验证通过->请求发送验证码->用户接收短信->输入验证码->请求登录
      // 3.请求发送验证码->隐藏发送按钮，显示倒计时
      // 4.倒计时结束->隐藏倒计时->显示发送按钮
    }
  }
}
</script>

<style lang="scss" scoped>
.code{
  /deep/ .van-field__left-icon,.van-count-down {
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
