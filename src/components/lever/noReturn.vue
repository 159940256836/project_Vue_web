<template>
    <div class="noReturn">
        <h4>当前申请</h4>
        <div>
            <Table :columns="columns" :data="data"></Table>
        </div>
        <div class="lever-list">
            <Page v-show="totalElement > 10" :total="totalElement" @on-change="changePage"/>
        </div>
        <Modal v-model="modal" title="归还借贷" :footer-hide="true">
            <div class="lever-title">杠杆账户</div>
            <div class="lever-symbol">{{brorrowParams.symbol}}</div>
            <div class="lever-title">应还数量</div>
            <div class="return-number">{{brorrowParams.total}}</div>
            <ul class="lever-li">
                <li style="margin-right:40px;">
                    <p class="lever-title">借贷数量</p>
                    <p class="return-number">{{brorrowParams.amount}}</p>
                </li>
                <li>
                    <p class="lever-title">利息</p>
                    <p class="return-number">{{brorrowParams.accumulative}}</p>
                </li>
            </ul>
            <ul class="lever-li">
                <li>归还数量</li>
                <li>可用&nbsp;&nbsp;{{brorrowParams.canUse}}&nbsp;&nbsp;{{brorrowParams.coin}}</li>
            </ul>
            <Input v-model="value" placeholder="归还数量" style="margin-top:10px;">
            <div slot="append">
                <span>{{brorrowParams.coin}}</span>
                <span class="all" @click="inputAll">全部</span>
            </div>
            </Input>
            <div class="lever-info" style="margin-top: 10px;'">
                <Button type="default" @click="cancel">取消</Button>
                <Button type="primary" @click="sure">确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
const paramFun = (pageSize, repayment) => (pageNo) => ({
    pageSize, repayment, pageNo
});
const getParams = paramFun(10, 0);
export default {
    data() {
        return {
            modal: false,
            totalElement: 0,
            value: "",
            pageNo: 1,
            title: "",
            brorrowParams: {},
            columns: [
                {
                    title: "申请时间",
                    key: "createTime",
                    width: 150,
                }, {
                    title: "杠杆账户",
                    render: (h, params) => {
                        return h("div", {}, params.row.leverCoin.symbol)
                    }
                }, {
                    title: "币种",
                    render: (h, params) => {
                        return h("div", {}, params.row.coin.unit)
                    }
                }, {
                    title: "数量",
                    key: "loanBalance"
                }, {
                    title: "利率",
                    key: "interestRate"
                }, {
                    title: "利息累计",
                    key: "accumulative"
                }, {
                    title: "未还数量",
                    key: "amount"
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        return h("Button", {
                            props: {
                                type: "primary"
                            },
                            on: {
                                click: () => {
                                    const json = params.row;
                                    this.getAppointCoinNum(json.leverCoin.symbol, json.coin.unit)
                                        .then(res => {
                                            this.brorrowParams = {
                                                id: json.id,
                                                symbol: json.leverCoin.symbol,
                                                total: json.amount + json.accumulative,
                                                amount: json.amount,
                                                coin: json.coin.unit,
                                                accumulative: json.accumulative,
                                                canUse: res,
                                            }
                                            this.modal = true;
                                        });
                                }
                            }
                        }, "归还")
                    }
                }
            ],
            data: [],
        }
    },
    props: ["repayment"],
    created() {
        this.init();
    },
    watch: {
        repayment(newValue, oldValue) {
            this.init();
        }
    },
    methods: {
        cancel() {
            this.modal = false;
        },
        changePage(index) {
            this.pageNo = index;
            this.init();
        },
        sure() {
            if (this.value == "") {
                this.$Message.error("请输入您要还的个数");
                return;
            }
            if (isNaN(Number(this.value))) {
                this.$Message.error("请输入数字类型");
                return;
            }
            const params = {
                loanRecordId: this.brorrowParams.id,
                amount: this.value
            }
            this.toBorow(params);
            this.value=""
        },
        toBorow(params) {
            this.$http.post(this.host + "/margin-trade/loan/repayment", params).then(res => {
                const data = res.body;
                if (data.code == 0) {
                    this.$Message.success(data.message);
                    this.modal = false;
                    this.pageNo = 1;
                    this.init();
                    this.$emit("borowSuccess");
                } else {
                    this.$Message.error(data.message);
                }
            })
        },
        inputAll() {
            const brorrowParams = this.brorrowParams;
            if (brorrowParams.canUse < brorrowParams.total) {//可用的小于需要换的，点击全部为可用的
                this.value = brorrowParams.canUse;
            }
            if (brorrowParams.canUse > brorrowParams.total) {//可用的大于需要换的，点击全部为需要还的
                this.value = brorrowParams.total;
            }
        },
        getAppointCoinNum(symbol, unit) {
            return this.$http.post(this.host + "/margin-trade/lever_wallet/list", { symbol }).then(res => {
                const data = res.body;
                if (data.code == 0) {
                    let str = "";
                    const list = data.data.forEach(ele => {
                        ele.leverWalletList.forEach(e => {
                            if (e.coin.unit == unit) {
                                str = e.balance;
                            }
                        })
                    })
                    return new Promise((resolve, reject) => {
                        resolve(str);
                    })
                }
            })
        },
        init() {
            const params = getParams(this.pageNo);
            this.$http.post(this.host + "/margin-trade/loan/record_list", params).then(res => {
                const data = res.body;
                if (data.code == 0) {
                    this.data = data.data.content;
                    this.totalElement = data.data.totalElements;
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.noReturn {
    margin-top: 30px;
    width: 100%;
    min-height: 300px;
    padding-bottom: 30px;
    border: 1px solid #eee;
    h4 {
        font-size: 20px;
        line-height: 2.5;
        border-bottom: 1px solid #eee;
        background: #fafafd;
        padding-left: 15px;
    }
    .lever-list{
        margin-top:20px;
        text-align:right;
        padding-right: 25px;
    }
    .title-box {
        display: flex;
    }

    .lever-title {
        color:#999;
        font-size:16px;
        margin-top:20px;
        flex: 1;
    }
    .lever-symbol {
        flex: 10;
        background:rgb(247, 243, 253);
        color:#333;
        line-height:2;
        font-size:16px;
        padding:10px;
    }

    .return-number {
        color:#333;
        font-size:20px;
    }
    ul.lever-li {
        display:flex;
        justify-content:flex-start;
        margin-top:20px;
        &:first-child {
            margin-right:40px;
        }
    }
    .all {
        color:#57a3f3;
        margin-left:30px;
    }
    .lever-info {
        display:flex;
        justify-content:space-around;
        margin-top:10px;
    }
}
.ivu-table-tip table td {
    line-height: 180px
}

</style>
