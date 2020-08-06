<template>
  <div class="index">
      <div class="rotaton-wrapper">
        <Rotation/>
      </div>
      <div class="activity-wrapper">
        <Activity/>
      </div>
      <div class="activity-wrapper">
        <product-list/>
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
