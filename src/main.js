import 'babel-polyfill'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import routes from './config/routes.js'
import store from './config/store.js'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import util from './assets/js/util.js' // 乘除方法，js的算数运算真是SB
import App from './App.vue'
import Api from './config/api'
import $ from '@js/jquery.min.js'
var moment = require('moment')

Vue.use(iView)
Vue.use(VueClipboard)
Vue.use(VueRouter)
Vue.use(vueResource)
Vue.use(VueI18n)
// Vue.prototype.host = 'https://www.bdw.top'
Vue.prototype.url = 'https://www.bdw.top' // 链接地址
// Vue.prototype.host = 'http://192.168.124.14/' // 陈然
// Vue.prototype.host = 'https://api.nr3d.cn' // 正式
Vue.prototype.host = 'http://192.168.124.188:6001' // 周光银
// Vue.prototype.host = 'http://192.168.124.43/' // 测试环境
// Vue.prototype.url = 'http://192.168.124.45' // 链接地址
Vue.prototype.api = Api
Vue.http.options.credentials = true
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
const router = new VueRouter({
  mode: 'hash',
  routes
})
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages: {
    'zh': require('./assets/lang/zh.js'),
    'en': require('./assets/lang/en.js')
  }
})

Vue.http.interceptors.push((request, next) => {
    // 登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  request.headers.set('x-auth-token', localStorage.getItem('TOKEN'))
  next((response) => {
        // 登录极验证时需获取后台返回的TOKEN值
    var xAuthToken = response.headers.get('x-auth-token')
    if (xAuthToken != null && xAuthToken !== '') {
      localStorage.setItem('TOKEN', xAuthToken)
    }
        //
    if (response.body.code === '4001') {
      localStorage.removeItem('TOKEN')
      setTimeout(() => {
        location.href = '/'
      }, 500)
    }
    if (response.body.code === '4000' || response.body.code === '3000') {
      store.commit('setMember', null)
      return false
    }
    return response
  })
})

Vue.config.productionTip = false
Vue.filter('timeFormat', function(tick) {
  return moment(tick).format('HH:mm:ss')
})
Vue.filter('dateFormat', function(tick) {
  return moment(tick).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('ymdFormat', function(tick) {
  return moment(tick).format('YYYY-MM-DD')
})
Vue.filter('toFixed', function(number, scale) {
  return new Number(number).toFixed(scale)
})
Vue.filter('toPercent', function(point) {
  var str = Number(point * 100).toFixed(1)
  str += '%'
  return str
})
// 数字进行下舍入(舍去)
function toFloor(number) {
  if (new Number(number) === 0) { // 如果是"0.0000000000000000"
    return 0
  }
  var str = (number + '').toString()
  if (str.indexOf('.') === -1) {
    var reg = /^(\d+)(e)([\-]?\d+)$/
    var arr, len,
      zero = ''

        /* 6e7或6e+7 都会自动转换数值 */
    if ((!reg.test(str))) {
      return number
    } else {
            /* 6e-7 需要手动转换 */
      arr = reg.exec(str)
      len = Math.abs(arr[3]) - 1
      for (var i = 0; i < len; i++) {
        zero += '0'
      }
      return '0.' + zero + arr[1]
    }
  } else {
    var reg = /^(\d+[.]?\d+)(e)([\-]?\d+)$/
    var arr, len,
      zero = ''

        /* 6e7或6e+7 都会自动转换数值 */
    if ((!reg.test(str))) {
      return number
    } else {
            /* 6e-7 需要手动转换 */
      arr = reg.exec(str)
      len = Math.abs(arr[3]) - 1
      for (var i = 0; i < len; i++) {
        zero += '0'
      }
      return '0.' + zero + arr[1].replace('.', '')
    }
  }
    // let str = number + ""; //转字符串
    // if (str.indexOf('e') > -1 || str.indexOf('E') > -1) { //科学计数法
    //     let num = new Number(number).toFixed(scale + 1),
    //         str = num + "";
    //     return str.substring(0, str.length - 1);
    // } else if (str.indexOf(".") > -1) { //小数
    //     if (scale == 0) {
    //         return str.substring(0, str.indexOf("."));
    //     }
    //     return str.substring(0, str.indexOf(".") + scale + 1); //截取指定位数
    // } else { //整数
    //     return str;
    // }
}

Vue.filter('toFloor', (number, scale) => {
  return toFloor(number, scale)
})
// Input 特殊字符限制
Vue.filter('reg', function(reg) {
  var reg = new RegExp(/[\-\_\,\!\|\~\`\(\)\#\@\%\-\+\=\/\'\￥\。\ \…\$\（\）\(\)\[\]\【\】\^\&\*\{\}\:\;\"\L\<\>\?\\]/g, '')
  return reg
})
// 数组三位一个逗号的正则匹配
const threeComma = (num) => {
  if (num) {
    return String(num).replace(/(?=(\B)(\d{3})+$)/g, ',')
  } else {
    return 0
  }
}
Vue.filter('threeComma', threeComma)

Vue.prototype.toFloor = toFloor
Vue.prototype.settiele = (name, num) => {
  if (name !== undefined) {
    window.document.title = name
  } else {
    window.document.title = 'bdw 投资者最信赖的数字资产增值平台'
  }
}

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
})
