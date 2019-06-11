<style lang="scss" scoped>
.entrustcurrent {
  float: left;
  width: 83%;
  padding-left: 20px;
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
</style>
<style lang="scss">
.entrustcurrent .ivu-table th,
.entrustcurrent .ivu-table td {
  text-align: center;
}
.table .ivu-table-cell-expand {
  color: #3399ff;
}
.form .clear_btn {
  &:hover {
    color: #3399ff;
    border-color: #3399ff;
  }
  &:focus {
    background-color: #fff;
    -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    color: #3399ff;
    border-color: #3399ff;
  }
}
</style>

<template>
  <div class="entrustcurrent">
    <Form class="form" :model="formItem" :label-width="60"  inline>
      <FormItem :label-width="locale == 'en' ? 95 : 60 " :label="$t('historyAndCu.stEnTime')">
        <DatePicker type="daterange" v-model="formItem.date" style="width:180px;"></DatePicker>
      </FormItem>
      <FormItem :label="$t('historyAndCu.symbol')">
        <Select v-model="formItem.symbol" style="width:100px;" :placeholder="$t('header.choose')">
          <Option v-for="(item,index) in symbol " :value="item.symbol " :key="index">{{item.symbol}}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('historyAndCu.type')">
        <Select v-model="formItem.type" style="width:70px;" :placeholder="$t('header.choose')">
          <Option v-for="(item, index) in exchangeType" :value="item[0]" :key="index">{{item[1]}}</Option>
        </Select>
      </FormItem>
      <FormItem :label="$t('historyAndCu.type')">
        <Select v-model="formItem.direction" style="width:70px;" :placeholder="$t('header.choose')">
          <Option value="0">{{$t('historyAndCu.buy')}}</Option>
          <Option value="1">{{$t('historyAndCu.sell')}}</Option>
        </Select>
      </FormItem>
      <div style="margin-bottom: 22px;">
        <Button
          v-if="orders.length > 2"
          type="primary"
          @click="repeal()"
        >
          <!--撤销全部委单-->
          {{$t('historyAndCu.repealAll')}}
        </Button>
        <Button
          type="primary"
          @click="handleSubmit"
        >
          {{$t('historyAndCu.search')}}
        </Button>
        <Button
          style="margin-left: 8px "
          @click="handleClear "
          class="clear_btn"
        >{{$t('historyAndCu.clear')}}</Button>
      </div>
    </Form>
    <div class="table">
      <Table
        :no-data-text="$t('common.nodata')"
        :columns="columns"
        :data="orders"
        :loading="loading"
        @on-expand="onExpand"
      ></Table>
      <div class="page">
        <Page
          v-show="total > 10"
          :total="total"
          :pageSize="pageSize"
          :current="pageNo"
          @on-change="loadDataPage"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
var moment = require("moment");
import expandRow from "@components/exchange/expand.vue";
// const map = new Map([
//   ["LIMIT_PRICE", "限价"],
//   ["MARKET_PRICE", "市价"],
//   ["CHECK_FULL_STOP", "止盈止损"]
// ]);
const map = new Map([
  ["LIMIT_PRICE", "限价"],
  ["MARKET_PRICE", "市价"]
]);
// const mapEn = new Map([
//   ["LIMIT_PRICE", "limited price"],
//   ["MARKET_PRICE", "market price"],
//   ["CHECK_FULL_STOP", "top profit and stop loss"]
// ]);
const mapEn = new Map([
  ["LIMIT_PRICE", "limited price"],
  ["MARKET_PRICE", "market price"]
]);
export default {
  components: { expandRow },
  data() {
    const self = this;
    return {
      locale:'',
      loading: false,
      pageSize: 10,
      pageNo: 1,
      total: 10,
      symbol: [],
      formItem: {
        symbol: "",
        type: "",
        direction: "",
        date: ""
      },
      orders: [],
      currentTableData: []
    };
  },
  watch: {
    "$i18n.locale": {
      handler(newVal) {
        this.locale = newVal;
      },
      immediate: true
    }
  },
  created() {
    this.getCurrentOrder();
    this.getSymbol();
  },
  methods: {
    dateFormat: function(tick) {
      return moment(tick).format("YYYY-MM-DD HH:mm:ss");
    },
    timeFormat: function(tick) {
      return moment(tick).format("HH:mm:ss");
    },
    loadDataPage(data) {
      this.pageNo = data;
      this.getCurrentOrder();
    },
    handleSubmit() {
      this.pageNo = 1;
      this.getCurrentOrder();
    },
    handleClear() {
      this.formItem = {
        symbol: "",
        type: "",
        direction: "",
        date: ""
      };
    },
    // 币币订单详情
    // 展开原生事件  点击左侧展收起
    onExpand(row, status){
      if(status){
        this.orders.splice()
        this.orders.filter((item, index)=>{
          if(item.orderId == row.orderId){
            item._expanded = true;   //展开选中的行
          }else{
            item._expanded = false;   //其他行关闭
          }
          return item;
        });
        // this.historyTableData = this.TableData1
      } else {
        this.currentTableData.splice()
        this.currentTableData.map((item, index)=>{
          if(item.orderId == row.orderId){
            item._expanded = false;   //展开选中的行
          }else{
            item._expanded = false;   //其他行关闭
          }
          return item;
        });
      }

      return this.$http.post(this.host + this.api.exchange.orderDetails, {
        orderId: row.orderId
      }).then(res => {
        const data = res.body;
        if (data.code == 0) {
          this.currentTableData = data.data
        }
      })
    },
    getCurrentOrder() {
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
      params.pageNo = this.pageNo;
      params.pageSize = this.pageSize;
      var that = this;
      this.orders = [];
      this.$http
        .post(this.host + "/exchange/order/personal/current", params)
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
    cancel(orderId) {
      // this.$Modal.confirm({
      //   content: this.$t("exchange.undotip"),
      //   onOk: () => {
      this.$http
        .post(this.host + this.api.exchange.orderCancel + "/" + orderId, {})
        .then(response => {
          let resp = response.body;
          if (resp.code == 0) {
            this.getCurrentOrder();
          } else {
            this.$Notice.error({
              title: this.$t("exchange.tip"),
              desc: resp.message
            });
          }
        });
      //   }
      // });
    },
    // 一键撤单
    repeal () {
      this.$Modal.confirm({
        content: this.$t("exchange.undotip"),
        onOk: () => {
          this.$http.post(this.host + this.api.exchange.orderCancelAll).then(response => {
            let resp = response.body;
            if (resp.code == 0) {
              this.getCurrentOrder();
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
  },
  computed: {
    columns() {
      const arr = [];
      const m = this.$store.getters.lang == "English" ? mapEn : map;
      const m1 = this.$store.getters.lang == "English" ? 100 : 100;
      const m2 = this.$store.getters.lang == "English" ? 98 : 97;
      const m3 = this.$store.getters.lang == "English" ? 80 : 120;
      const m4 = this.$store.getters.lang == "English" ? 109 : '';
      const m5 = this.$store.getters.lang == "English" ? 88 : 60;
      const m6 = this.$store.getters.lang == "English" ? 70 : '';
      const m7 = this.$store.getters.lang == "English" ? 85 : '';
      const m8 = this.$store.getters.lang == "English" ? 135 : 100;
      const m9 = this.$store.getters.lang == "English" ? 80 : 110;
      const m10 = this.$store.getters.lang == "English" ? 70 : '';
      arr.push({
        type: "expand",
        width: 30,
        render: (h, params) => {
          return h(expandRow, {
            props: {
              skin: params.row.skin,
              rows: this.currentTableData
            }
          });
        }
      });
      arr.push({
        width: m1,
        title: this.$t("exchange.time"),
        key: "time",
        render: (h, params) => {
          return h("span", {}, this.dateFormat(params.row.time));
        }
      });
      arr.push({
        width: m2,
        title: this.$t("historyAndCu.symbol"),
        key: "symbol"
      });
      arr.push({
        title: this.$t("historyAndCu.type"),
        width: m3,
        render(h, params) {
          const type = params.row.type;
          return h("span", {}, m.get(type));
        }
      });
      // arr.push({
      //   width: m4,
      //   title: this.$t("historyAndCu.triggerPrice"),
      //   key: "triggerPrice"
      // });
      arr.push({
        width: m5,
        title: this.$t("exchange.direction"),
        key: "direction",
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
      });
      arr.push({
        width: m6,
        title: this.$t("exchange.price"),
        key: "price",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.price
              }
            },
            this.toFloor(params.row.price)
          );
        }
      });
      arr.push({
        width: m7,
        title: this.$t("exchange.num"),
        key: "amount",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.amount
              }
            },
            this.toFloor(params.row.amount)
          );
        }
      });
      arr.push({
        width: m10,
        title: this.$t("exchange.traded"),
        key: "tradedAmount",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.tradedAmount
              }
            },
            this.toFloor(params.row.tradedAmount)
          );
        }
      });
      arr.push({
        width: m8,
        title: this.$t("historyAndCu.turnoverAmount"),
        key: "turnover",
        render: (h, params) => {
          return h(
            "span",
            {
              attrs: {
                title: params.row.turnover
              }
            },
            this.toFloor(params.row.turnover)
          );
        }
      });
      arr.push({
        width: m9,
        title: this.$t("exchange.action"),
        key: "operate",
        render: (h, params) => {
          return h(
            "Button",
            {
              props: {
                size: "small"
              },
              style: {
                background: "#3399ff",
                borderColor: "#3399ff",
                color: "#fff",
                lineHeight: "15px"
              },
              on: {
                click: () => {
                  this.cancel(params.row.orderId);
                }
              }
            },
            this.$t("exchange.undo")
          );
        }
      });
      return arr;
    },
    exchangeType() {
      const m = this.$store.getters.lang == "English" ? mapEn : map;
      return [...m];
    }
  }
};
</script>

