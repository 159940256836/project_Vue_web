<template>
  <div id="mobile_login">
    <div>
      <div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <div class="title" style="margin-bottom: .39rem;font-size: .4rem;">{{$t('uc.login.login')}}</div>
          <FormItem prop="user">
            <Input
              @on-enter="handleSubmit('formInline')"
              name="user"
              type="text"
              v-model="formInline.user"
              :placeholder="$t('uc.login.usertip')"
              @on-blur="userBlur"
            />
          </FormItem>

          <FormItem prop="password">
            <Input
              @on-enter="handleSubmit('formInline')"
              type="password"
              v-model="formInline.password"
              :placeholder="$t('uc.login.pwdtip')"
            ></Input>
          </FormItem>

          <FormItem prop="googleCode" v-if="openGoogleCode">
            <Input
              type="text"
              @on-enter="handleSubmit('formInline')"
              v-model="formInline.googleCode"
              :placeholder="$t('uc.login.google')"
            ></Input>
          </FormItem>

          <!--手机短信验证 5.29-->
          <FormItem prop="vailCode3" v-if="openPhoneCode" class="time-input">
            <Input v-model="formInline.checkCode" size="large" :placeholder="$t('uc.login.phone')">
              <div slot="append">
                <div @click="sendPhoneCode(1)" :disabled="sendMsgDisabled">
                  <span v-if="sendMsgDisabled">{{codeTime+$t('uc.safe.second')}}</span>
                  <span v-if="!sendMsgDisabled">{{$t('uc.safe.clickget')}}</span>
                </div>
              </div>
            </Input>
          </FormItem>
          <!--邮箱验证码 6.06-->
          <!--v-if="openEmailCode"-->
          <FormItem prop="vailCode4" v-if="openEmailCode" class="time-input">
            <Input v-model="formInline.emailCode" size="large" :placeholder="$t('uc.login.email')">
              <div slot="append">
                <div @click="sendPhoneCode(2)" :disabled="sendMsgDisabled1">
                  <span v-if="sendMsgDisabled1">{{codeTime1+$t('uc.safe.second')}}</span>
                  <span v-if="!sendMsgDisabled1">{{$t('uc.safe.clickget')}}</span>
                </div>
              </div>
            </Input>
          </FormItem>

          <div class="go-register-tip">
            <span>{{$t("uc.login.noaccount")}}</span>
            <router-link style="font-size:.3rem;" :to="{name:'mobileRegister'}">{{$t("uc.login.registerLog")}}</router-link>
            <!-- <router-link to="/findPwd">{{$t('uc.login.forget')}}</router-link> -->
          </div>
          <FormItem style="margin-bottom:10px;">
            <Button @click="login" class="login-btn">
              <!--@click="handleSubmit('formInline')"-->
              {{$t('uc.forget.login')}}
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
    <MyModal ref="myModal"/>
  </div>
</template>

<script>
import MyModal from './myModal.vue'

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
        this.$http
          .post(this.host + '/uc/mobile/login/code', {
            phone: this.formInline.user
          })
          .then(response => {
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
              this.$refs.myModal.open(resp.message)
            }
          })
      } else {
        // 获取邮箱code
        this.$http
          .post(this.host + '/uc/email/login/code', {
            email: this.formInline.user
          })
          .then(response => {
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
              this.$refs.myModal.open(resp.message)
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
      var captcha1 = new TencentCaptcha('2038419167', res => {
        res.ret == 0 &&
          (self.ticket = res.ticket) &&
          (self.randStr = res.randstr) &&
          self.success(res.ticket, res.randstr) // 腾讯防水验证成功的回调
      })
      captcha1.show() // 显示验证码
    },
    /** 验证用户是否开启了谷歌验证  返回值1为开启*/
    isNeedGoogle(tel) {
      return this.$http
        .post(this.host + '/uc/v2/get/user', { username: tel })
        .then(res => {
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
        this.$refs.myModal.open(this.$t('uc.login.loginvalidate'))
        return false
      }
      // 判断是否绑定谷歌
      if (this.openGoogleCode) {
        // this.openPhoneCode = false;
        // 判断谷歌验证码不能为空
        if (!this.formInline.googleCode) {
          this.$refs.myModal.open(this.$t('uc.login.google'))
          return false
        } else {
          this.initGtCaptcha()
        }
      } else if (this.openPhoneCode) {
        // // 判断手机验证码不能为空
        if (!this.formInline.checkCode) {
          this.$refs.myModal.open(this.$t('uc.login.phone'))
          return false
        } else {
          this.initGtCaptcha()
        }
      } else if (this.openPhoneCode) {
        // 6.06
        // // 判断邮箱验证码不能为空
        if (!this.formInline.emailCode) {
          this.$refs.myModal.open(this.$t('uc.login.email'))
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
      params.loginType = 2
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
          this.$refs.myModal.open(this.$t('uc.login.success'))
          this.$store.commit('setMember', response.body.data)
          if (this.$route.query.key != null && this.$route.query.key != '') {
            localStorage.setItem('USERKEY', this.$route.query.key)
          }
          sessionStorage.switchToPc = true
          this.$router.push('/')
        } else {
          this.$refs.myModal.open(resp.message)
        }
      })
    }
  },
  components: {
    MyModal
  }
}
</script>

<style lang="scss" scoped>
#mobile_login {
  font-size: .3rem;
  padding: .5rem .3rem;
  .title {
    color: #2988e8;
  }
  /deep/ .ivu-form-item {
      margin-bottom: .49rem;
    .ivu-input {
      background: #10122B;
      width: 100%;
      height: .8rem;
      padding: .2rem;
      border-radius: .05rem;
      font-size: .3rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: .01rem solid #2988e8;
      // -webkit-border-image: -webkit-linear-gradient(173deg, #2988e8, #51e8ff) 20 20;
      // -o-border-image: -o-linear-gradient(173deg, #2988e8, #51e8ff) 20 20;
      // border-image: linear-gradient(-83deg, #2988e8, #51e8ff) 20 20;
      color: white;
    }
    .ivu-form-item-error-tip {
      font-size: .3rem;
    }
  }
  /deep/ .time-input {
    .ivu-input-group-append {
      padding: 0 .3rem;
      font-size: .3rem;
      background: transparent;
      color: #2988e8;
      border: .01rem solid #2988e8;
    }
  }
  .go-register-tip {
    margin-bottom: .29rem;
  }
  .login-btn {
      background: #3399FF;
      width: 100%;
      height: .8rem;
      border-radius: .05rem;
      font-size: .3rem;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #fff;
      border-color: #3399FF;
  }
}
</style>
