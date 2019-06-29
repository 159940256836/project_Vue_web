/* eslint-disable no-empty */

<template>
    <div>
        <div id="fullpage">
            <div class="section" id="banner">
                <!-- <div class="bannerWrapper"> -->
                    <Carousel
                        autoplay
                        :arrow="showArrow"
                        :autoplay-speed="speed"
                        v-model="valueCal"
                    >
                        <CarouselItem
                            v-for="(itemArr,index) in picList"
                            :key="index"
                        >
                            <div class="bannerBox">
                                    <div
                                        :style="'background-image:url('+itemArr.url+')'"
                                        class="carousel-item"
                                    >
                                        <a
                                            v-show="itemArr.linkUrl&&itemArr.linkUrl!=' '&&itemArr.linkUrl!='1'"
                                            style="display:block;width:100%;height: 100%;"
                                            :href="itemArr.linkUrl"
                                            target="_blank"
                                        ></a>
                                    </div>
                            </div>
                        </CarouselItem>
                    </Carousel>
                <!-- </div> -->
            </div>
            <div
                class="section"
                id="hot"
                v-if="hostSymbolList.length != 0"
            >
            <!-- 首页行情图 -->
            <section class="section-market">
                <div
                    class="market-box"
                    v-for="(item,index) in hostSymbolList"
                    :key="index"
                    style="float: left;"
                >
                    <div>
                        <p class="flex">
                            <span class="pairs">{{item.symbol}}</span>
                            <span
                                class="pairs-sip"
                                :class="{green: item.isGreen}"
                                v-if="item.isGreen"
                            >
                                {{item.chg | formateRate}}
                            </span>
                            <span
                                :class="{red: !item.isGreen}"
                                v-if="!item.isGreen"
                            >
                                {{item.chg | formateRate}}
                            </span>
                        </p>
                        <p class="flex">
                            <span
                                class="pairs-sip sip"
                                :class="{green: item.isGreen}"
                                v-if="item.isGreen"
                            >
                                {{item.close}}
                            </span>
                            <span
                                class="pairs-pri"
                                v-if="!item.isGreen"
                            >
                                {{item.close}}
                            </span>
                            <span class="white" style="color:#CDD2E5">{{item.cny}}</span>
                        </p>
                    </div>
                    <!-- {{item.symbol}}-----{{item.baseUsdRate}}----{{item.chg}}----{{item.change}}====={{item.volume}} -->
                    <SvgLine
                        :values="item.trend"
                        :width="width"
                        :height="height"
                        :rose="item.chg.toString()"
                        style="margin-left: 11px;margin-right: 13px;"
                    ></SvgLine>
                </div>
            </section>
            </div>
            <!-- 公告轮播 -->
            <div id="pagetips">
                <div class="topnav">
                    <div class="carl">
                        <!-- <div class="laba"> -->
                        <img style="margin: 13px;margin-left:-60%;" src="../../assets/images/laba_pri.png" alt="">
                        <!--<Icon type="ios-volume-up" color="#fff" style="height:14px;margin-right:4px;" size="35" />-->
                        <!-- </div> -->
                        <div class="carsoul">
                            <div v-for="(item,index) in FAQList" class="cal_content1">
                                <div
                                    v-for="(con,j) in item"
                                    class="cal_content"
                                    @mouseover="stop()"
                                    @mouseout="startMove()"
                                >
                                    <router-link
                                        style="color: #a8b0c0;"
                                        :to="{path: '/notice/index', query: { 'id': con.id }}"
                                    >
                                        {{strde(con.title)}}
                                    </router-link>
                            </div>
                            </div>
                        </div>
                        <!-- <div class="more">
                            <router-link to="/notice">更多>></router-link>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="Central">
              <div class="section" id="page2">
                <div class="page2nav">
                    <ul class="brclearfix">
                        <li
                            v-show="!(index==4&&!isLogin)"
                            v-for="(item,index) in indexBtn"
                            @click="addClass(index)"
                            :class="{'active':index==choseBtn,'ivu-btn-default':index!=choseBtn}"
                            :key="index"
                        >
                            {{item.text}}
                        </li>
                    </ul>
                    <div class="search">
                        <i class="vertical"></i>
                        <i-input icon="ios-search" placeholder="搜索交易币种" style="width:140px"></i-input>
                    </div>
                </div>
                <div class="ptjy">
                    <Table
                        v-if="choseBtn==4"
                        :columns="favorColumns"
                        :data="dataIndex"
                        class="tables"
                        :disabled-hover="true"
                        :loading="loading"
                        :no-data-text="$t('common.nodata')"
                        :row-class-name="rowClassName"
                    ></Table>
                    <Table
                        v-else
                        :columns="coins.columns"
                        :data="dataIndex"
                        class="tables"
                        :disabled-hover="true"
                        :loading="loading"
                        :no-data-text="$t('common.nodata')"
                        :row-class-name="rowClassName"
                    ></Table>
                </div>
                <!-- <div class="seemore">
                    查看更多
                </div> -->
              </div>
              <div class="section" id="page5">
                  <div class="showsection">
                      <img src="../../assets/img/01.png" alt="">
                      <div>{{$t("sectionPage.spotTrading")}}</div>
                      <span>{{$t("sectionPage.multiCurrency")}} <br />{{$t("sectionPage.performance")}}</span>
                  </div>
                    <div class="showsection">
                      <img src="../../assets/img/02.png" alt="">
                      <div>{{$t("sectionPage.OTCtransaction")}}</div>
                      <span>{{$t("sectionPage.Support")}} <br />{{$t("sectionPage.guarantee")}}</span>
                  </div>
                    <div class="showsection">
                      <img src="../../assets/img/03.png" alt="">
                      <div>{{$t("sectionPage.Financial")}}</div>
                      <span>{{$t("sectionPage.multilayer")}} <br />{{$t("sectionPage.operation")}}</span>
                  </div>
                    <div class="showsection">
                      <img src="../../assets/img/03.png" alt="">
                      <div>{{$t("sectionPage.Professional")}}</div>
                      <span>{{$t("sectionPage.online")}}<br /> {{$t("sectionPage.Respond")}}</span>
                    </div>
              </div>
              <div class="section" id="page4">
                <div class="left">
                    <span class="text">{{$t("sectionPage.terminal")}}</span>
                    <p>{{$t("sectionPage.Instant")}}</p>
                    <div class="qrcode">
                      <div class="Qrleft" v-show="this.checkoutapp">
                        <div class="android" @click="checkoutfasle">
                          <Icon type="logo-android" color="white" size="20" style="margin:0 12px 0 17px"/>
                          <span>android</span>
                        </div>
                        <div class="ipone click" @click="checkouttrue">
                          <Icon type="logo-apple" color="white" size="20" style="margin:0 12px 0 17px"/>
                          <span>iphone</span>
                        </div>
                      </div>
                      <div class="Qrleft" v-show="!checkoutapp">
                          <div class="android click" @click="checkoutfasle">
                            <Icon type="logo-android" color="white" size="20" style="margin:0 12px 0 17px"/>
                            <span>android</span>
                          </div>
                          <div class="ipone" @click="checkouttrue">
                            <Icon type="logo-apple" color="white" size="20" style="margin:0 12px 0 17px"/>
                            <span>iphone</span>
                          </div>
                      </div>
                      <div class="Qrright">
                          <img src='../../assets/images/qrcode.png' alt="" />
                      </div>
                    </div>
                </div>
                <div class="right">
                    <img src="../../assets/img/shouye.png" alt="" />
                </div>
              </div>
              <div class="section" id="page1">
                <div class="content">
                    <div class="page1left">
                      <div class="trading">{{$t("sectionPage.soontrading")}}</div>
                      <div class="registered">{{$t("sectionPage.Registeraccount")}}</div>
                    </div>
                    <div class="page1right">
                      <router-link class="login"  to="/login">{{$t("common.login")}}</router-link>
                      <router-link class="registe" to="/register">{{$t("common.register")}}</router-link>
                    </div>
                </div>
              </div>
            </div>
            <!--币种列表-->
            <!-- 下载部分 -->
            <!-- 网站功能模块 -->
            <!-- <div class="section" id="page2">
                <div class="page2nav">
                    <ul class="brclearfix">
                        <li
                            v-show="!(index==4&&!isLogin)"
                            v-for="(item,index) in indexBtn"
                            @click="addClass(index)"
                            :class="{'active':index==choseBtn,'ivu-btn-default':index!=choseBtn}"
                            :key="index"
                        >
                            {{item.text}}
                        </li>
                    </ul>
                </div>
                <div class="ptjy">
                    <Table
                        v-if="choseBtn==4"
                        :columns="favorColumns"
                        :data="dataIndex"
                        class="tables"
                        :disabled-hover="true"
                        :loading="loading"
                        :no-data-text="$t('common.nodata')"
                    ></Table>
                    <Table
                        v-else
                        :columns="coins.columns"
                        :data="dataIndex"
                        class="tables"
                        :disabled-hover="true"
                        :loading="loading"
                        :no-data-text="$t('common.nodata')"
                    ></Table>
                </div>
            </div>
            <div class="section" id="page5">
                <div class="section-main">
                    <ul class="download">
                        <li class="qrcode">{{$t("downLoadAbs.big")}}</li>
                        <li class="description">{{$t("downLoadAbs.small")}}</li>
                        <li>
                            <ul class="os">
                                <li>
                                    <Icon type="logo-windows" size="25" /> <span>win32位</span></li>
                                <li>
                                    <Icon type="logo-windows" size="25" /> <span>win64位</span></li>
                                <li>
                                    <Icon type="logo-apple" size="30" /><span>mac</span></li>
                                <li>
                                    <Icon type="logo-apple" size="30" /><span>ios</span></li>
                                <li>
                                    <Icon type="logo-android" size="30" /><span>Android</span></li>
                                <li>
                                    <Icon type="logo-apple" size="30" /><span>Apple Store</span></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="phone_image">
                        <img src="../../assets/images/phone_img.png" alt="">
                    </div>
                </div>

            </div>
            <div class="section" id="page4">
                <ul>
                    <li>
                        <div><img src="../../assets/images/feature_safe.png" alt=""></div>
                        <p class="title">{{$t("sectionPage.ptaqTitle")}}</p>
                        <p>{{$t("sectionPage.leverExchange")}}<br>{{$t("sectionPage.ptaqContent")}}</p>
                    </li>
                    <li>
                        <div><img src="../../assets/images/feature_fast.png" alt=""></div>
                        <p class="title">{{$t("sectionPage.ptslTitle")}}</p>
                        <p>{{$t("sectionPage.ptslContent")}}<br>{{$t("sectionPage.newsTitle")}}</p>
                    </li>
                    <li>
                        <div><img src="../../assets/images/feature_experience.png" alt=""></div>
                        <p class="title">{{$t("sectionPage.part3Title")}}</p>
                        <p>{{$t("sectionPage.part3Content")}}<br>{{$t("sectionPage.part3Content2")}}</p>
                    </li>
                    <li>
                        <div><img src="../../assets/images/serve24.png" alt=""></div>
                        <p class="title">{{$t("sectionPage.part4Title")}}</p>
                        <p>{{$t("sectionPage.part4Content")}}<br>{{$t("sectionPage.part4Content2")}}</p>
                    </li>
                </ul>
            </div> -->
        </div>
        <div id="onlineservice">
            <a href="http://kefu.caymanex.pro:80/im/text/15FwEk.html" target="_blank"></a>
        </div>
    </div>
</template>
<script>
var Stomp = require('stompjs')
var SockJS = require('sockjs-client')
var moment = require('moment')
import SvgLine from '@components/exchange/SvgLine.vue'
import $ from '@js/jquery.min.js'
import { debug } from 'util'
const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x)
})
const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x)
})
export default {
  components: { SvgLine },
  data() {
    const self = this
    return {
      width: 296,
      height: 36,
      loading: false,
      progress: 0,
      already: 0,
      percent: 0,
      timer3: null,
      pageNo: 1,
      pageSize: 50,
      totalNum: 0,
      safetyAndAssoction: 0,
      currentBonusETHBnous: 0,
      yesDayCashDividensBonusETH: 0,
      yesDayMineAmountBHB: 0,
      CNYRate: null,
      dataIndex: [],
      checkoutapp: 'true',
            // pageNo: 1,
            // pageSize: 50,
            // totalNum: 0,
      FAQList: [],
      indexBtnBC: '',
      favorColumns: [
        {
          title: self.$t('service.favor'),
          align: 'center',
          key: 'collection',
          width: 60,
          render: (h, params) => {
            const flag = this.isLogin
            return h('Icon', {
              props: {
                color: '#3399ff',
                size: '18',
                type: params.row.isFavor
                                    ? 'ios-star'
                                    : 'ios-star-outline'
              },
              nativeOn: {
                click: () => {
                  if (this.isLogin) {
                    event.stopPropagation() // 阻止事件冒泡
                    if (
                                            event.currentTarget.className ==
                                            'ivu-icon ivu-icon-ios-star'
                                        ) {
                                            // 解除收藏
                      this.cancelCollect(params.index, params.row)
                      event.currentTarget.className ==
                                                'ivu-icon ivu-icon-ios-star-outline'
                    } else {
                                            // 收藏
                      this.collect(params.index, params.row)
                      event.currentTarget.className =
                                                'ivu-icon ivu-icon-ios-star'
                    }
                  } else {
                    this.$Message.warning('请先登录')
                  }
                }
              }
            })
          }
        },
        {
          title: self.$t('service.symbol'),
          align: 'center',
          width: 70,
          key: 'symbol'
        },
        {
          title: self.$t('service.NewPrice'),
          align: 'center',
          key: 'price',
          minWidth: 120,
          sortable: true,
          sortMethod: function(a, b, type) {
            const a1 = parseFloat(a)
            const b1 = parseFloat(b)
            if (type == 'asc') {
              return a1 - b1
            } else {
              return b1 - a1
            }
          },
          render: function(h, params) {
                        // var rmb = self.round(self.mul(params.row.price, 6.5), 2);
                        // if (self.CNYRate != null)
                        //   rmb = self.round(self.mul(params.row.price, self.CNYRate), 2);
            let CNYRate = self.CNYRate || 6.5,
              rmb = self.round(self.mul(params.row.usdRate, CNYRate), 2)
            const isgreen =
                            parseFloat(params.row.rose) < 0 ? 'none' : 'inline-block'
            const nogreen =
                            parseFloat(params.row.rose) < 0 ? 'inline-block' : 'none'
            return h('div', [
              // h('span', {}, params.row.price + ' /￥' + rmb),
              h('span', {}, window.indexBtnBC === 'BC' ? (params.row.price + ' /￥' + params.row.price) : (params.row.price + ' /￥' + rmb)),
              h(
                                'Icon',
                {
                  props: {
                    type: 'arrow-up-c'
                  },
                  style: {
                    display: isgreen,
                    fontSize: '16px',
                    marginLeft: '5px',
                    verticalAlign: 'middle'
                  },
                  class: {
                    green: true
                  }
                },
                                '↑'
                            ),
              h(
                                'Icon',
                {
                  props: {
                    type: 'arrow-down-c'
                  },
                  style: {
                    display: nogreen,
                    fontSize: '16px',
                    marginLeft: '5px',
                    verticalAlign: 'middle'
                  },
                  class: {
                    red: true
                  }
                },
                                '↓'
                            )
            ])
          }
        },
        {
          title: self.$t('service.Change'),
          align: 'center',
          key: 'rose',
          minWidth: 70,
          sortable: true,
          sortMethod: function(a, b, type) {
            const a1 = a.replace(/[^\d|.|-]/g, '') - 0
            const b1 = b.replace(/[^\d|.|-]/g, '') - 0
            if (type == 'asc') {
              return a1 - b1
            } else {
              return b1 - a1
            }
          },
          render: (h, params) => {
            const row = params.row
            const className = parseFloat(row.rose) < 0 ? 'red' : 'green'
            return h(
                            'span',
              {
                attrs: {
                  class: className
                }
              },
                            row.rose
                        )
          }
        },
        {
          title: self.$t('service.high'),
          align: 'center',
          key: 'high',
          render: (h, params) => {
            return h('div', {}, params.row.high)
          }
        },
        {
          title: self.$t('service.low'),
          align: 'center',
          key: 'high',
          render: (h, params) => {
            return h('div', {}, params.row.low)
          }
        },
        {
          title: self.$t('service.ExchangeNum'),
          align: 'center',
          key: 'volume',
                    // width: 110,
          sortable: true,
          sortMethod: function(a, b, type) {
            const a1 = parseFloat(a)
            const b1 = parseFloat(b)
            if (type == 'asc') {
              return a1 - b1
            } else {
              return b1 - a1
            }
          }
        },
                // {
                //   title: self.$t("service.OpenPrice"),
                //   align: "center",
                //   key: "open",
                //   width: 150,
                //   sortable: true,
                //   sortMethod: function(a, b, type) {
                //     let a1 = parseFloat(a);
                //     let b1 = parseFloat(b);
                //     if (type == "asc") {
                //       return a1 - b1;
                //     } else {
                //       return b1 - a1;
                //     }
                //   }
                // },
        // {
        //   title: self.$t('service.PriceTrend'),
        //   align: 'center',
        //   render: function(h, params) {
        //                 // debugger
        //     let valus = null
        //     const len = params.row.trend.length
        //     valus = len > 0 ? params.row.trend
        //                     : [
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0,
        //                       0
        //                     ]
        //     return h(SvgLine, {
        //       props: {
        //         values: valus,
        //         rose: params.row.rose,
        //         width: 100,
        //         height: 40
        //       }
        //     })
        //   }
        // },
        {
          title: self.$t('service.Exchange'),
          key: 'buyBtn',
          width: 60,
          render: function(h, params) {
            return h('div', [
              h('img', {
                attrs: {
                  src: require('../../assets/images/to_del.png')
                },
                style: {
                  width: '18px',
                  cursor: 'pointer',
                  marginLeft: '10px'
                },
                on: {
                  click: function() {
                    self.$router.push('/exchange/' + params.row.href)
                  }
                }
              })
            ])
          }
        }
      ],
            // 当前市场上的交易币种，按交易对分
      coins: {
        _map: [],
        USDT: [],
        BTC: [],
        ETH: [],
        BC: [],
        favor: [],
        columns: [
          {
            title: self.$t('service.favor'),
            align: 'center',
            key: 'collection',
            width: 60,
            render: (h, params) => {
              const flag = this.isLogin
              return h('Icon', {
                props: {
                  color: '#3399ff',
                  size: '18',
                  type: params.row.isFavor
                                        ? 'ios-star'
                                        : 'ios-star-outline'
                },
                nativeOn: {
                  click: (event) => {
                    if (this.isLogin) {
                      event.stopPropagation() // 阻止事件冒泡
                      if (
                                                event.currentTarget.className ==
                                                'ivu-icon ivu-icon-ios-star'
                                            ) {
                                                // 解除收藏
                        this.cancelCollect(params.index, params.row)
                        event.currentTarget.className ==
                                                    'ivu-icon ivu-icon-ios-star-outline'
                      } else {
                                                // 收藏
                        this.collect(params.index, params.row)
                        event.currentTarget.className =
                                                    'ivu-icon ivu-icon-ios-star'
                      }
                    } else {
                      this.$Message.warning(this.$t('common.logintip'))
                    }
                  }
                }
              })
            }
          },
          {
            title: self.$t('service.COIN'),
            align: 'center',
            key: 'coin',
            width: 70,
            render: function(h, params) {
              const className = params.row.href + 'icon' + ' indexicon'
              var iconName = ''
              if (params.row.coin == 'BTC') {
                iconName = '比特币'
              } else if (params.row.coin == 'ETH') {
                iconName = '以太币'
              } else if (params.row.coin == 'GCC') {
                iconName = '银河链'
              }
              return h('div', [
                h(
                                    'span',
                  {
                    attrs: {
                                            // class: className
                    }
                  },
                                    params.row.memberName
                                ),
                h('span', {
                  style: {
                    fontSize: '7px',
                    fontWeight: 800
                  }
                }, params.row.coin)
              ])
            }
          },
          {
            title: self.$t('service.NewPrice'),
            align: 'center',
            key: 'price',
            minWidth: 120,
            sortable: true,
            sortMethod: function(a, b, type) {
              const a1 = parseFloat(a)
              const b1 = parseFloat(b)
              if (type == 'asc') {
                return a1 - b1
              } else {
                return b1 - a1
              }
            },
            render: function(h, params) {
                            // var rmb = self.round(self.mul(params.row.price, 6.5), 2);
                            // if (self.CNYRate != null)
                            //   rmb = self.round(self.mul(params.row.price, self.CNYRate), 2);
              let CNYRate = self.CNYRate || 6.5,
                rmb = self.round(self.mul(params.row.usdRate, self.CNYRate), 2)
              const isgreen =
                                parseFloat(params.row.rose) < 0 ? 'none' : 'inline-block'
              const nogreen =
                                parseFloat(params.row.rose) < 0 ? 'inline-block' : 'none'
              return h('div', [
                // h('span', {}, params.row.price + ' /￥' + rmb),
                h('span', {}, window.indexBtnBC === 'BC' ? params.row.price + ' /￥' + params.row.price : params.row.price + ' /￥' + rmb),
                h(
                                    'Icon',
                  {
                    props: {
                      type: 'arrow-up-c'
                    },
                    style: {
                      display: isgreen,
                      fontSize: '16px',
                      marginLeft: '5px',
                      verticalAlign: 'middle'
                    },
                    class: {
                      green: true
                    }
                  },
                                    '↑'
                                ),
                h(
                                    'Icon',
                  {
                    props: {
                      type: 'arrow-down-c'
                    },
                    style: {
                      display: nogreen,
                      fontSize: '16px',
                      marginLeft: '5px',
                      verticalAlign: 'middle'
                    },
                    class: {
                      red: true
                    }
                  },
                                    '↓'
                                )
              ])
            }
          },
          {
            title: self.$t('service.Change'),
            align: 'center',
            key: 'rose',
            minWidth: 70,
            sortable: true,
            sortMethod: function(a, b, type) {
              const a1 = a.replace(/[^\d|.|-]/g, '') - 0
              const b1 = b.replace(/[^\d|.|-]/g, '') - 0
              if (type === 'asc') {
                return a1 - b1
              } else {
                return b1 - a1
              }
            },
            render: (h, params) => {
              const row = params.row
              const className = parseFloat(row.rose) < 0 ? 'red' : 'green'
              return h(
                                'span',
                {
                  attrs: {
                    class: className
                  }
                },
                                row.rose
                            )
            }
          },
          {
            title: self.$t('service.high'),
            align: 'center',
            key: 'high',
            render: (h, params) => {
              return h('div', {}, params.row.high)
            }
          },
          {
            title: self.$t('service.low'),
            align: 'center',
            key: 'high',
            render: (h, params) => {
              return h('div', {}, params.row.low)
            }
          },
          {
            title: self.$t('service.ExchangeNum'),
            align: 'center',
            key: 'volume',
                        // minWidth: 110,
            sortable: true,
            sortMethod: function(a, b, type) {
              const a1 = parseFloat(a)
              const b1 = parseFloat(b)
              if (type === 'asc') {
                return a1 - b1
              } else {
                return b1 - a1
              }
            }
          },
                    // {
                    //   title: self.$t("service.OpenPrice"),
                    //   align: "center",
                    //   key: "open",
                    //   width: 150,
                    //   sortable: true,
                    //   sortMethod: function(a, b, type) {
                    //     let a1 = parseFloat(a);
                    //     let b1 = parseFloat(b);
                    //     if (type == "asc") {
                    //       return a1 - b1;
                    //     } else {
                    //       return b1 - a1;
                    //     }
                    //   }
                    // },
        //   {
        //     title: self.$t('service.PriceTrend'),
        //     align: 'center',
        //     render: function(h, params) {
        //       let valus = null
        //       const len = params.row.trend.length
        //       valus =
        //                         len > 0
        //                             ? params.row.trend
        //                             : [
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0,
        //                               0
        //                             ]
        //       return h(SvgLine, {
        //         props: {
        //           values: valus,
        //           rose: params.row.rose,
        //           width: 100,
        //           height: 40,
        //           background: parseFloat(params.row.rose) < 0 ? 'red' : 'green'
        //         }
        //       })
        //     }
        //   },
          {
            title: self.$t('service.Exchange'),
            align: 'center',
            key: 'buyBtn',
            width: 60,
                        // minWidth: 60,
            render: function(h, params) {
              return h('div', [
                h('img', {
                  attrs: {
                    src: require('../../assets/images/to_del.png')
                  },
                  style: {
                    width: '18px',
                    cursor: 'pointer',
                    marginLeft: '10px'
                  },
                  on: {
                    click: function() {
                      self.$router.push('/exchange/' + params.row.href)
                    }
                  }
                })
              ])
            }
          }
        ]
      },
      indexBtn: [
        {
          text: this.$t('service.USDT')
        },
        {
          text: this.$t('service.BTC')
        },
        {
          text: this.$t('service.ETH')
        },
        {
          text: this.$t('service.BC')
        },
        {
          text: this.$t('service.CUSTOM')
        }
      ],
      choseBtn: 0,
      valueCal: 0,
      showArrow: 'never',
      speed: 3000,
      symbol: '',
      usdtData: [],
      usdtList: [],
      btcList: [],
      ethList: [],
      picList: [],
      hostSymbolList: []
    }
  },
  created: function() {
    this.stop()
    this.init()
    this.settiele()
  },
  filters: {
    formateRate(str) {
      return str > 0 ? '+' + (str * 100).toFixed(2) + '%' : (str * 100).toFixed(2) + '%'
    }
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin
    },
    lang: function() {
      return this.$store.state.lang
    }
  },
  watch: {
    lang: function() {
      this.updateLangData()
    }
  },
  mounted: function() {
    this.getCNYRate()
        //  this.getSymbol();
    this.getHotSymbol();
    (function(a, h, c, b, f, g) {
      a['UdeskApiObject'] = f
      a[f] = a[f] || function() { (a[f].d = a[f].d || []).push(arguments) }
      g = h.createElement(c)
      g.async = 1
      g.charset = 'utf-8'
      g.src = b
      c = h.getElementsByTagName(c)[0]
      c.parentNode.insertBefore(g, c)
    })(window, document,
      'script', 'https://assets-cli.s2.udesk.cn/im_client/js/udeskApi.js', 'ud')
    // eslint-disable-next-line no-undef
    ud({
      'code': '1ga0keb',
      'link': 'https://18986831987.s2.udesk.cn/im_client/?web_plugin_id=8943'
    })
  },
  methods: {
    checkouttrue() {
      this.checkoutapp = true
    },
    checkoutfasle() {
      this.checkoutapp = false
    },
        /**
         * 切割大数组成小数组
         */
    splitArray(array, num = 4) {
      let index = 0
      const newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, index += num))
      }
      return newArray
    },
        /*
         * 获取热门推荐的交易对
        */
    getHotSymbol() {
      this.$http.get(this.host + '/market/overview').then(res => {
        const resp = res.body
        const list = resp.recommend.map(ele => ({
          symbol: ele.symbol,
          chg: ele.chg,
          isGreen: ele.chg > 0,
          close: ele.close,
          cny: this.round(this.mul(ele.baseUsdRate, this.CNYRate), 2),
          trend: ele.trend
        }))
        this.hostSymbolList = list
        this.startWebsockHotlist()
      })
    },
    rowClassName(row, index) {
      console.log(row, index)
      if (index % 2 === 1) {
        return 'demo-table-info-row'
      } else if (index % 2 !== 1) {
        return 'demo-table-error-row'
      }
      return ''
    },
    strde(str) {
      str = str.trim()
      return str.length > 30 ? str.slice(0, 30) + '...' : str
    },
    noticedeail(id) {
      var path = { path: '/notice/index', query: { id: id }}
      this.$router.push(path)
    },
    titleLang(str) {
      const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      if (reg.test(str)) {
        return '简体中文'
      } else {
        return 'English'
      }
    },
    updateLangData() {
      this.indexBtn = [
        {
          text: this.$t('service.USDT')
        },
        {
          text: this.$t('service.BTC')
        },
        {
          text: this.$t('service.ETH')
        },
        {
          text: this.$t('service.BC')
        },
        {
          text: this.$t('service.CUSTOM')
        }
      ]
      this.coins.columns[0].title = this.$t('service.favor')
      this.coins.columns[1].title = this.$t('service.COIN')
      this.coins.columns[2].title = this.$t('service.NewPrice')
      this.coins.columns[3].title = this.$t('service.Change')
      this.coins.columns[4].title = this.$t('service.high')
      this.coins.columns[5].title = this.$t('service.low')
      this.coins.columns[6].title = this.$t('service.ExchangeNum')
    //   this.coins.columns[7].title = this.$t('service.PriceTrend')
      this.coins.columns[8].title = this.$t('service.Exchange')

      this.favorColumns[0].title = this.$t('service.favor')
      this.favorColumns[1].title = this.$t('service.symbol')
      this.favorColumns[2].title = this.$t('service.NewPrice')
      this.favorColumns[3].title = this.$t('service.Change')
      this.favorColumns[4].title = this.$t('service.high')
      this.favorColumns[5].title = this.$t('service.low')
      this.favorColumns[6].title = this.$t('service.ExchangeNum')
    //   this.favorColumns[7].title = this.$t('service.PriceTrend')
      this.favorColumns[8].title = this.$t('service.Exchange')
            // this.coins.columns[4].title = this.$t("service.OpenPrice");
    },
        // openActivity(url) {
        // },
    init() {
            // console.log(this.coins.columns[7],this.favorColumns);
            // this.$store.commit("navigate", "nav-index");
            // this.$store.state.HeaderActiveName = "1-1";
      this.loadPicData()// 获取轮播图
      this.addClass(0)
            // this.getmoneyData();
      this.loadDataPage(this.pageNo)// 获取公告
    },
    stop: function() {
      clearInterval(this.timer3)
    },
    getStyle(obj, attr) {
      if (obj.currentStyle) {
        return obj.currentStyle[attr]
      } else {
        return getComputedStyle(obj, false)[attr]
      }
    },
    move() {
      clearInterval(this.timer3)
      var self = this
      this.cal = document.getElementsByClassName('carsoul')[0]
      this.list = this.cal.getElementsByClassName('cal_content1')
      const l = this.list[0].cloneNode(true)
      this.cal.appendChild(l)
      this.startMove()
    },
    startMove() {
      clearInterval(this.timer3)
      var self = this
      const len = this.list.length
      const maxT = 40 * len
      this.timer3 = setInterval(() => {
        let t = parseInt(this.getStyle(this.cal, 'top'))
        t -= 40
        if (t <= -maxT) {
          t = 0
          $('.carsoul').animate({ top: '0px' }, 0)
        }
        const p = t + 'px'
        $('.carsoul').animate({ top: p })
      }, 3000)
    },
        /** *
         * 获取公告
         */
    loadDataPage(pageIndex) {
      var param = {}
      param['pageNo'] = pageIndex
      param['pageSize'] = this.pageSize
      this.$http.post(this.host + this.api.uc.announcement, param).then(response => {
        var resp = response.body
        if (resp.code === 0) {
          if (resp.data.content.length === 0) return
          const FAQList = resp.data.content
          const len = FAQList.length
          const n = 2 // 假设每行显示2个
          const lineNum = len % 2 === 0 ? len / 2 : Math.floor(len / 2 + 1)
          const res = []
          for (let i = 0; i < lineNum; i++) {
            const temp = FAQList.slice(i * n, i * n + n)
            res.push(temp)
          }
          this.FAQList = res
          this.totalNum = resp.data.totalElements
          this.$nextTick(function() {
            this.move()
          })
        } else {
          this.$Notice.error({
            title: this.$t('common.tip'),
            desc: resp.message
          })
        }
      })
    },
        /** *
         * 获取到usdt对人民币的实时汇率
         */
    getCNYRate() {
      this.$http.post(this.host + '/market/exchange-rate/usd-cny').then(response => {
        var resp = response.body
        this.CNYRate = resp.data
      })
    },
    donwload(type) {
      const title = this.$t('common.tip')
      const content = '<p>' + this.$t('common.expect') + '</p>'
      this.$Modal.info({
        title: title,
        content: content,
        closable: true
      })
    },
    loadPicData() {
      const param = {}
      param['sysAdvertiseLocation'] = 1
      this.$http.post(this.host + '/uc/ancillary/system/advertise', param)
                .then(response => {
                  var result = response.body
                  if (result.code == 0 && result.data.length > 0) {
                    console.log(result.data)
                    const picList = result.data
                    // this.picList = this.splitArray(picList);
                    this.picList = picList
                    console.log(this.picList)
                  }
                })
    },
    getCoin(symbol) {
      return this.coins._map[symbol]
    },
    startWebsockHotlist() {
      var stompClient = null
      var that = this
      var socket = new SockJS(that.host + that.api.market.ws)
      stompClient = Stomp.over(socket)
      stompClient.debug = true
      stompClient.connect({}, (frame) => {
                // 订阅价格变化消息
        stompClient.subscribe('/topic/market/thumb', (msg) => {
          var resp = JSON.parse(msg.body)
          const list = this.hostSymbolList.filter(ele => ele.symbol === resp.symbol)
          const isHot = list.length > 0 ? Right(resp) : Left(null)
          const result = isHot.map(obj => obj.symbol === resp.symbol).fold(x => null, x => x)
          result && this.hostSymbolList.forEach((ele, index) => {
            if (ele.symbol === resp.symbol) {
              this.hostSymbolList.splice(index, 1, {
                symbol: resp.symbol,
                chg: resp.chg,
                isGreen: resp.chg > 0,
                close: resp.close,
                cny: this.round(this.mul(resp.baseUsdRate, this.CNYRate), 2),
                trend: resp.trend
              })
            }
          })
                    // console.log('startWebsockHotlist');
                    // if (list.length > 0) {
                    // this.hostSymbolList.forEach((ele, index) => {
                    //     if (ele.symbol == list[0].symbol) {
                    //         this.hostSymbolList.splice(index, 1, resp);
                    //     }
                    // });
                    // } else {
                    //     return;
                    // }
        })
      })
    },
    startWebsock() {
      var stompClient = null
      var that = this
      var socket = new SockJS(that.host + that.api.market.ws)
      stompClient = Stomp.over(socket)
      stompClient.debug = false
      stompClient.connect({}, function(frame) {
                // 订阅价格变化消息
        stompClient.subscribe('/topic/market/thumb', function(msg) {
          var resp = JSON.parse(msg.body)
          var coin = that.getCoin(resp.symbol)
          if (coin != null) {
                        // coin.price = resp.close.toFixed(2);
            coin.price = resp.close
            coin.rose =
                            resp.chg > 0
                                ? '+' + (resp.chg * 100).toFixed(2) + '%'
                                : (resp.chg * 100).toFixed(2) + '%'
                        // coin.close = resp.close.toFixed(2);
                        // coin.high = resp.high.toFixed(2);
                        // coin.low = resp.low.toFixed(2);
            coin.close = resp.close
            coin.high = resp.high
            coin.low = resp.low
            coin.turnover = parseInt(resp.volume)
          }
        })
      })
    },
    round(v, e) {
      var t = 1
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t
    },
    mul(a, b) {
      if (b != null) {
        // eslint-disable-next-line one-var
        var c = 0,
          d = a.toString(),
          e = b.toString()
      } else {
        // eslint-disable-next-line one-var
        var c = 0,
          d = a,
          e = b
      }
      try {
        c += d.split('.')[1].length
      } catch (f) { }
      try {
        c += e.split('.')[1].length
      } catch (f) { }
      return (
                Number(d.replace('.', '')) *
                Number(e.replace('.', '')) /
                Math.pow(10, c)
      )
    },
    addClass(index) {
      window.indexBtnBC = ''
      this.choseBtn = index
      this.getSymbol()
      if (index == 0) {
        this.dataIndex = this.coins.USDT
      } else if (index == 1) {
        this.dataIndex = this.coins.BTC
      } else if (index == 2) {
        this.dataIndex = this.coins.ETH
      } else if (index == 3) {
        this.indexBtnBC = this.indexBtn[3].text
        window.indexBtnBC = this.indexBtnBC
        this.dataIndex = this.coins.BC
      } else if (index == 4) {
        this.dataIndex = this.coins.favor
      }
    },
    getSymbol() {
      this.loading = true
      this.coins.USDT = []; this.coins.BTC = []; this.coins.ETH = []; this.coins.BC = []
      this.$http.post(this.host + this.api.market.thumbTrend, {}).then(response => {
        var resp = response.body
        for (var i = 0; i < resp.length; i++) {
          var coin = resp[i]
          coin.price = resp[i].close
          coin.rose = resp[i].chg > 0 ? '+' + (resp[i].chg * 100).toFixed(2) + '%' : (resp[i].chg * 100).toFixed(2) + '%'
          coin.coin = resp[i].symbol.split('/')[0]
          coin.base = resp[i].symbol.split('/')[1]
          coin.href = (coin.coin + '_' + coin.base).toLowerCase()
          coin.isFavor = false
          this.coins._map[coin.symbol] = coin
          this.coins[coin.base].push(coin)
        }
        if (this.isLogin) {
          this.getFavor()
        }
        this.startWebsock()
        this.loading = false
      })
    },
        // getFavor() {
        //   //查询自选
        //   this.$http
        //     .post(this.host + this.api.exchange.favorFind, {})
        //     .then(response => {
        //       var resp = response.body;
        //       for (var i = 0; i < resp.length; i++) {
        //         var coin = this.getCoin(resp[i].symbol);
        //         this.coins.favor.push(coin);
        //       }
        //     });
        // },
    getFavor() {
            // 查询自选(收藏)
      this.$http.post(this.host + this.api.exchange.favorFind, {}).then(response => {
        var resp = response.body
        this.coins.favor = []
        for (var i = 0; i < resp.length; i++) {
          var coin = this.getCoin(resp[i].symbol)
          if (coin != null) {
            coin.isFavor = true
            this.coins.favor.push(coin)
          }
        }
      })
    },
    collect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t('common.logintip'))
        return
      }
      var params = {}
      params['symbol'] = row.symbol
      this.$http
                .post(this.host + this.api.exchange.favorAdd, params)
                .then(response => {
                  var resp = response.body
                  if (resp.code == 0) {
                    this.$Message.info(this.$t('exchange.do_favorite'))
                    this.getCoin(row.symbol).isFavor = true
                    row.isFavor = true
                    this.coins.favor.push(row)
                  }
                })
    },
    cancelCollect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t('common.logintip'))
        return
      }
      var params = {}
      params['symbol'] = row.symbol
      this.$http
                .post(this.host + this.api.exchange.favorDelete, params)
                .then(response => {
                  var resp = response.body
                  if (resp.code == 0) {
                    this.$Message.info(this.$t('exchange.cancel_favorite'))
                    this.getCoin(row.symbol).isFavor = false
                    for (var i = 0; i < this.coins.favor.length; i++) {
                      var favorCoin = this.coins.favor[i]
                      if (favorCoin.symbol == row.symbol) {
                        this.coins.favor.splice(i, 1)
                        break
                      }
                    }
                  }
                })
    }
        // getmoneyData() {
        //     this.$http.get(this.host + this.api.market.indexData).then(res => {
        //         if (res.body.code == 0) {
        //             let data = res.body.data;
        //             this.safetyAndAssoction = data.safetyAndAssoction || 0;
        //             this.currentBonusETHBnous = data.currentBonusETHBnous || 0;
        //             this.yesDayMineAmountBHB = data.yesDayMineAmountBHB || 0;
        //             this.yesDayCashDividensBonusETH =
        //                 data.yesDayCashDividensBonusETH || 0;
        //             let total = 6000000000;
        //             this.already = data.bhbAmount;
        //             this.progress = data.bhbAmount / total * 100;
        //         } else {
        //             this.$Message.error(res.body.message);
        //         }
        //     });
        // }
  }
}
</script>
<style lang="scss">
ul,
li {
    list-style-type: none;
}

%flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#banner {
    /* // background: url("../../assets/images/bannerBk.jpg") no-repeat center center;
    // background-size: cover; */
    overflow: hidden;
    height: 510px;
    position: relative;
    .bannerWrapper {
      position: absolute;
      bottom: 0;
      left: 18.5%;
      right: 18.5%;
      top: 170px;
      .bannerBox {
        background:#191D3A;
          @extend %flex;
          > div {
            width: 23%;
          }
      }
    }
}
#hot {
    height:146px;
    background:rgba(17,19,44,1);
    @extend %flex;
    .section-market {
        // width: 1200px;
        // margin: 0 auto;
        width: 100%;
        padding:23px;
        display: flex;
        justify-content:center;
        border-top: 1px solid rgba(42,56,80,1);
        .market-box {
        width: 320px;
        // height: 120px;
        float: left;
        // padding-right: 45px;
        // margin-right: 25px;
        // padding: 13px 0;
        overflow: hidden;
        border-right: 1px solid rgba(42,56,80,1);
            .vertical{
              width:1px;
              height:53px;
              background:rgba(42,56,80,1);
            }
            &:last-child {
                margin-right: 0;
            }
            p {
                &:first-child {
                    padding: 0 10px 3px;
                }
                &:nth-child(2) {
                    padding: 3px 10px 6px;
                    line-height: 25px;
                }
                span {
                    &:last-child {
                        float: right;
                        font-size: 7px;
                    }
                }
                .pairs {
                    color: #8090AF;
                    font-size: 8px;
                    font-weight: 600;
                }
                .sip {
                    font-size: 18px;
                    font-weight: bold;
                }
                .pairs-sip {
                    color: #03bf7b;
                }
                .pairs-pri {
                    font-size: 10px;
                    color: #CDD2E5;
                }
            }
        }
        .market-box:last-child{
            border:0;
        }
    }
    /*> div {*/
    /*    width: 20%;*/
    /*}*/
}
#pagetips {
    background:rgba(25,29,58,1);
    height:40px;
    overflow: hidden;
    .topnav {
        width: 100%;
        line-height: 40px;
        height: 40px;
        margin: 0 auto;
        .carl {
            width: 100%;
            height: 40px;
            position: relative;
            @extend %flex;
            align-items: flex-start;
            color: #fff;
            justify-content: center;
            .laba {
                width: 5%;
                img {
                    vertical-align: middle;
                }
            }
            .carsoul {
              position:absolute;
              left: 21%;
                a {
                    color: #fff;
                    font-size: 7px;
                    line-height: 35px;
                    display: inline-block;
                    margin-left: 20px;
                }
                .cal_content {
                    line-height: 35px;
                    font-size: 7px;
                    display: inline;
                }
                .cal_content:nth-child(1) {
                    padding-right: 20px;
                }
                .cal_content:nth-child(2) {
                    border-left: 1px solid #fff;
                    padding-left: 20px;
                }
            }
            .more {
                position: absolute;
                z-index: 12;
                right: 0;
                a {
                    color: #a8b0c0;
                    font-size: 14px;
                }
            }
        }
    }
}
#page2 {
    width: 1200px;
    height: auto;
    min-height: 320px;
    padding: 30px auto;
    margin: 0 auto;
    padding-top: 30px;
    max-height: 556px;
    .page2nav {
        line-height: 40px;
        font-size: 20px;
        overflow: hidden;
        background: #191D3A;
        .brclearfix {
            font-weight: 600;
            border: 1px solid #191D3A;
            border-bottom: 0;
            padding-left:15px;
            float:left;
            li {
                float: left;
                cursor: pointer;
                background: #191D3A;
                list-style: none;
                font-size: 8px;
                // padding: 0 30px;
                color:#FFFFFF;
                /*box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;*/
                &:hover {
                    color: #3399ff;
                }
            }
            li.active {
                background: #191D3A;
                color: #3399ff;
                border-bottom: 2px solid #191D3A;
                position: relative;
                margin-right: 35px; 
            }
            .ivu-btn-default{
              margin-right: 35px; 
            }
        }
        .search{
          float:right;
          display: flex;
          align-items: center;
          height: 42px;
          .vertical{
            width:1px;
            height:18px;
            background:rgba(128,144,175,1);
            margin-right:10px;
          }
          .ivu-input{
            background:#191D3A;
            font-size:7px;
            border:0;
            color:#8090AF;
          }
        }
    }
    .ptjy {
        border:1px solid rgba(25,29,58,1);
        height: 100%;
        .tables {
            border: none;
            /*<!--box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;-->*/
            /*border-top: 2px solid #39f;*/
            .ivu-table:before {
              background:#191D3A;
            }
            .ivu-table {
              .ivu-table-header {
                .ivu-table-column-center {
                    border: 0;
                    background: none;
                }
              }
            }
        .ivu-table-wrapper .ivu-table:after{
            background-color:transparent;
        }
        }
        .ivu-table-wrapper {
            .ivu-table {
                .ivu-table-row {
                    &:nth-of-type(odd) td{
                        background: rgba(17,22,52,1);
                        color:#fff;
                        font-size:7px;
                    }
                    &:nth-of-type(even) td{
                        background: #11132C;
                        color:#fff;
                        font-size:7px;
                    }
                }
            }
        }
    }
    .seemore{
        height:42px;
        line-height: 42px;
        background:rgba(17,22,52,1);
        text-align: center;
        color:#8090AF;
        cursor: pointer;
    }
}
#page4 {
    height: auto;
    width: 1200px;
    margin: 50px auto;
    min-height: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        float:left;
        .text{
          font-size:30px;
          margin-bottom:15px;
          color:#FFFFFF;
          display: inline-block;
        }
        p{
          font-size:14px;
          color:#FFFFFF;
          margin-bottom:28px;
        }
        .qrcode{
          display: flex;
          width:300px;
          .Qrleft{
            .android{
              width: 130px;
              height: 40px;
              background:rgba(25,29,58,1);
              border:1px solid rgba(85,99,130,1);
              margin-bottom:12px;
              display: flex;
              align-items: center;
              cursor: pointer;
              span{
                font-size:8px;
                color:white;
              }
            }
            .ipone{
              width: 130px;
              height: 40px;
              background:rgba(25,29,58,1);
              border:1px solid rgba(85,99,130,1);
              display: flex;
              align-items: center;
              cursor: pointer;
              span{
                font-size:8px;
                color:white;
              }
            }
            .click{
              background:rgba(94,107,137,1);
            }
          }
          .Qrright{
                width: 90px;
                height: 90px;
                background: #fff;
                margin-left: 13px;
            img{
                width: 90%;
                margin: 5% 0 0 5%;
            }
          }
        }
    }
    .right{
        float:right;
    }
}
#page5 {
    width:1200px;
    height: 500px;
    margin:0 auto;
    display: flex;
    justify-content:space-between;
    .showsection{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
            margin-top:12px;
        }
        div{
            font-weight: MicrosoftYaHei;
            color:#FFFFFF;
            font-size:9px;
            margin-bottom:9px;
            margin-top:17px;
        }
        span{
            color :#8090AF;
            text-align: center;
            font-size: 7px;
        }
    }
}
#page1{
  height:150px;
  background:#0E0E28;
  .content{
    width:1200px;
    height: 150px;
    margin:0 auto;
    display:flex;
    justify-content: space-between;
    .page1left{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .trading{
        color:#8090AF;
        font-size:21px;
        margin-bottom:13px;
      }
      .registered{
        color:#8090AF;
        font-size:7px;
      }
    }
    .page1right{
      display:flex;
      align-items: center;
      justify-content: center;
      font-size:12px;
      .login{
        width: 84px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        background: #1b1f3c;
        color: white;
        cursor: pointer;
        font-size: 8px;
      }
      .registe{
        width: 84px;
        height: 25px;
        line-height: 25px;
        text-align:center;
        margin-left:20px;
        background:rgba(94,107,137,1);
        border:1px solid rgba(94,107,137,1);
        color:white;
        cursor: pointer;
        font-size:8px;
      }
    }
  }
}
</style>
<style lang="scss">
#page2 {
  .ptjy {
    .tables {
        .ivu-table {
              background-color:transparent;
            .ivu-table-header {
                th {
                    color: #8090AF;
                    background: #191D3A;
                    border:0;
                }
            }
            .ivu-table-tip{
              td {
                background:#191D3A;
              }
            }
            .ivu-table-header,
            .ivu-table-body {
                .ivu-table-cell {
                    padding: 5px 0;
                }
            }
        }
        .ivu-table:before{
            background-color:transparent;
        }
        .ivu-table:after{
            width:0;
            background-color:transparent;
        }
    }
  }
}
</style>
<style lang="scss">
.ivu-table-wrapper > .ivu-spin-fix{
    background: rgba(17,22,52,1)
}
.ivu-table-wrapper>.ivu-spin-fix{
    border:0;
}
.demo-table-info-row td{
  background: #191D3A !important;
  border:0;
}
.demo-table-error-row td{
  background: rgba(17,22,52,1) !important;
  border:0;
}
.bannerWrapper .ivu-carousel {
    height: 100%;
}
.section .ivu-carousel-dots-inside {
    bottom: 30px;
}

.green {
    color: #03bf7b !important;
}

.red {
    color: #F15057 !important;
}

.brclearfix:after {
    content: "";
    display: block;
    height: 0;
    overflow: hidden;
    clear: both;
}

#fullpage {
    padding-top: 50px;
    min-width: 1260px;
    background: #fff;
  .Central{
    background:url("../../assets/images/bg.png");
    height:auto;
  }
}

.section {
    /* height: 574px; */
    /* text-align: center; */
    /* color: #fff; */
}

.carousel-item {
    background-repeat: no-repeat;
    background-position: center;
    height: 510px;
    background-size: cover;
}

.demo-carousel1 {
    /* background: url(../../assets/images/banner1.jpg) no-repeat center; */
    height: 575px;
    background-size: cover;
}

.demo-carousel2 {
    /* background: url(../../assets/images/banner2.jpg) no-repeat center; */
    height: 575px;
    background-size: cover;
}

.demo-carousel-btn {
    width: 100%;
    height: 100%;
    padding-top: 345px;
}

.demo-carousel1 a {
    display: inline-block;
    width: 250px;
    height: 55px;
    margin: 0 15px;
}
.usdt_icon {
    float: left;
    width: 18%;
    height: 290px;
    background: #1d293a;
    padding-top: 125px;
    margin: 5px;
}
.btc,
.eth {
    float: left;
    width: 100%;
    margin-top: 10px;
}

.btc_icon,
.eth_icon {
    float: left;
    width: 18%;
    height: 140px;
    background: #1d293a;
    padding-top: 50px;
    margin: 5px;
}

#nav {
    position: fixed;
    right: 10%;
    top: 50%;
    z-index: 100;
}

#nav ul li {
    display: block;
    /* width: 120px; */
    height: 25px;
    margin: 7px;
    position: relative;
    padding-right: 20px;
    text-align: right;
    color: #fff;
}

#nav ul li span {
    display: none;
}

#nav ul li a {
    top: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    background: url(../../assets/images/page.png) no-repeat;
    position: absolute;
    z-index: 1;
}

#nav ul li a:hover,
#nav ul li a.active {
    top: 0;
    right: -3px;
    width: 18px;
    height: 18px;
    background: url(../../assets/images/page_active.png) no-repeat;
    position: absolute;
    z-index: 1;
}

#page3 {
    position: relative;
    color: #979797;
    /* background: url(../../assets/images/section3.png) no-repeat center; */
}

#page3 label {
    position: absolute;
    top: 30%;
    left: 20%;
    font-size: 30px;
}

@-webkit-keyframes fadeinB {
    0% {
        top: 50%;
        opacity: 0;
    }
    100% {
        top: 30%;
        opacity: 1;
    }
}

@keyframes fadeinB {
    0% {
        top: 50%;
        opacity: 0;
    }
    100% {
        top: 30%;
        opacity: 1;
    }
}

@-webkit-keyframes fadeinA {
    0% {
        top: 60%;
        opacity: 0;
    }
    100% {
        top: 40%;
        opacity: 1;
    }
}

@keyframes fadeinA {
    0% {
        top: 60%;
        opacity: 0;
    }
    100% {
        top: 40%;
        opacity: 1;
    }
}

#page3 p {
    position: absolute;
    top: 40%;
    left: 20%;
    font-size: 15px;
}

.news_1 {
    color: #202b3c;
    font-size: 12px;
}

.news_2 {
    color: #505c6f;
    font-size: 13px;
}

.news_3 {
    color: #fff;
    font-size: 18px;
}

.news_title {
    color: #fff;
    font-size: 20px;
}

.news_date {
    color: #505c6f;
}

.news_detail {
    color: #98999f;
    margin-top: 10px;
}
</style>




