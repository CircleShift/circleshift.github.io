'use strict';

(function() {
	lightDark = document.getElementById("light-dark");

	function setButtonText() {
		if(Theme.get() == BASE_THEMES[0][0])
			lightDark.innerText = BASE_THEMES[1][1] + " Mode";
		else
			lightDark.innerText = BASE_THEMES[1][0] + " Mode";
	}

	function changeTheme(e) {
		if(Theme.get() == BASE_THEMES[0][0])
			Theme.set(BASE_THEMES[0][1]);
		else
			Theme.set(BASE_THEMES[0][0]);
		
		setButtonText();
	}

	lightDark.addEventListener("click", changeTheme);
	setButtonText();
})();
