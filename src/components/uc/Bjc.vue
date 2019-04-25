<template>
  <div class="nav-rights">
    <div class="nav-right">
      <div class="blc_box">
        <span>类型:&nbsp;</span>
        <Select v-model="model1" style="width:200px" :clearable="true">
          <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.type }}</Option>
        </Select>
        <span style="margin-left:20px;">期次:&nbsp;</span>
        <Input v-model="value" placeholder="输入期次" style="width: 200px" :clearable="true"/>
        <span style="margin-left:20px;">下注时间:&nbsp;</span>
        <DatePicker type="daterange" placeholder="请输入你要选择的日期" style="width: 200px" v-model="rangeDate" :editable="false"></DatePicker>
        <button class="search_btn" @click="serar">搜索</button>
      </div>
      <div class="blc-table">
        <Table stripe :columns="tableColumnsBlc" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
        <div class="page-wrap">
          <Page :current="pageNo" :total="parseInt(totalElement)" :page-size="pageSize" @on-change="promoteMoneyPageChange"></Page>
        </div>
      </div>
    </div>
    <Modal v-model="modal2" :footer-hide="true" width="900px">
      <p slot="header">开奖详情</p>
      <Table :columns="columns2" :data="data2"></Table>
    </Modal>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    let that = this;
    return {
      pageNo:1,
      model1: "",
      itemList: {},
      rangeDate: "",
      value:"",
      rangeDate:"",
      periodNo:null,
      startTime:null,
      endTime:null,
      typeId:null,
      tableColumnsBlc: [
        {
          title: "类型",
          key: "quizType",
          minWidth: 60,
          align: "center"
        },
        {
          title: "期次",
          align: "center",
          width: 80,
          key:"periodNo"
        },
        {
          title: "每注个数",
          key: "betAmount",
          align: "center",
        },
        {
          title: "投注数",
          align: "center",
          key: "betNum"
        },
        {
          title: "下注时间",
          key: "betTime",
          align: "center",
          width: 180
        },
        {
          title: "奖项",
          align: "center",
           render:(h, param)=>{
            let str = "";
            if(param.row.winningLevel == 1){
              str = "一等奖"
            }else if(param.row.winningLevel == 2){
              str = "二等奖"
            }else if(param.row.winningLevel == 3){
              str = "三等奖"
            }else if(param.row.winningLevel == 9){
              str = "阳光普照奖"
            }else{
              if(param.row.orGrand == 0){
                str = "未开奖"
              }else if(param.row.orGrand == 9){
                str = "已回退"
              }
            }
            return h("span",{},str)
          }
        },
        {
          title: "开奖时间",
          key: "lotteryTime",
          align: "center",
          width: 180
        },
        {
          title: "中奖",
          align: "center",
          width:100,
          render:(h,param)=>{
            return h("span",{},param.row.winningNum + param.row.winningCoin)
          }
        },
        {
          title: "开奖详情",
          align: "center",
          render: (h, param) => {
            let str = "";
            let params = {
              periodNo:param.row.periodNo,
              quizTypeId:param.row.quizTypeId
            };
            if(!param.row.winningLevel){
              str = "未开奖"
              return h("span",{},str)
            }else{
              str = "查看";
              return h("span",{
                on:{
                click:()=>{
                  this.check(params);
                }
              },
              style:{
                color:"#f0ac19"
              }
              },str)
            }
          }
        }
      ],
      tableMoney: [],
      modal2:false,
      columns2:[
        {
          title:"排行",
          key:"winningLevel",
          align:"center"
        },
        {
          title:"会员姓名",
          key:"memberName",
          align:"center"
        },
        {
          title:"福彩排列5",
          align:"center",
          render:(h, param)=>{
            return h("span",{},this.lotteryNo)
          }
        },
        {
          title:"下注时间",
          key:"betTime",
          width:200,
          align:"center"
        },
        {
          title:"奖项",
          align:"center",
          render:(h, param)=>{
            let str = "";
            if(param.row.winningLevel == 1){
              str = "一等奖"
            }else if(param.row.winningLevel == 2){
              str = "二等奖"
            }else if(param.row.winningLevel == 3){
              str = "三等奖"
            }else{
              str = "错误"
            }
            return h("span",{},str)
          }
        },
        {
          title:"中奖金额",
          align:"center",
          render:(h,param)=>{
            let str1 = param.row.winningNum + param.row.winningCoin;
            return h("span",{},str1)
          }
        }
      ],
      data2:[],
      pageSize: 10,
      loading: true,
      totalElement: 0
    };
  },
  created: function() {
    this.init();
    this.getlist();
  },
  methods: {
    init() {
      this.$http.get(this.host + "/uc/coin/guess/type").then(res => {
        let resp = res.body;
        if (resp.code == 0) {
          this.itemList = resp.data;
        } else {
          this.$Message.error(resp.message);
        }
      });
    },
    check(params){
      this.$http.post(this.host + "/uc/coin/guess/detail", params).then(res=>{
        let resp = res.body;
        if(resp.code == 0){
          this.modal2 = true;
          this.data2 = resp.data.quizOrders;
          this.lotteryNo = resp.data.lotteryNo;
        }else{
          this.$Message.error(resp.message);
        }
      })
    },
    getlist() {
       let pageNo = this.pageNo,
       pageSize = this.pageSize,
       periodNo = this.periodNo,
       startTime = this.startTime,
       endTime = this.endTime,
       memberId = this.$store.getters.member.id,
       typeId = this.typeId,
       param = { pageNo, pageSize, memberId,periodNo,startTime, endTime,typeId};
      this.$http.post(this.host + "/uc/coin/guess/memberId", param).then(res => {
          let resp = res.body;
          if (resp.code == 0) {
            this.loading = false;
            this.totalElement = resp.data.totalElements;
            this.tableMoney = resp.data.content;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    promoteMoneyPageChange(index) {
      this.pageNo = index;
      this.getlist();
    },
    serar() {
      this.pageNo = 1;
      this.loading = true;
      this.periodNo = this.value || null;
      this.typeId = this.model1 || null;
      let formatTime = this.formatTime;
      let rangeDate = this.rangeDate;
      if(rangeDate && rangeDate[0]){
        let startTime = new Date(rangeDate[0]);
        let date_value = startTime.getFullYear() + "-" +formatTime(startTime.getMonth() + 1) +"-" + formatTime(startTime.getDate())+" 00:00:00";
        this.startTime = date_value;
        let endTime = new Date(rangeDate[1]);
        let date_value2 = endTime.getFullYear() + "-" +formatTime(endTime.getMonth() + 1) +"-" + formatTime(endTime.getDate())+" 00:00:00";
        this.endTime = date_value2;
      }else{
        this.startTime = "";
        this.endTime = "";
      }
      this.getlist();
    },
    formatTime(date) {
      return date < 10 ? "0" + date : date;
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-right {
  height: auto;
  overflow: hidden;
  padding: 0 15px;
  .blc_box {
    span {
      font-size: 14px;
    }
    .search_btn {
      height: 32px;
      width: 86px;
      background: #f0ac19;
      color: #fff;
      font-size: 14px;
      border: none;
      outline: none;
      border-radius: 5px;
      margin-left: 10px;
    }
  }
  .blc-table {
    margin-top: 20px;
    .page-wrap {
      float: right;
      margin-top: 20px;
    }
  }
}
</style>
<style lang="scss">
.blc-table {
  .ivu-table-wrapper {
    .ivu-table-header {
      thead th {
        background: #fff;
      }
    }
    tbody.ivu-table-tbody .ivu-table-row td {
      background: #fff;
    }
    .ivu-table-header,
    .ivu-table-tbody {
      .ivu-table-cell {
        padding: 0;
      }
    }
  }
}
.ivu-modal .ivu-modal-body .ivu-table-wrapper{
  -moz-box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
        -webkit-box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
        box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
}

</style>
