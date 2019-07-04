<style lang="scss" scoped>
.entrustcurrent {
  * {
        box-shadow: none !important;
    }
  float: left;
  width: 100%;
  .form {
    padding-left: 28px;
    background: #111530;
    color: #8090AF;
    font-family: MicrosoftYaHei;
    font-weight:400;
  }
  * {
    background: transparent;
  }
  .search-btn {
    background:rgba(51,153,255,1);
    border:1px solid rgba(51,153,255,1);
  }
  .small:focus {
    border: none;
  }




 .ivu-table-wrapper {
    position: relative;
    /* border: 1px solid #dddee1; */
    border-bottom: 0 !important;
    border-right: 0;
    overflow: hidden;
    margin-top: 22px;
    .ivu-table-tip td{
      text-align: center;
      background: #111530 !important;
    }
}

.repeal {
  border: 0;
  color: #3399FF;
  font-size: 12px;
  padding: 3px 5px;
  cursor: pointer;
}

.form.ivu-form-inline .ivu-form-item {
  display: inline-block;
}
}
</style>
<style lang="scss">
.entrustcurrent .ivu-table th,
.entrustcurrent .ivu-table td {
  background: transparent;
  .ivu-table-column-left {
    text-align: left;
  }
}

.entrustcurrent .ivu-table .ivu-table-tip td {
    background: #111530 !important;
}

.table .ivu-table-cell-expand {
  color: #3399ff;
}

.ivu-table-cell {
    padding-left: 28px;
}

.entrustcurrent .form {
    .my-btn {
      background: #3399FF;
      color: #fff;
      display: inline-block;
      padding:0px 24px;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      vertical-align: middle;
      cursor: pointer;
    }
    padding-top: 16px;
    input {
      outline:none;
      box-shadow: none;
      color: #fff;
    }
    .ivu-form-item-label {
      color: #8090AF;
    }
    input:focus{
      box-shadow: none;
    }
    .ivu-input {
      background: transparent;
      border-radius: 0;
      border:1px solid rgba(88,105,138,1);
      height: 30px;
      line-height: 24px;
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
      line-height: 24px;
    }
    .ivu-select-selection {
      background: transparent;
      border-radius: 0;
      border:1px solid rgba(88,105,138,1);
      height: 30px;
      line-height: 22px;
      outline:none;
      box-shadow: none;
      .ivu-select-selected-value {
        color: #fff;
      }
    }
    .ivu-select-selection:focus {
      box-shadow: none;
    }
    .ivu-select-placeholder {
      color: #414d64;
    }
    .ivu-btn {
      border-radius: 0;
      height: 30px;
      padding: 0 26px;
      margin-top: 3px;
    }

    .ivu-select-item:hover {
        background: #10122b;
        color: #8090AF;
    }

    .ivu-select-item-selected,
    .ivu-select-item-selected:hover {
        background: #10122b;
        color: #fff;
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
    }

    .ivu-date-picker-with-range {
    .ivu-date-picker-with-range {
        background: #10122B;
      }
    }

    .ivu-select-dropdown li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
        background: transparent;
    }
    .ivu-page-total {
      color: #8090AF;
    }
    .ivu-page-next, .ivu-page-prev {
      background: #111530;
      border: 1px solid #191f44;
    }
}

.entrustcurrent {
  .ivu-tabs {
        // overflow:initial;
        background: transparent;
        tr {
          background: transparent;
          td {
            background: transparent;
          }
        }
        .ivu-tabs-content.ivu-tabs-content-animated {
            .ivu-tabs-tabpane {
            .ivu-table-wrapper {
                border: none;
                a {
                color: #fff;
                }
            }
            }
            
        }
        .ivu-tabs-bar {
            .ivu-tabs-nav-container {
            .ivu-tabs-nav-scroll {
                .ivu-tabs-ink-bar.ivu-tabs-ink-bar-animated {
                background-color: #3399ff;
                }
                .ivu-tabs-tab.ivu-tabs-tab-active.ivu-tabs-tab-focused {
                color: #3399ff;
                &:hover {
                    color: #3399ff;
                }
                }
                .ivu-tabs-tab {
                &:hover {
                    color: #3399ff;
                }
                padding: 0;
                }
            }
            }
        }
        .ivu-tabs-content {
            .ivu-tabs-tabpane {
            .ivu-table-header,
            .ivu-table-body {
                table {
                width: 100% !important;
                thead {
                    .ivu-table-cell {
                    padding: 0;
                    }
                }
                tbody {
                    background: transparent;
                    .ivu-table-cell {
                        padding-left: 28px;
                    }
                }
                }
            }
            .ivu-table-header th:first-child,
            .ivu-table-body .ivu-table-row td:first-child
            {
                text-align: left;
            }
            .ivu-table-header th:first-child {
                padding-left: 28px;
            }
            .ivu-table td, .ivu-table th {
              border: none;
            }
        }

      }
  }

  .page {
    text-align: right;
    margin-top: 20px;
    margin-bottom:20px;
    .ivu-page-next a{
      color:#fff;
    }
    .ivu-page-prev a{
      color:#fff;
    }

    .ivu-page-total {
      color: #8090AF;
    }
    .ivu-page-next, .ivu-page-prev {
      background: #111530;
      border: 1px solid #191f44;
    }
    
    .ivu-icon.ivu-icon-ios-arrow-left,
    .ivu-icon.ivu-icon-ios-arrow-right {
        color: #8090AF;
    }
    li.ivu-page-item.ivu-page-item-active {
        background: #111530;
        border: 1px solid #191f44;
        a {
        color: #8090AF;
        }
        &:hover {
        a {
            color: #8090AF;
        }
        }
    }
  }
  .ivu-table-wrapper .ivu-table {
      color: #fff;
      background: transparent;
  }

  .ivu-table td, .ivu-table th {
    border: none;
  }

  .ivu-table-wrapper  .ivu-table-stripe {
      background: transparent;
  }

  .ivu-table-wrapper .ivu-table .ivu-table-tbody td {
    border: none;
  }

  .ivu-table-wrapper .ivu-table .ivu-table-header th {
        background: #191D3A;
        color: #8090AF;
        border: none;
        //表格标题颜色
  }

  .ivu-table-wrapper .ivu-table .ivu-table-tbody tr:nth-child(2n) td,
  .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
        background: #10122B;
        //表格双数行样式
  }
  .ivu-table-wrapper .ivu-table .ivu-table-tbody tr td {
      background: #090e2e;
      //表格单数行样式
  }


   .ivu-table-wrapper .ivu-table:before {
      background: transparent;
    }
    div.ivu-card-body {
      padding: 0;
    }
    div.ivu-table-wrapper {
      border: none;
    }
    .ivu-table:before{content:'';width:100%;height:0px;position:absolute;left:0;bottom:0;z-index:1}
    .ivu-table:after{content:'';width:0px;height:100%;position:absolute;top:0;right:0;z-index:3}

}

</style>

<template>
  <div class="entrustcurrent">
    <Form class="form" :model="formItem" :label-width="70"  inline>
      <!-- <FormItem :label-width="locale == 'en' ? 95 : 70 " :label="$t('historyAndCu.stEnTime')+':'" style="margin-right:18px;">
        <DatePicker class="DatePicker" type="daterange" v-model="formItem.date" style="width:248px;"></DatePicker>
      </FormItem> -->
      <FormItem :label="$t('historyAndCu.symbol')+':'">
        <Select v-model="formItem.symbol" style="width:121px;" :placeholder="$t('header.choose')">
          <Option v-for="(item,index) in symbol " :value="item.symbol " :key="index">{{item.symbol}}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem :label="$t('historyAndCu.type')+':'" style="margin-right:12px;">
        <Select v-model="formItem.type" style="width:95px;" :placeholder="$t('header.choose')" >
          <Option v-for="(item, index) in exchangeType" :value="item[0]" :key="index">{{item[1]}}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('historyAndCu.type')+':'" style="margin-right:12px;">
        <Select v-model="formItem.direction" style="width:95px;" :placeholder="$t('header.choose')">
          <Option value="0">{{$t('historyAndCu.buy')}}</Option>
          <Option value="1">{{$t('historyAndCu.sell')}}</Option>
        </Select>
      </FormItem> -->
      <div style="margin-bottom: 22px;display:inline-block;">
        <span
          v-if="orders.length > 2"
          class="my-btn"
          @click="repeal()"
        >
          <!--撤销全部委单-->
          {{$t('historyAndCu.repealAll')}}
        </span>
        <span
          style="margin-left: 46px;margin-right:45px;background:transparent;color:#3399FF;border:1px solid #3399FF;margin-top:3px;"
          @click="handleClear "
          class="my-btn"
          type="primary"
        >{{$t('historyAndCu.clear')}}</span>
        <span
          @click="handleSubmit"
          class="my-btn"
          style="margin-top:3px;"
        >
          {{$t('historyAndCu.search')}}
        </span>
      </div>
    </Form>
    <div class="entrustcurrent-table">
      <Table
        :no-data-text="$t('common.nodata')"
        :columns="columns"
        :data="orders"
        :loading="loading"
        @on-expand="onExpand"
      ></Table>
      <!-- <div class="page">
        <Page
          v-show="total > 10"
          :total="total"
          :pageSize="pageSize"
          :current="pageNo"
          @on-change="loadDataPage"
        ></Page> -->
        <ul class="page" v-show="!pageNo == 0">
          <ul class="ivu-page"></ul>
            <li title="上一页" class="ivu-page-prev" @click="previouspage">
              <a><i class="ivu-icon ivu-icon-ios-arrow-back"></i></a>
            </li>
            <li title="下一页" class="ivu-page-next" @click="nextpage">
              <a><i class="ivu-icon ivu-icon-ios-arrow-forward"></i></a>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
var moment = require('moment')
import expandRow from '@components/exchange/expand.vue'
// const map = new Map([
//   ["LIMIT_PRICE", "限价"],
//   ["MARKET_PRICE", "市价"],
//   ["CHECK_FULL_STOP", "止盈止损"]
// ]);
const map = new Map([
  ['LIMIT_PRICE', '限价'],
  ['MARKET_PRICE', '市价']
])
// const mapEn = new Map([
//   ["LIMIT_PRICE", "limited price"],
//   ["MARKET_PRICE", "market price"],
//   ["CHECK_FULL_STOP", "top profit and stop loss"]
// ]);
const mapEn = new Map([
  ['LIMIT_PRICE', 'limited price'],
  ['MARKET_PRICE', 'market price']
])
export default {
  components: { expandRow },
  data() {
    const self = this
    return {
      locale: '',
      loading: false,
      pageSize: 10,
      pageNo: 1,
      total: 10,
      symbol: [],
      formItem: {
        symbol: '',
        type: '',
        direction: '',
        date: ''
      },
      orders: [],
      currentTableData: []
    }
  },
  watch: {
    '$i18n.locale': {
      handler(newVal) {
        this.locale = newVal
      },
      immediate: true
    }
  },
  created() {
    this.getCurrentOrder()
  },
  methods: {
    previouspage() {
      if (this.pageNo == 1) {
        this.$Notice.open({
          title: this.$t('common.tip'),
          desc: this.$t('uc.finance.record.nodata')
        })
      } else {
        this.pageNo = this.pageNo - 10
        this.getCurrentOrder()
      }
    },
    nextpage() {
      this.pageNo = this.pageNo + 10
      this.getCurrentOrder()
    },
    dateFormat: function(tick) {
      return moment(tick).format('YYYY-MM-DD HH:mm:ss')
    },
    timeFormat: function(tick) {
      return moment(tick).format('HH:mm:ss')
    },
    loadDataPage(data) {
      this.pageNo = data
      this.getCurrentOrder()
    },
    handleSubmit() {
      this.pageNo = 1
      this.getCurrentOrder()
    },
    handleClear() {
      this.formItem = {
        symbol: '',
        type: '',
        direction: '',
        date: ''
      }
    },
    // 币币订单详情
    // 展开原生事件  点击左侧展收起
    onExpand(row, status) {
      if (status) {
        this.orders.splice()
        this.orders.filter((item, index) => {
          if (item.orderId === row.orderId) {
            item._expanded = true   // 展开选中的行
          } else {
            item._expanded = false   // 其他行关闭
          }
          return item
        })
        // this.historyTableData = this.TableData1
      } else {
        this.currentTableData.splice()
        this.currentTableData.map((item, index) => {
          if (item.orderId === row.orderId) {
            item._expanded = false   // 展开选中的行
          } else {
            item._expanded = false   // 其他行关闭
          }
          return item
        })
      }

      return this.$http.post(this.host + this.api.exchange.orderDetails, {
        orderId: row.orderId
      }).then(res => {
        const data = res.body
        if (data.code === 0) {
          this.currentTableData = data.data
        }
      })
    },
    getCurrentOrder() {
      // 查询当前委托
      this.loading = true
      const { symbol, type, direction, date: rangeDate } = this.formItem,
        startTime = new Date(rangeDate[0]).getTime() || '',
        endTime = new Date(rangeDate[1]).getTime() || ''
      const params = {}
      if (symbol) params.symbol = symbol
      if (direction) params.direction = direction
      if (type) params.type = type
      if (startTime) params.startTime = startTime
      if (endTime) params.endTime = endTime
      params.pageNo = this.pageNo
      // params.pageSize = this.pageSize
      var that = this
      this.orders = []
      this.$http
        .post(this.host + '/exchange/order/personal/newCurrent', params)
        .then(response => {
          var resp = response.body
          const rows = []
          if (resp.data.length > 0) {
            this.total = resp.data.length
            for (var i = 0; i < resp.data.length; i++) {
              var row = resp.data[i]
              row.price =
                row.type == 'MARKET_PRICE'
                  ? that.$t('exchange.marketprice')
                  : row.price
              rows.push(row)
            }
            this.orders = rows
            this.getSymbol()
          }
          this.loading = false
        })
    },
    getSymbol() {
      this.$http.post(this.host + this.api.market.thumb, {}).then(response => {
        var resp = response.body
        if (resp.length > 0) {
          this.symbol = resp
        }
      })
    },
    cancel(orderId) {
      // this.$Modal.confirm({
      //   content: this.$t("exchange.undotip"),
      //   onOk: () => {
      this.$http
        .post(this.host + this.api.exchange.orderCancel + '/' + orderId, {})
        .then(response => {
          const resp = response.body
          if (resp.code === 0) {
            this.getCurrentOrder()
          } else {
            this.$Notice.error({
              title: this.$t('exchange.tip'),
              desc: resp.message
            })
          }
        })
      //   }
      // });
    },
    // 一键撤单
    repeal() {
      this.$Modal.confirm({
        content: this.$t('exchange.undotip'),
        onOk: () => {
          this.$http.post(this.host + this.api.exchange.orderCancelAll).then(response => {
            const resp = response.body
            if (resp.code === 0) {
              this.getCurrentOrder()
            } else {
              this.$Notice.error({
                title: this.$t('exchange.tip'),
                desc: resp.message
              })
            }
          })
        }
      })
    }
  },
  computed: {
    columns() {
      const arr = []
      const m = this.$store.getters.lang === 'English' ? mapEn : map
      const m1 = this.$store.getters.lang === 'English' ? 180 : 180
      // const m2 = this.$store.getters.lang == "English" ? 98 : 97;
      // const m3 = this.$store.getters.lang == "English" ? 80 : 120;
      // const m4 = this.$store.getters.lang == "English" ? 109 : '';
      // const m5 = this.$store.getters.lang == "English" ? 88 : 60;
      // const m6 = this.$store.getters.lang == "English" ? 70 : '';
      // const m7 = this.$store.getters.lang == "English" ? 85 : '';
      const m8 = this.$store.getters.lang == "English" ? 143 : 100;
      // const m9 = this.$store.getters.lang == "English" ? 80 : 110;
      // const m10 = this.$store.getters.lang == "English" ? 70 : '';
      // arr.push({
      //   type: "expand",
      //   width: 30,
      //   render: (h, params) => {
      //     return h(expandRow, {
      //       props: {
      //         skin: params.row.skin,
      //         rows: this.currentTableData
      //       }
      //     });
      //   }
      // });
      arr.push({
        width: m1,
        title: this.$t('exchange.time'),
        key: 'time',
        render: (h, params) => {
          return h('span', {}, this.dateFormat(params.row.time))
        }
      })
      arr.push({
        // width: m2,
        title: this.$t('historyAndCu.symbol'),
        key: 'symbol'
      })
      arr.push({
        title: this.$t('historyAndCu.type'),
        // width: m3,
        render(h, params) {
          const type = params.row.type
          return h('span', {}, m.get(type))
        }
      })
      // arr.push({
      //   width: m4,
      //   title: this.$t("historyAndCu.triggerPrice"),
      //   key: "triggerPrice"
      // });
      arr.push({
        // width: m5,
        title: this.$t('exchange.direction'),
        key: 'direction',
        render: (h, params) => {
          const row = params.row
          const className = row.direction.toLowerCase()
          if (row.direction === 'BUY') {
            return h(
              'span',
              {
                attrs: {
                  class: className
                },
                style: {
                  color: '#F15057'
                }
              },
              this.$t('exchange.buyin')
            )
          } else {
            return h(
              'span',
              {
                attrs: {
                  class: className
                },
                style: {
                  color: '#00B275'
                }
              },
              this.$t('exchange.sellout')
            )
          }
        }
      })
      arr.push({
        // width: m6,
        title: this.$t('exchange.price'),
        key: 'price',
        render: (h, params) => {
          return h(
            'span',
            {
              attrs: {
                title: params.row.price
              }
            },
            this.toFloor(params.row.price)
          )
        }
      })
      arr.push({
        // width: m7,
        title: this.$t('exchange.num'),
        key: 'amount',
        render: (h, params) => {
          return h(
            'span',
            {
              attrs: {
                title: params.row.amount
              }
            },
            this.toFloor(params.row.amount)
          )
        }
      })
      arr.push({
        // width: m10,
        title: this.$t('exchange.traded'),
        key: 'tradedAmount',
        render: (h, params) => {
          return h(
            'span',
            {
              attrs: {
                title: params.row.tradedAmount
              }
            },
            this.toFloor(params.row.tradedAmount)
          )
        }
      })
      arr.push({
        width: m8,
        title: this.$t('historyAndCu.turnoverAmount'),
        key: 'turnover',
        render: (h, params) => {
          return h(
            'span',
            {
              attrs: {
                title: params.row.turnover
              }
            },
            this.toFloor(params.row.turnover)
          )
        }
      })
      arr.push({
        type: 'expand',
        width: 60,
        minWidth: 50,
        render: (h, params) => {
          return h(expandRow, {
            props: {
              skin: params.row.skin,
              rows: this.currentTableData
            }
          })
        }
      })
      arr.push({
        // width: m9,
        title: this.$t('exchange.action'),
        key: 'operate',
        render: (h, params) => {
          return h(
            'Button',
            {
              props: {
                size: 'small'
              },
              style: {
                background: 'transparent',
                color: '#3399FF',
                lineHeight: '15px',
                border: 'none'
              },
              on: {
                click: () => {
                  this.cancel(params.row.orderId)
                }
              }
            },
            this.$t('exchange.undo')
          )
        }
      })
      return arr
    },
    exchangeType() {
      const m = this.$store.getters.lang === 'English' ? mapEn : map
      return [...m]
    }
  }
}
</script>

