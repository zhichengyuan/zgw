<template>
  <div class="classly">
      <el-row class="tac" :gutter="20">
        <el-col :span="5">
          <h5>当前分类</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              
              <el-menu-item-group >
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col class="" :span="19">
          <div class="product">
              <product-list/>
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
  data(){
    return{

    }
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
