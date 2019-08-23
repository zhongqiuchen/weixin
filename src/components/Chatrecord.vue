<template>
    <router-link v-bind:to="chatUrl" justify="space-between">
      <van-row class="chatrecord" type="flex">
        <van-col class="chatrecord-col1" span=3 offset=1>
          <img class="head-img" v-bind:src="record.imgSrc">
        </van-col>
        <van-col class='chatrecord-col2' span=13 offset=1>
          <van-row class='chatrecord-name'>{{record.name}}</van-row>
          <van-row class='chatrecord-num'>{{record.words}}</van-row>
        </van-col>
        <van-col class='chatrecord-col3' span=4 offset=1>
            <van-row class='chatrecord-time'>{{record.time}}</van-row>
            <!-- <van-row class='chatrecord-icon-parent'>
                <van-icon name="chat" size=15px class='chatrecord-icon'></van-icon>
            </van-row> -->
        </van-col>
      </van-row>
    </router-link>
</template>

<script>
export default {
    name: 'chatrecord',
    props:[
        'record'
    ],
    data(){
        return {
          chatUrl:'/chat/'+this.record.name,
          // record:{name:"Test", content:"aaaaaaaaaaa", imgSrc:"../../static/img/风景2.jpg"}
        }
    },
    methods:{
        
    },
    created(){
      console.log("chat records created！");
      console.log(this.record);
      console.log(this.record.time);
      console.log("============================");
    }

}
</script>

<style>
.chatrecord{
    min-height:10vh;
    width:auto;
    font-size: 1.2rem;
    text-align: left;
    border-top: 1px solid  rgba(200,200,200,0.5);
    border-bottom: 1px solid  rgba(200,200,200,0.5);
    background: white;
    display: flex;
    align-items:center;
}

.chatrecord-name{
  font-size: 1.2rem;

}
.chatrecord-num{
  font-size: 0.8rem;
  margin-top: 2px;
  width:100%;
  overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.chatrecord-time{
  font-size: 0.6rem;
  display: flex;
  justify-content: flex-end;
}
.chatrecord-icon-parent{
  margin-top: 2px;
}
.chatrecord-icon{
  display: flex;
  justify-content: flex-end;
  /* right: 0px; */
}
</style>
>



