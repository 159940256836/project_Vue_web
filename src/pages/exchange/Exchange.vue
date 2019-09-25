/* eslint-disable eqeqeq */
<template>
  <div class="container exchange" :class="skin">

    <div class="main">
      <div class="right">
        <div class="coin-menu">
          <div class="bazaar-info">
            <!--市场信息-->
            {{ $t('exchange.marketing') }}
          </div>
          <div class="sc_filter">
            <span @click="changeBaseCion('bc')" :class="{active:basecion==='bc'}">BC</span>
            <span @click="changeBaseCion('td')" :class="{active:basecion==='td'}">TD</span>
            <span @click="changeBaseCion('usdt')" :class="{active:basecion==='usdt'}">USDT</span>
            <span @click="changeBaseCion('btc')" :class="{active:basecion==='btc'}">BTC</span>
            <!--<span @click="changeBaseCion('eth')" :class="{active:basecion==='eth'}">ETH</span>-->
            <span v-show="isLogin" @click="changeBaseCion('favor')" :class="{active:basecion==='favor'}">{{$t('coin.option')}}</span>
            <!-- <span :class="{active:basecion==='favor'}">自选</span> -->
            <!-- <Icon style="line-height:32px;" type="android-star"></Icon> -->
          </div>
          <Table
            :no-data-text="$t('common.nodata')"
            @on-current-change="gohref"
            highlight-row
            height="407"
            id="USDT"
            v-show="basecion==='usdt'"
            :columns="coins.columns"
            :data="coins.USDT"
          ></Table>
          <Table
            :no-data-text="$t('common.nodata')"
            @on-current-change="gohref"
            highlight-row
            height="407"
            id="BTC"
            v-show="basecion==='btc'"
            :columns="coins.columns"
            :data="coins.BTC"
          ></Table>
          <!--<Table
                  :no-data-text="$t('common.nodata')"
                  @on-current-change="gohref"
                  highlight-row
                  height="407"
                  id="ETH"
                  v-show="basecion==='eth'"
                  :columns="coins.columns"
                  :data="coins.ETH"
          ></Table>-->
          <Table
            :no-data-text="$t('common.nodata')"
            @on-current-change="gohref"
            highlight-row
            height="407"
            id="TD"
            v-show="basecion==='td'"
            :columns="coins.columns"
            :data="coins.TD"
          ></Table>
          <Table
            :no-data-text="$t('common.nodata')"
            @on-current-change="gohref"
            highlight-row
            height="407"
            id="BC"
            v-show="basecion==='bc'"
            :columns="coins.columns"
            :data="coins.BC"
          ></Table>
          <Table
            @on-current-change="gohref"
            highlight-row
            height="407"
            v-show="basecion==='favor'"
            :no-data-text="$t('common.nodata')"
            id="collect"
            :columns="favorColumns"
            :data="coins.favor"
          ></Table>
        </div>
        <div class="trade-wrap">
          <div class="recent-deal">
            <!--最近成交-->
            {{ $t('exchange.recent_deal') }}
          </div>
          <Table
            :no-data-text="$t('common.nodata')"
            height="443"
            :columns="trade.columns"
            :data="trade.rows"
          ></Table>
        </div>
      </div>
      <div class="center">
        <div class="symbol">
          <!--    <div class="item" @click="currentCoinFavorChange">
                        <Icon
                            v-if="currentCoinIsFavor"
                            type="ios-star"
                            color="#3399ff"
                            size="22"
                        />
                        <Icon
                            v-else
                            type="ios-star-outline"
                            color="#3399ff"
                            size="22"
                        />
                    </div>-->
          <div class="item">
            <span class="coin">
              {{currentCoin.coin?currentCoin.coin:'---'}}
                <small style="font-size: 16px">/{{currentCoin.base?currentCoin.base:'---'}} </small>
            </span>
            <span v-if="$route.params.pathMatch == 'self_bc'">
              <img style="width: 15px" :src="infoLogo">
            </span>
            <!--<span v-if="$route.params.pathMatch == 'ltc_btc'?'期':''"></span>-->
          </div>
          <!--币币交易币种详情-->
          <div
            class="item"
            style="cursor: pointer"
            @click="getCoinDetails"
          >
            <span>{{ $t('exchange.coinDetails.coinDetail') }}</span>
          </div>
          <!--<div :class="setMain === 'up'?'sell':'buy'">
            asdfasdfasdfasdfa
          </div>-->
          <div class="item">
            <!--<span class="text">{{$t('coin.up')}}</span>-->
            <!--涨跌逻辑修改 原 红跌（卖出） 绿涨（买入） -->
            <span
              class="num"
              :class="setMain == 'up'?{buy:currentCoin.change<0,sell:currentCoin.change>0}:{buy:currentCoin.change>0,sell:currentCoin.change<0}"
            >
              {{currentCoin.rose?currentCoin.rose:'---'}}
            </span>
          </div>
          <div class="item">
            <!--<span class="text">{{$t('coin.last')}}</span>-->
            <!--涨跌逻辑修改 原 红跌（卖出） 绿涨（买入） -->
            <span
              class="num"
              :class="setMain == 'up'?{buy:currentCoin.change<0,sell:currentCoin.change>0}:{buy:currentCoin.change>0,sell:currentCoin.change<0}"
              v-if="currentCoin.close"
            >
              {{currentCoin.close | toFixed(baseCoinScale)}}
            </span>
            <span
              class="num"
              v-else
              :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}"
            >
              ---
            </span>
            <span
              v-if="currentCoinBC == 'BC'"
              class="price-cny"
            >
             ≈ {{currentCoin.price * 1 | toFixed(2)}} CNY
            </span>

            <span class="price-cny" v-else>
              ≈  ￥{{currentCoin.usdRate*CNYRate | toFixed(2)}}
            </span>
          </div>
          <div class="item">
            <span
              class="text item-media"
            >
              {{$t('coin.celling')}}:
            </span>
            <span
              class="num item-media-red"
              v-if="currentCoin.high"
            >
              {{currentCoin.high | toFixed(baseCoinScale)}}
            </span>
            <span class="num item-media-red" v-else>---</span>
          </div>
          <div class="item">
            <span
              class="text item-media"
            >
              {{$t('coin.floor')}}:
            </span>
            <span
              class="num item-media-bule"
              v-if="currentCoin.low >= 0"
            >
              {{currentCoin.low | toFixed(baseCoinScale)}}
            </span>
            <span class="num item-media-bule" v-else>---</span>
          </div>
          <div class="item">
            <span
              class="text item-media"
            >
              {{$t('coin.turnover')}}:
            </span>
            <span class="num">
              {{currentCoin.volume?currentCoin.volume:'---'}} {{currentCoin.coin?currentCoin.coin:'---'}}
            </span>
          </div>
          <div class="item" style="flex: 1">
            <span class="set" @click="changeSkin">
              <img style="float: right" :src="set" alt="切换主题">
            </span>
              <!--<img style="float: right" :src="skin == 'night' ? night : day" alt="">-->
          </div>
        </div>
        <div class="imgtable" :loading="loadingButton7">
          <!-- <div class="handler">
            <span @click="changeImgTable('k')" :class="{active:currentImgTable==='k'}">k线图</span>
            <span @click="changeImgTable('s')" :class="{active:currentImgTable==='s'}">深度图</span>
          </div> -->
          <div id="kline_container" :class="{hidden:currentImgTable==='s'}"></div>
          <!-- <DepthGraph :class="{hidden:currentImgTable==='k'}" ref="depthGraph"></DepthGraph> -->
        </div>
        <div class="trade_wrap">
          <div class="trade_panel trade_panel_logout">
            <div class="mask" v-show="!isLogin">
              <span>
                <!--请先-->
                {{$t("common.please")}}
                <router-link to="/login">
                  <span style="color:#3399ff; font-size:24px">{{$t("common.login")}}</span>
                </router-link> /
                <router-link to="/register">
                  <span style="color:#f67951; font-size:24px">{{$t("common.register")}}</span>
                </router-link>
              </span>
            </div>
            <div class="mask" v-show="isLogin&&!member.realName">
              <span>
                <!--请先-->
                {{$t("common.please")}}
                <router-link to="/uc/safe">
                  <span style="color:#3399ff; font-size:24px">
                    <!--实名认证-->
                    {{$t("uc.safe.verified")}}
                  </span>
                </router-link>
              </span>
            </div>
            <div class="trade_menu">
              <ul>
                <template v-for="(item, index) in btnList">
                  <li @click="tab(index)" :class="{active:item.check}">{{item.text}}</li>
                </template>
              </ul>
              <!-- <span @click="limited_price" :class="{active:!showMarket}">{{$t("exchange.limited_price")}}</span>
                            <span @click="market_price" :class="{active:showMarket}">{{$t("exchange.market_price")}}</span>
                            <span @click="stopLossFun" :class="{active:stopLoss}">止盈止损</span>
                            <div class="fee-wrap">
                                <Checkbox v-model="isUseBHB" @on-change="changeUseBHB">使用BHB抵扣手续费</Checkbox>
                                <span>Taker{{$t("exchange.fees_rate")}}：{{symbolFee|toPercent}}</span>
                                <span>Maker{{$t("exchange.fees_rate")}}：{{symbolFee|toPercent}}</span>
                                <a href="/#/helpdetail?cate=1&id=7&cateTitle=常见问题">
                                    <Icon type="ios-help-circle-outline" color="#fff" size="16" />
                                </a>
                            </div> -->
            </div>
            <div class="trade_bd">
              <div class="panel panel_buy">
                <div v-if="isLogin" class="hd hd_login">
                  <span>{{$t("exchange.canuse")}}</span>
                  <b>{{wallet.base|toFloor(baseCoinScale)}}</b>
                  <span>{{currentCoin.base}}</span>
                  <router-link :to="rechargeUSDTUrl">{{$t("exchange.recharge")}}</router-link>
                  <!-- <span style="float:right;margin-right:10px; color:#39f;cursor: pointer;" @click="transFerFun">{{$t('coin.transfer')}}</span> -->
                  <!-- <a :href="rechargeUSDTUrl">{{$t("exchange.recharge")}}</a> -->
                </div>
                <div class="hd" v-else>
                </div>
                <div class="bd bd_limited" v-show="btnList[0].check==true">
                  <Form ref="formValidate">
                    <FormItem>
                      <Input
                        @on-keyup="keyEvent"
                        v-model="form.buy.limitPrice"
                        :placeholder="$t('exchange.buyprice')"
                      ></Input>
                      <label>{{currentCoin.base}}</label>
                      <p class="math_price">≈
                        {{currentCoin.usdRate/currentCoin.close*form.buy.limitPrice*CNYRate||0|toFixed(2)}} CNY</p>
                    </FormItem>
                    <FormItem>
                      <Input @on-keyup="keyEvent" v-model="form.buy.limitAmount"
                             :placeholder="$t('exchange.buynum')"></Input>
                      <!-- <label>{{currentCoin.coin}}</label> -->
                      <label><span>{{$t("exchange.bestbuy")}}:</span>{{(this.wallet.base /
                        this.form.buy.limitPrice).toFixed(4)}}</label>
                    </FormItem>
                    <div class="slider-wrap">
                      <Slider :class="setMain=='up'?'silder-buy':'silder-sell'" v-model="sliderBuyLimitPercent" show-tip="always"
                              :tip-format="tipFormat" :disabled="sliderBuyDisabled"></Slider>
                      <div class="slider-stop" v-for="item in sliderStep" :style="'left: '+item+'%;'"
                           @click="silderGo('sliderBuyLimitPercent',item)">
                        <div class="slider-block"></div>
                      </div>
                    </div>
                    <div class="total buy_total">
                      {{$t("exchange.amount")}}
                      <span>{{form.buy.limitTurnover|toFloor(baseCoinScale)}}</span> {{currentCoin.base}}
                    </div>
                    <Button :class="setMain == 'up'?'bg-green':'bg-red'" @click="buyWithLimitPrice" v-show="isLogin" :loading="loadingButton1">
                      <!--{{$t("exchange.buyin")}}{{currentCoin.coin}}-->
                      <span>
                        {{ !loadingButton1 ? ($t("exchange.buyin") + currentCoin.coin) : $t("exchange.buyin")}}
                      </span>
                    </Button>
                  </Form>
                </div>
                <!--止盈止损买入-->
                <!--<div class="bd bd_limited" v-show="btnList[2].check==true">
                                    <Form ref="formValidate" :label-width="50">
                                        <FormItem :label="$t('coin.trigger')">
                                            <Input @on-keyup="keyEvent" v-model="form.buy.stopPrice" placeholder=""></Input>
                                            <label>{{currentCoin.base}}</label>
                                            &lt;!&ndash; <p class="math_price">≈ {{currentCoin.usdRate/currentCoin.close*form.buy.stopPrice*CNYRate||0|toFixed(2)}} CNY</p> &ndash;&gt;
                                        </FormItem>
                                        <FormItem :label="$t('coin.buying')">
                                            <Input @on-keyup="keyEvent" v-model="form.buy.stopBuyPrice" :placeholder="$t('exchange.buynum')"></Input>
                                            <label>{{currentCoin.base}}</label>
                                        </FormItem>
                                        <FormItem :label="$t('coin.volume')">
                                            <Input @on-keyup="keyEvent" v-model="form.buy.stopBuyAmount" :placeholder="$t('exchange.buynum')"></Input>
                                            <label>{{currentCoin.coin}}</label>
                                        </FormItem>
                                        <div class="slider-wrap">
                                            <Slider :class="setMain=='up'?'silder-buy':'silder-sell'" v-model="sliderBuyStopPercent" show-tip="always" :tip-format="tipFormat" :disabled="sliderBuyDisabled"></Slider>
                                            <div class="slider-stop" v-for="item in sliderStep" :style="'left: '+item+'%;'" @click="silderGo('sliderBuyStopPercent',item)">
                                                <div class="slider-block"></div>
                                            </div>
                                        </div>
                                        <div class="total buy_total">
                                            {{$t("exchange.amount")}}
                                            <span>{{form.buy.stopTurnover|toFloor(baseCoinScale)}}</span> {{currentCoin.base}}
                                        </div>
                                        <Button :class="setMain == 'up'?'bg-green':'bg-red'" @click="buyWithStopPrice" v-show="isLogin" :loading="loadingButton3">
                                            &lt;!&ndash;{{$t("exchange.buyin")}}{{currentCoin.coin}}&ndash;&gt;
                                            <span>
                                                {{ !loadingButton3 ? ($t("exchange.buyin") + currentCoin.coin) : $t("exchange.buyin")}}
                                            </span>
                                        </Button>
                                    </Form>
                                </div>-->
                <div class="bd bd_market" v-show="btnList[1].check==true">
                  <Form ref="formValidate">
                    <FormItem>
                      <Input disabled :placeholder="$t('exchange.buytip')"/>
                      <label>{{currentCoin.base}}</label>
                    </FormItem>
                    <FormItem>
                      <Input @on-keyup="keyEvent" v-model="form.buy.marketAmount" :placeholder="$t('exchange.amount')"/>
                      <label>{{currentCoin.base}}</label>
                    </FormItem>
                    <div class="slider-wrap">
                      <Slider :class="setMain=='up'?'silder-buy':'silder-sell'" v-model="sliderBuyMarketPercent" show-tip="always"
                              :tip-format="tipFormat" :disabled="sliderBuyDisabled"></Slider>
                      <div class="slider-stop" v-for="item in sliderStep" :style="'left: '+item+'%;'"
                           @click="silderGo('sliderBuyMarketPercent',item)">
                        <div class="slider-block"></div>
                      </div>
                    </div>
                    <Button :class="setMain == 'up'?'bg-green':'bg-red'" @click="buyWithMarketPrice" v-show="isLogin" :loading="loadingButton2">
                      <!--{{$t("exchange.buyin")}}{{currentCoin.coin}}-->
                      <span>
                          {{ !loadingButton2 ? ($t("exchange.buyin") + currentCoin.coin) : $t("exchange.buyin")}}
                      </span>
                    </Button>
                  </Form>
                </div>
              </div>
              <span class="border-height"></span>
              <div class="panel panel_sell">
                <div v-if="isLogin" class="hd hd_login">
                  <span>{{$t("exchange.canuse")}}</span>
                  <b>{{wallet.coin|toFloor(coinScale)}}</b>
                  <span>{{currentCoin.coin}}</span>
                  <router-link :to="rechargeCoinUrl">{{$t("exchange.recharge")}}</router-link>
                  <!-- <span style="float:right;margin-right:10px; color:#39f;cursor: pointer;" @click="transFerFun">{{$t('coin.transfer')}}</span> -->
                  <!-- <transfermodal :modal="modal" @closetransferModal="closeModal"></transfermodal> -->
                  <!-- <a :href="rechargeCoinUrl">{{$t("exchange.recharge")}}</a> -->
                </div>
                <div class="hd" v-else>
                </div>
                <div class="bd bd_limited" v-show="btnList[0].check==true">
                  <Form ref="formValidate">
                    <FormItem>
                      <Input @on-keyup="keyEvent" v-model="form.sell.limitPrice"
                             :placeholder="$t('exchange.sellprice')"></Input>
                      <label>{{currentCoin.base}}</label>
                      <p class="math_price">≈
                        {{currentCoin.usdRate/currentCoin.close*form.sell.limitPrice*CNYRate||0|toFixed(2)}} CNY</p>
                    </FormItem>
                    <FormItem>
                      <Input @on-keyup="keyEvent" v-model="form.sell.limitAmount"
                             :placeholder="$t('exchange.sellnum')"></Input>
                      <label>{{currentCoin.coin}}</label>
                    </FormItem>
                    <!-- <Slider class="silder-sell" v-model="sliderSellLimitPercent" :step="25" show-stops :tip-format="tipFormat"></Slider> -->
                    <div class="slider-wrap">
                      <Slider :class="setMain=='up'?'silder-sell':'silder-buy'" v-model="sliderSellLimitPercent" show-tip="always"
                              :tip-format="tipFormat" :disabled="sliderSellDisabled"></Slider>
                      <div class="slider-stop" v-for="item in sliderStep" :style="'left: '+item+'%;'"
                           @click="silderGo('sliderSellLimitPercent',item)">
                        <div class="slider-block"></div>
                      </div>
                    </div>
                    <!--<FormItem>-->
                    <!--<Slider v-model="value6" :step="25" show-stops min="0" max="100"></Slider>-->
                    <!--</FormItem>-->
                    <div class="total sell_total">
                      {{$t("exchange.amount")}}
                      <span>{{form.sell.limitTurnover|toFloor(coinScale)}}</span> {{currentCoin.base}}
                    </div>
                    <Button :class="setMain == 'up'?'bg-red':'bg-green'" @click="sellLimitPrice" v-show="isLogin" :loading="loadingButton4">
                      <!--{{$t("exchange.sellout")}}{{currentCoin.coin}}-->
                      <span>
                                                {{ !loadingButton4 ? ($t("exchange.sellout") + currentCoin.coin) : $t("exchange.sellout")}}
                                            </span>
                    </Button>
                  </Form>
                </div>
                <!--止盈止损卖出-->
                <!--<div class="bd bd_limited" v-show="btnList[2].check==true">
                                    <Form ref="formValidate" :label-width="50">
                                        <FormItem :label="$t('coin.trigger')">
                                            <Input @on-keyup="keyEvent" v-model="form.sell.stopPrice" :placeholder="$t('coin.trigger')"></Input>
                                            <label>{{currentCoin.base}}</label>
                                            &lt;!&ndash; <p class="math_price">≈ {{currentCoin.usdRate/currentCoin.close*form.sell.limitPrice*CNYRate||0|toFixed(2)}} CNY</p> &ndash;&gt;
                                        </FormItem>
                                        <FormItem :label="$t('coin.sellingRate')">
                                            <Input @on-keyup="keyEvent" v-model="form.sell.stopBuyPrice" :placeholder="$t('exchange.sellnum')"></Input>
                                            <label>{{currentCoin.base}}</label>
                                        </FormItem>
                                        <FormItem :label="$t('coin.sellingVolume')">
                                            <Input @on-keyup="keyEvent" v-model="form.sell.stopBuyAmount" :placeholder="$t('exchange.sellnum')"></Input>
                                            <label>{{currentCoin.coin}}</label>
                                        </FormItem>
                                        &lt;!&ndash; <Slider class="silder-sell" v-model="sliderSellLimitPercent" :step="25" show-stops :tip-format="tipFormat"></Slider> &ndash;&gt;
                                        <div class="slider-wrap">
                                            <Slider :class="setMain=='up'?'silder-sell':'silder-buy'" v-model="sliderSellStopPercent" show-tip="always" :tip-format="tipFormat" :disabled="sliderSellDisabled"></Slider>
                                            <div class="slider-stop" v-for="item in sliderStep" :style="'left: '+item+'%;'" @click="silderGo('sliderSellStopPercent',item)">
                                                <div class="slider-block"></div>
                                            </div>
                                        </div>
                                        &lt;!&ndash;<FormItem>&ndash;&gt;
                                        &lt;!&ndash;<Slider v-model="value6" :step="25" show-stops min="0" max="100"></Slider>&ndash;&gt;
                                        &lt;!&ndash;</FormItem>&ndash;&gt;
                                        <div class="total sell_total">
                                            {{$t("exchange.amount")}}
                                            <span>{{form.sell.stopTurnover|toFloor(coinScale)}}</span> {{currentCoin.base}}
                                        </div>
                                        <Button :class="setMain == 'up'?'bg-red':'bg-green'" @click="sellStopPrice" v-show="isLogin" :loading="loadingButton6">
                                            &lt;!&ndash;{{$t("exchange.sellout")}}{{currentCoin.coin}}&ndash;&gt;
                                            <span>
                                                {{ !loadingButton6 ? ($t("exchange.sellout") + currentCoin.coin) : $t("exchange.sellout")}}
                                            </span>
                                        </Button>
                                    </Form>
                                </div>-->
                <div class="bd bd_market" v-show="btnList[1].check==true">
                  <Form ref="formValidate">
                    <FormItem>
                      <Input disabled :placeholder="$t('exchange.selltip')"></Input>
                      <label>{{currentCoin.base}}</label>
                    </FormItem>
                    <FormItem>
                      <Input @on-keyup="keyEvent" v-model="form.sell.marketAmount"
                             :placeholder="$t('exchange.sellnum')"></Input>
                      <label>{{currentCoin.coin}}</label>
                    </FormItem>
                    <!-- <Slider class="silder-sell" v-model="sliderSellMarketPercent" :step="25" show-stops :tip-format="tipFormat"></Slider> -->
                    <div class="slider-wrap">
                      <Slider :class="setMain=='up'?'silder-sell':'silder-buy'" v-model="sliderSellMarketPercent" show-tip="always"
                              :tip-format="tipFormat" :disabled="sliderSellDisabled"></Slider>
                      <div class="slider-stop" v-for="item in sliderStep" :style="'left: '+item+'%;'"
                           @click="silderGo('sliderSellMarketPercent',item)">
                        <div class="slider-block"></div>
                      </div>
                    </div>
                    <!--<FormItem>-->
                    <!--<Slider v-model="value6" :step="25" show-stops min="0" max="100"></Slider>-->
                    <!--</FormItem>-->
                    <Button :class="setMain == 'up'?'bg-red':'bg-green'" @click="sellMarketPrice" v-show="isLogin" :loading="loadingButton5">
                      <!--{{$t("exchange.sellout")}}{{currentCoin.coin}}-->
                      <span>
                                                {{ !loadingButton5 ? ($t("exchange.sellout") + currentCoin.coin) : $t("exchange.sellout")}}
                                            </span>
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="left plate-wrap">
        <div class="handlers">
          <span class="handicap">
            <!--盘口-->
            {{ $t('exchange.handicap') }}
          </span>
          <!--<span
                        @click="changePlate('all')"
                        class="handler handler-all"
                        :class="{active:selectedPlate=='all'}"
                    ></span>
                    <span
                        @click="changePlate('buy')"
                        class="handler handler-green"
                        :class="{active:selectedPlate=='buy'}"
                    ></span>
                    <span
                        @click="changePlate('sell')"
                        class="handler handler-red"
                        :class="{active:selectedPlate=='sell'}"
                    ></span>-->
          <span
            @click="changePlate('all')"
            class="handler"
            :class="{active:selectedPlate=='all'}"
          >
            <!--全部-->
            {{ $t('uc.otcorder.all') }}
          </span>
          <span
            @click="changePlate('buy')"
            class="handler"
            :class="{active:selectedPlate=='buy'}"
          >
            <!--买单-->
            {{ $t('uc.otcorder.type_pay') }}
          </span>
          <span
            @click="changePlate('sell')"
            class="handler"
            :class="{active:selectedPlate=='sell'}"
          >
            <!--卖单-->
            {{ $t('uc.otcorder.type_sale') }}
          </span>
        </div>
        <Table
          :no-data-text="$t('common.nodata')"
          v-show="selectedPlate!='buy'"
          @on-current-change="buyPlate"
          highlight-row
          ref="currentRowTable"
          class="sell_table"
          :columns="plate.columns"
          :data="plate.askRows"
        ></Table>
        <!--setMain == 'up'?{buy:currentCoin.change<0,sell:currentCoin.change>0}:{buy:currentCoin.change>0,sell:currentCoin.change<0}-->
        <div class="plate-nowprice">
          <span
            class="price"
            :class="setMain == 'up'?{buy:currentCoin.change<0,sell:currentCoin.change>0}:{buy:currentCoin.change>0,sell:currentCoin.change<0}"
            v-if="currentCoin.price"
          >
            {{currentCoin.price | toFixed(baseCoinScale)}}
          </span>
          <span
            class="price"
            :class="setMain == 'up'?{buy:currentCoin.change<0,sell:currentCoin.change>0}:{buy:currentCoin.change>0,sell:currentCoin.change<0}"
            v-else
          >
            ---
          </span>
          <span v-if="currentCoin.change>0" :class="setMain == 'up'?'sell':'buy'">↑</span>
          <span v-else :class="setMain == 'up'?'buy':'sell'">↓</span>
          <span
            v-if="currentCoinBC == 'BC'"
            class="price-cny"
          >
            ≈ {{currentCoin.price * 1 | toFixed(2)}} CNY
          </span>
          <span
            v-else
            class="price-cny"
          >
            ≈ {{currentCoin.usdRate * CNYRate | toFixed(2)}} CNY
          </span>
          <!--<span class="price-cny"> ≈ {{currentCoin.usdRate*CNYRate | toFixed(2)}} CNY</span>-->
        </div>
        <Table
          :no-data-text="$t('common.nodata')"
          v-show="selectedPlate!='sell'"
          @on-current-change="sellPlate"
          highlight-row
          class="buy_table"
          :class="{hidden:selectedPlate==='all'}"
          :columns="plate.columns"
          :data="plate.bidRows"
        ></Table>
      </div>
    </div>
    <div class="order" v-show="this.isLogin && this.member.realName">
      <div class="order-handler">
        <span
          class="order-list"
          @click="changeOrder('current')"
          :class="{active:selectedOrder==='current'}"
        >
          {{$t('exchange.curdelegation')}}
        </span>
        <span
          class="order-list"
          @click="changeOrder('history')"
          :class="{active:selectedOrder==='history'}"
        >
          {{$t('exchange.hisdelegation')}}
        </span>
        <div class="single">
          <span
            v-if="currentOrder.rows.length > 2 && selectedOrder === 'current'"
            class="repeal"
            @click="repeal()"
          >
            <!--撤销全部委单-->
            {{$t('exchange.curdelRepealAll')}}
          </span>
          <router-link
            v-show="selectedOrder==='current'"
            class="linkmore"
            to="/order"
          >
            {{$t('coin.view')}}>>
          </router-link>
          <router-link
            v-show="selectedOrder==='history'"
            class="linkmore"
            to="/order"
          >
            {{$t('coin.view')}}>>
          </router-link>
        </div>
      </div>
      <div class="table">
        <Table
          v-if="selectedOrder==='current'"
          :columns="currentOrder.columns"
          :data="currentOrder.rows"
          :loading="currentLoading"
          @on-expand="onExpand"
          :no-data-text="$t('common.nodata')"
        >
        </Table>
        <Table
          v-else
          ref="table"
          :columns="historyOrder.columns"
          :data="historyOrder.rows"
          :loading="historyLoading"
          @on-expand="onExpand"
          :no-data-text="$t('common.nodata')"
        ></Table>
      </div>
    </div>
    <Modal
      v-model="detailsModal"
      class-name="vertical"
      width="760"
      footer-hide
    >
      <div class="details">
        <coinDetails :coinInfo="coinInfo"></coinDetails>
      </div>
    </Modal>
  </div>
</template>
<style scoped lang="scss">
  @import url(../../assets/css/exchange.css);

  $night-bg: #0b1520;
  $night-headerbg: #27313e;
  $night-contentbg: #192330;
  $night-color: #fff;
  .exchange {
    width: 100%;
    color: #fff;
    background-color: #1f2a34;
    // height: calc(100vh - 402px);
    .main {
      display: flex;

      .left {
        /*width: 410px;*/
        min-width: 19%;
        /*flex: 0 0 24%;*/
        background-color: #0E0E28;

        .handlers {
          text-align: right;
          font-size: 14px;
          height: 50px;
          line-height: 30px;
          padding: 10px 0;
          background-color: #0A1928;

          .handler {
            display: inline-block;
            margin-right: 10px;
            font-size: 12px;
            background-size: 100% 100%;
            cursor: pointer;
            height: 20px;
            line-height: 20px;
            padding: 0 7px;
            border-radius: 5px;
            color: #8090af;

            &.active {
              background: #FE5C5C;
              color: #fff !important;
              /*background-image: url("../../assets/images/exchange/plate_all_active.png");*/
            }
          }
        }

        .plate-nowprice {
          text-align: center;
          background-color: #0A1928;
          line-height: 1;
          display: flex;
          align-items: center;
          height: 52px;
          justify-content: center;
          font-size: 18px;
          font-weight: 500;

          .price {
            font-size: 22px;
            margin-right: 10px;
          }

          .price-cny {
            font-size: 14px;
            margin-left: 10px;
            font-weight: 400;
            color: #DDDDDD;
          }
        }
      }

      .center {
        /*width: 1060px;*/
        min-width: 60.8%;
        /*flex: 0 0 50%;*/
        margin-right: 10px;

        .imgtable {
          height: 500px;
          position: relative;
          overflow: hidden;
          margin-bottom: 10px;

          .handler {
            position: absolute;
            top: 10px;
            right: 40px;
            z-index: 1000;

            > span {
              background-color: #fff;
              color: #333;
              padding: 2px;
              margin: 0 5px;
              cursor: pointer;
              border-radius: 2px;
              opacity: 0.5;

              &.active {
                opacity: 1;
              }
            }
          }
        }

        .trade_wrap {
          .trade_menu {
            position: relative;
            background-color: #0A1928;
            /*border-top-left-radius: 6px;*/
            /*border-top-right-radius: 6px;*/
            font-size: 0;
            height: 50px;
            line-height: 50px;

            > ul {
              display: flex;

              li {
                font-size: 16px;
                min-width: 35px;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                font-weight: 600;

                &:first-child {
                  margin-left: 40px;
                }

                margin-right: 50px;

                &.active {
                  border-bottom: 2px solid #FE5C5C;
                  color: #FE5C5C;
                }

                &:first-child {
                  border-top-left-radius: 6px;
                }
              }
            }

            .fee-wrap {
              position: absolute;
              top: 0;
              right: 20px;
              font-size: 12px;

              > span {
                margin-right: 10px;
              }

              > a {
                vertical-align: middle;
              }
            }
          }

          .trade_panel {
            position: relative;

            .mask {
              position: absolute;
              width: 100%;
              height: 100%;
              display: flex;
              background-color: rgba(14, 14, 40, 0.7);
              justify-content: center;
              align-items: center;
              z-index: 100;
              font-size: 24px;
              /*border-radius: 6px;*/
              color: #bcd7e6;
            }
          }

          .trade_panel .panel .hd {
            border-bottom: none;

            b {
              color: #999999;
            }

            a {
              color: #FE5C5C;
            }
          }
        }
      }

      .right {
        /*width: 410px;*/
        min-width: 19%;
        /*flex: 0 0 24%;*/
        margin-right: 10px;

        .coin-menu {
          height: 550px;
          background-color: #141F2B;
          margin-bottom: 10px;
          overflow: hidden;
          /*border-radius: 6px;*/
        }
      }
    }

    .symbol {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      background: #0A1928;
      display: flex;
      /*margin-bottom: 20px;*/
      align-items: center;

      .item {
        min-width: 30px;
        margin-left: 15px;
        line-height: 21px;

        .set {
          display: inline-block;
          cursor: pointer;
          float: right;
          background: url('../../assets/images/exchange/set.svg') no-repeat;

          &:hover {
            background: url('../../assets/images/exchange/set1.svg') no-repeat;
          }
        }

        &:first-child {
          margin-left: 0;
        }

        .price-cny {
          font-size: 12px;
          color: #dddddd;
        }

        .coin {
          font-weight: 600;
          font-size: 16px;
        }

        .text {
          width: 100%;
          font-size: 12px;
          color: #999999;
          margin-bottom: 5px;
        }

        .text1 {
          color: #8090AF;
        }

        .num {
          color: #dddddd;
          font-size: 14px;
        }

        > img {
          display: block;
          cursor: pointer;
        }

        @media screen and (max-width: 1380px) {
          .item-media {
            display: none;
          }
          .item-media-red {
            color: #00b275;
          }
          .item-media-bule {
            color: #f15057;
          }
        }
      }

      /*.item-media {*/
      /*    */
      /*}*/

    }

    .order {
      margin-top: 20px;

      .order-handler {
        background: #0A1928;
        height: 50px;
        line-height: 50px;
        font-size: 0;

        > .order-list {
          min-width: 50px;
          font-size: 14px;
          display: inline-block;
          color: #fff;
          cursor: pointer;
          line-height: 48px;
          background-color: transparent;
          margin-right: 50px;

          &.active {
            color: #FE5C5C;
            border-bottom: 2px solid #FE5C5C;
            background-color: transparent;
            border-radius: 0;
          }

          &:first-child {
            margin-left: 30px;
            border-top-left-radius: 6px;
          }

          &:last-child {
            border-top-right-radius: 6px;
          }
        }

        .single {
          width: 350px;
          float: right;
          position: relative;

          .repeal {
            position: absolute;
            right: 115px;
            top: -6px;
            border: 0;
            color: #FE5C5C;
            font-size: 14px;
            padding: 3px 5px;
            border-radius: 5px;
            background: transparent;
            cursor: pointer;
          }
        }
      }
    }
  }

  .details {
    padding: 50px 20px;
    color: #fff;
  }

  .exchange.day {
    color: #333;
    background-color: #f4f6f8;

    .main {
      .left {
        background-color: #fff;

        .handlers {
          background-color: #fff;

          .handler {
            color: #666;
          }
        }

        .plate-nowprice {
          background-color: #F7F7F7;
          border-top: 1px solid #eeeeee;
          border-bottom: 1px solid #eeeeee;

          .price-cny {
            color: #666;
          }
        }
      }

      .imgtable {
        border: 1px solid #eeeeee;
        border-top: 0;
        /*border-radius: 6px;*/
        .handler {
          > span {
            border: 1px solid #333;
          }
        }
      }

      .trade_wrap {
        .trade_menu {
          background-color: #F7F7F7;
          border: 1px solid #EEEEEE;

          > ul {
            display: flex;

            li {
              font-size: 16px;
              padding: 0 20px;
              cursor: pointer;

              &.active {
                background-color: #F7F7F7;
                color: #FE5C5C;
              }

              &:first-child {
                border-top-left-radius: 6px;
              }
            }
          }
        }

        .mask {
          background-color: rgba(0, 0, 0, 0.4);
          color: #fff;
        }

        .trade_panel .panel .hd {
          border-bottom: none;

          b {
            color: #666;
            font-weight: 100;
          }

          a {
            color: #FE5C5C;
          }
        }
      }
      .ivu-icon {
        color: #333 !important;
      }

      .right {
        width: 410px;
        .coin-menu {
          background-color: #fff;
          margin-bottom: 10px;
        }
        .trade-wrap {
          border: 1px solid #eeeeee;
        }
      }
    }

    /*.trade_panel {*/
    /*  .mask {*/
    /*    background-color: rgba(0, 0, 0, 0.4);*/
    /*    color: #fff;*/
    /*  }*/
    /*}*/

    .trade_panel .panel .hd {
      border-bottom: none;

      b {
        color: #333;
      }

      .right {
        .coin-menu {
          background-color: #fff;
        }
      }
    }

    .symbol {
      background-color: #F7F7F7;
      border: 1px solid #eeeeee;
      /*box-shadow: 0 0 2px #ccc;*/

      .item {
        font-weight: bold;
        .price-cny {
          font-size: 12px;
          color: #333;
        }

        .text {
          color: #999;
        }

        .num {
          color: #666666;
        }
      }
    }

    .order {
      box-shadow: 0 2px 2px #ccc;
      min-height: 227px;

      .order-handler {
        margin-right: -2px;
        background-color: #fff;

        > span {
          color: #333;
          background-color: #fafafa;
          /*box-shadow: 0 0 2px #ccc;*/

          &.active {
            color: #FE5C5C;
            background-color: #fff;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .vertical {
    .ivu-modal {
      top: 20%;
    }
  }

</style>
<script>
  import expandRow from '@components/exchange/expand.vue'
  import Datafeeds from '@js/charting_library/datafeed/bitrade.js'
  import transfermodal from '../../components/transfer/Index'
  import coinDetails from '../../components/exchange/coinDetails'

  const Stomp = require('stompjs')
  const SockJS = require('sockjs-client')
  const moment = require('moment')
  // const map = new Map([['LIMIT_PRICE', '限价'], ['MARKET_PRICE', '市价'], ['CHECK_FULL_STOP', '止盈止损']]);
  const map = new Map([['LIMIT_PRICE', '限价'], ['MARKET_PRICE', '市价']])
  import DepthGraph from '@components/exchange/DepthGraph.vue'
  import $ from '@js/jquery.min.js'

  export default {
    components: {
      expandRow,
      DepthGraph,
      transfermodal,
      coinDetails
    },
    beforeRouteLeave(to, from, next) {
      if (this.stompClient) {
        this.stompClient.disconnect()
      }
      next()
    },
    data() {
      const self = this
      return {
        setData: '',
        coinInfo: {}, // 币种详情
        detail: '',
        detailCoin: '',
        currentLoading: true, // 当前委单默认loading
        historyLoading: true, // 历史委单默认loading
        set: require('../../assets/images/exchange/set.svg'),
        // day: require('../../assets/images/exchange/night.png'), // 黑色版本
        // night: require('../../assets/images/exchange/day.png'), // 白色版本
        infoLogo: require('../../assets/images/exchange/infoLogo.png'), // 期
        loadingButton1: false, // 接口请求loading
        loadingButton2: false, // 接口请求loading
        loadingButton3: false, // 接口请求loading
        loadingButton4: false, // 接口请求loading
        loadingButton5: false, // 接口请求loading
        loadingButton6: false, // 接口请求loading
        loadingButton7: false, // 接口请求loading
        modal: false,
        currentTradingPrice: '', // title默认当前交易价
        btnList: [
          {
            text: self.$t('exchange.limited_price'),
            check: true
          },
          {
            text: self.$t('exchange.market_price'),
            check: false
          }
          /*,
                {
                    text: self.$t("coin.stop"),
                    check: false
                }*/
        ],
        sliderStep: [25, 50, 75, 100],
        sliderBuyLimitPercent: 0,
        sliderSellLimitPercent: 0,
        sliderBuyMarketPercent: 0,
        sliderSellMarketPercent: 0,
        sliderBuyStopPercent: 0,
        sliderSellStopPercent: 0,
        memberRate: 0, // 用户身份，用于是否允许开启BHB抵扣手续费
        // userRealVerified: false, //是否实名认证
        collecRequesting: false,
        currentCoinIsFavor: false,
        // isUseBHB: false, //是否试用BHB抵扣手续费
        // skin: 'night', // 皮肤样式day&night
        skin: 'day', // 皮肤样式day&night
        currentImgTable: 'k',
        stopLoss: false,
        selectedOrder: 'current', // 当前显示的委托记录
        selectedPlate: 'all', // 当前显示的买卖盘
        CNYRate: null,
        datafeed: null,
        defaultPath: 'btc_bc',
        basecion: 'bc',
        coinScale: 4,
        baseCoinScale: 2,
        symbolFee: 0.001,
        buyone: '',
        sellone: '',
        currentCoin: {
          base: '',
          coin: '',
          symbol: ''
        },
        // selected: require('../../assets/images/selected.png'), // 已选
        // choose: require('../../assets/images/choose.png'), // 未选
        favorColumns: [
          {
            title: this.$t('exchange.symbol'),
            key: 'coin',
            sortable: false,
            className: 'coin-menu-symbol',
            render: (h, params) => {
              return h('div', [
                h('icon', {
                  props: {
                    color: params.row.isFavor? '#FE5C5C':'#CCCCCC',
                    size: '18',
                  },
                  class: 'iconfont iconchangyongtubiao-mianxing--copy',
                  nativeOn: {
                    click: () => {
                      event.stopPropagation() // 阻止事件冒泡
                      // if (this.isLogin) {
                      //   if (
                      //                             event.currentTarget.className ==
                      //                             'ivu-icon ivu-icon-android-star'
                      //                         ) {
                      //     this.cancelCollect(params.index, params.row)
                      //     event.currentTarget.className ==
                      //                                 'ivu-icon ivu-icon-android-star-outline'
                      //   } else {
                      //     this.collect(params.index, params.row)
                      //     event.currentTarget.className =
                      //                                 'ivu-icon ivu-icon-android-star'
                      //   }
                      // } else {
                      //   this.$Message.warning(this.$t('common.logintip'))
                      // }
                      if (this.isLogin) {
                        if (params.row.isFavor) {
                          this.cancelCollect(params.index, params.row)
                        } else {
                          this.collect(params.index, params.row)
                        }
                      } else {
                        this.$Message.warning(this.$t('common.logintip'))
                      }
                    }
                  }
                }),
                h('span', params.row.symbol)
              ])
            }
          },
          {
            title: this.$t('exchange.lastprice'),
            key: 'close',
            sortable: true,
            sortMethod: function (a, b, type) {
              const a1 = parseFloat(a)
              const b1 = parseFloat(b)
              if (type == 'asc') {
                return a1 - b1
              } else {
                return b1 - a1
              }
            }
          },
          {
            title: this.$t('exchange.daychange'),
            key: 'rose',
            sortable: true,
            sortMethod: function (a, b, type) {
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
              const className = this.setMain == 'up' ? (parseFloat(row.rose) < 0 ? 'buy' : 'sell') : (parseFloat(row.rose) < 0 ? 'sell' : 'buy')
              /*const className = this.setMain=='up'?(parseFloat(row.rose) < 0 ? 'sell' : 'buy'):parseFloat(row.rose) < 0 ? 'buy' : 'sell'*/
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
          }
        ],
        // 当前市场上的交易币种，按交易对分
        coins: {
          _map: [],
          BTC: [],
          /*ETH: [],*/
          USDT: [],
          TD: [],
          BC: [],
          favor: [],
          columns: [
            {
              title: this.$t('exchange.coin'),
              key: 'coin',
              sortable: false,
              className: 'coin-menu-symbol',
              render: (h, params) => {
                return h('div', [
                  h('icon', {
                    props: {
                      color: params.row.isFavor? '#FE5C5C':'#CCCCCC',
                      size: '18',
                    },
                    class: 'iconfont iconchangyongtubiao-mianxing--copy',
                    nativeOn: {
                      click: () => {
                        event.stopPropagation() // 阻止事件冒泡
                        if (this.isLogin) {
                          if (params.row.isFavor) {
                            this.cancelCollect(params.index, params.row)
                          } else {
                            this.collect(params.index, params.row)
                          }
                        } else {
                          this.$Message.warning(this.$t('common.logintip'))
                        }
                      }
                    }
                  }),
                  h('span', params.row.coin)
                ])
              }
            },
            {
              title: this.$t('exchange.lastprice'),
              key: 'close',
              sortable: true,
              sortMethod: function (a, b, type) {
                const a1 = parseFloat(a)
                const b1 = parseFloat(b)
                if (type == 'asc') {
                  return a1 - b1
                } else {
                  return b1 - a1
                }
              }
            },
            {
              title: this.$t('exchange.daychange'),
              key: 'rose',
              sortable: true,
              sortMethod: function (a, b, type) {
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
                const className = this.setMain == 'up' ? (parseFloat(row.rose) < 0 ? 'buy' : 'sell') : (parseFloat(row.rose) < 0 ? 'sell' : 'buy')
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
            }
          ]
        },
        wallet: {
          base: 0.0,
          coin: 0.0
        },
        showMarket: false,
        fixHistoryHeight: 295,
        // rechargeUrl:'#/finance/recharge',
        // rechargeUSDTUrl:'#/finance/recharge?name=USDT',
        form: {
          buy: {
            limitPrice: 0.0,
            limitAmount: '',
            marketAmount: 0.0,
            limitTurnover: 0.0,
            stopPrice: 0.0,
            stopBuyPrice: 0.0,
            stopBuyAmount: 0.0,
            stopTurnover: 0.0
          },
          sell: {
            limitPrice: 0.0,
            limitAmount: '',
            marketAmount: 0.0,
            limitTurnover: 0.0,
            stopPrice: 0.0,
            stopBuyPrice: 0.0,
            stopBuyAmount: 0.0,
            stopTurnover: 0.0
          }
        },
        trade: {
          rows: [],
          columns: [
            {
              title: self.$t('exchange.price'),
              key: 'price',
              render: (h, params) => {
                const row = params.row
                const className = this.setMain=='up' ? (row.direction == 'BUY' ? 'sell' : 'buy') : (row.direction == 'BUY' ? 'buy' : 'sell')

                return h(
                    'span',
                    {
                      attrs: {
                        class: className
                      }
                    },
                    params.row.price.toFixed(this.baseCoinScale)
                )
              },
              renderHeader: (h, params) => {
                const title =
                    self.$t('exchange.price') + '(' + self.currentCoin.base + ')'
                return h('span', {}, title)
              }
            },
            {
              title: self.$t('exchange.num'),
              key: 'amount',
              render: (h, params) => {
                return h('span', {}, params.row.amount.toFixed(this.coinScale))
              },
              renderHeader: (h, params) => {
                const title =
                    self.$t('exchange.num') + '(' + self.currentCoin.coin + ')'
                return h('span', {}, title)
              }
            },
            {
              title: self.$t('exchange.time'),
              key: 'time',
              render: (h, params) => {
                return h('span', {}, this.timeFormat(params.row.time))
              }
            }
          ]
        },
        // 最新价的 table 数据;
        plate: {
          maxPostion: 14, // 买卖盘口数据条数最大限制
          columns: [
            // {
            //   title: self.$t("exchange.stall"),
            //   key: "postion",
            //   render: (h, params) => {
            //     const row = params.row;
            //     const className = row.direction.toLowerCase();
            //     const title =
            //       (row.direction == "BUY"
            //         ? self.$t("exchange.buyin")
            //         : self.$t("exchange.sellout")) +
            //       " " +
            //       row.position;
            //     return h(
            //       "span",
            //       {
            //         attrs: {
            //           class: className
            //         }
            //       },
            //       title
            //     );
            //   }
            // },
            {
              //   价格;
              title: self.$t('exchange.price'),
              key: 'price',
              render: (h, params) => {
                let str = ''
                let price = ''
                let className = ''
                // const className = params.row.direction.toLowerCase()
                if (this.setMain == 'up') {
                  if (params.row.direction == 'SELL') {
                    className = 'buy'
                  } else {
                    className = 'sell'
                  }
                } else if (this.setMain == 'down') {
                  if (params.row.direction == 'BUY') {
                    className = 'buy'
                  } else {
                    className = 'sell'
                  }
                }
                // const className = this.setMain == 'up'? this.plateSellStyle:this.plateSellBuy
                params.row.price === 0 && (str = h('span', {}, '--'))
                params.row.price != 0 &&
                (price = params.row.price.toFixed(this.baseCoinScale)) &&
                (str = h(
                    'span',
                    {
                      attrs: {
                        class: className
                      }
                    },
                    price
                ))
                return str
              },
              renderHeader: (h, params) => {
                const title =
                    self.$t('exchange.price') + '(' + self.currentCoin.base + ')'
                return h('span', {}, title)
              }
            },
            {
              title: self.$t('exchange.num'),
              key: 'amount',
              render: (h, params) => {
                let str = ''
                params.row.amount == 0 && (str = h('span', {}, '--'))
                params.row.amount != 0 &&
                (str = h(
                    'span',
                    {},
                    params.row.amount.toFixed(this.coinScale)
                ))
                return str
              },
              renderHeader: (h, params) => {
                const title =
                    self.$t('exchange.num') + '(' + self.currentCoin.coin + ')'
                return h('span', {}, title)
              }
            },
            {
              title: self.$t('exchange.total'),
              key: 'totalAmount',
              render: (h, params) => {
                if (params.row.price == 0 || params.row.totalAmount == 0) {
                  return h('span', {}, '--')
                } else {
                  return h(
                      'span',
                      {},
                      params.row.totalAmount.toFixed(this.coinScale)
                  )
                }
              },
              renderHeader: (h, params) => {
                const title =
                    self.$t('exchange.total') + '(' + self.currentCoin.coin + ')'
                return h('span', {}, title)
              }
            },
            {
              className: 'percenttd',
              width: 1,
              render: (h, params) => {
                let width = '0',
                    // backgroundColor =
                    //     params.row.direction === 'BUY' ? '#00b275' : '#f15057',
                    backgroundColor = this.setMain == 'up'?(params.row.direction === 'BUY' ? 'rgba(255, 131, 136, 0.85)' : 'rgba(0, 178, 117, 0.92)'):(params.row.direction === 'BUY' ? 'rgba(0, 178, 117, 0.92)' : 'rgba(255, 131, 136, 0.85)'),
                    totle = this.setMain == 'up'?
                        (params.row.direction === 'BUY'
                            ? this.plate.askTotle
                            : this.plate.bidTotle):
                        (params.row.direction === 'BUY'
                            ? this.plate.bidTotle
                            : this.plate.askTotle)
                if (params.row.totalAmount) {
                  width = (params.row.totalAmount / totle).toFixed(4) * 100 + '%'
                }
                return h(
                    'div',
                    {
                      style: {
                        width,
                        backgroundColor
                      },
                      attrs: {
                        class: 'percentdiv'
                      }
                    },
                    ' '
                )
              }
            }
          ],
          askRows: [],
          bidRows: []
        },
        historyTableData: [],
        currentTableData: [],
        currentCoinBC: '',
        currentOrder: {
          columns: [
            {
              /* 时间*/
              title: self.$t('exchange.time'),
              key: 'time',
              render: (h, params) => {
                return h('span', {}, this.dateFormat(params.row.time))
              }
            },
            /* 交易对*/
            {
              title: self.$t('coin.deal'),
              key: 'symbol'
            },
            /* 触发价*/
            // {
            //     title: self.$t("coin.trigger"),
            //     key: "triggerPrice"
            // },
            /* 类型*/
            {
              title: self.$t('coin.type'),
              render(h, params) {
                return h(
                    'span', {}, map.get(params.row.type)
                )
              }
            },
            /* 方向*/
            {
              title: self.$t('exchange.direction'),
              key: 'direction',
              render: (h, params) => {
                const row = params.row
                const className = row.direction.toLowerCase()
                return h(
                    'span',
                    {
                      attrs: {
                        class: className
                      }
                    },
                    row.direction == 'BUY'
                        ? self.$t('exchange.buyin')
                        : self.$t('exchange.sellout')
                )
              }
            },
            /* 价格*/
            {
              title: self.$t('exchange.price'),
              key: 'price',
              render(h, params) {
                return h('span', self.toFloor(params.row.price))
              }
            },
            /* 数量*/
            {
              title: self.$t('exchange.num'),
              key: 'amount',
              render(h, params) {
                return h('span', self.toFloor(params.row.amount))
              }
            },
            /* 已成交*/
            {
              title: self.$t('exchange.traded'),
              key: 'tradedAmount',
              render(h, params) {
                return h('span', self.toFloor(params.row.tradedAmount))
              }
            },
            /* 成交金额*/
            {
              title: self.$t('coin.amount'),
              key: 'turnover',
              render(h, params) {
                return h('span', self.toFloor(params.row.turnover))
              }
            },
            /* 操作*/
            {
              title: self.$t('exchange.action'),
              key: 'operate',
              width: 110,
              render: (h, params) => {
                return h(
                    'span',
                    {
                      props: {
                        size: 'small',
                        type: 'warning'
                      },
                      style: {
                        color: '#FE5C5C'
                      },
                      on: {
                        click: () => {
                          this.cancel(params.index)
                        }
                      }
                    },
                    self.$t('exchange.undo')
                )
              }
            },
            {
              title: self.$t('new.Detailss'),
              type: 'expand',
              width: 80,
              render: (h, params) => {
                return h(expandRow, {
                  props: {
                    skin: params.row.skin,
                    rows: this.currentTableData
                  }
                })
              }
            }
          ],
          rows: []
        },
        historyOrder: {
          pageSize: 3,
          total: 3,
          page: 1,
          columns: [
            {
              title: self.$t('exchange.time'),
              key: 'time',
              render: (h, params) => {
                return h('span', {}, this.dateFormat(params.row.time))
              }
            },
            {
              title: self.$t('coin.deal'),
              key: 'symbol'
            },
            {
              title: self.$t('coin.type'),
              render(h, params) {
                return h(
                    'span', {}, map.get(params.row.type)
                )
              }
            },
            {
              title: self.$t('exchange.direction'),
              key: 'direction',
              render: (h, params) => {
                const row = params.row
                const className = row.direction.toLowerCase()
                return h(
                    'span',
                    {
                      attrs: {
                        class: className
                      }
                    },
                    row.direction == 'BUY'
                        ? self.$t('exchange.buyin')
                        : self.$t('exchange.sellout')
                )
              }
            },
            {
              title: self.$t('exchange.price'),
              key: 'price',
              render(h, params) {
                return h('span', self.toFloor(params.row.price))
              }
            },
            {
              title: self.$t('exchange.num'),
              key: 'amount',
              render(h, params) {
                return h('span', self.toFloor(params.row.amount))
              }
            },
            {
              title: self.$t('exchange.done'),
              key: 'tradedAmount',
              render(h, params) {
                return h('span', self.toFloor(params.row.tradedAmount))
              }
            },
            {
              title: self.$t('coin.amount'),
              key: 'turnover',
              render(h, params) {
                return h('span', self.toFloor(params.row.turnover))
              }
            },
            {
              title: self.$t('exchange.status'),
              key: 'status',
              render: (h, params) => {
                const status = params.row.status
                if (status == 'COMPLETED') {
                  return h(
                      'span',
                      {
                        style: {
                          color: '#3399ff'
                        }
                      },
                      self.$t('exchange.finished')
                  )
                } else if (status == 'CANCELED') {
                  return h(
                      'span',
                      {
                        style: {
                          color: '#3399ff'
                        }
                      },
                      self.$t('exchange.canceled')
                  )
                } else {
                  return h('span', {}, '--')
                }
              }
            },
            {
              title: self.$t('new.Detailss'),
              type: 'expand',
              width: 80,
              render: (h, params) => {
                return h(expandRow, {
                  props: {
                    skin: params.row.skin,
                    rows: this.historyTableData
                  }
                })
              }
            }
          ],
          rows: []
        },
        fullTrade: {},
        detailsModal: false, // 币币交易详情模态框默认
        isChinese: null
      }
    },
    computed: {
      rechargeUSDTUrl: function () {
        return '/personal/recharge'
        // return "#/finance/recharge?name=" + this.currentCoin.base;
      },
      rechargeCoinUrl: function () {
        return '/personal/recharge'
        // return "#/finance/recharge?name=" + this.currentCoin.coin;
      },
      isLogin: function () {
        return this.$store.getters.isLogin
      },
      member: function () {
        return this.$store.getters.member
      },
      lang: function () {
        return this.$store.state.lang
      },
      setMain: function () {
        return this.$store.state.setMain
      },
      sliderBuyDisabled() {
        let account = this.wallet.base,
            min = this.toFloor(1 / Math.pow(10, this.baseCoinScale))
        return account < min
      },
      sliderSellDisabled() {
        let account = this.wallet.coin,
            min = this.toFloor(1 / Math.pow(10, this.coinScale))
        return account < min
      }
    },
    watch: {
      setMain(newValue) {
        console.log(newValue)
        // if (newValue === 'down') {
        //   console.log(1)
        this.getKline()
        this.getPlate()
        // }
      },
      'form.buy.limitPrice': function (val) {
        // let price = this.form.buy.limitPrice,
        //     account = this.wallet.base,
        //     amount = ''
        // console.log(price, account, amount)
        // if (val > 0) {
        //   amount = this.toFloor(
        //       account
        //           .div(price)
        //           .mul(this.sliderBuyLimitPercent)
        //           .mul(0.01),
        //       this.coinScale
        //   )
        // }
        // this.form.buy.limitAmount = amount
        this.form.buy.limitTurnover = this.toFloor(
            val.mul(this.form.buy.limitAmount),
            this.baseCoinScale
        )
      },
      'form.buy.limitAmount': function (val) {
        this.form.buy.limitTurnover = this.toFloor(
            val.mul(this.form.buy.limitPrice),
            this.baseCoinScale
        )
      },
      'form.buy.stopBuyPrice': function (val) {
        let price = this.form.buy.stopBuyPrice,
            account = this.wallet.base,
            amount = 0
        if (val > 0) {
          amount = this.toFloor(
              account
                  .div(price)
                  .mul(this.sliderBuyStopPercent)
                  .mul(0.01),
              this.coinScale
          )
        }
        this.form.buy.stopBuyAmount = amount
        this.form.buy.stopTurnover = this.toFloor(
            val.mul(amount),
            this.baseCoinScale
        )
      },
      'form.buy.stopBuyAmount': function (val) {
        this.form.buy.stopTurnover = this.toFloor(
            val.mul(this.form.buy.stopBuyPrice),
            this.baseCoinScale
        )
      },
      'form.sell.limitPrice': function (val) {
        this.form.sell.limitTurnover = this.toFloor(
            val.mul(this.form.sell.limitAmount),
            this.coinScale
        )
      },
      'form.sell.limitAmount': function (val) {
        this.form.sell.limitTurnover = this.toFloor(
            val.mul(this.form.sell.limitPrice),
            this.coinScale
        )
      },
      'form.sell.stopBuyPrice': function (val) {
        this.form.sell.stopTurnover = this.toFloor(
            val.mul(this.form.sell.stopBuyAmount),
            this.coinScale
        )
      },
      'form.sell.stopBuyAmount': function (val) {
        this.form.sell.stopTurnover = this.toFloor(
            val.mul(this.form.sell.stopBuyPrice),
            this.coinScale
        )
      },
      lang: function () {
        this.updateLangData()
      },
      // currentCoin: function () {
      //     this.updateTitle();
      // },
      'currentCoin.price': function () {
        this.currentTradingPrice = this.currentCoin.price
      },
      $route(to, from) {
        this.init()
      },
      sliderBuyLimitPercent() {
        let price = this.form.buy.limitPrice,
            account = this.wallet.base,
            amount = 0
        if (price > 0) {
          amount = this.toFloor(
              account
                  .div(price)
                  .mul(this.sliderBuyLimitPercent)
                  .mul(0.01),
              this.coinScale
          )
        }
        this.form.buy.limitAmount = amount
      },
      sliderSellLimitPercent() {
        const account = this.wallet.coin
        this.form.sell.limitAmount = this.toFloor(
            account.mul(this.sliderSellLimitPercent).mul(0.01),
            this.coinScale
        )
      },
      sliderBuyMarketPercent() {
        const account = this.wallet.base
        this.form.buy.marketAmount = this.toFloor(
            account.mul(this.sliderBuyMarketPercent).mul(0.01),
            this.baseCoinScale
        )
      },
      sliderSellMarketPercent() {
        const account = this.wallet.coin
        this.form.sell.marketAmount = this.toFloor(
            account.mul(this.sliderSellMarketPercent).mul(0.01),
            this.coinScale
        )
      },
      sliderBuyStopPercent() {
        let price = this.form.buy.stopBuyPrice,
            account = this.wallet.base,
            amount = 0
        if (price > 0) {
          amount = this.toFloor(
              account
                  .div(price)
                  .mul(this.sliderBuyStopPercent)
                  .mul(0.01),
              this.coinScale
          )
        }
        this.form.buy.stopBuyAmount = amount
      },
      sliderSellStopPercent() {
        const account = this.wallet.coin
        this.form.sell.stopBuyAmount = this.toFloor(
            account.mul(this.sliderSellStopPercent).mul(0.01),
            this.coinScale
        )
      }
    },
    created: function () {
      this.getdefaultSymbol().then(res => {
        this.defaultPath = res
        this.init()
        this.statusCurreny()
      })
    },
    mounted: function () {
      // console.log(this.tableData);
      // this.getCNYRate();
      // this.getSymbolScale();
      // this.getSymbol();
      // this.getPlate();
      // // this.getPlateFull();
      // this.getTrade();
      // if (this.isLogin) {
      //   // this.getFavor();
      //   // this.getMember(); //获取是否实名认证
      //   this.getWallet();
      //   this.getCurrentOrder();
      //   this.getHistoryOrder();
      // }
      // // this.setback();
      if (this.isLogin) {
        this.getMember()
      }
    },
    methods: {
      // 币币交易币种详情信息
      getCoinDetails() {
        // 判断当前是否存在默认交易对
        // 存在把当前交易币种截取之后传到后台
        // 不存在获取对默认交易对并进行截取传参
        if (this.$route.params.pathMatch) {
          this.detail = this.$route.params.pathMatch.match(/(\S*)_/)[1].toUpperCase() // 截取字符串特定符号前的全部字符
          this.isChinese = this.$store.getters.lang === 'English' ? 0 : 1
        } else {
          this.detail = this.detailCoin.match(/(\S*)_/)[1]
          this.isChinese = this.$store.getters.lang === 'English' ? 0 : 1
        }
        this.detailsModal = true
        this.$http.get(this.host + `/uc/coinDescription/detail?coinName=${this.detail}&isChinese=${this.isChinese}`).then(res => {
          const data = res.body
          if (data.code == 0) {
            this.coinInfo = data.data
          } else {
            this.coinInfo = []
          }
        })
      },
      // 默认交易对
      getdefaultSymbol() {
        return this.$http.get(this.host + '/market/default/symbol').then(res => {
          const data = res.body
          if (data.code == 0) {
            return new Promise((resolve, reject) => {
              this.detailCoin = data.data.web
              resolve(data.data.web)
            }).catch(reject => reject('BTC_BC'))
          }
        })
      },
      tab(index) {
        this.btnList.map((ele, i) => {
          if (i == index) {
            this.btnList[i].check = true
          } else {
            this.btnList[i].check = false
          }
        })
      },
      silderGo(silder, val) {
        this[silder] = val
      },
      statusCurreny() {
        let params = this.$route.params.pathMatch
        if (params == undefined) {
          // this.$router.push('/exchange/' + this.defaultPath)
          params = this.defaultPath
          const title = this.currentTradingPrice + ' ' + 'BTC/BC' + ' bdw'
          this.settiele(title)
        } else {
          /* this.currentTradingPrice + ' ' +*/
          // if(){}
          const title = this.currentTradingPrice + ' ' + params.replace('_', '/').toUpperCase() + ' bdw'
          this.settiele(title)
        }
      },
      setcurrentcoin() {
        let params = this.$route.params.pathMatch
        if (params == undefined) {
          // this.$router.push('/exchange/' + this.defaultPath)
          params = this.defaultPath
        }
        const coin = params.toUpperCase().split('_')[0]
        const base = params.toUpperCase().split('_')[1]
        this.currentCoin.coin = coin
        this.currentCoinBC = base
        this.currentCoin.base = base
        this.currentCoin.symbol = coin + '/' + base
      },
      init() {
        this.setData = localStorage.getItem('SETSTYLE')
        let params = this.$route.params.pathMatch
        if (params == undefined) {
          // this.$router.push('/exchange/' + this.defaultPath)
          params = this.defaultPath
        }
        const basecion = params.split('_')[1]
        if (basecion) {
          this.basecion = basecion.toLowerCase()
        }
        this.setcurrentcoin()
        this.$store.commit('navigate', 'nav-exchange')
        this.$store.commit('setSkin', this.skin)
        // console.log(this.coins, basecion, coin, base)
        this.getCNYRate()
        this.getSymbolScale()
        this.getSymbol() // 包含 K线图、getFavor、startWebsock等
        this.getPlate() // 买卖盘
        // this.getPlateFull(); // 深度图
        this.getTrade()
        if (this.isLogin && this.member.realName) {
          // this.getMember(); // 获取是否实名认证
          // this.getMemberRate(); // 获取会员等级用与是否抵扣BHB资格
          this.getWallet() // 账户资产信息
          this.getCurrentOrder() // 当前委托
          // this.getHistoryOrder()
        }
        this.sliderBuyLimitPercent = 0
        this.sliderSellLimitPercent = 0
        this.sliderBuyMarketPercent = 0
        this.sliderSellMarketPercent = 0
        this.sliderBuyStopPercent = 0
        this.sliderSellStopPercent = 0
      },
      tipFormat(val) {
        return val + '%'
      },
      changeBaseCion(str) {
        this.basecion = str
      },
      // getMemberRate() {
      //   this.$http
      //     .post(this.host + "/uc/wealth/query", {
      //       memberId: this.member.id
      //     })
      //     .then(res => {
      //       if (res.status == 200 && res.body.code == 0) {
      //         this.memberRate = res.body.data.memberRate;
      //       }
      //     });
      // },
      getMember() {
        // 获取个人安全信息
        this.$http
            .post(this.host + '/uc/approve/security/newSetting')
            .then(response => {
              const resp = response.body
              this.member.realName = resp.data.realName
            })
      },
      // changeUseBHB() {
      //     if (this.memberRate > 0) {
      //         //会员身份：0普通，1超级群主，3超级合伙人
      //         this.$Modal.confirm({
      //             content: "使用BHB抵扣手续费的交易不参与交易挖矿，是否使用？",
      //             okText: "使用，不参与交易挖矿",
      //             cancelText: "不使用，参与交易挖矿",
      //             width: "460",
      //             onOk: () => {
      //                 this.isUseBHB = true;
      //             },
      //             onCancel: () => {
      //                 this.isUseBHB = false;
      //             }
      //         });
      //     } else {
      //         this.$Modal.warning({
      //             content: "您当前不符合开通条件，详见使用帮助。",
      //             okText: "关闭",
      //             onOk: () => {
      //                 this.isUseBHB = false;
      //             }
      //         });
      //     }
      // },
      changeSkin() {
        const currentSkin = this.skin
        if (currentSkin === 'day') {
          this.skin = 'night'
        } else {
          this.skin = 'day'
        }
        this.$store.commit('setSkin', this.skin)
        this.getKline()
              // this.getPlateFull();
        if (this.isLogin) {
          this.getCurrentOrder()
          this.getHistoryOrder()
        }
      },
      changePlate(str) {
        if (str != 'all') {
          this.plate.maxPostion = 24
        } else {
          this.plate.maxPostion = 15
        }
        this.selectedPlate = str
        this.getPlate()
      },
      changeImgTable(str) {
        this.currentImgTable = str
      },
      changeOrder(str) {
        if (str == 'current') {
          this.getCurrentOrder()
        }
        if (str == 'history') {
          this.getHistoryOrder()
        }
        this.selectedOrder = str
      },
      setback() {
        const obk = document.getElementsByClassName('container')[0]
        let height = 0
        const doc = document
        window.innerHeight && (height = window.innerHeight)
        !window.innerHeight &&
        doc.body.clientHeight &&
        (height = doc.body.clientHeight)
        !window.innerHeight &&
        !doc.body.clientHeight &&
        doc.documentElement.clientHeight &&
        (height = doc.documentElement.clientHeight)
        obk.style.minHeight = height - 100 + 'px'
      },
      // updateTitle() {
      // let title =
      //   this.currentCoin.price +
      //   " " +
      //   this.currentCoin.rose +
      //   " " +
      //   this.currentCoin.coin +
      //   "/" +
      //   this.currentCoin.base;
      // title += "bdw--国际数字加密资产交易平台";
      // window.document.title = title;
      // },
      updateLangData() {
        this.coins.columns[0].title = this.$t('exchange.coin')
        this.coins.columns[1].title = this.$t('exchange.lastprice')
        this.coins.columns[2].title = this.$t('exchange.daychange')
        // this.coins.columns[3].title = this.$t("exchange.favorite");

        this.trade.columns[0].title = this.$t('exchange.num')
        this.trade.columns[1].title = this.$t('exchange.price')
        this.trade.columns[2].title = this.$t('exchange.direction')
        // this.trade.columns[3].title = this.$t("exchange.time");

        this.plate.columns[0].title = this.$t('exchange.stall')
        this.plate.columns[1].title = this.$t('exchange.price')
        this.plate.columns[2].title = this.$t('exchange.num')
        // this.plate.columns[3].title = this.$t("exchange.total");

        this.currentOrder.columns[0].title = this.$t('exchange.time')
        this.currentOrder.columns[1].title = this.$t('coin.deal')
        // this.currentOrder.columns[3].title = this.$t("coin.trigger");
        this.currentOrder.columns[2].title = this.$t('coin.type')
        this.currentOrder.columns[3].title = this.$t('exchange.direction')
        this.currentOrder.columns[4].title = this.$t('exchange.price')
        this.currentOrder.columns[5].title = this.$t('exchange.num')
        this.currentOrder.columns[6].title = this.$t('exchange.traded')
        this.currentOrder.columns[7].title = this.$t('coin.amount')
        this.currentOrder.columns[8].title = this.$t('exchange.action')
        this.currentOrder.columns[9].title = this.$t('new.Detailss')

        this.historyOrder.columns[0].title = this.$t('exchange.time')
        this.historyOrder.columns[1].title = this.$t('coin.deal')
        this.historyOrder.columns[2].title = this.$t('coin.type')
        this.historyOrder.columns[3].title = this.$t('exchange.direction')
        this.historyOrder.columns[4].title = this.$t('exchange.price')
        this.historyOrder.columns[5].title = this.$t('exchange.num')
        this.historyOrder.columns[6].title = this.$t('exchange.done')
        this.historyOrder.columns[7].title = this.$t('coin.amount')
        this.historyOrder.columns[8].title = this.$t('exchange.status')
        this.historyOrder.columns[9].title = this.$t('new.Detailss')

        this.btnList[0].text = this.$t('exchange.limited_price')
        this.btnList[1].text = this.$t('exchange.market_price')
        // this.btnList[2].text = this.$t("coin.stop");

        // window.tvWidget.options.time_frames[0].title = this.$t("exchange.realtime");
      },
      getCNYRate() {
        this.$http
            .post(this.host + '/market/exchange-rate/usd-cny')
            .then(response => {
              const resp = response.body
              this.CNYRate = resp.data
            })
      },
      getCoin(symbol) {
        return this.coins._map[symbol]
      },
      getKline() {
        const that = this
        const config = {
          autosize: true,
          fullscreen: true, // 布尔值显示图表是否占用窗口中所有可用的空间
          symbol: that.symbol, // 币名称
          interval: '15', // K线默认时间传值
          // timeframe: '3D', // x 周期范围
          timezone: 'Asia/Shanghai', // 默认时区
          toolbar_bg: '#141F2B', // 背景色
          container_id: 'kline_container', // `id`属性为指定要包含widget的DOM元素id。
          // symbolWatermarkProperties_url: ('../../asstes/images/exchange/watermark.jpg'),

          datafeed: that.datafeed, // 请求地址
          library_path:
              process.env.NODE_ENV === 'production'
                  ? '/assets/charting_library/'
                  : 'src/assets/js/charting_library/', // 默认脚本核心文件存储位置
          locale: 'zh',//  语言
          drawings_access: {
            type: 'black',
            tools: [{name: 'Regression Trend'}]
          },
          // 禁用属性
          // 包含功能在默认情况下启用/禁用名称的数组
          disabled_features: [
            // 'left_toolbar', // 左边工具栏

            // "header_widget_dom_node", // 顶部工具栏
            // 'border_around_the_chart', // 周围边框
            // 'pane_context_menu', // 图表右键菜单
            // 'header_fullscreen_button', // 全屏
            // 'header_indicators', // 技术指标线
            'header_resolutions', // 分辨率
            'timeframes_toolbar', // 底部时间栏目
            'header_symbol_search', // 搜索
            'header_chart_type', // 图表类型
            'header_compare', // compare
            'header_undo_redo', // 左右箭头
            'header_screenshot', // 照相机
            'header_saveload', // 上传下载按钮
            'use_localstorage_for_settings', // 用户本地存储
            'save_chart_properties_to_local_storage',
            'volume_force_overlay', // k线与销量分开
            'header_settings', // 设置按钮
            'main_meries_seale_menu' // 隐藏右上角设置
          ],
          // 包含功能在默认情况下启用/禁用名称的数组
          enabled_features: [
            'hide_last_na_study_output',
            'move_logo_to_main_pane' // TradingView login 开启显示在网格上 隐藏显示在网格下
          ],
          custom_css_url: 'bundles/common.css',
          supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'],
          charts_storage_url: 'http://saveload.tradingview.com', // 设置图库页面
          // 下面三项是开发自己的后端用的 前台的请求会带着这三项值
          charts_storage_api_version: '1.1',
          client_id: 'tradingview.com',
          user_id: 'public_user_id',

          overrides: {
            // 'symbolWatermarkProperties.color': 'rgba(255, 255, 255, .1)', // 水印透明度
            'paneProperties.background': '#141F2B', // 背景颜色
            'paneProperties.vertGridProperties.style': 0,

            // 网格线
            'paneProperties.vertGridProperties.color': 'rgba(255,255,255,.04)', // 列分割线
            'paneProperties.horzGridProperties.color': 'rgba(255,255,255,.04)', // 行分割线

            // 蜡烛样式
            'mainSeriesProperties.candleStyle.upColor': '#00b275',
            'mainSeriesProperties.candleStyle.downColor': '#f15057',

            'mainSeriesProperties.candleStyle.drawBorder': false,

            // 烛心颜色
            'mainSeriesProperties.candleStyle.wickUpColor': '#00b275',
            'mainSeriesProperties.candleStyle.wickDownColor': '#f15057',

            // 默认收缩行情信息
            'paneProperties.legendProperties.showLegend': false,

            // 坐标轴和刻度标签颜色
            'scalesProperties.lineColor': '#999999',
            'scalesProperties.textColor': '#999999', // 开高低收
            'mainSeriesProperties.areaStyle.color1': 'rgba(71, 78, 112, 0.5)',
            'mainSeriesProperties.areaStyle.color2': 'rgba(71, 78, 112, 0.5)',
            'mainSeriesProperties.areaStyle.linecolor': '#9194a4',
            // "paneProperties.crossHairProperties.color": "#00b275", // 十字光标颜色

            // 边框颜色
            'mainSeriesProperties.candleStyle.borderUpColor': '#00b275', // 开高低收买入标线
            'mainSeriesProperties.candleStyle.borderDownColor': '#f15057', // 开高低收卖出标线

            // 成交量高度
            "volumePaneSize": "medium",
            "MACDPaneSize": "tiny",
            'scalesProperties.fontSize': 12 // 坐标轴字体
          },
          // 柱状图样式
          studies_overrides: {
            'volume.volume.color.0': 'rgba(241, 80, 87, .3)',  // 第一根的颜色
            'volume.volume.color.1': 'rgba(0, 178, 117, .3)'  // 第二根的颜色
          },
          time_frames: [
            {
              text: '1min',
              resolution: '1',
              description: 'realtime',
              title: this.$t('exchange.realtime')
            },
            {
              text: '1min',
              resolution: '1',
              description: '1min'
            },
            {
              text: '5min',
              resolution: '5',
              description: '5min'
            },
            {
              text: '15min',
              resolution: '15',
              description: '15min'
            },
            {
              text: '30min',
              resolution: '30',
              description: '30min'
            },
            {
              text: '1hour',
              resolution: '60',
              description: '1hour',
              title: '1hour'
            },
            // {
            //     text: "4hour",
            //     resolution: "240",
            //     description: "4hour",
            //     title: "4hour"
            // },
            {
              text: '1day',
              resolution: '1D',
              description: '1day',
              title: '1day'
            },
            {
              text: '1week',
              resolution: '1W',
              description: '1week',
              title: '1week'
            },
            {
              text: '1mon',
              resolution: '1M',
              description: '1mon'
            }
          ]
        }
        // 黑白切换
        if (that.skin === 'day') {
          config.toolbar_bg = '#fff', // 背景色
          config.custom_css_url = 'bundles/common_day.css'
          config.overrides['paneProperties.background'] = '#fff'  // 背景色网格颜色
          config.overrides['mainSeriesProperties.areaStyle.linecolor'] = '#fff'
          config.overrides['scalesProperties.textColor'] = '#666'

          // 网格线
          config.overrides['paneProperties.vertGridProperties.color'] = '#eeeeee'
          config.overrides['paneProperties.horzGridProperties.color'] = '#eeeeee'

          // 蜡烛样式
          config.overrides['scalesProperties.lineColor'] = '#999999' // xy刻度线色值
          config.overrides['mainSeriesProperties.candleStyle.upColor'] = '#39c595' // 第一根的颜色
          config.overrides['mainSeriesProperties.candleStyle.downColor'] = '#f96969' // 第二根的颜色
        }
        // 涨跌逻辑修改 由原来的绿涨（买入）红跌（卖出） 修改为红涨（买入）绿跌（卖出）
        if (that.setMain == 'up') {
          // 柱状图样式
          config.studies_overrides['volume.volume.color.0'] = 'rgba(0, 178, 117, .3)' // 第一根柱的颜色
          config.studies_overrides['volume.volume.color.1'] = 'rgba(241, 80, 87, .3)' // 第二根柱的颜色

          // 蜡烛样式
          config.overrides['mainSeriesProperties.candleStyle.upColor'] = '#f15057' // 第一根的颜色
          config.overrides['mainSeriesProperties.candleStyle.downColor'] = '#00b275' // 第二根的颜色

          // 烛心颜色
          config.overrides['mainSeriesProperties.candleStyle.wickUpColor'] = '#f15057'
          config.overrides['mainSeriesProperties.candleStyle.wickDownColor'] = '#00b275'

          // 边框颜色
          config.overrides['mainSeriesProperties.candleStyle.borderUpColor'] = '#f15057'
          config.overrides['mainSeriesProperties.candleStyle.borderDownColor'] = '#00b275'
        }
        require(['@js/charting_library/charting_library.min.js'], function (tv) {
          const widget = (window.tvWidget = new TradingView.widget(config))
          /* onChartReady 自定义初始化指标线（平均移动线等），设置颜色*/
          widget.onChartReady(function () {
            // widget.chart().executeActionById('drawingToolbarAction')
            // 创建最新价水平线
            widget
                .chart()
                .createStudy('Moving Average', false, false, [5], null, {
                  'plot.color': '#965FC4'
                })
            widget
                .chart()
                .createStudy('Moving Average', false, false, [10], null, {
                  'plot.color': '#84AAD5'
                })
             widget
              .chart()
              .createStudy('Moving Average', false, false, [30], null, {
                  'plot.color': 'rgb(57,109,73)'
              })

            widget
              .chart()
              .createStudy('Moving Average', false, false, [60], null, {
                  'plot.color': 'rgb(127,33,105)'
              })
            widget
                .createButton()
                .attr('title', 'realtime')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(3)
                  widget.setSymbol('', '1')
                })
                .append('<span>分时</span>')
            widget
                .createButton()
                .attr('title', 'M1')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '1')
                })
                .append('<span>1M</span>')
            widget
                .createButton()
                .attr('title', 'M5')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '5')
                })
                .append('<span>5M</span>')

            widget
                .createButton()
                .attr('title', 'M15')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '15')
                })
                .append('<span>15M</span>')
                .addClass('selected') // 静态默认分时
            widget
                .createButton()
                .attr('title', 'M30')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '30')
                })
                .append('<span>30M</span>')

            widget
                .createButton()
                .attr('title', 'H1')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '60')
                })
                .append('<span>1H</span>')
            widget
                .createButton()
                .attr('title', 'H4')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '240')
                })
                .append('<span>4H</span>')
            widget
                .createButton()
                .attr('title', 'D1')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '1D')
                })
                .append('<span>1D</span>')

            widget
                .createButton()
                .attr('title', 'W1')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '1W')
                })
                .append('<span>1W</span>')

            widget
                .createButton()
                .attr('title', 'M1')
                .on('click', function () {
                  if ($(this).hasClass('selected')) return
                  $(this)
                      .addClass('selected')
                      .parent('.group')
                      .siblings('.group')
                      .find('.button.selected')
                      .removeClass('selected')
                  widget.chart().setChartType(1)
                  widget.setSymbol('', '1M')
                })
                .append('<span>1M</span>')
          })
        })
      },
      getFavor() {
        // 查询自选(收藏)
        this.$http
            .post(this.host + this.api.exchange.favorFind, {})
            .then(response => {
              this.coins.favor = []
              this.currentCoinIsFavor = false
              const resp = response.body
              for (let i = 0; i < resp.length; i++) {
                const coin = this.getCoin(resp[i].symbol)
                if (coin != null) {
                  coin.isFavor = true
                  this.coins.favor.push(coin)
                }
                if (this.currentCoin.symbol == resp[i].symbol) {
                  this.currentCoinIsFavor = true
                }
              }
            })
      },
      getSymbol() {
        this.$http.post(this.host + this.api.market.thumb, {}).then(response => {
          const resp = response.body
          // 先清空已有数据
          for (let i = 0; i < resp.length; i++) {
            const coin = resp[i]
            coin.base = resp[i].symbol.split('/')[1]
            this.coins[coin.base] = []
            this.coins._map = []
            this.coins.favor = []
          }
          for (let i = 0; i < resp.length; i++) {
            const coin = resp[i]
            coin.price = resp[i].close = resp[i].close.toFixed(
                this.baseCoinScale
            )
            coin.rose =
                resp[i].chg > 0
                    ? '+' + (resp[i].chg * 100).toFixed(2) + '%'
                    : (resp[i].chg * 100).toFixed(2) + '%'
            coin.coin = resp[i].symbol.split('/')[0]
            coin.base = resp[i].symbol.split('/')[1]
            coin.href = (coin.coin + '_' + coin.base).toLowerCase()
            coin.isFavor = false
            this.coins._map[coin.symbol] = coin
            this.coins[coin.base].push(coin)
            if (coin.symbol == this.currentCoin.symbol) {
              this.currentCoin = coin
              // this.form.buy.limitPrice = this.form.sell.limitPrice = coin.price
            }
          }
          if (this.isLogin) {
            this.getFavor()
          }
          require(['../../assets/js/exchange.js'], function (e) {
            e.clickScTab()
          })
          this.startWebsock()
        })
      },
      getSymbolScale() {
        // 获取精度
        this.$http
            .post(this.host + this.api.market.symbolInfo, {
              symbol: this.currentCoin.symbol
            })
            .then(response => {
              const resp = response.body
              if (resp != null) {
                this.currentCoin.coinScale = resp.coinScale
                this.currentCoin.baseCoinScale = resp.baseCoinScale
                this.baseCoinScale = resp.baseCoinScale
                this.coinScale = resp.coinScale
                this.symbolFee = resp.fee
              }
            })
      },
      getPlate() {
        // 买卖盘
        const params = {}
        params['symbol'] = this.currentCoin.symbol
        this.$http
            .post(this.host + this.api.market.platemini, params)
            .then(response => {
              console.log()
              if (response.data.bid.items[0] != undefined) {
                this.form.sell.limitPrice = response.data.bid.items[0].price
                this.form.buy.limitPrice = response.data.ask.items[0].price
                this.plate.askRows = []
                this.plate.bidRows = []
                const resp = response.body
                if (resp.ask && resp.ask.items) {
                  for (let i = 0; i < resp.ask.items.length; i++) {
                    if (i == 0) {
                      resp.ask.items[i].totalAmount = resp.ask.items[i].amount
                    } else {
                      resp.ask.items[i].totalAmount =
                          resp.ask.items[i - 1].totalAmount + resp.ask.items[i].amount
                    }
                  }
                  if (resp.ask.items.length >= this.plate.maxPostion) {
                    for (let i = this.plate.maxPostion; i > 0; i--) {
                      const ask = resp.ask.items[i - 1]
                      ask.direction = 'SELL'
                      ask.position = i
                      this.plate.askRows.push(ask)
                    }
                    const rows = this.plate.askRows,
                        len = rows.length,
                        totle = rows[0].totalAmount
                    this.plate.askTotle = totle
                  } else {
                    for (let i = 12; i > resp.ask.items.length; i--) {
                      const ask = {price: 0, amount: 0}
                      ask.direction = 'SELL'
                      ask.position = i
                      ask.totalAmount = ask.amount
                      this.plate.askRows.push(ask)
                    }
                    for (let i = resp.ask.items.length; i > 0; i--) {
                      const ask = resp.ask.items[i - 1]
                      ask.direction = 'SELL'
                      ask.position = i
                      this.plate.askRows.push(ask)
                    }
                    const rows = this.plate.askRows
                    const len = rows.length
                    if (rows[this.plate.maxPostion - resp.ask.items.length]) {
                      this.plate.askTotle = rows[this.plate.maxPostion - resp.ask.items.length].totalAmount
                    }
                  }
                }
                if (resp.bid && resp.bid.items) {
                  for (let i = 0; i < resp.bid.items.length; i++) {
                    if (i == 0) {
                      resp.bid.items[i].totalAmount = resp.bid.items[i].amount
                    } else {
                      resp.bid.items[i].totalAmount =
                          resp.bid.items[i - 1].totalAmount + resp.bid.items[i].amount
                    }
                  }
                  for (let i = 0; i < resp.bid.items.length; i++) {
                    const bid = resp.bid.items[i]
                    bid.direction = 'BUY'
                    bid.position = i + 1
                    this.plate.bidRows.push(bid)
                    if (i == this.plate.maxPostion - 1) break
                  }
                  if (resp.bid.items.length < this.plate.maxPostion) {
                    for (
                        let i = resp.bid.items.length;
                        i < this.plate.maxPostion;
                        i++
                    ) {
                      const bid = {price: 0, amount: 0}
                      bid.direction = 'BUY'
                      bid.position = i + 1
                      bid.totalAmount = 0
                      this.plate.bidRows.push(bid)
                    }
                    const rows = this.plate.bidRows,
                        len = rows.length,
                        totle = rows[resp.bid.items.length - 1].totalAmount
                    this.plate.bidTotle = totle
                  } else {
                    const rows = this.plate.bidRows,
                        len = rows.length,
                        totle = rows[len - 1].totalAmount
                    this.plate.bidTotle = totle
                  }
                  // this.plate.bidRows = this.plate.bidRows.slice(0,this.plate.maxPostion);
                }
              }
            })
      },
      // getPlateFull() {
      //     //深度图
      //     let params = {};
      //     params["symbol"] = this.currentCoin.symbol;
      //     this.$http
      //         .post(this.host + this.api.market.platefull, params)
      //         .then(response => {
      //             let resp = response.body;
      //             this.fullTrade = resp;
      //             resp.skin = this.skin;
      //             this.$refs.depthGraph.draw(resp);
      //         });
      // },
      // updatePlate(type, row) {
      //     //发现该方法未被使用（zhp）
      //     if (type == "sell") {
      //         for (let i = 0; i < this.plate.askRows.length; i++) {
      //             if (
      //                 row.price > this.plate.askRows[i].price &&
      //                 i != 0 &&
      //                 this.plate.askRows[i].price > 0
      //             ) {
      //                 this.plate.askRows.splice(i, 0, row);
      //                 this.plate.askRows.shift();
      //                 break;
      //             } else if (
      //                 i == this.plate.askRows.length - 1 &&
      //                 (row.price < this.plate.askRows[i].price ||
      //                     this.plate.askRows[i].price == 0)
      //             ) {
      //                 this.plate.askRows.push(row);
      //                 this.plate.askRows.shift();
      //                 break;
      //             }
      //         }
      //     } else if (type == "buy") {
      //         for (let i = 0; i < this.plate.bidRows.length; i++) {
      //             if (row.price > this.plate.bidRows[i].price) {
      //                 this.plate.bidRows.splice(i, 0, row);
      //                 this.plate.bidRows.pop();
      //                 break;
      //             }
      //         }
      //     }
      // },
      getTrade() {
        const params = {}
        params['symbol'] = this.currentCoin.symbol
        params['size'] = 20
        this.$http
            .post(this.host + this.api.market.trade, params)
            .then(response => {
              this.trade.rows = []
              const resp = response.body
              for (let i = 0; i < resp.length; i++) {
                this.trade.rows.push(resp[i])
              }
            })
      },
      startWebsock() {
        if (this.stompClient) {
          this.stompClient.ws.close()
        }
        let stompClient = null
        const that = this
        const socket = new SockJS(that.host + that.api.market.ws)
        stompClient = Stomp.over(socket)
        this.stompClient = stompClient
        stompClient.debug = false
        // this.datafeed = new Datafeeds.WebsockFeed(that.host+'/market',this.currentCoin,stompClient);
        // this.getKline();
        stompClient.connect({}, function (frame) {
          that.datafeed = new Datafeeds.WebsockFeed(
              that.host + '/market',
              that.currentCoin,
              stompClient,
              that.baseCoinScale
          )
          that.getKline()
          // 订阅价格变化消息
          stompClient.subscribe('/topic/market/thumb', function (msg) {
            that.statusCurreny()
            const resp = JSON.parse(msg.body)
            const coin = that.getCoin(resp.symbol)
            if (coin != null) {
              coin.price = resp.close
              coin.rose = resp.chg > 0
                  ? '+' + (resp.chg * 100).toFixed(2) + '%'
                  : (resp.chg * 100).toFixed(2) + '%'
              // coin.close = resp.close.toFixed(2);
              // coin.high = resp.high.toFixed(2);
              // coin.low = resp.low.toFixed(2);
              coin.close = resp.close
              coin.high = resp.high
              coin.low = resp.low
              coin.turnover = parseInt(resp.volume)
              coin.volume = resp.volume
              coin.usdRate = resp.usdRate
            }
          })
          // 订阅实时成交信息
          stompClient.subscribe(
              '/topic/market/trade/' + that.currentCoin.symbol,
              function (msg) {
                const resp = JSON.parse(msg.body)
                that.trade.rows.unshift(resp)

                // if (resp.length > 0) {
                //   for (let i = 0; i < resp.length; i++) {
                //     that.trade.rows.unshift(resp[i])
                //   }
                // }
                // if (that.trade.rows.length > 30) {
                //   that.trade.rows = that.trade.rows.slice(0, 30)
                // }
              }
          )
          if (that.isLogin) {
            // 订阅委托取消信息
            stompClient.subscribe(
                '/topic/market/order-canceled/' +
                that.currentCoin.symbol +
                '/' +
                that.member.id,
                function (msg) {
                  const resp = JSON.parse(msg.body)
                  that.refreshAccount()
                }
            )
            // 订阅委托交易完成
            stompClient.subscribe(
                '/topic/market/order-completed/' +
                that.currentCoin.symbol +
                '/' +
                that.member.id,
                function (msg) {
                  const resp = JSON.parse(msg.body)
                  that.refreshAccount()
                }
            )
            // 订阅委托部分交易
            stompClient.subscribe(
                '/topic/market/order-trade/' +
                that.currentCoin.symbol +
                '/' +
                that.member.id,
                function (msg) {
                  const resp = JSON.parse(msg.body)
                  that.refreshAccount()
                }
            )
          }
          // 订阅盘口消息
          stompClient.subscribe(
              '/topic/market/trade-plate/buy/' +
              that.currentCoin.symbol,
              function (msg) {
                const resp = JSON.parse(msg.body)
                const bids = resp.items
                that.plate.bidRows = []
                let totle = 0
                for (let i = 0; i < that.plate.maxPostion; i++) {
                  let bid = {}
                  if (i < bids.length) {
                    bid = bids[i]
                  } else {
                    bid['price'] = 0
                    bid['amount'] = 0
                  }
                  bid.direction = 'BUY'
                  bid.position = i + 1
                  that.plate.bidRows.push(bid)
                }
                for (let i = 0; i < that.plate.bidRows.length; i++) {
                  // eslint-disable-next-line eqeqeq
                  if (i == 0 || that.plate.bidRows[i].amount == 0) {
                    that.plate.bidRows[i].totalAmount =
                        that.plate.bidRows[i].amount
                  } else {
                    that.plate.bidRows[i].totalAmount =
                        that.plate.bidRows[i - 1].totalAmount +
                        that.plate.bidRows[i].amount
                  }
                  totle += that.plate.bidRows[i].amount
                }
                that.plate.bidTotle = totle
              }
          )
          // 订阅盘口消息
          stompClient.subscribe(
              '/topic/market/trade-plate/sell/' + that.currentCoin.symbol,
              function (msg) {
                const resp = JSON.parse(msg.body)
                if (resp.direction == 'SELL') {
                  const asks = resp.items
                  that.plate.askRows = []
                  let totle = 0
                  for (let i = that.plate.maxPostion - 1; i >= 0; i--) {
                    let ask = {}
                    if (i < asks.length) {
                      ask = asks[i]
                    } else {
                      ask['price'] = 0
                      ask['amount'] = 0
                    }
                    ask.direction = 'SELL'
                    ask.position = i + 1
                    that.plate.askRows.push(ask)
                  }
                  for (let i = that.plate.askRows.length - 1; i >= 0; i--) {
                    if (
                        i == that.plate.askRows.length - 1 ||
                        that.plate.askRows[i].price == 0
                    ) {
                      that.plate.askRows[i].totalAmount =
                          that.plate.askRows[i].amount
                    } else {
                      that.plate.askRows[i].totalAmount =
                          that.plate.askRows[i + 1].totalAmount +
                          that.plate.askRows[i].amount
                    }
                    totle += that.plate.askRows[i].amount
                  }
                  that.plate.askTotle = totle
                  // if (asks.length >= that.plate.maxPostion){
                  //     that.plate.askRows = [];
                  //
                  //     for(let i=0;i<asks.length;i++){
                  //       if (i == 0) asks[i].totalAmount = asks[i].amount;
                  //       else asks[i].totalAmount = asks[i-1].totalAmount + asks[i].amount;
                  //     }
                  //
                  //     for(let i = that.plate.maxPostion; i > 0 ;i--) {
                  //       let ask = asks[i-1];
                  //       ask.direction = 'SELL';
                  //       ask.position = i;
                  //       that.plate.askRows.push(ask);
                  //     }
                  // }else {
                  //   for (let i=0;i<asks.length;i++){
                  //       that.updatePlate("sell", asks[i]);
                  //   }
                  //
                  //   for(let i=that.plate.askRows.length-1;i>=0;i--){
                  //     that.plate.askRows[i].direction = 'SELL';
                  //     that.plate.askRows[i].position = that.plate.maxPostion - i;
                  //     if (i == that.plate.askRows.length-1) that.plate.askRows[i].totalAmount = that.plate.askRows[i].amount;
                  //     else that.plate.askRows[i].totalAmount = that.plate.askRows[i+1].totalAmount + that.plate.askRows[i].amount;
                  //   }
                  // }
                }

                // if (bids.length >= that.plate.maxPostion){
                //     that.plate.bidRows = [];
                //
                //     for(let i=0;i<bids.length;i++){
                //       if (i == 0) bids[i].totalAmount = bids[i].amount;
                //       else bids[i].totalAmount = bids[i-1].totalAmount + bids[i].amount;
                //     }
                //     for(let i=0;i < that.plate.maxPostion; i++){
                //         let bid = bids[i];
                //         bid.direction = 'BUY';
                //         bid.position = i + 1;
                //         that.plate.bidRows.push(bid);
                //     }
                // }else {
                //     for (let i=0;i<bids.length;i++){
                //       that.updatePlate("buy", bids[i])
                //     }
                //
                //     for(let i=0;i<that.plate.bidRows.length;i++){
                //       that.plate.bidRows[i].direction = 'BUY';
                //       that.plate.bidRows[i].position = i + 1;
                //       if (i == 0) that.plate.bidRows[i].totalAmount = that.plate.bidRows[i].amount;
                //       else that.plate.bidRows[i].totalAmount = that.plate.bidRows[i-1].totalAmount + that.plate.bidRows[i].amount;
                //     }
                // }
              }
          )
        })
      },
      // limited_price() {
      //     this.showMarket = false;
      //     this.stopLoss = false;
      // },
      // market_price() {
      //     this.showMarket = true;
      //     this.stopLoss = false;
      // },
      // stopLossFun() {
      //     this.stopLoss = true;
      //     this.showMarket = false;
      // },
      currentCoinFavorChange(index, row) {
        if (!this.isLogin) {
          this.$Message.warning(this.$t('common.logintip'))
          return
        }
        if (this.collecRequesting) {
          return
        }
        const symbol = this.currentCoin.symbol
        this.collecRequesting = true
        if (this.currentCoinIsFavor) {
          // 已收藏,去取消收藏
          this.$http
              .post(this.host + this.api.exchange.favorDelete, {
                symbol
              })
              .then(response => {
                const resp = response.body
                if (resp.code == 0) {
                  this.$Message.info(this.$t('exchange.cancel_favorite'))
                  // this.getCoin(symbol).isFavor = false;
                  // for (let i = 0; i < this.coins.favor.length; i++) {
                  //   let favorCoin = this.coins.favor[i];
                  //   if (favorCoin.symbol == symbol) {
                  //     this.coins.favor.splice(i, 1);
                  //     break;
                  //   }
                  // }
                  // this.currentCoinIsFavor = true;
                  // this.getFavor();
                  this.getSymbol() // 刷新状态
                  this.currentCoinIsFavor = false
                }
                this.collecRequesting = false
              })
        } else {
          // 去添加收藏
          this.$http
              .post(this.host + this.api.exchange.favorAdd, {symbol})
              .then(response => {
                const resp = response.body
                if (resp.code == 0) {
                  this.$Message.info(this.$t('exchange.do_favorite'))
                  // this.getCoin(symbol).isFavor = true;
                  // row.isFavor = true;
                  // this.coins.favor.push(row);
                  // this.currentCoinIsFavor = true;
                  // this.getFavor();
                  this.getSymbol() // 刷新状态
                  this.currentCoinIsFavor = true
                }
                this.collecRequesting = false
              })
        }
      },
      collect(index, row) {
        if (!this.isLogin) {
          this.$Message.info(this.$t('common.logintip'))
          return
        }
        const params = {}
        params['symbol'] = row.symbol
        this.$http
            .post(this.host + this.api.exchange.favorAdd, params)
            .then(response => {
              const resp = response.body
              if (resp.code == 0) {
                this.$Message.info(this.$t('exchange.do_favorite'))
                this.getCoin(row.symbol).isFavor = true
                row.isFavor = true
                this.coins.favor.push(row)
                if (this.currentCoin.symbol == row.symbol) {
                  this.currentCoinIsFavor = true
                }
              }
            })
      },
      cancelCollect(index, row) {
        if (!this.isLogin) {
          this.$Message.info(this.$t('common.logintip'))
          return
        }
        const params = {}
        params['symbol'] = row.symbol
        this.$http
            .post(this.host + this.api.exchange.favorDelete, params)
            .then(response => {
              const resp = response.body
              if (resp.code == 0) {
                this.$Message.info(this.$t('exchange.cancel_favorite'))
                this.getCoin(row.symbol).isFavor = false
                for (let i = 0; i < this.coins.favor.length; i++) {
                  const favorCoin = this.coins.favor[i]
                  if (favorCoin.symbol == row.symbol) {
                    this.coins.favor.splice(i, 1)
                    break
                  }
                }
                if (this.currentCoin.symbol == row.symbol) {
                  this.currentCoinIsFavor = false
                }
              }
            })
      },
      gohref(currentRow, oldCurrentRow) {
        // location.href = "/#exchange/" + currentRow.href;
        // location.reload();
        const path = '/exchange/' + currentRow.href
        this.$router.push({
          path
        })
      },
      // 限价买入
      buyWithLimitPrice() {
        if (this.form.buy.limitAmount == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.buyamounttip')
          })
          return
        }
        const maxAmount = this.wallet.base / this.form.buy.limitPrice
        if (this.form.buy.limitAmount > maxAmount) {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc:
                this.$t('exchange.buyamounttipwarning') + this.toFloor(maxAmount)
          })
          return
        }
        const that = this
        const params = {}
        params['symbol'] = this.currentCoin.symbol
        params['price'] = this.form.buy.limitPrice
        params['amount'] = this.form.buy.limitAmount
        params['direction'] = 'BUY'
        params['type'] = 'LIMIT_PRICE'
        // params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
        this.loadingButton1 = true
        this.$http
            .post(this.host + this.api.exchange.orderAdd, params)
            .then(response => {
              const resp = response.body
              if (resp.code == 0) {
                this.$Notice.success({
                  title: that.$t('exchange.tip'),
                  desc: that.$t('exchange.success')
                })
                this.loadingButton1 = false
                this.form.buy.limitAmount = ''
                this.getWallet()
                this.getCurrentOrder()
                this.getHistoryOrder()
              } else {
                this.$Notice.error({
                  title: that.$t('exchange.tip'),
                  desc: resp.message
                })
                this.loadingButton1 = false
              }
            })
      },
      // 市价买入
      buyWithMarketPrice() {
        if (this.form.buy.marketAmount == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.pricetip')
          })
          return
        }
        if (this.form.buy.marketAmount > parseFloat(this.wallet.base)) {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.pricetipwarning') + this.wallet.base
          })
          return
        }
        const params = {}
        params['symbol'] = this.currentCoin.symbol
        params['price'] = this.form.sell.limitPrice
        // params["amount"] = this.form.sell.limitAmount;
        params['amount'] = this.form.buy.marketAmount
        params['direction'] = 'BUY'
        params['type'] = 'MARKET_PRICE'
        // params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
        const that = this
        this.loadingButton2 = true
        this.$http.post(this.host + this.api.exchange.orderAdd, params).then(response => {
          const resp = response.body

          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t('exchange.tip'),
              desc: that.$t('exchange.success')
            })
            this.loadingButton2 = false
            this.form.buy.marketAmount = 0
            this.refreshAccount()
          } else {
            this.$Notice.error({
              title: that.$t('exchange.tip'),
              desc: resp.message
            })
            this.loadingButton2 = false
          }
        })
      },
      // 止盈止损买入
      buyWithStopPrice() {
        if (this.form.buy.stopPrice == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.buyamounttip')
          })
          return
        }
        if (this.form.buy.stopBuyAmount == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.buyamounttip')
          })
          return
        }
        const maxAmount = this.wallet.base / this.form.buy.stopBuyPrice
        if (this.form.buy.stopBuyAmount > maxAmount) {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc:
                this.$t('exchange.buyamounttipwarning') + this.toFloor(maxAmount)
          })
          return
        }
        const that = this
        const params = {}
        params['symbol'] = this.currentCoin.symbol
        params['price'] = this.form.buy.stopBuyPrice
        params['amount'] = this.form.buy.stopBuyAmount
        params['direction'] = 'BUY'
        params['type'] = 'CHECK_FULL_STOP'
        params['triggerPrice'] = this.form.buy.stopPrice
        // params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
        this.loadingButton3 = true
        this.$http
            .post(this.host + this.api.exchange.orderAdd, params)
            .then(response => {
              const resp = response.body
              if (resp.code == 0) {
                this.$Notice.success({
                  title: that.$t('exchange.tip'),
                  desc: that.$t('exchange.success')
                })
                this.loadingButton3 = false
                this.form.buy.stopBuyAmount = 0
                this.getWallet()
                this.getCurrentOrder()
                this.getHistoryOrder()
              } else {
                this.$Notice.error({
                  title: that.$t('exchange.tip'),
                  desc: resp.message
                })
                this.loadingButton3 = false
              }
            })
      },
      // 限价卖出
      sellLimitPrice() {
        // let userkey = localStorage.getItem('USERKEY');
        // if (userkey != "aisizx") {
        //     this.$Notice.error({
        //         title: this.$t('exchange.tip'),
        //         desc: "Submit failed"
        //     });
        //     return;
        // }
        if (this.form.sell.limitAmount == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.sellamounttip')
          })
          return
        }
        if (this.form.sell.limitPrice == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.sellpricetip')
          })
          return
        }
        if (this.form.sell.limitAmount > parseFloat(this.wallet.coin)) {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: '最多能卖' + this.wallet.coin + '个'
            // desc: this.$t("exchange.sellamounttipwarning") + this.wallet.coin
          })
          return
        }
        const params = {}
        params['symbol'] = this.currentCoin.symbol
        params['price'] = this.form.sell.limitPrice
        params['amount'] = this.form.sell.limitAmount
        params['direction'] = 'SELL'
        params['type'] = 'LIMIT_PRICE'
        // params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
        const that = this
        this.loadingButton4 = true
        this.$http
            .post(this.host + this.api.exchange.orderAdd, params)
            .then(response => {
              const resp = response.body

              if (resp.code == 0) {
                this.$Notice.success({
                  title: that.$t('exchange.tip'),
                  desc: that.$t('exchange.success')
                })
                this.loadingButton4 = false
                this.form.sell.limitAmount = ''
                this.refreshAccount()
              } else {
                this.$Notice.error({
                  title: that.$t('exchange.tip'),
                  desc: resp.message
                })
                this.loadingButton4 = false
              }
            })
      },
      // 市价卖出
      sellMarketPrice() {
        if (this.form.sell.marketAmount == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.sellamounttip')
          })
          return
        }
        if (this.form.sell.marketAmount > parseFloat(this.wallet.coin)) {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            // desc: this.$t("exchange.sellamounttipwarning") + this.wallet.coin
            desc: '最多能卖' + this.wallet.coin + '个'
          })
          return
        }

        const params = {}
        params['symbol'] = this.currentCoin.symbol
        params['price'] = 0
        params['amount'] = this.form.sell.marketAmount
        params['direction'] = 'SELL'
        params['type'] = 'MARKET_PRICE'
        // params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
        const that = this
        this.loadingButton5 = true
        this.$http.post(this.host + this.api.exchange.orderAdd, params).then(response => {
          const resp = response.body
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t('exchange.tip'),
              desc: that.$t('exchange.success')
            })
            this.loadingButton5 = false
            this.form.sell.marketAmount = 0
            this.refreshAccount()
          } else {
            this.$Notice.error({
              title: that.$t('exchange.tip'),
              desc: resp.message
            })
            this.loadingButton5 = false
          }
        })
      },
      // 止盈止损卖出
      sellStopPrice() {
        if (this.form.sell.stopPrice == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.sellamounttip')
          })
          return
        }
        if (this.form.sell.stopBuyAmount == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.sellamounttip')
          })
          return
        }
        if (this.form.sell.stopBuyPrice == '') {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: this.$t('exchange.sellpricetip')
          })
          return
        }
        if (this.form.sell.stopBuyAmount > parseFloat(this.wallet.coin)) {
          this.$Notice.error({
            title: this.$t('exchange.tip'),
            desc: '最多能卖' + this.wallet.coin + '个'
            // desc: this.$t("exchange.sellamounttipwarning") + this.wallet.coin
          })
          return
        }
        const params = {}
        params['symbol'] = this.currentCoin.symbol
        params['price'] = this.form.sell.stopBuyPrice
        params['amount'] = this.form.sell.stopBuyAmount
        params['direction'] = 'SELL'
        params['type'] = 'CHECK_FULL_STOP'
        params['triggerPrice'] = this.form.sell.stopPrice
        // params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
        const that = this
        this.loadingButton6 = true
        this.$http.post(this.host + this.api.exchange.orderAdd, params).then(response => {
          const resp = response.body
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t('exchange.tip'),
              desc: that.$t('exchange.success')
            })
            this.loadingButton6 = false
            this.form.sell.stopBuyAmount = 0
            this.refreshAccount()
          } else {
            this.$Notice.error({
              title: that.$t('exchange.tip'),
              desc: resp.message
            })
            this.loadingButton6 = false
          }
        })
      },
      buyPlate(currentRow) {
        this.form.buy.limitPrice = currentRow.price
        this.form.sell.limitPrice = currentRow.price
      },
      sellPlate(currentRow) {
        this.form.buy.limitPrice = currentRow.price
        this.form.sell.limitPrice = currentRow.price
      },
      /**
       * 获取钱包信息
       */
      getWallet() {
        this.$http
            .post(this.host + this.api.uc.wallet + this.currentCoin.base, {})
            .then(response => {
              const resp = response.body
              this.wallet.base = resp.data.balance || ''
            })
        this.$http
            .post(this.host + this.api.uc.wallet + this.currentCoin.coin, {})
            .then(response => {
              const resp = response.body
              this.wallet.coin = (resp.data && resp.data.balance) || ''
            })
      },
      getCurrentOrder() {
        // 查询当前委托
        const params = {}
        params['pageNo'] = 1
        params['pageSize'] = 3
        params['symbol'] = this.currentCoin.symbol
        this.currentOrder.rows = []
        const that = this
        this.currentLoading = true
        this.$http
            .post(this.host + this.api.exchange.current, params)
            .then(response => {
              const resp = response.body
              if (resp.data && resp.data.length > 0) {
                this.currentOrder.rows = resp.data.slice(0, 3)
                this.currentOrder.rows.forEach((row, index) => {
                  row.skin = that.skin
                  row.price =
                      row.type == 'MARKET_PRICE'
                          ? that.$t('exchange.marketprice')
                          : row.price
                })
              }
              this.currentLoading = false
            })
      },
      getHistoryOrder(pageNo) {
        // 查询历史委托
        // if (pageNo == undefined) {
        //     pageNo = this.historyOrder.page;
        // } else {
        //     pageNo = pageNo - 1;
        // }
        this.historyOrder.rows = [] // 清空数据
        const params = {}
        // params['pageNo'] = 1
        params['pageSize'] = this.historyOrder.pageSize
        params['symbol'] = this.currentCoin.symbol
        const that = this
        this.historyLoading = true
        this.$http.post(this.host + this.api.exchange.history, params).then(response => {
          const resp = response.body
          const rows = []
          if (resp.data != undefined) {
            if (resp.data.length > 0) {
              this.historyOrder.total = resp.totalElements
              this.historyOrder.page = resp.number
              for (let i = 0; i < 3; i++) {
                const row = resp.data[i]
                if (row) {
                  row.skin = that.skin
                  row.price =
                      row.type == 'MARKET_PRICE'
                          ? that.$t('exchange.marketprice')
                          : row.price
                  // this.historyOrder.rows.push(row);
                  rows.push(row)
                }
              }
              this.historyOrder.rows = rows
            }
          }
          this.historyLoading = false
        })
      },
      // 撤单
      cancel(index) {
        const order = this.currentOrder.rows[index]
        // this.$Modal.confirm({
        //     content: this.$t("exchange.undotip"),
        //     onOk: () => {
        this.$http.post(this.host + this.api.exchange.orderCancel + '/' + order.orderId, {}).then(response => {
          const resp = response.body
          if (resp.code == 0) {
            this.refreshAccount()
          } else {
            this.$Notice.error({
              title: this.$t('exchange.tip'),
              desc: resp.message
            })
          }
        })
        //     }
        // });
      },
      // 一键撤单
      repeal() {
        this.$Modal.confirm({
          content: this.$t('exchange.undotip'),
          onOk: () => {
            this.$http.post(this.host + this.api.exchange.orderCancelAll).then(response => {
              const resp = response.body
              if (resp.code == 0) {
                this.refreshAccount()
              } else {
                this.$Notice.error({
                  title: this.$t('exchange.tip'),
                  desc: resp.message
                })
              }
            })
          }
        })
      },
      // 币币订单详情
      // 展开原生事件  点击左侧展收起
      onExpand(row, status) {
        if (this.selectedOrder === 'current') {
          if (status) {
            this.currentOrder.rows.splice()
            this.currentOrder.rows.filter((item, index) => {
              if (item.orderId == row.orderId) {
                item._expanded = true   // 展开选中的行
              } else {
                item._expanded = false   // 其他行关闭
              }
              return item
            })
            // this.historyTableData = this.TableData1
          } else {
            this.currentTableData.splice()
            this.currentTableData.map((item, index) => {
              if (item.orderId == row.orderId) {
                item._expanded = false   // 展开选中的行
              } else {
                item._expanded = false   // 其他行关闭
              }
              return item
            })
          }
          this.$http.post(this.host + this.api.exchange.orderDetails, {
            orderId: row.orderId
          }).then(res => {
            const data = res.body
            if (data.code == 0) {
              if (this.selectedOrder === 'current') {
                this.currentTableData = data.data
              } else {
                this.historyTableData = data.data
              }
            }
          })
        } else {
          if (status) {
            this.historyOrder.rows.splice()
            this.historyOrder.rows.filter((item, index) => {
              if (item.id === row.id) {
                item._expanded = true   // 展开选中的行
              } else {
                item._expanded = false   // 其他行关闭
              }
              return item
            })
            // this.historyTableData = this.TableData1
          } else {
            this.historyTableData.splice()
            this.historyTableData.map((item, index) => {
              if (item.id === row.id) {
                item._expanded = false   // 展开选中的行
              } else {
                item._expanded = false   // 其他行关闭
              }
              return item
            })
          }
          this.$http.post(this.host + this.api.exchange.orderDetails, {
            orderId: row.id
          }).then(res => {
            const data = res.body
            if (data.code == 0) {
              if (this.selectedOrder === 'current') {
                this.currentTableData = data.data
              } else {
                this.historyTableData = data.data
              }
            }
          })
        }
      },
      refreshAccount: function () {
        this.getCurrentOrder()
        this.getHistoryOrder()
        this.getWallet()
      },
      timeFormat: function (tick) {
        return moment(tick).format('HH:mm:ss')
      },
      dateFormat: function (tick) {
        return moment(tick).format('YYYY-MM-DD HH:mm:ss')
      },
      keyEvent(event) {
        const val = $(event.target).val()
        if (val !== '') {
          // eslint-disable-next-line no-irregular-whitespace
          const r = /^[0-9]+\.?[0-9]{0,9}$/　　// 正数
          const flag = r.test(val)
          if (flag) {
            const re1 = new RegExp(
                '([0-9]+.[0-9]{' + this.baseCoinScale + '})[0-9]*',
                ''
            )
            this.form.buy.limitPrice = this.form.buy.limitPrice
                .toString()
                .replace(re1, '$1')
            this.form.sell.limitPrice = this.form.sell.limitPrice
                .toString()
                .replace(re1, '$1')
            this.form.buy.marketAmount = this.form.buy.marketAmount
                .toString()
                .replace(re1, '$1')
            this.form.buy.stopBuyPrice = this.form.buy.stopBuyPrice
                .toString()
                .replace(re1, '$1')
            this.form.sell.stopBuyPrice = this.form.sell.stopBuyPrice
                .toString()
                .replace(re1, '$1')

            const re2 = new RegExp('([0-9]+.[0-9]{' + this.coinScale + '})[0-9]*', '')
            console.log(this.form.buy.limitAmount)
            this.form.buy.limitAmount = this.form.buy.limitAmount
                .toString()
                .replace(re2, '$1')
            console.log(this.form.buy.limitAmount)
            this.form.buy.stopBuyAmount = this.form.buy.stopBuyAmount
                .toString()
                .replace(re2, '$1')

            this.form.sell.limitAmount = this.form.sell.limitAmount
                .toString()
                .replace(re2, '$1')
            this.form.sell.stopBuyAmount = this.form.sell.stopBuyAmount
                .toString()
                .replace(re2, '$1')

            this.form.sell.marketAmount = this.form.sell.marketAmount
                .toString()
                .replace(re2, '$1')
          } else {
            $(event.target).val('')
          }
        }
      },
      // transFerFun() {
      //     this.modal = true;
      // },
      closeModal() {
        this.getWallet()
        this.modal = false
      }
    }
  }
</script>

