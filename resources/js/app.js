

require('./bootstrap');

import Vue from 'vue'
import App from './components/App'
import router from '../js/components/router/index'
import store from '../js/components/store/index'
import ElementUI from 'element-ui';
import BackToTop from 'vue-backtotop'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VModal from 'vue-js-modal'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
library.add(faCoffee, faEllipsisV)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify)
Vue.use(VModal)
Vue.use(BackToTop)
Vue.use(BootstrapVue)
Vue.use(ElementUI);
Vue.use(ClientTable);

 const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
