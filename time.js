/* eslint-disable no-undef */
const cookiedata = {};
document.cookie.split("; ").forEach(elem => {
	const arr = elem.split("=");
	cookiedata[arr[0]] = decodeURIComponent(arr[1]);
});
console.log(cookiedata);
chrome.storage.local.get(function (value) {
	console.log("更新",value);
	const terget = value.terget;
	const username = value.username;
	const data = value.data.split("{{lastlogin}}")[0] + new Date().toLocaleString() + value.data.split("{{lastlogin}}")[1];
	fetch(`https://scratch.mit.edu/site-api/users/all/${username}/`, {
		"headers": {
			"x-csrftoken": cookiedata.scratchcsrftoken,
			"x-requested-with": "XMLHttpRequest"
		},
		"referrer": `https://scratch.mit.edu/users/${username}/`,
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": `{"${terget}":"${data}"}`,
		"method": "PUT",
	});
});