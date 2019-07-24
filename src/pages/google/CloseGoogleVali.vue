<template>
    <div class="openGoogle common" id="openGoogle">
        <div class="openGoogleModal">
            <!-- <Modal v-model="openGoogleModal" :title="title" :footer-hide="true"> -->
            <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="top">
                <FormItem
                    :label="isCode == 2?$t('openGoolePage._phone'):$t('uc.forget.email')"
                >
                    <p class="unchangeable" style="height:40px;line-height:40px;">
                        {{phone|addStart}}
                        <!--{{ phone.substring(0,2)}}
                        ****
                        {{ phone.substring(9,11)}}-->
                    </p>
                </FormItem>
                <!-- 手机验证码 -->
                <FormItem
                    :label="$t('openGoolePage._phoneCode')"
                    prop="code"
                    class="defeat-ivu"
                    v-if="isCode == 2"
                >
                    <Input
                        type="text"
                        v-model="formInline.code"
                        :placeholder="$t('openGoolePage._phoneCode')"
                        style="width:300px;border-right: none;"
                    >
                        <div class="timebox" slot="append">
                            <Button
                                @click="getCode(1)"
                                :disabled="disabled"
                            >
                                {{getCodeText}}
                            </Button>
                        </div>
                    </Input>
                </FormItem>
                <!--邮箱验证码 6.06-->
                <FormItem
                    class="code-title"
                    :label="$t('uc.forget.emailcode')"
                >
                    <Input
                        style="width: 300px;"
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
                                @click="getCode(2)"
                                :disabled="sendEmailDisabled"
                            >
                                <span v-if="sendEmailDisabled">
                                    {{codeTime1+$t('uc.safe.second')}}
                                </span>
                                <span v-if="!sendEmailDisabled">
                                    {{$t('uc.safe.clickget')}}
                                </span>
                            </div>
                        </div>
                    </Input>
                </FormItem>
                <!--谷歌验证-->
                <FormItem
                    :label="$t('openGoolePage._GoogleVerificationCode')"
                >
                    <Input
                        type="text"
                        v-model="formInline.googleCode"
                        :placeholder="$t('openGoolePage._GoogleVerificationCode')"
                        style="width:300px;height:40px;"
                    >
                    </Input>
                </FormItem>
            </Form>
            <div class="btns" style="display:flex;justify-content:space-around;align-items:center;width:300px;margin-right: 59px;float: right;margin-top:10px;">
                <!-- <Button @click="cancel">{{$t('openGoolePage._cancel')}}</Button> -->
                <Button
                    type="primary"
                    @click="sureBtn('formInline')"
                    style="width:100%;border-radius:0;margin-bottom:30px;height:40px;"
                >
                    {{$t('openGoolePage._sure')}}
                </Button>
            </div>
            <!-- </Modal> -->
        </div>
    </div>

</template>
<script>
// import { minHeightMinx } from "../../minxs/minxs"
export default {
    // mixins: [minHeightMinx],
    name: "closegoogleVali",
    data() {
        return {
            getCodeText: this.$t('openGoolePage._sendCode'),
            disabled: false,
            openGoogleModal: true,
            formInline: {
                code: '',
                emailCode: '',
                googleCode: ''
            },
            ruleInline: {
                code: [
                    { message: this.$t('openGoolePage._phoneCode'), trigger: 'blur' },
                    { type: 'string', min: 6, message: this.$t('openGoolePage._phoneCode'), trigger: 'blur' }
                ],
                emailCode: [
                    { message: this.$t('openGoolePage._emailCode'), trigger: 'blur' },
                    { type: 'string', min: 6, message: this.$t('openGoolePage._emailCode'), trigger: 'blur' }
                ],
                googleCode: [
                    { message: this.$t('openGoolePage._GoogleVerificationCode'), trigger: 'blur' },
                    { type: 'string', min: 6, message: this.$t('openGoolePage._GoogleVerificationCode'), trigger: 'blur' }
                ]
            },
            sendEmailDisabled: false, // 邮箱短信验证
            codeTime1: 60, // 邮箱短信验证倒计时
            isCode: '',
            isPhoneCode: false, // 是否绑定手机验证状态
            isEmailCode: false, // 是否绑定手机验证状态
            isGoogleCode: false, // 是否绑定谷歌验证状态
        }
    },
    props: ['phone'],
    created() {
        this.afetyVerification()
        console.log(this.status);
        console.log(this.props);
        // if (this.$route.params.phone) {
        //     this.phone = this.$route.params.phone;
        // } else {
        //     this.$router.push('/account');
        // }
        // this.getMember()
    },
    filters: {
        addStart(str) {
            console.log(str);
            if (str) {
                return str.slice(0, 3) + "****" + str.slice(8, 19)
            }
        }
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
                console.log(this.isCode);
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
        // 点击返回上个页面
        returnSuperior () {
            this.$router.push({path: '/account'})
        },
        jcgoogle(params) {
            console.log(params);
            this.$http.post(this.host+"/uc/google/jcgoogle",params).then(res=>{
                const resp = res.body;
                if(resp.code == 0){
                    this.$Message.success(resp.message)
                    setTimeout(()=>{
                        this.$router.go(0);
                    },1000)
                }else{
                    this.$Message.error(resp.message)
                }
            })
        },
        sureBtn(name) {
            console.log(name);
            // this.$refs[name].validate((valid) => {
            //     console.log(valid);
            //     if (valid) {
                    const formInline = this.formInline;
                    const params = {
                        smsCode:this.isCode == 2?formInline.code:formInline.emailCode,
                        codes:formInline.googleCode
                    }
                    this.jcgoogle(params);
            //     }
            // })
        },
        cancel() {
            this.$router.go(-1);
        },
        getCode(index) {
            let me = this
            if (index == 1) {
                this.getPhoneCode().then(res => {
                    let count = 60;
                    this.disabled = true;
                    const timer = setInterval(() => {
                        this.getCodeText = --count;
                        if (count <= 0) {
                            clearInterval(timer);
                            this.getCodeText =  this.$t('openGoolePage._sendCode');
                            this.disabled = false;
                        }
                    }, 1000);
                })
            } else if (index == 2) {
                // 获取邮箱code
                this.$http.post('http://192.168.124.15:6001' + '/uc/unbind/google/email/code').then(response => {
                    const resp = response.body
                    if (resp.code == 0) {
                        me.sendEmailDisabled = true
                        const interval = window.setInterval(function() {
                            if (me.codeTime1-- <= 0) {
                                me.codeTime1 = 60
                                me.sendEmailDisabled = false
                                window.clearInterval(interval)
                            }
                        }, 1000)
                    } else {
                        me.$Message.error(resp.message)
                    }
                })
            }

        },
        getPhoneCode() {
            return this.$http.post(this.host + "/uc/mobile/google/code", {}).then(res => {
                const resp = res.body;
                console.log(resp);
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        resolve();
                    })
                } else {
                    this.$Notice.error({ title: this.$t("common.tip"), desc: res.body.message });
                }
            })
        }
    },
    watch: {

    }
}
</script>
<style lang="scss" scoped>
#openGoogle {
    .button-code {
        cursor: pointer;
    }
    margin: 0 auto;
    .openGoogleModal {
        overflow: hidden;
        .ivu-form-item-content {
            p {
                padding: 0;
            }
        }
    }
    .header-title {
        height: 50px;
        line-height: 50px;
        color: #333;
        font-size: 14px;
        padding: 0 25px;
        border-bottom: 1px solid #eee;
        background: #fafafd;
        box-sizing: border-box;
        span {
            &:first-child {
                float: left;
                font-weight: 600;
            }
            &:last-child {
                float: right;
                cursor: pointer;
            }
        }
    }
}

</style>

<style lang="scss">
#openGoogle{
    color: red;
    .ivu-form-item-required .ivu-form-item-label:before {
        content: ''
    }
    .ivu-input {
        height: 40px;
        border-radius: 0;
        background: transparent;
        border: 1px solid #8090AF;
        color: #fff;
    }
    .ivu-form-item {
        height: 40px;
        /*margin-bottom: 30px;*/
    }
    .ivu-input-large {
            border: 1px solid #8090AF;
        }

    /*.ivu-input-large:hover,*/
    /*.ivu-input-large:focus,*/
    /*.ivu-input-large:active {*/
    /*    border:#8090AF;*/
    /*}*/

    .ivu-form-item-error .ivu-input {
            border-color: #8090AF;
    }


    .ivu-form-item-error {
        .ivu-input-large:hover,
        .ivu-input-large:focus,
        .ivu-input-large:active {
            border-color: #8090AF;
        }
    }


    .ivu-form-item {
        &:nth-child(2) {
            .ivu-form-item-label {
                margin-top: -30px;
            }
        }
    }
    .ivu-form-item-label {
        vertical-align: none;
        width: 88px;
        height: 40px;
        line-height: 40px;
        padding-right: 12px;
        /*text-align: right;*/
        color: #8090AF;

    }
    .ivu-form-item-content {
        display: inline-block;

    }


    .ivu-btn-default {
        color: #3399FF;
        background: transparent;
        border-radius: 0;
    }
    .ivu-input-group-append,
    .ivu-input-group-prepend {
        background: transparent;
        color: #3399FF;
        border: 1px solid #8090AF;
        border-left: none;
        border-radius: 0;
    }
    .ivu-form-item-error .ivu-input-group-append,
    .ivu-form-item-error .ivu-input-group-prepend {
        background: transparent;
        color: #3399FF;
        border: 1px solid #8090AF;
        border-left: none;
        border-radius: 0;
    }

    .defeat-ivu {
        .ivu-btn-default {
            color: #3399FF;
            background: transparent;
            border: none;
            border-radius: 0;
        }
        .ivu-form-item-label {
            vertical-align: top;
            /*margin-top: 10px;*/
        }
        .ivu-input{
            border: 1px solid #8090AF;
            border-right: none;
        }
        .timebox {
            cursor: pointer;
            border-left: 1px solid #8090AF;
        }
        .ivu-btn:focus {
            -webkit-box-shadow: none;
            box-shadow: none;
        }
    }


    .ivu-form-item-content {
        line-height: 30px;
        .unchangeable {
            padding: 0;
            background: transparent;
            width: 300px;
            font-size:16px;
            border: 1px solid #8090AF;
        }
    }

    .ivu-btn.disabled, .ivu-btn.disabled.active,
    .ivu-btn.disabled:active, .ivu-btn.disabled:focus,
    .ivu-btn.disabled:hover,
    .ivu-btn[disabled], .ivu-btn[disabled].active,
    .ivu-btn[disabled]:active, .ivu-btn[disabled]:focus,
    .ivu-btn[disabled]:hover,
    fieldset[disabled] .ivu-btn, fieldset[disabled] .ivu-btn.active,
    fieldset[disabled] .ivu-btn:active,
    fieldset[disabled] .ivu-btn:focus,
    fieldset[disabled] .ivu-btn:hover {
        background: transparent;
        color: #3399FF;
    }
}

</style>



