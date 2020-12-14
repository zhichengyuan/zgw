<template>
  <div class="trans">
    <div class="content">
      <div class="part">
        <h1>SHIPPING INFORMATION</h1>
        <span
          >Our goal is to offer you the best shipping options, no matter where you live. We deliver to hundreds of customers across the world every day, and we strive to provide you with services of the highest level.</span
        >
        <h3>A.The time frame of an order delivery is divided into two parts:
          <p>Processing time: 3-7 Days</p>
          <p>Shipping time: 14~30 Days</p>
        </h3>
        <h3>B.Shipping methods: 填写运输方式</h3>
        <h3>C.Shipping fee: 填写运费（有具体运费说明或说明运费参考的页面）</h3>
        <div>Note:  Affected by Covid-19, there will be some delay on the delivery.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "privacy",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.trans {
  position: relative;
  background-color: #fff;
  .content {
    min-height: calc(100vh - 578px - 208px + 5px);
    width: 100%;
    max-width: 1500px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 30px;
    margin: 0 auto;
    .part {
      h1 {
        font-weight: 700;
        margin: 10px 0 10px;
      }
      span {
        font-size: 18px;
        text-align: center;
      }
      h3{
        margin: 10px 0 10px;
      }
    }
  }
}
</style>
