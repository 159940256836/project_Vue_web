<template>
  <div class="content-wrap" id="List">
    <div class="container">
      <!--<h2 class="title">{{ this.$t('otc.myorder')+' > ' + '订单详情' }}</h2>-->
      <p style="padding: 10px 0 10px 20px;font-size: 18px;">
        <router-link
                to="/order"
                style="color:#3399ff;"
        >
          {{$t('otc.myorder')}}
        </router-link>
        >
        <span style="font-size:16px;color: #333333;">{{$t('otc.chat.orderDetails')}}</span>
      </p>
      <div class="right-safe">
        <div class="leftmenu left-box">
          <div class="user-info">
            <div class="avatar-box">
              <div class="user-face user-avatar-public">
                <img v-if="user.avatar != null && user.avatar != ''" :src="user.avatar" width="60px" height="60px"
                     style="border-radius: 50%">
                <span v-else class="user-avatar-in">{{usernameS}}</span>
              </div>
              <div class="user-name">
              </div>
            </div>
            <p class="ml10">
              {{'ID:'+user.username}}
              <!-- {{user.username && user.username && strpro(user.username)}} -->
            </p>
          </div>
          <div class="deal-market-info">
            <p>
              <img src="../../assets/images/fait/email.png">
              <span class="unmarket">
                {{ user.emailVerified==1 ? $t('otc.tradeinfo.emaildone'):$t('otc.tradeinfo.emailundo') }}
            </span>
            </p>
            <p>
              <img src="../../assets/images/fait/phone.png">
              <span class="">{{ user.phoneVerified==1 ? $t('otc.tradeinfo.teldone'):$t('otc.tradeinfo.telundo')}}</span>
            </p>
            <p>
              <img src="../../assets/images/fait/idcard.png">
              <span class="">{{ user.idCardVerified==1 ? $t('otc.tradeinfo.idcarddone'):$t('otc.tradeinfo.idcardundo')}}</span>
            </p>
            <!--<p v-if="user.emailVerified==1">
              <i class="iconfont icon-youxiang111"></i>
              <span class="unmarket">{{$t('otc.checkuser.emaildone')}}</span>
            </p>
            <p v-else>
              <i class="iconfont icon-youxiang"></i>
              <span class="unmarket">{{$t('otc.checkuser.emailundo')}}</span>
            </p>
            <p v-if="user.phoneVerified==1">
              <i class="iconfont icon-dianhua111"></i>
              <span class="">{{$t('otc.checkuser.teldone')}}</span>
            </p>
            <p v-else>
              <i class="iconfont icon-dianhua"></i>
              <span class="">{{$t('otc.checkuser.telundo')}}</span>
            </p>
            <p v-if="user.realVerified==1">
              <i class="iconfont icon-renzheng111"></i>
              <span class="">{{$t('otc.checkuser.idcarddone')}}</span>
            </p>
            <p v-else>
              <i class="iconfont icon-renzheng"></i>
              <span class="unmarket">{{$t('otc.checkuser.idcardundo')}}</span>
            </p>-->
          </div>
          <div class="trade-right-box">
            <div class="trade-price">
              <Row class="tit">
                <Col span="10" style="width:270px;">
                  <p>{{$t('otc.checkuser.language')}}</p>
                  <p>{{$t('otc.checkuser.languagetext')}}</p>
                </Col>
                <Col span="6" style="text-align:left">
                  <p>{{$t('otc.checkuser.registtime')}}</p>
                  <p>{{user.createTime}}</p>
                </Col>
                <Col span="6" style="text-align:right">
                  <p>{{$t('otc.checkuser.exchangetimes')}}</p>
                  <p>{{user.transactions}}</p>
                </Col>
              </Row>
            </div>
          </div>
          <!-- <div class="deal-user-trade-info">
                                              <p>交易次数：
                                                  <em class="trade-times">{{user.transactions}}</em>
                                              </p>
                                              <p>平均放行：
                                                  <em>666 分钟</em>
                                              </p>
                                          </div> -->
        </div>
        <div class="demo-tabs-style1 tabbox">
          <Tabs value="name1">
            <TabPane :label="$t('otc.checkuser.tablabel1')" name="name1">
              <div class="order-table">
                <Table
                        :no-data-text="$t('common.nodata')"
                        stripe
                        :columns="tableColumnsOrderSell"
                        :data="tableOrderSell"
                        :loading="loading"
                        :disabled-hover="true"
                ></Table>
                <!-- <div style="margin: 10px;overflow: hidden">
                                                            <div style="float: right;">
                                                                <Page :total="100" :current="1" @on-change="changePage"></Page>
                                                            </div>
                                                        </div> -->
              </div>
            </TabPane>
            <TabPane :label="$t('otc.checkuser.tablabel2')" name="name2">
              <div class="order-table">
                <Table
                        :no-data-text="$t('common.nodata')"
                        stripe
                        :columns="tableColumnsOrderBuy"
                        :data="tableOrderBuy"
                        :loading="loading"
                        :disabled-hover="true"
                ></Table>
                <!-- <div style="margin: 10px;overflow: hidden">
                                                            <div style="float: right;">
                                                                <Page :total="100" :current="1" @on-change="changePage"></Page>
                                                            </div>
                                                        </div> -->
              </div>
            </TabPane>
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
        loading: true,
        hasRealName: false,
        usernameS: "",
        user: {
          username: "",
          email: true,
          mobileNo: false,
          idCard: true
        },
        tableOrderSell: [],
        tableOrderBuy: []
      };
    },
    created() {
      this.getAdv();
    },
    computed: {
      isLogin: function () {
        return this.$store.getters.isLogin;
      },
      member: function () {
        return this.$store.getters.member;
      },
      tableColumnsOrderSell() {
        let self = this;
        let columns = [];
        columns.push({
          title: this.$t("otc.checkuser.col_symbol"),
          key: "unit"
        });
        columns.push({
          title: this.$t("otc.checkuser.col_paymode"),
          key: "payMode"
        });
        columns.push({
          title: this.$t("otc.checkuser.col_num"),
          key: "remainAmount"
        });
        columns.push({
          title: this.$t("otc.checkuser.col_price") + "/BTC",
          key: "price",
          width: 170,
          render: function (h, params) {
            return h("div", [
              h(
                  "p",
                  {
                    attrs: {
                      class: "price"
                    }
                  },
                  params.row.price + "CNY"
              ),
              h(
                  "p",
                  {
                    attrs: {
                      class: "price2"
                    }
                  },
                  params.row.minLimit + "-" + params.row.maxLimit + "CNY"
              )
            ]);
          }
        });
        columns.push({
          title: this.$t("otc.checkuser.col_created"),
          key: "createTime",
          width: 160
        });
        columns.push({
          title: this.$t("otc.checkuser.col_operate"),
          key: "buyBtn",
          render: function (h, params) {
            return h("p", [
              h(
                  "a",
                  {
                    on: {
                      click: function () {
                        if (!self.isLogin) {
                          self.$router.push("/login");
                        } else if (!self.member.realName) {
                          self.$Message.error(self.$t("otc.checkuser.operatemsg"));
                          setTimeout(() => {
                            self.$router.push("/account");
                          }, 2000);
                        } else {
                          self.$router.push(
                              "/otc/tradeInfo?tradeId=" + params.row.advertiseId
                          );
                        }
                      }
                    },
                    style: {
                      color: "#fff"
                    }
                  },
                  [
                    h(
                        "span",
                        {
                          style: {
                            marginRight: "8px",
                            width: "80%",
                            color: '#F15057'
                          }
                        },
                        self.$t("otc.checkuser.buyin")
                    )
                  ]
              )
            ]);
          }
        });

        return columns;
      },
      tableColumnsOrderBuy() {
        let self = this;
        let columns = [];
        columns.push({
          title: this.$t("otc.checkuser.col_symbol"),
          key: "unit"
        });
        columns.push({
          title: this.$t("otc.checkuser.col_paymode"),
          key: "payMode"
        });
        columns.push({
          title: this.$t("otc.checkuser.col_num"),
          key: "remainAmount"
        });
        columns.push({
          title: this.$t("otc.checkuser.col_price") + "/BTC",
          key: "price",
          width: 170,
          render: function (h, params) {
            return h("div", [
              h(
                  "p",
                  {
                    attrs: {
                      class: "price"
                    }
                  },
                  params.row.price + "CNY"
              ),
              h(
                  "p",
                  {
                    attrs: {
                      class: "price2"
                    }
                  },
                  params.row.minLimit + "-" + params.row.maxLimit + "CNY"
              )
            ]);
          }
        });
        columns.push({
          title: this.$t("otc.checkuser.col_created"),
          key: "createTime",
          width: 160
        });
        columns.push({
          title: this.$t("otc.checkuser.col_operate"),
          key: "buyBtn",
          render: function (h, params) {
            return h("p", [
              h(
                  "a",
                  {
                    on: {
                      click: function () {
                        if (!self.isLogin) {
                          self.$router.push("/login");
                        } else if (!self.member.realName) {
                          self.$Message.error(self.$t("otc.checkuser.operatemsg"));
                          setTimeout(() => {
                            self.$router.push("/uc/safe");
                          }, 2000);
                        } else {
                          self.$router.push(
                              "/otc/tradeInfo?tradeId=" + params.row.advertiseId
                          );
                        }
                      }
                    },
                    style: {
                      color: "rgb(0, 178, 117)"
                    }
                  },
                  [
                    h(
                        "span",
                        {
                          props: {
                            type: "error",
                            long: true
                          },
                          style: {
                            marginRight: "8px",
                            width: "80%"
                          }
                        },
                        self.$t("otc.checkuser.sellout")
                    )
                  ]
              )
            ]);
          }
        });

        return columns;
      }
    },
    methods: {
      changePage() {
      },
      getAdv() {
        //获取个人账户信息
        this.$http
            .post(this.host + "/otc/advertise/returnMember", {
              id: this.$route.query.id
            })
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.loading = false;
                this.tableOrderBuy = resp.data.buy;
                this.tableOrderSell = resp.data.sell;
                this.user = resp.data;
                this.usernameS = (this.user.username + "")
                    .replace(/^\s+|\s+$/g, "")
                    .slice(0, 1);
              } else {
                this.$Message.error(resp.message);
              }
            });
      },
      strpro(str) {
        let newStr = str;
        str = str.slice(1);
        var re = /[\D\d]*/g;
        var str2 = str.replace(re, function (str) {
          var result = "";
          for (var i = 0; i < str.length; i++) {
            result += "*";
          }
          return result;
        });
        return newStr.slice(0, 1) + str2;
      }
    }
  };
</script>

<style scoped>
  .container {
    margin: 0 auto;
    width: 1200px;
    background: #f4f6f8;
    color: #fff;
    overflow: hidden;
  }

  .content-wrap {
    background: #f4f6f8;
    min-height: 600px;
    padding-top: 80px;
  }

  /* right */
  .title {
    font-weight: normal;
    font-size: 20px;
    height: 20px;
    line-height: 20px;
    margin-top: 39px;
    margin-bottom: 26px;
  }

  .merchant-top {
    height: 55px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    /*background: #fff;*/
    padding: 0 15px;
    color: #111530;
    margin-left: 20px;
  }

  .merchant-icon {
    width: 4px;
    height: 22px;
    margin-right: 10px;
    background: #3399ff;
    display: inline-block;
    margin-left: 4px;
  }

  .tips-word {
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    text-align: left;
    font-size: 14px;
  }

  .tit div {
    color: #a2a2a2;
  }

  .trade-right-box {
    float: left;
    text-align: left;
    width: 650px;
  }

  .trade-right-box .trade-price {
    padding: 24px 0;
    background-color: transparent;
  }

  .trade-right-box .trade-price p {
    color: #666;
    font-size: 14px;
    line-height: 2.6;
  }

  .trade-right-box .trade-price p:nth-child(2n) {
    color: #333;
  }

  .trade-right-box .trade-price p label {
    min-width: 80px;
    display: inline-block;
  }

  .trade-right-box .trade-price p span {
    margin-left: 15%;
    display: inline-block;
  }

  .trade-right-box .trade-operation {
    padding: 20px;
    background-color: white;
    border: 1px solid #ebeff5;
    margin-bottom: 20px;
  }

  .trade-right-box .trade-operation .trade-price-input {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .trade-right-box .trade-operation .trade-price-input .price-input-list {
    border: 1px solid #c5cdd7;
    width: 45%;
  }

  .trade-right-box
  .trade-operation
  .trade-price-input
  .price-input-list
  .coin-name {
    background-color: #ebeff5;
    display: inline-block;
    padding: 10px 22px;
    font-size: 18px;
    color: #0d214e;
    border-right: 1px solid #c5cdd7;
  }

  .trade-right-box .trade-operation .trade-price-input .price-input-list > input {
    border: none;
    background-color: transparent;
    outline: none;
    padding: 10px;
    display: inline-block;
    width: 75%;
  }

  .trade-right-box .trade-operation .trade-price-input .exchange {
    width: 10%;
    text-align: center;
    font-size: 24px;
  }

  .trade-right-box .trade-operation .trade-price-input .price-input-list {
    border: 1px solid #c5cdd7;
    width: 45%;
  }

  .trade-right-box .trade-operation .text-inputs {
    background-color: white;
    border: 1px solid #c5cdd7;
    outline: none;
    display: block;
    height: 100px;
    width: 100%;
    resize: none;
    padding: 20px;
    margin-bottom: 20px;
  }

  .trade-right-box .trade-operation .price-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .trade-right-box .trade-operation .price-box .show-price {
    border: 1px solid #c5cdd7;
    width: 80%;
    height: 58px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 10px;
  }

  .trade-right-box .trade-operation .price-box .show-price em {
    font-style: normal;
    font-size: 14px;
    color: #0d214e;
  }

  .trade-right-box .trade-operation .price-box .show-price span {
    font-size: 18px;
    color: #ee6543;
    font-weight: bolder;
  }

  .trade-right-box .trade-operation .price-box .btn-trade-in {
    outline: medium;
    border: 0;
    color: white;
    padding: 20px 26px;
    background-color: #ee6543;
    cursor: pointer;
    width: 20%;
    text-align: center;
  }

  .trade-right-box .trade-remark {
    background-color: white;
    border: 1px solid #ebeff5;
    padding: 30px 36px;
    margin-bottom: 30px;
  }

  .trade-right-box .trade-remark .titles {
    margin-bottom: 15px;
  }

  .trade-right-box .trade-remark .titles span {
    font-size: 22px;
    color: #0d214e;
    padding-right: 30px;
  }

  .trade-right-box .trade-remark .content {
    margin-bottom: 30px;
    font-size: 14px;
    color: #8994a3;
    line-height: 1.8;
  }

  /* -- */

  .icon1 {
    background: url("../../assets/img/btc.png") no-repeat 0 0;
    background-size: 100% 100%;
  }

  .icon2 {
    background: url("../../assets/img/usdt.png") no-repeat 0 0;
    background-size: 100% 100%;
  }

  /* left */

  .leftmenu {
    margin-bottom: 22px;
    background: #ffffff;
    position: relative;
    padding: 27px 43px;
    height: 188px;
  }

  .left-box .user-info {
    float: left;
    height: 100%;
    width: 65px;
    padding-bottom: 15px;
  }

  .avatar-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .user-avatar-public {
    /*background: #fff;*/
    height: 65px;
    width: 65px;
    box-shadow: 0 1px 5px 0 rgba(71, 78, 114, 0.24);
    position: relative;
  }

  .user-avatar-public > .user-avatar-in,
  .user-avatar-public {
    border-radius: 50%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .user-avatar-public > .user-avatar-in {
    border-radius: 50%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #3399ff;
    height: 60px;
    width: 60px;
    color: #fff;
  }

  .left-box p.ml10 {
    display: inline-block;
    text-align: center;
    margin-top: 10px;
    color: #333;
    width: 65px;
  }

  .left-box .deal-market-info {
    float: left;
    color: #333;
    margin-top: -6px;
    margin-left: 105px;
    width: 252px;
    border-right: 1px solid #eeeeee;
  }
  .left-box .deal-market-info img {
    margin-right: 10px;
  }
  .left-box .deal-market-info p {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
    margin-bottom: 18px;
  }

  .iconfont {
    font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .left-box .deal-market-info p .iconfont {
    margin-right: 20px;
    font-size: 20px;
  }

  .left-box .deal-market-info p .iconfont:before {
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    display: inline-block;
    content: "";
  }

  .icon-youxiang:before {
    background-image: url(../../assets/img/t1-1.png);
  }

  .icon-youxiang111:before {
    background-image: url(../../assets/img/t1-2.png);
  }

  .icon-dianhua:before {
    background-image: url(../../assets/img/t2-1.png);
  }

  .icon-dianhua111:before {
    background-image: url(../../assets/img/t2-2.png);
  }

  .icon-renzheng:before {
    background-image: url(../../assets/img/t3-1.png);
  }

  .icon-renzheng111:before {
    background-image: url(../../assets/img/t3-2.png);
  }

  .left-box .deal-user-trade-info {
    padding-top: 20px;
    color: #8994a3;
  }

  .left-box .deal-user-trade-info p {
    margin-bottom: 6px;
  }

  .left-box .deal-user-trade-info p em {
    font-style: normal;
    color: #0d214e;
  }
</style>

<style lang="scss">
  .right-safe {
    .ivu-tabs {
      * {
        background: transparent;
        // border: none;
      }
      .ivu-tabs-nav .ivu-tabs-tab-active {
        color: #FE5C5C;
        border-bottom: 3px solid #FE5C5C;
      }
      .ivu-tabs-bar {
        border-bottom: none;
        background: #fff;

        .ivu-tabs-nav-container {
          .nav-text.ivu-tabs-nav {

            .ivu-tabs-tab.ivu-tabs-tab-active.ivu-tabs-tab-focused {
              color: #FE5C5C;
            }

            .ivu-tabs-ink-bar.ivu-tabs-ink-bar-animated {
              background-color: #3399ff;
            }

            .ivu-tabs-tab {
              &:hover {
                color: #FE5C5C;
              }
            }
          }
        }
      }
    }

    .ivu-tabs-nav {
      padding-left: 10px;
      color: #fff;
    }

    .order-table .ivu-table-header tr {
      height: 50px;
    }
  }

  .right-safe .demo-tabs-style1.tabbox {
    .ivu-tabs {
      th, td {
        border-bottom: none;
      }

      // overflow:hidden;
      padding-bottom: 20px;

      .ivu-tabs-content.ivu-tabs-content-animated {
        width: 100%;
        margin: 0 auto;
        // .ivu-tabs-tabpane{
        //   .order-table .ivu-table-wrapper .ivu-table.ivu-table-stripe{
        //     .ivu-table-body .ivu-table-tbody .ivu-table-row td{
        //       background: #191D3A;
        //     }
        //   }
        // }
        .order-table .ivu-table-wrapper .ivu-table .ivu-table-header th {
          background: #fff;
          &:last-child {
            text-align: right;
          }
        }

        .order-table .ivu-table-wrapper .ivu-table:before {
          height: 0;
        }
      }
    }
  }

  .right-safe .ivu-table th,
  .right-safe .ivu-table td {
    background: #2A3850;
  }

  .right-safe .ivu-table .ivu-table-tip td {
    background: transparent;
  }


  .right-safe .ivu-table-wrapper .ivu-table {
    color: #fff;
  }

  .right-safe .ivu-table-wrapper .ivu-table-stripe {
    background: transparent;
  }

  .right-safe .ivu-tabs-nav .ivu-tabs-tab {
    color: #333;
    padding: 18px 16px;
  }

  .right-safe .ivu-tabs-nav .ivu-tabs-tab:hover {
    color: #FE5C5C;
  }

  .right-safe .ivu-table-wrapper .ivu-table .ivu-table-header th {
    background: #fff;
    color: #666;
    //表格标题颜色
  }

  .right-safe .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
  .right-safe .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
    background: #fff;
    //表格双数行样式
  }
  .ivu-table-row td {
    &:last-child {
      text-align: right;
    }
  }
  .right-safe .ivu-table-wrapper .ivu-table .ivu-table-row td {
    background: #f4f6f8;
    //表格单数行样式
  }

  //去Table边框
  .right-safe .ivu-table-wrapper .ivu-table:before {
    background: transparent;
  }

  .right-safe div.ivu-card-body {
    padding: 0;
  }

  .right-safe div.ivu-table-wrapper {
    border: none;
  }

  .right-safe .ivu-table:before {
    content: '';
    width: 100%;
    height: 0px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1
  }

  .right-safe .ivu-table:after {
    content: '';
    width: 0px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3
  }
</style>



