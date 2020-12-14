<template>
  <div class="refund">
    <div class="content">
      <div class="part">
        <h1>Cancellation</h1>
        <span
          >We accept order cancellation before the product is shipped or produced. If the order is cancelled you will get full refund. We cannot cancel the order if the product is already shipped out.</span
        >
        <h1>Returns (if applicable)</h1>
        <span
          >We accept return of products. Customers have the right to apply for a return within 14 days after delivery the product.
To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. To complete your return, we require a receipt or proof of purchase. Please ask our customer service to make sure you send the package to the right address. </span
        >
        <h1>Notes</h1>
        <span
          >Custom-order or personalized items do not have a right to 14 days refund.
If the return is caused by the consumer, consumer should be responsible for the shipping fee. The specific fee should be based on the express company you choose.
If due to our reasons, the goods received are damaged or not correct, the consumer is not required to bear the shipping fee for this reason.
No restocking fee to be charged to the consumers for the return of a product.;</span
        >
        <h1>Refunds (if applicable)</h1>
        <span
          >Once your return is received and inspected, we will email you a notification of receipt. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</span
        >
        <h1>Late or missing refunds (if applicable)</h1>
        <span
          >If you haven’t received a refund yet, first check your bank account again.
Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund, please contact us at 域名相对应邮箱.
Please contact our Customer service at 域名相对应邮箱 to get the return address.</span
        >
        <!-- <span>【备注：银行规定，允许消费者在产品交付后的14天内进行退款】</span> -->
        
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
.refund {
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
