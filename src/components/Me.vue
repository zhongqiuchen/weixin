<template>
  <div class="me" >
    
    <van-row class="me_myinfo" type="flex" justify="space-between">
      <van-col class="me_img" span=3>
        <img class="head-img" v-bind:src="myInfo.img">
      </van-col>
      <van-col class='me_info' span=15 offset=1>
        <van-row class='me_name'>{{myInfo.nickname}}</van-row>
        <van-row class='me_num'>微信号：{{myInfo.id}}</van-row>
      </van-col>
      <van-col class="me_jump" span=3>
        <router-link to="/myinfo"><van-icon name="arrow" /></router-link>
      </van-col>
    </van-row>

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="支付" icon="../../static/img/支付.png" size="large" is-link to="/back"/>

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="收藏" icon="../../static/img/收藏.png" size="large" />
    <van-cell class="cell" title="相册" icon="../../static/img/相册.png" size="large" />
    <van-cell class="cell" title="卡包" icon="../../static/img/卡包.png" size="large" />
    <van-cell class="cell" title="表情" icon="../../static/img/表情.png" size="large" is-link to="/testall"/>

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="退出登录" icon="../../static/img/设置.png" size="large" v-on:click="exit"/>
  </div>
</template>

<script>
import Mecell from "./Mecell"

export default {
  name: 'Me',
  data () {
    return {
      myInfo:{}
    }
  },
  inject:['reload', 'send', 'closeWebSocket'],
  components:{
    Mecell
  },
  methods:{
    exit: function(){
      sessionStorage.clear();
      localStorage.clear();
      this.closeWebSocket();
      this.$router.go(0);
    }
  },
  created(){
    //方法一，从后台取，太慢
    //方法二，login时把数据存入缓存，me和myinfo直接从缓存读即可
    // console.log("oook");
    let name = sessionStorage.getItem("loginName");
    let nickname = sessionStorage.getItem("loginNickname");
    this.myInfo.nickname = nickname;
    this.myInfo.id = name;
    // this.myInfo.img = "http://localhost:8080/get_head_img/" + this.myInfo.img;
    this.myInfo.img = localStorage.getItem("userImg-" + name);
    console.log(this.myInfo.img);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.me{
  text-align: left;
  margin-bottom: 70px;
}
.me_myinfo{
  min-height:23vh;
  width:100%;
  font-size: 1rem;;
  text-align: left;
  border-top: 1px solid  rgba(200,200,200,0.5);
  border-bottom: 1px solid  rgba(200,200,200,0.5);
  background: white;
  display: flex;
  align-items:center;
}
.me_img{
  width:22%;
  height:20%;
  border-radius: 5px;
  margin-left:0.5rem;
}
.me_info{
  min-width:10rem;
}
.me_jump{
  display: flex;
  justify-content: flex-end;
  margin-right:0.6rem;
}
</style>
