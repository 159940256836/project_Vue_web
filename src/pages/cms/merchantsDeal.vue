
<template>
  <div class="Privgreement Privgreement_new">
    <!-- <div class="top">
      <div class="title_a">{{$t("merchant.Privaeement")}}</div>
    </div> -->
    <div class="contenta contentb">
      <div class="contenta_cont pre_title">
        <!-- 隐私条款 -->
        <div class="contenta_cont_title">{{$t("merchant.merchant_title")}}</div>
        <div class="contenta_cont_content">
          <p class="contenta_cc">{{$t("merchant.merchant_info1")}}</p>
          <p class="contenta_bb">（一）{{$t("merchant.merchant_info2")}}</p>
          <p class="contenta_cc">1.{{$t("merchant.merchant_info3")}}</p>
          <p class="contenta_cc">2.{{$t("merchant.merchant_info4")}}</p>
          <p class="contenta_cc">3.{{$t("merchant.merchant_info5")}}</p>
          <p class="contenta_cc">4.{{$t("merchant.merchant_info6")}}</p>
          <p class="contenta_cc">5.{{$t("merchant.merchant_info7")}}</p>
          <p class="contenta_cc">6.{{$t("merchant.merchant_info8")}}</p>
          <p class="contenta_cc">7.{{$t("merchant.merchant_info9")}}</p>
          <p class="contenta_cc">8.{{$t("merchant.merchant_info10")}}</p>
          <p class="contenta_cc">9.{{$t("merchant.merchant_info11")}}</p>
          <p class="contenta_bb">（二）{{$t("merchant.merchant_info12")}}</p>
          <p class="contenta_cc">1.{{$t("merchant.merchant_info13")}}</p>
          <p class="contenta_cc">2.{{$t("merchant.merchant_info14")}}</p>
          <p class="contenta_cc">3.{{$t("merchant.merchant_info15")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info16")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info17")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info18")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info19")}}</p>
          <p class="contenta_bb">（三）{{$t("merchant.merchant_info20")}}</p>
          <p class="contenta_cc">1.{{$t("merchant.merchant_info21")}}</p>
          <p class="contenta_cc">2.{{$t("merchant.merchant_info22")}}</p>
          <p class="contenta_cc">3.{{$t("merchant.merchant_info23")}}</p>
          <p class="contenta_cc">4.{{$t("merchant.merchant_info24")}}</p>
          <p class="contenta_bb">（四）{{$t("merchant.merchant_info25")}}</p>
          <p class="contenta_cc">1.{{$t("merchant.merchant_info26")}}</p>
          <p class="contenta_cc">2.{{$t("merchant.merchant_info27")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info28")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info29")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info30")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info31")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info32")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info33")}}</p>
          <p class="contenta_bb">（五）{{$t("merchant.merchant_info34")}}</p>
          <p class="contenta_cc">1.{{$t("merchant.merchant_info35")}}</p>
          <p class="contenta_cc">2.{{$t("merchant.merchant_info36")}}</p>
          <p class="contenta_bb">（六）{{$t("merchant.merchant_info37")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info38")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info39")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info40")}}</p>
          <p class="contenta_cc">• {{$t("merchant.merchant_info41")}}</p>
          <p class="contenta_bb">（七）{{$t("merchant.merchant_info42")}}</p>
          <p class="contenta_cc">{{$t("merchant.merchant_info43")}}</p>
          <p class="contenta_bb">（八）{{$t("merchant.merchant_info44")}}</p>
          <p class="contenta_cc">{{$t("merchant.merchant_info45")}}</p>
          <p class="contenta_bb">（九）{{$t("merchant.merchant_info46")}}</p>
          <p class="contenta_cc">1.{{$t("merchant.merchant_info47")}}</p>
          <p class="contenta_cc">2.{{$t("merchant.merchant_info48")}}</p>
          <p class="contenta_cc">3.{{$t("merchant.merchant_info49")}}</p>
          <p class="contenta_cc">4.{{$t("merchant.merchant_info50")}}</p>
          <p class="contenta_cc">5.{{$t("merchant.merchant_info51")}}</p>
          <p class="contenta_bb">（十）{{$t("merchant.merchant_info52")}}</p>
          <p class="contenta_cc">1.{{$t("merchant.merchant_info53")}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
  },
    computed: {},
    methods: {}
  }
</script>
<style lang="scss">
  .Privgreement_new{
    background:#f4f6f8;
    padding-bottom: 120px;
    .pre_title{
      padding-top:38px;
    }
    .contenta_cont{
      border:0 !important;
    }
    .contenta_cont_title{
      width:1200px;
      margin-left:0;
      border:0;
      height:20px;
      line-height:20px;
      color:#fff;
      font-size:20px;
    }
    .contenta_cont_content{
      margin-top:22px !important;
      background:rgba(17,21,48,1) !important;
      border:1px solid rgba(17,21,48,1) !important;
      color:#8090AF !important;
      font-size:14px !important;
    }
  }
  .Privgreement_new .contenta {
    width: 100%;
    position: relative;
    top: 60px;
    // padding-bottom: 148px;
    .contenta_cont_content {
      padding: 30px;
      .contenta_aa {
        font-size: 14px;
        // color: #333;
        font-weight: bold;
      }
      .contenta_bb {
        margin-top: 30px;
        font-size: 14px;
        // color: #333;
        font-weight: bold;
        color:#fff;
      }
      .contenta_cc {
        text-indent: 14px;
        font-size: 14px;
        // color: #333;
        line-height: 28px;
      }
    }
    .contenta_cont {
      width: 1200px;
      margin: 0 auto;
      border: 1px solid #ddd;
    }
  }

  .Privgreement_new .top {
    width: 100%;
    height: 242px;
    background: url(../../assets/images/fl1.png) 0 0 no-repeat;
    height: auto;
    position: relative;
    top: 60px;
    .title_a {
      width: 1200px;
      height: 242px;
      line-height: 242px;
      margin: 0 auto;
      // color: #ffffffff;
      font-size: 46px;
    }
  }
</style>
