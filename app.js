document.querySelector("#get-me-joke").addEventListener("click", generateJoke);
document.querySelector("#number-of-joke").addEventListener("keyup", clearJoke);

function generateJoke(e) {
	const numberOfJokes = document.getElementById("number-of-joke").value;
	const inputError = document.getElementById("number-of-joke");

	if (parseInt(numberOfJokes) === 0 || numberOfJokes === "") {
		let message;
		if (parseInt(numberOfJokes) === 0) {
			message = "Please enter value greater than 0";
		} else {
			message = "Please enter some value";
		}

		const parentNode = document.querySelector(".card");

		const reffElement = document.querySelector(".lists");

		const displayHeading = document.createElement("h6");

		const displayMsg = document.createTextNode(message);

		displayHeading.appendChild(displayMsg);

		inputError.style.backgroundColor = "#f0b5b4";
		inputError.style.border = "1px solid #ef8686";

		displayHeading.style.color = "red";
		displayHeading.style.background = "#f0b5b6";
		displayHeading.style.borderRadius = "10px";
		displayHeading.style.padding = "10px";
		displayHeading.style.width = "50%";

		parentNode.insertBefore(displayHeading, reffElement);

		return setTimeout(function () {
			displayHeading.remove();
			inputError.style.backgroundColor = "white";
			inputError.style.border = "1px solid #000";
			inputError.value = "";
		}, 1350);
	}

	const xml = new XMLHttpRequest();

	xml.open("get", `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);

	xml.onload = function () {
		if (xml.status === 200) {
			const response = JSON.parse(xml.responseText);
			let outputJoke = "";

			if (response.type === "success") {
				response.value.forEach(function (getJoke) {
					return outputJoke += `
                    <li>${getJoke.joke}</li>
                    `;
				});
			} else {
				return outputJoke += `<li>Something Went wrong</li>`;
			}

			document.querySelector(".lists").innerHTML = outputJoke;
			document.querySelector(".lists").style.marginTop = "20px";
			document.querySelector(".lists").style.padding = "0px";
			document.querySelector(".lists").style.color = "orange";
		}
	};

	xml.send();

	e.preventDefault();
}

function clearJoke() {
	document.querySelector(".lists").innerHTML = "";
}
