const API_KEY = "b94da00be03839bea7038fe97107e5c7";
const LOCALE = "en";
const UNITS = "metric";
const CITY_KEY = "city";
const DEFAULT_CITY = "Minsk";
const WEATHER_CONTAINER = document.querySelector(".weather");
const ICON_ELEMENT = document.querySelector(".weather__icon");
const TEMPERATURE_ELEMENT = document.querySelector(".weather__temperature");
const WIND_SPEED_ELEMENT = document.querySelector(".weather__wind-speed");
const WIND_DIRECTION_ELEMENT = document.querySelector(".weather__wind-direction");
const HUMIDITY_ELEMENT = document.querySelector(".weather__humidity");
const DESCRIPTION_ELEMENT = document.querySelector(".weather__description");
const CITY_ELEMENT = document.querySelector(".weather__city");

document.addEventListener("DOMContentLoaded", async () => {
	WEATHER_CONTAINER.style.opacity = 0;
	CITY_ELEMENT.textContent = getCity();
	setUpCityListener();
	try {
	await loadWeather(0);
	} catch {
		localStorage.removeItem(CITY_KEY);
		CITY_ELEMENT.textContent = DEFAULT_CITY;
		loadWeather(0);
	}
	WEATHER_CONTAINER.style.opacity = 1;
	setInterval(updateWeather, 1000);
});

function getCity() {
	let city = localStorage.getItem(CITY_KEY);
	if (city === null) {
		city = DEFAULT_CITY;
	}
	return city;
}

async function loadWeather(msDelay) {
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${getCity()}&lang=${LOCALE}&units=${UNITS}&appid=${API_KEY}`;
	let res = await Promise.all([fetch(url), delay(msDelay)]).then((results) => results[0]);
	let data = await res.json();
	ICON_ELEMENT.classList.add(`owf-${data.weather[0].id}-d`);
	TEMPERATURE_ELEMENT.textContent = parseInt(data.main.temp, 10);
	WIND_SPEED_ELEMENT.textContent = parseInt(data.wind.speed, 10);
	WIND_DIRECTION_ELEMENT.classList.add(`icon-${getWindDirection(data.wind.deg)}`);
	HUMIDITY_ELEMENT.textContent = parseInt(data.main.humidity);
	DESCRIPTION_ELEMENT.textContent = capitalize(data.weather[0].description);
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function getDayNightPostfix() {
	let now = new Date();
	let hours = now.getHours();
	if (hours > 6 && hours < 12) {
		return "d";
	}
	return "n";
}

function getWindDirection(degrees) {
	if (degrees >= 337.5 && degrees < 22.5) {
		return "icon-n-wind";
	}
	if (degrees < 67.5) {
		return "ne-wind";
	}
	if (degrees < 112.5) {
		return "e-wind";
	}
	if (degrees < 157.5) {
		return "se-wind";
	}
	if (degrees < 192.5) {
		return "s-wind";
	}
	if (degrees < 247.5) {
		return "sw-wind";
	}
	if (degrees < 292.5) {
		return "w-wind";
	}
	return "nw-wind";
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function setUpCityListener() {
	CITY_ELEMENT.addEventListener("focus", () => {
		CITY_ELEMENT.textContent = "";
		CITY_ELEMENT.focus();
	});
	CITY_ELEMENT.addEventListener("keypress", (event) => {
		let keyPressedCode = event.which | event.keyCode;
		if (keyPressedCode === 13) {
			CITY_ELEMENT.blur();
		}
	});
	CITY_ELEMENT.addEventListener("blur", async () => {
		let newCity = CITY_ELEMENT.textContent;
		if (!isBlank(newCity)) {
			WEATHER_CONTAINER.style.opacity = 0;
			localStorage.setItem(CITY_KEY, newCity);
			CITY_ELEMENT.textContent = newCity;
			try {
			await loadWeather(1000);
			} catch {
				localStorage.removeItem(CITY_KEY);
				CITY_ELEMENT.textContent = "Minsk";
				loadWeather(0);
			}
			WEATHER_CONTAINER.style.opacity = 1;
		} else {
			CITY_ELEMENT.textContent = getCity();
		}
	});
}

function updateWeather() {
	let now = new Date();
	let seconds = now.getSeconds();
	let minutes = now.getMinutes();
	if (minutes === 0 && seconds == 0) {
		loadWeather(1000);
	}
}

function isBlank(str) {
	return !str || /^[\s]*$/.test(str);
}
