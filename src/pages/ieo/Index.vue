<template>
    <div :class="ieo_box">
        <div class="common">
            <Tabs value="all" @on-click="tablClick">
                <TabPane label="全部" name="all"></TabPane>
                <TabPane label="预热中" name="ready"></TabPane>
                <TabPane label="进行中" name="doing"></TabPane>
                <TabPane label="已结束" name="alreadyEnd"></TabPane>
            </Tabs>
            <div class="contentWrapper">
                <template v-for="(item, index) in list">
                    <ieoAbstract :content="item"></ieoAbstract>
                </template>
            </div>
            <div class="page">
                <Page :total="total" size="small" :current="currentPage" @on-change="changePage"/>
            </div>
        </div>
    </div>
</template>
<script>
import ieoAbstract from "../../components/ieo/index"
import { minHeightMinx } from "../../minxs/minxs.js";
const FixAraible = (pageSize) => (pageNum) => (status) => ({
    pageSize: pageSize,
    pageNum: pageNum,
    status: status,
    id: ""
});
const getParams = FixAraible(3);
export default {
    mixins: [minHeightMinx],
    components: {
        ieoAbstract
    },
    name: "ieo",
    data() {
        return {
            ieo_box: 'ieo_box',
            list: [],
            total: 0,
            pageNum: 1,
            status: "",//1-预热中，2-进行中，3-已结束
            currentPage:1,
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const params = getParams(this.pageNum)(this.status);
            this.check(params).then(res => {
                if (res.code == 0) {
                    this.list = res.data;
                    this.total = res.total;
                }
            })
        },
        check(params) {
            return this.$http.post(this.host + "/uc/ieo/all", params).then(res => {
                return new Promise((resolve, reject) => {
                    resolve(res.body);
                })
            })
        },
        tablClick(name) {
            switch (name) {
                case "all":
                    this.ieo_box = "ieo_box";
                    this.status = "";
                    break;
                case "ready":
                    this.ieo_box = "ieo_box_ready";
                    this.status = "1"
                    break;
                case "doing":
                    this.ieo_box = "ieo_box_doing";
                    this.status = "2"
                    break;
                case "alreadyEnd":
                    this.ieo_box = "ieo_box_alreadyEnd";
                    this.status = "3"
                    break;
            }
            this.currentPage = 1;
            this.init();
        },
        changePage(index){
            this.pageNum = this.currentPage = index;
            this.init();
        }
    }
}
</script>
<style lang="scss" scoped>
.common {
    padding: 50px 10%;
    background: #1c2435;
    overflow: hidden;
    .contentWrapper{
        overflow: hidden;
    }
    .ieoWrapper {
        float: left;
        margin-right: 5%;
    }
    .ieoWrapper:nth-child(3) {
        margin-right: 0%;
    }
    .page {
        margin-top: 20px;
        text-align: right;
    }
}
</style>
<style lang="scss">
$pageTheme: rgb(13, 70, 125);
.ieo_box_ready {
    .ivu-tabs-ink-bar {
        background: orange;
    }
}
.ieo_box_doing {
    .ivu-tabs-ink-bar {
        background: green;
    }
}
.ieo_box_alreadyEnd {
    .ivu-tabs-ink-bar {
        background: #dcdee2;
    }
}
.common {
    .ivu-tabs-tab {
        padding: 16px;
        &:nth-child(1) {
            color: #2d8cf0;
        }
        &:nth-child(2) {
            color: #2d8cf0;
        }
        &:nth-child(3) {
            color: orange;
        }
        &:nth-child(4) {
            color: green;
        }
        &:nth-child(5) {
            color: #dcdee2;
        }
    }
    .ivu-page-item-active {
        background-color: $pageTheme;
        border-color: $pageTheme;
        color: #fff;
    }
    .ivu-page-next:hover,
    .ivu-page-prev:hover {
        border-color: $pageTheme;
    }
    .ivu-page-next:hover a,
    .ivu-page-prev:hover a {
        color: $pageTheme;
    }

    .ivu-page-item-jump-prev a,
    .ivu-page-item-jump-next a {
        color: #666;
    }
    .ivu-page-item-jump-prev a:hover,
    .ivu-page-item-jump-next a:hover {
        color: $pageTheme;
    }
    .ivu-page-item:hover {
        border-color: $pageTheme;
    }
    .ivu-page-item:hover a {
        color: $pageTheme;
    }
    .ivu-page-item.ivu-page-item-active a {
        color: #fff;
    }
    .ivu-page-disabled {
        a {
            cursor: not-allowed;
            .ivu-icon {
                cursor: not-allowed;
            }
        }
    }
}
</style>



