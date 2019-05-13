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
        console.log("初始化");
        this.getMoney();
    },
    methods: {
        getMoney() {
            this.$http.post(this.host + "/uc/asset/wallet").then(response => {
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
        },
        resetAddress(unit) {
            let params = {};
            params["unit"] = unit;
            this.$http.post(this.host + "/uc/asset/wallet/reset-address", params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(this.$t("uc.finance.money.resetsuccess"));
                    this.getMoney();
                    // setTimeout(function () {
                    //     window.location.reload();
                    // }, 2000);
                } else {
                    this.$Message.error(resp.message);
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
                key: "price1",
                width: 400,
                align: "center",
                render: function (h, params) {
                    var actions = [];
                    if (params.row.coin.canRecharge == 1) {
                        if (params.row.address != null && params.row.address != "") {
                            // 充币
                            actions.push(
                                h(
                                    "Button",
                                    {
                                        // 充币;
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: function () {
                                                self.$router.push(
                                                    "/uc/recharge?name=" + params.row.coin.unit
                                                );
                                            }
                                        },
                                        style: {
                                            marginRight: "8px"
                                        }
                                    },
                                    self.$t("uc.finance.money.charge")
                                )
                            );
                        } else {
                            //   获取地址按钮;
                            actions.push(
                                h("Button",
                                    {   
                                        props: { type: "info", size: "small" },
                                        on: {
                                            click: function () {
                                                self.resetAddress(params.row.coin.unit);
                                            }
                                        },
                                        style: {
                                            marginRight: "8px"
                                        }
                                    },
                                    self.$t("uc.finance.money.getaddress")
                                )
                            );
                        }
                    }
                    if (params.row.coin.canWithdraw == 1) {
                        // 提币;
                        actions.push(
                            h("Button", {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                on: {
                                    click: function () {
                                        self.$router.push(
                                            "/uc/withdraw?name=" + params.row.coin.unit
                                        );
                                    }
                                },
                                style: {
                                    marginRight: "8px"
                                }
                            },
                                self.$t("uc.finance.money.pickup")
                            )
                        );
                    }
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
