const TIME_ELEMENTS = document.getElementsByClassName("time");
const DATE_ELEMENTS = document.getElementsByClassName("date");
const DATE_TIME_OPACITY_TIMER = 200;
const DATE_TIME_UPDATE_INTERVAL = 1000;

document.addEventListener("DOMContentLoaded", initDateTime);
setInterval(updateDateTime, DATE_TIME_UPDATE_INTERVAL);

function initDateTime() {
	initTime();
	initDate();
}

function initTime() {
	let timeValues = getTimeValuesAsStrings();
	for (let timeElement of TIME_ELEMENTS) {
		let timeValuesElements = getTimeValuesElements(timeElement);
		timeValuesElements.hours.innerHTML = timeValues.hours;
		timeValuesElements.minutes.innerHTML = timeValues.minutes;
		timeValuesElements.seconds.innerHTML = timeValues.seconds;
	}
}

function getTimeValuesAsStrings() {
	let now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	let minutesFixedLeadingZeros = minutes.toString().padStart(2, "0");
	let secondsFixedLeadingZeros = seconds.toString().padStart(2, "0");
	return {
		hours: hours.toString(),
		minutes: minutesFixedLeadingZeros,
		seconds: secondsFixedLeadingZeros
	};
}

function getTimeValuesElements(timeElement) {
	let hoursElement = timeElement.querySelector(".time__hours");
	let minutesElement = timeElement.querySelector(".time__minutes");
	let secondsElement = timeElement.querySelector(".time__seconds");
	return {
		hours: hoursElement,
		minutes: minutesElement,
		seconds: secondsElement
	};
}

function initDate() {
	let dateValues = getDateValuesAsStrings();
	for (let dateElement of DATE_ELEMENTS) {
		let dataValuesElements = getDateValuesElements(dateElement);
		dataValuesElements.month.innerHTML = dateValues.month;
		dataValuesElements.dayOfMonth.innerHTML = dateValues.dayOfMonth;
		dataValuesElements.dayOfWeek.innerHTML = dateValues.dayOfWeek;
	}
}

function getDateValuesAsStrings() {
	let now = new Date();
	let monthFormatter = new Intl.DateTimeFormat("default", { month: "long" });
	let dayOfWeekFormatter = new Intl.DateTimeFormat("default", { weekday: "long" });
	let month = monthFormatter.format(now);
	let dayOfMonth = now.getDate();
	let dayOfWeek = dayOfWeekFormatter.format(now);
	return {
		month: month,
		dayOfMonth: dayOfMonth.toString(),
		dayOfWeek: dayOfWeek
	};
}

function getDateValuesElements(dateElement) {
	let month = dateElement.querySelector(".date__month");
	let dayOfMonth = dateElement.querySelector(".date__day-of-month");
	let dayOfWeek = dateElement.querySelector(".date__day-of-week");
	return {
		month: month,
		dayOfMonth: dayOfMonth,
		dayOfWeek: dayOfWeek
	};
}

function updateDateTime() {
	updateTime();
	updateDate();
}

function updateTime() {
	let timeValues = getTimeValuesAsStrings();
	for (let timeElement of TIME_ELEMENTS) {
		let timeValuesElements = getTimeValuesElements(timeElement);
		let hoursElement = timeValuesElements.hours;
		let minutesElement = timeValuesElements.minutes;
		let secondsElement = timeValuesElements.seconds;
		let hoursUpdateNeeded = false;
		let minutesUpdateNeeded = false;
		let secondsUpdateNeeded = false;
		if (hoursElement.innerHTML != timeValues.hours) {
			hoursUpdateNeeded = true;
			hoursElement.style.opacity = 0;
		}
		if (minutesElement.innerHTML != timeValues.minutes) {
			minutesUpdateNeeded = true;
			minutesElement.style.opacity = 0;
		}
		if (secondsElement.innerHTML != timeValues.seconds) {
			secondsUpdateNeeded = true;
			secondsElement.style.opacity = 0;
		}
		setTimeout(() => {
			if (hoursUpdateNeeded) {
				hoursElement.style.opacity = 1;
				hoursElement.innerHTML = timeValues.hours;
			}
			if (minutesUpdateNeeded) {
				minutesElement.style.opacity = 1;
				minutesElement.innerHTML = timeValues.minutes;
			}
			if (secondsUpdateNeeded) {
				secondsElement.style.opacity = 1;
				secondsElement.innerHTML = timeValues.seconds;
			}
		}, DATE_TIME_OPACITY_TIMER);
	}
}


function updateDate() {
	let dateValues = getDateValuesAsStrings();
	for (let dateElement of DATE_ELEMENTS) {
		let dateValuesElements = getDateValuesElements(dateElement);
		let monthElement = dateValuesElements.month;
		let dayOfMonthElement = dateValuesElements.dayOfMonth;
		let dayOfWeekElement = dateValuesElements.dayOfWeek;
		let monthUpdateNeeded = false;
		let dayOfMonthUpdateNeeded = false;
		let dayOfWeekUpdateNeeded = false;
		if (monthElement.innerHTML != dateValues.month) {
			monthUpdateNeeded = true;
			monthElement.style.opacity = 0;
		}
		if (dayOfMonthElement.innerHTML != dateValues.dayOfMonth) {
			dayOfMonthUpdateNeeded = true;
			dayOfMonthElement.style.opacity = 0;
		}
		if (dayOfWeekElement.innerHTML != dateValues.dayOfWeek) {
			dayOfWeekUpdateNeeded = true;
			dayOfWeekElement.style.opacity = 0;
		}
		setTimeout(() => {
			if (monthElement) {
				monthElement.style.opacity = 1;
				monthElement.innerHTML = dateValues.month;
			}
			if (dayOfMonthUpdateNeeded) {
				dayOfMonthElement.style.opacity = 1;
				dayOfMonthElement.innerHTML = dateValues.dayOfMonth;
			}
			if (monthUpdateNeeded) {
				dayOfWeekElement.style.opacity = 1;
				dayOfWeekElement.innerHTML = dateValues.dayOfWeek;
			}
		}, DATE_TIME_OPACITY_TIMER);
	}
}
