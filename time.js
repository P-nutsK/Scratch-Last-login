const cookiedata = {};
document.cookie.split("; ").forEach(elem => {
	const arr = elem.split("=");
	cookiedata[arr[0]] = decodeURIComponent(arr[1]);
});
console.log(cookiedata);
function format(text){
  const replaceData={
    "ALL":"toLocaleString",
    "YE":"getFullYear",
    "MO":date=>date.getMonth()+1,
    "DA":"getDate",
    "HO":"getHours",
    "MI":"getMinutes",
    "SE":"getSeconds",
    "MS":"getMilliseconds",
    "UALL":"toString",
    "UYE":"getUTCFullYear",
    "UMO":date=>date.getUTCMonth()+1,
    "UDA":"getUTCDate",
    "UHO":"getUTCHours",
    "UMI":"getUTCMinutes",
    "USE":"getUTCSeconds",
    "UMS":"getUTCMilliseconds",
    "%":"%",
  };
  const date=new Date();
  Object.keys(replaceData).forEach(target=>{
    const value=replaceData[target];
    target="%"+target;
    if(typeof value==="string"){
      text=text.replaceAll(target,date[value]());
    }else{
      text=text.replaceAll(target,value(date));
    }
  });
  return text;
}
chrome.storage.local.get(async function (value) {
	const terget = value.terget;
	const date = new Date();
	const data = format(value.data);
	fetch(`https://scratch.mit.edu/site-api/users/all/${(await (await fetch("https://scratch.mit.edu/session/", {"headers": {"x-requested-with": "XMLHttpRequest"}})).json()).user.username}/`, {//意見もらったんで少し改造
		"headers": {
			"x-csrftoken": cookiedata.scratchcsrftoken,
			"x-requested-with": "XMLHttpRequest"
		},
		"body": `{"${terget}":"${data}"}`,
		"method": "PUT",
	});
});

(async () => {
	const latest = await (await fetch("https://raw.githubusercontent.com/P-nutsK/Scratch-Last-login/master/manifest.json")).json();
	const manifest = chrome.runtime.getManifest();
	const storagedata = await chrome.storage.local.get();
	if (latest.version != manifest.version && storagedata.lastalertversion != latest.version) {
		chrome.runtime.sendMessage({ type: "openURL", url: chrome.runtime.getURL("update.html") });
		chrome.storage.local.set({ lastalertversion: latest.version });
	}
})();
