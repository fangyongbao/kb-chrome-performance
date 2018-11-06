document.addEventListener('DOMContentLoaded', function() {
  console.log('content-script.js excute');
  injectCustomJs();
});

// 向页面注入JS
function injectCustomJs(jsPath) {
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  console.log(chrome.extension.getURL(jsPath));
	temp.src = chrome.extension.getURL(jsPath);
  document.body.appendChild(temp);
  console.log('inject.js inject');
}
