<template>
  <div id="fund-box">
    <div class="fund-main">
      <header>
        <div class="header-notice">
          <!--活动时间-->
          <span class="header-title-text">{{ $t('common.fund.activityTime') }}</span>
          <span class="header-title-border"></span>
          <div class="notice-text">
            <!--存TD — 8月16日 10:00 至 8月21日 20:00-->
            <p>{{ $t('common.fund.timeSave') }}</p>
            <!--抢购BTC — 8月22日 20:00-->
            <p>{{ $t('common.fund.timeRush') }}</p>
          </div>
        </div>
      </header>
      <div class="main">
        <div class="header-content">
          <div class="header-title">
            <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-two.png" alt="">
            <!--存币-->
            <span class="title">{{ $t('common.fund.rushPurchase') }}</span>
            <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-one.png" alt="">
          </div>
          <div class="info">
            <!--存币数量-->
            <span>{{ $t('common.fund.rushPurchaseAmount') }}：</span>
            <Input
              type="text"
              v-model="lockAmount"
              style="width: 555px;"
              @keyup.native="clearNoNum('lockAmount')"
              :placeholder="Number(coinInfo.lockMinimum) + '～' + Number(coinInfo.lockHighest)"
            />
            <span class="coinName">{{ coinInfo.lockCoinUnit }}</span>
          </div>
          <div class="info-text">
            <!--可用余额-->
            <span>{{ $t('common.fund.available') }}</span>：<span>{{ userWalletBalance }}&nbsp;{{ coinInfo.lockCoinUnit }}</span>
          </div>
          <div class="footer-info">
            <Button
              @click="buyLockCoin('buy')"
              :loading="loadingButton"
            >
              <!--请先登录-->
              <span v-if="!isLogin">{{ $t('common.logintip') }}</span>
              <!--存币-->
              <span v-else>{{ $t('common.fund.rushPurchase') }}</span>
            </Button>
          </div>
        </div>
        <section>
          <!--图片-->
          <p class="circle1"></p>
          <p class="circle2"></p>
          <p class="circle3"></p>
          <p class="circle4"></p>
          <!--抢购-->
          <div class="section-main">
            <div class="count-down">
              <p class="count-title">
                <!--倒计时-->
                {{ $t('common.fund.countDown') }}
              </p>
              <p class="count-icon">
                <i class="ivu-icon ivu-icon-md-arrow-dropdown icon"></i>
              </p>
              <p class="count-time">
                <span class="time">{{ day }}</span>
                <!--天-->
                <span class="day margin">{{ $t('common.fund.day') }}</span>&nbsp;
                <span class="time margin1">{{ time }}</span>
                <!--小时-->
                <span class="day margin">{{ $t('common.fund.hour') }}</span>&nbsp;
                <span class="time margin1">{{ minute }}</span>
                <!--分钟-->
                <span class="day margin">{{ $t('common.fund.minute') }}</span>&nbsp;
                <span class="time margin1">{{ second }}</span>
                <!--秒-->
                <span class="day margin">{{ $t('common.fund.second') }}</span>&nbsp;
              </p>
              <p class="count-progress">
                <Progress :percent="progressBar" />
              </p>
            </div>
            <!--v-if="progressBar == 0"-->
            <div class="purchase">
              <div class="info" style="padding: 0 80px 0 10px;">
                <!--预购数量-->
                <span>{{ $t('common.fund.preOrder') }}：</span>
                <Input
                  type="text"
                  v-model="lockAdvance"
                  :placeholder="$t('common.fund.pleasePreOrder') + balanceData.saleCoin + $t('common.fund.lockAmount')"
                  style="width: 555px;"
                  @keyup.native="clearNoNum('lockAdvance')"
                />
                <span class="coinName" style="right: 105px;">
                  {{ balanceData.saleCoin }}
                </span>
              </div>
              <div class="info-text">
                <!--可用余额-->
                <span>{{ $t('common.fund.available') }}</span>：
                <span>{{ balanceData.balance !== ''?parseFloat(balanceData.balance).toFixed(4):'--' }}&nbsp;{{ balanceData.raiseCoin }}</span>
                <!--可抢购数量-->
                <span style="margin-left: 15px;">{{ $t('common.fund.availableQuantity') }}</span>：
                <span>{{ balanceData.maxSaleAmount!==''?balanceData.maxSaleAmount:'--' }}&nbsp;{{ balanceData.saleCoin }}</span>
              </div>
              <div class="footer-info">
                <Button
                  @click="buyLockCoin('rush')"
                  :loading="loadingButton"
                  :disabled="coinBalance < 0"
                >
                  <span v-if="!isLogin">
                    {{ $t("common.logintip") }}
                  </span>
                  <span v-else>
                     <!--活动已结束  活动暂未开始  立即抢购-->
                    {{ coinBalance < 0?$t('common.fund.finished'):progressBar!==0?$t('common.fund.started'):$t('common.fund.immediately') }}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <p class="circle5"></p>
          <p class="circle6"></p>
          <!--活动规则-->
          <div class="activity-rules">
            <div class="activity-top">
              <div class="top-title">
                <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-two.png" alt="">
                <!--活动内容-->
                <span class="title">{{ $t('common.fund.activityContent') }}</span>
                <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-one.png" alt="">
              </div>
              <div class="top-content">
                <div class="top-left">
                  <!--本次2折 优惠购BTC数量总计五百枚，购完即止-->
                  <p>{{ $t('common.fund.activityContentInfo1') }}
                    <i class="text1">{{ $t('common.fund.activityContentInfo2') }}</i>
                    {{ $t('common.fund.activityContentInfo3') }}
                  </p>
                  <p>1. {{ $t('common.fund.activityContentInfo4') }}{{ coinInfo.lockCoinUnit }} ≧
                    <span class="text2">{{ amount500 }}</span>
                    {{ $t('common.fund.activityContentInfo5') }}
                    <span class="text2">{{ amount1 }}</span>
                    {{ $t('common.fund.activityContentInfo6') }}{{ balanceData.saleCoin }}；
                  </p>
                  <p>2. {{ $t('common.fund.activityContentInfo4') }}{{ coinInfo.lockCoinUnit }} ≧
                    <span class="text2">{{ amount1000 }}</span>
                    {{ $t('common.fund.activityContentInfo5') }}
                    <span class="text2">{{ amount3 }}</span>
                    {{ $t('common.fund.activityContentInfo6') }}{{ balanceData.saleCoin }}；
                  </p>
                  <p>3. {{ $t('common.fund.activityContentInfo4') }}{{ coinInfo.lockCoinUnit }} ≧
                    <span class="text2">{{ amount5000 }}</span>
                    {{ $t('common.fund.activityContentInfo5') }}
                    <span class="text2">{{ amount5 }}</span>
                    {{ $t('common.fund.activityContentInfo6') }}{{ balanceData.saleCoin }}；
                  </p>
                </div>
                <span class="top-border"></span>
                <div class="top-right">
                  <p>{{ $t('common.fund.activityContentInfo7') }}{{ coinInfo.lockCoinUnit }}{{ $t('common.fund.activityContentInfo8') }}，{{ $t('common.fund.activityContentInfo9') }}{{ balanceData.saleCoin }}{{ $t('common.fund.activityContentInfo10') }}
                    <span class="text1">{{ $t('common.fund.activityContentInfo11') }}{{ balanceData.raiseCoin }}</span>
                  </p>
                  <p>1. {{ $t('common.fund.activityContentInfo4') }}{{ coinInfo.lockCoinUnit }} ≧
                    <span class="text2">{{ amount500 }}</span>
                    {{ $t('common.fund.activityContentInfo12') }}
                    <span class="text2">{{ airDropAmount88 }}{{ balanceData.raiseCoin }}</span>；
                  </p>
                  <p>2. {{ $t('common.fund.activityContentInfo4') }}{{ coinInfo.lockCoinUnit }} ≧
                    <span class="text2">{{ amount1000 }}</span>
                    {{ $t('common.fund.activityContentInfo12') }}
                    <span class="text2">{{ airDropAmount188 }}{{ balanceData.raiseCoin }}</span>；
                  </p>
                  <p>3. {{ $t('common.fund.activityContentInfo4') }}{{ coinInfo.lockCoinUnit }} ≧
                    <span class="text2">{{ amount5000 }}</span>
                    {{ $t('common.fund.activityContentInfo12') }}
                    <span class="text2">{{ airDropAmount588 }}{{ balanceData.raiseCoin }}</span>；
                  </p>
                </div>
              </div>
            </div>
            <div class="activity-bottom">
              <div class="top-title">
                <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-two.png" alt="">
                <!--活动细则-->
                <span class="title">{{ $t('common.fund.activityContentInfo13') }}</span>
                <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-one.png" alt="">
              </div>
              <div class="top-content">
                <div class="bottom-left">
                  <p>1. {{ $t('common.fund.activityContentInfo14') }}{{ balanceData.raiseCoin }}{{ $t('common.fund.activityContentInfo15') }}
                    <span class="text3">{{ $t('common.fund.activityContentInfo16') }}{{ coinInfo.lockCoinUnit }},</span>
                    {{ $t('common.fund.activityContentInfo17') }}
                    <span class="text3">{{ balanceData.raiseCoin }}</span>
                    {{ $t('common.fund.activityContentInfo18') }};
                  </p>
                  <p>
                    2. {{ $t('common.fund.activityContentInfo19') }}
                    {{ balanceData.raiseCoin }}
                    {{ $t('common.fund.activityContentInfo20') }}
                    {{ day30 }}
                    {{ $t('common.fund.day') }}，{{ day30 }}
                    {{ $t('common.fund.activityContentInfo21') }}
                    {{ balanceData.raiseCoin }}
                    {{ $t('common.fund.activityContentInfo22') }}
                    {{ balanceData.raiseCoin }}
                    {{ $t('common.fund.activityContentInfo23') }}。
                  </p>
                  <p>3.
                    {{ $t('common.fund.activityContentInfo24') }}
                    {{ balanceData.saleCoin }}
                    {{ $t('common.fund.activityContentInfo25') }}。
                  </p>
                  <p>4.
                    {{ $t('common.fund.activityContentInfo24') }}
                    {{ balanceData.saleCoin }}
                    {{ $t('common.fund.activityContentInfo26') }}
                    {{ balanceData.raiseCoin }}
                    {{ $t('common.fund.activityContentInfo27') }}
                    {{ balanceData.raiseCoin }}
                    {{ $t('common.fund.activityContentInfo28') }}
                    {{ balanceData.saleCoin }}
                    {{ $t('common.fund.activityContentInfo29') }}
                  </p>
                  <p>
                    {{ $t('common.fund.activityContentInfo30') }}
                    {{ balanceData.raiseCoin }}
                    {{ $t('common.fund.activityContentInfo31') }}。
                  </p>
                  <p>5.
                    {{ balanceData.saleCoin }}
                    {{ $t('common.fund.activityContentInfo32') }}
                    {{ balanceData.saleCoin }}
                    {{ $t('common.fund.activityContentInfo33') }}。
                  </p>
                  <p>6.
                    {{ $t('common.fund.activityContentInfo34') }}
                    {{ balanceData.saleCoin }}
                    {{ $t('common.fund.activityContentInfo35') }}
                    {{ balanceData.raiseCoin }}
                    {{ $t('common.fund.activityContentInfo36') }}。
                  </p>
                  <p>7. {{ $t('common.fund.activityContentInfo37') }}。</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!--记录-->
        <footer v-if="isLogin">
          <div class="record-list">
            <div class="save-money">
              <div class="save-title">
                <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-two.png" alt="">
                <span class="title">{{ $t('common.fund.moneyRecord') }}</span>
                <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-one.png" alt="">
              </div>
              <div class="fund-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsSave"
                  :data="saveMoneyList"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <ul class="page">
                  <ul class="ivu-page"></ul>
                  <li
                    title="上一页"
                    class="ivu-page-prev"
                    @click="previouspage('save')"
                  >
                    <a><i class="ivu-icon ivu-icon-ios-arrow-back"></i></a>
                  </li>
                  <li
                    title="下一页"
                    class="ivu-page-next"
                    @click="nextpage('save')"
                  >
                    <a><i class="ivu-icon ivu-icon-ios-arrow-forward"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <!--v-if="snapStatus"-->
            <div class="save-purchase">
              <div class="save-title">
                <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-two.png" alt="">
                <span class="title">{{ $t('common.fund.robRecord') }}</span>
                <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/line-one.png" alt="">
              </div>
              <div class="fund-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsRob"
                  :data="robMoneyList"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <!--<ul class="page" v-show="!robPageNo == 0">
                  <ul class="ivu-page"></ul>
                  <li
                    title="上一页"
                    class="ivu-page-prev"
                    @click="previouspage('rob')"
                  >
                    <a><i class="ivu-icon ivu-icon-ios-arrow-back"></i></a>
                  </li>
                  <li
                    title="下一页"
                    class="ivu-page-next"
                    @click="nextpage('rob')"
                  >
                    <a><i class="ivu-icon ivu-icon-ios-arrow-forward"></i></a>
                  </li>
                </ul>-->
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
 import moment from 'moment'
  // 存币记录
 const FixAraibleSave = (pageSize) => (pageNo) => ({
   pageSize,
   pageNo
 })
const getParamsSave = FixAraibleSave(10, '')
// 抢币记录
const FixAraibleRob = (pageSize) => (pageNo) => ({
   pageSize,
   pageNo
 })
const getParamsRob = FixAraibleRob(10, '')
export default {
   data() {
     return {
       loading: false, // 存币抢币记录 loading
       loadingButton: false, // 点击按钮 loading
        /* 存币分页*/
       savePageNo: 1,
       savePageSize: 10,
       saveTotalElement: 0,
        // 抢币分页
       robPageNo: 1,
       robPageSize: 10,
       robTotalElement: 0,
       lockAmount: '', // 存币数量
       lockAdvance: '', // 预购数量
       saveMoneyList: [], // 存币记录
       robMoneyList: [], // 抢币记录
       amount500: '500',
       amount1000: '1000',
       amount5000: '5000',
       amount1: '1',
       amount3: '3',
       amount5: '5',
       airDropAmount88: '88',
       airDropAmount188: '188',
       airDropAmount588: '588',
       day30: '30',
       day: 0, // 天
       time: 0, // 时
       minute: 0, // 分
       second: 0, // 秒
       totalTime: '', // 总秒数
       progressBar: '', // 进度条比例
        /* 币种可存最大最小*/
       coinInfo: {
         lockMinimum: 0,
         lockHighest: 0
       }, // 币种详细信息
       lockCoinUnit: '', // 币种
       userWalletBalance: '--', // 币种余额
       snapStatus: false, // 抢购状态
       coinBalance: '', // 可抢币余额
       endtime: '', // 结束时间
       balanceData: {
         balance: '',
         maxSaleAmount: '',
         raiseCoin: 'BC',
         saleCoin: 'BTC'
       } // 可抢币余额
     }
   },
   created() {
      // this.ScreenWidth()
     const name = this.$route.path
     if (name == '/fund') {
       this.getCoin() // 币种详细信息 存币
       this.getCoinRob() // 币种详细信息 抢币
       this.countdown()
       if (this.isLogin) {
          // console.log(name, this.isLogin)
         this.getSaveDataList() // 数据列表存币
         this.getCoinBalance() // 币种余额 存币
         this.getRobDataList() // 数据列表 抢币
         this.snapLines() // 钱包余额和最多抢购额度 抢币
       }
     }
   },
   mounted: function() {},
   methods: {
      // 控制只能输入小数点后6位
     clearNoNum(type) {
       this.skylightText1 = ''
       this.skylightText = ''
       console.log(type)
       if (type == 'lockAmount') {
         this.lockAmount = this.lockAmount.replace(/[^\d.]/g, '')  // 清除“数字”和“.”以外的字符
         this.lockAmount = this.lockAmount.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
         this.lockAmount = this.lockAmount.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
         this.lockAmount = this.lockAmount.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')// 只能输入两个小数
         if (this.lockAmount.indexOf('.') < 0 && this.lockAmount != '') {
            // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
           this.lockAmount = parseFloat(this.lockAmount)
         }
       } else {
         this.lockAdvance = this.lockAdvance.replace(/[^\d.]/g, '')  // 清除“数字”和“.”以外的字符
         this.lockAdvance = this.lockAdvance.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
         this.lockAdvance = this.lockAdvance.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
         this.lockAdvance = this.lockAdvance.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')// 只能输入两个小数
         if (this.lockAdvance.indexOf('.') < 0 && this.lockAdvance != '') {
            // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
           this.lockAdvance = parseFloat(this.lockAdvance)
         }
       }
     },
    //  ScreenWidth() {
    //    if (screen.width < 950) {
    //      this.$router.push('/mobileTerminalFund')
    //    }
    //  },
      // 时间格式转换
     formatTime(date) {
       return moment(date).format('YYYY/MM/DD HH:mm:ss')
     },
      // 倒计时
     countdown() {
       let iTime
        // 到期时间
      //  const end = Date.parse(new Date('2019/08/22 18:42:50'))
       const end = this.endtime
       // console.log(end, this.endtime)
       // 当前时间
       const now = Date.parse(new Date())
        // 开始时间
       const start = Date.parse(new Date('2019/08/14 22:00:00'))
        /* 剩余时间 = 到期时间 - 当前时间*/
       const msec = end - now
        /* 当前秒数 = (到期时间 - 开始时间)*0.001*/
       const num = (end - start) * 0.001
        // const that = this
        /* 年月日时分秒*/
       const day = parseInt(msec / 1000 / 60 / 60 / 24)
       const hr = parseInt(msec / 1000 / 60 / 60 % 24)
       const min = parseInt(msec / 1000 / 60 % 60)
       const sec = parseInt(msec / 1000 % 60)
        // console.log(day, hr, min, sec)

       const day1 = parseInt(day * 60 * 60 * 24)
       const hr1 = parseInt(hr * 60 * 60)
       const min1 = parseInt(min * 60)
       const sec1 = parseInt(sec)
        /* 总秒数*/
       this.totalTime = (day1 + hr1 + min1 + sec1)
       if (this.totalTime > 0) {
         this.day = day > 9 ? day : '0' + day
         this.time = hr > 9 ? hr : '0' + hr
         this.minute = min > 9 ? min : '0' + min
         this.second = sec > 9 ? sec : '0' + sec
          // console.log(this.day, this.hr, this.min, this.sec)
         iTime = setTimeout(() => {
           this.countdown()
         }, 1000)
       } else if (this.totalTime == 0) { this.second = '00' }
        /* 进度条比例 = 总秒数/当前秒数 *100*/
       this.progressBar = this.totalTime / num * 100
       if (this.progressBar < 0) {
         this.progressBar = 0
       }
       if (this.progressBar == 0) {
         this.sec = '00'
         clearTimeout(iTime)
       }
     },
      /** *******存币***********/
      // 币种详细信息 存币
     getCoin() {
       this.$http.get(this.host + `/wallet/lockCoinWallet/getList`).then(res => {
         const resp = res.body
         console.log(resp)
         if (resp.code == 0) {
           this.loading = false
           this.coinInfo = resp.data[0]
           if (this.isLogin) {
             this.lockCoinUnit = resp.data[0].lockCoinUnit
             this.getCoinBalance()
           }
         } else {
           // this.$Message.error(resp.message)
           return false
         }
       })
     },
      // 币种余额 存币
     getCoinBalance() {
       console.log(this.lockCoinUnit)
       const unit = !this.lockCoinUnit ? 'TD' : this.lockCoinUnit
       this.$http.get(this.host + `/wallet/lockCoinWallet/userWallet?unit=${unit}`).then(res => {
         const resp = res.body
         if (resp.code == 0) {
           this.loading = false
           this.userWalletBalance = resp.data.balance
         } else {
           console.log(resp.message)
         }
       })
     },
      // 接口数据 存币 抢币
     buyLockCoin(state) {
        // 判断是否登录
       if (this.isLogin) {
         if (state == 'buy') {
           if (!this.lockAmount) {
             this.$Message.error(this.$t('common.loginInfo'))
             return false
           }
           // console.log(this.coinInfo.lockMinimum, this.lockAmount, this.coinInfo.lockHighest)
          //  if (this.lockAmount < this.coinInfo.lockMinimum || this.lockAmount > this.coinInfo.lockHighest) {
          //    this.$Message.error('您输入的锁仓金额小于500最小值,或者大于5000000最大值，请重新输入')
          //    this.lockAmount = ''
          //    return false
          //  }
           const params = {}
           params['id'] = this.coinInfo.id ? this.coinInfo.id : '0'
           params['amount'] = this.lockAmount
           this.loadingButton = true
           this.$http.post(this.host + '/wallet/lockCoinWallet/buyLockCoin', params).then(res => {
             const resp = res.body
             if (resp.code == 0) {
               this.loadingButton = false
               this.$Message.success(resp.message)
               this.lockAmount = ''
               this.snapLines()
               this.getCoinBalance()
               this.getSaveDataList()
             } else {
               if (resp.message == '锁仓金额小于500最小值,或者大于5000000最大值') {
                 this.lockAmount = ''
                 this.loadingButton = false
                 return false
               }
               this.$Message.error(resp.message)
               this.loadingButton = false
             }
           })
         } else if (state == 'rush') {
           if (this.progressBar !== 0) {
             this.$Message.error(this.$t('common.fund.started'))
             return false
           }
           if (this.coinBalance < 0) {
             this.$Message.error(this.$t('common.fund.finished'))
             return false
           }
           if (!this.lockAdvance) {
             this.$Message.error(this.$t('common.loginInfo1'))
             return false
           }
           const params = {}
           params['id'] = 1
           params['amount'] = this.lockAdvance
           this.loadingButton = true
           this.$http.post(this.host + '/wallet/activity/lower-price/order', params).then(res => {
             const resp = res.body
             if (resp.code == 0) {
               this.loadingButton = false
               this.$Message.success(resp.message)
               this.lockAdvance = ''
               this.snapLines()
               this.getRobDataList()
             } else {
               this.$Message.error(resp.message)
               this.loadingButton = false
             }
           })
         }
       } else {
         this.$router.push('/login')
       }
     },
      // 数据列表 存币
     async getSaveDataList() {
       const params = getParamsSave(this.savePageNo)
       this.$http.post(this.host + '/wallet/lockCoinWallet/record', params).then(res => {
         const resp = res.body
         if (resp.code == 0) {
           this.loading = false
           this.saveMoneyList = resp.data
           this.totalElement = resp.total
           console.log(this.saveMoneyList)
         }
       })
     },
      /* 分页 存币*/
     previouspage(type) {
       console.log(this.savePageNo)
       if (type == 'save') {
         if (this.savePageNo == 1) {
           this.$Message.error(this.$t('uc.finance.record.nodata'))
         } else {
           this.savePageNo = this.savePageNo - 1
           this.getSaveDataList()
           console.log(this.savePageNo)
         }
       }
     },
     nextpage(type) {
       if (type == 'save') {
         this.savePageNo = this.savePageNo + 1
         this.getSaveDataList()
       }
     },
      /** *******抢币***********/
      // 币种详细信息 可抢币
     getCoinRob() {
       const id = 1
       this.$http.get(this.host + `/wallet/activity/lower-price/remain/${id ? 1 : ''}`).then(res => {
         const resp = res.body
         if (resp.code == 0) {
           this.loading = false
           this.coinBalance = resp.data.remain
           this.endtime = resp.data.startTime
           this.countdown()
           const name = this.$route.path
           if (name == '/fund') {
             if (this.coinBalance >= 0 && this.isLogin) {
               setTimeout(() => {
                 this.getCoinRob()
               }, 1000)
             }
           }
         } else {
           this.$Message.error(resp.message)
           return false
         }
       })
     },
      // 钱包余额和最多抢购额度 抢币
     snapLines() {
       const id = 1
       this.$http.get(this.host + `/wallet/activity/lower-price/wallet/result/${id ? 1 : ''}`).then(res => {
         const resp = res.body
         if (resp.code == 0) {
           this.loading = false
           this.balanceData = resp.data
           console.log(this.balanceData)
         } else {
           this.$Message.error(resp.message)
           return false
         }
       })
     },
      // 数据列表 抢币
     getRobDataList() {
       const id = 1
       this.$http.get(this.host + `/wallet/activity/lower-price/records/${id}`).then(res => {
         const resp = res.body
         if (resp.code == 0) {
           this.loading = false
           this.robMoneyList = resp.data
         }
       })
     },
     formatNumber(n) {
       n = n.toString()
       return n[1] ? n : '0' + n
     }
   },
   watch: {
     countdown() {
       if (this.isLogin) {
          // console.log(this.totalTime)
         if (this.progressBar == 0) {
           var iTime
           iTime = setTimeout(function() {
             this.countdown()
           }, 1000)
         }
       }
     }
   },
   mounted() {},
   computed: {
     isLogin: function() {
       return this.$store.getters.isLogin
     },
     member: function() {
       return this.$store.getters.member
     },
     lang: function() {
       return this.$store.state.lang
     },
      // 存币记录
     tableColumnsSave() {
       const self = this
       const arr = []
       arr.push({
         title: this.$t('common.fund.lockCoinUnit'),
         key: 'lockCoinUnit'
       })
       arr.push({
         title: this.$t('common.fund.lockCoinName'),
         key: 'lockCoinName'
       })
       arr.push({
         title: this.$t('common.fund.lockAmount'),
         key: 'lockAmount'
       })
       arr.push({
         title: this.$t('common.fund.lockCoinDay'),
         key: 'lockCoinDay'
       })
       arr.push({
         title: this.$t('common.fund.lockTime'),
         key: 'lockTime',
         render(h, params) {
           return h('span', {}, self.formatTime(params.row.lockTime))
         }
       })
       arr.push({
         title: this.$t('common.fund.unlockTime'),
         key: 'unlockTime',
         render(h, params) {
           return h('span', {}, self.formatTime(params.row.unlockTime))
         }
       })
       return arr
     },
      // 抢币记录
     tableColumnsRob() {
       const self = this
       const arr = []
       arr.push({
         title: this.$t('common.fund.lockCoinUnit'),
         key: 'saleCoin'
       })
       arr.push({
         title: this.$t('common.fund.transactionPrice'),
         key: 'transactionPrice'
       })
       arr.push({
         title: this.$t('common.fund.saleAmount'),
         key: 'saleAmount'
       })
       arr.push({
         title: this.$t('common.fund.actualSaleAmount'),
         key: 'actualSaleAmount',
         render(h, params) {
           return h('span', {}, params.row.actStatus == 'I' ? '' : params.row.actualSaleAmount)
         }
       })
       arr.push({
         title: this.$t('common.fund.airDropCoin'),
         key: 'airDropCoin'
       })
       arr.push({
         title: this.$t('common.fund.airDropAmount'),
         key: 'airDropAmount',
         render(h, params) {
           return h('span', {}, params.row.actStatus == 'I' ? '' : params.row.airDropAmount)
         }
       })
       arr.push({
         title: this.$t('common.fund.createTime'),
         key: 'createTime',
         render(h, params) {
           return h('span', {}, self.formatTime(params.row.createTime))
         }
       })
       arr.push({
         title: this.$t('common.fund.actStatus'),
         key: 'actStatus',
         render(h, params) {
           return h('span', {}, params.row.actStatus == 'I' ? this.$t('common.fund.lottery') : params.row.actStatus == 'S' ? this.$t('common.fund.successful') : this.$t('common.fund.error'))
         }
       })
       return arr
     }
   }
 }
</script>
<style scoped lang="scss">
#fund-box {
  padding-top: 8px;
  .fund-main {
    header {
      height: 955px;
      background: url("https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/banner2.png") 0 0 no-repeat;
      background-position: center;
      .header-notice {
        width: 420px;
        margin: 0 auto;
        padding-top: 500px;
        color: #EBEBEB;
        font-size: 16px;

        .header-title-text {
          float: left;
          display: inline-block;
          height: 55px;
          line-height: 55px;
        }

        .header-title-border {
          display: inline-block;
          width: 1px;
          height: 30px;
          background: #EBEBEB;
          margin: 13px 25px;
        }

        .notice-text {
          float: right;
          line-height: 28px;
        }
      }
    }
    .main {
      background: #101646;
      padding-bottom: 100px;
      .header-content {
        width: 800px;
        margin: 0 auto;
        position: relative;
        top: -140px;
      }
      .header-title {
        margin-bottom: 80px;
        span {
          display: inline-block;
          width: 140px;
          height: 20px;
          font-size: 18px;
          color: #45AAFF;
          line-height: 20px;
          text-align: center;
        }
        img {
          vertical-align: middle;
        }
      }
      .info {
        padding: 0 80px 0 45px;
        position: relative;
        span {
          color: #FEFFFF;
          font-size: 16px;
          display: inline-block;
          width: 110px;
          height: 45px;
          line-height: 45px;
        }
        .coinName {
          display: inline-block;
          line-height: 64px;
          position: absolute;
          right: 20px;
          top: 0;
        }
      }
      .info-text {
        height: 64px;
        color: #fff;
        line-height: 64px;
        text-align: right;
        padding-right: 101px;
      }
      .footer-info {
        text-align: right;
        padding-right: 100px;
        button {
          width: 555px;
          height: 64px;
          color: #fff;
          border: 0;
          border-radius: 0;
          font-size: 16px;
          text-align: center;
          background: #293872;
        }
      }
      section {
        margin: 0 auto;
        min-height: 400px;
        position: relative;
        .circle1 {
          width: 100px;
          height: 205px;
          border-radius: 0 205px 205px 0;
          background: radial-gradient(circle,rgba(31,49,188,1),rgba(87,184,240,1));
          position: absolute;
          top: -6%;
          left: -10px;
          opacity: 0.06;
        }
        .circle2 {
          width:100px;
          height:100px;
          background:radial-gradient(circle,rgba(31,49,188,1),rgba(87,184,240,1));
          opacity:0.06;
          border-radius:50%;
          position: absolute;
          top: -7%;
          right: 10%;
        }
        .circle3 {
          width:75px;
          height:75px;
          background:radial-gradient(circle,rgba(31,49,188,1),rgba(87,184,240,1));
          opacity:0.06;
          border-radius:50%;
          position: absolute;
          top: 33%;
          left: 17%;
        }
        .circle4 {
          width:110px;
          height:110px;
          background:radial-gradient(circle,rgba(31,49,188,1),rgba(87,184,240,1));
          opacity:0.06;
          border-radius:50%;
          position: absolute;
          top: 35%;
          right: 12%;
        }
        .circle5 {
           width:95px;
           height:95px;
           background:radial-gradient(circle,rgba(31,49,188,1),rgba(87,184,240,1));
           opacity:0.06;
           border-radius:50%;
           position: absolute;
           bottom: -8%;
           left: 8%;
         }
        .circle6 {
          width: 65px;
          height: 130px;
          border-radius: 130px 0 0 130px;
          background: radial-gradient(circle,rgba(31,49,188,1),rgba(87,184,240,1));
          position: absolute;
          bottom: -6%;
          right: -6px;
          opacity: 0.06;
        }
        .section-main {
          margin-bottom: 75px;
          .count-down {
            width: 875px;
            margin: 0 auto 130px;
            .count-title {
              text-align: center;
              font-size:48px;
              font-family:PingFangSC-Regular;
              font-weight:bold;
              color:rgba(69,170,255,1);
            }
            .count-icon {
              text-align: center;
              .icon {
                color: #3F7DA8;
                font-size: 35px;
              }
            }
            .count-time {
              text-align: center;
              margin-top: 20px;
              .time {
                font-size:54px;
                font-weight:bold;
                font-style:italic;
                color:rgba(69,170,255,1);
              }
              .margin {
                margin-left: 10px;
              }
              .margin1 {
                margin-left: 15px;
              }
              .day {
                font-size: 45px;
                color: #fff;
              }
            }
            .count-progress {
              text-align: center;
              margin: 75px auto 0;
              width: 875px;
            }
          }
          .purchase {
            text-align: center;
            width: 800px;
            margin: 0 auto;
          }
        }

        .activity-rules {
          width: 1200px;
          margin: 0 auto 75px;
          padding: 40px;
          .activity-top,
          .activity-bottom {
            .top-title {
              width: 875px;
              margin: 0 auto 74px;
              text-align: center;
              img {
                vertical-align: middle;
              }
              .title {
                font-size: 18px;
                color: #45AAFF;
                display: inline-block;
                text-align: center;
                width: 150px;
                line-height: 64px;
              }
            }
            .top-content {
              min-height: 357px;
              background: url("https://coinmany2.oss-cn-shanghai.aliyuncs.com/fund/border.png") 0 0 no-repeat;
              background-position: center;
              background-size: 100% 100%;
              padding: 54px 40px;
              display: flex;
              .top-left {
                flex: 6;
                margin-left: 80px;
                p {
                  font-size: 16px;
                  font-weight:400;
                  color:rgba(235,235,235,1);
                  line-height:48px;
                  .text1 {
                    color: #45AAFF;
                    font-size: 20px;
                  }
                  .text2 {
                    color: #45AAFF;
                    font-size: 18px;
                  }
                }
              }
              .top-border {
                display: inline-block;
                border: 1px dashed #3F7DA8;
                height: 195px;
              }
              .top-right {
                flex: 7;
                margin-left: 80px;
                p {
                  font-size: 16px;
                  font-weight:400;
                  color:rgba(235,235,235,1);
                  line-height:48px;
                  .text1 {
                    color: #45AAFF;
                    font-size: 20px;
                  }
                  .text2 {
                    color: #45AAFF;
                    font-size: 18px;
                  }
                }
              }
              .bottom-left {
                margin: 0 auto;
                p {
                  font-size:16px;
                  font-weight:400;
                  color:rgba(235,235,235,1);
                  line-height:48px;
                  .text3 {
                    color: #45AAFF;
                    font-size: 20px;
                  }
                }
              }
            }
          }
          .activity-bottom {
            margin-top: 150px;
          }
        }
      }
      footer {
        width: 1200px;
        min-height: 150px;
        margin: 100px auto 0;
        .record-list {
          .save-money,
          .save-purchase {
            text-align: center;
            margin-bottom: 100px;
            .save-title {
              color: #8090af;
              margin-bottom: 30px;
              .title {
                font-size: 18px;
                color: #45AAFF;
                display: inline-block;
                text-align: center;
                width: 150px;
                line-height: 64px;
              }
              img {
                vertical-align: middle;
              }
            }
          }
        }
      }
    }

  }
}
</style>
<style lang="scss">

  #fund-box {
    .ivu-input {
      width: 555px;
      height: 64px;
      color: #fff;
      font-size: 16px;
      border-radius: 0;
      padding-left: 15px;
      box-sizing: border-box;
      background: #101646;
      border: 1px solid rgba(63,125,168,1);
    }

    .ivu-progress-show-info .ivu-progress-outer {
      margin-right: -55px;
    }
    .ivu-progress-inner {
      height: 38px;
      background: #272D61;
      overflow: hidden;
      .ivu-progress-bg {
        height: 38px !important;
        background:linear-gradient(45deg, rgba(49, 107, 239, .6), rgba(20, 56, 240, .7));
      }
    }
    .ivu-progress-text {
      display: none;
    }
    .ivu-table-wrapper {
      position: initial !important;
      .ivu-table {
        &:before {
          background: #101646 !important;
        }
      }
    }
    .ivu-table {
      tr {
        &:last-child {
          td {
            border-bottom: 0;
          }
        }
      }
      td {
        background: #101646;
        border-bottom: 1px solid rgba(41,74,97,1) !important;
        &:last-child {
          border-right: 1px solid rgba(41,74,97,1);
        }
      }
      &:before {
        background: transparent;
      }
      .ivu-table-tip {
        border: 1px solid rgba(41,74,97,1);
        border-top: 0;
        td {
          background: #101646;
        }
      }
      th {
        border-bottom: 0;
      }
      table {
        table-layout: auto;
      }
      .ivu-table-header {
        height: 48px;
        line-height: 48px;
        border: 1px solid #294a61;
        th {
          background: #101646;
        }
      }
      .ivu-table-body {
        border: 1px solid #294A61;
        border-top: 0;
        border-bottom: 0;
      }
      .ivu-table-tip {
        tr {
          &:last-child {
            td {
              border-right: 0;
            }
          }
        }
      }
    }
    .save-money {
      .ivu-table {
        .ivu-table-header {
          th {
            &:first-child,
            &:last-child {
              text-align: center;
            }
          }
        }
        td {
          &:first-child,
          &:last-child {
            text-align: center;
          }
        }
      }
    }
    .save-purchase {
      .ivu-table {
        .ivu-table-header {
          th {
              text-align: center;
          }
        }
        td {
            text-align: center;
        }
      }
    }
    .page {
      text-align: right;
      margin-top: 20px;
      margin-bottom:20px;
      .ivu-page-next a{
        color:#fff;
      }
      .ivu-page-prev a{
        color:#fff;
      }

      .ivu-page-total {
        color: #8090AF;
      }
      .ivu-page-next, .ivu-page-prev {
        background: #111530;
        border: 1px solid #191f44;
        line-height: 25px;
      }

      .ivu-icon.ivu-icon-ios-arrow-left,
      .ivu-icon.ivu-icon-ios-arrow-right {
        color: #8090AF;
      }
      li.ivu-page-item.ivu-page-item-active {
        background: #111530;
        border: 1px solid #191f44;
        a {
          color: #8090AF;
        }
        &:hover {
          a {
            color: #8090AF;
          }
        }
      }
    }
    #fund-table {

      .ivu-table-wrapper {
        margin-right: 0;
        td {
          background: #111530;
        }
        .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
        .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
          background: #10122B;
        }
        .ivu-table-header {
          thead th {
            height: 50px;
            background: #191D3A;
          }
        }
        tbody.ivu-table-tbody .ivu-table-row td {
          background: #111530;
          &:last-child {
            text-align: left;
          }
        }
      }
    }
    .ivu-page-item {
      background: #111530;
      color: #8090AF;
      border: 1px solid #191f44;
    }
    .ivu-page-item:hover {
      color: #3399ff;
    }
  }

</style>
