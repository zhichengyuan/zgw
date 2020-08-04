<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links啦啦啦啦</h2>
    <h2>{{$t('message.下一步')}}</h2>
    <div class="ceshi">
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ceshi{
  width: 100px;
  height: 100px;
  // background: red;
  background: url('../assets/imgs/1.png');
  .box{
    width: 50px;
    height: 50px;
    background: green;
  }
}
</style>
