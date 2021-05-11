const QUOTE_ELEMENT = document.querySelector(".quote__content");
const AUTHOR_ELEMENT = document.querySelector(".quote__author");

document.addEventListener("DOMContentLoaded", async () => {
	QUOTE_ELEMENT.style.opacity = 0;
	await loadRandomQuote();
	QUOTE_ELEMENT.style.opacity = 1;
});

async function loadRandomQuote() {
	let url = "https://api.quotable.io/random";
	let res = await fetch(url);
	let data = await res.json();
	QUOTE_ELEMENT.textContent = data.content;
	AUTHOR_ELEMENT.textContent = data.author;
}