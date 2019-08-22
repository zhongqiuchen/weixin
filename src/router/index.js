import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Weixin from '@/components/Weixin'
import Address from '@/components/Address'
import Friends from '@/components/Friends'
import Me from '@/components/Me'
import Chat from '@/components/Chat'
import Card from '@/components/Card'
import FriendsCircle from "@/components/FriendsCircle"
import Myinfo from "@/components/Myinfo"
import Changename from "@/components/Changename"
import Login from "@/components/Login"
import Test from "@/components/Test"
import Back from "@/components/Back"
import Testall from "@/components/Testall"
import Changeheadimg from "@/components/Changeheadimg"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{top:false,keepAlive:true,tabbar:false}
      
    },
    {
      path: '/weixin',
      name: 'Weixin',
      component: Weixin,
      meta:{top:true,keepAlive:true,tabbar:true}
      
    },
    {
      path: '/friends',
      name: 'Friends',
      component: Friends,
      meta:{top:true,keepAlive:true,tabbar:true}
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta:{top:true,keepAlive:true,tabbar:true}
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
      meta:{top:true,keepAlive:true,tabbar:true}
    },
    {
      path: '/chat/:name',
      name: 'Chat',
      component: Chat,
      meta:{top:false,keepAlive:true,tabbar:false}
    },
    {
      path: '/card/:name',
      name: 'Card',
      component: Card,
      meta:{top:false,keepAlive:true,tabbar:false}
    },
    {
      path: '/friendscircle',
      name: 'FriendsCircle',
      component: FriendsCircle,
      meta:{top:false,keepAlive:true,tabbar:false}
    },
    {
      path: '/myinfo',
      name: 'Myinfo',
      component: Myinfo,
      meta:{top:false,keepAlive:true,tabbar:false}
    },
    {
      path: '/changename',
      name: 'Changename',
      component: Changename,
      meta:{top:false,keepAlive:true,tabbar:false}
    },
    {
      // 本页面用于下拉刷新的测试
      path: '/test',
      name: 'Test',
      component: Test,
      meta:{top:true,keepAlive:true,tabbar:false}
    },
    {
      path: '/back',
      name: 'Back',
      component: Back,
      meta:{top:true,keepAlive:true,tabbar:false}
    },
    {
      path: '/testall',
      name: 'Testall',
      component: Testall,
      meta:{top:true,keepAlive:true,tabbar:false}
    },
    {
      path: '/changeimg',
      name: 'Changeheadimg',
      component: Changeheadimg,
      meta:{top:false,keepAlive:true,tabbar:false}
    },
  ]
})

export default router


