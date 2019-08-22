<template>
<!-- 本组件用于下拉刷新的测试 -->
    <div class="test">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
              <van-cell 
              class="test_cell" 
              v-for="item in peopleShow" 
              v-bind:key="item.nickname" 
              icon="user-o" 
              v-bind:title="item.nickname" 
              >
            </van-cell>
          </van-list> 
        </van-pull-refresh>

    </div>
</template>

<script>
//本组件用于下拉刷新的测试
function chunk(arr, size) {

  var arr2=[];
  for(var i=0;i<arr.length;i=i+size){
    arr2.push(arr.slice(i,i+size));
  }
  return arr2;
}

export default {
    name:"test",
        data() {
            return {
            peopleShow:[],
            peopleList: [],//用于存放加载的数据
            totalPage: 0,
            pageNumber: 0,
            numPerPage:20,
            loading: false,//控制上拉加载的加载动画
            finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
            isLoading: false,//控制下拉刷新的加载动画
        }
    },
    created(){
      console.log("create start!");
      // init();
      console.log("init start!");
        let peopleData = {};
        this.$http.get('static/people.json').then(res => {
          peopleData = res.body;

          let count = 0;
          let peopleArr = []
          for(let people in peopleData){
            count = count + 1;
            peopleArr.push(people);
          }

          if(count <= this.numPerPage){
            this.totalPage = 1;
          }
          else{
            this.totalPage = Math.ceil(count/this.numPerPage);
          }
          this.pageNumber = 1;
          this.peopleList = chunk(peopleArr,this.numPerPage);
          this.peopleShow = this.peopleList[this.pageNumber-1];
          this.isLoading = false;

          console.log("totalPage: " + this.totalPage);
          console.log("pageNumber: " + this.pageNumber);
          console.log("totalPage: " + this.totalPage);
          console.log("peopleList: ");
          console.log(this.peopleList);
          console.log("peopleShow: ");
          console.log(this.peopleShow);
        })
    },
    methods: {
      init(){
        console.log("init start!");
        let peopleData = {};
        this.$http.get('static/people.json').then(res => {
          peopleData = res.body;
          this.items = peopleData;

          let count = 0;
          let peopleArr = []
          for(let people in peopleData){
            count = count + 1;
            peopleArr.push(people);
          }

          if(count <= this.numPerPage){
            this.totalPage = 1;
          }
          else{
            this.totalPage = Math.ceil(count/this.numPerPage);
          }
          this.pageNumber = 1;
          this.peopleList = chunk(peopleArr,count);
          this.peopleShow = this.peopleList[this.pageNumber-1];
          this.isLoading = false;

          console.log("totalPage: " + this.totalPage);
          console.log("pageNumber: " + this.pageNumber);
          console.log("totalPage: " + this.totalPage);
          // console.log(this.peopleList);
          console.log(this.peopleShow);
          
        })
      },
        //下拉刷新
        onRefresh() {
            let self = this;
            setTimeout(() => {
              console.log("onRefresh start!");
              self.init();
            }, 500);
        },
        //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
        onLoad() {
            let self = this;
            setTimeout(() => {
                // alert("onLoad");
                this.loading = false;

                this.pageNumber++;
                this.peopleShow = this.peopleShow.concat(this.peopleList[this.pageNumber-1]);

                if(this.pageNumber == this.totalPage){
                  this.finished = true;
                }

            }, 500);
        }
    }
}
</script>

<style>
.test_cell{
  height:100px;
}
</style>
