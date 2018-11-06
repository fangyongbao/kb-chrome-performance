function InitTiming() {
  var list = [];
  var timing = window.performance.timing;
  var dnsTimer = {
    key: 'DNS查询耗时',
    value: parseInt(timing.domainLookupEnd - timing.domainLookupStart, 10),
  };
  var tcpTimer = {
    key: 'TCP链接耗时',
    value: parseInt(timing.connectEnd - timing.connectStart, 10),
  };
  var requestTimer = {
    key: 'request请求耗时',
    value: parseInt(timing.responseEnd - timing.requestStart, 10),
  };
  var domReadyTimer = {
    key: 'DOM Ready总耗时',
    value: parseInt(timing.domContentLoadedEventEnd - timing.navigationStart, 10),
  };
  var onLoadTimer = {
    key: '网页加载总耗时',
    value: parseInt(timing.loadEventEnd - timing.navigationStart, 10),
  };

  list = list.concat(
    dnsTimer,
    tcpTimer,
    requestTimer,
    domReadyTimer,
    onLoadTimer,
  );
  var values = list.map((item) => parseInt(item.value, 10));
  console.log('------页面初始化------');
  console.table(list);
  return {
    list,
    values,
  };
}

function ResourceTiming(assets) {
  try {
    var resources = assets || window.performance.getEntries();
    var javascript = [];
    var css = [];
    var api = [];
    for (var i = resources.length - 1; i > 0; i--) {
      var temp = {};
      var item = resources[i];
      temp.key = item.name;
      temp.requestTiming = parseInt(item.responseEnd - item.requestStart, 10);
      temp.connectTiming = parseInt(item.connectEnd - item.connectStart, 10);
      temp.value = parseInt(temp.requestTiming, 10) + parseInt(temp.connectTiming, 10);
      if (item.initiatorType === 'script') {
        javascript.push(temp);
      } else if (item.initiatorType === 'link') {
        css.push(temp);
      } else if (item.initiatorType === 'xmlhttprequest') {
        api.push(temp);
      }
    }
    console.log('------页面请求静js资源------');
    console.table(javascript);
    console.log('------页面请求静css资源------');
    console.table(css);
    console.log('------页面请求静api资源------');
    console.table(api);
    return {
      javascript,
      css,
      api,
    };
  } catch (err) {
    return {
      javascript: [],
      css: [],
      api: [],
    };
  }
}

