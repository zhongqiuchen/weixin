import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store(
    {
        state:{
            myname:"仲秋晨",
            img:require('../../static/img/风景.png'),
            id:"8899",
            nickname:"仲秋晨",
            user:"",
            pwd:"",
            people:{},
            newMessageCache:null,//新消息来时，先在该变量里面缓存。如果当时在chat页面，则判断是否是该chat；如果不在，则发出提醒，weixin页面显示红点
            popup_show:true,
            popup_content:"内容"
        },
        getters:{
            getName: function(state){
                return state.myname;
            },
            getNickName: function(state){
                return state.nickname;
            },
            getId: function(state){
                return state.id;
            },
            getImg: function(state){
                return state.img;
            },
            getPeople: function(state){
                return state.people;
            }
        },
        mutations:{
            changeName: function(state, newName){
                state.myname = newName;
            },
            changeNickName: function(state, newNickName){
                state.nickname = newNickName;
                console.log("changeNickName: " + newNickName);
            },
            changePeople:function(state, newPeople){
                state.people = newPeople;
                console.log("change people");
            }
        },
        actions:{
            changeNameFun: function(context, newName){
                context.commit(changeName, newName);
            },
            changeNickNameFun: function(context, newNickName){
                context.commit(changeNickName, newNickName);
                console.log("changeNickNameFun: " + newNickName);
            },
        }
    }
);
 
export default store;