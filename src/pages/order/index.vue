
<template>
    <main class="box-wrap">
        <div class="box new-order-box" id="box">
            <h2 class="title">{{ this.$t('otc.myorder') }}</h2>
            <Tabs name="tab1" :value="myOrderTabName" @on-click="tabCut">
                <TabPane 
                :label="this.$t('uc.menuTitle.bibiManagement')" 
                tab="tab1" 
                name="name1"               
                >              
                    <Coins />
                </TabPane>
                <TabPane 
                :label="this.$t('uc.menuTitle.otcManagement')" 
                tab="tab1"
                name="name2"
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
  computed: {
    myOrderTabName() {
      if (localStorage.myOrderTabName) {
        return localStorage.myOrderTabName
      } else {
        return 'name1'
      }
    }
  },
  components: {
    LegalTender,
    Coins
  },
  methods: {
    tabCut(name) {
      localStorage.myOrderTabName = name
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
    padding-bottom: 55px;
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

.box {
  .ivu-tabs-bar {
      border-color: transparent;
      background: #111530;
      margin-bottom: 22px;
      padding-left: 28px;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    color: #fff;
    height: 65px;
    line-height: 65px;
    padding: 0;
  }
  .ivu-tabs-nav .ivu-tabs-tab:hover {
    color: #3399FF;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #3399FF;
  }
}

.new-order-box{
  .ivu-tabs-ink-bar-animated {
    display: none;
  }
  .ivu-tabs-tab-active,
  .ivu-tabs-tab-focused {
    border-bottom: 3px solid #3399FF;
  }
  .ivu-tabs-tab {
    margin-right: 47px !important;
  }
}

</style>