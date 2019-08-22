<template>
  <div class="address">

    <van-cell title="新的朋友" icon="../../static/img/新的朋友.png" size="large"/>
    <van-cell title="群聊" icon="../../static/img/群聊.png" size="large"/>
    <van-cell title="标签" icon="../../static/img/标签.png" size="large"/>
    <van-cell title="公众号" icon="../../static/img/公众号.png" size="large"/>
    
    <van-index-bar :index-list="indexList">
      <div v-for="(values,key) in letters" v-bind:key="key" >
        <!-- <van-index-anchor v-bind:index="key"/> -->
        <van-index-anchor v-bind:index="key">{{key}}</van-index-anchor>
        <van-cell 
          v-for="value in values" 
          v-bind:key="value" 
          v-bind:title="value" 
          v-bind:icon="people[value].img" 
          v-bind:to="'/card/'+value"
          size="large"
        >
          <span slot="title" class="cell-large">{{value}}</span>
          <img slot="icon" class="icon-large" v-bind:src="people[value].img" >
        </van-cell>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
function sortName(a,b){  
  let name_a = a.name.toLowerCase();
  let name_b = b.name.toLowerCase();

  if(name_a > name_b){
    return 1;
  }
  else{
    if(name_a < name_b){
      return -1;
    }
    else{
      return 0;
    }
  }
}

export default {
  name: 'Address',
  data () {
    return {
      msg: 'Address',
      titles:["Helen", "Nancy", "Jack", "Tom", "Jerry"],
      letters:{},
      people:{},
      indexList:[]
    }
  },
  created(){
    let peopleData = {};
    this.$http({
                method: 'get',
                url:'/apis/people'
            }).then((res)=>
    {
        peopleData = res.body;

        if(peopleData == null){
          console.log("Get nothing!");
          return ;
        }

        peopleData.sort(sortName);
        // console.log(peopleData.slice(0,10));
  
        //排序
        let newkey = peopleData.map(function(v){return v.name;});;
        console.log(newkey);

        let newObj = {};//创建一个新的对象，用于存放排好序的键值对
        let letters = [];
        let lettersObj = {};
        for (let i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = peopleData[i];//向新创建的对象中按照排好的顺序依次增加键值对
            peopleData[i].img = "../../static/headimg/" + peopleData[i].img;
            let firstLetter = newkey[i].substr(0,1);
            firstLetter = firstLetter.toUpperCase();
            if(!letters.includes(firstLetter)){
              letters.push(firstLetter);
              lettersObj[firstLetter] = [newkey[i]];
            }
            else{
              lettersObj[firstLetter].push(newkey[i]);
            }
        }
        this.letters = lettersObj;
        this.people = newObj;
        this.indexList = letters;

        this.$store.commit("changePeople", newObj);
        // sessionStorage.setItem("people", newObj);
        
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address{
  margin-bottom: 70px;
  text-align: left;
}
.background{
  background: grey;
}
.cell-large{
  display: flex;
  align-items: center;
  height:3vh;
  font-size: 2.4vh;
  margin-left: 8px;
}
.icon-large{
  width:3vh;
  height:3vh;
}
</style>
