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

function initPage() {
	addButtonEvents();
	updateMuteButton();
}

function addButtonEvents() {
	document.getElementById("play-button").addEventListener("click", startGame);
	document.getElementById("info-button").addEventListener("click", openInfo);
	document
		.getElementById("restart-button")
		.addEventListener("click", restartGame);
	document.getElementById("home-button").addEventListener("click", goHome);
	document.getElementById("mute-button").addEventListener("click", toggleMute);
	document
		.getElementById("close-info-button")
		.addEventListener("click", closeInfo);
	document.getElementById("info-dialog").addEventListener("click", closeInfo);
	document
		.getElementById("info-content")
		.addEventListener("click", (e) => e.stopPropagation());
}

// keyCode ist deprecated. key property nutzen: https://www.w3schools.com/Jsref/event_key_key.asp
document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowRight") {
		keyboard.RIGHT = true;
	}

	if (e.key === "ArrowDown") {
		keyboard.DOWN = true;
	}

	if (e.key === "ArrowUp") {
		keyboard.UP = true;
	}

	if (e.key === "ArrowLeft") {
		keyboard.LEFT = true;
	}

	if (e.key === "d" || e.key === "D") {
		keyboard.D = true;
	}
});

document.addEventListener("keyup", (e) => {
	if (e.key === "ArrowRight") {
		keyboard.RIGHT = false;
	}

	if (e.key === "ArrowDown") {
		keyboard.DOWN = false;
	}

	if (e.key === "ArrowUp") {
		keyboard.UP = false;
	}

	if (e.key === "ArrowLeft") {
		keyboard.LEFT = false;
	}

	if (e.key === "d" || e.key === "D") {
		keyboard.D = false;
	}
});

/* window.keyboard = keyboard; */
// to test in browser
/* window.character = character; */

window.addEventListener("load", initPage);
