<template>
    <div class="content-wrap">
        <div class="container" id="List">
            <div class="leftmenu left-box">
                <div class="user-info user-title">
                    <div class="avatar-box">
                        <img src="../../assets/images/fait/user.png">
                        <!--<div class="user-face user-avatar-public">
                            <span class="user-avatar-in">{{usernameS}}</span>
                            &lt;!&ndash; <span class="online-status-box user-states ">
                                <span class="circles"></span>
                            </span> &ndash;&gt;
                        </div>-->
                    </div>
                    <!-- 个人姓名改为昵称 -->
                    <p class="ml10" style="margin-top: 5px;">{{ $t('uc.safe.nickname') }}：{{ strpro(user.username) }}</p>
                    <p class="ml10">{{$t('otc.tradeinfo.exchangetimes')}}：{{ user.transactions }}</p>
                </div>
                <div class="user-info">
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
                </div>
                <div class="user-info">
                    <div class="user-title-p">
                        <p>{{ $t('otc.tradeinfo.price') }}</p>
                        <p>{{ user.price }} CNY / {{ user.unit }}</p>
                        <p>{{ $t('otc.tradeinfo.num') }}</p>
                        <p>{{ user.number }}&nbsp;{{ user.unit }}</p>
                    </div>
                </div>
                <div class="user-info">
                    <div class="user-title-p">
                        <p>{{ $t('otc.tradeinfo.paymethod') }}</p>
                        <p>{{ user.payMode }}</p>
                        <p>{{ $t('otc.tradeinfo.exchangelimitamount') }}</p>
                        <p>{{ user.minLimit }} - {{ user.maxLimit }} CNY</p>
                    </div>
                </div>
                <div class="user-info">
                    <div class="user-title-p">
                        <p>{{ $t('otc.tradeinfo.location') }}</p>
                        <p>{{ $t('otc.tradeinfo.location_text') }}</p>
                        <p>{{ $t('otc.tradeinfo.exchangeperiod') }}</p>
                        <p>{{ user.timeLimit}}{{$t('otc.tradeinfo.minute') }}</p>
                    </div>
                </div>
            </div>
            <div class="right-safe">
                <div class="trade-right-box">
                    <div class="trade-operation">
                        <div>
                            <Poptip
                                trigger="focus"
                                :content="text2"
                                style="width: 100%;"
                            >
                                <Input
                                    @on-change="transform2"
                                    @on-keyup="keyEvent2"
                                    v-model="nuyNum"
                                    size="large"
                                    :placeholder="$t('otc.tradeinfo.numtip')"
                                    style="width: 420px"
                                >
                                    <span slot="prepend">{{ user.unit }}</span>
                                </Input>
                            </Poptip>
                        </div>
                        <div class="icon-main">
                            <span class="exchange1">
                                <Icon type="md-swap" style="transform:rotate(90deg);"/>
                            </span>
                        </div>
                        <div>
                            <Poptip
                                trigger="focus"
                                :content="text1"
                                style="width: 100%;"
                            >
                                <Input
                                    disabled
                                    @on-change="transform1"
                                    @on-keyup="keyEvent1"
                                    v-model="buyPrice"
                                    size="large"
                                    :placeholder="$t('otc.tradeinfo.amounttip')"
                                    style="width: 420px"
                                >
                                    <span slot="prepend">CNY</span>
                                </Input>
                            </Poptip>
                        </div>
                        <div class="trade-textarea">
                            <textarea
                                v-model="remark"
                                type="text"
                                :placeholder="$t('otc.tradeinfo.remarktip')"
                                class="text-inputs"
                            ></textarea>
                        </div>
                        <div class="trade-price-box">
                            <p class="show-price" v-if="type == '卖出'">
                                <span>{{$t('otc.tradeinfo.currentbalance')}}:</span>
                                <span>{{ user.otcBalance }} {{ user.unit }}</span>
                                <!--<span>&nbsp;&nbsp;{{buyPrice}} CNY / {{nuyNum}} {{user.unit}}</span>-->
                            </p>
                            <button
                                class="btn-trade-in"
                                @click="submit"
                                :disabled="btnDisabled"
                            >
                                {{btnType}}
                            </button>
                        </div>
                    </div>
                    <!--备注信息-->
                    <div class="trade-remark-box">
                        <h5 class="titles">
                            <span>{{$t('otc.tradeinfo.remarktitle')}}</span>
                        </h5>
                        <p class="content">
                            {{user.remark}}
                        </p>
                    </div>
                    <!--交易须知-->
                    <div class="trade-remark">
                        <h5 class="titles">
                            <span>{{$t('otc.tradeinfo.exchangetitle')}}</span>
                        </h5>
                        <div class="content">
                            <p>{{$t('otc.tradeinfo.exchange_tip1')}}</p>
                            <p>{{$t('otc.tradeinfo.exchange_tip2')}}</p>
                            <p>{{$t('otc.tradeinfo.exchange_tip3')}}</p>
                            <p>{{$t('otc.tradeinfo.exchange_tip4')}}</p>
                            <p>{{$t('otc.tradeinfo.exchange_tip5')}}</p>
                        </div>
                    </div>
                    <div class="modal">
                        <!---->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from '@js/jquery.min.js'
import { setTimeout } from 'timers'
export default {
  components: {},
  data() {
    return {
      usernameS: '',
      text1: '',
      text2: '',
      btnDisabled: false,
      submitBtn: false,
      btnType: '',
      type: '',
      remark: '',
      user: {
        username: 'aaa'
      },
      // price: '',
      buyPrice: '',
      nuyNum: 0,
      minLimit: 100,
      maxLimit: 1000,
      // number:0.6,
      advertiseType: 1
    }
  },
  methods: {
    update() {
      // this.price = '100';
      // this.user.advertiseType=1
    },
    keyEvent1(event) {
      const val = $(event.target).val()
      if (val != '') {
        const r = /^[0-9]+\.?[0-9]{0,9}$/
        const flag = r.test(val)
        if (!flag) {
          this.buyPrice = ''
        }
      }
    }, keyEvent2(event) {
      const val = $(event.target).val()
      if (val != '') {
        const r = /^[0-9]+\.?[0-9]{0,9}$/
        const flag = r.test(val)
        if (!flag) {
          this.nuyNum = ''
        }
      }
    },
    transform1() {
      if (!Number.isNaN(Number(this.buyPrice))) {
        this.nuyNum = this.round(this.div(this.buyPrice, this.priceNow), 8)
        if (/^\d+(\.\d{1,2})?$/.test(this.buyPrice)) {
          this.submitBtn = true
        } else {
          this.submitBtn = false
          this.text1 = this.$t('otc.tradeinfo.warning1')
        }
      } else {
        this.text1 =
                        this.$t('otc.tradeinfo.warning2') +
                        this.user.minLimit +
                        '~' +
                        this.user.maxLimit
        this.submitBtn = false
        return false
      }
    },
    transform2() {
      if (!Number.isNaN(Number(this.nuyNum))) {
        this.buyPrice = this.round(this.mul(this.nuyNum, this.priceNow), 8)
        if (this.nuyNum <= this.user.number) {
          if (/^\d+(\.\d{1,8})?$/.test(this.nuyNum)) {
            this.submitBtn = true
          } else {
            this.submitBtn = false
            this.text2 = this.$t('otc.tradeinfo.warning3')
          }
        } else {
          this.submitBtn = false
          return false
        }
      } else {
        this.text2 =
          this.$t('otc.tradeinfo.warning4') +
          this.minNum +
          '~' +
          this.user.number
        this.submitBtn = false
        return false
      }
    },
    getIdAdv() {
      // 获取id广告信息
      this.$http
        .post(this.host + '/otc/order/pre', { id: this.$route.query.tradeId, memberId: this.$store.getters.member.id })
        // .post('http://192.168.124.188:6006' + '/otc/order/pre', { id: this.$route.query.tradeId })
        .then(response => {
          var resp = response.body
          if (resp.code == 0) {
            this.user = resp.data
            this.text1 =
              this.$t('otc.tradeinfo.warning2') +
              this.user.minLimit +
              '~' +
              this.user.maxLimit
            // this.minNum = (this.user.minLimit/this.user.price).toFixed(8);
            this.text2 =
              this.$t('otc.tradeinfo.warning4') +
              this.minNum +
              '~' +
              this.user.number
            if (this.user.advertiseType == 1) {
              this.btnType = this.$t('otc.tradeinfo.confirmbuyin')
              this.type = this.$t('otc.tradeinfo.buyin')
            } else if (this.user.advertiseType == 0) {
              this.btnType = this.$t('otc.tradeinfo.confirmsellout')
              this.type = this.$t('otc.tradeinfo.sellout')
            }
            this.usernameS = (this.user.username + '')
              .replace(/^\s+|\s+$/g, '')
              .slice(0, 1)
          } else {
            this.$Message.error(resp.message)
          }
        })
    },
    submit() {
      if (this.submitBtn) {
        this.btnDisabled = true
        if (this.user.advertiseType == 1) {
          const param = {}
          param['id'] = this.$route.query.tradeId
          param['coinId'] = this.user.otcCoinId
          param['price'] = this.user.price
          param['money'] = this.buyPrice
          param['amount'] = this.nuyNum
          param['remark'] = this.nuyNum
          this.$http
            .post(this.host + '/otc/order/buy', param)
            .then(response => {
              this.btnDisabled = false
              var resp = response.body
              if (resp.code == 0) {
                this.$Message.success(resp.message)

                const self = this
                setTimeout(() => {
                  self.$router.push('/chat?tradeId=' + resp.data)
                }, 2000)
              } else {
                this.$Message.error(resp.message)
              }
            })
        } else if (this.user.advertiseType == 0) {
          const param = {}
          param['id'] = this.$route.query.tradeId
          param['coinId'] = this.user.otcCoinId
          param['price'] = this.user.price
          param['money'] = this.buyPrice
          param['amount'] = this.nuyNum
          param['remark'] = this.nuyNum
          this.$http
            .post(this.host + '/otc/order/sell', param)
            // .post('http://192.168.124.188:6006/otc/order/sell', param)
            .then(response => {
              this.btnDisabled = false
              var resp = response.body
              const self = this
              if (resp.code == 0) {
                this.$Message.success(resp.message)
                setTimeout(() => {
                  self.$router.push('/chat?tradeId=' + resp.data)
                }, 2000)
              } else if (resp.code == 4005) {
                this.$Message.error(resp.message, 4)
                setTimeout(() => {
                  self.$router.push('/account')
                }, 1000)
              } else {
                this.$Message.error(resp.message)
              }
            })
        }
      } else {
        this.$Message.error(this.$t('otc.tradeinfo.warning5'))
      }
    },
    sendMsg() {
      // this.$http.post(this.host + '/otc/order/sell', param).then(response => {
      //   var resp = response.body;
      //   if (resp.code == 0) {
      //     this.$Message.success(resp.message);
      //     let self = this
      //     setTimeout(() => {
      //       self.$router.push('/chat?tradeId=' + resp.data);
      //     }, 2000)
      //   } else {
      //     this.$Message.error(resp.message);
      //   }
      // })
    },
    mul(a, b) {
      console.log(a)
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
    strpro(str) {
      const newStr = str
      str = str.slice(1)
      var re = /[\D\d]*/g
      var str2 = str.replace(re, function(str) {
        var result = ''
        for (var i = 0; i < str.length; i++) {
          result += '*'
        }
        return result
      })
      return newStr.slice(0, 1) + str2
    }
  },
  created() {
    // this.update()
    this.getIdAdv()
  },
  computed: {
    priceNow: function() {
      return (
        (this.user.price + '').replace(/,/g, '').replace(/[^\d|.]/g, '') - 0
      )
    },
    minNum: function() {
      return (this.user.minLimit / this.priceNow).toFixed(8)
    },
    maxNum: function() {
      return this.user.maxLimit / this.priceNow
    }
  }
}
</script>

<style scoped>
/* right */

.trade-right-box {
  text-align: left;
}

.trade-right-box .trade-price {
  padding: 36px;
  background-color: white;
  border: 1px solid #ebeff5;
  margin-bottom: 20px;
}

.trade-right-box .trade-price p {
  color: #0d214e;
  font-size: 14px;
  line-height: 2.8;
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
    height: 430px;
    background-color: #111530;
    margin-bottom: 20px;
    padding: 40px 425px;
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

.boxinput .ivu-input {
  border: none;
  background-color: transparent;
  outline: none;
  padding: 10px;
  display: inline-block;
  width: 300px;
}

.trade-right-box .trade-operation .icon-main {
    margin-bottom: 6px;
}

.trade-right-box .trade-operation .icon-main .exchange1 {
    width: 10%;
    text-align: center;
    font-size: 22px;
    color: #58698A;
}

.trade-right-box .trade-operation .trade-textarea {
    margin-top: 30px;
}
.trade-right-box .trade-operation .trade-textarea textarea {
    color: #8090AF;
}
.trade-right-box .trade-operation .text-inputs {
  background-color: transparent;
  border: 1px solid #58698A;
  outline: none;
  display: block;
  height: 100px;
  width: 350px;
  resize: none;
  padding: 10px;
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

.trade-right-box .trade-operation .trade-price-box .show-price {
    width: 100%;
    /*height: 30px;*/
    float: left;
    /*line-height: 30px;*/
    margin-bottom: 15px;
}

.trade-right-box .trade-operation .price-box .show-price em {
  font-style: normal;
  font-size: 14px;
  color: #0d214e;
}

.trade-right-box .trade-operation .trade-price-box .show-price span {
  font-size: 14px;
  color: #8090AF;
}

.trade-right-box .trade-operation .trade-price-box .btn-trade-in {
    width: 100%;
    height: 35px;
    outline: medium;
    border: 0;
    color: white;
    background-color: #3399ff;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    float: right;
}
.trade-remark-box {
    min-height: 100px;
    background-color: #111530;
    margin-bottom: 20px;
}
.trade-right-box .trade-remark {
  background-color: #111530;
  padding: 30px 36px;
  margin-bottom: 30px;
}

.trade-right-box .trade-remark-box .titles {
    margin: 0 25px 15px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #58698A;
}

.trade-right-box .trade-remark-box .titles span {
  font-size: 16px;
  color: #8090AF;
  padding-right: 30px;
}

.trade-right-box .trade-remark-box .content {
    color: #8090af;
    padding: 0 25px 20px;
}
.trade-right-box .trade-remark .titles {
    padding-bottom: 15px;
    font-size: 16px;
    color: #fff;
    font-weight: 500;
}
.trade-right-box .trade-remark .content {
  margin-bottom: 30px;
  font-size: 14px;
  color: #8090AF;
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

.content-wrap {
  background: #0e0e28;
  min-height: 600px;
  padding-top: 60px;
}

.container {
  width: 1200px;
  margin: 0 auto;
    padding-bottom: 60px;
}

/* left */

.leftmenu {
    padding: 26px 20px;
    margin: 60px 0 25px;
    background: #111530;
    position: relative;
    min-height: 1px;
    height: 180px;
    color: #8090AF;
}

.left-box {
    display: flex;
}

.left-box .user-info {
    flex: 1;
}
.left-box .user-info img {
    vertical-align: middle;
}
.left-box .user-info:nth-child(2) {
    border-right: 1px solid #26324B;
}

.left-box .user-info:nth-child(2) p {
    height: 40px;
    line-height: 40px;
}
.left-box .user-info:nth-child(2) p img {
    margin-right: 12px;
}
.left-box .user-info.user-title {
    text-align: left;
}
.left-box .user-info .user-title-p {
    width: 135px;
    height: 100%;
    float: right;
}
.left-box .user-info .user-title-p p {
    height: 30px;
    line-height: 30px;
}
.left-box .user-info .user-title-p p:nth-child(3) {
    margin-top: 8px;
 }
.left-box .user-info:last-child .user-title-p {
    width: 110px;
    margin-right: 50px;
}
.left-box .user-info:last-child .user-title-p p{
    text-align: right;
}
.avatar-box {
    margin-top: 9px;
    padding-left: 35px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
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
    height: 30px;
    color: #8090AF;
    margin-left: 5px;
    padding-left: 20px;
    line-height: 30px;
}

.left-box .deal-market-info {
  padding: 20px 0 20px 20px;
  border-bottom: 1px dashed #ebeff5;
}

.left-box .deal-market-info p {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 14px;
  color: #0d214e;
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

    .content-wrap {
      .ivu-input-group-append,
      .ivu-input-group-prepend {
          width: 60px;
          background: transparent;
          border-radius: 0;
          border: 1px solid #58698A !important;
          border-right: 0;
          color: #8090AF;
      }
      .ivu-input,
      .ivu-input[disabled] {
          background: transparent;
          border-radius: 0;
          border: 1px solid #58698A;
      }
      .ivu-input[disabled] {
          &:hover {
              border: 1px solid #58698A;
          }
      }
      .ivu-input-group-large .ivu-input {
          color: #8090AF;
      }
      .ivu-input-group {
          width: 350px !important;
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
    }
</style>


