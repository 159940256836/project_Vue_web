<template>
<div class="apimanagement bcd" >
  <div class="nav-rights">
    <div class="main">
      <Card class="card1" :bordered="false">{{$t('apiAdmin.apiAdmin')}}</Card>
      <Card  :bordered="false" class="content card2">
        <p slot="title">{{$t('apiAdmin.createApi')}}</p>
        <div class="content_header">
          <div class="prompt">
            <p style="color:#515a6e; font-weight: 600;">{{$t('apiAdmin.hint')}}</p>
            <ul style="margin: 0 15px;">
              <li>
                {{$t('apiAdmin.part1')}}
                <!-- <a href="https://bdwtop.github.io/" target="_blank">{{$t('apiAdmin.apiDoc')}}</a> -->
                <a href="https://bdwexchange.github.io/" target="_blank">{{$t('apiAdmin.apiDoc')}}</a>
                {{$t('apiAdmin.howUse')}}
              </li>
              <li>{{$t('apiAdmin.part2')}}</li>
              <li>{{$t('apiAdmin.part3')}}</li>
            </ul>
          </div>
        </div>
          <div class="add" style="width:400px;margin: 0 auto; margin-top:86px;">
            <Form :model="formItem" :label-width="60">
              <FormItem :label="$t('apiAdmin.mark')">
                <Input v-model="formItem.remark"></Input>
              </FormItem>
              <FormItem :label="$t('apiAdmin.bindAddress')">
                <Input v-model="formItem.bindIp"></Input>
              </FormItem>

            </Form>
            <div style="margin-left:60px; font-size:12px; color:#8090AF">{{$t('apiAdmin.Thekeybound')}}</div>
            <Button
              type="primary"
              @click="codeVerify"
              style="
                width:85%;
                height: 37px;
                font-size: 14px;
                border-radius:0 !important;
                display:block;
                margin: 17px 0 115px 64px;
              "
            >
              {{$t('apiAdmin.create')}}
            </Button>
          </div>

      </Card>
      <Card  :bordered="false" class="content card3">
        <p slot="title">{{$t('apiAdmin.myApiKey')}}</p>

        <Table
          :columns="myColumns"
          :data="tableData"
          :no-data-text="$t('common.nodata')"
        >
        </Table>

      </Card>
    </div>
    <!--编辑API-->
    <Modal
      class="api_edit edit_let-code"
      id="a_new"
      v-model="editor"
      class-name="old_deta"
      :title="$t('apiAdmin.edit')

     ">
      <Form
      :model="editorFormItem"
      :label-width='70'
       label-position="top">
        <FormItem :label="$t('apiAdmin.mark')">
          <Input v-model="editorFormItem.remark"></Input>
        </FormItem>
        <FormItem :label="$t('apiAdmin.bindIpAddress')">
          <Input v-model="editorFormItem.bindIp"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button
          type="text"
          size="large"
          @click="editor=false"
        >
          {{ $t('common.cancel') }}
        </Button> -->
        <Button
          class="edit_let_buttom edit_let_buttom_new"
          type="primary"
          size="large"
          id="new_butto"
          @click="update"
        >
          {{ $t('common.confirm') }}
        </Button>
      </div>
    </Modal>
    <!--删除-->
    <!-- <Modal
      class="edit_let-code"
      v-model="del"
      :title="$t('apiAdmin.delete')"
      @on-ok="onDel(id)"
      @on-cancel="del=false"
      :ok-text="$t('apiAdmin.okText')"
      :cancel-text="$t('apiAdmin.cancel')"
    >
      <p>{{$t('apiAdmin.sureDelete')}}</p>
    </Modal> -->
       <!--删除-->
     <Modal
      class="edit_let-code edit_let_aa edit_let_bb "
      v-model="del"
      class-name="old_deta"
      :title="$t('apiAdmin.delete')"

    >
      <p style="color: #8090af;">{{$t('apiAdmin.sureDelete')}}</p>
       <div slot="footer">
          <!-- <Button
            type="text"
            size="large"
            @click="verifyEditor=false"
          >
            {{ $t('common.cancel') }}
          </Button> -->
          <Button class="edit_let_buttom edit_let_buttom_new"
            type="primary"
            size="large"
              @click="onDel(id)"
              @on-cancel="del=false"
              :ok-text="$t('apiAdmin.okText')"
              :cancel-text="$t('apiAdmin.cancel')"
          >
            <!--确定-->
            {{ $t('common.confirm') }}
          </Button>
        </div>
    </Modal>

    <!--秘钥-->
    <Modal
      class="edit_let-code edit_let_aa"
      v-model="showData"
      class-name="old_deta"
      :title="$t('apiAdmin.access')"
      :mask-closable="false"
    >
      <p class="screat" style="color:#fff">{{$t('apiAdmin.tips')}}</p>
      <p class="screat" style="color:#3399ff;cursor:pointer;">
        <!--{{screat}}-->
        <span style="color:#fff">{{screat}}</span>
        <span
          v-clipboard:copy="screat"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          class="blue"
        >{{$t('apiAdmin.copy')}}</span>
      </p>
       <div slot="footer">
          <Button class="edit_let_buttom edit_let_buttom_new"
            type="primary"
            size="large"
              @click="showData = false"
              :ok-text="$t('apiAdmin.okText')"
              :cancel-text="$t('apiAdmin.cancel')"
          >
            <!--确定-->
            {{ $t('common.confirm') }}
          </Button>
        </div>
    </Modal>


    <!--秘钥-->
    <!-- <Modal
      class="edit_let-code"
      v-model="show"
      :title="$t('apiAdmin.access')"
      @on-ok="show=false"
      :mask-closable="false"
      :ok-text="$t('apiAdmin.okText')"
      :cancel-text="$t('apiAdmin.cancel')"
    >
      <p class="screat">{{$t('apiAdmin.tips')}}</p>
      <p class="screat">
        <span>{{screat}}</span>
        <span
          v-clipboard:copy="screat"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          class="blue"
        >{{$t('apiAdmin.copy')}}</span>
      </p>
    </Modal> -->

    <!--添加短信校验-->
    <Modal
      class="edit_let-code"
      v-model="verify"
       class-name="old_deta"
      :title="$t('uc.finance.withdraw.add') "
     >
      <Form :model="formItem" label-position="top">
        <FormItem
          :label="$t('uc.safe.phonecode')"
          v-if="isPhoneCode"
        >
          <Input v-model="formItem.code" size="large">
            <div
              class="timebox"
              slot="append"
              style="position:relative;height:20px;line-height:20px"
            >
              <!--<div style="height:17px;width:2px;background:#8090AFFF;position:absolute;top:3px"></div>-->
              <Button  v-if="addPhoneDisabled" :disabled="addPhoneDisabled">
                <span style="color:#3399FFFF">{{phoneTime+$t('uc.safe.second')}}</span>
              </Button>
              <div
                v-if="!addPhoneDisabled"
                @click="sendCode('old', 1)"
                style="cursor:pointer"
              >
                 <span style="color:#3399FFFF">{{$t('uc.safe.clickget')}}</span>
              </div>
            </div>
          </Input>
        </FormItem>
        <!--邮箱验证码 6.06-->
        <FormItem
          class="code-title"
          v-if="isEmailCode"
          :label="$t('uc.forget.emailcode')"
        >
          <Input
            style="width: 300px;"
            v-model="formItem.emailCode"
            size="large"
            :placeholder="$t('uc.login.email')"
          >
            <div
              class="timebox"
              slot="append"
            >
              <div
                class="button-code"
                @click="sendCode('new', 2)"
                :disabled="addEmailDisabled"
              >
                <Button v-if="addEmailDisabled">
                  {{addEmailTime+$t('uc.safe.second')}}
                </Button>
                <span v-if="!addEmailDisabled">
                  {{$t('uc.safe.clickget')}}
                </span>
              </div>
            </div>
          </Input>
        </FormItem>
        <!--谷歌验证-->
        <FormItem
          :label="$t('openGoolePage._GoogleVerificationCode')"
          prop="googleCode"
          v-if="isGoogleCode"
        >
          <Input
            v-model="formItem.googleCode"
            size="large"
            type="text"
            style="width:300px;"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button
          type="text"
          size="large"
          @click="verify=false"
        >
          {{ $t('common.cancel') }}
        </Button> -->
        <Button class="edit_let_buttom"
          type="primary"
          size="large"
          @click="make"
        >
          <!--确定-->
          {{ $t('common.confirm') }}
        </Button>
      </div>
    </Modal>
    <!--编辑短信校验-->
    <div class="let-code">
      <Modal
        class="edit_let-code"
         class-name="old_deta"
         v-model="verifyEditor"
         :title="$t('apiAdmin.edit')"
       >
        <Form :model="editorFormItem" label-position="top">
          <FormItem
            :label="$t('uc.safe.phonecode')"
            v-if="isPhoneCode"
          >
            <Input v-model="editorFormItem.code" size="large">
              <div class="timebox" slot="append" style="position:relative;height:20px;line-height:20px">
                <div style="height:17px;width:2px;background:#8090af;position:absolute;top:3px"></div>
                <div
                  style="cursor:pointer"
                  @click="sendCode('old', 3)"
                  v-if="!updatePhoneDisabled"
                >

                  <span style="color:#3399FFFF">{{$t('uc.safe.clickget')}}</span>
                </div>
                <Button
                  v-if="updatePhoneDisabled"
                  :disabled="updatePhoneDisabled"
                >
                    <span style="color:#3399FFFF" >{{updateTime+$t('uc.safe.second')}}</span>
                </Button>
              </div>
            </Input>
          </FormItem>
          <!--邮箱验证码 6.06-->
          <FormItem
            class="code-title"
            v-if="isEmailCode"
            :label="$t('uc.forget.emailcode')"
          >
            <Input
              style="width: 300px;"
              v-model="editorFormItem.emailCode"
              size="large"
              :placeholder="$t('uc.login.email')"
            >
              <div
                class="timebox"
                slot="append"
              >
                <div
                  class="button-code"
                  @click="sendCode('new', 4)"
                  :disabled="updateEmailDisabled"
                >
                <Button v-if="updateEmailDisabled">
                  {{updateEmailTime+$t('uc.safe.second')}}
                </Button>
                  <span v-if="!updateEmailDisabled">
                  {{$t('uc.safe.clickget')}}
                </span>
                </div>
              </div>
            </Input>
          </FormItem>
          <!--谷歌验证-->
          <FormItem
            :label="$t('openGoolePage._GoogleVerificationCode')"
            prop="googleCode"
            v-if="isGoogleCode"
          >
            <Input
              v-model="editorFormItem.googleCode"
              size="large"
              type="text"
              style="width:300px;"
            />
          </FormItem>
        </Form>
        <div slot="footer">
          <!-- <Button
            type="text"
            size="large"
            @click="verifyEditor=false"
          >
            {{ $t('common.cancel') }}
          </Button> -->
          <Button class="edit_let_buttom"
            type="primary"
            size="large"
            @click="okUpdate"
          >
            <!--确定-->
            {{ $t('common.confirm') }}
          </Button>
        </div>
      </Modal>
    </div>
  </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      locale: '',
      del: false,
      editor: false,
      verify: false,
      loading: false,
      verifyEditor: false,
      showData: false,
      screat: '',
      isCode: '',
      isPhoneCode: false, // 是否绑定手机验证状态
      isEmailCode: false, // 是否绑定手机验证状态
      isGoogleCode: false, // 是否绑定谷歌验证状态
      phoneTime: 60, // 添加发送手机验证码倒计时
      updateTime: 60, // 编辑发送手机倒计时
      addPhoneDisabled: false, // 添加发送手机验证码
      updatePhoneDisabled: false, // 编辑发送手机验证码
      addEmailDisabled: false, // 添加发送邮箱验证码
      updateEmailDisabled: false, // 编辑发送邮箱验证码
      addEmailTime: 60, // 添加发送邮箱验证码倒计时
      updateEmailTime: 60, // 编辑发送邮验证码箱倒计时
      codeEditorFormItem: '',
      editorFormItem: {
        remark: '',
        bindIp: '',
        code: '',
        emailCode: '',
        googleCode: '',
      },
      formItem: {
        remark: '',
        bindIp: '',
        code: '',
        emailCode: '',
        googleCode: '',
      },
      formItemData: {},
      tableData: [],
      id: '',
      phoneStatus: '',
      dataTime: ''
    }
  },
  // 5.25加
  watch: {
    '$i18n.locale': {
      handler(newVal) {
        this.locale = newVal
      },
      immediate: true
    }
  },
  created() {
    this.getAllAPI()
    this.getMember()
  },
  methods: {
    // 安全验证接口
    afetyVerification () {
      // 1.输入谷歌验证码
      // 2.输入手机验证码
      // 3.输入邮箱验证码
      this.$http.post(this.host + '/uc/getGoogleState',{ mobile: this.$store.getters.member.mobile }).then(res => {
        const data = res.body
        this.isCode = data.data
        console.log(this.isCode, data.data);
        if (data.code == 0) {
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
    copyToken (data) {
      let url = data
      let oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      console.log(oInput.value)
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$Message.success(
          this.$t("uc.finance.recharge.copysuccess")
      )
      oInput.remove()
    },
    sendCode(type, index) {
      const me = this
      // 获取手机code
      if (type == 'old') {
        this.$http.post(this.host + '/uc/mobile/api/code').then(response => {
          const resp = response.body
          if (resp.code == 0) {
            if (index == 1) {
              this.addPhoneDisabled = true
              const interval = window.setInterval(function() {
                if (me.phoneTime-- <= 0) {
                  me.phoneTime = 60
                  me.addPhoneDisabled = false
                  window.clearInterval(interval)
                }
              }, 1000)
            } else if (index == 3) {
              this.updatePhoneDisabled = true
              const interval = window.setInterval(function() {
                if (me.updateTime-- <= 0) {
                  me.updateTime = 60
                  me.updatePhoneDisabled = false
                  window.clearInterval(interval)
                }
              }, 1000)
            }
          } else {
            this.$Message.error(resp.message)
          }
        })
      } else if (type == 'new') {
        if (index == 2) {
          this.$http.post(this.host + '/uc/open/api/email/code').then(response => {
            const resp = response.body
            if (resp.code == 0) {
              this.addEmailDisabled = true
              const interval = window.setInterval(function() {
                if (me.addEmailTime-- <= 0) {
                  me.addEmailTime = 60
                  me.addEmailDisabled = false
                  window.clearInterval(interval)
                }
              }, 1000)
            } else {
              this.$Message.error(resp.message)
            }
          })
        } else if (index == 4) {
          this.$http.post(this.host + '/uc/update/api/email/code').then(response => {
            const resp = response.body
            if (resp.code == 0) {
              this.updateEmailDisabled = true
              const interval = window.setInterval(function() {
                if (me.updateEmailTime-- <= 0) {
                  me.updateEmailTime = 60
                  me.updateEmailDisabled = false
                  window.clearInterval(interval)
                }
              }, 1000)
            } else {
              this.$Message.error(resp.message)
            }
          })
        }
      }
    },
    onCopy(e) {
      this.$Notice.success({
        title: this.$t('common.tip'),
        desc: 'success'
      })
    },
    onError() {
      this.$Notice.error({
        title: this.$t('common.tip'),
        desc: 'fail'
      })
    },
    // 时间格式转换
    formatTime(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    getAllAPI() {
      return this.$http.get(this.host + `/uc/open/get_key`).then(res => {
        this.tableData = res.body.data;
        this.tableData = []
        let me = this;
        res.body.data.forEach(function (c, index) {
          if (c.apistatus !== 1) {
            me.tableData.push(c)
          }
        })
        // console.log(this.formatTime(Date.parse(this.tableData[0].expireTime)),this.formatTime(Date.parse(this.tableData[0].createTime)));
        // console.log(Date.parse(this.tableData[0].expireTime)) - Date.parse(this.tableData[0].createTime);
        // let time1 = Date.parse(this.tableData[0].expireTime) - Date.parse(this.tableData[0].createTime)
        // console.log(this.tableData[0]);
        // this.dataTime = time1/24/60/60/1000
        // console.log(time1/24/60/60/1000);
      });
    },
    // 添加api校验
    codeVerify() {
      // const that = this
      // if (this.phoneStatus.phoneVerified == 0) {
      //   const lang =
      //       this.$store.getters.lang == 'English'
      //           ? 'Please bind the mobile phone first'
      //           : '请先绑定手机'
      //   this.$Message.error(lang)
      //   setTimeout(function() {
      //     that.$router.push('/uc/Safe')
      //   }, 1000)
      //   return false
      // }
      this.afetyVerification()
      const IP_REG = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/
      if (this.formItem.remark == '') {
        const lang =
          this.$store.getters.lang == 'English'
            ? 'please scanner remark'
            : '请输入备注信息'
        this.$Message.error(lang)
        return
      }
      // else if (this.formItem.bindIp == "") {
      //   const lang =
      //     this.$store.getters.lang == "English"
      //       ? "please scanner IP Address"
      //       : "请输入IP地址";
      //   this.$Message.error(lang);
      //   return;
      // }
      // else if (!IP_REG.test(this.formItem.bindIp)) {
      //   const lang =
      //     this.$store.getters.lang == "English"
      //       ? "please scanner Correct IP Address"
      //       : "请输入正确IP地址";
      //   this.$Message.error(lang);
      //   return;
      // }
      else {
        this.verify = true
      }
    },
    // 确认添加api
    make() {
      if (this.isPhoneCode) {
        if (!this.formItem.code) {
          this.$Message.error(this.$t('uc.login.phone'))
          return false
        }
      } else if (this.isEmailCode) {
        if (!this.formItem.emailCode) {
          this.$Message.error(this.$t('uc.login.email'))
          return false
        }
      } else if (this.isGoogleCode) {
        if (!this.formItem.googleCode) {
          this.$Message.error(this.$t('uc.login.google'))
          return false
        }
      }
      const param = {}
      param['remark'] = this.formItem.remark
      param['bindIp'] = this.formItem.bindIp
      param['code'] = this.isCode == 2?this.formItem.code:this.formItem.emailCode
      param['googleCode'] = this.formItem.googleCode
      // this.host
      this.$http.post(this.host + '/uc/open/api/save', param).then(res => {
        console.log(res.body.code);
        if (res.body.code == 0) {
            this.$Message.success(res.body.message)
            this.getAllAPI()
            this.screat = res.body.data
            this.verify = false
            this.showData = true
            this.formItem = {}
          } else {
            this.$Message.error(res.body.message)
          }
        })
    },
    // 编辑验证
    okUpdate() {
      if (this.isPhoneCode) {
        if (!this.editorFormItem.code) {
          this.$Message.error(this.$t('uc.login.phone'))
          return false
        } else {
          this.verifyEditor = false
          this.editor = true
        }
      } else if (this.isEmailCode) {
        if (!this.editorFormItem.emailCode) {
          this.$Message.error(this.$t('uc.login.email'))
          return false
        } else {
          this.verifyEditor = false
          this.editor = true
        }
      } else if (this.isGoogleCode) {
        if (!this.editorFormItem.googleCode) {
          this.$Message.error(this.$t('uc.login.google'))
          return false
        } else {
          this.verifyEditor = false
          this.editor = true
        }
      }
      this.editorFormItem.remark = this.formItemData.remark,
      this.editorFormItem.bindIp = this.formItemData.bindIp,
      this.editorFormItem.code = this.isCode == 2? this.editorFormItem.code:this.editorFormItem.emailCode
      // if (!this.editorFormItem.code) {
      //   this.$Message.error(this.$t('uc.login.phone'))
      //   return false
      // } else if (!this.editorFormItem.emailCode) {
      //   this.$Message.error(this.$t('uc.login.email'))
      //   return false
      // } else if (!this.editorFormItem.emailCode) {
      //   this.$Message.error(this.$t('uc.login.google'))
      //   return false
      // } else {
      //   this.verifyEditor = false
      //   this.editor = true
      // }
    },
    // 编辑api
    update(row) {
      console.log(row);
      console.log(this.editorFormItem);
      const IP_REG = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/
      if (!this.editorFormItem.remark) {
        const lang =
          this.$store.getters.lang == 'English'
            ? 'please scanner remark'
            : '请输入备注信息'
        this.$Message.error(lang)
        return
      }

      // if (!this.editorFormItem.bindIp) {
      //   const lang =
      //     this.$store.getters.lang == "English"
      //       ? "please scanner IP Address"
      //       : "请输入IP地址";
      //   this.$Message.error(lang);
      //   return;
      // }
      // if (!IP_REG.test(this.editorFormItem.bindIp)) {
      //   const lang =
      //     this.$store.getters.lang == "English"
      //       ? "please scanner Correct IP Address"
      //       : "请输入正确IP地址";
      //   this.$Message.error(lang);
      //   return;
      // }
      const param = {}
      param['id'] = this.formItemData.id
      param['remark'] = this.editorFormItem.remark
      param['bindIp'] = this.editorFormItem.bindIp
      param['code'] = this.editorFormItem.code
      param['googleCode'] = this.editorFormItem.googleCode
      this.$http
        .post(this.host + '/uc/open/api/update', param)
        .then(res => {
          if (!res.body.code) {
            this.getAllAPI()
            this.editor = false
            this.$Message.success(res.body.message)
          } else {
            this.$Message.error(res.body.message)
          }
        })
    },
    // 删除api
    onDel(id) {
      this.$http.get(this.host + `/uc/open/api/del/${id}`).then(res => {
        if (!res.body.code) {
          this.$Message.success(res.body.message)
          this.del = false
          this.getAllAPI()
        } else {
          this.$Message.error(res.body.message)
        }
      })
    },
    getMember() {
      // 获取个人安全信息
      return this.$http.post(this.host + '/uc/approve/security/newSetting').then(response => {
        const resp = response.body
        if (resp.code == 0) {
          return new Promise((resolve, reject) => {
            this.phoneStatus = resp.data
            // console.log(resp.data)
            resolve(resp.data)
          })
        } else {
          this.$Message.error(this.loginmsg)
        }
      })
    }
  },
  computed: {
    myColumns() {
      const arr = []
      arr.push({
        title: this.$t('apiAdmin.createTime'),
        // width: 100,
        // width: this.locale == 'en' ? 110 : 100,
        key: 'createTime'
      })
      arr.push({
        title: this.$t('apiAdmin.mark'),
        key: 'remark'
      })
      arr.push({
        title: 'API Key',
        key: 'apiKey',
        render: (h, params) => {
          let str = params.row.apiKey;
          let tokenLenth = params.row.apiKey.length
          // 显示前五位 后五位
          let tokenCont = params.row.apiKey.substring(0, 5)
              +
              '...'
              + params.row.apiKey.substring(tokenLenth - 5, tokenLenth)
          if (str) {
            return h("div", [
              h('Icon', {
                props: {
                  type: 'ios-paper-outline'
                },
                style: {
                  height: '20px',
                  fontSize: '16px',
                  color: '#fff',
                  border: 0,
                  lineHeight: '20px',
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    this.copyToken(str)
                  }
                }
              }, this.$t('uc.finance.recharge.copy')),
              h("div", {
                style: {
                  fontSize: '1%',
                  float: 'left'
                },
              }, tokenCont)
            ])
          }
        }
      })
      arr.push({
        title: this.$t('apiAdmin.accessKey'),
        // 6.28修改
        // width: this.locale == 'en' ? 130 : 100,
        render: (h, params) => {
          const text = '******'
          return h('span', {}, text)
        }
      })
      arr.push({
        title: this.$t('apiAdmin.bindIpAddress'),
        // 6.28修改
        // width: this.locale == 'en' ? 130 : '',
        render: (h, params) => {
          if (params.row.bindIp !== null) {
            let txts = params.row.bindIp.split(',')
            txts = txts.length > 1 ? txts[0] + '  ' + '...' : txts
            return h('span', {}, txts)
          }
        }
      })
      arr.push({
        title: this.$t('apiAdmin.ioDays'),
        // 6.28修改
        // width: this.locale == 'en' ? 150 : '',
        render: (h, params) => {
          if (params.row.bindIp) {
            const residue = Date.parse(params.row.expireTime) - Date.parse(new Date())
            let lastTime = residue / 1000 / 60 / 60 / 24
            lastTime = lastTime <= 0 ? 0 : lastTime
            const timeDay = h('span', {}, Math.round(lastTime))
            return [timeDay]
          }
        }
      })
      arr.push({
        title: this.$t('apiAdmin.operation'),
        align: 'center',
        render: (h, params) => {
          return [
            h(
              'span',
              {
                props: {
                  type: 'primary'
                },
                style: {
                  display: 'inline-block',
                  height: '30px',
                  // background:"#3399ff",
                  color:"#3399ff",
                  width:'50px',
                  lineHeight:"30px",
                  textAlign:"center",
                  border:'1px solid #3399ff',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.afetyVerification()
                    this.verifyEditor = true
                    this.formItemData = params.row
                    // this.showData(params.row)
                    // const { remark, bindIp, id, code } = params.row
                    // this.editorFormItem = { remark, bindIp, id, code }
                    // this.verifyEditor = true
                  }
                }
              },
              this.$t('apiAdmin.edit')
            ),
            h(
              'span',
              {
                props: {
                  type: 'error'
                },
                style: {
                  marginLeft: '10px',
                  display: 'inline-block',
                  height: '30px',
                  // background:"#ed4014",
                  color: '#fff',
                  width: '50px',
                  lineHeight: '30px',
                  color: '#ed4014',
                  border: '1px solid #ed4014 ',
                  textAlign: 'center',
                  cursor: 'pointer'

                },
                on: {
                  click: () => {
                    this.del = true
                    this.id = params.row.id
                  }
                }
              },
              this.$t('apiAdmin.delete')
            )
          ]
        }
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.timebox {
  color: #8090af;
  cursor: pointer;
  .button-code {
    color: #3399ff;
    font-size: 12px;
  }
}
.edit_let_buttom_new{
  margin-left:0 !important;
  margin-top:6px;

}
.edit_let_bb{
  .edit_let_butto{
  display:block;
  margin: 0 auto;
  }
  .ivu-modal-content{
    border-radius: 0 !important;
  }
}
.api_edit{
  background:#0e0e28;
}
.apimanagement{
  position:relative;
  background:#0e0e28;
  padding-top:76px;
  padding-bottom: 100px;

  .nav-rights{
    width:1200px;
    margin:0 auto;
  }
  top:50px;
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
  // padding: 20px;
  .content {
    margin: 10px 0;
    margin-top:30px;
    padding-bottom: 1px;
    .content_header {
      padding: 10px;

      border-bottom: 1px solid #2A3850FF;

      .add {
        width: 39%;
        .ivu-input{
          border-radius: 0 !important;
        }
      }
      .prompt {
        margin-left: 25px;
        p{
          color: #fff !important;
        }
        ul li {
          font-size: 14px;
          color: #8090AF;
          line-height: 30px;
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

}
.apimanagement .main .content .content_header .prompt ul li[data-v-252430f8]{
  font-size:14px !important;
  color:#8090AF !important;
}


</style>
<style lang="scss">
.old_deta .timebox button{
  outline: none;
}
.old_deta .timebox .ivu-btn{
  border:none !important;
  outline: none;
}
#a_new{
  #new_butto{
    margin-left:78px !important;
  }
  .ivu-form-item-content{
    margin-left:20px !important;
  }
  .ivu-input{
   border:1px solid rgba(128,144,175,1) !important;
   border-radius: 0 !important;
   height:40px !important;
  }
}
.old_deta{
  display:flex;
  justify-content: center;
  align-items: center;
  .ivu-modal{
    top:0 !important;
  }
  .ivu-modal-header .ivu-modal-header-inner{
    text-align: left !important;
  }
}

.bcd .ivu-input{
  border-radius: 0 !important;
}
.edit_let_aa{
  .ivu-modal-footer{
    margin-top:0 !important;
  }
  .ivu-modal-body{
    margin-left:38px !important;
  }
}
.delete{
  /*.ivu-modal-footer button:nth-child(1){*/
  /*  display:none;*/
  /*}*/
  .ivu-modal-body{
    margin-left:38px;
  }
  .ivu-modal-content {
        width:534px;
        padding: 0 42px;
        background: #111530;
        border-radius: 0;
        .ivu-modal-header {
            border-bottom: 1px solid #2A3850;
            height: 54px;
            padding: 18px 0;
            .ivu-modal-header-inner {
                color: #fff;
                text-align: left !important;
                font-weight: 400;
            }
        }
        /*.ivu-modal-footer {*/
        /*    display: none;*/
        /*}*/
        .ivu-modal-close .ivu-icon-ios-close {
            color: #fff;
        }

        .ivu-modal-body {
            padding: 26px 0 20px 0;
        }
    }
}

.edit_let-code{
  .ivu-modal-content{
    border-radius: 0 !important;
  }

  .ivu-modal-body{
    margin-top:30px;
  }
  .edit_let_buttom{
    width:300px;
    height:40px;
    margin: 0 0 44px 93px;
    border-radius: 0 !important;
  }
  .ivu-input-group-large{
    border:1px solid rgba(128,144,175,1) !important;
    border-radius: 0 !important;
    .ivu-input{
      color: #8090af;
      border-right: 1px solid #8090af;
      border-top: 0;
      border-bottom: 0;
      border-left: 0;
    }
  }
.ivu-btn.disabled, .ivu-btn.disabled.active, .ivu-btn.disabled:active, .ivu-btn.disabled:focus, .ivu-btn.disabled:hover, .ivu-btn[disabled], .ivu-btn[disabled].active, .ivu-btn[disabled]:active, .ivu-btn[disabled]:focus, .ivu-btn[disabled]:hover, fieldset[disabled] .ivu-btn, fieldset[disabled] .ivu-btn.active, fieldset[disabled] .ivu-btn:active, fieldset[disabled] .ivu-btn:focus, fieldset[disabled] .ivu-btn:hover{
  background-color:transparent;
  border-color:transparent;
}

.ivu-input-group .ivu-input{
  // border-right:1px solid rgba(128,144,175,1) !important;
}
.ivu-input-group-append, .ivu-input-group-prepend{
  border-radius: 0 !important;
  border:none !important
}
.ivu-modal-footer{
  width:454px;
  border-top:none !important;
  margin-left:38px;
  text-align:center;
  margin-top:30px;
}
.ivu-modal-body{
  padding:0 !important;
}
.ivu-input-group-append, .ivu-input-group-prepend{
  background:transparent;
}
.ivu-input-group-large .ivu-input, .ivu-input-group-large>.ivu-input-group-append, .ivu-input-group-large>.ivu-input-group-prepend{
  width:200px;
  height:40px;
}
.ivu-form-item{
  display:flex;
  height:40px;
  margin-top:30px;
  margin-left:43px;
}
.ivu-form-label-top .ivu-form-item-label{
  /*line-height:40px;*/
  font-size: 14px;
  color: #8090AF;
  padding: 13px 12px 13px 0;
}
.ivu-form-item-content{
  width:300px;
  margin-left:16px;
  // border:1px solid rgba(128,144,175,1);
  // border-radius: 0 !important
}

.ivu-input{
  border-radius: 0;
  border-color: #8090af;
  color: #fff;
  background:transparent !important;
}
.ivu-modal-content{
  width:534px;
  box-shadow:none !important;
 background:rgba(17,21,48,1) !important;
}
.ivu-modal-header{
  width:454px;
  margin-left:38px;
  padding:14px 0 !important;
  border-bottom:1px solid rgba(42,56,80,1) !important;
}
.ivu-form-label-top .ivu-form-item-label{
  font-size:14px;
  margin-left:20px;
  color:#8090AF;
}
.ivu-modal-close{
  right:34px;
}
.ivu-modal-header p, .ivu-modal-header-inner{
  color:#fff;
  font-size:18px;
}



}




.bcd .card3 .ivu-table-tbody .ivu-table-column-center .ivu-table-cell{
  text-align:right;
}
.card2 .ivu-form .ivu-form-item-label{
  text-align:left;
  font-size:14px;
  color:#8090AF;
}
  .card1.ivu-card{
height:55px;
background:rgba(25,29,58,1);
line-height:55px;
padding-left:35px;


}
.card2.ivu-card .ivu-card-head,.card3.ivu-card .ivu-card-head{
  padding-left:33px;
}
.card2.ivu-card{
  margin-top:30px;
}
.card1 .ivu-card-head{
height:55px;
background:rgba(25,29,58,1);

line-height:55px;

}
.card1 .ivu-card-body {
color:#fff !important;
}
.card2.ivu-card{
background:#111530FF


}
.card2 .apimanagement .main .content .content_header[data-v-252430f8]{
  padding-left:30px;
}
.card2.ivu-card .ivu-card-head{
  height:55px;
background:rgba(25,29,58,1);

color: #fff;
}
.card2.ivu-card .ivu-card-head p{
  color: #fff;
}
.card3.ivu-card{
background:rgba(25,29,58,1);


}
.card3.ivu-card .ivu-card-head{
  height:55px;
background:rgba(25,29,58,1);

color: #fff;
}
.card3 .ivu-table-cell{
  padding-left:0 !important;
  padding-right:0 !important;
}
.card3 thead tr .ivu-table-column-center:nth-child(7){
  text-align:right;

}
.card3.ivu-card .ivu-card-head p{
  color: #fff;
}
.main .ivu-card-head{
  border-bottom: 0 !important;
}
.card3.ivu-card{
  background:#111530FF !important;
}
.card3 .ivu-table td{
  background:#111530FF !important;
  border:0 !important;
}
.bcd {
  .ivu-input{
    color: #8090AF;
    height: 40px;
    line-height: 40px;
    border-radius: 0;
    background: transparent !important;
    border: 1px solid rgba(128,144,175,1);

  }

  .ivu-table-wrapper .ivu-table:before {
      background: transparent;
    }
    div.ivu-card-body {
      padding: 0;
    }
    div.ivu-table-wrapper {
      border: none;
    }
    .ivu-table:before{content:'';width:100%;height:0px;position:absolute;left:0;bottom:0;z-index:1}
    .ivu-table:after{content:'';width:0px;height:100%;position:absolute;top:0;right:0;z-index:3}
    .ivu-table-wrapper .ivu-table .ivu-table-header th{
      background: transparent;
    }
    .ivu-table{
      background: transparent;
    }
    .ivu-table td .ivu-table th{
      border-bottom: rgba(42,56,80,1);
    }
}
.card2 .ivu-input:focus{
  box-shadow:none;
}
.card3,.card2{
  // padding: 0 10px;
}
 .ivu-table td, .ivu-table th{
  border-bottom: 1px solid rgba(42,56,80,1) !important;
}
.card3 div.ivu-card-body{
  padding:0 35px;
}



</style>




