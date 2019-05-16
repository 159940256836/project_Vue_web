<template>
    <div class="page-view">
        <header>
            <div class="page-content">
            <div class="time_download">
                <div class="netLogo">
                    <img src="./assets/images/logo.png" alt="">
                </div>
                <div class="nav">
                    <router-link to="/">{{$t("header.index")}}</router-link>
                    <router-link to="/exchange">{{$t("header.exchange")}}</router-link>
                    <router-link to="/otc/trade/usdt">{{$t("header.otc")}}</router-link>
                    <router-link to="/helpList">帮助</router-link>
                    <router-link to="/notice">{{$t("header.service")}}</router-link>
                    <router-link to="/Ieo">上币优选</router-link>
                    <router-link to="/leverindex">杠杆交易</router-link>
                </div>
                <div class="rightwrapper">
                    <poptip placement="bottom" width="270" class="appdownload">
                        <a href="javascript:;" style="font-size:14px;">{{$t("header.appdownlaod")}}
                        </a>
                        <div class="api" slot="content">
                            <div class="ios">
                                <!-- <img src="../src/assets/images/app_ios.png" alt="">
                                <div class="tips">
                                    <img src="../src/assets/images/ios.png" alt="">
                                    <span>IOS</span>
                                </div> -->
                            </div>
                            <div class="andrio">
                                <!-- <img src="../src/assets/images/app_andraio.png" alt="">
                                <div class="tips">
                                    <img src="../src/assets/images/andraio.png" alt="">
                                    <span>Android</span>
                                </div> -->
                            </div>
                        </div>
                    </poptip>
                </div>
                <div class="isLoginWrapper" :style="isLogin?'width:12%':'width:6%'">
                    <!-- 登录 -->
                    <div class="login_register isLogin" v-if="isLogin">
                        <div class="mymsg">
                            <router-link to="/uc/safe">个人中心</router-link>
                        </div>
                        <Dropdown>
                            <a href="javascript:void(0)">
                                <!-- <Icon type="person"></Icon> -->
                                <Icon type="md-person" size="20" />
                                <span>{{strpo(member.username)}}</span>
                                <Icon type="md-arrow-dropdown" size="16" />
                            </a>
                            <DropdownMenu slot="list">
                                <div @click="logout">
                                    <DropdownItem>
                                        <img src="./assets/images/logout1.png"> {{$t("common.logout")}}
                                    </DropdownItem>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <!-- 未登录 -->
                    <div class="login_register" v-else>
                        <router-link to="/login" id="login">{{$t("common.login")}}</router-link>
                        <router-link to="/register" id="register">{{$t("common.register")}}</router-link>
                    </div>
                </div>
                <div class="changelanguage">
                    <Dropdown @on-click="changelanguage">
                        <a href="javascript:void(0)" style="font-size:14px;color:#fff;">
                            {{languageValue}}
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <!-- <DropdownMenu slot="list" id="change_language_theme">
                            <DropdownItem v-if="languageValue=='简体中文'" name="en">English</DropdownItem>
                            <DropdownItem v-else name="cn">简体中文</DropdownItem>
                        </DropdownMenu> -->
                    </Dropdown>
                </div>
            </div>
        </div>
        </header>
        <router-view></router-view>
        <footer>
            <div class="footer">
            <div class="footer_content">
                <div class="footer_left">
                    <img src="./assets/images/logo.png" style="margin:0"></img>
                    <div>
                        <img src="./assets/images/in.png" alt="">
                        <img src="./assets/images/twitter.png" alt="">
                        <img src="./assets/images/telegram.png" alt="">
                        <img src="./assets/images/facebook.png" alt="">
                    </div>
                </div>
                <div class="footer_right">
                    <ul>
                        <li class="footer_title">
                            <span>{{$t("footer.gsjj")}}</span>
                        </li>
                        <li>
                            <router-link to="/">{{$t("footer.gywm")}}</router-link>
                        </li>
                    </ul>
                    <ul>
                        <li class="footer_title">
                            <span>{{$t("footer.bzzx")}}</span>
                        </li>
                        <li>
                            <router-link to="/helplist?cate=0&cateTitle=新手指南">{{$t("footer.xszn")}}</router-link>
                        </li>
                        <li>
                            <router-link to="/helplist?cate=1&cateTitle=常见问题">{{$t("footer.cjwt")}}</router-link>
                        </li>
                    </ul>

                    <ul>
                        <li class="footer_title">
                            <span>{{$t("footer.lxwm")}}</span>
                        </li>
                        <li class="wechatclick">
                            <poptip width="200">
                                <a href="javascript:;" class="wechat">客服邮箱</a>
                                <!-- <div slot="content">
                                    <p style="color:#333;text-align:center;">service@bhuo.top</p>
                                </div> -->
                            </poptip>
                        </li>
                        <li>
                            <!-- <a href="https://0.plus/币多网guanfang" target="_blank">{{$t('footer.biyong')}}</a> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </footer>
    </div>
</template>
<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "app",
    data() {
        return {
            // container_test:"container_test",
            pageView: "page-view",
            utc: null,
            time: null,
            content: " ",
            wechat: this.$t("footer.wechat"),
            topInfo: {
                name: "币多网",
                createTime: "2018-01-10 11:37:27"
            }
        };
    },
    watch: {
        activeNav: function () {
            switch (this.activeNav) {
                case "nav-exchange":
                    break;
                default:
                    window.document.title = "币多网";
                    break;
            }
        },
        $route(to, from) {
            if (to.path === "/") {
                this.pageView = "page-view";
                // this.container_test = "";
            } else {
                if (to.path.indexOf("exchange") > 0 && this.exchangeSkin == "night") {
                    this.pageView = "page-view";
                } else {
                    this.pageView = "page-view2";
                }
                // this.container_test = "container_test";
            }
        },
        exchangeSkin() {
            if (this.exchangeSkin === "day") {
                this.pageView = "page-view2";
            } else {
                this.pageView = "page-view";
            }
        }
    },
    computed: {
        activeNav: function () {
            return this.$store.state.activeNav;
        },
        isLogin: function () {
            return this.$store.getters.isLogin;
        },
        member: function () {
            return this.$store.getters.member;
        },
        languageValue: function () {
            var curlang = this.$store.getters.lang;
            if (curlang == "English") this.$i18n.locale = "en";
            return curlang;
        },
        lang() {
            return this.$store.state.lang;
        },
        exchangeSkin() {
            return this.$store.state.exchangeSkin;
        }
    },
    created: function () {
        this.initialize();
        if (this.$route.path === "/") {
            this.pageView = "page-view";
        } else {
            this.pageView = "page-view2";
        }
    },
    methods: {
        strpo(str) {
            if (str.length > 4) {
                str = str.slice(0, 4) + "···";
            } else {
                str = str;
            }
            return str;
        },
        initialize() {
            this.$store.commit("navigate", "nav-index");
            this.$store.commit("recoveryMember");
            this.$store.commit("initLang");
            // this.loadTopInfo();
            this.checkLogin();
        },
        loadTopInfo() {
            /*获取首页顶部公告*/
            let param = {};
            param["sysAdvertiseLocation"] = 2;
            this.$http
                .post(this.host + "/uc/ancillary/system/advertise", param)
                .then(response => {
                    var result = response.body;
                    if (result.code == 0 && result.data.length > 0) {
                        this.topInfo = result.data[0];
                    }
                });
        },
        logout() {
            this.$http.post(this.host + "/uc/loginout", {}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.$store.commit("setMember", null);
                    setTimeout(() => {
                        location.href = "/";
                    }, 1500);
                } else {
                    this.$Message.error(resp.message);
                }
            });
        },
        checkLogin() {
            this.$http.post(this.host + "/uc/check/login", {}).then(response => {
                var result = response.body;
                if (result.code == 0 && result.data == false) {
                    this.$store.commit("setMember", null);
                }
            });
        },
        changelanguage: function (name) {
            if (name == "en") {
                this.$store.commit("setlang", "English");
                this.$i18n.locale = "en";
            }
            if (name == "cn") {
                this.$store.commit("setlang", "简体中文");
                this.$i18n.locale = "zh";
            }
        }
    }
};
</script>
<style scoped lang="scss">

%flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.page-view {
    .page-content {
        .time_download {
            @extend %flex;
            padding: 0 80px;
            height: 50px;
            background-color: #1e222a;
            line-height: 50px;
            overflow: hidden;
            .netLogo {
                width: 15%;
                img {
                    vertical-align: middle;
                }
            }
            .nav {
                width: 60%;
                a {
                    color: #fff;
                    margin-right: 20px;
                }
                a.router-link-exact-active.router-link-active {
                    color: #2d8cf0;
                }
            }
            .isLoginWrapper {
                // width: 6%;
                .login_register {
                    @extend %flex;
                    a {
                        color: #fff;
                    }
                }
            }
            .rightwrapper {
                width: 8%;
                .appdownload {
                    float: left;
                    padding-right: 30px;
                    .ivu-poptip-rel {
                        a {
                            color: #fff;
                        }
                        i.ivu-icon.ivu-icon-arrow-down-b {
                            margin-left: 5px;
                        }
                    }
                }
                .ios,
                .andrio {
                    float: left;
                    text-align: center;
                    img {
                        width: 106px;
                        height: 106px;
                        margin: 0 auto;
                    }
                    .tips {
                        height: 30px;
                        img {
                            width: 14px;
                            height: 14px;
                            margin-top: 5px;
                        }
                        span {
                            font-size: 14px;
                        }
                    }
                }
                .andrio {
                    float: right;
                }
                .ivu-dropdown-rel a {
                    color: #fff;
                }
                .ivu-select-dropdown {
                    z-index: 901;
                    #change_language_theme {
                        li {
                            background: #fff;
                            color: #333;
                        }
                    }
                }
            }
            .changelanguage {
                width: 7%;
                 @extend %flex;
                justify-content: flex-end;
                #change_language_theme .ivu-dropdown-item{
                    color: #000;
                }
            }
        }
    }
}


.wechatclick .api2 {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        img {
            width: 100px;
        }
        span {
            display: block;
            color: #333;
            text-align: center;
        }
    }
}
</style>
<style lang="scss">
ul,li{
    list-style-type: none;
}
.container_test {
    padding-top: 60px;
}
/* 多选框 */
.exchange .ivu-checkbox-checked .ivu-checkbox-inner {
    background-color: #f0a70a;
    border-color: #f0a70a;
}
/* modal */
.ivu-modal-confirm-head {
    text-align: center;
    margin-bottom: 15px;
}
.ivu-modal-body {
    // border-top: 4px solid #f0a70a;
    border-radius: 5px;
    .ivu-modal-confirm {
        .ivu-modal-confirm-body.ivu-modal-confirm-body-render {
            .ivu-input-number {
                &:hover {
                    border-color: #f0a710;
                }
                &:focus {
                    border-color: #f0a710;
                    -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
                    -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
                    box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
                }
            }
            .ivu-input-number.ivu-input-number-focused {
                border-color: #f0a710;
                -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
                -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
                box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
            }
        }
        .ivu-modal-confirm-body {
            font-size: 14px;
        }
    }
}
.ivu-modal-confirm-footer .ivu-btn-primary {
    background-color: #f0a70a;
    border-color: #f0a70a;
}
.ivu-modal-confirm-footer .ivu-btn-text {
    &:hover {
        color: #f0a70a;
    }
}
.ivu-modal-confirm-footer {
    .ivu-btn {
        &:focus {
            -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
            -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
            box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
        }
    }
}
.ivu-table-wrapper {
    -moz-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    -webkit-box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
    box-shadow: 2px 2px 5px #f5f5f5, -2px -2px 4px #f5f5f5;
}
.ivu-table-wrapper {
    .ivu-table {
        &:before {
            background: #fff;
        }
        &:after {
            background: #fff;
        }
        .ivu-table-header {
            th {
                background-color: #fff;
                border-color: #f5f5f5;
            }
        }
        .ivu-table-row td {
            background-color: #fff;
            border-color: #f5f5f5;
        }
    }
}
.order-table {
    .ivu-table-wrapper {
        .ivu-table {
            &:before {
                background: #fff;
            }
            &:after {
                background: #fff;
            }
            .ivu-table-header {
                th {
                    background-color: #fff;
                    border-color: #f5f5f5;
                }
            }
            .ivu-table-row td {
                background-color: #fff;
                border-color: #f5f5f5;
            }
        }
    }
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: none;
    &:after {
        background: none;
    }
}
.ivu-select-dropdown .ivu-select-item {
    padding: 6px 16px;
    &:hover {
        background: #fff;
        color: #f0a70a;
    }
}
.ivu-select-dropdown
    li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
    background: #fff;
    color: #f0a70a;
}
.page-view {
    .page-content {
        .layout {
            .layout-ceiling {
                .layout-ceiling-main {
                    .header_nav {
                        .ivu-menu-vertical.ivu-menu-light {
                            .ivu-menu-submenu-title {
                                i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
                                    &:before {
                                        content: "";
                                    }
                                }
                            }
                        }
                    }
                    .rr {
                        .login_register .ivu-menu-submenu-title .ivu-icon {
                            &:before {
                                content: "";
                            }
                        }
                    }
                }
            }
        }
    }
}
.page-view2 {
    .page-content {
        .layout {
            .layout-ceiling {
                .layout-ceiling-main {
                    .header_nav {
                        .ivu-menu-vertical.ivu-menu-light {
                            .ivu-menu-submenu-title {
                                i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon {
                                    &:before {
                                        content: "";
                                    }
                                }
                            }
                        }
                    }
                    .rr {
                        .login_register .ivu-menu-submenu-title .ivu-icon {
                            &:before {
                                content: "";
                            }
                        }
                    }
                }
            }
        }
    }
}
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 14px;
    background: transparent !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

/*自定义滚动条样式*/

::-webkit-scrollbar {
    width: 10px;

    background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
    background: #e6e6e6;
    border-radius: 25px;
}

.ivu-carousel-dots li button {
    width: 30px;
    height: 10px;
    border-radius: 14px;
}

.ivu-menu-dark,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #18202a;
}

#checkbox {
    width: 10px;
}

// .login_right {
//   position: absolute;
//   background: #fff;
//   width: 350px;
//   height: 510px;
//   top: 35px;
//   right: 50px;
// }

.login_title {
    color: #000;
    text-align: center;
    height: 80px;
    font-size: 25px;
}
.login_right .ivu-select-dropdown {
    background: #fff;
}

.ivu-form-inline .ivu-form-item {
    display: block;
    margin-right: 0;
}

.layout {
    position: absolute;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-ceiling-main {
    height: 50px;
    line-height: 50px;
    margin-left: 128px;
}

.layout-ceiling-main .rr {
    float: right;
}

.layout-ceiling-main .ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 0;
}

.layout-ceiling-main .ivu-menu-item {
    font-size: 14px;
}

.layout-ceiling-main a {
    color: #fff;
    display: inline-block;
    line-height: 40px;
    height: 40px;
    text-align: center;
    margin-left: 38px;
    /*padding: 0 15px;*/
}

.header_nav {
    float: left;
}

.ivu-dropdown-rel a {
    width: 100%;
}

.ivu-dropdown-menu {
    width: 100px;
}

.layout-ceiling-main .ivu-select-dropdown {
    background: #ffffff;
    margin-left: 25px;
    .ivu-dropdown-item {
        color: #333;
    }
}

.ivu-select-dropdown a {
    width: 100%;
    text-align: left;
    margin: 0;
}

.ivu-dropdown-item:hover {
    background: #ffffff;
}


.ivu-dropdown-item img {
    width: 14px;
    vertical-align: middle;
}

.ivu-radio-inner:after {
    background: #18202a;
}

/*安全中心*/

.user_center {
    height: 900px;
}

.ivu-menu-item {
    text-align: center;
}

.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding-left: 0 !important;
    padding-right: 0;
    color: #fff;
    font-size: 14px;
    border-right: 0 !important;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #1855fd !important;
}

.rr .ivu-menu-vertical.ivu-menu-light:after {
    width: 0;
}

.layout_menu_right {
    margin-left: 3%;
    background: #18202a;
    color: #fff;
    padding-bottom: 130px;
}

.menu_right_title {
    font-size: 16px;
    line-height: 45px;
    margin: 0 10px;
    padding-left: 20px;
    border-bottom: 1px solid #263142;
}

.category .ivu-radio-group.ivu-radio-group-button {
    width: 100%;
}

.category .ivu-radio-group label {
    font-size: 14px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper {
    background: #28313e;
    color: #979797;
    border: 0;
    padding: 0 25px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper-checked {
    color: #fff;
    background: #2f3d52;
    box-shadow: none;
}

.category .ivu-radio-wrapper span {
    padding-left: 0;
}

.purse_address_left {
    float: left;
    width: 86%;
}

.purse_address p {
    font-size: 10px;
    line-height: 25px;
    color: #979797;
}

.purse_address_left_icon {
    line-height: 40px;
    height: 40px;
    width: 100%;
}

.purse_address_left_icon img {
    vertical-align: middle;
    margin-right: 10px;
}

.purse_address span {
    font-size: 14px;
    float: left;
    color: #fff;
    padding: 0 20px;
    background: #28313e;
    width: 21%;
}

.purse_address_left_icon label {
    float: left;
    width: 72%;
    height: 40px;
    border: 2px solid #28313e;
    padding-left: 20px;
}

#qrcode canvas {
    width: 120px;
}

#qrcode img {
    width: 100%;
}

.ivu-select-item:hover {
    background: #aaa;
}

.ivu-select-item-selected,
.ivu-select-item-selected:hover {
    background: #aaa;
}

.chart_container #chart_updated_time {
    float: left;
}

// 粘住底部布局
// .page-content {
//     min-height: 100%;
//     padding-bottom: 200px;
// }

.footer {
    width: 100%;
    overflow: hidden;
    // margin-top: -200px;
}
.footer_content {
    height: 200px;
    padding: 50px 10%;
    color: #53575c;
    background: #1e222a;
}

.footer_left {
    float: left;
    font-size: 14px;
}

.footer_left img {
    margin: 15px 0;
}

.footer_left p {
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.6);
}

.footer_right {
    float: right;
    /*margin-top: 15px;*/
    text-align: left;
    /* margin-right: 20px; */
}

.footer_right ul {
    float: left;
    margin: 0 30px;
}

.footer_right ul li a {
    color: #53575c;
    color: rgba(255, 255, 255, 0.6);
    line-height: 25px;
    display: block;
}

.footer_title {
    font-size: 15px;
    height: 35px;
}

.ivu-select-selected-value {
    color: #bbbec4;
}

/*法币交易*/

.ivu-col {
    text-align: center;
}

.page-view {
    .page-content {
        .layout {
            .layout-ceiling {
                .rr {
                    .login_register {
                        .ivu-menu-light.ivu-menu-vertical
                            .ivu-menu-item-active:not(.ivu-menu-submenu) {
                            color: #fff;
                        }
                    }
                    .isLogin {
                        .ivu-dropdown {
                            display: inline-block;
                            .ivu-select-dropdown {
                                padding: 0;
                                margin: 0;
                                .ivu-dropdown-menu {
                                    .ivu-dropdown-item {
                                        background: #fff;
                                        color: #000;
                                        border-radius: 5px;
                                        &:hover {
                                            background: #fff;
                                            color: #000;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
.changelanguage {
    .ivu-dropdown {
        .ivu-select-dropdown {
            z-index: 901;
        }
    }
}
// 重置分页器颜色
.ivu-page-item-active {
    background-color: #f0ac19;
    border-color: #f0ac19;
    color: #fff;
}
.ivu-page-next:hover,
.ivu-page-prev:hover {
    border-color: #f0ac19;
}
.ivu-page-next:hover a,
.ivu-page-prev:hover a {
    color: #f0ac19;
}

.ivu-page-item-jump-prev a,
.ivu-page-item-jump-next a {
    color: #666;
}
.ivu-page-item-jump-prev a:hover,
.ivu-page-item-jump-next a:hover {
    color: #f0ac19;
}
.ivu-page-item:hover {
    border-color: #f0ac19;
}
.ivu-page-item:hover a {
    color: #f0ac19;
}
.ivu-page-item.ivu-page-item-active a {
    color: #fff;
}
.ivu-page-disabled {
    a {
        cursor: not-allowed;
        .ivu-icon {
            cursor: not-allowed;
        }
    }
}
/*input框样式重置*/
.ivu-input {
    &:hover {
        border-color: #f0ac19;
    }
    &:focus {
        border-color: #f0ac19;
        -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
        -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
        box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    }
}
/*下拉框样式重置*/
.ivu-select-selection:hover {
    border-color: #f0ac19;
}
.ivu-select-visible .ivu-select-selection {
    border-color: #f0ac19;
    -moz-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    -webkit-box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
    box-shadow: 2px 2px 5px #fff, -2px -2px 4px #fff;
}
.ivu-select-selected-value {
    color: #333;
}
.ivu-select-selection-focused {
    border-color: #f0ac19;
}
/*table组件样式重置*/
.ivu-table-wrapper {
    border: none;
}
.ivu-table-wrapper > .ivu-spin-fix {
    border-color: #fff;
}
/*加载样式重置*/
.ivu-spin-dot {
    background: #f0ac19;
}
.ivu-tabs-bar {
    border-color: #f5f5f5;
}
/*日期组件样式重置*/
.ivu-picker-panel-icon-btn {
    &:hover {
        color: #f0ac19;
    }
}
.ivu-date-picker-cells-focused em {
    -moz-box-shadow: 0 0 0 1px #f0ac19 inset;
    -webkit-box-shadow: 0 0 0 1px #f0ac19 inset;
    box-shadow: 0 0 0 1px #f0ac19 inset;
    &:after {
        background: #f0ac19;
    }
}
.ivu-date-picker-cells-cell-selected em,
.ivu-date-picker-cells-cell-selected:hover em {
    background: #f0ac19;
}
.ivu-date-picker-cells-cell-today em:after {
    background: #f0ac19;
}
.ivu-date-picker-cells-cell-range:before {
    background: rgba(240, 167, 10, 0.2);
}
.ivu-date-picker-cells-cell:hover em {
    background: #fff;
    color: #f0ac19;
}
/*按钮样式重置*/
.ivu-btn-primary:hover {
    background: #f0ac19;
    border-color: #f0ac19;
}

/*radio样式重置*/
.ivu-radio-checked .ivu-radio-inner {
    border-color: #f0ac19;
}
.ivu-radio-checked:hover {
    .ivu-radio-inner {
        border-color: #f0ac19;
    }
}
.ivu-radio-inner:after {
    background: #f0ac19;
}
.ivu-switch-checked {
    border-color: #f0ac19;
    background-color: #f0ac19;
}
.ivu-switch:focus {
    box-shadow: none;
}
.ivu-radio-focus {
    box-shadow: none;
}

/*下拉框*/
.ivu-select-item-selected {
    background: #fff;
    color: #f0ac19;
}
// primary按钮
.ivu-btn-primary {
    background-color: #f0ac19;
    border-color: #f0ac19;
}
.ivu-btn-text:hover {
    color: #f0ac19;
}
// .ivu-btn:hover{
//     color: #f0ac19;
//     background-color: #fff;
//     border-color: #f0ac19;
// }

/*排序小箭头样式重置*/
.ivu-table-sort i.on {
    color: #f0ac19;
}
.ivu-table-sort i:hover {
    color: #f0ac19;
}
</style>
