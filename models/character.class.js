import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
	constructor() {
		super().loadImage(ImageHub.PEPE.move[0]);
	}

	moveRight() {
		console.log("hello from moveRight");
	}

	jump() {
		console.log("Jumped!");
	}
}
