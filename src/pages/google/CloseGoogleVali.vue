<template>
    <div class="openGoogleModal common">
        <!-- <Modal v-model="openGoogleModal" :title="title" :footer-hide="true"> -->
        <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="top">
            <FormItem label="手机号">
                <p style="background:rgb(247, 244, 253);padding:5px;font-size:16px;">{{phone|addStart}}</p>
            </FormItem>
            <FormItem label="短信验证码" prop="code">
                <Input type="text" v-model="formInline.code" placeholder="短信验证码">
                <Button slot="append" @click="getCode" :disabled="disabled">{{getCodeText}}</Button>
                </Input>
            </FormItem>
            <FormItem label="谷歌验证码" prop="googleCode">
                <Input type="text" v-model="formInline.googleCode" placeholder="谷歌验证码">
                </Input>
            </FormItem>
        </Form>
        <div class="btns" style="display:flex;justify-content:space-around;align-items:center;">
            <Button @click="cancel">取消</Button>
            <Button type="warning" @click="sureBtn('formInline')">确认</Button>
        </div>
        <!-- </Modal> -->
    </div>
</template>
<script>
import { minHeightMinx } from "../../minxs/minxs"
export default {
    mixins: [minHeightMinx],
    name: "closegoogleVali",
    data() {
        return {
            getCodeText: "获取验证码",
            phone: this.$route.params.phone,
            disabled: false,
            openGoogleModal: true,
            formInline: {
            },
            ruleInline: {
                code: [
                    { required: true, message: '请填写正确的验证码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请填写正确的验证码', trigger: 'blur' }
                ],
                googleCode: [
                    { required: true, message: '请填写正确的谷歌验证码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '请填写正确的谷歌验证码', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        if (this.$route.params.phone) {
            this.phone = this.$route.params.phone;
        } else {
            this.$router.go(-1);
        }
    },
    filters: {
        addStart(str) {
            return str.slice(0, 3) + "****" + str.slice(7)
        }
    },
    methods: {
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
                }
            })
        },
        sureBtn(name) {
            console.log(this.$refs[name].validate);
            this.$refs[name].validate((valid) => {
                console.log(valid);
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
                        this.getCodeText = "获取验证码";
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
                    //  this.$Notice.success({
                    // title: this.$t("common.tip"),
                    // desc: res.body.message
                //});
                } else {
                    this.$Notice.error({ title: this.$t("common.tip"), desc: res.body.message });
                }
            })
        }
    }

}
</script>
<style lang="scss" scoped>
.openGoogleModal {
    padding: 100px 35%;
    overflow: hidden;
    min-height: 609px !important;
}
</style>


