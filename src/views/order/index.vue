<template>
  <!-- 订单页面 -->
  <div class="order">
    <div class="order-wrapper">
      <div class="order-content">
        <!-- theme -->
        <h2>{{$t('message.待付款订单')}}</h2>
        <!-- 商品订单详情 -->
        <div class="orde-detail">
          <el-table :data="shopData" style="width: 100%">
            <el-table-column type="expand">
              <template>
                <el-table :data="orderBuffer.productList" style="width: 100%">
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
                  <el-table-column prop="transPrice" :label="$t('message.运费')">
                    <template>
                      <div>{{$t('message.货物需要运输费用，请与服务人员联系:')}}{{$store.state.storeinfo.tel}}</div>
                    </template>
                  </el-table-column>

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
          </el-table>
        </div>
        <!-- 支付 -->
        <div class="payment">
          <div class="totalPrice">
            <span>{{$t('message.总金额：')}}</span>
            <span>{{orderBuffer.totalPrice}}₽</span>
          </div>
          <el-button @click="selectPay">{{$t('message.待支付结算')}}</el-button>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>请选择支付方式</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      options: [
        {
          value: "赊账",
          label: "赊账",
        },
        {
          value: "现金",
          label: "现金",
        },
        {
          value: "转账",
          label: "转账",
        },
      ],
      value: "",
      dialogVisible: false,
      pay: "",
      transPrice: 0,
      shopData: [
        {
          shopAdress: this.$store.state.storeinfo.address,
          shopTel: this.$store.state.storeinfo.tel,
          shopName: this.$store.state.storeinfo.shopName,
        },
      ],
      orderBuffer: {},
    };
  },
  mounted() {
    const orderProduct = JSON.parse(localStorage.getItem("orderBuffer"));
    this.orderBuffer = orderProduct || this.$store.state.orderBuffer;
    console.log(this.orderBuffer, "ssss", this.value);
  },
  inject: ["loadCartList"],
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    selectPay() {
      this.dialogVisible = true;
    },
    onSubmit() {
      // console.log(this.orderBuffer.payment);
      // console.log(this.value);
      if (this.value == "") {
        // this.orderBuffer.payment=this.$lang["赊账"]
        this.$confirm("请选择你的支付方式", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.selectPay();
          })
          .catch(() => {
            this.selectPay();
          });
      } else {
        const newOrderBuffer = {
          totalPrice: this.orderBuffer.totalPrice.toFixed(2),
          productPrice: this.orderBuffer.totalPrice.toFixed(2),
          transPrice: this.transPrice,
          productList: this.orderBuffer.productList,
          payment: this.value,
        };
        console.log(newOrderBuffer);
        this.$request.order(newOrderBuffer).then((res) => {
          if (res.code == 0) {
            this.loadCartList();
            //this.$store.dispatch("loadCartList")
            let orderId = res.data._id;
            this.$message({
              message: this.$t("message.订单已提交"),
              type: "success",
            });
            this.$router.push("/orderList");
            // this.$toast({
            //   message: this.$lang["订单已提交"]
            // });
            // this.$router.push("/orderDetail/" + res.data._id);
          }
        });
      }
    },
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
