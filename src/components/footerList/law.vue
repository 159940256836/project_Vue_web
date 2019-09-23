
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
    return {}
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss">
.law{
  background:#f4f6f8;
  padding-bottom: 100px;
  .contenta{
    width: 100%;
    position: relative;
    padding-top: 50px;
    .contenta_newtile{
      width: 1200px;
      margin: 0 auto;
      padding-top:38px;
      border:0;
      .new_title{
        font-size:20px;
        color:#333 !important;
        width:1200px;
        font-weight: bold;
        height: 90px;
        line-height: 90px;
      }
      .contenta_cont_content{
          margin-top:22px;
          background:#fff;
          color:#8090AF;
          font-size:14px;
          padding: 30px;
          .contenta_aa {
            font-size: 14px;
            font-weight: bold;
            color:#333
          }
          .contenta_bb {
            margin-top: 50px;
            font-size: 14px;
            font-weight: bold;
            color:#333
          }
          .contenta_cc {
            font-size: 14px;
            line-height: 40px;
            color:#666666
          }
      }
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
