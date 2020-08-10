<template>
  <!-- 订单页面 -->
  <div class="orderList">
    <div class="list-wrapper">
      <div class="list-content">
        <!-- theme -->
        <h2>个人订单列表</h2>
        <!-- 订单列表 -->
        <div class="list">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="所有订单" name="0">
              <div class="orde-detail">
                <el-table :data="orderList" style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <el-table :data="scope.row.productList" style="width: 100%">
                        <el-table-column prop="img" label="商品主图" width="100">
                          <template slot-scope="scope">
                            <img :src="$imgpath(scope.row.pic)" alt />
                          </template>
                        </el-table-column>
                        <el-table-column prop="name" label="商品名称"></el-table-column>
                        <el-table-column prop="skuprice" label="单价"></el-table-column>
                        <el-table-column prop="productNumber" label="数量"></el-table-column>
                        <el-table-column prop="transPrice" label="运费"></el-table-column>
                        <el-table-column prop="totalPrice" label="总金额"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column label="物流编号" prop="logNum"></el-table-column>
                  <el-table-column label="物流方式" prop="logPath"></el-table-column>
                  <el-table-column label="收货地址" prop="shopName"></el-table-column>
                  <el-table-column label="订单状态" prop="orderStatus"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="待发货" name="1">待发货</el-tab-pane>
            <el-tab-pane label="待收货" name="2">待收货</el-tab-pane>
            <el-tab-pane label="已收货" name="3">已收货</el-tab-pane>
            <el-tab-pane label="已取消" name="4">已取消</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data() {
    return {
      list: [],
      orderList: [],
      status: "-1",
      orderall: [],
      activeName: -1,
      orderId: "",
      activeNames: ["1"],
      activeName: "0",
      shopData: [
        {
          logNum: "125401011",
          logPath: "顺丰快递",
          shopName: "俄罗斯莫斯科",
          orderStatus:"待发货",
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
        },
      ],
    };
  },
  created(){
    this.getData();
    this.getOrderList();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    attribute(item) {

      let name = Object.values(item)
      return name
    },
    // 取消订单
    cancle(item) {
      item.status = '4'
      // const infoCancel = {
      //   _id: item._id,
      //   status: '4'
      // }

      this.$request.orderCancel(item).then(res => {
        if (res.code == 0) {
          this.getOrderList();
        }

      })

      // if(item.warehousId){
      //   var obj = {
      //     _id: item.warehousId,
      //     status: '4'
      //   }
      //   console.log(obj);
      //   this.$request.receiptSave(obj).then(res => {
      //     console.log('成功了',res);
      //   })
      // }
      // console.log('dddddd',infoCancel)
      // this.$request.order(infoCancel).then(res => {
      //   if (res.code == 0) {
      //     this.getOrderList();
      //   }

      // })

    },
    // 订单已收货
    finished(item) {
      const infoFinsh = {
        _id: item._id,
        status: '3'
      }
      if(item.warehousId){
        var objFinsh = {
          _id: item.warehousId,
          status: '3'
        }
        this.$request.receiptSave(objFinsh).then(res => {
        })
      }
      this.$request.order(infoFinsh).then(res => {
        if (res.code == 0) {
          this.getOrderList();
        }

      })
    },
    orderStatus(status) {
      switch (status) {
        case "0":
          return this.$lang["待付款"];
          break;
        case "1":
          return this.$lang["待发货"];
          break;
        case "2":
          return this.$lang["待收货"];
          break;
        case "3":
          return this.$lang["完成收货"];
          break;
        case "4":
          return this.$lang["已取消"];
          break;
      }
    },
    getOrderList() {
      var status = {
        status: this.status
      };
      this.$request.orderList(this.status).then(res => {
        if (res.code == 0) {
          console.log(res);
          this.orderList = res.data.items;
        }

      });
    },
    onClick(name) {
      this.status = name;
      this.getOrderList();
    },
    //点击左侧按钮跳转到上一级
    onClickLeft() {
      this.$router.back(-1);
    },
    //从vuex中获取订单状态数据
    getData() {
      this.list.push(...this.$store.state.odList);
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__item {
  width: 25%!important;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}
/deep/ .el-tabs__item.is-active{
color:#ff9000 ;
}
/deep/ .el-tabs__active-bar{
  width: 25%;
  background:#ff9000 ;
}
.orderList {
  position: relative;
  background-color: #fff;
  .list-wrapper {
    padding: 0 30px;
    max-width: calc(1360px + 2 * 30px);
    min-height: calc(100vh - 578px - 208px + 5px);
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    .list-content {
      padding-top: 40px;
      > h2 {
        font-weight: 700;
        font-size: 36px;
      }
      .list {
        margin-top: 50px;

        .cell {
          > img {
            width: 100px;
          }
        }
      }
    }
  }
}
</style>
