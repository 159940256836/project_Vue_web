<template>
  <div id="fund-box">
    <div class="fund-main">
      <header></header>
      <div class="main">
        <div class="header-info">
          <div class="header-banner">
            <p class="time-div">活动时间</p>
            <span class="border-banner"></span>
            <div class="banner-new">
              <p>存TD - 8月15日10:00 至 8月20日20:00</p>
              <p>抢购BTC - 8月20日21:00</p>
            </div>
          </div>
          <div class="header-main">
            <div class="header-content">
              <p class="title">存币</p>
              <div class="info">
                <div class="info-input">
                  <span>存币数量</span>
                  <p class="lock-sum">
                    <span>可用余额</span>:
                    <span>{{ userWallet.balance? userWallet.balance: '--' }}&nbsp;{{ coinInfo.lockCoinUnit }}</span>
                  </p>
                </div>
                <Input
                  type="text"
                  v-model="lockAmount"
                  placeholder="请输入数量"
                  :min="coinInfo.lockMinimum"
                  :max="coinInfo.lockHighest"
                  :placeholder="'请输入存币数量' + Number(coinInfo.lockMinimum) + '～' + Number(coinInfo.lockHighest)"
                />
              </div>
              <div class="footer-info">
                <Button @click="buyLockCoin" :disabled="!isLogin">立即存币</Button>
              </div>
            </div>
          </div>
          <div class="count-down">
            <p class="count-title">
              倒计时
            </p>
            <p class="count-icon">
              <i class="ivu-icon ivu-icon-md-arrow-dropdown icon"></i>
            </p>
            <p class="count-time">
              <span class="time">{{ day }}</span>
              <span class="day margin">天</span>&nbsp;
              <span class="time margin1">{{ hr }}</span>
              <span class="day margin">小时</span>&nbsp;
              <span class="time margin1">{{ min }}</span>
              <span class="day margin">分钟</span>&nbsp;
              <span class="time margin1">{{ sec }}</span>
              <span class="day margin">秒</span>&nbsp;
            </p>
          </div>
        </div>


        <section>
          &lt;!&ndash;抢购&ndash;&gt;
         <!--v-show="snapStatus"-->
         <div class="section-main" v-show="snapStatus">
            <div class="purchase">
              <div class="info">
                <p>预购数量</p>
                <p class="count-icon">
                  <i class="ivu-icon ivu-icon-md-arrow-dropdown icon"></i>
                </p>
                <Input
                  type="text"
                  v-model="lockAdvance"
                  :min="coinInfo.lockMinimum"
                  :max="coinInfo.lockHighest"
                  placeholder="请输入预购BTC数量"
                />
              </div>
              <div class="info-text">
                <span>可用余额</span>：<span>{{ userWallet.balance? userWallet.balance: '&#45;&#45;' }}&nbsp;{{ coinInfo.lockCoinUnit }}</span>
                <p class="amount-text">
                  <span>可抢购数量</span>：
                  <span>
                    {{ userWallet.balance? userWallet.balance: '&#45;&#45;' }}&nbsp;{{ coinInfo.lockCoinUnit }}
                  </span>
                </p>
              </div>
              <div class="footer-info">
                <Button
                  @click="buyLockCoin"
                  :disabled="!isLogin"
                >
                  立即抢购
                </Button>
              </div>
            </div>
          </div>
         <!--活动规则-->
         <div class="activity-rules">
           <div class="activity-top">
             <div class="title-img">
               <p class="info-title">活 动 详 情</p>
             </div>
             <div class="content-text">
               <p class="text">- 活动内容 -</p>
               <div class="activity-text" style="">
                 <p>共500枚BTC 2折抢购</p>
                 <p>1. 存 TD≧500枚，享1个BTC抢购资格；</p>
                 <p>2. 存TD≧1000枚，享3个BTC抢购资格；</p>
                 <p>3. 存TD≧5000枚，享5个BTC抢购资格。</p>
               </div>
               <div class="activity-text" style="margin: 0.3rem 0 0.5rem;">
                 <p>凡没有抢购到BTC的用户根据用户存TD数量空投BC</p>
                 <p>1. 存TD≧500枚，空投88BC；</p>
                 <p>2. 存TD≧1000枚，空投188BC；</p>
                 <p>3. 存TD≧5000枚，空投588BC。</p>
               </div>
               <span class="border-content"></span>
               <div class="detailed-text">
                 <p class="text">- 活动细则 -</p>
                 <div class="text-info1">
                   <p>1. 参与本次活动，必须在规定时间内存相应数量的TD，才能拥有在规定时间内打折抢购BTC的资格；</p>
                   <p>2. 每人只能参与一次抢购；</p>
                   <p>3. 本次活动最终解释权归BDW所有。</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
        </section>
        <footer v-if="isLogin">
          <div :class="snapStatus == false? 'record-list-1':'record-list'">
            <!--存币记录-->
            <div class="save-money">
              <div class="title-img">
                <p>存币记录</p>
              </div>
              <div class="record-main" v-for="item in saveMoneyList">
                <table cellspacing="0" cellpadding="0">
                  <tr>
                    <td>时间</td>
                    <td>存币方案</td>
                    <td>释放</td>
                  </tr>
                  <tr>
                    <td>{{ item.lockTime }}</td>
                    <td>{{ item.interests }}</td>
                    <td>{{ item.release }}</td>
                  </tr>
                </table>
                <table
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td>币种</td>
                    <td>存币方案</td>
                    <td>状态</td>
                  </tr>
                  <tr>
                    <td>{{ item.lockCoinUnit }}</td>
                    <td>{{ item.lockAmount }}</td>
                    <td>{{ item.lockStatus }}</td>
                  </tr>
                </table>
              </div>
            </div>
            <!--抢购记录-->
            <!--v-show="snapStatus"-->
            <div class="rush-purchase" v-if="snapStatus">
              <div class="title-img">
                <p>抢购记录</p>
              </div>
              <div
                class="record-main"
                v-for="item in rushList"
                style="padding: 0.25rem 8% 0;"
              >
                <table cellspacing="0"cellpadding="0" id="rush-style">
                  <tr>
                    <td>预存币</td>
                    <td>抢购成功</td>
                    <td>空投奖励</td>
                  </tr>
                  <tr>
                    <td>{{ item.lockTime }}</td>
                    <td>{{ item.interests }}</td>
                    <td>{{ item.release }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="service">
            <div class="service-box">
              <p class="box-text">
                <img src="../../assets/images/yidong/service-info.png" alt="">
              </p>
              <p class="box-info">详情请咨询BDW客服</p>
            </div>

          </div>
        </footer>
        <!--记录-->
        <!--<footer v-if="isLogin">
          <div class="record-list">
            <div class="save-money">
              <div class="save-title"></div>
              &lt;!&ndash;<div class="fund-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsBlc"
                  :data="saveMoneyList"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div class="page-wrap">
                  <Page
                    v-show="totalElement > 10"
                    :current="pageNo"
                    :total="parseInt(totalElement)"
                    :page-size="pageSize"
                    @on-change="changePage"
                    id="record_pages"
                  ></Page>
                </div>
              </div>&ndash;&gt;
            </div>
            &lt;!&ndash;<div class="save-purchase" v-show="snapStatus">
              <div class="save-title">
                <img src="../../assets/img/line-two.png" alt="">
                <span class="title">抢币记录</span>
                <img src="../../assets/img/line-one.png" alt="">
              </div>
              <div class="fund-table">
                <Table
                  :no-data-text="$t('common.nodata')"
                  stripe
                  :columns="tableColumnsBlc"
                  :data="saveMoneyList"
                  :loading="loading"
                  :disabled-hover="true"
                ></Table>
                <div class="page-wrap">
                  <Page
                    v-show="totalElement > 10"
                    :current="pageNo"
                    :total="parseInt(totalElement)"
                    :page-size="pageSize"
                    @on-change="changePage"
                    id="record_pages"
                  ></Page>
                </div>
              </div>
            </div>&ndash;&gt;
          </div>
        </footer>-->
      </div>
    </div>
  </div>
</template>
<script>
  const FixAraible = (pageSize) => (pageNo) => ({
    pageSize,
    pageNo
  });
  const getParams = FixAraible(10, '');
  export default {
    data() {
      return {
        loading: false,
        pageNo: 1,
        pageSize: 10,
        totalElement: 0,
        lockAmount: '', // 存币数量
        lockAdvance: '', // 预购数量
        // 存币记录
        saveMoneyList: [
          {
            lockTime: '2019-08-10 12:00:00',
            interests: '锁仓',
            release: '释放',
            lockCoinUnit: 'TD',
            lockAmount: '500',
            lockStatus: '待抢购'
          },
          {
            lockTime: '2019-08-10 12:00:00',
            interests: '锁仓',
            release: '释放',
            lockCoinUnit: 'TD',
            lockAmount: '500',
            lockStatus: '待抢购',
          }
        ],
        // 抢购记录
        rushList: [
          {
            lockTime: '500 TD',
            interests: '0 BTC',
            release: '88 BC'
          }
        ],
        reserveTime: '60',
        reserveInteval: null,
        day: 0,
        hr: 0,
        min: 0,
        sec: 0,
        totalTime: '',
        progressBar: '',
        coinInfo: {},
        userWallet: {},
        snapStatus: false, // 抢购状态
      }
    },
    created () {
      if(this.isLogin) {
        this.countdown()
        this.getDataList()
      }
      this.getCoin()
    },
    mounted: function () {},
    methods: {
      // 倒计时
      countdown () {
        var iTime
        // 到期时间
        const end = Date.parse(new Date('2019-09-11 10:25:00'))
        // 当前时间
        const now = Date.parse(new Date())
        // 开始时间
        const start = Date.parse(new Date('2019-08-09 15:03:00'))
        /*剩余时间 = 到期时间 - 当前时间*/
        const msec = end - now
        /*当前秒数 = (到期时间 - 开始时间)*0.001*/
        const num = (end-start)*0.001
        const that = this
        /*年月日时分秒*/
        let day = parseInt(msec / 1000 / 60 / 60 / 24)
        let hr = parseInt(msec / 1000 / 60 / 60 % 24)
        let min = parseInt(msec / 1000 / 60 % 60)
        let sec = parseInt(msec / 1000 % 60)
        console.log(day, hr, min, sec)

        let day1 = parseInt(day * 60 * 60 * 24)
        let hr1 = parseInt(hr  * 60 * 60)
        let min1 = parseInt(min  * 60)
        let sec1 = parseInt(sec)
        /*总秒数*/
        this.totalTime = (day1 + hr1 + min1 + sec1)
        if (this.totalTime > 0) {
          this.day = day
          this.hr = hr > 9 ? hr : '0' + hr
          this.min = min > 9 ? min : '0' + min
          this.sec = sec > 9 ? sec : '0' + sec
          console.log(this.day, this.hr, this.min, this.sec)
          iTime = setTimeout(function () {
            that.countdown()
          }, 1000)
        }
        /*进度条比例 = 总秒数/当前秒数 *100*/
        this.progressBar = this.totalTime/num * 100
        if (this.progressBar == 0) {
          clearTimeout(iTime)
          this.sec = '00'
        }
      },
      // 币种详细信息
      getCoin() {
        let userId = this.isLogin?this.$store.getters.member.id:''
        this.$http.get(this.host + `/lockCoinWallet/getList?userId=${userId?userId:''}`).then(res => {
          const resp = res.body;
          if (resp.code == 0) {
            this.loading = false;
            this.coinInfo = resp.data.list[0];
            if (this.userWallet) {
              this.userWallet = resp.data.memberWallet;
            }
          }
        });
      },
      // 存币接口数据
      buyLockCoin () {
        // 判断是否登录
        if(this.isLogin) {
          if (!this.lockAmount) {
            this.$Message.error(this.$t('common.loginInfo'))
            return false
          }
          const params = {}
          params['id'] = this.coinInfo.id
          params['amount'] = this.lockAmount
          this.$http.post(this.host + '/lockCoinWallet/buyLockCoin', params).then(res => {
            const resp = res.body;
            if (resp.code == 0) {
              this.$Message.success(resp.message)
              this.lockAmount = ''
              this.snapStatus = true // 抢购状态
              this.getCoin()
            } else {
              this.$Message.err(resp.message)
            }
          });
        } else {
          this.$Message.error(this.$t('common.logintip'))
        }

      },
      // 数据列表
      getDataList() {
        const params = getParams(this.pageNo);
        this.$http.post(this.host + "/lockCoinWallet/record", params).then(res => {
          const resp = res.body;
          if (resp.code == 0) {
            this.loading = false;
            this.saveMoneyList = resp.data;
            this.totalElement = res.total;
            console.log(this.saveMoneyList)
          }
        });
      },
      changePage(page) {
        this.pageNo = this.pageNo = page;
        this.getList();
      },
    },
    watch: {
      countdown () {
        if (this.isLogin) {
          // console.log(this.totalTime)
          if (this.progressBar == 0) {
            var iTime
            iTime = setTimeout(function () {
              this.countdown()
            }, 1000)
          }
        }
      }
    },
    mounted () {},
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
      tableColumnsBlc() {
        let self = this
        const arr = [];
        arr.push({
          title: this.$t('common.fund.MemberId'),
          key: "memberId",
        });
        arr.push({
          title: this.$t('common.fund.lockCoinUnit'),
          key: "lockCoinUnit",
        });

        arr.push({
          title: this.$t('common.fund.lockAmount'),
          key: "lockAmount",
        })
        arr.push({
          title: this.$t('common.fund.lockTime'),
          key: "lockTime",
        });
        arr.push({
          title: this.$t('common.fund.unlockTime'),
          key: "unlockTime",
        });
        arr.push({
          title: this.$t('common.fund.lockCoinDay'),
          key: "lockCoinDay",
        });
        arr.push({
          title: this.$t('common.fund.interests'),
          key: "interests",
        });
        // arr.push({
        //   title: this.$t('pointPage.operation'),
        //   key: "operation",
        //   render(h, params){
        //     return h("span", {}, self.$store.state.lang == 'English'?params.row.operationEnglish:params.row.operation);
        //   }
        // });
        return arr;
      }
    },
    beforeRouteEnter(to, from, next) {
      document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
      next()
    }
  }
</script>
<style scoped lang="scss">
  #fund-box {
    height: 100%;
    .fund-main {
      header {
        height: 13.5rem;
        background: #4C38D8 url(../../assets/images/yidong/yidongbanner.png) 100% 100% no-repeat;
        background-position: initial;
        background-size: cover;
        position: relative;
      }
      .main {
        width: 100%;
        background: transparent;
        position: absolute;
        top: 3.8rem;
        .header-info {
          .header-banner {
            color: #fff;
            margin: 0 6% 0;
            font-size: .25rem;
            .border-banner {
              display: inline-block;
              height: 0.4rem;
              border: 1px solid #fff;
              margin-top: 0.19rem;
            }
            .time-div {
              float: left;
              height: 0.8rem;
              line-height: 0.8rem;
              margin-right: 0.3rem;
            }
            .banner-new {
              float: right;
              p {
                &:last-child {
                  margin-top: 0.1rem;
                }
              }
            }
          }
          .header-main {
            width: 100%;
            margin-bottom: 1rem;
            .header-content {
              width: 90%;
              height: 4.3rem;
              background: url("../../assets/images/yidong/yidong1.png") 0 0 no-repeat;
              background-position: initial;
              background-size: 100% 100%;
              margin: 10% 5% 0;
              padding: 0.05rem 0.55rem 0.35rem;
              .title {
                text-align: center;
                color: #fff;
                font-size: 0.35rem;
              }
              .info {
                width: 100%;
                margin-top: 0.38rem;
                .info-input {
                  color: #E4E0FF;
                  font-size: 0.3rem;
                  margin-bottom: 0.2rem;
                  .lock-sum {
                    float: right;
                  }
                }
              }
              .footer-info {
                text-align: center;
                margin-top: 0.3rem;

                button {
                  width: 100%;
                  height: 0.8rem;
                  color: #fff;
                  border: 0;
                  border-radius: 0;
                  font-size: 0.25rem;
                  text-align: center;
                  background: #5C52EB;
                  cursor: pointer;
                }
              }
            }
          }
          .count-down {
            .count-title {
              text-align: center;
              color: #fff;
              font-size: 0.5rem;
            }
            .count-icon {
              height: 0.5rem;
              text-align: center;
              font-size: 0.6rem;
              color: #fff;
              line-height: 0.5rem;
              margin-bottom: 0.55rem;
            }
            .count-time {
              text-align: center;
              .time {
                font-size: 0.4rem;
                font-weight: bold;
                color: #E2D6FF;
                display: inline-block;
                width: 0.9rem;
                height: 0.9rem;
                text-align: center;
                line-height: 0.9rem;
                background: #3D30A0;
              }
              .margin {
                margin-left: 0.1rem;
              }
              .margin1 {
                margin-left: 0.1rem;
              }
              .day {
                font-size: 0.3rem;
                color: #B9ABDD;
              }
            }
          }
        }

        section {
          background: #4C38D8;
          padding-top: 1rem;
          .section-main {
            padding: 0 0 15% 0;
            .purchase {
              padding: 0 5%;
              .info {
                p {
                  text-align: center;
                  color: #fff;
                  font-size: 0.5rem;
                }
                .count-icon {
                  height: 0.5rem;
                  text-align: center;
                  font-size: 0.6rem;
                  color: #fff;
                  line-height: 0.5rem;
                  margin-bottom: 0.55rem;
                }
              }
              .info-text {
                height: 0.7rem;
                line-height: 0.7rem;
                color: #E4E0FF;
                font-size: 0.3rem;
                .amount-text {
                  margin-left: 15px;
                  float: right;
                }
              }
              .footer-info {
                text-align: center;
                margin-top: 0.3rem;

                button {
                  width: 100%;
                  height: 0.8rem;
                  color: #fff;
                  border: 0;
                  border-radius: 0;
                  font-size: 0.25rem;
                  text-align: center;
                  background: #5C52EB;
                  cursor: pointer;
                }
              }
            }

          }
          .activity-rules {
            padding: 0 5% 15%;
            .activity-top {
              color: #402DB8;
              .title-img {
                text-align: center;
                padding: 0 18%;
                color: #fff;
                font-size: 0.4rem;
                line-height: 0.7rem;
                position: relative;
                .info-title {
                  height: 1rem;
                  background: url("../../assets/images/yidong/yidong4.png") no-repeat center;
                  background-position: center;
                  background-size: cover;
                  font-weight:bold;
                  line-height: 0.65rem;
                }
              }
              .content-text {
                border-radius: 0.2rem;
                background: #fff;
                padding: 6.5% 5%;
                margin-top: -0.55rem;
                .text {
                  text-align: center;
                  height: 1rem;
                  line-height: 1rem;
                  color: #443F6B;
                  font-size: 0.4rem;
                  font-weight:bold;
                }
                .activity-text {
                  color: #7A669C;
                  font-size: 0.32rem;
                  line-height: 0.6rem;
                  font-family:PingFang-SC-Medium;
                }
                .border-content {
                  display: inline-block;
                  width: 100%;
                  height: 0.02rem;
                  background: #E1E8F3;
                }
                .detailed-text {
                  .text {
                    text-align: center;
                    height: 1rem;
                    line-height: 1rem;
                    color: #443F6B;
                    font-size: 0.4rem;
                    font-weight:bold;
                  }
                  .text-info1 {
                    p {
                      color: #7A669C;
                      font-size: 0.32rem;
                      line-height: 0.6rem;
                    }
                  }
                }
              }
            }

          }
        }

        footer {
          /*.record-list {*/
          /*  height: 10.7rem;*/
          /*}*/
          /*.record-list-1 {*/
          /*  height: 7.1rem;*/
          /*}*/
          .record-list,
          .record-list-1 {
            padding: 0 5%;
            background: #4638d8;
            /*存币记录*/
            .save-money {
              margin-top: -0.02rem;
              min-height: 7.5rem;
              background: #4C38D8 url(../../assets/images/yidong/yidong2.png) 100% 100% no-repeat;
              background-position: initial;
              background-size: 100% 100%;
            }
            /*抢购记录*/
            .rush-purchase {
              margin-top: 0.7rem;
              height: 2.95rem;
              background: #4C38D8 url(../../assets/images/yidong/yidong3.png) 100% 100% no-repeat;
              background-position: initial;
              background-size: 100% 100%;
              .record-main {
                #rush-style {
                  tr {
                    display: flex;
                    &:first-child {
                      td {
                        &:nth-child(2) {
                          text-align: center;
                        }
                      }
                    }
                    &:last-child {
                      td {
                        &:nth-child(2) {
                          padding-left: 9%;
                        }
                      }
                    }
                    td {
                      flex: 1;
                    }
                  }
                }
              }
            }
            .save-money,
            .rush-purchase {
              .title-img {
                text-align: center;
                color: #fff;
                font-size: 0.3rem;
                line-height: 0.7rem;
              }
              .record-main {
                padding: 0.5rem 8% 0;
                &:last-child {
                  table {
                    &:last-child {
                      border-bottom: 0;
                      padding-bottom: 1rem;
                    }
                  }
                }
                table {
                  width: 100%;
                  font-size: 0.29rem;
                  line-height: 0.45rem;
                  &:last-child {
                    margin-top: 0.15rem;
                    border-bottom: 0.01rem dashed #5900D6;
                    padding-bottom: 0.5rem;
                  }
                  tr {
                    color: #FFFFFF;
                    display: flex;
                    td {
                      flex: 1;
                    }
                    &:first-child {
                      td {
                        color: #B2A6DC;
                        &:nth-child(2) {
                          text-align: center;
                        }
                        &:last-child {
                          text-align: right;
                        }
                      }
                    }
                    &:last-child {
                      td {
                        &:nth-child(2) {
                          padding-left: 9%;
                        }
                        &:last-child {
                          text-align: right;
                        }
                      }
                    }
                  }
                }
                p {
                  width: 100%;
                  border: 0.01rem dashed #5900D6;
                  border-top: 0;
                  margin-top: 0.4rem;
                }
              }
            }
          }
          .service {
            min-height: 6.65rem;
            background: #4638d8 url("../../assets/images/yidong/footer.png") 100% 100% no-repeat;;
            background-position: initial;
            background-size: cover;
            position: relative;
            z-index: -1;
            margin-top: -0.01rem;
            .service-box {
              .box-text {
                width: 100%;
                padding: 27% 30% 0;
                img {
                  width: 100%;
                }
              }
              .box-info {
                text-align: center;
                font-size: 0.32rem;
                margin-top: 0.15rem;
                color: #fff;
              }
            }
          }
        }
      }
    }
    input::-webkit-input-placeholder {
      color: #7C75B1;
      font-size: 0.25rem;
    }

    input:-moz-placeholder {
      color: #7C75B1;
      font-size: 0.25rem;
    }

    input::-moz-placeholder {
      color: #7C75B1;
      font-size: 0.25rem;
    }

    input:-ms-input-placeholder {
      color: #7C75B1;
      font-size: 0.25rem;
    }
  }
</style>
<style lang="scss">
  .ivu-input {
    width: 100%;
    height: 0.8rem;
    color: #fff;
    font-size: 0.3rem;
    border-radius: 0;
    padding-left: 0.1rem;
    background: transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 0.01rem solid #A497FF;
    &:focus {
      border: 0.01rem solid #A497FF;
    }
  }
  .ivu-progress-show-info .ivu-progress-outer {
    /* padding-right: 55px; */
    margin-right: -55px;
  }
  .ivu-progress-inner {
    height: 38px;
    background: #272D61;
    overflow: hidden;
    .ivu-progress-bg {
      height: 38px !important;
      /*background: linear-gradient(0deg, #fff 0%,#000 100%);*/
      background:linear-gradient(45deg, rgba(49, 107, 239, .6), rgba(20, 56, 240, .7));
    }
  }
  .ivu-progress-text {
    display: none;
  }
  #fund-box {
    .ivu-table-wrapper {
      position: initial !important;
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
  #record_pages li.ivu-page-item.ivu-page-item-active {
    background-color: #111530;
    border-color: #191f44;
    a {
      color: #3399ff;
    }
  }
  #record_pages li.ivu-page-item.ivu-page-item-active {
    &:hover {
      background-color: #111530;
      a {
        color: #3399ff;
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
</style>
