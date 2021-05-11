const QUOTE_ELEMENT = document.querySelector(".quote__content");
const AUTHOR_ELEMENT = document.querySelector(".quote__author");
const RELOAD_BUTTON = document.getElementById("quote-reload-button");

loadRandomQuote(0);
RELOAD_BUTTON.addEventListener("click", async () => {
	RELOAD_BUTTON.classList.add("rotating");
	await loadRandomQuote(1000);
	RELOAD_BUTTON.classList.remove("rotating");
});

async function loadRandomQuote(msDelay) {
	let url = "https://api.quotable.io/random";
	QUOTE_ELEMENT.style.opacity = 0;
	let oldAuthorElementFontSize = AUTHOR_ELEMENT.style.fontSize;
	AUTHOR_ELEMENT.style.fontSize = 0;
	let res = await Promise.all([fetch(url), delay(msDelay)]).then((results) => results[0]);
	let data = await res.json();
	QUOTE_ELEMENT.textContent = data.content;
	AUTHOR_ELEMENT.textContent = data.author;
	QUOTE_ELEMENT.style.opacity = 1;
	AUTHOR_ELEMENT.style.fontSize = oldAuthorElementFontSize;
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}