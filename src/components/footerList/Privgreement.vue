
<template>
  <div class="Privgreement Privgreement_new">
    <!-- <div class="top">
      <div class="title_a">{{$t("foot.Privaeement")}}</div>
    </div> -->
    <div class="contenta contentb">
      <div class="contenta_cont pre_title">
        <!-- 隐私条款 -->
        <div class="contenta_cont_title">{{$t("foot.PrivacPolicy")}}</div>
        <div class="contenta_cont_content">
          <p class="contenta_aa">{{$t("foot.Firstothdes")}}</p>
          <p class="contenta_cc">1.1{{$t("foot.websitedicated")}}</p>
          <p class="contenta_cc">1.2{{$t("foot.Asthenatural")}}</p>
          <p class="contenta_cc">1.3{{$t("foot.referredto")}}</p>
          <p class="contenta_bb">{{$t("foot.purposeof")}}</p>
          <p class="contenta_cc">{{$t("foot.ogginginto")}}</p>
          <p class="contenta_bb">{{$t("foot.Thiryouronsent")}}</p>
          <p class="contenta_cc">{{$t("foot.Privacolicyindetail")}}</p>
          <p class="contenta_cc">3.1{{$t("foot.Youvoluntarily")}}</p>
          <p class="contenta_cc">3.2{{$t("foot.complywithll")}}</p>
          <p class="contenta_cc">3.3{{$t("foot.registerinonthis")}}</p>
          <p class="contenta_cc">3.4{{$t("foot.productandservices")}}</p>
          <p class="contenta_bb">{{$t("foot.nformatiollected")}}</p>
          <p class="contenta_cc">4.1{{$t("foot.actionscollect")}}</p>
          <p class="contenta_cc">4.2{{$t("foot.providefollowing")}}</p>
          <p class="contenta_cc">4.2.1{{$t("foot.certificateissued")}}</p>
          <p class="contenta_cc">4.2.2{{$t("foot.debitnformation")}}</p>
          <p class="contenta_cc">4.3{{$t("foot.informationecessary")}}</p>
          <p class="contenta_cc">4.4{{$t("foot.onwebsite")}}</p>
          <p class="contenta_bb">{{$t("foot.VUseoinformation")}}</p>
          <p class="contenta_cc">5.1{{$t("foot.younformation")}}</p>
          <p class="contenta_cc">5.1.1{{$t("foot.Providewith")}}</p>
          <p class="contenta_cc">5.1.2{{$t("foot.youidentify")}}</p>
          <p class="contenta_cc">5.1.3{{$t("foot.servicequest")}}</p>
          <p class="contenta_cc">5.1.4{{$t("foot.Statisticondata")}}</p>
          <p class="contenta_cc">5.1.5{{$t("foot.ersonalizyour")}}</p>
          <p class="contenta_cc">5.1.6{{$t("foot.ompanyfor")}}</p>
          <p class="contenta_cc">5.1.7{{$t("foot.p1")}}</p>
          <p class="contenta_cc">5.1.8{{$t("foot.p2")}}</p>
          <p class="contenta_cc">5.2{{$t("foot.p3")}}</p>
          <p class="contenta_bb">{{$t("foot.p4")}}</p>
          <p class="contenta_cc">6.1{{$t("foot.p5")}}</p>
          <p class="contenta_cc">6.1.1{{$t("foot.p6")}}</p>
          <p class="contenta_cc">6.1.2{{$t("foot.p7")}}</p>
          <p class="contenta_cc">6.1.3{{$t("foot.p8")}}</p>
          <p class="contenta_cc">6.1.4{{$t("foot.p9")}}</p>
          <p class="contenta_cc">6.1.5{{$t("foot.p10")}}</p>
          <p class="contenta_cc">6.2{{$t("foot.p11")}}</p>
          <p class="contenta_cc">
            6.3{{$t("foot.p12")}}
          </p>
          <p class="contenta_bb">{{$t("foot.p13")}}</p>
          <p class="contenta_cc">
           {{$t("foot.p14")}}
          </p>
          <p class="contenta_bb">{{$t("foot.p15")}}</p>
          <p class="contenta_cc">
            8.1{{$t("foot.p16")}}
          </p>
          <p class="contenta_cc">
            8.2{{$t("foot.p17")}}
          </p>
          <p class="contenta_cc">8.3{{$t("foot.p18")}}</p>
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
    color:#333;
    font-weight: bold;
    font-size:20px;
  }
  .contenta_cont_content{
     margin-top:22px;
    background:#fff;
    color:#666;
    font-size:14px;
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
      color: #333;
      font-weight: bold;
    }
    .contenta_bb {
      margin-top: 30px;
      font-size: 14px;
      color: #666;
      font-weight: bold;
    }
    .contenta_cc {
      text-indent: 14px;
      font-size: 14px;
      color: #666;
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
