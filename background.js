chrome.action.onClicked.addListener(() => {
	chrome.runtime.openOptionsPage()
});
(async () => {
const storage =  await chrome.storage.local.get()
	if (storage.SettingsDecided) {

	} else {
		chrome.runtime.openOptionsPage()
	}
})();