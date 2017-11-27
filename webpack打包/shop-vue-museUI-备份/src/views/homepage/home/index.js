import Vue from 'vue'
import App from './indexApp'
// import 'muse-components/styles/base.less' // 加载基础的样式
// import Button from 'mint-ui/lib/button';
// import 'mint-ui/lib/button/style.css';
// import { Swipe, SwipeItem } from 'mint-ui';

// Vue.component(Swipe.name, Swipe);

// import Swipe from 'mint-ui/lib/swipe';
// import SwipeItem from 'mint-ui/lib/swipe-item';

// import paper from 'muse-components/paper';
// Vue.component(paper.name, paper);
// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'
// Vue.use(MuseUI)
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
new Vue({
    render: h => h(App)
}).$mount('#app')