<template>
    <div class="feereturn">
        <div class="wrapper">
            <div class="textbg"></div>
            <div class="title">
                <p class="return_title">{{$t('feereturn.ruletitle')}}</p>
                <p class="return_content">{{$t('feereturn.rulecontent')}}</p>
                <p class="return_content">{{$t('feereturn.recordcontent')}}</p>
            </div>
            <div class="content">
                <p class="rule">{{$t('feereturn.recordtitle')}}</p>
                <div v-if=" lang == '简体中文' ">
                    <Table
                        :no-data-text="$t('common.nodata')"
                        size="small"
                        :columns="columns2"
                        :data="data1"
                    ></Table>
                </div>
                <div v-else>
                    <Table
                        :no-data-text="$t('common.nodata')"
                        size="small"
                        :columns="columns1"
                        :data="data1"
                    ></Table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components:{},
    data(){
        return {
            columns1: [
                    {//日期
                        title: "Date",
                        key: 'time',
                        align:'center',
                        maxWidth:100
                    },
                    {//当日BHB均价 eth
                        title: "Average price (ETH)",
                        key: 'averageprice',
                        align:'center',
                    },
                    {//当日总手续费折合
                        title: "Total (ETH)",
                        key: 'totalChange',
                        align:'center',
                                            },
                     {//当日挖矿手续费返还
                        title: "Trans-Fee Mining reimbursement",
                        key: 'returnCharge',
                        align:'center',
                    },
                    {//当日挖矿收入倍增计划返还;
                        title: "Incentive Program for FCoin reimbursement",
                        key: 'todayChargeReturn',
                        align:'center'
                    }
                ],
            columns2: [
                    {//日期
                        title: "日期",
                        key: 'time',
                        align:'center',
                        maxWidth:100
                    },
                    {//当日BHB均价 eth
                        title: "当日币多网均价(ETH)",
                        key: 'averageprice',
                        align:'center',
                        // width:180
                    },
                    {//当日总手续费折合
                        title: "当日总手续费折合(ETH)",
                        key: 'totalChange',
                        align:'center',
                        // width:170
                    },
                     {//当日挖矿手续费返还
                        title: "当日挖矿手续费返还(BHB)",
                        key: 'returnCharge',
                        align:'center',
                        // width:280
                    },
                    {//当日挖矿收入倍增计划返还;
                        title: "当日挖矿收入倍增计划返还（BHB）",
                        key: 'todayChargeReturn',
                        align:'center'
                    }
                ],


            data1: [{
                        time: '2018-06-29',
                        averageprice: 0.00075244 ,
                        totalChange: 20204.77369494 ,
                        returnCharge: 26852403.72472166 ,
                        todayChargeReturn:1741220.49827093
                    }]
        }
    },
    computed:{
        lang(){
            return this.$store.state.lang;
        }
    },
    created: function() {},
     methods: {}
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.feereturn {
  width: 100%;
  min-height: 600px;
  background-color: #1b262d;
  overflow: hidden;
  .wrapper {
    width: 75%;
    margin: 20px auto;
    overflow: hidden;
    .textbg {
      background: url("../../assets/images/city.png") no-repeat;
      background-size: cover;
      padding-top: 270px;
    }
    .title {
      background-color: #fff;
      border-radius: 5px;
      padding: 10px 20px 20px 20px;
      .return_title {
        line-height: 30px;
        font-size: 16px;
      }
      .return_content {
        font-size: 12px;
        line-height: 20px;
      }
    }
    .content {
      background-color: #fff;
      margin: 20px auto;
      border-radius: 5px;
      padding: 10px 0 20px 0;
      .rule {
        font-size: 16px;
        line-height: 30px;
        margin-left: 20px;
      }
    }
  }
}

@media screen and (max-width: 415px) {
  .feereturn {
    width: 100%;
    min-height: 600px;
    background-color: #1b262d;
    overflow: hidden;
    .wrapper {
      width: 90%;
      margin: 20px auto;
      overflow: hidden;
      .textbg {
        display: none;
      }
      .title {
        background-color: #fff;
        border-radius: 5px;
        padding: 10px 20px 20px 20px;
        .return_title {
          line-height: 30px;
          font-size: 18px;
        }
        .return_content {
          font-size: 14px;
          line-height: 20px;
        }
      }
      .content {
        background-color: #fff;
        margin: 20px auto;
        border-radius: 5px;
        padding: 10px 0 20px 0;
        .rule {
          font-size: 18px;
          line-height: 30px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.ivu-table-cell {
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: initial; */
  /* word-break: break-all; */
}
.feereturn{
    .ivu-table table {
        min-width: 600px;
    }
    .ivu-table table th{
        border: none;
    }
}

</style>


