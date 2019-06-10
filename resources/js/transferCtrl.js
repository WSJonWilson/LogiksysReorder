

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Vue from 'vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';




// Vue.prototype.$userId = document.querySelector("meta[name='index']").getAttribute('content');

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import draggable from 'vuedraggable'
import locale from 'element-ui/lib/locale/lang/en';
import axios from 'axios';
import { scrypt } from 'crypto';


Vue.use();

const app = new Vue({
  el: '#transferCtrl',

  components: {
    draggable,
},

  data() {
    return {
      data: [],
      loading: false,
            value: [1 , 4]

    }
  },
  methods: {

      getRequest(){

        this.loading = true;
        axios.get('http://127.0.0.1:8000/customer')
        .then((response) => {
          this.data = response.data
          console.log(response.data)

        }).catch((error) => console.log(error))
      }
  

  },
  created: function () {
    this.getRequest();
 console.log('hi')
},
})

