/* eslint-disable no-undef */
const htmlUsername = document.querySelector("#username");
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
    if(value.username) htmlUsername.value = value.username;
    htmlCount.innerText = `残り${500 - [...htmlData.value].length - 5}文字`;
})
htmlData.addEventListener("keyup",() => {
    htmlCount.innerText = `残り${500 - [...htmlData.value].length - 5}文字`;
})
document.querySelector("#save").addEventListener("click",function() {
    let message = "次の要素が不足しています。: ";
    if(!htmlUsername.value) message += "username ";
    if(!htmlData.value) message += "本文 ";
    if(!htmlData.value.includes("{{lastlogin}}")) message += "本文内の{{lastlogin}} ";
    if(message !=="次の要素が不足しています。: ") {
        htmlCount.textContent = message;
        return false;
    }
    chrome.storage.local.set({
        username: htmlUsername.value,
        terget: htmlBio.checked === true ? "bio" : "status",
        data: htmlData.value.replaceAll("\n","\\n")
    })
    htmlCount.textContent = "saved!";
})