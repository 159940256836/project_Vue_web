<template>
    <div class="nav-rights">
        <div class="nav-right">
            <div class="blc_box">
                <span>赠送时间:&nbsp;</span>
                <DatePicker type="daterange" placeholder="请输入你要查询的日期" style="width: 200px" v-model="rangeDate" :editable="false"></DatePicker>
                <button class="search_btn" @click="serar">搜索</button>
            </div>
            <div class="blc-table">
                <Table stripe :columns="tableColumnsBlc" :data="tableMoney" :loading="loading" :disabled-hover="true"></Table>
                <div class="page-wrap">
                    <Page :current="pageNo" :total="parseInt(totalElement)" :page-size="pageSize" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const FixAraible = (pageSize) => (pageNum) => (startTime) => (endTime) => ({
    pageSize,
    pageNum,
    startTime,
    endTime
});
const getParams = FixAraible(10, '');
const map = new Map([["0", "推广"], ['1', '法币充值赠送'], ['2', '币币充值赠送']]);
import moment from "moment";
export default {
    components: {},
    data() {
        let that = this;
        return {
            pageNo: 1,
            pageSize: 10,
            pageNum: 1,
            type: "",
            integration: "",
            startTime: "",
            endTime: "",
            rangeDate: "",
            tableColumnsBlc: [
                {
                    title: "活动名称",
                    key: "giftName",
                },
                {
                    title: "赠送数量",
                    render:(h,params)=>{
                        return h("div",{},params.row.giftAmount+" "+params.row.giftCoin)
                    }
                },
                {
                    title: "时间",
                    key: "createTime",
                },
            ],
            tableMoney: [],
            loading: true,
            totalElement: 0
        };
    },
    created: function () {
        this.init();
    },
    methods: {
        init() {
            this.integration = this.$store.getters.member.integration;
            const params = getParams(this.pageNum)(this.startTime)(this.endTime);
            this.getList(params).then(res => {
                this.tableMoney = res.data;
                this.totalElement = res.total;
            });
        },
        getList(params) {
            return this.$http.post(this.host + "/uc/gift/record", params).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    this.loading = false;
                    return new Promise((resolve, reject) => {
                        resolve(resp)
                    })
                }
            });
        },
        changePage(index) {
            console.log(index);
            this.pageNum = this.pageNo = index;
            this.init();
        },
        serar() {
            this.pageNo = 1;
            this.loading = true;
            let rangeDate = this.rangeDate;
            console.log(rangeDate);
            if (rangeDate && rangeDate[0]) {
                let startTime = new Date(rangeDate[0]);
                let endTime = new Date(rangeDate[1]);
                this.startTime = this.formatTime(startTime);
                this.endTime = this.formatTime(endTime);
            } else {
                this.startTime = "";
                this.endTime = "";
            }
            this.init();
        },
        formatTime(date) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss")
        }
    }
};
</script>
<style lang="scss" scoped>
.nav-right {
    height: auto;
    overflow: hidden;
    padding: 0 15px;
    .nowintegration {
        font-size: 24px;
        line-height: 2;
    }
    .blc_box {
        span {
            font-size: 14px;
        }
        .search_btn {
            height: 32px;
            width: 86px;
            background: #f0ac19;
            color: #fff;
            font-size: 14px;
            border: none;
            outline: none;
            border-radius: 5px;
            margin-left: 10px;
        }
    }
    .blc-table {
        margin-top: 20px;
        .page-wrap {
            float: right;
            margin-top: 20px;
        }
    }
}
</style>
<style lang="scss">
.blc-table {
    .ivu-table-wrapper {
        .ivu-table-header {
            thead th {
                background: #fff;
            }
        }
        tbody.ivu-table-tbody .ivu-table-row td {
            background: #fff;
        }
    }
}
</style>
