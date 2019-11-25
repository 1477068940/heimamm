// 导入Vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';

// 重写push方法 屏蔽 重复跳转错误
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location){
    return originalPush.call(this,location).catch(err=>err)
}

// 注册路由
Vue.use(VueRouter);

// 导入 登录页面组件
import login from '../views/login/login.vue';
// 导入 首页页面组件
import index from '../views/index/index.vue';

// 嵌套路由的组件导入
// 学科
import subject from "../views/index/subject/subject.vue"
// 企业
import enterprise from "../views/index/enterprise/enterprise.vue"
// 数据
import dataRecord from "../views/index/data/data.vue"
// 用户
import userList from "../views/index/user/user.vue"
// 题库
import questionList from "../views/index/question/question.vue"

// 创建路由规则
const routes = [
    // 登录组件规则
    {path:'/login',component:login},
    // 首页组件规则
    {
        path:'/index',component:index,
        children:[
            {path:'subject',component:subject},
            {path:'enterprise',component:enterprise},
            {path:'dataRecord',component:dataRecord},
            {path:'userList',component:userList},
            {path:'questionList',component:questionList},
        ]
    }
];

// 创建路由对象
const router = new VueRouter({
    routes
});

// 挂载到Vue实例上
// 暴露出去
// 类似于 module.exports = routera
export default router;