<template>
    <div class="nav-rights nav-bottom">
        <h2 class="title" style="margin-top:22px;">{{ this.$t('uc.member.FeeGrade') }}</h2>
        
        <div class="rightarea">
            <div class="fee-top">
                <ul>
                    <li class="myLevel">{{mySelf.gradeCode}}</li>
                    <li>
                        <p>{{$t("leverDescPage._feeGread")}}</p>
                        <p>{{mySelf.exchangeFeeRate}}</p>
                    </li>
                    <li>
                        <p>{{$t("leverDescPage._legalServiceCharge")}}</p>
                        <p>{{mySelf.exchangeFeeRate}}</p>
                    </li>
                    <li>
                        <p>{{$t("leverDescPage._leverServiveCharge")}}</p>
                        <p>{{mySelf.exchangeFeeRate}}</p>
                    </li>
                    <li>
                        <p>{{$t("leverDescPage._dayLimit")}}(USDT)</p>
                        <p>{{mySelf.withdrawCoinAmount}}</p>

                    </li>
                    <li>
                        <p>{{$t("leverDescPage._daynumLimit")}}</p>
                        <p>{{mySelf.dayWithdrawCount}}</p>
                    </li>
                </ul>
            </div>
            <div class="feelevelTop">
                <h4>{{$t("leverDescPage._gradDes")}}</h4>
                <Table :columns="columns" :data="allSelf"></Table>
                <div class="cover-box-left"></div>
                <div class="cover-box-right"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mySelf: {},
            allSelf: []
        }
    },
    created() {
        // const level = this.$store.getters.member.memberGradeId;
        const level = (memberGradeId) => {
            return `V${memberGradeId}`
        }
        const memberGradeId = level(this.$store.getters.member.memberGradeId);
        this.init().then(data => {
            const mySelf = data.filter(ele => ele.gradeCode == memberGradeId);
            this.mySelf = mySelf[0];
            this.allSelf = data;
        })
    },
    methods: {
        init() {
            return this.$http.get(this.host + "/uc/integration/grade").then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        resolve(resp.data);
                    })
                }
            })
        }
    },
    computed: {
        columns() {
            const arr = [];
            const E = this.$store.getters.lang == "English" ? 230 : '';
            const L = this.$store.getters.lang == "English" ? 200 : '';
            arr.push({
                title: this.$t('leverDescPage._grade'),
                key: "gradeCode"
            });
            arr.push({
                title: this.$t('leverDescPage._BitcoinServiceCharge'),
                key: "gradeCode"
            });
            arr.push({
                title: this.$t('leverDescPage._legalServiceCharge'),
                key: "gradeCode"
            });
            arr.push({
                title: this.$t('leverDescPage._leverServiveCharge'),
                key: "gradeCode"
            });
            arr.push({
                title: this.$t('leverDescPage._dayLimit')+"（USDT）",
                width: E,
                key: "gradeCode"
            });
            arr.push({
                title: this.$t('leverDescPage._daynumLimit'),
                width: L,
                key: "gradeCode"
            });
            return arr;
        }

    }
}
</script>
<style lang="scss" scoped>
%flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
$color: #39f;
.fee-top {
    ul {
        @extend %flex;
        padding: 31px 35px;
        .myLevel {
            padding: 20px;
            border-radius: 50%;
            background-color: $color;
            color: #fff;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
        }
        li p:first-child {
            color: #8090AF;
            margin-bottom: 24px;
        }
    }
    h4 {
        font-size: 18px;
        line-height: 20px;
        height: 18px;
        font-weight:400;
    }
}

.feelevelTop {
    position: relative;
    h4 {
        padding-left: 35px;
        font-weight:400;
        font-size: 18px;
    }
    .cover-box-left,
    .cover-box-right
    {
        height: 288px;
        width: 35px;
        background: #111530;
        position: absolute;
        z-index: 999;
        bottom: 0;
    }
    .cover-box-left {
        left: 0;       
    }
    .cover-box-right {
        right: 0;
    }
}

.nav-bottom {
    .rightarea {
        padding: 0 !important;
    }
    
}

</style>

<style lang="scss">
    .feelevelTop {
        .ivu-table-wrapper {
            margin-top: 25px;
        }
        .ivu-table {
            background: transparent;
            td {
                background: #111530;
                border-bottom: 1px solid #2A3850;
                color: #fff;
            }

            th {
                border-bottom: none;
                color: #8090AF;
            }   

            .ivu-table-tbody tr:last-child td {
                border: none;
            }

            .ivu-table-header tr th:last-child,
            .ivu-table-tbody tr td:last-child {
                text-align: center;
            }
        }
        .ivu-table-wrapper .ivu-table .ivu-table-header th {
            background: #10122B;
        }

        .ivu-table-header thead tr{
            width: 100%;
            height: 55px;
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

        
        .ivu-table-header table,
        .ivu-table-body table {
            width: 100%;
        }

        .ivu-table {
            .ivu-table-header {
                tr{
                    th:first-child {
                        padding-left: 35px;
                        .ivu-table-cell{
                            text-align: left;
                            padding-left: 0;
                        }
                    }
                }
            }
            .ivu-table-tbody {
                tr{
                    td:first-child {
                        padding-left: 35px;
                        .ivu-table-cell{
                            text-align: left;
                            padding-left: 0;
                        }
                    }
                }
            }
        }
    }

    
</style>

