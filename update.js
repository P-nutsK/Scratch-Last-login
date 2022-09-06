(async ()=> {
	document.querySelector("#new").textContent = await (await fetch("https://raw.githubusercontent.com/P-nutsK/Scratch-Last-login/master/updatedata")).text();
})();