<template>
  <div class="contact">
    <div class="content">
      <div class="part">
        <h1>связаться с нами</h1>
        <span>
          если у вас есть какие - либо вопросы или сомнения, пожалуйста, свяжитесь с нами в любое время.

очень рады получить от вас письмо, обратившись к нам

электронная почта:域名相对应的邮箱
        </span>
        
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
.contact {
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
    }
  }
}
</style>
