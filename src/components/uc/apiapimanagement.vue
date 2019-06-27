<template>
<div class="apimanagement bcd" >
  <div class="nav-rights">
    <div class="main">
      <Card class="card1" :bordered="false">{{$t('apiAdmin.apiAdmin')}}</Card>
      <Card  :bordered="false" class="content card2">
        <p slot="title">{{$t('apiAdmin.createApi')}}</p>
        <div class="content_header">
          <div class="prompt">
            <p style="color:#515a6e; font-weight: 600;">{{$t('apiAdmin.hint')}}</p>
            <ul>
              <li>
                {{$t('apiAdmin.part1')}}
                <a href="https://coinmany.github.io/" target="_blank">{{$t('apiAdmin.apiDoc')}}</a>
                {{$t('apiAdmin.howUse')}}
              </li>
              <li>{{$t('apiAdmin.part2')}}</li>
              <li>{{$t('apiAdmin.part3')}}</li>
            </ul>
          </div>
        </div>
          <div class="add" style="width:400px;margin: 0 auto; margin-top:86px;">
            <Form :model="formItem" label-width="60">
              <FormItem :label="$t('apiAdmin.mark')">
                <Input v-model="formItem.remark"></Input>
              </FormItem>
              <FormItem :label="$t('apiAdmin.bindAddress')">
                <Input v-model="formItem.bindIp"></Input>
              </FormItem>
             
            </Form>
            <div style="margin-left:60px; font-size:12px; color:#8090AF">{{$t('apiAdmin.Thekeybound')}}</div>
            <Button type="primary" @click="codeVerify" style="width: 80%;display:block;margin-left:64px; margin-top:17px;margin-buttom:115px;">{{$t('apiAdmin.create')}}</Button>
          </div>
          
      </Card>
      <Card  :bordered="false" class="content card3">
        <p slot="title">{{$t('apiAdmin.myApiKey')}}</p>
        <Table :columns="myColumns" :data="tableData" :no-data-text="$t('common.nodata')"></Table>
      </Card>
    </div>
    <!--编辑API-->
    <Modal v-model="editor" :title="$t('apiAdmin.edit')">
      <Form :model="editorFormItem" label-position="top">
        <FormItem :label="$t('apiAdmin.mark')">
          <Input v-model="editorFormItem.remark"></Input>
        </FormItem>
        <FormItem :label="$t('apiAdmin.bindIpAddress')">
          <Input v-model="editorFormItem.bindIp"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="editor=false"
        >
          {{ $t('common.cancel') }}
        </Button>
        <Button
          type="primary"
          size="large"
          @click="update"
        >
          {{ $t('common.confirm') }}
        </Button>
      </div>
    </Modal>
    <!--删除-->
    <Modal
      v-model="del"
      :title="$t('apiAdmin.delete')"
      @on-ok="onDel(id)"
      @on-cancel="del=false"
      :ok-text="$t('apiAdmin.okText')"
      :cancel-text="$t('apiAdmin.cancel')"
    >
      <p>{{$t('apiAdmin.sureDelete')}}</p>
    </Modal>
    <!--秘钥-->
    <Modal
      v-model="show"
      :title="$t('apiAdmin.access')"
      @on-ok="show=false"
      :mask-closable="false"
      :ok-text="$t('apiAdmin.okText')"
      :cancel-text="$t('apiAdmin.cancel')"
    >
      <p class="screat">{{$t('apiAdmin.tips')}}</p>
      <p class="screat">
        <!--{{screat}}-->
        <span>{{screat}}</span>
        <span
          v-clipboard:copy="screat"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          class="blue"
        >{{$t('apiAdmin.copy')}}</span>
      </p>
    </Modal>
    <!--添加短信校验-->
    <Modal v-model="verify" :title="$t('apiAdmin.edit')">
      <Form :model="formItem" label-position="top">
        <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode3">
          <Input v-model="formItem.code" size="large">
            <div class="timebox" slot="append">
              <Button @click="sendCode(1)" :disabled="sendMsgDisabled">
                <span v-if="sendMsgDisabled">{{time+$t('uc.safe.second')}}</span>
                <span v-if="!sendMsgDisabled">{{$t('uc.safe.clickget')}}</span>
              </Button>
            </div>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="text"
          size="large"
          @click="verify=false"
        >
          <!--取消-->
          {{ $t('common.cancel') }}
        </Button>
        <Button
          type="primary"
          size="large"
          @click="make"
        >
          <!--确定-->
          {{ $t('common.confirm') }}
        </Button>
      </div>
    </Modal>
    <!--编辑短信校验-->
    <div class="let-code">
      <Modal v-model="verifyEditor" :title="$t('apiAdmin.edit')">
        <Form :model="editorFormItem" label-position="top">
          <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode3">
            <Input v-model="editorFormItem.code" size="large">
              <div class="timebox" slot="append">
                <Button @click="sendCode(2)" :disabled="sendMsgDisabled1">
                  <span v-if="sendMsgDisabled1">{{time1+$t('uc.safe.second')}}</span>
                  <span v-if="!sendMsgDisabled1">{{$t('uc.safe.clickget')}}</span>
                </Button>
              </div>
            </Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button
            type="text"
            size="large"
            @click="verifyEditor=false"
          >
            <!--取消-->
            {{ $t('common.cancel') }}
          </Button>
          <Button
            type="primary"
            size="large"
            @click="okUpdate"
          >
            <!--确定-->
            {{ $t('common.confirm') }}
          </Button>
        </div>
      </Modal>
    </div>
  </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      locale:'',
      del: false,
      editor: false,
      verify: false,
      loading: false,
      verifyEditor: false,
      show: false,
      screat: "",
      time: 60, // 发送验证码倒计时
      time1: 60, // 发送验证码倒计时
      sendMsgDisabled: false,
      sendMsgDisabled1: false,
      codeEditorFormItem: "",
      editorFormItem: {
        remark: "",
        bindIp: "",
        code: ""
      },
      formItem: {
        remark: "",
        bindIp: "",
        code: ""
      },
      tableData: [],
      id: "",
      phoneStatus: '',
      dataTime: ''
    };
  },
  //5.25加
  watch: {
        '$i18n.locale': {
            handler(newVal) {
                this.locale = newVal;
            },
            immediate: true,
        }
  },
  created() {
    this.getAllAPI();
    this.getMember()
  },
  methods: {
    sendCode(index) {
      let me = this;
      //获取手机code
      this.$http.post(this.host + "/uc/mobile/api/code").then(response => {
        let resp = response.body;
        if (resp.code == 0) {
          if (index == 1) {
            this.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
              if (me.time-- <= 0) {
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          } else {
            this.sendMsgDisabled1 = true;
            let interval = window.setInterval(function() {
              if (me.time1-- <= 0) {
                me.time1 = 60;
                me.sendMsgDisabled1 = false;
                window.clearInterval(interval);
              }
            }, 1000);
          }
        } else {
          this.$Message.error(resp.message);
        }
      });
    },
    onCopy(e) {
      this.$Notice.success({
        title: this.$t("common.tip"),
        desc: "success"
      });
    },
    onError() {
      this.$Notice.error({
        title: this.$t("common.tip"),
        desc: "fail"
      });
    },
    // 时间格式转换
    formatTime(date) {
      return moment(date).format("YYYY-MM-DD")
    },
    getAllAPI() {
      return this.$http.get(this.host + `/uc/open/get_key`).then(res => {
        // console.log(res);
        this.tableData = res.body.data;

        console.log(this.formatTime(Date.parse(this.tableData[0].expireTime)),this.formatTime(Date.parse(this.tableData[0].createTime)));
        console.log(Date.parse(this.tableData[0].expireTime)) - Date.parse(this.tableData[0].createTime);
        let time1 = Date.parse(this.tableData[0].expireTime) - Date.parse(this.tableData[0].createTime)
        this.dataTime = time1/24/60/60/1000
        console.log(time1/24/60/60/1000);
      });
    },
    // 添加api校验
    codeVerify() {
      let that = this
      if (this.phoneStatus.phoneVerified == 0) {
        const lang =
            this.$store.getters.lang == "English"
                ? "Please bind the mobile phone first"
                : "请先绑定手机";
        this.$Message.error(lang);
        setTimeout(function () {
          that.$router.push("/uc/Safe");
        }, 1000);
        return false;
      }
      const IP_REG = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
      if (this.formItem.remark == "") {
        const lang =
          this.$store.getters.lang == "English"
            ? "please scanner remark"
            : "请输入备注信息";
        this.$Message.error(lang);
        return;
      }
      // else if (this.formItem.bindIp == "") {
      //   const lang =
      //     this.$store.getters.lang == "English"
      //       ? "please scanner IP Address"
      //       : "请输入IP地址";
      //   this.$Message.error(lang);
      //   return;
      // }
      // else if (!IP_REG.test(this.formItem.bindIp)) {
      //   const lang =
      //     this.$store.getters.lang == "English"
      //       ? "please scanner Correct IP Address"
      //       : "请输入正确IP地址";
      //   this.$Message.error(lang);
      //   return;
      // }
      else {
        this.verify = true;
      }
    },
    // 确认添加api
    make() {
      this.$http
        .post(this.host + "/uc/open/api/save", this.formItem)
        .then(res => {
          if (!res.body.code) {
            this.$Message.success(res.body.message);
            this.formItem.remark = "";
            this.formItem.bindIp = "";
            this.formItem.code = "";
            this.getAllAPI();
            this.verify = false;
            this.screat = res.body.data;
            this.show = true;
          } else {
            this.$Message.error(res.body.message);
          }
        });
    },
    // 编辑验证
    okUpdate() {
      if (this.editorFormItem.code == undefined) {
        const lang =
          this.$store.getters.lang == "English"
            ? "please scanner Correct IP Address"
            : "请输入验证码";
        this.$Message.error(lang);
        return;
      } else {
        this.verifyEditor = false;
        this.editor = true;
      }
    },
    // 编辑api
    update() {
      const IP_REG = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
      if (!this.editorFormItem.remark) {
        const lang =
          this.$store.getters.lang == "English"
            ? "please scanner remark"
            : "请输入备注信息";
        this.$Message.error(lang);
        return;
      }
      // if (!this.editorFormItem.bindIp) {
      //   const lang =
      //     this.$store.getters.lang == "English"
      //       ? "please scanner IP Address"
      //       : "请输入IP地址";
      //   this.$Message.error(lang);
      //   return;
      // }
      // if (!IP_REG.test(this.editorFormItem.bindIp)) {
      //   const lang =
      //     this.$store.getters.lang == "English"
      //       ? "please scanner Correct IP Address"
      //       : "请输入正确IP地址";
      //   this.$Message.error(lang);
      //   return;
      // }
      this.$http
        .post(this.host + "/uc/open/api/update", this.editorFormItem)
        .then(res => {
          if (!res.body.code) {
            this.getAllAPI();
            this.editor = false;
            this.$Message.success(res.body.message);
          } else {
            this.$Message.error(res.body.message);
          }
        });
    },
    // 删除api
    onDel(id) {
      this.$http.get(this.host + `/uc/open/api/del/${id}`).then(res => {
        if (!res.body.code) {
          this.$Message.success(res.body.message);
          this.del = false;
          this.getAllAPI();
        } else {
          this.$Message.error(res.body.message);
        }
      });
    },
    getMember() {
      //获取个人安全信息
      return this.$http.post(this.host + "/uc/approve/security/setting").then(response => {
        let resp = response.body;
        if (resp.code == 0) {
          return new Promise((resolve, reject) => {
            this.phoneStatus = resp.data;
            // console.log(resp.data)
            resolve(resp.data);
          })
        } else {
          this.$Message.error(this.loginmsg);
        }
      });
    }
  },
  computed: {
    myColumns() {
      const arr = [];
      arr.push({
        title: this.$t("apiAdmin.createTime"),
        // width: 100,
        width: this.locale == 'en' ? 110 : 100,
        key: "createTime"
      });
      arr.push({
        title: this.$t("apiAdmin.mark"),
        width: 90,
        key: "remark"
      });
      arr.push({
        title: "API Key",
        width: 150,
        key: "apiKey"
      });
      arr.push({
        title: this.$t("apiAdmin.accessKey"),
        width: this.locale == 'en' ? 130 : 100,
        render: (h, params) => {
          const text = "******";
          return h("span", {}, text);
        }
      });
      arr.push({
        title: this.$t("apiAdmin.bindIpAddress"),
        width: this.locale == 'en' ? 130 : '',
        render: (h, params) => {
          let txts = params.row.bindIp.split(",");
          txts = txts.length > 1 ? txts[0] + "  " + "..." : txts;
          return h("span", {}, txts);
        }
      });
      arr.push({
        title: this.$t("apiAdmin.ioDays"),
        width: this.locale == 'en' ? 150 : '',
        render: (h, params) => {
          if (params.row.bindIp) {
            let residue = Date.parse(params.row.expireTime) - Date.parse(new Date());
            let lastTime = residue / 1000 / 60 / 60 / 24;
            lastTime = lastTime <= 0 ? 0 : lastTime;
            const timeDay = h("span", {}, Math.round(lastTime));
            return [timeDay];
          }
        }
      });
      arr.push({
        title: this.$t("apiAdmin.operation"),
        align: "center",
        width: 180,
        render: (h, params) => {
          return [
            h(
              "Button",
              {
                props: {
                  type: "primary"
                },
                on: {
                  click: () => {
                    const { remark, bindIp, id, code } = params.row;
                    this.editorFormItem = { remark, bindIp, id, code };
                    this.verifyEditor = true;
                  }
                }
              },
              this.$t("apiAdmin.edit")
            ),
            h(
              "Button",
              {
                props: {
                  type: "error"
                },
                style: {
                  marginLeft: "10px"
                },
                on: {
                  click: () => {
                    this.del = true;
                    this.id = params.row.id;
                  }
                }
              },
              this.$t("apiAdmin.delete")
            )
          ];
        }
      });
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.apimanagement{
  position:relative;
  background:#0e0e28;
  padding-top:76px;
  padding-bottom: 100px;
  
  .nav-rights{
    width:1200px;
    margin:0 auto;
  }
  top:60px;
  .blue {
  cursor: pointer;
  color: #fff;
  background: #3399ff;
  display: inline-block;
  padding: 0 12px;
  font-size: 12px;
  border-radius: 3px;
}
.main {
  //   background-color: #eee;
  // padding: 20px;
  .content {
    margin: 10px 0;
    margin-top:30px;
    padding-bottom:115px;
    .content_header {
      padding: 10px;

      border-bottom: 1px solid #2A3850FF;
      
      .add {
        width: 39%;
      }
      .prompt {
        width: 49%;
        margin-left: 25px;
        p{
          color: #fff !important;
        }
        ul li {
          font-size: 10px;
          color: #515a6e;
          line-height: 25px;
          list-style: disc;
          span {
            color: #000;
          }
        }
      }
      .ivu-btn-primary {
        background-color: #2d8cf0;
        border-color: #2d8cf0;
      }
    }
  }
}
.screat {
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
}

}



</style>
<style lang="scss">
.card2 .ivu-form .ivu-form-item-label{
  text-align:left;
  font-size:14px;
  color:#8090AF;
}
  .card1.ivu-card{
height:55px;
background:rgba(25,29,58,1);
line-height:55px;
padding-left:35px;


}
.card2.ivu-card .ivu-card-head,.card3.ivu-card .ivu-card-head{
  padding-left:33px;
}
.card2.ivu-card{
  margin-top:30px;
}
.card1 .ivu-card-head{
height:55px;
background:rgba(25,29,58,1);

line-height:55px;

}
.card1 .ivu-card-body {
color:#fff !important;
}
.card2.ivu-card{
background:#111530FF


}
.card2 .apimanagement .main .content .content_header[data-v-252430f8]{
  padding-left:30px;
}
.card2.ivu-card .ivu-card-head{
  height:55px;
background:rgba(25,29,58,1);

color: #fff;
}
.card2.ivu-card .ivu-card-head p{
  color: #fff;
}
.card3.ivu-card{
background:rgba(25,29,58,1);


}
.card3.ivu-card .ivu-card-head{
  height:55px;
background:rgba(25,29,58,1);

color: #fff;
}
.card3 .ivu-table-cell{
  padding-left:0 !important;
  padding-right:0 !important;
}
.card3 thead tr .ivu-table-column-center:nth-child(7){
  text-align:right;
  
}
.card3.ivu-card .ivu-card-head p{
  color: #fff;
}
.main .ivu-card-head{
  border-bottom: 0 !important;
}
.card3.ivu-card{
  background:#111530FF !important;
}
.card3 .ivu-table td{
  background:#111530FF !important;
  border:0 !important;
}
.bcd {
  .ivu-input{
    background: transparent !important;
    border: 1px solid rgba(128,144,175,1);

  }
  
  .ivu-table-wrapper .ivu-table:before {
      background: transparent;
    }
    div.ivu-card-body {
      padding: 0;
    }
    div.ivu-table-wrapper {
      border: none;
    }
    .ivu-table:before{content:'';width:100%;height:0px;position:absolute;left:0;bottom:0;z-index:1}
    .ivu-table:after{content:'';width:0px;height:100%;position:absolute;top:0;right:0;z-index:3}
    .ivu-table-wrapper .ivu-table .ivu-table-header th{
      background: transparent;
    }
    .ivu-table{
      background: transparent;
    }
    .ivu-table td .ivu-table th{
      border-bottom: rgba(42,56,80,1);
    }
}
.card2 .ivu-input:focus{
  box-shadow:none;
}
.card3,.card2{
  // padding: 0 10px;
}
 .ivu-table td, .ivu-table th{
  border-bottom: 1px solid rgba(42,56,80,1) !important;
}
.card3 div.ivu-card-body{
  padding:0 35px;
}


 
</style>




