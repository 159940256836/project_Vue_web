
<template>
  <div class="law">
    <!-- <div class="top">
      <div class="title_a">{{$t("foot.Legatices")}}</div>
    </div> -->
    <div class="contenta contentb">
      <div class="contenta_cont contenta_newtile">
        <!-- 法律声明 -->
        <div class="contenta_cont_title new_title">{{$t("foot.Legatices")}}</div>
        <div class="contenta_cont_content">
          <!-- 第一条 -->
          <p class="contenta_aa">{{$t("foot.First")}}</p>
          <p class="contenta_cc">{{$t("foot.illegtrading")}}</p>
          <!-- 第二条 -->
          <p class="contenta_bb">{{$t("foot.Second")}}</p>
          <p class="contenta_cc">{{$t("foot.investigaticuments")}}</p>
          <!-- 第三条 -->
          <p class="contenta_bb">{{$t("foot.Articleaa")}}</p>
          <p
            class="contenta_cc"
          >{{$t("foot.improvthe")}}</p>
          <!-- 第四条 -->
          <p class="contenta_bb">{{$t("foot.Articlecc")}}</p>
          <p class="contenta_cc">{{$t("foot.Anyonewho")}}</p>
          <!-- 第五条 -->
          <p class="contenta_bb">{{$t("foot.Theth")}}</p>
          <p class="contenta_cc">{{$t("foot.conflicwith")}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getDate();
  },

  computed: {},
  methods: {}
};
</script>
<style lang="scss">

.law{
  padding-bottom: 120px;
  .contenta_newtile{
    padding-top:38px;
  }
  .new_title{
    line-height:20px !important;
    height:20px;
    font-size:20px;
    color:#fff !important;
  
   
   
  }
  .contenta_cont{
    border:0 !important;
  }
  background:#0e0e28;
  .contenta_cont_title{
    width:1200px !important;
    margin-left:0 !important;
    border:0 !important;
    border:1px solid rgba(17,21,48,1);
    height:20px !important;
  }
  .contenta_cont_content{
    margin-top:22px !important;
    background:rgba(17,21,48,1) !important;
    border:1px solid rgba(17,21,48,1) !important;
    color:#8090AF !important;
    font-size:14px !important;
  }
}
.contenta {
  width: 100%;
  position: relative;
  // top: 60px;
  padding-top: 50px;
  // padding-bottom: 148px;
  .contenta_cont_content {
    padding: 30px;
    .contenta_aa {
      font-size: 14px;
      // color: #333;
      font-weight: bold;
    }
    .contenta_bb {
      margin-top: 50px;
      font-size: 14px;
      // color: #333;
      font-weight: bold;
    }
    .contenta_cc {
      font-size: 14px;
      // color: #333;
      line-height: 40px;
    }
  }
  .contenta_cont {
    width: 1200px;
    margin: 0 auto;
    border: 1px solid #ddd;
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
