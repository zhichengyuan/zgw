<template>
  <div class="productList">
    <h2 class="title">*推荐商品</h2>
    <el-row :gutter="20">
        <el-col :span="4" v-for="(o) in number" :key="o">
            <el-card shadow="hover" :body-style="{ padding: '5px',borderRadius:'20px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                </div>
            </div>
            </el-card>
        </el-col>
    </el-row>
    <div class="button">
        <el-button v-if="moreProduct == false" type="primary" plain round @click="more">显示更多<i class="el-icon-bottom el-icon--right"></i></el-button>
        <span v-else>没有更多了</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productList',
  
  data () {
    return {
        currentDate: new Date(),
        number:10,
        moreProduct:false,
    }
  },
  methods:{
      more(){
          if(this.number == 30){
              this.moreProduct = 'ture'
              return
          }
          this.number +=5;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.productList{
    padding-bottom: 50px;
    .button{
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 20px;
        /deep/ .el-button--primary.is-plain{
            color: #ff9000;
            background: #fff;
            border-color: #ff9000;
        }
        /deep/ .el-button--primary.is-plain:hover{
            background: #ff9000;
            color: #fff;
        }
        /deep/ .el-button.is-round{
            padding: 13px 60px;
        }
    }
}
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
