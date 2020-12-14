<template>
  <div class="privacy">
    <div class="content">
      <div class="part">
        <h1>CONTACT US</h1>
        <span
          >If you have any questions or concerns, please do not hesitate to contact us. 
We would love to hear from you, contact us on: 
Email: 域名相对应的邮箱</span
        >
        
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
.privacy {
  position: relative;
  background-color: #fff;
  .content {
    min-height: calc(100vh - 578px - 208px + 5px);
    width: 100%;
    max-width: 1500px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 30px 0;
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
    }
  }
}
</style>
