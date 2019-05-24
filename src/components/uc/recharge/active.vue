<template>
  <div class="email-box">
    <div class="email-main">
      <div class="succeed">
        <!--type==1?(agagin==1?'再售':'已售'):'未售'-->
        <p>您好，您的邮箱{{info == '激活成功' ?  '激活成功是否进行登录': '链接已失效激活失败请联系客服'}}</p>
        <p v-if="info == '激活成功'">
          <button>
            <a href="javascript:;">
              取消
            </a>
          </button>
          <button>
            <router-link to="/login" id="login">
              确认
            </router-link>
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        request: '',
        succeed: false,
        defeated: false,
        info: ''
      }
    },
    created() {
      this.getRequest()
      this.geRegisterActive()
    },
    methods: {
      getRequest() {
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = new Object();
        console.log(url, theRequest);
        if (url.indexOf("?") != -1) {
          let str = url.substr(1);
          let strs = str.split("&");
          for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
          }
        }
        this.request = theRequest.key
        console.log(theRequest.key);
        return theRequest;
      },
      geRegisterActive () {
        console.log(this.request);
        return this.$http.post(this.host + "/uc/register/active" + "?key=" + this.request).then(response => {
          let resp = response.body;
          console.log(resp);
          // this.info = resp
          if (resp.code == 0) {
            return new Promise(() => {
              this.info = resp.message
              console.log(this.info);
            })
          }
        });
      }
    },
    computed: {},
    watch: {
      getRequest () {
        this.getRequest()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .email-box {
    .email-main {
      width: 1200px;
      margin: 0 auto;
      .succeed,
      .defeated{
        text-align: center;
        height: 50px;
        padding: 25% 20% 40%;
        p {
          &:first-child {
            font-size: 30px;
            padding: 10px 20px;
          }
          &:last-child {
            button {
              padding: 5px 15px;
              font-size: 14px;
              cursor: pointer;
              border: 0;
              margin-right: 35px;
            }
          }
        }
      }
    }
  }
</style>
