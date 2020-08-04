<template>
  <div class="layout">
      <div class="wrapper">
        <div class="header">
          <el-row>
            <el-col :span="4"><div class="grid-content bg-purple">1</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light">1</div></el-col>
            <el-col :span="9"><div class="grid-content bg-purple">1</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light">1</div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple-light">1</div></el-col>
          </el-row>
        </div>
        <router-view/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'layout'
}
</script>

<style lang='scss' scoped>
  .layout{
    .wrapper{
      width: 90%;
      margin:0 auto;
      .header{
        width: 100%;
        height: 64px;
      }
    }
  }
</style>
