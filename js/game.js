import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas;
let world;
const keyboard = new Keyboard();

function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
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

	if (e.key === "d") {
		keyboard.D = true;
		console.log(keyboard.D);
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

	if (e.key === "d") {
		keyboard.D = false;
		console.log(keyboard.D);
	}
});

/* window.keyboard = keyboard; */
// to test in browser
/* window.character = character; */

window.addEventListener("load", init);
