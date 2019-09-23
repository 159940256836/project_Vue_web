var $ = require('jquery')
var WebsockFeed = function(url, coin, stompClient, scale) {
  this._datafeedURL = url
  this.coin = coin
  this.stompClient = stompClient
  this.lastBar = null
  this.currentBar = null
  this.subscribe = true
  this.scale = scale
}

WebsockFeed.prototype.onReady = function(callback) {
  var config = {}
  config.exchanges = []
  config.supported_resolutions = ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M']
  config.supports_group_request = false
  config.supports_marks = false
  config.supports_search = false
  config.supports_time = true
  config.supports_timescale_marks = false

  $('#' + window.tvWidget.id).contents().on('click', '.date-range-list>a', function() {
    if (window.tvWidget) {
      if ($(this).html() == '分时') {
        $(this).parent().addClass('real-op').removeClass('common-op')
        window.tvWidget.chart().setChartType(3)
      } else {
        $(this).parent().addClass('common-op').removeClass('real-op')
        window.tvWidget.chart().setChartType(1)
      }
    }
  })

  setTimeout(function() {
    callback(config)
  }, 0)
}
// 订阅实时数据
WebsockFeed.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
  this._send(this._datafeedURL + '/current', {
    symbol: symbolInfo.name,
    resolution: resolution
  })
    .done(function(response) {
      const bars = []
      bars.push({ time: response[0], open: response[1], high: response[2], low: response[3], close: response[4], volume: response[5] })
      onRealtimeCallback(bars[0])
    })
  var that = this
  this.stompClient.subscribe('/topic/market/trade/' + symbolInfo.name, function(msg) {
    var resp = JSON.parse(msg.body)
    if (that.lastBar != null && resp.length > 0) {
      var price = resp[resp.length - 1].price
      that.lastBar.close = price
      if (price > that.lastBar.high) {
        that.lastBar.high = price
      }
      if (price < that.lastBar.low) {
        that.lastBar.low = price
      }
      onRealtimeCallback(that.lastBar)
    }
  })
  switch (resolution) {
    case '1':
      resolution = '1min'
      break
    case '5':
      resolution = '5min'
      break
    case '15':
      resolution = '15min'
      break
    case '30':
      resolution = '30min'
      break
    case '60':
      resolution = '1hour'
      break
    case '240':
      resolution = '4hour'
      break
    case '1D':
      resolution = '1day'
      break
    case '1W':
      resolution = '1week'
      break
    case '1M':
      resolution = '1month'
      break
  }
  this.stompClient.subscribe('/topic/market/kline/' + resolution + '/' + symbolInfo.name, function(msg) {
    if (resolution != '1') return
    if (that.currentBar != null) onRealtimeCallback(that.currentBar)
    var resp = JSON.parse(msg.body)
    that.lastBar = {
      time: resp.time,
      open: resp.openPrice,
      high: resp.highestPrice,
      low: resp.lowestPrice,
      close: resp.closePrice,
      volume: resp.volume
    }
    that.currentBar = that.lastBar
    onRealtimeCallback(that.lastBar)
  })

  this.stompClient.subscribe('/topic/market/realtime/' + symbolInfo.name, function(msg) {
    var resp = JSON.parse(msg.body)
    if (resp[0] != undefined) {
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].period == resolution) {
          that.lastBar = {
            time: resp[i].time,
            open: resp[i].openPrice,
            high: resp[i].highestPrice,
            low: resp[i].lowestPrice,
            close: resp[i].closePrice,
            volume: resp[i].volume
          }
        }
      }
    }
    // if (resolution != '1') return
    // if (that.currentBar != null) onRealtimeCallback(that.currentBar)
    that.currentBar = that.lastBar
    onRealtimeCallback(that.lastBar)
  })
}

// 取消订阅
WebsockFeed.prototype.unsubscribeBars = function(subscriberUID) {
  this.subscribe = false
}

WebsockFeed.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
  // var data = {"name":this.coin.symbol,"exchange-traded":"","exchange-listed":"","minmov":1,"minmov2":0,"pointvalue":1,"has_intraday":true,"has_no_volume":false,"description":this.coin.symbol,"type":"bitcoin","session":"24x7","supported_resolutions":["1","5","15","30","60","240","1D","1W","1M"],"pricescale":500,"ticker":"","timezone":"Asia/Shanghai"};
  var data = {
    'name': this.coin.symbol,
    'exchange-traded': '',
    'exchange-listed': 'HUOBI',
    'minmov': 1,
    'volumescale': 10000,
    'has_daily': true,
    'has_weekly_and_monthly': true,
    'has_intraday': true,
    'description': this.coin.symbol,
    'type': 'bitcoin',
    'session': '24x7',
    'supported_resolutions': ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M'],
    'pricescale': Math.pow(10, this.scale),
    'ticker': '',
    'timezone': 'Asia/Shanghai'
  }
  // var data = {"name":this.coin.symbol,"exchange-traded":"","exchange-listed":"","minmov":1,"volumescale":10000,"has_daily":true,"has_weekly_and_monthly":true,"has_intraday":true,"description":this.coin.symbol,"type":"bitcoin","session":"24x7","supported_resolutions":["1","5","15","30","60","240","1D","1W","1M"],"pricescale":Math.pow(10,this.scale || 2),"ticker":"","timezone":"Asia/Shanghai"};
  setTimeout(function() {
    onSymbolResolvedCallback(data)
  }, 0)
}

WebsockFeed.prototype._send = function(url, params) {
  var request = url
  if (params) {
    for (var i = 0; i < Object.keys(params).length; ++i) {
      var key = Object.keys(params)[i]
      var value = encodeURIComponent(params[key])
      request += (i === 0 ? '?' : '&') + key + '=' + value
    }
  }

  return $.ajax({
    type: 'GET',
    url: request,
    dataType: 'json'
  })
}

function Processdata(event) {
  for (let i = 0; i < event.length; i++) {
    if (i != event.length - 1) {
      event[i].close = event[i + 1].open
    }
  }
  return event
}

// 初始化K线历史数据加载
WebsockFeed.prototype.getBars = function(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
  var bars = []
  var that = this
  this._send(this._datafeedURL + '/v2/history', {
    symbol: symbolInfo.name,
    from: from * 1000,
    to: firstDataRequest ? new Date().getTime() : to * 1000,
    resolution: resolution
  })
    .done(function(response) {
      var data = response
      for (var i = 0; i < data.length; i++) {
        var item = data[i]
        bars.push({ time: item[0], open: item[1], high: item[2], low: item[3], close: item[4], volume: item[5] })
      }
      that.lastBar = bars.length > 0 ? bars[bars.length - 1] : null
      Processdata(bars)
      that.currentBar = that.lastBar
      var noData = bars.length == 0
      onHistoryCallback(bars, { noData: noData })
    })
    .fail(function(reason) {
      onErrorCallback(reason)
    })
}

WebsockFeed.prototype.periodLengthSeconds = function(resolution, requiredPeriodsCount) {
  var daysCount = 0
  if (resolution === 'D') {
    daysCount = requiredPeriodsCount
  } else if (resolution === 'M') {
    daysCount = 31 * requiredPeriodsCount
  } else if (resolution === 'W') {
    daysCount = 7 * requiredPeriodsCount
  } else if (resolution === 'H') {
    daysCount = requiredPeriodsCount * resolution / 24
  } else {
    daysCount = requiredPeriodsCount * resolution / (24 * 60)
  }
  return daysCount * 24 * 60 * 60
}

export default { WebsockFeed }
