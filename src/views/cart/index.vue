<template>
  <div>
    <!-- 还未加入购物车 -->
    <div class="empty" v-if="false">
      <h2>您的购物车还没有东西</h2>
      <span>篮子正在等待装满。祝您购物愉快！</span>
    </div>
    <div class="cart-part">
      <div class="cart-content">
        <el-row class="cart-basket" :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <!-- 左侧商品内容 -->
              <div class="left-product">
                <el-row class="product-list" v-for="(item,index) in $store.state.cartList" :key="index">
                  <el-col :span="24" class="order">
                    <el-col class="check" :span="1">
                      <el-checkbox v-model="item.isChecked"></el-checkbox>
                    </el-col>
                    <el-col class="img" :span="5">
                      <img :src="$imgpath(item.pic)" alt="">
                    </el-col>
                    <el-col class="product" :span="12">
                      <p class="name">{{item.name}}</p>
                      <p class="product-code">商品编号  {{item.skucode}}</p>
                      <p class="num">
                        <span>数量</span>
                        <el-button icon="el-icon-minus" circle @click="onChangeNum(item,'reduce')"></el-button>
                        <el-input v-model.number="item.productNumber" min="0" @input="changNum" placeholder=""></el-input>
                        <el-button icon="el-icon-plus" circle @click="onChangeNum(item,'add')"></el-button>
                      </p>
                    </el-col>
                    <el-col class="price" :span="6">
                       <span>总价：{{item.skuprice}}₽</span>
                       <span class="delete">删除</span>
                    </el-col>
                  </el-col>
                </el-row>
               
                <!-- <ul class="product-list">
                  <li class="list">
                    <div class="order">
                        <div class="check">
                          <el-checkbox v-model="checked"></el-checkbox>
                        </div>
                        <div class="img">
                          <img src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1141259048,554497535&fm=26&gp=0.jpg" alt="">
                        </div>
                        <div class="product">
                          <p class="name">AUSSIE//修复奇迹，牛仔裤</p>
                          <p class="product-code">供应商代码  2554870</p>
                          <p class="num">
                            <span>数量</span>
                            <el-button icon="el-icon-minus" circle></el-button>
                            <el-input v-model="input" placeholder="1"></el-input>
                            <el-button icon="el-icon-plus" circle></el-button>
                          </p>
                        </div>
                        <div class="price">
                          <span>8912₽</span>
                        </div>
                    </div>
                    <div class="delete">
                      <span>删除</span>
                    </div>

                  </li>
                </ul> -->
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <!-- 右侧去结账 -->
              <div class="right-price">
                <p>
                  <span>总金额</span>
                  <span>8912₽</span>
                </p>
                <p>
                  <span>数量</span>
                  <span>2</span>
                </p>
                <p>
                  <span>运费</span>
                  <span>0₽</span>
                </p>
                <div><span >删除</span><el-checkbox v-model="isCheckAll"  @change="checkAll(true)">全选</el-checkbox><el-button type="primary" round>提交订单</el-button></div>
              </div>
             
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data(){
    return {
      isCheckAll: false,
      input:0,
      checked:false
    }
  },
  created(){
    this.onClickRight()
  },
  methods:{
    onChangeNum(item,type) {
      // console.log(item,type);
      if(type == 'add'){
        item.productNumber ++
      }else {
        item.productNumber --
      }
      // console.log(item)
      // this.$store.state.cartList[index]
      this.$store.dispatch("updateCart", item);
    },
    changNum(v){
      console.log(v)
    },
    //删除商品
    onClickRight() {
      let removeList = [];
      let list = this.$store.state.cartList;

      this.$store.state.cartList.forEach(cart => {
        if (cart.isChecked == true) removeList.push(cart);
      });
      if (removeList.length > 0) this.$store.dispatch("removeCart", removeList);
    },
    // 全选
    checkAll() {
      this.isCheckAll != this.isCheckAll;
      this.$store.state.cartList.forEach((item, index) => {
        item.isChecked = this.isCheckAll;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.empty {
}
.cart-part {
  position: relative;
  background-color: #fff;
  .cart-content {
    padding: 0 30px;
    max-width: calc(1360px + 2 * 30px);
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    min-height: calc(100vh - 578px - 208px + 5px);
    .cart-basket {
      padding-top: 40px !important;
      width: 100%;
      margin: 0;
      
      min-height: auto;
      .left-product {
        .product-list{
          
          width: 100%;
          box-sizing: border-box;
          // border:1px solid #e8e8e8;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          padding: 15px;
          .order{
            .check,.img,.product,.num,.price {
              height: 210px;
            }
            .check{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-content: center;
            }
            .img{
              img{
                width: 150px;
              }
            }
            .num{
              /deep/ .el-input{
                width: 80px;
                .el-input__inner{
                  text-align: center;
                  padding:0;
                }
              }
            }
            .product{
              display: flex;
              flex-direction: column;
              justify-content:space-between;
              // align-items: center;
              // justify-content: space-between;
              .name{
                margin-top: 20px;
              }
              p{
                width: 100%;
                margin-bottom: 20px;
              }
            }
            .price{
              display: flex;
              flex-direction: column;
              // align-content: space-between;
              justify-content:space-between;
              // align-items: center;
              span{
                margin-top: 20px;
              }
              .delete{
                margin-bottom: 20px;
                cursor: pointer;
              }
            }
          }
        }
      }
      .right-price {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #e8e8e8;
        background: #fff;
        padding: 32px 40px 27px;
        p{
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        div{
          text-align: center;
        }
      }
    }
  }
}
</style>
