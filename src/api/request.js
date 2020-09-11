import Axios from 'axios'
import config from './config'
import {Message} from "element-ui"
class HttpRequest {
    handleAuthorization(instance) {
        instance.interceptors.request.use(config => {
            config.headers.sid = localStorage.getItem("sid")
            config.headers.token = localStorage.getItem("token")
            return config
        }, error => {
            return Promise.reject(error)
        })
    }

    handleResponse(instance) {
        // 响应拦截
        instance.interceptors.response.use(res => {
            return res.data
        }, error => {
            error.msg ?
                Message.error(`服务器错误：${error.response.status}.${error.response.data.msg}`) :
                Message.error(`sevice err`);
            throw error;
        })
    }

    interceptors(instance) {
        this.handleAuthorization(instance);
        this.handleResponse(instance);
    }

    create(options) {
        options = Object.assign(config, options);
        const instance = Axios.create()
        this.interceptors(instance);
        return instance(options)
    }

}

export default new HttpRequest();