<template>
  <div class="weixin">
    
    <chatrecord 
      v-for="record in records" 
      v-bind:key="record.name"
      v-bind:record ="record">
    </chatrecord>

  </div>
</template>

<script>
import Records2 from "./Records2"
import chatrecord from "./Chatrecord"

export default {
  name: 'weixin',
  data () {
    return {
      msg: 'Weixin',
      output:'',
      records:[],
    }
  },
  inject:['createWebSocket'],
  components:{
    Records2,chatrecord
  },
  created(){
    console.log("weixin created");
    let name = sessionStorage.getItem("loginName");
    this.$http({
        method: 'get',
        url:'/apis/weixin',
        params:{userName:name}
    }).then((res)=>
    {
        console.log("--- in weixin ---");
        let records = res.body;
        
        console.log(res);

        if(records == null){
          console.log("Get nothing!");
          return ;
        }
        else{
          // console.log("排序前: ");
          // console.log(records);

          let peopleList = [];//用户列表
          let lastWords = {};//用户说的最后一句话，用于显示

          //虽然读出来应该已经是有序的，不过还是按时间排个序
          records.sort(sortTimeReverse);
          // console.log("排序后: ");
          // console.log(records);

          records.forEach(element => {
            if(!peopleList.includes(element.name) && element.name!="me"){
              peopleList.push(element.name);
              if(element.chatimg){
                element['words'] = "[图片]"
                // lastWords[element.name] = element;
              }
              else{
                // lastWords[element.name] = element;
              }
              lastWords[element.name] = element;
            }
            if(!peopleList.includes(element.toName) && element.toName!="me"){
              peopleList.push(element.toName);
              if(element.chatimg){
                element['words'] = "[图片]";
                // lastWords[element.toName] = element;
              }
              else{
                // lastWords[element.toName] = element;
              }
              element.name = element.toName;
              lastWords[element.toName] = element;
            }
          });

          console.log(peopleList);
          console.log(lastWords);
          // console.log(JSON.parse(localStorage.getItem("Nancy")));

          let newRecords = [];
          peopleList.forEach(element => {
            let tmpRecord = lastWords[element];
            if(localStorage.getItem(element)){
              tmpRecord["imgSrc"] = "../../static/headimg/" + JSON.parse(localStorage.getItem(element)).img;
            }
            else{
              console.log("element: " + element + "not exist");
            }
            tmpRecord['time'] = new Date(tmpRecord['time']).toLocaleString();
            newRecords.push(tmpRecord);
            
          })
          this.records = newRecords;
          console.log(this.records);
        }
    })
    .then(()=>{

    })
  },
  methods:{
    
  }
}
function sortTimeReverse(a, b){
  //按时间顺序反向排列
  let result = 0;
  if(a.time > b.time){
    result = -1;
  }
  else{
    if(a.time < b.time){
      result = 1;
    }
    else{
      result = 0;
    }
  }
  return result;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test{
    
    border: 1px solid red;
}
.weixin{
  background: rgb(209, 207, 207);
  height: 100%;
  width:100%;
  margin-bottom: 70px;
}
</style>
