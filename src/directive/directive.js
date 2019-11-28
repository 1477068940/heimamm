// 导入Vue
import Vue from 'vue';

// 导入仓库
import store from "../store/store.js";

// 添加指令
Vue.directive('power',{
    inserted(el,bind){
        window.console.log(el);
        window.console.log(bind);
        window.console.log(store.state.userInfo.role);
        if(bind.value.indexOf(store.state.userInfo.role) == -1){
            // 当前的角色不允许 使用这个功能 
            // 直接移除
            el.parentNode.removeChild(el);
        }
    }
})