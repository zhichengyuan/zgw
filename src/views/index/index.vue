<template>
  <div class="index">
      <div class="rotaton-wrapper">
        <Rotation :swiperList="$store.state.swiperList"/>
      </div>
      <div class="activity-wrapper">
        <Activity/>
      </div>
      <div class="activity-wrapper">
        <product-list :commodity="commodity"/>
      </div>
  </div>
</template>

<script>

import Rotation from '../../components/Rotation'
import Activity from '../../components/Activity'
import ProductList from '../../components/ProductList'

export default {
  name: 'index',
  components: {
    Rotation,
    Activity,
    ProductList
  },
  data(){
    return{
      commodity: { listtype: "" },
    }
  }
  
}
</script>

<style lang="scss" scoped>
.rotaton-wrapper{
  margin-top: 20px;
}
.activity-wrapper{
  margin-top:15px;
}
</style>
