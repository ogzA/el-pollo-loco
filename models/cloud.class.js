import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
	y = 50;
	width = 512;
	height = 300;
	constructor() {
		super().loadImage(ImageHub.CLOUD.move[0]);

		this.x = Math.random() * 500;

		this.animate();
	}

	animate() {
		this.moveLeft();
	}
}
