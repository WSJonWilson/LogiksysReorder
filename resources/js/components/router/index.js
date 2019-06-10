import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ExampleComponent from '../ExampleComponent.vue'

export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: ExampleComponent 
        }
    ]
})