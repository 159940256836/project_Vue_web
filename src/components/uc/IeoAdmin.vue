
<template>
    <div class="nav-rights">
        <Form
            class="form"
            :model="formItem"
            :label-width="95"
            inline
        >
            <FormItem :label="$t('ieoAdmin.projectName')">
                <Input
                    v-model="formItem.ieoName"
                    type="text"
                ></Input>
            </FormItem>
            <FormItem :label="$t('ieoAdmin.SubscriptionTime')">
                <DatePicker
                    type="daterange"
                    v-model="formItem.date"
                    style="width:180px;"
                ></DatePicker>
            </FormItem>
            <FormItem :label="$t('ieoAdmin.SubscriptionStatus')">
                <Select
                    v-model="formItem.status"
                    style="width:100px;"
                    :placeholder="select"
                >
                    <Option value="0">{{$t('ieoAdmin.failure')}}</Option>
                    <Option value="1">{{$t('ieoAdmin.success')}}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button
                    type="primary"
                    @click="search"
                >{{$t('historyAndCu.search')}}</Button>
                <!-- <Button style="margin-left: 8px " @click="handleClear" class="clear_btn">清空条件</Button> -->
            </FormItem>
        </Form>
        <div class="page">
            <Table
                :columns="columns"
                :data="data"
                :no-data-text="$t('common.nodata')"
            ></Table>
            <Page
                :current="pageNo"
                v-show="total > 10"
                :total="total"
                @on-change="changePage"
                class="pageWrapper"
            ></Page>
        </div>
    </div>
</template>
<script>
import moment from "moment";
export default {
    name: "ieoadmin",
    data() {

        return {
            select:"select",
            total: 0,
            formItem: {
                date: "",
            },
            pageNo: 1,
            data: [],
            paramsFun: function () { },
            params: {
                pageNum: 1,
                ieoName: "",
                status: "",//状态 (0-失败，1-成功)
                startTime: "",//开始时间
                endTime: "",//结束时间
            }
        }
    },
    created() {
        const mobile = this.$store.getters.member.mobile;
        const userName = this.$store.getters.member.username;
        const getParams = (mobile, userName, pageSize) => (pageNum) => (ieoName) => (status) => (startTime) => (endTime) => ({
            mobile,
            userName,
            pageSize,
            pageNum,
            ieoName,
            status,
            startTime,
            endTime
        });
        this.paramsFun = getParams(mobile, userName, 10);
        this.init();
    },
    methods: {
        init() {
            this.getList(this.paramsFun).then(res => {
                const data = res.data;
                this.data = data;
                this.total = res.total;
            })
        },
        getList(paramsFun) {
            const temp = this.params;
            const params = paramsFun(temp.pageNum)(temp.ieoName)(temp.status)(temp.startTime)(temp.endTime);
            return this.$http.post(this.host + "/uc/ieo/record", params).then(res => {
                const resp = res.body;
                if (resp.code == 0) {
                    return new Promise((resolve, reject) => {
                        resolve(resp);
                    })
                }
            })
        },
        search() {
            this.pageNo = 1;
            const params = this.params;
            const formItem = this.formItem;
            let rangeDate = formItem.date;
            if (rangeDate && rangeDate[0]) {
                let startTime = new Date(rangeDate[0]);
                let endTime = new Date(rangeDate[1]);
                params.startTime = this.formatTime(startTime);
                params.endTime = this.formatTime(endTime);
            } else {
                params.startTime = "";
                params.endTime = "";
            }
            params.ieoName = formItem.ieoName || "";
            params.status = formItem.status || "";
            this.init();
        },
        // handleClear() {
        // },
        changePage(index) {
            this.pageNo = index;
            this.params.pageNum = index;
            this.init();
        },
        formatTime(str) {
            return moment(str).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    computed:{
        columns(){
            const arr = [];
            const L = this.$store.getters.lang == "English" ? 115 : '';
            const L0 = this.$store.getters.lang == "English" ? 'left' : '';
            const L1 = this.$store.getters.lang == "English" ? 111 : '';
            const L2 = this.$store.getters.lang == "English" ? 98 : '';
            const L3 = this.$store.getters.lang == "English" ? 123 : '';
            const L4 = this.$store.getters.lang == "English" ? 187 : 138;
            const L5 = this.$store.getters.lang == "English" ? 82 : '';
            const L6 = this.$store.getters.lang == "English" ? 140 : '';
            const L7 = this.$store.getters.lang == "English" ? 105 : '';
            const L9 = this.$store.getters.lang == "English" ? 80 : '';
            const L90 = this.$store.getters.lang == "English" ? 'right' : '';
            arr.push({
                title: this.$t('ieoAdmin.currencySale'),
                fixed: L0,
                width: L,
                key: "saleCoin"
            });
            arr.push({
                title: this.$t('ieoAdmin.projectName'),
                width: L1,
                key: "ieoName"
            });
            arr.push({
               title: this.$t('ieoAdmin.totalSale'),
                width: L2,
                key: "saleAmount"
            });
            arr.push({
                title: this.$t('ieoAdmin.currenCollected'),
                width: L3,
                key: "raiseCoin"
            });
            arr.push({
                title: this.$t('ieoAdmin.FundraisingCycle'),
                width: L4,
                render: (h, params) => {
                    return h("span", {}, params.row.startTime + params.row.endTime)
                }
            });
            arr.push({
                title: this.$t('ieoAdmin.SubscriptionAmount'),
                width: L6,
                key: "receiveAmount"
            });
            arr.push({
                title: this.$t('ieoAdmin.useAmount'),
                width: L7,
                key: "payAmount"
            });
            arr.push({
                title: this.$t('ieoAdmin.SubscriptionTime'),
                width: L5,
                key: "createTime"
            });
            arr.push({
                title: this.$t('ieoAdmin.SubscriptionStatus'),
                fixed: L90,
                width: L9,
                render: (h, params) => {
                    const str = params.row.status == 0 ? this.$t('ieoAdmin.failure') : this.$t('ieoAdmin.success');
                    return h("span", {}, str);
                }
            });
            return arr;
        }
    }
}
</script>
<style lang="scss" scoped>
.form.ivu-form-inline .ivu-form-item[data-v-937c4346]{
    margin-left:12px;
}
.common {
    padding: 20px;
}
.page {
    text-align: right;
    margin-top: 20px;
    .pageWrapper{
        margin-top: 20px;
    }
}

.form.ivu-form-inline .ivu-form-item {
    display: inline-block;
}
</style>
<style lang="scss">
    .nav-rights .ivu-table-cell {
        padding: 0 10px;
    }
    /*.ivu-table-overflowY::-webkit-scrollbar {!*滚动条整体样式*!*/
    /*    width: 3px;     !*高宽分别对应横竖滚动条的尺寸*!*/
    /*    height: 1px;*/
    /*}*/
    /*.ivu-table-overflowY::-webkit-scrollbar-thumb {!*滚动条里面小方块*!*/
    /*    border-radius: 10px;*/
    /*    background-color: rgba(255, 255, 255, .6);*/
    /*    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
    /*}*/
    /*.ivu-table-overflowY::-webkit-scrollbar-track {!*滚动条里面轨道*!*/
    /*    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
    /*    !*border-radius: 10px;*!*/
    /*    background: rgba(255, 255, 255, .1);*/
    /*}*/
</style>
