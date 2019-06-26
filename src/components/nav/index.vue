<template>
    <div class="new-nav">
        <Tabs :value="navList[0].title">
            <TabPane 
            v-for="(item,index) in navList" 
            :key="index"
            :label="item.title" 
            :name="item.title"
            >               
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import './nav.scss';//引入nav样式

export default {
    props: {
        navList: {
            type: Array,
            required: true
        },
        type: {
            default: 'tag',
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['tag', 'router'].indexOf(value) !== -1
            }
        }
    },
    data() {
        return {
        }
    },
    methods: {
        getData(params) {
            console.log(params)
        }
    },
}
</script>

<style lang="scss" scope>
.new-nav {
    width: 100%;
    min-width: 1197px;
    color: #fff;
    position: relative;
}

.ivu-tabs-bar {
    border-color: transparent;
    background: #111530;
    margin-bottom: 22px;
}

.ivu-tabs-tab {
    color: #fff;
    height: 39px;
    line-height: 49px;
    border-bottom: 1px solid red;
}

.ivu-tabs-nav .ivu-tabs-tab-active {
    color: #3399FF;
}

.new-nav-right {
    position: absolute;
    right: 0;
    top: 0;
}

</style>

