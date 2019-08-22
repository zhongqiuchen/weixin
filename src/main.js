// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueResource from 'vue-resource'
import store from './store'

Vue.use(Vant);
Vue.config.productionTip = false;
Vue.use(VueResource);

// 通过session检测登录
// router.beforeEach(function (to, from, next) {
//   let login = sessionStorage.getItem("login");
//   // // console.log("beforeEach login: "+login);

//   if (login != "true" && to.path != '/login') {
//     next('/login');
//   } else {
//     next();
//   }
// });

// 通过token检测登录
router.beforeEach(function (to, from, next) {
  let token = localStorage.getItem("loginToken");
  if(!token  && to.path != '/login'){
    // // console.log("NO TOKEN");
    next('/login');
  } else {
    // // console.log("***** TOKEN -> " + token + " ****");
    next();
  }
});

Vue.http.interceptors.push((request, next) => {
  let token = localStorage.getItem("loginToken");
  let name = sessionStorage.getItem("loginName");
  // console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ interceptors: /////////////////////////////////////////////");
  // console.log(request.url);
  if(token){
    // console.log("token存在，添加token：");
    // console.log(token);
    request.headers.set('token',token);
  }
  else{
    // console.log("token不存在");
  }
  // console.log("request over: ");
  // console.log(request);
  //在响应之后传给then之前对response进行修改和逻辑判断。对于session已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
　next((response) => {
    // console.log("|||||||||||||||||||||||| response |||||||||||||||||||||||||||||||||||||");
    // console.log(request.url);
    // console.log(response.url);
    if(response.status === 200) {
      //处理请求成功的逻辑
      // console.log("response.status === 200");
      let data = response.body;
      if(data && data["code"] == 406)
      {
        // console.log("=== update yoken ===")
        // console.log(data);
        // console.log(data.new_token);
        let newToken = data.new_token;
        // console.log("new token : " + newToken);
        localStorage.setItem("loginToken", newToken);

        //重新发送请求
        request.headers.set('token',newToken);
        // console.log("request 2: ");
        // console.log(request);
        return Vue.http(request).then((res)=>
        {
          // console.log("重发成功");
          // console.log("request 3: ");
          // console.log(request);
          // console.log("重发结束");
          return res;
        })
      }
      if(data && data["code"] > 400 && data["code"] != 406)
      {
        // console.log("出错了'");
        // console.log(data);
        router.push('/login');
        
        sessionStorage.clear();
        localStorage.clear();
        this.closeWebSocket();
        this.$router.go(0);
      }
      else{
        // console.log("意外情况出现");
        // console.log(data);
      }
      return response // 必须返回，后面的接口的then，才能获取response
    }  
    else { 
      if (response.status >= 500) {
        // console.log("response.status >= 500");
        router.push('/login');
        // 错误处理
      } else if (response.status === 404) {
        // console.log("response.status === 404");
        router.push('/login');
      }
      return reponse // 必须返回
    }
  });

});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


