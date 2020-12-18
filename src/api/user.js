// 用户请求模块
import request from '@/utils/request'
import store from '@/store/'

// 登录注/注册
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送短信验证码请求模块
export const onSend = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 用户资料请求模块
export const getUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

// 频道列表请求获取接口
export const onLoadGet = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 频道内容请求获取接口
export const onLoadGetContent = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
