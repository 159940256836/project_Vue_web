
<template>
    <main class="box-wrap">
        <div class="box account-box" id="box">
            <h2 class="title top-title">{{ this.$t('uc.menuTitle.AccountManagement') }}</h2>
            <SecuritySettings />
            <PaymentTerm />
            <FeeLevel />
        </div>
    </main>
</template>

<script>

import SecuritySettings from './securitySettings.vue'
import PaymentTerm from './paymentTerm.vue'
import FeeLevel from './feeLevel.vue'

export default {
    data() {
        return {
        }
    },
    components: {
        SecuritySettings,
        PaymentTerm,
        FeeLevel
    },
    methods: {
    },
}
</script>

<style scoped>
.box-wrap {
    padding-top: 60px;
    background: #0e0e28;
}

.box {
    color: #fff;
    width: 1200px;
    margin: auto;
    padding-bottom: 86px;
}

</style>

<style lang="scss">

.account-box {
    .title {
        font-weight: normal;
        font-size: 18px;
        height: 55px;
        line-height: 55px;  
        width: 100%;
        background: #191D3A;
        padding-left: 35px;
    }

    .top-title {
        margin-top: 39px;
    }

    .nav-right .user .user-top-ico {
        border: none;
    }

    .rightarea {
        background: #111530;
        padding: 0 35px;
        .account-in .account-item-in {
            background: #111530;
            border-top: 1px solid #2A3850;
        }
        .nav-right .user .user-top-icon {
            border: none;
        }
        span.card-number {
            color: #fff;
        }
    }
}


</style>