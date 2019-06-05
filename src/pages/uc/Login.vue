<template>
    <div class="login_form" id="logo">
        <div class="login_right">
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
                    v-if="openGoogleCode">
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
                    prop="vailCode3"
                    v-if="openPhoneCode"
                >
                    <Input v-model="formInline.phoneCode" size="large">
                        <div class="timebox" slot="append">
                            <Button @click="sendPhoneCode" :disabled="sendMsgDisabled">
                                <span v-if="sendMsgDisabled">{{codeTime+$t('uc.safe.second')}}</span>
                                <span v-if="!sendMsgDisabled">{{$t('uc.safe.clickget')}}</span>
                            </Button>
                        </div>
                    </Input>
                </FormItem>
                <p style="height:25px;">
                    <router-link to="/findPwd" style="color:#979797;float:right;padding-right:10px;font-size:12px;">
                        {{$t('uc.login.forget')}}
                    </router-link>
                </p>
                <FormItem style="margin-bottom:10px;">
                    <Button
                        class="login_btn"
                        @click="handleSubmit('formInline')"
                    >
                        {{$t('uc.login.login')}}
                    </Button>
                </FormItem>
                <div class='to_register'>
                    <span>{{$t("uc.login.noaccount")}}</span>
                    <router-link to="/register">
                        {{$t("uc.login.register")}}
                    </router-link>
                </div>
            </Form>

        </div>
    </div>
</template>
<style scoped lang="scss">
/* 验证码 */
$primary-color: #3399ff;
.login_form {
    background: #fff url('../../assets/images/login_bg1.jpg') no-repeat center;
    height: 760px;
    position: relative;
    overflow: hidden;
    padding-top: 60px;
    .login_right {
        padding: 20px 30px 10px 30px;
        position: absolute;
        background: #fff;
        width: 350px;
        left: 50%;
        top: 50%;
        margin-left: -175px;
        margin-top: -165px;
        // box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
        border-top: 4px solid $primary-color;
        form.ivu-form.ivu-form-label-right.ivu-form-inline {
            .ivu-form-item {
                .ivu-form-item-content {
                    .login_btn.ivu-btn {
                        width: 100%;
                        background-color: $primary-color;
                        outline: none;
                        border-color: $primary-color;
                        color: #fff;
                        font-size: 18px;
                        border-radius: 30px;
                        &:focus {
                            box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
                        }
                    }
                }
            }
        }
    }
    .to_register {
        overflow: hidden;
        font-size: 12px;
        span {
            float: left;
        }
        a {
            float: right;
            color: $primary-color;
        }
    }
}

</style>
<script>
export default {
    data() {
        const pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        return {
            openGoogleCode: false,//是否开启google验证;
            openGoogle: "", //  获取谷歌验证状态
            /*添加短信验证 yangxiaoxi 5.29*/
            openPhoneCode: false,//是否开启Phone验证;
            sendMsgDisabled: false,
            codeTime: 60, // 发送验证码倒计时
            captchaObj: null,
            _captchaResult: null,
            formInline: {
                user: "",
                password: "",
                googleCode: "",
                phoneCode: ""
            },
            ruleInline: {
                password: [
                    {
                        required: true,
                        message: this.$t("uc.login.pwdvalidate1"),
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 6,
                        message: this.$t("uc.login.pwdvalidate2"),
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created: function () {
        this.init();
    },
    mounted:function(){
        document.getElementById("logo").style.height=document.documentElement.clientHeight+"px";
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        }
    },
    methods: {
       
        // /*手机发送验证码*/
        sendPhoneCode() {
            console.log(this)
            let me = this;
            //获取手机code
            this.$http.post(this.host + "/uc/mobile/login/code",{
                phone: this.formInline.user
            }).then(response => {
                console.log(response)
                let resp = response.body;
                if (resp.code == 0) {
                    this.sendMsgDisabled = true;
                    let interval = window.setInterval(function() {
                        if (me.codeTime-- <= 0) {
                            me.codeTime = 60;
                            me.sendMsgDisabled = false;
                            window.clearInterval(interval);
                        }
                    }, 1000);
                } else {
                    this.$Message.error(resp.message);
                }
            });
        },
        //用户名输入以后判断用户是否开启谷歌验证
        userBlur() {
            const pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            let tel = this.formInline.user;
            if (pattern.test(tel) || reg.test(tel)) {
                this.isNeedGoogle(tel).then(res => {
                    console.log(res)
                    if (res == 1) {//1为开启谷歌验证
                        this.openGoogleCode = true;
                        this.openPhoneCode = false;
                    } else if (res == 2) {//2为开启手机验证
                        this.openGoogleCode = false;
                        this.openPhoneCode = true;
                    } else {
                        this.openGoogleCode = false;
                        this.openPhoneCode = false;
                    }
                    
                })
            }
        },
        init() {
            if (this.isLogin) {
                this.$router.push("/");
            }
        },
        onKeyup(ev) {
            if (ev.keyCode == 13) {
                $(".login_btn").click();
            }
        },
        initGtCaptcha() {
            var self = this;
            var captcha1 = new TencentCaptcha("2038419167", (res) => {
                res.ret == 0 && (self.ticket = res.ticket) && (self.randStr = res.randstr) && self.success(res.ticket, res.randstr);//腾讯防水验证成功的回调
            });
            captcha1.show(); // 显示验证码
        },
        /**验证用户是否开启了谷歌验证  返回值1为开启*/
        isNeedGoogle(tel) {
            return this.$http.post(this.host + '/uc/get/user', { mobile: tel }).then(res => {
                const resp = res.body;
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
                randStr:randstr
            };
            const formParams = this.formInline;
            params.username = formParams.user;
            params.password = formParams.password;
            if (this.openGoogleCode) {
                params.code = formParams.googleCode
            }
            if (this.openPhoneCode) {
                params.sms = this.formInline.phoneCode;
            }
            return this.login(params);
        },
        loginCheck () {
            // 新加代码
            // 判断手机号邮箱不能为空
            if(!this.formInline.user) {
                this.$Message.error(this.$t("uc.login.loginvalidate"));
                return false
            }
            // 判断是否绑定谷歌
            if(this.openGoogleCode) {
                // this.openPhoneCode = false;
                // 判断谷歌验证码不能为空
                if (!this.formInline.googleCode) {
                    this.$Message.error(this.$t("uc.login.google"));
                    return false
                } else  {
                    this.initGtCaptcha();
                }
            } else if(this.openPhoneCode) {
                  // // 判断手机验证码不能为空
                if (!this.formInline.phoneCode) {
                    this.$Message.error(this.$t("uc.login.phone"));
                    return false
                } else  {
                    this.initGtCaptcha();
                }
                // 谷歌验证调用
                //this.initGtCaptcha();

            }else {
                // // 判断手机验证码不能为空
                // if (!this.formInline.phoneCode) {
                //     this.$Message.error(this.$t("uc.login.phone"));
                //     return false
                // } else  {
                //     this.initGtCaptcha();
                // }
                // 谷歌验证调用
                this.initGtCaptcha();
            }
        },
        handleSubmit(name) {
            // 5.20修改
            
             this.$refs[name].validate(valid => {
                 //首先验证输入的内容是否通过验证;通过验证的话调取腾讯防水
                if (valid) {
                    this.loginCheck()
                    const params = {};
                    const formParams = this.formInline;
                    params.username = formParams.user;
                    params.password = formParams.password;
                    params.code = formParams.googleCode;
                }
            })
        },
        login(params) {
            this.$http.post(this.host + this.api.uc.login, params).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t("uc.login.success"));
                        this.$store.commit("setMember", response.body.data);
                        if (
                            this.$route.query.key != null &&
                            this.$route.query.key != ""
                        ) {
                            localStorage.setItem("USERKEY", this.$route.query.key);
                        }
                        this.$router.push("/");
                    } else {
                        this.$Message.error(resp.message);
                    }
                });
        }
    },
};
</script>
<style lang="scss">
$changeColor:#f5f5f5;
$white:#fff;
.login_form {
    .login_right {
        form.ivu-form.ivu-form-label-right.ivu-form-inline {
            .ivu-form-item {
                .ivu-form-item-content {
                    .ivu-input-wrapper.ivu-input-type {
                        .ivu-input {
                            font-size: 14px;
                            border: none;
                            border-bottom: 1px solid $changeColor;
                            &:focus {
                                border: none;
                                border-bottom: 1px solid $changeColor;
                                box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
