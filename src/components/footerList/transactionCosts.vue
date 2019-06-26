<template>
  <div class="transactionCosts new_transactionCosts">
    <div class="top">
      <div class="title_a">{{ $t("foot.Transactiate") }}</div>
    </div>
    <div class="content bg">
      <div class="content_top">
        <div class="content_top_list">
          <!-- 交易对费率  等级费率   otc币种费率  币种费率-->
          <div  class="right" @click="listTab(1)" :class="tabid==1?'active':''">{{$t("foot.Tradrate")}}</div>
          <div @click="listTab(2)" :class="tabid==2?'active':''">{{ $t("foot.Gradrate") }}</div>
          <div @click="listTab(3)" :class="tabid==3?'active':''">{{ $t("foot.Otcurrenrates") }}</div>
          <div @click="listTab(4)" :class="tabid==4?'active':''">{{ $t("foot.Currencrates") }}</div>
        </div>
      </div>
      <div class="content_content" v-show="tabid==1">
        <div class="content_tab">
          <!-- 费率标准 交易对费率 -->
          <div class="content_tab_title">{{$t("foot.Standardates")}}</div>
          <!-- <div class="content_tab_title1">{{$t("foot.Tradrate")}}</div> -->
          <div class="content_tab_buy">
            <Table :columns="columns2" :data="data2"></Table>
          </div>
        </div>
      </div>
      <!-- 等级费率 -->
      <div class="content_content" v-show="tabid==2">
        <div class="content_tab">
          <div class="content_tab_title">{{$t("foot.Standardates")}}</div>
          <!-- <div class="content_tab_title1">{{$t("foot.Gradrate")}}</div> -->
          <div class="content_tab_buy">
            <Table :columns="columns1" :data="data1">
              <template slot-scope="{ row }" slot="exchangeFeeRate">
                <span>{{ row.exchangeFeeRate*100 }}%</span>
              </template>
            </Table>
          </div>
        </div>
      </div>
      <!-- otc币种费率 -->
      <div class="content_content" v-show="tabid==3">
        <div class="content_tab">
          <div class="content_tab_title">{{$t("foot.Standardates")}}</div>
          <!-- <div class="content_tab_title1">{{$t("foot.Otcurrenrates")}}</div> -->
          <div class="content_tab_buy">
            <Table :columns="columns3" :data="data3"></Table>
          </div>
        </div>
      </div>

      <!-- 币种费率 -->
      <div class="content_content" v-show="tabid==4">
        <div class="content_tab">
          <div class="content_tab_title">{{$t("foot.Standardates")}}</div>
          <!-- <div class="content_tab_title1">{{$t("foot.Currencrates")}}</div> -->
          <div class="content_tab_buy">
            <Table :columns="columns4" :data="data4"></Table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabid: 1,
      //  columns4: [
      //       // {
      //       //     title: '名称',
      //       //     key: 'name'
      //       // },
      //       // {
      //       //     title: '最小提币手续费',
      //       //     key: 'minTxFee',
      //       //     align: 'center'
      //       // },
      //       {
      //           title: '最大提币手续费',
      //           key: 'maxTxFee',
      //           align: 'center'
      //       },
      //       {
      //           title: '矿工费',
      //           key: 'minerFee',
      //           align: 'right'
      //       }
      //   ],

      // columns3: [
      //   {
      //     title: "币种",
      //     key: "unit",
      //     align: "center"
      //   },
      //   {
      //     title: "交易手续费率",
      //     key: "jyRate",
      //     align: "center"
      //   }
      // ],
      // columns2: [
      //   {
      //     title: "交易对",
      //     key: "symbol"
      //   },
      //   {
      //     title: "结算币种手续费",
      //     key: "baseFee",
      //     align: "center"
      //   },
      //   {
      //     title: "基币手续费",
      //     key: "fee",
      //     align: "right"
      //   }
      // ],
      // columns1: [
      //   {
      //     title: "等级名称",
      //     key: "gradeName"
      //   },
      //   {
      //     title: "手续费比例",
      //     slot: "exchangeFeeRate",
      //     align: "center"
      //   },
      //   {
      //     title: "每日提币数量限制",
      //     key: "dayWithdrawCount",
      //     align: "right"
      //   }
      // ],
      data1: [],
      data2: [],
      data3: [],
      data4: []
    };
  },
  mounted() {
    this.getDate();
  },

  computed: {
    columns1() {
      let listbb = [];
      listbb.push({
        // 等级名称
        title: this.$t("foot.Clasame"),
        key: "gradeName",
        width:160,
        align:"center"
      });
      listbb.push({
        // 手续费比例
        title: this.$t("foot.Commissratio"),
        slot: "exchangeFeeRate",
        align: "center",
        width:200,
      });

      listbb.push({
        // 每日提币数量限制
        title: this.$t("foot.Dailthdrawamit"),
        key: "dayWithdrawCount",
        align: "left",
      });
      return listbb;
    },
    columns2() {
      let listcc = [];
      listcc.push({
        // 交易对
        title: this.$t("foot.Tradingn"),
        key: "symbol",
        width: 160,
        align: "center"

      });
      listcc.push({
        // 结算币种手续费
        title: this.$t("foot.Setturrencndliarge"),
        key: "baseFee",
        width: 300,
        align: "center"
      });
      listcc.push({
        // 基币手续费
        title: this.$t("foot.Baseee"),
        key: "fee",
        align: "left"
      });
      return listcc;
    },

    columns3() {
      let listdd = [];
      listdd.push({
        // 币种
        title: this.$t("foot.currency"),
        key: "unit",
        align: "center",
        width:160,
      });
      listdd.push({
        // 交易手续费率
        title: this.$t("foot.Transactiate"),
        key: "jyRate",
        align: "left",
       
      });
      return listdd;
    },

    columns4() {
      let listaa = [];
      listaa.push({
        //  title: '名称',
        title: this.$t("foot.Thenamohe"),
        key: "name",
        width:160,
        align:'center',
      });
      listaa.push({
        //  最小提币手续费
        title: this.$t("foot.Miniwithdrawfee"),
        key: "minTxFee",
        align: "center",
        width:200,
      });
      listaa.push({
        // 最大提币手续费
        title: this.$t("foot.Maximuthdrawafee"),
        key: "maxTxFee",
        align: "center",
        width:250,
      });
      listaa.push({
        //  矿工费
        title: this.$t("foot.Mineree"),
        key: "minerFee",
        align: "left",
       
      });
      return listaa;
    }
  },
  methods: {
    getDate() {
      this.$http.get(this.host + "/uc/ancillary/more/rate/detail").then(res => {
        var data = res.body;
        if (data.code == 0) {
          this.data1 = data.data.gradeRate;
          this.data2 = data.data.symbolRate;
          this.data3 = data.data.otcCoinRade;
          this.data4 = data.data.coinRade;
        }
        console.log(res);
      });
    },
    listTab(n) {
      this.tabid = n;
    }
  }
};
</script>
<style lang="scss">

.content .content_content .content_tab .content_tab_buy{
  width:1200px !important;
}
.new_transactionCosts{
  background:#0e0e28 !important;
  padding-top:29px;
  .content_tab_title{
    font-size:16px !important;
    color:#fff !important;
    margin-bottom: 22px;
  }
  .content_tab_buy{
    background:#0e0e28 !important;
  }
  .content .content_content{
    margin-top:36px !important;
    padding-top:0 !important;
    top:0 !important;
  }
  .content_tab{
  border:0 !important;
  }
  .content .content_top .content_top_list div{
    color:#fff !important;
  }
  .content .content_top .content_top_list .active{
    background:transparent !important;
    border-bottom: 1px solid #3399FF !important;
    color:#3399FF !important;
  }
  .content_top_list{
    height:65px !important;
   background:rgba(17,21,48,1) !important;
   margin-top:16px !important;
  }
  .top{
      height:30px !important;
      line-height:30px !important;
    }
  .content_top{
     background:#0e0e28 !important;
     font-size:20px !important;
  }
}
.top {
  width: 100%;
  height: 242px;
  // background: url(../../assets/images/fl1.png) 0 0 no-repeat;
  height: auto;
  position: relative;
  top: 60px;
  .title_a {
    width: 1200px;
    // height: 242px;
    // line-height: 242px;
    margin: 0 auto;
    color: #ffffffff;
    // font-size: 46px;
    font-size:20px;
  }
}
.content {
  width: 100%;
  .content_content {
    width: 100%;
    padding-top: 52px;
    padding-bottom: 96px;
    position: relative;
    top: 60px;
    .content_tab {
      // padding: 0 47px;
      width: 1200px;
      margin: 0 auto;
      border: 1px solid #ddddddff;
      padding-bottom: 45px;
      .content_tab_title {
        /*width:1107px;*/
        // height: 90px;
        // line-height: 90px;
        // text-align: center;
        // border-bottom: 1px solid #ddddddff;
        color: #333333ff;
        font-size: 18px;
      }
      .content_tab_title1 {
        // width: 1107px;
        height: 56px;
        line-height: 56px;
        background: #378febff;
        color: #fff;
        font-size: 16px;
        text-align: center;
        margin-top: 30px;
      }
      .content_tab_buy {
        width: 1107px;
        border: 1px solid #ddd;
        // border-bottom:0;
        .table_a {
          color: #333 !important;
          font-size: 16px;
        }
        .content_tab_buy1 {
          display: flex;
          height: 52px;
          line-height: 52px;
          color: #378feb;
          border-bottom: 1px solid #ddd;
          font-size: 16px;
          .left {
            width: 88px;
            text-align: center;
            margin-left: 25px;
          }
          .center {
            margin-left: 410px;
            width: 52px;
            text-align: center;
          }
          .right {
            margin-left: 447px;
            width: 52px;
            text-align: center;
          }
        }
        .content_tab_buy2 {
          height: 58px;
          border-bottom: 1px solid #ddd;
          display: flex;
          line-height: 52px;
          color: #333;
        }
      }
    }
  }

  .content_top {
    width: 100%;
    height: 104px;
    background: #f7f7f7ff;
    position: relative;
    top: 60px;
    .content_top_list {
      width: 1200px;
      height: 104px;
      margin: 0 auto;
      display: flex;
      color: #3399ffff;
      font-size: 16px;
      align-items: center;
      .active {
        width: 108px;
        height: 44px;
        background: #378febff;
        color: #fff;
      }
      div {
        width: 108px;
        height: 44px;
        text-align: center;
        color: #3399ffff;
        line-height: 44px;
        cursor: pointer;
      }
      .right {
        margin-left: 21px;
      }
    }
  }
}
.bg{
  thead {
    height:50px;
    background:rgba(25,29,58,1) !important;
    color:#8090AF !important;
    font-size:14px !important;
  }
  tr:nth-child(2n){
    background:rgba(16,18,43,1);
  }
  .ivu-table-wrapper{
    border:0 !important;
    background:rgba(17,21,48,1);
    border:1px solid rgba(17,21,48,1);
  }
  .ivu-table-tbody{
    color:#fff;
  }
  .ivu-table-wrapper .ivu-table .ivu-table-header th{
    background: transparent;
  }
  .ivu-table th{
    background: transparent;
  }
  .ivu-table{
    background: transparent;
  }
  .content .content_content .content_tab .content_tab_buy{
    //border: 0 !important;
   // background:rgba(17,21,48,1);
    //border:1px solid rgba(17,21,48,1);
  }
  .content_tab_buy{
    border: 0 !important;
  }
  .ivu-table td{
    background: transparent;
  }
  .ivu-table td, .ivu-table th{
    border: 0;
  }
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
</style>
