<template>
  <main class="box-wrap">
    <div class="box account-box" id="box">
      <h2 class="title top-title" style="border: 1px solid #;">{{ this.$t('uc.menuTitle.AccountManagement') }}</h2>
      <SecuritySettings/>
      <PaymentTerm/>
      <FeeLevel/>
    </div>
  </main>
</template>

<script>

  import SecuritySettings from './securitySettings.vue'
  import PaymentTerm from './paymentTerm.vue'
  import FeeLevel from './feeLevel.vue'

  export default {
    data() {
      return {}
    },
    components: {
      SecuritySettings,
      PaymentTerm,
      FeeLevel
    },
    methods: {}
  }
</script>

<style scoped>
  .box-wrap {
    padding-top: 60px;
    background: #fff;
  }

  .box {
    /*color: #000;*/
    width: 1200px;
    margin: auto;
    padding-bottom: 86px;
  }
</style>

<style lang="scss">
  .account-box {
    .title {
      color: #000;
      font-weight: normal;
      font-size: 18px;
      height: 55px;
      line-height: 55px;
      width: 100%;
      background: rgba(244, 246, 248, 1);
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      padding-left: 35px;
    }

    .top-title {
      margin-top: 39px;
    }

    .nav-right .user .user-top-ico {
      border: none;
    }

    .rightarea {
      background: #fff;
      padding: 0 35px;

      .account-in .account-item-in {
        /*background: #111530;*/
        border-top: 1px solid #eeeeee;
      }

      .nav-right .user .user-top-icon {
        border: none;
      }

      span.card-number {
        color: #333;
      }
    }
  }
</style>
