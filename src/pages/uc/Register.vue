<template>
    <div class="login_form" id="logo">
        <div class="wrap-mask"></div>
        <div class="login_right">
            <Form
                v-if="allowRegister"
                ref="formInline"
                :model="formInline"
                :rules="ruleInline"
                inline
            >
                <p class="login_title">{{$t('uc.login.registered')}}</p>
                <FormItem style="width: 100%;border-bottom: 1px solid #ddd;">
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
                        class="select-input"
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
                    <Input
                        prop="user"
                        class="select-input1"
                        v-if="changeActive == 0"
                        type="text" v-model="formInline.user"
                        :placeholder="key"
                    >
                    </Input>
                    <Input
                        v-else
                        class="select-input1"
                        type="text"
                        v-model="formInline.user"
                        :placeholder="key"
                    >
                    </Input>
                </FormItem>

                <FormItem prop="code" v-show="showCode">
                    <Input
                        class="code-input"
                        type="text"
                        v-model="formInline.code"
                        :placeholder="$t('uc.regist.smscode')"
                    >
                    </Input>
                    <input
                        id="sendCode"
                        @click="sendCode()"
                        type="Button"
                        :value="sendcodeValue"
                        :disabled='codedisabled'
                    >
                    </input>
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
                <div class="check-agree" style="">
                    <label>
                        <Checkbox v-model="agree">
                            {{$t('uc.regist.agreement')}}
                        </Checkbox>
                    </label>
                    <!-- 用户协议 -->
                    <router-link to="/Usereement">
                        《{{$t('uc.regist.userprotocol')}}》
                    </router-link>
                    <!--<a href="#/helpdetail?cate=1&id=9&cateTitle=常见问题" target="_blank" style="">《{{$t('uc.regist.userprotocol')}}》</a>-->
                </div>
                <FormItem id="button">
                    <Button
                        class="register_btn"
                        @click="handleSubmit('formInline')"
                    >
                        {{$t('uc.regist.regist')}}
                    </Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<style scoped lang="scss">
#button{
  .ivu-btn{
      padding: 5px 15px 6px;
      font-size:14px;
      height:48px;
  }
  .ivu-btn:hover{
    border:0;
  }
  .ivu-btn:focus{
    box-shadow:0;
  }
}
.login_form {
    background: #f9f9f9 url('../../assets/images/brnner.png') no-repeat center
        center;
    height: 760px;
    position: relative;
    overflow: hidden;
    .wrap-mask {
        height:100%;
        width:100%;
        background: rgba(0,0,0,.3);
    }
    .login_right {
        // background: #fff url("../../assets/images/register.png") no-repeat center !important;
        padding: 0 42px;
        position: absolute;
        background: #10122B;
        width: 465px;
        left: 50%;
        top: 42%;
        margin-left: -175px;
        margin-top: -255px;
        form.ivu-form.ivu-form-label-right.ivu-form-inline {
            .ivu-form-item {
                .ivu-form-item-content {
                    .ivu-select-item-selected, .ivu-select-item-selected:hover{
                        background:#191d3a;
                    }
                    .ivu-select-item:hover{
                        background:#191d3a;
                    }
                    .register_btn.ivu-btn {
                        width: 100%;
                        background-color: #3399ff;
                        outline: none;
                        border-color: #3399ff;
                        color: #fff;
                        border-radius: 0;
                        font-size: 18px;
                        margin-top: 20px;
                        &:focus {
                            box-shadow: 2px 2px 5px transparent,
                                -2px -2px 4px transparent;
                        }
                    }
                    .ivu-input-wrapper.ivu-input-type {
                        .ivu-input {
                            border: 1px solid red;
                        }
                    }
                    #sendCode {
                        position: absolute;
                        border: 1px solid #DDDDDD;
                        background: #10122B;
                        top: 0px;
                        outline: none;
                        line-height: 40px;
                        right: 0px;
                        width: 27%;
                        color: #3399ff;
                        cursor: pointer;
                        border:1px solid;
                        border-image:linear-gradient(-83deg, rgba(41,136,232,1), rgba(81,232,255,1)) 10 10;
                    }
                }
            }
            .check-agree {
                color: #979797;
                display: inline-block;
                line-height: 30px;
                font-size: 12px;
                cursor: default;
                a {
                    color: #3399ff;
                    margin-left: -10px;
                }
                .ivu-checkbox-wrapper.ivu-checkbox-wrapper-checked {
                    .ivu-checkbox.ivu-checkbox-checked {
                        .ivu-checkbox-inner {
                            border: 1px solid #3399ff;
                            background-color: #3399ff;
                        }
                    }
                }
            }
        }
    }
}

.login_title {
    color: #3399FF;
    text-align: center;
    height: 80px;
    font-size: 25px;
}
.select-input {
    border-radius: 0;
    width: 100px;
}
.select-input1 {
    width: 281px;
    float: right;
}
.code-input {
    width: 281px;
}

#captcha {
    width: 100%;
    display: inline-block;
}
.show {
    display: block;
}
.hide {
    display: none;
}
#notice {
    color: red;
}
#wait {
    text-align: left;
    color: #666;
    margin: 0;
}
.tel-title {
    color: #000;
    font-size: 25px;
}
</style>
<script>
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
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      var par = '?' + location.href.split('?')[1]
      this.$router.replace('/mobilereg' + par)
    }
    window.scrollTo(0, 0)
    this.init()
    this.actives(this.changeActive)
  },
  mounted: function() {
    document.getElementById('logo').style.height = document.documentElement.clientHeight + 'px'
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
      this.$http.post(this.host + '/uc/register/email', params).then(response => { // 旧接口
            // this.$http.post(this.host + '/uc/register/newRegisterByEmail', params).then(response => { // 新接口
        const resp = response.body
        if (resp.code == 0) {
          this.$Notice.success({
            title: this.$t('common.tip'),
            desc: resp.message
          })
          setTimeout(() => {
            this.$router.push('login')
          }, 3000)
        } else {
          this.$Notice.error({
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
            this.$Notice.error({
              title: this.$t('common.tip'),
              desc: this.$t('uc.regist.agreementtip')
            })
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
        this.$Notice.error({
          title: this.$t('common.tip'),
          desc: this.$t('uc.regist.teltip')
        })
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
        resp.code == 0 && this.$Notice.success({ title: this.$t('common.tip'), desc: resp.message })
        resp.code == 0 && this.settime()
        resp.code != 0 && this.$Notice.error({ title: this.$t('common.tip'), desc: resp.message })
      })
      !reg.test(params['phone']) && this.$Notice.error({ title: this.$t('common.tip'), desc: this.$t('uc.finance.withdraw.telerr') })
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
          this.$Notice.success({
            title: this.$t('common.tip'),
            desc: resp.message
          })
          setTimeout(() => {
            this.$router.push('login')
          }, 3000)
        } else {
          this.$Notice.error({
            title: this.$t('common.tip'),
            desc: resp.message
          })
        }
      })
    },
    afterValidate() {
      this.initGtCaptcha()
    }
  }
}
</script>
<style lang="scss">
$changeColor:#DDDDDD;
$focusColor:#3399FF;
.login_form {
    $main_theme: #3399ff;
    .login_right {
        form.ivu-form.ivu-form-label-right.ivu-form-inline {
            .ivu-form-item {
                border:0 !important;
                .ivu-form-item-content {
                    border:0;
                    .ivu-input-wrapper.ivu-input-type {
                        .ivu-input {
                            width: 100%;
                            height: 42px;
                            font-size: 14px;
                            border-radius: 0;
                            border: 1px solid $changeColor;
                            padding-left: 20px;
                            box-sizing: border-box;
                            background:#10122B;
                            border:1px solid;
                            color:white;
                            border-image:linear-gradient(-83deg, rgba(41,136,232,1), rgba(81,232,255,1)) 10 10;
                            &:focus {
                                border: 1px solid $focusColor;
                                box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
                            }
                        }
                    }
                    .ivu-btn.active {
                        font-size: 14px;
                        font-weight: 500;
                        border-radius: 0;
                        border-color: #fff;
                        border-bottom: 2px solid $main_theme !important;
                    }
                    .ivu-btn:active {
                        font-size: 14px;
                        color: $main_theme;
                        border-bottom: 2px solid $main_theme;
                    }
                    .ivu-btn {
                        font-size: 14px;
                        border:0;
                        //border-color: #fff;
                        background: transparent;
                        padding:0;
                        margin-right:15px;
                        &:hover {
                            color: $main_theme;
                            border-bottom: 2px solid $main_theme;
                        }
                        // &:focus {
                        //     box-shadow: 2px 2px 5px transparent,
                        //         -2px -2px 4px transparent;
                        // }
                    }
                }
            }
            .ivu-select {
                height: 42px;
                border-radius: 0;
            }
            .ivu-select-single .ivu-select-selection {
                height: 42px;
                border-radius: 0;
                border-right: 0;
                border:1px solid;
border-image:linear-gradient(-83deg, rgba(41,136,232,1), rgba(81,232,255,1)) 10 10;
            }
            .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
                background:#10122B;
                height: 40px;
                border-radius: 0;
                line-height: 42px;
                border-right: 0;
                color:#fff;
                text-align: center;
            }
            .check-agree {
                .ivu-checkbox-wrapper {
                    .ivu-checkbox-input {
                        &:focus {
                            border: none;
                            outline: none;
                            box-shadow: 2px 2px 5px transparent,
                                -2px -2px 4px transparent;
                        }
                    }
                }
                .ivu-checkbox-wrapper.ivu-checkbox-wrapper-checked {
                    .ivu-checkbox.ivu-checkbox-checked {
                        .ivu-checkbox-inner {
                            border: 1px solid $main_theme;
                            background-color: $main_theme;
                        }
                    }
                }
            }
        }
    }
}
</style>
