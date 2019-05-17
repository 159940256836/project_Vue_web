<template>
    <div class="noReturn">
        <h4>申请记录</h4>
        <div>
            <Table :columns="columns" :data="data"></Table>
        </div>
        <div class="lever-list" style="">
            <Page v-show="totalElement > 10" :total="totalElement" @on-change="changePage" />
        </div>
    </div>
</template>
<script>
const paramFun = (pageSize, paymentType) => (pageNo) => ({
    pageSize, paymentType, pageNo,
});
const getParams = paramFun(10, 3);
export default {
    data() {
        return {
            pageNo: 1,
            totalElement: 0,
            columns: [
                {
                    title: "申请时间",
                    key: "createTime",
                    width: 150,
                }, {
                    title: "杠杆账户",
                    render: (h, params) => {
                        return h("div", {}, params.row.leverCoin.symbol)
                    }
                }, {
                    title: "币种",
                    render: (h, params) => {
                        return h("div", {}, params.row.coin.unit)
                    }
                }, {
                    title: "数量",
                    key: "amount"
                }, {
                    title: "利率",
                    key: "interestRate",
                    render:(h,params)=>{
                        return h("div",{},params.row.leverCoin.interestRate)
                    }
                }, {
                    title: "利息累计",
                    key: "interest"
                },
                {
                    title: "状态",
                    render: (h, params) => {
                        return h("div", {}, "已归还");
                    }
                }
            ],
            data: [],
        }
    },
    props: ["repayment"],
    created() {
        this.init();
    },
    watch:{
        repayment(newValue, oldValue){
            this.init();
        }
    },
    methods: {
        changePage(index) {
            this.pageNo = index;
            this.init();
        },
        init() {
            const params = getParams(this.pageNo);
            this.$http.post(this.host + "/margin-trade/repayment/history", params).then(res => {
                console.log(res);
                const data = res.body;
                if (data.code == 0) {
                    this.data = data.data.content;
                    this.totalElement = data.data.totalElements;
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.noReturn {
    margin-top: 30px;
    width: 100%;
    min-height: 300px;
    padding-bottom: 30px;
    border: 1px solid #eee;
    h4 {
        font-size: 20px;
        line-height: 2.5;
        border-bottom: 1px solid #eee;
        background: #fafafd;
        padding-left: 15px;
    }
    .lever-list {
        margin-top:20px;
        text-align:right;
        padding-right: 25px;
    }
}
</style>
