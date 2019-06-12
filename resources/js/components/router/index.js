import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Reorder from '../../components/Reorder.vue'

export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: Reorder
             
        }
    ]
})