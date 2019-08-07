import axios from 'axios'
import store from '@/store'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = `Bearer ${store.getUser().token}`
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    // 对响应数据做点什么
    return res
  },
  err => {
    // 对响应错误做点什么
    if (err.response.status === 401) {
      location.hash = '#/login'
    }
    return Promise.reject(err)
  }
)
export default axios
