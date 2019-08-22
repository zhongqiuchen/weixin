<template>
  <div class="friends">
    <van-index-anchor />
    <van-cell class="cell" title="朋友圈" icon="../../static/img/朋友圈.png" size="large" is-link to="/friendscircle">
    </van-cell>

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="扫一扫" icon="../../static/img/扫一扫.png" is-link size="large" />
    <van-cell class="cell" title="摇一摇" icon="../../static/img/摇一摇.png" is-link size="large" />

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="看一看" icon="../../static/img/看一看.png" is-link size="large" />
    <van-cell class="cell" title="搜一搜" icon="../../static/img/搜一搜.png" is-link size="large" />

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="附近的人" icon="../../static/img/附近的人.png" is-link size="large" />

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="购物" icon="../../static/img/购物.png" is-link size="large" />
    <van-cell class="cell" title="游戏" icon="../../static/img/游戏.png" is-link size="large" />

    <van-index-anchor class="anchor"/>
    <van-cell class="cell" title="小程序" icon="../../static/img/小程序.png" is-link to="/test" size="large" />

  </div>
</template>

<script>
export default {
  name: 'Friends',
  data () {
    return {
      msg: 'Friends'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.friends{
  text-align: left;
  margin-bottom: 70px;
}
.anchor{
  height:10px;
}
.cell{
  height:50px;
}
</style>
