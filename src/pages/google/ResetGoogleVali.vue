<template>
    <div class="specail" style="min-height:519px;">
        <div class="wrapper">
            <div class="qrclass">
                <img src="../../assets/images/goole_Android.png" alt="">
                <div>android谷歌验证器下载</div>
            </div>
            <div class="qrclass">
                <img src="../../assets/images/goole_IOS.png" alt="">
                <div>ios谷歌验证器下载</div>
            </div>
            <div class="qrflex">
                  <div id="qrcode"></div>
            <div class="abstract">
                <p>秘钥用于找回谷歌验证器请妥善保存</p>
                <p>
                    <span>{{data.secret}}</span>
                    <span v-clipboard:copy="data.secret" v-clipboard:success="onCopy" v-clipboard:error="onError" class="blue">复制</span>
                </p>
            </div>
            </div>
        </div>
        <ul>
            <li>①在手机谷歌验证器APP右上角点击加号，扫描网页上的二维码或输入网页提供的密钥</li>
            <li>②在谷歌验证器上绑定新的谷歌密钥，在网页输入新的谷歌验证吗</li>
            <li>③然后依次验证币多账号绑定的手机短信验证码、邮箱验证码、原有谷歌验证码，完成谷歌验证码更换</li>
        </ul>
        <Form :model="formCode" label-position="top" :rules="ruleInline" ref="formCode" class="form">
            <FormItem label="谷歌验证码" prop="code">
                <Input v-model="formCode.code"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" style="width:100%;" @click="sure('formCode')">确定</Button>
            </FormItem>
        </Form>

    </div>
</template>
<script>
import QRCode from 'qrcode2';
import { minHeightMinx } from "../../minxs/minxs.js"
export default {
    mixins: [minHeightMinx],
    name: "resetgooglevali",
    data() {
        return {
            data: {
                link: "",
                secret: ""
            },
            formCode: {
                code: ""
            },
            ruleInline: {
                code: [{ required: true, message: '必填项', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.init().then(res => {
            // const { link, secret } = res;
            // this.data = { link: "otpauth://totp/6@bitrade.com?secret=SHYT6OFT5C4H24MG", secret: "SHYT6OFT5C4H24MG" };
            this.data = {
                link: res.link,
                secret: res.secret
            }
            this.$nextTick(() => {
                const link = this.data.link;
                new QRCode(document.getElementById("qrcode"), {
                    text: link,
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                });
            })

        })
    },
    methods: {
        init() {
            return this.$http.get(this.host + `/uc/google/sendgoogle`).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        resolve(resp.data)
                    })
                } else {
                    this.$Notice.error("获取谷歌认证器失败");
                }
            })
        },
        onCopy(e) {
            this.$Notice.success({
                title: this.$t("common.tip"),
                desc: "复制成功"
            })
        },
        onError() {
            this.$Notice.error({
                title: this.$t("common.tip"),
                desc: "复制失败"
            })
        },
        sure(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    const codes = this.formCode.code;
                    //验证用户输入的code码是否正确;
                    this.reset({ codes, secret: this.data.secret });
                } else {
                    this.$Notice.erroe({
                        title: this.$t("common.tip"),
                        desc: '谷歌验证码为必填项'
                    })
                }
            })
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
        reset(params) {//验证用户是否可以绑定或者修改成功;
            this.$http.post(this.host + "/uc/google/googleAuth", params).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    this.$Notice.success({
                        title: this.$t("common.tip"),
                        desc: "谷歌验证成功"
                    });
                    setTimeout(() => {
                        this.$router.push('/uc/safe')
                    })
                }else{
                    this.$Notice.error({
                        title: this.$t("common.tip"),
                        desc:resp.message
                    });
                }
            })
        }
    },
    mounted() {
        const link = this.data.link;


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
    padding: 100px 25%;
    overflow: hidden;
    .wrapper {
        @extend %flex;
         margin-bottom: 30px;
        .blue {
            color: $color;
        }
    }
    #qrcode {
        width: 80px;
        line-height: 2;
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
        background-color: #fff;
    }
}
    .qrflex{
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
    background-color: #fff;
    border: 1px solid #eee;
    color: #000;
    &:hover {
        border-color: #3399ff;
    }
}
</style>

