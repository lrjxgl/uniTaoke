import Vue from 'vue'
import App from './App'
import $app from "./common/common.js";
import pageLoading from "./components/pageloading.vue";
Vue.component("page-loading",pageLoading);
// #ifdef H5
import VueClipboard from  "./common/vue-clipboard-cli.js";
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard);
// #endif 
Vue.prototype.app=$app;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
