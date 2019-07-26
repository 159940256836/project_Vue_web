<template>
    <div class="specail">
        <!-- <div class="header-title">
            <span>{{$t('openGoolePage._openGoogle')}}</span>
            <span @click="returnSuperior">
                <Icon type="ios-undo" style="font-size: 18px;" />
                {{$t('openGoolePage._returnSetting')}}
            </span>
        </div> -->
        <div class="wrapper">
            <div class="qrclass">
                <img src="../../assets/images/goole_Android.png" alt="">
                <div>{{$t('openGoolePage._downloadAndroid')}}</div>
            </div>
            <div class="qrclass" style="border-right:1px dashed #8090AF;margin-right:30px;padding-right:30px;">
                <img src="../../assets/images/goole_IOS.png" alt="">
                <div>{{$t('openGoolePage._downloadIos')}}</div>
            </div>
            <div class="qrflex">
                <div id="qrcodeFrist"></div>
                <div class="abstract">
                    <p>{{$t('openGoolePage._googleVerifyabs')}}</p>
                    <p>
                        <span>{{dataSecret.secret}}</span>
                        <span
                            v-clipboard:copy="dataSecret.secret"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError"
                          class="blue"
                        >
                            <img src="@/assets/images/copy_icon.png" alt="加载失败">
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <ul>
            <li>{{$t('openGoolePage._abs1')}}</li>
            <li>{{$t('openGoolePage._abs2')}}</li>
            <li>{{$t('openGoolePage._abs3')}}</li>
        </ul>
        <Form
            :model="formCode"
            label-position="top"
            :rules="ruleInline"
            ref="formCode"
            class="form"
        >
            <FormItem :label="$t('openGoolePage._GoogleVerificationCode')" prop="code">
                <Input v-model="formCode.code"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" style="width:100%;border-radius:0;height:40px;font-size:14px;" @click="sure('formCode')">{{$t('openGoolePage._sure')}}</Button>
            </FormItem>
        </Form>

    </div>
</template>
<script>
import QRCode from 'qrcode2'
// import { minHeightMinx } from "../../minxs/minxs.js"
export default {
    // mixins: [minHeightMinx],
  name: 'Resetgooglevali',
  data() {
    return {
      dataSecret: {},
      formCode: {
        code: ''
      },
      ruleInline: {
        code: [{ required: true, message: this.$t('openGoolePage._mustFill'), trigger: 'blur' }]
      }
    }
  },
  async created() {
        // await this.init()
        // console.log(this.dataSecret);
            //     .then(res => {
            //
            // // const { link, secret } = res;
            // // this.data = { link: "otpauth://totp/6@bitrade.com?secret=SHYT6OFT5C4H24MG", secret: "SHYT6OFT5C4H24MG" };
            // this.data = {
            //     link: res.link,
            //     secret: res.secret
            // }
            // this.$nextTick(() => {
            //     console.log(this.dataSecret);
            //     const link = this.dataSecret.link;
            //     new QRCode(document.getElementById("qrcodeFrist"), {
            //         text: link,
            //         width: 128,
            //         height: 128,
            //         colorDark: "#000000",
            //         colorLight: "#ffffff",
            //     });
            // })
        // })
  },
  methods: {
        // 点击返回上个页面
    returnSuperior() {
      this.$router.push({ path: '/account' })
    },
    async init() {
      this.$http.get(this.host + `/uc/google/sendgoogle`).then(res => {
        const resp = res.body
        if (resp.code == 0) {
          this.dataSecret = resp.data
                    /* console.log(this.dataSecret, this.dataSecret.link, this.dataSecret.secret);*/

          new QRCode(document.getElementById('qrcodeFrist'), {
            text: this.dataSecret.link,
            width: 75,
            height: 75,
            colorDark: '#000000',
            colorLight: '#ffffff'
          })
        } else {
          this.$Notice.error(resp.message)
        }
      })
    },
    onCopy(e) {
      this.$Notice.success({
        title: this.$t('common.tip'),
        desc: this.$t('common.copySuccess')
      })
    },
    onError() {
      this.$Notice.error({
        title: this.$t('common.tip'),
        desc: this.$t('common.copyFail')
      })
    },
    sure(name) {
      this.$refs[name].validate(valid => {
        console.log(valid)
        if (valid) {
          const codes = this.formCode.code
                    // 验证用户输入的code码是否正确;
          this.reset({ codes, secret: this.dataSecret.secret })
        } else {
          this.$Notice.error({
            title: this.$t('common.tip'),
            desc: this.$t('openGoolePage._googleCodeRequire')
          })
        }
      })
            // if (this.formCode.code) {
            //     const codes = this.formCode.code;
            //     //验证用户输入的code码是否正确;
            //     this.reset({ codes, secret: this.dataSecret.secret });
            // } else {
            //     this.$Notice.error({
            //         title: this.$t("common.tip"),
            //         desc: this.$t("openGoolePage._googleCodeRequire"),
            //     })
            // }
    },
        // validCode(params) {//验证用户输入的code码是否正确;
        //     this.$http.post(this.host + "/uc/google/yzgoogle", params).then(res => {
        //         const resp = res.body;
        //         if (resp.code == 0) {
        //             params.secret = this.data.secret;
        //             this.reset(params);
        //         }
        //     })
        // },
    reset(params) { // 验证用户是否可以绑定或者修改成功;
      this.$http.post(this.host + '/uc/google/googleAuth', params).then(res => {
        const resp = res.body
        if (resp.code == 0) {
            this.$emit('closeGoogle')
            this.$Message.success(resp.message)
        } else {
            this.$Message.error(resp.message)
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
%flex {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
$color: #2d8cf0;
.specail {
    color: #8090AF;
    padding: 0 27px;
    overflow: hidden;
    .header-title {
        height: 50px;
        line-height: 50px;
        color: #333;
        font-size: 14px;
        padding: 0 25px;
        border-bottom: 1px solid #eee;
        background: #fafafd;
        box-sizing: border-box;
        margin-bottom: 50px;
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
    .wrapper {
        @extend %flex;
         margin-bottom: 30px;
        .blue {
            cursor: pointer;
            color: #fff;
            display: inline-block;
            margin-left: 5px;
            font-size: 12px;
            vertical-align: top;
        }
    }
    #qrcodeFrist {
        line-height: 2;
        width: 80px;
        height: 80px;
        padding: 2px;
        background: #fff;
    }
    .abstract {
        padding-top:8px;
    }
    ul li {
        list-style-type: none;
        line-height: 2;
    }
    .form {
        margin-top: 40px;
        background-color: transparent;
    }

    .ivu-form-item-required .ivu-form-item-label:before {
        content: ''
    }
}
    .qrflex{
        top: 10px;
        position: relative;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
            text-align: center;
    }
.qrclass{
    display: inline-block;
    text-align: center;
    margin-bottom: 25px;
    margin-right: 60px;
}
</style>
<style lang="scss">
.common.specail .ivu-input {
    background-color: transparent;
    border: 1px solid #8090AF;

    // &:hover {
    //     border-color: #3399ff;
    // }
}

.specail {
    .ivu-form-item {
        margin-bottom: 30px;
    }

    .ivu-form-item-label {
        color: #8090AF !important;
        font-size: 14px;
    }

    .ivu-input {
        height: 40px;
        margin-top: 10px;
        background-color: transparent;
        border: 1px solid #8090AF;
        border-radius: 0;
        color: #fff;
    }
    .ivu-btn {
        border-radius: 0;

    }
    .ivu-form-item-required .ivu-form-item-label:before {
        content: ''
    }
}


</style>

