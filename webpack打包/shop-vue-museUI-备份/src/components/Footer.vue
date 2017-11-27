<template>
        <section class="foot">
            <div style="width:100%;text-align:center;">Not Name?</div>
            <a herf="javascriot;" style="width:100%;text-align:center;display:block;margin-bottom: 20px;;">Sign Out</a>
            <div class="foot_link ">
            <span class="a-size clearfix">      
                <a href="javascriot;" class="left">Conditions of Use</a>
                <span class="a-space"></span>
                <span class="a-space"></span>

                <a href="javascriot;" class="center">Privacy Notice</a>
                                <span class="a-space"></span>
                <span class="a-space"></span>
                <a href="javascriot;" class="right">Interest-Based Ads</a>
            </span>
            </div>
            <div style="font-size:12px; width:100%;text-align:center;margin-top:20px;">
                © 1996-2017 Brothers Project.
            </div>
        </section>
</template>
<script>
      export default{
    name: 'child',
    data(){
      return {}
    }
  }
</script>
<style>
.foot{
    border-top: 1px solid #ccc;
    padding-top: 10px;
}
.foot a{
  text-decoration: none;
    color: #0066c0;
}
.foot_link{
    text-align: center;
    padding: 0;
    min-height: 11px;
}
.a-size{
    display: inline-block;
    font-size: 0.2rem!important;
    line-height: 1.5rem!important;
        text-align: center!important;
            margin-left: -10px;
    margin-right: -10px;
}
.a-space{
    display: inline-block;
    width: 1px;
}


.clearfix:after {
content: "\0020";
display: block;
height: 0;
clear: both;
}
.clearfix {
zoom: 1;
}
</style>
