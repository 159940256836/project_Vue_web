<template>
  <div class="login_form">
    <div class="login_right">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <div class="login_title">{{$t('uc.login.login')}}</div>
        <FormItem prop="user">
          <Input name="user" type="text" v-model="formInline.user" :placeholder="$t('uc.login.usertip')" class="user">
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" :placeholder="$t('uc.login.pwdtip')" @on-keyup="onKeyup">
          </Input>
        </FormItem>
        <p id="notice" class="hide">{{$t('uc.login.validatemsg')}}</p>
        <p style="height:25px;">
          <router-link to="/findPwd" style="color:#979797;float:right;padding-right:10px;font-size:12px;">
            {{$t('uc.login.forget')}}
          </router-link>
        </p>
        <FormItem style="margin-bottom:10px;">
          <Button class="login_btn">{{$t('uc.login.login')}}</Button>
        </FormItem>
        <div class='to_register'>
          <span>没有BIHUO账号</span>
          <router-link to="/register">立即注册</router-link>
        </div>
      </Form>

    </div>
  </div>
</template>
<style scoped lang="scss">
/* 验证码 */
.login_form {
  background: #fff url(../../assets/images/login_bg.jpg) no-repeat center center;
  height: 760px;
  position: relative;
  overflow: hidden;
  .login_right {
    padding: 20px 30px 10px 30px;
    position: absolute;
    background: #fff;
    width: 350px;
    height: 330px;
    left: 50%;
    top: 50%;
    margin-left: -175px;
    margin-top: -165px;
    -moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    border-top: 4px solid #f0ac19;
    form.ivu-form.ivu-form-label-right.ivu-form-inline {
      .ivu-form-item {
        .ivu-form-item-content {
          .login_btn.ivu-btn {
            width: 100%;
            background-color: #f0ac19;
            outline: none;
            border-color: #f0ac19;
            color: #fff;
            font-size: 18px;
            border-radius: 30px;
            &:focus {
              -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
              -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
              box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
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
      color: #f0ac19;
    }
  }
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
.geetest_wait_dot geetest_dot_1 {
  color: red;
}
.user .ivu-btn,
.ivu-btn:active,
.ivu-btn:focus {
  border-color: #d7dde4;
  box-shadow: none;
}
/*  */
</style>
<script>
import gtInit from "../../assets/js/gt.js";
import $ from "jquery";
export default {
  data() {
    return {
      captchaObj: null,
      _captchaResult: null,
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: this.$t("uc.login.loginvalidate"),
            trigger: "blur"
          }
        ],
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
  created: function() {
    this.init();
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    init() {
      if (this.isLogin) {
        this.$router.push("/");
      } else {
        this.initGtCaptcha();
      }
    },
    onKeyup(ev) {
      if (ev.keyCode == 13) {
        $(".login_btn").click();
      }
    },
    initGtCaptcha() {
      var that = this;
      this.$http.get(this.host + this.api.uc.captcha).then(function(res) {
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt: res.body.gt,
            challenge: res.body.challenge,
            offline: !res.body.success, //表示用户后台检测极验服务器是否宕机
            new_captcha: res.body.new_captcha, //用于宕机时表示是新验证码的宕机
            product: "bind",
            width: "100%"
          },
          this.handler
        );
      });
    },
    handler(captchaObj) {
      captchaObj
        .onReady(() => {
          $("#wait").hide();
        })
        .onSuccess(() => {
          let result = (this._captchaResult = captchaObj.getValidate());
          if (!result) {
            this.$Message.error("请完成验证");
          } else {
            this.handleSubmit("formInline");
          }
        });
      $(".login_btn").click(() => {
        let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
          tel = this.formInline.user,
          flagtel = reg.test(tel),
          flagpass = this.formInline.password.length >= 6 ? true : false;
        flagtel && flagpass && captchaObj.verify();
        (!flagtel || !flagpass) && this.$Message.error("请填写完整的信息");
      });
    },
    logout() {
      this.$http.post(this.host + "/uc/logout", {}).then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          localStorage.setItem("MEMBER", JSON.stringify(null));
          localStorage.setItem("TOKEN", null);
          localStorage.removeItem("USERKEY", null);
        } else {
          // this.$Message.error(resp.message);
        }
      });
    },
    handleSubmit(name) {
      var result = this._captchaResult;
      if (!result) {
        $("#notice").show();
        setTimeout(function() {
          $("#notice").hide();
        }, 2000);
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            var params = {};
            params["username"] = this.formInline.user;
            params["password"] = this.formInline.password;
            this.$http
              .post(this.host + this.api.uc.login, params)
              .then(response => {
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
          } else {
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
.login_form {
  .login_right {
    form.ivu-form.ivu-form-label-right.ivu-form-inline {
      .ivu-form-item {
        .ivu-form-item-content {
          .ivu-input-wrapper.ivu-input-type {
            .ivu-input {
              font-size: 14px;
              border: none;
              border-bottom: 1px solid #f5f5f5;
              &:focus {
                border: none;
                border-bottom: 1px solid #f5f5f5;
                -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
                -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
                box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
