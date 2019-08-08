<template>
  <div class="lock-records">
    <div class="nav-right">
      <div class="lock_box">
        <span>{{$t("uc.member.lockRecord")}}</span>
      </div>
      <div class="lock_info">
        <span>{{ $t('foot.currency') }}：</span>
        <Input
          v-model="coinId"
          style="width: 260px;"
          size="large"
        />
        <span style="margin-left: 20px;">
          {{ $t('foot.lockStatus') }}：
        </span>
        <Select
          v-model="status"
          style="width:128px;margin-right:30px;"
          :placeholder="$t('header.choose')"
        >
          <Option
            v-for="item in statusData"
            :value="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </Option>
        </Select>
        <button
          class="search_btn"
          @click="getList"
        >
          {{$t('pointPage.search')}}
        </button>
      </div>
      <div class="lock-table">
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
  const FixAraible = (pageSize) => (pageNo) => (status) => (coinId) => ({
    pageSize,
    pageNo,
    status,
    coinId
  });
  const getParams = FixAraible(10, '');
  import moment from "moment";
  export default {
    components: {},
    data() {
      return {
        pageSize: 10,
        pageNo: 1,
        tableMoney: [],
        status: '',
        statusData: [
          {
            value: 0,
            label: '锁定'
          },
          {
            value: 1,
            label: '解锁'
          }
        ],
        coinId: '',
        loading: true,
        totalElement: 0
      };
    },
    created: function () {
      this.getList();
    },
    watch: {},
    methods: {
      getList() {
        const params = getParams(this.pageNo)(this.status)(this.coinId);
        this.$http.post(this.host + `/uc/asset/lock-position`, params).then(res => {
          const resp = res.body;
            if (resp.code == 0) {
              this.loading = false;
              this.tableMoney = resp.data.content;
              console.log(this.tableMoney)
              this.totalElement = resp.data.totalElements;
            }
        });
      },
      changePage(page) {
        this.pageNo = this.pageNo = page;
        this.getList();
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
          title: self.$t('foot.currency'),
          key: "coinId",
        });
        arr.push({
          title: self.$t('foot.amount'),
          key: "amount",
        });

        arr.push({
          title: self.$t('foot.lockTime'),
          key: "lockTime",
        })
        arr.push({
          title: self.$t('foot.unlockTime'),
          key: "unlockTime",
        });

        arr.push({
          title: self.$t('foot.lockType'),
          key: "lockType",
          render: (h, params) => {
            return h("div", {}, params.row.lockType == 0? 'IEO':'募币活动')
          }
        });
        arr.push({
          title: self.$t('foot.lockStatus'),
          key: "lockStatus",
          render: (h, params) => {
            return h("div", {}, params.row.lockStatus == 0? '锁定':'解锁')
          }
        });
        arr.push({
          title: self.$t('foot.reason'),
          key: "reason"
        });
        return arr;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .lock-records {
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
      .lock_box {
        height: 60px;
        line-height: 60px;
        background: #111530;
        padding: 0 28px;
        margin-bottom: 22px;
        font-weight: 600;
        color: #8090af;
        span {
          color: #8090af;
          font-size: 14px;
        }
        .search_btn {
          height: 32px;
          line-height: 32px;
          width: 86px;
          background: #3399ff;
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
      .lock_info {
        height: 60px;
        background: #111530;
        padding-left: 20px;
        line-height: 60px;
        margin-bottom: 20px;
        span {
          color: #8090af;
        }
        .search_btn {
          height: 32px;
          line-height: 32px;
          width: 86px;
          background: #3399ff;
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
      .lock-table {
        .page-wrap {
          float: right;
          margin-top: 20px;
        }
      }
    }
  }

</style>
<style lang="scss">
  .lock-records {
    .ivu-table {
      &:before {
        background: transparent;
      }
      th {
        border-bottom: 0;
      }
    }
    .ivu-select-item {
      color: #8090af;
    }
    .ivu-select-item-focus {
      background: #191d3a;
    }
    .ivu-select-selection {
      width: 130px;
      height: 32px;
      background: #111530;
      border: 1px solid #58698a;
      border-radius: 0;
    }
    .ivu-select-selected-value {
      color: #8090af;
    }
    .ivu-input {
      width: 260px;
      height: 30px;
      border: 1px solid #58698a;
      border-radius: 0;
      background: #111530;
      color: #8090AF;
    }
    .ivu-input-with-suffix {
      padding-right: 32px;
      border-radius: 0;
      background: #111530;
      border: 1px solid #2A3850;
    }
    .lock-table {
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
            &:last-child {
              text-align: right;
            }
          }
        }
        tbody.ivu-table-tbody .ivu-table-row td {
          background: #111530;
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
