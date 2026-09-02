import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { World } from "../models/world.class.js";

let canvas;
let world;

function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas);

	console.log("My Character is", world.character);
}

// keyCode ist deprecated. key property nutzen: https://www.w3schools.com/Jsref/event_key_key.asp
/* document.addEventListener("keydown", (e) => {
	if (e.code === "ArrowRight") {
		Keyboard.RIGHT = true;
		console.log(Keyboard.RIGHT);
	}
}); */

/* window.keyboard = keyboard; */
// to test in browser
/* window.character = character; */

window.addEventListener("load", init);
