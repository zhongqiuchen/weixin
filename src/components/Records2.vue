<template>
    <router-link v-bind:to="chatUrl">
      <van-row class="records2" >
        <van-col class="records2img">
          <van-image
            width="60"
            height="60"
            v-bind:src="record.imgSrc"
            border-radius:15px
          />
        </van-col>
        <van-col class='records2info' offset=1>
          <van-row class='records2name'>{{record.name}}</van-row>
          <van-row class='records2num'>{{record.content}}</van-row>
        </van-col>
      </van-row>
    </router-link>
</template>

<script>
export default {
    name: 'records2',
    props:[
        'record'
    ],
    data(){
        return {
          chatUrl:'/chat/'+this.record.name
        }
    },
    methods:{
        
    },
    created(){
      console.log("records2 created！");
      // console.log(this.record);
    }

}
</script>

<style>
.test{
    background: white;
    border: 1px solid red;
    max-width:100%;
    max-height:100%;
}
.records2{
    min-height:80px;
    width:100%;
    font-size: 18px;
    text-align: left;
    border-top: 1px solid  rgba(200,200,200,0.5);
    border-bottom: 1px solid  rgba(200,200,200,0.5);
    background: white;
    display: flex;
    align-items:center;
}
.records2info{
  width:100%;
}
.records2name{
  font-size: 20px;

}
.records2num{
  font-size: 10px;
  width:70%;
  overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
>



