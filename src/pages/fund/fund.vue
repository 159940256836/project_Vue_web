<template>
  <div class="fund-box">
    <div class="fund-main">
      <header></header>
      <section></section>
      <footer>
        <div class="fund-table">
          <Table
            :no-data-text="$t('common.nodata')"
            stripe
            :columns="tableColumnsBlc"
            :data="tableMoney"
            :loading="loading"
            :disabled-hover="true"
          ></Table>
          <div class="page-wrap">
            <Page
              v-show="totalElement > 10"
              :current="pageNo"
              :total="parseInt(totalElement)"
              :page-size="pageSize"
              @on-change="changePage"
              id="record_pages"
            ></Page>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      loading: false,
      pageNo: 1,
      pageSize: 10,
      pageNum: 1,
      ieoDataList: []
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    getDataList(pageNo, pageSize) {
      let params = {};
      params["pageNo"] = pageNo;
      params["pageSize"] = pageSize;
      this.$http.post(this.host + "/uc/gift/record", params).then(res => {
        const resp = res.body;
        if (resp.code == 0) {
          this.loading = false;
          this.getList(params).then(res => {
            this.ieoDataList = res.data;
            this.totalElement = res.total;
          });
        }
      });
    }
  },
  watch: {},
  mounted () {}
}
</script>
<style lang="scss">
  .ivu-table {
    &:before {
      background: transparent;
    }
  }
  .fund-table {
    .ivu-table-wrapper {
      td {
        background: #111530;
      }
      .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
      .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
        background: #10122B;
      }
      .ivu-table-header {
        thead th {
          height: 50px;
          background: #191D3A;
        }
      }
      tbody.ivu-table-tbody .ivu-table-row td {
        background: #111530;
        &:last-child {
          text-align: left;
        }
      }
    }
  }
  #record_pages li.ivu-page-item.ivu-page-item-active {
    background-color: #111530;
    border-color: #191f44;
    a {
      color: #3399ff;
    }
  }
  #record_pages li.ivu-page-item.ivu-page-item-active {
    &:hover {
      background-color: #111530;
      a {
        color: #3399ff;
      }
    }
  }
  .ivu-page-item {
    background: #111530;
    color: #8090AF;
    border: 1px solid #191f44;
  }
  .ivu-page-item:hover {
    color: #3399ff;
  }
</style>
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
