<template>
  <div class="card">
    <van-cell class='top' icon='arrow-left' to='/address'></van-cell>
    <van-row class="infocard">
      <van-col class="infoimg">
        <van-image
          width="100"
          height="100"
          v-bind:src="card.img"
        />
      </van-col>
      <van-col class='infotext' offset=1>
        <van-row class='infotextname'>{{$route.params.name}}</van-row>
        <van-row class='infotextnum'>昵称：{{card.nickname}}</van-row>
        <van-row class='infotextnum'>微信号：{{card.id}}</van-row>
        <van-row class='infotextnum'>地区：{{card.area}}</van-row>
      </van-col>
    </van-row>

    <van-cell class="cell" title="设置备注和标签" is-link to="/weixin"/>

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="朋友圈"/>
    <van-cell class="cell" title="更多信息"/>

    <van-index-anchor class="anchor"/>
    <van-cell class="cell celltextcenter">
      <template slot="title" >
        <van-icon name="home-o"></van-icon>
        <span class="custom-title">发消息</span>
      </template>
    </van-cell>
    <van-cell class="cell celltextcenter">
      <template slot="title" >
        <van-icon name="video-o"></van-icon>
        <span class="custom-title">音视频通话</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'card',
  props:[],
  data () {
    return {
        card:{},
        items:{},
    }
  },
  created(){
    console.log('card created');
    let cardName = this.$route.params.name;
    console.log("card name: " + cardName);
    this.$http({
      method: 'get',
      url:'/apis/single_people',
      params:{"username":cardName}
    }).then((res)=>
    {
        let data = res.body;
        console.log("card json数据为:")//此处的res对象包含了json的文件信息和数据，我们需要的json数据存在于body属性中
        console.log(data);
        
        sessionStorage.setItem(cardName, JSON.stringify(data));
        data.img = "../../static/headimg/" + data.img;
        this.card = data;
    })

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  text-align: left;
}
.infocard{
  background: white;
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  align-items:center;
  display: flex;
  height:150px;
}

.anchor{
  height:10px;
  text-align: left;
}
.celltextcenter{
  text-align: center;
}
.cell{
  height:50px;
}

.infotextname{
  font-size: 20px;
}
.infotextnum{
  font-size: 15px;
  margin-top:3%;
}
</style>
