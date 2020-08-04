<template>
  <div class="activity">
    <h2 class="title">*首页活动</h2>
    <el-row :gutter="20">
        <el-col :span="6" v-for="(o) in 4" :key="o">
            <el-card shadow="hover" :body-style="{ padding: '5px',borderRadius:'20px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        currentDate: new Date()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title{
  margin-bottom: 15px;
}
.time {
font-size: 13px;
color: #999;
}

.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
}

.image {
width: 100%;
display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
