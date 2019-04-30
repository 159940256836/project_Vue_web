<template>
    <div class="nav-rights">
        <div class="top">
            <ul>
                <li class="myLevel">{{mySelf.gradeCode}}</li>
                <li>
                    <p>币币手续费</p>
                    <p>{{mySelf.exchangeFeeRate}}</p>
                </li>
                <li>
                    <p>币币手续费</p>
                    <p>{{mySelf.exchangeFeeRate}}</p>
                </li>
                <li>
                    <p>币币手续费</p>
                    <p>{{mySelf.exchangeFeeRate}}</p>
                </li>
                <li>
                    每日提现额度（USDT）：{{mySelf.withdrawCoinAmount}}
                </li>
                <li>
                    每日提币笔数：{{mySelf.dayWithdrawCount}}
                </li>
            </ul>
        </div>
        <div class="top">
            <h4>等级说明</h4>
            <Table :columns="columns" :data="allSelf"></Table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        const columns = [{
            title: "等级",
            key: "gradeCode"
        },
        {
            title: "币币手续费",
            key: "exchangeFeeRate"
        }, {
            title: "法币手续费",
            key: "exchangeFeeRate"
        }, {
            title: "杠杆交易手续费",
            key: "exchangeFeeRate"
        }, {
            title: "每日提现额度（USDT）",
            key: "gradeBound",
            width:200
        }, {
            title: "每日提币笔数",
            key: "dayWithdrawCount"
        }
        ]
        return {
            columns,
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
            console.log(data);
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
    }
}
</script>
<style lang="scss" scoped>
%flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
$color: #f0ac17;
.top {
    padding: 10px;
    ul {
        @extend %flex;
        .myLevel {
            padding: 20px;
            border-radius: 50%;
            background-color: $color;
            color: #fff;
            width: 60px;
            height: 60px;
            text-align: center;
        }
    }
    h4{
        font-size: 20px;
        line-height: 3;
    }
}
</style>
