<template>
    <div class="openGoogle common">
        <div class="openGoogleModal">
            <!-- <Modal v-model="openGoogleModal" :title="title" :footer-hide="true"> -->
            <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="top">
                <FormItem :label="$t('openGoolePage._phone')">
                    <p class="unchangeable">
                        {{phone|addStart}}
                        <!--{{ phone.substring(0,2)}}
                        ****
                        {{ phone.substring(9,11)}}-->
                    </p>
                </FormItem>
                <FormItem :label="$t('openGoolePage._phoneCode')" prop="code" class="defeat-ivu">
                    <Input type="text" v-model="formInline.code" :placeholder="$t('openGoolePage._phoneCode')" style="width:300px;border-right: none;">s                     
                        <div class="timebox" slot="append">
                            <Button @click="getCode" :disabled="disabled">{{getCodeText}}</Button>
                        </div>
                    </Input>
                </FormItem>
                <FormItem :label="$t('openGoolePage._GoogleVerificationCode')" prop="googleCode">
                    <Input  type="text" v-model="formInline.googleCode" :placeholder="$t('openGoolePage._GoogleVerificationCode')" style="width:300px;">
                    </Input>
                </FormItem>
            </Form>
            <div class="btns" style="display:flex;justify-content:space-around;align-items:center;width:300px;margin-right: 59px;float: right;margin-top:10px;">
                <!-- <Button @click="cancel">{{$t('openGoolePage._cancel')}}</Button> -->
                <Button type="primary" @click="sureBtn('formInline')" style="width:100%;border-radius:0;">{{$t('openGoolePage._sure')}}</Button>
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
            },
            ruleInline: {
                code: [
                    { required: true, message: this.$t('openGoolePage._phoneCode'), trigger: 'blur' },
                    { type: 'string', min: 6, message: this.$t('openGoolePage._phoneCode'), trigger: 'blur' }
                ],
                googleCode: [
                    { required: true, message: this.$t('openGoolePage._GoogleVerificationCode'), trigger: 'blur' },
                    { type: 'string', min: 6, message: this.$t('openGoolePage._GoogleVerificationCode'), trigger: 'blur' }
                ]
            }
        }
    },
    props: ['phone'],
    // created() {
    //     if (this.$route.params.phone) {
    //         this.phone = this.$route.params.phone;
    //     } else {
    //         this.$router.push('/account');
    //     }
    //     // this.getMember()
    // },
    filters: {
        addStart(str) {
            if (str) {
                return str.slice(0, 3) + "****" + str.slice(8, 11)
            }
        }
    },
    methods: {
        // 点击返回上个页面
        returnSuperior () {
            this.$router.push({path: '/account'})
        },
        jcgoogle(params) {
            this.$http.post(this.host+"/uc/google/jcgoogle",params).then(res=>{
                const resp = res.body;
                if(resp.code == 0){
                    this.$Notice.success({
                        title: this.$t("common.tip"),
                        desc: resp.message
                    });
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },1000)
                }else{
                    this.$Notice.error({
                        title: this.$t("common.tip"),
                        desc: resp.message
                    });
                }
            })
        },
        sureBtn(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    const formInline = this.formInline;
                    const params = {
                        smsCode:formInline.code,
                        codes:formInline.googleCode
                    }
                    this.jcgoogle(params);
                }
            })
        },
        cancel() {
            this.$router.go(-1);
        },
        getCode() {
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
        },
        getPhoneCode() {
            return this.$http.post(this.host + "/uc/mobile/google/code", {}).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        resolve();
                    })
                } else {
                    this.$Notice.error({ title: this.$t("common.tip"), desc: res.body.message });
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.openGoogle {
    margin: 0 auto;
    .openGoogleModal .ivu-btn-warning{
        background:#3399ff !important;
        border-color:#3399ff !important;
    }
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
.openGoogle {
    color: red;
    .ivu-form-item-required .ivu-form-item-label:before {
        content: ''
    }
    .ivu-input {
        border-radius: 0;
        background: transparent;
        color: #fff;
        
    }
    .ivu-form-item-label {
        vertical-align: none;
        width: 88px;
        padding-right: 12px;
        text-align: right;
        color: #8090AF;
    }
    .ivu-form-item-content {
        display: inline-block;
        
    }

    .ivu-form-item-error .ivu-input{
        border: 1px solid #8090AF;
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
        .ivu-form-item-label {
            vertical-align: top;
            margin-top: 10px;
        }
        .ivu-form-item-error .ivu-input{
            border: 1px solid #8090AF;
            border-right: none;
        }
        .ivu-input{
            border: 1px solid #8090AF;
            border-right: none;
        }
        .timebox {
        border-left: 1px solid #8090AF;
        }
    }

    .ivu-form-item-error .ivu-input{
        border: 1px solid #8090AF;
        border-right: none;
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

}

</style>



