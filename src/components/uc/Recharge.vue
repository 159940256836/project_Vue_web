<template>
    <div>
        <div class="nav-recharge">
            <div class="bill_box">
                <!-- <section class="trade-group merchant-top">
                    <i class="merchant-icon tips"></i>
                    <span class="tips-word">{{$t('uc.finance.recharge.recharge')}}</span>
                </section> -->
                <section>
                    <div class="table-inner action-box open">
                        <!-- <i class="angle" style="right: 71px;"></i> -->
                        <div class="action-main">
                            <div class="action-inner">
                                <div class="inner-left" style="float: left;margin: 10px 25px 0 0;">
                                    <span class="describe">{{$t('uc.finance.recharge.symbol')}}</span>:&nbsp;&nbsp;
                                    <Select
                                            v-model="coinType"
                                            style="width:130px;"
                                            @on-change="changeCoin"
                                            :placeholder="$t('header.choose')"
                                            clearable
                                    >
                                        <Option
                                                v-for="item in coinList"
                                                :value="item.coin.unit"
                                                :key="item.coin.unit"
                                        >
                                            {{ item.coin.unit }}
                                        </Option>
                                    </Select>
                                </div>
                                <div class="inner-left" style="float: left;margin: 10px 25px 0 0;"  v-if="linkStatus">
                                    <!--<span class="describe">{{$t('uc.finance.recharge.symbol')}}</span>:&nbsp;&nbsp;-->
                                    <div class="link-main">
                                        <p
                                                class="chain-link"
                                                :class="linkStyle == 'USDT' ? 'chain' : ''"
                                                @click="changeChain('USDT')"
                                                style="margin-left: 0"
                                        >
                                            OMNI
                                            <img v-if="linkStyle == 'USDT'" :src="linkImg" >
                                        </p>
                                        <p
                                                class="chain-link"
                                                :class="linkStyle == 'ERCUSDT' ? 'chain' : ''"
                                                @click="changeChain('ERCUSDT')"
                                        >
                                            ERC20
                                            <img v-if="linkStyle == 'ERCUSDT'" :src="linkImg" >
                                        </p>
                                    </div>
                                </div>
                                <div class="inner-box deposit-address" style="margin-right: 15px;">
                                    <span class="describe" style="float: left;">{{$t('uc.finance.recharge.address')}}:&nbsp;&nbsp;</span>
                                    <div class="title" style="float: left">
                                        <Input
                                                v-model="addressErcUsdt?addressErcUsdt:qrcode.value"
                                                readonly
                                                style="width: 280px"
                                        />
                                        <span
                                                v-if="buttonAdd"
                                                class="copy-add"
                                                @click="resetAddress"
                                                :loading="loadingButton1"
                                        >
                                            {{ !loadingButton1 ? $t("uc.finance.money.getaddress") : $t("uc.finance.money.getaddress")}}
                                            <!--获取充币地址-->
                                        </span>
                                        <a
                                                v-clipboard:copy="addressErcUsdt?addressErcUsdt:qrcode.value"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                href="javascript:;"
                                                id="copyBtn"
                                                class="link-copy"
                                        >
                                            {{$t('uc.finance.recharge.copy')}}
                                        </a>
                                        <a
                                                id="showQRcode"
                                                class="link-qrcode"
                                                href="javascript:;"
                                                @click="showEwm"
                                        >
                                            {{$t('uc.finance.recharge.qrcode')}}
                                            <Modal v-model="isShowEwm">
                                                <!--<div v-show="isShowEwm" class="show-qrcode">-->
                                                <!--充币地址二维码-->
                                                <p slot="header" style="text-align: center;">
                                                    {{$t('uc.finance.money.qrcode')}}
                                                </p>
                                                <div
                                                        class="show-qrcode"
                                                        style="width: 210px;
                                                    height: 210px;
                                                    margin: 0 auto;
                                                    background: #fff;
                                                    padding: 5px;"
                                                >
                                                    <!--<qriously :value="qrcode.coinName+':'+qrcode.value" :size="qrcode.size" />-->
                                                    <qriously :value="addressErcUsdt?addressErcUsdt:qrcode.value" :size="qrcode.size"/>
                                                </div>
                                                <div slot="footer"></div>
                                            </Modal>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="action-content">
                                <div class="action-body">
                                    <p class="acb-p1">{{$t('common.tip')}}</p>
                                    <p class="acb-p2">
                                        <!--禁止充值除LCT之外的其他资产，任何非LCT资产充值将不可找回。-->
                                        • {{$t('uc.finance.recharge.msg1')}} {{ coinType? coinType: '当前' }}
                                        {{$t('uc.finance.recharge.msg11')}} {{ coinType }} {{$t('uc.finance.recharge.msg12')}}<br>
                                        • {{$t('uc.finance.recharge.msg2')}}<br>
                                        • <span style="color: #3399ff" v-if="linkStyle == 'ERCUSDT'">{{$t('uc.finance.recharge.msg3')}}{{ linkFee?linkFee:'0' }}，{{$t('uc.finance.recharge.msg31')}}<br></span>
                                        <span style="color: #3399ff" v-if="linkStyle == 'USDT'">{{$t('uc.finance.recharge.msg3')}}{{ coinTypeFee?coinTypeFee:'0' }}，{{$t('uc.finance.recharge.msg31')}}<br></span>
                                        • {{$t('uc.finance.recharge.msg4')}}<br>
                                        • {{$t('uc.finance.recharge.msg5')}}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="action-content">
                            <div class="action-body">
                                <p class="acb-p1 acb-p">{{$t('uc.finance.recharge.record')}}</p>
                                <div class="order-table">
                                    <Table
                                            stripe
                                            :columns="tableColumnsRecharge"
                                            :data="tableRecharge"
                                            :loading="loading"
                                            :no-data-text="$t('common.nodata')"
                                    ></Table>
                                    <div style="margin: 10px;overflow: hidden">
                                        <div style="float: right;">
                                            <Page
                                                    v-show="dataCount > 10"
                                                    :total="dataCount"
                                                    :current="transaction.page"
                                                    @on-change="changePage"
                                                    id="record_pages"
                                            ></Page>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueQriously from 'vue-qriously'

    Vue.use(VueQriously)

    export default {
        components: {
            VueQriously
        },
        data() {
            return {
                linkStyle: 'USDT', // 链名称
                linkStatus: false, // 链状态
                linkImg: require('../../assets/img/jiaobiao.png'),
                linkFee: '', // 最低充值金额
                addressErcUsdt: '',
                buttonAdd: false,
                loadingButton1: false,
                isShowEwm: false,
                dataCount: 0,
                loading: true,
                transaction: {
                    page: 1,
                    pageSize: 10,
                    symbol: ''
                },
                qrcode: {
                    value: '',
                    size: 200,
                    coinName: ''
                },
                coinType: '',
                coinAddress: '',
                coinTypeFee: '',
                coinList: [],
                tableRecharge: [],
                allTableRecharge: []
            }
        },
        methods: {
            /*链名称*/
            changeChain(name) {
                console.log(name)
                this.linkStyle = name
                if (name == 'ERCUSDT') {
                    this.qrcode.value = ''
                    if (!this.addressErcUsdt) {
                        const params = {}
                        params['type'] = name
                        this.loadingButton1 = true
                        this.$http.post(this.host + '/uc/total/asset/ercUsdtAddress', params).then(response => {
                            const resp = response.body
                            if (resp.code == 0) {
                                console.log(resp)
                                console.log(resp.data.coin.minRechargeAmount)
                                this.linkFee = resp.data.coin.minRechargeAmount
                                this.addressErcUsdt = resp.data.address
                                if (this.addressErcUsdt) {
                                    this.buttonAdd = false
                                } else this.buttonAdd = true
                                console.log(this.addressErcUsdt)
                                /*this.$Message.success(resp.message)*/
                            } else {
                                this.$Message.error(resp.message)
                            }
                        })
                    }
                } else {
                    this.addressErcUsdt = ''
                    this.getMoney()
                }
            },
            // 复制功能
            copyToken(data) {
                const url = data
                const oInput = document.createElement('input')
                oInput.value = url
                document.body.appendChild(oInput)
                oInput.select() // 选择对象
                console.log(oInput.value)
                document.execCommand('Copy') // 执行浏览器复制命令
                this.$Message.success(
                        this.$t('uc.finance.recharge.copysuccess')
                )
                oInput.remove()
            },
            changePage(index) {
                console.log(index)
                this.transaction.page = index
                this.getList()
            },
            showEwm() {
                this.isShowEwm = !this.isShowEwm
            },
            onCopy(e) {
                this.$Message.success(
                        this.$t('uc.finance.recharge.copysuccess') + e.text
                )
            },
            onError(e) {
                this.$Message.error(this.$t('uc.finance.recharge.copysuccess'))
            },
            changeCoin(value) {

                console.log(value)
                if (value == 'USDT') {
                    this.linkStatus = true
                } else {
                    this.linkStyle = 'USDT'
                    this.addressErcUsdt = ''
                    this.linkStatus = false
                }
                this.coinList.forEach((item) => {
                    // model就是上面的数据源
                    // console.log(item, item.coin.unit, value);
                    if (item.coin.unit == value) {
                        this.coinTypeFee = item.coin.minRechargeAmount
                        this.qrcode.value = item.address
                    }
                    // console.log(this.coinTypeFee)
                })
                if (!this.qrcode.value) {
                    this.buttonAdd = true
                } else {
                    this.buttonAdd = false
                }
                if (value) {
                    this.transaction.symbol = value
                } else if (value == undefined) {
                    this.transaction.symbol = ''
                }
                this.getList()
            },
            // 获取充币地址
            resetAddress() {
                if (!this.coinType) {
                    /* 请选择币种*/
                    this.$Message.error(this.$t('uc.finance.withdraw.symboltip'))
                    return
                }
                const params = {}
                if (this.linkStyle == 'ERCUSDT') {
                    params['unit'] = 'ERCUSDT'
                } else {
                    params['unit'] = this.coinType
                }

                console.log(this.coinType)
                const that = this
                this.loadingButton1 = true
                this.$http.post(this.host + '/uc/asset/wallet/reset-address', params).then(response => {
                    const resp = response.body
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('uc.finance.money.resetsuccess'))
                        this.loadingButton1 = false
                        setTimeout(function () {
                            that.getMoney()
                        }, 3000)
                    } else {
                        this.$Message.error(resp.message)
                        this.loadingButton1 = false
                    }
                })
            },
            getMoney() {
                // 获取
                this.$http.post(this.host + this.api.uc.wallet).then(response => {
                    const resp = response.body
                    if (resp.code == 0) {
                        this.coinList = (resp.data.length > 0 && resp.data.filter(ele => ele.coin.canRecharge == 1)) || []
                        this.changeCoin(this.coinType)
                    } else {
                        this.$Message.error(resp.message)
                    }
                })
            },
            getList() {
                // 获取tableRecharge
                // let memberId = 0;
                !this.$store.getters.isLogin && this.$router.push('/login')
                // this.$store.getters.isLogin && (memberId = this.$store.getters.member.id);

                const params = {}
                params['pageNo'] = this.transaction.page
                params['type'] = '0'
                params['pageSize'] = this.transaction.pageSize
                params['symbol'] = this.transaction.symbol
                this.$http.post(this.host + '/uc/asset/transaction', params).then(response => {
                    const resp = response.body
                    if (resp.code == 0) {
                        if (resp.data) {
                            this.tableRecharge = resp.data.content || []
                            this.dataCount = resp.data.totalElements || 0
                        }
                        this.loading = false
                    } else {
                        this.$Message.error(resp.message)
                    }
                })
            },
            getMember() {
                const self = this
                this.$http.post(this.host + '/uc/approve/security/newSetting').then(response => {
                    var resp = response.body
                    if (resp.code == 0) {
                        if (resp.data.realName == null || resp.data.realName == '') {
                            // 判断是否实名认证，未认证跳转到实名认证页面；
                            this.$Message.success(this.$t('otc.publishad.submittip1'))
                            self.$router.push('/uc/safe')
                        } else if (resp.data.phoneVerified == 0) {
                            // 判断是否是手机号0，1，未认证跳转到实名认证页面；
                            this.$Message.success(this.$t('otc.publishad.submittip2'))
                            self.$router.push('/uc/safe')
                        } else if (resp.data.fundsVerified == 0) {
                            // 判断是否设置交易密码，未认证跳转到实名认证页面；
                            this.$Message.success(this.$t('otc.publishad.submittip3'))
                            self.$router.push('/uc/safe')
                        }
                    } else {
                        this.$Message.error(resp.message)
                    }
                })
            }
        },
        created() {
            this.coinType = this.$route.query.name || ''
            // this.getMember();
            this.getMoney()
            this.getList()
        },
        computed: {
            tableColumnsRecharge() {
                const columns = []
                columns.push({
                    title: this.$t('uc.finance.recharge.time'),
                    align: 'center',
                    render: (h, param) => {
                        const str = param.row.createTime
                        return h('div', {}, str)
                    }
                })
                columns.push({
                    title: this.$t('uc.finance.recharge.symbol'),
                    align: 'center',
                    render: (h, param) => {
                        const str = param.row.symbol
                        return h('div', {}, str)
                    }
                })

                columns.push({
                    title: this.$t('uc.finance.recharge.hash'),
                    width: 160,
                    align: 'center',
                    render: (h, param) => {
                        if (param.row.txid) {
                            const str = param.row.txid
                            const tokenLenth = param.row.txid.length
                            // 显示前五位 后五位
                            const tokenCont = param.row.txid.substring(0, 5) +
                                    '...' +
                                    param.row.txid.substring(tokenLenth - 5, tokenLenth)
                            if (str) {
                                return h('div', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-paper-outline'
                                        },
                                        style: {
                                            height: '20px',
                                            fontSize: '16px',
                                            marginRight: '4px',
                                            float: 'left',
                                            color: '#fff',
                                            border: 0,
                                            lineHeight: '20px',
                                            marginLeft: '10px'
                                        },
                                        on: {
                                            click: () => {
                                                this.copyToken(str)
                                            }
                                        }
                                    }),
                                    h('div', {
                                        style: {
                                            fontSize: '1%',
                                            float: 'left'
                                        }
                                    }, tokenCont)
                                ])
                            }
                        }
                    }
                })

                columns.push({
                    title: this.$t('uc.finance.recharge.address'),
                    align: 'center',
                    render: (h, param) => {
                        const str = param.row.address
                        const tokenLenth = param.row.address.length
                        // 显示前五位 后五位
                        const tokenCont = param.row.address.substring(0, 5) +
                                '...' +
                                param.row.address.substring(tokenLenth - 5, tokenLenth)
                        if (str) {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-paper-outline'
                                    },
                                    style: {
                                        height: '20px',
                                        fontSize: '16px',
                                        marginRight: '4px',
                                        float: 'left',
                                        color: '#fff',
                                        border: 0,
                                        lineHeight: '20px',
                                        marginLeft: '60px'
                                    },
                                    on: {
                                        click: () => {
                                            this.copyToken(str)
                                        }
                                    }
                                }),
                                h('div', {
                                    style: {
                                        textAlign: 'center',
                                        fontSize: '1%',
                                        float: 'left'
                                    }
                                }, tokenCont)
                            ])
                        }
                    }
                })
                columns.push({
                    title: this.$t('uc.finance.recharge.amount'),
                    align: 'center',
                    render: (h, param) => {
                        const str = param.row.amount
                        return h('div', {}, str)
                    }
                })
                return columns
            }
        }
    }
</script>
<style scoped lang="scss">
    .nav-recharge {
        .show-qrcode {
            width: 210px;
            height: 210px;
            margin: 0 auto;
            background: #fff;
            padding: 5px;
        }

        .table-inner {
            position: relative;
            text-align: left;
            border-radius: 3px;

            .action-main {
                background: #111530;
                min-height: 320px;
                padding: 0 25px 25px;

                .action-inner {
                    width: 100%;
                    height: 80px;
                    /*display: table;*/
                    border-bottom: 1px solid #2A3850;
                    padding: 12px 0;

                    .inner-box.deposit-address {
                        /*width: 80%;*/
                        line-height: 50px;
                    }
                }

                .action-inner {
                    .inner-left {
                        .link-main {

                            .chain-link {
                                min-width: 105px;
                                height: 31px;
                                background: #111530;
                                color: #8090af;
                                float: left;
                                margin-left: 25px;
                                text-align: center;
                                line-height: 31px;
                                cursor: pointer;
                                border:1px solid rgba(88,105,138,1);
                                position: relative;
                                img {
                                    position: absolute;
                                    right: 0;
                                    bottom: 0;
                                }
                            }

                            .chain {
                                color: #3399FF;
                                border:1px solid rgba(51,153,255,1);
                            }
                        }
                    }
                    .inner-box {
                        /*display: table-cell;*/
                        /*width: 100%;*/
                        .title {
                            position: relative;

                            .copy {
                                user-select: text;
                            }

                            .copy-add {
                                width: 95px;
                                border: 1px solid #58698A;
                                border-left: 0;
                                text-align: center;
                                position: relative;
                                right: 7px;
                                line-height: 30px;
                                display: inline-block;
                                font-size: 14px;
                                color: #3399ff;
                                cursor: pointer;
                            }

                            a.link-copy {
                                font-size: 14px;
                                margin-left: 20px;
                                color: #3399ff;
                            }

                        }
                    }
                }
            }
        }

        .acb-p {
            font-size: 16px !important;
        }

        .acb-p1 {
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            line-height: 50px;
        }

        .acb-p2 {
            color: #8090AF;
            font-size: 14px;
            line-height: 30px;
        }

        /*.action-box .title .copy {*/
        /*    user-select: text;*/
        /*}*/

        /*.action-box .title .copy-add {*/
        /*    height: 32px;*/
        /*    text-align: center;*/
        /*    font-size: 12px;*/
        /*    background: #3399ff;*/
        /*    color: #fff;*/
        /*}*/

        /*.action-box .title a.link-copy {*/
        /*    font-size: 14px;*/
        /*    margin-left: 20px;*/
        /*    color: #3399ff;*/
        /*}*/

        .hb-night a {
            text-decoration: none;
            color: #7a98f7;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
        }

        .action-box .title a.link-qrcode {
            margin-left: 20px;
            font-size: 14px;
            position: relative;
            color: #3399ff;
        }

        .hb-night a {
            text-decoration: none;
            color: #7a98f7;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
        }

        .action-box .subtitle {
            font-size: 12px;
            margin-top: 30px;
        }

        .action-content {
            width: 100%;
            margin-top: 30px;
            /* overflow: hidden; */
            display: table;
        }

        .action-box .title {
            font-size: 20px;
        }

        .action-box .title .show-qrcode {
            position: absolute;
            top: -100px;
            left: 40px;
            padding: 10px;
        }

        /*.action-inner .inner-box.deposit-address {*/
        /*    width: 80%;*/
        /*}*/
        span.describe {
            color: #8090AF;
            font-size: 14px;
        }

        .merchant-icon {
            display: inline-block;
            margin-left: 4px;
            background-size: 100% 100%;
        }

        .merchant-icon.tips {
            width: 4px;
            height: 22px;
            margin-right: 10px;
            background: #3399ff;
        }

        .bill_box {
            width: 100%;
            height: auto;
            /* overflow: hidden; */
        }

        .nav-right {
            height: auto;
            overflow: hidden;
        }

        .order_box {
            width: 100%;
            /*background: #fff;*/
            height: 56px;
            line-height: 56px;
            margin-bottom: 20px;
            border-bottom: 2px solid #ccf2ff;
            position: relative;
            text-align: left;
        }

        .order_box a {
            color: #8994a3;
            font-size: 16px;
            padding: 0 30px;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            line-height: 54px;
            display: inline-block;
        }

        .order_box .search {
            position: absolute;
            width: 300px;
            height: 32px;
            top: 12px;
            right: 0;
            display: flex;
            /* border: #c5cdd7 solid 1px; */
        }
    }


</style>
<style lang="scss">
    .ivu-modal-content {
        background: #111530;
    }

    .ivu-modal-header {
        p {
            color: #8090AF;
        }

        border-bottom: 1px solid #2A3850;
    }

    .ivu-modal-footer {
        border-top: 0;
    }

    .nav-recharge {
        .ivu-btn-success {
            padding: 0;
        }

        /*.ivu-table-column-center:nth-child(3) {*/
        /*    .ivu-table-cell {*/
        /*        div {*/
        /*            width: 204px;*/
        /*            overflow:hidden;*/
        /*            text-overflow:ellipsis;*/
        /*        }*/
        /*    }*/
        /*}*/
        .ivu-modal-header {
            background: #111530;

            p {
                color: #8090AF;
            }
        }

        .ivu-modal-content {
            background: #111530;
        }

        .ivu-modal-footer {
            border-top: 0;
        }

        .order-table {
            .ivu-table-wrapper {
                .ivu-table {
                    .ivu-table-row {
                        &:hover {
                            background: #111530;
                        }

                        td {
                            color: #8090AF;
                            border-bottom: 0 !important;
                            background: #111530;

                        }
                    }

                    .ivu-table-header {
                        th {
                            border-bottom: 0 !important;
                            background: #191D3A;
                            color: #8090AF;
                        }
                    }
                }
            }
        }

        .ivu-select-selection {
            width: 130px;
            height: 32px;
            background: transparent;
            border: 1px solid rgba(88, 105, 138, 1);
            border-radius: 0;
        }

        .ivu-input-wrapper {
            width: 400px;
        }

        .ivu-select-dropdown {
            .ivu-select-item {
                &:hover {
                    background: #0e0e28;
                    color: #3399ff;
                }
            }
        }

        .ivu-table-wrapper {
            margin-right: -1px;

            .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
            .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
                background: #10122B;
            }
        }

        .ivu-select-selected-value {
            color: #8090AF;
        }

        .ivu-select-dropdown {
            li.ivu-select-item.ivu-select-item-selected.ivu-select-item-focus {
                background: transparent;
            }
        }

        /*.ivu-table {*/
        /*    td {*/
        /*        background: #111530;*/
        /*        text-align: center !important;*/
        /*    }*/
        /*    &:before {*/
        /*        height: 0;*/
        /*    }*/
        /*    .ivu-table-header {*/
        /*        th {*/
        /*            color: #8090AF;*/
        /*            background: #191D3A;*/
        /*        }*/
        /*    }*/
        /*}*/
        .ivu-table {
            td {
                &:first-child {
                    text-align: left;
                    padding-left: 12px;
                }

                &:last-child {
                    text-align: right;
                    padding-right: 12px;
                }
            }

            .ivu-table-header {
                th {
                    height: 50px;
                    background: #191D3A;
                    border-bottom: 0 !important;
                    color: #8090AF;

                    &:first-child {
                        text-align: left;
                        padding-left: 10px;
                    }

                    &:last-child {
                        text-align: right;
                        padding-right: 10px;
                    }
                }
            }

            .ivu-table-tip {
                td {
                    text-align: center;
                    background: #111530;
                }
            }
        }

        .ivu-input {
            height: 32px;
            border: 1px solid #58698A;
            background: transparent;
            border-radius: 0;
            color: #8090af;
        }

        #record_pages li.ivu-page-item.ivu-page-item-active {
            background-color: #111530;
            border-color: #191f44;

            a {
                color: #3399ff;
            }
        }

        #record_pages li.ivu-page-item.ivu-page-item-active {
            &:hover {
                background-color: #111530;

                a {
                    color: #3399ff;
                }
            }
        }

        .ivu-page-item {
            background: #111530;
            color: #8090AF;
            border: 1px solid #191f44;
        }

        .ivu-page-item:hover {
            color: #3399ff;
        }
    }

</style>
