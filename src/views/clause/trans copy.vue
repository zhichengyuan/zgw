<template>
  <div class="trans">
    <div class="content">
      <div class="part">
        <h1>Информация о погрузке</h1>
        <span>
          наша цель - предоставить вам лучший транспорт, где бы вы ни жили.Мы ежедневно предоставляем услуги сотням клиентов во всем мире, и мы стараемся обеспечить вам самый высокий уровень обслуживания.
        </span>
        <h3>A.срок поставки заказа разделен на две части:
          <p>время обработки: 3 - 7 дней</p>
          <p>время отгрузки: 14 - 30 дней</p>
        </h3>
        <h3>B.вид транспорта:международная логистика </h3>
        <h3>C.фрахт: освобождение от уплаты фрахта </h3>
        <div>Примечание: под воздействием ковида - 19 поставка будет иметь некоторые задержки.</div>
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
