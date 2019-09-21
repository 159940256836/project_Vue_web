<template>
    <div class="nav-rights-bjc">
        <div class="nav-right">
            <p class="nowintegration">
                <span>{{ $t('pointPage.currentPoint') }}：</span>
                <span>{{ integration }}</span>
            </p>
            <div class="blc_box">
                <span>{{$t('pointPage.time')}}:&nbsp;</span>
                <DatePicker
                    type="daterange"
                    style="width: 266px"
                    v-model="rangeDate"
                    :editable="false"
                ></DatePicker>
                <button class="search_btn" @click="serar">{{$t('pointPage.search')}}</button>
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
                        :total="totalElement"
                        :page-size="pageSize"
                        @on-change="changePage"
                        id="record_pages"
                    ></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const FixAraible = (pageSize, type) => (pageNum) => (createStartTime) => (createEndTime) => ({
    pageSize,
    pageNum,
    type,
    createStartTime,
    createEndTime
});
const getParams = FixAraible(10, '');
const map = new Map([["0", "推广"], ['1', '法币充值赠送'], ['2', '币币充值赠送']]);
const mapEn = new Map([["0", "recommend"], ['1', 'legal tender recharge gift'], ['2', 'Currency recharge gift']]);
import moment from "moment";
export default {
    components: {},
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            pageNum: 1,
            type: "",
            integration: "",
            createStartTime: "",
            createEndTime: "",
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
            const params = getParams(this.pageNum)(this.createStartTime)(this.createEndTime);
            this.getList(params).then(res => {
                this.tableMoney = res.data.map(ele => ({
                    type: ele.type,
                    amount: "+" + ele.amount,
                    createTime: ele.createTime
                }));
                this.totalElement = res.total;
                console.log(this.totalElement, params);
            });
        },
        getList(params) {
            return this.$http.post(this.host + "/uc/integration/record/page_query", params).then(res => {
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
                let createStartTime = new Date(rangeDate[0]);
                let createEndTime = new Date(rangeDate[1]);
                this.createStartTime = this.formatTime(createStartTime);
                this.createEndTime = this.formatTime(createEndTime);
            } else {
                this.createStartTime = "";
                this.createEndTime = "";
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
            arr.push({ title: this.$t('pointPage.type'), render:(h,params)=>{
                return h("div",{},this.mapFun.get(String(params.row.type)));
            }});
            arr.push({ title: this.$t('pointPage.num'), key: "amount", });
            arr.push({ title: this.$t('pointPage.time'), key: "createTime"});
            return arr;
        },
        mapFun(){
            const m = this.$store.getters.lang == "English" ? mapEn : map;
            return m;
        }
    }
};
</script>
<style lang="scss" scoped>
    .nav-rights-bjc {
        .nav-right {
            height: auto;
            overflow: hidden;
            .nowintegration {
                height: 60px;
                line-height: 60px;
                font-size: 20px;
                margin-bottom: 22px;
                background: #fff;
                padding: 0 28px;
                span {
                    &:first-child {
                        color: #333;
                    }
                    &:last-child {
                        color: #FE5C5C;
                    }
                }
            }
            .blc_box {
                height: 60px;
                line-height: 60px;
                padding: 0 28px;
                background: #fff;
                margin-bottom: 22px;
                span {
                    color: #333;
                    font-size: 14px;
                }
                .search_btn {
                    height: 32px;
                    line-height: 32px;
                    width: 86px;
                    background: #E62B25;
                    color: #fff;
                    font-size: 14px;
                    border: none;
                    outline: none;
                    float: right;
                    margin: 14px;
                    cursor: pointer;
                }
            }
            .blc-table {
                .page-wrap {
                    float: right;
                    margin-top: 20px;
                }
            }
        }
    }

</style>
<style lang="scss">
    .nav-rights-bjc {
        .ivu-input {
            background: #111530;
            border: 1px solid #58698A;
            border-radius: 0;
        }
        .ivu-input-with-suffix {
            padding-right: 32px;
            border-radius: 0;
            background: #fff;
            border: 1px solid #DDDDDD;
        }
        .ivu-table {
            &:before {
                background: transparent;
            }
            td {
                background: #fff;
            }
        }
        .blc-table {
            .ivu-table-wrapper {
                .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
                .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
                    background: #fff;
                }
                .ivu-table-header {
                    thead th {
                        height: 50px;
                        background: #fff;
                    }
                }
                tbody.ivu-table-tbody .ivu-table-row td {
                    background: #111530;
                    &:last-child {
                        text-align: left;
                    }
                }
            }
        }
        #record_pages li.ivu-page-item.ivu-page-item-active {
            background-color: #fff;
            border-color: #DDDDDD;
            a {
                color: #999999;
            }
        }
        #record_pages li.ivu-page-item.ivu-page-item-active {
            &:hover {
                background-color: #fff;
                a {
                    color: #FE5C5C;
                }
            }
        }
        .ivu-page-item {
            background: #f4f6f8;
            color: #333;
            border: 1px solid #DDDDDD;
        }
        .ivu-page-item:hover {
            color: #FE5C5C;
        }
    }
</style>
