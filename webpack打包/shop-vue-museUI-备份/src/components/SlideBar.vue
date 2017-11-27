<template>
  <div>
    <mt-popup v-model="ssbar" position="left">
      <div class="slide_user">
        <div class="portrait">
          <img src="../assets/image/userimg.png">
        </div>
        <div class="drawer-unlogin">
          <a href="login.html" class="drawer-signin" style="color:#eee">Sign IN</a>
          <a class="drawer-join">Join Free</a>
        </div>
      </div>
      <ul class="am-list am-list-border">
        <li>
          <a href="../homepage/index.html">
            <i class="icon-home"></i>
            Home
          </a>
        </li>
        <li>
          <a href="#">
            <i class="icon-file" style="color:#000"></i>
            My Orders
          </a>
        </li>
        <li>
          <a href="../car/car.html">
            <i class="icon-cart"></i>
            Cart
          </a>
        </li>
        <li>
          <a href="#">
            <i class="icon-heart"></i>
            Wish List
          </a>
        </li>
      </ul>

    </mt-popup>
  </div>
</template>

<script>

import Lib from 'assets/js/Lib';
import Vue from 'vue';
import MintUI from 'mint-ui';


import 'mint-ui/lib/style.css'//最嗨的是他这个直接引入的是一个css文件

// import { XHeader } from 'vux'
Vue.use(MintUI);
export default {
  props: ["slide", "spopslide"],
  data() {
    return {
      ssbar: this.spopslide
    }
  },
  components: {
    // XHeader
    // MintUI
  },
  watch: {
    spopslide(val) {
      console.log('组件内查看'+val);
      this.ssbar = val;//②监听外部对props属性spopslide的变更，并同步到组件内的data属性ssbar中
    },
    ssbar(val) {
      console.log('变化了')
      this.$emit('change-pop',this.ssbar);//③组件内对ssbar变更后向外部发送事件通知
    }
  },
  methods: {
    // changepopsslide() {
    //   this.ssbar = !this.ssbar;
    // }

  }
}
</script>

<style>
/*侧边栏*/

.mint-popup-left {
  width: 85%;
  height: 102%;
}

#app .v-modal {
  opacity: 0.15;
}

.slide_user {
  box-sizing: border-box;
  height: 148px;
  background-color: #e62e02;
  overflow: hidden;
  background-image: url(../assets/image/slidebg.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.portrait {
  padding: 16px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
}

.portrait img {
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.drawer-unlogin {
  padding: 15px 16px 16px;
  box-sizing: border-box;
  width: 100%;
  white-space: nowrap;
  font-size: 15px;
  line-height: 1.2;
  color: #fff;
}

.drawer-signin {
  padding: 0 6px 0 0;
  border-right: solid 1px #fff;
  display: inline-block;
  color: #fff;
  font-size: 15px;
  line-height: 1.2;
}

.drawer-join {
  padding-left: 2px;
  display: inline-block;
  color: #fff;
  font-size: 15px;
  line-height: 1.2;
}


/*菜单 */

.am-list {
  margin-bottom: 1.6rem;
}

.am-list-border>li>a {
  padding: 1.3rem;
  padding-left: 1rem;
  color: #000;
  display: block;
  box-sizing: border-box;
}

.am-list-border>li>a i {
  font-size: 20px;
  margin-right: 20px;
}

.am-list-border>li>a i:before {
  vertical-align: -15%;
}
</style>
