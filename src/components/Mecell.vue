<template>
    <van-row class="me_myinfo">
      <van-col class="me_img">
        <van-image
          width="100%"
          height="100%"
          v-bind:src="myinfo.img"
        />

      </van-col>
      <van-col class='me_info' offset=1>
        <van-row class='me_name'>{{myinfo.nickname}}</van-row>
        <van-row class='me_num'>微信号：{{myinfo.id}}</van-row>
      </van-col>
      <van-col class="me_jump" offset=10>
        <router-link to="/myinfo"><van-icon name="arrow" /></router-link>
      </van-col>
    </van-row>
</template>

<script>
export default {
    name:"mecell",
    props:["info"],
    data(){
        return {
            myinfo:{}
        }
    },
    created(){
      console.log("Mecell created.");
      console.log(this.info);
      this.myinfo = this.info;
    }
}
</script>


<style>
.me_myinfo{
  min-height:150px;
  width:auto;
  font-size: 18px;
  text-align: left;
  border-top: 1px solid  rgba(200,200,200,0.5);
  border-bottom: 1px solid  rgba(200,200,200,0.5);
  background: white;
  display: flex;
  align-items:center;
}
.me_img{
  width:80px;
  height:80px;
  border-radius: 15px;
}
.me_info{
  min-width:200px;
}
</style>
