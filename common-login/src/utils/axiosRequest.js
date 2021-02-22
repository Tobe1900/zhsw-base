import axios from "axios"
const baseURL = ''
class HttpRequest {
  constructor() {
    this.requestApi = axios.create({
      baseURL,
      timeout: 10 * 1000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // common: {
        //   // 这个token自定义请求头字段，需要再服务端设置相应的字段
        //   'token': ''
        // }
      }
    })

    // 定义请求拦截器
    this.requestApi.interceptors.request.use(config => {
      let token = window.sessionStorage.getItem('token')
      if (token) {
        // config.headers.common['token'] = token
        let url = config.url
        if(url !== '/adminLogin'){
          config.data['token'] = token
        }
      }
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 定义响应拦截器
    this.requestApi.interceptors.response.use(response => {
      if (response.status == 200) {
        return response.data
      }
      return response
    }, error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求';
            break;
          case 401:
            error.message = '未授权，请重新登录';
            break;
          case 403:
            error.message = '拒绝访问';
            break;
          case 404:
            error.message = '请求错误,未找到该资源';
            break;
          case 405:
            error.message = '请求方法未允许';
            break;
          case 408:
            error.message = '请求超时';
            break;
          case 500:
            error.message = '服务器端错误';
            break;
          case 501:
            error.message = '网络未实现';
            break;
          case 502:
            error.message = '网络错误';
            break;
          case 503:
            error.message = '服务不可用';
            break;
          case 504:
            error.message = '网络超时';
            break;
          case 505:
            error.message = 'http版本不支持该请求';
            break;
          default:
            error.message = `连接错误${error.response.status}`;
        }
      } else {
        error.message = '连接服务器失败'
      }
      return Promise.reject(error)
    })
  }

  get(url, params, config = {}) {
    return this.requestApi.get(url, { ...config, params });
  }

  post(url, data, config = {}) {
    return this.requestApi.post(url, { ...data, ...config });
  }

  delete(url, params, config = {}) {
    return this.requestApi.delete(url, { ...config, params })
  }

  put(url, params, config = {}) {
    return this.requestApi.delete(url, params, config)
  }
}

const http = new HttpRequest()

export default http
