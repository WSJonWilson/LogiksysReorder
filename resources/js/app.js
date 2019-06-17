

require('./bootstrap');

import Vue from 'vue'
import App from './components/App'
import router from '../js/components/router/index'
import store from '../js/components/store/index'
import ElementUI from 'element-ui';
import BackToTop from 'vue-backtotop'
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.use(BackToTop)
Vue.use(BootstrapVue)
Vue.use(ElementUI);

 const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
