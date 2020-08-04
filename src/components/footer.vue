<template>
  <div  class="footer">
    <div class="wrapper-fo">
      <div class="content">
        <!-- 网站特色 -->
        <div class="infors">
          <div>
            <span>
              <a href="/">богатый ассортимент, легко купить</a>
            </span>
            <span>
              <a href="/">чистый товар, чистый сервис</a>
            </span>
            <span>
              <a href="/">Прямая доставка, сверхскоростная доставка</a>
            </span>
            <span>
              <a href="/">каждый день низкая цена</a>
            </span>
          </div>
        </div>
        <!-- 合作 -->
        <div class="cooperation">
          <div>
            <span>
              <a href="/">о нас</a>
            </span>
            <span>
              <a href="/">партнёр</a>
            </span>
            <span>
              <a href="/">контактный халат</a>
            </span>
            <span>
              <a href="/">открытая платформа</a>
            </span>
            <span>
              <a href="/">политика уединения</a>
            </span>
            <span>
              <a href="/">юридическое заявление</a>
            </span>
          </div>
        </div>
        <!-- 商店 -->
        <div class="shop">2020-2021 мебель, обувь и одежда матери и ребенка онлайн платформа</div>
        <!-- logo -->
        <div class="logo">LOGO</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
};
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  margin-top: 50px;
  background-color: #ff9000;
  .wrapper-fo {
    min-width: 978px;
    width: 100%;
    max-width: 1500px;
    padding: 62px 30px 60px;
    box-sizing: border-box;
    margin: 0 auto;
    .content {
      font-size: 0;
      margin: 0 auto;
      .infors {
        margin: 0 0 20px;
        > div {
          margin: 0 -10px;
          text-align: center;
        }
        span {
          display: inline-block;
          margin: 0 10px 20px;
          vertical-align: top;
          > a {
            text-decoration: none;
            font-size: 18px;
            line-height: 24px;
            transition: border-color 0.2s ease;
            border: 1px solid rgba(255, 255, 255, 0.28);
            border-radius: 32px;
            box-sizing: border-box;
            color: #fff;
            display: block;
            height: 48px;
            padding: 10px 24px 12px;
            font-weight: 600;
          }
        }
      }
      .cooperation {
        margin: 0 auto 2px;
        opacity: 0.6;
        text-align: center;
        width: 1020px;
        > div {
          margin: 0 -10px;
          text-align: center;
        }
        span {
          display: inline-block;
          margin: 0 10px 20px;
          vertical-align: top;
          > a {
            text-decoration: none;
            font-size: 18px;
            line-height: 24px;
            transition: border-color 0.2s ease;
            border-color: rgba(255, 255, 255, 0.28);
            box-sizing: border-box;
            color: #fff;
            height: 48px;
            font-weight: 600;
          }
        }
      }
      .shop {
        color: #fff;
        margin: 0 auto 2px;
        opacity: 0.6;
        text-align: center;
        width: 570px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
      }
      .logo {
        color: #fff;
        margin: 0 auto;
        text-align: center;
        width: 570px;
        line-height: 50px;
        font-weight: 700;
        font-size: 35px;
        padding-top: 10px;
      }
    }
  }
}
</style>