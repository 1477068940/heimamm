// 导入 axios
import axios from 'axios';

// 统一设置 基地址
axios.defaults.baseURL = 'http://183.237.67.218:3002';

// 统一设置 跨域携带cookie
axios.defaults.withCredentials = true;

// 暴露出去 有名字的暴露 名字一般和接口地址一样
export function login(data){
    return axios({
        url:"/login",
        method:'post',
        data
    })
}

// 暴露出去的 注册方法
export function register(data){
    return axios({
        url:"/register",
        method:'post',
        data
    })
}

// 暴露出的的 获取短信验证码的方法
export function sendsms(data){
    return axios({
        url:"/sendsms",
        method:'post',
        data
    })
}
