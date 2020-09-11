<template>
  <div class="classly">
      <el-row class="tac" :gutter="20">
        <el-col class="">
          <div class="product">
              <product-list :commodity="commodity" :title="title"/>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import ProductList from '../../components/ProductList'
export default {
  name: 'listpage',
  components: {
    ProductList
    
  },
  beforeRouteUpdate (to, from, next) {
   
    
    let obj = {
      code : to.query.code,
      listtype : to.query.listtype
    }
    this.commodity= obj;
    this.title = to.query.title
    next();
  },
  data(){
    return{
      commodity: {},
      title:this.$route.query.title
    }
  },
  created(){
   
    let obj = {
      code : this.$route.query.code,
      listtype : this.$route.query.listtype
    }
    this.commodity= obj
  },
  
  methods:{
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    }
  }
}
</script>

<style lang="scss" scoped>
.classly{
  .product{
    margin-top: 20px;
  }
}
</style>
