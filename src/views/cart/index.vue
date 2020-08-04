<template>
  <div>
    <!-- 还未加入购物车 -->
    <div class="empty" v-if="false">
      <h2>您的购物车还没有东西</h2>
      <span>篮子正在等待装满。祝您购物愉快！</span>
    </div>
    <div class="cart-part">
      <div class="cart-content">
        <el-row class="cart-basket">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <!-- 左侧商品内容 -->
              <div class="left-product">
                <h3>购物车正在完善</h3>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <!-- 右侧去结账 -->
              <div class="right-price">去结账</div>
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
      }
      .right-price {
        width: 100%;
    box-sizing: border-box;
    border: 1px solid #e8e8e8;
    background: #fff;
    padding: 32px 40px 27px;
      }
    }
  }
}
</style>
