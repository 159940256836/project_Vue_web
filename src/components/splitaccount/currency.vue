<template>
    <div class="shaow">
        <div class="order-table">
            <div class="hidden-assets">
            <span>{{$t('myAccount._display')}}:</span>
            <i-switch v-model="googleSwitch" @on-change="changeGoogleSwitch">
                <span slot="open"></span>
                <span slot="close"></span>
            </i-switch>
            </div>
            <Table
                stripe
                :columns="tableColumnsMoney"
                :data="tableMoney"
                :loading="loading"
                :disabled-hover="true"
            ></Table>
        </div>
        <transfermodal :modal="modal" @closetransferModal="closeModal" :getmoney="getMoney" :currencyData="currencyData" ></transfermodal>
    </div>
</template>
<script>
import transfermodal from "../transfer/Index"
export default {
    // props: ["modal"],
    components:{transfermodal},
    data() {
        return {
            modal:false,
            tableMoney: [],
            loading: true,
            googleSwitch:false,
            hiddenAccountData:[],
            showAccountData:[],
            currencyData:{
                currencyname:"",
                tocurrencyname:"",
                type:"",
                currency:"",
                modal:false,
                balance:""
            }
        }
    },
    created() {
        this.getMoney();
    },
    methods: {
        closeModal(){
            this.modal = false;
        },
         changeGoogleSwitch(){
            this.googleSwitch?this.tableMoney=this.hiddenAccountData:this.tableMoney=this.showAccountData;
        },
        getMoney() {
            this.$http.post(this.host + "/uc/otc/wallet/get").then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableMoney = resp.data;
                    this.showAccountData=resp.data;
                    for (let i = 0; i < this.tableMoney.length; i++) {
                        this.tableMoney[i]["coinType"] = this.tableMoney[i].coin.unit;
                         if(this.tableMoney[i].balance != "0" || this.tableMoney[i].frozenBalance != "0" || this.tableMoney[i].releaseBalance != "0"){
                            this.hiddenAccountData.push(this.tableMoney[i]);
                        }
                    }
                    this.loading = false;
                } else {
                    this.$Message.error(this.loginmsg);
                }
            });
        }
    },
    computed: {
        tableColumnsMoney() {
            let self = this;
            let columns = [];
            columns.push({
                title: this.$t("uc.finance.money.cointype"),
                key: "coinType",
                width: 100,
                align: "center"
            });
            columns.push({
                title: this.$t("uc.finance.money.balance"),
                key: "balance",
                align: "center",
                render(h, params) {
                    return h(
                        "span",
                        {
                            attrs: {
                                title: params.row.balance
                            }
                        },
                        self.toFloor(params.row.balance || "0")
                    );
                }
            });
            columns.push({
                title: this.$t("uc.finance.money.frozen"),
                key: "frozenBalance",
                align: "center",
                render(h, params) {
                    return h(
                        "span",
                        {
                            attrs: {
                                title: params.row.frozenBalance
                            }
                        },
                        self.toFloor(params.row.frozenBalance || "0")
                    );
                }
            });
            columns.push({
                title: this.$t("uc.finance.money.needreleased"),
                align: "center",
                render(h, params) {
                    return h(
                        "span",
                        {
                            attrs: {
                                title: params.row.toReleased
                            }
                        },
                        self.toFloor(params.row.toReleased || "0")
                    );
                }
            });
            columns.push({
                title: this.$t("uc.finance.money.operate"),
                align: "center",
                render: (h, params) =>{
                    var actions = [];

                    const btn = h('span', {
                        props: {
                            type: "info",
                        },
                        on:{
                            click:()=>{
                                this.modal = true;
                                this.currencyData.currencyname=this.$t('myAccount._BitcoinAccount')+this.tableMoney[params.index].coinType;
                                this.currencyData.tocurrencyname=this.$t('myAccount._legaTenderAccount')+this.tableMoney[params.index].coinType;
                                this.currencyData.type="转入";
                                this.currencyData.currency=this.tableMoney[params.index].coinType;
                                this.currencyData.balance="";
                            }
                        },
                        style: {
                            marginRight: "30px",
                            color: "#3399ff",
                            cursor: "pointer"
                        }
                    }, self.$t("myAccount._rollout"));

                    const outbtn = h('span', {
                        props: {
                            type: "info",
                        },
                        on:{
                            click:()=>{
                                this.modal = true;
                                this.currencyData.currencyname=this.$t('myAccount._legaTenderAccount')+this.tableMoney[params.index].coinType;
                                this.currencyData.tocurrencyname=this.$t('myAccount._BitcoinAccount')+this.tableMoney[params.index].coinType;
                                this.currencyData.type="转出";
                                this.currencyData.currency=this.tableMoney[params.index].coinType;
                                this.currencyData.balance=this.tableMoney[params.index].balance;
                            }
                        },
                        style: {
                            color: "#3399ff",
                            cursor: "pointer"
                        }
                    }, self.$t("myAccount.rollout"));
                    actions.push(btn);
                    actions.push(outbtn);
                    return h("p", actions);
                }
            });
            return columns;
        }
    }
}
</script>

<style lang="scss">

</style>
