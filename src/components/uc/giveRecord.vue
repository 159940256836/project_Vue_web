<template>
    <div class="nav-rights">
        <div class="nav-right">
            <div class="blc_box">
                <span>{{$t('pointPage.giftTime')}}：</span>
                <DatePicker
                    type="daterange"
                    :placeholder="$t('pointPage.enterTime')"
                    style="width: 260px"
                    v-model="rangeDate"
                    :editable="false"
                >
                </DatePicker>
                <button
                    class="search_btn"
                    @click="serar"
                >
                    {{$t('pointPage.search')}}
                </button>
            </div>
            <div class="blc-table">
                <Table
                    :no-data-text="$t('common.nodata')"
                    stripe
                    :columns="tableColumnsBlc"
                    :data="tableMoney"
                    :loading="loading"
                    :disabled-hover="true"
                ></Table>
                <div class="page-wrap">
                    <Page
                        v-show="totalElement > 10"
                        :current="pageNo"
                        :total="parseInt(totalElement)"
                        :page-size="pageSize"
                        @on-change="changePage"
                    ></Page>
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
            this.pageNum = this.pageNo = index;
            this.init();
        },
        serar() {
            this.pageNo = 1;
            this.loading = true;
            let rangeDate = this.rangeDate;
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
    },
    computed: {
        tableColumnsBlc() {
            const arr = [];
            arr.push({
                title: this.$t('pointPage.activity'),
                key: "giftName",
            });
            arr.push({
                title: this.$t('pointPage.QuantityGiven'),
                render: (h, params) => {
                    return h("div", {}, params.row.giftAmount + " " + params.row.giftCoin)
                }
            });
            arr.push({
                title: this.$t('pointPage.time'),
                key: "createTime",
            })
            return arr;
        }
    }
};
</script>
<style lang="scss" scoped>
.nav-right {
    height: auto;
    overflow: hidden;
    .nowintegration {
        font-size: 24px;
        line-height: 2;
    }
    .blc_box {
        height: 60px;
        line-height: 60px;
        background: #111530;
        padding: 0 28px;
        span {
            font-size: 14px;
        }
        .search_btn {
            height: 32px;
            line-height: 32px;
            width: 86px;
            background: #3399ff;
            color: #fff;
            font-size: 14px;
            border: none;
            outline: none;
            margin: 14px;
            float: right;
            border-radius: 0;
            cursor: pointer;
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
                // background: #fff;
            }
        }
        tbody.ivu-table-tbody .ivu-table-row td {
            // background: #fff;
        }
    }
}
</style>
