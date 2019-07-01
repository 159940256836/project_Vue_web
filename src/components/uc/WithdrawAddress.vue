<template>
    <div class="nav-rights-address">
        <div class="nav-right">
            <div class="bill_box_address">
                <section>
                    <div class="table-inner">
                        <div class="action-inner">
                            <div class="inner-left deposit-address">
                                <span class="describe">
                                    {{ $t('uc.finance.withdraw.symbol') }}
                                </span>：
                                <Select
                                    v-model="coinType"
                                    style="width:130px;"
                                    size="large"
                                >
                                    <Option
                                        v-for="item in coinList"
                                        :value="item" :key="item"
                                    >
                                        {{ item }}
                                    </Option>
                                </Select>
                            </div>
                            <div class="inner-box deposit-address">
                                <span class="describe">
                                    {{$t('uc.finance.withdraw.address')}}：
                                </span>
                                <div class="title">
                                    <Input
                                        v-model="withdrawAddr"
                                        style="width: 260px;"
                                        size="large"
                                    />
                                </div>
                            </div>
                            <div class="inner-box deposit-address" style="margin-left: 60px;">
                                <span class="describe">
                                    {{$t('uc.finance.withdraw.remark')}}：
                                </span>
                                <div class="title">
                                    <Input
                                        v-model="remark"
                                        style="width: 200px;"
                                        size="large"
                                    />
                                </div>
                            </div>
                            <Button
                                id="addrSubmit"
                                @click='addAddr'
                                size="large"
                                style=""
                            >
                                {{$t('uc.finance.withdraw.add')}}
                            </Button>
                        </div>
                        <!--<div class="btnbox"></div>-->
                        <div class="action-content">
                            <div class="action-body">
                                <!--<p class="acb-p1 describe">{{$t('uc.finance.withdraw.addresslist')}}</p>-->
                                <div class="order-table">
                                    <Table
                                        stripe
                                        :columns="tableColumnsRecharge"
                                        :data="dataRecharge"
                                        :disabled-hover="true"
                                        :no-data-text="$t('common.nodata')"
                                    ></Table>
                                    <div style="margin: 10px;overflow: hidden">
                                        <div style="float: right;">
                                            <Page
                                                v-show="dataCount > 10"
                                                :total="dataCount"
                                                :current="1"
                                                @on-change="changePage"
                                                :loading="loading"
                                                class="recharge_btn"
                                            ></Page>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <!-- model -->
        <Modal v-model="modal2" width="400">
            <p slot="header" style="color:#39f;text-align:center">
                <span>{{$t('uc.finance.withdraw.safevalidate')}}</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidateAddr" :model="formValidateAddr" :rules="ruleValidate" :label-width="85">
                    <!-- 手机号 -->
                    <FormItem :label="$t('uc.finance.withdraw.telno')" prop="mobileNo" v-show="validPhone" style="width:90%">
                        <Input disabled size="large" v-model="formValidateAddr.mobileNo"></Input>
                    </FormItem>
                    <!-- 手机验证码 -->
                    <FormItem :label="$t('uc.finance.withdraw.smscode')" prop="vailCode2" v-show="validPhone" style="width:90%">
                        <Input v-model="formValidateAddr.vailCode2" size="large">
                        <!-- <Button slot="append">点击获取</Button> -->
                        <div class="timebox" slot="append">
                            <Button @click="send(2)" :disabled="disbtn">
                              <!--sendMsgDisabled2为true 时间+秒    sendMsgDisabled2为false为，点击获取 -->
                                <span v-if="sendMsgDisabled2">{{time2+$t('uc.finance.withdraw.second')}}</span>
                                <span v-if="!sendMsgDisabled2">{{$t('uc.finance.withdraw.clickget')}}</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                    <!-- 邮箱 -->
                    <FormItem :label="$t('uc.finance.withdraw.email')" prop="email" v-show="validEmail" style="width:90%">
                        <Input disabled v-model="formValidateAddr.email" size="large"></Input>
                    </FormItem>
                    <!-- 邮箱验证码 -->
                    <FormItem :label="$t('uc.finance.withdraw.emailcode')" prop="vailCode1" v-show="validEmail" style="width:90%">
                        <Input v-model="formValidateAddr.vailCode1" size="large">
                        <!-- <Button slot="append">点击获取</Button> -->
                        <div class="timebox" slot="append">
                            <Button @click="send(1)" :disabled="disbtn">
                                <span v-if="sendMsgDisabled1">{{time1+$t('uc.finance.withdraw.second')}}</span>
                                <span v-if="!sendMsgDisabled1">{{$t('uc.finance.withdraw.clickget')}}</span>
                            </Button>
                        </div>
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="width: 68%;margin-left:23%;">
                <Button
                    type="primary"
                    size="large"
                    long
                    @click="handleSubmit('formValidateAddr')"
                    style="color: #fff;height: 35px;"
                >
                    {{$t('uc.finance.withdraw.save')}}
                </Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  components: {},

  data() {
    var that = this;
    return {
      interval:function(){},
      disbtn: false,
      dataCount: 10,
      loading: true,
      //else
      sendMsgDisabled1: false,
      sendMsgDisabled2: false,
      time1: 60, // 发送验证码倒计时
      time2: 60, // 发送验证码倒计时
      modal2: false,
      modal_loading: false,
      withdrawAddr: "",
      remark: "",
      coinType: "",
      validEmail: false,
      validPhone: false,
      coinList: [],
      tableColumnsRecharge: [
        {
          title: this.$t("uc.finance.withdraw.symbol"),
          key: "unit"
        },
        {
          title: this.$t("uc.finance.withdraw.address"),
          key: "address"
        },
        {
          title: this.$t("uc.finance.withdraw.remark"),
          key: "remark"
        },
        {
          title: this.$t("uc.finance.withdraw.operate"),
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style:{
                      color: '#3399ff',
                      cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.del(params.row.id);
                      // this.getList(0, 10);
                    }
                  }
                },
                that.$t("uc.finance.withdraw.delete")
              )
            ]);
          }
        }
      ],
      dataRecharge: [],
      formValidateAddr: {
        mobileNo: "",
        vailCode2: "",
        email: "",
        vailCode1: ""
      },
      ruleValidate: {
        mobileNo: [
          {
            required: this.validPhone,
            message: this.$t("uc.finance.withdraw.telerr"),
            trigger: "blur"
          }
        ],
        vailCode2: [
          {
            required: this.validPhone,
            message: this.$t("uc.finance.withdraw.codeerr"),
            trigger: "change"
          }
        ],
        email: [
          {
            required: this.validEmail,
            type: "email",
            message: this.$t("uc.finance.withdraw.emailerr"),
            trigger: "blur"
          }
        ],
        vailCode1: [
          {
            required: this.validEmail,
            message: this.$t("uc.finance.withdraw.codeerr"),
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getMember();
    this.getList(0, 10);
    this.coinType = this.$route.query.name;
    this.getCoin();
  },
  methods: {
    refresh(){
      this.coinType = null,
      this.withdrawAddr = null,
      this.remark = null;
      this.getList(0, 10)
    },
    getMember() {
      //获取个人安全信息
      this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            if (resp.data.mobilePhone) {
              this.formValidateAddr.mobileNo = resp.data.mobilePhone;
              this.validPhone = true;
              this.validEmail = false;
            } else {
              this.formValidateAddr.email = resp.data.email;
              this.validPhone = false;
              this.validEmail = true;
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getCoin() {
      //币种
      this.$http.post(this.host + "/uc/withdraw/support/coin").then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            for (let i = 0; i < resp.data.length; i++) {
              this.coinList.push(resp.data[i]);
            }
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getList(pageNo, pageSize) {
      //获取地址
      let params = {};
      params["pageNo"] = pageNo;
      params["pageSize"] = pageSize;
      this.$http.post(this.host + "/uc/withdraw/address/page", params).then(response => {
          var resp = response.body;
          if (resp.code == 0 && resp.data.content) {
            this.dataRecharge = resp.data.content;
            this.dataCount = resp.data.totalElement;
          } else {
            this.$Message.error(resp.message);
          }
          this.loading = false;
        });
    },
    remove(index) {
      this.dataRecharge.splice(index, 1);
    },
    send(index) {
      let me = this;
      this.disbtn = true;
      if (index == 1) {
        if (this.formValidateAddr.email) {
          //获取邮箱code
          this.$http.post(this.host + "/uc/add/address/code").then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(resp.message);
              me.sendMsgDisabled1 = true;
              let interval = window.setInterval(function() {
                if (me.time1-- <= 0) {
                  me.time1 = 60;
                  me.sendMsgDisabled1 = false;
                  window.clearInterval(interval);
                  this.disbtn = false;
                }
              }, 1000);
            } else {
              this.$Message.error(resp.message);
              this.disbtn = false;
            }
          });
        } else {
          this.$refs.formValidateAddr.validateField("email");
          this.disbtn = false;
        }
      } else if (index == 2) {
        if (this.formValidateAddr.mobileNo) {
          //获取手机code
          this.$http.post(this.host + "/uc/mobile/add/address/code").then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(resp.message);
                me.sendMsgDisabled2 = true;
                this.interval = window.setInterval(()=> {
                  if (me.time2-- <= 0) {
                    me.time2 = 60;
                    me.sendMsgDisabled2 = false;
                    window.clearInterval(this.interval);
                    this.disbtn = false;
                  }
                }, 1000);
              } else {
                this.$Message.error(resp.message);
                this.disbtn = false;
              }
            });
        } else {
          this.$refs.formValidateAddr.validateField("mobileNo");
          this.disbtn = false;
        }
      }
    },
    addAddr() {
      let interval = setInterval(()=>{
        if(this.time2 <= 0){
          this.sendMsgDisabled2 = false;
          window.clearInterval(interval);
          this.disbtn = false;
        }
      },1000);
      if (!this.coinType) {
        this.$Message.warning(this.$t("uc.finance.withdraw.symboltip"));
      } else if (!this.withdrawAddr) {
        this.$Message.warning(this.$t("uc.finance.withdraw.addresstip"));
      } else if (!this.remark) {
        this.$Message.warning(this.$t("uc.finance.withdraw.remarktip"));
      } else if (this.coinType && this.remark && this.withdrawAddr) {
        this.modal2 = true;
      }
    },
    changePage(index) {
      this.getList(index, 10, this.coinType);
    },
    del(id) {
      const title = this.$t("common.tip");
      const content = "<p>" + this.$t("common.delete") + "</p>";
      this.$Modal.confirm({
        title: title,
        content: content,
        onOk: () => {
          let params = {};
          params["id"] = id;
          this.$http.post(this.host + "/uc/withdraw/address/delete", params).then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(resp.message);
                this.refresh();
              } else {
                this.$Message.error(resp.message);
              }
              this.loading = false;
            });
        },
        onCancel: () => {}
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.submit(name);
        } else {
          this.$Message.error(this.$t("uc.finance.withdraw.savemsg1"));
        }
      });
    },
    submit(name) {
      let param = {};
      param["address"] = this.withdrawAddr;
      param["unit"] = this.coinType;
      if (this.validPhone) {
        param["aims"] = this.formValidateAddr.mobileNo;
        param["code"] = this.formValidateAddr.vailCode2;
      } else {
        param["aims"] = this.formValidateAddr.email;
        param["code"] = this.formValidateAddr.vailCode1;
      }
      param["remark"] = this.remark;

      this.$http.post(this.host + "/uc/withdraw/address/add", param).then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.success(this.$t("uc.finance.withdraw.savemsg2"));
            this.formValidateAddr.vailCode2 = "";
            this.refresh();
            this.modal2 = false;
          } else {
            this.$Message.error(resp.message);
          }
        });
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.nav-rights-address {
    .ivu-input-large {
        height: 30px;
    }
    .ivu-select-dropdown {
        li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
            background: #10122B;
            color: #3399ff;
        }

        li.ivu-select-item.ivu-select-item-selected {
            background: #10122B;
            color: #495060;

            &:hover {
                color: #3399ff;
            }
        }
    }
  .nav-right {
    .bill_box_address {
      .table-inner {
        .action-inner {
            background: #111530;
            display: table;
            height: 60px;
            line-height: 60px;
            width: 100%;
            margin-bottom: 22px;
            .inner-left {
                width: 20%;
            }
              .inner-left,
              .inner-box {
                  margin-left: 28px;
                display: table-cell;
                  .describe {
                      color: #8090af;
                      float: left;
                  }
              }
        }
      }
    }
  }
}
.btnbox {
  text-align: right;
  padding: 25px 30px;
}

.deposit-address {
    float: left;
  /*width: 25%;*/
    .title {
        float: left;
    }
}
#addrSubmit {
    height: 32px;
    width: 86px;
    color: #fff;
    background: #3399ff;
    float: right;
    border-radius: 0;
    margin: 14px;
    border: 0;
}
.mt25 {
  display: table-cell;
  width: 43%;
}

span.describe {
  font-size: 14px;
}

/*.action-content {*/
/*  padding: 0 30px;*/
/*}*/
/* common */

.content-wrap {
  background: #f5f5f5;
  min-height: 750px;
}

.container {
  padding-top: 30px;
  margin: 0 auto;
}
</style>
<style lang="scss">
.ivu-modal-content {
    .ivu-btn {
        color: #fff;
        border: 0;
    }
    .ivu-input-group-large>.ivu-input-group-append {
        min-width: 20px;
    }
    .ivu-btn[disabled] {
        &:hover {
            background: #111530;
        }
    }
    .ivu-form .ivu-form-item-label {
        color: #8090AF;
    }
    background: #111530;
    .ivu-modal-confirm-head {
        text-align: left;
        height: 35px;
        border-bottom: 1px solid #2A3850;
        .ivu-modal-confirm-head-title {
            color: #fff;
            margin-left: 0;
        }
    }
    .ivu-modal-confirm-body {
        padding-left: 20px;
    }

    .ivu-modal-confirm-head-icon-confirm {
        display: none;
        .ivu-modal-confirm-body {
        }
    }
    .ivu-btn-text {
        border-radius: 0;
        color: #8090AF;
        border: 1px solid #2A3850;
        padding: 4px 20px;
        &:hover {
            background: transparent;
        }
    }
    .ivu-btn-primary {
        padding: 4px 20px;
    }

    .ivu-modal-footer {
        border-top: 1px solid #2A3850 !important;
        .ivu-btn-primary {
            color: #8090af;
        }
    }
    .ivu-modal-header {
        border-bottom: 1px solid #58698A;
        p {
            color: #8090af;
        }
    }
    .ivu-form-item-content {
        .ivu-input-wrapper {
            .ivu-input-default {
                height: 40px;
                border-radius: 0;
                width: 100%;
                background: #111530;
                border: 1px solid #8090AF;
            }
        }
    }
}
.nav-rights-address {
    .ivu-select-large.ivu-select-single {
        .ivu-select-selection {
            height: 30px;
            border-radius: 0;
            border: 1px solid #2A3850;
            background: #111530;
        }
        .ivu-select-selected-value {
            border-radius: 0;
            background: #111530;
        }
    }
    .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
        height: 28px;
        line-height: 30px;
        border-radius: 0;
        background: #111530;
        color: #8090af;
    }
    .ivu-input-large,
    .ivu-select-placeholder,
    .ivu-select-selection {
        height: 30px;
        line-height: 30px;
    }
    .ivu-input {
        border: 1px solid #2A3850;
        border-radius: 0;
        background: #111530;
        color: #8090AF;
    }
    .nav-right {
        .bill_box_address {
            .table-inner {
                .action-inner {
                    .inner-left {
                        /*左侧边框*/
                        .ivu-select.ivu-select-single {
                            .ivu-select-selection {
                                &:hover {
                                    border-color: #3399ff;
                                }
                            }

                            .ivu-select-selection.ivu-select-selection-focused {
                                border-color: #3399ff;
                            }
                        }

                        .ivu-select-dropdown .ivu-select-item {
                            padding: 6px 16px;

                            &:hover {
                                background: #10122B;
                                color: #3399ff;
                            }
                        }

                        .ivu-select-dropdown {
                            li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
                                /*background: #fff;*/
                                color: #3399ff;
                            }

                            li.ivu-select-item.ivu-select-item-selected {
                                /*background: #fff;*/
                                color: #495060;

                                &:hover {
                                    color: #3399ff;
                                }
                            }
                        }
                    }

                    .action-content .action-body {
                        /*分页*/
                        .ivu-page {
                            .ivu-page-item.ivu-page-item-active {
                                background-color: #111530;
                                border-color: #191f44;
                                a {
                                    color: #3399ff;
                                }

                                &:hover {
                                    a {
                                        color: #fff;
                                    }
                                }
                            }

                            .ivu-page-item {
                                background: #111530;
                                color: #8090AF;
                                border: 1px solid #191f44;
                            }
                            .ivu-page-item:hover {
                                color: #3399ff;
                            }
                            .ivu-page-prev,
                            .ivu-page-next {
                                &:hover {
                                    border: 1px solid #3399ff;

                                    a {
                                        color: #3399ff;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .ivu-table {
        .ivu-table-tip {
            td {
                background: #111530;
            }
        }
        .ivu-table-row {
            td {
                &:first-child {
                    text-align: left;
                    padding-left: 10px;
                }
                &:last-child {
                    text-align: right;
                    padding-right: 10px;
                }
                &:nth-child(2) {
                    text-align: left;
                    padding-left: 50px;
                }
                &:nth-child(3){
                    text-align: center;
                }
            }
        }

        .ivu-table-header {
            th {
                height: 50px;
                background: #191D3A;
                border-bottom: 0 !important;
                color: #8090AF;
                &:first-child {
                    text-align: left;
                    padding-left: 10px;
                }
                &:last-child {
                    text-align: right;
                    padding-right: 10px;
                }
                &:nth-child(2) {
                    text-align: left;
                    padding-left: 50px;
                }
                &:nth-child(3){
                    text-align: center;
                }
            }
        }
    }
}
</style>


