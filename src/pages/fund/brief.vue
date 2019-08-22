<template>
  <div class="brief-box">
    <div class="brief-header">
      <div class="brief-header-text0">
        <!--v-if="this.$store.getters.lang !== 'English'-->
        <header style="margin-right: -20px;" class="title-header">
          <p class="brief-header-text">
            <img v-if="$store.getters.lang !== 'English'" src="../../assets/img/brief/text.png">
            <img v-if="$store.getters.lang == 'English'" src="../../assets/img/brief/ying.png">
          </p>
          <router-link to="/exchange">
            <div :class="$store.getters.lang == 'English'?'briefHeaderButton1':'briefHeaderButton'">
              <p class="brief-header-button">
                {{ $t('common.fund.possess') }} BD >
              </p>
            </div>
          </router-link>
        </header>
        <div class="images">
          <!--<img style="margin-top: -160px" src="../../assets/img/brief/info.png">-->
        </div>
      </div>
    </div>
    <div class="brief-main">
      <div class="brief-content">
        <section>
          <div class="brief-info">
            <header>
              <img src="../../assets/img/brief/left.png">
              <span>{{ $t('common.fund.why') }} BD</span>
              <img src="../../assets/img/brief/right.png">
            </header>
            <div class="section-text">
              <!--BD是由币帝网全球专业站基金会发行的全球通用积分，BD基于区块链强大的技术、由BD全球顶级的开发人员设计并推出。BD是去中心化的数字资产，致力于构建行业产业发展及资源管理服务为一体的生态空间，可以在BD生态众多场景下使用并流通，目的是为了让用户可以在BD生态体系中享有更多的权益，打通BD生态产业服务。-->
              {{ $t('common.fund.brief') }}
            </div>
          </div>
          <div class="brief-distribution">
            <header>
              <img src="../../assets/img/brief/left.png">
              <!--发行分布情况-->
              <span>BD {{ $t('common.fund.distribution') }}</span>
              <img src="../../assets/img/brief/right.png">
            </header>
            <div class="distribution-info">
              <div class="distribution-left-top">
                <p>10%</p>
                <!--基金会运营，2022年释放共计1000万-->
                <p>{{ $t('common.fund.operation') }}</p>
                <p>{{ $t('common.fund.operation1') }}</p>
              </div>
              <div class="distribution-left-bottom">
                <p>15%</p>
                <!--部分早期股东购买。2022年释放，共计7500万-->
                <p>{{ $t('common.fund.operation2') }}</p>
              </div>
              <div class="brief-img"></div>
              <div class="brief-text-info">
                <!--发行总量5亿-->
                <p>{{ $t('common.fund.operation3') }}</p>
                <p>{{ $t('common.fund.operation4') }}</p>
              </div>
              <div :class="$store.getters.lang == 'English'?'distributionRightTop1':'distributionRightTop'">
                <p>20%</p>
                <!--团队激励，2022年开始逐年释 放2000万，共计2000万-->
                <p>{{ $t('common.fund.operation5') }}</p>
                <p>{{ $t('common.fund.operation6') }}</p>
              </div>
              <div :class="$store.getters.lang == 'English'?'distributionRightBottom1':'distributionRightBottom'">
                <p>55%</p>
                <!--用户奖励、生态建设及市场 营销活动，共计5500万-->
                <p>{{ $t('common.fund.operation7') }}</p>
                <p>{{ $t('common.fund.operation8') }}</p>
              </div>
            </div>
          </div>
          <div class="brief-value">
            <header>
              <img src="../../assets/img/brief/left.png">
              <!--BD价值-->
              <span>BD {{ $t('common.fund.value') }}</span>
              <img src="../../assets/img/brief/right.png">
            </header>
            <div class="value-info">
              <div class="value-box" v-for="(item, index) in textList">
                <img :src="item.img">
                <p>{{ $store.getters.lang == 'English'?item.title1:item.title }}</p>
                <p>{{ $store.getters.lang == 'English'?item.info1:item.info }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
var $ = require('jquery')
export default {
  components: {},
  data() {
    const self = this
    return {
      textList: [
        {
          img: require('../../assets/img/brief/jifen.png'),
          title: '积分',
          title1: 'integral',
          info: 'BD是BDW全球生态基于区块链发行和管理的积分系统，可在BDW内部以及BDW生态体系下的多场景中使用。',
          info1: 'BD is the integral system of BDW global ecology based on blockchain distribution and management, which can be used in multiple scenarios within BDW and under the BDW ecosystem.',
        },
        {
          img: require('../../assets/img/brief/zaiti.png'),
          title: '价值载体',
          title1: 'carriers of value',
          info: 'BD应用到BDW全球业务与全球生态系统的各类应用中，通过价值提升回馈平台用户，并反哺BDW平台与全球生态，具备成长性与无线的成长空间。',
          info1: 'BD is applied to all kinds of applications of BDW global business and global ecosystem. It rewards users of the platform through value promotion and feeds back BDW platform and global ecology, thus providing growth and wireless growth space.'
        },
        {
          img: require('../../assets/img/brief/zunxiang.png'),
          title: '尊享权益',
          title1: 'To enjoy the rights and interests',
          info: '持有者享受BDW全生态的相应权益，以及享受BDW持续回购销毁带来的稀缺性提升。',
          info1: 'The holder shall enjoy the corresponding interests of BDW is entire ecology, as well as the increased scarcity brought by BDW\'s continuous buyback destruction.'
        },
        {
          img: require('../../assets/img/brief/xiaohui.png'),
          title: '回购销毁',
          title1: 'Repurchase destroyed',
          info: 'BDW采取定期以市价回购流通的平台币，全球站收入的百分之二十将用于定期回购BD并销毁。',
          info1: 'BDW adopts regular repurchase of current nt dollars at market price, and 20% of global station income will be used for regular repurchase of BD and destruction.'
        },
        {
          img: require('../../assets/img/brief/gongying.png'),
          title: '共赢计划',
          title1: 'Win-win plan',
          info: '通过的深入的合作与合作伙伴一起推动行业的良性发展，互利互助，共赢市场。',
          info1: 'Through in-depth cooperation with partners to promote the benign development of the industry, mutual benefit and mutual assistance, win-win market.'
        },
        {
          img: require('../../assets/img/brief/quanyi.png'),
          title: '功能权益',
          title1: 'Function of the rights and interests',
          info: '邀请好友返佣权，可享受交易手续费优惠和获得子通证的赠送奖励。',
          info1: 'Invite friends to return commission right, can enjoy the discount of transaction fee and get the sub - card bonus.'
        }
      ]
    }
  },
  created() {
    // this.ScreenWidth()
  },
  methods: {
    // ScreenWidth() {
    //   if (screen.width < 950) {
    //     this.$router.push('/mobileTerminalBrief')
    //   }
    // }
  },
  watch: {},
  computed:{
    lang() {
      return this.$store.state.lang
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
  .brief-box {
      background: #101646;
      width: 100%;
      .brief-header {
        /*display: flex;*/
        height: 995px;
        .brief-header-text0 {
          position: relative;
          .images {
            width: 1200px;
            min-height: 1015px;
            background: url("../../assets/img/brief/info.png") no-repeat;
            background-size: cover;
            margin-top: -160px;
            float: right;
          }
          .title-header {
            min-height: 150px;
            position: absolute;
            left: 19%;
            top: 450px;
          }
          header {
            .brief-header-text {
              text-align: right;
              font-size:80px;
              font-family:'MF ShaoHua(Noncommercial)';
              font-weight:400;
              color:rgba(39,145,218,1);
            }
            .briefHeaderButton {
              min-width: 190px;
              height: 55px;
              border-radius: 5px;
              border: 1px solid #2791DA;
              line-height: 55px;
              float: left;
              margin-right: 13%;
              .brief-header-button {
                text-align: center;
                font-size: 20px;
                color: #2791DA;
              }
            }
            .briefHeaderButton1 {
              min-width: 190px;
              height: 55px;
              border-radius: 5px;
              border: 1px solid #2791DA;
              line-height: 55px;
              float: left;
              margin-right: 31%;
              .brief-header-button {
                text-align: center;
                font-size: 20px;
                color: #2791DA;
              }
            }
          }
        }
      }
      .brief-main {
        width: 1200px;
        margin: -140px auto;
        padding-bottom: 50px;

        .brief-content {
          min-height: 400px;
          section {
            .brief-info,
            .brief-distribution,
            .brief-value {
              header {
                text-align: center;
                height: 50px;
                line-height: 50px;
                img {
                  vertical-align: middle;
                }
                span {
                  display: inline-block;
                  min-width: 245px;
                  font-size:24px;
                  font-family:Microsoft YaHei;
                  font-weight:400;
                  color:rgba(39, 145, 218, 1);
                }
              }
            }
            .brief-info {
              .section-text {
                height: 182px;
                background: rgba(19, 26, 79, 1);
                box-shadow: 0 0 14px 0 rgba(51, 51, 51, .1);
                padding: 35px 44px;
                text-indent: 2em;
                color: #fff;
                line-height: 32px;
                font-size: 16px;
                margin-top: 60px;
              }
            }
            .brief-distribution {
              header {
                margin: 100px auto 60px;
              }
              .distribution-info {
                height: 720px;
                background: #131A4F;
                text-align: center;
                padding: 120px 0;
                position: relative;
                .brief-img {
                  height: 470px;
                  background: url("../../assets/img/brief/pc.png") no-repeat;
                  position: absolute;
                  left: 24%;
                  width: 53%;
                }
                .brief-text-info {
                  width: 98%;
                  position: absolute;
                  top: 46%;
                  p {
                    &:first-child {
                      font-size: 24px;
                      color: #fff;
                    }
                    &:last-child {
                      font-size: 50px;
                      color: #2791DA;
                      margin-top: 10px;
                    }
                  }
                }
                .distribution-left-top,
                .distribution-left-bottom,
                .distributionRightTop,
                .distributionRightTop1,
                .distributionRightBottom,
                .distributionRightBottom1 {
                  width: 220px;
                  font-size: 14px;
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  color: rgba(199, 195, 211, 1);
                  position: absolute;
                }
                .distribution-left-top {
                  left: 4.5%;
                  top: 35%;
                  text-align: right;
                }
                .distribution-left-bottom {
                  right: 29%;
                  top: 16%;
                  text-align: left;
                }
                .distributionRightTop {
                  left: 4.5%;
                  bottom: 21%;
                  text-align: right;
                }
                .distributionRightTop1 {
                  left: 4.5%;
                  bottom: 15%;
                  text-align: right;
                }
                .distributionRightBottom {
                  right: 5%;
                  bottom: 42%;
                  text-align: left;
                }
                .distributionRightBottom1 {
                  right: 5%;
                  bottom: 35%;
                  text-align: left;
                }
              }
            }
            .brief-value {
              header {
                margin: 100px auto 60px;
              }
              .value-info {
                height: 890px;
                background: #131A4F;
                padding: 95px 50px;
                margin-bottom: 180px;
                .value-box {
                  width: 310px;
                  min-height: 310px;
                  float: left;
                  text-align: center;
                  -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
                  margin-right: 85px;
                  img {
                    width: 98px;
                    height: 113px;
                  }
                  p {
                    &:nth-child(2) {
                      font-size:24px;
                      font-family:Microsoft YaHei;
                      font-weight:400;
                      color:rgba(255,255,255,1);
                      line-height:29px;
                      margin-top: 34px;
                    }
                    &:last-child {
                      font-size:14px;
                      font-family:Microsoft YaHei;
                      font-weight:400;
                      color:rgba(255,255,255,1);
                      line-height:29px;
                      margin-top: 24px;
                    }
                  }
                  &:nth-child(3),
                  &:nth-child(6) {
                    margin-right: 0;
                  }
                  &:nth-child(4),
                  &:nth-child(5),
                  &:nth-child(6) {
                    margin-top: 80px;
                  }
                }
              }
            }
          }
        }
      }
  }
  @media (min-width: 450px) and (max-width: 1255px) {
    .brief-box {
      .brief-header {
        .brief-header-text0 {
          .title-header {
            min-height: 150px;
            position: absolute;
            left: 40%;
            top: 105px;
          }
          header {
            .briefHeaderButton {
              min-width: 190px;
              height: 55px;
              border-radius: 5px;
              border: 1px solid #2791DA;
              line-height: 55px;
              float: none;
              margin-right: 0;
              text-align: center;
              .brief-header-button {
                text-align: center;
                font-size: 20px;
                color: #2791DA;
              }
            }
            .briefHeaderButton1 {
              min-width: 190px;
              height: 55px;
              border-radius: 5px;
              border: 1px solid #2791DA;
              line-height: 55px;
              float: left;
              margin-right: 31%;
              .brief-header-button {
                text-align: center;
                font-size: 20px;
                color: #2791DA;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss"></style>
