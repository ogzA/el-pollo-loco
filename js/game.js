import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";

let canvas;
let ctx;
const character = new Character();
const enemies = [new Chicken(), new Chicken(), new Chicken()];

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	console.log("My Character is", character);
}

window.addEventListener("load", init);

// to test in browser
/* window.character = character; */

window.enemies = enemies;
