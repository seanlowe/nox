function retrieveStatus() {
	return document.querySelector("#status").innerHTML;
}

function setStatus(msg) {
	document.querySelector("#status").innerHTML = msg;
}

function setStatusImage() {
	let current_status = retrieveStatus();
	let body = document.body;
	switch (current_status) {
		case "online":
			// alert("status is online");
			body.style.backgroundImage = "url(assets/status_blue.png)";
			break;
		case "offline":
			// alert("status is offline");
			body.style.backgroundImage = "url(assets/status_red.png)";
			break;
		default:
			break;
	}
}

function switchStatus() {
	let current_status = retrieveStatus();
	if (current_status == "offline") {
		setStatus("online");
		setStatusImage();
	} else {
		setStatus("offline");
		setStatusImage();
	}
}