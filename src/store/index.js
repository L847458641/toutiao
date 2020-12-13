import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/store'

Vue.use(Vuex)

// 更严谨
const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    // 当前用户的登录状态
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (status, data) {
      status.user = data
      setItem(USER_KEY, status.user)
    }
  },
  actions: {},
  modules: {}
})
