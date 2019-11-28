// 导入vue
import Vue from "vue"
// 导入vuex
import Vuex from "vuex"
// use 一下
Vue.use(Vuex)
// 创建仓库实例
const store = new Vuex.Store({
    // 数据
    state:{
        // 用户信息
        userInfo:undefined
    },
    // 修改数据的方法
    mutations:{
        // 仓库方法名全部大写
        CHANGEINFO(state,info){
            // 直接保存
            state.userInfo = info;
        }
    }
})
// 暴露出去
export default store;