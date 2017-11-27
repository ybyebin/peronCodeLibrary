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
                    <mt-swipe-item v-for="item in slides">
                        <a href="../product/product.html">
                            <img v-bind:src="item.url"></a>
                    </mt-swipe-item>
                </mt-swipe>
            </div>




        <!-- <div style="height:20px;"></div> -->
        <section class="sec-content">
            <p class="why-tmart">Why TMART.com</p>
            <div class="why-div">
               
                <ul class="ul-img ">

                    <li class="li-img">
                        <div class="pic"> 
                            <div class="img-wrapper">
                                <img src="https://ae01.alicdn.com/kf/UTB8dpRLXv2JXKJkSanrq6y3lVXaz.jpg_.webp">

                            </div> 
                        </div>
                     </li>
                     <li class="li-img">
                        <div class="pic">
                            <div class="img-wrapper">
                                <img src="https://ae01.alicdn.com/kf/UTB8dpRLXv2JXKJkSanrq6y3lVXaz.jpg_.webp">

                            </div>
                        </div>
                    </li> 

                    <li class="li-img">
                        <div class="pic">
                            <div class="img-wrapper">
                                <img src="https://ae01.alicdn.com/kf/UTB8dpRLXv2JXKJkSanrq6y3lVXaz.jpg_.webp">

                            </div>
                        </div>
                    </li>
                    <div class="clearr"></div>
                </ul>
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
            slides: [
               
            ],
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
                 this.loadForYouData();
        })
    },
    //相关操作事件
    methods: {
        handleChange(value) {
            this.value = value
        },

         loadForYouData:function(){
           this.slides=[
                { url: 'http://ae01.alicdn.com/kf/HTB1Z6tVSVXXXXc2XpXXq6xXFXXXG.jpg_.webp"' },
                { url: 'http://ae01.alicdn.com/kf/HTB1oSRsSVXXXXaAXFXXq6xXFXXX9.jpg_.webp' },
                { url: 'http://ae01.alicdn.com/kf/HTB1xDt9SVXXXXaxXFXXq6xXFXXXN.jpg_.webp' },
                { url: 'http://ae01.alicdn.com/kf/HTB1SZF0SVXXXXavXVXXq6xXFXXX1.jpg_.webp' },
            ]
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

.div-search input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    outline: 0;
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
    height: 128px;;
    min-height: 3.4375rem;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .24);
    /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); */
    position: relative;
}
.swipe-div img{
    width: 100%;
    height: 100%;
}
/* 
.swipe-div a {
    display: inline-block;
    height: 50px;
    background: blue;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
} */




/* 三张图 */
.why-tmart{
    /* padding: 10px 0; */
}
.why-div{
    position: relative;
    top:0;
}
/*评论图片*/

/* .clearfix:after {
    content: '';
    display: block;
     height: 0 !important;
    clear: both;
} */
.clearr{
     clear: both;
}

.ul-img {
    /* background: red; */
}

.ul-img .pic {
    position: relative;
    overflow: hidden;
    /* background: blue; */
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
    width:33.3333333333333%;
    /* -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box; */
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
.why-div{
    /* background: blue; */
    /* height: 200px;; */
}

</style>