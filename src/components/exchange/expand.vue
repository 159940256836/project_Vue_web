<style scoped>
    .expand-row{
        height: 40px;
    }
    td.ivu-table-expanded-cell{
        padding: 10px 50px;
    }
    .expand-row .ivu-col{
        line-height: 20px;
    }
    .expand {
        border: 1px solid #2A3850;
        padding: 16px 20px;
        color: #8090AF;
    }

    .expand  .ivu-row {
        line-height: 40px;
        border-bottom: 1px solid #2A3850;
    }

    .expand  .ivu-row:last-child{
        padding-bottom: 0;
        border-bottom: none;
    }
</style>
<template>
    <div class="expand">
        <Row class="expand-row" :class="skin">
            <Col span="8">
                <span class="expand-key">{{$t('exchange.expand.time')}} </span>
            </Col>
            <Col span="4">
                <span class="expand-key">{{$t('exchange.expand.price')}} </span>
            </Col>
            <Col span="4">
                <span class="expand-key">{{$t('exchange.expand.amount')}} </span>
            </Col>
            <Col span="4">
              <span class="expand-key">{{$t('historyAndCu.turnoverAmount')}}</span>
            </Col>
            <Col span="4">
                <span class="expand-key">{{$t('exchange.expand.fee')}}</span>
            </Col>
        </Row>
        <Row v-for="(row , index) in rows" :key="index">
            <Col span="8">
                <span class="expand-value">{{ row.time|dateFormat }}</span>
            </Col>
            <Col span="4">
                <span class="expand-value">{{ row.price|toFloor}}</span>
            </Col>
            <Col span="4">
                <span class="expand-value">{{ row.amount|toFloor}}</span>
            </Col>
            <Col span="4">
            <span class="expand-value">{{ row.turnover|toFloor}}</span>
            </Col>
            <Col span="4">
                <span class="expand-value">{{ row.fee|toFloor}}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            skin:String,
            rows: Array
        }
    };
</script>
