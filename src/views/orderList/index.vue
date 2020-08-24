<template>
  <!-- 订单页面 -->
  <div class="orderList">
    <div class="list-wrapper">
      <div class="list-content">
        <!-- theme -->
        <h2>{{$t('message.个人订单列表')}}</h2>
        <!-- 订单列表 -->
        <div class="list">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('message.所有订单')" name="-1">
              <order-detail :orderList="orderList" @cancleOrder="cancleOrder"></order-detail>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.待支付')" name="0">
              <order-detail :orderList="orderList"></order-detail>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.待发货')" name="1">
              <order-detail :orderList="orderList"></order-detail>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.待收货')" name="2">
              <order-detail :orderList="orderList"></order-detail>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.已收货')" name="3">
              <order-detail :orderList="orderList"></order-detail>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.已取消')" name="4">
              <order-detail :orderList="orderList"></order-detail>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderDetail from './components/orderDetail'
export default {
  name: "orderList",
  components: {
    OrderDetail
  },
  data() {
    return {
      list: [],
      orderList: [],
      status: "-1",
      activeName: -1,
      activeNames: ["1"],
      activeName: "-1",
      
    };
  },
  created(){
    this.getData();
    this.getOrderList();
  },
  methods: {
    cancleOrder(parms){
      // console.log(parms);
      this.getOrderList();
    },
    handleClick(tab, event) {
      this.status = tab.name;
      // console.log(this.status);
      this.getOrderList();
    },
    attribute(item) {

      let name = Object.values(item)
      return name
    },
    getOrderList() {
      var status = {
        status: this.status
      };
      this.$request.orderList(this.status).then(res => {
        if (res.code == 0) {
          // console.log(res);
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
