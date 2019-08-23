<template>
    <div id="chat">
        <van-cell class='top' v-bind:title="this.$route.params.name" icon='arrow-left' to="/weixin"></van-cell>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <p>刷新次数: {{ count }}</p>
        
        <van-row class="chat-center" id="chatcenter">
            <ul id='ul' class="chat-ul">
                <li v-for="item in messageCache" v-bind:key='item.name'>
                    <recordsleft
                        v-bind:key="item.name"
                        v-bind:record="item" 
                        v-if="item.name != 'me'"
                    >
                    </recordsleft>
                    <recordsright
                        v-bind:key="item.name"
                        v-bind:record="item" 
                        v-if="item.name == 'me'"
                    >
                    </recordsright>
                </li>
            </ul>
        </van-row>
        </van-pull-refresh>
        
        <!-- <div class="chat-center">{{messageCache}}</div> -->
        <van-cell-group class="chat-bottom" id='input'>
            <van-field 
                v-model="message"
                left-icon="contact"
                type="textarea"
                placeholder="请输入留言"
                rows="2"
                autosize
                v-on:input="changeHeight"
                class="chat-input"
            >
            <template slot="button" >
                <van-button type="primary" size="small" v-on:click="submit">发送</van-button>
                
                <van-button type="primary" size="small" v-on:click="selectImg">图片</van-button>
                <input type="file" id="saveImage" name="myphoto">
               
            </template>
            
            </van-field>
        </van-cell-group>
    </div>
</template>
<script>
import Recordsleft from "./Recordsleft"
import Recordsright from "./Recordsright"
import { Toast } from 'vant'
import { Notify } from 'vant';

export default {
    name:'chat',
    props:[],
    data(){
        return {
            msg:'11111',
            items:[],
            curItem: [],
            message:'',
            scrollTop:0,
            chatImage:false,
            // websocket: null,
            count: 0,
            isLoading: false,
            numPerPage:20,
            num1:0,
            num2:0,
        }
    },
    inject:['createWebSocket','reload', 'send', 'closeWebSocket', 'setOnmessage', 'setOnmessageMessage'],
    components:{
        Recordsleft,Recordsright,Toast
    },
    watch:{
        items(){
            // this.scrollToBottom();
        }
    },
    computed:{
        showRecords:function(){
            return this.items;
        },
        messageCache:function(){
            console.log("------------------------------------------------------------------------------------------");
            console.log("chat中cache被触发！");
            let nickname = this.$route.params.name;
            // let newRecords = JSON.parse(sessionStorage.getItem("newMessageCache"));
            let newRecords = JSON.parse(this.$store.state.newMessageCache);
            console.log("newRecords: ");
            console.log(newRecords);

            if(newRecords){
                if(newRecords[nickname]){
                    console.log("newRecords + name 都存在");
                    console.log(newRecords[nickname]);
                    newRecords[nickname].forEach((item, index, arr) => {
                        console.log(item);
                        let newRec = JSON.parse(item);
                        console.log(item);
                        if(newRec.chatimg){
                            newRec.chatimg = "../../static/chatimg/" + newRec.chatimg;
                        }
                        this.items.push(newRec);
                    })
                    delete newRecords[nickname];
                    this.$store.state.newMessageCache = JSON.stringify(newRecords);
                    console.log("after remove");
                    console.log(this.$store.state.newMessageCache);
                }
                else{
                    console.log("newRecords 存在，name 不存在");
                    console.log(nickname);
                    console.log(newRecords);
                    console.log(newRecords[name]);
                }
            }
            else{
                console.log("newRecords + name 都不存在");
                console.log(newRecords);
            }
            console.log(this.items);
            console.log("------------------------------------------------------------------------------------------");
            return this.items;
        }
    },
    beforeDestroy() {
        // this.setOnmessage(this.setOnmessageMessage);
    },
    created(){
        //绑定键盘回车事件
        let that = this;
        document.onkeydown = function(e){
            let key = window.event.keyCode;
            if(key == 13){
                that.submit();
            }
        }

        console.log("chat created");
        this.count = 0;
        this.num1 = 0;
        let num1 = this.num1 * this.numPerPage;
        let num2 = this.numPerPage;
        let name = sessionStorage.getItem('loginName');
        let nickname = sessionStorage.getItem('loginNickname');
        let curName = this.$route.params.name;
        console.log('login name is: ' + name);

        this.$http({
            method: 'get',
            url:'/apis/select_records',
            params:{"userName":name,"toName":curName, "num1":num1, "num2":num2}
        }).then((res)=>
        {
            let records = res.body;
            let newRecords = [];
            this.num1++;
            // console.log(records);

            if(records == null){
                console.log("Get nothing!");
                return ;
            }
            else{
                //虽然读出来应该已经是有序的，不过还是按时间排个序
                records.sort(sortTime);
                records.forEach(element => {
                    if(element.name == curName && localStorage.getItem(element.name)){
                        element["img"] = "../../static/headimg/" + JSON.parse(localStorage.getItem(element.name)).img;
                        element["time"] = new Date(element["time"]).toLocaleString();
                        if(element["chatimg"]){
                            element["chatimg"] = "../../static/chatimg/" + element["chatimg"];
                        }
                        newRecords.push(element);
                    }
                    if(element.toName == curName && localStorage.getItem(element.toName)){
                        element["img"] = "../../static/headimg/" + JSON.parse(localStorage.getItem(element.toName)).img;
                        element["time"] = new Date(element["time"]).toLocaleString();
                        if(element["chatimg"]){
                            element["chatimg"] = "../../static/chatimg/" + element["chatimg"];
                        }
                        newRecords.push(element);
                    }

                })
                this.items = newRecords;
                this.scrollToBottom();
            }
        })
        
    },
    methods:{
        selectImg(){
            //模拟点击
            document.getElementById('saveImage').click();
            this.chatImage = true;
        },
        imageSubmit(){
            //处理/发送文件
            let _this=this
            let x = document.getElementById('saveImage').files[0];
            console.log(x);
            console.log(typeof(x))
            let params = new FormData() ; //创建一个form对象
            params.append('file',x,x.name);  //append 向form表单添加数据
            let imgName = x.name;
            let time = new Date().getTime();
            imgName = imgName.split('.')[0] + time + '.' +imgName.split('.')[1];

            params.append('fileName',imgName);  //append 向form表单添加数据
            //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
            let config = {headers:{'Content-Type':'multipart/form-data'}};
            //发起ajax请求存放在服务端
            let name = sessionStorage.getItem("loginName");
            let nickname = JSON.parse(sessionStorage.getItem("loginData")).nickname;
            let toName = this.$route.params.name;
            let data = "";
            this.send(nickname, toName, data, imgName);
            params.append('newRecord',data);
            params.append('toName',toName);
            params.append('name',nickname);
            params.append('chatimg',imgName);
            this.$http.post('/apis/add_new_img_record',params,config)
            .then(function(res){
                console.log(res);
                // console.log("执行顺序 ------   0  " + (new Date().getTime()));
                let result = res.body;
                if(result != 'fail'){
                    let newRecord = this.makePackage('me', toName, data, imgName);
                    if(newRecord.chatimg){
                        newRecord.chatimg = "../../static/chatimg/" + newRecord.chatimg;
                    }
                    console.log("new record: ");
                    console.log(newRecord);
                    // console.log("执行顺序 ------   5  " + (new Date().getTime()));
                    this.items.push(newRecord);
                    this.message = '';
                    this.scrollToBottom();
                    // this.reload();
                }
            })
            // console.log("执行顺序 ------   1  " + (new Date().getTime()));
            return imgName;
            
        },
        submit:function(){
            console.log("======================================= submit to backend ====================================")
            let chatimg = '';
            if(this.chatImage){
                chatimg = this.imageSubmit();
            }
            else
            {
                let data = this.message;
                if(!data && !chatimg){
                    console.log("Empty message");
                    Toast('Empty message');
                    return;
                }
                let name = sessionStorage.getItem("loginName");
                let nickname = JSON.parse(sessionStorage.getItem("loginData")).nickname;
                let toName = this.$route.params.name;
                console.log(nickname + " send data: ==" + data + "== to " + toName);

                //发送给websocket
                this.send(nickname, toName, data, chatimg);
                this.$http({
                    method:'POST',
                    url:'/apis/add_new_record',
                    params:{'newRecord':data, 'toName':toName, "name":nickname, "chatimg":chatimg},
                    heads : {'content-type' : 'application/x-www-form-urlencoded'}
                }).then((res) => {
                    console.log("response data: ");
                    console.log(res);
                    console.log("执行顺序 ------   4  " + (new Date().getTime()));
                    let result = res.body;

                    if(result){
                        let newRecord = this.makePackage('me', toName, data, chatimg);
                        if(newRecord.chatimg){
                            newRecord.chatimg = "../../static/chatimg/" + newRecord.chatimg;
                        }
                        console.log("new record: ");
                        console.log(newRecord);
                        // console.log("执行顺序 ------   5  " + (new Date().getTime()));
                        this.items.push(newRecord);
                        this.message = '';
                        this.scrollToBottom();
                        // this.reload();
                    }
                })
                
                this.chatImage = false
            }
        },

        onRefresh() {
            let that = this;
            setTimeout(() => {
                that.$toast('刷新成功');
                that.isLoading = false;
                that.count++;
                that.num1++;

                let name = sessionStorage.getItem('loginName');
                let nickname = sessionStorage.getItem('loginNickname');
                let curName = that.$route.params.name;
                console.log('login name is: ' + name);
                let num1 = that.num1 * that.numPerPage;
                let num2 = that.numPerPage;
                that.$http({
                    method: 'get',
                    url:'/apis/select_records',
                    params:{"userName":name,"toName":curName, "num1":num1, "num2":num2}
                }).then((res)=>
                {
                    let records = res.body;
                    // let curName = that.$route.params.name;
                    let newRecords = [];
                    console.log("records");
                    console.log(records);

                    if(records == null){
                        console.log("Get nothing!");
                        return ;
                    }
                    else{
                        //虽然读出来应该已经是有序的，不过还是按时间排个序
                        records.sort(sortTime);
                        console.log("after sort: ");
                        console.log(records);
                        records.forEach(element => {
                            if(element.name == curName && localStorage.getItem(element.name)){
                                element["img"] = "../../static/headimg/" + JSON.parse(localStorage.getItem(element.name)).img;
                                element["time"] = new Date(element["time"]).toLocaleString();
                                if(element["chatimg"]){
                                    element["chatimg"] = "../../static/chatimg/" + element["chatimg"];
                                }
                                newRecords.push(element);
                            }
                            if(element.toName == curName && localStorage.getItem(element.toName)){
                                element["img"] = "../../static/headimg/" + JSON.parse(localStorage.getItem(element.toName)).img;
                                element["time"] = new Date(element["time"]).toLocaleString();
                                if(element["chatimg"]){
                                    element["chatimg"] = "../../static/chatimg/" + element["chatimg"];
                                }
                                newRecords.push(element);
                            }

                        })
                        console.log("newRecords: ");
                        console.log(newRecords);
                        that.items = newRecords.concat(that.items);
                        console.log("that.items: ");
                        console.log(that.items);
                        // that.scrollToBottom();
                    }
                })
            }, 500);
        },


        scrollToBottom: function () {
            this.$nextTick(() => {
                    let div = document.getElementById('ul');
                    let input = document.getElementById('input');
                    console.log("div.scrollHeight: " + div.scrollHeight);
                    console.log("input.scrollHeight: " + input.scrollHeight);
                    document.documentElement.scrollTop = div.scrollHeight;
            })
        },
        changeHeight: function(){
            let div = document.getElementById('chatcenter');
            let input = document.getElementById('input');
            div.style.marginBottom = (input.scrollHeight).toString() + "px";
            this.scrollToBottom();
            console.log(div.style.marginBottom);
            // document.documentElement.scrollTop = div.scrollHeight;
        },
        setOnmessageChat(event) {
            this.$nextTick(() =>{
                console.log('服务端返回：');
                console.log(event.data);
                let data = JSON.parse(event.data);
                // console.log(data);
                if(data.chatimg){
                    data.chatimg = "../../static/chatimg/" + data.chatimg;
                }
                this.items.push(data);
                this.scrollToBottom();
            })
        },

        makePackage(name, toName, data, chatimg){
            let img = '';
            if(name != 'me' && localStorage.getItem(name)){
                img = "../../static/headimg/" + JSON.parse(localStorage.getItem(name)).img;
            }
            
            return {
                "id":1,
                "name":name,
                "toName":toName,
                "words":data,
                "chatimg":chatimg,
                "time":new Date().toLocaleString(),
                "table":'',
                "img":img
            }

        }

    }
    
}
function sortTime(a, b){
  //按时间顺序zheng向排列
  let result = 0;
  if(a.time > b.time){
    result = 1;
  }
  else{
    if(a.time < b.time){
      result = -1;
    }
    else{
      result = 0;
    }
  }
  return result;
}
</script>

<style>
.chat{
    height:auto;
}
.chat-center{
    height:auto; 
    margin-bottom:68px;
    
}
.chat-ul{
    margin-bottom: 10px;
}
.chat-bottom{
    height:auto;
    width:100%;
    /* display:flex;
    align-items: center; */
    /* z-index: 3; */
    bottom: 0;
    left: 0;
    position:fixed
}
#saveImage{
    display: none;
}
</style>
