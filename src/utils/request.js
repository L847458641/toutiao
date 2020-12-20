// 封装请求模块
import axios from 'axios'
// import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器

// request.interceptors.request.use(function (config) {
//   const { user } = store.state
//   // 用户登录了，统一给接口设置tolen
//   if (user) {
//     config.headers.Authorization = `Bearer ${user.token}`
//   }
//   // 处理完一定要返回的数据config
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// 响应拦截器
// 将模块导出去
export default request
