<template>
  <div class="order-table-index" id="moneyindex">
    <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
      <div class="bill_box rightarea padding-right-clear">
        <div class="bill_box rightarea padding-right-clear">
          <Tabs
            v-model="splitcomponentContent"
            name="tab1-1"
            @on-click="changeTab"
          >
            <TabPane
              :label="$t('myAccount._BitcoinAccount')"
              tab="tab1-1"
              name="COIN"
            ></TabPane>
            <TabPane
              :label="$t('myAccount._legaTenderAccount')"
              tab="tab1-1"
              name="CURRENCY"
            ></TabPane>
            <!-- <TabPane :label="$t('myAccount._LeveragedAccounts')" name="LEVER"></TabPane> -->
          </Tabs>
          <!-- <keep-alive> -->
          <component :is="splitcomponent"></component>
          <!-- </keep-alive> -->

        </div>
        <!-- <div class="shaow">
          <div class="order-table">
            <Table stripe :columns="tableColumnsMoney" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
          </div>
        </div>
        <Modal v-model="modal" :title="$t('uc.finance.money.match')" @on-ok="matchGCC">
            <P style="font-weight: bold;padding: 10px 0;">{{$t('uc.finance.money.matchtip1')}}：{{GCCMatchAmount}}</p>
            <p>
                <span>{{$t('uc.finance.money.matchtip2')}}：</span>
                <InputNumber style="width: 150px;" type="text" v-model="matchAmount" :placeholder="$t('uc.finance.money.matchtip2')"></InputNumber>
            </p>
        </Modal>
        <Modal v-model="modal_msg" :title="$t('uc.finance.money.match')">
            <p>{{match_msg}}</p>
        </Modal> -->
        <!-- <transfermodal :modal="modal" @closetransferModal="closeModal"></transfermodal> -->
    </div>
    </div>
  </div>
</template>
<script>
import coin from '../splitaccount/coin'
import currency from '../splitaccount/currency'
import lever from '../splitaccount/lever'
export default {
  components: { coin, currency, lever },
  data() {
    return {
      splitcomponent: coin,
      splitcomponentContent: 'COIN',
      GCCMatchAmount: 0,
      matchAmount: 0,
      modal: false,
      loginmsg: this.$t('common.logintip'),
      loading: true,
      ordKeyword: '',
      tableMoney: [],
      canMatch: true,
      modal_msg: false,
      match_msg: ''

    }
  },
  methods: {
    // closeModal(){
    //     this.modal = false;
    // },
    changeTab(name) {
      this.splitcomponentContent = name
      name == 'COIN' && (this.splitcomponent = coin)
      name == 'CURRENCY' && (this.splitcomponent = currency)
      name == 'LEVER' && (this.splitcomponent = lever)
    },

    // getMoney(status) {
    //   if (!status) {
    //     this.$http.post(this.host + "/uc/asset/wallet").then(response => {
    //       var resp = response.body;
    //       if (resp.code == 0) {
    //         this.tableMoney = resp.data
    //         for (let i = 0; i < this.tableMoney.length; i++) {
    //           this.tableMoney[i].coinType = this.tableMoney[i].coin.unit;
    //         }
    //         this.loading = false;
    //       } else {
    //         // this.$Message.error(resp.message);
    //         //  this.$Message.info(this.$t('common.logintip'));
    //         this.$Message.error(this.loginmsg);
    //       }
    //     });
    //   } else {
    //     this.$http.post(this.host + "/uc/asset/wallet").then(response => {
    //       var resp = response.body;
    //       if (resp.code == 0) {
    //         let data = resp.data
    //         for (let i = 0; i < data.length; i++) {
    //           if (data[i].balance == "0" && data[i].frozenBalance == "0" && data[i].frozenBalance == "0") {
    //           } else {
    //             data[i].coinType = data[i].coin.unit;
    //             this.tableMoney.push(data[i])
    //           }
    //         }
    //         this.loading = false;
    //       } else {
    //         // this.$Message.error(resp.message);
    //         //  this.$Message.info(this.$t('common.logintip'));
    //         this.$Message.error(this.loginmsg);
    //       }
    //     });
    //   }
    //   //获取

    // },
    getGCCMatchAmount() {
      // 获取
      this.$http
          .post(this.host + '/uc/asset/wallet/match-check')
          .then(response => {
            var resp = response.body
            if (resp.code == 0) {
              this.canMatch = true
              this.GCCMatchAmount = resp.data
            } else {
              this.canMatch = false
              this.match_msg = resp.message
              // this.$Message.error(this.loginmsg);
            }
            this.showMatchDailog()
          })
    },
    showMatchDailog() {
      if (this.canMatch) this.modal = true
      else this.modal_msg = true
    },
    matchGCC() {
      if (this.matchAmount <= 0) {
        this.$Message.warning(this.$t('uc.finance.money.matcherr1'))
      } else if (this.matchAmount > this.GCCMatchAmount) {
        this.$Message.warning(this.$t('uc.finance.money.matcherr2'))
      } else {
        // 配对
        const params = {}
        params['amount'] = this.matchAmount
        this.$http
            .post(this.host + '/uc/asset/wallet/match', params)
            .then(response => {
              var resp = response.body
              if (resp.code == 0) {
                this.$Message.success(this.$t('uc.finance.money.matchsuccess'))
                this.GCCMatchAmount = this.GCCMatchAmount - this.matchAmount
              } else {
                this.$Message.error(resp.message)
              }
            })
      }
    },
    resetAddress(unit) {
      const params = {}
      params['unit'] = unit
      this.$http
          .post(this.host + '/uc/asset/wallet/reset-address', params)
          .then(response => {
            var resp = response.body
            if (resp.code == 0) {
              this.$Message.success(this.$t('uc.finance.money.resetsuccess'))
              setTimeout(function() {
                window.location.reload()
              }, 3000)
            } else {
              this.$Message.error(resp.message)
            }
          })
    }
  },
  created() {
    // this.getMoney();
    // this.getGCCMatchAmount();
  },
  computed: {
    tableColumnsMoney() {
      const self = this
      const columns = []
      columns.push({
        title: this.$t('uc.finance.money.cointype'),
        key: 'coinType',
        width: 100,
        align: 'center'
      })
      columns.push({
        title: this.$t('uc.finance.money.balance'),
        key: 'balance',
        align: 'center',
        render(h, params) {
          return h(
            'span',
            {
              attrs: {
                title: params.row.balance
              }
            },
            self.toFloor(params.row.balance || '0')
        )
        }
      })
      columns.push({
        title: this.$t('uc.finance.money.frozen'),
        key: 'frozenBalance',
        align: 'center',
        render(h, params) {
          return h(
            'span',
            {
              attrs: {
                title: params.row.frozenBalance
              }
            },
            self.toFloor(params.row.frozenBalance || '0')
        )
        }
      })
      columns.push({
        title: this.$t('uc.finance.money.needreleased'),
        align: 'center',
        render(h, params) {
          return h(
            'span',
            {
              attrs: {
                title: params.row.toReleased
              }
            },
            self.toFloor(params.row.toReleased || '0')
        )
        }
      })
      columns.push({
        title: this.$t('uc.finance.money.operate'),
        key: 'price1',
        align: 'center',
        render: function(h, params) {
          var actions = []
          if (params.row.coin.canRecharge == 1) {
            if (params.row.address != null && params.row.address != '') {
            // 充币
              actions.push(
                h(
                    'span',
                  {
                      // 充币;
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: function() {
                        self.$router.push(
                              // "/uc/recharge?name=" + params.row.coin.unit
                          )
                      }
                    },
                    style: {
                      marginRight: '30px'
                    }
                  },
                    self.$t('uc.finance.money.charge')
                )
            )
            } else {
            //   获取地址按钮;
              actions.push(
                h(
                    'span',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    on: {
                      click: function() {
                        self.resetAddress(params.row.coin.unit)
                      }
                    },
                    style: {
                      marginRight: '8px'
                    }
                  },
                    self.$t('uc.finance.money.getaddress')
                )
            )
            }
          }
          if (params.row.coin.canWithdraw == 1) {
          // 提币;
            actions.push(
              h(
                  'span',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: function() {
                      self.$router.push(
                            '/uc/withdraw?name=' + params.row.coin.unit
                        )
                    }
                  }
                },
                  self.$t('uc.finance.money.pickup')
              )
          )
          }
          if (params.row.coin.unit.toUpperCase() == 'GCC') {
          // 配对;
            actions.push(
              h(
                  'span',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: function() {
                        // self.showMatchDailog(params.row);
                      self.getGCCMatchAmount()
                        // self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                    }
                  },
                  style: {
                    marginRight: '8px'
                  }
                },
                  self.$t('uc.finance.money.match')
              )
          )
          }
          return h('p', actions)
        }
      })
      return columns
    }
  }
}
</script>
<style lang="scss">
.order-table{
  .nav-right {
    .ivu-btn {
      border-radius: 0;
    }
    .ivu-modal-header-inner {
      color: #fff;
    }
    .ivu-modal-header {
      border-bottom: 1px solid #2A3850;
    }
    .ivu-input,
    .ivu-input-group-append {
      border-radius: 0;
      border-right: 0;
    }
    .ivu-input-group-append {
      padding: 4px 30px;
      background: transparent;
      border-left: 0;
      border: 1px solid #58698A;
    }
    .ivu-input[disabled],
    .ivu-input {
      background: #111530;
      height: 40px;
      &:hover {
        border-color: #58698A;
      }
    }

    .ivu-btn-default {
      background: #111530 !important;
      border: 1px solid #8090AF !important;
      color: #8090AF !important;
      &:hover {
        background: #111530;
      }
    }
    .ivu-tabs-bar {
      margin-bottom: 0;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active{
      color:#2d8cf0 !important;
    }
    .rightarea.bill_box {
      .ivu-table {
        margin-top: 22px;
      }
      .ivu-table-body {
        td {
          .ivu-table-cell {
            p .ivu-btn {
              /*background: #fff;*/
              height: 25px;
              padding: 0 10px;
              border:0 !important;
              span {
                display: inline-block;
                line-height: 25px;
                font-size: 12px;
              }
            }
            p .ivu-btn.ivu-btn-info {
              border: 1px solid #39f;
              border-radius: 20px;
              span {
                color: #39f;
              }
            }
            p .ivu-btn.ivu-btn-info:active{
              color:white;
              background:white;
              border-color:white;
            }
            p .ivu-btn.ivu-btn-error {
              border: 1px solid #f15057;
              border-radius: 20px;
              span {
                color: #f15057;
              }
            }
            p .ivu-btn.ivu-btn-primary {
              border: 1px solid #00b275;
              border-radius: 20px;
              span {
                color: #00b275;
              }
            }
          }
        }
      }
    }
  }
  .hidden-assets{
      position: absolute;
      min-width: 300px;
      top: -40px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: end;
      justify-content: flex-end;
      right: 35px;
      span {
        color: #8090AF;
        margin-right: 10px;
      }
      .ivu-switch {
        width: 30px;
        height: 16px;
        border: 0;
        margin-top: 3px;
        &:after {
          width: 14px;
          height: 14px;
          top: 1px;
        }
        &:before {
          background: #8090af;
        }
      }
      .ivu-switch-checked {
        &:after {
          left: 15px;
        }
      }
    }

  #moneyindex .ivu-table-row .ivu-table-cell{
    display: flex;
    justify-content: center;
  }
  #moneyindex .ivu-table-row .ivu-table-cell p{
    float: right;
    //margin-right: 85px;
  }
  #lever .ivu-table-row .ivu-table-cell p {
    margin:0;
  }
  .ivu-table {
    td {
      background: #111530;
      &:first-child {
        // text-align: left;
        padding-left: 16px;
      }
      &:last-child {
        // text-align: right;
        padding-right: 16px;
      }
    }
    .ivu-table-header {
      th {
        height: 50px;
        background: #191D3A;
        border-bottom: 0 !important;
        color: #8090AF;
        &:first-child {
          // text-align: left;
          padding-left: 16px;
        }
        &:last-child {
          // text-align: right;
          padding-right: 16px;
        }
      }
    }
  }

  .ivu-btn-default {
    background: #111530;
    color: #8090af;
    border-radius: 0;
    &:hover {
      background: #111530;
      color: #8090af;
    }
  }
  .ivu-btn-primary {
    color: #fff;
    border-radius: 0;
  }
  .ivu-input-group-append {
    background: #111530;
    border-radius: 0;
    border: 1px solid #8090AF;
  }
  .ivu-modal-content {
    background: #111530;
    .ivu-modal-header {
      border-bottom: 1px solid #8090AF;
      .ivu-modal-header-inner {
        color: #8090AF;
      }
    }
    .ivu-input-wrapper {
      .ivu-input[disabled] {
        border-radius: 0;
        background: #111530;
        border: 1px solid #58698A;
      }
    }
    .ivu-input-group {
      .ivu-input {
        background: #111530;
        border: 1px solid #58698A;
        border-radius: 0;
      }
    }
  }
}

</style>

<style scoped lang="scss">
  .order-table-index {
    .nav-right {
      height: auto;
      overflow: hidden;
      /*background: #fff;*/
      .rightarea.bill_box {
        width: 100%;
        height: auto;
        overflow: hidden;
        .order-table {
          .ivu-table-wrapper {
            .ivu-table .ivu-table-header {
              tr th {
                background: none;
              }
            }
          }
        }
      }
    }
  }


</style>
