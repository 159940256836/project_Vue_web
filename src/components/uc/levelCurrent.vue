<style lang="scss" scoped>
.entrustcurrent {
  float: left;
  width: 82%;
  padding-left: 30px;
}
.page {
  text-align: right;
  margin-top: 20px;
}
.table {
  border-radius: 6px;
}
.table .ivu-table-wrapper {
  position: relative;
  /* border: 1px solid #dddee1; */
  border-bottom: 0;
  border-right: 0;
  box-shadow: 0 0 2px #ccc;
  border-radius: 6px;
  overflow: hidden;
}
.form.ivu-form-inline .ivu-form-item {
  display: inline-block;
}
</style>
<style lang="scss">
.entrustcurrent .ivu-table th,.entrustcurrent .ivu-table td {
  text-align: center;
}
.table .ivu-table-cell-expand {
  color: #f0a70a;
}
.form .clear_btn {
  &:hover {
    color: #39f;
    border-color: #39f;
  }
  &:focus {
    background-color: #fff;
    -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    color: #39f;
    border-color: #39f;
  }
}
</style>

<template>
  <div class="entrustcurrent">
    <Form class="form" :model="formItem" :label-width="65" inline>
      <!-- <FormItem label="起止时间:">
        <DatePicker type="daterange" v-model="formItem.date" style="width:180px;"></DatePicker>
      </FormItem> -->
      <FormItem label="交易对:">
        <Select v-model="formItem.symbol" style="width:100px;">
          <Option v-for="(item,index) in symbol " :value="item.symbol " :key="index">{{item.symbol}}</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="类型: ">
        <Select v-model="formItem.type" style="width:70px;">
          <Option value="LIMIT_PRICE">限价</Option>
          <Option value="MARKET_PRICE">市价</Option>
          <Option value="CHECK_FULL_STOP">止盈止损</Option>
        </Select>
      </FormItem> -->
      <!-- <FormItem label="方向: ">
        <Select v-model="formItem.direction" style="width:70px;">
          <Option value="0">买入</Option>
          <Option value="1">卖出</Option>
        </Select>
      </FormItem> -->
      <FormItem>
        <Button type="primary" @click="handleSubmit">搜索</Button>
        <Button style="margin-left: 8px " @click="handleClear " class="clear_btn">清空条件</Button>
      </FormItem>
    </Form>
    <div class="table">
      <Table :columns="columns " :data="orders" :loading="loading"></Table>
      <div class="page">
        <Page :total="total" :pageSize="pageSize" :current="pageNum" @on-change="loadDataPage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
var moment = require("moment");
import expandRow from "@components/exchange/expand.vue";
const map = new Map([['LIMIT_PRICE','限价'],['MARKET_PRICE','市价'],['CHECK_FULL_STOP','止盈止损']])
export default {
  components: { expandRow },
  data() {
    const self = this;
    return {
      loading: false,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      symbol: [],
      formItem: {
        symbol: "",
        type: "",
        direction: "",
        date: ""
      },
      columns: [
        {
          type: "expand",
          width: 30,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                skin: params.row.skin,
                rows: params.row.detail
              }
            });
          }
        },
        {
          title: this.$t("exchange.time"),
          key: "time",
          minWidth: 55,
          render: (h, params) => {
            return h("span", {}, this.dateFormat(params.row.time));
          }
        },
        {
          title: "交易对",
          key: "symbol"
        },
        {
          title: "类型",
          width: 60,
          render(h, params) {
              const type = params.row.type;
            return h("span",{},map.get(type));
          }
        },
        {
            title:"触发价",
            key:"triggerPrice"
        },
        {
          title: this.$t("exchange.direction"),
          key: "direction",
          width: 60,
          render: (h, params) => {
            const row = params.row;
            const className = row.direction.toLowerCase();
            return h(
              "span",
              {
                attrs: {
                  class: className
                }
              },
              row.direction == "BUY"
                ? this.$t("exchange.buyin")
                : this.$t("exchange.sellout")
            );
          }
        },
        {
          title: this.$t("exchange.price"),
          key: "price",
          render(h, params) {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.price
                }
              },
              self.toFloor(params.row.price)
            );
          }
        },
        {
          title: this.$t("exchange.num"),
          key: "amount",
          render(h, params) {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.amount
                }
              },
              self.toFloor(params.row.amount)
            );
          }
        },
        {
          title: this.$t("exchange.traded"),
          key: "tradedAmount",
          render(h, params) {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.tradedAmount
                }
              },
              self.toFloor(params.row.tradedAmount)
            );
          }
        },
        {
          title: "成交金额",
          key: "turnover",
          render(h, params) {
            return h(
              "span",
              {
                attrs: {
                  title: params.row.turnover
                }
              },
              self.toFloor(params.row.turnover)
            );
          }
        },
        {
          title: this.$t("exchange.action"),
          key: "operate",
          width: 110,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  size: "small"
                },
                style: {
                  background: "#39f",
                  borderColor: "#39f",
                  color: "#fff",
                  lineHeight: "15px"
                },
                on: {
                  click: () => {
                    // console.log("======开始撤单")
                    this.cancel(params.row.orderId);
                  }
                }
              },
              this.$t("exchange.undo")
            );
          }
        }
      ],
      orders: []
    };
  },
  created() {
    this.getHistoryOrder();
    this.getSymbol();
  },
  methods: {
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    timeFormat: function(tick) {
      return moment(tick).format("HH:mm:ss");
    },
    //分页
    loadDataPage(data) {
      this.pageNum = data;
      this.getHistoryOrder();
    },
    //搜索
    handleSubmit() {
      this.pageNum = 1;
      this.getHistoryOrder();
    },
    //清空
    handleClear() {
      this.formItem = {
        symbol: "",
        type: "",
        direction: "",
        date: ""
      };
    },
    getHistoryOrder() {
      //查询当前委托
      this.loading = true;
      const { symbol, type, direction, date: rangeDate } = this.formItem,
        startTime = new Date(rangeDate[0]).getTime() || "",
        endTime = new Date(rangeDate[1]).getTime() || "";
      let params = {};
      if (symbol) params.symbol = symbol;
      if (direction) params.direction = direction;
      if (type) params.type = type;
      if (startTime) params.startTime = startTime;
      if (endTime) params.endTime = endTime;
      params.pageNum = this.pageNum;
      params.pageSize = this.pageSize;
      var that = this;
      this.orders = [];
      this.$http
        .post(this.host + "/margin-trade/order/current", params)
        .then(response => {
          var resp = response.body;
          let rows = [];
          if (resp.content.length > 0) {
            this.total = resp.totalElements;
            for (var i = 0; i < resp.content.length; i++) {
              var row = resp.content[i];
              row.price =
                row.type == "MARKET_PRICE"
                  ? that.$t("exchange.marketprice")
                  : row.price;
              rows.push(row);
            }
            this.orders = rows;
          }
          this.loading = false;
        });
    },
    getSymbol() {
      this.$http.post(this.host + this.api.market.thumb, {}).then(response => {
        var resp = response.body;
        if (resp.length > 0) {
          this.symbol = resp;
        }
      });
    },
    //取消杠杆委托
    cancel(orderId) {
      this.$Modal.confirm({
        content: this.$t("exchange.undotip"),
        onOk: () => {
          this.$http
            // .post(this.host + this.api.exchange.orderCancel + "/" + orderId, {})
            .get(this.host + `/margin-trade/order/cancel/${orderId}`)
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.getHistoryOrder();
              } else {
                this.$Notice.error({
                  title: this.$t("exchange.tip"),
                  desc: resp.message
                });
              }
            });
        }
      });
    }
  }
};
</script>

