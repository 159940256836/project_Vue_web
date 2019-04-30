
<template>
    <div class="nav-rights common">
        <Form class="form" :model="formItem" :label-width="65" inline>
            <FormItem label="项目名称:">
                <Input v-model="formItem.ieoName" type="text"></Input>
            </FormItem>
            <FormItem label="认购时间:">
                <DatePicker type="daterange" v-model="formItem.date" style="width:180px;"></DatePicker>
            </FormItem>
            <FormItem label="认购状态: ">
                <Select v-model="formItem.status" style="width:100px;">
                    <Option value="0">失败</Option>
                    <Option value="1">成功</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="warning" @click="search">搜索</Button>
                <!-- <Button style="margin-left: 8px " @click="handleClear" class="clear_btn">清空条件</Button> -->
            </FormItem>
        </Form>
        <div class="page">
            <Table :columns="columns" :data="data"></Table>
            <Page :current="pageNo" :total="total" :page-size="pageSize" @on-change="changePage" class="pageWrapper"></Page>
        </div>
    </div>
</template>
<script>
import moment from "moment";
export default {
    name: "ieoadmin",
    data() {
        const columns = [
            {
                title: "发售币种",
                key: "saleCoin"
            },
            {
                title: "项目名称",
                key: "ieoName"
            },
            {
                title: "发售总量",
                key: "saleAmount"
            },
            {
                title: "募集币种",
                key: "raiseCoin"
            },
            {
                title: "募集周期(UTF+8)",
                width: 200,
                render: (h, params) => {
                    return h("span", {}, params.row.startTime + "-" + params.row.endTime)
                }
            },
            {
                title: "认购数量",
                key: "receiveAmount"
            },
            {
                title: "使用数量",
                key: "payAmount"
            },
            {
                title: "认购时间",
                key: "createTime"
            },
            {
                title: "认购状态",
                render: (h, params) => {
                    const str = params.row.status == 0 ? "失败" : "成功";
                    return h("span", {}, str);
                }
            }
        ]
        return {
            columns,
            total: 0,
            formItem: {
                date: "",
            },
            pageNo: 1,
            data: [],
            pageSize:1,
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
        this.paramsFun = getParams(mobile, userName, 1);
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
    }
}
</script>
<style lang="scss" scoped>
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
</style>
