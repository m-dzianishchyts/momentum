const TimeOfDay = Object.freeze({
	MORNING: Object.freeze({ ordinal: 1, name: "morning", backgroundsAmount: 10 }),
	AFTERNOON: Object.freeze({ ordinal: 2, name: "afternoon", backgroundsAmount: 10 }),
	EVENING: Object.freeze({ ordinal: 3, name: "evening", backgroundsAmount: 10 }),
	NIGHT: Object.freeze({ ordinal: 4, name: "night", backgroundsAmount: 10 })
})
const IMG_PATH = "../img/";
const BACKGROUND_ELEMENT = document.querySelector(".background");

document.addEventListener("DOMContentLoaded", initBackground);
setUpUsernameListeners();

function initBackground() {
	let timeOfDay = defineTimeOfDay();
	let backgroundNumber = Math.floor(Math.random() * timeOfDay.backgroundsAmount) + 1;
	let twoDigitBackGroundNumber = backgroundNumber.toString().padStart(2, "0");
	let backgroundFilePath = IMG_PATH + timeOfDay.name + "/" + timeOfDay.name + "_" + twoDigitBackGroundNumber + ".webp";
	BACKGROUND_ELEMENT.style.backgroundImage = `url(${backgroundFilePath})`;
}

function defineTimeOfDay() {
	let now = new Date();
	let hours = now.getHours();
	if (hours < 6) {
		return TimeOfDay.NIGHT;
	}
	if (hours < 12) {
		return TimeOfDay.MORNING;
	}
	if (hours < 18) {
		return TimeOfDay.AFTERNOON;
	}
	return TimeOfDay.EVENING
}