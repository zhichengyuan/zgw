<template>
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
            <el-table-column :label="$t('message.物流编号')" prop="logNum">
                <template slot-scope="scope">
                <span>{{ scope.row.logId?scope.row.logId:'--' }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('message.物流方式')" prop="logPath">
                <template slot-scope="scope">
                <span>{{ scope.row.logType?scope.row.logType:'--' }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('message.运费')" prop="shopName">
                <template slot-scope="scope">
                <span>{{ scope.row.transPrice?scope.row.transPrice:'--' }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('message.收货地址')" prop="shopName">
                <template >
                <span>{{ $store.state.storeinfo.address }}</span>
                </template>
            </el-table-column>
            
            <el-table-column :label="$t('message.商品金额')" prop="productPrice">
              <template slot-scope="scope">
                      <div>{{scope.row.productPrice}}₽</div>
                    </template>
            </el-table-column>
            <el-table-column :label="$t('message.总金额')" prop="totalPrice">
              <template slot-scope="scope">
                      <div>{{scope.row.totalPrice}}₽</div>
                    </template>
            </el-table-column>
            <el-table-column :label="$t('message.订单状态')" prop="status">
                <template slot-scope="scope">
                <span>{{orderStatus(scope.row.status)}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('message.操作')" prop="status">
                <template slot-scope="scope">
                    <el-button type="danger" v-if="scope.row.status == 0 || scope.row.status == 1" @click="cancle(scope.row)">{{$t('message.取消订单')}}</el-button>
                    <el-button type="success" v-if="scope.row.status == 2" @click="finished(scope.row)">{{$t('message.确认收货')}}</el-button>
                <!-- <span>{{orderStatus(scope.row.status)}}</span> -->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

export default {
  name: 'orderDetail',
  props: {
        orderList: {
        type: Array,
            default: () => {
                return [];
            }
        },
    },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
       // 取消订单
    cancle(item) {
        console.log(item);
      item.status = '4'
      // const infoCancel = {
      //   _id: item._id,
      //   status: '4'
      // }
    //   this.$emit('cancleOrder','完成');

      this.$request.orderCancel(item).then(res => {
        if (res.code == 0) {
          this.$emit('cancleOrder','完成');
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
            console.log('已收货')
          this.$emit('cancleOrder','完成');
        }

      })
    },
    orderStatus(status) {
      switch (status) {
        case "0":
          return this.$t('message.待付款');
          break;
        case "1":
          return this.$t('message.待发货');
          break;
        case "2":
          return this.$t('message.待收货');
          break;
        case "3":
          return this.$t('message.完成收货');
          break;
        case "4":
          return this.$t('message.已取消');
          break;
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
