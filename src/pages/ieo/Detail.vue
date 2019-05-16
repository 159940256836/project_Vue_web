<template>
    <div class="ieo_detail_box">
        <div class="common  commona" style="min-height: 1px;">
            <div class="top_box">
                <div class="ieoLogo">
                    <img :src="content.picView" alt="">
                    <span>{{content.saleCoin}}</span>
                </div>
                <div>
                    {{content.ieoName}}
                </div>
                <div>
                    <!-- <span class="type">{{status}}</span> -->
                    <!-- 5.13修改 -->
                    <div class="type" :class="status == '进行中'? 'red':(status == '已完成' ? 'yellow' : ( status == '预热中' ? 'pink' : ''))">{{status}}</div>
                </div>
            </div>
            <div class="ieoDetail">
                <div class="leftWrapper">
                    <img :src="content.pic" alt="">
                </div>
                <div class="detail">
                    <ul>
                        <li>
                            <span class="span1">发售总量</span>
                            <span class="span2">{{content.saleAmount|threeComma}}&nbsp;&nbsp;{{content.saleCoin}}</span>
                        </li>
                        <li>
                            <span class="span1">预计上线时间</span>
                            <span class="span2">{{content.expectTime}}</span>
                        </li>
                        <li>
                            <span class="span1">募集币种</span>
                            <span class="specialColor span2">{{content.raiseCoin}}</span>
                        </li>
                        <li>
                            <span class="span1">兑换比例</span>
                            <span class="span2">1{{content.raiseCoin}}={{content.ratio}}{{content.saleCoin}}</span>
                        </li>
                        <li>
                            <span class="span1">手续费</span>
                            <span class="specialColor span2">免手续费</span>
                        </li>
                        <li>
                            <span class="span1">募集周期(UTC+8)</span>
                            <span class="span2">{{content.startTime}}-{{content.endTime}}</span>
                        </li>
                    </ul>
                </div>
                <div class="progress">
                    <div class="left_circle"></div>
                    <span>无折扣认购</span>
                    <div class="right_circle left_circle"></div>
                </div>
                <div class="time time11">
                    <span>{{content.startTime}}</span>
                    <span>{{content.endTime}}</span>
                </div>
            </div>
            <div class="subscription_ratio">
                <ul>
                    <li>
                        <div>
                            <Icon type="ios-card-outline" size="25" />{{this.raiseCoinNum}}<span>{{content.raiseCoin}}</span></div>
                        <div>
                            <Icon type="ios-card" color="rgb(19,133,211)" size="25" />
                        </div>
                    </li>
                    <li class="li1">
                        <Input v-model="base" @on-change="changeNum">
                        <span slot="append">{{content.raiseCoin}}</span>
                        </Input>
                    </li>
                    <li>
                        <Input v-model="exchange" disabled>
                        <span slot="append">{{content.saleCoin}}</span>
                        </Input>
                    </li>
                    <li>
                        <Input class="pwda" type="password" v-model="password" placeholder="请输入交易密码" />
                    </li>
                    <li>
                        <div :class="status == '进行中'? 'red1':(status == '已完成' ? 'yellow1' : ( status == '预热中' ? 'pink1' : ''))" class="btn"><span long @click="startSale">{{text}}</span></div>
                        <p>进行认购即为已阅读并同意<a href="">&lt&lt风险提示&gt&gt</a></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="table1">
            <!-- 5.14修改 -->
            <div class="tabida">
                <div @click="changeTab(1)" :class="tabid==1?'activee':''">售卖方式</div>
                <div @click="changeTab(2)" :class="tabid==2?'activee':''">项目详情</div>
            </div>
            <div class="tabida1" v-show="tabid==1">
                <div>{{content.sellMode}}</div>
            </div>
            <div class="tabida1" v-show="tabid==2">
                <div>{{content.sellDetail}}</div>
            </div>
            <!-- <Tabs value="name1">
                <TabPane label="售卖方式" name="name1">{{content.sellMode}}</TabPane>
                <TabPane label="项目详情" name="name2">{{content.sellDetail}}</TabPane>
            </Tabs> -->
        </div>
    </div>
</template>
<script>
import { minHeightMinx } from "../../minxs/minxs.js";
import { fail } from 'assert';

export default {
    name: "IeoDetail",
    // mixins: [minHeightMinx],
    data() {
        return {
            text:"",
            raiseCoinNum: "",
            number: true,
            base: "",
            exchange: "",
            password: "",
            content: {},
            status,
            tabid:1,
        }
    },
    computed: {
        isLogin: function () {
            return this.$store.getters.isLogin;
        },
    },
    created() {
        if (this.$route.params.id) {
            const params = {
                pageSize: 1,
                pageNum: 1,
                status: '',
                id: this.$route.params.id
            };
            this.init(params);
        } else {
            this.$router.back(-1);
        }
    },
    methods: {
        changeTab(n){
            this.tabid=n;
        },
        init(params) {
            this.getMsg(params)
                .then(res => {
                    return res;
                }).then(res => {
                    return this.getMyRaiseCoin(res);
                }).then(res => {
                    this.raiseCoinNum = res;
                })
        },
        getMsg(params) {
            return this.$http.post(this.host + "/uc/ieo/all", params).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        this.content = resp.data[0] || {};
                        this.base = 1;
                        this.exchange = this.multity(1, this.content.ratio);
                        if(!this.isLogin){
                            this.raiseCoinNum = "--";
                            this.text = "去登录";
                            this.getStatus(this.content);
                            return;
                        }else{
                            this.getStatus(this.content);
                            resolve(this.content.raiseCoin);
                        }
                    });
                } else {
                    this.$Notice.error({
                        title: "温馨提示",
                        desc: "暂无该产品"
                    });
                }
            })
        },
        multity(x, y) {
            return String((x * y).toFixed(3));
        },
        changeNum() {
            if (this.isNaNFun(this.base)) {
                this.exchange = 0;
            } else {
                this.exchange = this.multity(Number(this.base), this.content.ratio);
            }
        },
        getMyRaiseCoin(coin) {
            return this.$http.get(this.host + `/uc/asset/wallet/${coin}`).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        !resp.data && (this.raiseCoinNum = 0);
                        resp.data && resolve(resp.data.balance);
                    })
                }
            })
        },
        startSale() {//发起募集
            // 5.14修改
            if (this.status != '进行中') {
                return false
            }
            if(!this.isLogin){
                this.$router.push("/login");
                return;
            }
            if (this.isNaNFun(this.base)) {
                this.$Message.error("请输入符合规格的持有币种");
                return;
            }
            if (this.password.length == 0) {
                this.$Message.error("请输入交易密码");
                return;
            }
            const params = {
                id: this.$route.params.id,
                amount: this.base,
                jyPassword: this.password
            };
            this.$http.post(this.host + "/uc/ieo/order", params).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    this.$Notice.success({
                        title: "温馨提示",
                        desc: resp.message
                    })
                } else {
                    this.$Notice.error({
                        title: "温馨提示",
                        desc: resp.message
                    })
                }
            })
        },
        isNaNFun(num) {
            return isNaN(Number(num));
        },
        isEmpty(num) {
            return num !== null && num !== undefined;
        },
        getStatus(content) {
            const startTime = this.formatTime(content.startTime),
                nowTime = new Date().getTime(),
                endTime = this.formatTime(content.endTime),
                surplusAmount = content.surplusAmount > 0,
                resultFun = (time1, time2) => time1 - time2 > 0,
                compareStAndNow = resultFun(nowTime, startTime) > 0,//查看当前时间是否在开始时间之后;
                compareNowAndEnd = resultFun(endTime, nowTime) > 0;//查看当前时间是否在结束时间之前;
            let str = "";
            if (!compareStAndNow) {
                str = "预热中"
            } else if (compareStAndNow && compareNowAndEnd && surplusAmount) {
                str = "进行中"
            } else if (!compareNowAndEnd || !surplusAmount) {
                str = "已完成"
            }
            this.text = this.status = str;
            if(this.text=="进行中"){
                this.text="确定"
            }
        },
        formatTime(date) {
            return new Date(date).getTime();
        },
    }
}
</script>
<style lang="scss" scoped>

.specialColor[data-v-2300a631]{
    color:#333;
}
.type.pink:before{
    background:#F15057 !important
}
.type.yellow:before{
    background:#AAA !important;
}
.type.red:before{
    background:#00B274 !important;
}
.time11{
    margin-top:16px;
    color:#666666;
    font-size:14px;
    height:12px;
    line-height:12px;
    margin-bottom: 35px;
}
.pink1{

    background:#AAA !important;
}
.red1{
    background:#3399FF !important;

}
.yellow1{
    background:#AAA !important;
}
.commona{  color:#333333;
    // height:374px;
    .top_box{
        height:60px;
    }
}
.activee{
    background:#3399FF;
    color:#fff;
}
.table1{
    width:1200px;
    margin-top:40px;
    margin-left:10.7%;
     .tabida1{
        height:100px;
        margin-top:20px;
         width:1178px;
         border:1px solid #DDDDDD;
         font-size:14px;
         color:#333333;
         padding-left:22px;
         div{
             margin-top:22px;
         }


        }
    .tabida{
        display:flex;
        height:46px;
        border-bottom: 1px solid #E0E0E0;
        font-size:16px;
        line-height:46px;

        div{
            width:102px;
            text-align:center;
        }
    }
}

.ieo_detail_box[data-v-2300a631]{
    background:#fff;
}
.red{
    color:#00B274 !important;
}
.yellow{
    color:#AAA !important;
}
.pink{

    color:#F15057;
}
%flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
%elicise {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
$color: rgb(19, 133, 211);
$lineColor: rgb(71, 100, 146);
.specialColor {
    color: $color;
}
.ieo_detail_box {
    background: rgb(25, 26, 28);
    padding: 50px 10%;
    .common {
        // mine-height:200px;
        width:1200px;
        background:#fff;
        color:#333333;
        border:1px solid rgba(221, 221, 221, 1);
        overflow: hidden;
        color: #333;
        // padding: 20px;
        margin-bottom: 30px;
        @extend %flex;
        flex-wrap: wrap;
        align-items: stretch;
        margin:20px auto;
        .top_box {
            @extend %flex;
            width: 100%;
            // padding: 10px;
            // border-radius: 10px;
            width:1200px;
            line-height: 2;
            font-size: 16px;
            border-bottom: 1px solid #E0E0E0;
            .ieoLogo {
                @extend %flex;
                margin-left:20px;
                img {
                    width: 30px;
                    margin-right: 20px;
                }
            }
            .type {
                // background: rgb(125, 131, 152);
                padding: 5px 20px;
                border-radius: 15px;
                // color: #fff;
                &:before {
                    display: inline-block;
                    content: "";
                    width: 10px;
                    height: 10px;
                    margin-right: 10px;
                    border-radius: 50%;
                    background-color: #aaa;
                }
            }
        }
        .ieoDetail {
            width: 70%;
            @extend %flex;
            align-items: stretch;
            flex-wrap: wrap;
            overflow: hidden;
            .leftWrapper {
                margin-top:12px;
                margin-left:20px;
                width: 42%;
                img {
                    // width:100%;
                    width:352px;
                    height:185px;
                    background-size:contain;

                }
            }
            .detail {
                width: 55%;
                padding: 10px;
                ul,
                li {
                    list-style-type: none;
                }
                ul {
                    height: 100%;
                    @extend %flex;
                    flex-wrap: wrap;
                    flex-direction: column;
                    li {
                        width: 100%;
                        line-height: 2.5;
                        @extend %flex;
                        .span2{
                            margin-right:22px;
                        }
                        .span1{
                            margin-left:14px;
                        }
                    }

                }
            }
            .progress {
                width: 100%;
                padding: 0 20px;
                margin-top: 20px;
                @extend %flex;
                .left_circle {
                    width: 45%;
                    height: 2px;
                    background: rgb(19, 31, 50);
                    position: relative;
                    &:before {
                        display: inline-block;
                        content: "";
                        width: 6px;
                        height: 6px;
                        margin-right: 10px;
                        border-radius: 50%;
                        background-color: $color;
                        position: absolute;
                        top: -2px;
                    }
                }
                span {
                    color: $color;
                    @extend %elicise;
                }
                .right_circle {
                    &:before {
                        right: -10px;
                    }
                }
            }
            .time {
                width: 100%;
                margin-top: 20px;
                padding: 0 20px;
                @extend %flex;
            }
        }
        .subscription_ratio {
            width: 30%;
            border-left: 1px dotted $lineColor;
            padding: 10px;
            ul {
                margin-left:22px;
                @extend %flex;
                height: 100%;
                flex-direction: column;
                .ivu-input-group{
                    border:1px solid #3399FF;
                }
                li {
                    width: 100%;
                    @extend %flex;
                    flex-wrap: wrap;
                    .btn {
                        width: 100%;
                        margin-bottom: 15px;
                        text-align: center;
                        background:#3399FF;
                        color:#fff;
                        line-height:2.5;
                        span{
                            display:block;
                            width:100%;
                            height:100%;
                        }
                    }

                }
            }
        }
    }
}
</style>

<style lang="scss">
$lineColor: rgb(71, 100, 146);
.pwda{
    border: 1px solid #3399FF;
}
.ieo_detail_box .common {
    .table {
    width:1200px;
    margin-top:40px;
    height:46px;
    .ivu-tabs-tab {
        padding: 16px;
        font-size: 26px;
        font-weight: 700;
    }
}
    .ivu-input {
        background:#fff;
        color:#333;
        outline: none;
        // border: 1px solid #3399FF;
        border:0;

        // color: #fff;
        &:hover {
            border-color: $lineColor;
        }
        &:focus {
            border-color: $lineColor;
            box-shadow: 2px 2px 5px transparent, -2px -2px 4px transparent;
        }
    }
    .ivu-input-group-append {
        background-color: transparent;
        border-left: 1px solid #3399FF;
        border-radius: 0;
        span {
            font-size: 18px;
        }
    }
}

.ieo_detail_box .common .ieoDetail .progress .left_circle[data-v-2300a631]{
    background:#3399FF;
    opacity:0.5;
}
</style>
