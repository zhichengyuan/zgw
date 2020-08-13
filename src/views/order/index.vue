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
              <template >
                <el-table :data="orderBuffer.productList" style="width: 100%">
                  <el-table-column prop="img" :label="$t('message.商品主图')" width="100">
                    <template slot-scope="scope">
                      <img  :src="$imgpath(scope.row.pic)" alt />
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" :label="$t('message.商品名称')" ></el-table-column>
                  <el-table-column prop="skuprice" :label="$t('message.单价')"></el-table-column>
                  <el-table-column prop="productNumber" :label="$t('message.数量')"></el-table-column>
                  <el-table-column prop="transPrice" :label="$t('message.运费')">
                    <template >
                      <div>{{$t('message.货物需要运输费用，请与服务人员联系')}}Tel:0123456789</div>
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
          <el-button @click="onSubmit">{{$t('message.待支付结算')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      pay: "",
      transPrice: 0,
      shopData: [
        {
          shopAdress: "俄罗斯",
          shopTel: "138000000",
          shopName: "shopvill",

          tableData: [
            {
              img:
                "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1141259048,554497535&fm=26&gp=0.jpg",
              name: "AUSSIE//修复奇迹，牛仔裤",
              price: "8912₽",
              num: "2",
              transPrice: "300₽",
              totalPrice: "1000₽",
            },
            {
              shopAdress: "俄罗斯",
              shopTel: "138000000",
              shopName: "shopvill",
              img:
                "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1141259048,554497535&fm=26&gp=0.jpg",
              name: "AUSSIE//修复奇迹，牛仔裤",
              price: "8900₽",
              num: "3",
              transPrice: "300₽",
              totalPrice: "1000₽",
            },
            {
              shopAdress: "俄罗斯",
              shopTel: "138000000",
              shopName: "shopvill",
              img:
                "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1141259048,554497535&fm=26&gp=0.jpg",
              name: "AUSSIE//修复奇迹，牛仔裤",
              price: "9875₽",
              num: "1",
              transPrice: "300₽",
              totalPrice: "1000₽",
            },
          ],
        }
      ],
      orderBuffer:{},
    };
  },
  mounted(){
    const orderProduct=JSON.parse(localStorage.getItem('orderBuffer'))
    this.orderBuffer=orderProduct||this.$store.state.orderBuffer
    console.log(this.orderBuffer);
  },
  inject:['loadCartList'] ,
  methods: {
    onSubmit() {
      console.log(this.orderBuffer.payment)
      if(this.orderBuffer.payment==undefined){
          // this.orderBuffer.payment=this.$lang["赊账"]
          this.orderBuffer.payment="赊账"
      }
      const newOrderBuffer={
        totalPrice:this.orderBuffer.totalPrice.toFixed(2),
        productPrice:this.orderBuffer.totalPrice.toFixed(2),
        transPrice:this.transPrice,
        productList:this.orderBuffer.productList,
        payment:'赊账'
      }
      console.log(newOrderBuffer);
      this.$request.order(newOrderBuffer).then(res => {
        if (res.code == 0) {
          this.loadCartList();
          //this.$store.dispatch("loadCartList")
          let orderId = res.data._id;
          this.$message({
            message: this.$t('message.订单已提交'),
            type: 'success'
          });
          // this.$toast({
          //   message: this.$lang["订单已提交"]
          // });
          // this.$router.push("/orderDetail/" + res.data._id);
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
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
            width: 100px;
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
