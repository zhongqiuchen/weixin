<template>
    <div id="myinfo">
        <van-cell class='top' title="个人信息" icon='arrow-left' to='/me'></van-cell>
        <van-cell class="myinfo_cell_img" title="头像" is-link to='/changeimg'>
            <template slot="right-icon">
                <van-image 
                width="60"
                height="60"
                v-bind:src="myInfo.img"
                ></van-image>
                <van-icon name="arrow"></van-icon>
            </template>
        </van-cell>
        <van-cell class="myinfo_cell_left" size="large" title="昵称" v-bind:value="myInfo.nickname" is-link to="/changename"/>
        <van-cell class="myinfo_cell_left" size="large" title="微信号" v-bind:value="myInfo.id"/>
        <van-cell class="myinfo_cell_left" size="large" title="二维码名片" is-link />
        <van-cell class="myinfo_cell_left" size="large" title='更多' is-link/>
        <van-cell class="myinfo_cell_left" size="large" title='我的地址' is-link/>
        
    </div>
</template>

<script>
export default {
    name:'myinfo',
    data(){
        return {
            myInfo:{},
            
        }
    },
    created(){
        //方法一，从后台取，太慢
        //方法二，login时把数据存入缓存，me和myinfo直接从缓存读即可
        console.log('Me created');
        let name = sessionStorage.getItem("loginName");
        let nickname = sessionStorage.getItem("loginNickname");
        this.myInfo.nickname = nickname;
        // this.myInfo.img = "http://localhost:8080/get_head_img/" + this.myInfo.img;
        this.myInfo.img = localStorage.getItem("userImg-" + name);
    }  
} 
</script>

<style>
.myinfo_cell_img{
    text-align: left;
    background: white;
    display: flex;
    align-items: center;
}
.myinfo_cell_left{
    text-align: left;
}
.myinfo_cell_right{
    float: right;
    text-align:right;
}
</style>
