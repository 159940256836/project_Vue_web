
<template>
  <div class="transactionCosts new_Usereement">
    <!-- <div class="top">
      <div class="title_a">{{$t("foot.Usment")}}</div>
    </div> -->
    <div class="contenta">
      <div class="contenta_title">{{ $t("footer.Usegreement") }}</div>
      <div class="contenta_list">
        <div
          style="cursor: pointer"
          @click="contentaTab(1)"
          :class="tabid==1?'activeaa':''"
          class="list1"
        >
          {{ $t("footer.Precautions") }}
        </div>
        <div
          style="cursor: pointer"
          @click="contentaTab(2)"
          :class="tabid==2?'activeaa':''"
        >
          {{ $t("footer.Usegreement") }}
        </div>
        <div
          style="cursor: pointer"
          @click="contentaTab(3)"
          :class="tabid==3?'activeaa':''"
        >
          {{ $t("footer.Policnderstanding") }}
        </div>
      </div>
      <div class="contenta_cont contenta_contone" v-show="tabid==1">
        <!-- <div class="contenta_cont_title">用户协议</div> -->
        <div class="contenta_cont_content">
          <p class="contenta_aa">{{$t("foot.p19")}}</p>
          <p class="contenta_cc">1.{{$t("foot.p20")}}</p>
          <p class="contenta_cc">2.{{$t("foot.p21")}}</p>
          <p class="contenta_cc">3.{{$t("foot.p22")}}</p>
          <p class="contenta_cc">4.{{$t("foot.p23")}}</p>
          <p class="contenta_cc">5.{{$t("foot.p24")}}</p>
          <p class="contenta_cc">6.{{$t("foot.p25")}}</p>
          <p class="contenta_cc">7.{{$t("foot.p26")}}</p>
          <p class="contenta_cc">8.{{$t("foot.p27")}}</p>
          <p class="contenta_bb">{{$t("foot.p28")}}</p>
          <p class="contenta_cc">1.{{$t("foot.p29")}}</p>
          <p class="contenta_cc">2.{{$t("foot.p30")}}</p>
          <p class="contenta_cc">3.{{$t("foot.p31")}}</p>
          <p class="contenta_cc">{{$t("foot.p32")}}</p>
          <p class="contenta_cc">5.{{$t("foot.p33")}}</p>
          <p class="contenta_cc">6.{{$t("foot.p34")}}</p>
          <p class="contenta_cc">7.{{$t("foot.p35")}}</p>
          <p class="contenta_cc">{{$t("foot.p36")}}</p>
        </div>
      </div>
    </div>

    <div class="contenta contenta_two" v-show="tabid==2">
      <div class="contenta_cont">
        <!-- <div class="contenta_cont_title">{{$t("foot.p37")}}</div> -->
        <div class="contenta_cont_content new_tabid2">
          <p class="contenta_aa">{{$t("foot.p38")}}：</p>
          <p class="contenta_cc">1.1{{$t("foot.p39")}}</p>
          <p class="contenta_cc">1.2{{$t("foot.p40")}}</p>
          <p class="contenta_cc">1.3{{$t("foot.p41")}}</p>
          <p class="contenta_cc">1.4{{$t("foot.p42")}}</p>
          <p class="contenta_cc">1.5{{$t("foot.p43")}}</p>
          <p class="contenta_cc">1.6{{$t("foot.p44")}}</p>
          <p class="contenta_cc">1.6.1{{$t("foot.p45")}}</p>
          <p class="contenta_cc">1.6.2{{$t("foot.p46")}}</p>
          <p class="contenta_cc">1.6.3{{$t("foot.p47")}}</p>
          <p class="contenta_cc">1.6.4{{$t("foot.p48")}}</p>
          <p class="contenta_cc">1.6.5{{$t("foot.p49")}}</p>
          <p class="contenta_cc">1.6.6{{$t("foot.p50")}}</p>
          <p class="contenta_cc">1.6.7{{$t("foot.p51")}}</p>
          <p class="contenta_cc">1.6.8{{$t("foot.p52")}}</p>
          <p class="contenta_bb">{{$t("foot.p53")}}</p>
          <p class="contenta_cc">{{$t("foot.p54")}}</p>
          <p class="contenta_bb">{{$t("foot.p55")}}</p>
          <p class="contenta_bb">3.1{{$t("foot.p56")}}</p>
          <p class="contenta_cc">{{$t("foot.p57")}}</p>
          <p class="contenta_bb">3.2{{$t("foot.p58")}}</p>
          <p class="contenta_cc">{{$t("foot.p59")}}</p>
          <p class="contenta_bb">3.3{{$t("foot.p60")}}</p>
          <p class="contenta_cc">3.3.1{{$t("foot.p61")}}</p>
          <p class="contenta_cc">3.3.2{{$t("foot.p62")}}</p>
          <p class="contenta_cc">3.3.3{{$t("foot.p63")}}</p>
          <p class="contenta_cc">3.3.4{{$t("foot.p64")}}</p>
          <p class="contenta_bb">{{$t("foot.p65")}}</p>
          <p class="contenta_cc">{{$t("foot.p66")}}</p>
          <p class="contenta_bb">4.1{{$t("foot.p67")}}</p>
          <p class="contenta_cc">4.1.1{{$t("foot.p68")}}</p>
          <p class="contenta_cc">4.1.2{{$t("foot.p69")}}</p>
          <p class="contenta_cc">4.1.3{{$t("foot.p70")}}</p>
          <p class="contenta_cc">4.1.4{{$t("foot.p71")}}</p>
          <p class="contenta_bb">4.2.{{$t("foot.p72")}}</p>
          <p class="contenta_cc">4.2.1{{$t("foot.p73")}}</p>
          <p class="contenta_cc">4.2.2{{$t("foot.p74")}}</p>
          <p class="contenta_cc">4.2.3{{$t("foot.p75")}}</p>
          <p class="contenta_cc">4.2.4{{$t("foot.p76")}}</p>
          <p class="contenta_cc">4.2.5{{$t("foot.p77")}}</p>
          <p class="contenta_cc">4.2.6{{$t("foot.p78")}}</p>
          <p class="contenta_cc">4.2.7{{$t("foot.p79")}}</p>
          <p class="contenta_bb">4.3.{{$t("foot.p80")}}</p>
          <p class="contenta_cc">4.3.1{{$t("foot.p81")}}</p>
          <p class="contenta_cc">{{$t("foot.p82")}}</p>
          <p class="contenta_cc">4.3.1.1{{$t("foot.p83")}}</p>
          <p class="contenta_cc">{{$t("foot.p84")}}</p>
          <p class="contenta_cc">4.3.1.2{{$t("foot.p85")}}</p>
          <p class="contenta_cc">{{$t("foot.p86")}}</p>
          <p class="contenta_cc">4.3.1.3{{$t("foot.p87")}}</p>
          <p class="contenta_cc">{{$t("foot.p88")}}</p>
          <p class="contenta_cc">4.3.1.4{{$t("foot.p89")}}</p>
          <p class="contenta_cc">{{$t("foot.p90")}}</p>
          <p class="contenta_bb">{{$t("foot.p91")}}</p>
          <p class="contenta_cc">5.1{{$t("foot.p92")}}</p>
          <p class="contenta_cc">5.2{{$t("foot.p93")}}</p>
          <p class="contenta_cc">5.3{{$t("foot.p94")}}</p>
          <p class="contenta_cc">5.4{{$t("foot.p95")}}</p>
          <p class="contenta_cc">5.5{{$t("foot.p96")}}</p>
          <p class="contenta_cc">5.6{{$t("foot.p97")}}</p>
          <p class="contenta_cc">5.7{{$t("foot.p98")}}</p>
          <p class="contenta_cc">5.8{{$t("foot.p99")}}</p>
          <p class="contenta_cc">5.9{{$t("foot.p100")}}</p>
          <p class="contenta_cc">5.10{{$t("foot.p101")}}</p>
          <p class="contenta_cc">5.11{{$t("foot.p102")}}</p>
          <p class="contenta_bb">{{$t("foot.p103")}}</p>
          <p class="contenta_cc">6.1{{$t("foot.p104")}}</p>
          <p class="contenta_cc">6.2{{$t("foot.p105")}}</p>
          <p class="contenta_bb">{{$t("foot.p106")}}</p>
          <p class="contenta_cc">{{$t("foot.p107")}}</p>
          <p class="contenta_bb">{{$t("foot.p108")}}</p>
          <p class="contenta_cc">8.1{{$t("foot.p109")}}</p>
          <p class="contenta_cc">8.1.1{{$t("foot.p110")}}</p>
          <p class="contenta_cc">8.1.2{{$t("foot.p111")}}</p>
          <p class="contenta_cc">8.1.3{{$t("foot.p112")}}</p>
          <p class="contenta_cc">8.1.4{{$t("foot.p113")}}</p>
          <p class="contenta_cc">8.1.5{{$t("foot.p114")}}</p>
          <p class="contenta_cc">8.1.6{{$t("foot.p115")}}</p>
          <p class="contenta_cc">8.1.7{{$t("foot.p116")}}</p>
          <p class="contenta_cc">8.1.8{{$t("foot.p117")}}</p>
          <p class="contenta_cc">8.1.9{{$t("foot.p118")}}</p>
          <p class="contenta_cc">8.1.1{{$t("foot.p119")}}</p>
          <p class="contenta_cc">8.2{{$t("foot.p120")}}</p>
          <p class="contenta_cc">8.2.1{{$t("foot.p121")}}</p>
          <p class="contenta_cc">8.2.2{{$t("foot.p122")}}</p>
          <p class="contenta_cc">8.2.3{{$t("foot.p123")}}</p>
          <p class="contenta_cc">8.2.4{{$t("foot.p124")}}</p>
          <p class="contenta_cc">8.2.5{{$t("foot.p125")}}</p>
          <p class="contenta_cc">8.3{{$t("foot.p126")}}</p>
          <p class="contenta_cc">8.4{{$t("foot.p127")}}</p>
          <p class="contenta_cc">8.5{{$t("foot.p128")}}</p>
          <p class="contenta_cc">8.6{{$t("foot.p129")}}</p>
          <p class="contenta_cc">8.7{{$t("foot.p130")}}</p>
          <p class="contenta_cc">8.8{{$t("foot.p131")}}</p>
          <p class="contenta_cc">8.9{{$t("foot.p132")}}</p>
          <p class="contenta_bb">{{$t("foot.p133")}}</p>
          <p class="contenta_cc">9.1{{$t("foot.p134")}}</p>
          <p class="contenta_cc">9.2{{$t("foot.p135")}}</p>
          <p class="contenta_cc">9.3{{$t("foot.p136")}}</p>
          <p class="contenta_cc">9.4{{$t("foot.p137")}}</p>
          <p class="contenta_bb">{{$t("foot.p138")}}</p>
          <p class="contenta_cc">10.1{{$t("foot.p139")}}</p>
          <p class="contenta_cc">10.2{{$t("foot.p140")}}</p>
          <p class="contenta_cc">10.3{{$t("foot.p141")}}</p>
          <p class="contenta_cc">10.4{{$t("foot.p142")}}</p>
          <p class="contenta_cc">10.5{{$t("foot.p143")}}</p>
          <p class="contenta_bb">{{$t("foot.p144")}}</p>
          <p class="contenta_cc">11.1{{$t("foot.p145")}}</p>
          <p class="contenta_cc">11.1.1{{$t("foot.p146")}}</p>
          <p class="contenta_cc">11.1.2{{$t("foot.p147")}}</p>
          <p class="contenta_cc">11.1.3{{$t("foot.p148")}}</p>
          <p class="contenta_cc">11.1.4{{$t("foot.p149")}}</p>
          <p class="contenta_cc">11.2{{$t("foot.p150")}}</p>
          <p class="contenta_cc">11.2.1{{$t("foot.p151")}}</p>
          <p class="contenta_cc">11.2.1.1{{$t("foot.p152")}}</p>
          <p class="contenta_cc">11.2.1.2{{$t("foot.p153")}}</p>
          <p class="contenta_cc">11.2.1.3{{$t("foot.p154")}}</p>
          <p class="contenta_cc">11.2.1.4{{$t("foot.p155")}}</p>
          <p class="contenta_cc">11.2.1.5{{$t("foot.p156")}}</p>
          <p class="contenta_cc">11.2.1.6{{$t("foot.p157")}}</p>
          <p class="contenta_cc">11.2.1.7{{$t("foot.p158")}}</p>
          <p class="contenta_cc">11.2.1.8{{$t("foot.p159")}}</p>
          <p class="contenta_cc">11.2.1.9{{$t("foot.p160")}}</p>
          <p class="contenta_cc">11.2.1.10{{$t("foot.p161")}}</p>
          <p class="contenta_cc">11.2.2{{$t("foot.p162")}}</p>
          <p class="contenta_cc">11.3{{$t("foot.p163")}}</p>

          <p class="contenta_bb">{{$t("foot.p164")}}</p>
          <p class="contenta_cc">{{$t("foot.p165")}}</p>
          <p class="contenta_bb">{{$t("foot.p166")}}</p>
          <p class="contenta_cc">{{$t("foot.p167")}}</p>
          <p class="contenta_bb">{{$t("foot.p168")}}</p>
          <p class="contenta_cc">{{$t("foot.p169")}}</p>
          <p class="contenta_bb">{{$t("foot.p170")}}</p>
          <p class="contenta_cc">{{$t("foot.p171")}}</p>
          <p class="contenta_bb">{{$t("foot.p172")}}</p>
          <p class="contenta_cc">{{$t("foot.p173")}}</p>
          <p class="contenta_bb">{{$t("foot.p174")}}</p>
          <p class="contenta_cc">{{$t("foot.p175")}}</p>
          <p class="contenta_bb">{{$t("foot.p176")}}</p>
          <p class="contenta_cc">{{$t("foot.p177")}}</p>
          <p class="contenta_bb">{{$t("foot.p178")}}</p>
          <p class="contenta_cc">{{$t("foot.p179")}}</p>
          <p class="contenta_bb">{{$t("foot.p180")}}</p>
          <p class="contenta_cc">20.1{{$t("foot.p181")}}</p>
          <p class="contenta_cc">20.2{{$t("foot.p182")}}</p>
        </div>
      </div>
    </div>

    <div class="contenta contentb" v-show="tabid==3">
      <div class="contenta_cont">
        <!-- <div class="contenta_cont_title">{{$t("foot.p183")}}</div> -->
        <div class="contenta_cont_content new_tabid2">
          <p class="contenta_aa">{{$t("foot.p184")}}</p>
          <p class="contenta_cc">1.1{{$t("foot.p185")}}</p>
          <p class="contenta_cc">1.2{{$t("foot.p186")}}</p>

          <p class="contenta_bb">{{$t("foot.p187")}}</p>
          <p class="contenta_cc">2.1{{$t("foot.p188")}}</p>
          <p class="contenta_cc">2.2{{$t("foot.p189")}}</p>
          <p class="contenta_cc">2.3{{$t("foot.p190")}}</p>
          <p class="contenta_cc">2.4{{$t("foot.p191")}}</p>
          <p class="contenta_cc">2.5{{$t("foot.p192")}}</p>
          <p class="contenta_cc">2.6{{$t("foot.p193")}}</p>
          <p class="contenta_cc">2.7{{$t("foot.p194")}}</p>
          <p class="contenta_cc">2.8{{$t("foot.p195")}}</p>
          <p class="contenta_bb">{{$t("foot.p196")}}</p>
          <p class="contenta_cc">3.1{{$t("foot.p197")}}</p>
          <p class="contenta_cc">3.1.1{{$t("foot.p198")}}</p>
          <p class="contenta_cc">{{$t("foot.p199")}}</p>
          <p class="contenta_cc">{{$t("foot.p200")}}</p>
          <p class="contenta_cc">{{$t("foot.p201")}}</p>
          <p class="contenta_cc">3.1.2{{$t("foot.p202")}}</p>
          <p class="contenta_cc">{{$t("foot.p203")}}</p>
          <p class="contenta_cc">{{$t("foot.p204")}}</p>
          <p class="contenta_cc">
            3.1.3{{$t("foot.p205")}}
          </p>
          <p class="contenta_cc">3.2{{$t("foot.p206")}}</p>
          <p class="contenta_cc">3.2.1{{$t("foot.p207")}}</p>
          <p class="contenta_cc">3.2.2{{$t("foot.p208")}}</p>
          <p class="contenta_cc">
            3.2.3{{$t("foot.p209")}}
          </p>
          <p class="contenta_cc">
            3.2.4{{$t("foot.p210")}}
          </p>

          <p class="contenta_bb">{{$t("foot.p211")}}</p>
          <p class="contenta_cc">4.1{{$t("foot.p212")}}</p>
          <p class="contenta_cc">
            4.2{{$t("foot.p213")}}
          </p>
          <p class="contenta_cc">
            4.3{{$t("foot.p214")}}
          </p>
          <p class="contenta_cc">
            4.4{{$t("foot.p215")}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabid: 1
    }
  },
  computed: {},
  methods: {
    contentaTab(n) {
      this.tabid = n
      console.log(2)
    }
  }
}
</script>
<style lang="scss">
.new_Usereement .contenta .contenta_list > div:hover{
  color:#3399ff;
}

.new_Usereement{
  background:#0e0e28 !important;
  .contentb {
  padding-bottom: 140px !important;
}
.contenta {
  width: 100%;
  position: relative;
  top: 60px;
  padding-top: 50px;
  padding-bottom: 50px;
  .contenta_list{
    display:flex;
    width:1200px;
    background:rgba(17,21,48,1);
    height:64px;
    line-height:64px;
    font-size:14px;
    color:#fff;
    margin: 26px auto 22px;
    .list1{
      margin-left:30px;
    }
    >div{
      // width:130px;
      text-align:center;
      margin-right:47px;
    }
  }
  .contenta_title{
    font-size:20px;
    color:#fff;
    width:1200px;
    padding-top:39px;
    margin:0 auto;
  }
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
    // border: 1px solid #ddd;
    .contenta_cont_title {
      width: 1138px;
      margin-left: 31px;
      height: 90px;
      // color: #333333ff;
      font-size: 18px;
      border-bottom: 1px solid #ddddddff;
      line-height: 90px;
      // text-align: center;
    }
  }
}
.top {
  width: 100%;
  // height: 242px;
  // background: url(../../assets/images/fl1.png) 0 0 no-repeat;
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
  .contenta_aa{
  color:#fff !important;
}
.contenta_bb{
  color:#fff !important;
}
.new_tabid2{
  position:relative;
  top:-50px;
}
.contenta_contone{
  margin-bottom: 80px !important;
}
.contenta_two{
  padding-bottom: 100px !important;
}
.contenta{
  padding-top:0 !important;
}
.activeaa{
  color:#3399FF;
  border-bottom:1px solid #3399FF;
}
   .contenta_cont{
    border:0 !important;
  }
  .contenta_cont_content{
    background:rgba(17,21,48,1);
    border:1px solid rgba(17,21,48,1);
    color:#8090AF !important;
    font-size:14px !important;
  }
  .contenta_cont_title{
    width:1200px !important;
    margin-left:0 !important;
    border:0 !important;
    background:rgba(25,29,58,1);
    border:1px solid rgba(17,21,48,1);
    height:64px !important;
    line-height:64px !important;
    color:#8090AF !important;
    font-size:16px !important;
    padding-left:30px !important;

  }
}



</style>
