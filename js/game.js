import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";
import { initLevel } from "../levels/level1.js";
import { AudioHub } from "../models/AudioHub.class.js";

let canvas;
let world;
const keyboard = new Keyboard();

function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
}

function startGame() {
	document.getElementById("start-screen").classList.add("d-none");
	initLevel();
	init();
	AudioHub.playOne(AudioHub.GAME_START);
}

function restartGame() {
	document.getElementById("end-screen").classList.add("d-none");
	initLevel();
	init();
	AudioHub.playOne(AudioHub.GAME_START);
}

function goHome() {
	document.getElementById("end-screen").classList.add("d-none");
	document.getElementById("start-screen").classList.remove("d-none");
}

function openInfo() {
	document.getElementById("info-dialog").showModal();
}

function closeInfo() {
	document.getElementById("info-dialog").close();
}

function toggleMute() {
	AudioHub.isMuted = !AudioHub.isMuted;
	localStorage.setItem("isMuted", AudioHub.isMuted);
	if (AudioHub.isMuted) {
		AudioHub.stopAll();
	}
	updateMuteButton();
}

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

function toggleFullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
}

function initPage() {
	addButtonEvents();
	addMobileButtonEvents();
	addFullscreenEvents();
	updateMuteButton();
}

function addFullscreenEvents() {
	const fullscreenButton = document.getElementById("fullscreen-button");
	if (!document.fullscreenEnabled) {
		fullscreenButton.classList.add("d-none");
	}
	fullscreenButton.addEventListener("click", toggleFullscreen);
}

function addMobileButtonEvents() {
	addTouchEvents("left-button", "LEFT");
	addTouchEvents("right-button", "RIGHT");
	addTouchEvents("jump-button", "UP");
	addTouchEvents("throw-button", "D");
}

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

function addClickEvent(id, callback) {
	document.getElementById(id).addEventListener("click", callback);
}

// keyCode ist deprecated. key property nutzen: https://www.w3schools.com/Jsref/event_key_key.asp
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
