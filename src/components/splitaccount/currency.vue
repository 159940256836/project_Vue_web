<template>
    <div class="shaow">
        <div class="order-table">
            <Table stripe :columns="tableColumnsMoney" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
        </div>
    </div>
</template>
<script>
export default {
    props: ["content"],
    data() {
        return {
            tableMoney: [],
            loading: true,
        }
    },
    created() {
        this.getMoney();
    },
    methods: {
        getMoney() {
            this.$http.post(this.host + "/uc/otc/wallet/get").then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableMoney = resp.data;
                    for (let i = 0; i < this.tableMoney.length; i++) {
                        this.tableMoney[i]["coinType"] = this.tableMoney[i].coin.unit;
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
                render: function (h, params) {
                    var actions = [];
                    const btn = h('Button', {
                        props: {
                            type: "info",

                        },
                        style: {
                            marginRight: "8px",
                        }
                    }, "转出");
                    actions.push(btn);
                    return h("p", actions);
                }
            });
            return columns;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
