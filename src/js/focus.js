const FOCUS_KEY = "focus";
const FOCUS_ELEMENTS = document.querySelectorAll(".focus .focus__content");
var oldFocus;

document.addEventListener("DOMContentLoaded", initFocus);
setUpFocusListeners();

function initFocus() {
	let focus = getFocus();
	if (focus !== null) {
		hideQuestions();
		setFocus(focus);
	}
}

function hideQuestions() {
	let questionElements = document.querySelectorAll(".focus .focus__question");
	for (let questionElement of questionElements) {
		questionElement.style.display = "none";
	}
}

function setFocus(focus) {
	for (let focusElement of FOCUS_ELEMENTS) {
		focusElement.textContent = focus;
		focusElement.style.borderBottom = "none";
	}
}

function getFocus() {
	let focus = localStorage.getItem(FOCUS_KEY);
	return focus;
}

function setUpFocusListeners() {
	for (let focusElement of FOCUS_ELEMENTS) {
		focusElement.addEventListener("focus", () => {
			oldFocus = focusElement.textContent;
			focusElement.textContent = "";
			focusElement.focus();
		});
		focusElement.addEventListener("keypress", (event) => {
			let keyPressedCode = event.which | event.keyCode;
			if (keyPressedCode === 13) {
				focusElement.blur();
			}
		})
		focusElement.addEventListener("blur", () => {
			let newFocus = focusElement.textContent;
			if (!isBlank(newFocus)) {
				localStorage.setItem(FOCUS_KEY, newFocus);
				hideQuestions();
				setFocus(newFocus);
			} else {
				focusElement.textContent = oldFocus;
			}
		})
	}
}

function isBlank(str) {
	return !str || /^\s*$/.test(str);
}