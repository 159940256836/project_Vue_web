<template>
  <div class="content-wraps">
    <div class="containers" id="List">
      <div class="fiat">
        <div class="to_business">
          <p>{{$t('paper.legal')}}</p>
          <span>{{$t('paper.curren')}}</span>
          <a
            href="javascript:void(0)"
            @click="goBusiness"
          >
            {{$t('paper.become')}}
          </a>
          <!-- <router-link to="/identbusiness">成为商家</router-link> -->
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
          <div class="advantage">
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
      padding: 50px 0;
      .content {
        width: 100%;
        /*margin: 20px auto;*/
        /*-moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
        -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
        box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;*/
      }
      .advantage {
        /*-moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
        -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
        box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;*/
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
              border-bottom: 0;
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
          background: #fff;
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
              background: #fff;
            }
            &:after {
              background: #fff;
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
export default {
  data() {
    return {
      coins: [],
      activeMenuName: "coin-1"
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
    // this.activeMenuName = "coin-1";
    // this.$nextTick(function() {
    //   this.$refs.navMenu.updateActiveName();
    // });
    this.activeMenu();
  }
};
</script>
