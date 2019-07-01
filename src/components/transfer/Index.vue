<template>
    <div class="tab">
        <Modal
            width="480"
            v-model="modal"
            :title="$t('coin.rollOut')"
            :footer-hide="true"
            :mask-closable="false"
            :closable="false"
        >
            <div>
                <div style="margin-bottom:15px;">
                    <div style="width:85%;line-height: 25px;text-align: right;margin-left: 3%;">
                        <span style="width:55px;display: inline-block;line-height: 40px;padding-right: 10px; color: #8090AF;">
                            {{$t('coin.follow')}}:
                        </span>
                        <!-- <Cascader style="width: 85%; float: right;" :data="data" v-model="value" :render-format="formatRender" @on-change="getValue" @on-visible-change="visibleChange" :placeholder='$t("uc.finance.withdraw.symboltip")'>
                        </Cascader> -->
                        <Input
                            v-model="currencyData.currencyname"
                            style="width: 85%; float: right;"
                            disabled
                        />
                    </div>

                </div>
                <div style="width: 85%;margin-bottom:15px;line-height: 25px;text-align: right;margin-left: 3%;">
                    <span style="width:55px;display: inline-block;line-height: 40px;padding-right: 10px; color: #8090AF;">
                        {{$t('coin.arrive')}}:
                    </span>
                    <!-- <Cascader style="width: 85%; float: right;" :data="toData" v-model="toValue" :render-format="formatRender" :placeholder='$t("uc.finance.withdraw.symboltip")'>
                    </Cascader> -->
                    <Input
                        v-model="currencyData.tocurrencyname"
                        style="width: 85%; float: right;"
                        disabled
                    />
                </div>
                <div v-if="currencyData.modal" style="width: 85%;margin-bottom:25px;line-height: 25px;text-align: right;margin-left: 3%;">
                    <span style="padding-right: 5px; color: #8090AF;">
                        {{$t('coin.selectcurrency')}}:
                    </span>
                    <Select
                        v-model="leveraged"
                        style="width: 85%; float: right;"
                        id="select"
                        @on-change="change"
                    >
                        <Option
                            v-for="(index,i) in currencyData.currency"
                            :key="i"
                            :value="index"
                        >
                            {{index}}
                        </Option>
                    </Select>
                </div>
            </div>
            <div style="width:85%;line-height: 25px;margin-left: 3%;">
                <span style="width:50px;display: inline-block;line-height: 40px;text-align:right; color: #8090AF;">
                    {{$t('coin.quantity')}}:
                </span>
                <Input
                    v-model="num"
                    :placeholder="$t('coin.quantityTransferred')"
                    style="width: 85%; float: right;"
                />
            </div>
            <div style="position: relative">
                <span v-if="!currencyData.modal">
                    <span class="all" @click="turnAll">{{$t('coin.all')}}</span>
                </span>
                <span v-else>
                    <span class="all" @click="All">{{$t('coin.all')}}</span>
                </span>
            </div>
            <div style="margin-top:5px;padding-left:75px; color: #8090AF;" v-if="currencyData.modal">
                {{$t('coin.available')}}:&nbsp;&nbsp;&nbsp;{{canUseNum}}
            </div>
            <div style="margin-top:5px;padding-left:75px; color: #8090AF;" v-else>
                {{$t('coin.available')}}:&nbsp;&nbsp;&nbsp;{{this.currencyData.balance}}
            </div>
            <div class="button">
                <button @click="cancel">{{$t('coin.cancel')}}</button>
                <button @click="sure">{{$t('coin.save')}}</button>
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
    props: ["modal","getmoney","currencyData"],
    data() {
        return {
            formatRender: formatFun,
            unit: "",
            canUseNum: "",
            num: "",
            data: [],
            leverList: [],
            otcList: [],
            exchangeList: [],
            leveraged:""
        }
    },
    created() {
        if (this.isLogin) {
            this.init();
        }
        this.leveraged="";
        this.canUseNum = '';
    },
    watch:{
        lang: function () {
            this.updateLangData();
        }
    },
    methods: {
        change(value){
            if(value==this.currencyData.currency[0]){
                this.canUseNum=this.currencyData.balance2;
            }else{
                this.canUseNum=this.currencyData.balance1;
            }
        },
        init() {
            Promise.all([this.getLeverNum(), this.getOtcNum(), this.getExchangeList()]).then(res => {
                this.data = [...this.leverList, ...this.otcList, ...this.exchangeList]
            })
            this.leveraged="";
        },
        cancel() {
            this.value = "";
            this.toValue = "";
            this.num ='';
            this.unit = '';
            this.canUseNum = '';
            this.leveraged="";
            this.canUseNum = '';
            this.$emit("closetransferModal");
        },
        getOtcNum() {
            // return this.$http.post(this.host + "/uc/otc/wallet/get").then(response => {//查询法币种类的个数
            //     var resp = response.body;
            //     if (resp.code == 0) {
            //         // if (resp.data.length > 0) {
            //         const temp = resp.data.length > 0 && resp.data.map(ele => {
            //             return {
            //                 value: ele.coin.unit,
            //                 label: ele.coin.unit,
            //                 canUse: ele.balance
            //             }
            //         });
            //         const list = [{
            //             value: this.$t('coin.legal'),
            //             label: this.$t('coin.legal'),
            //             children: temp
            //         }];
            //         this.otcList = list;
            //         // } else {
            //         //     this.otcList = [];
            //         // }

            //         return new Promise((resolve, reject) => {
            //             resolve("success");
            //         })
            //     } else {
            //         this.$Message.error(resp.message);
            //     }
            // });
        },
        getLeverNum() {
            // return this.$http.post(this.host + "/margin-trade/lever_wallet/list").then(response => {
            //     var resp = response.body;
            //     if (resp.code == 0) {
            //         if(resp.data!=null){
            //             const temp = resp.data.length > 0 && resp.data.map(ele => {
            //                 return {
            //                     value: ele.symbol,
            //                     label: ele.symbol,
            //                     children: ele.leverWalletList.map(e => {
            //                         return {
            //                             value: e.coin.unit,
            //                             canUse: e.balance,
            //                             label: e.coin.unit,
            //                         };
            //                     })
            //                 }
            //             })
            //         }else{
            //             var temp = [];
            //         }
            //         const list = [{
            //             value: this.$t('coin.Leveraged'),
            //             label: this.$t('coin.Leveraged'),
            //             children: temp || []
            //         }];
            //         this.leverList = list;
            //         return new Promise((resolve, reject) => {
            //             resolve("success");
            //         })
            //     } else {
            //         if (this.loginmsg != undefined) {
            //             this.$Message.error(this.loginmsg);
            //         }
            //     }
            // });
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
            this.num = this.currencyData.balance;
        },
        All(){
            if(this.leveraged==this.currencyData.currency[0]){
                this.num=this.currencyData.balance2;
            }else{
                this.num=this.currencyData.balance1;
            }
        },
        // getValue(value, selectedData) {
        //     if (value.length > 0) {
        //         let str = value[0];
        //         this.unit = value[value.length - 1];
        //         this.canUseNum = selectedData[selectedData.length - 1].canUse;
        //         if (str === this.$t('coin.Leveraged')) {
        //             this.toData = this.exchangeList;
        //         } else if (str === this.$t('coin.bit')) {
        //             const list = {
        //                 value: this.$t('coin.legal'),
        //                 label: this.$t('coin.legal')
        //             }
        //             this.toData = [...this.leverList, list];
        //         } else if (str === this.$t('coin.legal')) {
        //             const list = {
        //                 value: this.$t('coin.bit'),
        //                 label: this.$t('coin.bit')
        //             }
        //             this.toData = [list];
        //         }
        //     } else {
        //         this.toData = [];
        //         this.toValue = [];
        //         this.unit = "--";
        //         this.canUseNum = "--";
        //     }
        // },
        datainit() {
            this.value = this.toValue = [];
            this.unit = this.canUseNum = "--";
            this.num = "";
        },
        sure() {
            if (this.num == '') {
                /*请输入您要转出的个数*/
                this.$Message.info(this.$t('coin.outNumber'));
                return;
            }
            if((this.currencyData.currencyname.indexOf(this.$t('myAccount._BitcoinAccount'))!=-1&&this.currencyData.tocurrencyname.indexOf(this.$t('myAccount._legaTenderAccount'))!=-1)||(this.currencyData.currencyname.indexOf(this.$t('myAccount._legaTenderAccount'))!=-1&&this.currencyData.tocurrencyname.indexOf(this.$t('myAccount._BitcoinAccount'))!=-1)){
                    this.coinToOtc(this.currencyData);
            }
            else if(this.currencyData.currencyname.indexOf(this.$t('myAccount._BitcoinAccount'))!=-1&&this.currencyData.tocurrencyname.indexOf(this.$t('myAccount._LeveragedAccounts'))!=-1){
                this.coinToLever(this.currencyData);
            }else if(this.currencyData.currencyname.indexOf(this.$t('myAccount._LeveragedAccounts'))!=-1&&this.currencyData.tocurrencyname.indexOf(this.$t('myAccount._BitcoinAccount'))!=-1){
                this.leverToCoin(this.currencyData);
            }
        },
        leverToCoin(data) {//杠杆转币币
           data.type=="转入"?data.type=0:data.type=1;
           console.log(this.leveraged);
           let leverCoinSymbol=data.currency.join("/");
            let params={
                coinUnit:this.leveraged,
                leverCoinSymbol:leverCoinSymbol,
                amount:this.num
            };
            this.$http.post(this.host + "/margin-trade/lever_wallet/turn_out", params).then(res => {
                if (res.body.code == 0) {
                    this.$Notice.success({
                        title: this.$t("exchange.tip"),
                        desc: this.$t('exchange.operateSuccessfully')
                    });
                    this.datainit();
                    this.init();
                    this.$emit("closetransferModal");
                    this.getmoney();
                } else {
                    this.$Notice.error({
                        title: this.$t("exchange.tip"),
                        desc: res.body.message
                    })
                }
            })
        },
        coinToOtc(data) {//币币与发币互转;
        data.type=="转入"?data.type=0:data.type=1;
            let params={
                coinName:data.currency,
                direction:data.type,
                amount:this.num
            };
            this.$http.post(this.host + "/uc/otc/wallet/transfer", params).then(res => {
                if (res.body.code == 0) {
                    this.$Notice.success({
                        title: this.$t("exchange.tip"),
                        desc: this.$t("exchange.operateSuccessfully")
                    });
                    this.datainit();
                    this.init();
                    this.$emit("closetransferModal");
                    this.getmoney();
                } else {
                    this.$Notice.error({
                        title: this.$t("exchange.tip"),
                        desc: res.body.message
                    })
                }
            })
        },
        coinToLever(data) {//币币转杠杆
        data.type=="转入"?data.type=0:data.type=1;
        let leverCoinSymbol=data.currency.join("/");
            let params={
                coinUnit:this.leveraged,
                leverCoinSymbol:leverCoinSymbol,
                amount:this.num
            };
            this.$http.post(this.host + "/margin-trade/lever_wallet/change_into", params).then(res => {
                if (res.body.code == 0) {
                    this.$Notice.success({
                        title: this.$t("exchange.tip"),
                        desc: this.$t("exchange.operateSuccessfully")
                    });
                    this.datainit();
                    this.init();
                    this.$emit("closetransferModal");
                    this.getmoney();
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
                        value: this.$t('coin.Leveraged'),
                        label: this.$t('coin.Leveraged'),
                        children: temp
                    }];
                    this.leverList = leverList;
                    const tempList = data.data.supportOtcCoins.map(ele => ({
                        value: ele.unit,
                        label: ele.unit,
                    }));
                    const otcList = [{
                        value: this.$t('coin.legal'),
                        label: this.$t('coin.legal'),
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
                            value: this.$t('coin.bit'),
                            label: this.$t('coin.bit'),
                            children: temp
                        }];
                        this.exchangeList = exchangeList;
                        resolve("success");
                    })
                } else {
                    if (this.loginmsg != undefined) {
                        this.$Message.error(this.loginmsg);
                    }
                }
            });
        },
        updateLangData(){
           this.init();
        }
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        },
        lang:function(){
            return this.$store.getters.lang;
        }
    }
}
</script>
<style lang="scss">
        .ivu-btn-default {
            background: #111530;
            color: #8090af;
            border-radius: 0;
            &:hover {
                background: #111530;
                color: #8090af;
            }
        }
        .ivu-btn-primary {
            color: #fff;
            border-radius: 0 !important;
        }
        .ivu-input-group-append {
            background: #111530;
            border-radius: 0;
            border: 1px solid #8090af;
        }
        .ivu-input-group-append,
        .ivu-input-group-prepend {
            background: #111530;
            padding: 4px 25px;
            border: 1px solid #2A3850;
        }
        .ivu-modal-content {
            background: #111530;
            .ivu-modal-header {
                border-bottom: 1px solid #8090AF;
                .ivu-modal-header-inner {
                    color: #8090AF;
                }
            }
            .ivu-input-wrapper {
                .ivu-input[disabled] {
                    border-radius: 0;
                    background: #111530;
                    border: 1px solid #2A3850;
                }
            }
            .ivu-input-group {
                .ivu-input {
                    background: #111530;
                    border: 1px solid #2A3850;
                    border-radius: 0;
                }
            }
            .ivu-input {
                border-radius: 0;
                background: #111530;
                border: 1px solid #2A3850;
                color: #8090af;
            }
        }
.all {
    display: inline-block;
    cursor: pointer;
    color: #2d8cf0;
    text-align: center;
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-left: 1px solid #2A3850;
    position: absolute;
    top: -39px;
    right: 55px;
}
.button {
    display:flex;
    justify-content:space-evenly;
    margin-top:20px;
    button{
        width:100px;
        cursor: pointer;
        &:first-child {
            background: #191D3A;
            border: 1px solid #2A3850;
            color: #fff;
        }
        &:last-child {
            background: #3399ff;
            border: 1px solid #3399ff;
            color: #fff;
        }
    }
}
#select{
    .ivu-select-selection{
        div{
            span{
                text-align: left;
            }
        }
    }
    .ivu-select-dropdown-list{
            li{
                text-align: left;
            }
        }
}
</style>
