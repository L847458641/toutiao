// 用户请求模块
import request from '@/utils/request'
import store from '@/store/'

// 登录/注册
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

// 我的频道列表请求获取接口
export const onLoadGet = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 所有频道列表请求获取接口
export const onAllLoadGet = () => {
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

// 添加频道请求获取接口
export const onPostchannels = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
    data
  })
}
// 删除频道请求获取接口
export const delPostchannels = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`,
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    },
  })
}
