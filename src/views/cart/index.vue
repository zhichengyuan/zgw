<template>
  <div>
    <!-- 还未加入购物车 -->
    <div class="logToast" v-if="! $store.state.token">
      <div >
        <span>{{$t('message.登陆后可同步购物车商品')}}</span>
        <el-button @click="$router.push('/my')" type="danger">{{$t('message.去登陆')}}</el-button>
      </div>
    </div>
    <div class="empty" v-if="$store.state.cartList.length == 0">
      <div>
        <img src="@/assets/imgs/cat.png" alt="">
        <div>
          <h2>{{$t('message.您的购物车还没有东西')}}</h2>
        <span>
          {{$t('message.篮子正在等待装满。祝您购物愉快！')}}
        </span>
        <el-button @click="$router.push('/') " type="primary" size="small" round>{{$t('message.去逛逛')}}</el-button>
        </div>
      </div>
      
    </div>
    
    <div class="cart-part" v-else>
      <div class="cart-content">
        <el-row class="cart-basket" :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <!-- 左侧商品内容 -->
              <div class="left-product">
                <el-row
                  class="product-list"
                  v-for="(item,index) in $store.state.cartList"
                  :key="index"
                >
                  <el-col :span="24" class="order">
                    <el-col class="check" :span="1">
                      <el-checkbox v-model="item.isChecked" @change="onChangeCheck"></el-checkbox>
                    </el-col>
                    <el-col class="img" :span="5">
                      <img :src="$imgpath(item.pic)" alt />
                    </el-col>
                    <el-col class="product" :span="12">
                      <p class="name">{{item.name}}</p>
                      
                      <p class="product-code">{{$t('message.商品编号:')}}{{item.skucode}}</p>
                      <p class="product-code">{{$t('message.选择规格:')}}
                        <a
                            v-for="(item,index) in Object.values(item.attributeList)"
                            :key="index"
                          >{{item}}</a>
                      </p>
                      <p class="num">
                        <span>{{$t('message.数量')}}</span>
                        <el-button
                          icon="el-icon-minus"
                          :disabled="item.productNumber <=1"
                          circle
                          @click="onChangeNum(item,'reduce')"
                        ></el-button>
                        <el-input
                          v-model.number="item.productNumber"
                          min = "0"
                          max = "8"
                          @input="changNum($event,item.selectStock,item)"
                          placeholder
                        ></el-input>
                        <el-button icon="el-icon-plus" circle @click="onChangeNum(item,'add')" :disabled="item.productNumber >=item.selectStock"></el-button>
                      </p>
                    </el-col>
                    <el-col class="price" :span="6">
                      <span>{{$t('message.单价：')}}{{item.skuprice}}₽</span>
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
                </ul>-->
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <!-- 右侧去结账 -->
              <div class="right-price">
                <p>
                  <span>{{$t('message.总金额')}}</span>
                  <span>{{sumPrice}}₽</span>
                </p>
                <p>
                  <span>{{$t('message.数量')}}</span>
                  <span>{{sumProductNumber}}</span>
                </p>
                <!-- <p>
                  <span>运费</span>
                  <span>0₽</span>
                </p> -->
                <div>
                  <el-checkbox v-model="isCheckAll" @change="checkAll(true)">{{$t('message.全选')}}</el-checkbox>
                  <el-button  type="danger" round @click="onClickRight">{{$t('message.删除')}}</el-button>

                  <el-button type="primary" round @click="onSubmit" >{{$t('message.提交订单')}}</el-button>
                </div>
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
  data() {
    return {
      isCheckAll: false,
      input: 0,
      checked: false,
      sumPrice: 0,
      sumProductNumber: 0,
    };
  },
  created() {
    // this.onClickRight()
  },
  computed: {
    // calcTotalPrice() {
    //   //每次遍历商品之前对总金额进行清零
    //   let isCheckAll = true;
    //   this.sumPrice = 0;
    //   this.$store.state.cartList.forEach((item, index) => {
    //     if (item.isChecked == true) {
    //       this.sumPrice += item.skuprice * item.productNumber;
    //     } else {
    //       isCheckAll = false;
    //     }
    //   });
    //   this.isCheckAll = isCheckAll;
    //   console.log(this.sumPrice);
    //   return this.sumPrice;
    // }
  },
  methods: {
    //计算
    calcTotalPrice() {
      //每次遍历商品之前对总金额进行清零
      let isCheckAll = true;
      this.sumProductNumber = 0;
      this.sumPrice = 0;
      this.$store.state.cartList.forEach((item, index) => {
        if (item.isChecked == true) {
          this.sumPrice += item.skuprice * item.productNumber;
          this.sumProductNumber += item.productNumber;
        } else {
          isCheckAll = false;
        }
      });
      this.isCheckAll = isCheckAll;
      return this.sumPrice;
    },
    //是否选中
    onChangeCheck() {
      this.calcTotalPrice();
    },
    //改变数量
    onChangeNum(item, type) {
      if (type == "add") {
        item.productNumber++;
      } else {
        item.productNumber--;
      }
      if (item.productNumber == 0) {
      }

      this.$store.dispatch("updateCart", item);
      this.calcTotalPrice();
    },
    changNum(e,limitNum,item) {
      console.log(e,limitNum,item)
     if(Number(e)>Number(limitNum)){
      item.productNumber=Number(limitNum)
     }
    },
    //删除商品
    onClickRight() {
      let removeList = [];
      let list = this.$store.state.cartList;

      this.$store.state.cartList.forEach((cart) => {
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
      this.calcTotalPrice();
    },
    // 确认订单
    onSubmit() {
      let selectedList = [];
      this.$store.state.cartList.forEach((item, index) => {
        if (item.isChecked == true) {
          selectedList.push(item);
        }
      });
      if (selectedList.length == 0) {
        this.$message({
          message: this.$t('message.请选择要购买的商品'),
          type: "warning",
        });
        return;
      }

      if (this.$store.state.token == null) {
        this.$router.push("/my");
        return;
      }

      this.$request.orderBreak(selectedList).then((res) => {
        if (res.code == 0) {
          this.$store.commit("orderBuffer", res.data);
          this.$router.push("/order");
        } else {
          this.$message({
            message: this.$t('message.订单创建失败'),
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.logToast{
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  padding: 80px 40px 0;
  color: #fff;
  span{
    background: #ff9000;
    padding: 5px;
    vertical-align: middle;
  }
}
/deep/ .el-checkbox:last-of-type {
  float: left;
  line-height: 40px;
}
.empty {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
   padding: 80px 40px 0;
   img{
    //  vertical-align: middle;
   }
   div{
     display: inline-block;
     h2{
     color: #ff9000;
     padding: 0 5px 30px;
   }
   span{
     vertical-align: middle;
   }
   }
   

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
        .product-list {
          width: 100%;
          box-sizing: border-box;
          // border:1px solid #e8e8e8;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          padding: 15px;
          .order {
            .check,
            .img,
            .product,
            .num,
            .price {
              height: 210px;
            }
            .check {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-content: center;
            }
            .img {
              img {
                width: 150px;
              }
            }
            .num {
              /deep/ .el-input {
                width: 80px;
                .el-input__inner {
                  text-align: center;
                  padding: 0;
                }
              }
            }
            .product {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              // align-items: center;
              // justify-content: space-between;
              .name {
                margin-top: 20px;
              }
              p {
                width: 100%;
                margin-bottom: 20px;
              }
            }
            .price {
              display: flex;
              flex-direction: column;
              // align-content: space-between;
              justify-content: space-between;
              // align-items: center;
              span {
                margin-top: 20px;
              }
              .delete {
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
        padding: 32px 9px 27px;
        p {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        div {
          text-align: center;
        }
      }
    }
  }
}
</style>
