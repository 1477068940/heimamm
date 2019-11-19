import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

// 导入路由
import router from './router/router.js';

// 导入饿了吗UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use (ElementUI);

// 创建Vue实例并挂载app的div上
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
