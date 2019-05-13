<template>
    <div class="leverBox">
        <div class="leftBox">
            <h4>杠杆账户</h4>
            <ul>
                <li>
                    <div>交易对</div>
                    <div>风险率</div>
                </li>
                <li v-for="(item,index) in allLeverList" :key="index">
                    <div>{{item.symbol}}</div>
                    <div>{{item.riskRate}}%</div>
                </li>
            </ul>
        </div>
        <div class="rightBox">
            <div class="tips">{{symbol}}
                <Icon type="ios-alert" color="#2d8cf0" />当风险率≤110时,账户将触发爆仓以归还借贷资金</div>
            <ul>
                <li v-for="(item,index) in symbolList" :key="index">
                    <div>
                        <div class="title">可用&nbsp;&nbsp;{{item.baseUnit}}</div>
                        <div class="content">{{item.baseBanlance}}</div>
                    </div>
                    <div>
                        <div class="title">可用&nbsp;&nbsp;{{item.coinUnit}}</div>
                        <div class="content">{{item.coinBalance}}</div>
                    </div>
                    <div>
                        <div class="title">爆仓价</div>
                        <div class="content">{{item.explosionPrice | defaultTxt}}</div>
                    </div>
                    <div>
                        <div class="title">风险率&nbsp;&nbsp;
                            <Icon type="ios-alert" />
                        </div>
                        <div class="content">{{item.riskRate}}%</div>
                    </div>
                </li>
            </ul>
            <template v-for="(item, index) in symbolList">
                <div class="twoBorow">
                    <div>
                        <h4>{{item.baseUnit}}借贷</h4>
                        <ul>
                            <li>
                                <div>已借</div>
                                <div>{{item.baseLoanCount}}</div>
                            </li>
                            <li>
                                <div>可借</div>
                                <div>{{item.baseCanLoan}}</div>
                            </li>
                            <li>
                                <div>利率</div>
                                <div>{{item.baseINsertRate}}%</div>
                            </li>
                        </ul>
                        <p>借贷数量</p>
                        <Input v-model="baseInputvalue" style="width:80%; margin-bottom:20px;">
                        <span slot="append">{{item.baseUnit}}</span>
                        </Input>
                        <Slider v-model="baseValue" style="width:80%;" show-tip="never"></Slider>
                        <Button type="primary" style="width:80%">申请{{item.baseUnit}}</Button>
                    </div>
                    <div>
                        <h4>{{item.coinUnit}}借贷</h4>
                        <ul>
                            <li>
                                <div>已借</div>
                                <div>{{item.coinLoanCount}}</div>
                            </li>
                            <li>
                                <div>可借</div>
                                <div>{{item.coinCanLoan}}</div>
                            </li>
                            <li>
                                <div>利率</div>
                                <div>{{item.coinINsertRate}}%</div>
                            </li>
                        </ul>
                        <p>借贷数量</p>
                        <Input v-model="baseCoinvalue" style="width:80%;margin-bottom:20px;">
                        <span slot="append">{{item.coinUnit}}</span>
                        </Input>
                        <Slider v-model="coinValue" style="width:80%;" show-tip="never"></Slider>
                        <Button type="primary" style="width:80%">申请{{item.coinUnit}}</Button>
                    </div>
                </div>
            </template>
        </div>
        <noReruen repayment="0"></noReruen>
        <noReruen repayment="1"></noReruen>
    </div>
</template>
<script>
import noReruen from "../../components/lever/noReturn"
export default {
    components: { noReruen },
    data() {
        return {
            baseInputvalue:"",
            baseCoinvalue:"",
            baseValue: 25,
            coinValue: 25,
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
                    const list = resp.data.map(ele => {
                        return {
                            symbol: ele.symbol || "----/----",
                            baseUnit: ele.leverWalletList[0].coin.unit || "----",
                            baseBanlance: ele.leverWalletList[0].balance || 0,
                            baseLoanCount: ele.leverWalletList[0].baseLoanCount || 0,
                            baseCanLoan: ele.leverWalletList[0].baseCanLoan || 0,
                            baseINsertRate: ele.leverWalletList[0].leverCoin.interestRate || 0,
                            coinUnit: ele.leverWalletList[1].coin.unit || "----",
                            coinBalance: ele.leverWalletList[1].balance || 0,
                            coinLoanCount: ele.leverWalletList[1].coinLoanCount || 0,
                            coinCanLoan: ele.leverWalletList[1].coinCanLoan || 0,
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
    @extend %flex;
    align-items: stretch;
    padding: 20px 10%;
    flex-wrap: wrap;
    .leftBox {
        width: 30%;
        box-shadow: 2px 2px 5px #eee;
        padding: 10px;
        h4 {
            text-align: left;
            font-size: 24px;
            color: #333;
        }
        ul,
        li {
            @extend %flex;
            flex-wrap: wrap;
        }
        ul {
            li {
                width: 100%;
                line-height: 2.5;
                border-bottom: 1px solid #eee;
            }
        }
    }
    .rightBox {
        width: 68%;
        padding: 10px;
        box-shadow: 2px 2px 5px #eee;
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
</style>
