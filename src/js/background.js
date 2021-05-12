const TimeOfDay = Object.freeze({
	NIGHT: Object.freeze({ name: "night", backgroundsAmount: 9 }),
	MORNING: Object.freeze({ name: "morning", backgroundsAmount: 10 }),
	AFTERNOON: Object.freeze({ name: "afternoon", backgroundsAmount: 7 }),
	EVENING: Object.freeze({ name: "evening", backgroundsAmount: 8 })
});
const IMG_PATH = "../img/";
const BACKGROUND_ELEMENT = document.querySelector(".background");
const HOURS_PER_DAY = 24;

var backgroundsArray = new Array();
var hours;

document.addEventListener("DOMContentLoaded", () => {
	prepareBackgrounds();
	initBackground();
	setInterval(updateBackground, 1000);
	setUpButtonsListeners();
});

function prepareBackgrounds() {
	let timesOfDay = Object.values(TimeOfDay);
	for (let timeOfDay of timesOfDay) {
		let backgroundsIDs = Array.from(Array(timeOfDay.backgroundsAmount).keys());
		shuffleArray(backgroundsIDs);
		backgroundsIDs = backgroundsIDs.slice(0, HOURS_PER_DAY / timesOfDay.length);
		let backgroundsPaths = backgroundsIDs.map((backgroundID) => {
			let twoDigitBackGroundID = backgroundID.toString().padStart(2, "0");
			return `${timeOfDay.name}/${timeOfDay.name}_${twoDigitBackGroundID}.webp`;
		});
		backgroundsArray = backgroundsArray.concat(backgroundsPaths);
	}
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function initBackground() {
	let now = new Date();
	hours = now.getHours();
	BACKGROUND_ELEMENT.addEventListener("ready", () => BACKGROUND_ELEMENT.style.opacity = 1);
	loadBackground(hours);
}

function loadBackground(hours) {
	currentBackground = backgroundsArray[hours];
	let backgroundFilePath = IMG_PATH + currentBackground;
	BACKGROUND_ELEMENT.style.backgroundImage = `url(${backgroundFilePath})`;
}

function updateBackground() {
	let now = new Date();
	let seconds = now.getSeconds();
	let minutes = now.getMinutes();
	if (minutes === 0 && seconds == 0) {
		hours = now.getHours();
		loadBackground(hours);
	}
}

function setUpButtonsListeners() {
	let nextBackgroundButtonElements = document.querySelectorAll(".next-image-button");
	for (let nextBackgroundButtonElement of nextBackgroundButtonElements) {
		nextBackgroundButtonElement.addEventListener("click", () => {
			showNextBackground();
		})
	}
	let prevBackgroundButtonElements = document.querySelectorAll(".prev-image-button");
	for (let prevBackgroundButtonElement of prevBackgroundButtonElements) {
		prevBackgroundButtonElement.addEventListener("click", () => {
			showPrevBackground();
		})
	}
}

function showNextBackground() {
	hours = (hours + 1) % HOURS_PER_DAY;
	loadBackground(hours);
}

function showPrevBackground() {
	hours--;
	if (hours < 0) {
		hours = HOURS_PER_DAY - 1;
	}
	loadBackground(hours);
}