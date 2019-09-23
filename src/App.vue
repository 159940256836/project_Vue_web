<template>
  <div class="page-view">
    <header v-show="!$route.meta.hide">
      <div
              class="page-content"
                    :style = "{
      backgroundColor: $route.path==='/'? topBackgroundColor : '$mainNightBgColor'
      }"
      >
        <div class="time_download">
          <div class="netLogo">
            <router-link to="/">
              <div class="logo"></div>
            </router-link>
            <!-- <router-link to="/" ><img style="width: 100%;" src="./assets/images/logo2.png" alt=""></router-link> -->
          </div>
          <div class="nav" :class="locale == 'en' ? 'en' : ''">
            <!-- <router-link to="/">{{$t("header.index")}}</router-link> -->
            <router-link to="/exchange">{{$t("header.exchange")}}</router-link>
            <router-link to="/otc/trade/bc">{{$t("header.otc")}}</router-link>
            <!--<router-link to="/leverindex">{{$t("header.lever")}}</router-link>-->
            <router-link to="/Ieo">{{$t('header.asset')}}</router-link>
            <!-- <router-link to="/priceIeo">{{$t("header.priceIeo")}}</router-link> -->
            <!-- <router-link to="/help">帮助</router-link> -->
            <router-link to="/helpList">{{$t('header.help')}}</router-link>
            <router-link to="/notice">{{$t("header.service")}}</router-link>
            <router-link to="/fund">{{$t("header.fund")}}</router-link>
            <!--<router-link to="/mobileTerminalFund">移动{{$t("header.fund")}}</router-link>-->
          </div>
          <div class="nav-header">
            <!--中英文切换-->
            <div class="changelanguage">
              <Dropdown @on-click="changelanguage">
                <a href="javascript:void(0)" style="height: 50px;display: flex;align-items: center;">
                  <!-- {{languageValue}} -->
                  <img src="./assets/img/china.png" v-if="languageValue=='简体中文'" alt="">
                  <img src="./assets/img/flag.png" v-else alt="">
                </a>
                <DropdownMenu slot="list" id="change_language_theme">
                  <DropdownItem v-if="languageValue=='简体中文'" name="en" @click.native="lnswitch('cn')">
                    <img src="./assets/img/flag.png" alt="">
                    English
                  </DropdownItem>
                  <DropdownItem v-else name="cn" @click.native="lnswitch('en')">
                    <img src="./assets/img/china.png" alt="">
                    简体中文
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <!-- 登录 -->
            <!--:style="isLogin?'width:12%':'width:6%'"-->
            <div class="isLoginWrapper">
              <div class="login_register isLogin" v-if="isLogin">
                <div class="mymsg">
                  <router-link to="/order">{{$t("uc.order.myorder")}}</router-link>
                  <!-- <router-link to="/uc/safe">{{$t("uc.title")}}</router-link> -->
                </div>
                <!--@on-click="goBi"-->
                <Dropdown @on-click="goBi">
                  <a href="javascript:void(0)">
                    <span class="header-img">{{$t("uc.menuTitle.moneyManagement")}}</span>
                    <Icon type="ios-arrow-down" size="6" style="margin-left:6px;"/>
                  </a>
                  <DropdownMenu slot="list">
                    <!--个人资产-->
                    <DropdownItem name="moneyindex">
                      <span>{{$t("uc.finance.personalassets")}}</span>
                    </DropdownItem>
                    <!--资产流水-->
                    <DropdownItem name="record">
                      <span>{{ $t("uc.finance.billdetail") }}</span>
                    </DropdownItem>
                    <!--充币-->
                    <DropdownItem name="recharge">
                      <span>{{ $t("uc.finance.charge") }}</span>
                    </DropdownItem>
                    <!--提币-->
                    <DropdownItem name="withdraw">
                      <span>{{ $t("uc.finance.pickup") }}</span>
                    </DropdownItem>
                    <!--提币地址管理-->
                    <DropdownItem name="withdrawAddr">
                      <span>{{ $t("uc.finance.withdraw.addressmanager") }}</span>
                    </DropdownItem>
                    <!--积分管理-->
                    <DropdownItem name="mebjc">
                      <span>{{ $t("uc.finance.pointManagement") }}</span>
                    </DropdownItem>
                    <!--糖果赠送管理-->
                    <DropdownItem name="giveRecord">
                      <span>{{ $t("uc.finance.CandyGivingRecords") }}</span>
                    </DropdownItem>
                    <!--认购记录-->
                    <DropdownItem name="Ieoadmin">
                      <span>{{ $t("uc.finance.ieo") }}</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Dropdown>
                  <a href="javascript:void(0)">
                    <span class="header-img">{{strpo(member.username)}}</span>
                    <Icon type="ios-arrow-down" size="6" style="margin-left:6px;"/>
                  </a>
                  <DropdownMenu slot="list">
                    <!--账户管理-->
                    <DropdownItem>
                      <router-link to="/account">
                        {{$t("uc.menuTitle.AccountManagement")}}
                      </router-link>
                    </DropdownItem>
                    <!--我的推广-->
                    <DropdownItem>
                      <router-link to="/newMyExtension">
                        {{$t("apiAdmin.Mypromotion")}}
                      </router-link>
                    </DropdownItem>
                    <!--API管理-->
                    <DropdownItem>
                      <router-link to="/apiapimanagement">
                        {{$t("apiAdmin.APmanagement")}}
                      </router-link>
                    </DropdownItem>
                    <!--锁仓记录-->
                    <DropdownItem>
                      <router-link to="/LockRecord">
                        {{$t("uc.member.lockRecord")}}
                      </router-link>
                    </DropdownItem>
                    <!--账户安全管理记录-->
                    <DropdownItem>
                      <router-link to="/safetyRecords">
                        {{$t("uc.member.safetyrecords")}}
                      </router-link>
                    </DropdownItem>
                    <div @click="logout" style="text-align: left;padding-left: 10px;">
                      <DropdownItem>
                        {{$t("common.logout")}}
                      </DropdownItem>
                    </div>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownMenu slot="list" style="right: 80px">
                    <ul class="ul-notice" v-for="(item, index) in FAQList">
                      <router-link
                              :to="{path: '/notice/index', query: { 'id': item.id }}"
                      >
                        {{ item.title }}
                      </router-link>
                    </ul>
                    <router-link class="list-info" to="/notice">{{$t("otc.index.viewmore")}}</router-link>
                  </DropdownMenu>
                  <a href="javascript:void(0)" style="height: 50px;display: flex;align-items: center;">
                    <img src="./assets/img/notice.png" alt="">
                  </a>
                </Dropdown>
                <!-- <Dropdown>
                    <a href="javascript:void(0)" style="height: 60px;display: flex;align-items: center;">
                        <img src="./assets/img/set.png" alt="">
                    </a>
                </Dropdown> -->
              </div>
              <!-- 未登录 -->
              <div class="login_register" v-else>
                <router-link to="/login" id="login">{{$t("common.login")}}</router-link>
                <router-link to="/register" id="register">{{$t("common.register")}}</router-link>
              </div>
            </div>

            <!-- app二维码 -->
            <div class="rightwrapper">
              <poptip placement="bottom" class="appdownload">
                <a href="javascript:;" style="font-size:14px;">{{$t("header.appdownlaod")}}
                </a>
                <div class="api" slot="content" style="width:90%;">
                  <div class="ios">
                    <img src="../src/assets/images/app_qrcode.png" alt="">
                    <div class="tips">
                      <span>{{ $t('header.Scandownload') }}</span>
                    </div>
                  </div>
                </div>
              </poptip>
            </div>
            <!-- 红涨绿跌 -->
            <!-- <div class="set-main-style">
                <Dropdown @on-click="setTheme">
                    <a href="javascript:void(0)">
                        <span class="header-img">{{ $t('common.set') }}</span>
                        <Icon type="ios-arrow-down" size="6" style="margin-left:6px;"/>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="up" :class="setMain == 'up' ? 'set-chain' : ''">
                            <span>{{ $t('nav.xwzx1') }}</span>
                            <img v-if="setMain == 'up'" :src="setImg" >
                        </DropdownItem>
                        <DropdownItem name="down" :class="setMain == 'down' ? 'set-chain' : ''">
                            <span>{{ $t('nav.xwzx2') }}</span>
                            <img v-if="setMain == 'down'" :src="setImg" >
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div> -->
          </div>
        </div>
      </div>
    </header>
    <!--内容-->
    <router-view v-if="isRouterAlive"></router-view>
    <!--底部-->
    <footer class="app_footer" v-if="pathNameState" v-show="!$route.meta.hide">
      <div class="footer">
        <div class="footer_content">
          <div class="footer-main">
            <div class="footer_right">
              <!--下载支持-->
              <ul class="footer_info" :class="this.$store.getters.lang == 'English' ? 'margin10' : 'margin40'">
                <li class="footer_title">
                  <span>{{$t("footer.download")}}</span>
                </li>
                <li>
                  <!-- <router-link to="https://coinmany.github.io/">{{$t("footer.apiDoc")}}</router-link> -->
                  <!-- <a href="https://bdwtop.github.io/">{{$t("footer.apiDoc")}}</a> -->
                  <a href="https://bdwexchange.github.io/">{{$t("footer.apiDoc")}}</a>
                </li>
                <li>
                  <router-link to="/">{{$t("footer.appDownload")}}</router-link>
                </li>
                <!--<li>
                   <router-link to="/">{{$t("footer.otherDownload")}}</router-link>
               </li>-->

              </ul>
              <!--客户服务-->
              <ul class="footer_info" :class="this.$store.getters.lang == 'English' ? 'margin10' : 'margin40'">
                <li class="footer_title">
                  <span>{{$t("footer.helpCenter")}}</span>
                </li>
                <li>
                  <router-link to="/helplist?cate=0&cateTitle=使用教程">{{$t("footer.RecommendedCommission")}}</router-link>
                </li>
                <li>
                  <router-link to="/helplist?cate=1&cateTitle=常见问题">{{$t("footer.question")}}</router-link>
                </li>
                <li>
                  <router-link to="/Agreement">{{$t("footer.serviceArgee")}}</router-link>
                </li>
                <!-- 交易费率 -->
                <li>
                  <router-link to="/transactionCosts">{{$t("footer.transactionCosts")}}</router-link>
                </li>
                <li>
                  <router-link to="/brief">{{$t("header.brief")}}</router-link>
                </li>
              </ul>
              <!--投票上币-->
              <ul class="footer_info" :class="this.$store.getters.lang == 'English' ? 'margin10' : 'margin40'">
                <li class="footer_title">
                  <span>{{$t("footer.voteBi")}}</span>
                </li>
                <li class="wechatclick">
                  <router-link to="/">{{$t("footer.shallVote")}}</router-link>
                  <!--                                <poptip width="200">-->
                  <!--                                    <a href="javascript:;" class="wechat">客服邮箱</a>-->
                  <!--                                    &lt;!&ndash; <div slot="content">-->
                  <!--                                        <p style="color:#333;text-align:center;">service@bhuo.top</p>-->
                  <!--                                    </div> &ndash;&gt;-->
                  <!--                                </poptip>-->
                </li>
                <li>
                  <router-link to="/">{{$t("footer.coinApp")}}</router-link>
                </li>
                <li>
                  <router-link to="/">{{$t("footer.nodeCenter")}}</router-link>
                </li>
                <li>
                  <router-link to="/">{{$t("footer.nodeListenning")}}</router-link>
                </li>
              </ul>
              <!--其他-->
              <ul class="footer_info" :class="this.$store.getters.lang == 'English' ? 'margin10' : 'margin40'">
                <li class="footer_title">
                  <span>{{$t('footer.other')}}</span>
                </li>
                <li>
                  <router-link to="/notice">{{$t('footer.officeNotice')}}</router-link>
                </li>
                <!-- <li>
                    <router-link to="/">{{$t('footer.marketPlan')}}</router-link>
                </li>
                <li>
                    <router-link to="/">{{$t('footer.SubaccountManagement')}}</router-link>
                </li>
                <li>
                    <router-link to="/">{{$t('footer.questionnaire')}}</router-link>
                </li> -->
                <li>
                  <!-- 法律声明 -->
                  <router-link to="/law">{{$t('footer.Legaotices')}}</router-link>
                </li>
                <li>
                  <!-- 隐私协议 -->
                  <router-link to="/Privgreement">{{$t('footer.Privgreement')}}</router-link>
                </li>
                <li>
                  <!-- 用户协议 -->
                  <router-link to="/Usereement">{{$t('footer.Usereement')}}</router-link>
                </li>

              </ul>
              <!--联系我们-->
              <ul class="footer_info">
                <li class="footer_title">
                  <span>{{$t('footer.concatUs')}}</span>
                </li>
                <li>
                  <!--服务邮箱-->
                  <a href="javascript:;">{{$t('footer.email')}}：service@bdw.top</a>
                </li>
                <li>
                  <!--客服QQ-->
                  <p class="facebook4">
                    {{$t('footer.customerservice2')}}：3039059895
                    <span id="facebook4">
                                            <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/qq.jpg" alt="">
                                        </span>
                  </p>
                </li>
                <li>
                  <!--QQ群-->
                  <p class="facebook5">
                    {{$t('footer.customerservice1')}}：729045745
                    <span id="facebook5">
                                            <img src="https://coinmany2.oss-cn-shanghai.aliyuncs.com/qqgroup.png"
                                                 alt="">
                                        </span>
                  </p>
                </li>
                <li>
                  <!-- 微信客服号：客服1:biduokefu1 客服2:biduokefu2 -->
                  <!-- <p>
                      <span class="facebook3">
                           {{$t("footer.WeChatcustomervi")}}：biduokefu1
                          <span id="facebook3">
                              <img src="./assets/images/kefu.jpg" alt="">
                          </span>
                      </span>
                  </p> -->
                </li>

              </ul>
            </div>
            <div class="footer_left">
              <div class="foot_left_text">
                <img src="./assets/images/logo.png"></img>
<!--                <span>{{ $t('footer.platform') }}</span>-->
              </div>
              <div class="left-icon">
                <a href="http://www.service@bdw.top">
                  <img src="./assets/images/twitter.png" alt="">
                </a>
                <div class="qrcode">
                  <img src="./assets/images/facebook.png" alt="">
                  <div id="facebook"></div>
                </div>
                <div class="qrcode1">
                  <img src="./assets/images/telegram.png" alt="">
                  <div id="facebook1"></div>
                </div>
                <div class="qrcode2">
                  <img src="./assets/images/wechar.png" alt="">
                  <div id="facebook2">
                    <img src="./assets/images/wachar_qc.jpg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="footer-info">
               风险提示：区块链资产（数字货币和数字权益）交易具有极高的风险（技术缺陷、暴涨暴跌、庄家操控、团队解散等）, bdw仅为区块链资产的爱好者提供一个自由的网上交换平台, 对资产的投资价值不承担任何审查、担保、赔偿的责任, 如果您不能接受, 请谨慎交易。
           </div>-->
        </div>
        <div class="info">
          <div class="footer-info">
            <div class="info-title">{{$t('footer.friendLinks')}}:</div>
            <div class="info-img">
              <a href="https://rxcj.top/">
                <img src="./assets/images/footer/1.png" alt="">
              </a>
              <a href="https://hxcj123.com/">
                <img src="./assets/images/footer/2.png" alt="">
              </a>
              <a href="http://www.jinse.com">
                <img src="./assets/images/footer/3.png" alt="">
              </a>
              <a href="http://www.bishijie.com">
                <img src="./assets/images/footer/4.png" alt="">
              </a>
              <a href="http://www.iterduo.com">
                <img src="./assets/images/footer/5.png" alt="">
              </a>
              <a href="https://www.feixiaohao.com/exchange/bdw/">
                <img src="./assets/images/footer/6.png" alt="">
              </a>
              <a href="http://www.btc123.com">
                <img src="./assets/images/footer/7.png" alt="">
              </a>
              <a href="http://www.jiedian.io">
                <img src="./assets/images/footer/8.png" alt="">
              </a>
              <a href="http://ihuoqiu.com">
                <img src="./assets/images/footer/9.png" alt="">
              </a>
              <a href="http://www.huoxing24.com">
                <img src="./assets/images/footer/10.png" alt="">
              </a>
              <a href="http://www.zerohello.com">
                <img src="./assets/images/footer/11.png" alt="">
              </a>
              <a href="http://www.xnqb.com">
                <img src="./assets/images/footer/16.png" alt="">
              </a>
              <a href="http://www.block360.pro">
                <img src="./assets/images/footer/12.png" alt="">
              </a>
              <a href="http://www.shenliancaijing.com">
                <img src="./assets/images/footer/13.png" alt="">
              </a>
              <a href="http://huoxun.com">
                <img src="./assets/images/footer/14.png" alt="">
              </a>
              <a href="http://www.chaingeworld.com">
                <img src="./assets/images/footer/15.png" alt="">
              </a>
            </div>
          </div>
          © 2019 bdw.top. All Rights Reserved
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  var $ = require('jquery')
  import QRCode from 'qrcode2'
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import { Transform } from 'stream'

  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        setStyle: 'up',
        setImg: require('./assets/img/jiaobiao.png'),
        locale: '',
        isRouterAlive: true,
        pageView: 'page-view',
        utc: null,
        time: null,
        content: ' ',
        wechat: this.$t('footer.wechat'),
        topInfo: {
          name: 'bdw',
          createTime: '2018-01-10 11:37:27'
        },
        styleTop: 30,
        topPadding: '0 1.5%',
        topBackgroundColor: 'transparent',
        $mainNightBgColor: '#11132c',
        pathName: '',
        pathNameState: true,
        weChat1: false, // 微信客服1
        weChat2: false, // 微信客服2
        FAQList: [] // 公告
      }
    },
    watch: {
      activeNav: function(newVal) {
        switch (this.activeNav) {
          case 'nav-exchange':
            break
          default:
            window.document.title = 'bdw 投资者最信赖的数字资产增值平台'
            break
        }
      },
      '$i18n.locale'(newVal) {
        this.locale = newVal
      },
      $route(to, from) {
        //     console.log(to)
        //   this.pathName = to.path
        //   if (this.pathName == '/mobile/home') {
        //        this.$router.push('/')
        //   }
        if (this.pathName === '/login' || this.pathName === '/register') {
          this.pathNameState = false
        } else {
          this.pathNameState = true
        }

        if (to.path === '/') {
          this.pageView = 'page-view'
          // this.container_test = "";
        } else {
          $('.page-content').css({ 'background': '#11132c' })
          if (to.path.indexOf('exchange') > 0 && this.exchangeSkin === 'night') {
            this.pageView = 'page-view'
          } else {
            this.pageView = 'page-view2'
          }
          // this.container_test = "container_test";
        }
      },
      exchangeSkin() {
        if (this.exchangeSkin === 'day') {
          this.pageView = 'page-view2'
        } else {
          this.pageView = 'page-view'
        }
      }
    },
    computed: {
      setMain: function() {
        return this.$store.state.setMain
      },
      activeNav: function() {
        return this.$store.state.activeNav
      },
      isLogin: function() {
        return this.$store.getters.isLogin
      },
      member: function() {
        return this.$store.getters.member
      },
      languageValue: function() {
        var curlang = this.$store.getters.lang
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        if (curlang === 'English') this.$i18n.locale = 'en'
        return curlang
      },
      lang() {
        return this.$store.state.lang
      },
      exchangeSkin() {
        return this.$store.state.exchangeSkin
      }
    },
    created: function() {
      if (localStorage.getItem('SETSTYLE') == null) {
        this.setTheme(this.$store.commit('setMain', 'down'))
      } else {
        this.setTheme(this.$store.commit('setMain', localStorage.getItem('SETSTYLE')))
      }

      /* localStorage.setItem('SETSTYLE', JSON.stringify('down'))*/
      /** *
       * 获取公告
       */
      var result = JSON.parse(localStorage.getItem('result'))
      this.FAQList = result.content.slice(0, 5)
      // console.log(result, result.content, this.FAQList);
      this.initialize()
      if (this.$route.path === '/') {
        this.pageView = 'page-view'
      } else {
        this.pageView = 'page-view2'
      }
      this.$nextTick(() => {
        const link = 16604775806
        // eslint-disable-next-line no-unused-vars
        const weChat = 'biduokefu1'
        new QRCode(document.getElementById('facebook'), {
          text: link,
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff'
        })
        new QRCode(document.getElementById('facebook1'), {
          text: link,
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff'
        })
      })
    },
    methods: {
      // 切换涨跌样式颜色
      setTheme(name) {
        console.log(name)
        if (name === 'up') {
          this.setStyle = 'up'
          this.$store.commit('setMain', 'up')
        } else if (name === 'down') {
          this.setStyle = 'down'
          this.$store.commit('setMain', 'down')
        } else {
          if (!localStorage.getItem('SETSTYLE')) {
            localStorage.setItem('SETSTYLE', null)
          }
        }
      },
      lnswitch: function(language) {
        this.$http.get(this.host + '/uc/lang/change/' + language).then(res => {
        })
      },
      // header动画效果
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      },
      goBi(name) {
        switch (name) {
          case 'moneyindex':
            this.$router.push('/personal')
            break
          case 'record':
            this.$router.push('/personal/record')
            break
          case 'recharge':
            this.$router.push('/personal/recharge')
            break
          case 'withdraw':
            this.$router.push('/personal/withdraw')
            break
          case 'withdrawAddr':
            this.$router.push('/personal/withdrawAddr')
            break
          case 'mebjc':
            this.$router.push('/personal/bjc')
            break
          case 'giveRecord':
            this.$router.push('/personal/giveRecord')
            break
          case 'Ieoadmin':
            this.$router.push('/personal/Ieoadmin')
            break
        }
      },
      handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 0) {
          this.styleTop = 0
          // this.topPadding = '0 17%'
          this.topBackgroundColor = '#11132c'
        } else {
          this.styleTop = 30
          // this.topPadding = '0 1.5%'
          this.topBackgroundColor = 'transparent'
        }
      },
      strpo(str) {
        if (str.length > 4) {
          str = str.slice(0, 4) + '···'
        } else {
          str = str
        }
        return str
      },
      initialize() {
        this.$store.commit('navigate', 'nav-index')
        this.$store.commit('recoveryMember')
        this.$store.commit('initLang')
        this.loadTopInfo()
        this.checkLogin()
      },
      loadTopInfo() {
        const param = {}
        param['sysAdvertiseLocation'] = 2
        this.$http
            .post(this.host + '/uc/ancillary/system/advertise', param)
            .then(response => {
              var result = response.body
              if (result.code === 0 && result.data.length > 0) {
                this.topInfo = result.data[0]
              }
            })
      },
      logout() {
        this.$store.commit('setMember', null)
        localStorage.removeItem('TOKEN')
        setTimeout(() => {
          location.href = '/'
        }, 500)
        this.$http.post(this.host + '/uc/loginout', {}).then(response => {
          var resp = response.body
          if (resp.code === 0) {
            this.$Message.success(resp.message)
            this.$store.commit('setMember', null)
            localStorage.removeItem('TOKEN')
            setTimeout(() => {
              location.href = '/'
            }, 500)
          } else {
            this.$Message.error(resp.message)
          }
        })
      },
      checkLogin() {
        this.$http.post(this.host + '/uc/check/login', {}).then(response => {
          var result = response.body
          if (result.code === 0 && result.data === false) {
            this.$store.commit('setMember', null)
            localStorage.removeItem('TOKEN')
          }
        })
      },
      changelanguage: function(name) {
        if (name === 'en') {
          this.$store.commit('setlang', 'English')
          this.$i18n.locale = 'en'
        }
        if (name === 'cn') {
          this.$store.commit('setlang', '简体中文')
          this.$i18n.locale = 'zh'
        }
      },
      systemservice() {
        window.addEventListener('scroll', this.handleScroll);
        (function(a, h, c, b, f, g) {
          a['UdeskApiObject'] = f
          a[f] = a[f] || function() {
            (a[f].d = a[f].d || []).push(arguments)
          }
          g = h.createElement(c)
          g.async = 1
          g.charset = 'utf-8'
          g.src = b
          c = h.getElementsByTagName(c)[0]
          c.parentNode.insertBefore(g, c)
        })(window, document, 'script', 'https://assets-cli.s2.udesk.cn/im_client/js/udeskApi.js', 'ud')
        ud({
          'code': 'a35673e',
          'link': 'https://1589850.s2.udesk.cn/im_client/?web_plugin_id=9477'
        })
      }
    },
    mounted() {
      this.systemservice()
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
<style lang="scss" scoped>
  @import url(./assets/css/common.css);

  %flex {
    align-items: center;
  }

  .page-view {
    header {
      width: 100%;
      position: fixed;
      z-index: 999;
      // background-color: rgba(16,18,43,.3);
      transition: all .5s;

      .page-content {
        height: 50px;
        line-height: 50px;
        transition: all .5s;
        background-color: #11132c;
        padding-right: 30px;

        .time_download {
          align-items: center;
          overflow: hidden;
          min-width: 1100px;

          .netLogo {
            width: 150px;
            height: 50px;
            float: left;

            .logo {
              background: url("../src/assets/images/logo.png") no-repeat;
              width: 80%;
              height: 80%;
              margin-left: 30px;
              margin-top: 10px;
            }
          }
        }

        .nav.en a {
          margin-right: 20px;
        }

        .nav {
          float: left;
          margin-left: 42px;

          a {
            font-size: 14px;
            color: #FFFFFF;
            display: inline-block;
            margin-right: 45px;
            text-align: center;
            // &:nth-child(5) {
            //     padding-right: 19px;
            // }
          }

          a:hover {
            color: #D5382B;
            border-bottom: 1px solid #D5382B;
          }

          // a.router-link-exact-active.router-link-active {
          //     color: #2d8cf0;
          // }
          // 5.15修改
          a.router-link-active {
            color: #D5382B;
            border-bottom: 1px solid #D5382B;
          }
        }

        .nav-header {
          float: right;
          height: 50px;

          .isLoginWrapper {
            float: right;

            .login_register {
              display: flex;;
              .ivu-dropdown-item{
                a{
                  color:#333;
                }
              }
              a {
                color: #fff;
                margin: 0 20px 0 10px;
                font-size: 14px;

                .header-icon {
                  margin-left: 15px;
                }

                .header-img {
                  margin-left: 10px;
                }
              }

              .ul-notice {
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                max-width: 260px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                border-bottom:1px solid rgba(238,238,238,1);
                a {
                  min-width: 150px;
                  background: #fff;
                  padding: 15px;
                  color: #333;
                  font-size: 12px;
                  margin:0;
                }

                &:hover a {
                  color: #FE5C5C;
                }
              }

              .list-info {
                text-align: center;
                display: inline-block;
                margin: 0;
                padding: 0 0 0 15px;
                color: #FE5C5C;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
              }
            }
          }

          .set-main-style {
            float: right;
            min-width: 50px;
            height: 50px;
            cursor: pointer;
            color: #8090af;
            margin-right: 20px;

            .set-chain {
              /*background: #3399ff;*/
              color: #3399ff;
            }
          }

          .rightwrapper {
            float: right;

            .appdownload {
              float: left;
              padding-right: 30px;

              .ivu-poptip-rel {
                a {
                  color: #fff;
                }

                i.ivu-icon.ivu-icon-arrow-down-b {
                  margin-left: 5px;
                }
              }
            }

            .ios,
            .andrio {
              float: left;
              text-align: center;

              img {
                width: 115px;
                height: 110px;
                margin: 0 auto;
              }

              .tips {
                // height: 30px;
                img {
                  width: 14px;
                  height: 14px;
                  margin-top: 5px;
                }

                span {
                  font-size: 14px;
                }
              }
            }

            .andrio {
              float: right;
            }

            .ivu-dropdown-rel a {
              color: #8090AF;
              font-size: 7px;
            }

            .ivu-select-dropdown {
              /*background: #10122B;*/
              z-index: 901;

              #change_language_theme {
                li {
                  background: transparent;
                  color: #3399ff;
                }
              }
            }
          }

          .changelanguage {
            float: right;
            /*width: 7%;*/
            justify-content: flex-end;

            #change_language_theme .ivu-dropdown-item {
              font-size: 14px !important;
              color: #333;
            }
          }
        }
      }
    }
  }

  .wechatclick .api2 {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      img {
        width: 100px;
      }

      span {
        display: block;
        color: #333;
        text-align: center;
      }
    }
  }
</style>
<style lang="scss">
  /*@import '../src/styles/style';*/

  ul, li {
    list-style-type: none;
  }

  .container_test {
    padding-top: 60px;
  }

  /* 多选框 */
  .exchange .ivu-checkbox-checked .ivu-checkbox-inner {
    background-color: #3399ff;
    border-color: #3399ff;
  }

  /* modal */
  .ivu-modal-confirm-head {
    text-align: center;
    margin-bottom: 15px;
  }

  .ivu-tabs-nav-container:focus .ivu-tabs-tab-focused {
    border-color: #FE5C5C !important;
  }

  .ivu-modal-body {
    line-height: 25px;
    border-radius: 5px;

    .ivu-modal-confirm {
      .ivu-modal-confirm-body.ivu-modal-confirm-body-render {
        .ivu-input-number {
          &:hover {
            border-color: #3399ff;
          }

          &:focus {
            border-color: #3399ff;
            -moz-box-shadow: none;
            -webkit-box-shadow: none;
            box-shadow: none;
          }
        }

        .ivu-input-number.ivu-input-number-focused {
          border-color: #FE5C5C;
          -moz-box-shadow: none;
          -webkit-box-shadow: none;
          box-shadow: none;
        }
      }

      .ivu-modal-confirm-body {
        font-size: 14px;
      }
    }
  }

  .ivu-table-tip {
    height: 180px;
    line-height: 180px;
  }
  .ivu-modal-confirm-footer .ivu-btn-primary {
    background-color: #FE5C5C;
    border-color: #FE5C5C;
  }

  .ivu-modal-confirm-footer .ivu-btn-text {
    &:hover {
      color: #3399ff;
    }
  }

  .ivu-modal-confirm-footer {
    .ivu-btn {
      &:focus {
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
      }
    }
  }

  .ivu-table-wrapper {
    margin-right: -1px;

    .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
    .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
      background: #fff;
    }

    .ivu-table {
      &:before {
        /*background: #fff;*/
      }

      &:after {
        /*background: #fff;*/
      }

      .ivu-table-header {
        th {
          background-color: #f4f6f8;
          color: #666666;
        }
      }

      td {
        color: #333;
        border-bottom: 0 !important;
      }
    }
  }

  #page2 {
    .ivu-table-wrapper {
      .ivu-table {
        .ivu-table-row {
          &:nth-of-type(odd) {
            /*background: #fff;*/
            td {
              /*background: #fff;*/
            }
          }

          &:nth-of-type(even) {
            td {
              /*background: ;*/
            }

            background: #fafafd;
          }
        }

        /*.ivu-table-row td {*/
        /*    border-color: #eee;*/
        /*}*/
      }
    }
  }

  .order-table {
    .ivu-table-wrapper {
      .ivu-table {
        &:before {
          background: transparent;
        }

        &:after {
          background: transparent;
        }

        .ivu-table-header {
          th {
            background-color: #fff;
          }
        }

        .ivu-table-row td {
          background-color: #f4f6f8;
          border-bottom: 0;
        }
      }
    }
  }

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: none;

    &:after {
      background: none;
    }
  }

  .ivu-select-dropdown .ivu-select-item {
    padding: 6px 16px;

    &:hover {
      background: #fff;
      color: #D5382B;
    }
  }

  .ivu-select-dropdown
  li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
    /*background: #fff;*/
    color: rgb(254, 92, 92);
  }

  .ivu-select-dropdown {
    /*background: #10122B;*/
    .ivu-dropdown-item {
      color: #333;
      font-size: 14px !important;

      &:hover {
        background: transparent;
        color: #3399ff;
      }
    }
  }

  .page-view {
    .page-content {
      .layout {
        .layout-ceiling {
          .layout-ceiling-main {
            .header_nav {
              .ivu-menu-vertical.ivu-menu-light {
                .ivu-menu-submenu-title {
                  i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
                    &:before {
                      content: "";
                    }
                  }
                }
              }
            }

            .rr {
              .login_register .ivu-menu-submenu-title .ivu-icon {
                &:before {
                  content: "";
                }
              }
            }
          }
        }
      }
    }
  }

  .page-view2 {
    .page-content {
      .layout {
        .layout-ceiling {
          .layout-ceiling-main {
            .header_nav {
              .ivu-menu-vertical.ivu-menu-light {
                .ivu-menu-submenu-title {
                  i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
                    &:before {
                      content: "";
                    }
                  }
                }
              }
            }

            .rr {
              .login_register .ivu-menu-submenu-title .ivu-icon {
                &:before {
                  content: "";
                }
              }
            }
          }
        }
      }
    }
  }

  html {
    height: 100%;
    margin: 0;
    padding: 0;
    background: transparent !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 14px;
    background: #fff;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  /*自定义滚动条样式*/
  ::-webkit-scrollbar {
    width: 10px;
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    background: #e6e6e6;
    border-radius: 25px;
  }

  .ivu-carousel-dots li button {
    width: 40px;
    height: 3px;
    border-radius: 14px;
    background: #3399ff;
  }

  .ivu-menu-dark,
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #18202a;
  }

  #checkbox {
    width: 10px;
  }

  // .login_right {
  //   position: absolute;
  //   background: #fff;
  //   width: 350px;
  //   height: 510px;
  //   top: 35px;
  //   right: 50px;
  // }

  .login_title {
    color: #000000;
    height: 80px;
    font-size: 22px;
    line-height: 80px;
  }

  .login_right .ivu-select-dropdown {
    /*background: #fff;*/
  }

  .ivu-form-inline .ivu-form-item {
    display: block;
    margin-right: 0;
  }

  .layout {
    position: absolute;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-ceiling-main {
    height: 50px;
    line-height: 50px;
    margin-left: 128px;
  }

  .layout-ceiling-main .rr {
    float: right;
  }

  // .layout-ceiling-main .ivu-menu-vertical .ivu-menu-item,
  // .ivu-menu-vertical .ivu-menu-submenu-title {
  //      padding: 0;
  // }

  .layout-ceiling-main .ivu-menu-item {
    font-size: 14px;
  }

  .layout-ceiling-main a {
    color: #fff;
    display: inline-block;
    line-height: 40px;
    height: 40px;
    text-align: center;
    margin-left: 38px;
    /*padding: 0 15px;*/
  }

  .header_nav {
    float: left;
  }

  .ivu-dropdown-rel a {
    width: 100%;
  }

  .ivu-dropdown-menu {
    min-width: 100px;
    /*max-width: 200px;*/
    /*padding-right: 20px;*/
    white-space: nowrap;
  }

  .layout-ceiling-main .ivu-select-dropdown {
    /*background: #10122B;*/
    margin-left: 25px;

    .ivu-dropdown-item {
      color: #8090AF;
    }
  }

  .ivu-select-dropdown a {
    width: 100%;
    text-align: left;
    margin: 0;
  }

  .ivu-dropdown-item:hover {
    background: #ffffff;
  }


  .ivu-dropdown-item img {
    width: 14px;
    vertical-align: middle;
  }

  .ivu-radio-inner:after {
    background: #18202a;
  }

  /*安全中心*/

  .user_center {
    height: 900px;
  }

  .ivu-menu-item {
    text-align: center;
  }

  .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding-left: 0 !important;
    padding-right: 0;
    color: #fff;
    font-size: 14px;
    border-right: 0 !important;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #1855fd !important;
  }

  .rr .ivu-menu-vertical.ivu-menu-light:after {
    width: 0;
  }

  .layout_menu_right {
    margin-left: 3%;
    background: #18202a;
    color: #fff;
    padding-bottom: 130px;
  }

  .menu_right_title {
    font-size: 16px;
    line-height: 45px;
    margin: 0 10px;
    padding-left: 20px;
    border-bottom: 1px solid #263142;
  }

  .category .ivu-radio-group.ivu-radio-group-button {
    width: 100%;
  }

  .category .ivu-radio-group label {
    font-size: 14px;
  }

  .category .ivu-radio-group-button .ivu-radio-wrapper {
    background: #28313e;
    color: #979797;
    border: 0;
    padding: 0 25px;
  }

  .category .ivu-radio-group-button .ivu-radio-wrapper-checked {
    color: #fff;
    background: #2f3d52;
    box-shadow: none;
  }

  .category .ivu-radio-wrapper span {
    padding-left: 0;
  }

  .purse_address_left {
    float: left;
    width: 86%;
  }

  .purse_address p {
    font-size: 10px;
    line-height: 25px;
    color: #979797;
  }

  .purse_address_left_icon {
    line-height: 40px;
    height: 40px;
    width: 100%;
  }

  .purse_address_left_icon img {
    vertical-align: middle;
    margin-right: 10px;
  }

  .purse_address span {
    font-size: 14px;
    float: left;
    color: #fff;
    padding: 0 20px;
    background: #28313e;
    width: 21%;
  }

  .purse_address_left_icon label {
    float: left;
    width: 72%;
    height: 40px;
    border: 2px solid #28313e;
    padding-left: 20px;
  }

  #qrcode canvas {
    width: 120px;
  }

  #qrcode img {
    width: 100%;
  }

  /*.ivu-select-item:hover {*/
  /*    background: #aaa;*/
  /*}*/

  /*.ivu-select-item-selected,*/
  /*.ivu-select-item-selected:hover {*/
  /*    background: #aaa;*/
  /*}*/

  .chart_container #chart_updated_time {
    float: left;
  }

  // 粘住底部布局
  // .page-content {
  //     min-height: 100%;
  //     padding-bottom: 200px;
  // }

  .footer {
    min-width: 1260px;
    padding-top: 1px;
    // 6.25修改  lhl
    color: #8090AF;
    background: #0A1928;

    .footer_content {
      width: 1200px;
      margin: 60px auto 30px;

      .footer-main {
        height: 150px;

        .footer_left {
          float: right;
          font-size: 14px;
          width: 200px;

          .foot_left_text {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            font-size: 16px;
            float: right;

            img {
              float: right;
              margin: 0;
            }

            span {
              width: 280px;
              margin-left: 15px;
              color: #8790a1;
            }
          }

          p {
            margin: 10px 0;
            color: rgba(255, 255, 255, 0.6);
          }

          .left-icon {
            width: 160px;
            height: 36px;
            float: right;
            a, div {
              margin-left: 10px;
              font-size: 14px;
              color: #fff;
              float: left;
            }

            .qrcode {
              cursor: pointer;
              position: relative;

              #facebook {
                background: #eee;
                position: absolute;
                top: -125px;
                left: 0;
                display: none;
                z-index: 9;
                width: 120px;
                height: 120px;
                text-align: center;
                padding: 10px;
              }
            }

            .qrcode1 {
              cursor: pointer;
              position: relative;

              #facebook1 {
                background: #eee;
                position: absolute;
                top: -125px;
                left: 0;
                display: none;
                z-index: 9;
                width: 120px;
                height: 120px;
                text-align: center;
                padding: 10px;
              }
            }

            .qrcode2 {
              cursor: pointer;
              position: relative;

              #facebook2 {
                position: absolute;
                top: -125px;
                left: 0;
                display: none;
                z-index: 9;
                width: 126px;
                text-align: center;
                padding: 0 13px;

                img {
                  width: 120px;
                }
              }
            }

            .qrcode:hover #facebook {
              display: block;
            }

            .qrcode1:hover #facebook1 {
              display: block;
            }

            .qrcode2:hover #facebook2 {
              display: block;
            }
          }
        }

        .footer_right {
          float: left;
          text-align: left;

          ul {
            float: left;
          }

          .margin10 {
            cursor: pointer;
            margin: 0 10px 0 0;
          }

          .margin40 {
            margin: 0 50px 0 0;
          }

          .footer_info {
            .footer_title {

              height: 35px;
            }

            li {
              &:first-child {
                span {
                  font-size: 16px;
                  display: block;
                  color: #fff;
                }
              }
              a {
                line-height: 26px;
                font-size: 14px;
                color: #cccccc;
              }
            }
            .facebook4,
            .facebook5 {
              color: #cccccc;
            }
            .facebook3,
            .facebook4,
            .facebook5 {
              cursor: pointer;
              position: relative;

              #facebook3,
              #facebook4,
              #facebook5 {
                position: absolute;
                top: -135px;
                left: 85px;
                display: none;
                z-index: 9;
                text-align: center;
                padding: 13px 13px;

                img {
                  width: 120px;
                }
              }

              #facebook4,
              #facebook5 {
                top: -180px;
              }
            }

            .facebook3:hover #facebook3 {
              display: block;
            }

            .facebook4:hover #facebook4 {
              display: block;
            }

            .facebook5:hover #facebook5 {
              top: -135px;
              display: block;
            }
          }
        }
      }

    }

    .info {
      text-align: center;
      width: 100%;
      border-top: 1px solid #8790a1;
      line-height: 60px;
      font-size: 15px;
      color: #cccccc;

      .footer-info {
        width: 1200px;
        margin: 20px auto 0;
        display: flex;

        .info-title {
          flex: 1;
          margin-right: 20px;
          text-align: left;
          line-height: 45px;
          color: #fff;
        }

        .info-img {
          text-align: left;
          flex: 15;

          a {
            width: 125px;
            height: 40px;
            display: inline-block;
            float: left;
            margin-right: 15px;

            &:nth-child(8),
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }

  .ivu-select-selected-value {
    color: #bbbec4;
  }

  /*法币交易*/

  .ivu-col {
    text-align: center;
  }

  .page-view {
    .page-content {
      .layout {
        .layout-ceiling {
          .rr {
            .login_register {
              .ivu-menu-light.ivu-menu-vertical
              .ivu-menu-item-active:not(.ivu-menu-submenu) {
                color: #fff;
              }
            }

            .isLogin {
              .mymsg {
                a {
                  font-size: 7px;
                }
              }

              .ivu-dropdown {
                display: inline-block;

                .ivu-select-dropdown {
                  padding: 0;
                  margin: 0;

                  .ivu-dropdown-menu {
                    .ivu-dropdown-item {
                      /*background: #fff;*/
                      color: #000;
                      border-radius: 5px;

                      &:hover {
                        /*background: #fff;*/
                        color: #000;
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
  }

  .changelanguage {
    .ivu-dropdown {
      .ivu-select-dropdown {
        z-index: 901;
      }
    }
  }

  // 重置分页器颜色
  .ivu-page-item-active {
    background-color: #3399ff;
    border-color: #3399ff;
    color: #fff;
  }

  .ivu-page-next:hover,
  .ivu-page-prev:hover {
    border-color: #3399ff;
  }

  .ivu-page-next:hover a,
  .ivu-page-prev:hover a {
    color: #3399ff;
  }

  .ivu-page-item-jump-prev a,
  .ivu-page-item-jump-next a {
    color: #666;
  }

  .ivu-page-item-jump-prev a:hover,
  .ivu-page-item-jump-next a:hover {
    color: #3399ff;
  }

  .ivu-page-item:hover {
    border-color: #3399ff;
  }

  .ivu-page-item:hover a {
    color: #3399ff;
  }

  .ivu-page-item.ivu-page-item-active a {
    color: #333;
    font-weight: bold;
  }

  .ivu-page-disabled {
    a {
      cursor: not-allowed;

      .ivu-icon {
        cursor: not-allowed;
      }
    }
  }

  /*input框样式重置*/
  .ivu-input {
    &:hover {
      border-color: #3399ff;
    }

    &:focus {
      border-color: #3399ff;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }

  /*下拉框样式重置*/
  .ivu-select-selection:hover {
    border-color: #3399ff;
  }

  .ivu-select-visible .ivu-select-selection {
    border-color: #3399ff;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .ivu-select-selected-value {
    color: #333;
  }

  .ivu-select-selection-focused {
    border-color: #3399ff;
  }

  /*table组件样式重置*/
  .ivu-table-wrapper {
    border: none;
  }

  .ivu-table-wrapper > .ivu-spin-fix {
    border: 0;
    background-color: rgba(255, 255, 255, .1);
    border-color: #fff;
  }

  /*加载样式重置*/
  .ivu-spin-dot {
    background: #3399ff;
  }

  .ivu-tabs-bar {
    border-color: #f5f5f5;
  }

  /*日期组件样式重置*/
  .ivu-picker-panel-icon-btn {
    color: #8090AF;

    &:hover {
      color: #3399ff;
    }
  }

  .ivu-date-picker-with-range {
    .ivu-picker-panel-body {
      .ivu-date-picker-header {
        border-bottom: 1px solid #8090AF;

        span {
          color: #8090AF;
        }
      }

      .ivu-date-picker-cells {
        span {
          em {

          }
        }
      }

      .ivu-date-picker-cells-header {
        span {
          color: #8090AF;
        }
      }
    }
  }

  .ivu-date-picker-cells-focused em {
    -moz-box-shadow: 0 0 0 1px #3399ff inset;
    -webkit-box-shadow: 0 0 0 1px #3399ff inset;
    box-shadow: 0 0 0 1px #3399ff inset;

    &:after {
      background: #3399ff;
    }
  }

  .ivu-date-picker-cells-cell-selected em,
  .ivu-date-picker-cells-cell-selected:hover em {
    background: #E62B25;
  }

  .ivu-date-picker-cells-cell-today em:after {
    background: #E62B25;
  }

  /*.ivu-date-picker-cells-cell-range:before {*/
  /*    background: rgba(240, 167, 10, 0.2);*/
  /*}*/
  .ivu-date-picker-cells-cell:hover em {
    background: #E62B25;
    color: #fff;
  }

  /*按钮样式重置*/
  .ivu-btn-primary:hover {
    background-color: #FE5C5C;
    border-color: #FE5C5C;
  }

  /*radio样式重置*/
  .ivu-radio-checked .ivu-radio-inner {
    border-color: #3399ff;
  }

  .ivu-radio-checked:hover {
    .ivu-radio-inner {
      border-color: #3399ff;
    }
  }

  .ivu-radio-inner:after {
    background: #3399ff;
  }

  .ivu-switch-checked {
    border-color: #3399ff;
    background-color: #3399ff;
  }

  .ivu-switch:focus {
    box-shadow: none;
  }

  .ivu-radio-focus {
    box-shadow: none;
  }

  /*下拉框*/
  .ivu-select-item-selected {
    /*background: #fff;*/
    color: #3399ff;
  }

  // primary按钮
  .ivu-btn-primary {
    background-color: #FE5C5C;
    border-color: #FE5C5C;
  }

  .ivu-btn-text:hover {
    color: #3399ff;
  }

  // .ivu-btn:hover{
  //     color: #3399ff;
  //     background-color: #fff;
  //     border-color: #3399ff;
  // }

  /*排序小箭头样式重置*/
  .ivu-table-sort i.on {
    color: #FE5C5C;
  }

  .ivu-table-sort i:hover {
    color: #FE5C5C;
  }

  //修改iview样式
  .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: not specified
  }

  .ivu-menu-opened > * > .ivu-menu-submenu-title-icon {
    color: #fff;
  }

  .ivu-notice,
  .ivu-message {
    top: 20% !important;
  }

  //修改placeholder字体颜色
  .ivu-input::-webkit-input-placeholder {
    color: #CCCCCC;
  }
</style>
