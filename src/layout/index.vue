<template>
  <div class="layout">
      <header-bar></header-bar>
      <div class="wrapper">
        
        <router-view/>
      </div>
      <FooterC/>
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
  .layout{
    .wrapper{
      width: 90%;
      margin:0 auto;
      
    }
  }
</style>
