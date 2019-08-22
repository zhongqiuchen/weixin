<template>
  <div>
  <van-cell v-bind:title="record.time" class='recordsleft-time'></van-cell>
  <van-row class='recordsleft'>
    <van-col class='recordsleft-col1' span=3>
      <img class="head-img" v-bind:src="record.img">
    </van-col>

    <van-col class='recordsleft-col2 angle-box-left' offset=1>
      <van-row class='chatimgleft' v-if="record.chatimg != '' && record.chatimg != null">
        <van-image
          width="100%"
          height="100%"
          v-bind:src="record.chatimg"
        />
      </van-row>
      <van-row class='recordleft' v-else>{{record.words}}</van-row>
    </van-col>

    
  </van-row>
</div>
</template> 

<script>
export default {
    name: 'recordsleft',
    props:[
        'record'
    ],
    data(){
        return {
        }
    },
    methods:{
        jump: function(){
            this.$router.go(-1)
        }
    },
    computed:{

    },
    created(){
      // console.log("record left created！");
      // console.log(this.record);
      // this.record.time = new Date(this.record.time).toLocaleString();
      // this.record.img = "../../static/headimg/" + JSON.parse(localStorage.getItem(this.record.name)).img;
    }
}
</script>

<style>
.recordsleft{
  /* min-height:80px; */
  width:100%;
  /* font-size: 18px; */
  text-align: left;
  display: flex;
  align-items: flex-start;
}
.recordsleft-col1{
  /* font-size: 25px; */
  max-width:30%;
}
.recordsleft-col2{
  max-width:70%;
  /* min-height:80px; */
}
.recordleft{
  min-height:38px;
  max-width: 100%;
  background: white;
  border: 0px solid black;
  padding:5px;
  word-wrap: break-word;
  white-space:normal;
  text-align: left;
  border-radius: 5px;
  font-size: 18px;
  overflow:hidden;
  /* display: flex;
  align-items: center; */
  /*自动换行必须设置为block，因为word-wrap在行内元素不生效*/
  display:block;
  line-height:38px;

}
.recordsleft-time{
  background-color:rgba(0,0,0,0);
}
.chatimgleft{
  max-width: 100%;
  background: white;
  border: 0px solid black;
  padding:5px;
  word-wrap: break-word;
  text-align: left;
  border-radius: 5px;
}
.angle-box-left{
  position: relative; 
  /* border: 2px solid #cccccc; */
}
.angle-box-left:before {  
    content: '';  
    width: 0;  
    height: 0;  
    border: 7px solid transparent;  
    border-right-color: white;  
    position: absolute;  
    right: 100%;  
    top: 30px;;  
    margin-top: -20px;  
}
</style>
>



