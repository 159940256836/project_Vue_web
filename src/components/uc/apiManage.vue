<template>
    <div class="nav-rights">
        <div class="main">
            <Card :bordered="false">
                {{$t('apiAdmin.apiAdmin')}}
            </Card>
            <Card :bordered="false" class="content">
                <p slot="title">{{$t('apiAdmin.createApi')}}</p>
                <div class="content_header">
                    <div class="add">
                        <Form :model="formItem" label-position="top">
                            <FormItem :label="$t('apiAdmin.mark')">
                                <Input v-model="formItem.remark"></Input>
                            </FormItem>
                            <FormItem :label="$t('apiAdmin.bindAddress')">
                                <Input v-model="formItem.bindIp"></Input>
                            </FormItem>
                        </Form>
                        <Button type="primary" @click="make">{{$t('apiAdmin.create')}}</Button>
                    </div>
                    <div class="prompt">
                        <p style="color:#515a6e; font-weight: 600;">{{$t('apiAdmin.hint')}}</p>
                        <ul>
                            <li>{{$t('apiAdmin.part1')}}
                                <router-link to="">{{$t('apiAdmin.apiDoc')}}</router-link>{{$t('apiAdmin.howUse')}}</li>
                            <li>{{$t('apiAdmin.part2')}}</li>
                            <li>{{$t('apiAdmin.part3')}}</li>
                        </ul>
                    </div>
                </div>
            </Card>
            <Card :bordered="false" class="content">
                <p slot="title">{{$t('apiAdmin.myApiKey')}}</p>
                <Table :columns="myColumns" :data="tableData"></Table>
            </Card>
        </div>
        <Modal v-model="editor" :title="$t('apiAdmin.edit')" @on-ok="ok" @on-cancel="editor=false" :ok-text="$t('apiAdmin.okText')" :cancel-text="$t('apiAdmin.cancel')">
            <Form :model="EditorFormItem" label-position="top">
                <FormItem :label="$t('apiAdmin.mark')">
                    <Input v-model="EditorFormItem.remark"></Input>
                </FormItem>
                <FormItem :label="$t('apiAdmin.bindIpAddress')">
                    <Input v-model="EditorFormItem.bindIp"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="del" :title="$t('apiAdmin.delete')" @on-ok="onDel(id)" @on-cancel="del=false" :ok-text="$t('apiAdmin.okText')" :cancel-text="$t('apiAdmin.cancel')">
            <p>{{$t('apiAdmin.sureDelete')}}</p>
        </Modal>
        <Modal v-model="show" :title="$t('apiAdmin.access')" @on-ok="show=false" :mask-closable="false" :ok-text="$t('apiAdmin.okText')" :cancel-text="$t('apiAdmin.cancel')">
            <p class="screat">{{$t('apiAdmin.tips')}}</p>
            <p class="screat">
                <!--{{screat}}-->
                <span>{{screat}}</span>
                <span v-clipboard:copy="screat" v-clipboard:success="onCopy" v-clipboard:error="onError" class="blue">{{$t('apiAdmin.copy')}}</span>
            </p>
        </Modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            del: false,
            editor: false,
            show: false,
            screat: "",
            EditorFormItem: {
                remark: "",
                bindIp: ""
            },
            formItem: {
                remark: "",
                bindIp: ""
            },
            tableData: [],
            id: ""
        };
    },
    created() {
        this.getAllAPI();
    },
    methods: {
        onCopy(e) {
            this.$Notice.success({
                title: this.$t("common.tip"),
                desc: "success"
            })
        },
        onError() {
            this.$Notice.error({
                title: this.$t("common.tip"),
                desc: "fail"
            })
        },
        getAllAPI() {
            return this.$http.get(this.host + `/uc/open/get_key`).then(res => {
                console.log(res);
                this.tableData = res.body.data;
                console.log(this.tableData)
            });
        },
        make() {
            const IP_REG = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/
            if (this.formItem.remark == "") {
                const lang = this.$store.getters.lang == "English"?'please scanner remark':'请输入备注信息';
                this.$Message.error(lang);
                return;
            } else if (this.formItem.bindIp == "") {
                const lang = this.$store.getters.lang == "English"?'please scanner IP Address':'请输入IP地址';
                this.$Message.error(lang);
                return;
            } else if (!IP_REG.test(this.formItem.bindIp)) {
                const lang = this.$store.getters.lang == "English"?'please scanner Correct IP Address':'请输入正确IP地址'
                this.$Message.error(lang);
                return;
            } else {
                this.$http
                    .post(this.host + "/uc/open/api/save", this.formItem)
                    .then(res => {
                        if (!res.body.code) {
                            this.$Message.success(res.body.message);
                            this.formItem.remark = "";
                            this.formItem.bindIp = "";
                            this.getAllAPI();
                            this.screat = res.body.data;
                            this.show = true;
                        } else {
                            this.$Message.error(res.body.message);
                        }
                    });
            }

        },
        ok() {
            this.$http
                .post(this.host + "/uc/open/api/update", this.EditorFormItem)
                .then(res => {
                    console.log(res.code);
                    if (!res.body.code) {
                        this.getAllAPI();
                        this.editor = false;
                        this.$Message.success(res.body.message);
                    } else {
                        this.$Message.error(res.body.message);
                    }
                });
        },
        onDel(id) {
            this.$http.get(this.host + `/uc/open/api/del/${id}`).then(res => {
                if (!res.body.code) {
                    this.$Message.success(res.body.message);
                    this.del = false;
                    this.getAllAPI();
                } else {
                    this.$Message.error(res.body.message);
                }
            });
        }
    },
    computed: {
        myColumns() {
            const arr = [];
            arr.push({
                title: this.$t("apiAdmin.createTime"),
                width: 100,
                key: "createTime"
            });
            arr.push({
                title: this.$t("apiAdmin.mark"),
                width: 90,
                key: "remark"
            });
            arr.push({
                title: "API Key",
                width: 150,
                key: "apiKey"
            });
            arr.push({
                title: this.$t("apiAdmin.accessKey"),
                width: 100,
                render: (h, params) => {
                    const text = "******";
                    return h("span", {}, text);
                }
            });
            arr.push({
                title: this.$t("apiAdmin.bindIpAddress"),
                render: (h, params) => {
                    let txts = params.row.bindIp.split(",");
                    txts = txts.length > 1 ? txts[0] + "  " + "..." : txts;
                    return h("span", {}, txts);
                }
            });
            arr.push({
                title: this.$t("apiAdmin.ioDays"),
                render: (h, params) => {
                    if (!params.row.bindIp) {
                        let residue = + new Date(params.row.expireTime) - + new Date();
                        let lastTime = Math.floor(residue / 1000 / 60 / 60 / 24);
                        lastTime = lastTime <= 0 ? 0 : lastTime;
                        const timeDay = h("span", {}, lastTime);
                        return [timeDay];
                    }
                }
            });
            arr.push({
                title: this.$t("apiAdmin.operation"),
                align: "center",
                width: 180,
                render: (h, params) => {
                    return [
                        h(
                            "Button",
                            {
                                props: {
                                    type: "primary"
                                },
                                on: {
                                    click: () => {
                                        const { remark, bindIp, id } = params.row;
                                        this.EditorFormItem = { remark, bindIp, id };
                                        this.editor = true;
                                    }
                                }
                            },
                            this.$t("apiAdmin.edit"),
                        ),
                        h(
                            "Button",
                            {
                                props: {
                                    type: "error"
                                },
                                style: {
                                    marginLeft: "10px"
                                },
                                on: {
                                    click: () => {
                                        this.del = true;
                                        this.id = params.row.id;
                                    }
                                }
                            },
                            this.$t("apiAdmin.delete"),
                        )
                    ];
                }
            })
            return arr;
        }
    }
};
</script>

<style lang="scss" scoped>
.blue {
    cursor: pointer;
    color: #fff;
    background: #3399ff;
    display: inline-block;
    padding: 0 12px;
    font-size: 12px;
    border-radius: 3px;
}
.main {
    //   background-color: #eee;
    padding: 20px;
    .content {
        margin: 10px 0;
        .content_header {
            padding: 10px;
            display: flex;
            justify-content: space-between;
            .add {
                width: 39%;
            }
            .prompt {
                width: 49%;
                ul li {
                    font-size: 10px;
                    color: #515a6e;
                    line-height: 25px;
                    list-style: disc;
                    span {
                        color: #000;
                    }
                }
            }
            .ivu-btn-primary {
                background-color: #2d8cf0;
                border-color: #2d8cf0;
            }
        }
    }
}
.screat {
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
}
</style>



