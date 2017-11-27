<template>
    <div id="app">
        <section>
            <div class="head">
                <p>
                    <strong>TMART.com</strong>
                </p>
                <p>Best Value Products Everyday</p>
            </div>
            <p class="sign-in">
                <strong>Sign in</strong>
            </p>
            <div>
                <mu-text-field label="Email/Phone" />
                <mu-text-field label="Password" />
            </div>
            <div class="btn-sign-in">
                <mu-raised-button label="Sign in" class="demo-raised-button" primary/>
            </div>
            <div class="remeber-my">
                <mu-checkbox label="Keep me signed in" class="demo-checkbox" />
                <a href="">Why?</a>
            </div>
            <div class="new-to-mart">
                <div></div>
                <span>New to TMART.com</span>
            </div>
            <div class="creat-accout">
                <mu-raised-button label="Creat your account and get coupons" class="demo-raised-button" primary/>
            </div>
            <div class="sign-in-with">
                <span>Sign in with</span>
                <!-- <div> -->
                <mu-dropDown-menu :value="value" @change="handleChange" :autoWidth="true" :anchorOrigin="{vertical: 'top', horizontal: 'left'}">
                    <mu-menu-item value="1" title="google" />
                    <mu-menu-item value="2" title="QQ" />
                    <mu-menu-item value="3" title="wechat" />

                </mu-dropDown-menu>
                <!-- </div> -->

            </div>
            <div class="log-with-face" style="">
                
                <button class="mu-raised-button demo-raised-button mu-raised-button-primary mu-raised-button-inverse" type="button" tabindex="0" style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
                    <div class="mu-raised-button-wrapper">
                        <div class="mu-ripple-wrapper"></div>
                        <!---->
                        <i class="icon-facebook2"></i>
                        <span class="mu-raised-button-label">Log in With Facebook</span>
                    </div>
                </button>
             

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

.head {
    padding-top: 30px;
}

.head p {
    text-align: center;
}

.head p:last-child {
    padding-top: 10px;
}

.sign-in {
    margin-top: 20px;
}

.mu-text-field {
    width: 100% !important;
}

.demo-raised-button {
    width: 100%;
}

.btn-sign-in {
    margin-top: 20px;
}

.remeber-my {
    padding-top: 10px;
    overflow: hidden;
}

.remeber-my a {
    position: relative;
    top: -7px;
    text-decoration: underline;
}

.remeber-my .mu-checkbox-icon {
    margin-right: 5px;
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
    ;
    top: 9px;
    background: #fff;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center
}

.creat-accout {
    margin-top: 20px;
}

.creat-accout span {
    font-size: 12px;
}

.sign-in-with {
    text-align: center;
    margin-top: 20px;
    /* position: relative; */
}

.sign-in-with>span {
    position: relative;
    top: -12px;
}

.log-with-face {
    text-align: center;
    margin-top: 30px;
}

.log-with-face button {
    text-transform: none;
    width: 60%;

}
</style>