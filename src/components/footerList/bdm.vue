<template>
  <div class="bdm">
    <div class="bdm_top">
      <div>{{$t("foot.p270")}}</div>
      <p class="pp" style="margin-top:20px;">{{$t("foot.p271")}}</p>
      <p class="pp">{{$t("foot.p272")}}</p>
      <p class="pp1">{{$t("foot.p273")}}</p>
      <p class="pp2">{{$t("foot.p274")}}</p>
      <p class="pp2">{{$t("foot.p275")}}</p>
      <p class="pp2">{{$t("foot.p276")}}</p>
      <p class="pp1">{{$t("foot.p277")}}</p>
      <p class="pp2">1.1.{{$t("foot.p278")}}</p>
      <p class="pp2">1.2.{{$t("foot.p279")}}</p>
      <p class="pp2">
        1.3.{{$t("foot.p280")}}
        3.4.{{$t("foot.p281")}}
      </p>
      <p class="pp1">{{$t("foot.p282")}}</p>
      <p class="pp2">2.1.{{$t("foot.p283")}}</p>
      <p class="pp2">2.2.{{$t("foot.p284")}}</p>
      <p class="pp2">2.3.{{$t("foot.p285")}}</p>
      <p class="pp2">2.4.{{$t("foot.p286")}}</p>
      <p class="pp1">{{$t("foot.p287")}}</p>
      <p class="pp2">3.1{{$t("foot.p288")}}</p>
      <p class="pp2">3.2{{$t("foot.p289")}}</p>
      <p class="pp2">3.3{{$t("foot.p290")}}</p>
      <p class="pp2">3.4{{$t("foot.p291")}}</p>
      <p class="pp2">3.5{{$t("foot.p292")}}</p>
      <p class="pp2">3.6{{$t("foot.p293")}}</p>
      <p class="pp2">3.7{{$t("foot.p294")}}</p>
      <p class="pp1">{{$t("foot.p295")}}</p>
      <p class="pp2">{{$t("foot.p296")}}</p>
      <p class="pp2">i.{{$t("foot.p297")}}</p>
      <p class="pp2">ii.{{$t("foot.p298")}}</p>
      <p class="pp2">iii.{{$t("foot.p299")}}</p>
      <p class="pp2">iv.{{$t("foot.p300")}}</p>
      <p class="pp2">v.{{$t("foot.p301")}}</p>
      <p class="pp2">{{$t("foot.p302")}}</p>
      <p class="pp1">{{$t("foot.p303")}}</p>
      <p class="pp2">{{$t("foot.p304")}}</p>
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
<style lang="scss" scoped>
.bdm {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  top: 100px;
  margin-bottom: 200px;
  border: 1px solid #ddd;
  .bdm_top {
    padding: 50px;
  }
  .pp {
    text-indent: 24px;
    color: #333333ff;
  }
  .pp1 {
    margin-top: 30px;
    color: #333333ff;
    font-size: 18px;
    font-weight: bold;
  }
  .pp2 {
    text-indent: 24px;
    color: #333333ff;
  }
  .bdm_top div:nth-child(1) {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #333333ff;
  }
}
</style>
