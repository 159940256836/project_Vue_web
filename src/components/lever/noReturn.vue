<template>
    <div>
        当前申请

    </div>
</template>
<script>
const paramFun = (pageSize) =>(repayment)=> (pageNo) => ({
    pageSize, repayment, pageNo
});
const getParams = paramFun(10, 0);
export default {
    data() {
        return {
            pageNo: 1,
        }
    },
    props:["repayment"],
    created() {
        this.init();
        // this.repayment == 0 && ()
    },
    methods: {
        init() {
            const params = getParams(this.repayment)(this.pageNo);
            this.$http.post(this.host + "/margin-trade/loan/record_list", params).then(res => {
                console.log(res);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
