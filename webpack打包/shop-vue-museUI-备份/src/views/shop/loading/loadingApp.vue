<template>
    <div id="app">


            <div class="content">

                <p>TMART.com</p>
                    <p>A World of Best Value Products</p>
            </div>



    </div>
</template>
<script>
import Lib from 'assets/js/Lib';

import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 light 主题
Vue.use(MuseUI)
export default {
    data() {
        return {
            value: '1'
        }
    },
    components: {
        // Swipe, SwipeItem
    },
    computed: {


    },
    //已成功挂载，相当ready()
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {

        })
    },
    //相关操作事件
    methods: {
        handleChange(value) {
            this.value = value
        }
    }
}
</script>
<style>
html {
    background: #0099FF;
}



.content {
    text-align: center;
    width: 100%;
    position: fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    color: #fff;
}
.content p:first-child{
    font-size: 1.8rem;
}
.content p:last-child{
    margin-top: 40px;
}
</style>