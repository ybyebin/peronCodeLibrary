import Vue from 'vue'
import App from './mainApp'
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
new Vue({
    render: h => h(App)
}).$mount('#app')