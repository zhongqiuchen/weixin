<template >
  <div id="app">
    <van-cell class='top' title="微信" v-if="$route.meta.top"></van-cell> 
    <van-popup
      id="app-popup"
      v-model="popup_show" 
      v-on:click="clickPopup"
      v-on:open="openPopup"
      round
      v-bind:overlay="false"
      position="top"
      class="popup">
      <chatrecord 
        v-bind:record ="popup_content">
      </chatrecord>
    </van-popup>
    <router-view class='view' v-if="isRouterAlive"></router-view>
    <van-tabbar route class="tabbar-class" v-if="$route.meta.tabbar">
      <van-tabbar-item
        replace
        to="/weixin"
        icon="home-o"
        class="tabbar-item"
      >
        微信
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/address"
        icon="friends-o"
        class="tabbar-item"
      >
        通讯录
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/friends"
        icon="browsing-history-o"
        class="tabbar-item"
      >
        发现
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/me"
        icon="user-o"
        class="tabbar-item"
      >
        我
      </van-tabbar-item>
    </van-tabbar>  
  </div>
</template>

<script>
import chatrecord from "./components/Chatrecord"

export default {
  name: 'App',
  data(){
    return {
      test: 'none',
      isRouterAlive:true,
      websocket: null,
      popup_show:false,
      popup_content:null,

      //用于检测是否断网，超时时间和2个定时器
      timeout: 1000,//过多久发送心跳 + 等多久心跳的回复
      timeoutObj: null,
      serverTimeoutObj: null,
    }
  },
  components:{
    chatrecord
  },
  computed:{
    flag: function(){
      return this.test
    }
  },
  created(){
    // this.test = 'none';
    let loginNickname = sessionStorage.getItem("loginNickname");
    this.createWebSocket(loginNickname);
  },
  beforeDestroy() {
    this.closeWebSocket();
  },
  provide(){
    return {
      reload: this.reload,
      send: this.send,
      closeWebSocket: this.closeWebSocket,
      createWebSocket: this.createWebSocket,
    }
  },
  methods:{
    reload(info){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    },
    //创建websocket，created时调用
    createWebSocket(nickname){
      console.log("--- createWebSocket ---");
      console.log(sessionStorage.getItem("login"))
      console.log(sessionStorage.getItem("loginNickname"));
      if ('WebSocket' in window && sessionStorage.getItem("login")) {
          this.websocket = new WebSocket('ws://127.0.0.1:8080/websocket/' + nickname);
          console.log("after new WebSocket");
          console.log(this.websocket);
          this.initWebSocket();
      } 
      else {
        console.log("createWebSocket失败，登录状态为： ");
        console.log(sessionStorage.getItem("login"))
        alert('当前浏览器 Not support websocket or 未登录');
      }
    },
    //websocket创建之后，初始化websocket
    initWebSocket() {
        //连接错误
        this.websocket.onerror = this.setErrorMessage
        // //连接成功
        this.websocket.onopen = this.setOnopenMessage
        //收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage_global_store
        //连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
        console.log("initWebSocket");
    },
    //websocket关闭时调用
    setOncloseMessage() {
        let data = "WebSocket连接关闭" + '   状态码：' + this.websocket.readyState;
        console.log("setOncloseMessage: " + data);
        let that = this;
        let timeout = 1000;
        setTimeout(()=>{
          that.reconnectWebsocket();
        }, timeout)
        
    },
    //onerror
    setErrorMessage() {
        let data = "WebSocket连接发生错误" + '   状态码：' + this.websocket.readyState;
        console.log("setErrorMessage: " + data);
    },
    //onopen
    setOnopenMessage() {
        let data = "WebSocket连接成功" + '   状态码：' + this.websocket.readyState;
        console.log("setOnopenMessage: " + data);
        //开始计时
        this.resetTimers();
    },
    //websocket消息接收函数，用store做消息缓存
    setOnmessageMessage_global_store(event) {
      //重置计时器
      this.resetTimers();
      // this.$nextTick(() =>{

      //先检查是不是心跳信息的回复
      if(event.data == "HeartBeat received."){
        console.log("===== HeartBeat received. ====== bom,bom,bom!");
      }
      else{
        console.log('服务端返回：');
        console.log(event.data);
      
        let rawData = event.data;
        let data = JSON.parse(rawData);
        let name = data.name;
        // let rawCache = sessionStorage.getItem("newMessageCache");
        let rawCache = this.$store.state.newMessageCache;

        //弹窗
        this.popup_onmessage(data);

        console.log("newMessageCache before: ");
        console.log(rawCache);
        if(rawCache){
          console.log("rawCache 存在");
          let cache = JSON.parse(rawCache)[name];
          if(cache){
          console.log(name + " 已经有未读消息了");
          cache.push(rawData);
          console.log(cache);
          }
          else{
          console.log(name + " 第一条未读消息");
          cache = [rawData];
          console.log(cache);
          }
          let tmpMessage = {};
          tmpMessage[name] = cache;
          // sessionStorage.setItem("newMessageCache", JSON.stringify(tmpMessage));
          this.$store.state.newMessageCache = JSON.stringify(tmpMessage);
          console.log("newMessageCache after: ");
          console.log(this.$store.state.newMessageCache);
        }
        else{
          console.log("rawCache 不存在");
          let tmpMessage = {};
          tmpMessage[name] = [rawData];
          // sessionStorage.setItem("newMessageCache", JSON.stringify(tmpMessage));
          this.$store.state.newMessageCache = JSON.stringify(tmpMessage);
          console.log("newMessageCache after: ");
          console.log(this.$store.state.newMessageCache);
        }
        console.log("newMessageCache over");
        // })
      }
    },
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    onbeforeunload() {
        // this.closeWebSocket();
        console.log("==== onbeforeunload ====");
    },
    //websocket发送聊天消息，发送心跳信息的函数在下面
    send(name, toName, data, chatimg) {
        console.log("===== send =====");
        console.log(this.$options.name);
        console.log(this.websocket);
        let record = this.makePackage(name, toName, data, chatimg);
        this.websocket.send(JSON.stringify(record));
        console.log('Send over: ' + name + ' => ' + toName);
        console.log('data: ' + data);
    },
    //websocket发送心跳信息
    sendHeartBeat(msg){
        this.websocket.send(msg);
    },
    //主动关闭websocket
    closeWebSocket() {
      console.log("=== closeWebSocket ===");
      this.websocket.close();
      console.log("after close websocket: ");
      console.log(this.websocket);
    },
    //接收到消息时调用，弹窗
    popup_onmessage(data){
        if(this.$route.path != '/chat/'+data['name']){
          this.popup_content = data;
          // this.popup_content["content"] = data["words"];
          this.popup_show = true;

          let name = data['name'];
          if(localStorage.getItem(name)){
            data["imgSrc"] = "../../static/headimg/" + JSON.parse(localStorage.getItem(name)).img;
          }
        }
        else{
          console.log("popup route path: ");
          console.log(this.$route.path);
          console.log("data['name']: ");
          console.log(data['name']);
        }
    },
    //点击弹窗
    clickPopup(){
      console.log("clickPopup");
      this.popup_show = false;
    },
    //弹窗打开后自动调用，延迟2秒后关闭
    openPopup(){
      var that = this;
      setTimeout(function(){
        that.popup_show = false;
        console.log("openPopup time out");
      }, 5000);
    },
    //重置计时器，收到消息时调用
    resetTimers: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
　　　　 this.startTimers();
    },
    //开始计时器，最开始在onopen中调用
    startTimers: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            self.sendHeartBeat("HeartBeat");
            self.serverTimeoutObj = setTimeout(function(){
                //如果onclose会执行reconnect，我们执行closeWebSocket()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                self.closeWebSocket();
            }, self.timeout)
        }, this.timeout)
    },
    reconnectWebsocket: function(){
        this.createWebSocket(sessionStorage.getItem("loginNickname"));
    },
    //打包函数，在发送websocket消息之前把数据打包
    makePackage(name, toName, data, chatimg){
        let img = '';
        if(name != 'me'){
            img = "../../static/headimg/" + JSON.parse(localStorage.getItem(name)).img;
        };
        return {
            "id":1,
            "name":name,
            "toName":toName,
            "words":data,
            "chatimg":chatimg,
            "time":new Date().toLocaleString(),
            // "time":new Date(),
            "table":'',
            "img":img
        }

    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:100%;
  padding: 0px;
  background: rgb(233, 232, 232);
}
.view{
  width:100%;
  height:auto;
  border:0px solid green;
  margin:0 auto;
  background: rgb(233, 232, 232);;
  margin-top:0px;
}
.top{
  width:100%; 
  height:8vh; 
  /* background: rgb(211, 210, 210); */
  background: black;
  color:white;
  text-align: left;
  font-size: 3vh;
  align-items: center;
  z-index:3;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  border-bottom:0;
}
.tabbar-class{
  height:10vh;
  background: white;
}
.tabbar-item{
  font-size: 2.5vh;
}
.head-img{
  height:100%;
  width:100%;
  border-radius:10px;
}
.popup{
  background: rgb(209, 207, 207);
  min-height:80px;
  width:90%;
  margin-bottom: 70px;
  margin-left:5%;
  margin-right:auto
}
</style>
