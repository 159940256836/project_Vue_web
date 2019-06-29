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
    /*.ivu-table-wrapper {*/
    /*  .ivu-table {*/
    /*    td {*/
    /*      background: #111530;*/
    /*      &:first-child {*/
    /*        text-align: left;*/
    /*        padding-left: 10px;*/
    /*      }*/
    /*      &:last-child {*/
    /*        text-align: right;*/
    /*        padding-right: 10px;*/
    /*      }*/
    /*    }*/
    /*    .ivu-table-header {*/
    /*      th {*/
    /*        height: 50px;*/
    /*        background: #191D3A;*/
    /*        border-bottom: 0 !important;*/
    /*        color: #8090AF;*/
    /*        &:first-child {*/
    /*          text-align: left;*/
    /*          padding-left: 10px;*/
    /*        }*/
    /*        &:last-child {*/
    /*          text-align: right;*/
    /*          padding-right: 10px;*/
    /*        }*/
    /*      }*/
    /*    }*/
    /*  }*/
    /*}*/
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

</style>
<template>
  <div class="mymsg_wrapper">
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
          <Record/>
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
      </Tabs>
      <!--<Menu
        :active-name="activename"
        :open-names="opennames"
        @on-open-change="sss"
        ref="test"
        :accordion="true"
      >
        <div class="title">{{$t("uc.title")}}</div>

        <Submenu name="1">
          <template slot="title">
            <span class="isclick"></span>
            <span class="content">{{$t("uc.menuTitle.moneyManagement")}}</span>
          </template>
          <Menu-item name="1-1">
            <router-link to="/uc/money">{{$t('uc.finance.personalassets')}}</router-link>
          </Menu-item>
          <Menu-item name="1-2">
            <router-link to="/uc/record">{{$t('uc.finance.billdetail')}}</router-link>
          </Menu-item>
          <Menu-item name="1-3">
            <router-link to="/uc/recharge">{{$t('uc.finance.charge')}}</router-link>
          </Menu-item>
          <Menu-item name="1-4">
            <router-link to="/uc/withdraw">{{$t('uc.finance.pickup')}}</router-link>
          </Menu-item>
          <Menu-item name="1-5">
            <router-link to="/uc/bjc">{{$t('uc.finance.pointManagement')}}</router-link>
          </Menu-item>
          <Menu-item name="1-6">
            <router-link to="/uc/giveRecord">{{$t('uc.finance.CandyGivingRecords')}}</router-link>
          </Menu-item>
        </Submenu>
      </Menu>-->
<!--      <router-view></router-view>-->
    </div>
  </div>

</template>
<script>
import Money from "../../components/uc/MoneyIndex";
import Record from "../../components/uc/Record";
import Recharge from "../../components/uc/Recharge";
import Withdraw from "../../components/uc/Withdraw";
import WithdrawAddress from "../../components/uc/WithdrawAddress";
import Bjc from "../../components/uc/Bjc";
import GiveRecord from "../../components/uc/giveRecord";
export default {
    components: { Money, Record, Recharge, Withdraw, WithdrawAddress, Bjc, GiveRecord },
  // mixins: [minHeightMinx],
  data() {
    return {
      activeName: 'money'
      // activename: "1-1",
      // opennames: ["1"],
      // routeArr: {
      //   "/uc/money": "1-1",
      //   "/uc/record": "1-2",
      //   "/uc/recharge": "1-3",
      //   "/uc/withdraw": "1-4",
      //   "/uc/bjc": "1-5",
      //   "/uc/giveRecord": "1-6"
      // }
    };
  },
  created: function () {
    this.changeTab()
    console.log(this.$route.path);
    const name = this.$route.path
    // console.log(name.replace("/personal",""));
    switch (name) {
        case "/personal" || 'moneyindex':
          this.activeName = 'money'
          break;
        case "/personal/record":
          this.activeName = 'record'
          break;
        case "/personal/recharge":
          this.activeName = 'recharge'
          break;
        case "/personal/withdraw":
          this.activeName = 'withdraw'
          break;
        case "/personal/withdrawAddr":
          this.activeName = 'withdrawAddress'
          break;
        case "/personal/bjc":
          this.activeName = 'bjc'
          break;
        case "/personal/giveRecord":
          this.activeName = 'giveRecord'
          break;
        default:
          this.activeName = 'money'
          break;
      }
    // this.init();
    // const path = this.$route.path;
    // this.heightLightMenu(path);
    // this.settiele();
  },
  methods: {
    changeTab(name) {
      console.log(name);
    },
    init() {
      // this.$store.commit("navigate", "nav-uc");
      // this.$store.state.HeaderActiveName = "1-6";
      if (!localStorage.TOKEN || !localStorage.MEMBER) {
        this.$Message.success(this.$t("common.logintip"));
        this.$router.push("/login");
      }
    },
    // sss(name) {
    //   console.log(name);
    //   let index = 1;
    //   if (name.length >= 1) {
    //     index = name[name.length - 1];
    //     this.opennames = [index];
    //     this.activename = index + "-1";
    //     this.link(this.activename);
    //   } else {
    //     return;
    //   }
    // },
    // link(code) {
    //   switch (code) {
    //     case "1-1":
    //       this.$router.push("/uc/safe");
    //       break;
    //     // case "2-1":
    //     //   this.$router.push("/uc/money");
    //     //   break;
    //     // case "3-1":
    //     //   this.$router.push("/uc/entrust/current");
    //     //   break;
    //     // case "4-1":
    //     //   this.$router.push("/uc/ad");
    //     //   break;
    //     // case "5-1":
    //     //   this.$router.push("/uc/ieoadmin");
    //     //   break;
    //     // case "6-1":
    //     //   this.$router.push("/uc/apiManage");
    //     //   break;
    //     //   // case "7-1":
    //     //   //     this.$router.push("/uc/level/current");
    //     //   //     break;
    //     //   // case "7-2":
    //     //   //     this.$router.push("/uc/level/history");
    //     //   //     break;
    //     // default:
    //     //   this.$router.push("/uc/safe");
    //     //   break;
    //   }
    // },
    // heightLightMenu(path) {
    //   console.log(path);
    //   let acName = this.routeArr[path] || "1-1",
    //       opName = acName.split("-")[0];
    //   this.opennames = [opName];
    //   this.activename = acName;
    //   console.log(this.opennames, this.activename);
    //   this.$nextTick(function () {
    //     this.$refs.test.updateOpened();
    //     this.$refs.test.updateActiveName();
    //   });
    // }
  },
  watch: {
    $route(to, form) {
      console.log(to, form, to.path);
      switch (to.path) {
        case "/personal":
          this.activeName = 'money'
          break;
        case "/personal/record":
          this.activeName = 'record'
          break;
        case "/personal/recharge":
          this.activeName = 'recharge'
          break;
        case "/personal/withdraw":
          this.activeName = 'withdraw'
          break;
        case "/personal/withdrawAddr":
          this.activeName = 'withdrawAddress'
          break;
        case "/personal/bjc":
          this.activeName = 'bjc'
          break;
        case "/personal/giveRecord":
          this.activeName = 'giveRecord'
          break;
        default:
          this.activeName = 'money'
          break;
      }
      // this.heightLightMenu(to.path);
    }
  },
  mounted: function () {
    // this.$nextTick(function () {
    //   this.$refs.test.updateOpened();
    //   this.$refs.test.updateActiveName();
    // });
    const doc = document.body
    const sreenHeight = doc.offsetHeight;
    const headerHeight = doc.getElementsByTagName("header")[0].offsetHeight;
    const footerHeight = doc.getElementsByTagName("footer")[0].offsetHeight;
    const contentHeight = doc.getElementsByClassName("mymsg_wrapper")[0];
    const bodyHeight = sreenHeight - headerHeight - footerHeight;
    contentHeight.style.minHeight = bodyHeight + "px";
  }
};
</script>

