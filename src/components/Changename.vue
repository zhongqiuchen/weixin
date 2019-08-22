<template>
    <div class="changename">
        <van-cell title="单元格" icon="arrow-left" class="top" >
            <button
                slot="right-icon"
                name="submit"
                class="changename_submit_button"
                v-on:click="submit"
            >
            保存
            </button>
        </van-cell>
        <van-row class="changename_row_normal">
            <input class="changename_input" v-model="mynickname">
        </van-row>
        <van-row class="changename_hint changename_row_normal">好名字可以让你的朋友更容易记住你。</van-row>
        
    </div>
</template>

<script>
export default {
    name:"changename",
    data(){
        return {
            mynickname:"",
            oldName:"",
        }
    },
    created(){
        let name = sessionStorage.getItem("loginName");
        let nickname = sessionStorage.getItem("loginNickname");
        this.oldName = nickname;
        this.mynickname = nickname;
    },
    methods:{
        submit: function(event){
            let newNickname = this.mynickname;
            console.log("old name: " + this.oldName);
            console.log("new name: " + this.mynickname);

            this.$http({
                method: 'post',
                url:'/apis/change_nickname',
                params:{"oldName":this.oldName, "newName":newNickname}
            }).then((res)=>
            {
                let data = res.body;
                console.log("new info: ")//此处的res对象包含了json的文件信息和数据，我们需要的json数据存在于body属性中
                console.log(data);
                if(data){
                    sessionStorage.setItem("loginData", JSON.stringify(data));
                    localStorage.setItem("loginData", JSON.stringify(data));
                    sessionStorage.setItem("loginNickname", newNickname);
                    // alert("昵称修改成功");
                }
                else{
                    alert("昵称修改失败");
                }
                this.$router.push("/myinfo");
            })
        }
    }
    
}
</script>

<style>
.changename{
    
    text-align: left;
}
.changename_submit_button{
    background-color: rgb(85, 145, 85);
    border: 0;
}
.changename_row_normal{
    width:100%;
    margin-top: 3%;
}
.changename_input{
    width:100%;
    font-size: 20px;
    border:0;
    border-bottom: 1px solid green;
    outline:none;
    background-color: transparent;
}
.changename_hint{
    font-size: 3px;
}
</style>
