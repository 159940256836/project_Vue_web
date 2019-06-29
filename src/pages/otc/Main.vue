<template>
  <div class="content-wraps">
    <div class="containers" id="List">
      <!--登陆之前-->
      <div
        class="fiat"
        v-if="!isLogin"
      >
        <div class="to_business">
          <p>{{ $t('paper.legal') }}</p>
          <span>{{ $t('paper.curren') }}</span>
          <a
            href="javascript:void(0)"
            @click="goBusiness"
          >
            {{ $t('paper.become') }}
          </a>
          <!-- <router-link to="/identbusiness">成为商家</router-link> -->
        </div>
      </div>
      <!--登录之后显示-->
      <div
        class="fiat-login"
        v-else
      >
        <div class="fiat-login-main">
          <div class="fiat-login-title">
            <div class="fiat-coin">
              <ul>
                <li
                  v-for="(item, index) in coinList"
                  :class = "active == index ? 'addclass' : ''"
                  @click='dowm(item.unit, index)'
                >
                  <span>●</span>
                  {{ item.unit }}
                </li>
              </ul>
            </div>
            <!--<img src="../../assets/images/fait/user.png" alt="">-->
          </div>
          <div class="fiat-login-title">
            <p>
              <!--当前等级认证-->
              <span>{{ $t('paper.level_certification') }}</span>
              <span>{{ currency.memLevel }}</span>
            </p>
            <p>
              <!--当前资产总估值-->
              <span>{{ $t('paper.total_asset_valuation') }}</span>
              <span>{{ currencyOtcCoin.balance + currencyOtcCoin.frozenBalance  }}</span>
            </p>
          </div>
          <div class="fiat-login-title">
            <p>
              <!--可用-->
              <span>{{ $t('paper.usable') }}</span>
              <span>{{ currencyOtcCoin.balance }}</span>
            </p>
            <p>
              <!--冻结-->
              <span>{{ $t('paper.freeze') }}</span>
              <span>{{ currencyOtcCoin.frozenBalance }}</span>
            </p>
          </div>
          <div class="fiat-login-title">
            <div class="login-title">
              <img
                src="../../assets/images/fait/tip.png"
                alt=""
              >
              <!--新手指南-->
              {{$t("footer.RecommendedCommission")}}
            </div>
            <!--发布广告-->
            <div class="fiat-title">
              <router-link to="/PublishAdver">
                <button>
                  {{ $t('nav.fabu') }}
                </button>
              </router-link>
            </div>
            <!--查看订单-->
            <div class="fiat-title-info">
              <router-link to="/order">
                <!--查看订单-->
                <button>
                  {{ $t('paper.viewOrder') }}
                </button>
              </router-link>
            </div>
          </div>
          <div class="fiat-login-title">
            <p>
              <!--总单数-->
              <span>{{ $t('paper.alwaysSingular') }}</span>
              <span>{{ currency.count }}</span>
            </p>
            <p>
              <!--完成率-->
              <span>{{ $t('paper.percentage') }}</span>
              <span>{{ currency.rate }}%</span>
            </p>
          </div>
          <!--<div class="fiat-login-title">
            <p>
              单次限额 &ndash;&gt;
              <span>{{ $t("new.Singlelimit") }}</span>
              <span>1</span>
            </p>
            <p>
              &lt;!&ndash; 今日交易金额 &ndash;&gt;
              <span>{{ $t("new.today") }}</span>
              <span>0</span>
            </p>
          </div>-->
        </div>
      </div>
      <div class="main-box">
        <div class="fiat-main">
          <div class="content">
            <Menu
              ref="navMenu"
              mode="horizontal"
              width="auto"
              :active-name="activeMenuName"
              @on-select="menuSelected"
              class='tradelist'
            >
              <MenuGroup>
                <template v-for="(coin, index) in coins">
                  <MenuItem :name="'coin-' + index">
                    {{ coin.unit }}
                  </MenuItem>
                </template>
              </MenuGroup>
            </Menu>
            <router-view></router-view>
          </div>
          <div
            class="advantage"
            v-if="!isLogin"
          >
            <ul>
              <li>
                <div class="image"><img src="../../assets/images/fait/price.png" alt=""></div>
                <div class="title">{{$t('paper.market')}}</div>
                <div class="content1">{{$t('paper.price')}}</div>
              </li>
              <li>
                <div class="image"><img src="../../assets/images/fait/poundage.png" alt=""></div>
                <div class="title">{{$t('paper.charge')}}</div>
                <div class="content1">{{$t('paper.users')}}</div>
              <li>
                <div class="image"><img src="../../assets/images/fait/instant.png" alt=""></div>
                <div class="title">{{$t('paper.instant')}}</div>
                <div class="content1">{{$t('paper.deal')}}</div>
              </li>
              <li>
                <div class="image"><img src="../../assets/images/fait/platedanbao.png" alt=""></div>
                <div class="title">{{$t('paper.plateform')}}</div>
                <div class="content1">{{$t('paper.save')}}</div>
              </li>
            </ul>
          </div>
          <div
            class="advantage"
            v-else
          >
            <p class="advantage-title">{{ $t('otc.myad.title') }}</p>
            <myAdvertising></myAdvertising>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-wraps {
  /*background-color: #fff;*/
  .containers {
    width: 100%;
    padding-top: 39px;
    /*margin: 20px 0;*/
    .fiat-login {
      background: #0e0e28;
      padding-top: 50px;
      .fiat-login-main {
        width: 1200px;
        height: 180px;
        background: #111530;
        margin: 21px auto 0;
        display: flex;
        .fiat-login-title {
          &:first-child {
            padding: 0;
          }
          padding: 25px 0;
          flex: 1;
          .fiat-coin {
            width: 170px;
            height: 180px;
            overflow-x: hidden;
            &::-webkit-scrollbar {
              width: 8px;  /*滚动条宽度*/
              height: 20px;  /*滚动条高度*/
            }

            /*定义滚动条轨道 内阴影+圆角*/
            &::-webkit-scrollbar-track {
              border-radius: 0;  /*滚动条的背景区域的圆角*/
              background-color: #131738;/*滚动条的背景颜色*/
            }

            /*定义滑块 内阴影+圆角*/
            &::-webkit-scrollbar-thumb {
              border-radius: 0;  /*滚动条的圆角*/
              background-color: #21254D;  /*滚动条的背景颜色*/
            }
            ul {
              padding: 25px 0;
              .addclass {
                background: #191D3A;
                color: #8090AF;
              }
              li {
                height: 40px;
                line-height: 40px;
                padding: 0 25px;
                font-weight: 600;
                cursor: pointer;

                span {
                  display: inline-block;
                  width: 40px;
                  padding-right: 8px;
                  text-align: right;
                }
                &:hover {
                  background: #191D3A;
                  color: #8090AF;
                }
              }
            }
          }
          .login-title {
            color: #8090AF;
            img {
              width: 16px;
              height: 16px;
              vertical-align:middle;
              margin: 0 5px 0 3px;
            }
          }
          .fiat-title {
            margin-top: 10px;
            button {
              cursor: pointer;
              color: #fff;
              width: 100px;
              height: 32px;
              background: transparent;
              border: 1px solid #282F4C;
            }
          }
          .fiat-title-info {
            margin-top: 10px;
            button {
              cursor: pointer;
              color: #fff;
              width: 100px;
              height: 32px;
              background: #5E6B89;
              border: 0;
              outline:none;
            }
          }
          img {
            margin-top: 30px;
          }
          p {
            height: 62px;
            color: #8090AF;
            span {
              width: 100%;
              display: inline-block;
              &:first-child {
                margin-bottom: 10px;
              }
            }
            &:last-child {
              margin-top: 10px;
            }
          }
        }
      }
    }
    .fiat {
    border-radius: 5px;
    height: 510px;
    /*background: url("../../assets/images/fiat_banner.jpg") no-repeat center center;*/
    background: url("../../assets/images/fait/fait-banner.png") no-repeat center center;
    /*background-size: 100%;*/
    display: flex; //flex布局
    justify-content: center; //使子项目水平居中
    align-items: center; //使子项目垂直居中
    .to_business {
      color: #fff;
      text-align: center;
      p {
        font-size: 55px;
        letter-spacing: 20px;
      }
      span {
        font-size: 20px;
        letter-spacing: 10px;
        display: block;
      }
      a {
        width: 220px;
        height: 45px;
        display: inline-block;
        font-size: 18px;
        line-height: 45px;
        margin-top: 20px;
        border: 1px solid #aaa;
        color: #fff;
        border-radius: 5px;
      }
    }
  }
  }
  .main-box {
    background: #0e0e28;
    .fiat-main {
      width: 1200px;
      margin: 0 auto;
      padding: 25px 0;
      .content {
        width: 100%;
        /*margin: 20px auto;*/
      }
      .advantage {
        .advantage-title {
          height: 60px;
          line-height: 60px;
          font-size: 20px;
          color: #fff;
        }
        ul {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 100px 0;
          li {
            width: 25%;
            list-style-type: none;
            min-height: 200px;
            div {
              text-align: center;
            }
            div.image {
              width: 70px;
              height: 115px;
              margin: 0 auto;
              img {
                margin-top: 30px;
              }
            }
            div.title {
              line-height: 30px;
              font-size: 16px;
              color: #fff;
            }
            div.content1 {
              padding: 20px 40px;
              line-height: 20px;
              font-size: 12px;
              color: #8090AF;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.content-wraps {
  .containers {
    .content {
      .ivu-menu-item-group-title {
        height: 20px;
      }
      .ivu-tabs-bar {
        border-bottom: none;
      }
      .ivu-tabs-nav-scroll {
        margin-top: 20px;
        height: 50px;
        background: #191D3A;
      }
      .ivu-menu-light {
        height: 55px;
        background: #191D3A;
      }
      .ivu-tabs-nav .ivu-tabs-tab {
        line-height: 34px;
        color: #fff;
      }
      .ivu-menu-horizontal .ivu-menu-item {
        margin: 0 20px;
        padding: 0;
      }
      ul.tradelist.ivu-menu.ivu-menu-light.ivu-menu-horizontal {
        &:after {
          background: none;
        }
        .ivu-menu-item-group {
          li.ivu-menu-item {
            border: none;
            color: #fff;
            &:hover {
              color: #3399ff;
              border-bottom: 0 !important;
            }
          }
          li.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
            color: #3399ff;
            border-bottom: 2px solid #3399ff;
            height: 35px;
          }
        }
      }
      .ivu-table-large td {
        height: 50px;
      }
      .ivu-table td, .ivu-table th {
        border: 0;
      }
      /*#list1 li:nth-of-type(odd){ background:#00ccff;*/
      /*#list1 li:nth-of-type(even){ background:#ffcc00;}*/
      &:nth-of-type(odd) {
        .ivu-table td {
          background: #111530;
          color: #fff;
        }
      }
      &:nth-of-type(even) {
        .ivu-table td {
          /*background: #fff;*/
          color: #fff;
        }
      }
      /*.ivu-table td {*/
      /*  background: #111530;*/
      /*}*/
      .nav-right.tradeCenter .list-content .ivu-tabs .ivu-tabs-tabpane {
        background: #0e0e28;
        .ivu-table-wrapper {
          .ivu-table {
            &:before {
              /*background: #fff;*/
            }
            &:after {
              /*background: #fff;*/
            }
          }
          .ivu-spin-fix {
            position: absolute;
            top: 1px;
            left: 1px;
            z-index: 8;
            width: 100%;
            height: 100%;
            background-color: rgba(14, 14, 40, .6);
          }
          /*.ivu-spin.ivu-spin-large.ivu-spin-fix {*/
          /*  border-color: #fff;*/
          /*}*/
        }
      }
    }
  }
}
</style>
<script>
import myAdvertising from "../../components/otc/MyAd";
export default {
  components: { myAdvertising },
  data() {
    return {
      coins: [],
      activeMenuName: "coin-1",
      //币种列表
      coinList: [],
      active : 0, // 默认样式
      coinName: '', // 币种
      coinName1: '', // 默认币种
      currency: {}, // 币种详情
      currencyOtcCoin: {},
    };
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    init() {
      this.$store.commit("navigate", "nav-otc");
      this.$http.post(this.host + this.api.otc.coin).then(response => {
        if (response.body.code == 0) {
          this.coins = response.body.data;
          this.$nextTick(function() {
            this.$refs.navMenu.updateActiveName();
          });
        }
      });
    },
    dowm(coin, index) {
      //将点击的元素的索引赋值给变量
      this.active = index
      this.coinName = coin
      // console.log(coin, index);
      this.currencyDetails(this.coinName)
    },
    // 币种信息
    findCoin() {
      // 获取币种
      this.$http.post(this.host + "/otc/coin/all").then(response => {
        let resp = response.body;
        if (resp.code == 0) {
          this.coinList = resp.data;
          this.coinName1 = this.coinList[0].unit
          // console.log(this.coinList, this.coinList[0].unit);
          this.currencyDetails(this.coinList[0].unit)
        }
      })
    },
    /*法币币种详情*/
    currencyDetails (coin, unit) {
      console.log(coin, unit);
      if (coin) {
        this.coinName1 = coin
      } else {
        this.coinName1 = unit
      }
      this.$http.get(this.host + "otc/coin/index?coin=" + this.coinName1).then(response => {
        let resp = response.body;
        if (resp.code == 0) {
          // console.log(resp);
          if (resp.data !== null) {
            this.currency = resp.data
          }
          if (this.currency.otcCoin !== null) {
            this.currencyOtcCoin = this.currency.otcCoin
          }
          // console.log(this.currency);
        }
      });
    },
    goBusiness() {
      if (this.isLogin) {
        this.$router.push({
          path: "/identbusiness"
        });
      } else {
        /*请先登录*/
        this.$Message.warning(this.$t('common.logintip'));
      }
    },
    menuSelected(menuName) {
      if (menuName.startsWith("coin")) {
        var coin = this.coins[menuName.split("-")[1]];
        this.$router.push("/otc/trade/" + coin.unit);
      } else {
        this.$router.push("/otc/" + menuName);
      }
    },
    activeMenu() {
      console.log(this.$route.params);
      let coin = this.$route.params[0] || "BC";
      coin = coin.toUpperCase();
      console.log(coin);
      switch (coin) {
        case "BTC":
         // this.activeMenuName = "coin-0";
         this.activeMenuName = "BTC";
          break;
        case "USDT":
         // this.activeMenuName = "coin-1";
          this.activeMenuName = "USDT";
          break;
        case "ETH":
        //  this.activeMenuName = "coin-2";
         this.activeMenuName = "ETH";
          break;
        case "BC":
          //  this.activeMenuName = "coin-2";
          this.activeMenuName = "BC";
          break;
        default:
        //  this.activeMenuName = "coin-1";
         this.activeMenuName = "USDT";
          break;
      }
      this.$nextTick(function() {
        this.$refs.navMenu.updateActiveName();
      });
    }
  },
  created: function() {
    this.init();
    this.findCoin()
    this.currencyDetails()
    // this.activeMenuName = "coin-1";
    // this.$nextTick(function() {
    //   this.$refs.navMenu.updateActiveName();
    // });
    this.activeMenu();
  }
};
</script>
