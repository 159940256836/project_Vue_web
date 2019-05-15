<template>
    <div :class="ieo_box" id="centent">
        <div class="common speicial">
            <Tabs  value="all" @on-click="tablClick" class="father">
                <TabPane label="全部" name="all"></TabPane>
                <TabPane label="预热中" name="ready"></TabPane>
                <TabPane label="进行中" name="doing"></TabPane>
                <TabPane label="已结束" name="alreadyEnd"></TabPane>
            </Tabs>
            <div class="contentWrapper">
                 <template v-if="list.length == 0">
                    <img src="../../assets/images/noData.png" alt="" style="width:30%;">
                </template>
                <!-- <template v-else>

                </template> -->
                <template v-for="(item, index) in list">
                    <ieoAbstract :content="item"></ieoAbstract>
                </template>
            </div>
            <div class="page">
                <Page :total="total" size="small" :current="currentPage" :page-size="pageSize" @on-change="changePage" />
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
            pageSize: 3,
            list: [],
            total: 0,
            pageNum: 1,
            status: "",//1-预热中，2-进行中，3-已结束
            currentPage: 1,
            tabid:1
        }
    },
    created() {
        this.init();
    },
    methods: {
        changeTab(n){
            this.tabid=n;
            console.log(111)
        },
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
            this.list = [];
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
            this.pageNum =this.currentPage = 1;
            this.init();
        },
        changePage(index) {
            this.list=[];
            this.pageNum = this.currentPage = index;
            this.init();
        }
    }
}
</script>
<style lang="scss" scoped>

.ivu-tabs{
    width:1200px;
}
.common {
    padding: 100px 18.75%;
    background: #fff;
    overflow: hidden;
    .contentWrapper {
        text-align: center;
        width:1200px;
        overflow: hidden;
        // border:1px solid rgba(221, 221, 221, 1)
    }
    .ieoWrapper {
        float: left;
        margin-right: 27px;
        background:#fff;
        color:#333333;

    }
    .ieoWrapper:nth-child(3) {
        margin-right: 0%;
    }
    .page {
        margin-top: 46px;
        text-align: right;
    }
}
</style>
<style lang="scss">
$pageTheme: rgb(13, 70, 125);
#centent{
    .ivu-tabs-ink-bar{
        height: 0;
    }
}
.father .ivu-tabs-bar{
    border-bottom: 1px solid #E0E0E0;
}
.tab-pane{
    display: flex;
}
.tab-pane div:hover{
    color: red;
}
.tab-pane div.active1{
    color: red;
}
.ieo_box_ready {
    // .ivu-tabs-ink-bar {
    //     background: orange;
    // }
}
.ieo_box_doing {
    // .ivu-tabs-ink-bar {
    //     background: green;
    // }
}
.ieo_box_alreadyEnd {
    // .ivu-tabs-ink-bar {
    //     background: #dcdee2;
    // }
}
.speicial {
    .ivu-tabs-tab {
        width:102px;
        height:46px;
        font-size:16px;
        // color:#fff;
        padding: 16px;
        text-align:center;
        line-height:18px;
    }
    // .ivu-page-item-active {
    //     background-color: $pageTheme;
    //     border-color: $pageTheme;
    //     color: #fff;
    // }
    .father .ivu-page-next:hover,
    .father .ivu-page-prev:hover {
        border-color: $pageTheme;
    }
    .father .ivu-page-next:hover a,
    .father .ivu-page-prev:hover a {
        color: $pageTheme;
    }

    .father .ivu-page-item-jump-prev a,
    .father .ivu-page-item-jump-next a {
        color: #666;
    }
    .father .ivu-page-item-jump-prev a:hover,
    .father .ivu-page-item-jump-next a:hover {
        color: $pageTheme;
    }
    .father .ivu-page-item:hover {
        border-color: $pageTheme;
    }
    .father .ivu-page-item:hover a {
        color: $pageTheme;
    }
    .father .ivu-page-item .ivu-page-item-active a {
        color: #fff;
    }
    .father .ivu-page-disabled {
        a {
            cursor: not-allowed;
            .ivu-icon {
                cursor: not-allowed;
            }
        }
    }
}
.father .ivu-page-item-active{
    background:#145b89
}
// .father .ivu-tabs-nav:hover{
//     color:#fff;
//     width:102px;
//     height:46px;
// }
//5.13修改
.father .ivu-tabs-tab-active{
    background:#3399FF;
    color:#fff;
    z-index:9999;
    &:hover {
        color: #fff;
    }
}

.father .ivu-tabs-nav .ivu-tabs-tab{
    margin-right:0;
}
// .father .ivu-tabs-nav .ivu-tabs-tab:hover{
//     color:#fff;
// }
</style>




