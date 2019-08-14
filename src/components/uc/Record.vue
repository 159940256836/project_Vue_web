<template>
    <div class="nav-record">
        <div class="nav-right">
            <div class="bill_flow_box">
                <div class="rightarea-con">
                    <div class="form-group">
                        <span>
                            {{$t('uc.finance.record.start_end')}} ：
                        </span>
                        <DatePicker
                            v-model="rangeDate"
                            @on-change="changedate"
                            format="yyyy-MM-dd"
                            type="daterange"
                            style="margin-right:10px;"
                            @on-clear="clear"
                        ></DatePicker>
                        <!--<DatePicker v-model="startDate" type="date"></DatePicker>-->
                        <!--<span>-->
                        <!--{{$t('uc.finance.record.to')}}-->
                        <!--</span>-->
                        <!--<DatePicker v-model="endDate" type="date"></DatePicker>-->
                        <span style="margin-left: 30px;">{{$t('uc.finance.currency')}}：</span>
                        <Select
                            v-model="coinType"
                            style="width:128px;margin-right:30px;"
                            clearable
                            :placeholder="$t('header.choose')"
                        >
                            <Option
                                v-for="item in coinList"
                                :value="item.coin.unit"
                                :key="item.coin.unit"
                            >
                                {{ item.coin.unit }}
                            </Option>
                        </Select>
                        <span>
                            {{$t('uc.finance.record.operatetype')}} ：
                        </span>
                        <Select
                            v-model="recordValue"
                            clearable
                            style="width: 200px"
                            :placeholder="$t('header.choose')"
                        >
                            <Option
                                v-for="(item, index) in recordType"
                                :value="index"
                                :key="item"
                            >
                                {{ item }}
                            </Option>
                        </Select>
                        <Button
                            type="warning"
                            @click="queryOrder"
                            style="padding: 6px 30px;margin-left:10px;background-color:#3399ff;border-color:#3399ff"
                        >
                            {{$t('uc.finance.record.search')}}
                        </Button>
                    </div>
                    <div class="order-table">
                        <Table
                            stripe
                            :no-data-text="$t('common.nodata')"
                            :columns="tableColumnsRecord"
                            :data="tableRecord"
                            :disabled-hover="true"
                            :loading="loading"
                        ></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page
                                    :total="total"
                                    v-show="total > 10"
                                    :pageSize="pageSize"
                                    show-total
                                    :current="page"
                                    @on-change="changePage"
                                    id="record_pages"
                                ></Page>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const map = new Map([
    ['0', '充值'],
    ['1', '提现'],
    ['2', '转账'],
    ['3', '币币交易'],
    ['4', '法币买入'],
    ['5', '法币卖出'],
    ['6', '活动奖励'],
    ['7', '推广奖励'],
    ['8', '分红'],
    ['9', '投票'],
    ['10', '人工充值'],
    ['11', '配对'],
    ['12', '缴纳商家认证保证金'],
    ['13', '退回商家认证保证金'],
    ['14', '法币充值'],
    ['15', '币币兑换'],
    ['16', '渠道推广'],
    ['17', '划转入杠杆钱包'],
    ['18', '从杠杆钱包划转出'],
    ['19', '钱包空投'],
    ['20', '锁仓'],
    ['21', '解锁'],
    ['22', '第三方转入'],
    ['23', '第三方转出'],
    ['24', '币币转入法币'],
    ['25', '法币转入币币'],
    ['26', '借贷流水'],
    ['27', '还款流水'],
    ['28', '募集新币'],
    ['29', '募币活动'],
    ['30', '低价抢购返还'],
    ['31', '低价抢购空投'],
    ['32', '低价抢购活动'],
])
const mapEn = new Map([
    ['0', 'recharge'],
    ['1', 'withdraw deposit'],
    ['2', 'transfer'],
    ['3', 'currency deal'],
    ['4', 'legal tender buying'],
    ['5', 'legal tender selling'],
    ['6', 'activity reward'],
    ['7', 'Promotion rewards'],
    ['8', 'dividend'],
    ['9', 'voting'],
    ['10', 'Artificial Recharge'],
    ['11', 'pairing'],
    ['12', 'pay the merchant certification deposit'],
    ['13', 'Return the merchant certification deposit'],
    ['14', 'legal tender recharge'],
    ['15', 'currency exchange'],
    ['16', 'Channel promotion'],
    ['17', 'Transfer to lever wallet'],
    ['18', 'Transfer out of the lever wallet'],
    ['19', 'wallet airdrop'],
    ['20', 'locked position'],
    ['21', 'unlock'],
    ['22', 'Third party transfer'],
    ['23', 'Third party roll out'],
    ['24', 'The bitcoins are transferred into legal tender'],
    ['25', 'Legal tender is transferred into bitcoin'],
    ['26', 'loan flow'],
    ['27', 'repayment flow'],
    ['28', 'raise new'],
    ['29', 'money activities'],
    ['30', 'hunting returns'],
    ['31', 'airdrops bargain prices'],
    ['32', 'drop buying']
])

export default {
  components: {},
  data() {
    return {
      loading: false,
      ordKeyword: '',
      rangeDate: '',
      startDate: '',
      endDate: '',
      select: 'select',
      recordValue: '',
            // recordType: [...map.values()],
      coinList: [],
      coinType: '',
      pageSize: 10,
      page: 1,
      total: 0,
      tableRecord: []
    }
  },
  created: function() {
    this.getList(this.page)
    this.getAddrList()
        // const name = this.$route.path
        // console.log(name, this.$route.path);
        // if (name === '/personal/record') {
        //     this.getList(this.page);
        //     this.getAddrList();
        // }
  },
  methods: {
    changedate() {
      if (this.rangeDate[0]) {
        this.startDate = this.dateform(this.rangeDate[0])
        this.endDate = this.dateform(this.rangeDate[1])
      }
    },
    changePage(pageindex) {
      this.page = pageindex
      this.getList(this.page)
    },
    queryOrder() {
      if (this.rangeDate.length == 0) {
        this.$Message.error(this.$t('uc.finance.record.searchPla'))
        return
      } else {
        try {
          this.page = 1
          this.getList(this.page)
        } catch (ex) {
          this.$Message.error(this.$t('uc.finance.record.searchPla'))
          return
        }
      }
    },
    getAddrList() {
            // 获取个人资产币种
      this.$http
                .post(this.host + '/uc/asset/wallet/')
                .then(response => {
                  var resp = response.body
                  if (resp.code == 0) {
                    this.coinList = resp.data
                  } else {
                    this.$Message.error(resp.message)
                  }
                })
    },
    dateform(time) {
      var date = new Date(time)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    getList(pageNo) {
            // 获取tableWithdraw
      let memberId = 0
      !this.$store.getters.isLogin && this.$router.push('/login')
      this.$store.getters.isLogin && (memberId = this.$store.getters.member.id)
      let startDate = ''
      let endDate = ''
      let symbol = ''
      let type = ''
      this.startDate && (startDate = this.startDate)
      this.endDate && (endDate = this.endDate)
      this.coinType && (symbol = this.coinType)
      if (this.recordValue == 0 || this.recordValue) {
        type = this.recordValue
      }
            // this.recordValue!="" || this.recordValue!=undefined && (type = this.recordValue);
      this.loading = true
      const params = {
        pageNo,
        pageSize: this.pageSize,
        startDate,
        endDate,
        memberId,
        symbol,
        type
      }
      this.$http.post(this.host + '/uc/asset/transaction', params).then(response => {
        var resp = response.body
        if (resp.code == 0) {
          this.loading = false
          if (resp.data) {
            const trueData = resp.data
            this.total = trueData.totalElements
            this.tableRecord = trueData.content
          }
        } else {
          this.$Message.error(resp.message)
        }
        this.loading = false
      })
    },
    clear() {
      this.startDate = ''
      this.endDate = ''
    }
  },
  computed: {
    tableColumnsRecord() {
      const columns = []
      var that = this
      const m = this.$store.getters.lang == 'English' ? mapEn : map
      columns.push({
        title: this.$t('uc.finance.record.chargetime'),
        align: 'center',
        render: (h, params) => {
          return h('div', {}, params.row.createTime)
        }
      })
      columns.push({
        title: this.$t('uc.finance.record.type'),
        align: 'center',
        render: function(h, params) {
          const str = ''
          const type = params.row.type.toString()
          return h('div', {}, m.get(type))
        }
      })
      columns.push({
        title: this.$t('uc.finance.record.symbol'),
        align: 'center',
        render: (h, param) => {
          return h('div', {}, param.row.symbol)
        }
      })
      columns.push({
        title: this.$t('uc.finance.Quantityofarrival'),
        align: 'center',
        render(h, params) {
          return h(
                        'span',
            {
              attrs: {
                title: params.row.amount
              }
            },
                        that.toFloor(params.row.amount) || 0
                    )
        }
      })
      columns.push({
        title: this.$t('uc.finance.record.shouldfee'), // "应付手续费"
        align: 'center',
        render(h, params) {
          return h(
                        'span',
            {
              attrs: {
                title: params.row.fee
              }
            },
                        that.toFloor(params.row.fee) || 0
                    )
        }
      })
            // columns.push({
            //     title: this.$t("uc.finance.record.discountfee"), //"抵扣手续费"
            //     width: F,
            //     align: "center",
            //     render(h, params) {
            //         return h(
            //             "span",
            //             {
            //                 attrs: {
            //                     title: params.row.discount_fee
            //                 }
            //             },
            //             Math.abs(that.toFloor(params.row.discount_fee)) || 0
            //         );
            //     }
            // });
      columns.push({
        title: this.$t('uc.finance.record.realfee'), // "实际手续费"
        align: 'center',
        render(h, params) {
          return h(
                            'span',
            {
              attrs: {
                title: params.row.fee
              }
            },
                            that.toFloor(params.row.fee) || 0
                        )
        }
      })
      columns.push({
        title: this.$t('uc.finance.record.status'),
                // key: "status",
        align: 'center',
        render: (h, params) => {
          return h('div', that.$t('uc.finance.record.finish'), '')
        }
      })
      return columns
    },
    recordType() {
      const m = this.$store.getters.lang == 'English' ? mapEn : map
      return [...m.values()]
    }
  }
}
</script>
<style scoped lang="scss">
.nav-record {
    .nav-right {
        height: auto;
        overflow: hidden;
        .bill_flow_box .rightarea-con {
            .form-group {
                height: 60px;
                line-height: 60px;
                text-align: left;
                background: #111530;
                padding-left: 20px;
                span {
                    color: #8090AF;
                    margin-left: 10px;
                }
            }
        }
    }
    .order-table {
        margin: 22px 0 -1px;
    }
}
</style>
<style lang="scss">
.nav-record {
    .ivu-select-dropdown {
        li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
            background: #10122B;
        }
    }
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        color: #8090AF;
    }
    .ivu-input-suffix {
        right: 10px;
    }
    .ivu-date-picker-with-range {
        .ivu-date-picker-with-range {
            background: #10122B;
        }
    }
    .ivu-select .ivu-select-dropdown {
        width: 128px;
    }
    .nav-right {
        .bill_flow_box .rightarea-con {
            .form-group {
                .ivu-btn {
                    border-radius: 0;
                    float: right;
                    margin: 14px 30px 0;
                }
                .ivu-date-picker {
                    width: 260px !important;
                    .ivu-date-picker-rel {
                        .ivu-input {
                            width: 260px !important;
                            height: 30px;
                            background: transparent;
                            color: #fff;
                            border-radius: 0;
                            border: 1px solid #58698A;
                            &:hover {
                                border-color: #3399ff;
                            }
                            &:focus {
                                border-color: #3399ff;
                            }
                        }
                    }
                }
                .ivu-select-selection {
                    background: transparent;
                    color: #fff;
                    border-radius: 0;
                    border: 1px solid #58698A;
                }
                .ivu-select-dropdown {
                    min-width: 128px;
                    &::-webkit-scrollbar {
                        width: 4px; /*对垂直流动条有效*/
                        height: 10px; /*对水平流动条有效*/
                    }

                    /*定义滚动条的轨道颜色、内阴影及圆角*/
                    &::-webkit-scrollbar-track{
                        background-color: #111530;
                        border-radius: 3px;
                    }
                    &::-webkit-scrollbar-thumb{
                        border-radius: 7px;
                        background-color: #8090AF;
                    }
                    .ivu-select-item {
                        &:hover {
                            background: transparent;
                            color: #8090AF;
                        }
                    }
                }
                .ivu-date-picker-focused {
                    .ivu-date-picker-rel {
                        .ivu-input {
                            color: #fff;
                            border-radius: 0;
                            background: transparent;

                            &:focus {
                                border-color: #3399ff;
                            }
                        }
                    }
                }
            }
        }
        .ivu-table-wrapper {
            .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
            .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
                background: #10122B;
            }
            .ivu-table {
                &:before {
                    height: 0;
                }
                td {
                    background: #111530;
                    border-bottom: 0 !important;
                    color: #8090AF;
                }

                background: #191D3A;
                .ivu-table-header {
                    background: #191D3A;
                    th {
                        color: #8090AF;
                        height: 50px;
                        background: #191D3A;
                        border-bottom: 0 !important;
                        &:first-child {
                            text-align: left;
                            padding-left: 13px;
                        }
                    }
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
}

</style>
