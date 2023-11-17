chrome.runtime.onInstalled.addListener(chrome.runtime.openOptionsPage);
(async () => {
	const storage = await chrome.storage.local.get()
	if (!storage.SettingsDecided) {
		chrome.runtime.openOptionsPage()
	}
})();