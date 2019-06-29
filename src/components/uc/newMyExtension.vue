<template>
    <div class="newMyExtension">
        <div class="new_title">
            <img src="../../assets/img/center.png">
        </div>
        <div class="nav-rights">
            <div class="nav_titlt">{{$t('apiAdmin.Mywasharing')}}</div>

            <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
                <div class="nav-right_content">
                    <div style="display:flex; padding-left:35px; padding-top:40px;">
                        <div>
                            <div style="font-size:14px; color:#8090AF; margin-bottom:23px;">{{$t('apiAdmin.Exclusivinvita')}}</div>
                            <div class="copy copy_left">
                                <span class="code">{{qrcode.code}}</span>
                                <span>|</span>
                                <span class="span2">
                                    <a
                                        v-clipboard:copy="qrcode.code"
                                        v-clipboard:success="onCopy"
                                        v-clipboard:error="onError"
                                        href="javascript:;"
                                        class="link-copy"
                                    >
                                        {{$t('apiAdmin.Copnvitatioode')}}
                                     </a>
                                </span>
                            </div>
                        </div>
                        <div style="margin-left:131px;">
                            <div style="font-size:14px; color:#8090AF;margin-bottom:23px;">{{$t('apiAdmin.Excllink')}}</div>
                            <div class="copy">
                                <span class="code">{{qrcode.value}}</span>
                                <span style="margin-left:20px;">|</span>
                                <span class="span2">
                                    <a
                                        v-clipboard:copy="qrcode.value"
                                        v-clipboard:success="onCopy"
                                        v-clipboard:error="onError"
                                        href="javascript:;"
                                        class="link-copy"
                                    >
                                        {{$t('apiAdmin.copyLink')}}
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="invite">
                    <div class="invite_conter">
                        <div class="invite_left">
                            <div class="invite_left1">{{$t('apiAdmin.Numbonvitees')}}</div>
                            <div class="invite_left2">{{$t('apiAdmin.Totnumbinvitations')}}：{{dataPromoteFriends.totalElements}}</div>
                        </div>
                        <div class="invite_right">
                            <div class="invite_left1">{{$t('apiAdmin.Myscores')}}</div>
                            <div class="invite_left2">{{$t('apiAdmin.Currentoints')}}:{{number}}</div>
                        </div>
                    </div>
                </div>
                </div>

                
                <!-- //6.26删除 -->
                <!-- <div class="sharelink">
                    <p class="c1">{{$t('recommendPage._commissionRecommended')}}</p>
                    <p class="c2">{{$t('recommendPage._recommendMoney')}}</p>
                    <div class="copyAndshare">
                        <div class="leftwrapper">
                            <div>
                                <span class="abstract">{{$t('recommendPage._recommendCode')}}</span>
                                <span class="code">{{qrcode.code}}</span>
                                <a
                                    v-clipboard:copy="qrcode.code"
                                    v-clipboard:success="onCopy"
                                    v-clipboard:error="onError"
                                    href="javascript:;"
                                    class="link-copy"
                                >
                                    <img src="../../assets/images/copycode.png" alt="">
                                </a>
                            </div>
                            <div>
                                <span class="abstract">{{$t('recommendPage._recommendLink')}}</span>
                                <span class="code">{{qrcode.value}}</span>
                                <a
                                    v-clipboard:copy="qrcode.value"
                                    v-clipboard:success="onCopy"
                                    v-clipboard:error="onError"
                                    href="javascript:;"
                                    class="link-copy"
                                >
                                    <img src="../../assets/images/copycode.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="rightwrapper">
                          
                        </div>
                    </div>
                </div> -->
                <div class="bill_box rightarea padding-right-clear record account-box">
                    <div style="display:flex; background:rgba(25,29,58,1); margin-top:19px;height:55px;">
                        <div
                            v-for="(list,index) in buttonLists"
                            :key="list.text"
                            class="btStyle"
                            style="text-align:center;margin-left:35px;"
                            :class="{active:changeActive == index}"
                            @click="actives(index)"
                        >
                            {{list.text}}
                        </div>
                    </div>
                    <div
                        class="message"
                        style="padding: 0 35px"
                        v-if="this.changeActive==0"
                    >
                        <Table
                            :no-data-text="$t('common.nodata')"
                            stripe
                            :columns="tablePromoteFriends"
                            :data="dataPromoteFriends.content||[]"
                            :loading="loading"
                            :disabled-hover="true"
                        ></Table>
                        <div class="page-wrap">
                            <!-- <span>{{dataPromoteFriends.totalElements}}</span> -->
                            <Page
                                :current="currentPage"
                                v-show="dataPromoteFriends.totalElements > 10"
                                :total="parseInt(dataPromoteFriends.totalElements)"
                                @on-change="promoteFriendsPageChange"
                            ></Page>
                        </div>
                    </div>
                    <div
                        class="message"
                        style="padding: 0 35px"
                        v-else-if="this.changeActive==1"
                    >
                        <Table
                            :no-data-text="$t('common.nodata')"
                            stripe
                            :columns="tablePromoteMoney"
                            :data="dataPromoteMoney||[]"
                            :loading="loading"
                            :disabled-hover="true"
                        ></Table>
                        <div class="page-wrap">
                            <!-- <span>{{dataPromoteMoney.totalElements}}</span> -->
                            <Page
                                :current="currentPage"
                                v-show="dataPromoteFriends.totalElements > 10"
                                :total="parseInt(dataPromoteMoney.totalElements)"
                                @on-change="promoteMoneyPageChange"
                            ></Page>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <div class="rule_title">{{$t('apiAdmin.ruleofactivity')}}</div>
                <div class="rule_content">{{$t('apiAdmin.RegisteringDW')}}</div>
            </div>
        </div>
    </div>
</template>
<script>
const getParamFun = (obj) => (pageNum) => Object.assign(obj, pageNum);
const getParams = getParamFun({ pageSize: 10, type: "", createStartTime: "", createEndTime: '' });
// 积分类型 PROMOTION_GIVING  LEGAL_RECHARGE_GIVING  COIN_RECHARGE_GIVING("")
const map = new Map([[0,'推广'],[1,'法币充值赠送'],[2,'币币充值赠送']]);
const mapEn = new Map([[0,'recommend'],[1,'Presentation of French Currency'],[2,'Currency recharge gift']]);
export default {
    components: {},
    data() {
        const m = this.$store.getters.lang == 'English' ?mapEn:map;
        return {
            number: 0,
            buttonLists: [
                {
                    text: this.$t("uc.extension.title2")
                },
                {
                    text: this.$t("uc.extension.title3")
                }
            ],
            currentCommission: "0.00",
            commissionPaying: "6%",
            changeActive: 0,
            qrcode: {
                value: "",
                size: 200,
                code: ""
            },
            loading: true,
            tablePromoteFriends: [
                {
                    title: this.$t("uc.extension.username"),
                    key: "username",
                    align: "center"
                },
                {
                    title: this.$t("uc.extension.createdtime"),
                    key: "createTime",
                    align: "center"
                },
                {
                    title: this.$t("uc.extension.userlevel"),
                    key: "level",
                    align: "center",
                    render: function (h, params) {
                        return h("span", "V" + (parseInt(params.row.level) + 1))
                    }
                }
            ],
            dataPromoteFriends: {},
            tablePromoteMoney: [
                {
                    title: this.$t("uc.extension.type"),
                    render:(h,params)=>{

                        return h("div",{},m.get(params.row.type))
                    }
                },
                {
                    title: this.$t("uc.extension.amount"),
                    key: "amount",
                    align: "center"
                },
                {
                    title: this.$t("uc.extension.amounttime"),
                    key: "createTime",
                    align: "center"
                }
            ],
            dataPromoteMoney: {},
            pageSize: 10,
            currentPage: 1
        };
    },
    methods: {
        share() {
        },
        getList() {
            this.loading = false;
        },
        actives(index) {
          
            this.currentPage = 1;
            this.changeActive = index;
        },
        qrcodeM() {
            console.log(this.user);
            let promotionCode = this.user.promotionCode;
            this.qrcode.value = this.url + "/#/register?agent=" + promotionCode + '&mobile=' + this.user.mobile;
            this.qrcode.code = promotionCode;
        },
        onCopy(e) {
            this.$Message.success(this.$t("uc.extension.copy_msg1") + e.text);
        },
        onError(e) {
            this.$Message.error(this.$t("uc.extension.copy_msg2"));
        },
        getPromotionList(pageNo = 1, pageSize = 10) {
            this.$http
                .post(this.host + "/uc/promotion/record", { pageNo, pageSize })
                .then(response => {
                    var num = 0;
                    console.log(response)
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.dataPromoteFriends = resp.data;
                        
                    } else {
                        this.$Message.error(resp.message);
                    }
                });
        },
        promoteFriendsPageChange(data) {
            this.currentPage = data;
            this.getPromotionList(data, this.pageSize);
        },
        promoteMoneyPageChange(data) {
            this.currentPage = data;
            this.getPromotionMoney(data, this.pageSize);
        },
        getPromotionMoney(pageNum = 1) {
            const params = getParams({pageNum});
            var number = 0;
            //注册链接接口
            this.$http.post(this.host + "/uc/integration/record/page_query",params)
                .then(response => {
                    console.log(response)
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.dataPromoteMoney = resp.data;
                        resp.data.map((item) => {
                            number += item.amount;
                        })
                        this.number = number;
                    } else {
                        // this.$Message.error(resp.message);
                    }
                });
        },
        updateLangData() {
            this.buttonLists = [
                {
                    text: this.$t("uc.extension.title2")
                },
                {
                    text: this.$t("uc.extension.title3")
                }
            ];
            this.tablePromoteFriends[0].title = this.$t("uc.extension.username");
            this.tablePromoteFriends[1].title = this.$t("uc.extension.createdtime");
            this.tablePromoteFriends[2].title = this.$t("uc.extension.userlevel");
            this.tablePromoteMoney[0].title = this.$t("uc.extension.symbol");
            this.tablePromoteMoney[1].title = this.$t("uc.extension.amount");
            this.tablePromoteMoney[2].title = this.$t("uc.extension.amounttime");
            this.tablePromoteMoney[3].title = this.$t("uc.extension.remark");
        }
    },
    created() {
        this.actives(this.changeActive);
        this.qrcodeM();
        this.getList();
        this.getPromotionList();
        this.getPromotionMoney();
    },
    computed: {
        user: function () {
            return JSON.parse(localStorage.getItem("MEMBER"));
        },
        lang: function () {
            return this.$store.state.lang;
        }
    },
    watch: {
        lang: function () {
            this.updateLangData();
        }
    }
};
</script>
<style>
.nav-right .btStyle :nth-child(2){
    margin-left:35px;
}
.bill_box .message .ivu-table th{
    height:55px !important;
}
.bill_box .message .ivu-table td, .ivu-table th{
    height:55px !important;
}
.page-wrap {
    text-align: right;
    margin-top: 30px;
}
.page-wrap > span {
    vertical-align: middle;
    font-size: 12px;
    margin-right: 10px;
}
.page-wrap .ivu-page {
    display: inline-block;
    vertical-align: middle;
}
</style>

<style scoped lang="scss">
.code_center{
   
}
.newMyExtension{
    background:#0e0e28;
    padding-bottom: 160px;
   
    .nav-rights{
        position:relative;
        top:60px;
        padding-top:38px;
        .nav-right_content{
            height:338px;
            background:rgba(17,21,48,1);
            .copy_left{
                width:300px;
                span:nth-child(1){
                    width:169px;
                    display:inline-block;
                    line-height:40px;
                }
            }
            .copy{
                // width:300px;
                height:40px;
                border:1px solid rgba(42,56,80,1);
                padding-left:20px;
                .code{
                    width:170px;
                    background:transparent;
                    border:0;
                    height:40px;
                    outline: none;
                    color:#fff;
                    line-height:40px;
                   
                }
                .span2{
                    display:inline-block;
                    width:95px;
                    color:#3399FF;
                    font-size:14px;
                    text-align:center;
                    height:40px;
                    line-height:40px;
                }
            }
        }
        .invite{
            padding:43px 34px 50px 34px;
            .invite_conter{
                width:1130px;
                height:128px;
                background:rgba(16,18,43,1);
                display:flex;
                padding-top:25px;
                padding-left:23px;
                .invite_left{
                    width:300px;
                    .invite_left1{
                        font-size:14px;
                        color:#8090AF
                    }
                    .invite_left2{
                        margin-top:34px;
                        color:#fff;
                        font-size:14px;
                    }

                    
                }
                .invite_right{
                    margin-left:111px;
                    .invite_left1{
                        font-size:14px;
                        color:#8090AF
                    }
                    .invite_left2{
                        margin-top:34px;
                        color:#fff;
                        font-size:14px;
                    }
                    
                }
            }
        }
        .rule{
            height:180px;
            background:rgba(17,21,48,1);
            margin-top:20px;
            .rule_title{
                height:55px;
                background:rgba(25,29,58,1);
                line-height:55px;
                padding-left:34px;
                color:#fff;
            }
            .rule_content{
                // line-height:125px;
                padding-left:35px;
                font-size:14px;
                color:#8090AF;
                margin-top:35px;
            }
        }
        .nav_titlt{
            height:55px;
            background:rgba(25,29,58,1);
            line-height:55px;
            font-size:18px;
            color:#fff;
            padding-left:35px;
        }
    }
    .new_title{
        width:100%;
        height:510px;
        position:relative;
        top:60px;
        img{
            width:100%;
            height:510px;
        }
    }
    .nav-rights{
        width:1200px;
        margin:0 auto;
    }
}
.nav-right {
    height: auto;
    overflow: hidden;
    // padding: 0 15px;
    .sharelink {
        width: 100%;
        p {
            color: #333;
        }
        .c1 {
            font-size: 20px;
        }
        .c2 {
            font-size: 12px;
            margin-bottom: 15px;
        }
        .copyAndshare {
            background: #fafafa;
            display: flex;
            padding: 20px;
            .leftwrapper {
                div {
                    height: 30px;
                    line-height: 30px;
                    color: 12px;
                    .code {
                        color: #3399ff;
                    }
                    .link-copy {
                        margin-left: 10px;
                    }
                }
            }
        }
    }
}

.nav-right .btStyle {
    // width: 125px;
    // height: 42px;
    font-size:18px;
    color: #a2a0a1;
    // background: #fff;
    margin: 20px 0 0;
}
 .nav-right .message .ivu-table-wrapper, button.btStyle.ivu-btn, button.btStyle.ivu-btn.active:focus{
    box-shadow:none !important;
}
.nav-right .message .ivu-table-wrapper{
    margin-top:0 !important; 
}
.nav-right .active {
    color: #3399ff !important;
    border-bottom: 1px solid #3399ff !important;
}
.rightarea .message {
    margin: 0 auto;
    font-size: 16px;
    color: #636363;
    // padding-bottom: 140px;
}
.nav-right .message .tips {
    text-align: left;
    padding-bottom: 50px;
    border-bottom: 1px dashed #e9e9e9;
}
.rightarea {
    // background: #fff;
}
.nav-right .btStyle[data-v-be09f418]{
    background:transparent;
    border:0;
    color:#fff;
    margin-top:19px;
    // height:55px;
}

.rightarea .rightarea-top {
    line-height: 75px;
    border-bottom: #f1f1f1 solid 1px;
}

.rightarea .rightarea-con {
    padding-top: 30px;
    padding-bottom: 125px;
}
.message .title .copy {
    user-select: text;
}
.message .title {
    float: left;
    margin: 46px 0 0px 0;
}
.message .inner-box {
    display: table-cell;
    width: 100%;
}
.message a.link-copy {
    margin-left: 10px;
}
.message .describe {
    float: left;
    margin: 52px 36px 0 0;
}
.message .commission {
    padding-bottom: 50px;
    border-bottom: 1px dashed #e9e9e9;
}
.message .commission span {
    color: #ff3533;
}
.message .commission strong {
    font-size: 26px;
}
.ivu-btn-primary {
    background-color: #3399ff;
    border-color: #3399ff;
}
</style>
<style lang="scss">
.newMyExtension.nav-right .message .ivu-table-wrapper{
    margin-top:0 !important;
}
.rightarea .message .ivu-table-cell{
  padding-left:0 !important;
  padding-right:0 !important;
}
.newMyExtension .message{
     background:rgba(17,21,48,1) !important;
}
.newMyExtension .ivu-table-row:last-child td{
    border-bottom: 0 !important;
}
.newMyExtension .nav-right .message .ivu-table-wrapper .ivu-table .ivu-table-body td{
    background:transparent;
}
.newMyExtension .ivu-table-tbody .ivu-table-row .ivu-table-column-center:nth-child(1){
    text-align:left;
}
.newMyExtension .ivu-table-tbody .ivu-table-row .ivu-table-column-center:nth-child(3){
    text-align:right;
}
.newMyExtension .ivu-table td, .ivu-table th{
    border-bottom: 0 !important;
}
.newMyExtension thead .ivu-table-column-center:nth-child(1){
    text-align:left;
}
.newMyExtension thead .ivu-table-column-center:nth-child(3){
    text-align:right;
}
.newMyExtension .ivu-table td, .ivu-table th{
  border-bottom: 1px solid rgba(42,56,80,1) !important;
}

 .newMyExtension .ivu-table td, .ivu-table th{
     background:rgba(17,21,48,1);
 }
 .newMyExtension{
      .ivu-table{//去掉首行样式
    //   height:55px;
      background: transparent;
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
 }
.nav-right {
    .message {
        .ivu-table-wrapper {
            border-color: #fff;
           
            // -moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
            // -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
            // box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
            // border-top: 4px solid #3399ff;
            margin-top: 2px;
            .ivu-table {
                .ivu-table-header th {
                    background: none;
                }
                .ivu-table-body td {
                    background: #fff;
                }
            }
        }
        .page-wrap {
            .ivu-page {
                .ivu-page-item.ivu-page-item-active {
                    background-color: #3399ff;
                    border-color: #3399ff;
                    color: #fff;
                    &:hover {
                        a {
                            color: #fff;
                        }
                    }
                }
                .ivu-page-item {
                    &:hover {
                        border: 1px solid #3399ff;
                        a {
                            color: #3399ff;
                        }
                    }
                }
                .ivu-page-prev,
                .ivu-page-next {
                    &:hover {
                        border: 1px solid #3399ff;
                        a {
                            color: #3399ff;
                        }
                    }
                }
            }
        }
    }
}
button.btStyle.ivu-btn {
    // -moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    // -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    // box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    border: none;
    &:hover {
        color: #3399ff;
        border: none;
    }
}
button.btStyle.ivu-btn.active {
    &:hover {
        border: none;
        color: #3399ff;
    }
    // &:focus {
    //     // -moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    //     // -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    //     // box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    // }
}
</style>

