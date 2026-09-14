import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { initLevel } from "../levels/level1.js";
import { AudioHub } from "../models/audio-hub.class.js";

let canvas;
let world;
const keyboard = new Keyboard();

/**
 * Creates a new world with the canvas and the keyboard.
 */
function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
}

/**
 * Starts the game with the play button: hides the start screen and creates the level and the world.
 */
function startGame() {
	document.getElementById("start-screen").classList.add("d-none");
	initLevel();
	init();
	AudioHub.playOne(AudioHub.GAME_START);
	AudioHub.playOne(AudioHub.BACKGROUND_MUSIC);
}

/**
 * Restarts the game from the end screen without reloading the page.
 */
function restartGame() {
	document.getElementById("end-screen").classList.add("d-none");
	initLevel();
	init();
	AudioHub.playOne(AudioHub.GAME_START);
	AudioHub.playOne(AudioHub.BACKGROUND_MUSIC);
}

/**
 * Goes back from the end screen to the start screen.
 */
function goHome() {
	document.getElementById("end-screen").classList.add("d-none");
	document.getElementById("start-screen").classList.remove("d-none");
}

/**
 * Opens the info dialog with the controls.
 */
function openInfo() {
	document.getElementById("info-dialog").showModal();
}

/**
 * Closes the info dialog.
 */
function closeInfo() {
	document.getElementById("info-dialog").close();
}

/**
 * Turns the sound on or off and saves the choice in the local storage.
 * When the sound is turned on during a game, the background music starts again.
 */
function toggleMute() {
	AudioHub.isMuted = !AudioHub.isMuted;
	localStorage.setItem("isMuted", AudioHub.isMuted);
	if (AudioHub.isMuted) {
		AudioHub.stopAll();
	} else if (world && !world.gameOver) {
		AudioHub.playOne(AudioHub.BACKGROUND_MUSIC);
	}
	updateMuteButton();
}

/**
 * Shows the matching image (sound on / off) in the mute button.
 */
function updateMuteButton() {
	const muteImage = document.getElementById("mute-image");
	if (AudioHub.isMuted) {
		muteImage.src = "./assets/img/game-assets/sound-off.png";
		muteImage.alt = "Sound off";
	} else {
		muteImage.src = "./assets/img/game-assets/sound-on.png";
		muteImage.alt = "Sound on";
	}
}

/**
 * Switches to fullscreen mode or leaves it.
 */
function toggleFullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
}

/**
 * Connects all buttons with their functions as soon as the page is ready.
 */
function initPage() {
	addButtonEvents();
	addMobileButtonEvents();
	addFullscreenEvents();
	updateMuteButton();
}

/**
 * Connects the fullscreen button. If the browser has no fullscreen (iPhone), the button is hidden.
 */
function addFullscreenEvents() {
	const fullscreenButton = document.getElementById("fullscreen-button");
	if (!document.fullscreenEnabled) {
		fullscreenButton.classList.add("d-none");
	}
	fullscreenButton.addEventListener("click", toggleFullscreen);
}

/**
 * Connects the touch buttons for phone and tablet with the keyboard.
 */
function addMobileButtonEvents() {
	addTouchEvents("left-button", "LEFT");
	addTouchEvents("right-button", "RIGHT");
	addTouchEvents("jump-button", "UP");
	addTouchEvents("throw-button", "D");
}

/**
 * Sets the key to true when a touch button is pressed and to false when it is released.
 * @param {string} id - id of the button
 * @param {string} key - name of the key in the keyboard object (e.g. "LEFT")
 */
function addTouchEvents(id, key) {
	const button = document.getElementById(id);
	button.addEventListener("touchstart", (e) => {
		e.preventDefault();
		keyboard[key] = true;
	});
	button.addEventListener("touchend", (e) => {
		e.preventDefault();
		keyboard[key] = false;
	});
	button.addEventListener("contextmenu", (e) => e.preventDefault());
}

/**
 * Connects the buttons of the start screen, end screen and info dialog.
 */
function addButtonEvents() {
	addClickEvent("play-button", startGame);
	addClickEvent("info-button", openInfo);
	addClickEvent("restart-button", restartGame);
	addClickEvent("home-button", goHome);
	addClickEvent("mute-button", toggleMute);
	addClickEvent("close-info-button", closeInfo);
	addClickEvent("info-dialog", closeInfo);
	addClickEvent("info-content", (e) => e.stopPropagation());
}

/**
 * Adds a click event to an element.
 * @param {string} id - id of the element
 * @param {Function} callback - function that runs on click
 */
function addClickEvent(id, callback) {
	document.getElementById(id).addEventListener("click", callback);
}

// keyCode ist deprecated. key property nutzen: https://www.w3schools.com/Jsref/event_key_key.asp
/**
 * Sets the pressed key in the keyboard object.
 * @param {KeyboardEvent} e - keyboard event
 * @param {boolean} isPressed - true on keydown, false on keyup
 */
function setKey(e, isPressed) {
	if (e.key === "ArrowRight") {
		keyboard.RIGHT = isPressed;
	} else if (e.key === "ArrowDown") {
		keyboard.DOWN = isPressed;
	} else if (e.key === "ArrowUp") {
		keyboard.UP = isPressed;
	} else if (e.key === "ArrowLeft") {
		keyboard.LEFT = isPressed;
	} else if (e.key === "d" || e.key === "D") {
		keyboard.D = isPressed;
	}
}

document.addEventListener("keydown", (e) => setKey(e, true));
document.addEventListener("keyup", (e) => setKey(e, false));

// Nicht auf "load" warten: auf dem iPhone kommt "load" erst spät (Bilder und Sounds)
document.addEventListener("DOMContentLoaded", initPage);
