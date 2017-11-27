<template>
  <div id="app">
    
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import 'mint-ui/lib/style.css'

import Vue from 'vue';

// import MintUI from 'mint-ui';
// import SlideBar from 'components/SlideBar.vue'
// Vue.use(MintUI);

export default {
  data() {
    return {
      popslide: false,
      carSearch: false,
      isEmpty: true,    //购物车是否为空
      country: 'United States',
      // carOrder: 'United States',
      carOrders: false,   //orders
      orders:[],
      cartsubotal:0,//商品数量
      totaleMoney: 0,//选中商品总价
      productList:[],//购物车所有商品
    };
  },
  created() {
    this.orders = [
      {
        label: 'United States',
        value: 'United States'
      },
      {
        label: 'Brazil',
        value: 'Brazil'
      },
      {
        label: 'Australia',
        value: 'Australia'
      },
      {
        label: 'United Kingdoms',
        value: 'United Kingdoms'
      },
      {
        label: 'Spain',
        value: 'Spain'
      },
      {
        label: 'France',
        value: 'France'
      },
      {
        label: 'Canada',
        value: 'Canada'
      },
      {
        label: 'Poland',
        value: 'Poland'
      },
      {
        label: 'Turkey',
        value: 'Turkey'
      },
      {
        label: 'Sweden',
        value: 'Sweden'
      },
      {
        label: 'Israel',
        value: 'Israel'
      },
      {
        label: 'Italy',
        value: 'Italy'
      },
      {
        label: 'New Zealand',
        value: 'New Zealand'
      },

    ]
  },
  components: {
    // SlideBar
  },
  computed: {

  },
  // 过滤器
  filters: {
		addDanwei:function(value){
      if(value == 0){
        return 0;
      }else{
        return '$'+value;
      }
			
		}
	},
  //已成功挂载，相当ready()
  mounted: function () {
    var _this = this;
    this.$nextTick(function () {
      this.loadForYouData();

    })
  },
  //相关操作事件
  methods: {
    // 打开 侧边栏
    changeSli: function () {
      this.popslide = !this.popslide;
    },
    // 监听 组件内关闭侧边栏
    changePop: function (msg) {
      if (!msg) {
        this.popslide = !this.popslide;
      }
    },
    // 获取购物车商品
     loadForYouData: function () {
      this.productList = [
        {
          'id': 1,
          'src': 'https://ae01.alicdn.com/kf/HTB17AUWOFXXXXXSaXXXq6xXFXXX4.jpg_350x350.jpg',
          'name': 'Echo Dot (2nd Generation) - Black',
          'price': 44.99,
          'stock': true,
          'freeshop': true,
          'productQuantity': 12,

        },
         {
          'id': 2,
          'src': 'https://ae01.alicdn.com/kf/HTB11v8iSXXXXXXIXXXXq6xXFXXXC.jpg_350x350.jpg',
          'name': 'Echo',
          'price': 14,
          'stock': true,
          'freeshop': true,
          'productQuantity': 1,

        },
         {
          'id': 3,
          'src': 'https://ae01.alicdn.com/kf/HTB1lXrGLFXXXXblXFXXq6xXFXXXn.jpg_350x350.jpg',
          'name': 'Black',
          'price': 87,
          'stock': true,
          'freeshop': true,
          'productQuantity': 2,

        },
      ];
      var _this = this;
      this.productList.forEach(function(element) {
          if(element.productQuantity >= 1 ){
              _this.cartsubotal += 1;
              _this.totaleMoney += element.productQuantity * element.price;
          }
      }, this);
    },
    // 产品数量增减
		changeSPNumber:function(item,type){
			if (type < 0) {
				if (item.productQuantity > 0) {
          item.productQuantity -= 1;
          if(item.productQuantity == 0){
            this.cartsubotal -= 1;
          }
				}	
			}else{
        if(item.productQuantity == 0){
           this.cartsubotal += 1;
        }
				item.productQuantity += 1;
			}
      this.calcTotalPrice();
    },
    // 删除商品
    delProduct:function(){
      MintUI.MessageBox.confirm('确定删除该商品?').then(action => {
        console.log('确定删除')
        	var indexs = this.productList.indexOf(this.curProduct);
          this.productList.splice(indexs,1);
          this.calcTotalPrice();
    });
    },
    // 总价
		calcTotalPrice:function(){
			var _this = this;
			this.totaleMoney = 0;
			this.productList.forEach(function(value,index){
				_this.totaleMoney += value.price * value.productQuantity;

			});
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

html{
  background: #fff;
}
body {
  background-color: #EBEBEC !important;
}

.ms-rc-shadow {
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .24);
}


* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box
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













/* 搜索 */

.mint-popup-bottom {
  height: 100%;
  width: 101%;
}

#search-bar {
  background: #fff;
}

#search-bar .bayax-mint-cancel {
  color: #000;
  width: 20px;
  margin-left: 0;
  text-decoration: none;
}








/* 购物车 */

.isCarEmpty {
  display: none;
}








/* 空 */

.ms-ept-page {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-color: #F8F8F8;
  padding: 0 12%;
  text-align: center;
}

.ms-ept-icon {
  text-align: center;
  margin-top: 40px;
  color: #EBEBEC;
  font-size: 91px;
}

.ic-md {
  position: relative;
  display: inline-block;
  font-family: icmd!important;
  font-size: 16px;
  line-height: 1;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: .2px;
  -moz-osx-font-smoothing: grayscale;
}

.ms-ept-info {
  margin-top: 16px;
  font-size: 14px;
  color: #3A3E4A;
  line-height: 20px;
  text-align: left;
}

.ms-ept-button {
  display: block;
  font-size: 14px;
  color: #FFFFFF;
  text-transform: uppercase;
  background-color: #F44336;
  height: 36px;
  line-height: 36px;
  margin-top: 16px;
  border-radius: 2px;
  box-shadow: 0 2px 2px #cccccc;
  padding: 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
}










/* 购物车非空 */

.car-noempty-page {
  display: none;
  position: relative;
  /* position: fixed; */
  top: 0;
  /* left: 0; */
  /* right: 0; */
  /* bottom: 0; */
  z-index: 0;
  /* overflow: auto; */
  background-color: #FFF;
}

.my-order-ship {
  font-size: 15px;
}

.blue-color {
  color: rgb(57, 145, 227);
}

#order-bar {
  background: #fff;
  padding: 13px 10px;
}

#order-bar .bayax-mint-cancel {
  color: #000;
  width: 20px;
  margin-left: 0;
  text-decoration: none;
}

.cart-total span {
  font-size: 18px;
  font-weight: 500;
}

.cart-total span.totals {
  color: rgb(177, 40, 5);
}

.my-order-check {
  text-align: left;
  width: 100%;
  margin: auto;
  padding: 0 20px;
}

.account-div {
  padding: 0 20px;
}

.settle_accounts {
  margin: auto;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  background-color: #F5CF68;
  box-shadow: 0px 2px 1px #888888;
  margin-top: 20px;
  margin-bottom: 20px;
}

.all-product {
  margin: auto;
  padding: 0 10px;
}


.fdb-comments .fdb-comment-first{
  min-height: 113px;
}
.fdb-comments.fdb-section {
  padding-top: 0;
  padding-bottom: 0;
  color: #3A3E4A
}

.fdb-comments .infos {
  margin: 0 0 0 90px;
  position: relative;
  font-size: 12px
}

.fdb-comments .fdb-block {
  position: relative
}

.fdb-comments .avatar {
  position: absolute;
  right: 100%;
  margin-right: 10px;
  top: 0;
}

.fdb-comments .avatar .wrapper {
  width: 90px;
  height: 90px;
  overflow: hidden;
  text-align: center;
  background-image: url(data:image/png;base64,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) !important
}

.fdb-comments .avatar img {
  height: 100%;
  display: inline-block;
}

.fdb-comments .fdb-comment {
  padding: 16px 0 16px 0
}

.fdb-comments .infos {
  max-width: 700px;
}
.fdb-comments .infos .user .name{
      font-weight: 700;
      font-size: 14px;
      color:#111;
}
.in-stock{
    font-size: 14px;
    color: #008a00;
}
.free-shipping{
  margin-top: 5px;
   font-size: 14px;

}
.fdb-comments .infos .date {
  /* margin-bottom: 4px */
  color:#B12704;
  font-size: 14px;
}


/* 操作 */
.fdb-comments .option{
  padding-top: 1px;
  padding-bottom: 1px;
}
.fdb-comments .info-option {
  margin: 0;
  margin-bottom: 50px;
  position: relative;
}

.fdb-comments .info-option .avatars {
  position: absolute;
  width: 80px;
  top: 8px;;
  text-align: center;
  /* background: blue; */
}

.fdb-comments .info-option .content {
  position: absolute;
  margin-left: 90px;
}

.avatars span{
  display: inline-block;
  width: 19px;
  height: 20px;
  text-align: center;
  font-size: 10px;
}
.avatars span.num{
  width: 33px;
  font-size: 14px;
}
.info-option .content div{
  float: left;
  height: 36px;
  width: 65px;
  background: rgb(233, 235, 238);
  line-height: 36px;
  font-size: 14px;
  text-align: center;
  border-radius: 3px;
  border-color: #ADB1B8 #A2A6AC #8D9096;
  border-style: solid;
  border-width: 1px;
}
.info-option .content div:last-child{
  width: 120px;
  margin-left: 15px;

  
}


</style>