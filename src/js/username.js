const USERNAME_KEY = "username";
const USERNAME_ELEMENTS = document.getElementsByClassName("username");
var oldUsername;

document.addEventListener("DOMContentLoaded", initUsername);
setUpUsernameListeners();

function initUsername() {
	let username = getUsername();
	for (let usernameElement of USERNAME_ELEMENTS) {
		usernameElement.innerHTML = username;
	}
}

function getUsername() {
	let username = localStorage.getItem(USERNAME_KEY);
	if (username === null) {
		username = "stranger";
	}
	return username;
}

function setUpUsernameListeners() {
	for (let usernameElement of USERNAME_ELEMENTS) {
		usernameElement.addEventListener("focus", () => {
			oldUsername = usernameElement.innerHTML;
			usernameElement.innerHTML = "";
			usernameElement.focus();
		});
		usernameElement.addEventListener("keypress", (event) => {
			let keyPressedCode = event.which | event.keyCode;
			if (keyPressedCode === 13) {
				usernameElement.blur();
			}
		});
		usernameElement.addEventListener("blur", () => {
			let newUsername = usernameElement.innerHTML;
			if (!isBlank(newUsername)) {
				localStorage.setItem(USERNAME_KEY, newUsername);
				for (otherUsernameElement of USERNAME_ELEMENTS) {
					otherUsernameElement.innerHTML = newUsername;
				}
			} else {
				usernameElement.innerHTML = oldUsername;
			}
		});
	}
}

function isBlank(str) {
	return !str || /^\s*$/.test(str);
}