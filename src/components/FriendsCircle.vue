<template>
    <div id="friendscircle">
        <van-cell class='top' icon='arrow-left' to="/friends"></van-cell>
        <van-row class="myicon">
            <van-col class='myimg' span=5 offset=1>
                <img class="head-img" v-bind:src="img">
            </van-col>

            <van-col class='myname' >
                <van-row>{{name}}</van-row>
            </van-col>
        </van-row>

        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <van-cell slot="loading" class="loading" title="加载中..."></van-cell>
            <recordsfriend
            v-for="record in friendsShow" 
            v-bind:key="record.name"
            v-bind:record ="record"
            >
            </recordsfriend>
        </van-list> 
    </div>
</template>

<script>
import Recordsfriend from "./Recordsfriend"

export default {
    name:'friendscircle',
    data(){
        return {
            count:0,
            isLoading:false,
            records:[],

            friendsShow:[],
            friendsList: [],//用于存放加载的数据
            // totalPage: 0,
            pageNumber: 0,
            numPerPage:20,
            loading: false,//控制上拉加载的加载动画
            finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
            isLoading: false,//控制下拉刷新的加载动画

            img:"",
            name:"",

            count:0
        }
    },
    components:{
        Recordsfriend
    },
    created(){
        console.log("create start!");
        let name = sessionStorage.getItem("loginName");
        this.pageNumber = 0;
        this.img = localStorage.getItem("userImg-" + name);
        this.name = sessionStorage.getItem("loginNickname");
    },
    methods:{
        //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
        onLoad() {
            console.log("=============================================== onLoad " + this.pageNumber + "==============================");
            let self = this;
            setTimeout(() => {
                // alert("onLoad");
                this.loading = false;

                let num1 = this.numPerPage*this.pageNumber;
                let num2 = this.numPerPage;

                this.$http({
                    method: 'get',
                    url:'/apis/friends',
                    params:{"num1":num1, "num2":num2}
                }).then((res)=>
                {
                    let data = res.body;
                    
                    if(data == false){
                        this.finished = true;
                        console.log("data == null");
                    }
                    else{
                        // console.log("newPages: ");
                        // console.log(data);
                        // console.log("size: ");
                        // console.log(data.length);
                        data.forEach(element => {
                            element["imgSrc"] = "../../static/headimg/" + JSON.parse(localStorage.getItem(element.name)).img;
                            if(element["friendImgs"]){
                                element["friendImgs"] = "../../static/friendimg/" + element["friendImgs"];
                            }
                            // console.log(element);
                            // console.log("element[img]: ");
                            // console.log(element["imgSrc"]);
                            // console.log(JSON.parse(localStorage.getItem(element.name)).img);
                        })
                        this.friendsShow = this.friendsShow.concat(data);
                        this.pageNumber++;
                    }
                })

            }, 500);
        }
    },
    
    
}

function chunk(arr, size) {

  var arr2=[];
  for(var i=0;i<arr.length;i=i+size){
    arr2.push(arr.slice(i,i+size));
  }
  return arr2;
}


</script>

<style>
.test{
    
    border: 1px solid red;
}
.friendscircle{
  background: rgb(209, 207, 207);
  height: 100%;
}
.myicon{
    width:100%;
    height:250px;
    background-image: url('../../static/img/黑色磨砂.jpg');
    background-position: top;
    background-size: 100% 80%;
    background-repeat:repeat-x;
    background-color: white;
    display:flex;
    flex-direction: row-reverse;
    align-items: flex-end;
}
.myimg{
  max-width:30%;
  font-size: 18px;
}
.myname{
  max-width:70%;
  min-height:85px;
  color: white;
}
.loading{
    width:100%;
}
</style>

