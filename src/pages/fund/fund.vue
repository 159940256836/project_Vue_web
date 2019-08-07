<template>
  <div class="fund-box">
    <div class="fund-main">
      <header></header>
      <section></section>
      <footer></footer>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  created () {},
  methods: {},
  watch: {},
  mounted () {}
}
</script>
<style scoped></style>
<style scoped lang="scss">
  .fund-box {
    padding-top: 8px;
    .fund-main {
      header {
        height: 510px;
        background: url("../../assets/images/bannerBk.png") 0 0 no-repeat;
        background-position: center;
      }
      section, footer{
        width: 1200px;
        margin: 0 auto;
    }
      section {
        min-height: 400px;
        background: #dddddd;
      }
      footer {
        min-height: 150px;
        background: #8090af;
        margin: 20px auto 50px;
      }
    }
  }
</style>
