<template>
  <div class="rejs">
    <div class="topa"></div>
    <div class="tob_b">
      <div @click="regMax(1)" :class="tabId==1? 'actives':''">手机注册</div>
      <div @click="regMax(2)" :class="tabId==2? 'actives':''" class="right">邮箱注册</div>
    </div>
    <div
      class="content"
      v-show="tabId==1"
      style="padding: 0.2rem 0.8rem;"
    >
      <i-select :model.sync="model9" style="width:5.74rem" v-model="country">
        <i-option value="中国" label="中国">
          <span>中国</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
        <i-option value="美国" label="美国">
          <span>美国</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
        <i-option value="香港" label="香港">
          <span>香港</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
        <i-option value="新加坡" label="新加坡">
          <span>新加坡</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
        <i-option value="中国台湾" label="中国台湾">
          <span>中国台湾</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
      </i-select>
      <div class="phone">
        <input placeholder="输入用户名" v-model="username">
      </div>
      <div class="phone">
        <input placeholder="输入手机号" v-model="telname" maxlength="11">
      </div>
      <div class="phone" style="display:flex;">
        <input style="width:5rem" v-model="checkcode" placeholder="短信验证码" maxlength="6">
        <span
          @click="initGtCaptcha()"
          :class="setnum1!='获取验证码'?'dis':''"
          style="color:#3399FFFF; display:inline-block; width:2rem;height:0.58rem;line-height:0.58rem;border:1px solid rgba(51,153,255,1); border-radius:29rem;font-size: 0.2rem; text-align:center; margin-top:0.15rem"
        >{{setnum1}}</span>
      </div>
      <div class="phone">
        <input type="password" v-model="newpwd" maxlength="18" placeholder="请输入8-16位字母加数字登录密码">
      </div>
      <div class="phone">
        <input type="password" v-model="pwdagain" maxlength="18" placeholder="请确认登录密码">
      </div>
      <div class="phone">
        <input v-model="agentcode" placeholder="邀请码">
      </div>
      <div class="check-agree" style="margin-top:0.16rem; font-size:0.24rem;color:#CCCCCCFF">
        <label>
          <Checkbox v-model="agreee">我已阅读并同意</Checkbox>
        </label>
        <router-link
          to="/Usereement"
          style="color:#CCCCCCFF; font-size:0.2rem; position:relative; left:-0.2rem"
        >《用户名协议》</router-link>
        <!--<a href="#/helpdetail?cate=1&id=9&cateTitle=常见问题" target="_blank" style="">《{{$t('uc.regist.userprotocol')}}》</a>-->
      </div>
      <div class="btn">
        <button @click="handleSubmita">注册</button>
      </div>
    </div
    >
    <div
      class="content"
      v-show="tabId==2"
      style="padding: 0.2rem 0.8rem;"
    >
      <i-select :model.sync="model9" style="width:5.74rem" v-model="country1">
        <i-option value="中国" label="中国">
          <span>中国</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
        <i-option value="美国" label="美国">
          <span>美国</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
        <i-option value="香港" label="香港">
          <span>香港</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
        <i-option value="新加坡" label="新加坡">
          <span>新加坡</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
        <i-option value="中国台湾" label="中国台湾">
          <span>中国台湾</span>
          <span style="float:right;color:#ccc"></span>
        </i-option>
      </i-select>
      <div class="phone">
        <input placeholder="输入3-20位用户名" v-model="username1">
      </div>
      <div class="phone">
        <input placeholder="邮箱" v-model="email1">
      </div>
      <div class="phone" style="display:flex;">
        <input style="width:5rem" placeholder="邮箱验证码" v-model="emailcode">
        <span
          @click="eamilCode()"
          :class="setnum2!='获取验证码'?'dis':''"
          style="display:inline-block;color:#3399FFFF;width:2rem;height:0.58rem;line-height:0.58rem;border:1px solid rgba(51,153,255,1); border-radius:29rem; text-align:center; margin-top:0.15rem"
        >验证码</span>
      </div>
      <div class="phone">
        <input type="password" v-model="newpwd1" placeholder="请输入8-16位字母加数字登录密码">
      </div>
      <div class="phone">
        <input type="password" v-model="pwdagain1" placeholder="请确认登录密码">
      </div>
      <div class="phone">
        <input placeholder="邀请码" v-model="agentcode">
      </div>
      <div class="check-agree" style="margin-top:0.16rem; font-size:0.24rem;color:#CCCCCCFF">
        <label>
          <Checkbox v-model="agreee">我已阅读并同意</Checkbox>
        </label>
        <router-link
          class="ft-2"
          to="/Usereement"
          style="color:#CCCCCCFF;  position:relative; left:-0.2rem;font-size: 0.2rem;"
        >《用户名协议》</router-link>
        <!--<a href="#/helpdetail?cate=1&id=9&cateTitle=常见问题" target="_blank" style="">《{{$t('uc.regist.userprotocol')}}》</a>-->
      </div>
      <div class="btn">
        <button @click="initGtCaptcha2">注册</button>
      </div>
    </div
    >
  </div>
</template>
<script>
import $ from '@js/jquery.min.js'
import { setTimeout } from 'timers'
console.log(1)

export default {

  data() {
    return {
      tabId: 1,
      model9: '',
      telname: '',
      checkcode: '',
      emailcode: '',
      newpwd: '',
      pwdagain: '',
      agentcode: '',
      country: '中国',
      setnum1: '获取验证码',
      setnum2: '获取验证码',
      username: '',
      agreee: true,
      email1: '',
      username1: '',
      newpwd1: '',
      pwdagain1: '',
      country1: '中国'
    }
  },
  methods: {
    // 手机号注册
    handleSubmita() {
      const username = this.username
      const phone = this.telname
      const code = this.checkcode
      const password = this.newpwd
      const country = this.country
      const promotion = this.agentcode ? this.agentcode : ''

      // eslint-disable-next-line no-unused-vars
      const pwdagain = this.pwdagain
      const ticket = this.ticket
      const randStr = this.randStr
      const data = {
        username,
        phone,
        code,
        password,
        country,
        promotion,
        ticket,
        randStr
      }
      if (!data.country) {
        this.$Message.error('请选择国家')
        return false
      }
      if (!data.username) {
        this.$Message.error('请输入用户名')
        return false
      }
      if (!data.phone) {
        this.$Message.error('请输入电话号码')
        return false
      }
      if (!data.code) {
        this.$Message.error('请输入验证码')
        return false
      }
      if (!data.password) {
        this.$Message.error('请输入8-16位字母加数字登录密码')
        return false
      }
      if (this.newpwd != this.pwdagain) {
        this.$Message.error('两次密码不一致')
        return false
      }
      if (!this.agreee) {
        this.$Message.error('请同意')
        return false
      }
      // this.$http.post(this.host + '/uc/register/phone', data).then(response => {
      this.$http.post(this.host + '/uc/register/nweLoginByPhone', data).then(response => { // 新接口
        const res = response.body
        if (res.code == 0) {
          this.$Message.success(res.message)
          setTimeout(() => {
            window.location.href = 'https://download.bdw.top/'
          }, 2000)

          //  window.location.href="https://download.bdw.top/"
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    eamilCode() {
      const mobilePhone = this.email1
      if (mobilePhone != '') {
        this.$http.post(this.host + '/uc/email/registered/code', { 'email': mobilePhone }).then(response => {
          if (response.body.code === 0) {
            var count = 60
            this.timer = setInterval(() => {
              count--
              this.setnum2 = count
              if (count <= 0) {
                this.setnum2 = '获取验证码'
                clearInterval(this.timer)
              }
            }, 1000)
          }
          this.$Notice.success({ title: this.$t('common.tip'), desc: response.body.message })
        })
      } else {
        this.$Notice.error({ title: this.$t('common.tip'), desc: this.$t('uc.regist.emailtip') })
      }
    },
    // 发送验证码
    sendCode() {
      const phone = this.telname
      const country = this.country
      const data = { country, phone }
      var that = this
      if (this.setnum1 !== '获取验证码') {
        return false
      }
      if (!data.country) {
        this.$Message.error('请选择国家')
        return false
      }
      this.$http.post(this.host + '/uc/mobile/code', data).then(respo => {
        const resp = respo.body
        if (resp.code === 0) {
          // this.initGtCaptcha();
          this.$Message.success(resp.message)
          var count = 60
          that.timer = setInterval(() => {
            count--
            that.setnum1 = count
            if (count <= 0) {
              that.setnum1 = '获取验证码'
              clearInterval(that.timer)
            }
          }, 1000)
        } else {
          this.$Message.error(resp.message)
        }
      })
    },
    // 邮箱注册
    emailMax() {
      const username = this.username1
      const email = this.email1
      const code = this.emailcode
      const password = this.newpwd1
      const country = this.country1
      const promotion = this.agentcode ? this.agentcode : ''
      // eslint-disable-next-line no-unused-vars
      const pwdagain = this.pwdagain1
      const ticket = this.ticket1
      const randStr = this.randStr1
      const data = {
        username,
        code,
        email,
        password,
        country,
        promotion,
        ticket,
        randStr
      }
      if (!data.country) {
        this.$Message.error('请选择国家')
        return false
      }
      if (!data.username) {
        this.$Message.error('请输入用户名')
        return false
      }
      if (!data.email) {
        this.$Message.error('请输入邮箱')
        return false
      }
      const regg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
      if (!regg.test(this.email1)) {
        this.$Message.error('请输入正确的邮箱')
        return false
      }

      if (!data.password) {
        this.$Message.error('请输入8-16位字母加数字登录密码')
        return false
      }
      if (this.newpwd1 != this.pwdagain1) {
        this.$Message.error('两次密码不一致')
        return false
      }
      if (!this.agreee) {
        this.$Message.error('请同意')
        return false
      }
      // this.$http.post(this.host + '/uc/register/email', data).then(response => {
      this.$http.post(this.host + '/uc/register/mailVerificationRegistered', data).then(response => {
        console.log(response)
        const res = response.body
        if (res.code == 0) {
          this.$Message.success(res.message)
          setTimeout(() => {
            window.location.href = 'https://download.bdw.top/'
          }, 2000)
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    regMax(n) {
      this.tabId = n
    },
    initGtCaptcha2() {
      const username = this.username1
      const email = this.email1
      const code = this.emailcode
      const password = this.newpwd1
      const country = this.country1
      const promotion = this.agentcode ? this.agentcode : ''
      const pwdagain = this.pwdagain1
      const ticket = this.ticket1
      const randStr = this.randStr1
      const data = {
        username,
        email,
        code,
        password,
        country,
        promotion,
        ticket,
        randStr
      }
      if (!data.country) {
        this.$Message.error('请选择国家')
        return false
      }
      if (!data.username) {
        this.$Message.error('请输入用户名')
        return false
      }
      if (!data.email) {
        this.$Message.error('请输入邮箱')
        return false
      }
      if (!data.code) {
        this.$Message.error('请输入邮箱验证码')
        return false
      }
      if (!data.password) {
        this.$Message.error('请输入8-16位字母加数字登录密码')
        return false
      }
      if (this.newpwd1 != this.pwdagain1) {
        this.$Message.error('两次密码不一致')
        return false
      }
      if (!this.agreee) {
        this.$Message.error('请同意')
        return false
      }
      // 直接生成一个验证码对象
      const captcha1 = new TencentCaptcha('2087858432', res => {
        console.log(res)
        if (res.ret == 0) {
          this.ticket1 = res.ticket
          this.randStr1 = res.randstr
          console.log(this.randStr1)
          this.emailMax()
        }
      })
      captcha1.show() // 显示验证码
    },
    initGtCaptcha() {
      if (!this.telname) {
        this.$Message.error('请输入电话号码')
        return false
      }
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!reg.test(this.telname)) {
        this.$Message.error('请输入正确的手机号')
        return false
      }
      // 直接生成一个验证码对象
      const captcha1 = new TencentCaptcha('2038419167', res => {
        console.log(res)
        if (res.ret == 0) {
          this.ticket = res.ticket
          this.randStr = res.randstr

          this.sendCode()
        }

        // res.ret == 0 && (this.ticket = res.ticket) && (this.randStr = res.randstr);
        // (this.changeActive == 0) && this.success();
        // this.changeActive == 1 && this.emailSuccess();
      })
      captcha1.show() // 显示验证码
    }
  },
  mounted() {
    this.agentcode = (this.$route.query.agent && this.$route.query.agent != 'undefined') ? this.$route.query.agent : ''
  },
  component() {

    // metaInfo: {
    //   console.log(1);
    //   meta: [
    //     { charset: 'utf-8' },
    //     { name: 'viewport', content: 'width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1' }
    //   ]
    // }
  },
  created() {
    $("meta[name='viewport']").attr('content', '***')
    $('head').append('<meta http-equiv="refresh" content="width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1">')
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/index.css";

.rejs{
  background:#fff;
  .ft-2{
    font-size: 0.2rem !important;
  }
}
.btn {
  margin-top: 0.82rem;
  width: 6.07rem;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #3399ff;
  border-radius: 0.4rem;
  text-align: center;
  color: #fff;
  margin-left: -0.2rem;
  button {
    width: 5.07rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    background: #3399ff !important;
    border-radius: 0.4rem;
    text-align: center;
    color: #fff;
    outline: none;
    border: 0;
  }
}
.phone {
  width: 5.74rem;
  height: 0.89rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  input {
    margin-left: 0.14rem;
    width: 5.6rem;
    margin-top: 0.3rem;
    font-size: 0.28rem;
    outline: none;
    border: 0;
  }
}

.topa {
  width: 100%;
  height: 4.44rem;
  background-size: 100%;
  background: url("../../assets/img/yd1.png") 0 0 no-repeat;
  background-size: 100%;
}
.tob_b {
  display: flex;
  width: 60%;
  margin: 0.5rem auto 0;
  justify-content: space-around;
  .actives {
    color: #3399ff;
    border-bottom: 1px solid #3399ff;
  }
  div {
    width: 1.5rem;
    height: 0.31rem;
    line-height: 0.43em;
    font-size: 0.32rem;
    color: #666666ff;

    text-align: center;
  }
}
</style>
<style lang="scss">
.rejs .ivu-select-item-selected,.rejs .ivu-select-item-selected:hover{
  background:#fff !important;
}
 .rejs .ivu-select-dropdown{
   background:#fff !important;
 }
.rejs .ivu-select-item:hover{
background:#fff !important;
}
 .rejs .ivu-select-single .ivu-select-selection{
   height: 100px;
   padding-left: 10px;

 }
.rejs {
  .ivu-checkbox-inner{
    height: 24px;
    width: 24px;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner:after{
    width: 8px;
    height: 16px;
    left: 8px;
  }
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    height: 0.8rem;
    font-size: 0.28rem;
    line-height: 0.7rem;
  }
.ivu-select-dropdown .ivu-select-item {
  font-size: 0.24rem !important;
}
.ivu-checkbox-wrapper {
  font-size: 0.2rem;
}
.rejs {
  .ivu-select-dropdown {
    background: #fff;
  }
  .ivu-select-item-selected,
  .ivu-select-item-selected:hover {
    background: #fff;
  }
  .ivu-select-item-selected {
    background: #fff;
    color: #3399ff;
  }
  .content {
    padding: 0.2rem 0.8rem;
    width: 5.74rem;
    .ivu-select-single .ivu-select-selection {
      height: 0.6rem;
      padding-left: 0.1rem;
      border: 0;
      border-bottom: 1px solid #ddd;
      border-radius: 0;
    }
    .ivu-select {
      margin-top: 0.49rem;
      // padding-bottom: 0.18rem;
    }
  }
}
}

</style>
<style>
.rejs{
  background:#fff;
}
</style>
