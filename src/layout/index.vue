<template>
  <div class="layout">
      <div class="header-wrapper">
        <header-bar></header-bar>
      </div>
      <div class="wrapper">
        <router-view/>
      </div>
      <footer-c/>
  </div>
</template>

<script>
import HeaderBar from '../components/Header'
import FooterC from '../components/Footer';
export default {
  name: 'layout',
  components: {
    HeaderBar,
    FooterC
  },
}
</script>

<style lang='scss' scoped>
  .header-wrapper{
    position: fixed;
    top:0;
    width: 100%;
    z-index: 888;
  }
  .layout{
    position: relative;
    .wrapper{
      width: 85%;
      margin:0 auto;
      margin-top:80px;
      // padding: 0 270px;
    }
  }
</style>
