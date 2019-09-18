<style lang="scss" scoped>
  .mymsg_wrapper {
    background: #0e0e28;
    padding-top: 100px;
    .wrapper {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .wrapper-title {
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 18px;
      }
      .nav-rights {
        width: 100%;
        float: left;
        min-height: 600px;
      }
    }
  }
</style>
<style lang="scss">
  .mymsg_wrapper {
    .ivu-tabs {
      overflow: initial;
    }
    /*.ivu-btn[disabled]:hover {*/
    /*  background: transparent;*/
    /*}*/
    .ivu-tabs-nav-scroll {
      height: 60px;
      background: #111530;
      .ivu-tabs-nav .ivu-tabs-tab-active {
        color: #3399ff !important;
      }
      .ivu-tabs-nav .ivu-tabs-tab {
        padding:0;
        color: #fff;
      }
    }
    .ivu-tabs-bar {
      margin-bottom: 22px;
    }
  }
  #personal{
    .wrapper{
      padding-bottom: 65px;
    }
      .ivu-tabs-ink-bar{
      display:none !important;
    }
    .ivu-tabs-nav{
      margin-left:32px;
      .ivu-tabs-tab{
        padding:17px 0;
        margin-right: 47px;
      }
      .ivu-tabs-tab-active{
        border-bottom:2px solid #3399ff;
        padding:17px 0;
      }
    }
  }
</style>
<style lang="scss">
 .mymsg_wrapper {
   .ivu-table-wrapper tbody.ivu-table-tbody .ivu-table-row td{
     // //background:transparent !important;
   }
   .ivu-date-picker-with-range {
     .ivu-date-picker-with-range {
       background: #10122B;
     }
   }
   .ivu-page-total {
     color: #8090AF;
   }
   .ivu-page-next, .ivu-page-prev {
     background: #111530;
     border: 1px solid #191f44;
   }
 }


.mymsg_wrapper {
  .ivu-date-picker-with-range {
    .ivu-date-picker-with-range {
      background: #10122B;
    }
  }
  .ivu-page-total {
    color: #8090AF;
  }
  .ivu-page-next, .ivu-page-prev {
    background: #111530;
    border: 1px solid #191f44;
  }
    .ivu-tabs-nav-scroll {
    height: 60px;
    background: #111530;
    .ivu-tabs-nav .ivu-tabs-tab-active {
      color: #3399ff !important;
    }
    .ivu-tabs-nav .ivu-tabs-tab {
      padding: 19px 16px;
      color: #fff;
    }
  }
}
.ivu-table td:last-child{
  text-align: center;
}
.ivu-select-dropdown::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px #21254d;
    background-color: #21254d;
}
.ivu-select-dropdown::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #131738;
    background-color: #131738;
}
</style>
<template>
  <div class="mymsg_wrapper" id="personal">
    <div class="wrapper">
      <div class="wrapper-title">
        {{ $t('new.Mssets') }}
      </div>
      <Tabs
        name="tab1"
        v-model="activeName"
        @on-click="changeTab"
        :animated="false"
      >
        <TabPane
          :label="$t('uc.finance.personalassets')"
          name="money"
          tab="tab1"
        >
          <Money/>
        </TabPane>
        <TabPane
          :label="$t('uc.finance.billdetail')"
          name="record"
          tab="tab1"
        >
          <Record  v-if="activeName === 'record'"/>
        </TabPane>
        <Tab-pane
          :label="$t('uc.finance.charge')"
          name="recharge"
          tab="tab1"
        >
          <Recharge v-if="activeName === 'recharge'"/>
        </Tab-pane>
        <TabPane
          :label="$t('uc.finance.pickup')"
          name="withdraw"
          tab="tab1"
        >
          <Withdraw v-if="activeName === 'withdraw'"/>
        </TabPane>
        <TabPane
          :label="$t('uc.finance.withdraw.addressmanager')"
          name="withdrawAddress"
          tab="tab1"
        >
          <WithdrawAddress v-if="activeName === 'withdrawAddress'"/>
        </TabPane>
        <TabPane
          :label="$t('uc.finance.pointManagement')"
          name="bjc"
          tab="tab1"
        >
          <Bjc v-if="activeName === 'bjc'"/>
        </TabPane>
        <TabPane
          :label="$t('uc.finance.CandyGivingRecords')"
          name="giveRecord"
          tab="tab1"
        >
          <GiveRecord v-if="activeName === 'giveRecord'"/>
        </TabPane>
        <TabPane
          :label="$t('uc.finance.ieo')"
          name="Ieoadmin"
          tab="tab1"
        >
          <Ieoadmin v-if="activeName === 'Ieoadmin'"/>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import Money from '../../components/uc/MoneyIndex'
import Record from '../../components/uc/Record'
import Recharge from '../../components/uc/Recharge'
import Withdraw from '../../components/uc/Withdraw'
import WithdrawAddress from '../../components/uc/WithdrawAddress'
import Bjc from '../../components/uc/Bjc'
import GiveRecord from '../../components/uc/giveRecord'
import Ieoadmin from '../../components/uc/Ieoadminpage'
export default {
  components: { Money, Record, Recharge, Withdraw, WithdrawAddress, Bjc, GiveRecord, Ieoadmin },
  data() {
    return {
      activeName: 'money',
      user: {}
    }
  },
  created: function() {
    this.getMember()
    this.changeTab()
  },
  methods: {
    getMember() {
      // 获取个人安全信息
      return this.$http.post(this.host + '/uc/approve/security/newSetting').then(response => {
        const resp = response.body
        if (resp.code == 0) {
          return new Promise((resolve, reject) => {
            // 0-未实名、1-视频审核,2-实名审核失败、3-视频审核失败,4-实名成功,5-待实名审核 ,6-待视频审核
            this.user = resp.data.kycStatus
            const name = this.$route.path
            const self = this
            switch (name) {
              case '/personal' || 'moneyindex':
                this.activeName = 'money'
                break
              case '/personal/record':
                this.activeName = 'record'
                break
              case '/personal/recharge':
                this.activeName = 'recharge'
                break
              case '/personal/withdraw':
                if (self.user != 4) {
                  this.$Message.error(this.$t('otc.validate'))
                  setTimeout(function() {
                    self.$router.push('/account')
                  }, 2000)
                  return false
                }
                this.activeName = 'withdraw'
                break
              case '/personal/withdrawAddr':
                this.activeName = 'withdrawAddress'
                break
              case '/personal/bjc':
                this.activeName = 'bjc'
                break
              case '/personal/giveRecord':
                this.activeName = 'giveRecord'
                break
              case '/personal/Ieoadmin':
                this.activeName = 'Ieoadmin'
                break
              default:
                this.activeName = 'money'
                break
            }
            console.log(this.user)
            resolve(resp.data)
          })
        } else {
          this.$Message.error(this.loginmsg)
        }
      })
    },
    changeTab(name) {
      const self = this
      console.log(name)
      // if ((name !== 'withdraw' || name !== '/personal/withdraw')||(name !== 'recharge' || name !== '/personal/recharge')) {
      this.$route.query.name = ''
      // }
      console.log(name)
      if (name == 'withdraw' || name == '/personal/withdraw') {
        console.log(this.user, name)
        if (this.user != 4) {
          this.$Message.error(this.$t('otc.validate'))
          setTimeout(function() {
            self.$router.push('/account')
          }, 2000)
          return false
        }
      }
      console.log(name)
    },
    init() {
      if (!localStorage.TOKEN || !localStorage.MEMBER) {
        this.$Message.success(this.$t('common.logintip'))
        this.$router.push('/login')
      }
    }
  },
  watch: {
    $route(to, form) {
      const self = this
      console.log(to, form, to.path)
      switch (to.path) {
        case '/personal':
          this.activeName = 'money'
          break
        case '/personal/record':
          this.activeName = 'record'
          break
        case '/personal/recharge':
          this.activeName = 'recharge'
          break
        case '/personal/withdraw':
          if (this.user != 4) {
            this.$Message.error(this.$t('otc.validate'))
            setTimeout(function() {
              self.$router.push('/account')
            }, 2000)
            return false
          }
          this.activeName = 'withdraw'
          break
        case '/personal/withdrawAddr':
          this.activeName = 'withdrawAddress'
          break
        case '/personal/bjc':
          this.activeName = 'bjc'
          break
        case '/personal/giveRecord':
          this.activeName = 'giveRecord'
          break
        case '/personal/Ieoadmin':
          this.activeName = 'Ieoadmin'
          break
        default:
          this.activeName = 'money'
          break
      }
      // this.heightLightMenu(to.path);
    }
  },
  mounted: function() {
    const doc = document.body
    const sreenHeight = doc.offsetHeight
    const headerHeight = doc.getElementsByTagName('header')[0].offsetHeight
    const footerHeight = doc.getElementsByTagName('footer')[0].offsetHeight
    const contentHeight = doc.getElementsByClassName('mymsg_wrapper')[0]
    const bodyHeight = sreenHeight - headerHeight - footerHeight
    contentHeight.style.minHeight = bodyHeight + 200 + 'px'
  }
}
</script>

