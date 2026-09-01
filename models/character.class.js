import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
	constructor() {
		super();
		console.log("Hello from character");
	}

	moveRight() {
		console.log("hello from moveRight");
	}

	jump() {
		console.log("Jumped!");
	}
}
