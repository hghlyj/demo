import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TreeTable from 'vue-table-with-tree-grid'
import axios from 'axios'
axios.defaults.baseURL = "http://121.5.193.127:10000";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";


Vue.prototype.http = axios;

axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

Vue.component('tree-table', TreeTable)
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')