<template>
  <div class="safety-records">
    <div class="nav-right">
      <div class="blc_box">
        <span>{{$t("uc.member.safetyrecords")}}</span>
      </div>
      <div class="blc-table">
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
            :total="totalElement"
            @on-change="changePage"
            id="record_pages"
          ></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from "moment";
  export default {
    components: {},
    data() {
      let that = this;
      return {
        pageNo: 1,
        pageSize: 10,
        pageNum: 1,
        tableMoney: [],
        loading: true,
        totalElement: null,
        coinInfo: []
      };
    },
    created: function () {
      this.getList(this.pageNo);
    },
    watch: {},
    methods: {
      getList(obj) {
        this.$http.get(this.host + `/uc/user/log/page-query?pageNo=${obj}`).then(res => {
          const resp = res.body;
          if (resp.code == 0) {
            this.loading = false;
            this.tableMoney = resp.data.content;
            this.totalElement = resp.data.totalElements;
          } else {
            this.$Message.error(resp.message)
            this.loading = false;
          }
        });
      },
      changePage(obj) {
        this.getList(obj);
      },
      formatTime(date) {
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    computed: {
      lang: function() {
        return this.$store.state.lang
      },
      tableColumnsBlc() {
        let self = this
        const arr = [];
        arr.push({
          title: this.$t('pointPage.userId'),
          key: "memberId",
        });
        arr.push({
          title: this.$t('pointPage.user'),
          key: "userName",
        });

        arr.push({
          title: this.$t('pointPage.ipaddress'),
          key: "ip",
        })
        arr.push({
          title: this.$t('pointPage.ipbelongs'),
          key: "ipAddress",
        });

        arr.push({
          title: this.$t('pointPage.operationtime'),
          key: "createTime",
        });
        arr.push({
          title: this.$t('pointPage.operation'),
          key: "operation",
          render(h, params){
            return h("span", {}, self.$store.state.lang == 'English'?params.row.operationEnglish:params.row.operation);
          }
        });
        return arr;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .safety-records {
    padding-top: 100px;
    width: 1200px;
    margin: 0 auto;
    .nav-right {
      height: auto;
      overflow: hidden;
      margin-bottom: 50px;
      .nowintegration {
        font-size: 24px;
        line-height: 2;
      }
      .blc_box {
        height: 60px;
        line-height: 60px;
        background: #F4F6F8;
        padding: 0 28px;
        margin-bottom: 22px;
        font-weight: 600;
        color: #333;
        border: 1px solid #eeeeee;
        span {
          color: #333;
          font-size: 14px;
        }
        .search_btn {
          height: 32px;
          line-height: 32px;
          width: 86px;
          background: #E62B25;
          color: #fff;
          font-size: 14px;
          border: none;
          outline: none;
          margin: 14px;
          float: right;
          border-radius: 0;
          cursor: pointer;
        }
      }
      .blc-table {
        .page-wrap {
          float: right;
          margin-top: 20px;
        }
      }
    }
  }

</style>
<style lang="scss">
  .safety-records {
    .ivu-table {
      &:before {
        background: transparent;
      }
      th {
        border-bottom: 0;
      }
    }
    .ivu-input-with-suffix {
      padding-right: 32px;
      border-radius: 0;
      background: #111530;
      border: 1px solid #2A3850;
    }
    .blc-table {
      border: 1px solid #eeeeee;
      .ivu-table-wrapper {
        td {
          background: #111530;
        }
        .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
        .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
          background: #fff;
        }
        .ivu-table-header {
          thead th {
            height: 50px;
            background: #fff;
            border-bottom: 1px solid #eeeeee;
            &:last-child {
              text-align: right;
            }
          }
        }
        tbody.ivu-table-tbody .ivu-table-row td {
          background: #F4F6F8;
          &:last-child {
            text-align: right;
          }
        }
        tbody.ivu-table-tip .ivu-table-row td {
          background: #111530;
          &:last-child {
            text-align: center;
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
    .ivu-page-next, .ivu-page-prev {
      background: #111530;
      color: #8090AF;
      border: 1px solid #191f44;
    }
    .ivu-page-item {
      background: #111530;
      color: #8090AF;
      border: 1px solid #191f44;
    }
    .ivu-page-item:hover {
      color: #3399ff;
    }
  }

</style>
