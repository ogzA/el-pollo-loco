import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

export const CANVAS_HEIGHT = 480;

let canvas;
let world;
const keyboard = new Keyboard();

function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);

	/* 	console.log("My Character is", world.character);
	 */
}

// keyCode ist deprecated. key property nutzen: https://www.w3schools.com/Jsref/event_key_key.asp
document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowRight") {
		keyboard.RIGHT = true;
		console.log(keyboard.RIGHT);
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
});

document.addEventListener("keyup", (e) => {
	if (e.key === "ArrowRight") {
		keyboard.RIGHT = false;
		console.log(keyboard.RIGHT);
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

	console.log(e);
});

/* window.keyboard = keyboard; */
// to test in browser
/* window.character = character; */

window.addEventListener("load", init);
