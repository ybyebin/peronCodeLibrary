<template>
    <div id="app">

        <mu-appbar title="">
            <img class="shop-logo" src="../../../assets/image/logos.png" alt="">

            <mu-flat-button label="sign in" slot="right" />

            <div class="head-right" slot="right">
                <i class="icon-assignment_ind"></i>
                <i class="icon-shopping_cart"></i>
            </div>

        </mu-appbar>
        <section class="sec-content">
            <div class="div-search">
                <mu-text-field hintText="请输入搜索内容" />
                <a class="search-a">
                    <i class="icon-search"></i>
                </a>
            </div>

            <div>
                <ul class="ul-a clearfix">
                    <li>
                        <a href="">Deparments</a>
                    </li>
                    <li>
                        <a href="">Deals</a>
                    </li>
                    <li>
                        <a href="">Clearance</a>
                    </li>
                </ul>
            </div>

        </section>

        <div class="swipe-div">
            <mt-swipe :auto="4000" :show-indicators="false" class="swipe">
                <mt-swipe-item>
                    <a href="../product/product.html">
                        <img src="../../../assets/image/base/slide1.png"></a>
                </mt-swipe-item>
                <mt-swipe-item>
                    <a href="../product/product.html">
                        <img src="../../../assets/image/base/slide2.png"></a>
                </mt-swipe-item>
                <mt-swipe-item>
                    <a href="../product/product.html">
                        <img src="../../../assets/image/base/slide3.png"></a>
                </mt-swipe-item>
                <mt-swipe-item>
                    <a href="../product/product.html">
                        <img src="../../../assets/image/base/slide4.png"></a>
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <section class="sec-content">
            <p class="p-title">Why TMART.com</p>
            <div class="why-div">

                <ul class="ul-img ">

                    <li class="li-img">
                        <div class="pic">
                            <div class="img-wrapper">
                                <img src="../../../assets/image/base/img1.png">

                            </div>
                        </div>
                    </li>
                    <li class="li-img">
                        <div class="pic">
                            <div class="img-wrapper">
                                <img src="../../../assets/image/base/img1.png">

                            </div>
                        </div>
                    </li>

                    <li class="li-img">
                        <div class="pic">
                            <div class="img-wrapper">
                                <img src="../../../assets/image/base/img1.png">

                            </div>
                        </div>
                    </li>
                    <div class="clearr"></div>
                </ul>
            </div>
        </section>

        <section class="sec-content ">
            <p class="p-title">Recommendation</p>
            <div class="bayax-paper demo-paper"></div>

            <div class="ms-rc-qp">

                <div class="column">
                    <div v-for="item in recommendation" class="item ms-rc-shadow">
                        <p class="item-title">
                            <span @click="delProduct(item)" class="icon-close"></span>
                        </p>
                        <a>
                            <div class="pic">
                                <img :src="item.url">
                            </div>
                        </a>
                        <div class="clearfix">
                            <p class="price">{{item.productPrice | addDanwei}}</p>
                            <p class="details">{{item.details}}</p>
                        </div>
                        <div class="item-btn-group clearfix">

                            <button class="mu-raised-button demo-raised-button mu-raised-button-primary mu-raised-button-inverse" type="button" tabindex="0" style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
                                <a :href="item.hrefs">
                                    <div class="mu-raised-button-wrapper">
                                        <div class="mu-ripple-wrapper"></div>

                                        <span class="mu-raised-button-label">Detail</span>
                                    </div>
                                </a>

                            </button>

                            <button class="mu-raised-button demo-raised-button mu-raised-button-primary mu-raised-button-inverse" type="button" tabindex="0" style="user-select: none; outline: none; cursor: pointer; -webkit-appearance: none;">
                                <div class="mu-raised-button-wrapper">
                                    <div class="mu-ripple-wrapper"></div>

                                    <span class="mu-raised-button-label">Like</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div class="show-more-div">
                        <mu-raised-button @click="showMore()" label="show more" class="demo-raised-button" primary/>
                    </div>
                </div>
            </div>
            <div class="clearr"></div>
        </section>

        <div class="swipe-div">
            <mt-swipe :auto="4000" :show-indicators="false" class="swipe">
                <mt-swipe-item>
                    <a href="../product/product.html">
                        <img src="../../../assets/image/base/slide1.png"></a>
                </mt-swipe-item>
                <mt-swipe-item>
                    <a href="../product/product.html">
                        <img src="../../../assets/image/base/slide2.png"></a>
                </mt-swipe-item>
                <mt-swipe-item>
                    <a href="../product/product.html">
                        <img src="../../../assets/image/base/slide3.png"></a>
                </mt-swipe-item>
                <mt-swipe-item>
                    <a href="../product/product.html">
                        <img src="../../../assets/image/base/slide4.png"></a>
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <section class="sec-content ">
            <p class="p-title">Clearance</p>

            <div v-for="item in clearance" class="ms-rc-shadow clear-div">
                <div class="clear-div-fl">
                    <img :src="item.url" alt="">
                </div>
                <div class="clear-div-right">
                    <p class="p-detail">{{item.details}}</p>
                    <p class="p-price">from {{item.productPrice | addDanwei}}</p>
                </div>
                <div class="clearr"></div>
            </div>

            <div class="show-more-div">
                <mu-raised-button @click="clearShowMore()" label="show more" class="demo-raised-button" primary/>
            </div>
            <div class="clearr"></div>
        </section>

        <section class="sec-content">
            <p class="p-title">Deals</p>
            <div class="deals-div">
                <ul class="ul-img ">

                    <li v-for="item in deals" class="li-img ">
                        <a :href="item.hrefs">
                            <div class="pic ms-rc-shadow">
                                <div class="img-wrapper">
                                    <img :src="item.imgurl">
                                </div>
                            </div>
                        </a>
                    </li>

                    <div class="show-more-div">
                        <mu-raised-button @click="dealsShowMore()" label="show more" class="demo-raised-button" primary/>
                    </div>
                    <div class="clearr"></div>
                </ul>
            </div>
        </section>

        <section class="sec-content footer">
           <div class="footer-content">
               <ul class="footer-ul-fl">
                   <li><a href="#">
                       Cart( <span>2</span> )</a></li>
                   <li><a href="">Your Account</a></li>
                   <li><a href="">Your Orders</a></li>
                   <li><a href="">Your Wishlist</a></li>
               </ul>
                <ul class="footer-ul-fr">
                   <li><a href="">Shipping Policy</a></li>
                   <li><a href="">Privacy Policy</a></li>
                   <li><a href="">Terms of Conditions</a></li>
                   <li><a href="">Help</a></li>
               </ul>
               <div class="clearr"></div>
           </div>
        </section>
         <section class="sec-content footer footer-msg">
           <div class="footer-content">
               <p><a href="#">Sign in</a>丨<a href="#">Sign out</a></p>
                <p>Copyright 2017 @ All rights reserved</p>
           </div>
        </section>

    </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import 'mint-ui/lib/style.css' //最嗨的是他这个直接引入的是一个css文件
import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 light 主题
Vue.use(MuseUI)
export default {
    data() {
        return {
            value: '1',
            // 轮播图
            slides: [],
            recommendation: [
                {
                    url: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    productPrice: 100,
                    details: '产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述',
                    hrefs: 'aaa'
                },
                {
                    url: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    productPrice: 10.4,
                    details: '产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述',
                    hrefs: 'aaa'
                },
            ],
            clearance: [
                {
                    url: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    productPrice: 100,
                    details: 'Nunc ut sem id urna aliquet vestibulum',
                    hrefs: 'aaa'
                },
                {
                    url: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    productPrice: 100,
                    details: 'Nunc ut sem id urna aliquet vestibulum',
                    hrefs: 'aaa'
                },
            ],
            deals: [
                {
                    imgurl: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    hrefs: 'aaa'
                },
                {
                    imgurl: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    hrefs: 'aaa'
                },
                {
                    imgurl: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    hrefs: 'aaa'
                },
                {
                    imgurl: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    hrefs: 'aaa'
                },

            ]
        }
    },
    components: {
        // Swipe, SwipeItem
    },
    computed: {


    },
    filters: {
        addDanwei: function(value) {
            return '$' + value;
        }
    },
    //已成功挂载，相当ready()
    mounted: function() {
        var _this = this;
        this.$nextTick(function() {
            this.loadForYouData();
        })
    },
    //相关操作事件
    methods: {
        a: function() {
            alert(1)
        },
        handleChange(value) {
            this.value = value
        },

        loadForYouData: function() {
            this.slides = [
                // { url: '../../../assets/image/base/slide1.png' },
                // { url: '../../../assets/image/base/slide1.png' },
                // { url: '../../../assets/image/base/slide1.png' },
                // { url: '../../../assets/image/base/slide1.png' },
            ]
        },
        // 删除产品
        delProduct: function(item) {
            var indexs = this.recommendation.indexOf(item);
            this.recommendation.splice(indexs, 1);
        },
        // show-more
        showMore: function() {
            this.recommendation.push({
                url: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                productPrice: 100,
                details: '产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述',
                hrefs: 'aaa'
            })
        },
        clearShowMore: function() {
            this.clearance.push({
                url: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                productPrice: 100,
                details: '产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述',
                hrefs: 'aaa'
            })
        },
        dealsShowMore: function() {
            this.deals.push({
                imgurl: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                hrefs: 'aaa'
            }, {
                    imgurl: 'https://ae01.alicdn.com/kf/HTB1qcNWOXXXXXXbaFXXq6xXFXXXB.jpg_350x350.jpg',
                    hrefs: 'aaa'
                })
        }

    }
}
</script>
<style>
.shop-logo {
    width: 100px;
}

.head-right {
    font-size: 25px;
}

.sec-content {
    padding: 10px;
}










/* .div-search{
    background: red;

}
.div-search .mu-text-field{
    width: 100%;
} */

.div-search,
.mu-text-field {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}



.mu-text-field {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 28px;
}

.div-search .mu-text-field-content {
    width: 100%;
}

.div-search input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    box-sizing: border-box;
    width: 100% !important;
    height: 100%;
    outline: 0;
    /* background: red; */
}

.mint-searchbar-cancel {
    color: #26a2ff;
    margin-left: 10px;
    text-decoration: none;
}

.search-a {
    font-size: 26px;
    color: #666;
    cursor: pointer
}

.ul-a li {
    float: left;
    /* margin-right: 10px; */
    width: 30%;
}

.ul-a li a {
    color: #666;
}

.swipe-div {
    /* margin-top: 56px; */
    height: 128px;
    min-height: 3.4375rem;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .24);
    /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); */
    position: relative;
    top: 0px;
}

.swipe-div img {
    width: 100%;
    height: 100%;
}












/* 三张图 */

.p-title {
    padding: 10px 0;
}

.div-content {
    position: relative;
    top: 0;
}








/*评论图片*/

.clearfix:after {
    content: '';
    display: block;
    height: 0 !important;
    clear: both;
}

.clearr {
    clear: both;
}

.ul-img .pic {
    position: relative;
    overflow: hidden;
}

.ul-img .pic:before {
    content: "";
    display: block;
    padding-top: 100%
}

.ul-img .pic>.img-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background: yellow;*/
}

.ul-img .pic img {
    vertical-align: middle
}

.ul-img .li-img {
    float: left;
    width: 33.2%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 4px;
    padding-right: 4px;
}

.li-img .img-wrapper {
    overflow: hidden
}

.li-img .img-wrapper img {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: initial;
}




* {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box
}

img {
    max-width: 100%
}

.ms-rc-qp .column {
    box-sizing: border-box;
    display: block;
    float: left;
    width: 100%;
    padding: 4px;
    overflow: hidden;
}

.item-title {
    height: 30px;
    line-height: 30px;
    /* background: red; */
    position: relative;
}

.item-title span {
    display: inline-block;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 20px;
    background: #F9F9F9;
    cursor: pointer;
}

.ms-rc-qp .column>.item {
    position: relative;
    margin-bottom: 8px;
}

.ms-rc-qp .column>.item a {
    display: block
}

.ms-rc-qp .column>.item .pic {
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-width: 148px;
    min-height: 148px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 50px;
    padding-bottom: 0;
    padding-top: 0;
    visibility: visible;
}

.ms-rc-qp .column>.item .price {
    padding-top: 10px;
    padding-right: 10px;
    height: 100%;
    float: right;
}

.ms-rc-qp .column>.item .details {
    padding: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 0;
    color: #333;
}

.item-btn-group {
    text-align: center;
    padding: 10px 30px;
}

.item-btn-group button {
    width: 48%;
}

.item-btn-group button:first-child {
    float: left;
}

.item-btn-group button:last-child {
    float: right;
}

.item-btn-group button a {
    color: #fff;
}

.ms-rc-shadow {
    border-radius: 2px;
    box-shadow: 0 0px 7px 0px rgba(0, 0, 0, .24);
}


.show-more-div {
    text-align: center;
    margin-top: 15px;
}



/* Clearance */

.clear-div {
    margin-bottom: 15px;
    border: none;
}

.clear-div-fl {
    float: left;
    width: 100px;
    height: 100px;
    overflow: hidden;
    background: red;
    margin-right: 10px;
    /* position: relative; */
}

.clear-div-fl img {
    /* position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); */
    width: 100%;
    max-width: initial;
}

.clear-div-right {
    padding-top: 4px;
}

.clear-div-right p.p-detail {
    height: 68px;
    max-height: 68px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding-right: 50px;
    padding-top: 1px;
}


/* deatils */

.deals-div .ul-img .li-img {
    width: 50%;
    margin-bottom: 15px;
    padding: 0 7px;
}

.footer{
    text-align: center;
    background: #2196F3;
}
.footer ul{
    text-align: left;
}
.footer ul li{
    padding: 5px 0;
}
.footer ul a{
    color:#fff;
    
}
.footer-ul-fl{
    float: left;
    padding-left: 40px;
}
.footer-ul-fr{
    float: right;
}
.footer-msg{
    background: #333;
    padding: 20px 0;
}
.footer-msg p,
.footer-msg p a{
    color:#fff;
}
.footer-msg p:first-child{
    font-size: 18px;
    padding-bottom: 10px;
}
</style>