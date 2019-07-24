<template>
    <div class="shaow">
        <div class="order-table">
            <div class="hidden-assets">
                <!--隐藏资产为0的币种-->
                <div class="checkout">
                    <span class="title-header">{{$t('uc.finance.money.hiddenAssets')}}</span>
                    <i-switch v-model="googleSwitch" @on-change="changeGoogleSwitch">
                        <span slot="open"></span>
                        <span slot="close"></span>
                    </i-switch>
                </div>
                <div class="title-info">
                <img src="../../assets/images/search.png" alt="">
                <input
                    type="text"
                    :placeholder="$t('new.searchCurrency')"
                    class="text-input"
                    v-model="searchKey"
                    maxlength="10"
                >
                </div>
            </div>
            <div class="order-table" id="settable">
                <Table
                    stripe
                    :columns="tableColumnsMoney"
                    :data="filteredData"
                    :loading="loading"
                    :disabled-hover="true"
                    :no-data-text="$t('common.nodata')"
                ></Table>
            </div>
            <transfermodal
            @closetransferModal="closeModal"
            :getmoney="getMoney"
            :currencyData="currencyData"
        >
        </transfermodal>
        </div>
    </div>
</template>
<script>
import transfermodal from '../transfer/Index'
export default {
    // props: ["modal"],
  components: { transfermodal },
  inject: ['reload'],
  data() {
    return {
      searchKey: '',
      modal: false,
      tableMoney: [],
      loading: true,
      googleSwitch: false,
      hiddenAccountData: [],
      showAccountData: [],
      currencyData: {
        currencyname: '',
        tocurrencyname: '',
        type: '',
        currency: '',
        modal: true, // 判断是否开启币种选框
        balance1: '',
        balance2: ''
      }
    }
  },
  created() {
    this.modal = false
    this.getMoney()
  },
  methods: {
    closeModal() {
      this.modal = false
    },
    changeGoogleSwitch() {
      this.googleSwitch ? this.tableMoney = this.hiddenAccountData : this.tableMoney = this.showAccountData
    },
    getMoney() {
      this.$http.post(this.host + '/uc/asset/wallet').then(response => {
        var resp = response.body
        if (resp.code == 0) {
          this.tableMoney = resp.data
          this.showAccountData = this.tableMoney
          for (let i = 0; i < this.tableMoney.length; i++) {
            this.tableMoney[i]['coinType'] = this.tableMoney[i].coin.unit
            if (this.tableMoney[i].balance != '0' || this.tableMoney[i].frozenBalance != '0' || this.tableMoney[i].releaseBalance != '0') {
              this.hiddenAccountData.push(this.tableMoney[i])
            }
          }
          this.loading = false
        } else {
          this.$Message.error(this.loginmsg)
        }
      })
    },
    resetAddress(unit) {
      const params = {}
      params['unit'] = unit
      const that = this
      this.$http.post(this.host + '/uc/asset/wallet/reset-address', params).then(response => {
        var resp = response.body
        if (resp.code == 0) {
          this.$Message.success(this.$t('uc.finance.money.resetsuccess'))
                    // this.getMoney();
          setTimeout(function() {
            that.getMoney()
                        // that.reload();
            that.$router.push({ path: '/uc/recharge', query: { name: unit }})
                        // window.location.reload();
          }, 3000)
        } else {
          this.$Message.error(resp.message)
        }
      })
    }
  },
  computed: {
    tableColumnsMoney() {
      const self = this
      const columns = []
      columns.push({
        title: this.$t('uc.finance.money.cointype'),
        key: 'coinType',
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
                title: params.row.releaseBalance
              }
            },
                        self.toFloor(params.row.releaseBalance || '0')
                    )
        }
      })
      columns.push({
        title: this.$t('uc.finance.money.assetValuation'),
        align: 'center',
        render(h, params) {
/*          console.log(params.row, (params.row.releaseBalance + params.row.frozenBalance + params.row.balance) * params.row.coin.cnyRate)*/
          return h(
                        'span',
            {
              attrs: {
                title: (params.row.releaseBalance + params.row.frozenBalance + params.row.balance) * params.row.coin.cnyRate + ' CNY'
              }
            },
                self.toFloor((params.row.releaseBalance + params.row.frozenBalance + params.row.balance) * params.row.coin.cnyRate + ' CNY' || '0')
            )
        }
      })
      columns.push({
        title: this.$t('uc.finance.money.operate'),
        key: 'price1',
        width: 300,
        align: 'center',
        render: (h, params) => {
          var actions = []
          if (params.row.coin.canRecharge == 1) {
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
                                                '/personal/recharge?name=' + params.row.coin.unit
                                            )
                                  }
                                },
                                style: {
                                  marginRight: '30px',
                                  color: '#3399ff',
                                  cursor: 'pointer'
                                }
                              },
                                self.$t('uc.finance.money.charge')
                            )
                        )
          }
                   /* else {
                        //   获取地址按钮;
                        actions.push(
                            h("span",
                                {
                                    props: { type: "info", size: "small" },
                                    on: {
                                        click: function () {
                                            self.resetAddress(params.row.coin.unit);
                                            /!*self.$router.push(
                                                "/uc/recharge?name=" + params.row.coin.unit
                                            );*!/
                                        }
                                    },
                                    style: {
                                        marginRight: "8px",
                                        color: "#3399ff",
                                        cursor: "pointer"
                                    }
                                },
                                self.$t("uc.finance.money.getaddress")
                            )
                        );
                    }*

                    */
          if (params.row.coin.canWithdraw == 1) {
                        // 提币;
            actions.push(
                            h('span', {
                              props: {
                                type: 'error',
                                size: 'small'
                              },
                              on: {
                                click: function() {
                                  self.$router.push(
                                            '/personal/withdraw?name=' + params.row.coin.unit
                                        )
                                }
                              },
                              style: {
                                color: '#3399ff',
                                cursor: 'pointer'
                              }
                            },
                                self.$t('uc.finance.money.pickup')
                            )
                        )
          }
          return h('p', actions)
        }
      })
      return columns
    },
    filteredData: function() {
      return this.tableMoney.filter((item) => {
        return item['coin'].name.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1
      })
    }
  },
  watch: {
    searchKey: function() {
      this.searchKey = this.searchKey.replace(/[^\w\.\/]/ig, '')
    }
  }
}
</script>
<style lang="scss" scoped>
    .shaow {
        position: relative;
        .hidden-assets {
            position: absolute;
            right: 34px;
            .checkout{
                position: absolute;
                right:200px;
                    width: 200px;
            }
            .title-info {
                    position: absolute;
                    top: -9px;
                    color: white;
                    .text-input {
                    height: 15px;
                    width: 180px;
                    border: none;
                    background-color: transparent;
                    float: right;
                    margin: 14px 25px 0;
                    padding: 0 0 0 35px;
                    font-size: 14px;
                    color: #fff;
                    border-left: 2px solid #8090af;
                    outline: none;
                    }
                    img {
                    position: absolute;
                    top: 14px;
                    right: 19px;
                    }
                }
        }
        .title-header {
            color: #8090af;
        }
    }
</style>
<style lang="scss">
    #settable{
        .ivu-table-column-center:nth-last-child(2){
            .ivu-table-cell{
                width:220px;
            }
        }
    }
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #8090af;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #8090af;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #8090af;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #8090af;
}
    .ivu-table-wrapper {
        margin-right: -1px;
        .ivu-table {
            .ivu-table-stripe {
                .ivu-table-body {
                    tr{
                        &:nth-child(2n) {
                            td {
                                background: #10122B;
                                border-bottom: 0 !important;
                            }
                        }
                    }
                }
            }
            .ivu-table-header {
                th {
                    background: #111530;
                    border-bottom: 0 !important;
                    color: #8090AF;
                }
            }
        }
    }
</style>
