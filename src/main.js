import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import moment from 'moment'
import '@/assets/css/base.css'
import cusBread from '@/components/cusBread.vue'
import MyPlugin from '@/http.js'
Vue.config.productionTip = false;
Vue.use(MyPlugin); //使用自定义插件 里面设置的请求体token 和axios方法
// 使用ui库
Vue.use(ElementUI);
// 全局过滤器处理时间
Vue.filter('formdata', (v) => {
  return moment(v).format('YYYY-MM-DD');
});
// 面包屑变成全局组件, 第一个参数是组件名字， 第二个参数是组件选项所在对象
Vue.component('cusBread', cusBread)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
