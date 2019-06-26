<template>
    <div class="box">
        <div class="top">
            <Tabs name="tab2-1">
                <TabPane 
                v-for="(item,index) in orderTypeList"
                :key="index"
                :label="item.title" 
                tab="tab2-1"
                @click.native="getOrder(item.status,currentPage)"
                >
                </TabPane>
            </Tabs>
        </div>
        <div class="table">
            <Row class="field" type="flex" align="middle">
                <Col class="first-col" span="3">订单号</Col>
                <Col span="4">创建时间</Col>
                <Col span="3">交易币种</Col>
                <Col span="2">类型</Col>
                <Col span="2">方向</Col>
                <Col span="2">交易对象</Col>
                <Col span="2">数量</Col>
                <Col span="2">金额</Col>
                <Col span="2">手续费</Col>
                <Col span="2">详情</Col>
            </Row>
            <Row class="content" type="flex" align="middle">
                <Col class="first-col" span="3">订单号</Col>
                <Col span="4">创建时间</Col>
                <Col span="3">交易币种</Col>
                <Col span="2">类型</Col>
                <Col span="2">方向</Col>
                <Col span="2">交易对象</Col>
                <Col span="2">数量</Col>
                <Col span="2">金额</Col>
                <Col span="2">手续费</Col>
                <Col span="2" class="cp" style="color:#3399FF">查看</Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderTypeList: [
                {
                    title: '全部',
                    status: null,
                },
                {
                    title: '未付款',
                    status: 1,
                },
                {
                    title: '已付款',
                    status: 2,
                },
                {
                    title: '已完成',
                    status: 3
                },
                {
                    title: '已取消',
                    status: 0
                },
                {
                    title: '申诉中',
                    status: 5
                }         
            ],
            loading: true,
            loading: true,
            totalPage: 0,
            pageSize: 10,
            totalNum: 0,
            currentPage: 1,
            status: null,
        }
    },
    methods: {
        // 获取历史记录信息
        //status :status 必填参数  pageNo:页码 pageSize:条数
        //null全部 0 已取消 1 未付款 2 已付款 3 已完成 4 申诉中
        getOrder(status, pageNo) {
            pageNo ? pageNo = this.currentPage : pageNo
            this.$http.post(this.host + "/otc/order/self", pageNo).then(res => {
                var resp = res.body;
                console.log(res)
                if (resp.code == 0 && resp.data.content) {
                } else {
                this.$Message.error(this.loginmsg);
                }
                this.loading = false;
            });
        },
        handleSearch() {
            this.tableOrder = [];
            let params = {};
            params["status"] = this.whichItem;
            if(params.status==5){
                params.status="";
            }
            params["pageNo"] = 0;
            params["pageSize"] = this.pageSize;
            if (this.ordKeyword != "") {
                params["orderSn"] = this.ordKeyword;
            }
            this.currentPage = 1;
            this.$http.post(this.host + "/otc/order/self", params).then(response => {
                var resp = response.body;
                if (resp.code == 0 && resp.data.content) {
                this.tableOrder = resp.data.content;
                this.totalPage = resp.data.totalPages;
                this.totalNum = resp.data.totalElements;
                } else {
                this.$Message.error(resp.message);
                }
                this.loading = false;
            });
        }
    },
    created() {
        this.getOrder(1,1)
    },
}
</script>

<style lang="scss" scoped>
.cp {
    cursor: pointer;
}

.box {
    position: relative;
}

.top {
    position: relative;
}

.table {
    color: #fff;
    text-align: center;
    .field {
        background: #191D3A;
        height: 50px;
        color: #8090AF;
        .first-col {
            text-align: left;
            padding-left: 28px;
        }
    }
    .content {
        background: #10122B;
        height: 50px;
        color: #fff;
        .first-col {
            text-align: left;
            padding-left: 28px;
        }
    }
}

.ivu-spin-fix {
    background: transparent;
}
</style>

