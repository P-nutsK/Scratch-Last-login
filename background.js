chrome.runtime.onInstalled.addListener(chrome.runtime.openOptionsPage)
chrome.runtime.onMessage.addListener(function(request) {
	switch(request.type) {
		case("openURL"): {
			chrome.tabs.create({url:request.url});
			break;
		}
	}
})
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.get("ignore",(a)=>{
		if(JSON.stringify(a) == "{}"){
			chrome.storage.local.set({
				ignore:[]
			})
		}
	})
});