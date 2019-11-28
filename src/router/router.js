// 导入Vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';

// 导入 Element-ui弹框 Message的方法
import { Message } from "element-ui";

// 导入 获取token的方法
import { getToken } from "../utils/token.js";

// 导入 获取用户信息的逻辑
import { userInfo } from "../api/api.js";

// 导入 仓库
import store from "../store/store.js";

// 重写push方法 屏蔽 重复跳转错误
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
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
    { 
        path: '/login', 
        component: login 
    },
    // 首页组件规则
    {
        path: '/index', 
        component: index, 
        meta: { roles: ['管理员', '老师', '学生'] 
    },
    // 嵌套路由
        children: [
            { 
                path: 'subject', // 匹配的是 /index/subject
                component: subject, 
                meta: { roles: ['管理员', '老师', '学生'] } 
            },
            { 
                path: 'enterprise', // 匹配的是 /index/enterprise
                component: enterprise, 
                meta: { roles: ['管理员', '老师'] } 
            },
            { 
                path: 'dataRecord', // 匹配的是 /index/dataRecord
                component: dataRecord, 
                meta: { roles: ['管理员', '老师'] } 
            },
            { 
                path: 'userList', // 匹配的是 /index/userList
                component: userList, 
                meta: { roles: ['管理员'] } 
            },
            { 
                path: 'questionList', // 匹配的是 /index/questionList
                component: questionList, 
                meta: { roles: ['管理员', '老师'] } 
            },
        ]
    }
];

// 创建路由对象
const router = new VueRouter({
    routes
});

// 定义白名单(不登录也可以访问)  后续直接使用性能好一些
const whitePaths = ["/login"];
// 导航守卫 ***
router.beforeEach((to, from, next) => {
    // 判断是否存在 白名单中to.path 路径比如/index /login
    // 白名单 放走
    if (whitePaths.indexOf(to.path) != -1) {
        // 放走
        return next();
    }
    // 到这说明必须登录才可以进去
    // 登录状态 token
    if (getToken()) {
        // token存在
        // 调用接口验证对错   异步操作
        return userInfo().then(res => {
            // 用户信息获取成功 token没有问题
            store.commit("CHANGEINFO", res.data.data);
            // 判断用户状态
            if (res.data.data.status === 0) {
                // 状态为0  说明是禁用状态
                Message.warning("请等待管理员启用你!!");
                return next("/login");
            }
            // 用户启用状态 权限判断
            if(to.meta.roles.indexOf(res.data.data.role) == -1){
                // 不存在 说明 没有权限
                Message.warning("你没有权限访问这个页面");
                return
            }
            // 放走  能执行到这里 是启用状态
            next();
        });
        // return next();
    }
    // 没有登录, 同时没有token
    Message("请先登录!");
    next("/login");
})

// 挂载到Vue实例上
// 暴露出去
// 类似于 module.exports = routera
export default router;