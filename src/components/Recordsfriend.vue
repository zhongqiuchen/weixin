<template>
    <van-row class="recordsfriend">
        <van-col class='recordsfriend_col1' span=3>
            <img class="head-img" v-bind:src="record.imgSrc">
        </van-col>
        <van-col class='recordsfriend-col2 angle-box-left' offset=1>
            <van-row class='recordsfriend_name'>{{record.name}}</van-row>
            <!-- <van-row class='recordsfriend_content'>{{record.id}}</van-row> -->
            <van-row class='recordsfriend_content'>{{record.content}}</van-row>
            <van-row class='recordsfriend_friendimgs' v-if="record.friendImgs != '' && record.friendImgs != null">
                <van-image
                width="100%"
                height="100%"
                v-bind:src="record.friendImgs"
                />
            </van-row>
        </van-col>
    </van-row>
</template>

<script>
export default {
    name: 'recordsfriend',
    props:[
        'record'
    ],
    data(){
        return {
        }
    },
    methods:{
        
    },

}
</script>

<style>
.test{
    background: white;
    border: 1px solid red;
    max-width:100%;
    max-height:100%;
}
.recordsfriend{
    min-height:10vh;
    max-width: 100%;
    background: white;
    border: 0px solid black;
    padding:5px;
    border-bottom: 1px solid  rgba(200,200,200,0.5);
    border-bottom: 1px solid  rgba(200,200,200,0.5);
    word-wrap: break-word;
    white-space:normal;
    text-align: left;
    border-radius: 5px;
    font-size: 1.1rem;
    overflow:hidden;
    /* display: flex;
    align-items: center; */
    /*自动换行必须设置为block，因为word-wrap在行内元素不生效*/
    display:block;
    line-height:38px;
    
}
.recordsfriend_col1{
    max-width:30%;
    margin-top:0.5rem;
}
.recordsfriend_col2{
    max-width:70%;
}
.recordsfriend_info{
    /* margin-top: 10px; */
    margin-bottom: 0.5rem;
    max-width: 80%;
    word-wrap: break-word;
}
.recordsfriend_name{
  font-size: 1.1rem;
}
.recordsfriend_content{
  font-size: 0.9rem;
  word-wrap: break-word;
}
</style>
>



