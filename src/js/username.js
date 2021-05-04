const USERNAME_KEY = "username";
const USERNAME_ELEMENTS = document.getElementsByClassName("username");

document.addEventListener("DOMContentLoaded", initUsername);
setUpUsernameListeners();

function initUsername() {
	let username = getUsername();
	setUsername(username);
}

function setUsername(username) {
	for (let usernameElement of USERNAME_ELEMENTS) {
		usernameElement.textContent = username;
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
			usernameElement.textContent = "";
			usernameElement.focus();
		});
		usernameElement.addEventListener("keypress", (event) => {
			let keyPressedCode = event.which | event.keyCode;
			if (keyPressedCode === 13) {
				usernameElement.blur();
			}
		});
		usernameElement.addEventListener("blur", () => {
			let newUsername = usernameElement.textContent;
			console.log("New username:" + newUsername + ", " + newUsername.length);
			console.log("New username is blank: " + isBlank(newUsername));
			if (!isBlank(newUsername)) {
				localStorage.setItem(USERNAME_KEY, newUsername);
				setUsername(newUsername);
			} else {
				usernameElement.textContent = getUsername();
			}
		});
	}
}

function isBlank(str) {
	return !str || /^[\s]*$/.test(str);
}