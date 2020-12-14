<template>
  <div class="tc">
    <div class="content">
      <div class="part">
        <h1>tc</h1>
        <h2>https://www.9-bill.com/index/legal</h2>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'ipr',
  data(){
    return{
    }
  }
  
}
</script>

<style lang="scss" scoped>
.tc{
  position: relative;
  background-color: #fff;
  .content {
    min-height: calc(100vh - 578px - 208px + 5px);
    width: 100%;
    max-width: 1500px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 30px;
    margin: 0 auto;
    .part {
      h1 {
        font-weight: 700;
        margin: 10px 0 10px;
      }
      span {
        font-size: 18px;
        text-align: center;
      }
    }
  }
}
</style>
