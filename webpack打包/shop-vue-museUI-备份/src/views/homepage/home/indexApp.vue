<template>
    <div id="app">
<!--        
     <mu-appbar title="Title">
  <mu-icon-button icon="menu" slot="left"/>
  <mu-flat-button label="expand_more" slot="right"/>
  <mu-icon-button icon="expand_more" slot="right"/>
</mu-appbar> -->
       
        <!-- 轮播图
        <section class="slides-bayax">
            <mt-swipe :auto="4000" class="swipe">
                <mt-swipe-item v-for="item in slides">
                    <a href="../product/product.html">
          <img v-bind:src="item.url"></a>
                </mt-swipe-item>
            </mt-swipe>
        </section>

        <mt-button type="default">default</mt-button>
<mt-button type="primary">primary</mt-button>
<mt-button type="danger">danger</mt-button> -->
      
    </div>
</template>
<script>
import Lib from 'assets/js/Lib';
import 'mint-ui/lib/style.css' //最嗨的是他这个直接引入的是一个css文件

export default {
    data() {
        return {
           
            // 轮播图
            slides: [
               
            ],
           
        };
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
.icon-three-bars,
.icon-bayax-home {
    font-size: 20px;
    color: #000;
}


body {
    background-color: #EBEBEC !important;
}

.ms-rc-shadow {
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .24);
}











/*头部*/

.three-bar {
    font-size: 20px;
    margin-left: 10px;
}

#app .mint-header {
    background-color: transparent;
    height: 56px;
}

.icon-label {
    min-width: 40px;
    display: inline-block;
}

.a-logo {
    width: 142px;
    height: 56px;
    display: inline-block;
    margin-left: 20px;
}

.a-logo img {
    width: 142px;
    height: 56px;
}

.logo {
    position: fixed;
    width: 142px;
    height: 56px;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
}


/*轮播图 */

.slides-bayax {
    margin-top: 56px;
    height: 8rem;
    min-height: 3.4375rem;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .24);
    /* box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); */
    position: relative;
}

.slides-bayax img {
    height: 100%;
    width: 100%;
}

.slides-bayax .mint-swipe-indicators {
    bottom: 5px;
}

.slides-bayax .mint-swipe-indicator {
    opacity: 1;
    background-color: #eee;
}

.slides-bayax .mint-swipe-indicator.is-active {
    background-color: red;
}


















</style>