<template>
  <div class="nav-advert">
    <div class="advert-box">
      <adPublish1></adPublish1>
    </div>
  </div>
</template>
<script>
import adPublish1 from "./AdPublish";
export default {
  components: {adPublish1},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  created() {}
};
</script>
<style lang="scss"></style>
<style scoped lang="scss">
  .nav-advert {
    min-height: 1300px;
    background: #f4f6f8;
    padding-top: 60px;
    .advert-box {
      width: 1200px;
      min-height: 1135px;
      margin: 0 auto;
    }
  }

</style>
