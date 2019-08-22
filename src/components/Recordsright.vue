<template>
<div>
  <van-cell v-bind:title="record.time" class='recordsright-time'></van-cell>
  <van-row class='recordsright'>
    <van-col class='recordsright-col1' span=3 offset=1>
      <img class="head-img" v-bind:src="img">
    </van-col>

    <van-col class='recordsright-col2 angle-box-right'>
      <van-row class='chatimgright' v-if="record.chatimg != '' && record.chatimg != null">
        <van-image
          width="100%"
          height="100%"
          v-bind:src="record.chatimg"
        />
      </van-row>
      <van-row class='recordright' v-else>{{record.words}}</van-row>
    </van-col>

    
  </van-row>
</div>
</template> 

<script>
export default {
    name: 'recordsright',
    props:[
        'record'
    ],
    data(){
        return {
          img:''
        }
    },
    methods:{
        jump: function(){
            this.$router.go(-1)
        }
    },
    created(){
      let name = sessionStorage.getItem('loginName');
      // console.log("record right created！");
      // this.img = sessionStorage.getItem('userImg');
      this.img = localStorage.getItem("userImg-" + name);
      // console.log(this.img);
      // this.record.time = new Date(this.record.time).toLocaleString();
    }
}
</script>

<style>
.recordsright{
  /* min-height:80px; */
  width:100%;
  font-size: 18px;
  display:flex;
  flex-direction: row-reverse;
  align-items: flex-start;
}
.recordsright-col1{
  max-width:30%;
  /* font-size: 18px; */
}
.recordsright-col2{
  max-width:70%;
  /* min-height:80px; */
}
.recordright{
  min-height:38px;
  max-width: 100%;
  background: white;
  border: 0px solid black;
  padding:5px;
  word-wrap: break-word;
  text-align: left;
  display:block;
  line-height:38px;
  /* display: flex;
  align-items: center; */
  border-radius: 5px;
}
.recordsright-time{
  background-color:rgba(0,0,0,0);
}
.chatimgright{
  max-width: 100%;
  background: white;
  border: 0px solid black;
  padding:5px;
  word-wrap: break-word;
  text-align: left;
  margin-top:3%;
  border-radius: 10px;
}
.angle-box-right{
  position: relative; 
  /* border: 2px solid #cccccc; */
}
.angle-box-right:before {  
    content: '';  
    width: 0;  
    height: 0;  
    border: 7px solid transparent;  
    border-left-color: white;  
    position: absolute;  
    left: 100%;  
    top: 30px;;  
    margin-top: -20px;  
}
</style>
>



