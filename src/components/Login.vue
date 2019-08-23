<template>
    <div class="login">

        <img class="login_img_con" v-bind:src="img">
        <van-cell class="login_cell" icon="user-o">
            <input class="login_input" v-model="user" slot="title" placeholder="请输入微信号">
        </van-cell>

        <van-cell class="login_cell" icon="lock">
            <input class="login_input" v-model="pwd" slot="title" placeholder="请输入密码" type="password">
        </van-cell>

        <van-cell class="login_button" title="提交" v-on:click="submitToToken"></van-cell>
    </div>
</template>

<script>
export default {
    name:"login",
    data(){
        return {
            user:"",
            pwd:"",
            img:"",
            loginData:null
        }
    },
    inject:['createWebSocket'],
    created(){
        //绑定键盘回车事件
        let that = this;
        document.onkeydown = function(e){
            let key = window.event.keyCode;
            if(key == 13){
                that.submitToToken();
            }
        }

        let data = JSON.parse(localStorage.getItem("loginData"));
        if(data != undefined){
            console.log("load img succeed");
            this.img = localStorage.getItem("userImg-" + data['name']);
            console.log("img: " + data['name']);
        }
        else{
            console.log("load img fail");
            this.img = "../../static/img/empty.jpg";
        }

        //登陆之前确保websocket关闭，缓存清空
        sessionStorage.clear();
        localStorage.clear();
        this.closeWebSocket();
        this.$router.go(0);
        
    },
    methods:{
        submit: function(){        
            window.console.log("login created!");
            this.$http({
                method: 'post',
                url:'/apis/user',
                params: {
                    username:this.user, 
                    password:this.pwd
                }
            }).then((res)=>
            {
                let data = res.body;
                this.loginData = data;
                console.log(this.user+ ", "+ this.pwd);
                console.log("response: ");
                console.log(res.data);

                if(data == false){
                    alert("错误的用户名或密码！");
                    sessionStorage.clear();
                    
                    this.user = "";
                    this.pwd = "";
                    console.log("login fail...");
                }
                else{
                    //将当前登陆的用户信息保存在session中
                    sessionStorage.setItem("login",true);
                    sessionStorage.setItem("loginName",this.user);
                    // sessionStorage.setItem("userImg",this.user.img);
                    // sessionStorage.setItem("loginId",data.id);
                    sessionStorage.setItem("loginNickname",data.nickname);
                    // sessionStorage.setItem("loginArea",data.area);
                    // sessionStorage.setItem("loginImg",data.img);
                    sessionStorage.setItem("loginData",JSON.stringify(data));
                    localStorage.setItem("loginData",JSON.stringify(data));
                    //创建websocket
                    this.createWebSocket(data.nickname);
                    this.$router.push({'path':'/weixin'});
                    console.log("login success!");
                    // localStorage.setItem("Helen", JSON.stringify({"name":"Helen"}));

                    //将头像存入localstorage
                    this.$http({
                        method: 'get',
                        url:"/apis/get_head_img",
                        params:{imgName:data.img}
                    }).then((res)=>
                    {
                        let imgData = res.bodyText;
                        console.log(imgData);
                        localStorage.setItem("userImg-" + this.user, imgData);
                    })

                    
                    this.$http({
                        method: 'get',
                        url:'/apis/people'
                    }).then((res)=>
                    {
                        let peopleData = res.body;
                        if(peopleData){
                            peopleData.forEach(element => {
                                localStorage.setItem(element.nickname, JSON.stringify(element));
                            });
                        } 
                    })
                }
                console.log("loginL "+this.$store.state.login);
            })
        },

        submitToToken: function(){
            window.console.log("login created!");
            this.$http({
                method: 'post',
                url:'/apis/login_with_token',
                params: {
                    username:this.user, 
                    password:this.pwd
                }
            }).then((res)=>
            {
                let resData = res.body;
                this.loginData = resData;
                // console.log(this.user+ ", "+ this.pwd);
                // console.log("response: ");
                // console.log(res.data);

                if(resData == false){
                    alert("错误的用户名或密码！");
                    sessionStorage.clear();
                    
                    this.user = "";
                    this.pwd = "";
                    console.log("login fail...");
                }
                else{
                    let data = resData.user_info;
                    let token = resData.token.token;
                    // console.log(data);
                    // console.log(token);
                    //将token保存在localstorage中
                    localStorage.setItem("loginToken", token);
                    localStorage.setItem("loginTokenTime", new Date().getTime());

                    //将当前登陆的用户信息保存在session中
                    sessionStorage.setItem("login",true);
                    sessionStorage.setItem("loginName",this.user);
                    // sessionStorage.setItem("userImg",this.user.img);
                    // sessionStorage.setItem("loginId",data.id);
                    sessionStorage.setItem("loginNickname",data.nickname);
                    // sessionStorage.setItem("loginArea",data.area);
                    // sessionStorage.setItem("loginImg",data.img);
                    sessionStorage.setItem("loginData",JSON.stringify(data));
                    localStorage.setItem("loginData",JSON.stringify(data));
                    this.createWebSocket(data.nickname);
                    this.$router.push({'path':'/weixin'});
                    console.log("login success!");
                    // localStorage.setItem("Helen", JSON.stringify({"name":"Helen"}));

                    //将头像存入localstorage
                    this.$http({
                        method: 'get',
                        url:"/apis/get_head_img",
                        params:{username:this.user}
                    }).then((res)=>
                    {
                        let imgName = res.bodyText;
                        console.log(imgName);
                        localStorage.setItem("userImg-" + this.user, "../../static/headimg/" + imgName);
                    })

                    
                    this.$http({
                        method: 'get',
                        url:'/apis/people'
                    }).then((res)=>
                    {
                        let peopleData = res.body;
                        if(peopleData){
                            peopleData.forEach(element => {
                                localStorage.setItem(element.nickname, JSON.stringify(element));
                            });
                        } 
                    })
                }
                console.log("loginL "+this.$store.state.login);
            })
        }
    }
    
}
function isHasImg(pathImg){
    var ImgObj = new Image();
    ImgObj.src = pathImg;
     if(ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)){
        return true;
     } 
     else {
        return false;
    }
}
function getImg(imgName){
    let localImg = "../../static/headimg/" + imgName;
    let backImg = "/apis/get_head_img/" + imgName;
    let emptyImg = "../../static/img/empty.jpg";
    if(isHasImg(localImg)){
        return localImg;
        console.log("local img exist: " + imgName);
    }
    else{
        if(isHasImg(backImg))
        {
            return backImg;
            console.log("back img exist: " + imgName);
        }
        else{
            return emptyImg;
            console.log("local img not exist: " + imgName);
        } 
    }
}
</script>

<style>
.login{
    width:100%;
    min-height:700px;
    float:center;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url("../../static/img/风景背景.jpeg");
    margin-top: 0;
}
.login_img_con{
    margin:10px auto;
    background: white;
    width: 80px;
    height:80px;
    border:none;
    border-radius: 10px;
}
.login_cell{
    width:80%;
    height:40px;
    display:flex;
    align-items: center;
    font-size:70%;
    background-color: transparent;
}
.login_input{
    width:100%;
    height:100%;
    border:0;
    outline:none;
    /* border-bottom: 1px solid green; */
    background-color: transparent;
    margin-left: 5px;
}
.login_button{
    margin-top:3%;
    width:80%;
    height:auto;
    background: rgb(119, 219, 119);
}
</style>

