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
        
        <div class="container">
            <!-- 第一部分 -->
        <section>
            <h2>Cart Subtotal (x items): $15.99</h2>
            <p>In at lorem quam.Curabitur in massa tristique,laoreet quam in,mattis neque...</p>
            <div class="p-t-c">
                <mu-raised-button label="Proceed to Checkout"  primary fullWidth/>
            </div>
            <p>Use coupon or redeem points in the following step</p>
                        <div class="remove">
                <mu-raised-button label="Undo remove item"  secondary fullWidth/>
            </div>
        </section>
        <!-- 第二部分 -->
        <section>
                <h2>Items (Ships from China)</h2>
                <ul>
                    <li>
                            <mu-row gutter>
                                <mu-col width="30" tablet="30" desktop="30"><img src="" alt=""></mu-col>
                                <mu-col width="70" tablet="70" desktop="70">
                                    <mu-row gutter>
                                    <mu-col>Nunc ut sem id urna aliquetve stibulum</mu-col> 
                                    <mu-col width="30" tablet="30" desktop="30">$19.95</mu-col> 
                                    <mu-col width="30" tablet="30" desktop="30"><mu-icon value="home"/></mu-col> 
                                      </mu-row>
                                </mu-col>
                            </mu-row>
                    </li>
                </ul>
        </section>
        </div>

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

        loadForYouData: function() {
            this.slides = [
                { url: '../../../assets/image/base/slide1.png' },
                // { url: '../../../assets/image/base/slide1.png' },
                // { url: '../../../assets/image/base/slide1.png' },
                // { url: '../../../assets/image/base/slide1.png' },
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

.container{
    padding: 10px;
}
.p-t-c{
    margin-top: 20px;
    margin-bottom: 10px;
}
.remove{
    margin-top: 20px;
    margin-bottom: 20px;
}





</style>