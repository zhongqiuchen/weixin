<template>
    <div class="recodrs1 test">
        <img class="portrait test" v-bind:src="imgSrc">
        <h1 class="id test">{{id}}</h1>
        <h2 class="content1 test">{{content}}</h2>
    </div>
</template>

<script>
export default {
    name: 'records1',
    data(){
        return {
            id: 'Helen',
            content: 'Hello, how are you88888888888888888888888888888888888888888888888?',
            imgSrc: require('../assets/头像1.png')
        }
    }
}
</script>

<style>
.test{
    background: white;
    border: 1px solid red;
    max-width:100%;
    max-height:100%;
}
.recodrs1{
    width: auto;
    height: auto;
    padding: 1px;
    font-size:10px;
    margin:5px;
}
.portrait{
    width: 20%;
    height: 80%;
    float: left;
    margin-top:2%;
}
.id{
    width: 60%;
    height: 10%;
    float: left;
    margin-top:2%;
    text-align:left;
}
.content1{
    width: 60%;
    height: 20%;
    float: left;
    margin-top:2%;
    text-align:left;
}
</style>
>



