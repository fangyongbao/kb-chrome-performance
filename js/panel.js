// 检测jQuery
document.getElementById('get-performance').addEventListener('click', function(){
	chrome.devtools.inspectedWindow.eval('window.InitTiming();', function(res, isException) {
		var $content = document.getElementById('init-timing');
		$content.innerHTML = renderInitTiming('渲染耗时', res.list || []);
	});
	chrome.devtools.inspectedWindow.eval('window.ResourceTiming();', function(res, isException) {
		var $contentJs = document.getElementById('resource-timing-javascript');
		var $contentCss = document.getElementById('resource-timing-css');
		var $contentApi = document.getElementById('resource-timing-api');
		$contentJs.innerHTML = renderResourceTiming('js加载耗时', res.javascript || []);
		$contentCss.innerHTML = renderResourceTiming('css加载耗时', res.css || []);
		$contentApi.innerHTML = renderResourceTiming('api加载耗时', res.api || []);
	});
});

function renderInitTiming(title, list) {
	var str = '<div class="title">'+title+'</div><ul>';
  for(var i=0; i<list.length; i++) {
    str += '<li><div>'+list[i].key+': '+list[i].value+'</div></li>'
	}
	str += '</ul>';
	return str;
}

function renderResourceTiming(title, list) {
	var str = '<div class="title">'+title+'</div><ul>';
  for(var i=0; i<list.length; i++) {
    str += '<li><div>'+list[i].key+'</div><div>connectTiming: '+list[i].connectTiming+'</div><div>requestTiming:'+list[i].requestTiming+'</div><div>总耗时:'+list[i].value+'</div></li>'
	}
	str += '</ul>';
	return str;
}

