const cookiedata = {};
document.cookie.split("; ").forEach(elem => {
	const arr = elem.split("=");
	cookiedata[arr[0]] = decodeURIComponent(arr[1]);
});
console.log(cookiedata);
chrome.storage.local.get(async function (value) {
	const terget = value.terget;
	const date = new Date();
	const data = value.data
		.replace(/%ALL/g, date.toLocaleString())
		.replace(/%YE/g, date.getFullYear())    // Yukkkuさんのコード丸パクリしてきました(ありがとうございます)
		.replace(/%MO/g, date.getMonth() + 1)
		.replace(/%DA/g, date.getDate())
		.replace(/%HO/g, date.getHours())
		.replace(/%MI/g, date.getMinutes())
		.replace(/%SE/g, date.getSeconds())
		.replace(/%MS/g, date.getMilliseconds())
		.replace(/%UALL/g, date.toString())
		.replace(/%UYE/g, date.getUTCFullYear())
		.replace(/%UMO/g, date.getUTCMonth() + 1)
		.replace(/%UDA/g, date.getUTCDate())
		.replace(/%UHO/g, date.getUTCHours())
		.replace(/%UMI/g, date.getUTCMinutes())
		.replace(/%USE/g, date.getUTCSeconds())
		.replace(/%UMS/g, date.getUTCMilliseconds())
		.replace(/%ISO/g, date.toISOString()) // あとこのゴリラコードをなんとかしたい
	var username = (await (await fetch("https://scratch.mit.edu/session/", { "headers": { "x-requested-with": "XMLHttpRequest" } })).json()).user.username
	if (!value.ignore.includes(username)) {
		fetch(`https://scratch.mit.edu/site-api/users/all/${(await (await fetch("https://scratch.mit.edu/session/", { "headers": { "x-requested-with": "XMLHttpRequest" } })).json()).user.username}/`, {//意見もらったんで少し改造
			"headers": {
				"x-csrftoken": cookiedata.scratchcsrftoken,
				"x-requested-with": "XMLHttpRequest"
			},
			"body": `{"${terget}":"${data}"}`,
			"method": "PUT",
		});
	}
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
