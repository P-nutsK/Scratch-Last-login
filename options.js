/* eslint-disable no-undef */
const htmlStatus = document.querySelector("#status");
const htmlBio = document.querySelector("#bio");
const htmlData = document.querySelector("#data");
const htmlCount = document.querySelector("#count");

htmlBio.checked == true;
chrome.storage.local.get(value => {
    if(value.terget === "status") {
        htmlStatus.checked = true;
    } else {
        htmlBio.checked = true;
    }
    if(value.data) htmlData.innerHTML = value.data.replaceAll("\\n","&#13;");
    htmlCount.innerText = `残り約${200 - [...test(htmlData.value)].length}文字`;
})
htmlData.addEventListener("keyup",() => {
    htmlCount.innerText = `残り約${200 - [...test(htmlData.value)].length}文字`;
})
document.querySelector("#save").addEventListener("click",function() {
    if(!htmlData.value) {
        htmlCount.textContent = "本文がありません";
        return;
    }
    chrome.storage.local.set({
        terget: htmlBio.checked === true ? "bio" : "status",
        data: htmlData.value.replaceAll("\n","\\n")
    })
    htmlCount.textContent = "saved!";
})

function test(str) {
    const date = new Date();
    return str.replace(/%ALL/g,date.toLocaleString())
	.replace(/%YE/g, date.getFullYear())
	.replace(/%MO/g, date.getMonth() + 1)
	.replace(/%DA/g, date.getDate())
	.replace(/%HO/g, date.getHours())
	.replace(/%MI/g, date.getMinutes())
	.replace(/%SE/g, date.getSeconds())
	.replace(/%MS/g, date.getMilliseconds())
	.replace(/%UALL/g,date.toUTCString)
	.replace(/%UYE/g, date.getUTCFullYear())
	.replace(/%UMO/g, date.getUTCMonth() + 1)
	.replace(/%UDA/g, date.getUTCDate())
	.replace(/%UHO/g, date.getUTCHours())
	.replace(/%UMI/g, date.getUTCMinutes())
	.replace(/%USE/g, date.getUTCSeconds())
	.replace(/%UMS/g, date.getUTCMilliseconds())
    .replace(/%ISO/g, date.toISOString())
}
