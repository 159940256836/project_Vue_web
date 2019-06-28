
<template>
    <main class="box-wrap">
        <div class="box" id="box">
            <h2 class="title">{{ this.$t('otc.myorder') }}</h2>
            <Tabs name="tab1">
                <TabPane 
                :label="this.$t('uc.menuTitle.bibiManagement')" 
                tab="tab1" 
                >              
                    <Coins />
                </TabPane>
                <TabPane 
                :label="this.$t('uc.menuTitle.otcManagement')" 
                tab="tab1"
                >            
                    <LegalTender />  
                </TabPane>
            </Tabs>
        </div>
    </main>
</template>

<script>
// import './nav.scss'//引入nav样式
import LegalTender from './legalTender.vue'
import Coins from './coins.vue'

export default {
  data() {
    return {
      title: this.$t('otc.myorder')
    }
  },
  components: {
    LegalTender,
    Coins
  },
  methods: {
    fn() {
      console.log(1)
    }
  }
}
</script>

<style scoped>
.box-wrap {
    padding-top: 60px;
    background: #0e0e28;
}

.box {
    min-height: 400px;
    color: #fff;
    width: 1200px;
    margin: auto;
}

.title {
    font-weight: normal;
    font-size: 20px;
    height: 20px;
    line-height: 20px;
    margin-top: 39px;
    margin-bottom: 26px;
}
</style>

<style lang="scss">

.box .ivu-tabs-bar {
    border-color: transparent;
    background: #111530;
    margin-bottom: 22px;
    padding-left: 28px;
}

.box .ivu-tabs-nav .ivu-tabs-tab {
    color: #fff;
    height: 65px;
    line-height: 65px;
    padding: 0;
}

.box .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #3399FF;
}

</style>