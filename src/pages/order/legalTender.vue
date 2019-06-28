<template>
  <div class="nav-rights">
    <div class="nav-right">
      <div class="bill_box_order">
        <div class="order_box">
          <Tabs value="name5" @on-click="showItem" name="tab2-1">
            <TabPane :label="$t('new.All')" name="name5" tab="tab2-1">
              <div class="order-table">
                <Table
                      :no-data-text="$t('common.nodata')"
                      stripe
                      :columns="tableColumnsOrder"
                      :data="tableOrder"
                      :loading="loading"
                      :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                          v-if="totalPage > 10"
                          :total="totalNum"
                          :current="currentPage"
                          show-total
                          @on-change="changePage"
                          :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.unpaid')" name="name1" tab="tab2-1">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 10"
                      :total="totalNum"
                      :current="currentPage"
                      show-total
                      @on-change="changePage"
                      :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.paided')" name="name2" tab="tab2-1">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 10"
                      :total="totalNum"
                      :current="currentPage"
                      show-total
                      @on-change="changePage"
                      :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.finished')" name="name3" tab="tab2-1">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 0"
                      :total="totalNum"
                      :current="currentPage"
                      show-total
                      @on-change="changePage"
                      :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.canceled')" name="name0" tab="tab2-1">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 10"
                      :total="totalNum"
                      :pageSize="pageSize"
                      show-total
                      :current="currentPage"
                      @on-change="changePage"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('uc.otcorder.appealing')" name="name4" tab="tab2-1">
              <div class="order-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsOrder"
                  :data="tableOrder"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div style="margin: 10px;overflow: hidden" class="page">
                  <div style="float: right;">
                    <Page
                      v-if="totalPage > 10"
                      :total="totalNum"
                      :current="currentPage"
                      show-total
                      @on-change="changePage"
                      :page-size="pageSize"
                    ></Page>
                  </div>
                </div>
              </div>
            </TabPane>
            <input class="extra_input" v-model="ordKeyword" slot="extra" :placeholder="$t('uc.otcorder.searchtip')" />
            <span class="extra_btn" slot="extra" @click="handleSearch">{{ $t('new.searchfor') }}</span>
          </Tabs>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      ordKeyword: "",
      choseBtn: 0,
      whichItem: 5,
      tableOrder: [],
      loading: true,
      totalPage: 0,
      pageSize: 10,
      totalNum: 0,
      currentPage: 1,
      loginmsg: this.$t("common.logintip")
    };
  },
  methods: {
    // 获取历史记录信息
    handleListApproveHistory() {},
    changePage(pageNo) {
      if (pageNo > 0) pageNo = pageNo - 1;
      if (this.whichItem == 1) {
        this.getOrder(1, pageNo);
      } else if (this.whichItem == 2) {
        this.getOrder(2, pageNo);
      } else if (this.whichItem == 3) {
        this.getOrder(3, pageNo);
      } else if (this.whichItem == 0) {
        this.getOrder(0, pageNo);
      } else if (this.whichItem == 4) {
        this.getOrder(4, pageNo);
      }else if(this.whichItem == 5){
        this.getOrder(null,pageNo)
      }
    },
    getOrder(status, pageNo) {
      this.loading = true;
      this.tableOrder = [];
      let params = {};
      params["status"] = status;
      params["pageNo"] = pageNo;
      params["pageSize"] = this.pageSize;
      this.currentPage = pageNo + 1;
      this.$http.post(this.host + "/otc/order/self", params).then(response => {
        var resp = response.body;
        if (resp.code == 0 && resp.data.content) {
          this.tableOrder = resp.data.content;
          this.totalPage = resp.data.totalPages;
          this.totalNum = resp.data.totalElements;
        } else {
          // this.$Message.error(resp.message);
          // this.$Message.error(this.$t('common.logintip'));
          this.$Message.error(this.loginmsg);
        }
        this.loading = false;
      });
    },
    init() {},
    handleSearch() {
      this.tableOrder = [];
      let params = {};
      params["status"] = this.whichItem;
      if(params.status==5){
        params.status="";
      }
      params["pageNo"] = 0;
      params["pageSize"] = this.pageSize;
      if (this.ordKeyword != "") {
        params["orderSn"] = this.ordKeyword;
      }
      this.currentPage = 1;
      this.$http.post(this.host + "/otc/order/self", params).then(response => {
        var resp = response.body;
        if (resp.code == 0 && resp.data.content) {
          this.tableOrder = resp.data.content;
          this.totalPage = resp.data.totalPages;
          this.totalNum = resp.data.totalElements;
        } else {
          this.$Message.error(resp.message);
        }
        this.loading = false;
      });
    },
    showItem(name) {
      if (name == "name1") {
        this.whichItem = 1;
      } else if (name == "name2") {
        this.whichItem = 2;
      } else if (name == "name3") {
        this.whichItem = 3;
      } else if (name == "name0") {
        this.whichItem = 0;
      } else if (name == "name4") {
        this.whichItem = 4;
      } else if(name == "name5"){
        this.whichItem = 5;
      }
      this.changePage(0);
    },
    strpro(str) {
      let newStr = str;
      str = str.slice(1);
      var re = /[\D\d]*/g;
      var str2 = str.replace(re, function(str) {
        var result = "";
        for (var i = 0; i < str.length; i++) {
          result += "*";
        }
        return result;
      });
      return newStr.slice(0, 1) + str2;
    }
  },
  created() {
    this.changePage(0);
  },
  mounted() {
    // this.init();
  },
  computed: {
    tableColumnsOrder() {
      let self = this;
      let columns = [];
      columns.push({
        title: this.$t("uc.otcorder.orderno"),
        key: "orderSn",
        minWidth: 70,
        align: "center",
        render: function(h, params) {
          return h("p", [
            h(
              "a",
              {
                on: {
                  click: function() {
                    self.$router.push("/chat?tradeId=" + params.row.orderSn);
                  }
                }
              },
              params.row.orderSn
            )
          ]);
        }
      });
      columns.push({
        title: this.$t("uc.otcorder.created"),
        key: "createTime",
        minWidth: 90,
        align: "center"
      });
      columns.push({
        title: this.$t("uc.otcorder.symbol"),
        key: "unit",
        // width: 80,
        align: "center"
      });
      columns.push({
        title: this.$t("new.Typesof"),
        key: "class",
        // width: 90,
        align: "center",
        render: (h, params) => {
          let text = "";
          if (params.row.type == 0) {
            text = self.$t("new.markeprice");
          } else {
            text = self.$t("new.markeprice");
          }
          return h("div", [h("p", text)]);
        }
      });
      columns.push({
        title: this.$t("uc.otcorder.type"),
        key: "type",
        // width: 90,
        align: "center",
        render: (h, params) => {
          let text = "";
          if (params.row.type == 0) {
            text = self.$t("uc.otcorder.type_buy");
            return h("div", [h("p", {style:{color: '#F15057'}},text)]);
          } else {
            text = self.$t("uc.otcorder.type_sell");
            return h("div", [h("p", {style:{color: '#00B275'}},text)]);
          }
          
        }
      });
      columns.push({
        title: this.$t("uc.otcorder.tradename"),
        key: "name",
        // width: 80,
        ellipsis: "true",
        align: "center",
        render: function(h, params) {
          return h("p", [
            h(
              "a",
              {
                on: {
                  click: function() {
                    self.$router.push("/checkuser?id=" + params.row.name);
                  }
                }
              },
              params.row.name
            )
          ]);
        }
      });
      columns.push({
        title: this.$t("uc.otcorder.amount"),
        key: "amount",
        align: "center"
      });
      columns.push({
        title: this.$t("uc.otcorder.money"),
        key: "money",
        align: "center"
      });
      columns.push({
        title: this.$t("uc.otcorder.fee"),
        key: "commission",
        align: "center"
      });
      columns.push({
        title: this.$t("new.Details"),
        // width: 80,
        ellipsis: "true",
        align: "center",
        render: function(h, params) {
          return h("p", [
            h(
              "a",
              { 
                on: {
                  click: function() {
                      self.$router.push("/chat?tradeId=" + params.row.orderSn);
                  }
                },
                style: {
                  color: '#3399FF'
                }
              },
              self.$t('new.View111')
            )
          ]);
        }
      });
      return columns;
    }
  }
};
</script>
<style scoped>
.bill_box_order {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  /* overflow: hidden; */
}

.order_box {
  text-align: left;
  color: #FFFFFF;
}

.order_box a {
  color: #0b0d1b;
  font-size: 16px;
  padding: 0 30px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 54px;
  display: inline-block;
}

.order_box .active {
  border-bottom: 2px solid #00b5f6;
}

.order_box .search {
  position: absolute;
  width: 300px;
  height: 32px;
  top: 12px;
  right: 0;
  display: flex;
}

.extra_input {
  width: 312px;
  margin-right: 38px;
  height: 32px;
  padding: 4px;
  padding-left: 12px;
  margin-top:17px;
  border-radius: 0;
  outline:none;
  background: transparent;
  border:1px solid rgba(88,105,138,1);
  color: #fff;
  font-size: 12px;
}

.extra_btn {
  font-size: 12px;
  background: #3399FF;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  color: #fff;
  width: 74px;
  text-align: center;
  margin-right: 21px;
  cursor: pointer;
}
</style>

<style lang="scss">
.bill_box_order {
    * {
      box-shadow: none !important; 
    }
    .order_box {
      .ivu-tabs {
        // overflow:initial;
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
            .page {
            .ivu-icon.ivu-icon-ios-arrow-left,
            .ivu-icon.ivu-icon-ios-arrow-right {
                color: #666;
            }
            li.ivu-page-item.ivu-page-item-active {
                a {
                color: #fff;
                }
                &:hover {
                a {
                    color: #fff;
                }
                }
            }
            li.ivu-page-item {
                a {
                color: #666;
                }
                &:hover {
                border: 1px solid #3399ff;
                a {
                    color: #3399ff;
                }
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
                // margin-right: 31px;
                .ivu-tabs-ink-bar {
                  // transform: translate(31px)
                }
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
                    .ivu-table-cell  {
                      padding: 0;
                      text-align: center;
                    }
                    tr td:first-child .ivu-table-cell {
                        padding-left: 6px;
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

    .order_box .ivu-table th,
    .order_box .ivu-table td {
      background: #2A3850;
    }


    .order-table .ivu-table-wrapper .ivu-table {
        color: #fff;       
    }

    .order-table .ivu-table-wrapper  .ivu-table-stripe {
        background: transparent;
    }

    .order-table .ivu-table-wrapper .ivu-table .ivu-table-header th {
        background: #191D3A;
        color: #8090AF;
        //表格标题颜色
    }
    .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, 
    .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
        background: #10122B;
        //表格双数行样式
    }
    .ivu-table-wrapper .ivu-table .ivu-table-row td {
        background: #090e2e;
        //表格单数行样式
    }

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
}
</style>
