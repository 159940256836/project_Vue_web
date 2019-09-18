
<template>
    <div id="mobile_register">
        <div id="button">
            <Form
                v-if="allowRegister"
                ref="formInline"
                :model="formInline"
                :rules="ruleInline"
                inline
            >
                <p class="title" style="margin-bottom: .39rem;font-size: .4rem;">{{$t('uc.login.registered')}}</p>
                <FormItem style="width: 100%;">
                    <ButtonGroup>
                        <Button
                            v-for="(list,index) in buttonLists"
                            :key="list.text"
                            :class="{ active:changeActive == index}"
                            @click="actives(index)"
                        >
                            {{list.text}}
                        </Button>
                    </ButtonGroup>
                </FormItem>
                <!--<FormItem prop="country">
                    <Select v-model="formInline.country" :placeholder="$t('uc.regist.country')" @on-change="onAreaChange">
                        <Option v-for="(area,index) in areas" :value="area.zhName" :key="index">{{area.zhName}}</Option>
                    </Select>
                </FormItem>-->
                <FormItem prop="username">
                    <Input
                        type="text"
                        v-model="formInline.username"
                        :placeholder="$t('uc.regist.username')"
                    >
                    </Input>
                </FormItem>

                <FormItem>
                    <Select
                        prop="country"
                        v-model="formInline.country"
                        :placeholder="$t('uc.regist.country')"
                        @on-change="onAreaChange"
                    >
                        <Option
                            v-for="(area,index) in areas"
                            :value="area.zhName"
                            :key="index"
                        >
                            {{area.zhName}}
                        </Option>
                    </Select>
                    
                </FormItem>

                <FormItem>
                    <Input
                          prop="user"
                          v-if="changeActive == 0"
                          type="text" v-model="formInline.user"
                          :placeholder="key"
                      >
                      </Input>
                      <Input
                          v-else
                          type="text"
                          v-model="formInline.user"
                          :placeholder="key"
                      >
                    </Input>
                </FormItem>

                <FormItem prop="code" v-show="showCode" class="time-input">
                    <Input
                        type="text"
                        v-model="formInline.code"
                        :placeholder="$t('uc.regist.smscode')"
                    > 

                      <div slot="append">
                          <div @click="sendCode()" :disabled='codedisabled'>
                            <span>{{ sendcodeValue }}</span>
                          </div>
                      </div>
                    </Input>
                    <!-- <input
                        id="sendCode"
                        @click="sendCode()"
                        type="Button"
                        :value="sendcodeValue"
                        :disabled='codedisabled'
                    >
                      
                    </input> -->
                    <!-- <div slot="append">
                <div @click="sendPhoneCode(2)" :disabled="sendMsgDisabled1">
                  <span v-if="sendMsgDisabled1">{{codeTime1+$t('uc.safe.second')}}</span>
                  <span v-if="!sendMsgDisabled1">{{$t('uc.safe.clickget')}}</span>
                </div>
              </div> -->
                </FormItem>

                <FormItem prop="password">
                    <Input
                        type="password"
                        v-model="formInline.password"
                        :placeholder="$t('uc.regist.pwd')"
                    >
                    </Input>
                </FormItem>

                <FormItem prop="repassword">
                    <Input
                        type="password"
                        v-model="formInline.repassword"
                        :placeholder="$t('uc.regist.confrimpwd')"
                    >
                    </Input>
                </FormItem>

                <FormItem prop="agentcode">
                    <Input
                        type="text"
                        v-model="formInline.agentcode"
                        :placeholder="$t('uc.regist.agentcode')"
                    >
                    </Input>
                </FormItem>

                <div style="margin-bottom: .39rem;">
                    <label>
                        <Checkbox v-model="agree" size="large">
                            {{$t('uc.regist.agreement')}}
                        </Checkbox>
                    </label>
                    <!-- 用户协议 -->
                    <router-link to="/Usereement" style="font-size:.3rem;">
                        《{{$t('uc.regist.userprotocol')}}》
                    </router-link>
                    <!--<a href="#/helpdetail?cate=1&id=9&cateTitle=常见问题" target="_blank" style="">《{{$t('uc.regist.userprotocol')}}》</a>-->
                </div>

                <FormItem id="button" >
                    <Button
                        @click="handleSubmit('formInline')"
                        class="login-btn"
                    >
                        {{$t('uc.regist.regist')}}
                    </Button>
                </FormItem>
            </Form>
        </div>
        <MyModal ref="myModal"/>
    </div>
</template>

<script>
import MyModal from './myModal.vue'

export default {
  data() {
    const validateUser = (rule, value, callback) => {
      if (this.changeActive == 0) {
        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        if (value == '') {
          callback(new Error(this.$t('uc.regist.teltip')))
        } else if (!reg.test(this.formInline.user)) {
          callback(new Error(this.$t('uc.regist.telerr')))
        } else {
          callback()
        }
      } else {
        let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
        if (value == '') {
          callback(new Error(this.$t('uc.regist.emailtip')))
        } else if (!reg.test(this.formInline.user)) {
          callback(new Error(this.$t('uc.regist.emailerr')))
        } else {
          callback()
        }
      }
    }
    const validateRepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('uc.regist.confirmpwdtip')))
      } else if (value !== this.formInline.password) {
        callback(new Error(this.$t('uc.regist.confirmpwderr')))
      } else {
        callback()
      }
    }
    return {
      codedisabled: false,
      sendcodeValue: this.$t('uc.regist.sendcode'),
      ticket: '',
      randStr: '',
      captchaObj: null,
      modal1: false,
      _captchaResult: null,
      agree: true,
      allowRegister: true,
      buttonLists: [
        {
          text: this.$t('uc.regist.telregist')
        },
        {
          text: this.$t('uc.regist.emailregist')
        }
      ],
      areas: [],
      changeActive: 0,
      showCode: true,
      countdown: 60,
      formInline: {
        username: '',
        country: '',
        user: '',
        code: '',
        areaCode: '',
        password: '',
        repassword: '',
        agentcode:
                    typeof this.$route.query.agent === 'undefined'
                        ? ''
                        : this.$route.query.agent,
        superType:
                    typeof this.$route.query.type === 'undefined'
                        ? ''
                        : this.$route.query.type
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: this.$t('uc.regist.usernametip'),
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 3,
            max: 15,
            message: this.$t('uc.regist.usernamemsg'),
            trigger: 'blur'
          }
        ],
        country: [
          {
            required: true,
            message: this.$t('uc.regist.countrytip'),
            trigger: 'blur'
          }
        ],
        user: [{ validator: validateUser, trigger: 'blur' }],
        code: [
          {
            required: true,
            message: this.$t('uc.regist.smscodetip'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('uc.regist.pwdtip'),
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 6,
            message: this.$t('uc.regist.pwdmsg'),
            trigger: 'blur'
          }
        ],
                // confirmPwd: [
                //     {
                //         required: true,
                //         message: this.$t("uc.regist.pwdtip"),
                //         trigger: "blur"
                //     },
                //     {
                //         type: "string",
                //         min: 6,
                //         // message: this.$t("uc.regist.pwdmsg"),
                //         message: '两次密码不一致请重新输入',
                //         trigger: "blur"
                //     }
                // ],
        repassword: [{ validator: validateRepassword, trigger: 'blur' }]
      },
      key: '',
      code: ''
    }
  },
  watch: {
    changeActive: function(val) {
      this.$refs['formInline'].resetFields()
    },
    lang: function() {
      this.updateLangData()
    }
  },
  computed: {
    lang: function() {
      return this.$store.state.lang
    },
    isLogin: function() {
      return this.$store.getters.isLogin
    }
  },
  created: function() {
    window.scrollTo(0, 0)
    this.init()
    this.actives(this.changeActive)
  },
  mounted: function() {
    // this.closable()
    // document.getElementById('logo').style.height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    updateLangData() {
      this.buttonLists = [
        {
          text: this.$t('uc.regist.telregist')
        },
        {
          text: this.$t('uc.regist.emailregist')
        }
      ]
      if (this.changeActive == 0) {
        this.key = this.$t('uc.regist.telno')
      } else {
        this.key = this.$t('uc.regist.email')
      }
    },
    init() {
      if (this.isLogin) {
        this.$router.push('/')
      }
      this.getAreas()
    },
    initGtCaptcha() {
            // 直接生成一个验证码对象
      const captcha1 = new TencentCaptcha('2087858432', (res) => {
        res.ret == 0 && (this.ticket = res.ticket) && (this.randStr = res.randstr);
        (this.changeActive == 0) && this.success()
        this.changeActive == 1 && this.emailSuccess()
      })
      captcha1.show() // 显示验证码
    },
    onAreaChange(value) {
      for (let i = 0; i < this.areas.length; i++) {
        if (this.areas[i].zhName == value) {
          this.formInline.areaCode = this.areas[i].areaCode
        }
      }
    },
    getAreas() {
      this.$http.post(this.host + this.api.common.area).then(response => {
        const resp = response.body
        this.areas = resp.data
        if (this.areas != null) {
          this.formInline.country = this.areas[0].zhName
          this.formInline.areaCode = this.areas[0].areaCode
        }
      })
    },
    actives: function(index) {
      this.changeActive = index
      if (this.changeActive == 0) {
        this.showCode = true
        this.key = this.$t('uc.regist.telno')
        this.ruleInline.code = [
          {
            required: true,
            message: this.$t('uc.regist.smscodetip'),
            trigger: 'blur'
          }
        ]
      } else {
        this.showCode = false
        this.key = this.$t('uc.regist.email')
        this.ruleInline.code = []
      }
      this.formInline.user = null
    },
    emailSuccess() { // 邮箱注册腾讯防水验证成功
      const forminline = this.formInline
      const params = {
        ticket: this.ticket,
        randStr: this.randStr,
        email: forminline.user,
        password: forminline.password,
        username: forminline.username,
        country: forminline.country,
        promotion: forminline.agentcode,
        superPartner: ''
      }
      // this.$http.post(this.host + '/uc/register/email', params).then(response => { // 旧接口
      this.$http.post(this.host + '/uc/register/newRegisterByEmail', params).then(response => { // 新接口
        const resp = response.body
        if (resp.code == 0) {
          // this.$Notice.success({
          //   title: this.$t('common.tip'),
          //   desc: resp.message
          // })
          this.$refs.myModal.open({
            title: this.$t('common.tip'),
            desc: resp.message
          })
          setTimeout(() => {
            this.$router.push('login')
          }, 3000)
        } else {
          this.$refs.myModal.open({
            title: this.$t('common.tip'),
            desc: resp.message
          })
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.agree == true) {
            if (this.changeActive == 1) {
              this.afterValidate()
            } else {
              this.phoneRegister()
            }
          } else {
            this.$refs.myModal.open({ title: this.$t('common.tip'), desc: this.$t('uc.regist.agreementtip') })
            // this.$Notice.error({
            //   title: this.$t('common.tip'),
            //   desc: this.$t('uc.regist.agreementtip')
            // })
          }
        }
      })
    },
    settime() {
      this.sendcodeValue = this.countdown
      this.codedisabled = true
      const timercode = setInterval(() => {
        this.countdown--
        this.sendcodeValue = this.countdown
        if (this.countdown <= 0) {
          clearInterval(timercode)
          this.codedisabled = false
          this.sendcodeValue = this.$t('uc.regist.sendcode')
          this.countdown = 60
        }
      }, 1000)
    },
    sendCode() {
      const mobilePhone = this.formInline.user
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (mobilePhone == '' || !reg.test(mobilePhone)) {
        this.$refs.myModal.open({ title: this.$t('common.tip'), desc: this.$t('uc.regist.teltip') })
        // this.$Notice.error({
        //   title: this.$t('common.tip'),
        //   desc: this.$t('uc.regist.teltip')
        // })
        return
      } else {
        this.initGtCaptcha()
      }
    },
    success() {
      const params = {}
      params['phone'] = this.formInline.user
      params['country'] = this.formInline.country
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      reg.test(params['phone']) && this.$http.post(this.host + '/uc/mobile/code', params).then(response => {
        const resp = response.body
        resp.code == 0 && this.$refs.myModal.open({ title: this.$t('common.tip'), desc: resp.message })
        resp.code == 0 && this.settime()
        resp.code != 0 && this.$refs.myModal.open({ title: this.$t('common.tip'), desc: resp.message })
      })
      // !reg.test(params['phone']) && this.$Notice.error({ title: this.$t('common.tip'), desc: this.$t('uc.finance.withdraw.telerr') })
      !reg.test(params['phone']) && this.$refs.myModal.open({ title: this.$t('common.tip'), desc: this.$t('uc.finance.withdraw.telerr') })
    },
    phoneRegister() { // 手机注册
      const params = {}
      params['phone'] = this.formInline.user
      params['username'] = this.formInline.username
      params['password'] = this.formInline.password
      params['code'] = this.formInline.code
      params['country'] = this.formInline.country
      params['promotion'] = this.formInline.agentcode
      params['superPartner'] = this.formInline.superType
      params['ticket'] = this.ticket
      params['randStr'] = this.randStr
            // this.$http.post(this.host + "/uc/register/phone", params).then(response => { 旧接口
      this.$http.post(this.host + '/uc/register/nweLoginByPhone', params).then(response => { // 新接口
        const resp = response.body
        if (resp.code == 0) {
          this.$refs.myModal.open({
            title: this.$t('common.tip'),
            desc: resp.message
          })
          setTimeout(() => {
            this.$router.push('login')
          }, 3000)
        } else {
          this.$refs.myModal.open({
            title: this.$t('common.tip'),
            desc: resp.message
          })
        }
      })
    },
    afterValidate() {
      this.initGtCaptcha()
    },
    closable() {
      this.$refs.myModal.open({
        content: this.$t('common.tip')
            // duration: 10000,
            // closable: true
      })
    }
  },
  components: {
    MyModal
  }
}
</script>

<style lang="scss" scoped>
#mobile_register {
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
      // border: .01rem solid;
      border: .01rem solid #2988e8;
      // -webkit-border-image: -webkit-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
      // -o-border-image: -o-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
      // border-image: linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
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
  /deep/ .ivu-btn-group{
    .ivu-btn {
      height: .8rem;
      // line-height: .8rem;
      font-size: .3rem;
      background: transparent;
      // border: 1px solid #2988e8;
      margin-right: .1rem;
      border:1px solid #2988e8;
      border-radius: .05rem;
      padding-left: .2rem;
      padding-right: .2rem;

    }
    .active {
      background: #3399FF;
      color: #fff;
    }
  }
  /deep/ .ivu-select {
        background: #10122B;
    // height: 1rem;
    font-size: .3rem;
    border: .01rem solid #2988e8;
    -webkit-box-sizing: border-box;
    border-radius: .05rem;
    // -webkit-border-image: -webkit-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
    //   -o-border-image: -o-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
    //   border-image: linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
    .ivu-select-selection {
      border: none;
      background: transparent;
      color: #fff;
      // border-color: 1px solid #2988e8;
      // border: .01rem solid #2988e8;
      // -webkit-border-image: -webkit-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
      // -o-border-image: -o-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
      // border-image: linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
      padding-left: .1rem;
      height: .8rem;
      .ivu-select-selected-value {
        font-size: .3rem !important;
        height: .8rem;
        line-height: .8rem;
        color: #fff;
      }
      .ivu-select-arrow {
        font-size: .3rem;
      }
    }
    .ivu-select-item-selected:hover, 
    .rejs .ivu-select-dropdown,
    .rejs .ivu-select-item-selected, 
    .rejs .ivu-select-item:hover {
      background: transparent !important;
    }
    .ivu-select-item {
      padding-left: .1rem;
      height: .8rem;
      font-size: .3rem !important;
      color: #8090af;
      background: transparent;
    }
    .ivu-select-dropdown {
      max-height: 5rem;
    }
  }
  /deep/ .ivu-checkbox-wrapper {
    font-size: .3rem;
    .ivu-checkbox-inner {
      height: .3rem;
      width: .3rem;
    }
    .ivu-checkbox-inner:after {
      height: .2rem;
      width: .1rem;
      left: .1rem;
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
      // border: .01rem solid;
      // -webkit-border-image: -webkit-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
      // -o-border-image: -o-linear-gradient(173deg, #2988e8, #51e8ff) 10 10;
      // border-image: linear-gradient(-83deg, #2988e8, #51e8ff) 10 10;
      color: #fff;
      border-color: #3399FF;
  }
}

// .ivu-message {
//     .ivu-icon {
//       margin-right: .04rem;
//       font-size: .5rem;

//     }
//     .ivu-message-notice-closable .ivu-message-notice-content-text {
//       margin-right: .32rem;
//     }
//     .ivu-message-notice-content {
//       font-size: .3rem;
//       padding: .2rem .3rem;
//     }
//     .ivu-message-notice-close i.ivu-icon {
//       font-size: .5rem;
//       top: .12rem;
//     }
//   }

</style>

<style lang="scss">

</style>
