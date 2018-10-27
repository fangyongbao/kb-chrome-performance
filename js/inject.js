function InitTiming() {
  let list = [];
  const {
    timing,
  } = window.performance;
  const dnsTimer = {
    key: 'DNS查询耗时',
    value: `${parseInt(timing.domainLookupEnd - timing.domainLookupStart, 10)}`,
  };
  const tcpTimer = {
    key: 'TCP链接耗时',
    value: `${parseInt(timing.connectEnd - timing.connectStart, 10)}`,
  };
  const requestTimer = {
    key: 'request请求耗时',
    value: `${parseInt(timing.responseEnd - timing.requestStart, 10)}`,
  };
  const domReadyTimer = {
    key: 'DOM Ready总耗时',
    value: `${parseInt(timing.domContentLoadedEventEnd - timing.navigationStart, 10)}`,
  };
  const onLoadTimer = {
    key: '网页加载总耗时',
    value: `${parseInt(timing.loadEventEnd - timing.navigationStart, 10)}`,
  };

  list = list.concat(
    dnsTimer,
    tcpTimer,
    requestTimer,
    domReadyTimer,
    onLoadTimer,
  );
  const values = list.map((item) => parseInt(item.value, 10));
  console.log('------页面初始化------');
  console.table(list);
  return {
    list,
    values,
  };
}

function ResourceTiming(assets) {
  try {
    const resources = assets || window.performance.getEntries();
    const javascript = [];
    const css = [];
    const api = [];
    for (let i = resources.length - 1; i > 0; i--) {
      const temp = {};
      const item = resources[i];
      temp.key = item.name;
      temp.requestTiming = `${parseInt(item.responseEnd - item.requestStart, 10)}`;
      temp.connectTiming = `${parseInt(item.connectEnd - item.connectStart, 10)}`;
      temp.value = `${parseInt(temp.requestTiming, 10) + parseInt(temp.connectTiming, 10)}`;
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

