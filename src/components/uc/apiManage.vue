<template>
    <div class="nav-rights">
        <div class="main">
            <Card :bordered="false">
                API管理
            </Card>
            <Card :bordered="false" class="content">
                <p slot="title">创建新API Key</p>
                <div class="content_header">
                    <div class="add">
                        <Form :model="formItem" label-position="top">
                            <FormItem label="备注">
                                <Input v-model="formItem.remark"></Input>
                            </FormItem>
                            <FormItem label="绑定IP地址（选填）  未绑定IP地址的密钥有效期为90天">
                                <Input v-model="formItem.bindIp"></Input>
                            </FormItem>
                        </Form>
                        <Button type="primary" @click="make">创建</Button>
                    </div>
                    <div class="prompt">
                        <p style="color:#515a6e; font-weight: 600;">提示</p>
                        <ul>
                            <li>币多网为您提供了强大的API,您可以通过API使用行情查询、自动交易等服务。通过
                                <router-link to="">API文档</router-link>查看如何使用。</li>
                            <li>每个用户最多创建5组API Key</li>
                            <li>
                                <span>请不要泄露您的API Key，以免造成资产损失。</span> 出于安全考虑，建议为API Key绑定IP，每个API Key最多绑定5个Ip。单个地址直接填写，多个IP地址用半角逗号分隔，如：192.168.1.1,192.168.1.2,192.168.1.3。</li>
                        </ul>
                    </div>
                </div>
            </Card>
            <Card :bordered="false" class="content">
                <p slot="title">我的API Key</p>
                <Table :columns="myColumns" :data="tableData"></Table>
            </Card>
        </div>
        <Modal v-model="editor" title="编辑API" @on-ok="ok" @on-cancel="editor=false">
            <Form :model="EditorFormItem" label-position="top">
                <FormItem label="备注:">
                    <Input v-model="EditorFormItem.remark"></Input>
                </FormItem>
                <FormItem label="IP地址:">
                    <Input v-model="EditorFormItem.bindIp"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="del" title="删除" @on-ok="onDel(id)" @on-cancel="del=false">
            <p>确认删除吗？</p>
        </Modal>
        <Modal v-model="show" title="密钥" @on-ok="show=false" :mask-closable="false">
            <p class="screat">密钥只在新增时展示，请及时保存</p>
            <p class="screat">
                <!--{{screat}}-->
                <span>{{screat}}</span>
                <span
                    v-clipboard:copy="screat"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    class="blue"
                >复制</span>
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
            id: "",
            myColumns: [
                {
                    title: "创建时间",
                    width: 100,
                    key: "createTime"
                },
                {
                    title: "备注",
                    width: 90,
                    key: "remark"
                },
                {
                    title: "API Key",
                    width: 150,
                    key: "apiKey",
                },
                {
                    title: "访问密钥",
                    width: 100,
                    render: (h, params) => {
                        const text = "******";
                        return h("span", {}, text);
                    }
                },
                {
                    title: "绑定IP地址",
                    render: (h, params) => {
                        let txts = params.row.bindIp.split(",");
                        txts = txts.length > 1 ? txts[0] + "  " + "..." : txts;
                        return h("span", {}, txts);
                    }
                },
                {
                    title: "剩余有效期（天）",
                    render: (h, params) => {
                        if (!params.row.bindIp) {
                            let residue = + new Date(params.row.expireTime) - + new Date();
                            let lastTime = Math.floor(residue / 1000 / 60 / 60 / 24);
                            lastTime = lastTime <= 0 ? 0 : lastTime;
                            const timeDay = h("span", {}, lastTime);
                            return [timeDay];
                        }
                    }
                },
                {
                    title: "操作",
                    align:"center",
                    width:180,
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
                                "编辑"
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
                                "删除"
                            )
                        ];
                    }
                }
            ]
        };
    },
    created() {
        this.getAllAPI();
    },
    methods: {
        onCopy(e) {
            this.$Notice.success({
                title: this.$t("common.tip"),
                desc: "复制成功"
            })
        },
        onError() {
            this.$Notice.error({
                title: this.$t("common.tip"),
                desc: "复制失败"
            })
        },
        getAllAPI() {
            return this.$http.get(this.host + `/uc/open/get_key`).then(res => {
                this.tableData = res.data.data;
                console.log(this.tableData)
            });
        },
        make() {
            const IP_REG = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/
            if (this.formItem.remark == "") {
                this.$Message.error("请输入备注信息");
                return;
            } else if (this.formItem.bindIp == "") {
                this.$Message.error("请输入IP地址");
                return;
            } else if (!IP_REG.test(this.formItem.bindIp)) {
                this.$Message.error("请输入正确IP地址");
                return;
            } else {
                this.$http
                    .post(this.host + "/uc/open/api/save", this.formItem)
                    .then(res => {
                        if (!res.data.code) {
                            this.$Message.success("创建成功！");
                            this.formItem.remark = "";
                            this.formItem.bindIp = "";
                            this.getAllAPI();
                            this.screat = res.data.data;
                            console.log(this.screat)
                            this.show = true;
                        } else {
                            this.$Message.error(res.data.message + "，最多只能创建5条API Key");
                        }
                    });
            }

        },
        ok() {
            this.$http
                .post(this.host + "/uc/open/api/update", this.EditorFormItem)
                .then(res => {
                    if (!res.code) {
                        this.getAllAPI();
                        this.editor = false;
                        this.$Message.success("修改成功！");
                    } else {
                        this.$Message.error("修改失败！");
                    }
                });
        },
        onDel(id) {
            this.$http.get(this.host + `/uc/open/api/del/${id}`).then(res => {
                if (!res.code) {
                    this.$Message.success("删除成功！");
                    this.del = false;
                    this.getAllAPI();
                } else {
                    this.$Message.error("删除失败！");
                }
            });
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



