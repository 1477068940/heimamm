// 导入Vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';

// 注册路由
Vue.use(VueRouter);

// 导入 登录页面组件
import login from '../views/login/login.vue';
// 导入 首页页面组件
import index from '../views/index/index.vue'

// 创建路由规则
const routes = [
    // 登录组件规则
    {path:'/login',component:login},
    // 首页组件规则
    {path:'/index',component:index}
];

// 创建路由对象
const router = new VueRouter({
    routes
});

// 挂载到Vue实例上
// 暴露出去
// 类似于 module.exports = routera
export default router;