// 用户请求模块
import request from '@/utils/request'

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
