

require('./bootstrap');

import Vue from 'vue'
import App from './components/App'
import router from '../js/components/router/index'
import store from '../js/components/store/index'

 const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
