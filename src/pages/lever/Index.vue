<template>
    <div class="leverBox">
        <div class="main-box">
            <div class="leftBox">
                <h4>{{$t('coin.Leveraged')}}</h4>
                <ul>
                    <li>
                        <div>{{$t('coin.deal')}}</div>
                        <div>{{$t('coin.rate')}}</div>
                    </li>
                    <li
                        v-for="(item,index) in allLeverList"
                        :key="index"
                        @click="changLeverSymbol(index)"
                        :class="{'active':active == index}"
                    >
                        <div>{{item.symbol}}</div>
                        <div>{{item.explosionRiskRate}}%</div>
                        <div class="triangle"></div>
                    </li>
                </ul>
            </div>
            <div class="rightBox">
                <div class="tips">{{symbol}}
                    <Icon type="ios-alert" color="#2d8cf0" />{{$t('coin.when')}}≤{{this.inseRate}}%{{$t('coin.repay')}}</div>
                <ul>
                    <li v-for="(item,index) in symbolList" :key="index">
                        <div>
                            <div class="title">{{$t('coin.available')}}&nbsp;&nbsp;{{item.baseUnit}}</div>
                            <div class="content">{{item.baseBanlance}}</div>
                        </div>
                        <div>
                            <div class="title">{{$t('coin.available')}}&nbsp;&nbsp;{{item.coinUnit}}</div>
                            <div class="content">{{item.coinBalance}}</div>
                        </div>
                        <div>
                            <div class="title">{{$t('coin.blowing')}}</div>
                            <div class="content">{{item.explosionPrice | defaultTxt}}</div>
                        </div>
                        <div>
                            <div class="title">{{$t('coin.rate')}}&nbsp;&nbsp;
                                <Icon type="ios-alert" />
                            </div>
                            <div class="content">{{item.riskRate}}%</div>
                        </div>
                    </li>
                </ul>
                <template v-for="(item, index) in symbolList">
                    <div class="twoBorow">
                        <div>
                            <h4>{{item.baseUnit}}{{$t('coin.credit')}}</h4>
                            <ul>
                                <li>
                                    <div>{{$t('coin.loaned')}}</div>
                                    <div>{{item.baseLoanCount}}</div>
                                </li>
                                <li>
                                    <div>{{$t('coin.loan')}}</div>
                                    <div>{{item.baseCanLoan}}</div>
                                </li>
                                <li>
                                    <div style="text-align: right">{{$t('coin.interest ')}}</div>
                                    <div>{{item.baseINsertRate}}%</div>
                                </li>
                            </ul>
                            <p>{{$t('coin.loanAmount')}}</p>
                            <Input v-model="baseInputvalue" style="width:80%; margin-bottom:20px;">
                                <span slot="append">{{item.baseUnit}}</span>
                            </Input>
                            <Slider v-model="baseValue" style="width:80%;" show-tip="never" @on-change='getBaseValue'></Slider>
                            <Button type="primary" style="width:80%" @click="borrow('base', item.baseUnit)">{{$t('coin.application')}}{{item.baseUnit}}</Button>
                        </div>
                        <div>
                            <h4>{{item.coinUnit}}{{$t('coin.credit')}}</h4>
                            <ul>
                                <li>
                                    <div>{{$t('coin.loaned')}}</div>
                                    <div>{{item.coinLoanCount}}</div>
                                </li>
                                <li>
                                    <div>{{$t('coin.loan')}}</div>
                                    <div>{{item.coinCanLoan}}</div>
                                </li>
                                <li>
                                    <div style="text-align: right">{{$t('coin.interest ')}}</div>
                                    <div>{{item.coinINsertRate}}%</div>
                                </li>
                            </ul>
                            <p>{{$t('coin.loanAmount')}}</p>
                            <Input v-model="baseCoinvalue" style="width:80%;margin-bottom:20px;">
                                <span slot="append">{{item.coinUnit}}</span>
                            </Input>
                            <Slider v-model="coinValue" style="width:80%;" show-tip="never" @on-change='getCoinValue'></Slider>
                            <Button type="primary" style="width:80%" @click="borrow('coin',item.coinUnit)">{{$t('coin.application')}}{{item.coinUnit}}</Button>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <noReruen :repayment="noReruenRepayment" @borowSuccess="borowSuccess"></noReruen>
        <alreadyReturn :repayment="alreadyRepayment"></alreadyReturn>
    </div>
</template>
<script>
import noReruen from "../../components/lever/noReturn";
import alreadyReturn from "../../components/lever/alreadyReturn"
export default {
    components: { noReruen, alreadyReturn },
    data() {
        return {
            active:'0',   //默认选择首页
            inseRate:"--",
            noReruenRepayment: 0,
            alreadyRepayment: 1,
            baseInputvalue: "",
            baseCoinvalue: "",
            baseValue: 0,
            coinValue: 0,
            allLeverList: [],
            symbol: "",
            symbolList: []
        }
    },
    created() {
        this.symbol = decodeURIComponent(this.$route.params.coin);
        this.getAllLeverAccount();
        this.getSymbolAccount(this.symbol);
    },
    filters: {
        defaultTxt(str) {
            return str >= 0 ? str : "--";
        }
    },
    methods: {
        getCoinValue(value) {
            this.baseCoinvalue = this.toFloor(this.symbolList[0].coinCanLoan * value/100);
        },
        getBaseValue(value) {
            this.baseInputvalue = this.toFloor(this.symbolList[0].baseCanLoan * value/100);
        },
        borowSuccess() {
            this.getSymbolAccount(this.symbol);
            this.alreadyRepayment++;
            // window.location.reload();
        },
        changLeverSymbol(index) {
            this.active = index;
            const symbol = this.allLeverList[index].symbol;
            this.$router.push({
                name: "lever",
                params: {
                    coin: encodeURIComponent(symbol)
                }
            });
            this.baseInputvalue = this.baseCoinvalue = "";
            this.baseValue = this.coinValue = 0;
            this.symbol = symbol;
            this.getAllLeverAccount();
            this.getSymbolAccount(symbol);
        },
        getAllLeverAccount() {
            this.$http.post(this.host + "/margin-trade/lever_wallet/list").then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.allLeverList = resp.data;
                    this.loading = false;
                } else {
                    this.$Message.error(resp.message);
                }
            });
        },
        getSymbolAccount(params) {
            this.$http.post(this.host + "/margin-trade/lever_wallet/list", { symbol: params }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.inseRate = resp.data[0].explosionRiskRate;
                    const list = resp.data.map(ele => {
                        return {
                            symbol: ele.symbol || "----/----",
                            baseUnit: ele.leverWalletList[0].leverCoin.baseSymbol || "----",
                            baseBanlance: ele.leverWalletList[0].balance || 0,
                            baseLoanCount: ele.baseLoanCount || 0,
                            baseCanLoan: ele.baseCanLoan || 0,
                            baseINsertRate: ele.leverWalletList[1].leverCoin.interestRate || 0,
                            coinUnit: ele.leverWalletList[1].leverCoin.coinSymbol || "----",
                            coinBalance: ele.leverWalletList[1].balance || 0,
                            coinLoanCount: ele.coinLoanCount || 0,
                            coinCanLoan: ele.coinCanLoan || 0,
                            coinINsertRate: ele.leverWalletList[1].leverCoin.interestRate || 0,
                            explosionPrice: ele.explosionPrice,
                            riskRate: ele.riskRate
                        }
                    });
                    this.symbolList = list || [];
                    this.loading = false;
                } else {
                    this.$Message.error(resp.message);
                }
            });
        },
        isEmpty(str) {
            if (!str) {
                this.$Message.error("请输入您要借贷的币的个数");
                return false;
            } else {
                return true;
            }
        },
        isNum(str) {
            if (isNaN(Number(str))) {
                this.$Message.error("请输入数字类型");
                return false;
            } else {
                return true;
            }
        },
        borrow(params, unit) {
            if (params === "base") {
                this.isEmpty(this.baseInputvalue) && this.isNum(this.baseInputvalue) && this.toBorrow({ amount: this.baseInputvalue, coinUnit: unit, symbol: this.symbol });
            } else {
                this.isEmpty(this.baseCoinvalue) && this.isNum(this.baseCoinvalue) && this.toBorrow({ amount: this.baseCoinvalue, coinUnit: unit, symbol: this.symbol });
            }
        },
        toBorrow(params) {
            this.$http.post(this.host + "/margin-trade/loan/loan", params).then(res => {
                if (res.body.code == 0) {
                    this.$Message.success("借贷成功");
                    ++this.noReruenRepayment;
                    this.getSymbolAccount(this.symbol);
                } else {
                    this.$Message.success(res.body.message);
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
%flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.leverBox {
/*
    @extend %flex;
    align-items: stretch;
    padding: 20px 10%;
    flex-wrap: wrap;
*/
    align-items: stretch;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 1200px;
    margin: 0 auto 100px;
    padding-top: 150px;
    .main-box {
        @extend %flex;
        margin-bottom: 30px;
        .leftBox {
            width: 20%;
            min-height: 483px;
            box-shadow: 0 0 25px #EEE;
            padding: 10px;
            border: 1px solid #eee;
            .active {
                background: #3399ff;
                color: #fff;
                border-radius: 2px;
                .triangle {
                    width:0;
                    height:0;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-left: 8px solid #3399ff;
                    position: relative;
                    right: -23px;
                }
            }
            h4 {
                text-align: left;
                font-size: 24px;
                color: #333;
            }
            ul,
            li {
                @extend %flex;
                flex-wrap: wrap;
                cursor: pointer;
            }
            ul {
                li {
                    width: 100%;
                    line-height: 2.5;
                    border-bottom: 1px solid #eee;
                    padding: 2px 15px;

                }
            }
        }
        .rightBox {
            width: 79%;
            padding: 10px 33px 50px;
            box-shadow: 0 0 5px #eee;
            border: 1px solid #eee;
            .tips {
                border-bottom: 1px solid #eee;
                line-height: 3;
                color: #666;
                font-size: 20px;
            }
            ul {
                li {
                    @extend %flex;
                    > div {
                        width: 25%;
                        border-bottom: 1px solid #eee;
                        padding: 10px 0;
                        .title {
                            line-height: 2.5;
                            color: #999;
                            font-size: 16px;
                        }
                        .content {
                            color: #666;
                            font-size: 14px;
                        }
                    }

                }
            }
            .twoBorow {
                @extend %flex;
                > div {
                    width: 50%;
                    h4 {
                        font-size: 20px;
                        color: #333;
                        line-height: 3;
                    }
                    ul {
                        @extend %flex;
                    }
                    ul > li {
                        width: 33.333%;
                        display: block;
                        // @extend %flex;
                        > div {
                            border-bottom: none;
                            &:nth-child(1) {
                                color: #999;
                            }
                        }
                    }
                    p {
                        color: #999;
                        line-height: 2.5;
                    }
                }
            }
        }
    }

}
</style>
