

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
import Drag from "vue-material-design-icons/Drag.vue"
import ChevronLeftCircleOutline from "vue-material-design-icons/ChevronLeftCircleOutline.vue"
import ChevronRightCircleOutline from "vue-material-design-icons/ChevronRightCircleOutline.vue"
import ArrowUpCircleOutline from "vue-material-design-icons/ArrowUpCircleOutline"
import ArrowDownCircleOutline from "vue-material-design-icons/ArrowDownCircleOutline"
import HomeMapMarker from "vue-material-design-icons/HomeMapMarker"
import TimerSand from "vue-material-design-icons/TimerSand"
import FormatListChecks from "vue-material-design-icons/FormatListChecks"
import ArrowUpCircle from "vue-material-design-icons/ArrowUpCircle"
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import "vue-material-design-icons/styles.css"

library.add(faCoffee, faEllipsisV)
 
Vue.component("drag-icon", Drag)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('chevron-left-circle-outline', ChevronLeftCircleOutline)
Vue.component('chevron-right-circle-outline', ChevronRightCircleOutline)
Vue.component('arrow-up-circle-outline', ArrowUpCircleOutline)
Vue.component('arrow-down-circle-outline', ArrowDownCircleOutline)
Vue.component('home-map-marker', HomeMapMarker)
Vue.component('timer-sand', TimerSand)
Vue.component('format-list-checks', FormatListChecks)
Vue.component('arrow-up-circle', ArrowUpCircle)
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
