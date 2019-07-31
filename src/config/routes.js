// import Vue from 'vue'
// import Layout from '../public/layout'
// import tradingcenter from '../pages/otc/TradingCenter'
// import ordermanagement from '../pages/uc/OrderManagement'
// import finance from '../pages/uc/Finance'
import membercenter from '../pages/uc/MemberCenter'
import tradeInfo from '../pages/otc/TradeInfo'
import checkuser from '../pages/otc/CheckUser'
import chat from '../pages/otc/Chat'
import notice from '../pages/cms/Notice'
import noticeitem from '../pages/cms/NoticeItem'
import newhelp from '../pages/cms/NewHelp'
import question from '../pages/cms/Question'
import agreement from '../pages/cms/Agreement'
import exchargerule from '../pages/cms/ExchargeRule' /* 交易规则*/
import userprotocol from '../pages/cms/UserProtocol' /* 使用协议*/
import feenote from '../pages/cms/FeeNote' /* 资费说明*/
import merchantprotocol from '../pages/cms/MerchantProtocol'
import homenotice from '../pages/cms/HomeNotice' /* 首页公告*/
import aboutus from '../pages/cms/AboutUs' /* 关于我们*/
import joinus from '../pages/cms/JoinUs' /* 加入我们*/
import rate from '../pages/cms/Rate'
import moneyindex from '../components/uc/MoneyIndex'
import record from '../components/uc/Record'
import trade from '../components/uc/MinTrade'
import paydividends from '../components/uc/PayDividends'
import invitingmining from '../components/uc/InvitingMin'
import recharge from '../components/uc/Recharge'
import withdraw from '../components/uc/Withdraw'
import safe from '../components/uc/Safe'
import account from '../components/uc/Account'
import myextension from '../components/uc/MyExtension'
import withdrawAddr from '../components/uc/WithdrawAddress'
import chatline from '../components/otc/Chatline'
import noticeindex from '../components/cms/NoticeDeails'
import Index from '../pages/index/index'
import Login from '../pages/uc/login'
import Register from '../pages/uc/register'
import FindPwd from '../pages/uc/findpwd'
import Exchange from '../pages/exchange/exchange'
// import Help from '../pages/cms/help'
import HelpList from '../pages/cms/HelpList' // 帮助分类列表
import HelpDetail from '../pages/cms/HelpDetail' // 帮助详情
import merchantsDeal from '../pages/cms/merchantsDeal'
// import Message from '../pages/cms/message'
import OTCMain from '../pages/otc/Main'
import OtcTrade from '../pages/otc/Trade'
import OtcOrder from '../components/uc/myorder'
import OtcAd from '../components/otc/MyAd'
import adPublish from '../pages/otc/AdPublish'
import PublishAdver from '../pages/otc/PublishAdver'
import personal from '../pages/uc/Personal'

import identbusiness from '../pages/uc/IdentBusiness'
// 币理财
import Blc from '../pages/blc/Bilicai'
import meblc from '../components/uc/Blc'
import mebjc from '../components/uc/Bjc'
// 费率  transactionCosts
import transactionCosts from '../components/footerList/transactionCosts'
// 法律声明
import law from '../components/footerList/law'
// 隐私协议
import Privgreement from '../components/footerList/Privgreement'
// bdm协议
import bdm from '../components/footerList/bdm'
// 用户协议
import Usereement from '../components/footerList/Usereement'
// import mymsg from ''
// 平台的小时分配和昨天的分配路由
// import platedistribute from "../pages/plate/distribution.vue"
// import today from "../components/plate/Today"
// import yesterday from "../components/plate/Yesterday"
import Bjc from '../pages/bjc/Bijingcai'
// 平台手续费返还
import feereturn from '../pages/feereturn/Feereturn'

// ieo
import Ieo from '../pages/ieo/Index.vue'
import IeoDetail from '../pages/ieo/Detail.vue'

// 开启或者关闭google验证
import ClosegoogleVali from '../pages/google/CloseGoogleVali.vue'
import OpenGoogleVali from '../pages/google/ResetGoogleVali.vue'

// uc模块
import feeLevel from '../components/uc/FeeLevel.vue'

// IEo管理
import Ieoadmin from '../components/uc/IeoAdmin.vue'

// api管理
import apiManage from '../components/uc/apiManage.vue'

// 杠杆账户管理 => 当前委托
import levelCurrent from '../components/uc/levelCurrent.vue'

// 杠杆账户管理 => 历史委托
import levelHistory from '../components/uc/levelHistory.vue'

// 糖果赠送记录
import giveRecord from '../components/uc/giveRecord.vue'

// 归还赠送记录
import LeverIndex from '../pages/lever/Index.vue'

// 杠杆交易
import Lever from '../pages/exchange/lever.vue'
// 移动端注册  registe
// 新api管理  apiapi
import apiapimanagement from '../components/uc/apiapimanagement'
// newMyExtension新推广
import newMyExtension from '../components/uc/newMyExtension'
import mobilereg from '../components/yidong/registers'
import registe from '../components/yidong/registe'
// 用户安全记录
// import safetyRecords from '../components/uc/safetyRecords'
// 币币币种详情
import coinDetails from '../components/exchange/coinDetails.vue'

// 移动端页面
import Mobile from '../components/mobile/mobile.vue'
import MobileHome from '../components/mobile/home.vue'
import MobileRegister from '../components/mobile/register.vue'
import MobileLogin from '../components/mobile/login.vue'

export default [
    { path: '/newMyExtension', component: newMyExtension },
    // { path: '/safetyRecords', component: safetyRecords },
    { path: '/apiapimanagement', component: apiapimanagement },
    { path: '/bdm', component: bdm },
    { path: '/Usereement', component: Usereement },
    { path: '/Privgreement', component: Privgreement },
    { path: '/law', component: law },
    { path: '/transactionCosts', component: transactionCosts },
    { path: '/', component: Index },
    { path: '/index', component: Index },
    { path: '/login', component: Login },
  { path: '/mobile',
    component: Mobile,
    name: 'mobile',
    meta: {
      hide: true
    },
    children: [
      {
        path: 'home',
        name: 'mobileHome',
        component: MobileHome,
        meta: {
          hide: true
        }
      },
      {
        path: 'login',
        name: 'mobileLogin',
        component: MobileLogin,
        meta: {
          hide: true
        }
      },
      {
        path: 'register',
        name: 'mobileRegister',
        component: MobileRegister,
        meta: {
          hide: true
        }
      }
    ]
  },
  { path: '/mobilereg', component: mobilereg, name: 'mobilereg', meta: {
    hide: true
  }},
  { path: '/registe', component: registe, meta: {
    hide: true
  }},
    { path: '/Ieo', name: 'ieo', component: Ieo },

    { path: '/Ieo/IeoDetail', name: 'IeoDetail', component: IeoDetail },
    { path: '/login/returnUrl/:returnUrl', component: Login },
    { path: '/register', component: Register },
    { path: '/closeGoogleval', name: 'closegoogleVali', component: ClosegoogleVali },
    { path: '/openGoogleVali', name: 'resetgooglevali', component: OpenGoogleVali },
    { path: '/lever/:coin', name: 'lever', component: LeverIndex },
    { path: '/findPwd', component: FindPwd },
    { path: '/exchange', component: Exchange },
    { path: '/exchange/*', component: Exchange },
    { path: '/leverindex', component: Lever },
    { path: '/leverindex/*', component: Lever },
    // { path: '/help', component: Help },
    { path: '/helplist', component: HelpList },
    { path: '/helpdetail', component: HelpDetail },
    // { path: '/message', component: Message },
    { path: '/notice', component: notice },
    { path: '/notice/index', component: noticeitem },
    { path: '*', component: Index },
    { path: '/blc', component: Blc },
    { path: '/bjc', component: Bjc },
    // 发布广告
    { path: '/PublishAdver', component: PublishAdver },
    // 币种详情
    { path: '/coinDetails', component: coinDetails },
  {
    path: '/personal',
    component: personal,
    children: [
      {
        path: '',
        name: 'moneyindex',
        component: moneyindex
      },
      {
        path: 'record',
        name: 'record',
        component: record
      },
      {
        path: 'recharge',
        name: 'recharge',
        component: recharge
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        component: withdraw
      },
      {
        path: 'withdrawAddr',
        name: 'withdrawAddr',
        component: withdrawAddr
      },
      {
        path: 'bjc',
        name: 'mebjc',
        component: mebjc
      },
      {
        path: 'giveRecord',
        name: 'giveRecord',
        component: giveRecord
      },
      {
        path: 'adPublish',
        component: adPublish
      }
    ]
  },
    // 平台手续费返还
    { path: '/feereturn', component: feereturn },
  {
        // 我的订单页
    path: '/order', component: resolve => require(['@/pages/order/index.vue'], resolve)
  },
  {
        // 我的账号管理页
    path: '/account', name: 'account', component: resolve => require(['@/pages/account/index.vue'], resolve)
  },
    // {
    //     path: "/distribute",
    //     component: platedistribute,
    //     children: [{
    //             path: "today",
    //             component: today
    //         },
    //         {
    //             path: "yesterday",
    //             component: yesterday
    //         },
    //     ]
    // },
  {
    path: '/otc',
    component: OTCMain,
    children: [{
      path: 'trade/*',
      component: OtcTrade
    }
            //     {
            //         path: 'ad',
            //         component: OtcAd
            //     },
            //     {
            //         path: 'ad/create',
            //         component: adPublish
            //     },
            //     {
            //         path: 'ad/update',
            //         component: adPublish
            //     },
            //     {
            //         path: 'order',
            //         component: OtcOrder
            //     }
    ]
  },
    // {
    //     path: '/finance',
    //     component: finance,
    //     children: [{
    //             path: '',
    //             component: moneyindex
    //         },
    //         {
    //             path: 'money',
    //             component: moneyindex
    //         },
    //         {
    //             path: 'record',
    //             component: record
    //         },
    //         {
    //             path: 'recharge',
    //             component: recharge
    //         },
    //         {
    //             path: 'withdraw',
    //             component: withdraw
    //         },
    //         {
    //             path: 'withdraw/address',
    //             component: withdrawAddr
    //         },
    //         {
    //             path: 'trade',
    //             component: trade
    //         },
    //         {
    //             path: 'paydividends',
    //             component: paydividends
    //         },
    //         {
    //             path: 'invitingmining',
    //             component: invitingmining
    //         }
    //     ]
    // },
  {
    path: '/uc',
    component: membercenter,
    children: [
      {
        path: '*',
        redirect: '/account'
      },
      {
        path: 'ieoadmin',
        name: 'ieoadmin',
        component: Ieoadmin
      },
      {
        path: 'apiManage',
        name: 'apiManage',
        component: apiManage
      },
      {
        path: 'level/current',
        name: 'levelCurrent',
        component: levelCurrent
      },
      {
        path: 'level/history',
        name: 'levelHistory',
        component: levelHistory
      },
            // {
            //     path: "giveRecord",
            //     name: "giveRecord",
            //     component: GiveRecord
            // },
      {
        path: 'safe',
        component: safe
      },
      {
        path: 'feeLevel',
        component: feeLevel
      },
      {
        path: 'account',
        component: account
      },
      {
        path: 'myextension',
        component: myextension
      },
            // {
            //     path: 'money',
            //     component: moneyindex
            // },
            // {
            //     path: 'record',
            //     component: record
            // },
            // {
            //     path: 'recharge',
            //     component: recharge
            // },
            // {
            //     path: 'withdraw',
            //     component: withdraw
            // },
            // {
            //     path: 'withdraw/address',
            //     component: withdrawAddr
            // },
      {
        path: 'ad',
        component: OtcAd
      },
      {
        path: 'ad/create',
        component: adPublish
      },
      {
        path: 'ad/update',
        component: adPublish
      },
      {
        path: 'order',
        component: OtcOrder
      },
      {
        path: 'trade',
        component: trade
      },
      {
        path: 'invitingmining',
        component: invitingmining
      },
      {
        path: 'paydividends',
        component: paydividends
      },
      {
        path: 'blc',
        component: meblc
      }
            // {
            //     path: 'bjc',
            //     component: mebjc
            // }
    ]
  },
  {
    name: 'tradeInfo',
    path: '/otc/tradeInfo',
    component: tradeInfo
  },
  {
    path: '/checkuser',
    component: checkuser
  },
  {
    path: '/chat',
    component: chat
  },
  {
    path: '/identbusiness',
    component: identbusiness
  },
  {
    path: '/newhelp',
    component: newhelp,
    children: [{
      path: '',
      component: noticeindex
    },
    {
      path: 'index',
      component: noticeindex
    },
    {
      path: 'account',
      component: account
    }
    ]
  },
  {
    path: '/question',
    component: question
  },
  {
    path: '/agreement',
    component: agreement
  },
  {
    path: '/merchantsDeal',
    component: merchantsDeal
  },
  {
    path: '/rate',
    component: rate
  },
  {
    path: '/about-rule',
    component: exchargerule
  },
  {
    path: '/about-protocol',
    component: userprotocol
  },
  {
    path: '/about-fee',
    component: feenote
  },
  {
    path: '/about-notice',
    component: homenotice
  },
  {
    path: '/about-us',
    component: aboutus
  },
  {
    path: '/join-us',
    component: joinus
  },
  {
    path: '/about-merchant',
    component: merchantprotocol
  }
]
