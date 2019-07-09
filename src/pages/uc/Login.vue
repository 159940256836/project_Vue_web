<template>
    <div class="login_form" id="logo">
        <div class="wrap-mask"></div>
        <div class="login_right">
            <div class="left-login">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <div class="login_title">{{$t('uc.login.login')}}</div>
                    <FormItem prop="user">
                        <Input
                            @on-enter="handleSubmit('formInline')"
                            name="user"
                            type="text"
                            v-model="formInline.user"
                            :placeholder="$t('uc.login.usertip')"
                            class="user"
                            @on-blur="userBlur"
                        />
                    </FormItem>
                    <FormItem prop="password">
                        <Input
                            @on-enter="handleSubmit('formInline')"
                            type="password"
                            v-model="formInline.password"
                            :placeholder="$t('uc.login.pwdtip')"
                        >
                        </Input>
                    </FormItem>
                    <FormItem
                        prop="googleCode"
                        v-if="openGoogleCode"
                    >
                        <Input
                            type="text"
                            @on-enter="handleSubmit('formInline')"
                            v-model="formInline.googleCode"
                            :placeholder="$t('uc.login.google')"
                        >
                        </Input>
                    </FormItem>
                    <!--手机短信验证 5.29-->
                    <FormItem
                        class="code-title"
                        prop="vailCode3"
                        v-if="openPhoneCode"
                    >
                        <Input
                            v-model="formInline.checkCode"
                            size="large"
                            :placeholder="$t('uc.login.phone')"
                        >
                            <div
                                class="timebox"
                                slot="append"
                            >
                                <div
                                    class="button-code"
                                    @click="sendPhoneCode(1)"
                                    :disabled="sendMsgDisabled"
                                >
                                    <span v-if="sendMsgDisabled">
                                        {{codeTime+$t('uc.safe.second')}}
                                    </span>
                                    <span v-if="!sendMsgDisabled">
                                        {{$t('uc.safe.clickget')}}
                                    </span>
                                </div>
                            </div>
                        </Input>
                    </FormItem>
                    <!--邮箱验证码 6.06-->
                    <FormItem
                        class="code-title"
                        prop="vailCode4"
                        v-if="openEmailCode"
                    >
                        <Input
                            v-model="formInline.emailCode"
                            size="large"
                            :placeholder="$t('uc.login.email')"
                        >
                            <div
                                class="timebox"
                                slot="append"
                            >
                                <div
                                    class="button-code"
                                    @click="sendPhoneCode(2)"
                                    :disabled="sendMsgDisabled1"
                                >
                                    <span v-if="sendMsgDisabled1">
                                        {{codeTime1+$t('uc.safe.second')}}
                                    </span>
                                    <span v-if="!sendMsgDisabled1">
                                        {{$t('uc.safe.clickget')}}
                                    </span>
                                </div>
                            </div>
                        </Input>
                    </FormItem>
                    <div class='to_register'>
                        <span>{{$t("uc.login.noaccount")}}</span>
                        <router-link to="/register">
                            {{$t("uc.login.registerLog")}}
                        </router-link>
                        <router-link to="/findPwd" style="color:#3399FF;float:right;padding-right:10px;font-size:12px;">
                            {{$t('uc.login.forget')}}
                        </router-link>
                    </div>
                    <FormItem style="margin-bottom:10px;">
                        <Button
                            class="login_btn"
                            @click="login"
                        >
                            <!--@click="handleSubmit('formInline')"-->
                            {{$t('uc.forget.login')}}
                        </Button>
                    </FormItem>

                </Form>
            </div>
            <div class="right-login">
                <div class="right-border">
                    <div class="right-main">
                        <div class="right-img">
                            <img src="../../assets/images/qrcode.png" alt="">
                        </div>
                        <p style="margin-top: 15px;">下载BDW App 随时随地，便捷交易</p>
                        <p>扫描二维码即可下载BDW App</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
/* 验证码 */
$primary-color: #3399ff;
.login_form {
    background: #fff url('https://coinmany2.oss-cn-shanghai.aliyuncs.com/brnner.png') no-repeat center;
    height: 760px;
    position: relative;
    overflow: hidden;
    padding-top: 60px;
    .wrap-mask {
        height:100%;
        width:100%;
        background: rgba(0,0,0,.3);
    }
    .login_right {
        // background: #fff url("../../assets/images/login-watermark.png") no-repeat center !important;
        padding: 0 30px 0 45px;
        position: absolute;
        background: #10122B;
        width: 767px;
        height: 440px;
        left: 50%;
        top: 50%;
        margin-left: -381px;
        margin-top: -220px;
        border:1px solid;
        border-image:linear-gradient(-83deg, rgba(41,136,232,1), rgba(81,232,255,1)) 10 10;
        .left-login {
            width: 50%;
            height: 100%;
            float: left;
            padding-top: 30px;
            .button-code {
                border-radius: 0;
            }
            .code-title {
                width: 346px;
            }
            .timebox {
                cursor: pointer;
            }
         }
        .right-login {
            width: 290px;
            float: right;
            margin-top: 109px;
            .right-border {
                height: 230px;
                border-left: 1px solid rgba(51,153,255,1);
                .right-main {
                    float: right;
                    width: 270px;
                    text-align: center;
                    .right-img {
                        background: #fff;
                        width: 150px;
                        margin: 0 auto;
                        img {
                            width: 90%;
                            margin-top:5%
                        }
                    }
                    p {
                        color: #8090AF;
                        font-size: 14px;
                    }
                }
            }
        }
        form.ivu-form.ivu-form-label-right.ivu-form-inline {
            .ivu-form-item {
                .ivu-form-item-content {
                    .login_btn.ivu-btn {
                        width: 100%;
                        height: 48px;
                        background-color: $primary-color;
                        outline: none;
                        border-color: $primary-color;
                        color: #fff;
                        font-size: 14px;
                        border-radius: 0;
                        margin-top: 15px;
                        &:focus {
                            // box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
                        }
                        span{
                          font-size:14px;
                        }
                        .ivu-btn:hover{
                          border:0;
                        }
                    }
                }
            }
        }
    }
    .to_register {
        height: 20px;
        line-height: 25px;
        overflow: hidden;
        span {
            float: left;
            color: #8090AF;
             font-size: 12px;
        }
        a {
            float: left;
            color: $primary-color;
             font-size: 12px;
        }
    }
}

</style>
<script>
export default {
  data() {
    const pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    return {
      openGoogleCode: false, // 是否开启google验证状态;
      openGoogle: '', //  获取谷歌验证
            /* 添加短信验证 yangxiaoxi 5.29*/
      openPhoneCode: false, // 是否开启Phone验证;
            // 6.06
      openEmailCode: false, // 是否开启email验证;
      sendMsgDisabled: false, // 手机短信验证码
            // 6.06
      sendMsgDisabled1: false, // 邮箱短信验证
      codeTime: 60, // 发送验证码倒计时
            // 6.06
      codeTime1: 60, // 邮箱短信验证倒计时
      captchaObj: null,
      _captchaResult: null,
      formInline: {
        user: '',
        password: '',
        googleCode: '',
        checkCode: '',
        emailCode: ''
      },
      ruleInline: {
        password: [
          {
            required: true,
            message: this.$t('uc.login.pwdvalidate1'),
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: this.$t('uc.login.pwdvalidate2'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created: function() {
    this.init()
  },
  mounted: function() {
    document.getElementById('logo').style.height = document.documentElement.clientHeight + 'px'
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    // /*手机发送验证码*/
    sendPhoneCode(index) {
      console.log(this)
      const me = this
      if (index == 1) {
                // 获取手机code
        this.$http.post(this.host + '/uc/mobile/login/code', {
          phone: this.formInline.user
        }).then(response => {
          console.log(response)
          const resp = response.body
          if (resp.code == 0) {
            this.sendMsgDisabled = true
            const interval = window.setInterval(function() {
              if (me.codeTime-- <= 0) {
                me.codeTime = 60
                me.sendMsgDisabled = false
                window.clearInterval(interval)
              }
            }, 1000)
          } else {
            this.$Message.error(resp.message)
          }
        })
      } else {
        // 获取邮箱code
        this.$http.post(this.host + '/uc/email/login/code', {
          email: this.formInline.user
        }).then(response => {
          console.log(response)
          const resp = response.body
          if (resp.code == 0) {
            this.sendMsgDisabled1 = true
            const interval = window.setInterval(function() {
              if (me.codeTime1-- <= 0) {
                me.codeTime1 = 60
                me.sendMsgDisabled1 = false
                window.clearInterval(interval)
              }
            }, 1000)
          } else {
            this.$Message.error(resp.message)
          }
        })
      }
    },
        // 用户名输入以后判断用户是否开启谷歌验证
    userBlur() {
      const pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      const tel = this.formInline.user
      if (pattern.test(tel) || reg.test(tel)) {
        this.isNeedGoogle(tel).then(res => {
          console.log(res)
                    // 6.06改写
          switch (res) {
            case 0:
                            // 0为无需输入任何验证
              this.openGoogleCode = false
              this.openPhoneCode = false
              this.openEmailCode = false
              break
            case 1:
                            // 1为开启谷歌验证
              this.openGoogleCode = true
              this.openPhoneCode = false
              this.openEmailCode = false
              break
            case 2:
                            // 2为开启手机验证
              this.openGoogleCode = false
              this.openPhoneCode = true
              this.openEmailCode = false
              break
            case 3:
                            // 3为开启邮箱验证
              this.openGoogleCode = false
              this.openPhoneCode = false
              this.openEmailCode = true
          }
          console.log(res)
        })
      }
    },
    init() {
      if (this.isLogin) {
        this.$router.push('/')
      }
    },
    onKeyup(ev) {
      if (ev.keyCode == 13) {
        $('.login_btn').click()
      }
    },
    initGtCaptcha() {
      var self = this
      var captcha1 = new TencentCaptcha('2038419167', (res) => {
        res.ret == 0 && (self.ticket = res.ticket) && (self.randStr = res.randstr) && self.success(res.ticket, res.randstr)// 腾讯防水验证成功的回调
      })
      captcha1.show() // 显示验证码
    },
        /** 验证用户是否开启了谷歌验证  返回值1为开启*/
    isNeedGoogle(tel) {
      return this.$http.post(this.host + '/uc/v2/get/user', { username: tel }).then(res => {
        const resp = res.body
        this.openGoole = res.body.data
        if (resp.code == 0) {
          return new Promise((resolve, reject) => {
            resolve(resp.data)
          })
        }
      })
    },
    success(ticket, randstr) {
      const params = {
        ticket,
        randStr: randstr
      }
      const formParams = this.formInline
      params.username = formParams.user
      params.password = formParams.password
      if (this.openGoogleCode) {
        params.code = formParams.googleCode
      }
      if (this.openPhoneCode) {
        params.checkCode = this.formInline.checkCode
      }
            // 6.06
      if (this.openEmailCode) {
        params.checkCode = this.formInline.emailCode
      }
      return this.login(params)
    },
    loginCheck() {
            // 新加代码
            // 判断手机号邮箱不能为空
      if (!this.formInline.user) {
        this.$Message.error(this.$t('uc.login.loginvalidate'))
        return false
      }
            // 判断是否绑定谷歌
      if (this.openGoogleCode) {
                // this.openPhoneCode = false;
                // 判断谷歌验证码不能为空
        if (!this.formInline.googleCode) {
          this.$Message.error(this.$t('uc.login.google'))
          return false
        } else {
          this.initGtCaptcha()
        }
      } else if (this.openPhoneCode) {
                  // // 判断手机验证码不能为空
        if (!this.formInline.checkCode) {
          this.$Message.error(this.$t('uc.login.phone'))
          return false
        } else {
          this.initGtCaptcha()
        }
      } else if (this.openPhoneCode) {
                // 6.06
                // // 判断邮箱验证码不能为空
        if (!this.formInline.emailCode) {
          this.$Message.error(this.$t('uc.login.email'))
          return false
        } else {
          this.initGtCaptcha()
        }
      }
      this.initGtCaptcha()
    },
    handleSubmit(name) {
            // 5.20修改
      console.log(name)
      this.$refs[name].validate(valid => {
                 // 首先验证输入的内容是否通过验证;通过验证的话调取腾讯防水
        console.log(valid)
        if (valid) {
          this.loginCheck()
          const params = {}
          const formParams = this.formInline
          params.username = formParams.user
          params.password = formParams.password
          params.code = formParams.googleCode
        }
      })
    },
        // login(params) {
    login() {
      const params = {}
      const formParams = this.formInline
      params.username = formParams.user
      params.password = formParams.password
      params.code = formParams.googleCode
      if (this.openGoogleCode) {
        params.code = formParams.googleCode
      }
      if (this.openPhoneCode) {
        params.checkCode = this.formInline.checkCode
      }
      if (this.openEmailCode) {
        params.checkCode = this.formInline.emailCode
      }
      this.$http.post(this.host + this.api.uc.login, params).then(response => {
        var resp = response.body
        if (resp.code == 0) {
          this.$Message.success(this.$t('uc.login.success'))
          this.$store.commit('setMember', response.body.data)
          if (
                        this.$route.query.key != null &&
                        this.$route.query.key != ''
                    ) {
            localStorage.setItem('USERKEY', this.$route.query.key)
          }
          this.$router.push('/')
        } else {
          this.$Message.error(resp.message)
        }
      })
    }
  }
}
</script>
<style lang="scss">
$changeColor:#DDDDDD;
$focusColor:#3399FF;
$white:#fff;
.login_form {
    .login_right {
        form.ivu-form.ivu-form-label-right.ivu-form-inline {
            .ivu-form-item {
                .ivu-form-item-content {
                    .ivu-input-wrapper.ivu-input-type {
                        .ivu-input {
                            background:#10122B;
                            width: 100%;
                            height: 42px;
                            font-size: 14px;
                            border-radius: 0;
                            // border: 1px solid $changeColor;
                            padding-left: 20px;
                            box-sizing: border-box;
                            border:1px solid;
                            border-image:linear-gradient(-83deg, rgba(41,136,232,1), rgba(81,232,255,1)) 10 10;
                            color:white;
                            &:focus {
                                border: 1px solid $focusColor;
                                // box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
                            }
                        }
                    }
                }
            }
            .ivu-input-group-append {
                width: 105px;
                line-height: 26px;
                border-radius: 0;
                background:#10122B;
                color:white;
                border: 1px solid;
                -webkit-border-image: -webkit-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
                -o-border-image: -o-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
                border-image: linear-gradient(-83deg, #2988e8, #51e8ff) 10 10;
                opacity: 0.62;
            }
        }
    }
}
</style>
