// 处理统一的token
import axios from 'axios'

const MyPlugin = {};
MyPlugin.install = function (Vue) {
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    // axios请求拦截器
    axios.interceptors.request.use(function (config) {
        // console.log(config);
        // 判断 当请求标识不是login的时候不设置请求头
        if(config.url !=='/login') {
            const AUTH_TOKEN = localStorage.getItem("token");
            // console.log(AUTH_TOKEN);
            // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            config.headers['Authorization'] = AUTH_TOKEN
        }
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    Vue.prototype.$http = axios;
};
export default MyPlugin;


