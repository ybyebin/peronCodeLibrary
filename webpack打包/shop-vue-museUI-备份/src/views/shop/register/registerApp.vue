<template>
    <div id="app">
        <section class="sec">
            <div class="head">
                <p>
                    <H1>TMART.com</H1>
                </p>
           
            </div>
 
            <div>
                
                 <mu-text-field label="Name" hintText="Name" type="text" labelFloat/>
                 <mu-text-field label="Email" hintText="Your email address" type="text" labelFloat/>

                 <mu-text-field label="password" hintText="Create a password" type="password" labelFloat/>
                 <mu-text-field label="again" hintText="Password again" type="password" labelFloat/>
            </div>
            <div class="btn-sign-in">
                <mu-raised-button label="CREATE" class="demo-raised-button" primary/>
            </div>
                <p class="miaoshu">By creating an account.you agree to our Conditions of Use ande Privacy Notice.</p>
            <div class="new-to-mart">
                <div></div>
                <span>Already have an account?</span>
            </div>
            <div class="sign">
                   <mu-raised-button label="Sign in now"   fullWidth/>
            </div>
        </section>

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
section {
    /* background: red; */
    width: 100%;
    height: 100%;
    padding: 0 20px !important;
}
    h1{
        color: #0D84CE;
    }
    .sec{
        margin-bottom: 10px;
    }

.head {
    padding-top: 30px;
}

.head p {
    text-align: center;
}

.head p:last-child {
    padding-top: 10px;
}
.miaoshu{
    margin-top: 10px;
}
.sign{
    margin-top: 20px;
}

.mu-text-field {
    width: 100% !important;
}

.demo-raised-button {
    width: 100%;
}




.new-to-mart {
    margin-top: 20px;
    position: relative;
    height: 30px;
    padding-top: 20px;
}

.new-to-mart div {
    height: 1px;
    background: #000;
}

.new-to-mart span {
    position: absolute;
    display: inline-block;
    width: 160px;
    top: 9px;
    background: #fff;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
}

</style>