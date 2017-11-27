import Vue from 'vue'
import VueRouter from 'vue-router'

import Add from './addApp'
import List from './listApp'
import head from '../../../components/HbHead'

const routes = [
    { path: '/', component: Add },
    { path: '/list', component: List },
    { path: '/head', component: head }
]

Vue.use(VueRouter)

const router = new VueRouter({
    routes: routes
})


new Vue({
    router: router
}).$mount('#app')