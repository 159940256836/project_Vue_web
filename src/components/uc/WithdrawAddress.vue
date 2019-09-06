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
                  @on-change="changeCoin"
                  :placeholder="$t('header.choose')"
                >
                  <Option
                    v-for="item in coinList"
                    :value="item" :key="item"
                  >
                    {{ item }}
                  </Option>
                </Select>
              </div>
              <div class="inner-left" style="float: left;margin: 14px 0 0 0;" v-if="linkStatus">
                <!--<span class="describe">{{$t('uc.finance.recharge.symbol')}}</span>:&nbsp;&nbsp;-->
                <div class="link-main">
                  <p
                    class="chain-link"
                    :class="linkStyle == 'USDT' ? 'chain' : ''"
                    @click="changeChain('USDT')"
                    style="margin-left: 0"
                  >
                    OMNI
                    <img v-if="linkStyle == 'USDT'" :src="linkImg">
                  </p>
                  <p
                    class="chain-link"
                    :class="linkStyle == 'ERCUSDT' ? 'chain' : ''"
                    @click="changeChain('ERCUSDT')"
                  >
                    ERC20
                    <img v-if="linkStyle == 'ERCUSDT'" :src="linkImg">
                  </p>
                </div>
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
              <div class="inner-box deposit-address" style="margin-left: 30px;">
                <span class="describe">
                  {{$t('uc.finance.withdraw.remark')}}：
                </span>
                <div class="title">
                  <Input
                    v-model="remark"
                    style="width: 100px;"
                    size="large"
                  />
                </div>
              </div>
              <Button
                  id="addrSubmit"
                  @click='addAddr(1)'
                  size="large"
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
        <span>{{ id == undefined?$t('uc.finance.withdraw.safevalidate'):$t('otc.myad.delete')}}</span>
      </p>
      <div style="text-align:center">
        <Form
          ref="formValidateAddr"
          :model="formValidateAddr"
          :rules="ruleValidate"
          :label-width="85"
        >
          <!-- 手机号 -->
          <FormItem
            :label="$t('uc.finance.withdraw.telno')"
            prop="mobileNo"
            v-if="isPhoneCode"
            style="width:90%"
          >
            <Input disabled size="large" v-model="formValidateAddr.mobileNo"/>
          </FormItem>
          <!-- 手机验证码 -->
          <FormItem
            :label="$t('uc.safe.phonecode')"
            prop="vailCode2"
            v-if="isPhoneCode"
            style="width:90%"
          >
            <Input v-model="formValidateAddr.vailCode2" size="large">
              <!-- <Button slot="append">点击获取</Button> -->
              <div class="timebox" slot="append">
                <Button @click="send(2)" :disabled="disbtn">
                  <!--sendMsgDisabled2为true 时间+秒    sendMsgDisabled2为false为，点击获取 -->
                  <span v-if="sendMsgDisabled2">{{time2 + 's'}}</span>
                  <span v-if="!sendMsgDisabled2">{{$t('uc.finance.withdraw.clickget')}}</span>
                </Button>
              </div>
            </Input>
          </FormItem>
          <!-- 邮箱 -->
          <FormItem
            :label="$t('uc.finance.withdraw.email')"
            prop="email"
            v-if="isEmailCode"
            style="width:90%"
          >
            <Input
              disabled
              v-model="formValidateAddr.email"
              size="large"
            />
          </FormItem>
          <!-- 邮箱验证码 -->
          <FormItem
            :label="$t('uc.forget.emailcode')"
            prop="vailCode1"
            v-if="isEmailCode"
            style="width:90%"
          >
            <Input v-model="formValidateAddr.vailCode1" size="large">
              <!-- <Button slot="append">点击获取</Button> -->
              <div class="timebox" slot="append">
                <p @click="send(1)" :disabled="sendMsgDisabled1">
                  <span v-if="sendMsgDisabled1">
                    {{time1+ 's'}}
                  </span>
                  <span v-if="!sendMsgDisabled1">
                    {{$t('uc.finance.withdraw.clickget')}}
                  </span>
                </p>
              </div>
            </Input>
          </FormItem>
          <FormItem
            :label="$t('openGoolePage._GoogleVerificationCode')"
            v-if="isGoogleCode"
            style="text-align: left"
          >
            <Input
              v-model="formValidateAddr.googleCode"
              size="large"
              type="text"
              style="width:88%"
            />
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
          {{ id == undefined?$t('uc.finance.withdraw.save'):$t('new.confirmaaa')}}
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    components: {},

    data() {
      var that = this
      return {
        interval: function () {
        },
        linkStyle: 'USDT', // 链名称
        linkStatus: false, // 链状态
        linkImg: require('../../assets/img/jiaobiao.png'),
        disbtn: false,
        dataCount: 10,
        loading: true,
        id: '',
        // else
        sendMsgDisabled1: false,
        sendMsgDisabled2: false,
        time1: 60, // 发送验证码倒计时
        time2: 60, // 发送验证码倒计时
        modal2: false,
        modal_loading: false,
        withdrawAddr: '',
        remark: '',
        coinType: '',
        coinList: [],
        tableColumnsRecharge: [
          {
            title: this.$t('uc.finance.withdraw.symbol'),
            key: 'unit'
          },
          {
            title: this.$t('uc.finance.withdraw.address'),
            key: 'address',
            align: 'center',
            render: (h, param) => {
              const str = param.row.address
              const tokenLenth = param.row.address.length
              // 显示前五位 后五位
              const tokenCont = param.row.address.substring(0, 5) +
                  '...' +
                  param.row.address.substring(tokenLenth - 5, tokenLenth)
              if (str) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-paper-outline'
                    },
                    style: {
                      height: '20px',
                      fontSize: '16px',
                      float: 'left',
                      color: '#fff',
                      border: 0,
                      lineHeight: '20px',
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.copyToken(str)
                      }
                    }
                  }),
                  h('div', {
                    style: {
                      textAlign: 'center',
                      fontSize: '1%',
                      float: 'left'
                    }
                  }, tokenCont)
                ])
              }
            }
          },
          {
            title: this.$t('uc.finance.withdraw.remark'),
            key: 'remark'
          },
          {
            title: this.$t('uc.finance.withdraw.operate'),
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(
                    'span',
                    {
                      style: {
                        color: '#3399ff',
                        cursor: 'pointer'
                      },
                      on: {
                        click: () => {
                          if (params.row.id) {
                            this.addAddr(2, params.row.id)
                          }
                          // this.getList(0, 10);
                        }
                      }
                    },
                    that.$t('uc.finance.withdraw.delete')
                )
              ])
            }
          }
        ],
        dataRecharge: [],
        formValidateAddr: {
          mobileNo: '',
          vailCode2: '',
          email: '',
          vailCode1: '',
          googleCode: ''
        },
        ruleValidate: {
          mobileNo: [
            {
              required: this.isPhoneCode,
              message: this.$t('uc.finance.withdraw.telerr'),
              trigger: 'blur'
            }
          ],
          vailCode2: [
            {
              required: this.isPhoneCode,
              message: this.$t('uc.finance.withdraw.codeerr'),
              trigger: 'change'
            }
          ],
          email: [
            {
              required: this.isEmailCode,
              type: 'email',
              message: this.$t('uc.finance.withdraw.emailerr'),
              trigger: 'blur'
            }
          ],
          vailCode1: [
            {
              required: this.isEmailCode,
              message: this.$t('uc.finance.withdraw.codeerr'),
              trigger: 'change'
            }
          ],
          googleCode: [
            {
              required: this.isGoogleCode,
              message: this.$t('uc.finance.withdraw.codeerr'),
              trigger: 'change'
            }
          ]
        },
        isCode: '',
        isPhoneCode: false, // 是否绑定手机验证状态
        isEmailCode: false, // 是否绑定手机验证状态
        isGoogleCode: false // 是否绑定谷歌验证状态
      }
    },
    created() {
      this.getMember()
      this.getList(0, 10)
      this.getCoin()
    },
    methods: {
      changeCoin(value) {
        if (value == 'USDT') {
          this.linkStatus = true
        } else {
          this.linkStyle = 'USDT'
          // this.withdrawAddr = ''
          this.linkStatus = false
        }
      },
      /*链名称*/
      changeChain(name) {
        this.linkStyle = name
      },
      // 安全验证接口
      afetyVerification() {
        // 1.输入谷歌验证码
        // 2.输入手机验证码
        // 3.输入邮箱验证码
        this.$http.post(this.host + '/uc/getGoogleState', {mobile: this.$store.getters.member.mobile}).then(res => {
          const data = res.body
          this.isCode = data.data
          console.log(this.isCode)
          if (data.code == 0) {
            console.log(data)
            switch (data.data) {
              case 1:
                // 1为开启谷歌验证
                this.isGoogleCode = true
                this.isPhoneCode = false
                this.isEmailCode = false
                break
              case 2:
                // 2为开启手机验证
                this.isGoogleCode = false
                this.isPhoneCode = true
                this.isEmailCode = false
                break
              case 3:
                // 3为开启邮箱验证
                this.isGoogleCode = false
                this.isPhoneCode = false
                this.isEmailCode = true
            }
          }
        })
      },
      // 复制功能
      copyToken(data) {
        const url = data
        const oInput = document.createElement('input')
        oInput.value = url
        document.body.appendChild(oInput)
        oInput.select() // 选择对象
        console.log(oInput.value)
        document.execCommand('Copy') // 执行浏览器复制命令
        this.$Message.success(
            this.$t('uc.finance.recharge.copysuccess')
        )
        oInput.remove()
      },
      refresh() {
        this.getList(0, 10)
        this.coinType = null,
        this.withdrawAddr = null,
        this.remark = null
      },
      getMember() {
        // 获取个人安全信息
        this.$http
            .post(this.host + '/uc/approve/security/newSetting')
            .then(response => {
              var resp = response.body
              if (resp.code == 0) {
                if (resp.data.mobilePhone) {
                  this.formValidateAddr.mobileNo = resp.data.mobilePhone
                  // this.validPhone = true;
                  // this.validEmail = false;
                } else {
                  this.formValidateAddr.email = resp.data.email
                  // this.validPhone = false;
                  // this.validEmail = true;
                }
              } else {
                this.$Message.error(resp.message)
              }
            })
      },
      getCoin() {
        // 币种
        this.coinList = []
        this.$http.post(this.host + '/uc/withdraw/support/coin').then(response => {
          var resp = response.body
          if (resp.code == 0) {
            for (let i = 0; i < resp.data.length; i++) {
              if (resp.data[i] == 'ERCUSDT') {
                resp.data.splice(i, 1);
              }
              this.coinList.push(resp.data[i])
            }
          } else {
            this.$Message.error(resp.message)
          }
        })
      },
      getList(pageNo, pageSize) {
        // 获取地址
        const params = {}
        params['pageNo'] = pageNo
        params['pageSize'] = pageSize
        this.dataRecharge = []
        this.$http.post(this.host + '/uc/withdraw/address/page', params).then(response => {
          var resp = response.body
          if (resp.code == 0 && resp.data.content) {
            resp.data.content.forEach((item, index) => {
              console.log(item, index)
              console.log(item.unit)
              if (item.unit == 'ERCUSDT') {
                item.unit = 'USDT'
              }
              this.dataRecharge.push(item)
            })
            this.dataCount = resp.data.totalElement
          } else {
            this.$Message.error(resp.message)
          }
          this.loading = false
        })
      },
      remove(index) {
        this.dataRecharge.splice(index, 1)
      },
      send(index) {
        const me = this
        this.disbtn = true
        if (this.id) {
          if (index == 1) {
            if (this.formValidateAddr.email) {
              // 获取邮箱code
              this.$http.post(this.host + '/uc/delete/address/email/code').then(response => {
                var resp = response.body
                if (resp.code == 0) {
                  this.$Message.success(resp.message)
                  me.sendMsgDisabled1 = true
                  const interval = window.setInterval(function () {
                    if (me.time1-- <= 0) {
                      me.time1 = 60
                      me.sendMsgDisabled1 = false
                      window.clearInterval(interval)
                      this.disbtn = false
                    }
                  }, 1000)
                } else {
                  this.$Message.error(resp.message)
                  this.disbtn = false
                }
              })
            } else {
              this.$refs.formValidateAddr.validateField('email')
              this.disbtn = false
            }
          } else if (index == 2) {
            if (this.formValidateAddr.mobileNo) {
              // 获取手机code
              this.$http.post(this.host + '/uc/mobile/delete/address/code').then(response => {
                var resp = response.body
                if (resp.code == 0) {
                  this.$Message.success(resp.message)
                  me.sendMsgDisabled2 = true
                  this.interval = window.setInterval(() => {
                    if (me.time2-- <= 0) {
                      me.time2 = 60
                      me.sendMsgDisabled2 = false
                      window.clearInterval(this.interval)
                      this.disbtn = false
                    }
                  }, 1000)
                } else {
                  this.$Message.error(resp.message)
                  this.disbtn = false
                }
              })
            } else {
              this.$refs.formValidateAddr.validateField('mobileNo')
              this.disbtn = false
            }
          }
        } else {
          if (index == 1) {
            if (this.formValidateAddr.email) {
              // 获取邮箱code
              this.$http.post(this.host + '/uc/add/address/code').then(response => {
                var resp = response.body
                if (resp.code == 0) {
                  this.$Message.success(resp.message)
                  me.sendMsgDisabled1 = true
                  const interval = window.setInterval(function () {
                    if (me.time1-- <= 0) {
                      me.time1 = 60
                      me.sendMsgDisabled1 = false
                      window.clearInterval(interval)
                      this.disbtn = false
                    }
                  }, 1000)
                } else {
                  this.$Message.error(resp.message)
                  this.disbtn = false
                }
              })
            } else {
              this.$refs.formValidateAddr.validateField('email')
              this.disbtn = false
            }
          } else if (index == 2) {
            if (this.formValidateAddr.mobileNo) {
              // 获取手机code
              this.$http.post(this.host + '/uc/mobile/add/address/code').then(response => {
                var resp = response.body
                if (resp.code == 0) {
                  this.$Message.success(resp.message)
                  me.sendMsgDisabled2 = true
                  this.interval = window.setInterval(() => {
                    if (me.time2-- <= 0) {
                      me.time2 = 60
                      me.sendMsgDisabled2 = false
                      window.clearInterval(this.interval)
                      this.disbtn = false
                    }
                  }, 1000)
                } else {
                  this.$Message.error(resp.message)
                  this.disbtn = false
                }
              })
            } else {
              this.$refs.formValidateAddr.validateField('mobileNo')
              this.disbtn = false
            }
          }
        }
      },
      addAddr(index, id) {
        this.formValidateAddr.vailCode2 = ''
        this.formValidateAddr.vailCode1 = ''
        this.formValidateAddr.googleCode = ''
        this.afetyVerification()
        this.id = id
        if (id) {
          this.modal2 = true
        } else {
          const interval = setInterval(() => {
            if (this.time2 <= 0) {
              this.sendMsgDisabled2 = false
              window.clearInterval(interval)
              this.disbtn = false
            }
          }, 1000)
          if (!this.coinType) {
            this.$Message.warning(this.$t('uc.finance.withdraw.symboltip'))
          } else if (!this.withdrawAddr) {
            this.$Message.warning(this.$t('uc.finance.withdraw.addresstip'))
          } else if (!this.remark) {
            this.$Message.warning(this.$t('uc.finance.withdraw.remarktip'))
          } else if (this.coinType && this.remark && this.withdrawAddr) {
            this.modal2 = true
          }
        }
      },
      changePage(index) {
        this.getList(index, 10, this.coinType)
      },
      del(id) {
        const title = this.$t('common.tip')
        const content = '<p>' + this.$t('common.delete') + '</p>'
        this.$Modal.confirm({
          title: title,
          content: content,
          onOk: () => {
            const params = {}
            params['id'] = id
            this.$http.post(this.host + '/uc/withdraw/address/delete', params).then(response => {
              var resp = response.body
              if (resp.code == 0) {
                this.$Message.success(resp.message)
                this.refresh()
              } else {
                this.$Message.error(resp.message)
              }
              this.loading = false
            })
          },
          onCancel: () => {
          }
        })
      },
      handleSubmit(name) {
        // console.log(name);
        // this.$refs[name].validate(valid => {
        //   console.log(valid);
        //   if (valid) {
        //       this.submit(name);
        // } else {
        //     this.$Message.error(this.$t("uc.finance.withdraw.savemsg1"));
        // }
        // });
        if (this.id) {
          const params = {}
          params['id'] = this.id
          if (this.isCode == 2) {
            params['code'] = this.formValidateAddr.vailCode2
          } else {
            params['code'] = this.formValidateAddr.vailCode1
          }
          params['googleCode'] = this.formValidateAddr.googleCode
          this.$http.post(this.host + '/uc/withdraw/address/delete', params).then(response => {
            var resp = response.body
            if (resp.code == 0) {
              this.$Message.success(resp.message)
              this.modal2 = false
              this.refresh()
            } else {
              this.$Message.error(resp.message)
            }
            this.loading = false
          })
        } else {
          this.submit(name)
        }
      },
      submit(name) {
        const param = {}
        param['address'] = this.withdrawAddr
        param['unit'] = this.linkStyle == 'ERCUSDT' ? 'ERCUSDT' : this.coinType
        console.log(this.isPhoneCode)
        if (this.isCode == 2) {
          param['aims'] = this.formValidateAddr.mobileNo
          param['code'] = this.formValidateAddr.vailCode2
        } else if (this.isCode == 3) {
          param['aims'] = this.formValidateAddr.email
          param['code'] = this.formValidateAddr.vailCode1
        } else {
          param['googleCode'] = this.formValidateAddr.googleCode
        }
        param['remark'] = this.remark

        this.$http.post(this.host + '/uc/withdraw/address/add', param).then(response => {
          var resp = response.body
          if (resp.code == 0) {
            this.$Message.success(this.$t('uc.finance.withdraw.savemsg2'))
            this.formValidateAddr.vailCode2 = ''
            this.refresh()
            this.modal2 = false
          } else {
            this.$Message.error(resp.message)
          }
        })
      }
    },
    computed: {}
  }
</script>

<style scoped lang="scss">
  .timebox {
    color: #3399ff;
    min-width: 50px;
    cursor: pointer;
  }

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

              .link-main {

                .chain-link {
                  min-width: 105px;
                  height: 31px;
                  background: #111530;
                  color: #8090af;
                  float: left;
                  margin-left: 25px;
                  text-align: center;
                  line-height: 31px;
                  cursor: pointer;
                  border: 1px solid rgba(88, 105, 138, 1);
                  position: relative;

                  img {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                  }
                }

                .chain {
                  color: #3399FF;
                  border: 1px solid rgba(51, 153, 255, 1);
                }
              }
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
  .ivu-input-group-append,
  .ivu-input-group-prepend {
    background: #111530 !important;
    border: 1px solid #2a3850 !important;
    border-left: none !important;
    border-radius: 0 !important;
  }

  .ivu-form .ivu-form-item-label {
    color: #8090af;
  }

  .ivu-modal-footer {
    border-top: 1px solid #8090AF;
  }

  .ivu-modal-confirm-head-icon-confirm {
    display: none;
  }

  .ivu-modal-confirm-head {
    .ivu-modal-confirm-head-title {
      color: #8090af;
    }

    text-align: left;
  }

  .ivu-modal-confirm-body {
    padding-left: 14px;
  }

  .ivu-btn-text {
    &:hover {
      background: transparent;
    }
  }

  .ivu-btn[disabled]:hover {
    /*background-color: transparent;*/
    background-color: #111530;
    border-color: transparent;
  }

  .ivu-modal-confirm-footer .ivu-btn-primary,
  .ivu-modal-confirm-footer .ivu-btn-text {
    padding: 3px 15px;
  }

  .nav-rights-address {
    .ivu-form .ivu-form-item-label {
      padding: 14px 12px 10px 0;
    }

    .ivu-select-large.ivu-select-single {
      .ivu-select-selection {
        height: 30px;
        border-radius: 0;
        border: 1px solid #58698A;
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
      border: 1px solid #58698A;
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

                &::-webkit-scrollbar {
                  width: 4px; /*对垂直流动条有效*/
                  height: 10px; /*对水平流动条有效*/
                }

                /*定义滚动条的轨道颜色、内阴影及圆角*/
                &::-webkit-scrollbar-track {
                  background-color: #111530;
                  border-radius: 3px;
                }

                &::-webkit-scrollbar-thumb {
                  border-radius: 7px;
                  background-color: #8090AF;
                }

                .ivu-select-item {
                  &:hover {
                    background: transparent;
                    color: #8090AF;
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

          &:nth-child(3) {
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

          &:nth-child(3) {
            text-align: center;
          }
        }
      }
    }
  }
</style>


