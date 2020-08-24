<template>
  <!-- 订单页面 -->
  <div class="order">
    <div class="order-wrapper">
      <div class="order-content" v-if="this.orderBuffer">
        <!-- theme -->
        <h2>{{$t('message.待付款订单')}}</h2>
        <!-- 商品订单详情 1111-->
        <div class="orde-detail" v-if="this.otherOrder.productList && this.otherOrder.productList.length>0">
          <el-table :data="otherdata" style="width: 100%" v-if=" otherOrder">
            <el-table-column type="expand">
              <template>
                <el-table
                  :data="otherOrder.productList"
                  style="width: 100%"
                  
                >
                  <el-table-column prop="img" :label="$t('message.商品主图')" width="100">
                    <template slot-scope="scope">
                      <img :src="$imgpath(scope.row.pic)" alt />
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" :label="$t('message.商品名称')"></el-table-column>
                  <el-table-column prop="skuprice" :label="$t('message.单价')">
                    <template slot-scope="scope">
                      <div>{{scope.row.skuprice}}₽</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sku" :label="$t('message.商品规格')">
                    <template slot-scope="scope">
                      <div
                        v-for="(item,index) in Object.values(scope.row.attributeList)"
                        :key="index"
                      >{{item}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productNumber" :label="$t('message.数量')"></el-table-column>

                  <el-table-column prop="totalPrice" :label="$t('message.总金额')">
                    <template slot-scope="scope">
                      <div>{{scope.row.skuprice * scope.row.productNumber}}₽</div>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column :label="$t('message.商铺名称')" prop="shopName"></el-table-column>
            <el-table-column :label="$t('message.商铺电话')" prop="shopTel"></el-table-column>
            <el-table-column :label="$t('message.商铺地址')" prop="shopAdress"></el-table-column>
            <el-table-column :label="$t('message.当前运费')" prop="transPrice">
              <template slot-scope="scope">
                      <div>{{scope.row.transPrice}}₽</div>
                    </template>
            </el-table-column>
            <el-table-column :label="$t('message.当前金额')" prop="totalPrice">
              <template slot-scope="scope">
                      <div>{{scope.row.totalPrice}}₽</div>
                    </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 商品订单详情 32222-->
        <div
          class="orde-detail"
          v-if="this.furnitureOrder.productList && this.furnitureOrder.productList.length>0"
        >
          <el-table :data="furnituredata" style="width: 100%">
            <el-table-column type="expand">
              <template>
                <el-table :data="furnitureOrder.productList" style="width: 100%">
                  <el-table-column prop="img" :label="$t('message.商品主图')" width="100">
                    <template slot-scope="scope">
                      <img :src="$imgpath(scope.row.pic)" alt />
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" :label="$t('message.商品名称')"></el-table-column>
                  <el-table-column prop="skuprice" :label="$t('message.单价')">
                    <template slot-scope="scope">
                      <div>{{scope.row.skuprice}}₽</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sku" :label="$t('message.商品规格')">
                    <template slot-scope="scope">
                      <div
                        v-for="(item,index) in Object.values(scope.row.attributeList)"
                        :key="index"
                      >{{item}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productNumber" :label="$t('message.数量')"></el-table-column>

                  <el-table-column prop="totalPrice" :label="$t('message.总金额')">
                    <template slot-scope="scope">
                      <div>{{scope.row.skuprice * scope.row.productNumber}}₽</div>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column :label="$t('message.商铺名称')" prop="shopName"></el-table-column>
            <el-table-column :label="$t('message.商铺电话')" prop="shopTel"></el-table-column>
            <el-table-column :label="$t('message.商铺地址')" prop="shopAdress"></el-table-column>
            <el-table-column :label="$t('message.当前运费')" prop="transPrice">
              <template slot-scope="scope">
                      <div>{{scope.row.transPrice}}₽</div>
                    </template>
            </el-table-column>
            <el-table-column :label="$t('message.当前金额')" prop="totalPrice">
              <template slot-scope="scope">
                      <div>{{scope.row.totalPrice}}₽</div>
                    </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 支付 -->
        <div class="payment">
          <div class="totalPrice">
            <span style="margin-right:25px">
            <el-switch v-model="points" active-color="#13ce66"   active-text="可用积分为:" @change="change"></el-switch>
            <span style="color: rgb(19, 206, 102)">{{integral}}</span>
            </span>
            <span>{{$t('message.总金额：')}}</span>
            <span>{{treansPrice}}₽</span>
          </div>
          <el-button @click="selectPay">{{$t('message.待支付结算')}}</el-button>
        </div>
        <el-dialog
          :title="$t('message.提示')"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>{{$t('message.请选择支付方式')}}</span>
          <el-select v-model="value"  :placeholder="$t('message.请选择')">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">{{$t('message.取 消')}}</el-button>
            <el-button type="primary" @click="onSubmit">{{$t('message.确 定')}}</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { dbreq,order } from "@/api/apis";
export default {
  name: "order",
  data() {
    return {
      points: true,
      options: [
        {
          value: "0",
          label: this.$t("message.赊账"),
        },
        {
          value: "1",
          label: this.$t("message.现金"),
        },
        {
          value: "2",
          label: this.$t("message.转账"),
        },
      ],
      value: "",
      dialogVisible: false,
      pay: "",
      transPrice: 0,
      otherOrder: {},
      furnitureOrder: {},
      integral: 0,
      furtotalPrice: "",
      furtransPrice: "",
      othertotalPrice: "",

      othertransPrice: "",
      furnituredata: [
        {
          shopAdress: this.$store.state.storeinfo.address,
          shopTel: this.$store.state.storeinfo.tel,
          shopName: this.$store.state.storeinfo.shopName,
        },
      ],
      otherdata: [
        {
          shopAdress: this.$store.state.storeinfo.address,
          shopTel: this.$store.state.storeinfo.tel,
          shopName: this.$store.state.storeinfo.shopName,
        },
      ],
      orderBuffer: {},
    };
  },
   computed: {
    treansPrice() {
      this.newPrice = this.orderBuffer.allPrice;
      return parseInt(this.newPrice);
    },
  },
  created() {
    const orderProduct = JSON.parse(localStorage.getItem("orderBuffer"));
    this.orderBuffer = orderProduct || this.$store.state.orderBuffer;
    console.log(this.orderBuffer, "ssss", this.value);
    this.otherOrder = this.orderBuffer.other;
    this.furnitureOrder = this.orderBuffer.furniture;
    (this.furtotalPrice = this.furnitureOrder.totalPrice),
      (this.othertotalPrice = this.otherOrder.totalPrice),
      (this.furtransPrice = this.furnitureOrder.transPrice);
    this.othertransPrice = this.otherOrder.transPrice;
    this.furnituredata[0].totalPrice = this.furtotalPrice;
    this.furnituredata[0].transPrice = this.furtransPrice;
    this.otherdata[0].totalPrice = this.othertotalPrice;
    this.otherdata[0].transPrice = this.othertransPrice;

    this.compoutIntegral();
  },
  inject: ["loadCartList"],
  methods: {
    // 改变积分
    change(data){
      console.log(data)
    },
    compoutIntegral() {
      this.integral = this.orderBuffer.allPrice * 0.1;
      if (this.integral > this.$store.state.integral) {
        this.integral = this.$store.state.integral;
      }
      this.integral = Math.floor(this.integral);
    },
    handleClose(done) {
      this.$confirm(this.$t("message.确认关闭？"))
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    selectPay() {
      this.dialogVisible = true;
    },
    onSubmit() {
      let that = this;
      // console.log(this.orderBuffer.payment);
      // console.log(this.value);
      if (this.value == "") {
        // this.orderBuffer.payment=this.$lang["赊账"]
        this.$confirm(
          this.$t("message.请选择你的支付方式"),
          this.$t("message.提示"),
          {
            confirmButtonText: this.$t("message.确定"),
            cancelButtonText: this.$t("message.取消"),
            type: "warning",
          }
        )
          .then(() => {
            this.selectPay();
          })
          .catch(() => {
            this.selectPay();
          });
      } else {
        const newOrderBuffer = {
          totalPrice: this.newPrice.toFixed(2),
        productPrice: this.newPrice.toFixed(2),
          transPrice: this.transPrice,
          productList: this.orderBuffer.productList,
          payment: this.value,
        };
        //除家具外的商品订单
      const otherOrderBuffer = {
       totalPrice: this.orderBuffer.other.totalPrice.toFixed(2),
        productPrice: this.orderBuffer.other.totalPrice.toFixed(2),
        transPrice: this.orderBuffer.other.transPrice,
        productList: this.orderBuffer.other.productList,
        payment: this.value,
      };
      //家具商品订单
      const furnitureOrderBuffer = {
        totalPrice: this.orderBuffer.furniture.totalPrice.toFixed(2),
        productPrice: this.orderBuffer.furniture.totalPrice.toFixed(2),
        transPrice: this.orderBuffer.furniture.transPrice,
        productList: this.orderBuffer.furniture.productList,
        payment: this.value,
      };
      //所有订单的商品合并列表
      var allProduct = otherOrderBuffer.productList.concat(furnitureOrderBuffer.productList)
      if(furnitureOrderBuffer.productList.length > 0) {
        furnitureOrderBuffer.productList.forEach((e) => {
          e.productNumber = e.productNumber.toString();
        });
      }
      if(otherOrderBuffer.productList.length > 0) {
        otherOrderBuffer.productList.forEach((e) => {
          e.productNumber = e.productNumber.toString();
        });
      }
        var checkProduct = allProduct;
        var arr = [];
        var counter = 0;

        checkProduct.map((v) => {
          // console.log(5555)
          counter++;
          if (v.productSn == v.skucode) {
            this.$request
              .dbreq("product", { productSn: v.productSn, sid: v.sid })
              .then((res) => {
                // console.log(res.data.items);
                res.data.items.map((item) => {
                  console.log(
                    Number(item.stock) - Number(v.productNumber),
                    "nosku"
                  );
                  if (Number(item.stock) - Number(v.productNumber) < 0) {
                    arr.push("false");
                    this.$message({
                      message:
                        this.$t("message.你购买的") +
                        item.name +
                        this.$t("message.库存不足，无法下单"),
                    });
                    // return
                  } else {
                    arr.push("true");
                  }
                });
              });
          } else {
            this.$request
              .dbreq("sku", {
                productSn: v.productSn,
                sid: v.sid,
                skucode: v.skucode,
              })
              .then((res) => {
                console.log(res.data.items);
                res.data.items.map((item) => {
                  console.log(item.skunum, "skunum");
                  console.log(v.productNumber, "productNumber");
                  console.log(
                    Number(item.skunum) - Number(v.productNumber),
                    "sku"
                  );
                  if (Number(item.skunum) - Number(v.productNumber) < 0) {
                    arr.push("false");
                    this.$message({
                      message:
                        this.$t("message.你购买的") +
                        v.name +
                        this.$t("message.库存不足，无法下单"),
                    });
                  } else {
                    arr.push("true");
                  }
                });
              });
          }
          if (counter === checkProduct.length) {
            setTimeout(() => {
              var a = arr.indexOf("false");
              if (a === -1) {
                console.log('下订单');
              //判断是否两种订单都有
              console.log(otherOrderBuffer,furnitureOrderBuffer)
              if(otherOrderBuffer.productList.length > 0 && furnitureOrderBuffer.productList.length > 0) {
                Promise.all([this.submitOrder(otherOrderBuffer), this.submitOrder(furnitureOrderBuffer)]).then((values) => {
                  console.log('我成功了',values);
                  that.toOrderD();
                });
              }else if(otherOrderBuffer.productList.length == 0 ) {
                Promise.all([this.submitOrder(furnitureOrderBuffer)]).then((values) => {
                  console.log('我成功了',values);
                  that.toOrderD();
                });
              } else if(furnitureOrderBuffer.productList == 0){
                Promise.all([this.submitOrder(otherOrderBuffer)]).then((values) => {
                  console.log('我成功了',values);
                  that.toOrderD();
                });
              }
              }
            }, 500);
          }
        });
      }

    },
    //提交订单
    submitOrder (newOrderBuffer) { 
      let that = this;
      return new Promise ((resolve,reject) => {
        that.$request.order(newOrderBuffer).then((res) => {
          if (res.code == 0) {
            that.loadCartList();
            resolve(res) ;
            // that.$router.push("/orderDetail/" + res.data._id);
          }
        });
    })},
    //成功后跳转
    toOrderD(){
      let that = this;
  
      //that.$store.dispatch("loadCartList")
      
      that.$message({
        message: that.$t("message.订单已提交"),
      });
      this.$router.push("/orderList")
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body {
  text-align: center;
  span {
    font-size: 18px;
    font-weight: 700;
    margin-right: 10px;
  }
}
.order {
  position: relative;
  background-color: #fff;
  .order-wrapper {
    padding: 0 30px;
    max-width: calc(1360px + 2 * 30px);
    min-height: calc(100vh - 578px - 208px + 5px);
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    .order-content {
      padding-top: 40px;
      > h2 {
        font-weight: 700;
        font-size: 36px;
      }
      .orde-detail {
        border: 2px solid #ff9000;
        margin-top: 50px;
        .cell {
          > img {
            width: 100%;
          }
        }
      }
      .payment {
        text-align: center;
        margin-top: 25px;
        .totalPrice {
          display: inline-block;
          padding: 0 20px;
          color: #ff9000;
        }
        > button {
          background: #ff9000;
          color: #fff;
          font-size: 18px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
