<template>
  <div class="my_ad_container">
    <Spin v-show="isSpinShow" class="my_ad_container_spin" fix></Spin>
    <div class="send-box">
      <header>{{ $t('nav.fabu') }}</header>
      <div class="title-box">
        <h6 class="titles">{{ $t('otc.publishad.createad') }}
          <i class="iconfont icon-hongjiantou"></i>
        </h6>
        <p>
          {{ $t('otc.publishad.msg1') }}
          <router-link to="/otc/trade/bc">
            {{ $t('otc.publishad.tradead') }}
          </router-link>
          。
        </p>
        <p>{{$t('otc.publishad.msg2')}}
          {{$t('otc.publishad.msg3')}}。
        </p>
        <p>{{$t('otc.publishad.msg4')}}
          <router-link to="/otc/trade/bc">
            {{$t('otc.publishad.myad')}}
          </router-link>
          。
        </p>
      </div>
      <!--  -->
      <div class="formbox send-form">
        <div style="background: #191D3A">
          <Form
            ref="form"
            :model="form"
            :rules="ruleValidate"
            :label-width="90"
          >
            <div class="publish-left">
              <FormItem
                :label="$t('otc.publishad.iwant')"
                prop="advertiseType"
              >
                <RadioGroup
                  v-model="form.advertiseType"
                  @on-change="changeCoin"
                >
                  <Radio
                    label="1"
                    :disabled='isId'
                  >
                    {{$t('otc.publishad.sellonline')}}
                  </Radio>
                  <Radio
                    label="0"
                    :disabled='isId'
                  >
                    {{$t('otc.publishad.buyonline')}}
                  </Radio>
                </RadioGroup>
              </FormItem>
              <FormItem
                :label="$t('otc.publishad.exchangecoin')"
                prop="coin"
              >
                <Select
                  v-model="form.coin"
                  :disabled='isId'
                  @on-change="changeCoin"
                >
                  <Option
                    v-for="(item, index) in coinList"
                    :value="item.id"
                    :key="index"
                  >
                    {{item.unit}}
                  </Option>
                </Select>
              </FormItem>
              <FormItem
                :label="$t('otc.publishad.country')"
                prop="country"
              >
                <Select
                  v-model="form.country"
                  @on-change="onAreaChange"
                >
                  <Option
                    v-for="(area,index) in areas"
                    :value="area.zhName"
                    :key="index"
                  >
                    {{area.zhName}}
                  </Option>
                </Select>
              </FormItem>
              <!-- 1 -->
              <FormItem
                :label="$t('otc.publishad.currency')"
                prop="rmb"
              >
                <input
                  class="rmb-input"
                  v-model="form.rmb"
                  disabled
                  placeholder=""
                />
              </FormItem>
              <FormItem
                v-if="symbol != 'BC'"
                :label="$t('otc.publishad.openfixedprice')"
              >
                <i-switch
                  v-model="form.fixed"
                  size="large"
                >
                  <span slot="open">{{$t('otc.publishad.open')}}</span>
                  <span slot="close">{{$t('otc.publishad.close')}}</span>
                </i-switch>
              </FormItem>
              <p class="msg" v-show="form.fixed">
                {{$t('otc.publishad.usetip')}}
              </p>
              <FormItem
                :label="$t('otc.publishad.premiseprice')"
                prop="premisePrice"
                v-show="!form.fixed"
                class="ivu-form-item-required"
              >
                <Input
                  v-model="form.premisePrice"
                  @keyup.native="handleInput(form.premisePrice)"
                  :placeholder="$t('otc.publishad.premisepricetip')"
                />
                <span slot="append">%</span>
              </FormItem>
              <FormItem
                v-if="symbol !== 'BC'"
                :label="$t('otc.publishad.fixedprice')"
                prop="fixedPrice"
                v-show="form.fixed"
                class="ivu-form-item-required"
              >
                <Input
                  v-model="form.fixedPrice"
                  @keyup.native="handleInput(form.fixedPrice)"
                  :placeholder="$t('otc.publishad.fixedpricetip')"
                >
                  <span slot="append">{{form.rmb}}</span>
                </Input>
              </FormItem>
              <FormItem
                v-else
                :label="$t('otc.publishad.fixedprice')"
                prop="fixedPrice"
                v-show="form.fixed"
                class="ivu-form-item-required"
              >
                <Input
                  v-model="form.fixedPrice"
                  @keyup.native="handleInput(form.fixedPrice)"
                  :placeholder="$t('otc.publishad.fixedpricetip')"
                  disabled
                >
                  <span slot="append">{{form.rmb}}</span>
                </Input>
              </FormItem>
              <!-- 1 -->
              <p class="msg">{{$t('otc.publishad.marketprice')}}：
                <span class="cankao">{{cankao - 0}}</span>
              </p>
              <p class="msg" v-show="!form.fixed">
                {{$t('otc.publishad.marketpricetip')}}{{wantstyle}}。
              </p>
              <div class="ivu-form-item">
                <label class="ivu-form-item-label" style="width: 90px;">
                  {{$t('otc.publishad.exchangeprice')}}
                </label>
                <div class="ivu-form-item-content" style="margin-left: 90px;">
                  <div class="ivu-input-wrapper ivu-input-type" id="price">
                    {{price - 0}}&nbsp;CNY/{{symbol}}
                  </div>
                </div>
              </div>
              <p class="msg">
                {{$t('otc.publishad.formual')}}：（Bitstamp+Bitfinex+Coinbase）/ 3 *{{gongshi.toFixed(4) }}
              </p>
              <FormItem
                :label="wantstyle+$t('otc.publishad.num')"
                prop="number"
              >
                <Input
                  v-model="form.number"
                  :placeholder="$t('otc.publishad.num_text1')+wantstyle+$t('otc.publishad.num_text2')"
                />
              </FormItem>
              <FormItem :label="$t('otc.publishad.exchangeperiod')" prop="timeLimit">
                <Input
                  v-model="form.timeLimit"
                  @keyup.native="handleInput(form.timeLimit)"
                  :placeholder="$t('otc.publishad.exchangeperiod_text1')+'('+wantTime+$t('otc.publishad.minute')+')'"
                >
                  <span slot="append">{{$t('otc.publishad.minute')}}</span>
                </Input>
              </FormItem>
              <p class="msg">{{$t('otc.publishad.tip1')}} </p>
              <router-link to="/uc/account" style="padding-left: 90px;color:#FE5C5C;">
                {{$t('otc.publishad.tip2')}}
              </router-link>
            </div>

            <div class="publish-right">
              <FormItem
                :label="$t('otc.publishad.paymode')"
                prop="payMode"
              >
                <Select
                  v-model="form.payMode"
                  multiple
                >
                  <Option
                    v-for="(item,index) in payModeList"
                    :value="item.value"
                    :key="item.value" :disabled="item.isOpen"
                  >
                    {{ item.label }}
                  </Option>
                </Select>
              </FormItem>

              <FormItem
                :label="$t('otc.publishad.minlimit')"
                prop="minLimit"
              >
                <Input
                  v-model="form.minLimit"
                  @keyup.native="handleInput(form.minLimit)"
                  :placeholder="$t('otc.publishad.tip3')"
                >
                  <span slot="append">CNY</span>
                </Input>
              </FormItem>
              <FormItem
                :label="$t('otc.publishad.maxlimit')"
                prop="maxLimit"
              >
                <Input
                  v-model="form.maxLimit"
                  @keyup.native="handleInput(form.maxLimit)"
                  :placeholder="$t('otc.publishad.tip4')"
                >
                  <span slot="append">CNY</span>
                </Input>
              </FormItem>
              <FormItem
                :label="$t('otc.publishad.remark')"
                prop="remark"
              >
                <Input
                        class="textarea"
                  v-model="form.remark"
                  type="textarea"
                  :autosize="{minRows: 2,maxRows: 6}"
                  :placeholder="$t('otc.publishad.tip5')"
                />
              </FormItem>
              <FormItem :label="$t('otc.publishad.openautoreply')">
                <i-switch v-model="form.autoReply" size="large">
                  <span slot="open">{{$t('otc.publishad.open')}}</span>
                  <span slot="close">{{$t('otc.publishad.close')}}</span>
                </i-switch>
              </FormItem>
              <p class="msg">{{$t('otc.publishad.msg5')}}</p>
              <FormItem
                :label="$t('otc.publishad.autoreply')"
                prop="autoword"
                v-show="form.autoReply"
              >
                <Input
                  v-model="form.autoword" type="textarea"
                  :autosize="{minRows: 4,maxRows: 6}"
                  :placeholder="$t('otc.publishad.autoreplytip')"
                />
              </FormItem>
              <FormItem
                :label="$t('otc.publishad.fundpwd')"
                prop="priceW"
              >
                <Input
                  v-model="form.priceW"
                  :placeholder="$t('otc.publishad.fundpwdtip')"
                  type="password"
                />
              </FormItem>
              <FormItem>
                <Button
                  class="bun"
                  long
                  @click="handleSubmit('form')"
                  :disabled="disAllowBtn"
                >
                  {{$t('otc.publishad.submit')}}
                </Button>
                <!-- <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">Reset</Button> -->
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const numberCheck = (rule, value, callback) => {
      if (value === '' || value == 0) {
        callback(new Error(this.$t('otc.publishad.warning1')))
      } else if (Number.isNaN(Number(value))) {
        callback(new Error(this.$t('otc.publishad.warning1')))
      } else {
        callback()
      }
    }
    const premisePriceCheck = (rule, value, callback) => {
      if (this.form.fixed == false) {
        if (!value || value == 0) {
          return callback(new Error(this.$t('otc.publishad.warning2')))
        } else if (Number.isNaN(Number(value))) {
          callback(new Error(''))
        } else if (value < 0 || value > 20) {
          callback(new Error(this.$t('otc.publishad.warning1')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const fixedPCheck = (rule, value, callback) => {
      if (this.form.fixed == true) {
        if (value === '') {
          callback(new Error(this.$t('otc.publishad.warning1')))
        } else if (!/^[0-9]+(.[0-9]{2})?/.test(value)) {
          callback(new Error(this.$t('otc.publishad.warning1')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const maxCheck = (rule, value, callback) => {
      let priceNow =
        (this.price + '').replace(/,/g, '').replace(/[^\d|.]/g, '') - 0
      priceNow = this.round(this.mul(priceNow, this.form.number), 8)

      if (!value || value == 0) {
        return callback(new Error(this.$t('otc.publishad.warning3')))
      } else if (!/^[0-9]+(.[0-9]{2})?$/.test(value)) {
        callback(new Error(this.$t('otc.publishad.warning4')))
      } else if (parseFloat(value) < parseFloat(this.form.minLimit)) {
        callback(new Error(this.$t('otc.publishad.warning5')))
      } else if (parseFloat(value) > parseFloat(priceNow)) {
        callback(
          new Error(this.$t('otc.publishad.warning6') + priceNow + 'CNY！')
        )
      } else {
        callback()
      }
    }
    const minCheck = (rule, value, callback) => {
      if (!value || value == 0) {
        return callback(new Error(this.$t('otc.publishad.warning7')))
      } else if (!/^\d+$/.test(value)) {
        callback(new Error(this.$t('otc.publishad.warning4')))
      } else if (parseFloat(value) < 100) {
        callback(new Error(this.$t('otc.publishad.warning8')))
      }
      if (
        this.form.maxLimit &&
        this.form.maxLimit != 0 &&
        parseFloat(value) > this.form.maxLimit - 0
      ) {
        callback(new Error(this.$t('otc.publishad.warning9')))
      } else {
        callback()
      }
    }
    //    期限
    const timeLimitCheck = (rule, value, callback) => {
      // 数字
      if (value === '' || !/^\d+$/.test(value)) {
        callback(new Error(this.$t('otc.publishad.warning1')))
      }
      // 出售
      if (this.form.advertiseType == 1) {
        if (value < 15 || value > 120) {
          callback(new Error(this.$t('otc.publishad.warning1')))
        } else {
          callback()
        }
      }
      // 买入
      if (this.form.advertiseType == 0) {
        if (value < 10 || value > 30) {
          callback(new Error(this.$t('otc.publishad.warning1')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      isSpinShow: true,
      isId: false,
      disAllowBtn: false,
      // 币种列表
      coinList: [],
      // 账户余额
      balance: 100,
      // 参考价
      cankao: '',
      price: '',
      symbol: '',
      gongshi: 1,
      wantstyle: this.$t('otc.publishad.sellout'),
      wantTime: '15-120',
      areas: [],
      form: {
        advertiseType: '1',
        coin: '1',
        country: 'china',
        rmb: '',
        fixed: false,
        premisePrice: '',
        regularPrice: '',
        fixedPrice: '',
        number: '',
        timeLimit: '',
        payMode: [],
        minLimit: '',
        maxLimit: '',
        autoReply: false,
        remark: '',
        priceW: '',
        autoword: ''
      },
      ruleValidate: {
        advertiseType: [{ required: true, trigger: 'change' }],
        coin: [
          {
            required: true,
            message: this.$t('otc.publishad.inputtip1'),
            trigger: 'change'
          }
        ],
        country: [
          {
            required: true,
            message: this.$t('otc.publishad.inputtip2'),
            trigger: 'change'
          }
        ],
        rmb: [
          {
            required: true,
            message: this.$t('otc.publishad.inputtip2'),
            trigger: 'change'
          }
        ],
        premisePrice: [
          {
            validator: premisePriceCheck,
            message: this.$t('otc.publishad.inputtip3'),
            trigger: 'blur'
          }
        ],
        fixedPrice: [
          {
            validator: fixedPCheck,
            message: this.$t('otc.publishad.inputtip4'),
            trigger: 'blur'
          }
        ],
        number: [
          {
            required: true,
            validator: numberCheck,
            message: this.$t('otc.publishad.inputtip5'),
            trigger: 'blur'
          }
        ],
        timeLimit: [
          {
            required: true,
            validator: timeLimitCheck,
            message: this.$t('otc.publishad.inputtip6'),
            trigger: 'blur'
          }
        ],
        payMode: [
          {
            required: true,
            type: 'array',
            min: 1,
            message: this.$t('otc.publishad.inputtip7'),
            trigger: 'change'
          }
        ],
        minLimit: [{ required: true, validator: minCheck, trigger: 'blur' }],
        maxLimit: [{ required: true, validator: maxCheck, trigger: 'blur' }],
        priceW: [
          {
            required: true,
            message: this.$t('otc.publishad.inputtip8'),
            trigger: 'blur'
          }
        ]
      },
      payModeList: [
        {
          value: this.$t('otc.publishad.zfb'),
          label: this.$t('otc.publishad.zfb'),
          isOpen: true
        },
        {
          value: this.$t('otc.publishad.wx'),
          label: this.$t('otc.publishad.wx'),
          isOpen: true
        },
        {
          value: this.$t('otc.publishad.unionpay'),
          label: this.$t('otc.publishad.unionpay'),
          isOpen: true
        }
      ]
    }
  },
  methods: {
    // 特殊字符限制
    handleInput(reg1) {
      var reg = new RegExp(/[\-\_\,\!\|\~\`\(\)\#\@\%\-\+\=\/\'\￥\。\ \…\$\（\）\(\)\[\]\【\】\^\&\*\{\}\:\;\"\L\<\>\?\\]/g, '')
      if (reg.test(reg1)) {
        this.form.premisePrice = ''
        this.form.fixedPrice = ''
        this.form.minLimit = ''
        this.form.maxLimit = ''
        this.form.number = ''
      }
    },
    changeCoin() {
      console.log(this.symbol)
      const coinItem = this.getCoin(this.form.coin)
      console.log(coinItem, this.form.coin)
      if (coinItem != null) {
        this.cankao = coinItem.marketPrice + ''
        const lv = (1 + this.form.premisePrice / 100).toFixed(4)
        const cankoNew =
          this.cankao.replace(/,/g, '').replace(/[^\d|.]/g, '') - 0
        this.price = (cankoNew * lv).toLocaleString() // + ' CNY/' + coinItem.unit;
        this.symbol = coinItem.unit
        console.log(this.symbol)
      }
      /* 当购买类型为 卖出 1 时 并且 当前交易币种为BC时 默认显示固定价格 并且固定价格为1
      否则购买类型为 买入0 时 并且当前交易对币种为BC时 默认显示固定价格 并且固定价格为 0.99
      当购买或者出售时必中不是 BC 那么默认显示 溢出价 价格自定义*/
      if (this.form.advertiseType == '1' && this.symbol == 'BC') {
        this.form.fixed = true
        this.form.fixedPrice = '1'
      } else if (this.form.advertiseType == '0' && this.symbol == 'BC') {
        this.form.fixed = true
        this.form.fixedPrice = '0.99'
      } else {
        this.form.fixed = false
        this.form.fixedPrice = ''
      }
    },
    mul(a, b) {
      var c = 0,
        d = a.toString(),
        e = b.toString()
      try {
        c += d.split('.')[1].length
      } catch (f) {}
      try {
        c += e.split('.')[1].length
      } catch (f) {}
      d == null ? d = 0 : (typeof d === 'string' ? d = d.replace('.', '') : '')
      e == null ? e = 0 : (typeof e === 'string' ? e = e.replace('.', '') : '')
      return (
        Number(d) *
        Number(e) /
        Math.pow(10, c)
      )
    },
    div(a, b) {
      var c,
        d,
        e = 0,
        f = 0
      try {
        e = a.toString().split('.')[1].length
      } catch (g) {}
      try {
        f = b.toString().split('.')[1].length
      } catch (g) {}
      return (
        (c = Number(a.toString().replace('.', ''))),
        (d = Number(b.toString().replace('.', ''))),
        this.mul(c / d, Math.pow(10, f - e))
      )
    },
    round(v, e) {
      var t = 1
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.disAllowBtn = true
          // 创建
          var params = {}
          params['price'] = (this.price + '').replace(/[^\d|.]/g, '') - 0
          params['advertiseType'] = this.form.advertiseType
          params['coin.id'] = this.form.coin
          params['minLimit'] = this.form.minLimit
          params['maxLimit'] = this.form.maxLimit
          params['timeLimit'] = this.form.timeLimit
          params['country'] = this.form.country
          if (this.form.fixed == true) {
            params['priceType'] = 0
          } else if (this.form.fixed == false) {
            params['priceType'] = 1
          }
          params['premiseRate'] = this.form.premisePrice
          params['remark'] = this.form.remark
          params['number'] = this.form.number
          params['pay'] = this.form.payMode
          params['jyPassword'] = this.form.priceW
          if (this.form.autoReply == true) {
            params['auto'] = 1
          } else if (this.form.autoReply == false) {
            params['auto'] = 0
          }
          params['autoword'] = this.form.autoword

          // 修改
          var isIdparams = {}
          isIdparams['id'] = this.$route.query.id
          isIdparams['advertiseType'] = this.form.advertiseType
          isIdparams['price'] = (this.price + '').replace(/[^\d|.]/g, '') - 0
          isIdparams['coin.id'] = this.form.coin
          isIdparams['minLimit'] = this.form.minLimit
          isIdparams['maxLimit'] = this.form.maxLimit
          isIdparams['timeLimit'] = this.form.timeLimit
          isIdparams['country'] = this.form.country
          if (this.form.fixed == true) {
            isIdparams['priceType'] = 0
          } else if (this.form.fixed == false) {
            isIdparams['priceType'] = 1
          }
          isIdparams['premiseRate'] = this.form.premisePrice
          isIdparams['remark'] = this.form.remark
          isIdparams['number'] = this.form.number
          isIdparams['pay'] = this.form.payMode
          isIdparams['jyPassword'] = this.form.priceW
          if (this.form.autoReply == true) {
            isIdparams['auto'] = 1
          } else if (this.form.autoReply == false) {
            isIdparams['auto'] = 0
          }
          isIdparams['autoword'] = this.form.autoword
          if (this.isId) {
            this.$http
              .post(this.host + '/otc/advertise/update', isIdparams)
              .then(response => {
                var resp = response.body
                if (resp.code == 0) {
                  this.$Message.success(resp.message)
                  var that = this
                  setTimeout(() => {
                    that.$router.push('/otc/trade/bc')
                  }, 3000)
                } else {
                  this.$Message.error(resp.message)
                  this.disAllowBtn = false
                }
                //  this.disAllowBtn=false
              })
          } else {
            // 创建
            this.$http
              .post(this.host + '/otc/advertise/create', params)
              .then(response => {
                var resp = response.body
                if (resp.code == 0) {
                  this.$Message.success(resp.message)
                  var that = this
                  setTimeout(() => {
                    that.$router.push('/otc/trade/bc')
                  }, 3000)
                } else {
                  this.$Message.error(resp.message)
                  this.disAllowBtn = false
                }
                // this.disAllowBtn=false
              })
          }
        } else {
          this.disAllowBtn = false
          this.$Message.error(this.$t('otc.publishad.submit_failure'))
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    onAreaChange(value) {
      for (var i = 0; i < this.areas.length; i++) {
        if (this.areas[i].zhName == value) {
          this.form.rmb = this.areas[i].localCurrency
        }
      }
    },
    findCoin(coinId) {
      for (let i = 0; i < this.coinList.length; i++) {
        if (this.coinList[i].id == coinId) {
          return this.coinList[i].unit
        }
      }
    },
    getCoin(coinId) {
      for (let i = 0; i < this.coinList.length; i++) {
        if (this.coinList[i].id == coinId) {
          return this.coinList[i]
        }
      }
    },
    getAreas() {
      this.$http.post(this.host + '/uc/support/country').then(response => {
        var resp = response.body
        this.areas = resp.data
        this.form.country = this.areas[0].zhName
        this.form.rmb = this.areas[0].localCurrency
      })
    },
    getMember() {
      // 获取个人安全信息
      const self = this
      this.$http.get(this.host + this.api.uc.identification).then(res => {
        const certifiedBusinessStatus = res.body.data.certifiedBusinessStatus
        if (certifiedBusinessStatus == 2) {
          this.getAccount()
        } else {
          /* 请先申请商家认证?*/
          this.$Message.warning(this.$t('otc.publishad.certification'))
          this.$router.push('/identbusiness')
        }
      })
      //
      //
      // this.$http.post(this.host + '/uc/approve/security/newSetting').then(response => {
      //     var resp = response.body;
      //     if (resp.code == 0) {
      //         if (resp.data.realName == null || resp.data.realName == "") {
      //             this.$Message.success(this.$t('otc.publishad.submittip1'));
      //             self.$router.push('/uc/safe');
      //         } else if (resp.data.phoneVerified == 0) {
      //             this.$Message.success(this.$t('otc.publishad.submittip2'));
      //             self.$router.push('/uc/safe');
      //         } else if (resp.data.fundsVerified == 0) {
      //             this.$Message.success(this.$t('otc.publishad.submittip3'));
      //             self.$router.push('/uc/safe');
      //         } else {
      //             this.getAccount()
      //         }
      //     } else {
      //         this.$Message.error(resp.message);
      //     }
      // })
    },
    getAccount() {
      // 获取个人账户信息
      const self = this
      this.$http
        .post(this.host + '/uc/approve/account/setting')
        .then(response => {
          var resp = response.body
          if (resp.code == 0) {
            if (
              resp.data.bankVerified == 0 &&
              resp.data.aliVerified == 0 &&
              resp.data.wechatVerified == 0
            ) {
              this.$Message.success(this.$t('otc.publishad.submittip4'))
              self.$router.push('/uc/account')
            }
            if (resp.data.aliVerified == 1) {
              this.payModeList[0].isOpen = false
            }
            if (resp.data.wechatVerified == 1) {
              this.payModeList[1].isOpen = false
            }
            if (resp.data.bankVerified == 1) {
              this.payModeList[2].isOpen = false
            }
          } else {
            this.msg = resp.message
            this.$Message.error(resp.message)
          }
        })
    },
    getDetailAd() {
      this.isId = true
      this.$http
        .post(this.host + '/otc/advertise/detail', { id: this.$route.query.id })
        .then(response => {
          var resp = response.body
          if (resp.code == 0) {
            this.form.coin = resp.data.coinId + ''
            this.form.country = resp.data.country.zhName
            this.cankao = resp.data.marketPrice + ''
            if (resp.data.priceType == 0) {
              this.form.fixed = true
              this.form.fixedPrice = resp.data.price
            } else if (resp.data.priceType == 1) {
              this.form.fixed = false
            }
            this.price = resp.data.price
            this.symbol = resp.data.coinUnit
            // this.price = resp.data.price + ' CNY/' + resp.data.coinUnit;
            this.form.advertiseType = resp.data.advertiseType + ''
            this.form.minLimit = resp.data.minLimit
            this.form.maxLimit = resp.data.maxLimit
            this.form.remark = resp.data.remark
            this.form.timeLimit = resp.data.timeLimit
            this.form.premisePrice = resp.data.premiseRate
            this.form.payMode = (resp.data.payMode + '').split(',')
            this.form.number = resp.data.number
            if (resp.data.auto == 1) {
              this.form.autoReply = true
            } else if (resp.data.auto == 0) {
              this.form.autoReply = false
            }
            this.form.autoword = resp.data.autoword
          } else {
            this.$Message.error(resp.message)
          }
          this.isSpinShow = false
        })
    }
  },
  mounted() {
    this.changeCoin()
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin
    },
    wantHistory() {
      return this.form.advertiseType
    },
    premisePriceHistory() {
      return this.form.premisePrice
    },
    fixedPriceHistory() {
      return this.form.fixedPrice
    }
  },
  watch: {
    wantHistory(newValue, oldValue) {
      if (newValue == '1') {
        this.wantstyle = this.$t('otc.publishad.sellout')
        this.wantTime = '15-120'
      } else {
        this.wantstyle = this.$t('otc.publishad.buyin')
        this.wantTime = '10-30'
      }
    },
    premisePriceHistory(newValue, oldValue) {
      const lv = (1 + newValue / 100).toFixed(4)
      const cankoNew = this.cankao.replace(/,/g, '').replace(/[^\d|.]/g, '') - 0

      // this.price = (cankoNew * lv).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
      // this.price = this.round(this.mul(cankoNew, lv), 2).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
      this.price = this.round(this.mul(cankoNew, lv), 2).toLocaleString()
      this.gongshi = 1 + newValue / 100
    },
    fixedPriceHistory(newValue, oldValue) {
      this.price = (newValue - 0).toLocaleString()
    }
  },
  created() {
    this.changeCoin()
    if (this.isLogin) {
      this.getMember()
    }
    this.getAreas()
    const lv = (1 + this.form.premisePrice / 100).toFixed(4)
    // 获取币种
    this.$http.post(this.host + '/otc/coin/all').then(response => {
      var resp = response.body
      if (resp.code == 0) {
        this.coinList = resp.data
        this.form.coin = resp.data[0].id
        this.cankao = resp.data[0].marketPrice + ''
        const cankoNew =
          this.cankao.replace(/,/g, '').replace(/[^\d|.]/g, '') - 0
        // this.price = (cankoNew * lv).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
        this.price = (cankoNew * lv).toLocaleString()
        this.symbol = resp.data[0].unit
      } else {
        this.$Message.error(resp.message)
      }
      // 修改
      if (this.$route.query.id) {
        this.getDetailAd()
      } else {
        this.isSpinShow = false
      }
    })
  }
}
</script>
<style>
.my_ad_container .my_ad_container_spin.ivu-spin-fix .ivu-spin-main {
  top: 200px;
  background: rgba(25, 29, 58, .6);
}
.ivu-spin-fix {
  background: rgba(25, 29, 58, .3);
}
</style>

<style scoped lang="scss">
.my_ad_container {
  float: left;
  background: #f4f6f8;
  /*padding-bottom: 193px;*/
}
.cankao {
  color: #FE5C5C;
}
.contbox {
  position: relative;
}
#price {
  font-size: 18px;
  color: #FE5C5C;
}
.textarea {
  height: 100px !important;
  line-height: 20px !important;
  min-height: 100px !important;
}
.send-box .send-form .msg {
  padding-left: 90px;
  margin-bottom: 10px;
  position: relative;
  top: -4px;
  color: #666666;
}
.bun {
  height: 40px;
  background: #E62B25;
  color:#fff;
  border: 0;
  border-radius: 0;
}
.formbox {
  float: left;
  padding: 30px 0 80px;
  background: #fff;
  margin-top: 30px;
}

.formbox .publish-left {
  width: 48%;
  float: left;
}
.formbox .publish-right {
  width: 52%;
  float: left;
  padding: 60px 0 0 85px;
}
.send-box {
  color: #8090AF;
  padding: 32px;
  float: left;
  header {
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    color: #333;
    font-weight: 600;
    font-size: 20px;
  }
}

.title-box {
  width: 100%;
  float: left;
  text-align: left;
  padding: 20px;
  background: #fff;
}

.title-box .titles {
  font-size: 16px;
  font-weight: normal;
  color: #000;

  margin-bottom: 15px;
}

.title-box p {
  color: #333;
  line-height: 2;
}

.title-box p a {
  color: #FE5C5C;
}

.order-table {
  margin-top: 20px;
}

.content-wrap {
  background: #f5f5f5;
  min-height: 750px;
}

.container {
  margin: 0 auto;
}
</style>
<style lang="scss">
  .my_ad_container {
    .ivu-select-selection {
      width: 370px;
      height: 40px;
      /*background: #191d3a;*/
      border-radius: 0;
      border: 1px solid #DDDDDD;
      .ivu-select-selected-value {
        height: 40px;
        line-height: 40px;
        color: #333;
      }
    }
    .ivu-tag {
      background: #2A3850;
      border: 0;
      margin: 8px 4px 3px 0;
    }
    .ivu-select-single {
      .ivu-select-selection {
        height: 40px !important;
        line-height: 40px !important;
        .ivu-select-selected-value {
          height: 40px !important;
          line-height: 40px !important;
          color: #333;
        }
      }
    }
    .ivu-select-multiple {
      .ivu-select-selection {
        .ivu-select-placeholder {
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .ivu-select-dropdown {
      min-width: 370px !important;
      background: #fff;
      box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.1);
      .ivu-select-item-selected {
        color: rgb(254, 92, 92);
        background: #F4F6F8;
      }
      .ivu-select-item {
        &:hover {
          background: #F4F6F8;
          color: rgb(254, 92, 92);
        }
      }
      li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
        background: #fff;
        /*box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.1);*/
        &:hover {
          background: #F4F6F8;
          color: rgb(254, 92, 92);
        }
      }
    }
    .ivu-form .ivu-form-item-label {
      padding: 13px 12px 10px 0;
      color: #333;
    }
    .ivu-form-item-content {
      width: 370px;
      .ivu-input {
        background: transparent;
        border-radius: 0;
        border: 1px solid #DDDDDD;
        height: 40px;
        line-height: 40px;
        color: #8090AF;
        /*&:hover {*/
        /*  border: 1px solid #2A3850;*/
        /*}*/
      }
      .ivu-input-group {
        .ivu-input {
          width: 310px;
        }
      }
      .ivu-input-group-append {
        padding: 4px 17px;
        background: transparent;
        border: 1px solid #DDDDDD;
        border-left: 0;
        border-radius: 0;
      }
      .ivu-switch {
        background: #FE5C5C;
        border: 1px solid #FE5C5C;
      }
      .ivu-switch-checked {
        background: #61C283;
        border: 1px solid #61C283;
      }
      .ivu-radio-inner {
        border-color: #E62B25;
        background: transparent;
        &:after {
          background: #E62B25;
        }
      }
    }
    .ivu-btn[disabled] {
      &:hover {
        background: #3399ff;
        color: #fff;
        border: 0;
      }
    }
  }

</style>
<style scoped lang="scss">
  .rmb-input {
    border: 1px solid #DDDDDD;
    background: rgba(246,246,246,1);
    width: 370px;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
  }
</style>
