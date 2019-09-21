<style lang="scss" scoped>
.entrusthistory {

    float: left;
    width: 100%;
    .form {
        padding-left: 12px;
        background: #fff;
        color: #333;
        font-family: MicrosoftYaHei;
        font-weight:400;
    }
    * {
        background: transparent;
    }
    .search-btn {
        color: #fff;
        background:rgba(51,153,255,1);
        border:1px solid rgba(51,153,255,1);
    }
}

.table .ivu-table-wrapper {
    position: relative;
    /* border: 1px solid #dddee1; */
    border-bottom: 0 !important;
    border-right: 0;
    overflow: hidden;
    margin-top: 22px;
    .ivu-table-tip {
      background: #fff;
      td{
        text-align: center;
        background: #191D3A !important;
      }
    }
}
.form.ivu-form-inline .ivu-form-item {
    display: inline-block;
}
</style>
<style lang="scss">
.entrusthistory .ivu-table th,
.entrusthistory .ivu-table td {
    background: transparent;
    .ivu-table-column-left {
        text-align: left;
    }
    text-align: center;
}

.entrusthistory .ivu-table .ivu-table-tip td {
    background: #111530 !important;
}
.table .ivu-table-cell-expand {
    color: #FE5C5C;
}
.ivu-table-cell {
    padding-left: 28px;
}

.form .my-btn {
  background: #FE5C5C;
  color: #fff;
  display: inline-block;
  padding: 0 24px;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  vertical-align: middle;
  cursor: pointer;
}

.entrusthistory .ivu-table th,
.entrusthistory .ivu-table td {
  text-align: center;
  background: #2A3850;
}
.table .ivu-table-cell-expand {
  color: #FE5C5C;
}

.entrusthistory .form {
    padding-top: 16px;
    input {
      outline:none;
      box-shadow: none;
      color: #333;
    }
    .ivu-form-item-label {
      color: #333;
    }
    input:focus{
      box-shadow: none;
    }
    .ivu-input {
      background: transparent;
      border-radius: 0;
      border:1px solid #dddddd;
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
      border:1px solid #eeeeee;
      height: 30px;
      line-height: 22px;
      outline:none;
      box-shadow: none;
      .ivu-select-selected-value {
        color: #333;
      }
    }
    .ivu-select-selection:focus {
      box-shadow: none;
    }
    .ivu-select-placeholder {
      color: #333;
    }
    .ivu-btn {
      border-radius: 0;
      height: 30px;
      padding: 0 26px;
      margin-top: 3px;
    }

    .ivu-select-item:hover {
        background: #fff;
        color: #FE5C5C;
    }

    .ivu-select-item-selected,
    .ivu-select-item-selected:hover {
        background: #fff;
        color: #FE5C5C;
    }

    .ivu-select-dropdown {
        min-width: 128px;
        &::-webkit-scrollbar {
            width: 4px; /*对垂直流动条有效*/
            height: 10px; /*对水平流动条有效*/
        }

        /*定义滚动条的轨道颜色、内阴影及圆角*/
      &::-webkit-scrollbar-track{
        background-color: #EDEDED;
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb{
        border-radius: 7px;
        background-color: #E0E0E0
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
    background-color: #fff;
    border-color: #DDDDDD;
    a {
      color: #999999;
    }
  }
}

.entrusthistory {
    * {
        box-shadow: none !important;
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
      background-color: #fff;
      border-color: #DDDDDD;
      a {
        color: #999999;
      }
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
            background: #fff;
            color: #333;
            border: none;
            //表格标题颜色
    }

    .ivu-table-wrapper .ivu-table .ivu-table-header th {
            background: #fff;
            color: #666666;
            border: none;
            //表格标题颜色
    }

    .ivu-table-wrapper .ivu-table .ivu-table-tbody tr:nth-child(2n) td,
    .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
            background: #fff;
            //表格双数行样式
    }
    .ivu-table-wrapper .ivu-table .ivu-table-tbody tr td {
        background: #f4f6f8;
        //表格单数行样式
    }

    .ivu-table-header th:first-child,
    .ivu-table-body .ivu-table-row td:first-child
    {
        text-align: left;
    }
    // .ivu-table-header th:first-child {
    //     padding-left: 28px;
    // }


    //去Table边框
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

.special{
  .ivu-form-item-content{
    margin-left:0px !important;
  }
  .ivu-input{
    width:80px;
  }
}
.slash{
    height: 66px;
    line-height: 36px;
}
</style>
<template>
    <div class="entrusthistory">
        <Form class="form" :model="formItem" :label-width="70" inline>
            <!-- <FormItem :label-width="locale == 'en' ? 95 : 70 " :label="$t('historyAndCu.stEnTime')+':'" style="margin-right:18px;">
                <DatePicker class="DatePicker" type="daterange" v-model="formItem.date" style="width:248px;"></DatePicker>
            </FormItem> -->
            <FormItem prop="user" class="special">
            <Input
              name="user"
              type="text"
              v-model="symbolInput"
              :placeholder="$t('service.COIN')"
            />
          </FormItem>
            <span class="slash">/</span>
            <FormItem  style="margin-right:14px;" class="special">
                <Select v-model="formItem.symbol"  :placeholder="$t('header.choose')">
                <Option v-for="(item,index) in symbol " :value="item " :key="index">{{item}}</Option>
                </Select>
            </FormItem>
            <!-- <FormItem :label="$t('historyAndCu.type')+':'" style="margin-right:12px;">
                <Select v-model="formItem.type" style="width:95px;" :placeholder="$t('header.choose')" >
                <Option v-for="(item, index) in exchangeType" :value="item[0]" :key="index">{{item[1]}}</Option>
                </Select>
            </FormItem> -->
            <FormItem :label="$t('historyAndCu.direction')+':'" style="margin-right:12px;">
                <Select v-model="formItem.direction" style="width:95px;" :placeholder="$t('header.choose')">
                <Option value="BUY">{{$t('historyAndCu.buy')}}</Option>
                <Option value="SELL">{{$t('historyAndCu.sell')}}</Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('historyAndCu.time')+':'" style="margin-right:12px;">
                <Select v-model="formItem.period" style="width:95px;" :placeholder="$t('header.choose')">
                <Option value="0">{{$t('historyAndCu.week')}}</Option>
                <Option value="1">{{$t('historyAndCu.month')}}</Option>
                <Option value="2">{{$t('historyAndCu.year')}}</Option>
                </Select>
            </FormItem>
            <FormItem :label="$t('exchange.status')">
                <Select v-model="formItem.status" style="width:94px;" :placeholder="$t('header.choose')">
                  <Option value="">{{$t('exchange.all')}}</Option>
                    <Option value="COMPLETED">{{$t('exchange.finished')}}</Option>
                    <Option value="CANCELED">{{$t('exchange.canceled')}}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <span
                    @click="handleSubmit"
                    class="my-btn"
                >
                    {{$t('historyAndCu.search')}}
                </span>
                <span
                        style="background: #fff;border: 1px solid #FE5C5C;color: #FE5C5C;"
                    @click="handleClear"
                    class="my-btn"
                >
                    {{$t('historyAndCu.clear')}}
                </span>
            </FormItem>
        </Form>
        <div class="table">
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
                ></Page>
            </div> -->
        <ul class="page">
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
</template>
<script>
var moment = require('moment')
import expandRow from '@components/exchange/expand.vue'
// const map = new Map([['LIMIT_PRICE', '限价'], ['MARKET_PRICE', '市价'], ['CHECK_FULL_STOP', '止盈止损']]);
const map = new Map([['LIMIT_PRICE', '限价'], ['MARKET_PRICE', '市价']])
// const mapEn = new Map([['LIMIT_PRICE', 'limited price'], ['MARKET_PRICE', 'market price'], ['CHECK_FULL_STOP', 'top profit and stop loss']]);
const mapEn = new Map([['LIMIT_PRICE', 'limited price'], ['MARKET_PRICE', 'market price']])
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
      lastid: '',
      firstid: '',
      lasttime: '',
      firsttime: '',
      symbolInput: 'BTC',
      formItem: {
        symbol: 'USDT',
        type: '',
        direction: '',
        status: '',
        period: 0,
        select: '',
        lastId: '',
        lastTime: ''
      },

      orders: [],
      historyTableData: []
    }
  },
  created() {
    this.getHistoryOrder()
    this.getSymbol()
  },
  watch: {
    '$i18n.locale': {
      handler(newVal) {
        this.locale = newVal
      },
      immediate: true
    }
  },
  methods: {
    maxTagPlaceholder(num) {
      return 'more ' + num
    },
    previouspage() {
      if (this.pageNo == 1) {
        this.$Notice.open({
          title: this.$t('common.tip'),
          desc: this.$t('uc.finance.record.nodata')
        })
      } else {
        this.pageNo = this.pageNo - 10
        this.formItem.select = 'prev'
        this.formItem.lastId = this.firstid
        this.formItem.lastTime = this.firsttime
        this.getHistoryOrder()
      }
    },
    nextpage() {
      this.pageNo = this.pageNo + 10
      this.formItem.select = 'next'
      this.formItem.lastId = this.lastid
      this.formItem.lastTime = this.lasttime
      this.getHistoryOrder()
    },
    dateFormat: function(tick) {
      return moment(tick).format('YYYY-MM-DD HH:mm:ss')
    },
    loadDataPage(data) {
      this.pageNo = data
      this.getHistoryOrder()
    },
    handleSubmit() {
      this.pageNo = 1
      this.formItem.lastId = ''
      this.formItem.lastTime = ''
      this.formItem.select = ''
      this.orders = []
      this.getHistoryOrder()
    },
    handleClear() {
      this.formItem = {
        symbol: 'USDT',
        type: '',
        direction: '',
        status: '',
        period: 0,
        select: '',
        lastId: '',
        lastTime: ''
      }
    },
    getHistoryOrder() {
      // 查询历史委托
      this.loading = true
      // const { symbol, type, direction, date: rangeDate, period } = this.formItem
        // startTime = new Date(rangeDate[0]).getTime() || '',
        // endTime = new Date(rangeDate[1]).getTime() || ''
      const { type, direction, period, lastId, select, lastTime, symbol, status } = this.formItem
      const params = {}
      // const symbol = this.formItem.symbol.join(',')
      if (symbol) params.symbols = this.symbolInput.toUpperCase() + '/' + symbol
      if (period) params.period = period
      if (direction) params.direction = direction
      if (type) params.type = type
      if (lastId) params.lastId = lastId
      if (select) params.select = select
      if (lastTime) params.lastTime = lastTime
      if (status) params.status = status
      else params.status = ''
      // params.period = 0
      // params.pageSize = this.pageNo
      var that = this
      this.$http
      .post(this.host + '/order/exchange-order/exchange/personal/history', params)
      .then(response => {
        var resp = response.body
        const rows = []
        if (resp.code == 0) {
          if (resp.data[0] != undefined) {
            this.orders = []
            this.firstid = response.body.data[0].id
            const num = resp.data.length - 1
            this.lastid = response.body.data[num].id
            console.log(this.firstid, this.lastid, this.firstid.toString(), this.lastid.toString())
            this.firsttime = response.body.data[0].createTime
            this.lasttime = response.body.data[num].createTime
            this.total = resp.totalElements
            for (var i = 0; i < resp.data.length; i++) {
              var row = resp.data[i]
              row.price =
                        row.type == 'MARKET_PRICE'
                            ? that.$t('exchange.marketprice')
                            : row.price
              rows.push(row)
            }
            this.orders = rows
          } else {
            this.pageNo = this.pageNo - 10
          }
        } else {
          this.$Message.warning(resp.message)
        }

        this.loading = false
      })
    },
        // 币币订单详情
        // 展开原生事件  点击左侧展收起
    onExpand(row, status) {
      if (status) {
        this.orders.splice()
        this.orders.filter((item, index) => {
          console.log(item, row)
          if (item.id == row.id) {
            item._expanded = true   // 展开选中的行
          } else {
            item._expanded = false   // 其他行关闭
          }
          return item
        })
      } else {
        this.historyTableData.splice()
        this.historyTableData.map((item, index) => {
          if (item.id == row.id) {
            item._expanded = false   // 展开选中的行
          } else {
            item._expanded = false   // 其他行关闭
          }
          return item
        })
      }

      return this.$http.post(this.host + this.api.exchange.orderDetails, {
        orderId: row.id
      }).then(res => {
        const data = res.body
        if (data.code == 0) {
          this.historyTableData = data.data
        }
      })
    },
    getSymbol() {
      this.$http.post(this.host + this.api.market.thumb, {}).then(response => {
        var resp = response.body
        console.log(resp)
        resp.forEach((e, i) => {
          console.log(e, i)
          const num = this.getCaption(e.symbol)
          console.log(num)
          if (this.symbol.indexOf(num) == -1) {
            this.symbol.push(num)
          }
        })
        console.log(this.symbol)
        // if (resp.length > 0) {
        //   this.symbol = resp
        // }
      })
    },
    getCaption(obj) {
      const index = obj.lastIndexOf('/')
      obj = obj.substring(index + 1, obj.length)
      return obj
    }
  },
  computed: {
    columns() {
      const m = this.$store.getters.lang == 'English' ? mapEn : map
      const m1 = this.$store.getters.lang == 'English' ? 180 : 180
      const m8 = this.$store.getters.lang == 'English' ? 143 : 100
      const arr = []
      arr.push({
        width: m1,
        title: this.$t('exchange.time'),
        key: 'time',
        minWidth: 55,
        render: (h, params) => {
          return h('span', {}, this.dateFormat(params.row.createTime))
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
            //     width: m4,
            //     title: this.$t("historyAndCu.triggerPrice"),
            //     key: "triggerPrice"
            // });
      arr.push({
        title: this.$t('exchange.direction'),
        key: 'direction',
                // width: m5,
        render: (h, params) => {
          const row = params.row
          const className = row.direction.toLowerCase()
          if (row.direction == 'BUY') {
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
                // width: m9,
        title: this.$t('exchange.done'),
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
              rows: this.historyTableData
            }
          })
        }
      })
      arr.push({
        title: this.$t('exchange.status'),
        key: 'status',
                // width: m10,
        render: (h, params) => {
          const status = params.row.status
          if (status == 'COMPLETED') {
            return h(
                            'span',
              {
                style: {
                  color: '#FE5C5C'
                }
              },
                            this.$t('exchange.finished')
                        )
          } else if (status == 'CANCELED') {
            return h(
                            'span',
              {
                style: {
                  color: '#FE5C5C'
                }
              },
                            this.$t('exchange.canceled')
                        )
          } else {
            return h('span', {}, '--')
          }
        }
      })
      return arr
    },
    exchangeType() {
      const m = this.$store.getters.lang == 'English' ? mapEn : map
      return [...m]
    }
  }
}
</script>

