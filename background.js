chrome.runtime.onInstalled.addListener(chrome.runtime.openOptionsPage)
chrome.runtime.onMessage.addListener(function(request) {
	switch(request.type) {
		case("openURL"): {
			chrome.tabs.create({url:request.url});
			break;
		}
	}
})