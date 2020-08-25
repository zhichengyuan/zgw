<template>
  <!-- 订单页面 -->
  <div class="temporder">
    <div class="temp-wrapper">
      <div class="temp-content">
        <!-- theme -->
        <h2>{{$t('message.待处理订单')}}</h2>
        <!-- 订单页面 -->
        <div class="orde-detail">
          <el-table :data="orderList" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table :data="scope.row.productList" style="width: 100%">
                  <el-table-column prop="img" :label="$t('message.商品主图')" width="100">
                    <template slot-scope="scope">
                      <img :src="$imgpath(scope.row.pic)" alt />
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" :label="$t('message.商品名称')"></el-table-column>
                  <el-table-column prop="sku" :label="$t('message.商品规格')">
                    <template slot-scope="scope">
                      <div
                        v-for="(item,index) in Object.values(scope.row.attributeList)"
                        :key="index"
                      >{{item}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="skuprice" :label="$t('message.单价')"></el-table-column>
                  <el-table-column prop="productNumber" :label="$t('message.数量')"></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column :label="$t('message.订单编号')" prop="logNum">
              <template slot-scope="scope">
                <span>{{ scope.row._id.substr(-8) }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('message.收货地址')" prop="shopName">
              <template>
                <span>{{ $store.state.storeinfo.address }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('message.商品金额')" prop="productPrice">
              <template slot-scope="scope">
                <div>{{scope.row.productPrice}}₽</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('message.运费')" prop="shopName">
              <template slot-scope="scope">
                <span>{{ scope.row.transPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('message.总金额')" prop="totalPrice">
              <template slot-scope="scope">
                <div>{{scope.row.totalPrice}}₽</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('message.操作')" prop="status">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  @click="selectPay(scope.row)"
                  v-if="scope.row.isok"
                >{{$t('message.去支付')}}</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column :label="$t('message.操作')" prop="status">
                <template slot-scope="scope">
                    <el-button type="danger" v-if="scope.row.status == 0 || scope.row.status == 1" @click="cancle(scope.row)">{{$t('message.取消订单')}}</el-button>
                    <el-button type="success" v-if="scope.row.status == 2" @click="finished(scope.row)">{{$t('message.确认收货')}}</el-button>
                </template>
            </el-table-column>-->
          </el-table>
        </div>
        <el-dialog
          :title="$t('message.提示')"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>{{$t('message.请选择支付方式')}}</span>
          <el-select v-model="value" :placeholder="$t('message.请选择')">
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
import { bufferorder, order } from "@/api/apis";
export default {
  data() {
    return {
      submitOrder: {},
      orderList: [],
      value: "",
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
      dialogVisible: false,
    };
  },
  mounted() {
    this.getTemp();
  },
  methods: {
   
     handleClose(done) {
      this.$confirm(this.$t("message.确认关闭？"))
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    selectPay(data) {
        this.submitOrder=data
        console.log(this.submitOrder)
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
            this.selectPay(this.submitOrder);
          })
          .catch(() => {
            this.selectPay(this.submitOrder);
          });
      } else {
          console.log(this.submitOrder,'手动发送给法官撒发生')
        const newOrderBuffer = {
          totalPrice: this.submitOrder.totalPrice.toFixed(2),
          productPrice: this.submitOrder.productPrice.toFixed(2),
          transPrice: this.submitOrder.transPrice,
          productList: this.submitOrder.productList,
          payment: this.value,
        };

        if (newOrderBuffer.productList.length > 0) {
          newOrderBuffer.productList.forEach((e) => {
            e.productNumber = e.productNumber.toString();
          });
        }
        var checkProduct = newOrderBuffer.productList;
        var arr = [];
        var counter = 0;

        checkProduct.map((v) => {
          counter++;
          if (v.productSn == v.skucode) {
            this.$request
              .dbreq("product", { productSn: v.productSn, sid: v.sid })
              .then((res) => {
                // console.log(res.data.items);
                res.data.items.map((item) => {
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
                  console.log()
                this.$request.order(newOrderBuffer).then((res) => {
                  console.log(res);
                  if (res.code == 0) {
                    this.dialogVisible = false;
                    that.$message({
                      message: that.$t("message.订单已提交"),
                    });
                    this.$router.push("/orderList");
                  }
                });
              }
            }, 500);
          }
        });
        var req = {
          _id: this.submitOrder._id,
        };
        this.$request.oderRemove("tmporder", req).then((res) => {
          console.log(res);
        });
      }
    },

    getTemp() {
      var data = {
        uname: this.$store.state.username,
      };
      this.$request.bufferorder(data).then((res) => {
        console.log(res);
        this.orderList = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.temporder {
  position: relative;
  background-color: #fff;
  .temp-wrapper {
    padding: 0 30px;
    max-width: calc(1360px + 2 * 30px);
    min-height: calc(100vh - 578px - 208px + 5px);
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    .temp-content {
      padding-top: 40px;
      > h2 {
        font-weight: 700;
        font-size: 36px;
      }
    }
  }
}
</style>