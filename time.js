/* eslint-disable no-undef */
const cookiedata = {};
document.cookie.split("; ").forEach(elem => {
	const arr = elem.split("=");
	cookiedata[arr[0]] = decodeURIComponent(arr[1]);
});
console.log(cookiedata);
chrome.storage.local.get(function (value) {
	const terget = value.terget;
	const username = value.username;
	const date = new Date();
	const data = value.data
	.replace(/%ALL/g,date.toLocaleString())
	.replace(/%YE/g, date.getFullYear())    // Yukkkuさんのコード丸パクリしてきました(ありがとうございます)
	.replace(/%MO/g, date.getMonth())
	.replace(/%DA/g, date.getDate())
	.replace(/%HO/g, date.getHours())
	.replace(/%MI/g, date.getMinutes())
	.replace(/%SE/g, date.getSeconds())
	.replace(/%MS/g, date.getMilliseconds())
	.replace(/%UALL/g,date.toString())
	.replace(/%UYE/g, date.getUTCFullYear())
	.replace(/%UMO/g, date.getUTCMonth())
	.replace(/%UDA/g, date.getUTCDate())
	.replace(/%UHO/g, date.getUTCHours())
	.replace(/%UMI/g, date.getUTCMinutes())
	.replace(/%USE/g, date.getUTCSeconds())
	.replace(/%UMS/g, date.getUTCMilliseconds()) // あとこのゴリラコードをなんとかしたい
	fetch(`https://scratch.mit.edu/site-api/users/all/${username}/`, {
		"headers": {
			"x-csrftoken": cookiedata.scratchcsrftoken,
			"x-requested-with": "XMLHttpRequest"
		},
		"body": `{"${terget}":"${data}"}`,
		"method": "PUT",
	});
});