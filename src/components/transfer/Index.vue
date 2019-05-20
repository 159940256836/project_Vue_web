<template>
    <div>
        <Modal v-model="modal" title="转出" :footer-hide="true" :mask-closable="false" :closable="false">
            <div>
                <div style="margin-bottom:30px;">
                    <Cascader :data="data" v-model="value" :render-format="formatRender" @on-change="getValue" @on-visible-change="visibleChange"></Cascader>
                </div>
                <div style="margin-bottom:30px;">
                    <Cascader :data="toData" v-model="toValue" :render-format="formatRender"></Cascader>
                </div>
            </div>
            <Input v-model="num" placeholder="划转数量" style="width:100%">
            <span slot="append">
                <span>{{unit}}</span>
                <span class="all" @click="turnAll">全部</span>
            </span>
            </Input>
            <div style="margin-top:20px;">
                可用&nbsp;&nbsp;&nbsp;{{canUseNum}}&nbsp;&nbsp;&nbsp;{{unit}}
            </div>
            <div class="button" style="display:flex;justify-content:space-around;margin-top:20px;">
                <Button @click="cancel" type="default">取消</Button>
                <Button @click="sure" type="primary">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
const formatFun = label => label.join('    ');
const Right = x => ({
    map: f => Right(f(x)),
    fold: x => x
});
const Left = x => ({
    map: f => Left(x),
    fold: x => x
});
const isEmptyArr = arr => {
    return arr.length == 0 ? Left(arr) : Right(arr);
}
export default {
    name: "transfermodal",
    props: ["modal"],
    data() {
        return {
            formatRender: formatFun,
            unit: "--",
            canUseNum: "--",
            num: "",
            data: [],
            value: [],
            toData: [],
            toValue: [],
            leverList: [],
            otcList: [],
            exchangeList: []
        }
    },
    created() {
        // Promise.all([this.getSupportCoin(), this.getExchangeList()]).then(res => {
        //     this.data = [...this.leverList, ...this.otcList, ...this.exchangeList]
        // });
        // this.getLeverNum();
        // this.getOtcNum();
        this.init();
        // this.getSupportCoin().then(res => {
        //     this.getLeverNum().then(res => {
        //         console.log(this.leverList);
        //         // const leverSymbol = this.leverList.map(ele => ele.children.map(e => {
        //         //     return e.value;
        //         // }));
        //         const leverSymbol = this.leverList.map(ele => {
        //             return ele.children;
        //         }).map(ele => {
        //             console.log(ele);
        //             return ele.value;
        //         });
        //         console.log(leverSymbol);
        //         let list = res.map(ele => {
        //             if (leverSymbol[0].includes(ele.symbol)) {
        //                 ele.leverWalletList.map(e => {
        //                     return {
        //                         value: ele.symbol,
        //                         canUse: e.balance,
        //                         unit: e.coin.unit
        //                     }
        //                 })
        //             }
        //         });
        //         console.log(list);
        //     })
        // })
    },
    methods: {
        init() {
            Promise.all([this.getLeverNum(), this.getOtcNum(), this.getExchangeList()]).then(res => {
                this.data = [...this.leverList, ...this.otcList, ...this.exchangeList]
            })
        },
        cancel() {
            this.$emit("closetransferModal");
        },
        getOtcNum() {
            return this.$http.post(this.host + "/uc/otc/wallet/get").then(response => {//查询法币种类的个数
                var resp = response.body;
                if (resp.code == 0) {
                    // if (resp.data.length > 0) {
                    const temp = resp.data.length > 0 && resp.data.map(ele => {
                        return {
                            value: ele.coin.unit,
                            label: ele.coin.unit,
                            canUse: ele.balance
                        }
                    });
                    const list = [{
                        value: "法币账户",
                        label: "法币账户",
                        children: temp
                    }];
                    this.otcList = list;
                    // } else {
                    //     this.otcList = [];
                    // }

                    return new Promise((resolve, reject) => {
                        resolve("success");
                    })
                } else {
                    this.$Message.error(resp.message);
                }
            });
        },
        getLeverNum() {
            return this.$http.post(this.host + "/margin-trade/lever_wallet/list").then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    const temp = resp.data.length > 0 && resp.data.map(ele => {
                        return {
                            value: ele.symbol,
                            label: ele.symbol,
                            children: ele.leverWalletList.map(e => {
                                return {
                                    value: e.coin.unit,
                                    canUse: e.balance,
                                    label: e.coin.unit,
                                }

                            })
                        }
                    })
                    const list = [{
                        value: "杠杆账户",
                        label: "杠杆账户",
                        children: temp || []
                    }];
                    this.leverList = list;
                    return new Promise((resolve, reject) => {
                        resolve("success");
                    })
                } else {
                    if(this.loginmsg!=undefined){
                    this.$Message.error(this.loginmsg);
                    }
                }
            });
        },
        visibleChange(flag) {
            if (flag) {
                this.toValue = [];
                this.toData = [];
                this.unit == "--";
                this.canUseNum = "--";
            }
        },
        turnAll() {
            this.num = this.canUseNum;
        },
        getValue(value, selectedData) {
            if (value.length > 0) {
                let str = value[0];
                this.unit = value[value.length - 1];
                this.canUseNum = selectedData[selectedData.length - 1].canUse;
                if (str === "杠杆账户") {
                    this.toData = this.exchangeList;
                } else if (str === "币币账户") {
                    const list = {
                        value: "法币账户",
                        label: "法币账户"
                    }
                    this.toData = [...this.leverList, list];
                } else if (str === "法币账户") {
                    const list = {
                        value: "币币账户",
                        label: "币币账户"
                    }
                    this.toData = [list];
                }
            } else {
                this.toData = [];
                this.toValue = [];
                this.unit = "--";
                this.canUseNum = "--";
            }
        },
        datainit() {
            this.value = this.toValue = [];
            this.unit = this.canUseNum = "--";
            this.num = "";
        },
        sure() {
            if (this.num == '') {
                this.$Message.info("请输入您要转出的个数");
                return;
            }
            if (this.value.length == 0) {
                this.$Message.info("请选择您要转出的币种");
                return;
            };
            if (this.toValue.length == 0) {
                this.$Message.info("请选择您要转入的币种");
                return;
            }
            if (this.value[0] == "币币账户" || this.value[0] == "法币账户") {
                if (this.toValue[0] == "杠杆账户") {
                    const params = {
                        coinUnit: this.value[1],
                        amount: this.num,
                        leverCoinSymbol: this.toValue[1]
                    };
                    this.coinToLever(params);
                };
                if (this.toValue[0] == "法币账户") {
                    const params = {
                        coinName: this.value[1],
                        amount: this.num,
                        direction: 0
                    }
                    this.coinToOtc(params);
                };
                if (this.toValue[0] == "币币账户") {
                    const params = {
                        coinName: this.value[1],
                        amount: this.num,
                        direction: 1
                    }
                    this.coinToOtc(params);
                }
            };
            if(this.value[0] == "杠杆账户"){
                if (this.toValue[0] == "币币账户") {
                    const params = {
                        coinUnit: this.toValue[1],
                        amount: this.num,
                        leverCoinSymbol:this.value[1]
                    }
                    this.leverToCoin(params);
                }
            }

            //
        },
        leverToCoin(params){//杠杆转币币
            this.$http.post(this.host + "/margin-trade/lever_wallet/turn_out", params).then(res => {
                if (res.body.code == 0) {
                    this.$Notice.success({
                        title: this.$t("exchange.tip"),
                        desc: "操作成功"
                    });
                    this.datainit();
                    this.init();
                    this.$emit("closetransferModal");
                } else {
                    this.$Notice.error({
                        title: this.$t("exchange.tip"),
                        desc: res.body.message
                    })
                }
            })
        },
        coinToOtc(params) {//币币与发币互转;
            this.$http.post(this.host + "/uc/otc/wallet/transfer", params).then(res => {
                if (res.body.code == 0) {
                    this.$Notice.success({
                        title: this.$t("exchange.tip"),
                        desc: "操作成功"
                    });
                    this.datainit();
                    this.init();
                    this.$emit("closetransferModal");
                } else {
                    this.$Notice.error({
                        title: this.$t("exchange.tip"),
                        desc: res.body.message
                    })
                }
            })
        },
        coinToLever(params) {//币币转杠杆
            this.$http.post(this.host + "/margin-trade/lever_wallet/change_into", params).then(res => {
                if (res.body.code == 0) {
                    this.$Notice.success({
                        title: this.$t("exchange.tip"),
                        desc: "操作成功"
                    });
                    this.datainit();
                    this.init();
                    this.$emit("closetransferModal");
                } else {
                    this.$Notice.error({
                        title: this.$t("exchange.tip"),
                        desc: res.body.message
                    })
                }
            })
        },
        getSupportCoin() {
            return this.$http.post(this.host + "/uc/transfer/support_coin").then(res => {
                const data = res.body;
                if (data.code == 0) {
                    const temp = data.data.supportLeverCoins.map(ele => ({
                        value: ele.symbol,
                        label: ele.symbol,
                        children: [{
                            value: ele.baseSymbol,
                            canUse: ele.minTurnOutAmount,
                            label: ele.baseSymbol
                        }, {
                            value: ele.coinSymbol,
                            canUse: ele.minTurnOutAmount,
                            label: ele.coinSymbol
                        }]
                    }));
                    const leverList = [{
                        value: '杠杆账户',
                        label: `杠杆账户`,
                        children: temp
                    }];
                    this.leverList = leverList;
                    const tempList = data.data.supportOtcCoins.map(ele => ({
                        value: ele.unit,
                        label: ele.unit,
                    }));
                    const otcList = [{
                        value: "法币账户",
                        label: "法币账户",
                        children: tempList
                    }];
                    this.otcList = otcList;
                    return new Promise((resolve, reject) => {
                        resolve(leverList.concat(otcList))
                    })
                }
            })
        },
        getExchangeList() {
            return this.$http.post(this.host + "/uc/asset/wallet").then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        const temp = resp.data.map(ele => ({
                            value: ele.coin.unit,
                            canUse: ele.balance,
                            label: ele.coin.unit
                        }));
                        const exchangeList = [{
                            value: "币币账户",
                            label: "币币账户",
                            children: temp
                        }];
                        this.exchangeList = exchangeList;
                        resolve("success");
                    })
                } else {
                    if(this.loginmsg!=undefined){
                        this.$Message.error(this.loginmsg);
                    }
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .all {
        cursor: pointer;
        color:#2d8cf0;
        margin-left:20px;
    }
    .button {
        display:flex;
        justify-content:space-around;
        margin-top:20px;
    }
</style>
