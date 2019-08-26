<template>
  <div class="shaow">
    <div class="order-table">
      <div class="hidden-assets">
        <!-- <span class="title-header">{{$t('myAccount._display')}}</span>
        <i-switch v-model="googleSwitch" @on-change="changeGoogleSwitch">
            <span slot="open"></span>
            <span slot="close"></span>
        </i-switch> -->
        <div class="checkout">
          <span class="title-header">{{$t('myAccount._display')}}</span>
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
      <Table
              stripe
              :columns="tableColumnsMoney"
              :data="filteredData"
              :loading="loading"
              :disabled-hover="true"
              id="settable"
      ></Table>
    </div>
    <transfermodal :modal="modal" @closetransferModal="closeModal" :getmoney="getMoney"
                   :currencyData="currencyData"></transfermodal>
  </div>
</template>
<script>
  import transfermodal from '../transfer/Index'

  export default {
    // props: ["modal"],
    components: {transfermodal},
    data() {
      return {
        modal: false,
        tableMoney: [],
        loading: true,
        googleSwitch: false,
        hiddenAccountData: [],
        showAccountData: [],
        searchKey: '',
        currencyData: {
          currencyname: '',
          tocurrencyname: '',
          type: '',
          currency: '',
          modal: false,
          balance: ''
        }
      }
    },
    created() {
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
        this.$http.post(this.host + '/uc/otc/wallet/get').then(response => {
          var resp = response.body
          if (resp.code == 0) {
            this.tableMoney = resp.data
            this.showAccountData = resp.data
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
                    title: params.row.frozenBalance + params.row.balance
                  }
                },
                self.toFloor(params.row.frozenBalance + params.row.balance || '0')
            )
          }
        })
        columns.push({
          title: this.$t('uc.finance.money.assetValuation'),
          align: 'center',
          render(h, params) {
            return h(
                'span',
                {
                  attrs: {
                    title: (params.row.frozenBalance + params.row.balance) * params.row.coin.cnyRate + ' CNY'
                  }
                },
                self.toFloor((params.row.frozenBalance + params.row.balance) * params.row.coin.cnyRate + ' CNY' || '0')
            )
          }
        })
        columns.push({
          title: this.$t('uc.finance.money.operate'),
          align: 'center',
          render: (h, params) => {
            var actions = []

            const btn = h('span', {
              props: {
                type: 'info'
              },
              on: {
                click: () => {
                  this.modal = true
                  this.currencyData.currencyname = this.$t('myAccount._BitcoinAccount') + this.tableMoney[params.index].coinType
                  this.currencyData.tocurrencyname = this.$t('myAccount._legaTenderAccount') + this.tableMoney[params.index].coinType
                  this.currencyData.type = '转入'
                  this.currencyData.currency = this.tableMoney[params.index].coinType
                  this.currencyData.balance = ''
                }
              },
              style: {
                marginRight: '30px',
                color: '#3399ff',
                cursor: 'pointer'
              }
            }, self.$t('myAccount._rollout'))

            const outbtn = h('span', {
              props: {
                type: 'info'
              },
              on: {
                click: () => {
                  this.modal = true
                  this.currencyData.currencyname = this.$t('myAccount._legaTenderAccount') + this.tableMoney[params.index].coinType
                  this.currencyData.tocurrencyname = this.$t('myAccount._BitcoinAccount') + this.tableMoney[params.index].coinType
                  this.currencyData.type = '转出'
                  this.currencyData.currency = this.tableMoney[params.index].coinType
                  this.currencyData.balance = this.tableMoney[params.index].balance
                }
              },
              style: {
                color: '#3399ff',
                cursor: 'pointer'
              }
            }, self.$t('myAccount.rollout'))
            actions.push(btn)
            actions.push(outbtn)
            return h('p', actions)
          }
        })
        return columns
      },
      filteredData: function () {
        return this.tableMoney.filter((item) => {
          return item['coin'].name.toLowerCase().indexOf(this.searchKey.toLowerCase()) !== -1
        })
      }
    },
    watch: {
      searchKey: function () {
        this.searchKey = this.searchKey.replace(/[^\w\.\/]/ig, '')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #settable {
    .ivu-table-column-center:nth-last-child(2) {
      .ivu-table-cell {
        width: 220px;
      }
    }
  }

  .shaow {
    .hidden-assets {
      position: absolute;
      right: 34px;

      .checkout {
        margin-right: 220px;
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

    .order-table {
      position: relative;

      .hidden-assets {
        position: absolute;
        right: 34px;
      }

      .title-header {
        color: #8090af;
      }
    }
  }
</style>
