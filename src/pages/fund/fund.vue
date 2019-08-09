<template>
  <div id="fund-box">
    <div class="fund-main">
      <header>

      </header>

      <div class="main">
        <div class="header-content">
          <div class="header-title">
            <img src="../../assets/img/line-two.png" alt="">
            <span class="title">存币</span>
            <img src="../../assets/img/line-one.png" alt="">
          </div>
          <div class="info">
            <span>存币数量：</span>
            <Input
                    type="text"
                    placeholder="请输入数量"
                    style="width: 555px;"
            />
          </div>
          <div class="info-text">
            <span>可用余额</span>：<span>10000BC</span>
          </div>
          <div class="footer-info">
            <button>立即存币</button>
          </div>
        </div>
        <section>
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
            <p class="count-progress">
              <Progress :percent="progressBar" />
            </p>
          </div>
          <div class="purchase">
            2
          </div>
        </section>
        <footer>
          <!--<div class="fund-table">
            <Table
                    :no-data-text="$t('common.nodata')"
                    stripe
                    :columns="tableColumnsBlc"
                    :data="tableMoney"
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
          </div>-->
        </footer>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        loading: false,
        pageNo: 1,
        pageSize: 10,
        pageNum: 1,
        ieoDataList: [],
        reserveTime: '60',
        reserveInteval: null,
        msg: {
          createTime: '2019-08-08 19:18:08',
          timeLimit: 10
        },
        day: 0,
        hr: 0,
        min: 0,
        sec: 0,
        totalTime: '',
        progressBar: ''
      }
    },
    created () {
      this.getDataList()
      this.countdown()
    },
    mounted: function () {
      this.countdown()
    },
    methods: {
      // 倒计时
      countdown () {
        var iTime
        const end = Date.parse(new Date('2019-08-09 16:55:00'))
        const now = Date.parse(new Date())
        const msec = end - now
        const that = this
        let day = parseInt(msec / 1000 / 60 / 60 / 24)
        let hr = parseInt(msec / 1000 / 60 / 60 % 24)
        let min = parseInt(msec / 1000 / 60 % 60)
        let sec = parseInt(msec / 1000 % 60)
        // console.log(day, hr, min, sec)
        let day1 = parseInt(day * 60 * 60 * 24)
        let hr1 = parseInt(hr  * 60 * 60)
        let min1 = parseInt(min  * 60)
        let sec1 = parseInt(sec)
        this.totalTime = (day1 + hr1 + min1 + sec1)
        console.log(this.totalTime)
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
        this.progressBar = this.totalTime * 875 * 0.01
        if (this.progressBar == 0) {
          clearTimeout(iTime)
          this.sec = '00'
        }
      },

      // 数据列表
      getDataList(pageNo, pageSize) {
        let params = {};
        params["pageNo"] = pageNo;
        params["pageSize"] = pageSize;
        this.$http.post(this.host + "/uc/gift/record", params).then(res => {
          const resp = res.body;
          if (resp.code == 0) {
            this.loading = false;
            this.getList(params).then(res => {
              this.ieoDataList = res.data;
              this.totalElement = res.total;
            });
          }
        });
      }
    },
    watch: {
      countdown () {
        // console.log(this.totalTime)
        if (this.progressBar == 0) {
          var iTime
          iTime = setTimeout(function () {
            this.countdown()
          }, 1000)
        }
      }
    },
    mounted () {}
  }
</script>
<style scoped lang="scss">
  #fund-box {
    padding-top: 8px;
    .fund-main {
      header {
        height: 955px;
        background: url("../../assets/img/banner2.png") 0 0 no-repeat;
        background-position: center;
      }

      .main {
        background: #101646;
        .header-content {
          width: 800px;
          margin: 0 auto;
          position: relative;
          top: -140px;
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
            padding: 0 80px;
            span {
              color: #FEFFFF;
              font-size: 16px;
              display: inline-block;
              min-width: 75px;
              height: 45px;
              line-height: 45px;
            }
          }
          .info-text {
            height: 64px;
            color: #fff;
            line-height: 64px;
            text-align: right;
            padding-right: 80px;
          }
          .footer-info {
            text-align: right;
            padding-right: 80px;
            button {
              width: 555px;
              height: 64px;
              color: #fff;
              border: 0;
              outline:none;
              cursor: pointer;
              font-size: 16px;
              text-align: center;
              line-height: 64px;
              background: #293872;
            }
          }
        }
        section {
          width: 875px;
          margin: 0 auto 210px;
          min-height: 400px;
          .count-down {
            margin-bottom: 173px;
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
              margin-top: 75px;
              text-align: center;
            }
          }
          .purchase {
            background: rosybrown;
          }
        }
        footer {
          width: 1200px;
          min-height: 150px;
          margin: 20px auto 50px;
        }
      }

    }
  }
</style>
<style lang="scss">
  .ivu-table {
    &:before {
      background: transparent;
    }
  }
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
  #fund-table {

    .ivu-table-wrapper {
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
