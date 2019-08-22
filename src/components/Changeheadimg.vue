<template>
    <div class="changeheadimg">
        <van-cell icon="arrow-left" class="top" to='myinfo'/>
        <van-cell title='请选择新的的头像' is-link class="changeheadimg-cell">
            <van-uploader :after-read="afterRead2" v-model="fileList" multiple :max-count="1" :max-size="1000000" slot="right-icon" />
        </van-cell>
        <van-cell title="提交" to='myinfo' v-on:click="submitImg"></van-cell>
    </div>
</template>

<script>
export default {
    name:"changeheadimg",
    data(){
        return {
            fileList: [],
            imgContent:"",
        }
    },
    methods: {
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            let userName = sessionStorage.getItem("loginName");
            this.$http({
            method: 'post',
            url:'/apis/upload_head_img',
            params:{content:file.content, fileName:file.file.name, name: userName}
            }).then((res)=>
            {
                let img = res.bodyText;
                let name = sessionStorage.getItem("loginName");
                console.log(img);

                if(img != null && img != undefined && img !='fail'){
                    this.imgContent = file.content;
                    localStorage.setItem("userImg-" + name, file.content);
                    console.log("change img success!");
                }
            })
        },
        afterRead2(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            // let x = new Blob([file.file]);
            let x = file.file;
            let params = new FormData() ; //创建一个form对象
            params.append('file',x,x.name);  //append 向form表单添加数据
            let imgName = x.name;
            let time = new Date().getTime();
            imgName = imgName.split('.')[0] + time + '.' +imgName.split('.')[1];

            params.append('fileName',imgName);  //append 向form表单添加数据
            //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
            let config = {headers:{'Content-Type':'multipart/form-data'}};
            //发起ajax请求存放在服务端
            this.$http.post('/apis/update_head_img',params,config)
            .then(function(res){
                console.log("res: ")
                console.log(res);
                let newHeaderImg = res.bodyText;
                let name = sessionStorage.getItem("loginName");
                localStorage.setItem("userImg-" + name, "../../static/headimg/" + imgName);

                // console.log("执行顺序 ------   0  " + (new Date().getTime()));
            })
            // console.log("执行顺序 ------   1  " + (new Date().getTime()));
            return imgName;
        },
  }

}
</script>

<style>
.changeheadimg-cell{
    font-size: 20px;
    display: flex;
    align-items: center;
}
</style>
