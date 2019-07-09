<template>
    <div class="withdraw">
        <div class="nav-right">
            <div class="rightarea">
                <!--<section class="trade-groups merchant-tops">
                    &lt;!&ndash; <i class="merchant-icon tips"></i>
          <span class="tips-word">{{$t('uc.finance.withdraw.pickup')}}</span> &ndash;&gt;
                    <router-link to="/uc/withdraw/address">
                        {{$t('uc.finance.withdraw.addressmanager')}}
                    </router-link>
                </section>-->
                <section>
                    <div class="operationform">
                        <div class="operationform-title">{{ $t('uc.finance.pickup') }}</div>
                        <div class="operationform-from">
                            <div class="action-inner">
                                <div class="inner-left">
                                    <span class="describe">{{$t('uc.finance.withdraw.symbol')}}</span>：
                                    <Select
                                        v-model="coinType"
                                        style="width:270px; margin-left:10px;"
                                        @on-change="getAddrList"
                                    >
                                        <Option
                                            v-for="item in coinList"
                                            :value="item.unit"
                                            :key="item.unit"
                                        >
                                            {{ item.unit }}
                                        </Option>
                                    </Select>
                                </div>
                                <div class="inner-box">
                                    <div class="inner-left form-group form-address">
                                        <span
                                            for="controlAddress"
                                            class="controlAddress describe"
                                        >
                                            {{$t('uc.finance.withdraw.address')}}
                                        </span>：
                                        <div class="control-input-group">
                                            <Select
                                                ref="address"
                                                v-model="withdrawAdress"
                                                style="width:270px;margin-left:10px;"
                                                clearable
                                                @on-query-change="onAddressChange"
                                            >
                                                <Option
                                                    v-for="item in currentCoin.addresses"
                                                    :value="item.address"
                                                    :key="item.address"
                                                >
                                                    {{ item.remark +'('+ item.address+')'}}
                                                </Option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="availablenum form-group-container">
                                <div class="form-group form-amount">
                                    <!--可用余额-->
                                    <span class="label-amount describe">
                                        {{$t('uc.finance.withdraw.num')}}
                                    </span>：
                                    <!--提币数量-->
                                    <div class="input-group">
                                        <Poptip
                                            trigger="focus"
                                            :content="$t('uc.finance.withdraw.tip1')+currentCoin.withdrawScale+$t('uc.finance.withdraw.tip11')+
                                    currentCoin.minAmount+' ,'+$t('uc.finance.withdraw.tip2')+currentCoin.maxAmount"
                                        >
                                            <!--当前币种可用为零 该input禁止输入-->
                                            <Input
                                                :disabled="currentCoin.balance == 0"
                                                @keyup.native="computerAmount"
                                                v-model="withdrawAmount"
                                                :placeholder="$t('uc.finance.withdraw.numtip1')"
                                                size="large"
                                                :max="currentCoin.maxAmount"
                                                style="width:350px;margin-left:5px;"
                                            />
                                            <span class="input-group-addon addon-tag uppercase first">
                                                {{currentCoin.unit}}
                                            </span>
                                        </Poptip>
                                    </div>
                                    <p class="label-fr">
                                        <span>
                                            {{$t('uc.finance.withdraw.avabalance')}}：
                                            <span
                                                class="label-pointer"
                                                id="valueAvailable"
                                            >
                                                {{!currentCoin.balance?'---':currentCoin.balance|toFloor}}
                                            </span>
                                        </span>
                                        <span v-if="currentCoin.enableAutoWithdraw == 0">
                                            {{$t('common.tip')}}：{{$t('uc.finance.withdraw.msg1')}} {{currentCoin.threshold}} {{$t('uc.finance.withdraw.msg2')}}
                                        </span>
                                        <span>
                                            <a
                                                href="javascript:;"
                                                id="levelUp"
                                                style="display: none;"
                                            >
                                                {{$t('uc.finance.withdraw.increase')}}
                                            </a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <Slider
                                v-if="currentCoin.maxTxFee > currentCoin.minTxFee"
                                v-model="withdrawFee"
                                show-input :step="(currentCoin.maxTxFee - currentCoin.minTxFee)/10"
                                :max="currentCoin.maxTxFee"
                                :min="currentCoin.minTxFee"
                            >
                            </Slider>
                            <!--手续费-->
                            <div class="availablenum form-group-container form-group-container2">
                                <div class="form-group form-fee">
                                <span class="label-amount describe">
                                    {{$t('uc.finance.withdraw.fee')}}
                                    <!--<p class="label-fr">-->
                                    <!--<span>{{$t('uc.finance.withdraw.range')}}：{{currentCoin.minTxFee}} - {{currentCoin.maxTxFee}}</span>-->
                                    <!--</p>-->
                                </span>：
                                    <div
                                        class="input-group"
                                        style="margin-top:14px;position:relative;display:inline-block;"
                                    >
                                        <!--<Poptip v-else trigger="focus" :content="$t('uc.finance.withdraw.tip1')+currentCoin.minTxFee+$t('uc.finance.withdraw.tip1')+currentCoin.maxTxFee" style="width: 100%;">-->
                                        <Input
                                            readonly
                                            v-model="withdrawFee"
                                            :min="currentCoin.minTxFee"
                                            :max="currentCoin.maxTxFee"
                                            size="large"
                                            style="width:350px;margin-left:5px;"
                                        />
                                        <span class="input-group-addon addon-tag uppercase">
                                            {{currentCoin.unit}}
                                        </span>
                                        <!--</Poptip>-->
                                    </div>
                                </div>
                            </div>
                            <div class="availablenum form-group-container form-group-container2">
                                <!--到账数量-->
                                <div class="form-group">
                                    <span class="describe">
                                        {{$t('uc.finance.withdraw.arriamount')}}
                                    </span>：
                                    <div
                                        class="input-group"
                                        style="margin-top:14px;position:relative;display:inline-block"
                                    >
                                        <Input
                                            readonly
                                            v-model="withdrawOutAmount"
                                            :placeholder="$t('uc.finance.withdraw.arriamount')"
                                            size="large"
                                            style="width:350px;margin-left:5px;"
                                        />
                                        <!-- <input id="withdrawOutAmount" class="form-control form-out-amount" disabled="" maxlength="20" type="text" value="0"> -->
                                        <span class="input-group-addon addon-tag uppercase">
                                            {{currentCoin.unit}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="action-foot">
                                <!--提币数量等于零 或者 小于最小提币数量 该按钮禁用-->
                                <Button
                                        id="withdrawSubmit"
                                        long
                                        size="large"
                                        type="primary"
                                        style="height:40px;"
                                        @click="apply"
                                        :disabled="withdrawAmount == 0 || withdrawAmount < currentCoin.minAmount"
                                >
                                    {{$t('uc.finance.withdraw.pickup')}}
                                </Button>
                            </div>
                        </div>
                        <div class="action-content pt10">
                            <div class="action-body">
                                <p class="acb-p1">
                                    {{$t('common.tip')}}
                                </p>
                                <p class="acb-p2">
                                    • {{$t('uc.finance.withdraw.msg3')}}：{{currentCoin.minAmount}}{{$t('uc.finance.withdraw.msg4')}}。<br>
                                    • {{$t('uc.finance.withdraw.msg5')}}。<br>
                                    • {{$t('uc.finance.withdraw.msg6')}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="table-inner action-box">
                        <!-- <i class="angle" style="right: 27px;"></i> -->
                        <div class="action-content">
                            <div class="action-body">
                                <p class="acb-p1">{{$t('uc.finance.withdraw.record')}}</p>
                                <div class="order-table">
                                    <!--<p class="acb-p2" style="margin-bottom:10px;">
                                        • {{$t('uc.finance.withdraw.click')}}
                                        <i class="ivu-icon ivu-icon-funnel"></i>
                                        {{$t('uc.finance.withdraw.filtrate')}}
                                    </p>-->
                                    <Table
                                        stripe
                                        :columns="tableColumnsWithdraw"
                                        :data="tableWithdraw"
                                        :loading="loading"
                                    >
                                    </Table>
                                    <div id="pages">
                                        <div style="float: right;">
                                            <Page
                                                class="pages_a"
                                                :total="transaction.total"
                                                :current="transaction.page + 1"
                                                @on-change="changePage"
                                            >
                                            </Page>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <Modal v-model="modal" width="450">
            <!-- <P style="color:red;font-weight: bold;">
              {{$t('uc.finance.withdraw.fundpwdtip')}}<br/>
              <Input type="password" v-model="fundpwd" :placeholder="$t('otc.chat.msg7')"></Input>
            </p> -->
            <p slot="header">
                <!--提示-->
                {{$t('uc.identity.tips')}}
            </p>
            <Form
                class="withdraw-form-inline"
                ref="formInline"
                :model="formInline" inline
            >
            <!-- <FormItem>
              <Input type="text" v-model="user.mobilePhone" disabled></Input>
            </FormItem> -->
            <FormItem prop="code">
              <Input
                  type="text"
                  v-model="formInline.code"
                  :placeholder="$t('uc.regist.smscode')"
              >
              </Input>
              <input
                  id="sendCode"
                  @click="sendCode();"
                  type="Button"
                  :value="sendcodeValue"
                  :disabled="codeIsSending"
              >
              </input>
            </FormItem>
            <FormItem v-if="googleSwitch">
                <!--请输入谷歌验证码-->
                <Input
                    type="text"
                    v-model="formInline.googleCode"
                    :placeholder="$t('uc.login.google')"
                ></Input>
            </FormItem>
            <FormItem>
                <Input
                    type="password"
                    v-model="formInline.fundpwd"
                    :placeholder="$t('otc.chat.msg7')"
                ></Input>
            </FormItem>

        </Form>
      <div slot="footer">
        <span
            class="footer-btn-c"
            @click="cancel"
        >
            <!--取消-->
            {{$t('common.cancel')}}
        </span>
        <span
            class="footer-btn-q"
            @click="ok"
        >
            <!--确定-->
            {{$t('common.confirm')}}
        </span>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      googleSwitch: false,
      user: {},
      codeIsSending: false,
      sendcodeValue: this.$t('uc.regist.sendcode'),
      countdown: 60,
      formInline: {
        code: '',
        fundpwd: '',
        googleCode: ''
      },
      modal: false,
      fundpwd: '',
      currentCoin: {},
      transaction: {
        page: 0,
        pageSize: 10,
        total: 0
      },
      loading: true,
      withdrawAdress: '',
      inputAddress: '', // 用户输入的地址
      withdrawAmount: 0, // 默认提币数量
      withdrawFee: 0, // 默认提币手续费
      withdrawOutAmount: 0, // 默认到账数量
      coinType: '',
      coinList: [],
      tableWithdraw: [],
      allTableWithdraw: []
    }
  },
  watch: {
    currentCoin: function() {
      this.withdrawFee =
                this.currentCoin.minTxFee +
                (this.currentCoin.maxTxFee - this.currentCoin.minTxFee) / 2
    }
  },
  methods: {
    cancel() {
      this.modal = false
      this.formInline.code = ''
      this.formInline.fundpwd = ''
      this.formInline.googleCode = ''
    },
    sendCode() {
      this.$http.post(this.host + '/uc/mobile/withdraw/code').then(response => {
        var resp = response.body
        if (resp.code == 0) {
          this.settime()
          this.$Notice.success({
            title: this.$t('common.tip'),
            desc: resp.message
          })
        } else {
          this.$Notice.error({
            title: this.$t('common.tip'),
            desc: resp.message
          })
        }
      })
    },
    settime() {
      this.sendcodeValue = this.countdown
      this.codeIsSending = true
      const timercode = setInterval(() => {
        this.countdown--
        this.sendcodeValue = this.countdown
        if (this.countdown <= 0) {
          clearInterval(timercode)
          this.sendcodeValue = this.$t('uc.regist.sendcode')
          this.countdown = 60
          this.codeIsSending = false
        }
      }, 1000)
    },
    changePage(index) {
      this.transaction.page = index - 1
      this.getList()
    },
    onAddressChange(data) {
      this.inputAddress = data
    },
    clearValues() {
      if (this.$refs.address) {
        this.$refs.address.setQuery(' ')
      }
      this.withdrawAdress = ''
      this.inputAddress = ''
      this.withdrawAmount = 0
            // this.withdrawFee= 0;
      this.withdrawOutAmount = 0
    },
    getCurrentCoinRecharge() {
      if (this.coinType != '') {
        var temp = []
        for (var i = 0; i < this.allTableWithdraw.length; i++) {
                    //   if (this.allTableWithdraw[i].symbol == this.coinType) {
          if (this.allTableWithdraw[i].coin.unit == this.coinType) {
            temp.push(this.allTableWithdraw[i])
          }
        }
        this.tableWithdraw = temp
      } else {
        this.tableWithdraw = this.allTableWithdraw
      }
    },
    ok() {
      if (this.formInline.code == '') {
        this.modal = true
                /* 请填写短信验证码*/
        this.$Message.error(this.$t('otc.chat.msg8tip'))
        return
      }
      if (this.formInline.fundpwd == '') {
        this.modal = true
        this.$Message.error(this.$t('otc.chat.msg7tip'))
        return
      }
      const params = {}
      if (this.googleSwitch) {
        if (this.formInline.googleCode == '') {
          this.modal = true
                    /* "请填写谷歌验证码"*/
          this.$Message.error(this.$t('otc.chat.msg9tip'))
          return
        } else {
          params.googleCode = this.formInline.googleCode
        }
      }

      params['unit'] = this.currentCoin.unit
      params['address'] = this.withdrawAdress
      params['amount'] = this.withdrawAmount
      params['fee'] = this.withdrawFee
      params['jyPassword'] = this.formInline.fundpwd
      params['code'] = this.formInline.code
      params['googleCode'] = this.formInline.googleCode
      this.$http.post(this.host + '/uc/withdraw/apply', params).then(response => {
        this.fundpwd = ''
        var resp = response.body
        if (resp.code == 0) {
          this.modal = false
          this.formInline.code = ''
          this.formInline.fundpwd = ''
          this.transaction.page = 0
          this.getList()
          this.clearValues()
          this.$Message.success(resp.message)
        } else {
          this.$Message.error(resp.message)
        }
      })
    },
    getAddrList() {
            // 初始化页面上的值
      this.clearValues()
            // 获取地址
      this.$http.post(this.host + '/uc/withdraw/support/coin/info').then(response => {
        var resp = response.body
        if (resp.code == 0 && resp.data.length > 0) {
          this.coinList = resp.data
          if (this.coinType) {
            for (let i = 0; i < resp.data.length; i++) {
              if (this.coinType == resp.data[i].unit) {
                this.currentCoin = resp.data[i]
                break
              }
            }
          } else {
            this.currentCoin = this.coinList[0]
            this.coinType = this.currentCoin.unit
          }
        } else {
          this.$Message.error(resp.message)
        }
      })
    },
    getList() {
      this.loading = true
            // 获取tableWithdraw
      const params = {}
      params['page'] = this.transaction.page
      params['pageSize'] = this.transaction.pageSize
      this.$http
                .post(this.host + '/uc/withdraw/record', params)
                .then(response => {
                  var resp = response.body
                  if (resp.code == 0) {
                    this.tableWithdraw = resp.data.content
                    this.transaction.total = resp.data.totalElements
                    this.transaction.page = resp.data.number
                  } else {
                    this.$Message.error(resp.message)
                  }
                  this.loading = false
                })
    },
    accSub(arg1, arg2) {
      var r1, r2, m, n
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2))
            // last modify by deeka
            // 动态控制精度长度
      n = r1 >= r2 ? r1 : r2
      return ((arg1 * m - arg2 * m) / m).toFixed(n)
    },
    round(v, e) {
      var t = 1
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t
    },
    computerAmount() {
      const r = /^[0-9]+\.?[0-9]{0,9}$/　　// 正数
      if (!r) {
        this.withdrawOutAmount = 0
        return false
      }
            /* let num = this.round(
                this.accSub(this.withdrawAmount, this.withdrawFee),
                this.currentCoin.withdrawScale
            );
            this.withdrawOutAmount = num >= 0 ? num : 0;*/
            // 新增代码
            // 判断 提币数量 < 最小手续费 = 最小提币数量
            // if (this.withdrawAmount <= this.currentCoin.minAmount) {
            //     this.withdrawAmount = this.currentCoin.maxAmount
            // }
            // 否则 提出当前数量减去手续费
      this.withdrawOutAmount = Number((this.withdrawAmount - this.withdrawFee).toFixed(5))
            // 旧代码
            // this.withdrawOutAmount = this.round(
            //   this.accSub(this.withdrawAmount, this.withdrawFee),
            //   this.currentCoin.withdrawScale
            // );
    },
    computerAmount2() {
      this.withdrawAmount =
                (this.withdrawAmount + '').replace(/([0-9]+\.[0-9]{6})[0-9]*/, '$1') -
                0
      this.withdrawOutAmount = this.round(
                this.accSub(this.withdrawAmount, this.withdrawFee),
                this.currentCoin.withdrawScale
            )
    },
    valid() {
      this.withdrawAdress = this.withdrawAdress || this.inputAddress
      if (this.coinType === '') {
        this.$Message.error(this.$t('uc.finance.withdraw.symboltip'))
        return false
      } else if (this.withdrawAdress === '') {
        this.$Message.error(this.$t('uc.finance.withdraw.addresstip'))
        return false
      } else if (
                this.withdrawAmount === '' ||
                this.withdrawAmount === 0 ||
                this.withdrawAmount - 0 < this.currentCoin.minAmount
            ) {
        this.$Message.error(
                    this.$t('uc.finance.withdraw.numtip2') + this.currentCoin.minAmount
                )
        return false
      } else if (this.withdrawAmount - 0 < this.withdrawFee) {
        this.$Message.error(this.$t('uc.finance.withdraw.numtip3'))
        return false
      } else if (
                this.withdrawFee === '' ||
                this.withdrawFee === 0 ||
                this.withdrawFee - 0 > this.currentCoin.maxTxFee ||
                this.withdrawFee - 0 < this.currentCoin.minTxFee
            ) {
        this.$Message.error(
                    this.$t('uc.finance.withdraw.feetip1') + this.currentCoin.minTxFee + ' , ' + this.$t('uc.finance.withdraw.feetip2') + this.currentCoin.maxTxFee
                )
        return false
      } else {
        return true
      }
    },
    apply() {
      this.formInline.code = ''
      this.formInline.fundpwd = ''
      this.formInline.googleCode = ''
      if (this.valid()) {
        this.modal = true
        const timercode = setInterval(() => {
          if (this.countdown <= 0) {
            clearInterval(timercode)
            this.sendcodeValue = this.$t('uc.regist.sendcode')
            this.codeIsSending = false
          }
        }, 1000)
      }
    },
    getMember() {
            // 获取个人安全信息
      this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
        var resp = response.body
        if (resp.code == 0) {
          this.user = resp.data
        } else {
          this.$Message.error(this.loginmsg)
        }
      })
    }
  },
  created() {
        // this.getMember();
    this.$http.options.emulateJSON = false
    this.coinType = this.$route.query.name || ''
    this.getAddrList()
    this.getList(0, 10, 1)

    this.$http.post(this.host + '/uc/get/user', { mobile: this.$store.getters.member.mobile }).then(res => {
      const data = res.body
      if (data.code == 0) {
        this.googleSwitch = !!data.data
      }
    })
  },
  computed: {
    member: function() {
      return this.$store.getters.member
    },
    tableColumnsWithdraw() {
      let columns = [],
        filters = []
      if (this.coinList.length > 0) {
        this.coinList.forEach(v => {
          filters.push({
            label: v.unit,
            value: v.unit
          })
        })
      }
      columns.push({
        title: this.$t('uc.finance.withdraw.time'),
        width: 180,
        key: 'createTime'
      })
      columns.push({
        title: this.$t('uc.finance.withdraw.symbol'),
        key: 'symbol',
        filters,
        filterMultiple: false,
        filterMethod(value, row) {
          return row.coin.unit === value
        },
        render: function(h, params) {
          return h('span', params.row.coin.unit)
        }
      })
      columns.push({
        title: this.$t('uc.finance.withdraw.address'),
        key: 'address'
      })
      columns.push({
        title: this.$t('uc.finance.withdraw.num'),
        key: 'totalAmount'
      })
      columns.push({
        title: this.$t('uc.finance.withdraw.fee'),
        key: 'fee'
      })
      columns.push({
        title: this.$t('uc.finance.withdraw.status'),
        key: 'status',
        render: (h, params) => {
          let text = ''
          if (params.row.status == 0) {
            text = this.$t('uc.finance.withdraw.status_1')
          } else if (params.row.status == 1) {
            text = this.$t('uc.finance.withdraw.status_2')
          } else if (params.row.status == 2) {
            text = this.$t('uc.finance.withdraw.status_3')
          } else if (params.row.status == 3) {
            text = this.$t('uc.finance.withdraw.status_4')
          }
          return h('div', [h('p', text)])
        }
      })
      return columns
    }
  }
}
</script>
<style lang="scss">
    .withdraw {
        .ivu-table {
            td {
                &:first-child {
                    text-align: left;
                    padding-left: 12px;
                }
                &:last-child {
                    text-align: right;
                    padding-right: 12px;
                }
                &:nth-child(2),
                &:nth-child(3),
                &:nth-child(4),
                &:nth-child(5) {
                    text-align: center;
                }
            }
            .ivu-table-header {
                th {
                    height: 50px;
                    background: #191D3A;
                    border-bottom: 0 !important;
                    color: #8090AF;
                    &:first-child {
                        text-align: left;
                        padding-left: 10px;
                    }
                    &:last-child {
                        text-align: right;
                        padding-right: 10px;
                    }
                    &:nth-child(2),
                    &:nth-child(3),
                    &:nth-child(4),
                    &:nth-child(5) {
                        text-align: center;
                    }
                }
            }
            .ivu-table-tip {
                td {
                    text-align: center;
                }
            }
        }
        .ivu-input[disabled]:hover {
            border-color: #58698A;
        }
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            background-color: #111530;
        }
        .withdraw-form-inline {
            padding: 20px 40px 0 40px;
        }
        .input-group,
        .ivu-input-wrapper {
            width: 270px;
            height: 35px;
            line-height: 35px;
        }

        .ivu-table-filter-list .ivu-table-filter-select-item {
            color: #fff;
            &:hover {
                background: transparent;
                color: #3399ff;
            }
        }
    }

</style>

<style scoped lang="scss">
    #sendCode {
        position: absolute;
        border: none;
        background: none;
        top: 10px;
        outline: none;
        right: 0;
        width: 30%;
        color: #3399ff;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        border-left: 1px solid #dddee1;
    }
    .footer-btn-c {
        margin-right:50px;
        color:#fff;
        width:80px;
        border-radius:0;
        display:inline-block;
        text-align:center;
        height:30px;
        line-height: 30px;
        cursor: pointer;
        border: 1px solid #2A3850;
    }
    .footer-btn-q {
        background:#3399ff;
        color:#fff;
        width:80px;
        border-radius:0;
        display:inline-block;
        text-align:center;
        height:30px;
        line-height: 30px;
        cursor: pointer;
    }
    .withdraw {

        .nav-right {
        height: auto;
        overflow: hidden;
        display: block;
        margin-right: 0;
        .operationform{
            padding:0 28px 30px;
            background: #111530;
            .operationform-title {
                height: 50px;
                line-height: 50px;
                color: #fff;
                border-bottom: 1px solid #2A3850;
                margin-bottom: 35px;
                padding-left: 10px;
                font-size: 14px;
            }
            .operationform-from {
                margin: 0 240px 60px;
            }
            .inner-left{
                display: flex;
                align-items: center;
                margin-left:60px;
                margin-bottom: 15px;
            }
            .controlAddress{
                font-size:14px;
            }
            .availablenum{
                display: flex;
                align-items: center;
                margin-left:60px;
                span{
                    display: inline-block;
                    font-size:14px;
                }
                .input-group{
                    display: inline-block;
                }
                .label-fr{
                    margin: 10px 0 0 145px;
                }
            }
        }

        a {
          display: inline-block;
          color: #3399ff;
          height: 30px;
          padding: 0 10px;
          border: 1px solid #3399ff;
          line-height: 30px;
          text-align: center;
          border-radius: 20px;
          float: right;
          margin-right: 20px;
        }
      }
        .action-box {
        .form-group-container {
          .form-group.form-amount {
            .input-group .ivu-poptip {
              .ivu-poptip-rel {
                display: block;
                margin-right: 0;

                a {
                  display: inline-block;
                  color: #f0a70a;
                  width: 100px;
                  height: 30px;
                  border: 1px solid #f0a70a;
                  line-height: 30px;
                  text-align: center;
                  border-radius: 20px;
                  float: right;
                }
              }

              .action-box {
                padding: 10px 20px 20px;

                .form-group-container {
                  .form-group.form-amount {
                    .input-group .ivu-poptip {
                      .ivu-poptip-rel {
                        display: block;

                        .ivu-input-number {
                          width: 100%;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    .ivu-slider-button-wrap {
        top: -6px;
    }
    #withdrawAddressList {
        position: absolute;
        height: 0;
        transition: height 0.3s;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 1;
        max-height: 245px;
        overflow: auto;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
        height: auto;
        /*background: #fff;*/
    }

    #withdrawAddressList .address-item {
        padding: 0 20px;
        display: flex;
        line-height: 48px;
        border-bottom: 1px solid transparent;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        z-index: 99;
    }

    #withdrawAddressList .address-item:hover {
        background: #f5f5f5;
        cursor: pointer;
    }

    #withdrawAddressList .notes {
        position: absolute;
        bottom: 0;
        right: 20px;
        height: 48px;
        line-height: 48px;
        max-width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .describe {
        display: inline-block;
        width:120px;
        text-align: right;
        color: #8090AF;
    }

    .acb-p1 {
        font-size: 14px;
        font-weight: 600;
        line-height: 50px;
        color: #fff;
    }

    .acb-p2 {
        color: #8090AF;
        font-size: 14px;
        line-height: 30px;
    }

    .action-content.pt10 {
        padding-top: 10px;
        border-top: 1px solid #2A3850;
    }

    .action-content {
        width: 100%;
        margin-top: 20px;
        // overflow: hidden;
        display: table;
    }

    .action-content .action-body {
        display: table-cell;
        vertical-align: top;
        line-height: 20px;
        font-size: 12px;
    }

    .action-foot {
        margin-top: 35px;
        margin-left: 205px;
        width: 270px;
    }

    .hb-night .btn.btn-primary,
    .hb-night .btn.btn_submit {
        background-color: #7a98f7;
        color: white;
    }

    .action-inner {
        width: 100%;
        display: block;
    }

    .action-inner .inner-box {
        display: table-cell;
        width: 80%;
    }

    .form-group {
        position: relative;
        // margin-bottom: 20px;
        font-size: 16px;
    }

    // .controlAddress {
    //     line-height: 50px;
    // }

    .form-group label {
        max-width: 100%;
        font-weight: 600;
    }

    .control-input-group {
        position: relative;
    }

    .control-input-group.open .select-list {
        height: auto;
    }

    .form-group-container {
        display: table;
        width: 100%;
    }

    .form-group-container .form-amount {
        width: 100%;
    }

    .form-group-container .form-group {
        display: table-cell;
    }

    .form-group-container .form-group span.addon-tag:last-child {
        padding: 0;
        border: none;
        background: none;
        cursor: default;
        position: absolute;
        right: 7px;
        top: 2px;
    }

    .form-group-container .form-group span.addon-tag:last-child.first {
        right: 93px;
    }

    // .form-group-container2 {
    //     padding-top: 20px;
    // }

    .form-group-container .form-fee {
        padding: 0 20px 0 0;
    }

    .label-amount .label-fr {
        float: right;
        color: #aaa;
        font-size: 14px;
    }

    .label-amount .label-fr span {
        margin-left: 2px;
    }

    .form-group-container .form-group {
        display: table-cell;
    }

    .hb-night table.table .table-inner {
        margin: -4px -20px;
        position: relative;
        background-color: #181b2a;
        border-radius: 3px;
    }

    .hb-night table.table .table-inner {
        margin: -4px -20px;
        position: relative;
        background-color: #181b2a;
        border-radius: 3px;
    }

    .hb-night table.table .table-inner {
        margin: -4px -20px;
        position: relative;
        background-color: #181b2a;
        border-radius: 3px;
    }

    table.table .table-inner.action-box {
        margin: -1px -10px;
    }

    /* .merchant-icon {
      display: inline-block;
      margin-left: 4px;
      background-size: 100% 100%;
    } */

    .merchant-top .tips-word {
        -webkit-box-flex: 2;
        -ms-flex-positive: 2;
        flex-grow: 2;
        text-align: left;
    }

    // .rightarea .rightarea-top {
    //   line-height: 75px;
    //   border-bottom: #f1f1f1 solid 1px;
    // }

    // .rightarea .rightarea-con {
    //   padding-top: 30px;
    //   padding-bottom: 125px;
    // }

    // .rightarea .trade-process {
    //   line-height: 30px;
    //   padding: 0 15px;
    //   background: #f1f1f1;
    //   display: inline-block;
    //   position: relative;
    //   margin-right: 20px;
    // }

    // .rightarea .trade-process.active {
    //   color: #eb6f6c;
    //   background: #f9f5eb;
    // }

    // .rightarea .trade-process .icon {
    //   background: #fff;
    //   border-radius: 20px;
    //   height: 20px;
    //   width: 20px;
    //   display: inline-block;
    //   line-height: 20px;
    //   text-align: center;
    //   margin-right: 10px;
    // }

    // .rightarea .trade-process .arrow {
    //   position: absolute;
    //   top: 10px;
    //   right: -5px;
    //   width: 0;
    //   height: 0;
    //   border-top: 5px solid transparent;
    //   border-bottom: 5px solid transparent;
    //   border-left: 5px solid #f1f1f1;
    // }

    // .rightarea .trade-process.active .arrow {
    //   border-left: 5px solid #f9f5eb;
    // }

    .rightarea .rightarea-tabs {
        border: none;
    }

    // .rightarea .rightarea-tabs li > a {
    //   width: 100%;
    //   height: 100%;
    //   padding: 0;
    //   margin-right: 0;
    //   font-size: 14px;
    //   color: #646464;
    //   border-radius: 0;
    //   border: none;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    // }

    // .rightarea .rightarea-tabs li > a:hover {
    //   background-color: #fcfbfb;
    // }

    // .rightarea .rightarea-tabs li {
    //   width: 125px;
    //   height: 40px;
    //   position: relative;
    //   margin: -1px 0 0 -1px;
    //   border: 1px solid #f1f1f1;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   cursor: pointer;
    // }

    // .rightarea .rightarea-tabs li.active {
    //   background-color: #fcfbfb;
    // }

    // .rightarea .rightarea-tabs li:last-child {
    //   border-right: 1px solid #f1f1f1;
    // }

    // .rightarea .rightarea-tabs li.active > a,
    // .rightarea .rightarea-tabs li:hover > a {
    //   color: #da2e22;
    //   border: none;
    // }

    // .rightarea .panel-tips {
    //   border: 3px solid #fdfaf3;
    //   color: #9e9e9e;
    //   font-size: 12px;
    // }

    // .rightarea .panel-tips .panel-header {
    //   background: #fdfaf3;
    //   line-height: 40px;
    //   margin-bottom: 15px;
    // }

    // .rightarea .panel-tips .panel-title {
    //   font-size: 16px;
    // }

    // .rightarea .recordtitle {
    //   cursor: pointer;
    // }

    .order_box {
        width: 100%;
        /*background: #fff;*/
        height: 56px;
        line-height: 56px;
        margin-bottom: 20px;
        border-bottom: 2px solid #ccf2ff;
        position: relative;
        text-align: left;
    }

    .order_box a {
        color: #8994a3;
        font-size: 16px;
        padding: 0 30px;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
        line-height: 54px;
        display: inline-block;
    }

    .order_box .active {
      border-bottom: 2px solid #3399ff;
    }

    .order_box .search {
        position: absolute;
        width: 300px;
        height: 32px;
        top: 12px;
        right: 0;
        display: flex;
        /* border: #c5cdd7 solid 1px; */
    }

    .ivu-btn-primary {
        color: #fff;
        background-color: #3399ff;
        border-radius: 0;
        border: 0;
    }
    #pages {
        margin: 10px 10px 25px;
        overflow: hidden;
    }
    #pages .ivu-page li.ivu-page-item-active {
      background-color: #3399ff !important;
      border-color: #3399ff !important;
    }
    #pages li.ivu-page-item-active:hover {
      color: #3399ff !important;
    }
    .ivu-page-item-active {
      background-color: #3399ff;
      border-color: #3399ff;
    }
    .ivu-page-item:hover {
      color: #3399ff;
    }
    .pages_a .ivu-page-item-active {
        background-color: red !important;
    }
    }
</style>
<style lang="scss">
    ivu-poptip-body-content-inner {
        color: #fff;
    }
    // .ivu-poptip-inner {
    //     background: #10122B;
    //     color: #8090AF;
    // }
    .ivu-poptip-popper[x-placement^=bottom] .ivu-poptip-arrow:after {
        border-bottom-color: #10122B;
    }
    .withdraw {
        .ivu-select-dropdown .ivu-select-item {
            padding: 6px 16px;

            &:hover {
                background: #10122B !important;
                color: #3399ff;
            }
        }

        .ivu-select-dropdown {
            li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
                background: #10122B;
                color: #3399ff;
            }

            li.ivu-select-item.ivu-select-item-selected {
                background: #10122B;
                color: #495060;

                &:hover {
                    color: #3399ff;
                }
            }
        }
    .ivu-select-single {
        .ivu-select-selection {
            background: #111530;
            width: 270px;
            line-height: 35px;
            border: 1px solid #58698A;
            border-radius: 0;
        }
    }
  .nav-right {
    .rightarea {
      .action-box {
        .action-inner {
          .inner-left,
          .inner-box {
            /*左侧边框*/
            .ivu-select.ivu-select-single {
              .ivu-select-selection {
                  width: 270px;
                &:hover {
                  border-color: #3399ff;
                }
              }

              .ivu-select-selection.ivu-select-selection-focused {
                border-color: #3399ff;
              }
            }

            .ivu-select.ivu-select-visible.ivu-select-single {
              .ivu-select-selection {
                border-color: #3399ff;
              }
            }

            /*.ivu-select-dropdown .ivu-select-item {*/
            /*  padding: 6px 16px;*/

            /*  &:hover {*/
            /*    background: #10122B !important;*/
            /*    color: #3399ff;*/
            /*  }*/
            /*}*/

            /*.ivu-select-dropdown {*/
            /*  li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {*/
            /*    background: #10122B;*/
            /*    color: #3399ff;*/
            /*  }*/

            /*  li.ivu-select-item.ivu-select-item-selected {*/
            /*    background: #10122B;*/
            /*    color: #495060;*/

            /*    &:hover {*/
            /*      color: #3399ff;*/
            /*    }*/
            /*  }*/
            /*}*/
          }
        }

        .form-group-container {
          .form-group {
            .input-group {
              .ivu-poptip-rel {
                display: block;

                .ivu-input-number {
                  width: 100%;

                  &:hover {
                    border-color: #3399ff;
                  }
                }
              }

              .ivu-input-number {
                width: 100%;

                &:hover {
                  border-color: #3399ff;
                }
              }
            }
          }
        }
      }

      .table-inner.action-box {
        .action-content .action-body {
          /*分页*/
          .order-table .ivu-table-wrapper .ivu-table-header {
            thead .ivu-table-cell {
              .ivu-poptip .ivu-poptip-rel .ivu-table-filter {
                i.ivu-icon.ivu-icon-funnel.on {
                  color: #3399ff;
                }
              }
            }
          }

          #pages {
            .ivu-page {
              .ivu-page-item.ivu-page-item-active {
                  background-color: #111530;
                  border-color: #191f44;
                  a {
                      color: #3399ff;
                  }

                &:hover {
                    background-color: #111530;
                    a {
                        color: #3399ff;
                    }
                }
              }

              .ivu-page-item {
                &:hover {
                  border: 1px solid #3399ff;

                  a {
                    color: #3399ff;
                  }
                }

                .ivu-page-prev,
                .ivu-page-next {
                  &:hover {
                    border: 1px solid #3399ff;

                    a {
                      color: #3399ff;
                    }
                  }
                }
              }
            }
          }
        }
        .v-transfer-dom .ivu-poptip-content .ivu-poptip-inner {
          .ivu-poptip-body .ivu-table-filter-list-single {
            .ivu-table-filter-select-item {
              &:hover {
                /*background: #fff;*/
              }
            }

            li.ivu-table-filter-select-item.ivu-table-filter-select-item-selected {
              background: #3399ff;
              color: #fff;
            }
          }
        }
      }
    }
  }
    .ivu-table-wrapper {
        margin-right: -1px;
        .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
        .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
            background: #10122B;
        }
        ivu-table {
            td {
                text-align: center !important;
            }
        }
    }
    .ivu-select-selection {
        width: 270px;
        height: 35px;
        line-height: 35px;
        &:hover {
            border-color: #58698A;
        }
        .ivu-select-placeholder,
        .ivu-select-selected-value {
            height: 35px;
            line-height: 35px;
            color: #fff;
        }
    }
    .ivu-select-item-selected {
        background: transparent;
    }
    .ivu-input {
        width: 270px;
        height: 35px;
        line-height: 35px;
        border-radius: 0;
        background: transparent;
        border-color: #58698A;
        color: #fff;
    }
}
</style>

