const USERNAME_KEY = "username";
const USERNAME_ELEMENTS = document.getElementsByClassName("username");
const GREETING_PHRASE_ELEMENTS = document.getElementsByClassName("greeting__phrase");

const EVENING_GREETING = "Good evening";
const MORNING_GREETING = "Good morning";
const AFTERNOON_GREETING = "Good afternoon";

var currentGreetingPhrase;

document.addEventListener("DOMContentLoaded", () => {
	initUsername();
	initGreeting();
	setInterval(updateGreeting, 1000);
	setUpUsernameListeners();
});

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

function initGreeting() {
	currentGreetingPhrase = getGreetingPhrase();
	setGreeting();
}

function setGreeting() {
	for (let greetingPhraseElement of GREETING_PHRASE_ELEMENTS) {
		greetingPhraseElement.textContent = currentGreetingPhrase;
	}
}

function updateGreeting() {
	let greetingPhrase = getGreetingPhrase();
	if (greetingPhrase !== currentGreetingPhrase) {
		setGreeting();
	}
}

function getGreetingPhrase() {
	let now = new Date();
	let hours = now.getHours();
	if (hours < 6) {
		return EVENING_GREETING;
	}
	if (hours < 12) {
		return MORNING_GREETING;
	}
	if (hours < 18) {
		return AFTERNOON_GREETING;
	}
	return EVENING_GREETING;
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